# Agent guide — @contentstack/marketplace-sdk

## What this package is

**Contentstack Marketplace SDK** — a **JavaScript client for Marketplace / Developer Hub** operations (apps, installations, hosting, OAuth, webhooks, authorization flows against the Developer Hub API). It is **not** the [Content Delivery API (CDA)](https://www.contentstack.com/docs/developers/apis/content-delivery-api/) SDK and **not** a general stack **Content Management API (CMA)** content SDK; it targets **marketplace app lifecycle and related management APIs** using the same style of auth as CMA (authtoken, `authorization` header, optional `login`).

- **Repository:** [github.com/contentstack/contentstack-marketplace-sdk](https://github.com/contentstack/contentstack-marketplace-sdk)
- **npm:** `@contentstack/marketplace-sdk`

## Tech stack

| Area | Choice |
|------|--------|
| Language | JavaScript (ES modules in `lib/`), transpiled with Babel; TypeScript only for `test/typescript/` and `types/` |
| Runtime | Node (README: 10+; CI uses Node 22.x) |
| HTTP / JSON | [axios](https://axios-http.com/), [qs](https://github.com/ljharb/qs) for query serialization |
| Config / regions | [@contentstack/utils](https://www.npmjs.com/package/@contentstack/utils) (`getContentstackEndpoint` for Developer Hub host) |
| Unit / API-style tests | Mocha, Chai, NYC; Babel register for `lib/` |
| Typecheck tests | Jest + ts-jest (`jest.config.js`) |
| Lint | ESLint + `eslint-config-standard` (`.eslintrc.js`) |
| Bundling | Webpack → `dist/node`, `dist/web`, etc. |

## Public entry points (source of truth)

| Role | Path |
|------|------|
| Factory | `lib/contentstack.js` — `client()`, exports `Region` |
| Request surface | `lib/contentstackClient.js` — `login`, `marketplace`, `logout` |
| HTTP stack | `lib/core/contentstackHTTPClient.js`, `lib/core/concurrency-queue.js`, `lib/core/messageHandler.js` |
| Errors | `lib/core/contentstackError.js` |
| Marketplace domain | `lib/marketplace/**` |
| Published `main` | `dist/node/contentstack-marketplace.js` (build output) |
| Type declarations | `types/contentstackClient.d.ts` and `types/marketplace/**` |

## Commands

```bash
npm install
npm run build          # clean + Babel + webpack targets
npm run lint           # eslint lib test
npm run format         # eslint --fix lib test
npm run test:unit      # Mocha unit suite + NYC (also runs lint via pretest)
npm run test:typescript # Jest on test/typescript
npm run test:sanity-test # Mocha live stack under test/sanity-check (long timeout)
```

**CI (`.github/workflows/unit-test.yml`):** `npm ci` then `npm run test:unit:report:json`.

> **`npm test` caveat:** `package.json` defines `"test": "npm run test:api && npm run test:unit"` but there is **no** `test:api` script. Use `npm run test:unit` (or fix the `test` script when adding `test:api`).

## Credentials and live tests

Sanity tests under `test/sanity-check/` use **dotenv** and env vars such as `HOST` / `DEFAULTHOST`, `ORG_UID`, `ADMIN_EMAIL`, `USER_EMAIL`, `EMAIL`, `PASSWORD`. They also read/write JSON fixtures (e.g. `loggedinAdmin.json`) via `test/sanity-check/utility/fileOperations/readwrite.js`. Do not commit real tokens; use `.env` locally (see `.gitignore`).

## Further reading for agents

- [Cursor rules index](.cursor/rules/README.md) — when each rule applies and how to reference it.
- [Skills index](skills/README.md) — deeper checklists and SDK mental model.
