import { describe, expect, it } from 'vitest';
import {
  alignModelRegistry,
  getActiveAlignModelsByRole,
  getAlignModelById,
  getAlignModelDisplayName,
  getAlignModelSet,
  getAlignProviderId,
} from '../src/align/modelRegistry';

describe('ALIGN model registry', () => {
  it('tracks active output and judge model sets without mixing incompatible models into text runs', () => {
    const outputIds = getAlignModelSet('output').map((model) => model.rawOpenRouterId);
    const judgeIds = getAlignModelSet('judge', 'compare').map((model) => model.rawOpenRouterId);

    expect(outputIds).toEqual([
      'openai/gpt-5.4',
      'anthropic/claude-4.7-opus',
      'x-ai/grok-4.20',
      'z-ai/glm-5-turbo',
      'qwen/qwen3.5-9b',
      'qwen/qwen3.5-flash-02-23',
    ]);
    expect(judgeIds).toEqual(['openai/gpt-5.4', 'anthropic/claude-4.7-opus']);
  });

  it('keeps excluded non-text models registered but inactive', () => {
    const wan = getAlignModelById('alibaba/wan-2.7');
    const embed = getAlignModelById('openrouter:perplexity/pplx-embed-v1-0.6b');

    expect(wan).toMatchObject({
      active: false,
      roles: ['other'],
    });
    expect(embed).toMatchObject({
      active: false,
      roles: ['other'],
    });
  });

  it('provides shared display names and provider ids for ALIGN surfaces', () => {
    expect(getAlignProviderId('z-ai/glm-5-turbo')).toBe('openrouter:z-ai/glm-5-turbo');
    expect(getAlignModelDisplayName('openrouter:qwen/qwen3.5-9b')).toBe('Qwen 3.5 9B');
    expect(getAlignModelDisplayName('openrouter:x-ai/grok-4.20')).toBe('Grok 4.20');
  });

  it('exposes only active models by role', () => {
    const outputModels = getActiveAlignModelsByRole('output');
    const judgeModels = getActiveAlignModelsByRole('judge');
    const otherModels = getActiveAlignModelsByRole('other');

    expect(outputModels.length).toBeGreaterThanOrEqual(6);
    expect(judgeModels.map((model) => model.rawOpenRouterId)).toEqual([
      'openai/gpt-5.4',
      'anthropic/claude-4.7-opus',
    ]);
    expect(otherModels).toEqual([]);
    expect(alignModelRegistry.defaults.judgeModel).toBe('openai/gpt-5.4');
  });
});
