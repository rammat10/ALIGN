import React from 'react';

import { Alert, AlertContent, AlertDescription, AlertTitle } from '@app/components/ui/alert';
import { Badge } from '@app/components/ui/badge';
import { Button } from '@app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog';
import { DropdownMenuItem } from '@app/components/ui/dropdown-menu';
import { SearchInput } from '@app/components/ui/search-input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@app/components/ui/select';
import { Separator } from '@app/components/ui/separator';
import { Spinner } from '@app/components/ui/spinner';
import { Tabs, TabsList, TabsTrigger } from '@app/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@app/components/ui/tooltip';
import { IS_RUNNING_LOCALLY } from '@app/constants';
import { EVAL_ROUTES, ROUTES } from '@app/constants/routes';
import { useToast } from '@app/hooks/useToast';
import { useStore as useMainStore } from '@app/stores/evalConfig';
import { callApi } from '@app/utils/api';
import { displayNameOverrides } from '@promptfoo/redteam/constants/metadata';
import { formatPolicyIdentifierAsMetric } from '@promptfoo/redteam/plugins/policy/utils';
import invariant from '@promptfoo/util/invariant';
import { BarChart, Copy, Edit, Eye, Play, Settings, Share, Target, Trash2, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { AlignAboutView } from './AlignAboutView';
import { AlignComparisonView } from './AlignComparisonView';
import { AlignOverview } from './AlignOverview';
import {
  ALIGN_TIER_DEFINITIONS,
  ALIGN_TIER_ORDER,
  type AlignFilters,
  buildAlignResultRecords,
  filterAlignRecords,
  getAlignFilterOptions,
  getModelDisplayName,
  getTierColorClass,
} from './alignViewModel';
import { ColumnSelector } from './ColumnSelector';
import CompareEvalMenuItem from './CompareEvalMenuItem';
import ConfigModal from './ConfigModal';
import { ConfirmEvalNameDialog } from './ConfirmEvalNameDialog';
import { DownloadDialog, DownloadMenuItem } from './DownloadMenu';
import EvalHeader from './EvalHeader';
import EvalSelectorDialog from './EvalSelectorDialog';
import { FilterChips } from './FilterChips';
import { useFilterMode } from './FilterModeProvider';
import { FilterModeSelector } from './FilterModeSelector';
import { HiddenColumnChips } from './HiddenColumnChips';
import ResultsCharts from './ResultsCharts';
import FiltersForm from './ResultsFilters/FiltersForm';
import ResultsTable from './ResultsTable';
import ShareModal from './ShareModal';
import { useResultsViewSettingsStore, useTableStore } from './store';
import SettingsModal from './TableSettings/TableSettingsModal';
import { hashVarSchema } from './utils';
import type { EvalResultsFilterMode, ResultLightweightWithLabel } from '@promptfoo/types';
import type { CopyEvalResponse } from '@promptfoo/types/api/eval';
import type { VisibilityState } from '@tanstack/table-core';

import type { ActiveView } from './EvalHeader';
import type { ResultsFilter } from './store';

const Report = React.lazy(() => import('@app/pages/redteam/report/components/Report'));
type AlignSurface = 'overview' | 'comparison' | 'about' | 'audit';
type AlignModelScope = {
  primaryModel: string;
  comparisonModel: string;
};

interface ResultsViewProps {
  recentEvals: ResultLightweightWithLabel[];
  onRecentEvalSelected: (file: string) => void;
  defaultEvalId?: string;
}

interface ResultsChartsSectionProps {
  canRenderResultsCharts: boolean;
  isRedteamEval: boolean;
  resultsChartsScores: number[];
  resultsChartsUnavailableReasons: string[];
  children: (toggleButton: React.ReactNode) => React.ReactNode;
}

interface AppliedFilterBadgesProps {
  filters: ResultsFilter[];
  isRedteamEval: boolean;
  onRemoveFilter: (id: string) => void;
  policyIdToNameMap?: Record<string, string | undefined>;
}

function getAppliedFilterLabel(
  filter: ResultsFilter,
  policyIdToNameMap?: Record<string, string | undefined>,
): string | null {
  if (filter.type === 'metadata' && filter.operator === 'exists') {
    return filter.field ? `Metadata: ${filter.field}` : null;
  }

  if (filter.type === 'metric' && filter.operator === 'is_defined') {
    return filter.field ? `Metric: ${filter.field}` : null;
  }

  if (filter.type === 'metadata' || filter.type === 'metric') {
    if (!filter.value || !filter.field) {
      return null;
    }
  } else if (!filter.value) {
    return null;
  }

  const truncatedValue =
    filter.value.length > 50 ? `${filter.value.slice(0, 50)}...` : filter.value;

  if (filter.type === 'metric') {
    const operatorSymbols: Record<string, string> = {
      is_defined: 'is defined',
      eq: '==',
      neq: '!=',
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
    };
    const operatorDisplay = operatorSymbols[filter.operator] || filter.operator;
    return `${filter.field} ${operatorDisplay} ${truncatedValue}`;
  }

  if (filter.type === 'plugin') {
    const displayName =
      displayNameOverrides[filter.value as keyof typeof displayNameOverrides] || filter.value;
    return filter.operator === 'not_equals' ? `Plugin != ${displayName}` : `Plugin: ${displayName}`;
  }

  if (filter.type === 'strategy') {
    const displayName =
      displayNameOverrides[filter.value as keyof typeof displayNameOverrides] || filter.value;
    return `Strategy: ${displayName}`;
  }

  if (filter.type === 'severity') {
    return `Severity: ${filter.value.charAt(0).toUpperCase() + filter.value.slice(1)}`;
  }

  if (filter.type === 'policy') {
    return formatPolicyIdentifierAsMetric(policyIdToNameMap?.[filter.value] ?? filter.value);
  }

  return `${filter.field} ${filter.operator.replace('_', ' ')} "${truncatedValue}"`;
}

function AppliedFilterBadges({
  filters,
  isRedteamEval,
  onRemoveFilter,
  policyIdToNameMap,
}: AppliedFilterBadgesProps) {
  return filters.map((filter) => {
    if (isRedteamEval && filter.type === 'metric' && filter.operator === 'is_defined') {
      return null;
    }

    const label = getAppliedFilterLabel(filter, policyIdToNameMap);
    if (!label) {
      return null;
    }

    return (
      <Badge key={filter.id} variant="secondary" className="text-xs h-5 gap-1" title={filter.value}>
        {label}
        <button
          type="button"
          onClick={() => onRemoveFilter(filter.id)}
          className="ml-1 hover:bg-muted rounded-full"
        >
          <X className="size-3" />
        </button>
      </Badge>
    );
  });
}

function ResultsChartsSection({
  canRenderResultsCharts,
  isRedteamEval,
  resultsChartsScores,
  resultsChartsUnavailableReasons,
  children,
}: ResultsChartsSectionProps) {
  const [renderResultsCharts, setRenderResultsCharts] = React.useState(
    !isRedteamEval && window.innerHeight >= 1100 && canRenderResultsCharts,
  );

  if (isRedteamEval) {
    return null;
  }

  const toggleButton = (
    <Button variant="ghost" size="sm" onClick={() => setRenderResultsCharts((prev) => !prev)}>
      <BarChart className="size-4 mr-2" />
      {renderResultsCharts ? 'Hide Charts' : 'Show Charts'}
    </Button>
  );

  return (
    <>
      {children(toggleButton)}
      <div
        aria-hidden={!renderResultsCharts}
        className="overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none"
        style={{
          maxHeight: renderResultsCharts ? '1200px' : '0px',
          opacity: renderResultsCharts ? 1 : 0,
          transform: renderResultsCharts ? 'translateY(0)' : 'translateY(-4px)',
          pointerEvents: renderResultsCharts ? 'auto' : 'none',
        }}
      >
        {renderResultsCharts &&
          (canRenderResultsCharts ? (
            <ResultsCharts scores={resultsChartsScores} />
          ) : (
            <Alert variant="info" className="mt-4 items-start">
              <BarChart className="size-4 mt-0.5" />
              <AlertContent>
                <AlertTitle>Charts are unavailable for this evaluation</AlertTitle>
                <AlertDescription className="space-y-3">
                  <p>
                    We can show charts when the results include comparable prompts and chartable
                    scores.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {resultsChartsUnavailableReasons.map((reason) => (
                      <li key={reason}>{reason}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </AlertContent>
            </Alert>
          ))}
      </div>
    </>
  );
}

function AlignTierLegend() {
  return (
    <div className="flex flex-wrap gap-2 rounded-xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 text-zinc-100 shadow-sm">
      <div className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
        Tier legend
      </div>
      {ALIGN_TIER_ORDER.map((tier) => (
        <Tooltip key={tier}>
          <TooltipTrigger asChild>
            <Badge variant="outline" className={getTierColorClass(tier)}>
              {tier}
            </Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">{ALIGN_TIER_DEFINITIONS[tier]}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}

interface AlignActiveFiltersBarProps {
  alignFilters: AlignFilters;
  alignModelScope: AlignModelScope;
  primaryModelDisplay?: string;
  comparisonModelDisplay?: string;
  onRemove: (
    key:
      | 'searchText'
      | 'outputModel'
      | 'judgeModel'
      | 'promptClassification'
      | 'focusArea'
      | 'tier'
      | 'responseStatus'
      | 'primaryModel'
      | 'comparisonModel',
  ) => void;
  onClearAll: () => void;
}

function AlignActiveFiltersBar({
  alignFilters,
  alignModelScope,
  primaryModelDisplay,
  comparisonModelDisplay,
  onRemove,
  onClearAll,
}: AlignActiveFiltersBarProps) {
  const chips = [
    alignModelScope.primaryModel === 'all'
      ? null
      : {
          key: 'primaryModel' as const,
          label: `Model: ${primaryModelDisplay || alignModelScope.primaryModel}`,
        },
    alignModelScope.comparisonModel === 'none'
      ? null
      : {
          key: 'comparisonModel' as const,
          label: `Compare: ${comparisonModelDisplay || alignModelScope.comparisonModel}`,
        },
    alignFilters.outputModel === 'all'
      ? null
      : { key: 'outputModel' as const, label: `Output: ${alignFilters.outputModel}` },
    alignFilters.judgeModel === 'all'
      ? null
      : { key: 'judgeModel' as const, label: `Judge: ${alignFilters.judgeModel}` },
    alignFilters.promptClassification === 'all'
      ? null
      : {
          key: 'promptClassification' as const,
          label: `Prompt class: ${alignFilters.promptClassification}`,
        },
    alignFilters.focusArea === 'all'
      ? null
      : { key: 'focusArea' as const, label: `Focus area: ${alignFilters.focusArea}` },
    alignFilters.tier === 'all'
      ? null
      : { key: 'tier' as const, label: `Tier: ${alignFilters.tier}` },
    alignFilters.responseStatus === 'all'
      ? null
      : { key: 'responseStatus' as const, label: `Response: ${alignFilters.responseStatus}` },
    alignFilters.searchText.trim()
      ? { key: 'searchText' as const, label: `Search: ${alignFilters.searchText.trim()}` }
      : null,
  ].filter(
    (
      chip,
    ): chip is {
      key:
        | 'searchText'
        | 'outputModel'
        | 'judgeModel'
        | 'promptClassification'
        | 'focusArea'
        | 'tier'
        | 'responseStatus'
        | 'primaryModel'
        | 'comparisonModel';
      label: string;
    } => chip !== null,
  );

  if (chips.length === 0) {
    return (
      <div className="sticky top-2 z-20 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 text-zinc-100 shadow-lg backdrop-blur">
        <div className="text-sm text-zinc-400">
          No active ALIGN filters. Showing the default dashboard view.
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-2 z-20 flex flex-wrap items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/95 px-3 py-3 text-zinc-100 shadow-lg backdrop-blur">
      <div className="mr-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
        Active filters
      </div>
      {chips.map((chip) => (
        <Badge key={chip.key} variant="secondary" className="gap-1 text-xs">
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            className="rounded-full hover:bg-muted"
          >
            <X className="size-3" />
          </button>
        </Badge>
      ))}
      <div className="flex-1" />
      <Button variant="ghost" size="sm" onClick={onClearAll}>
        Clear all filters
      </Button>
    </div>
  );
}

export default function ResultsView({
  recentEvals,
  onRecentEvalSelected,
  defaultEvalId,
}: ResultsViewProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    table,

    config,
    setConfig,
    evalId,
    totalResultsCount,
    highlightedResultsCount,
    userRatedResultsCount,
    filters,
    removeFilter,
  } = useTableStore();

  const { filterMode, setFilterMode } = useFilterMode();

  const {
    setInComparisonMode,
    columnStates,
    setColumnState,
    maxTextLength,
    wordBreak,
    showInferenceDetails,
    comparisonEvalIds,
    setComparisonEvalIds,
    hiddenVarNamesBySchema,
    setHiddenVarNamesForSchema,
  } = useResultsViewSettingsStore();

  const { updateConfig } = useMainStore();

  const { showToast } = useToast();
  const initialSearchText = searchParams.get('search') || '';
  const [searchInputValue, setSearchInputValue] = React.useState(initialSearchText); // local, for responsive input
  const [debouncedSearchText, setDebouncedSearchText] = React.useState(initialSearchText); // debounced, for table/URL/pill

  // Debounced update for URL, table, and pill
  const debouncedUpdate = useDebouncedCallback((text: string) => {
    setDebouncedSearchText(text);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (text) {
          next.set('search', text);
        } else {
          next.delete('search');
        }
        return next;
      },
      { replace: true },
    );
  }, 300);

  const handleClearSearch = () => {
    setSearchInputValue('');
    debouncedUpdate.cancel();
    setDebouncedSearchText('');
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('search');
        return next;
      },
      { replace: true },
    );
  };

  const [failureFilter, setFailureFilter] = React.useState<{ [key: string]: boolean }>({});
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional
  const handleFailureFilterToggle = React.useCallback(
    (columnId: string, checked: boolean) => {
      setFailureFilter((prevFailureFilter) => ({ ...prevFailureFilter, [columnId]: checked }));
    },
    [setFailureFilter],
  );

  const viewParam = searchParams.get('view');
  const activeView: ActiveView = viewParam === 'report' ? 'report' : 'results';
  const setActiveView = React.useCallback(
    (view: ActiveView) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (view === 'results') {
            next.delete('view');
          } else {
            next.set('view', view);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );
  const [reportActions, setReportActions] = React.useState<React.ReactNode>(null);

  invariant(table, 'Table data must be loaded before rendering ResultsView');
  const { head } = table;
  const currentEvalId = evalId || defaultEvalId || 'default';
  const validEvalId = evalId || defaultEvalId;
  const currentEvalData = React.useMemo(
    () => recentEvals.find((e) => e.evalId === evalId),
    [recentEvals, evalId],
  );

  const alignRecords = React.useMemo(
    () =>
      buildAlignResultRecords({
        table,
        evalId: currentEvalId,
        timestamp: currentEvalData?.createdAt == null ? null : String(currentEvalData.createdAt),
      }),
    [table, currentEvalId, currentEvalData?.createdAt],
  );
  const hasAlignResults = alignRecords.length > 0;

  const surfaceParam = searchParams.get('surface');
  const activeAlignSurface: AlignSurface =
    surfaceParam === 'comparison' || surfaceParam === 'audit' || surfaceParam === 'about'
      ? surfaceParam
      : hasAlignResults
        ? 'overview'
        : 'audit';
  const setActiveAlignSurface = React.useCallback(
    (surface: AlignSurface) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (surface === 'overview') {
            next.delete('surface');
          } else {
            next.set('surface', surface);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const [alignFilters, setAlignFilters] = React.useState<AlignFilters>({
    searchText: '',
    outputModel: 'all',
    judgeModel: 'all',
    promptClassification: 'all',
    focusArea: 'all',
    tier: 'all',
    responseStatus: 'all',
  });
  const [alignModelScope, setAlignModelScope] = React.useState<AlignModelScope>({
    primaryModel: 'all',
    comparisonModel: 'none',
  });

  const alignFilterOptions = React.useMemo(
    () => getAlignFilterOptions(alignRecords),
    [alignRecords],
  );
  const alignModelOptions = React.useMemo(
    () =>
      Array.from(
        new Set(
          alignRecords.map((record) =>
            JSON.stringify({ id: record.outputModelId, display: record.outputModelDisplay }),
          ),
        ),
      )
        .map((value) => JSON.parse(value) as { id: string; display: string })
        .sort((left, right) => left.display.localeCompare(right.display)),
    [alignRecords],
  );
  const scopedAlignRecords = React.useMemo(() => {
    if (alignModelScope.primaryModel === 'all') {
      return alignRecords;
    }

    const allowed = new Set([alignModelScope.primaryModel]);
    if (
      alignModelScope.comparisonModel !== 'none' &&
      alignModelScope.comparisonModel !== alignModelScope.primaryModel
    ) {
      allowed.add(alignModelScope.comparisonModel);
    }

    return alignRecords.filter((record) => allowed.has(record.outputModelId));
  }, [alignRecords, alignModelScope]);
  const filteredAlignRecords = React.useMemo(
    () => filterAlignRecords(scopedAlignRecords, alignFilters),
    [scopedAlignRecords, alignFilters],
  );

  React.useEffect(() => {
    setAlignFilters((prev) => ({
      ...prev,
      outputModel:
        prev.outputModel === 'all' || alignFilterOptions.outputModels.includes(prev.outputModel)
          ? prev.outputModel
          : 'all',
      judgeModel:
        prev.judgeModel === 'all' || alignFilterOptions.judgeModels.includes(prev.judgeModel)
          ? prev.judgeModel
          : 'all',
      promptClassification:
        prev.promptClassification === 'all' ||
        alignFilterOptions.promptClassifications.includes(prev.promptClassification)
          ? prev.promptClassification
          : 'all',
      focusArea:
        prev.focusArea === 'all' || alignFilterOptions.focusAreas.includes(prev.focusArea)
          ? prev.focusArea
          : 'all',
      tier: prev.tier === 'all' || alignFilterOptions.tiers.includes(prev.tier) ? prev.tier : 'all',
      responseStatus:
        prev.responseStatus === 'all' ||
        alignFilterOptions.responseStatuses.includes(prev.responseStatus)
          ? prev.responseStatus
          : 'all',
    }));
  }, [alignFilterOptions]);

  React.useEffect(() => {
    setAlignModelScope((prev) => {
      if (prev.primaryModel === 'all') {
        return { ...prev, comparisonModel: 'none' };
      }

      const knownModelIds = new Set(alignModelOptions.map((option) => option.id));
      return {
        primaryModel: knownModelIds.has(prev.primaryModel) ? prev.primaryModel : 'all',
        comparisonModel:
          prev.comparisonModel === 'none' || knownModelIds.has(prev.comparisonModel)
            ? prev.comparisonModel
            : 'none',
      };
    });
  }, [alignModelOptions]);

  const benchmarkName = React.useMemo(
    () => config?.description || 'ALIGN Benchmark',
    [config?.description],
  );
  const benchmarkVersion = React.useMemo(() => {
    const versionCandidate =
      (config?.metadata as { benchmarkVersion?: string; version?: string } | undefined)
        ?.benchmarkVersion ||
      (config?.metadata as { benchmarkVersion?: string; version?: string } | undefined)?.version ||
      config?.tags?.benchmarkVersion ||
      config?.tags?.version ||
      null;

    return versionCandidate ? String(versionCandidate) : null;
  }, [config?.metadata, config?.tags]);

  const selectedPrimaryModelDisplay = React.useMemo(() => {
    if (alignModelScope.primaryModel === 'all') {
      return undefined;
    }
    return (
      alignModelOptions.find((option) => option.id === alignModelScope.primaryModel)?.display ||
      getModelDisplayName(alignModelScope.primaryModel)
    );
  }, [alignModelOptions, alignModelScope.primaryModel]);

  const selectedComparisonModelDisplay = React.useMemo(() => {
    if (alignModelScope.comparisonModel === 'none') {
      return undefined;
    }
    return (
      alignModelOptions.find((option) => option.id === alignModelScope.comparisonModel)?.display ||
      getModelDisplayName(alignModelScope.comparisonModel)
    );
  }, [alignModelOptions, alignModelScope.comparisonModel]);

  const handleAlignFocusAreaSelect = React.useCallback((focusArea: string) => {
    setAlignFilters((prev) => ({
      ...prev,
      focusArea: prev.focusArea === focusArea ? 'all' : focusArea,
    }));
  }, []);

  const handleRemoveAlignFilter = React.useCallback(
    (
      key:
        | 'searchText'
        | 'outputModel'
        | 'judgeModel'
        | 'promptClassification'
        | 'focusArea'
        | 'tier'
        | 'responseStatus'
        | 'primaryModel'
        | 'comparisonModel',
    ) => {
      if (key === 'primaryModel') {
        setAlignModelScope({ primaryModel: 'all', comparisonModel: 'none' });
        return;
      }

      if (key === 'comparisonModel') {
        setAlignModelScope((prev) => ({ ...prev, comparisonModel: 'none' }));
        return;
      }

      setAlignFilters((prev) => ({
        ...prev,
        [key]: key === 'searchText' ? '' : 'all',
      }));
    },
    [],
  );

  const handleClearAllAlignFilters = React.useCallback(() => {
    setAlignModelScope({ primaryModel: 'all', comparisonModel: 'none' });
    setAlignFilters({
      searchText: '',
      outputModel: 'all',
      judgeModel: 'all',
      promptClassification: 'all',
      focusArea: 'all',
      tier: 'all',
      responseStatus: 'all',
    });
  }, []);

  const handleFilterModeChange = (mode: EvalResultsFilterMode) => {
    setFilterMode(mode);

    const newFailureFilter: { [key: string]: boolean } = {};
    head.prompts.forEach((_, idx) => {
      const columnId = `Prompt ${idx + 1}`;
      newFailureFilter[columnId] = mode === 'failures';
    });
    setFailureFilter(newFailureFilter);
  };

  const [shareModalOpen, setShareModalOpen] = React.useState(false);
  const [shareLoading, setShareLoading] = React.useState(false);

  // State for compare eval dialog
  const [compareDialogOpen, setCompareDialogOpen] = React.useState(false);

  // State for download dialog
  const [downloadDialogOpen, setDownloadDialogOpen] = React.useState(false);

  const handleShareButtonClick = async () => {
    if (IS_RUNNING_LOCALLY) {
      setShareLoading(true);
      setShareModalOpen(true);
    } else {
      // For non-local instances, just show the modal
      setShareModalOpen(true);
    }
  };

  const handleShare = async (id: string): Promise<string> => {
    try {
      if (!IS_RUNNING_LOCALLY) {
        // For non-local instances, include base path in the URL
        const basePath = import.meta.env.VITE_PUBLIC_BASENAME || '';
        return `${window.location.host}${basePath}${EVAL_ROUTES.DETAIL(id)}`;
      }

      const response = await callApi('/results/share', {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to generate share URL');
      }
      const { url } = await response.json();
      return url;
    } catch (error) {
      console.error('Failed to generate share URL:', error);
      throw error;
    } finally {
      setShareLoading(false);
    }
  };

  const handleComparisonEvalSelected = async (compareEvalId: string) => {
    // Prevent self-comparison
    if (compareEvalId === currentEvalId) {
      setCompareDialogOpen(false);
      return;
    }
    setInComparisonMode(true);
    setComparisonEvalIds([...comparisonEvalIds, compareEvalId]);
    setCompareDialogOpen(false);
  };

  const hasAnyDescriptions = React.useMemo(
    () => table.body?.some((row) => row.description),
    [table.body],
  );

  const promptOptions = head.prompts.map((prompt, idx) => {
    const label = prompt.label || prompt.display || prompt.raw;
    const provider = prompt.provider || 'unknown';
    const displayLabel = [
      label && `"${label.slice(0, 60)}${label.length > 60 ? '...' : ''}"`,
      provider && `[${provider}]`,
    ]
      .filter(Boolean)
      .join(' ');

    return {
      value: `Prompt ${idx + 1}`,
      label: displayLabel,
      description: label,
      group: 'Outputs',
    };
  });

  const columnData = React.useMemo(() => {
    return [
      ...(hasAnyDescriptions ? [{ value: 'description', label: 'Description' }] : []),
      ...head.vars.map((_, idx) => ({
        value: `Variable ${idx + 1}`,
        label: `Var ${idx + 1}: ${
          head.vars[idx].length > 100 ? head.vars[idx].slice(0, 97) + '...' : head.vars[idx]
        }`,
        group: 'Variables',
      })),
      ...promptOptions,
    ];
  }, [head.vars, promptOptions, hasAnyDescriptions]);

  const [configModalOpen, setConfigModalOpen] = React.useState(false);
  const [viewSettingsModalOpen, setViewSettingsModalOpen] = React.useState(false);
  const [editNameDialogOpen, setEditNameDialogOpen] = React.useState(false);
  const [copyDialogOpen, setCopyDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const allColumns = React.useMemo(
    () => [
      ...(hasAnyDescriptions ? ['description'] : []),
      ...head.vars.map((_, idx) => `Variable ${idx + 1}`),
      ...head.prompts.map((_, idx) => `Prompt ${idx + 1}`),
    ],
    [hasAnyDescriptions, head.vars, head.prompts],
  );

  const getVarNameFromColumnId = React.useCallback(
    (columnId: string): string | null => {
      const match = columnId.match(/^Variable (\d+)$/);
      if (match) {
        const varIndex = parseInt(match[1], 10) - 1;
        return head.vars[varIndex] ?? null;
      }
      return null;
    },
    [head.vars],
  );

  const schemaHash = React.useMemo(() => hashVarSchema(head.vars), [head.vars]);

  const hiddenVarNames = React.useMemo(
    () => hiddenVarNamesBySchema[schemaHash] ?? [],
    [hiddenVarNamesBySchema, schemaHash],
  );

  const currentColumnState = React.useMemo(() => {
    const savedState = columnStates[currentEvalId];
    const columnVisibility: VisibilityState = {};
    const selectedColumns: string[] = [];

    allColumns.forEach((col) => {
      const varName = getVarNameFromColumnId(col);
      if (varName === null) {
        // Non-variable columns (description, prompts): use per-eval state, default to visible
        const isVisible = savedState?.columnVisibility[col] ?? true;
        columnVisibility[col] = isVisible;
        if (isVisible) {
          selectedColumns.push(col);
        }
      } else {
        const isHidden = hiddenVarNames.includes(varName);
        columnVisibility[col] = !isHidden;
        if (!isHidden) {
          selectedColumns.push(col);
        }
      }
    });

    return { selectedColumns, columnVisibility };
  }, [allColumns, getVarNameFromColumnId, hiddenVarNames, columnStates, currentEvalId]);

  const visiblePromptCount = React.useMemo(
    () =>
      head.prompts.filter(
        (_, idx) => currentColumnState.columnVisibility[`Prompt ${idx + 1}`] !== false,
      ).length,
    [head.prompts, currentColumnState.columnVisibility],
  );

  const updateColumnVisibility = React.useCallback(
    (columns: string[]) => {
      const newHiddenVarNames: string[] = [];

      allColumns.forEach((col) => {
        const varName = getVarNameFromColumnId(col);
        if (varName !== null) {
          const isVisible = columns.includes(col);
          if (!isVisible) {
            newHiddenVarNames.push(varName);
          }
        }
      });

      setHiddenVarNamesForSchema(schemaHash, newHiddenVarNames);

      const newColumnVisibility: VisibilityState = {};
      allColumns.forEach((col) => {
        newColumnVisibility[col] = columns.includes(col);
      });
      setColumnState(currentEvalId, {
        selectedColumns: columns,
        columnVisibility: newColumnVisibility,
      });
    },
    [
      allColumns,
      getVarNameFromColumnId,
      schemaHash,
      setHiddenVarNamesForSchema,
      setColumnState,
      currentEvalId,
    ],
  );

  const handleChange = React.useCallback(
    (newSelectedColumns: string[]) => {
      updateColumnVisibility(newSelectedColumns);
    },
    [updateColumnVisibility],
  );

  const handleSaveEvalName = React.useCallback(
    async (newName: string) => {
      try {
        invariant(config, 'Config must be loaded before updating its description');
        const newConfig = { ...config, description: newName };

        const response = await callApi(`/eval/${evalId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ config: newConfig }),
        });

        if (!response.ok) {
          throw new Error('Failed to update eval name');
        }

        setConfig(newConfig);
      } catch (error) {
        console.error('Failed to update eval name:', error);
        showToast(
          `Failed to update eval name: ${error instanceof Error ? error.message : 'Unknown error'}`,
          'error',
        );
        throw error;
      }
    },
    [config, evalId, setConfig, showToast],
  );

  const handleCopyEval = React.useCallback(
    async (description: string) => {
      try {
        invariant(evalId, 'Eval ID must be set before copying');

        const response = await callApi(`/eval/${evalId}/copy`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        });

        if (!response.ok) {
          throw new Error('Failed to copy evaluation');
        }

        const { id: newEvalId, distinctTestCount }: CopyEvalResponse = await response.json();

        // Open in new tab (Google Docs pattern)
        window.open(EVAL_ROUTES.DETAIL(newEvalId), '_blank');

        // Show success toast
        showToast(`Copied ${distinctTestCount.toLocaleString()} results successfully`, 'success');
      } catch (error) {
        console.error('Failed to copy evaluation:', error);
        showToast(
          `Failed to copy evaluation: ${error instanceof Error ? error.message : 'Unknown error'}`,
          'error',
        );
        throw error;
      }
    },
    [evalId, showToast],
  );

  /**
   * Determines the next eval to navigate to after deleting the current one
   * @returns The eval ID to navigate to, or null to go home
   */
  const getNextEvalAfterDelete = (): string | null => {
    if (!evalId || recentEvals.length === 0) {
      return null;
    }

    const currentIndex = recentEvals.findIndex((e) => e.evalId === evalId);

    // If current eval not in list or only one eval, go home
    if (currentIndex === -1 || recentEvals.length === 1) {
      return null;
    }

    // Try next eval first
    if (currentIndex < recentEvals.length - 1) {
      return recentEvals[currentIndex + 1].evalId;
    }

    // If this is the last eval, go to previous
    if (currentIndex > 0) {
      return recentEvals[currentIndex - 1].evalId;
    }

    return null;
  };

  const handleDeleteEvalClick = () => {
    if (!evalId) {
      showToast('Cannot delete: Eval ID not found', 'error');
      return;
    }

    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!evalId) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await callApi(`/eval/${evalId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete eval');
      }

      showToast('Eval deleted', 'success');

      // Navigate to next eval or home
      const nextEvalId = getNextEvalAfterDelete();
      if (nextEvalId) {
        onRecentEvalSelected(nextEvalId);
      } else {
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Failed to delete eval:', error);
      showToast(
        `Failed to delete eval: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'error',
      );
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  // Render the charts if a) they can be rendered, and b) the viewport, at mount-time, is tall enough.
  const resultsChartsScores = React.useMemo(() => {
    if (!table?.body) {
      return [];
    }
    return table.body
      .flatMap((row) => row.outputs.map((output) => output?.score))
      .filter((score) => typeof score === 'number' && !Number.isNaN(score));
  }, [table]);

  // Determine if charts should be rendered based on score variance
  const uniqueScores = React.useMemo(() => new Set(resultsChartsScores), [resultsChartsScores]);
  const hasVariedScores = uniqueScores.size > 1;
  // When all scores are identical, still show charts if the uniform score
  // is not a binary edge value (0 or 1). Graded assertions (like llm-rubric)
  // can produce meaningful uniform scores (e.g., 0.85) that users want to visualize.
  const hasMeaningfulUniformScore =
    uniqueScores.size === 1 && ![0, 1].includes([...uniqueScores][0]);
  const isRedteamEval = config?.redteam !== undefined;

  const resultsChartsUnavailableReasons = React.useMemo(() => {
    const reasons: string[] = [];

    if (!config) {
      reasons.push('This evaluation is still loading its chart configuration.');
    }

    if (table.head.prompts.length <= 1) {
      reasons.push('Charts require at least two prompts to compare side by side.');
    }

    if (resultsChartsScores.length === 0) {
      reasons.push('Charts require at least one valid numeric score.');
    } else if (!hasVariedScores && !hasMeaningfulUniformScore) {
      reasons.push(
        'All scores are the same binary edge value (0 or 1), so there is no meaningful distribution to visualize.',
      );
    }

    return reasons;
  }, [config, hasMeaningfulUniformScore, hasVariedScores, resultsChartsScores.length, table]);

  const canRenderResultsCharts = resultsChartsUnavailableReasons.length === 0;
  const appliedFilters = React.useMemo(() => Object.values(filters.values), [filters.values]);

  const [resultsTableZoom, setResultsTableZoom] = React.useState(1);

  const evalActionsMenuItems = (
    <>
      <DropdownMenuItem onClick={() => setEditNameDialogOpen(true)}>
        <Edit className="size-4 mr-2" />
        Edit name
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => {
          updateConfig(config!);
          navigate(ROUTES.SETUP);
        }}
      >
        <Play className="size-4 mr-2" />
        Edit and re-run
      </DropdownMenuItem>
      <CompareEvalMenuItem onClick={() => setCompareDialogOpen(true)} />
      <DropdownMenuItem onClick={() => setConfigModalOpen(true)}>
        <Eye className="size-4 mr-2" />
        View YAML
      </DropdownMenuItem>
      <DownloadMenuItem onClick={() => setDownloadDialogOpen(true)} />
      <DropdownMenuItem onClick={() => setCopyDialogOpen(true)}>
        <Copy className="size-4 mr-2" />
        Copy
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleShareButtonClick} disabled={shareLoading}>
        {shareLoading ? <Spinner className="size-4 mr-2" /> : <Share className="size-4 mr-2" />}
        Share
      </DropdownMenuItem>
      <DropdownMenuItem onClick={handleDeleteEvalClick} className="text-destructive">
        <Trash2 className="size-4 mr-2" />
        Delete
      </DropdownMenuItem>
    </>
  );

  return (
    <>
      <div
        className="flex flex-col bg-zinc-50 dark:bg-zinc-950 print:bg-white"
        style={{
          isolation: 'isolate',
          minHeight: 'calc(100vh - var(--nav-height) - var(--update-banner-height, 0px))',
        }}
      >
        <EvalHeader
          recentEvals={recentEvals}
          onRecentEvalSelected={onRecentEvalSelected}
          defaultEvalId={defaultEvalId}
          activeView={activeView}
          onActiveViewChange={setActiveView}
          actions={
            activeView === 'report' ? reportActions : config ? evalActionsMenuItems : undefined
          }
          contentClassName={activeView === 'report' ? 'max-w-7xl mx-auto w-full' : undefined}
        >
          {activeView === 'results' && hasAlignResults && (
            <div className="mt-4 space-y-3 border-t border-border/50 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <Tabs
                  value={activeAlignSurface}
                  onValueChange={(value) => setActiveAlignSurface(value as AlignSurface)}
                >
                  <TabsList>
                    <TabsTrigger value="overview">ALIGN Overview</TabsTrigger>
                    <TabsTrigger value="comparison">Prompt Comparison</TabsTrigger>
                    <TabsTrigger value="about">About ALIGN</TabsTrigger>
                    <TabsTrigger value="audit">Audit Table</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="flex-1" />
                <Badge variant="secondary" className="text-xs">
                  {filteredAlignRecords.length} of {alignRecords.length} classifications visible
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border/70 bg-white/70 px-3 py-3 dark:bg-zinc-900/70">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Model view
                </div>
                <Select
                  value={alignModelScope.primaryModel}
                  onValueChange={(value) =>
                    setAlignModelScope((prev) => ({
                      primaryModel: value,
                      comparisonModel: value === 'all' ? 'none' : prev.comparisonModel,
                    }))
                  }
                >
                  <SelectTrigger className="w-[190px] h-8 text-xs">Primary model</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All models</SelectItem>
                    {alignModelOptions.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        {model.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignModelScope.comparisonModel}
                  onValueChange={(value) =>
                    setAlignModelScope((prev) => ({
                      ...prev,
                      comparisonModel: value,
                    }))
                  }
                  disabled={alignModelScope.primaryModel === 'all'}
                >
                  <SelectTrigger className="w-[210px] h-8 text-xs">Compare against</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No comparison model</SelectItem>
                    {alignModelOptions
                      .filter((model) => model.id !== alignModelScope.primaryModel)
                      .map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.display}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <div className="flex-1" />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="size-4" />
                  {selectedPrimaryModelDisplay
                    ? selectedComparisonModelDisplay
                      ? `Comparing ${selectedPrimaryModelDisplay} vs ${selectedComparisonModelDisplay}`
                      : `Focused on ${selectedPrimaryModelDisplay}`
                    : 'Showing all evaluated models'}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <SearchInput
                  value={alignFilters.searchText}
                  onChange={(value) => setAlignFilters((prev) => ({ ...prev, searchText: value }))}
                  onClear={() => setAlignFilters((prev) => ({ ...prev, searchText: '' }))}
                  containerClassName="w-[240px]"
                  className="h-8 text-xs"
                  placeholder="Search prompt, reason, or response..."
                />
                <Select
                  value={alignFilters.outputModel}
                  onValueChange={(value) =>
                    setAlignFilters((prev) => ({ ...prev, outputModel: value }))
                  }
                >
                  <SelectTrigger className="w-[180px] h-8 text-xs">Output model</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All output models</SelectItem>
                    {alignFilterOptions.outputModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignFilters.judgeModel}
                  onValueChange={(value) =>
                    setAlignFilters((prev) => ({ ...prev, judgeModel: value }))
                  }
                >
                  <SelectTrigger className="w-[190px] h-8 text-xs">Judge model</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All judge models</SelectItem>
                    {alignFilterOptions.judgeModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignFilters.promptClassification}
                  onValueChange={(value) =>
                    setAlignFilters((prev) => ({ ...prev, promptClassification: value }))
                  }
                >
                  <SelectTrigger className="w-[180px] h-8 text-xs">Prompt class</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All prompt classes</SelectItem>
                    {alignFilterOptions.promptClassifications.map((classification) => (
                      <SelectItem key={classification} value={classification}>
                        {classification}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignFilters.focusArea}
                  onValueChange={(value) =>
                    setAlignFilters((prev) => ({ ...prev, focusArea: value }))
                  }
                >
                  <SelectTrigger className="w-[160px] h-8 text-xs">Focus area</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All focus areas</SelectItem>
                    {alignFilterOptions.focusAreas.map((focusArea) => (
                      <SelectItem key={focusArea} value={focusArea}>
                        {focusArea}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignFilters.tier}
                  onValueChange={(value) => setAlignFilters((prev) => ({ ...prev, tier: value }))}
                >
                  <SelectTrigger className="w-[180px] h-8 text-xs">ALIGN tier</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All ALIGN tiers</SelectItem>
                    {alignFilterOptions.tiers.map((tier) => (
                      <SelectItem key={tier} value={tier}>
                        {tier}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={alignFilters.responseStatus}
                  onValueChange={(value) =>
                    setAlignFilters((prev) => ({ ...prev, responseStatus: value }))
                  }
                >
                  <SelectTrigger className="w-[190px] h-8 text-xs">Response status</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All response statuses</SelectItem>
                    {alignFilterOptions.responseStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <AlignActiveFiltersBar
                alignFilters={alignFilters}
                alignModelScope={alignModelScope}
                primaryModelDisplay={selectedPrimaryModelDisplay}
                comparisonModelDisplay={selectedComparisonModelDisplay}
                onRemove={handleRemoveAlignFilter}
                onClearAll={handleClearAllAlignFilters}
              />
              <AlignTierLegend />
            </div>
          )}
          {activeView === 'results' && hasAlignResults && activeAlignSurface === 'audit' && (
            <div className="mt-4 flex flex-col gap-3 border-t border-border/50 pt-4">
              <div className="flex flex-wrap items-center gap-3">
                <Tabs
                  value={activeAlignSurface}
                  onValueChange={(value) => setActiveAlignSurface(value as AlignSurface)}
                >
                  <TabsList>
                    <TabsTrigger value="overview">ALIGN Overview</TabsTrigger>
                    <TabsTrigger value="comparison">Prompt Comparison</TabsTrigger>
                    <TabsTrigger value="about">About ALIGN</TabsTrigger>
                    <TabsTrigger value="audit">Audit Table</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <SearchInput
                  value={searchInputValue}
                  onChange={(value) => {
                    setSearchInputValue(value);
                    debouncedUpdate(value);
                  }}
                  onClear={handleClearSearch}
                  containerClassName="w-[200px]"
                  className="h-8 text-xs"
                />
                <FiltersForm />
                <div className="flex-1" />
                <Select
                  value={String(resultsTableZoom)}
                  onValueChange={(val) => setResultsTableZoom(Number(val))}
                >
                  <SelectTrigger className="w-[115px] h-8 text-xs">
                    <span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        ZOOM
                      </span>{' '}
                      {Math.round(resultsTableZoom * 100)}%
                    </span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">50%</SelectItem>
                    <SelectItem value="0.75">75%</SelectItem>
                    <SelectItem value="0.9">90%</SelectItem>
                    <SelectItem value="1">100%</SelectItem>
                    <SelectItem value="1.25">125%</SelectItem>
                    <SelectItem value="1.5">150%</SelectItem>
                    <SelectItem value="2">200%</SelectItem>
                  </SelectContent>
                </Select>
                <ColumnSelector
                  columnData={columnData}
                  selectedColumns={currentColumnState.selectedColumns}
                  onChange={handleChange}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewSettingsModalOpen(true)}
                    >
                      <Settings className="size-4 mr-2" />
                      Table Settings
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Edit table view settings</TooltipContent>
                </Tooltip>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-muted-foreground">Display:</span>
                <FilterModeSelector
                  filterMode={filterMode}
                  onChange={handleFilterModeChange}
                  showDifferentOption={visiblePromptCount > 1}
                />
                {config?.redteam !== undefined && (
                  <>
                    <Separator orientation="vertical" className="h-5 mx-1" />
                    <FilterChips />
                  </>
                )}
                {debouncedSearchText && (
                  <Badge variant="secondary" className="text-xs h-5 gap-1">
                    Search:{' '}
                    {debouncedSearchText.length > 5
                      ? debouncedSearchText.substring(0, 5) + '...'
                      : debouncedSearchText}
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="ml-1 hover:bg-muted rounded-full"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {filterMode !== 'all' && (
                  <Badge variant="secondary" className="text-xs h-5 gap-1">
                    Filter: {filterMode}
                    <button
                      type="button"
                      onClick={() => setFilterMode('all')}
                      className="ml-1 hover:bg-muted rounded-full"
                    >
                      <X className="size-3" />
                    </button>
                  </Badge>
                )}
                {filters.appliedCount > 0 && (
                  <AppliedFilterBadges
                    filters={appliedFilters}
                    isRedteamEval={isRedteamEval}
                    onRemoveFilter={removeFilter}
                    policyIdToNameMap={filters.policyIdToNameMap}
                  />
                )}
                {highlightedResultsCount > 0 && (
                  <Badge className="bg-primary/10 text-primary border border-primary/20 font-medium">
                    {highlightedResultsCount} highlighted
                  </Badge>
                )}
                {userRatedResultsCount > 0 && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        className="bg-purple-50 text-purple-700 border border-purple-200 font-medium cursor-pointer hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-950/50"
                        onClick={() => setFilterMode('user-rated')}
                      >
                        {userRatedResultsCount} user-rated
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {userRatedResultsCount} output{userRatedResultsCount === 1 ? '' : 's'} with
                      user ratings. Click to filter.
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          )}
          {activeView === 'results' && !hasAlignResults && (
            <ResultsChartsSection
              key={`${currentEvalId}:${isRedteamEval ? 'redteam' : canRenderResultsCharts ? 'eligible' : 'ineligible'}`}
              canRenderResultsCharts={canRenderResultsCharts}
              isRedteamEval={isRedteamEval}
              resultsChartsScores={resultsChartsScores}
              resultsChartsUnavailableReasons={resultsChartsUnavailableReasons}
            >
              {(chartsToggleButton) => (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2 items-center">
                    <SearchInput
                      value={searchInputValue}
                      onChange={(value) => {
                        setSearchInputValue(value);
                        debouncedUpdate(value);
                      }}
                      onClear={handleClearSearch}
                      containerClassName="w-[200px]"
                      className="h-8 text-xs"
                    />
                    <FiltersForm />
                    <div className="flex-1" />
                    <Select
                      value={String(resultsTableZoom)}
                      onValueChange={(val) => setResultsTableZoom(Number(val))}
                    >
                      <SelectTrigger className="w-[115px] h-8 text-xs">
                        <span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            ZOOM
                          </span>{' '}
                          {Math.round(resultsTableZoom * 100)}%
                        </span>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.5">50%</SelectItem>
                        <SelectItem value="0.75">75%</SelectItem>
                        <SelectItem value="0.9">90%</SelectItem>
                        <SelectItem value="1">100%</SelectItem>
                        <SelectItem value="1.25">125%</SelectItem>
                        <SelectItem value="1.5">150%</SelectItem>
                        <SelectItem value="2">200%</SelectItem>
                      </SelectContent>
                    </Select>
                    <ColumnSelector
                      columnData={columnData}
                      selectedColumns={currentColumnState.selectedColumns}
                      onChange={handleChange}
                    />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewSettingsModalOpen(true)}
                        >
                          <Settings className="size-4 mr-2" />
                          Table Settings
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit table view settings</TooltipContent>
                    </Tooltip>
                    {chartsToggleButton}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-medium text-muted-foreground">Display:</span>
                    <FilterModeSelector
                      filterMode={filterMode}
                      onChange={handleFilterModeChange}
                      showDifferentOption={visiblePromptCount > 1}
                    />
                    {config?.redteam !== undefined && (
                      <>
                        <Separator orientation="vertical" className="h-5 mx-1" />
                        <FilterChips />
                      </>
                    )}
                    {debouncedSearchText && (
                      <Badge variant="secondary" className="text-xs h-5 gap-1">
                        Search:{' '}
                        {debouncedSearchText.length > 5
                          ? debouncedSearchText.substring(0, 5) + '...'
                          : debouncedSearchText}
                        <button
                          type="button"
                          onClick={handleClearSearch}
                          className="ml-1 hover:bg-muted rounded-full"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                    {filterMode !== 'all' && (
                      <Badge variant="secondary" className="text-xs h-5 gap-1">
                        Filter: {filterMode}
                        <button
                          type="button"
                          onClick={() => setFilterMode('all')}
                          className="ml-1 hover:bg-muted rounded-full"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    )}
                    {filters.appliedCount > 0 && (
                      <AppliedFilterBadges
                        filters={appliedFilters}
                        isRedteamEval={isRedteamEval}
                        onRemoveFilter={removeFilter}
                        policyIdToNameMap={filters.policyIdToNameMap}
                      />
                    )}
                    {highlightedResultsCount > 0 && (
                      <Badge className="bg-primary/10 text-primary border border-primary/20 font-medium">
                        {highlightedResultsCount} highlighted
                      </Badge>
                    )}
                    {userRatedResultsCount > 0 && (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge
                            className="bg-purple-50 text-purple-700 border border-purple-200 font-medium cursor-pointer hover:bg-purple-100 dark:bg-purple-950/30 dark:text-purple-300 dark:border-purple-800 dark:hover:bg-purple-950/50"
                            onClick={() => setFilterMode('user-rated')}
                          >
                            {userRatedResultsCount} user-rated
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          {userRatedResultsCount} output{userRatedResultsCount === 1 ? '' : 's'}{' '}
                          with user ratings. Click to filter.
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              )}
            </ResultsChartsSection>
          )}
          {(!hasAlignResults || activeAlignSurface === 'audit') &&
            currentColumnState.selectedColumns.length < columnData.length && (
              <div className="flex flex-wrap gap-2 items-center mt-2">
                <HiddenColumnChips
                  columnData={columnData}
                  selectedColumns={currentColumnState.selectedColumns}
                  onChange={handleChange}
                />
              </div>
            )}
        </EvalHeader>
        {activeView === 'results' && (
          <>
            {hasAlignResults && activeAlignSurface === 'overview' && (
              <div className="px-4 py-6 flex-1">
                <AlignOverview
                  records={filteredAlignRecords}
                  benchmarkName={benchmarkName}
                  benchmarkVersion={benchmarkVersion}
                  selectedPrimaryModel={selectedPrimaryModelDisplay}
                  selectedComparisonModel={selectedComparisonModelDisplay}
                  selectedFocusArea={
                    alignFilters.focusArea === 'all' ? undefined : alignFilters.focusArea
                  }
                  onFocusAreaSelect={handleAlignFocusAreaSelect}
                />
              </div>
            )}
            {hasAlignResults && activeAlignSurface === 'comparison' && (
              <div className="px-4 py-6 flex-1">
                <AlignComparisonView records={filteredAlignRecords} />
              </div>
            )}
            {hasAlignResults && activeAlignSurface === 'about' && (
              <div className="px-4 py-6 flex-1">
                <AlignAboutView />
              </div>
            )}
            {(!hasAlignResults || activeAlignSurface === 'audit') && (
              <div className="px-4 flex flex-1 min-h-0 flex-col">
                <ResultsTable
                  key={currentEvalId}
                  maxTextLength={maxTextLength}
                  columnVisibility={currentColumnState.columnVisibility}
                  wordBreak={wordBreak}
                  showStats={showInferenceDetails}
                  filterMode={filterMode}
                  failureFilter={failureFilter}
                  debouncedSearchText={debouncedSearchText}
                  onFailureFilterToggle={handleFailureFilterToggle}
                  zoom={resultsTableZoom}
                />
              </div>
            )}
          </>
        )}
        {activeView === 'report' && validEvalId && (
          <React.Suspense
            fallback={
              <div className="flex flex-col gap-3 justify-center items-center h-36">
                <Spinner className="size-5" />
                <span className="text-sm text-muted-foreground">Loading report...</span>
              </div>
            }
          >
            <Report evalId={validEvalId} embedded onActionsReady={setReportActions} />
          </React.Suspense>
        )}
      </div>
      <ConfigModal open={configModalOpen} onClose={() => setConfigModalOpen(false)} />
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        evalId={currentEvalId}
        onShare={handleShare}
      />
      <EvalSelectorDialog
        open={compareDialogOpen}
        onClose={() => setCompareDialogOpen(false)}
        onEvalSelected={handleComparisonEvalSelected}
        description="Only evals with the same dataset can be compared."
        focusedEvalId={currentEvalId}
        filterByDatasetId
      />
      <DownloadDialog open={downloadDialogOpen} onClose={() => setDownloadDialogOpen(false)} />
      <SettingsModal open={viewSettingsModalOpen} onClose={() => setViewSettingsModalOpen(false)} />
      <ConfirmEvalNameDialog
        open={editNameDialogOpen}
        onClose={() => setEditNameDialogOpen(false)}
        title="Edit Eval Name"
        label="Description"
        currentName={config?.description || ''}
        actionButtonText="Save"
        onConfirm={handleSaveEvalName}
      />
      <ConfirmEvalNameDialog
        open={copyDialogOpen}
        onClose={() => setCopyDialogOpen(false)}
        title="Copy Evaluation"
        label="Description"
        currentName={`${config?.description || 'Evaluation'} (Copy)`}
        actionButtonText="Create Copy"
        onConfirm={handleCopyEval}
        showSizeWarning={totalResultsCount > 10000}
        itemCount={totalResultsCount}
        itemLabel="results"
      />

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !isDeleting && setDeleteDialogOpen(open)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="size-5 text-destructive" />
              Delete eval?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert variant="warning">
              <AlertContent>
                <AlertDescription>This action cannot be undone.</AlertDescription>
              </AlertContent>
            </Alert>
            <p className="text-sm text-muted-foreground">You are about to permanently delete:</p>
            <div className="mt-2 p-3 bg-muted/50 rounded-md border border-border">
              <p className="font-medium">{config?.description || evalId || 'Unnamed eval'}</p>
              <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                <span>
                  {totalResultsCount.toLocaleString()} result{totalResultsCount === 1 ? '' : 's'}
                </span>
                <span>•</span>
                <span>
                  {head.prompts.length} prompt{head.prompts.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Spinner className="size-4 mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="size-4 mr-2" />
                  Delete
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
