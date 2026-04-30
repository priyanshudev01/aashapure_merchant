# Design System Document: Asha Pure Merchant

## 1. Overview & Creative North Star
This design system is built for the merchant who views their business as both a craft and a science. Moving away from the "utilitarian grid" of standard ERPs, this system adopts the Creative North Star of **"Asha Pure Merchant."** 

The visual language balances the rugged, grounded nature of the dairy industry with the precision of high-end financial editorial design. We achieve this through **Intentional Asymmetry** and **Tonal Depth**. Instead of boxing data into rigid containers, we allow information to breathe across layered surfaces. The result is a platform that feels authoritative, organized, and premium—transforming operational tasks into a sophisticated digital experience.

## 2. Colors & Surface Philosophy
The palette is rooted in a deep, professional forest green, supported by a sophisticated range of "Milk & Stone" neutrals.

### The Palette (Core Tokens)
*   **Primary (`#206223`):** The "Growth Green." Used for core brand moments and primary actions.
*   **Primary Container (`#3a7b3a`):** Used for subtle emphasis and secondary brand surfaces.
*   **Surface / Background (`#f9f9f9`):** Our "Paper." A clean, soft off-white that reduces eye strain.
*   **Tertiary (`#923357`):** An elegant plum used sparingly for accent callouts or specialized merchant insights.

### The "No-Line" Rule
To achieve a high-end editorial look, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through:
1.  **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Tonal Transitions:** Using depth to imply separation.

### The "Glass & Gradient" Rule
Standard flat colors feel "out-of-the-box." To elevate the merchant module:
*   **Signature Gradients:** Primary CTAs should use a subtle linear gradient from `primary` to `primary_container` (Top-Left to Bottom-Right) to add "soul" and dimension.
*   **Glassmorphism:** Floating elements (like specialized filter drawers or hovering action bars) must use semi-transparent `surface` colors with a `backdrop-blur` (12px–20px). This ensures the merchant feels the continuity of their data beneath the interface.

## 3. Typography
We employ a dual-typeface system to balance character with legibility.

*   **Display & Headlines (Manrope):** A modern geometric sans-serif. Use this for high-level metrics (e.g., total revenue in ₹) and page titles. Its wide aperture feels welcoming yet professional.
*   **Body & Labels (Inter):** The workhorse for data. Inter is used for all table content, form fields, and UI labels. It is optimized for screen readability at small sizes.

**Editorial Hierarchy:**
*   **Display-LG (3.5rem):** Reserved for "Hero Metrics" like monthly turnover.
*   **Headline-SM (1.5rem):** For section titles (e.g., "Active Milk Contracts").
*   **Label-MD (0.75rem):** Used for metadata, always in `on_surface_variant` to maintain a clear visual hierarchy against primary data.

## 4. Elevation & Depth
In "Asha Pure Merchant," depth is physical, not digital.

*   **Tonal Layering:** Hierarchy is achieved by stacking. 
    *   *Base Layer:* `surface` (Background)
    *   *Middle Layer:* `surface_container_low` (Content areas/sections)
    *   *Top Layer:* `surface_container_lowest` (Individual cards or data entries)
*   **Ambient Shadows:** For floating elements, use extra-diffused shadows. 
    *   *Shadow Color:* `rgba(26, 28, 28, 0.06)` (A tinted version of our `on_surface`).
    *   *Blur:* 24px to 40px for a "natural light" feel.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline_variant` token at **15% opacity**. This creates a "breath" of a line rather than a hard barrier.

## 5. Components

### Action Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, `lg` (0.5rem) roundedness.
*   **Secondary:** `surface_container_high` background with `primary` text. No border.
*   **Tertiary/Ghost:** No background. `primary` text. Use for low-priority actions like "Cancel."

### Data Tables (The Merchant's Core)
*   **Structure:** Forbid vertical dividers. Use horizontal `surface_container` shifts for row hovering.
*   **Header:** `label-md` uppercase in `on_surface_variant`. 
*   **Content:** `body-md` in `on_surface`.
*   **Currency:** Always prefix with ₹. Align numerical data to the right to ensure decimal alignment for easy scanning.

### Summary Cards
*   **Style:** `surface_container_lowest` background. `xl` (0.75rem) roundedness. 
*   **Layout:** Use asymmetrical padding (e.g., 24px on the left, 32px on the right) to create a custom, designed feel rather than a centered template.

### Status Badges (Chips)
*   **Success:** `primary_fixed` background with `on_primary_fixed_variant` text.
*   **Warning:** Soft amber background with deep brown text.
*   **Danger:** `error_container` background with `on_error_container` text.
*   **Shape:** `full` (pill-shaped) to contrast against the rectangular nature of data tables.

### Input Fields
*   **Style:** Subtle `surface_container_highest` background. 
*   **Interaction:** On focus, the background shifts to `surface_container_lowest` with a 2px `primary` ghost-border (20% opacity).
*   **Formatting:** Include Indian phone number masks (e.g., +91 XXXXX-XXXXX) and DD/MM/YYYY placeholders.

## 6. Do’s and Don’ts

### Do
*   **DO** use whitespace as a separator. If you feel the need for a line, add 16px of padding instead.
*   **DO** use Manrope for large Indian Rupee (₹) amounts to give them a "statement" feel.
*   **DO** ensure all touch targets are at least 44px, even in data-dense tables.
*   **DO** use the Indian Date Format: **DD MMM, YYYY** (e.g., 24 Oct, 2023).

### Don’t
*   **DON'T** use 100% black (`#000000`). Use `on_surface` (`#1a1c1c`) for all "black" text to maintain a premium, ink-on-paper feel.
*   **DON'T** use standard drop shadows. If it looks like a "box shadow" from 2015, it's too heavy.
*   **DON'T** overcrowd the sidebar. Use the `secondary_container` to highlight the active state with a subtle, rounded indicator.
*   **DON'T** use pure red for errors; use the sophisticated `error` and `error_container` tokens provided to ensure they sit harmoniously within the green ecosystem.
