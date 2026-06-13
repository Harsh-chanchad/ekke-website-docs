---
sidebar_label: Architecture
sidebar_position: 1
---

# Architecture

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## System Overview

Ekke is an **FDK React Theme** — not a standalone web application. The **Fynd Platform** manages server-side rendering, routing, CDN asset delivery, and commerce API integration. The theme layer (this repo) handles UI rendering, component composition, and data fetching via GraphQL.

```
┌─────────────────────────────────────────────────────────┐
│                    Fynd Platform                        │
│  ┌─────────────┐   SSR + Routing   ┌─────────────────┐ │
│  │   Commerce  │ ◄────────────────► │   Ekke Theme    │ │
│  │   APIs      │                   │   (React 18)    │ │
│  └─────────────┘                   └────────┬────────┘ │
│                                             │           │
│  ┌────────────────────────────────────────┐ │           │
│  │        FPIClient (GraphQL)             │◄┘           │
│  └────────────────────────────────────────┘             │
└─────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
akke-website/
├── theme/
│   ├── index.jsx              # Theme entry — exports pages, sections, layout
│   ├── pages/                 # 40+ route-level components (one per page)
│   ├── page-layouts/          # Structural wrappers (auth, cart, PDP, PLP, checkout)
│   ├── components/            # 80+ reusable UI components
│   ├── sections/              # 60+ CMS-configurable content blocks
│   ├── queries/               # GraphQL query functions (organized by domain)
│   ├── custom-templates/      # Template overrides for specific pages
│   ├── providers/             # ThemeProvider and global state
│   ├── contexts/              # Cross-component state (logo, radio player, profile tabs)
│   ├── helper/                # Utilities, hooks, constants, auth guards
│   ├── locales/               # i18n translations (20+ languages, RTL Arabic)
│   ├── styles/                # Global Less + Tailwind CSS
│   └── assets/                # Static assets (icons, images)
├── config.json                # Theme metadata
├── pages.json                 # Route definitions
├── assets.json                # Asset declarations
├── package.json
├── webpack.config.js
├── tailwind.config.js
├── postcss.config.js
└── azure-pipelines.yml        # CI/CD pipeline
```

---

## Data Flow

Every page render follows this sequence:

```
1. User navigates to URL
       ↓
2. Fynd Platform executes globalDataResolver
   (header queries, user session, language/locale)
       ↓
3. Platform executes pageDataResolver
   (domain-specific GraphQL queries for the page)
       ↓
4. React component tree hydrates with resolved data
       ↓
5. ThemeProvider wraps the app (global state)
       ↓
6. Header → PageLayout → Page → Sections render
```

Data is fetched using `fpi.executeGQL()` — the `FPIClient` GraphQL client provided by the Fynd Platform runtime. Query functions live in `theme/queries/` and follow the signature:

```js
// theme/queries/catalog.js (example)
export async function getProductDetails(fpi, params) {
  return fpi.executeGQL(PRODUCT_DETAILS_QUERY, params);
}
```

---

## Module Boundaries

| Module | Responsibility | Must NOT |
|--------|---------------|----------|
| `pages/` | Route composition | Contain business logic |
| `page-layouts/` | Structural templates | Hold page-specific data |
| `components/` | UI rendering + local state | Handle routing |
| `sections/` | CMS-driven content blocks | Contain routing logic |
| `queries/` | GraphQL definitions | Render anything |
| `helper/` | Pure utilities + custom hooks | Import components |
| `contexts/` | Cross-component state | Run business logic |

---

## Key Design Decisions

### FDK React Theme adoption
The Fynd Platform mandates this pattern. It provides SSR, CDN hosting, and deep integration with Fynd's commerce APIs out of the box. The theme exports a factory from `theme/index.jsx`.

### Webpack 5 over Vite
FDK CLI tooling and the `fdk-store-gql` library are optimized for Webpack. Vite is not supported by the FDK ecosystem as of this writing.

### Hybrid styling: Tailwind CSS 3 + Less CSS Modules
- **New UI work** → Tailwind CSS utility classes
- **Existing components** → Less CSS Modules (legacy, extended incrementally)
- Both pipelines run simultaneously via PostCSS

### Externalized i18n
`react-i18next` is provided by the Fynd Platform runtime, not bundled in the theme. This reduces bundle size significantly. The theme ships translation JSON files in `theme/locales/`.

### SSR via `serverFetch`
CMS sections that require data implement a static `Component.serverFetch` method. This is called by the platform during SSR before React renders.

```js
HeroBanner.serverFetch = async ({ fpi }) => {
  // pre-fetch data stored in FPI custom store
};
```

---

## Theme Entry Point

`theme/index.jsx` is the single export surface consumed by the FDK platform:

```js
export default {
  // 40+ page-level components
  pages: { Home, ProductListing, ProductDescription, ... },

  // 60+ CMS sections
  sections: { HeroBanner, ProductCarousel, Blog, ... },

  // Shared layout
  ApplicationHeader,
  ApplicationFooter,
  ThemeProvider,
}
```
