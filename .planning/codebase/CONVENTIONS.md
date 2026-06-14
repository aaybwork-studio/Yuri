# Coding Conventions

**Analysis Date:** 2026-06-14

## Naming Patterns

**Files:**
- Custom Liquid sections use the prefix `custom-` (e.g. `custom-introduction-hero.liquid`).
- Snippets use the prefix `yuri-` (e.g. `yuri-wordmark-logo.liquid`).
- Compiled Vite outputs use the prefix `yuri-` (e.g. `yuri-scripts.js`, `yuri-styles.css`).

**CSS Classes:**
- Kebab-case naming for custom CSS class selectors (e.g. `.theme-header`, `.is-intro-active`, `.introduction-loader`).
- Scrolled or active states are marked with prefix `is-` (e.g. `.is-scrolled`, `.is-ready`, `.is-hidden`).

**JavaScript:**
- CamelCase naming for local variables and functions (e.g. `introHeroInstance`, `initScrollReveal`).
- PascalCase for ES6 Classes (e.g. `IntroductionHero`).
- HTML elements select target nodes via specific descriptive data attributes (e.g. `[data-introduction-logo]`, `[data-scroll-arrow]`).

## Code Style

**Formatting:**
- Formatted with Prettier (`.prettierrc.json` configured in root):
  - Line width: 120 characters max.
  - Single quotes for JavaScript files.
  - Double quotes for Liquid templates.
  - 2-space indentation.

**Linting:**
- Shopify Liquid files are validated using `theme-check` config ([.theme-check.yml](file:///Users/exodus/Desktop/KC/ANTIGRAVITY/Yuri/.theme-check.yml)).
- Dynamic translations matching check (`MatchingTranslations`) and template file length check (`TemplateLength`) are disabled.

## Import Organization

**Order (JS):**
1. CSS Style entrypoints (`import './entry.css'`).
2. Third-party packages (`import Lenis from 'lenis'`).
3. Animation packages (`import { gsap } from 'gsap'`).

## Error Handling

**DOM Elements & Event Listeners:**
- Always verify if DOM queries return valid nodes before adding events or reading properties (e.g. `if (this.scrollArrow) { ... }`).
- Handle async media errors gracefully. Wrap autoplay requests in `.catch(err => ...)` blocks to prevent uncaught promise rejections on mobile browsers.

## Function & Animation Design

**GSAP Timeline Management:**
- Animations must hook into Lenis' RAF ticker loop for smooth refresh rendering.
- Track timeline instances and include `.kill()` methods on custom classes to prevent memory leaks and duplicate triggers when pages or layouts reload.
- Use native data attributes (e.g. `data-scroll-height`) to pass configurable numeric values from Liquid templates to client-side scripts.

---

*Convention analysis: 2026-06-14*
*Update when patterns change*
