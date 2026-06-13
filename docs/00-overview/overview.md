---
sidebar_label: Overview
sidebar_position: 1
---

# Overview

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## What is Ekke?

**Ekke** (internal codename: **Zion**) is a white-label, fully customizable e-commerce frontend built on the [Fynd Commerce Platform](https://partners.fynd.com). It is implemented as an **FDK React Theme** — a structured React application that the Fynd Platform hosts, renders server-side, and integrates with its commerce APIs.

Ekke powers production storefronts and is designed to be deployed across multiple brands with minimal configuration changes. All runtime configuration is injected by the Fynd Platform via theme settings.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Bundler | Webpack 5 (via FDK CLI) |
| Styling | Tailwind CSS 3 + Less CSS Modules |
| Data Layer | GraphQL via `fdk-store-gql` / `FPIClient` |
| Animations | Framer Motion 11 |
| Maps | Google Maps API |
| Internationalization | `react-i18next` (20+ languages, RTL support) |
| CI/CD | Azure Pipelines |
| Deployment | Fynd Platform CDN |

---

## Core Capabilities

### Commerce Features
- Full product catalog browsing (PLP, PDP, brand listing, category navigation)
- Cart, wishlist, and checkout flows
- Order management (tracking, details, returns, refunds, exchanges)
- User account management (profile, addresses, orders)
- Payment link support
- Shared cart functionality

### CMS & Customization
- **60+ configurable CMS sections** editable via the Fynd Platform theme editor
- All sections expose schema properties that store owners configure without code changes
- Sections include hero banners, product carousels, editorial content, blog, testimonials, forms, and more

### Platform & Ops
- Server-side rendering (SSR) managed by Fynd Platform
- 40+ routed pages
- 20+ languages with full RTL (Arabic) support
- GST support for Indian storefronts
- Radio player section (specialized feature)
- Google Maps integration for store locator

---

## FDK Theme Architecture

Ekke is not a standalone React app — it is an **FDK React Theme** that exports:

```js
// theme/index.jsx (simplified)
export default {
  pages,       // 40+ route-level components
  sections,    // 60+ CMS content blocks
  components,  // shared layout and UI
}
```

The Fynd Platform:
1. Manages SSR, routing, and CDN asset delivery
2. Calls `globalDataResolver` and `pageDataResolver` before each render
3. Provides `FPIClient` for GraphQL queries
4. Injects `react-i18next` from its own runtime (not bundled)
5. Exposes a theme editor UI for `settings_schema.json` fields

---

## Project Repositories & Tools

| Resource | Location |
|----------|----------|
| Theme source | `akke-website/` (this repo) |
| CI/CD | Azure Pipelines (`azure-pipelines.yml`) |
| Theme config | `config.json`, `pages.json`, `assets.json` |
| Partner portal | [partners.fynd.com](https://partners.fynd.com) |
