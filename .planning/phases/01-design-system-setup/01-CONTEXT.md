# Phase 1: Design System Setup - Context

**Gathered:** 2026-06-10
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers the visual foundation for YURI, setting up the new brand color variables (#eeecd3 background, #403002 text/primary, #cc1574 Rose, #efbf04 Gold) and typography (Space Grotesk and Hanken Grotesk) across the Tailwind configuration, stylesheet resets, layout templates, and Shopify native settings.

</domain>

<decisions>
## Implementation Decisions

### Color Mapping
- **D-01:** Define brand-new semantic variables (e.g., `--color-brand-bg` for `#eeecd3`, `--color-brand-text` for `#403002`, `--color-accent-rose` for `#cc1574`, and `--color-accent-gold` for `#efbf04`) in `entry.css` and refactor the custom Liquid templates to use them.
- **D-02:** Use Gold (`#efbf04`) as the primary interactive/hover accent and Rose (`#cc1574`) for highlights/badges. Keep hovers and text transitions dark/grounded in `#403002` for standard links and navigation.
- **D-03:** Body background will be flat `#eeecd3` across the entire site, with product cards and collections grid items styled as borderless and transparent to maintain a visual-heavy floating grid.
- **D-04:** Color borders and dividers using a transparent mix of the primary text color (`#403002` at 10% opacity) to achieve subtle wabi-sabi gridlines.
- **D-05:** The custom footer card will have a bold accent background, schema-configurable in `sections/footer.liquid` to toggle between Rose (`#cc1574`) and Gold (`#efbf04`).
- **D-06:** Navigation header background will be transparent when overlaying the slideshow at the top, transitioning to solid `#eeecd3` with a thin border on scroll.
- **D-07:** Primary buttons use `#403002` background with `#eeecd3` text, transitioning on hover using a slide-up curtain fill. Important checkout and main Hero CTAs will use configurable Rose/Gold accent colors.
- **D-08:** Use Rose (`#cc1574`) for Sale badges and subdued `#403002` (at 60% opacity) for Sold Out badges.

### Shopify Native Settings Integration
- **D-09:** Synchronize native Dawn schemes in `config/settings_data.json` (Scheme 1: Default Ivory `#eeecd3`, Scheme 2: Dark Brown `#403002` reversed, Scheme 3: Rose `#cc1574`, Scheme 4: Gold `#efbf04`) so standard Dawn sections automatically align with our new design system.
- **D-10:** Force the custom fonts `Space Grotesk` and `Hanken Grotesk` globally in the compiled stylesheet (`entry.css`), bypassing and overriding native theme font settings.
- **D-11:** Keep variant selectors/pills rounded (40px) in native settings, but keep buttons, inputs, and cards sharp (0px) for tatami wabi-sabi geometry.
- **D-12:** Set native `"cart_type"` to `"drawer"` in `settings_data.json` to enable Dawn's native slide-out cart drawer JavaScript.
- **D-13:** Sync card borders (`card_border_thickness: 0` for borderless) and button borders (`buttons_border_thickness: 1` for bordered outlines) in `settings_data.json` to match custom styling.

### Typography Loading & Performance
- **D-14:** Load `Space Grotesk` and `Hanken Grotesk` via the Google Fonts API with preconnect and dns-prefetch hints added to `layout/theme.liquid`.
- **D-15:** Load all weights from 300 to 800 and italics to ensure full rich text flexibility.
- **D-16:** Enable font-smoothing resets (`-webkit-font-smoothing: antialiased`, `text-rendering: optimizeLegibility`) globally in `entry.css`.
- **D-17:** Preload primary weights of `Space Grotesk` (Regular/700) and `Hanken Grotesk` (Light/Regular) in `theme.liquid` to minimize unstyled text flashes (FOUT).

### Button & Interactive Elements Style
- **D-18:** Apply `Space Grotesk` (with lowercase transform and 0.1em letter-spacing) to buttons, navigation menu links, and UI action items to make them look structural and premium.
- **D-19:** Implement the "Double Text Slide" luxury mask animation on hover for navigation menu links (where text slides up and is replaced by a duplicate sliding up from below).

### the agent's Discretion
- Custom border-radius settings (other than standard cards/pills/buttons) are left to the agent's discretion to align with the visual spec.
- Preload weights selections for sub-varieties of fonts are handled by the agent's performance audits.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project and Requirement Docs
- `.planning/PROJECT.md` — Core brand identity, color palette, and evolution guidelines.
- `.planning/REQUIREMENTS.md` — Requirement FR 6.1 regarding Design System variables.

### Figma Node References
- Figma Brand Identity Frame (Node `144:47`) — Source brand personality and UVP information.
- Figma Branding Frame (Node `86:65`) — Source logo monogram, wordmarks, and layouts.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `frontend/entry.css` — Holds the main Tailwind `@theme` overrides and custom CSS component rules.
- `vite.config.js` — Compiles CSS into `assets/yuri-styles.css` and JS into `assets/yuri-scripts.js`.
- `layout/theme.liquid` — Integrates compiled stylesheet `yuri-styles.css` and loads font assets.

### Established Patterns
- Dawn base layout uses CSS custom variables like `--color-background` dynamically injected from settings. We will map them in `settings_data.json` so native sections render beautifully out-of-the-box.
- Custom sections (like custom header, custom hero, custom footer) use custom CSS classes like `.yuri-footer-card`, which will be updated with the new semantic Tailwind variables.

### Integration Points
- `frontend/entry.css` connects to `layout/theme.liquid` via compiled `yuri-styles.css`.
- `config/settings_data.json` sets variables for native theme components.

</code_context>

<specifics>
## Specific Ideas

- **Monogram Logo**: We have copied `yuri-monogram.png`, `yuri-wordmark.svg`, and `yuri-wordmark-alt.svg` from the Figma "Branding" frame (Node `86:65`) directly into `assets/`.
- **Double Text Slide**: An elite agency hover effect for navigation links. The text slides up and out of view while a duplicate slides up from below inside an `overflow-hidden` mask container.
- **Slide-up curtain fill**: Buttons transition smoothly with a color fill rising from the bottom on hover.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-Design System Setup*
*Context gathered: 2026-06-10*
