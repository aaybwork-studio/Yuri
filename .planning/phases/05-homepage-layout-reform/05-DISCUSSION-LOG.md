# Phase 5: Homepage layout reform - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-11
**Phase:** 05-homepage-layout-reform
**Areas discussed:** Customizer Control, Whitespace & Spacing Scale, Hero Showcase Dimensions, Carousel & Grid Layouts, Navbar Layout Reform

---

## Customizer Control

| Option | Description | Selected |
|--------|-------------|----------|
| Dynamic JSON Template | Convert homepage to dynamic JSON template (templates/index.json) to allow full drag-and-drop ordering and section reuse in the customizer. | ✓ |
| Static Liquid Template | Keep as static Liquid template (templates/index.liquid) to guarantee a locked-in, editorial layout flow. | |

**User's choice:** Dynamic JSON Template.
**Notes:** The user also selected to pre-configure templates/index.json with the standard YURI layout order and section settings pre-filled.

---

## Whitespace & Spacing Scale

| Option | Description | Selected |
|--------|-------------|----------|
| Schema settings for Padding | Add schema settings for Top and Bottom Padding to each custom section, aligning with Dawn's style controls but mapped to YURI's spacious spacing scale (e.g., 24px to 128px). | ✓ |
| Hardcoded Spacing | Hardcode a fixed, generous padding directly in stylesheets. | |

**User's choice:** Schema settings for padding.

---

## Section Dividers

| Option | Description | Selected |
|--------|-------------|----------|
| Toggleable Dividers | Add a schema setting to show/hide a thin horizontal border (zen-border) at the bottom of each custom section. | ✓ |
| Always show Borders | Always render a thin border line (zen-border) between homepage sections. | |
| Never show Borders | Never render border lines between homepage sections; rely entirely on whitespace. | |

**User's choice:** Toggleable Dividers.

---

## Hero Showcase Dimensions

| Option | Description | Selected |
|--------|-------------|----------|
| Configurable Height | Make slideshow height configurable in schema settings. | |
| Enforce Full Screen | Enforce a full-screen layout (100vh/100dvh) for a highly immersive editorial entrance. | ✓ |
| Keep Fixed Height | Keep the slideshow height fixed at 66vh on desktop and 50vh on mobile. | |

**User's choice:** Enforce Full Screen.
**Notes:** Added slide-specific text alignment setting (Center, Left, Right) and an optional subtle backdrop overlay opacity slider.

---

## Carousel & Grid Layouts

| Option | Description | Selected |
|--------|-------------|----------|
| Toggle Grid / Carousel | Allow toggling between a horizontal scroll carousel and a static responsive grid in customizer settings, with configurable column counts (3 or 4 columns on desktop). | ✓ |
| Configurable Carousel Columns | Strictly keep the horizontal scroll carousel layout but make the column widths configurable (e.g. 3 vs 4 visible items on desktop). | |
| Static Scroll Layout | Keep the scroll layout static at 3 columns desktop, but allow setting the product limit. | |

**User's choice:** Toggle Grid / Carousel.

---

## Mirrored Rows Split Ratio

| Option | Description | Selected |
|--------|-------------|----------|
| Configurable Split Ratio | Add a schema setting to select the panel split ratio (50/50, asymmetric 60/40, or asymmetric 40/60) to allow editorial variety. | ✓ |
| Fixed 50/50 Split | Keep them locked at 50/50 splits to maintain simple, balanced geometry. | |

**User's choice:** Configurable Split Ratio.

---

## Navbar Layout Reform

**User's choice:**
- Reposition logo to the right.
- Left-aligned navigation links styled in **lowercase with dots** (`home • about • products`).
- Group links, search icon, star icon, and cart icon with no button/outline/borders.
- Remove the custom Double Text Slide hover animation.

**Notes:** User provided an image reference showing clean navbar links and icons, and requested these specific header changes be prioritized first during the phase execution.

---

## Page Layout & Editorial Styling Reform

**User's choice:**
- Split featured products section layout with header on left (1/3) and product grid/carousel on right (2/3).
- Dark solid color backgrounds option for product cards, featuring white packaging/bottles.
- Mirrored split rows showing a product package stand adjacent to its typographic detail/spec card (or inside a dark block background card).

**Notes:** User provided a secondary image reference showing a premium split grid/carousel layout and spec card product packaging placements, which will be implemented across custom sections.

---

## the agent's Discretion

- Details of padding values, precise responsive heights, and layout alignments of icons/elements in the navbar.

## Deferred Ideas

None.
