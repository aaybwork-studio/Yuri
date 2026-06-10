# Phase 5 Research: Homepage Layout Reform

## 1. Navbar and Header Reform (sections/header.liquid)

### Current Structure Analysis
* The header currently uses a three-column layout class `.header--yuri-split` when `logo_position` is `middle-split` (which splits the menu links around a centered monogram logo, placing icons and other menu links on the right).
* Base navigation links use the class `.yuri-nav-link` and `.yuri-nav-text` inside `snippets/header-dropdown-menu.liquid` and `snippets/header-mega-menu.liquid` to achieve the "Double Text Slide" hover animation.

### Implementation Strategy
1. **Logo to the Right**:
   * Add a new layout mode option in `sections/header.liquid` schema settings for `logo_position`:
     ```json
     {
       "value": "logo-right",
       "label": "Yuri Logo Right"
     }
     ```
   * Add a corresponding layout wrapper `.header--logo-right` in `entry.css`:
     ```css
     .header--logo-right {
       display: flex !important;
       justify-content: space-between !important;
       align-items: center !important;
       width: 100% !important;
     }
     ```
   * Render the left-aligned group (links, search modal, star icon, and cart bubble) on the left side of the flexbox, and the logo heading on the right.
2. **Left/Middle Grouping (No borders or outlines)**:
   * Consolidate the inline navigation menu (`header-dropdown-menu` / `header-mega-menu`) and icons (search, star wishlist, cart) into a single container on the left/middle of the header when in `logo-right` layout.
   * Remove any separating borders, outlines, or backgrounds from buttons. All links/icons will render inline with standard margin/gap spacing.
3. **Lowercase Links with Dot Separators**:
   * Links already use lowercase text transform (via `.header__menu-item` style in `entry.css`).
   * Apply dot separators using CSS pseudo-elements targeting the top-level list items:
     ```css
     .header__inline-menu .list-menu--inline > li:not(:last-child)::after {
       content: "•";
       margin: 0 0.8rem;
       color: var(--color-brand-text);
       opacity: 0.5;
       vertical-align: middle;
     }
     ```
4. **Remove Hover Animation**:
   * Deactivate the `.yuri-nav-link` pseudo-element translation transition by editing `entry.css` or removing the nested tags inside the menu snippets (`header-dropdown-menu.liquid`, `header-mega-menu.liquid`, `header-drawer.liquid`).
   * The animation can be cleaned up by setting the translation transforms to `none` or removing the translation hover state:
     ```css
     .yuri-nav-link::after {
       display: none !important;
     }
     .yuri-nav-link:hover .yuri-nav-text {
       transform: none !important;
     }
     ```
     Or by fully reverting links back to standard `span` content.
5. **Star (Wishlist) Icon**:
   * Place the star icon between the search icon and the cart icon inside the icon group.
   * Render the star icon using the existing asset `icon-star.svg` with inline loading:
     ```liquid
     <a href="/pages/wishlist" class="header__icon header__icon--wishlist link focus-inset">
       <span class="svg-wrapper">{{- 'icon-star.svg' | inline_asset_content -}}</span>
     </a>
     ```

---

## 2. Full-Screen Slideshow Hero (sections/custom-hero.liquid)

### Current Structure Analysis
* The hero slider height is currently hardcoded to `h-[50vh] md:h-[66vh]`.
* The background overlay uses a hardcoded `bg-black/10` opacity class.
* Slide content layout is centered by default.

### Implementation Strategy
1. **Full-Screen Height**:
   * Update the container class of the slideshow to use full screen heights:
     `h-screen md:h-screen` or `h-[100vh] md:h-[100dvh]`.
   * Ensure height calculations take into account potential overlay offsets.
2. **Text Alignment Settings**:
   * Add a `text_alignment` setting to the slideshow (or per slide block if converted, but section-wide setting is current pattern):
     ```json
     {
       "type": "select",
       "id": "text_alignment",
       "label": "Text Alignment",
       "options": [
         { "value": "left", "label": "Left" },
         { "value": "center", "label": "Center" },
         { "value": "right", "label": "Right" }
       ],
       "default": "center"
     }
     ```
   * Dynamically assign classes:
     ```liquid
     {%- assign text_align = section.settings.text_alignment -%}
     {%- case text_align -%}
       {%- when 'left' -%}
         {%- assign align_classes = 'items-start text-left' -%}
       {%- when 'right' -%}
         {%- assign align_classes = 'items-end text-right' -%}
       {%- else -%}
         {%- assign align_classes = 'items-center text-center' -%}
     {%- endcase -%}
     ```
   * Render: `<div class="absolute inset-0 z-20 flex flex-col justify-center p-8 {{ align_classes }}">`.
3. **Subtle Backdrop Overlay Slider**:
   * Add a range setting to control overlay opacity:
     ```json
     {
       "type": "range",
       "id": "overlay_opacity",
       "min": 0,
       "max": 90,
       "step": 10,
       "default": 10,
       "unit": "%",
       "label": "Backdrop Overlay Opacity"
     }
     ```
   * Render dynamically:
     ```liquid
     <div class="absolute inset-0 bg-black z-10" style="opacity: {{ section.settings.overlay_opacity | divided_by: 100.0 }};"></div>
     ```

---

## 3. Spacing Controls & Borders (Borders & Padding Settings)

### Target Sections
* `sections/custom-featured-products.liquid`
* `sections/custom-browse-mirrored.liquid`
* `sections/custom-about-us.liquid`
* `sections/custom-hero.liquid` (if applicable)

### Implementation Strategy
1. **Dynamic Padding Scale Settings (24px to 128px)**:
   * Add these range options to the schema of all custom sections:
     ```json
     {
       "type": "range",
       "id": "padding_top",
       "min": 24,
       "max": 128,
       "step": 8,
       "unit": "px",
       "label": "Top Padding",
       "default": 64
     },
     {
       "type": "range",
       "id": "padding_bottom",
       "min": 24,
       "max": 128,
       "step": 8,
       "unit": "px",
       "label": "Bottom Padding",
       "default": 64
     }
     ```
   * Insert dynamic styling using section styles:
     ```liquid
     {%- style -%}
       .section-{{ section.id }}-padding {
         padding-top: {{ section.settings.padding_top }}px;
         padding-bottom: {{ section.settings.padding_bottom }}px;
       }
     {%- endstyle -%}
     ```
   * Apply `.section-{{ section.id }}-padding` to the main section wrapper elements, removing hardcoded classes (e.g. `py-16`).
2. **Toggleable Bottom Border Setting**:
   * Add a checkbox setting:
     ```json
     {
       "type": "checkbox",
       "id": "show_bottom_border",
       "label": "Show Bottom Border",
       "default": true
     }
     ```
   * Append class conditionally:
     `{% if section.settings.show_bottom_border %} border-b zen-border{% endif %}`

---

## 4. Carousel/Grid & Panel Splits

### 1. Carousel & Grid Toggle in `sections/custom-featured-products.liquid`
* Add layout selection and column count schema settings:
  ```json
  {
    "type": "select",
    "id": "layout_type",
    "label": "Layout Style",
    "options": [
      { "value": "carousel", "label": "Horizontal Scroll Carousel" },
      { "value": "grid", "label": "Static Grid" }
    ],
    "default": "carousel"
  },
  {
    "type": "range",
    "id": "columns_desktop",
    "min": 3,
    "max": 4,
    "step": 1,
    "default": 3,
    "label": "Desktop Columns"
  }
  ```
* Render structure based on `layout_type`:
  ```liquid
  {%- if section.settings.layout_type == 'grid' -%}
    <div class="grid gap-8 grid-cols-1 md:grid-cols-{{ section.settings.columns_desktop }}">
      {%- for product in collection.products limit: section.settings.products_to_show -%}
        <div class="grid__item">
          {% render 'card-product', card_product: product %}
        </div>
      {%- endfor -%}
    </div>
  {%- else -%}
    <!-- Current horizontal scroll markup with prev/next navigation -->
  {%- endif -%}
  ```
* For carousel columns, insert the dynamic CSS flex basis setting in the stylesheet block:
  ```liquid
  {%- style -%}
    @media screen and (min-width: 750px) {
      #ScrollContainer-{{ section.id }} .yuri-scroll-item {
        {%- if section.settings.columns_desktop == 4 -%}
          flex: 0 0 calc(25% - 1.5rem);
        {%- else -%}
          flex: 0 0 calc(33.333% - 1.33rem);
        {%- endif -%}
      }
    }
  {%- endstyle -%}
  ```

### 2. Panel Split Ratios in `sections/custom-browse-mirrored.liquid`
* Add split ratio setting:
  ```json
  {
    "type": "select",
    "id": "split_ratio",
    "label": "Panel Split Ratio",
    "options": [
      { "value": "50-50", "label": "50 / 50 Equal Split" },
      { "value": "60-40", "label": "60 / 40 Asymmetric" },
      { "value": "40-60", "label": "40 / 60 Asymmetric" }
    ],
    "default": "50-50"
  }
  ```
* Calculate layout widths in Liquid:
  ```liquid
  {%- if section.settings.split_ratio == '60-40' -%}
    {%- assign text_class = 'md:flex-[3_3_0%] md:w-3/5' -%}
    {%- assign image_class = 'md:flex-[2_2_0%] md:w-2/5' -%}
  {%- elsif section.settings.split_ratio == '40-60' -%}
    {%- assign text_class = 'md:flex-[2_2_0%] md:w-2/5' -%}
    {%- assign image_class = 'md:flex-[3_3_0%] md:w-3/5' -%}
  {%- else -%}
    {%- assign text_class = 'md:flex-1 md:w-1/2' -%}
    {%- assign image_class = 'md:flex-1 md:w-1/2' -%}
  {%- endif -%}
  ```
* Render containers:
  ```liquid
  <div class="yuri-mirrored-panel bg-[var(--color-brand-bg)] flex items-center justify-center {{ text_class }}">
  ...
  <div class="{{ image_class }} min-h-[40vh] md:min-h-screen relative overflow-hidden">
  ```

---

## 5. Homepage JSON Template Migration (templates/index.json)

* Delete the legacy `templates/index.liquid` file.
* Create `templates/index.json` to configure default layout blocks and values:
  ```json
  {
    "sections": {
      "custom-hero": {
        "type": "custom-hero",
        "settings": {}
      },
      "custom-featured-products": {
        "type": "custom-featured-products",
        "settings": {}
      },
      "custom-browse-mirrored": {
        "type": "custom-browse-mirrored",
        "settings": {}
      },
      "custom-about-us": {
        "type": "custom-about-us",
        "settings": {}
      }
    },
    "order": [
      "custom-hero",
      "custom-featured-products",
      "custom-browse-mirrored",
      "custom-about-us"
    ]
  }
  ```

---

## 6. Performance & UX Verification Checklist

* Ensure that all dynamic layouts compiled through Tailwind CSS v4 use transition rules optimized for the GPU (opacity, transform) to prevent layout thrashing.
* Ensure all styling scales respect `prefers-reduced-motion: reduce`.
* Add explicit aspect-ratio properties and custom layout container parameters to prevent LCP degradation or layout shifts on image elements.

## RESEARCH COMPLETE
