---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: - Homepage Personalization & Brand Vibe
status: Defining requirements
last_updated: "2026-06-10T14:58:55.704Z"
last_activity: 2026-06-10 — Milestone v1.1 started
progress:
  total_phases: 4
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State: YURI

## 1. Project Overview

* **Project Name**: YURI
* **Current Milestone**: v1.1
* **Current Phase**: Phase 1: Design System Setup
* **Overall Status**: `IN_PROGRESS` (Planning/Executing Phase 1)

---

## 2. Active Phase Progress

**Phase 1: Design System Setup**

* Status: `IN_PROGRESS`
* Target: Implement the new color variables and editorial typography scale based on the new Figma Brand Identity.

| Task ID | Task Description | Status | Commit/SHA | Notes |
| :--- | :--- | :---: | :---: | :--- |
| Task 1.1 | Update `frontend/entry.css` with the new design variables (sage neutral, forest green, olive) and resets | `[ ]` | - | Pending |
| Task 1.2 | Ensure Google Fonts (Cormorant Garamond & Plus Jakarta Sans) are linked in `layout/theme.liquid` | `[ ]` | - | Pending |
| Task 1.3 | Verify Vite + Tailwind compilation outputs correct styles to theme assets | `[ ]` | - | Pending |
| Task 1.4 | Refactor global buttons, links, and text containers to match the editorial style | `[ ]` | - | Pending |

---

## 2a. Completed Phase Progress

**Phase 2.2: Reshape the Landing Page UI** (COMPLETED)

* Copied brand monogram and green wordmark assets to the theme assets folder.
* Modified `sections/header.liquid` to split navigation links around the centered monogram logo.
* Created custom slideshow hero section `custom-hero.liquid` (2/3 height, client-side fade autoplay).
* Created custom featured products section `custom-featured-products.liquid` (borderless cards, horizontal scroll).
* Created custom browse mirrored section `custom-browse-mirrored.liquid` (100vh rows, category slider).
* Created custom about us section `custom-about-us.liquid` (100vh split panels).
* Created custom brand footer card section `custom-footer.liquid` (rounded card layout, newsletter signup, centered logo).
* Configured index.json template and footer-group.json to render the new custom sections.

**Phase 2.1: Customise the Home Page** (COMPLETED - Commit `32a7fdd`)

* Removed the announcement bar layout from header-group (`32a7fdd`)
* Configured index.json template layout to match Aesop's category/formulation sections
* Customized card styles to use light sand backgrounds and thin wabi-sabi borders
* Overrode collection listing cards to show titles above images
* Added custom smooth viewport scroll fade-slide animations with offsets

**Phase 2: Core Theme Layout & Design System** (COMPLETED - Commit `43d3a6d`)

* Custom styled announcement bar & navigation header (`7e1b1c2`)
* Added global wabi-sabi card borders and minimal tatami-style buttons (`17ce8b3`)
* Customized home page image banner typography & container (`de0c0fd`)
* Rebuilt footer color scheme, copyright layout, and newsletter forms (`43d3a6d`)

**Phase 1: Foundations, Tailwind v4 & Vite Setup** (COMPLETED - Commit `dc56f53f`)

---

## 3. Decisions & ADRs

* **Decision 1**: Build on top of Shopify Dawn base theme rather than from scratch (defined in `.planning/PROJECT.md`).
* **Decision 2**: Use Tailwind CSS v4 via a Vite compilation watcher compiling into the Shopify `assets/` folder.

---

## 4. Checkpoints & Revisions

* No checkpoints reached yet.
* Initializing project repository.

## Current Position

Phase: Not started (defining requirements)
Plan: —
Status: Defining requirements
Last activity: 2026-06-10 — Milestone v1.1 started
