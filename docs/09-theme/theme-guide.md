---
sidebar_label: Theme Guide
sidebar_position: 1
---

# Theme Guide

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

## Design System Overview

Ekke uses a **Tailwind CSS 3** based design system for new components, with a legacy Less CSS pipeline for existing components. The Tailwind config (`tailwind.config.js`) defines the design tokens.

---

## Tailwind Configuration

Key customizations in `tailwind.config.js`:

```js
module.exports = {
  content: ["./theme/**/*.{jsx,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",       // Brand primary (configurable)
        secondary: "var(--color-secondary)",   // Brand secondary
        accent: "var(--color-accent)",         // Accent color
      },
      fontFamily: {
        sans: ["var(--font-primary)", "sans-serif"],
      },
    },
  },
};
```

> **Note:** Primary and secondary colors are CSS variables injected by the Fynd Platform theme settings — store owners pick their brand colors in the theme editor.

---

## Typography

| Class | Usage |
|-------|-------|
| `text-4xl font-bold` | Page headings (H1) |
| `text-2xl font-semibold` | Section headings (H2) |
| `text-xl font-medium` | Card titles (H3) |
| `text-base` | Body text |
| `text-sm text-gray-500` | Helper text, labels |
| `text-xs` | Captions, badges |

---

## Spacing & Layout

Ekke uses Tailwind's default spacing scale (4px base unit):

| Value | Size | Common use |
|-------|------|-----------|
| `p-2` | 8px | Compact UI |
| `p-4` | 16px | Default padding |
| `p-6` | 24px | Section padding |
| `p-8` | 32px | Large section padding |
| `gap-4` | 16px | Default grid/flex gap |

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind prefix |
|-----------|-------|----------------|
| Mobile | < 768px | (default) |
| Tablet | ≥ 768px | `md:` |
| Desktop | ≥ 1024px | `lg:` |
| Wide | ≥ 1280px | `xl:` |

```jsx
// Mobile-first responsive pattern
<div className="px-4 md:px-8 lg:px-16">
  <h1 className="text-2xl md:text-4xl lg:text-5xl">Heading</h1>
</div>
```

---

## Color Usage

| Token | Usage |
|-------|-------|
| `bg-primary` / `text-primary` | CTA buttons, links, highlights |
| `bg-secondary` | Secondary actions |
| `bg-gray-50` / `bg-white` | Card backgrounds |
| `bg-gray-100` | Skeleton loaders, subtle backgrounds |
| `text-gray-900` | Primary text |
| `text-gray-500` | Muted/secondary text |
| `text-gray-400` | Placeholders |
| `border-gray-200` | Dividers, card borders |

---

## Component Patterns

### Product Card

```jsx
<div className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
  <div className="aspect-square overflow-hidden">
    <FyImage src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-4">
    <p className="text-sm text-gray-500">{product.brand.name}</p>
    <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">{product.name}</h3>
    <p className="mt-2 font-bold text-primary">{formatPrice(product.price)}</p>
  </div>
</div>
```

### CTA Button

```jsx
// Primary
<button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
  Add to Cart
</button>

// Secondary/Outline
<button className="px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">
  View Details
</button>
```

---

## RTL Support

For Arabic (`ar`) and other RTL languages:

```jsx
// Use logical properties where possible
<div className="ps-4 pe-6">  {/* padding-inline-start/end */}

// Or handle via dir attribute
<div dir={isRTL ? "rtl" : "ltr"} className="text-start">
```

The platform injects `dir="rtl"` on the `<html>` element for RTL locales — most layout reversal is automatic with Tailwind's logical property classes.

---

## Animations

Ekke uses **Framer Motion 11** for animations:

```jsx
import { motion, AnimatePresence } from "framer-motion";

// Fade in on mount
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// List item stagger
<motion.ul>
  {items.map((item, i) => (
    <motion.li
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.05 }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

**Performance rule:** Do not animate more than 5-6 elements simultaneously on mobile — use `reducedMotion` variants for accessibility.
