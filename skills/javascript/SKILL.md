---
name: javascript
description: Use for Babel presets, Webpack configs, and multi-target builds in contentstack-marketplace-sdk.
---

# JavaScript tooling – contentstack-marketplace-sdk

## When to use

- Editing **`webpack/*.js`** or Babel envs (`es5`, `es-modules`, `test`)
- Debugging environment-specific bundles (Node vs browser vs RN)

## Instructions

### Babel

- Builds use **`BABEL_ENV`** (`es5`, `es-modules`, `test`)—ensure new syntax is transpiled for the oldest supported runtime of each target.

### Webpack

- Separate configs per platform (`webpack.node.js`, `webpack.web.js`, etc.)—keep shared settings DRY via `webpack-merge` where the repo already does.

### Types

- TypeScript definitions live under **`types/`**—update when public JS surface changes.
