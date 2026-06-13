# Ekke Documentation

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Active

Welcome to the official documentation for **Ekke** — a white-label, fully customizable e-commerce frontend built on the Fynd Commerce Platform.

## What is Ekke?

Ekke is an FDK React Theme (internal codename: **Zion**) that powers production storefronts on the Fynd Platform. It provides a complete, configurable e-commerce experience out of the box, including product discovery, cart, checkout, orders, user accounts, and 60+ CMS sections.

## Documentation Sections

| Section | Description |
|---------|-------------|
| [00 — Overview](./00-overview/overview.md) | Project purpose, tech stack, capabilities |
| [01 — Getting Started](./01-getting-started/getting-started.md) | Prerequisites, local setup, dev commands |
| [02 — Architecture](./02-architecture/architecture.md) | System design, directory structure, data flow |
| [03 — Reference](./03-reference/sections.md) | Sections, pages, components, hooks, queries |
| [04 — How-To Runbooks](./04-how-to/runbooks.md) | Task-based guides for common workflows |
| [05 — Operations](./05-operations/operations.md) | Deployment, rollback, CI/CD, incident runbooks |
| [06 — Decisions (ADRs)](./06-decisions/adr-001-fdk-react-theme.md) | Architecture decision records |
| [07 — Quality](./07-quality/quality.md) | Testing standards, code review, QA process |
| [08 — Contributing](./08-contributing/contributing.md) | Branching, code style, commit conventions |
| [09 — Theme Guide](./09-theme/theme-guide.md) | Design system, styling conventions |
| [10 — Business Requirements](./10-business-requirement/business-requirements.md) | Product scope and feature specs |

## Governance

- All docs live in `docs/` at the root of this repo.
- Every document includes an `Owner`, `Last Updated`, and `Status` header.
- PRs touching features must include a corresponding docs update.
- ADRs live in `06-decisions/` and are never deleted — only superseded.
