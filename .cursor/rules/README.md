# Cursor rules — @contentstack/marketplace-sdk

Rules live in this directory. Each file states its scope in YAML frontmatter (`description`, and either `globs` and/or `alwaysApply`).

| Rule file | `alwaysApply` | Globs | When it applies |
|-----------|---------------|-------|-----------------|
| [dev-workflow.mdc](dev-workflow.mdc) | no | `**/*` | Branching, local commands, CI expectations, releases |
| [javascript.mdc](javascript.mdc) | no | `lib/**`, `test/**`, `types/**`, config roots | ESLint Standard, ES modules, project layout |
| [contentstack-javascript-marketplace.mdc](contentstack-javascript-marketplace.mdc) | no | `lib/**` only | Developer Hub host/region, auth, HTTP client behavior, marketplace modules |
| [testing.mdc](testing.mdc) | no | `test/**` | Mocha vs Jest, sanity env, naming |
| [code-review.mdc](code-review.mdc) | **yes** | — | Every session — PR / change checklist |

## Referencing rules in chat

In Cursor, mention a rule by **filename** or **@ mention** when the picker lists project rules, for example:

- `@dev-workflow` or `.cursor/rules/dev-workflow.mdc`
- `@javascript` / `@contentstack-javascript-marketplace` / `@testing` / `@code-review`

See also the repository [AGENTS.md](../../AGENTS.md) (repo root) and [skills/README.md](../../skills/README.md).
