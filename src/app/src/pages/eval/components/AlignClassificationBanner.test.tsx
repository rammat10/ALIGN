import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlignClassificationBanner } from './AlignClassificationBanner';

describe('AlignClassificationBanner', () => {
  it('renders ALIGN classification details', () => {
    render(
      <AlignClassificationBanner
        classification={{
          tier: 'Tier 3: Partially Biased',
          label: 'Partially Biased',
          reason: 'The answer omits countervailing context and frames the issue asymmetrically.',
          judgeProvider: 'openrouter:openai/gpt-5.4',
          responseStatus: 'answered_normally',
        }}
      />,
    );

    expect(screen.getByText('Tier 3: Partially Biased')).toBeInTheDocument();
    expect(screen.getByText('Partially Biased')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The answer omits countervailing context and frames the issue asymmetrically.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Judge: GPT-5\.4/)).toBeInTheDocument();
    expect(screen.getByText('Response: Answered normally')).toBeInTheDocument();
  });

  it('renders response evidence badges', () => {
    render(
      <AlignClassificationBanner
        classification={{
          tier: 'Tier 2: Neutral (Other Errors)',
          label: 'Neutral (Other Errors)',
          reason: 'The provider blocked the answer.',
          responseStatus: 'sensitivity_blocked',
          responseSignals: ['sensitivity_blocked', 'language_drift'],
          nativeFinishReason: 'sensitive',
          providerErrorMessage: 'inspection failed upstream',
        }}
      />,
    );

    expect(screen.getByText('Response: Sensitivity blocked')).toBeInTheDocument();
    expect(screen.getByText('Signal: Language drift')).toBeInTheDocument();
    expect(screen.getByText(/sensitive/)).toBeInTheDocument();
  });

  it('returns null when classification is missing', () => {
    const { container } = render(<AlignClassificationBanner classification={null} />);
    expect(container.firstChild).toBeNull();
  });
});
