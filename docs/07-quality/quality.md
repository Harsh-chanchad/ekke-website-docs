---
sidebar_label: Quality
sidebar_position: 1
---

# Quality Standards

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## Pre-Merge Checklist

Before merging any PR to `devx_dev` or `main`, verify:

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds (no Webpack errors)
- [ ] Feature tested locally with `npm run dev`
- [ ] Section uploads tested: `fdk section push`
- [ ] i18n — new text strings added to **all** locale files in `theme/locales/`
- [ ] RTL layout checked if text/layout changes affect Arabic (`ar`) locale
- [ ] No `console.log` statements left in production code
- [ ] No unused imports, variables, or dead code
- [ ] PR description explains **what** changed and **why**

---

## Code Review Standards

### Required for all PRs
- At least 1 approval before merging
- PR must target `devx_dev` (not `main` directly, except hotfixes)

### Reviewer checklist
- [ ] Business logic is not in pages or layouts
- [ ] New query functions follow the `(fpi, params)` signature
- [ ] No inline `fpi.executeGQL()` calls outside `theme/queries/`
- [ ] Styling uses Tailwind for new code (not arbitrary inline styles)
- [ ] Component files under ~200 lines (extract sub-components if needed)
- [ ] No hardcoded strings — all user-facing text uses `t()` from i18n

---

## Linting Configuration

ESLint is configured in the project root. Key rules:

| Rule | Enforcement |
|------|-------------|
| No unused variables | Error |
| No console.log | Warning |
| React hooks rules | Error |
| Import order | Warning |
| Prefer `const` | Error |

Run: `npm run lint`  
Auto-fix: `npm run lint -- --fix`

---

## Testing Approach

> **Note:** Automated test coverage is a known gap in this project. Unit and integration tests are not yet in place. This is a future improvement area.

**Current QA approach:**
1. Manual testing in `npm run dev` local environment
2. QA validation on `devx_dev` / `uat` branch before promoting to `main`
3. Fynd Platform preview deployment for section testing

**Future goal:**
- Add Jest + React Testing Library for component unit tests
- Add Playwright for critical e-commerce flow E2E tests (add to cart, checkout, order placement)

---

## Known Risks & Technical Debt

| Risk | Impact | Mitigation |
|------|--------|-----------|
| No automated tests | High — regressions caught late | Manual QA + incremental test addition |
| Hybrid styling (Less + Tailwind) | Medium — inconsistency | New code must use Tailwind |
| SSR-only data access | Medium — client hydration mismatches | Always fetch in `serverFetch`, not `useEffect` for initial data |
| 60+ sections in one bundle | Medium — bundle size | Platform CDN handles; monitor Core Web Vitals |
| Single vendor dependency (Fynd) | High — lock-in | Accepted trade-off per ADR-001 |
