#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

npm install
npm run build
rm -rf out
mkdir -p out
npm run local -- eval -c align-config.mjs --env-file .env --no-cache
npm run local -- export eval latest -o out/align-latest-eval.json
cp -R dist/src/app/. out/
