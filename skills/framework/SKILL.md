---
name: framework
description: HTTP stack for marketplace-sdk — Axios wrapper, retries, concurrency, params serialization, logging hook
---

# HTTP framework (`lib/core`)

This repo separates **domain** (`lib/marketplace/**`) from a small **HTTP framework** in `lib/core/`. Use this skill when changing transport behavior.

## `contentstackHTTPClient.js`

- Builds an **axios** instance with `baseURL` from `endpoint` or `protocol://hostname:port` + `basePath`.
- **Defaults:** `timeout` 30000, `retryOnError` true, `retryCondition` retries **429** (overridable).
- **Headers:** Maps `apiKey` / `accessToken` from config if present.
- **Params:** Custom `paramsSerializer` using **Qs**; nests JSON `query` with `encodeURIComponent`.
- **Concurrency:** Attaches `ConcurrencyQueue` to the instance.
- **Logging:** `logHandler` default from `messageHandler.js` (`httpLogHandler`).

## `concurrency-queue.js`

- Limits parallel in-flight requests (`maxRequests` from client params). Changes here affect all API modules sharing the same HTTP instance.

## `messageHandler.js`

- Central place for HTTP log/telemetry hooks. Keep implementations safe for browsers and Node bundles.

## When to edit

- Retry/backoff policy, timeout, or serializer → prefer extending **existing** options on `client()` rather than one-off axios calls in marketplace modules.
- New global header behavior → `contentstack.js` + potentially `contentstackHTTPClient.js` for low-level concerns.

## Testing

- **`test/unit/ContentstackHTTPClient-test.js`** and **`concurrency-Queue-test.js`** should cover behavioral changes; use mocks rather than live HTTP when possible.
