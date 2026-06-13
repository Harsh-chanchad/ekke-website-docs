---
sidebar_label: Hooks
sidebar_position: 4
---

# Hooks Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Custom hooks live in `theme/helper/`. They encapsulate reusable stateful logic — no rendering, no routing, no direct API calls outside of `fpi`.

**Location:** `theme/helper/hooks/`

---

## FPI / Store Hooks

### `useGlobalStore`
Access the FPI global store (GraphQL cache + custom values).

```js
import { useGlobalStore } from "fdk-core/utils";

function MyComponent({ fpi }) {
  const cartData = useGlobalStore(fpi.getters.CART_DETAILS);
  // ...
}
```

> **Note:** `useGlobalStore` is provided by the FDK platform, not defined in this repo. It is the primary data access pattern throughout the theme.

---

## UI / Interaction Hooks

### Common patterns found in `theme/helper/`

| Hook Pattern | Purpose |
|-------------|---------|
| `useWindowSize` / `useBreakpoint` | Responsive breakpoint detection |
| `useClickOutside` | Close dropdowns/modals on outside click |
| `useDebounce` | Debounce search inputs and rapid state updates |
| `useIntersectionObserver` | Lazy-load images and infinite scroll triggers |
| `useLocalStorage` | Persist user preferences (guest cart, language) |
| `useScrollLock` | Lock body scroll when modals/drawers are open |

---

## Auth Hooks / Guards

Auth guards in `theme/helper/` protect routes that require login:

```js
// theme/helper/auth-guard.js (pattern)
export function withAuthGuard(Component) {
  return function GuardedComponent(props) {
    const user = useGlobalStore(props.fpi.getters.USER_DATA);
    if (!user?.logged_in) {
      // redirect to login
    }
    return <Component {...props} />;
  };
}
```

Pages that require authentication (orders, wishlist, profile, checkout) use auth guards to redirect unauthenticated users.

---

## Writing Custom Hooks

Follow these rules when adding new hooks:

```js
// theme/helper/hooks/use-cart-summary.js

import { useGlobalStore } from "fdk-core/utils";

/**
 * Returns cart item count and total price.
 */
export function useCartSummary(fpi) {
  const cart = useGlobalStore(fpi.getters.CART_DETAILS);

  return {
    itemCount: cart?.items?.length ?? 0,
    total: cart?.breakup_values?.display?.find((b) => b.key === "total")?.value ?? 0,
  };
}
```

Rules:
- Accept `fpi` as a parameter if store access is needed
- Return plain values or objects — never JSX
- Name with `use` prefix (React convention)
- File: `kebab-case.js` in `theme/helper/hooks/`
