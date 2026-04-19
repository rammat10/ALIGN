import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const outputDir = path.join(repoRoot, 'out');
const destinationPath = path.join(
  repoRoot,
  'src',
  'app',
  'public',
  'demo',
  'align-latest-results.json',
);

const requestedSource = process.argv[2];

function findLatestAlignOutput() {
  const candidates = fs
    .readdirSync(outputDir)
    .filter((file) => /^align-.*\.json$/.test(file))
    .map((file) => {
      const fullPath = path.join(outputDir, file);
      return {
        fullPath,
        mtimeMs: fs.statSync(fullPath).mtimeMs,
      };
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);

  if (candidates.length === 0) {
    throw new Error(`No ALIGN output JSON files found in ${outputDir}`);
  }

  return candidates[0].fullPath;
}

const sourcePath = requestedSource
  ? path.resolve(repoRoot, requestedSource)
  : findLatestAlignOutput();

const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));

if (!source?.results || !source?.config) {
  throw new Error(`Source file does not look like an ALIGN output artifact: ${sourcePath}`);
}

const staticResults = {
  evalId: source.evalId || 'align-demo-latest',
  version: 4,
  createdAt:
    source.metadata?.evaluationCreatedAt ||
    source.results?.timestamp ||
    source.metadata?.exportedAt ||
    new Date().toISOString(),
  results: source.results,
  config: source.config,
  author: source.metadata?.author ?? null,
  prompts: source.results?.prompts ?? [],
};

fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
fs.writeFileSync(destinationPath, `${JSON.stringify(staticResults, null, 2)}\n`);

console.log(`Wrote ${path.relative(repoRoot, destinationPath)} from ${path.relative(repoRoot, sourcePath)}`);
