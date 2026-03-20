---
name: code-review
description: Expanded PR checklist for marketplace-sdk — docs, compat, errors, terminology, tests, dependency/security notes
---

# Code review (marketplace-sdk)

Use with `.cursor/rules/code-review.mdc` (always-on summary). This skill adds detail and examples.

## 1. Public API and JSDoc

- Every new exported function or fluent chain method should document parameters, return type (Promise + payload shape if stable), and Edge cases (region, required `orgUid`, token type).
- Cross-check `types/` — `.d.ts` must match runtime exports from `lib/contentstack.js` and `lib/marketplace/**`.

## 2. Terminology

- **Marketplace / Developer Hub** — correct framing for this package.
- **Not CDA** — do not describe this SDK as the Content Delivery API client.
- **CMA** — only where accurate (user-session / management-style tokens); avoid saying this SDK “is the CMA SDK” if the change is marketplace-only.

## 3. Backward compatibility

- Default host derivation (`getContentstackEndpoint`, `region`) must remain stable for existing consumers.
- Changing retry defaults, timeout, or header names is a **semver** decision.

## 4. Error mapping

- Reject patterns that bypass `contentstackError` for normal HTTP failures unless there is a dedicated low-level escape hatch.
- Ensure token redaction in thrown error details stays intact when touching `contentstackError` or interceptors.

## 5. Null safety and input validation

- Match defensive style used in sibling modules; avoid throwing non-`Error` values from async paths.

## 6. Dependencies and SCA

- New packages: license compatible with MIT, minimal footprint, no unnecessary postinstall scripts.
- Run `npm audit` / org policy as required before merge.

## 7. Tests

| Change type | Expectation |
|-------------|-------------|
| `lib/` behavior | `test/unit/` coverage or extension of existing suites |
| Type surface | `test/typescript/` if consumers rely on types |
| Live-only behavior | sanity suite + documented env; no secrets in repo |

## 8. Severity (optional)

- **Blocker:** Security, broken auth defaults, semver violation.
- **Major:** Missing tests, wrong product labeling in docs, incorrect error mapping.
- **Minor:** Comment/JSDoc only, internal refactor with identical behavior.
