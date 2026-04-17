---
name: contentstack-javascript-marketplace
description: Mental model for the Marketplace SDK — client factory, org-scoped marketplace API, auth, regions, module map
---

# Contentstack JavaScript Marketplace SDK

## Mental model

1. **`contentstack.client(options)`** (`lib/contentstack.js`) creates an axios-based HTTP client pointed at the **Developer Hub** host (via `@contentstack/utils` + `region`), then wraps it with **`contentstackClient`** (`lib/contentstackClient.js`).
2. **Auth:** Pass `authtoken` and/or `authorization`, or call **`login`** to set `authtoken` on shared axios defaults. Optional **`refreshToken`** callback supports rotation.
3. **Marketplace entry:** **`client.marketplace(organization_uid)`** returns `lib/marketplace/index.js` — apps (`app()`, `findAllApps`, …), installations, hosting/deployments, webhooks, OAuth under `app/oauth`, authorization helpers, app requests.

## Where to change things

| Concern | Primary paths |
|---------|----------------|
| Client defaults, User-Agent, region → host | `lib/contentstack.js`, `lib/core/region.js` |
| Login / logout / marketplace root | `lib/contentstackClient.js` |
| Axios, retries (429), timeout, query encoding | `lib/core/contentstackHTTPClient.js` |
| Request queuing | `lib/core/concurrency-queue.js` |
| Error shape | `lib/core/contentstackError.js` |
| Marketplace resources | `lib/marketplace/**/*.js` |
| Public TypeScript types | `types/**/*.d.ts` |

## Docs alignment

Describe behavior against **Contentstack Marketplace / Developer Hub** APIs. Do not document this package as **CDA**. Mention **CMA-style tokens** only when describing authtoken / management-style auth accurately.

## Integration reminder

Downstream apps use **`@contentstack/marketplace-sdk`** with **`import contentstack from '@contentstack/marketplace-sdk'`** (see README). The built **`main`** field points to **`dist/node/...`** — edit **`lib/`** and run **`npm run build`** for distributable changes.
