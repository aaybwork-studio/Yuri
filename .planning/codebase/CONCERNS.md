# Codebase Concerns

**Analysis Date:** 2026-06-14

## Tech Debt

**Lack of Automated Testing Pipeline:**
- Issue: No automated unit tests, integration tests, or E2E browser tests exist in the repository.
- Impact: Code regressions affecting critical components (e.g. `IntroductionHero` scrolling calculations, Lenis smooth scroll conflicts, or product slider updates) must be caught manually.
- Fix approach: Integrate Vitest for utility testing and Playwright/Cypress for UI interaction tests.

**Vite and Shopify CLI Dev Server Syncing:**
- Issue: Developers must run two terminal dev servers concurrently: `npm run dev` (Vite) and `npm run shopify-dev` (Shopify Theme CLI).
- Why: Bundling and template syncing are handled by separate tools.
- Impact: If one is stopped or fails, client assets and Liquid markup sync get out of order.
- Fix approach: Create a unified start script (e.g. using `concurrently` package) to run both watch commands together.

## Known Bugs

**Seamless video loop workaround:**
- Trigger: Custom seamless loop function `makeVideoLoopSeamless` intercepts the native video playback loop.
- File: [frontend/entry.js](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/frontend/entry.js#L35-L59)
- Symptoms: If the loop video is very short (<0.5 seconds), the hardcoded endOffset offset subtraction (0.25s) causes immediate loops and freezes.
- Root cause: Hardcoded durations subtraction doesn't account for variable source lengths.
- Fix approach: Adjust offsets dynamically based on the target video duration.

## Security Considerations

**Vite Development Server Asset Exposure:**
- Risk: During development, local asset compilation exposes raw source maps.
- Mitigation: Verify source maps are excluded in production builds inside `vite.config.js`.

## Performance Bottlenecks

**Heavy Audio Asset Load on Hero Page:**
- Problem: Large audio file `Singing bowl.mp3` (~20.7 MB) is loaded as a preload asset in the intro section.
- File: [sections/custom-introduction-hero.liquid](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/sections/custom-introduction-hero.liquid#L79-L81)
- Measurement: Takes up to 10+ seconds to fully load on slow network profiles, delaying page responsiveness.
- Cause: Static audio file checked directly into assets with no compression or streaming formats.
- Improvement path: Compress mp3 down to lighter web-audio formats (ogg/m4a) or stream dynamically.

## Fragile Areas

**Multiple Sticky Header CSS Classes:**
- File: [frontend/entry.css](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/frontend/entry.css#L51-L93)
- Why fragile: Sticky header visibility transitions rely on 4 separate toggled state classes (`is-intro-active`, `is-scrolled`, `is-hidden`, `is-drawer-open`).
- Common failures: Fast scrolling, resizing window, or opening cart drawers while GSAP ScrollTrigger timeline transitions are in-flight can lock the header in a hidden state.

---

*Concerns audit: 2026-06-14*
*Update as issues are fixed or new ones discovered*
