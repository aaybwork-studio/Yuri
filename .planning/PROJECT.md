# Project Context: YURI

## 1. Brand Identity & Strategy

### Brand Name: YURI (百合)
*Yuri represents the Lily, symbolizing purity, grounded beauty, and organic elegance in Japanese culture.*

### Core Vibe & Positioning
* **Earthly Grounded Luxury**: Combining high-end luxury with organic simplicity. The experience feels grounded, calm, and premium.
* **Zen Influence**: Minimalist layouts, generous whitespace, clean grid alignments, and smooth transition states reflecting the calm of a Japanese zen garden.
* **Target Audience**: Discerning wellness-conscious buyers, specifically women seeking premium, aesthetically designed scented candles and botanical home wellness products.

### Visual Palette
* **Primary (Grounded Forest)**: `#2C3A2E` (Deep Forest Green) & `#3D4E3E` (Soft Sage)
* **Secondary (Earthen Clay)**: `#4E3B31` (Rich Dark Wabi-Sabi Brown) & `#D9C3B0` (Warm Sand Neutral)
* **Accent (Sunset Ember)**: `#E05A36` (Pop Orange) - used sparingly for active states, CTA micro-highlights, and notifications.
* **Backgrounds**: Soft Warm Whites (`#FAF7F2`) and Sand Cream (`#F4EFE6`) to establish warmth and space, contrasting with deep forest green for hero layouts.

### Typography
* **Headings**: `Cormorant Garamond` (Google Font) - Elegant, organic editorial serif. Spacious letter-spacing (`tracking-wide` / `0.05em`).
* **Body & UI**: `Plus Jakarta Sans` (Google Font) - Minimal, rounded, clean modern sans-serif with open spacing (`tracking-normal`).

---

## 2. Technical Stack

* **Base Framework**: Shopify Dawn Theme (latest release)
* **Styling Engine**: Tailwind CSS v4 (native CSS-first config, compile-time performance)
* **Build System**: Vite (for compiling Tailwind CSS v4 + Javascript modules, outputting to Shopify's `assets/` folder)
* **Development Tooling**: Shopify CLI for theme sync, preview, and deployment
* **Hosting / Integration**: GitHub-to-Shopify Theme Integration (direct synchronization from the main repository branch to the live theme)

---

## 3. Key Architecture Decisions

### ADR 1: Asset Compilation & Bundling
* **Decision**: Use Vite to compile asset bundles from a `src/` directory to standard Shopify `assets/` files.
* **Rationale**: Shopify templates rely on simple static asset compilation. Running Vite locally enables standard Tailwind v4 compilation, modern ES6+ JS import structures, and hot module reloading via Shopify CLI.

### ADR 2: Extending Dawn (Rather than Scratch)
* **Decision**: Build on top of Dawn.
* **Rationale**: Dawn provides complete out-of-the-box Shopify OS 2.0 section models, customer account routing, checkout pipelines, and localization structures. Customizing it gives the speed of a production-ready framework while tailoring the UI layer entirely to our Zen design tokens.

## 4. Current Milestone Goals
* **Milestone 1.0**: Establish theme foundations, setup Tailwind v4 and Vite, and implement the brand design system (completed).
* **Milestone 1.1**: Homepage Personalization & Brand Vibe (active)
  * Goal: Redesign and personalize the homepage layout and theme foundations to reflect the new YURI visual identity.
  * Target features:
    * **Design System**: Establish global color tokens (#ebf2e8, #2d4c29, #587811), typography, spacing, and reset styles.
    * **Homepage Hero & Slideshow**: Refactor the custom slideshow hero section to showcase the sculptural 3D candles.
    * **Product Grids & Hover Effects**: Restyle the homepage product grids with floating borderless layouts and tactile hover transitions.
    * **Scroll-Driven Narrative Flow**: Smooth scroll-triggered animations using GSAP and Lenis.

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements invalidated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
