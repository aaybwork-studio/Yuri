# Phase 1: Design System Setup - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-10
**Phase:** 1-Design System Setup
**Areas discussed:** Color Mapping, Shopify Native Settings Integration, Typography Loading & Performance, Button & Interactive Elements Style

---

## Color Mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Re-map existing variables | Reuses existing layout & typography styling with minimal template changes. | |
| Create new semantic variables | Define new variables (e.g. --color-brand-bg) and refactor all templates. | ✓ |

**User's choice:** Create new semantic variables and refactor all custom Liquid templates.
**Notes:** Reuses variables cleanly and avoids naming drift.

| Option | Description | Selected |
|--------|-------------|----------|
| Rose hover, Gold highlights | Rose for main hover states, Gold for badges. | |
| Gold hover, Rose highlights | Gold for main hover states, Rose for badges. | ✓ |
| Keep hovers dark | Use both sparingly, keeping hovers grounded in dark primary color. | ✓ |

**User's choice:** Combined Gold hover (2) and sparing usage (3).
**Notes:** Gold will be the primary interactive pop accent and Rose for highlights, but used sparingly with dark #403002 hovers on standard links.

| Option | Description | Selected |
|--------|-------------|----------|
| Flat background #eeecd3 | Flat background across the site with borderless/transparent cards. | ✓ |
| Lighter card background | Use #faf7f2 for containers/cards. | |
| Contrasting header/footer | Dark contrasting block background (#403002) for header/footer. | |

**User's choice:** Flat background #eeecd3 across the site with borderless/transparent cards.

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle transparent borders | Thin transparent borders (#403002 at 10% opacity) for wabi-sabi lines. | ✓ |
| No borders | Rely purely on whitespace for layout separation. | |
| Solid borders | High-contrast borders using full opacity #403002. | |

**User's choice:** Thin transparent borders (#403002 at 10% opacity) for wabi-sabi gridlines.

| Option | Description | Selected |
|--------|-------------|----------|
| Dark footer card background | Ground the footer with dark background #403002. | |
| Light footer card background | Keep footer light #eeecd3, matching the rest of the page. | |
| Bold accent footer card | Use a full Rose (#cc1574) or Gold (#efbf04) background card. | ✓ |

**User's choice:** Use a full Rose or Gold background for a bold, statement-making block.
**Notes:** User chose to make this a configurable option in the footer section schema.

| Option | Description | Selected |
|--------|-------------|----------|
| Transparent header with transition | Transparent on top of hero, transitioning to solid #eeecd3 on scroll. | ✓ |
| Always solid header | Solid #eeecd3 background from the start. | |
| Always transparent header | Transparent background, letting sections slide under. | |

**User's choice:** Transparent transitioning to solid #eeecd3 with a thin border on scroll.

| Option | Description | Selected |
|--------|-------------|----------|
| Dark buttons with hover flip | Dark #403002 with light #eeecd3, reversing on hover. | ✓ |
| Accent buttons | Rose or Gold background for all primary buttons. | ✓ |
| Border-only buttons | Transparent with thin border, filling on hover. | |

**User's choice:** Combined (1) and (2).
**Notes:** Standard buttons will stay grounded in dark #403002, while key merchant actions (checkout, Hero CTA) will use Rose/Gold accents.

| Option | Description | Selected |
|--------|-------------|----------|
| Rose for Sale, subdued Sold Out | Rose for Sale, subdued #403002 at 60% opacity for Sold Out. | ✓ |
| Gold for Sale, Rose for Sold Out | Gold for Sale, Rose for Sold Out. | |
| No color pop for badges | Simple text badges with thin borders. | |

**User's choice:** Rose for Sale badges, subdued primary color for Sold Out badges.

---

## Shopify Native Settings Integration

| Option | Description | Selected |
|--------|-------------|----------|
| Update settings_data.json schemes | Sync color schemes natively so standard sections automatically align. | ✓ |
| Defer native settings modifications | Rely entirely on custom Tailwind utility styles in templates. | |

**User's choice:** Sync native color schemes in settings_data.json.

| Option | Description | Selected |
|--------|-------------|----------|
| Force custom fonts globally | Force Space Grotesk / Hanken Grotesk, bypassing native settings. | ✓ |
| Map settings to system fonts | Map to standard system fonts, override in entry.css. | |

**User's choice:** Force custom fonts globally in the compiled stylesheet.

| Option | Description | Selected |
|--------|-------------|----------|
| Rounded pills, sharp buttons | 40px radius for variant pills, 0px for buttons, cards, inputs. | ✓ |
| Sharp 0px corners everywhere | Set all element corners to sharp 0px. | |
| Soft rounded corners everywhere | Apply 8px to 12px radius to all interactive elements. | |

**User's choice:** Keep variant pills rounded (40px) but keep buttons, cards, and inputs sharp (0px).

| Option | Description | Selected |
|--------|-------------|----------|
| Set native cart_type to "drawer" | Set cart_type to "drawer" to enable Dawn's native cart drawer JS. | ✓ |
| Keep "notification" for now | Defer cart type change until we begin the cart drawer phase. | |

**User's choice:** Set cart_type to "drawer" now in settings_data.json.

| Option | Description | Selected |
|--------|-------------|----------|
| Set card border to 0, button to 1 | Configure card_border_thickness: 0 and buttons_border_thickness: 1 natively. | ✓ |
| Leave native border settings | Rely on custom CSS overrides in entry.css. | |

**User's choice:** Sync card borders (0px) and button borders (1px) in settings_data.json.

---

## Typography Loading & Performance

| Option | Description | Selected |
|--------|-------------|----------|
| Google Fonts API | Load via Google Fonts API (using preconnect / dns-prefetch). | ✓ |
| Local self-hosting | Self-host font files (.woff2) in the assets directory. | |

**User's choice:** Load via Google Fonts API.

| Option | Description | Selected |
|--------|-------------|----------|
| Load limited weights | Load weights 300, 400, 500, 700 without italics. | |
| Load all weights and italics | Load all weights (300 to 800) plus italics for rich text editing. | ✓ |

**User's choice:** Load all weights (300 to 800) plus italics.

| Option | Description | Selected |
|--------|-------------|----------|
| Global smoothing overrides | Enable antialiased and optimizeLegibility in entry.css. | ✓ |
| Browser default rendering | Use browser default text rendering settings. | |

**User's choice:** Enable optimal font-smoothing settings globally in entry.css.

| Option | Description | Selected |
|--------|-------------|----------|
| Sans-serif system fallbacks | Use "Space Grotesk", sans-serif and "Hanken Grotesk", sans-serif. | ✓ |
| Heading serif fallbacks | Use system serif fallback for headings. | |

**User's choice:** Use clean sans-serif system fallbacks.

| Option | Description | Selected |
|--------|-------------|----------|
| Preload primary weights | Preload Space Grotesk (Regular/700) and Hanken Grotesk (Light/Regular). | ✓ |
| No preload tags | Rely on standard stylesheet loading. | |

**User's choice:** Add rel="preload" links for the custom fonts in layout/theme.liquid.

---

## Button & Interactive Elements Style

| Option | Description | Selected |
|--------|-------------|----------|
| Space Grotesk for interactive text | Apply Heading font (lowercase/uppercase with open letter-spacing) to actions. | ✓ |
| Hanken Grotesk for interactive text | Apply Body font to all buttons and links. | |

**User's choice:** Space Grotesk (Heading font) for buttons and navigation links.

| Option | Description | Selected |
|--------|-------------|----------|
| Lowercase with wide tracking | Lowercase (e.g. "add to cart") with 0.1em letter-spacing. | ✓ |
| Uppercase with wide tracking | Uppercase (e.g. "ADD TO CART") with 0.15em letter-spacing. | |
| Standard Capitalization | Normal title casing. | |

**User's choice:** Lowercase with wide letter-spacing (0.1em).

| Option | Description | Selected |
|--------|-------------|----------|
| Slide-up curtain fill | Border/text outline fills up from the bottom on hover. | ✓ |
| Double Text Slide inside button | Apply luxury text-sliding mask inside button container. | |
| Magnetic text scale | Text inside button moves slightly toward cursor. | |

**User's choice:** Slide-up curtain fill.

| Option | Description | Selected |
|--------|-------------|----------|
| Slide-in underline | Underline slides in from left or expands from center on hover. | |
| Subtle spacing expansion | Letter spacing expands smoothly on hover. | |
| Double Text Slide | Unhovered text slides up/out; duplicate slides up/in from below. | ✓ |

**User's choice:** Double Text Slide.
**Notes:** Selected as the premium micro-interaction style for main navigation menu items.

---

## the agent's Discretion

- Standard layout border-radius settings (outside of custom cards/pills/buttons) to be mapped dynamically by the agent during coding.

## Deferred Ideas

- None. All items mapped to active requirements.
