---
sidebar_label: Components
sidebar_position: 3
---

# Components Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Reusable UI components live in `theme/components/`. Each component handles its own local UI state and rendering — no routing logic, no direct API calls.

**Total components: 80+**  
**Location:** `theme/components/`

---

## Commerce Components

| Component | Directory | Description |
|-----------|-----------|-------------|
| Bag | `bag/` | Shopping bag icon with item count badge |
| Cart | `cart/` | Cart drawer and cart item list |
| Cart Modal | `cart-modal/` | Full cart overlay/modal |
| Cart Login Modal | `cart-login-modal/` | Login prompt modal triggered from cart |
| Card | `card/` | Generic product card (image, title, price) |
| Card List | `card-list/` | Grid/list rendering of product cards |
| Card Logo | `card-logo/` | Brand/logo card variant |
| Exchange Flow | `exchange-flow/` | Product exchange selection and confirmation flow |
| Beneficiary List | `beneficiary-list/` | Refund beneficiary account list |
| Customer Experience | `customer-experience/` | Review/rating display components |

---

## Navigation & Layout

| Component | Directory | Description |
|-----------|-----------|-------------|
| Breadcrumb | `breadcrumb/` | Hierarchical navigation breadcrumb |
| Dropdown | `dropdown/` | Accessible dropdown menu |
| Core | `core/` | Base primitives (buttons, inputs, modals, loaders) |
| Custom Slider | `custom-slider/` | Configurable carousel/slider wrapper |
| Empty State | `empty-state/` | Empty list/page placeholder with CTA |
| Error Boundary | `error-boundary/` | React error boundary wrapper |

---

## User & Account

| Component | Directory | Description |
|-----------|-----------|-------------|
| Dashboard | `dashboard/` | User account dashboard layout |
| Address Form | `address-form/` | Add/edit address form with validation |
| Address Item | `address-item/` | Single address display card |
| Profile (in pages) | — | Managed by `profile-details.jsx` page |

---

## Content Components

| Component | Directory | Description |
|-----------|-----------|-------------|
| Blog | `blog/` | Blog card and article components |
| About Us | `about-us/` | Brand story section components |
| Category Card | `categories-card/` | Category display card |
| Collection Card | `collection-card/` | Collection display card |
| Designer | `designer/` | Designer listing card |

---

## Utility & UI Components

| Component | Directory | Description |
|-----------|-----------|-------------|
| Contact Form | `contact-form/` | Contact form with file upload |
| Custom Toaster | `custom-toaster.jsx` | Toast notification system |
| Email Signup Popup | `email-signup-popup/` | Email capture popup with configurable placeholder |
| Accordion | `accordion/` | Expandable FAQ/content accordion |
| Exclusive Edition | `exclusive-edition/` | Limited edition product display |

---

## Component Rules

### File naming
```
theme/components/product-card/
  index.jsx          ← main export
  product-card.jsx   ← component logic
  product-card.less  ← scoped styles (if legacy)
```

### Naming conventions
- Directories: `kebab-case`
- Components: `PascalCase`
- Files: `kebab-case.jsx`

### Style approach
```jsx
// New components — Tailwind first
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function ProductCard({ className, isActive }) {
  return (
    <div className={twMerge(clsx("p-4 rounded-lg", isActive && "border-2 border-primary"), className)}>
      ...
    </div>
  );
}
```

```jsx
// Legacy components — Less CSS Modules
import styles from "./product-card.less";

function LegacyCard() {
  return <div className={styles.card}>...</div>;
}
```

### Sub-component extraction
Extract sub-components when a component file exceeds ~200 lines. Keep one major component per file.

### Import order
```js
// 1. React and hooks
import React, { useState, useEffect } from "react";

// 2. External libraries
import { motion } from "framer-motion";

// 3. Internal components
import ProductCard from "../product-card";

// 4. Styles
import styles from "./my-component.less";

// 5. Assets
import ArrowIcon from "../../assets/arrow.svg";
```
