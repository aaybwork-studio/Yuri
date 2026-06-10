# Phase 5: Homepage layout reform - Context

**Gathered:** 2026-06-11
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers a major homepage layout reform for YURI, converting the hardcoded static Liquid templates to a fully customizable dynamic JSON-based system, standardizing spacing controls and dividers, and redesigning the header navigation and hero slideshow to reflect a premium, minimalist wabi-sabi aesthetic with logo placement on the right, lowercase dot-separated navigation links, and an immersive full-screen hero image.

</domain>

<decisions>
## Implementation Decisions

### Dynamic Customizer Control
- **D-01:** Convert the homepage from a static Liquid file to a dynamic JSON template (`templates/index.json`) to allow full merchant drag-and-drop flexibility and modular section reordering.
- **D-02:** Pre-configure `templates/index.json` with the standard YURI section sequence and settings pre-filled (slideshow, featured products, mirrored rows, about-us split) and clean up `templates/index.liquid`.

### Spacing & Whitespace Controls
- **D-03:** Add schema settings for Top and Bottom Padding to each custom section (`custom-hero`, `custom-featured-products`, `custom-browse-mirrored`, `custom-about-us`), matching Dawn's style controls but mapped to YURI's spacious spacing scale (24px to 128px).
- **D-04:** Add a toggleable schema setting to show/hide a thin horizontal border (`.zen-border` at 10% text color opacity) at the bottom of each custom section.

### Minimalist Navbar Reform
- **D-05:** Reposition the header logo to the right side of the navbar.
- **D-06:** Place navigation links on the left/middle, styled in lowercase and separated by dots (e.g. `home • about • products`).
- **D-07:** Remove the custom Double Text Slide hover animation on navigation links to achieve a cleaner, static, modern look.
- **D-08:** Group the navigation links, search icon, star (wishlist) icon, and cart icon on the left/middle with no clear border separator or button outlines, creating a highly integrated and clean layout.

### Hero Showcase Dimensions
- **D-09:** Enforce a full-screen layout (`100vh` / `100dvh`) for the custom slideshow hero (`sections/custom-hero.liquid`).
- **D-10:** Add a text alignment schema setting (Center, Left, Right) and an optional subtle backdrop overlay opacity slider (e.g. bg-black overlay opacity control) for slide text blocks to ensure readability on all background images.

### Carousel & Grid Layouts
- **D-11:** Allow toggling between a horizontal scroll carousel and a static responsive grid in `custom-featured-products` schema settings, with configurable column counts (3 or 4 columns on desktop).
- **D-12:** Add a schema setting to select the panel split ratio (50/50, asymmetric 60/40, or asymmetric 40/60) in mirrored rows (`custom-browse-mirrored.liquid`).
- **D-13:** Add an option in `sections/custom-featured-products.liquid` to split the section layout: placing the section header (title, subtitle, description) in a left column (1/3 width on desktop) and the product grid/carousel on the right side (2/3 width).
- **D-14:** Support a solid dark-block card layout style option for product cards (a solid `#403002` or `#2C3A2E` background card container) to display light/white product packaging with custom details.
- **D-15:** Support custom image layouts in mirrored rows/panels to place a product package stand adjacent to a typographic detail spec card (or inside a dark block background card) to match the high-contrast wabi-sabi aesthetic.

### the agent's Discretion
- Spacing classes and grid container alignments (excluding margins and padding sizes configured by settings) are left to the agent's discretion.
- Icon selection and layout alignment details for the navbar are left to the agent's discretion to match the reference design.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project and Requirement Docs
- `.planning/PROJECT.md` — Core brand identity, color palette, and evolution guidelines.
- `.planning/REQUIREMENTS.md` — Requirement FR 6.2 (Slideshow Hero) and FR 6.3 (Featured Products).

### Section Files
- `sections/custom-hero.liquid` — Slideshow hero section structure and schema.
- `sections/custom-featured-products.liquid` — Product list/carousel section structure and schema.
- `sections/custom-browse-mirrored.liquid` — Mirrored row split section structure and schema.
- `sections/custom-about-us.liquid` — About us split section structure and schema.
- `sections/header.liquid` — Navigation header structure and schema.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `frontend/entry.css` — Holds global theme styling and wabi-sabi dividers (`.zen-border`).
- `snippets/card-product.liquid` — Base product card template used in grids.

### Established Patterns
- Homepage templates in Dawn typically use JSON settings schemas. We will move custom styling logic from static CSS classes to dynamic section schemas.

### Integration Points
- `templates/index.json` will replace `templates/index.liquid` to register sections.

</code_context>

<specifics>
## Specific Ideas

- **Navbar Layout**: Minimalist navbar design inspired by the user's reference image featuring:
  - Navigation links separated by dots: `home • about • month`.
  - Icons (search, star, and list menu) grouped alongside links.
  - No clear separators or outline buttons in the navbar.
  - Logo aligned to the right.
  - Hover animation removed.
- **Full-Screen Hero**: Slideshow hero displaying full screen (`100vh`).
- **Signature Blend Split Grid/Carousel**: Splitting the featured products section so the header sits on the left (1/3 width), and the product cards slide/render on the right (2/3 width).
- **Contrast Product Cards**: Styling products in solid dark rectangular boxes/cards displaying white product bottles/packaging.
- **Product & Spec Card Layout**: Showcasing product containers standing adjacent to typographic detail specs cards in mirrored layout rows.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-homepage-layout-reform*
*Context gathered: 2026-06-11*
