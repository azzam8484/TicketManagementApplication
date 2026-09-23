---
description: Documentation requirements for backend and API work
globs: "**/*.{java,md,yml,yaml}"
alwaysApply: false
---

# Documentation Skills

## What to document

- Public REST endpoints: operation summary, path, method, request/response schemas, status codes
- Configuration: required env vars and profiles (`local` = file-based H2, `prod` = PostgreSQL) in project README or `docs/`/`spec/`
- Schema changes: short note in the Flyway migration or `docs/migrations.md` describing intent
- Non-obvious business rules: brief class- or method-level JavaDoc on services where behavior is not obvious from names

## How to document

- Prefer OpenAPI (springdoc) annotations or schema on controllers/DTOs so API docs stay generated from code
- Keep README sections current: run, configure DB, profiles, main modules
- Do not duplicate API field lists in README when OpenAPI already covers them
- Do not add speculative docs for unbuilt features

## Agent behavior

- When adding or changing an endpoint, update OpenAPI-facing annotations/schemas in the same change
- When adding config keys, update README env/config section in the same change
- Keep documentation factual and short