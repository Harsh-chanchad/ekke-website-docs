---
sidebar_label: How-To Runbooks
sidebar_position: 1
---

# How-To Runbooks

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Task-based guides for common development workflows.

---

## Add a New CMS Section

1. Create file: `theme/sections/my-section.jsx`
2. Implement the component:
```jsx
function MySection({ props, fpi }) {
  const { heading, show_cta } = props;
  return (
    <div className="my-section">
      <h2>{heading}</h2>
      {show_cta && <button>Click me</button>}
    </div>
  );
}
```
3. Add `serverFetch` if the section needs pre-fetched data:
```js
MySection.serverFetch = async ({ fpi }) => {
  const data = await getMyData(fpi);
  fpi.custom.setValue("my_section_data", data);
};
```
4. Define the `settings` schema:
```js
MySection.settings = {
  props: [
    { id: "heading", label: "Section Heading", type: "text", default: "Hello" },
    { id: "show_cta", label: "Show CTA", type: "checkbox", default: true },
  ],
  blocks: [],
};
```
5. Export: `export default MySection;`
6. Register in `theme/index.jsx` under the `sections` export
7. Upload: `fdk section push`

---

## Add a New Page

1. Create file: `theme/pages/my-page.jsx`
2. Implement the page component:
```jsx
import MyPageLayout from "../page-layouts/my-page-layout";

function MyPage({ fpi }) {
  return <MyPageLayout fpi={fpi} />;
}

MyPage.serverFetch = async ({ fpi, router }) => {
  await getMyPageData(fpi, router.query);
};

export default MyPage;
```
3. Register the route in `pages.json`
4. Register in `theme/index.jsx` under `pages`

---

## Add a New Query

1. Identify domain file: `theme/queries/catalog.js`, `cart.js`, etc.
2. Define the GraphQL query string
3. Export an async function:
```js
export async function getMyData(fpi, params) {
  return fpi.executeGQL(MY_QUERY, params);
}
```
4. Call from `serverFetch` or a component `useEffect`

---

## Add a New Language

1. Add a new locale JSON file: `theme/locales/[lang-code].json`
2. Copy the structure from `en.json` and translate all values
3. Register the language in the i18n config
4. Test RTL layout if adding Arabic (`ar`) or another RTL language (set `dir="rtl"` on `<html>`)

---

## Publish Theme to Fynd Platform

```bash
# 1. Build production assets
npm run build

# 2. Publish to connected sales channel
npm run publish:theme
```

> The theme will be live in the Fynd Platform theme library. Activate it via the platform's theme editor.

---

## Run Linting

```bash
npm run lint
```

Fix auto-fixable issues:
```bash
npm run lint -- --fix
```

---

## Debug SSR Issues

If a section or page fails during server-side rendering:

1. Check the `serverFetch` function — all async calls must be awaited
2. Verify FPI custom store keys match between `serverFetch` and component reads
3. Check for client-only APIs (`window`, `document`, `localStorage`) used outside `useEffect`
4. Run `fdk logs` to view platform SSR error logs

---

## Add i18n Translation Key

1. Add the key to `theme/locales/en.json` (English is the source of truth):
```json
{
  "product.add_to_cart": "Add to Cart"
}
```
2. Add the same key to all other locale files with translations
3. Use in components:
```jsx
import { useTranslation } from "react-i18next";

function AddToCartButton() {
  const { t } = useTranslation();
  return <button>{t("product.add_to_cart")}</button>;
}
```

---

## Update Theme Settings Schema

Theme settings control what store owners can configure without code changes.

1. Edit `theme/sections/[section].jsx` → update the `settings` export
2. Run `fdk section push` to sync schema to platform
3. For global theme settings, edit the settings schema via FDK CLI

---

## Rollback a Bad Deploy

See [Operations → Rollback Procedure](../05-operations/operations.md#rollback).
