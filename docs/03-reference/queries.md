---
sidebar_label: Queries
sidebar_position: 6
---

# Queries Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

GraphQL query functions live in `theme/queries/`. They are the **only place** data fetching logic should exist. Components and pages call these functions; they never call `fpi.executeGQL()` directly.

**Location:** `theme/queries/`

---

## Query File Organization

Queries are organized by domain:

```
theme/queries/
├── catalog.js        # Product, collection, category queries
├── cart.js           # Cart, wishlist operations
├── user.js           # Profile, auth, address queries
├── order.js          # Order history, tracking, returns
├── content.js        # Blog, CMS content queries
├── brand.js          # Brand listing queries
└── payment.js        # Payment methods, beneficiaries
```

---

## Query Function Signature

All query functions follow this exact pattern:

```js
/**
 * @param {Object} fpi - FPIClient instance
 * @param {Object} params - Query variables
 * @returns {Promise} Raw FPI response
 */
export async function getFunctionName(fpi, params) {
  return fpi.executeGQL(GRAPHQL_QUERY, params);
}
```

Rules:
- Accept `(fpi, params)` as arguments — always in this order
- Return the **raw FPI response** — do not transform data in queries
- Use descriptive names: `getCartDetails`, `removeCartItem`, `getProductsBySlug`
- No rendering, no state, no side effects

---

## Catalog Queries (examples)

```js
// theme/queries/catalog.js

const GET_PRODUCT_DETAILS = `
  query GetProductDetails($slug: String!) {
    product(slug: $slug) {
      uid
      name
      slug
      description
      brand { name }
      price { effective { min max currency_symbol } }
      sizes { display value is_available }
      images { url aspect_ratio }
    }
  }
`;

export async function getProductDetails(fpi, { slug }) {
  return fpi.executeGQL(GET_PRODUCT_DETAILS, { slug });
}

export async function getProductListing(fpi, params) {
  return fpi.executeGQL(GET_PRODUCT_LISTING, params);
}
```

---

## Cart Queries (examples)

```js
// theme/queries/cart.js

export async function getCartDetails(fpi) {
  return fpi.executeGQL(GET_CART_DETAILS);
}

export async function addToCart(fpi, { itemId, size, quantity }) {
  return fpi.executeGQL(ADD_TO_CART_MUTATION, { itemId, size, quantity });
}

export async function removeCartItem(fpi, { key, quantity }) {
  return fpi.executeGQL(REMOVE_CART_ITEM_MUTATION, { key, quantity });
}
```

---

## REST vs GraphQL

Most queries use GraphQL via `fpi.executeGQL()`. Two exceptions use REST APIs:

| Domain | API Type | Reason |
|--------|----------|--------|
| Product recommendations | REST | Recommendation engine has its own REST endpoint |
| Newsletter subscription | REST | Email service provider webhook |

REST calls are still in `theme/queries/` — they just use `fetch` or `axios` instead of `fpi.executeGQL()`.

---

## Adding a New Query

1. Identify the correct domain file (`catalog.js`, `cart.js`, etc.)
2. Define the GraphQL query string as a constant (UPPER_SNAKE_CASE)
3. Export an async function with the `(fpi, params)` signature
4. Call the function from `serverFetch` or a component effect — never inline `executeGQL`

```js
// 1. Define query
const GET_BRAND_PRODUCTS = `
  query GetBrandProducts($brand: String!, $pageSize: Int) {
    products(brand: $brand, pageSize: $pageSize) {
      items { uid name slug }
    }
  }
`;

// 2. Export function
export async function getBrandProducts(fpi, { brand, pageSize = 20 }) {
  return fpi.executeGQL(GET_BRAND_PRODUCTS, { brand, pageSize });
}
```
