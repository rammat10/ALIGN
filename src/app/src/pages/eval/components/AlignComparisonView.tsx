import { useMemo, useState } from 'react';

import { Badge } from '@app/components/ui/badge';
import { Button } from '@app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@app/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@app/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@app/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';
import { cn } from '@app/lib/utils';
import { ChevronDown, ListChecks, MessageSquareText, ScrollText } from 'lucide-react';
import {
  ALIGN_TIER_DEFINITIONS,
  type AlignResultRecord,
  getTierColorClass,
} from './alignViewModel';

const ALIGN_SURFACE =
  'border-zinc-800 bg-zinc-950/95 text-zinc-50 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)]';
const ALIGN_CARD =
  'border-zinc-800 bg-zinc-900/85 text-zinc-50 shadow-[0_16px_48px_-32px_rgba(0,0,0,0.8)]';

function groupByPrompt(records: AlignResultRecord[]) {
  const grouped = new Map<string, AlignResultRecord[]>();

  records.forEach((record) => {
    const key = `${record.promptId}::${record.prompt}`;
    const existing = grouped.get(key) || [];
    existing.push(record);
    grouped.set(key, existing);
  });

  return Array.from(grouped.entries())
    .map(([key, items]) => ({
      key,
      promptId: items[0].promptId,
      prompt: items[0].prompt,
      classification: items[0].classification,
      focusArea: items[0].focusArea,
      items: [...items].sort((left, right) =>
        left.outputModelDisplay.localeCompare(right.outputModelDisplay),
      ),
    }))
    .sort((left, right) => {
      const leftNumber = Number(left.promptId);
      const rightNumber = Number(right.promptId);
      if (
        Number.isFinite(leftNumber) &&
        Number.isFinite(rightNumber) &&
        leftNumber !== rightNumber
      ) {
        return leftNumber - rightNumber;
      }
      return left.prompt.localeCompare(right.prompt);
    });
}

function splitReason(reason: string): string[] {
  const normalized = reason
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((part) => part.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean);

  return normalized.length > 0 ? normalized : [reason];
}

function buildAuditBullets(record: AlignResultRecord): string[] {
  const bullets = splitReason(record.reason);
  const tierDefinition =
    ALIGN_TIER_DEFINITIONS[record.tier as keyof typeof ALIGN_TIER_DEFINITIONS] ||
    'This classification follows the ALIGN five-tier rubric.';

  return [
    `Rubric placement: ${record.tier} means ${tierDefinition}`,
    `Judge conclusion: ${bullets[0] || 'The stored ALIGN reason did not include a detailed explanation.'}`,
    bullets[1]
      ? `Supporting signal: ${bullets[1]}`
      : `Rubric logic: The response was placed in ${record.tier} because the judge identified evidence consistent with the stored ALIGN label.`,
  ];
}

function ComparisonCard({ record }: { record: AlignResultRecord }) {
  const [reasonOpen, setReasonOpen] = useState(false);
  const [responseOpen, setResponseOpen] = useState(false);
  const [rubricOpen, setRubricOpen] = useState(false);
  const auditBullets = buildAuditBullets(record);
  const extraReason = splitReason(record.reason).slice(2);

  return (
    <>
      <Card className={ALIGN_CARD}>
        <CardHeader className="space-y-4 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <CardDescription className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                ALIGN Classification
              </CardDescription>
              <CardTitle className="text-xl">{record.outputModelDisplay}</CardTitle>
              <CardDescription className="text-zinc-500" title={record.outputModelId}>
                {record.outputModelId}
              </CardDescription>
            </div>
            <Badge variant="outline" className={cn('font-medium', getTierColorClass(record.tier))}>
              {record.tier}
            </Badge>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                Audit Explanation
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50"
                    onClick={() => setRubricOpen(true)}
                  >
                    <ScrollText className="size-4" />
                    View rubric
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Open the rubric used to interpret this classification.
                </TooltipContent>
              </Tooltip>
            </div>

            <ul className="space-y-3 text-sm leading-6 text-zinc-100">
              {auditBullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-300 opacity-80" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{record.label}</Badge>
            <Badge variant="secondary">
              Neutrality {(record.neutralityScore * 100).toFixed(0)}%
            </Badge>
            <Badge variant="secondary">Response {record.responseStatus}</Badge>
            <Badge variant="secondary" title={record.judgeModelId}>
              Judge {record.judgeModelDisplay}
            </Badge>
            {record.responseSignals.includes('language_drift') ? (
              <Badge variant="secondary">Language drift</Badge>
            ) : null}
          </div>

          <Collapsible open={reasonOpen} onOpenChange={setReasonOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-zinc-800 bg-zinc-950/70 text-zinc-100 hover:bg-zinc-900"
              >
                <span className="inline-flex items-center gap-2">
                  <ListChecks className="size-4" />
                  Full audit reasoning
                </span>
                <ChevronDown
                  className={cn('size-4 transition-transform', reasonOpen && 'rotate-180')}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm leading-6 text-zinc-200">
                <p>
                  <span className="font-medium text-zinc-50">Stored judge reason:</span>{' '}
                  {record.reason}
                </p>
                {record.nativeFinishReason || record.providerErrorMessage ? (
                  <p className="mt-3 text-zinc-400">
                    <span className="font-medium text-zinc-50">Response evidence:</span>{' '}
                    {[record.nativeFinishReason, record.providerErrorMessage]
                      .filter(Boolean)
                      .join(' • ')}
                  </p>
                ) : null}
                {extraReason.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {extraReason.map((detail) => (
                      <p key={detail} className="text-zinc-400">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={responseOpen} onOpenChange={setResponseOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between border-zinc-800 bg-zinc-950/70 text-zinc-100 hover:bg-zinc-900"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquareText className="size-4" />
                  Raw model response
                </span>
                <ChevronDown
                  className={cn('size-4 transition-transform', responseOpen && 'rotate-180')}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-3">
              <pre className="max-h-80 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-xs leading-6 whitespace-pre-wrap text-zinc-200">
                {record.rawOutput}
              </pre>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Dialog open={rubricOpen} onOpenChange={setRubricOpen}>
        <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950 text-zinc-50">
          <DialogHeader>
            <DialogTitle>ALIGN Tier Rubric</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {Object.entries(ALIGN_TIER_DEFINITIONS).map(([tier, definition]) => (
              <div key={tier} className="rounded-xl border border-zinc-800 bg-zinc-900/85 p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getTierColorClass(tier)}>
                    {tier}
                  </Badge>
                </div>
                <div className="mt-3 text-sm leading-6 text-zinc-300">{definition}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AlignComparisonView({ records }: { records: AlignResultRecord[] }) {
  const promptGroups = useMemo(() => groupByPrompt(records), [records]);

  if (promptGroups.length === 0) {
    return (
      <Card className={cn(ALIGN_SURFACE, 'border-dashed')}>
        <CardHeader>
          <CardTitle className="text-xl">No prompt comparisons match the current filters</CardTitle>
          <CardDescription className="text-zinc-300">
            Clear or widen the ALIGN filters to restore side-by-side model comparison.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {promptGroups.map((group) => (
        <Card
          key={group.key}
          className={cn(
            ALIGN_SURFACE,
            'overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.10),_transparent_28%),linear-gradient(180deg,rgba(9,9,11,0.98),rgba(24,24,27,0.98))]',
          )}
        >
          <CardHeader className="border-b border-zinc-800 pb-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Prompt {group.promptId}</Badge>
              <Badge variant="secondary">{group.classification}</Badge>
              <Badge variant="secondary">{group.focusArea}</Badge>
            </div>
            <CardTitle className="text-2xl leading-9">{group.prompt}</CardTitle>
            <CardDescription className="text-zinc-300">
              Tier decision first, supporting reasoning second, raw output on demand.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map((record) => (
              <ComparisonCard key={record.id} record={record} />
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
