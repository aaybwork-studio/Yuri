# External Integrations

**Analysis Date:** 2026-06-14

## APIs & External Services

**Shopify Core SaaS Platform:**
- Service: Shopify Storefront
  - Integrates natively via Liquid rendering.
  - Controls catalog management, checkout flows, inventory, customer accounts, and localized translations.
  - Uses Shopify's native Content Delivery Network (CDN) to serve media assets (`assets/`).
  
**Shopify Ajax Cart API:**
- Integration method: JavaScript fetch requests
  - Used in Dawn's default drawer-cart/cart forms to fetch, add, update, and remove cart items asynchronously without reloading the page.

## Data Storage

**Databases:**
- Shopify Database - Managed database service hosted by Shopify. All products, collections, customer records, and orders are retrieved through Liquid data objects (e.g. `{{ collections.all.products }}`).

**File Storage:**
- Shopify File CDN - Storage for product media, section assets, and theme uploads. Asset paths are resolved in Liquid using filters: `{{ 'file.png' | asset_url }}` or dynamic images via `image_url`.

## Authentication & Identity

**Customer Accounts:**
- Shopify Customer Accounts - Natively handled by Shopify. Logins, password resets, and customer portals are directed to standard Shopify endpoints.
- Session Management: Managed through browser cookies by Shopify (session tokens, storefront access tokens).

## CI/CD & Deployment

**Hosting:**
- Shopify Online Store Theme Engine - Dynamic hosting environment for Liquid templates.

**Deployment & Sync:**
- Shopify CLI - Syncs local changes to development or production theme slots on Shopify servers.
  - Run command: `npx shopify theme dev`
  - Deploys changes dynamically to the active session storefront.

## Environment Configuration

**Development:**
- Store target: Configured via `--store` flag in package.json dev scripts (e.g., `yuri.myshopify.com`).
- Theme configuration: Stored in `config/settings_data.json` and syncs dynamically between local workspace and Shopify servers.
- Secrets: No API secret keys are stored locally. Auth is handled dynamically through the user's logged-in session inside Shopify CLI.

---

*Integration audit: 2026-06-14*
*Update when adding/removing external services*
