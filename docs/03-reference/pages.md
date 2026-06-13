---
sidebar_label: Pages
sidebar_position: 2
---

# Pages Reference

> **Owner:** Harsh Chanchad  
> **Last Updated:** 2026-06-13  
> **Status:** Approved

Pages are **route-level components** — one per URL route. They handle data composition but contain no business logic (that lives in components and sections).

**Total pages: 40+**  
**Location:** `theme/pages/`

---

## Catalog & Discovery

| Page | File | Route | Description |
|------|------|-------|-------------|
| Home | `home.jsx` | `/` | Homepage — composed of CMS sections |
| Product Listing | `product-listing.jsx` | `/products` | PLP with filters, sort, pagination |
| Product Description | `product-description.jsx` | `/products/:slug` | PDP — full product detail view |
| Collections | `collections.jsx` | `/collections` | All collections listing |
| Collection Listing | `collection-listing.jsx` | `/collections/:slug` | Products within a collection |
| Categories | `categories.jsx` | `/categories` | All categories |
| Brands | `brands.jsx` | `/brands` | All brands |
| Blog | `blog.jsx` | `/blog` | Blog listing + articles |

---

## Cart & Checkout

| Page | File | Route | Description |
|------|------|-------|-------------|
| Cart Landing | `cart-landing.jsx` | `/cart` | Cart with wishlist integration |
| Single Page Checkout | `single-page-checkout.jsx` | `/checkout` | Unified checkout flow |
| Shared Cart | `shared-cart.jsx` | `/shared-cart` | Shared cart link handler |
| Payment Link | `payment-link.jsx` | `/payment-link` | Payment link landing page |
| Order Status | `order-status.jsx` | `/order-status` | Post-payment order status |

---

## User Account

| Page | File | Route | Description |
|------|------|-------|-------------|
| Profile Details | `profile-details.jsx` | `/profile` | User profile edit |
| Edit Profile | `edit-profile.jsx` | `/profile/edit` | Profile edit form |
| Profile Address | `profile-address.jsx` | `/profile/address` | Saved addresses management |
| Orders List | `orders-list.jsx` | `/orders` | Order history list |
| Shipment Details | `shipment-details.jsx` | `/orders/:id/shipment` | Per-shipment detail view |
| Order Tracking | `order-tracking.jsx` | `/orders/:id/track` | Live order tracking |
| Order Tracking Details | `order-tracking-details.jsx` | `/orders/:id/track-details` | Detailed tracking info |
| Refund Order | `refund-order.jsx` | `/orders/:id/refund` | Refund initiation |
| Wishlist | `wishlist.jsx` | `/wishlist` | Saved wishlist items |

---

## Authentication

| Page | File | Route | Description |
|------|------|-------|-------------|
| Login | `login.jsx` | `/login` | Login form |
| Register | `register.jsx` | `/register` | Registration form |
| Forgot Password | `forgot-password.jsx` | `/forgot-password` | Password reset request |
| Set Password | `set-password.jsx` | `/set-password` | New password form |
| Verify Email | `verify-email.jsx` | `/verify-email` | Email verification |
| Verify Email Link | `verify-email-link.jsx` | `/verify-email-link` | Email link handler |
| Account Locked | `account-locked.jsx` | `/account-locked` | Locked account page |

---

## Static & Info Pages

| Page | File | Route | Description |
|------|------|-------|-------------|
| About Us | `about-us.jsx` | `/about-us` | Brand story page |
| Contact Us | `contact-us.jsx` | `/contact-us` | Contact form |
| FAQ | `faq.jsx` | `/faq` | Frequently asked questions |
| Blog | `blog.jsx` | `/blog` | Blog articles |
| Policy | `policy.jsx` | `/policy` | Privacy/terms policy |
| Return Policy | `return-policy.jsx` | `/return-policy` | Return policy page |
| Shipping Policy | `shipping-policy.jsx` | `/shipping-policy` | Shipping policy page |
| T&C | `tnc.jsx` | `/tnc` | Terms & conditions |
| Locate Us | `locate-us.jsx` | `/locate-us` | Store locator (Google Maps) |

---

## Page Anatomy

Pages are thin route wrappers — they import a `page-layout` and pass data:

```jsx
// theme/pages/product-listing.jsx (simplified)
import ProductListingLayout from "../page-layouts/plp";

function ProductListingPage({ fpi }) {
  return <ProductListingLayout fpi={fpi} />;
}

ProductListingPage.serverFetch = async ({ fpi, router }) => {
  await getProductListingData(fpi, router.query);
};

export default ProductListingPage;
```

Pages must NOT contain:
- Business logic (move to layouts or components)
- Direct API calls (move to `queries/`)
- UI rendering beyond layout composition
