import type { ReactNode } from 'react';

import { Badge } from '@app/components/ui/badge';
import { Button } from '@app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card';
import { Chip } from '@app/components/ui/chip';
import { cn } from '@app/lib/utils';
import { ArrowRightLeft, BrainCircuit, Gauge, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import {
  ALIGN_TIER_DEFINITIONS,
  ALIGN_TIER_ORDER,
  type AlignLeaderboardEntry,
  type AlignResultRecord,
  buildAlignLeaderboard,
  buildComparisonDeltas,
  buildFailureFocusAreas,
  getTierColorClass,
} from './alignViewModel';

interface AlignOverviewProps {
  records: AlignResultRecord[];
  benchmarkName: string;
  benchmarkVersion?: string | null;
  selectedPrimaryModel?: string;
  selectedComparisonModel?: string;
  selectedFocusArea?: string;
  onFocusAreaSelect?: (focusArea: string) => void;
}

const TIER_LABELS: Record<string, string> = {
  'Tier 1: Neutral': 'T1',
  'Tier 2: Neutral (Other Errors)': 'T2',
  'Tier 3: Partially Biased': 'T3',
  'Tier 4: Biased': 'T4',
  'Tier 5: Refusal': 'T5',
};

const ALIGN_SURFACE =
  'border-zinc-800 bg-zinc-950/95 text-zinc-50 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)]';
const ALIGN_INNER =
  'border-zinc-800/80 bg-zinc-900/85 text-zinc-50 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.8)]';
const ALIGN_MUTED = 'text-zinc-400';
const ALIGN_SOFT = 'text-zinc-300';

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatDate(value: string | null): string {
  if (!value) {
    return 'Unknown';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function average(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = getKey(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

function getAverageTierBadgeClass(averageTier: number): string {
  if (averageTier < 1.5) {
    return getTierColorClass('Tier 1: Neutral');
  }
  if (averageTier < 2.5) {
    return getTierColorClass('Tier 2: Neutral (Other Errors)');
  }
  if (averageTier < 3.5) {
    return getTierColorClass('Tier 3: Partially Biased');
  }
  if (averageTier < 4.5) {
    return getTierColorClass('Tier 4: Biased');
  }
  return getTierColorClass('Tier 5: Refusal');
}

function getFailureSeverityClass(avgTier: number, tier3PlusRate: number): string {
  if (avgTier >= 3.5 || tier3PlusRate >= 0.75) {
    return 'border-rose-500/50 bg-rose-500/12';
  }
  if (avgTier >= 2.75 || tier3PlusRate >= 0.5) {
    return 'border-amber-500/45 bg-amber-500/10';
  }
  return 'border-zinc-800 bg-zinc-900/80';
}

function SummaryStat({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card className={ALIGN_SURFACE}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardDescription className={cn('text-xs uppercase tracking-[0.18em]', ALIGN_MUTED)}>
            {title}
          </CardDescription>
          <div className="rounded-full bg-zinc-900 p-2 text-zinc-400">{icon}</div>
        </div>
        <CardTitle className="text-3xl font-semibold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn('text-sm', ALIGN_SOFT)}>{description}</p>
      </CardContent>
    </Card>
  );
}

function RunMetadataStrip({
  records,
  benchmarkName,
  benchmarkVersion,
  selectedPrimaryModel,
  selectedComparisonModel,
}: {
  records: AlignResultRecord[];
  benchmarkName: string;
  benchmarkVersion?: string | null;
  selectedPrimaryModel?: string;
  selectedComparisonModel?: string;
}) {
  const timestamp = records[0]?.timestamp ?? null;
  const outputModels = Array.from(new Set(records.map((record) => record.outputModelDisplay)));
  const judgeModels = Array.from(new Set(records.map((record) => record.judgeModelDisplay)));
  const promptCount = new Set(records.map((record) => record.promptId)).size;

  return (
    <Card
      className={cn(
        ALIGN_SURFACE,
        'bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.98),rgba(24,24,27,0.98))]',
      )}
    >
      <CardContent className="flex flex-wrap gap-2 p-4">
        <Chip label="BENCHMARK" interactive={false}>
          {benchmarkVersion ? `${benchmarkName} ${benchmarkVersion}` : benchmarkName}
        </Chip>
        <Chip label="RUN DATE" interactive={false}>
          {formatDate(timestamp)}
        </Chip>
        <Chip label="PROMPTS" interactive={false}>
          {String(promptCount)}
        </Chip>
        <Chip label="OUTPUT MODELS" interactive={false}>
          {outputModels.join(', ')}
        </Chip>
        <Chip label="JUDGE" interactive={false}>
          {judgeModels.join(', ')}
        </Chip>
        {(selectedPrimaryModel || selectedComparisonModel) && (
          <Chip label="VIEW" interactive={false}>
            {selectedPrimaryModel
              ? selectedComparisonModel
                ? `${selectedPrimaryModel} vs ${selectedComparisonModel}`
                : selectedPrimaryModel
              : 'All models'}
          </Chip>
        )}
      </CardContent>
    </Card>
  );
}

function ExecutiveSummary({
  records,
  leaderboard,
}: {
  records: AlignResultRecord[];
  leaderboard: AlignLeaderboardEntry[];
}) {
  const bestModel = leaderboard[0];
  const failureAreas = buildFailureFocusAreas(records).slice(0, 2);
  const comparison = buildComparisonDeltas(records);

  const headline = comparison
    ? `${bestModel?.outputModel ?? comparison.models[0].display} wins this comparison on overall ALIGN performance, with the clearest edge in ${
        comparison.byFocusArea
          .filter((entry) => entry.leftAvgTier !== entry.rightAvgTier)
          .sort(
            (left, right) =>
              Math.abs(right.leftAvgTier - right.rightAvgTier) -
              Math.abs(left.leftAvgTier - left.rightAvgTier),
          )[0]
          ?.focusArea.toLowerCase() || 'the visible focus areas'
      }.`
    : `${bestModel?.outputModel ?? 'The leading model'} is the top model in this benchmark slice, with the lowest average ALIGN tier and the strongest neutrality result.`;

  const support = comparison
    ? `The main risk sits in ${comparison.bothFail[0]?.focusArea.toLowerCase() || failureAreas[0]?.focusArea.toLowerCase() || 'the highest-risk areas'}; that is the priority area for policy review and model selection.`
    : `The main risk sits in ${failureAreas[0]?.focusArea.toLowerCase() || 'the highest-risk area'}${failureAreas[1] ? ` and ${failureAreas[1].focusArea.toLowerCase()}` : ''}; that is where Tier 3 through Tier 5 outcomes will shape deployment confidence.`;

  return (
    <Card
      className={cn(
        ALIGN_SURFACE,
        'bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_32%),linear-gradient(145deg,rgba(9,9,11,0.98),rgba(24,24,27,0.98))]',
      )}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 text-emerald-300">
          <Sparkles className="size-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em]">
            Executive Summary
          </span>
        </div>
        <CardTitle className="max-w-5xl text-4xl font-semibold leading-[1.15] text-balance">
          {headline}
        </CardTitle>
        <CardDescription className="max-w-4xl text-lg leading-8 text-zinc-300">
          {support}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function LeaderboardRow({
  entry,
  rank,
  onFocusAreaSelect,
}: {
  entry: AlignLeaderboardEntry;
  rank: number;
  onFocusAreaSelect?: (focusArea: string) => void;
}) {
  return (
    <div
      className={cn(
        ALIGN_INNER,
        'grid gap-4 rounded-xl p-4 md:grid-cols-[72px_1.35fr_120px_120px_120px_150px_1.3fr]',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-950">
          #{rank}
        </div>
      </div>
      <div className="min-w-0">
        <div className="font-semibold">{entry.outputModel}</div>
        <div className={cn('truncate text-xs', ALIGN_MUTED)} title={entry.outputModelId}>
          {entry.outputModelId}
        </div>
      </div>
      <div>
        <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>Avg tier</div>
        <div className="mt-1 text-lg font-semibold tabular-nums">
          {entry.averageTier.toFixed(2)}
        </div>
      </div>
      <div>
        <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>Neutrality</div>
        <div className="mt-1 text-lg font-semibold tabular-nums">
          {formatPercent(entry.neutralityScore)}
        </div>
      </div>
      <div>
        <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>Tier 1</div>
        <div className="mt-1 text-lg font-semibold tabular-nums">
          {formatPercent(entry.tier1Rate)}
        </div>
      </div>
      <div>
        <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>T3-T5</div>
        <div className="mt-1 text-lg font-semibold tabular-nums">
          {formatPercent(entry.tier3PlusRate)}
        </div>
      </div>
      <div className="min-w-0">
        <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
          Worst focus area
        </div>
        <div className="mt-1 flex items-center justify-between gap-3">
          {onFocusAreaSelect ? (
            <Button
              variant="ghost"
              className="h-auto p-0 text-left font-semibold text-zinc-50 hover:bg-transparent hover:text-emerald-300"
              onClick={() => onFocusAreaSelect(entry.worstFocusArea)}
            >
              {entry.worstFocusArea}
            </Button>
          ) : (
            <div className="font-semibold">{entry.worstFocusArea}</div>
          )}
          <div className="text-right">
            <div className="text-sm font-semibold tabular-nums">
              Tier {entry.worstFocusAreaTier.toFixed(2)}
            </div>
            <div className={cn('text-xs', ALIGN_MUTED)}>
              T3-T5 {formatPercent(entry.worstFocusAreaTier3PlusRate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponseStatusOverview({ leaderboard }: { leaderboard: AlignLeaderboardEntry[] }) {
  return (
    <Card className={ALIGN_SURFACE}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Response Status By Model</CardTitle>
        <CardDescription className={ALIGN_SOFT}>
          Operational and blocking behavior is tracked separately from ideology tiers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((entry) => (
          <div
            key={entry.outputModelId}
            className="grid gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 md:grid-cols-[1.4fr_repeat(4,120px)]"
          >
            <div>
              <div className="font-semibold">{entry.outputModel}</div>
              <div className={cn('text-xs', ALIGN_MUTED)}>{entry.outputModelId}</div>
            </div>
            <div>
              <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>Refusal</div>
              <div className="mt-1 text-lg font-semibold">{formatPercent(entry.refusalRate)}</div>
            </div>
            <div>
              <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                Sensitivity
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatPercent(entry.sensitivityBlockedRate)}
              </div>
            </div>
            <div>
              <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                Inspection
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatPercent(entry.inspectionFailedRate)}
              </div>
            </div>
            <div>
              <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                Operational
              </div>
              <div className="mt-1 text-lg font-semibold">
                {formatPercent(entry.operationalErrorRate)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ModelLeaderboard({
  leaderboard,
  onFocusAreaSelect,
}: {
  leaderboard: AlignLeaderboardEntry[];
  onFocusAreaSelect?: (focusArea: string) => void;
}) {
  const best = leaderboard[0];

  return (
    <Card className={ALIGN_SURFACE}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl">Model Leaderboard</CardTitle>
        <CardDescription className={ALIGN_SOFT}>
          Ranked by lowest average ALIGN tier. This is the primary benchmark result.
        </CardDescription>
        {best && (
          <div className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-base text-emerald-100">
            <span className="font-semibold">{best.outputModel}</span> leads this view with an
            average tier of <span className="font-semibold">{best.averageTier.toFixed(2)}</span>, a
            neutrality score of{' '}
            <span className="font-semibold">{formatPercent(best.neutralityScore)}</span>, and a Tier
            1 rate of <span className="font-semibold">{formatPercent(best.tier1Rate)}</span>.
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {leaderboard.map((entry, index) => (
          <LeaderboardRow
            key={entry.outputModelId}
            entry={entry}
            rank={index + 1}
            onFocusAreaSelect={onFocusAreaSelect}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function ModelSummaryCards({ leaderboard }: { leaderboard: AlignLeaderboardEntry[] }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {leaderboard.map((entry, index) => (
        <Card key={entry.outputModelId} className={ALIGN_INNER}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <CardDescription className={cn('text-xs uppercase tracking-[0.16em]', ALIGN_MUTED)}>
                  Rank #{index + 1}
                </CardDescription>
                <CardTitle className="mt-1 text-xl">{entry.outputModel}</CardTitle>
              </div>
              <Badge
                variant="outline"
                className={cn('font-medium', getAverageTierBadgeClass(entry.averageTier))}
              >
                Avg tier {entry.averageTier.toFixed(2)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Neutrality
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {formatPercent(entry.neutralityScore)}
                </div>
              </div>
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Strengths
                </div>
                <p className="mt-1 text-sm leading-6 text-zinc-100">
                  Performs best on{' '}
                  {entry.bestFocusAreas.join(' and ') || 'the currently visible focus areas'}.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Weaknesses
                </div>
                <p className="mt-1 text-sm leading-6 text-zinc-100">
                  Struggles most on {entry.weakestFocusAreas.join(' and ') || entry.worstFocusArea}.
                </p>
              </div>
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Common failure pattern
                </div>
                <p className={cn('mt-1 text-sm leading-6', ALIGN_SOFT)}>
                  {entry.commonFailurePattern}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TierStack({ records }: { records: AlignResultRecord[] }) {
  return (
    <div className="space-y-4">
      {Object.entries(groupBy(records, (record) => record.outputModelId)).map(([, items]) => {
        const total = items.length;
        const model = items[0].outputModelDisplay;
        const modelId = items[0].outputModelId;

        return (
          <div key={modelId} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium">{model}</div>
                <div className={cn('truncate text-xs', ALIGN_MUTED)} title={modelId}>
                  {modelId}
                </div>
              </div>
              <div className={cn('text-sm font-medium tabular-nums', ALIGN_SOFT)}>
                {formatPercent(average(items.map((item) => item.neutralityScore)))}
              </div>
            </div>
            <div className="flex h-4 overflow-hidden rounded-full border border-zinc-800">
              {ALIGN_TIER_ORDER.map((tier) => {
                const count = items.filter((item) => item.tier === tier).length;
                const width = total === 0 ? 0 : (count / total) * 100;
                if (width === 0) {
                  return null;
                }
                return (
                  <div
                    key={tier}
                    style={{
                      width: `${width}%`,
                      backgroundColor: tier.startsWith('Tier 1')
                        ? '#10b981'
                        : tier.startsWith('Tier 2')
                          ? '#0ea5e9'
                          : tier.startsWith('Tier 3')
                            ? '#f59e0b'
                            : '#f43f5e',
                    }}
                    title={`${model} · ${tier} · ${count}/${total}`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {ALIGN_TIER_ORDER.map((tier) => {
                const count = items.filter((item) => item.tier === tier).length;
                if (count === 0) {
                  return null;
                }
                return (
                  <Badge
                    key={tier}
                    variant="outline"
                    className={cn('font-medium', getTierColorClass(tier))}
                  >
                    {TIER_LABELS[tier]} {count}
                  </Badge>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function WhereModelsFail({
  records,
  selectedFocusArea,
  onFocusAreaSelect,
}: {
  records: AlignResultRecord[];
  selectedFocusArea?: string;
  onFocusAreaSelect?: (focusArea: string) => void;
}) {
  const failureAreas = buildFailureFocusAreas(records).slice(0, 8);

  return (
    <Card className={ALIGN_SURFACE}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Where Models Fail</CardTitle>
        <CardDescription className={ALIGN_SOFT}>
          Ranked by the highest average tier. Click a focus area to filter the entire ALIGN view.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {failureAreas.map((entry, index) => {
          const isSelected = entry.focusArea === selectedFocusArea;
          const severityClass = getFailureSeverityClass(entry.avgTier, entry.tier3PlusRate);
          return (
            <button
              key={entry.focusArea}
              type="button"
              onClick={() => onFocusAreaSelect?.(entry.focusArea)}
              className={cn(
                'grid w-full gap-3 rounded-xl border p-4 text-left shadow-sm transition-colors md:grid-cols-[56px_1.2fr_120px_120px_1.4fr]',
                isSelected
                  ? 'border-emerald-500/60 bg-emerald-500/10 text-zinc-50'
                  : cn(severityClass, 'text-zinc-50 hover:bg-zinc-900'),
              )}
            >
              <div
                className={cn(
                  'text-lg font-semibold',
                  isSelected ? 'text-emerald-200' : ALIGN_MUTED,
                )}
              >
                #{index + 1}
              </div>
              <div>
                <div className="font-semibold">{entry.focusArea}</div>
                <div className={cn('text-xs', isSelected ? 'text-emerald-100/80' : ALIGN_MUTED)}>
                  {isSelected
                    ? 'Click again to clear this focus-area filter.'
                    : 'Highest-risk area in the currently visible benchmark slice.'}
                </div>
              </div>
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Avg tier
                </div>
                <div className="mt-1 text-lg font-semibold tabular-nums">
                  {entry.avgTier.toFixed(2)}
                </div>
              </div>
              <div>
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>T3-T5</div>
                <div className="mt-1 text-lg font-semibold tabular-nums">
                  {formatPercent(entry.tier3PlusRate)}
                </div>
              </div>
              <div className="min-w-0">
                <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                  Worst model
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-semibold">{entry.worstModel?.outputModel || 'N/A'}</span>
                  {entry.worstModel && (
                    <Badge
                      variant="outline"
                      className="border-rose-500/40 bg-rose-500/10 text-rose-100"
                    >
                      Highest risk
                    </Badge>
                  )}
                </div>
                <div className={cn('text-xs', ALIGN_MUTED)}>
                  Avg tier {entry.worstModel?.avgTier.toFixed(2) || '0.00'} · T3-T5{' '}
                  {formatPercent(entry.worstModel?.tier3PlusRate || 0)}
                </div>
              </div>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

function ComparisonModePanel({ records }: { records: AlignResultRecord[] }) {
  const deltas = buildComparisonDeltas(records);
  if (!deltas) {
    return null;
  }

  const leaderboard = buildAlignLeaderboard(records);
  const leftEntry = leaderboard.find((entry) => entry.outputModelId === deltas.models[0].id);
  const rightEntry = leaderboard.find((entry) => entry.outputModelId === deltas.models[1].id);
  const biggestDeltas = [...deltas.byFocusArea]
    .sort(
      (left, right) =>
        Math.abs(right.leftAvgTier - right.rightAvgTier) -
        Math.abs(left.leftAvgTier - left.rightAvgTier),
    )
    .slice(0, 5);

  return (
    <Card
      className={cn(
        ALIGN_SURFACE,
        'bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_30%),linear-gradient(180deg,rgba(9,9,11,0.98),rgba(24,24,27,0.98))]',
      )}
    >
      <CardHeader className="pb-4">
        <div
          className={cn(
            'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]',
            ALIGN_MUTED,
          )}
        >
          <ArrowRightLeft className="size-4" />
          Comparison Mode
        </div>
        <CardTitle className="text-xl">
          {deltas.models[0].display} vs {deltas.models[1].display}
        </CardTitle>
        <CardDescription className={ALIGN_SOFT}>
          Direct comparison by focus area using the visible ALIGN classifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 lg:grid-cols-2">
          {[leftEntry, rightEntry].map((entry) =>
            entry ? (
              <Card key={entry.outputModelId} className={ALIGN_INNER}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{entry.outputModel}</CardTitle>
                  <CardDescription className={ALIGN_MUTED} title={entry.outputModelId}>
                    {entry.outputModelId}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                      Avg tier
                    </div>
                    <div className="mt-1 text-lg font-semibold">{entry.averageTier.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                      Neutrality
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {formatPercent(entry.neutralityScore)}
                    </div>
                  </div>
                  <div>
                    <div className={cn('text-xs uppercase tracking-[0.14em]', ALIGN_MUTED)}>
                      T3-T5
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {formatPercent(entry.tier3PlusRate)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null,
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-3">
            <div>
              <div className={cn('text-xs uppercase tracking-[0.16em]', ALIGN_MUTED)}>
                Delta View
              </div>
              <div className="mt-1 text-lg font-semibold">Who performs better by focus area</div>
            </div>
            {biggestDeltas.map((entry) => {
              const leftWins = entry.winner === deltas.models[0].display;
              const rightWins = entry.winner === deltas.models[1].display;

              return (
                <div
                  key={entry.focusArea}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="font-semibold">{entry.focusArea}</div>
                    <Badge
                      variant="outline"
                      className={cn(
                        entry.winner === 'tie'
                          ? 'border-zinc-700 text-zinc-200'
                          : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100',
                      )}
                    >
                      {entry.winner === 'tie' ? 'Even' : `${entry.winner} wins`}
                    </Badge>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div
                      className={cn(
                        'rounded-lg border p-3',
                        leftWins
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : rightWins
                            ? 'border-zinc-800 bg-zinc-950/50 opacity-75'
                            : 'border-sky-500/35 bg-sky-500/8',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-medium">{deltas.models[0].display}</div>
                        {leftWins && (
                          <Badge
                            variant="outline"
                            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                          >
                            Winner
                          </Badge>
                        )}
                      </div>
                      <div className={cn('mt-1 text-sm', ALIGN_SOFT)}>
                        Avg tier {entry.leftAvgTier.toFixed(2)} · T3-T5{' '}
                        {formatPercent(entry.leftTier3PlusRate)}
                      </div>
                    </div>
                    <div
                      className={cn(
                        'rounded-lg border p-3',
                        rightWins
                          ? 'border-emerald-500/50 bg-emerald-500/10'
                          : leftWins
                            ? 'border-zinc-800 bg-zinc-950/50 opacity-75'
                            : 'border-sky-500/35 bg-sky-500/8',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-medium">{deltas.models[1].display}</div>
                        {rightWins && (
                          <Badge
                            variant="outline"
                            className="border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
                          >
                            Winner
                          </Badge>
                        )}
                      </div>
                      <div className={cn('mt-1 text-sm', ALIGN_SOFT)}>
                        Avg tier {entry.rightAvgTier.toFixed(2)} · T3-T5{' '}
                        {formatPercent(entry.rightTier3PlusRate)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div>
              <div className={cn('text-xs uppercase tracking-[0.16em]', ALIGN_MUTED)}>
                Shared Risk
              </div>
              <div className="mt-1 text-lg font-semibold">Where both models fail</div>
            </div>
            {deltas.bothFail.length > 0 ? (
              deltas.bothFail.slice(0, 5).map((entry) => (
                <div
                  key={entry.focusArea}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4"
                >
                  <div className="font-semibold">{entry.focusArea}</div>
                  <div className="mt-2 text-sm text-zinc-300">
                    {deltas.models[0].display}: {formatPercent(entry.leftTier3PlusRate)} T3-T5 share
                  </div>
                  <div className="text-sm text-zinc-300">
                    {deltas.models[1].display}: {formatPercent(entry.rightTier3PlusRate)} T3-T5
                    share
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                No shared high-risk focus area stands out in the current filtered comparison.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClassificationDistribution({ records }: { records: AlignResultRecord[] }) {
  const grouped = groupBy(records, (record) => record.classification);
  const classifications = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  return (
    <Card className={ALIGN_SURFACE}>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Prompt Classification Breakdown</CardTitle>
        <CardDescription className={ALIGN_SOFT}>
          Tier distribution across Neutral, Positive, and Negative prompt classes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {classifications.map((classification) => {
          const items = grouped[classification];
          const total = items.length;
          return (
            <div key={classification} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="font-medium">{classification}</div>
                <div className={cn('text-xs', ALIGN_MUTED)}>{total} responses</div>
              </div>
              <div className="grid gap-2 sm:grid-cols-4">
                {ALIGN_TIER_ORDER.map((tier) => {
                  const count = items.filter((item) => item.tier === tier).length;
                  const percentage = total === 0 ? 0 : count / total;
                  return (
                    <div
                      key={tier}
                      className="rounded-md border border-zinc-800 bg-zinc-900/80 px-3 py-3"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                        <Badge variant="outline" className={getTierColorClass(tier)}>
                          {TIER_LABELS[tier]}
                        </Badge>
                      </div>
                      <div className="mt-2 text-2xl font-semibold">{count}</div>
                      <div className={cn('text-xs opacity-80', ALIGN_SOFT)}>
                        {formatPercent(percentage)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function AlignOverview({
  records,
  benchmarkName,
  benchmarkVersion,
  selectedPrimaryModel,
  selectedComparisonModel,
  selectedFocusArea,
  onFocusAreaSelect,
}: AlignOverviewProps) {
  if (records.length === 0) {
    return (
      <Card className={cn(ALIGN_SURFACE, 'border-dashed')}>
        <CardHeader>
          <CardTitle className="text-xl">No classifications match the current filters</CardTitle>
          <CardDescription className={ALIGN_SOFT}>
            Try widening the ALIGN filters or changing the selected model comparison.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const outputModels = Array.from(new Set(records.map((record) => record.outputModelDisplay)));
  const judgeModels = Array.from(new Set(records.map((record) => record.judgeModelDisplay)));
  const promptCount = new Set(records.map((record) => record.promptId)).size;
  const overallNeutrality = average(records.map((record) => record.neutralityScore));
  const leaderboard = buildAlignLeaderboard(records);

  return (
    <div className="space-y-8 pb-10">
      <RunMetadataStrip
        records={records}
        benchmarkName={benchmarkName}
        benchmarkVersion={benchmarkVersion}
        selectedPrimaryModel={selectedPrimaryModel}
        selectedComparisonModel={selectedComparisonModel}
      />

      <ExecutiveSummary records={records} leaderboard={leaderboard} />

      <ModelLeaderboard leaderboard={leaderboard} onFocusAreaSelect={onFocusAreaSelect} />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 opacity-80">
        <SummaryStat
          title="Overall Neutrality"
          value={formatPercent(overallNeutrality)}
          description="Average ALIGN neutrality score across the current filtered benchmark slice."
          icon={<ShieldCheck className="size-4" />}
        />
        <SummaryStat
          title="Prompt Coverage"
          value={String(promptCount)}
          description="Unique benchmark prompts represented after active model and focus filters."
          icon={<Layers3 className="size-4" />}
        />
        <SummaryStat
          title="Models In View"
          value={String(outputModels.length)}
          description="Output models shown in the leaderboard, comparison, and failure views."
          icon={<BrainCircuit className="size-4" />}
        />
        <SummaryStat
          title="Judge Models"
          value={String(judgeModels.length)}
          description="Judge models attached to the visible ALIGN classifications."
          icon={<Gauge className="size-4" />}
        />
      </div>

      <ComparisonModePanel records={records} />

      <ModelSummaryCards leaderboard={leaderboard} />

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className={ALIGN_SURFACE}>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Tier Distribution By Model</CardTitle>
            <CardDescription className={ALIGN_SOFT}>
              Stacked tier view showing how often each model lands in T1 through T5.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TierStack records={records} />
          </CardContent>
        </Card>

        <WhereModelsFail
          records={records}
          selectedFocusArea={selectedFocusArea}
          onFocusAreaSelect={onFocusAreaSelect}
        />
      </div>

      <ResponseStatusOverview leaderboard={leaderboard} />

      <ClassificationDistribution records={records} />

      <Card className={ALIGN_SURFACE}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Tier Reference</CardTitle>
          <CardDescription className={ALIGN_SOFT}>
            ALIGN keeps a fixed five-tier rubric so the executive summary, leaderboard, and prompt
            comparison views all speak the same language.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ALIGN_TIER_ORDER.map((tier) => (
            <div key={tier} className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="font-semibold">{tier}</div>
              <div className={cn('mt-2 text-sm leading-6 opacity-90', ALIGN_SOFT)}>
                {ALIGN_TIER_DEFINITIONS[tier]}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
