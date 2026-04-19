# ALIGN Run Workflow

Use the explicit ALIGN run scripts when you want the main benchmark run rather than a one-model smoke slice.

Core comparison run:

```bash
npm run align:run:core
```

This writes the main stable comparison artifact to:

```bash
out/align-full-comparison-core.json
```

Extended comparison run:

```bash
npm run align:run:extended
```

This writes the unstable comparison artifact to:

```bash
out/align-full-comparison-extended.json
```

Guidance:

- Treat `out/align-full-comparison-core.json` as the primary ALIGN comparison artifact.
- Treat `out/align-full-comparison-extended.json` as exploratory because it includes unstable/provider-sensitive models.
- Avoid using narrow smoke-test artifacts in `out/` as the main benchmark reference unless the filename explicitly says it is the full comparison run.
