---
sidebar_label: Contributing
sidebar_position: 1
---

# Contributing

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## Branching Strategy

| Branch | Purpose | Branch from | Merges to |
|--------|---------|-------------|-----------|
| `main` | Production — stable releases only | — | — |
| `uat` | UAT / pre-production validation | `devx_dev` | `main` |
| `devx_dev` | Active development; all feature PRs merge here | `main` | `uat` / `main` |
| `feature/description` | New features | `devx_dev` | `devx_dev` |
| `fix/description` | Bug fixes | `devx_dev` (or `main` for hotfixes) | `devx_dev` / `main` |

### Workflow

```
1. Cut branch:     git checkout -b feature/my-feature devx_dev
2. Develop locally: npm run dev
3. Commit:         git commit -m "feat: add my feature"
4. Push:           git push origin feature/my-feature
5. PR:             Open PR to devx_dev
6. Review:         Get at least 1 approval
7. Merge:          Squash merge into devx_dev
8. Release:        devx_dev → uat → main (via PR)
```

---

## Commit Conventions

Use **Conventional Commits** format:

```
<type>: <short description>

[optional body]
```

| Type | When to use |
|------|-------------|
| `feat` | New feature or section |
| `fix` | Bug fix |
| `refactor` | Code change that's neither a fix nor a feature |
| `style` | CSS/styling changes only |
| `docs` | Documentation changes |
| `chore` | Build process, config, dependencies |
| `perf` | Performance improvements |

**Examples:**
```
feat: add exchange flow to product description page
fix: resolve cart count not updating after remove
refactor: extract address form validation to helper
style: update hero banner mobile padding to 16px
docs: add sections reference to contributing guide
chore: upgrade Framer Motion to 11.x
perf: lazy load image gallery section below fold
```

---

## Code Style

### React Components

```jsx
// ✅ Functional components with hooks only
function ProductCard({ product, onAddToCart }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-white shadow">
      <img src={product.image} alt={product.name} />
      <h3 className="text-lg font-semibold">{product.name}</h3>
    </div>
  );
}

export default ProductCard;
```

### File naming

```
theme/components/product-card/     ← directory: kebab-case
  index.jsx                        ← entry point
  product-card.jsx                 ← component: kebab-case file
  product-card.less                ← styles (legacy only)
```

### Component naming
- Component functions: `PascalCase` (`ProductCard`)
- Files: `kebab-case.jsx` (`product-card.jsx`)
- One major component per file
- Extract sub-components when file exceeds ~200 lines

### Styling rules

```jsx
// ✅ New code — Tailwind CSS utility classes
<div className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl">

// ✅ Conditional classes — use clsx + tailwind-merge
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

<button className={twMerge(clsx("px-4 py-2 rounded", disabled && "opacity-50 cursor-not-allowed"))}>

// ✅ Legacy components — Less CSS Modules (extend, don't rewrite)
<div className={styles.legacyWrapper}>
```

### Import order

```js
// 1. React and hooks
import React, { useState, useEffect, useCallback } from "react";

// 2. External libraries
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// 3. Internal components
import ProductCard from "../../components/product-card";
import Breadcrumb from "../../components/breadcrumb";

// 4. Queries / helpers
import { getProductDetails } from "../../queries/catalog";
import { formatPrice } from "../../helper/utils";

// 5. Styles
import styles from "./my-component.less";

// 6. Assets
import ArrowIcon from "../../assets/icons/arrow.svg";
```

---

## Documentation Requirements

When adding a feature, update docs:

| Change | Docs to update |
|--------|---------------|
| New CMS section | `03-reference/sections.md` |
| New page route | `03-reference/pages.md` |
| New component | `03-reference/components.md` |
| New query pattern | `03-reference/queries.md` |
| Architecture change | `02-architecture/architecture.md` + new ADR in `06-decisions/` |
| New runbook task | `04-how-to/runbooks.md` |

---

## Getting Help

- For questions about FDK CLI: `fdk --help` or [Fynd Developer Docs](https://partners.fynd.com/help)
- For project-specific questions: Open a GitHub issue or reach out to Harsh Chanchad
