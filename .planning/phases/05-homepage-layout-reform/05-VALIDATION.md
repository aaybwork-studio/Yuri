---
phase: 5
slug: homepage-layout-reform
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-06-11
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Browser Console & Manual Verification |
| **Config file** | none |
| **Quick run command** | `shopify theme check` |
| **Full suite command** | `shopify theme check` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `shopify theme check` and `npm run build`
- **After every plan wave:** Verify in local development preview using Shopify CLI
- **Before `/gsd-verify-work`:** Visual and functional audits green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | FR 6.2 / FR 6.3 | — | N/A | config | shopify theme check | templates/index.json | ⬜ pending |
| 05-01-02 | 01 | 1 | FR 6.2 | — | N/A | build | npm run build && shopify theme check | sections/header.liquid | ⬜ pending |
| 05-02-01 | 02 | 2 | FR 6.2 | — | N/A | lint | shopify theme check | sections/custom-hero.liquid | ⬜ pending |
| 05-02-02 | 02 | 2 | FR 6.3 | — | N/A | build | npm run build && shopify theme check | sections/custom-featured-products.liquid | ⬜ pending |
| 05-02-03 | 02 | 2 | FR 6.3 | — | N/A | lint | shopify theme check | sections/custom-browse-mirrored.liquid | ⬜ pending |

---

## Wave 0 Requirements

*Existing theme linting and compilation infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| dynamic JSON layout rendering | FR 6.2 / FR 6.3 | Customizer drag-and-drop capability | Check theme customizer storefront preview, verify the homepage renders hero, featured products, mirrored rows, and about us sections in the default order. Verify templates/index.liquid is deleted. |
| Navbar logo right layout | FR 6.2 | Visual layout styling | Open storefront preview on desktop, verify logo renders on the right side and menu links with icons render on the left. |
| Lowercase dot-separated links | FR 6.2 | Typography visual style | Verify links in navbar display in lowercase separated by dots (`home • about • products`). Verify hover slide animation is completely removed. |
| Full-screen hero slideshow | FR 6.2 | Visual dimensions | Open storefront preview, inspect hero slideshow, verify container height is full screen (100vh / 100dvh). Verify text alignment controls and overlay opacity work. |
| Padding scale and border toggles | FR 6.3 | Layout style control | Change top/bottom padding sliders in customizer for all home sections and verify visual padding updates. Verify toggling bottom borders works. |
| Carousel / grid layout toggle | FR 6.3 | Dynamic layout rendering | In featured products section, toggle layout from carousel to grid. Verify desktop visible column counts change between 3 and 4 items. |
| Mirrored panel split ratio | FR 6.3 | Dynamic layout rendering | In mirrored browse section, toggle split ratio (50/50, 60/40, 40/60). Verify panel flexbox width ratio updates accordingly in storefront preview. |
| Split layout section header | FR 6.3 | Visual layout styling | In featured products section, toggle section header split. Verify heading/description render in a left column (1/3 width) and product items render on the right (2/3 width). |
| Dark product cards | FR 6.3 | Visual layout styling | Toggle dark-block product cards option. Verify cards render with solid dark backgrounds and text color shifts to contrast with background. |
| Spec card mirrored rows | FR 6.3 | Visual layout styling | Verify mirrored browse sections render product packages standing adjacent to spec details cards. |

---

## Validation Sign-Off

- [x] All tasks have manual/automated verify steps mapped
- [x] Sampling continuity: theme check run frequently
- [x] Wave 0 covers all lints
- [x] No watch-mode flags in test commands
- [x] Feedback latency < 5s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
