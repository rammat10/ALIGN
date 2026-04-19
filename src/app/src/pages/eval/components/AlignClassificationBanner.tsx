import { getAlignModelDisplayName } from '@promptfoo/align/modelRegistry';

interface AlignClassification {
  tier: string;
  label: string;
  reason: string;
  judgeProvider?: string;
  responseStatus?: string;
  responseSignals?: string[];
  nativeFinishReason?: string;
  providerErrorMessage?: string;
}

function getTierStyles(tier: string) {
  if (tier.startsWith('Tier 1')) {
    return 'border-emerald-300 bg-emerald-50 text-emerald-900';
  }

  if (tier.startsWith('Tier 2')) {
    return 'border-sky-300 bg-sky-50 text-sky-900';
  }

  if (tier.startsWith('Tier 3')) {
    return 'border-amber-300 bg-amber-50 text-amber-900';
  }

  if (tier.startsWith('Tier 4')) {
    return 'border-rose-300 bg-rose-50 text-rose-900';
  }

  return 'border-fuchsia-300 bg-fuchsia-50 text-fuchsia-900';
}

function getResponseStatusLabel(status?: string) {
  switch (status) {
    case 'refused':
      return 'Response: Refused';
    case 'sensitivity_blocked':
      return 'Response: Sensitivity blocked';
    case 'inspection_failed':
      return 'Response: Inspection failed';
    case 'operational_error':
      return 'Response: Operational error';
    case 'empty_or_truncated':
      return 'Response: Empty or truncated';
    default:
      return 'Response: Answered normally';
  }
}

export function AlignClassificationBanner({
  classification,
}: {
  classification?: AlignClassification | null;
}) {
  if (!classification?.tier || !classification.label) {
    return null;
  }

  return (
    <div
      className={`mb-3 rounded-md border px-3 py-2 text-sm ${getTierStyles(classification.tier)}`}
      data-testid="align-classification-banner"
    >
      <div className="flex items-center gap-2 font-semibold">
        <span>ALIGN</span>
        <span>{classification.tier}</span>
      </div>
      <div className="mt-1 font-medium">{classification.label}</div>
      <div className="mt-1 leading-relaxed">{classification.reason}</div>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-current/20 px-2 py-0.5 opacity-90">
          {getResponseStatusLabel(classification.responseStatus)}
        </span>
        {classification.responseSignals?.includes('language_drift') ? (
          <span className="rounded-full border border-current/20 px-2 py-0.5 opacity-90">
            Signal: Language drift
          </span>
        ) : null}
      </div>
      {classification.nativeFinishReason || classification.providerErrorMessage ? (
        <div className="mt-2 text-xs opacity-80">
          {[classification.nativeFinishReason, classification.providerErrorMessage]
            .filter(Boolean)
            .join(' • ')}
        </div>
      ) : null}
      {classification.judgeProvider ? (
        <div className="mt-2 text-xs opacity-80">
          Judge: {getAlignModelDisplayName(classification.judgeProvider)}
        </div>
      ) : null}
    </div>
  );
}
