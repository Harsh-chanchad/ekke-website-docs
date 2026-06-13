---
sidebar_label: ADR-002 Hybrid Styling
sidebar_position: 2
---

# ADR-002: Hybrid Styling — Tailwind CSS 3 + Less CSS Modules

> **Status:** Accepted  
> **Date:** 2024-03-01  
> **Owner:** Engineering Team  
> **Reviewers:** Harsh Chanchad

---

## Context

The codebase had an existing styling approach using Less CSS Modules. As the project grew, component-level styles became hard to maintain and inconsistent. We evaluated adding a utility-first CSS framework.

---

## Decision

Adopt a **hybrid approach**: Tailwind CSS 3 for all new UI work, Less CSS Modules for extending existing legacy components.

Both pipelines run simultaneously via PostCSS.

---

## Rationale

- **Tailwind** reduces custom CSS surface area and enforces a design system via tokens
- **Less Modules** already used in existing components — rewriting all at once would be high-risk
- **Incremental migration** allows teams to adopt Tailwind gradually without breaking existing styles
- **`clsx` + `tailwind-merge`** handle conditional class composition cleanly

---

## Conventions

```jsx
// ✅ New components — Tailwind first
<div className={twMerge(clsx("p-4 rounded-lg bg-white", isActive && "ring-2 ring-primary"))}>

// ✅ Legacy components — Less Modules (extend, don't rewrite)
<div className={styles.productCard}>
```

---

## Consequences

**Positive:**
- Design consistency through Tailwind tokens
- Faster UI development for new features
- Gradual, safe migration path

**Negative:**
- Two styling systems add cognitive overhead
- Developers must know which approach applies to a given file
- PostCSS config must support both Less and Tailwind pipelines

---

## Status history

- 2024-03-01: **Accepted**
