import registry from './src/align/model-registry.json' with { type: 'json' };
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const normalizeLookupId = (id) => id.trim().replace(/^openrouter:/, '');
const toProviderId = (id) => {
  const normalized = normalizeLookupId(id);
  return normalized.startsWith('openrouter:') ? normalized : `openrouter:${normalized}`;
};

const getModelById = (id) => {
  const normalized = normalizeLookupId(id);
  return registry.models.find((model) => model.rawOpenRouterId === normalized);
};

const getSetModels = (role, setName) => {
  const setMap = role === 'output' ? registry.outputSets : registry.judgeSets;
  const defaultSetName = role === 'output' ? registry.defaults.outputSet : registry.defaults.judgeSet;
  const ids = setMap[setName || defaultSetName] || [];

  return ids
    .map((id) => getModelById(id))
    .filter((model) => model && model.active && model.roles.includes(role));
};

const resolveOutputArtifact = () => {
  const args = process.argv.slice(2);
  const outputIndex = args.findIndex((arg) => arg === '-o' || arg === '--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    return args[outputIndex + 1];
  }
  return process.env.ALIGN_OUTPUT_ARTIFACT || 'stdout only';
};

const getPromptCount = () => {
  const testsPath = path.join(__dirname, 'align-tests.csv');
  const csv = fs.readFileSync(testsPath, 'utf8').trim();
  const rows = csv ? csv.split('\n') : [];
  return Math.max(rows.length - 1, 0);
};

const parseExplicitModelList = (value, role) => {
  if (!value) {
    return null;
  }

  const models = value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((id) => getModelById(id))
    .filter((model) => model && model.active && model.roles.includes(role));

  return models.length > 0 ? models : null;
};

const explicitOutputModels = parseExplicitModelList(process.env.ALIGN_OUTPUT_MODELS, 'output');
const outputSource = explicitOutputModels
  ? `explicit env ALIGN_OUTPUT_MODELS`
  : process.env.ALIGN_OUTPUT_MODEL_SET
    ? `named output set ${process.env.ALIGN_OUTPUT_MODEL_SET}`
    : `default output set ${registry.defaults.outputSet}`;
const outputModels =
  explicitOutputModels || getSetModels('output', process.env.ALIGN_OUTPUT_MODEL_SET);

if (outputModels.length === 0) {
  throw new Error('ALIGN output model selection resolved to an empty set.');
}

const explicitJudge = process.env.ALIGN_JUDGE_MODEL || process.env.ALIGN_JUDGE_PROVIDER;
const judgeSource = explicitJudge
  ? `explicit env ${process.env.ALIGN_JUDGE_MODEL ? 'ALIGN_JUDGE_MODEL' : 'ALIGN_JUDGE_PROVIDER'}`
  : process.env.ALIGN_JUDGE_MODEL_SET
    ? `named judge set ${process.env.ALIGN_JUDGE_MODEL_SET}`
    : `default judge set ${registry.defaults.judgeSet}`;
const judgeModel =
  (explicitJudge && getModelById(explicitJudge)) ||
  getSetModels('judge', process.env.ALIGN_JUDGE_MODEL_SET)[0] ||
  getModelById(registry.defaults.judgeModel);

if (!judgeModel || !judgeModel.roles.includes('judge') || !judgeModel.active) {
  throw new Error('ALIGN judge model selection did not resolve to an active judge-capable model.');
}

process.env.ALIGN_JUDGE_PROVIDER = toProviderId(judgeModel.rawOpenRouterId);

const promptCount = getPromptCount();
const outputArtifact = resolveOutputArtifact();
const runProfile =
  process.env.ALIGN_RUN_PROFILE ||
  (outputSource.includes('explicit env')
    ? 'explicit-selection'
    : outputSource.includes('default')
      ? 'core-default'
      : 'named-set');

console.log(
  [
    `[ALIGN] Run profile: ${runProfile}`,
    `[ALIGN] Output models (${outputSource}): ${outputModels.map((model) => toProviderId(model.rawOpenRouterId)).join(', ')}`,
    `[ALIGN] Judge model (${judgeSource}): ${toProviderId(judgeModel.rawOpenRouterId)}`,
    `[ALIGN] Prompt count: ${promptCount}`,
    `[ALIGN] Output artifact: ${outputArtifact}`,
    `[ALIGN] Request timeout: ${process.env.REQUEST_TIMEOUT_MS || '300000'}ms`,
  ].join('\n'),
);

export default {
  description: 'ALIGN benchmark for ideological neutrality and geopolitical bias detection',
  prompts: ['file://align-prompt.txt'],
  extensions: ['file://align-classifier.mjs:afterEach'],
  providers: outputModels.map((model) => ({
    id: toProviderId(model.rawOpenRouterId),
    label: model.rawOpenRouterId,
  })),
  tests: 'file://align-tests.csv',
};
