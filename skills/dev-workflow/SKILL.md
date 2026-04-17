---
name: dev-workflow
description: Use for npm scripts, CI, and release flow in contentstack-marketplace-sdk.
---

# Development workflow – contentstack-marketplace-sdk

## When to use

- Installing deps or running the full test matrix before a PR
- Understanding `pretest` hooks (lint before tests)

## Instructions

### Commands

- `npm run build` — clean + Babel + Webpack bundles for node/web/RN/NativeScript.
- `npm test` — `test:api` then `test:unit` per `package.json`.
- `npm run lint` — ESLint on `lib` and `test`.

### Hooks

- **`pretest`** clears coverage and runs lint—fix lint before expecting tests to run cleanly.

### CI

- Unit tests run in `.github/workflows/unit-test.yml`—mirror key commands locally.
