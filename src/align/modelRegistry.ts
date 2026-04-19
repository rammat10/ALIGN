import registryData from './model-registry.json';

export type AlignModelRole = 'output' | 'judge' | 'other';

export interface AlignModelDefinition {
  rawOpenRouterId: string;
  displayName: string;
  roles: AlignModelRole[];
  active: boolean;
  notes?: string;
}

interface AlignModelRegistryData {
  models: AlignModelDefinition[];
  outputSets: Record<string, string[]>;
  judgeSets: Record<string, string[]>;
  defaults: {
    outputSet: string;
    judgeSet: string;
    judgeModel: string;
  };
}

export const alignModelRegistry = registryData as AlignModelRegistryData;

function normalizeProviderId(id: string): string {
  return id.startsWith('openrouter:') ? id : `openrouter:${id}`;
}

function normalizeLookupId(id: string): string {
  return id.trim().replace(/^openrouter:/, '');
}

function titleCaseWords(value: string): string {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => {
      const upper = word.toUpperCase();
      if (upper === 'GPT' || upper === 'AI') {
        return upper;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function getAlignModelById(id: string): AlignModelDefinition | undefined {
  const normalized = normalizeLookupId(id);
  return alignModelRegistry.models.find((model) => model.rawOpenRouterId === normalized);
}

export function getAlignProviderId(id: string): string {
  return normalizeProviderId(normalizeLookupId(id));
}

export function getAlignModelDisplayName(id: string): string {
  const normalized = id.trim();
  if (!normalized) {
    return normalized;
  }

  const registryMatch = getAlignModelById(normalized);
  if (registryMatch) {
    return registryMatch.displayName;
  }

  const withoutPrefix = normalized.replace(/^openrouter:/, '');
  const [vendor, model] = withoutPrefix.split('/', 2);

  if (!model) {
    return normalized;
  }

  if (vendor === 'openai') {
    return model.toUpperCase().startsWith('GPT-') ? model.toUpperCase() : titleCaseWords(model);
  }

  if (vendor === 'anthropic') {
    if (model.startsWith('claude-')) {
      const suffix = model.slice('claude-'.length).replace(/-/g, ' ');
      return `Claude ${suffix
        .split(' ')
        .map((part) => (part === 'opus' || part === 'sonnet' ? titleCaseWords(part) : part))
        .join(' ')}`;
    }
    return `Anthropic ${titleCaseWords(model)}`;
  }

  if (vendor === 'google') {
    return `Gemini ${model.replace(/^gemini-/, '').replace(/-/g, ' ')}`;
  }

  return titleCaseWords(model.replace(/-/g, ' '));
}

export function getActiveAlignModelsByRole(role: AlignModelRole): AlignModelDefinition[] {
  return alignModelRegistry.models.filter((model) => model.active && model.roles.includes(role));
}

export function getAlignModelSet(
  role: Extract<AlignModelRole, 'output' | 'judge'>,
  setName?: string,
): AlignModelDefinition[] {
  const setMap = role === 'output' ? alignModelRegistry.outputSets : alignModelRegistry.judgeSets;
  const resolvedSetName =
    setName ||
    (role === 'output'
      ? alignModelRegistry.defaults.outputSet
      : alignModelRegistry.defaults.judgeSet);
  const setIds = setMap[resolvedSetName] || [];

  return setIds
    .map((id) => getAlignModelById(id))
    .filter((model): model is AlignModelDefinition =>
      Boolean(model && model.active && model.roles.includes(role)),
    );
}

export function toAlignProviderConfig(model: AlignModelDefinition): { id: string; label: string } {
  return {
    id: getAlignProviderId(model.rawOpenRouterId),
    label: model.rawOpenRouterId,
  };
}
