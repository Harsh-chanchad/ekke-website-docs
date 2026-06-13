---
sidebar_label: Utilities
sidebar_position: 7
---

# Utilities Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Pure utility functions and constants live in `theme/helper/`. They must be side-effect free and have no dependencies on React or FPI.

**Location:** `theme/helper/`

---

## Helper Structure

```
theme/helper/
├── utils.js          # General-purpose utilities
├── constants.js      # App-wide constants and enums
├── hooks/            # Custom React hooks (see Hooks reference)
├── auth-guard.js     # Route protection HOCs
└── formatters.js     # Price, date, text formatters
```

---

## Common Utility Patterns

### Price Formatting
```js
// Format price with currency symbol
export function formatPrice(amount, currencySymbol = "₹") {
  return `${currencySymbol}${amount.toLocaleString("en-IN")}`;
}
```

### Size Availability
Used throughout add-to-cart flows to detect the smallest available size:
```js
export function getSmallestAvailableSize(sizes) {
  return sizes?.find((s) => s.is_available) ?? null;
}
```

### Slug Utilities
```js
export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}
```

### Image URL Construction
```js
// Fynd CDN image with dimensions
export function getFyndImageUrl(url, width, height) {
  return `${url}?w=${width}&h=${height}&format=webp`;
}
```

---

## Constants

```js
// theme/helper/constants.js

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

export const ORDER_STATUS = {
  PLACED: "placed",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  RETURNED: "returned",
};

export const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_dsc" },
  { label: "Popular", value: "popular" },
];
```

---

## Rules for Utilities

- **Pure functions only** — given the same input, always return the same output
- No React imports, no `fpi`, no side effects
- Exported as named exports (no default export in utility files)
- Tested independently when logic is non-trivial
- Co-locate domain-specific utils near the component if only used once; move to `helper/` only when reused across 2+ components
