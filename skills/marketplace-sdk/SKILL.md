---
name: marketplace-sdk
description: Use for Marketplace client behavior, public methods in lib/, and axios/@contentstack/utils usage.
---

# Marketplace SDK – contentstack-marketplace-sdk

## When to use

- Changing how apps authenticate or call Marketplace endpoints
- Updating `@contentstack/utils` or `axios` integration

## Instructions

### Layout

- Implementation lives under **`lib/`**; built artifacts under **`dist/`** per webpack entry (node, web, react-native, nativescript).

### API stability

- Follow semver for published **npm** package—coordinate breaking changes with Marketplace product/docs.

### Boundaries

- Keep HTTP and serialization consistent with Contentstack API expectations; reuse helpers from `@contentstack/utils` where appropriate instead of duplicating.
