---
sidebar_label: Operations
sidebar_position: 1
---

# Operations

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## CI/CD Pipeline

Ekke uses **Azure Pipelines** for continuous integration and deployment.

**Pipeline file:** `azure-pipelines.yml`

### Pipeline stages

| Stage | Trigger | Actions |
|-------|---------|---------|
| Build | Every PR / push | `npm install` → `npm run lint` → `npm run build` |
| Publish | `main` branch only | `npm run publish:theme` |

### Branch → Environment mapping

| Branch | Environment |
|--------|-------------|
| `main` | Production (Fynd Platform live theme) |
| `devx_dev` | Development / staging |
| `uat` | UAT / pre-production |
| `feature/*` | Local only — no auto-deploy |

---

## Deployment

### Standard release flow

```
feature/xxx → devx_dev → uat → main
```

1. PR from `feature/xxx` to `devx_dev` — code review required
2. QA validation on `devx_dev` / `uat` environment
3. PR from `devx_dev` (or `uat`) to `main`
4. Merge triggers Azure Pipelines → `npm run publish:theme`
5. Activate the new theme version in Fynd Platform theme editor if needed

### Manual publish (emergency)

```bash
npm run build
npm run publish:theme
```

Requires FDK CLI authenticated with the correct Partner account:
```bash
fdk login
```

---

## Rollback

### Theme rollback via Fynd Platform

1. Go to Fynd Partner Portal → Sales Channel → Theme
2. Click **Theme History** or **Previous Versions**
3. Select the last stable version
4. Click **Activate**

This is the fastest rollback path — no code change required.

### Code rollback

```bash
# On main branch, revert to last known good commit
git revert HEAD
git push origin main
```

Azure Pipelines will re-publish the reverted theme automatically.

---

## Monitoring & Alerts

| What to watch | Where |
|---------------|-------|
| Build status | Azure Pipelines dashboard |
| Theme publish status | Fynd Partner Portal → Activity |
| JS errors in production | Browser console / Sentry (if configured) |
| Page performance | Google PageSpeed / Core Web Vitals |

---

## Incident Response

### Theme is broken in production

1. **Immediate:** Rollback via Fynd Platform theme history (fastest)
2. **Identify root cause:** Check Azure Pipelines last build logs
3. **Fix forward** if rollback unavailable: hotfix branch from `main` → PR → merge → publish
4. **Post-incident:** Document in ADRs or incident log

### Build fails in CI

1. Check Azure Pipelines logs — look for lint errors or webpack errors
2. Reproduce locally: `npm run lint && npm run build`
3. Common causes:
   - Unused variables (ESLint)
   - Missing i18n translation keys
   - Bad import paths
   - MDX/JSX syntax errors in sections

### `fdk publish:theme` fails

```bash
# Re-authenticate
fdk login

# Verify connected sales channel
fdk env list

# Retry publish
npm run publish:theme
```

---

## Performance Considerations

- **Images:** Always use `FyImage` component — it handles Fynd CDN optimization and `webp` conversion
- **Lazy loading:** Use `useIntersectionObserver` for below-the-fold sections
- **Bundle size:** `react-i18next` is NOT bundled (provided by platform runtime) — do not import it directly from npm
- **SSR:** All critical data must be fetched in `serverFetch` — client-side data fetching causes layout shifts
