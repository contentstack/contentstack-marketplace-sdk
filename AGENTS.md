# Contentstack Marketplace SDK – Agent guide

**Universal entry point** for contributors and AI agents. Detailed conventions live in **`skills/*/SKILL.md`**.

## What this repo is

| Field | Detail |
|--------|--------|
| **Name:** | [contentstack-marketplace-sdk](https://github.com/contentstack/contentstack-marketplace-sdk) (`@contentstack/marketplace-sdk`) |
| **Purpose:** | Node/browser SDK for managing Contentstack **Marketplace** app content and related APIs. |
| **Out of scope:** | Not the core Delivery/Management content APIs for arbitrary stacks—scope changes belong to product requirements. |

## Tech stack (at a glance)

| Area | Details |
|------|---------|
| Language | JavaScript (Babel transpilation); TypeScript tests via Jest (`test/typescript`) |
| Build | Webpack configs under **`webpack/`**; outputs under **`dist/`** (`npm run build`) |
| Tests | Mocha + NYC for unit/API tests; `npm run test:typescript` for Jest subset |
| Lint / coverage | ESLint on `lib` and `test` (`npm run lint`); NYC coverage |
| CI | `.github/workflows/unit-test.yml`, `check_branch.yml`, `sca-scan.yml`, `policy-scan.yml`, `npm-publish.yml` |

## Commands (quick reference)

| Command type | Command |
|--------------|---------|
| Build | `npm run build` |
| Test | `npm test` (runs API + unit per `package.json`) |
| Lint | `npm run lint` |

## Where the documentation lives: skills

| Skill | Path | What it covers |
|-------|------|----------------|
| **Development workflow** | [`skills/dev-workflow/SKILL.md`](skills/dev-workflow/SKILL.md) | npm scripts, Husky, CI |
| **Marketplace SDK** | [`skills/marketplace-sdk/SKILL.md`](skills/marketplace-sdk/SKILL.md) | Public API in `lib/`, axios usage |
| **JavaScript tooling** | [`skills/javascript/SKILL.md`](skills/javascript/SKILL.md) | Babel, Webpack targets, dual builds |
| **Testing** | [`skills/testing/SKILL.md`](skills/testing/SKILL.md) | Mocha, NYC, Jest, fixtures |
| **Code review** | [`skills/code-review/SKILL.md`](skills/code-review/SKILL.md) | PR checklist |

## Using Cursor (optional)

If you use **Cursor**, [`.cursor/rules/README.md`](.cursor/rules/README.md) only points to **`AGENTS.md`**—same docs as everyone else.
