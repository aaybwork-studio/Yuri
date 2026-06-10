# Requirements: YURI Theme

## 1. Functional Requirements

### FR 1: Brand Design System & Tailwind v4 Integration
* **FR 1.1**: Set up custom design system tokens in Tailwind v4 for all colors (greens, browns, neutrals, and pop orange) and typography (Cormorant Garamond and Plus Jakarta Sans).
* **FR 1.2**: Inject compiled Tailwind classes into standard Dawn liquid files, overriding Dawn's default styling variables where appropriate.
* **FR 1.3**: Configure custom layouts with wide, airy margins, clean thin borders (reflecting Japanese shoji screen lines), and elegant wabi-sabi details.

### FR 2: Slide-Out Ajax Cart Drawer
* **FR 2.1**: Implement a custom slide-out Ajax Cart Drawer on the right-hand side.
* **FR 2.2**: Drawer must load dynamically without a full-page reload when clicking the cart icon or using "Quick Add" buttons.
* **FR 2.3**: Enable item quantity increments, decrements, and removals inside the drawer with immediate subtotal updates.

### FR 3: Faceted Search & Collection Filtering
* **FR 3.1**: Redesign Dawn's default faceted filtering UI to match YURI's minimalist design (slide-out side panel or collapsible drawer).
* **FR 3.2**: Enable filtering by price, availability, and custom metafield tags (e.g. scent profiles: woody, floral, herbal).

### FR 4: Product Quick View & Recommendations
* **FR 4.1**: Create an elegant modal-based Quick View for product collections, allowing users to see product details, select variants, and add to cart directly.
* **FR 4.2**: Design a custom horizontal product recommendation carousel matching the Zen aesthetic.

### FR 5: Scent Metafields & Accordion Details
* **FR 5.1**: Integrate interactive metafield displays on the product detail page, showing a visual "Scent Profile Grid" (Top notes, Mid notes, Base notes).
* **FR 5.2**: Implement smooth accordion tabs for "Scent Experience", "Ingredients & Safety", and "Shipping & Returns".

### FR 6: Homepage Personalization (Milestone v1.1)
* **FR 6.1** [x]: Refactor YURI global design system variables with the new Figma color palette (Ivory #eeecd3, Dark Brown #403002, Rose #cc1574, Gold #efbf04) and Space Grotesk / Hanken Grotesk typography.
* **FR 6.2**: Restructure the homepage hero slideshow (`sections/custom-hero.liquid`) to showcase sculptural wax/concrete products with smooth autoplay transitions and editorial styling.
* **FR 6.3**: Refactor the custom featured products grid (`sections/custom-featured-products.liquid`) to use floating, borderless card layouts with tactile micro-interactions and hover details.
* **FR 6.4**: Integrate scroll-driven storytelling and smooth navigation (via GSAP and Lenis) across homepage sections for a premium, meditative user experience.

---


## 2. Non-Functional Requirements

### NFR 1: Performance & SEO
* **NFR 1.1**: The compiled CSS bundle must be optimized and minified, keeping the cumulative layout shift (CLS) under 0.1 and Largest Contentful Paint (LCP) under 2.5s.
* **NFR 1.2**: All images must load lazily with proper aspect ratio boxes to avoid layout shifting.
* **NFR 1.3**: Fully comply with Shopify Online Store 2.0 theme requirements (semantic HTML5, valid JSON schemas, app block support).

### NFR 2: Accessibility & Usability
* **NFR 2.1**: Theme must achieve a minimum Lighthouse Accessibility score of 90+.
* **NFR 2.2**: All interactive components (Modals, Cart Drawers, Filters) must support keyboard navigation and ARIA labeling.
