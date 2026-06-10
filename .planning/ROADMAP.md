# Roadmap: YURI Theme Development

This roadmap defines the phases of the YURI high-end luxury e-commerce theme development.

---

## Active Milestone: v1.1 - Homepage Personalization & Brand Vibe

### Phase 1: Design System Setup

Establish the new brand typography, color palette, and layout system.

* **Goal**: Implement the new color variables (#eeecd3 background, #403002 text/primary, #cc1574 Rose, #efbf04 Gold) and typography (Space Grotesk and Hanken Grotesk) across stylesheets, layout, and native configuration.
* **Tasks**:
  * [x] Task 1.1: Font Integration and Scroll Setup (Plan 01)
  * [x] Task 1.2: Tailwind CSS v4 Variables & Resets Configuration (Plan 01)
  * [x] Task 1.3: Dawn Native Settings Synchronization (Plan 02)
  * [x] Task 1.4: Interactive Transitions and Badges (Plan 02)
  * [x] Task 1.5: Custom Templates & Footer Accent Refactoring (Plan 02)

### Phase 2: Homepage Hero & Slideshow

Refactor the homepage hero section to showcase the sculptural 3D products and visual assets.

* **Goal**: Personalize the slide-show hero (`sections/custom-hero.liquid`) with the new visual layout, clean margins, and delicate botanical overlays.
* **Tasks**:
  * [ ] Task 2.1: Update schema settings in `sections/custom-hero.liquid` to accommodate the new brand imagery and description text.
  * [ ] Task 2.2: Apply the new color schemes and typographic hierarchy (Cormorant Garamond headings) to slide text blocks.
  * [ ] Task 2.3: Implement smooth fade/slide transitions between slideshow frames.

### Phase 3: Floating Product Grids & Cards

Refactor the custom featured products grid to use borderless, visual-heavy layouts and tactile hover transitions.

* **Goal**: Redesign the featured collection elements and cards on the homepage to highlight the 3D sculptural products.
* **Tasks**:
  * [ ] Task 3.1: Modify `sections/custom-featured-products.liquid` and `snippets/card-product.liquid` to use borderless layouts and warm sand cream backgrounds.
  * [ ] Task 3.2: Implement subtle scale-up, shadow, and text fade animations on card hover.
  * [ ] Task 3.3: Verify product titles, badges, and pricing layouts use the new editorial typography.

### Phase 4: Scroll-Driven Narrative Flow

Integrate GSAP and Lenis to create a smooth, meditative scrolling experience.

* **Goal**: Implement high-performance scroll-driven storytelling animations across homepage sections.
* **Tasks**:
  * [ ] Task 4.1: Load GSAP, ScrollTrigger, and Lenis libraries into the theme assets and layouts.
  * [ ] Task 4.2: Add scroll-triggered fade-slide animations (using the `scroll-experience` and `fixing-motion-performance` skills) to sections.
  * [ ] Task 4.3: Audit layout shifts (CLS) and ensure smooth, jank-free rendering.

### Phase 5: Homepage layout reform

**Goal:** [To be planned]
**Requirements**: TBD
**Depends on:** Phase 4
**Plans:** 0 plans

Plans:

- [ ] TBD (run /gsd-plan-phase 5 to break down)

---

## Completed Milestone: v1.0 - Foundations and Core UX

### Phase 1: Foundations, Tailwind v4 & Vite Setup

Establish the compilation toolchain and integrate the design system tokens.

* **Goal**: Enable compiling Tailwind v4 into the theme assets, load custom typography, and configure brand color tokens. (Completed - Commit `dc56f53f`)

### Phase 2: Core Theme Layout & Design System

Re-skin the main page layout, header, footer, and basic sections with the Zen aesthetic. (Completed - Commit `43d3a6d`)

### Phase 2.1: Customise the Home Page

Tailor home page sections to reflect the earthly grounded luxury Zen aesthetic. (Completed - Commit `32a7fdd`)

### Phase 2.2: Reshape the Landing Page UI

Completely restructure and style the homepage sections to align with the premium editorial look. (Completed - Commit `dae16d1`)
