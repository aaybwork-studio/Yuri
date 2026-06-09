# Roadmap: YURI Theme Development

This roadmap defines the phases of the YURI high-end luxury e-commerce theme development.

---

## Active Milestone: v1.0 - Foundations and Core UX

### Phase 1: Foundations, Tailwind v4 & Vite Setup
Establish the compilation toolchain and integrate the design system tokens.
* **Goal**: Enable compiling Tailwind v4 into the theme assets, load custom typography, and configure brand color tokens.
* **Tasks**:
  * [x] Task 1.1: Setup `package.json`, install Vite, `@tailwindcss/vite`, and Tailwind CSS dependencies.
  * [x] Task 1.2: Create the `frontend/` directory with `frontend/entry.css` containing Tailwind imports and custom theme variables.
  * [x] Task 1.3: Create `vite.config.js` to compile assets to Shopify's `assets/` directory.
  * [x] Task 1.4: Link custom assets in `layout/theme.liquid` (load Cormorant Garamond & Plus Jakarta Sans, and link Compiled CSS/JS).
  * [x] Task 1.5: Setup build script watcher and verify Tailwind class generation.

### Phase 2: Core Theme Layout & Design System
Re-skin the main page layout, header, footer, and basic sections with the Zen aesthetic.
* **Goal**: Update global styles, spacing, typography, and line aesthetics across the store.
* **Tasks**:
  * [x] Task 2.1: Custom-style the announcement bar and header with zen spacing and fonts.
  * [x] Task 2.2: Implement thin, elegant grid borders and spacious container paddings.
  * [x] Task 2.3: Restyle the home page hero section with earth-grounded colors and large typography.
  * [x] Task 2.4: Restyle the footer with warm neutrals and botanical text spacing.

### Phase 2.1: Customise the Home Page
Tailor home page sections to reflect the earthly grounded luxury Zen aesthetic.
* **Goal**: Re-skin default home page blocks (Featured Collection, Rich Text, Multicolumn) and ensure beautiful grids.
* **Tasks**:
  * [ ] Task 2.1.1: Restyle the Featured Collection section with custom zen text borders, card styles, and typography.
  * [ ] Task 2.1.2: Restyle the Rich Text section (editorial quote box with spacious margins).
  * [ ] Task 2.1.3: Custom-style the Multicolumn grid (e.g. showing "Hand-poured", "Natural Scent", "Zen-inspired" value props).

### Phase 2.2: Reshape the Landing Page UI
Completely restructure and style the homepage sections to align with the premium editorial look.
* **Goal**: Deliver a highly customized, full-screen interactive landing page matching the design mockups.
* **Tasks**:
  * [x] Task 2.2.1: Copy Monogram and Wordmark-green assets to the theme assets folder.
  * [x] Task 2.2.2: Modify `sections/header.liquid` to implement centered logo with split navigation links.
  * [x] Task 2.2.3: Create `sections/custom-hero.liquid` for the 2/3 height autoplay slideshow.
  * [x] Task 2.2.4: Create `sections/custom-featured-products.liquid` with borderless floating cards and horizontal scroll.
  * [x] Task 2.2.5: Create `sections/custom-browse-mirrored.liquid` containing full-screen mirrored content blocks and a category slider.
  * [x] Task 2.2.6: Create `sections/custom-about-us.liquid` split-panel section.
  * [x] Task 2.2.7: Restyle `sections/footer.liquid` into a rounded custom brand card layout matching the reference mockup.

### Phase 3: Product Pages, Scent Profiles & Accordions
Create a premium product detail page template with customized metafield elements.
* **Goal**: Build custom sections for scent notes, ingredients accordions, and high-end buy-buttons.
* **Tasks**:
  * [ ] Task 3.1: Modify `sections/main-product.liquid` to use custom zen layouts and fonts.
  * [ ] Task 3.2: Implement a custom "Scent Profile Grid" block displaying Top, Mid, and Base notes.
  * [ ] Task 3.3: Implement smooth, accessible accordion tabs for ingredients, care instructions, and shipping.
  * [ ] Task 3.4: Integrate variant selector restyling matching the brand tokens.

### Phase 4: Slide-Out Ajax Cart Drawer
Build a smooth, interactive cart drawer that triggers upon adding products.
* **Goal**: Provide a seamless add-to-cart experience without page reloads.
* **Tasks**:
  * [ ] Task 4.1: Create a custom snippet `snippets/cart-drawer.liquid` representing the right-side slide-out panel.
  * [ ] Task 4.2: Build Ajax Javascript handler in `frontend/cart.js` to intercept Dawn's add-to-cart actions.
  * [ ] Task 4.3: Support dynamic drawer items update (quantity updates, item removals, dynamic subtotal).

### Phase 5: Collection Filters & Quick View
Optimize collection layout pages with custom faceted filters and quick-preview modal.
* **Goal**: Enhance product discovery with clean side-panel filters and variant selection.
* **Tasks**:
  * [ ] Task 5.1: Revamp Dawn's default faceted filter form to render in a minimal slide-out panel.
  * [ ] Task 5.2: Implement product card Quick View modals showing descriptions, images, and buy-buttons.
  * [ ] Task 5.3: Build an elegant recommendation section at the bottom of product details.

### Phase 6: Optimization & Quality Gates
Finalize the project with speed audits, theme checking, and compliance verification.
* **Goal**: Deliver a clean, production-grade theme ready for deployment via GitHub integration.
* **Tasks**:
  * [ ] Task 6.1: Run `shopify theme check` to ensure Online Store 2.0 compliance and no liquid errors.
  * [ ] Task 6.2: Audit and optimize JS/CSS compile files for mobile performance.
  * [ ] Task 6.3: Verify accessibility standards (Lighthouse score 90+).
