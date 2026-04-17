---
name: testing
description: Use for Mocha/NYC unit tests, API tests, and Jest TypeScript tests in contentstack-marketplace-sdk.
---

# Testing – contentstack-marketplace-sdk

## When to use

- Adding tests under `test/unit` or API suites
- Working with `nyc` coverage or mochawesome reports

## Instructions

### Runners

- **Mocha** with **`@babel/register`** for most suites; **`nyc`** wraps coverage.
- **`npm run test:typescript`** runs **Jest** with `jest.config.js` for TypeScript-focused tests.

### Reports

- Sanity HTML reports (`test:sanity-report`) are optional helpers—do not commit generated artifacts meant for CI only.

### Mocking

- **nock** / **axios-mock-adapter** patterns may exist—keep tests hermetic without real network when possible.
