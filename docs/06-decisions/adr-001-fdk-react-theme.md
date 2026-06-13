---
sidebar_label: ADR-001 FDK React Theme
sidebar_position: 1
---

# ADR-001: Adopt FDK React Theme as the Frontend Architecture

> **Status:** Accepted  
> **Date:** 2024-01-01  
> **Owner:** Engineering Team  
> **Reviewers:** Harsh Chanchad

---

## Context

Ekke is an e-commerce frontend that must integrate deeply with the Fynd Commerce Platform for product catalog, cart, checkout, orders, and user management. We needed to decide the frontend architecture pattern.

Options considered:
1. **FDK React Theme** — Fynd's official React theming framework
2. **Standalone Next.js app** — Custom SSR with Fynd REST APIs
3. **Headless Shopify + Fynd** — Hybrid approach

---

## Decision

We adopt the **FDK React Theme** pattern.

The theme exports pages, sections, and layout components from `theme/index.jsx`. The Fynd Platform handles SSR, routing, and CDN delivery.

---

## Rationale

- **Built-in SSR** without managing infrastructure
- **CDN asset hosting** by Fynd — zero DevOps overhead for frontend assets
- **Deep API integration** — `FPIClient` GraphQL client, user sessions, cart state all provided by the platform
- **Theme editor UI** — store owners can configure 60+ CMS sections without code changes
- **i18n runtime** — `react-i18next` provided by platform runtime reduces bundle size

---

## Consequences

**Positive:**
- Rapid feature delivery — focus on UI, not infrastructure
- Store owners get a visual CMS editor out of the box
- Platform handles SSR, CDN, and performance

**Negative:**
- **Vendor lock-in** to Fynd Platform — migrating to another platform would require a full rewrite
- **Webpack 5 required** — Vite or other bundlers are not compatible with FDK CLI
- **Limited SSR control** — cannot customize server-side rendering pipeline beyond `serverFetch`
- **Platform runtime dependencies** — `react-i18next`, routing, and FPI client are injected at runtime, not bundled

---

## Status history

- 2024-01-01: **Accepted** — adopted as primary architecture
