---
name: testing
description: How to run Mocha, Jest, and sanity tests for marketplace-sdk; env and fixtures
---

# Testing (marketplace-sdk)

## Quick commands

```bash
npm run lint                    # eslint lib test (also in pretest)
npm run test:unit               # Mocha + NYC, HTML coverage
npm run test:unit:report:json   # Clover + JSON report (CI)
npm run test:typescript         # Jest + ts-jest, test/typescript
npm run test:sanity-test        # Live API — needs .env and org data
```

Avoid relying on root `npm test` until `test:api` exists in `package.json`.

## Unit tests (Mocha)

- **Bootstrap:** `test/unit/index.js` aggregates requires.
- **Runtime:** `BABEL_ENV=test`, `@babel/register`, `babel-polyfill`, 30000 ms timeout.
- **Patterns:** `*-test.js`, Chai `expect`, Sinon/nock/axios-mock-adapter per file.
- **Coverage:** NYC excludes documented paths in `package.json` `nyc` block.

## Jest (TypeScript)

- **Config:** `jest.config.js` — `testRegex` for `test`/`spec` `.ts` files.
- Use for type-level consumer smoke tests, not as replacement for all Mocha coverage.

## Sanity tests

- **Orchestrator:** `test/sanity-check/sanity.js`.
- **Helper client:** `test/sanity-check/utility/ContentstackClient.js` — passes `host` / `defaultHostName` from `process.env.HOST`.
- **dotenv:** Most suites call `dotenv.config()`; keep variables in local `.env`.
- **Representative env keys:** `ORG_UID`, `HOST`, `DEFAULTHOST`, `ADMIN_EMAIL`, `USER_EMAIL`, `EMAIL`, `PASSWORD` — verify against the specific `describe` file you run.
- **Fixtures:** JSON files produced under the sanity tree (e.g. login output) — gitignore if sensitive; never commit real authtokens.

## Naming and organization

- Unit tests live in `test/unit/` with names tied to modules (`marketplace-test.js`, `oauth-test.js`).
- Sanity API tests live in `test/sanity-check/api/`.

## Debugging

- `npm run test:debug` runs Mocha in debug mode on `./test` — prefer narrowing to a single file when iterating.
