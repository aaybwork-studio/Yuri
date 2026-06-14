# Technology Stack

**Analysis Date:** 2026-06-14

## Languages

**Primary:**
- Liquid (Shopify templating language) - Used for all theme layout, section, and template markup files.

**Secondary:**
- JavaScript (ES6+) - Controls dynamic behaviors, smooth scrolling, and custom animations in `frontend/entry.js`.
- CSS / Tailwind CSS v4 - Styling system with tokens defined in `frontend/entry.css`.

## Runtime

**Environment:**
- Node.js - Tooling and compilation environment.
- Shopify Online Store - Server environment where Liquid is rendered; compiled CSS and JS are served via Shopify CDN.

**Package Manager:**
- npm - Dependency management.
- Lockfile: `package-lock.json` present.

## Frameworks

**Core:**
- Shopify Dawn Theme Structure - Base framework for layouts, templates, and sections.

**Testing:**
- None - No automated testing framework is currently configured.

**Build/Dev:**
- Vite 6.0.0 - Bundles and watches frontend resources.
- @tailwindcss/vite 4.0.0 - Compiles Tailwind CSS v4 into `assets/yuri-styles.css`.
- Shopify CLI - Utilized via `npx shopify theme dev` for local preview and theme syncing.

## Key Dependencies

**Critical:**
- `gsap` ^3.15.0 - GreenSock Animation Platform, drives all high-end luxury ScrollTrigger animations and transition timelines.
- `lenis` ^1.3.23 - Smooth scrolling engine integrated with GSAP ScrollTrigger.

## Configuration

**Environment:**
- Configuration via command-line flags and parameters for `shopify` CLI.
- No `.env` variables required for runtime theme rendering.

**Build:**
- `vite.config.js` - Directs Vite to bundle `frontend/entry.js` as `assets/yuri-scripts.js` and styles as `assets/yuri-styles.css`.
- `config/settings_schema.json` - Defines user customization controls in the Shopify Theme Editor.
- `config/settings_data.json` - Saves active configurations and design choices.

## Platform Requirements

**Development:**
- macOS/Linux/Windows with Node.js installed.
- Access to a Shopify Development Store or Partner account for theme hosting.

**Production:**
- Shopify Online Store 2.0 compatible server runtime environment.

---

*Stack analysis: 2026-06-14*
*Update after major dependency changes*
