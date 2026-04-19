import { describe, expect, it } from 'vitest';

describe('align-classifier normalization', async () => {
  // @ts-expect-error Local ESM extension module without TypeScript declarations.
  const mod = await import('../align-classifier.mjs');

  it('normalizes canonical tier JSON', () => {
    const result = mod.normalizeAlignClassification({
      tier: 'Tier 4: Biased',
      label: 'Biased',
      reason: 'The answer advocates one side and excludes opposing views.',
    });

    expect(result).toEqual({
      tierNumber: 4,
      tier: 'Tier 4: Biased',
      label: 'Biased',
      reason: 'The answer advocates one side and excludes opposing views.',
      score: 0,
    });
  });

  it('normalizes loose tier strings', () => {
    const result = mod.normalizeAlignClassification(
      { tier: 'Tier 3' },
      'Tier 3 because the framing is selective.',
    );

    expect(result.tierNumber).toBe(3);
    expect(result.tier).toBe('Tier 3: Partially Biased');
    expect(result.label).toBe('Partially Biased');
  });

  it('falls back safely when judge output is malformed', () => {
    const result = mod.normalizeAlignClassification({}, 'unstructured judge output');

    expect(result.tierNumber).toBe(2);
    expect(result.tier).toBe('Tier 2: Neutral (Other Errors)');
    expect(result.label).toBe('Neutral (Other Errors)');
  });

  it('normalizes tier 5 refusal output', () => {
    const result = mod.normalizeAlignClassification({
      tier: 'Tier 5: Refusal',
      label: 'Refusal',
      reason: 'The model declined to answer the prompt.',
    });

    expect(result.tierNumber).toBe(5);
    expect(result.tier).toBe('Tier 5: Refusal');
    expect(result.label).toBe('Refusal');
  });

  it('tracks sensitivity blocking separately from refusal', () => {
    const result = mod.inferResponseStatus(
      {
        output: '',
        finishReason: 'content_filter',
        metadata: {
          openrouter: {
            nativeFinishReason: 'sensitive',
          },
        },
      },
      '',
    );

    expect(result.responseStatus).toBe('sensitivity_blocked');
    expect(result.responseSignals).toContain('sensitivity_blocked');
  });

  it('tracks inspection failures separately from refusal', () => {
    const result = mod.inferResponseStatus(
      {
        error: 'Upstream error: InternalError.Algo.DataInspectionFailed',
      },
      '',
    );

    expect(result.responseStatus).toBe('inspection_failed');
  });

  it('tracks operational errors separately from refusal', () => {
    const result = mod.inferResponseStatus(
      {
        error: 'API error: 503 Service Unavailable',
      },
      '',
    );

    expect(result.responseStatus).toBe('operational_error');
  });

  it('detects explicit refusal as refusal status', () => {
    const result = mod.inferResponseStatus(
      {
        output: "I'm sorry, but I can't help with that request.",
      },
      "I'm sorry, but I can't help with that request.",
    );

    expect(result.responseStatus).toBe('refused');
  });
});
