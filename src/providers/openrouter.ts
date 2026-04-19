import { fetchWithCache } from '../cache';
import logger from '../logger';
import { type GenAISpanContext, type GenAISpanResult, withGenAISpan } from '../tracing/genaiTracer';
import { normalizeFinishReason } from '../util/finishReason';
import { OpenAiChatCompletionProvider } from './openai/chat';
import { calculateOpenAICost, formatOpenAiError, getTokenUsage } from './openai/util';
import { REQUEST_TIMEOUT_MS } from './shared';
import type OpenAI from 'openai';

import type {
  ApiProvider,
  CallApiContextParams,
  CallApiOptionsParams,
  ProviderOptions,
  ProviderResponse,
} from '../types/providers';

interface OpenAIErrorResponse {
  error: {
    message: string;
    type?: string;
    code?: string;
  };
}

type OpenRouterChatCompletionResponse = OpenAI.ChatCompletion & {
  provider?: string;
  error?: {
    code?: string;
    message?: string;
  };
};

type OpenRouterChoiceError = {
  code?: string | number;
  message?: string;
  metadata?: unknown;
};

/**
 * OpenRouter provider extends OpenAI chat completion provider with special handling
 * for models like Gemini that include thinking/reasoning tokens.
 *
 * For Gemini models, the base OpenAI provider incorrectly prioritizes the reasoning
 * field over content. This provider ensures content is the primary output with
 * reasoning shown as thinking content when showThinking is enabled.
 */
export class OpenRouterProvider extends OpenAiChatCompletionProvider {
  constructor(modelName: string, providerOptions: ProviderOptions) {
    super(modelName, {
      ...providerOptions,
      config: {
        ...providerOptions.config,
        apiBaseUrl: 'https://openrouter.ai/api/v1',
        apiKeyEnvar: 'OPENROUTER_API_KEY',
        passthrough: {
          // Pass through OpenRouter-specific options
          // https://openrouter.ai/docs/requests
          ...(providerOptions.config?.transforms && {
            transforms: providerOptions.config.transforms,
          }),
          ...(providerOptions.config?.models && { models: providerOptions.config.models }),
          ...(providerOptions.config?.route && { route: providerOptions.config.route }),
          ...(providerOptions.config?.provider && { provider: providerOptions.config.provider }),
          ...(providerOptions.config?.passthrough || {}),
        },
      },
    });
  }

  id(): string {
    return `openrouter:${this.modelName}`;
  }

  toString(): string {
    return `[OpenRouter Provider ${this.modelName}]`;
  }

  toJSON() {
    return {
      provider: 'openrouter',
      model: this.modelName,
      config: {
        ...this.config,
        ...(this.config.apiKey && { apiKey: undefined }),
      },
    };
  }

  async callApi(
    prompt: string,
    context?: CallApiContextParams,
    callApiOptions?: CallApiOptionsParams,
  ): Promise<ProviderResponse> {
    // Set up tracing context
    const spanContext: GenAISpanContext = {
      system: 'openrouter',
      operationName: 'chat',
      model: this.modelName,
      providerId: this.id(),
      temperature: this.config.temperature,
      topP: this.config.top_p,
      maxTokens: this.config.max_tokens,
      stopSequences: this.config.stop,
      testIndex: context?.test?.vars?.__testIdx as number | undefined,
      promptLabel: context?.prompt?.label,
      // W3C Trace Context for linking to evaluation trace
      traceparent: context?.traceparent,
    };

    // Result extractor to set response attributes on the span
    const resultExtractor = (response: ProviderResponse): GenAISpanResult => {
      const result: GenAISpanResult = {};
      if (response.tokenUsage) {
        result.tokenUsage = {
          prompt: response.tokenUsage.prompt,
          completion: response.tokenUsage.completion,
          total: response.tokenUsage.total,
        };
      }
      if (response.finishReason) {
        result.finishReasons = [response.finishReason];
      }
      return result;
    };

    return withGenAISpan(
      spanContext,
      () => this.executeOpenRouterCall(prompt, context, callApiOptions),
      resultExtractor,
    );
  }

  private async executeOpenRouterCall(
    prompt: string,
    context?: CallApiContextParams,
    callApiOptions?: CallApiOptionsParams,
  ): Promise<ProviderResponse> {
    // Get the request body and config
    const { body, config } = await this.getOpenAiBody(prompt, context, callApiOptions);

    // Make the API call directly
    logger.debug(`Calling OpenRouter API: model=${this.modelName}`);

    let data: OpenRouterChatCompletionResponse;
    let status: number;
    let statusText: string;
    let cached = false;

    try {
      ({ data, cached, status, statusText } =
        await fetchWithCache<OpenRouterChatCompletionResponse>(
          `${this.getApiUrl()}/chat/completions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.getApiKey()}`,
              ...(this.getOrganization() ? { 'OpenAI-Organization': this.getOrganization() } : {}),
              ...config.headers,
            },
            body: JSON.stringify(body),
          },
          REQUEST_TIMEOUT_MS,
          'json',
          context?.bustCache ?? context?.debug,
        ));

      if (status < 200 || status >= 300) {
        return {
          error: `API error: ${status} ${statusText}\n${typeof data === 'string' ? data : JSON.stringify(data)}`,
        };
      }
    } catch (err) {
      logger.error(`API call error: ${String(err)}`);
      return {
        error: `API call error: ${String(err)}`,
      };
    }

    if (data.error) {
      return await this.handleOpenRouterError(
        data.error,
        data as OpenAIErrorResponse,
        prompt,
        context,
        callApiOptions,
      );
    }

    // Process the response with special handling for Gemini
    const message: any = data.choices[0].message;
    const choiceError = (
      data.choices[0] as OpenAI.ChatCompletion.Choice & {
        error?: OpenRouterChoiceError;
      }
    ).error;
    if (choiceError?.message) {
      return await this.handleOpenRouterChoiceError(
        choiceError,
        data,
        prompt,
        context,
        callApiOptions,
      );
    }
    const finishReason = normalizeFinishReason(data.choices[0].finish_reason);

    // Prioritize tool calls over content and reasoning
    let output: string | object = '';
    const hasFunctionCall = !!(message.function_call && message.function_call.name);
    const hasToolCalls = Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
    if (hasFunctionCall || hasToolCalls) {
      // Tool calls always take priority and never include thinking
      output = hasFunctionCall ? message.function_call! : message.tool_calls!;
    } else if (message.content && message.content.trim()) {
      output = message.content;
      // Add reasoning as thinking content if present and showThinking is enabled
      if (message.reasoning && (this.config.showThinking ?? true)) {
        output = `Thinking: ${message.reasoning}\n\n${output}`;
      }
    } else if (message.reasoning && (this.config.showThinking ?? true)) {
      // Fallback to reasoning if no content and showThinking is enabled
      output = message.reasoning;
    }
    // Handle structured output
    if (config.response_format?.type === 'json_schema') {
      // Prefer parsing the raw content to avoid the "Thinking:" prefix breaking JSON
      const jsonCandidate =
        typeof message?.content === 'string'
          ? message.content
          : typeof output === 'string'
            ? output
            : null;
      if (jsonCandidate) {
        try {
          output = JSON.parse(jsonCandidate);
        } catch (error) {
          // Keep the original output (which may include "Thinking:" prefix) if parsing fails
          logger.warn(`Failed to parse JSON output for json_schema: ${String(error)}`);
        }
      }
    }

    return {
      output,
      tokenUsage: getTokenUsage(data, cached),
      cached,
      cost: calculateOpenAICost(
        this.modelName,
        config,
        data.usage?.prompt_tokens,
        data.usage?.completion_tokens,
      ),
      metadata: {
        openrouter: {
          provider: data.provider,
          nativeFinishReason:
            (
              data.choices[0] as OpenAI.ChatCompletion.Choice & {
                native_finish_reason?: string;
              }
            ).native_finish_reason ?? null,
        },
      },
      ...(finishReason && { finishReason }),
    };
  }

  private isRetryableOpenRouterError(error: { code?: string | number; message?: string }): boolean {
    const code = typeof error.code === 'string' ? Number(error.code) : error.code;
    const message = error.message?.toLowerCase() || '';

    return (
      code === 503 ||
      message.includes('503') ||
      message.includes('service unavailable') ||
      message.includes('temporarily unavailable')
    );
  }

  private async retryOpenRouterCall(
    prompt: string,
    context?: CallApiContextParams,
    callApiOptions?: CallApiOptionsParams,
  ): Promise<ProviderResponse> {
    logger.warn(`[OpenRouter] Retrying transient upstream error for model=${this.modelName}`);
    return await this.executeOpenRouterCall(prompt, context, callApiOptions);
  }

  private async handleOpenRouterError(
    error: { code?: string | number; message?: string },
    data: OpenAIErrorResponse,
    prompt: string,
    context?: CallApiContextParams,
    callApiOptions?: CallApiOptionsParams,
  ): Promise<ProviderResponse> {
    if (this.isRetryableOpenRouterError(error) && !callApiOptions?.abortSignal?.aborted) {
      return await this.retryOpenRouterCall(prompt, context, callApiOptions);
    }

    return {
      error: formatOpenAiError(data),
      metadata: {
        openrouter: {
          errorCode: error.code ?? null,
          errorMessage: error.message ?? null,
        },
      },
    };
  }

  private async handleOpenRouterChoiceError(
    choiceError: {
      code?: string | number;
      message?: string;
      metadata?: unknown;
    },
    data: OpenRouterChatCompletionResponse,
    prompt: string,
    context?: CallApiContextParams,
    callApiOptions?: CallApiOptionsParams,
  ): Promise<ProviderResponse> {
    if (this.isRetryableOpenRouterError(choiceError) && !callApiOptions?.abortSignal?.aborted) {
      return await this.retryOpenRouterCall(prompt, context, callApiOptions);
    }

    return {
      error: `API error: ${choiceError.message || 'Unknown OpenRouter choice error'}, Code: ${choiceError.code ?? 'unknown'}\n\n${JSON.stringify(
        { error: choiceError },
        null,
        2,
      )}`,
      metadata: {
        http: {
          status: 200,
          statusText: 'OK',
        },
        openrouter: {
          choiceErrorCode: choiceError.code ?? null,
          choiceErrorMessage: choiceError.message ?? null,
          choiceErrorMetadata: choiceError.metadata ?? null,
          provider: data.provider,
          nativeFinishReason:
            (
              data.choices[0] as OpenAI.ChatCompletion.Choice & {
                native_finish_reason?: string;
              }
            ).native_finish_reason ?? null,
        },
      },
      raw: data,
    };
  }
}

export function createOpenRouterProvider(
  providerPath: string,
  options: {
    config?: ProviderOptions;
    id?: string;
    env?: Record<string, string | undefined>;
  } = {},
): ApiProvider {
  const splits = providerPath.split(':');
  const modelName = splits.slice(1).join(':');

  return new OpenRouterProvider(modelName, options.config || {});
}
