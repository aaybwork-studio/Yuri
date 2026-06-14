# Testing Patterns

**Analysis Date:** 2026-06-14

## Test Framework

**Runner:**
- No automated test runners (e.g. Vitest, Jest, Playwright) are currently configured.
- Testing is entirely manual.

**Run Commands:**
```bash
npm run dev           # Runs Vite dev server (compiles styles/scripts in watch mode)
npm run shopify-dev   # Spins up Shopify Theme CLI watcher and hosts a preview port
```

## Test File Organization

- No test files exist in the codebase.
- Verified manually using Shopify Storefront previews.

## Mocking & Local Dev

**Shopify Data Mocking:**
- Shopify products and collections are populated via Shopify's admin catalog.
- Offline mock products list is provided in `shopify_mock_products.csv` for initial database populating or reference.

## Manual Verification Plan

### 1. Scroll & Reveal Transitions
- Verify that `body.page-introduction-loading` is removed on page load.
- Scroll down the page and verify that:
  - The intro logo fades.
  - The introduction panel translates up (`yPercent: -100`) smoothly.
  - The sticky header is revealed and locks on scroll progress.
  - The scroll progress indicator updates at the top of the viewport.

### 2. Video & Audio Playback
- Open the storefront on both desktop and mobile web views.
- Verify that the hero background video autoplays automatically and loops seamlessly without any black flashes.
- Verify that custom sound effects trigger correctly on page interactions (if configured).

### 3. Drawer Navigation & Cart Transitions
- Click on the menu trigger: verify that the overlay fades in and the menu panel slides in.
- Click on the cart trigger: verify that the cart panel slides in from the right.
- Verify that the header hides completely when drawers are open (`.theme-header.is-drawer-open`).

---

*Testing analysis: 2026-06-14*
*Update when test patterns change*
