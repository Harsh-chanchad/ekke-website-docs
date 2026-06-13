---
sidebar_label: Sections
sidebar_position: 1
---

# CMS Sections Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Sections are **CMS-configurable content blocks** that store owners compose on any page via the Fynd Platform theme editor. Each section exports a `Component` (React) and a `settings` object (schema for the editor UI).

**Total sections: 60+**  
**Location:** `theme/sections/`

---

## Product Display

| Section | File | Description |
|---------|------|-------------|
| `custom-collection-listing` | `custom-collection-listing.jsx` | Collection products in slider or grid with cart handling |
| `product-listing` | `product-listing.jsx` | Main PLP — filters, sort, pagination |
| `featured-collection` | `featured-collection.jsx` | Themed product showcase with layout options |
| `product-carousel` | `product-carousel.jsx` | Horizontal scrollable strip via `fpi.catalog.getProducts()` |
| `products-slider` | `products-slider.jsx` | Hand-curated product selection slider |
| `product-description` | `product-description.jsx` | Complete PDP — variants, sizing, sharing |
| `product-recommendation` | `product-recommendation.jsx` | "You may also like" strips (REST API powered) |
| `fashion-grid` | `fashion-grid.jsx` | Editorial product grid + hero slider |
| `multi-collection-product-list` | `multi-collection-product-list.jsx` | Tabbed grouped products |
| `multi-recommendation-list` | `multi-recommendation-list.jsx` | Stacked recommendation strips |

---

## Catalog Browsing

| Section | File | Description |
|---------|------|-------------|
| `collections` | `collections.jsx` | Collection navigation grid |
| `collections-listing` | `collections-listing.jsx` | Full collections listing page |
| `categories` | `categories.jsx` | Category grid or carousel |
| `categories-listing` | `categories-listing.jsx` | Full category listing |
| `custom-categories` | `custom-categories.jsx` | Complex hero + category cards |
| `brand-listing` | `brand-listing.jsx` | Brand display grid |
| `brands-landing` | `brands-landing.jsx` | Full brands landing page |
| `brands-row-grid` | `brands-row-grid.jsx` | Horizontal brand row grid |
| `collection-recommendation` | `collection-recommendation.jsx` | Below-cart collection suggestions |
| `category-collectibles` | `category-collectibles.jsx` | Themed category collections |
| `exclusive-edition` | `exclusive-edition.jsx` | Exclusive/limited collection display |

---

## Hero & Media

| Section | File | Description |
|---------|------|-------------|
| `hero-banner` | `hero-banner.jsx` | Full-width image/video with hotspots and CTAs |
| `hero-image` | `hero-image.jsx` | Positioned text overlays on images |
| `hero-video` | `hero-video.jsx` | MP4 / YouTube / Google Drive video sections |
| `image-gallery` | `image-gallery.jsx` | Stack or carousel layouts |
| `image-slideshow` | `image-slideshow.jsx` | Auto-advancing image carousel |
| `media-with-text` | `media-with-text.jsx` | Image + product hotspots |

---

## Editorial Content

| Section | File | Description |
|---------|------|-------------|
| `blog` | `blog.jsx` | Featured carousel + searchable/filterable listing |
| `feature-blog` | `feature-blog.jsx` | Recent posts slider |
| `testimonials` | `testimonials.jsx` | Customer quote carousel |
| `trust-marker` | `trust-marker.jsx` | USP/badge rows |
| `about-us` | `about-us.jsx` | Static brand story |
| `detail-component` | `detail-component.jsx` | Static subtitle + body text |
| `info-text` | `info-text.jsx` | Styled HTML content |
| `raw-html` | `raw-html.jsx` | Arbitrary HTML/CSS/JS injection |
| `sitemap` | `sitemap.jsx` | Auto-generated from navigation |

---

## Commerce & Transactional

| Section | File | Description |
|---------|------|-------------|
| `cart-landing` | `cart-landing.jsx` | Integrated cart + wishlist interface |
| `order-details` | `order-details.jsx` | Order view with shipment tracking |
| `sizing-help` | `sizing-help.jsx` | Size guide via configurable blocks |

---

## Authentication & Forms

| Section | File | Description |
|---------|------|-------------|
| `login` | `login.jsx` | Auth form with banner image |
| `register` | `register.jsx` | Registration form with banner image |
| `newsletter-form` | `newsletter-form.jsx` | Email capture with validation |
| `contact-us` | `contact-us.jsx` | Form with file upload + address display |

---

## Specialized

| Section | File | Description |
|---------|------|-------------|
| `designer` | `designer.jsx` | Department-filtered designer listing |
| `application-banner` | `application-banner.jsx` | App download badges (iOS/Android) |
| `banner-detail` | `banner-detail.jsx` | Rich CTA block |
| `link` | `link.jsx` | Simple configurable anchor |

---

## Section Anatomy

Every section follows this pattern:

```jsx
// theme/sections/hero-banner.jsx

function HeroBanner({ props, fpi }) {
  const data = useGlobalStore(fpi.getters.CUSTOM_VALUE)("hero_data");
  return <div>...</div>;
}

HeroBanner.serverFetch = async ({ fpi }) => {
  // Pre-fetch data for SSR
  const data = await getSomething(fpi);
  fpi.custom.setValue("hero_data", data);
};

HeroBanner.settings = {
  props: [
    { id: "heading", label: "Heading", type: "text", default: "Welcome" },
    { id: "show_cta", label: "Show CTA Button", type: "checkbox", default: true },
  ],
  blocks: [],
};

export default HeroBanner;
```

### Common Patterns

- **State management:** Mix of `useState`, `useReducer`, and `useGlobalStore()`
- **API calls:** `fpi.executeGQL()` for GraphQL; REST for recommendations and newsletter
- **Carousels:** `react-slick` library
- **Images:** `FyImage` component for responsive images
- **Navigation:** `FDKLink` for internal routing
- **Add to cart:** Requires smallest available size detection + seller/store lookup + cart drawer state toggle
- **Wishlist:** Guest users get a login modal trigger
