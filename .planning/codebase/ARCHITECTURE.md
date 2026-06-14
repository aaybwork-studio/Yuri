# Architecture

**Analysis Date:** 2026-06-14

## Pattern Overview

**Overall:** Hybrid Shopify Liquid Theme with Compiled Vite + Tailwind v4 + GSAP Frontend.

**Key Characteristics:**
- **Liquid Server-Side Templates:** Shopify native layout and section-based compilation.
- **Compiled Frontend Assets:** Vite builds ES modules and CSS into static assets checked into `assets/` so Shopify can serve them directly.
- **GSAP & Lenis Client-Side Animation Control:** Intercepts default viewport scrolling and page load transitions to implement premium visual storytelling.
- **Merchant Customizability:** Page sections map schemas to JSON settings allowing real-time personalization in Shopify Editor.

## Layers

**Layout Layer (`layout/`):**
- Purpose: Global page shell and HTML structure.
- Key files: [theme.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/layout/theme.liquid)
- Depends on: Section layer, Compiled Asset layer.

**Section Layer (`sections/`):**
- Purpose: Modular, customizable components that merchants can add, reorder, and edit.
- Key files: [custom-introduction-hero.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/sections/custom-introduction-hero.liquid), [header.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/sections/header.liquid), [footer.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/sections/footer.liquid).
- Depends on: Snippet layer, Compiled Asset layer.

**Snippet Layer (`snippets/`):**
- Purpose: Reusable code snippets (e.g. logos) with no custom schemas.
- Key files: [yuri-japanese-logo.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/snippets/yuri-japanese-logo.liquid), [yuri-wordmark-logo.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/snippets/yuri-wordmark-logo.liquid).

**Compiled Asset Layer (`assets/`):**
- Purpose: Static assets (scripts, styles, images, audio, video) served via Shopify CDN.
- Key files: `assets/yuri-scripts.js`, `assets/yuri-styles.css`, static font `assets/dia-regular.woff`.
- Generated from: `frontend/` directory via Vite build command.

**Vite Build Tooling (`frontend/` and project root):**
- Purpose: Asset bundling, Tailwind compilation, and ES Modules management.
- Key files: [vite.config.js](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/vite.config.js), [entry.js](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/frontend/entry.js), [entry.css](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/frontend/entry.css).

## Data Flow

**Page Load & Scroll Reveal Lifecycle:**

1. **Server Rendering:** Shopify theme engine compiles Liquid files and returns full HTML.
2. **Resource Preloading:** Browser starts downloading resources. Font `dia-regular.woff` is preloaded via `<link rel="preload">` in `<head>`.
3. **Styles and Script Load:** Browser applies compiled `yuri-styles.css` styles and evaluates `yuri-scripts.js` script with `defer`.
4. **Scroll Lock:** During initial asset load, `body.page-introduction-loading` locks view window.
5. **Smooth Scroll Init:** Lenis is initialized to smooth out scrolling.
6. **GSAP Registration:** GSAP registers `ScrollTrigger` plugin and hooks into Lenis' frame ticker loop.
7. **Hero Preloader:** `IntroductionHero` checks and preloads images/videos. Once ready, the intro panel is shown, and scroll lock is released.
8. **Parallax Scroll Timeline:** As the user scrolls, a GSAP timeline translates the hero element up (`yPercent: -100`) and reveals the main content beneath it.
9. **Header Activation:** The sticky header is revealed once the transition timeline completes (scroll progress ~78%).

## Key Abstractions

**IntroductionHero Class (`frontend/entry.js`):**
- Purpose: Orchestrates the page preloading screen and scroll-driven slide-up reveal animation.
- Pattern: ES6 Class initialized on selector query `[data-mods="introduction"]`.
- Manages: Timeline creations, ScrollTrigger triggers, and lifecycle callbacks (`onReady`, `kill`).

**Vite Entrypoint (`frontend/entry.js`):**
- Purpose: Central JavaScript aggregator importing dependencies and styles.

## Entry Points

**Liquid Render Entry:**
- Location: [layout/theme.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/layout/theme.liquid)
- Triggers: Storefront HTTP requests.
- Responsibilities: Wraps main page markup and handles global script/style injection.

**Bundling Entry:**
- Location: [frontend/entry.js](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/frontend/entry.js)
- Triggers: `npm run dev` or `npm run build` commands.
- Responsibilities: Bundles external assets (Lenis, GSAP, Tailwind styles) for Shopify consumption.

## Error Handling

**Strategy:** Fail-safe browser execution.
- Auto-play and video loop failures are caught with `.catch(err => ...)` to avoid stopping the thread.
- Standard scroll reveal falls back to native scrolling if `lenis` is missing or fails to initialize.
- Missing elements are guarded using optional conditions (e.g. `if (introEl) ...`).

---

*Architecture analysis: 2026-06-14*
*Update when major patterns change*
