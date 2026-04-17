---
name: code-review
description: Use when reviewing PRs for contentstack-marketplace-sdk—API, bundles, tests, and npm publish impact.
---

# Code review – contentstack-marketplace-sdk

## When to use

- Reviewing SDK or build-tooling changes
- Assessing dependency bumps (axios, Babel, Webpack)

## Instructions

### Checklist

- **Bundles**: Each target (node/web/RN/NS) still builds; entry points in `package.json` remain valid.
- **Tests**: `npm test` and `npm run lint` succeed; new behavior covered.
- **Semver**: Breaking changes reflected in version strategy.
- **Security**: No secrets in repo; lockfile updates reviewed.

### Severity hints

- **Blocker**: Broken publish artifacts or failing CI.
- **Major**: Missing tests for new HTTP paths or auth changes.
- **Minor**: Internal refactors with green CI.
