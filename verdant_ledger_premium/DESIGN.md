# Design System Documentation: The Editorial Atmosphere

## 1. Overview & Creative North Star
The North Star for this design system is **"The Living Ledger."** 

We are moving away from the "standard SaaS" aesthetic—characterized by flat cards and heavy gray dividers—toward a high-end, editorial experience. This system treats data as content and the interface as a premium physical medium. Inspired by the precision of Stripe and the spatial clarity of Notion, we utilize intentional asymmetry, overlapping surfaces, and high-contrast typography to create an environment that feels both authoritative and breathable.

We do not "box" content; we "situate" it. By using tonal depth instead of structural lines, the UI feels less like a software tool and more like a curated financial workspace.

---

### 2. Colors & Tonal Logic
Our palette rejects the coldness of pure grays. We use an "Off-White & Botanical" foundation. The primary brand green (`#0d631b`) is used sparingly for high-intent actions, while the `primary_container` (`#2e7d32`) provides a professional, grounded accent for admin environments.

#### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off major layout areas. Boundaries must be defined solely through background shifts. For example:
- A sidebar uses `surface_container_low`.
- The main content area uses `surface`.
- Inner modules use `surface_container_lowest`.

#### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers to define "importance" through elevation:
1.  **Level 0 (Base):** `background` (#f8f9fa) — The canvas.
2.  **Level 1 (Sections):** `surface_container_low` — Defining large regions like sidebars.
3.  **Level 2 (Active Modules):** `surface_container_lowest` (#ffffff) — Used for primary data cards to make them "pop" against the off-white base.
4.  **Level 3 (Interactive):** `surface_bright` — Reserved for hovering or active states.

#### The "Glass & Gradient" Rule
To add visual "soul," utilize Glassmorphism for floating elements (like dropdowns or modals). Use `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur. 
*Pro Tip:* For primary CTAs, apply a subtle linear gradient from `primary` (#0d631b) to `primary_container` (#2e7d32) at a 135-degree angle to provide a sophisticated luster that flat colors lack.

---

### 3. Typography
We use **Manrope** exclusively. It provides a geometric yet warm character that balances the "data-dense" requirement with modern readability.

*   **Display & Headline:** Used for high-level "Editorial" moments. These should have generous tracking (-0.02em) to feel tight and premium.
*   **Body & Labels:** Optimized for the ledger. `body-md` is our workhorse.
*   **Hierarchy Tip:** Use `on_surface_variant` (#40493d) for secondary metadata to create a clear visual step-down from primary titles in `on_surface` (#191c1d).

---

### 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional structural shadows.

#### The Layering Principle
Stacking surfaces is our primary method of organization. Placing a `surface_container_lowest` card on a `surface_container_low` background creates a natural, soft lift.

#### Ambient Shadows
When a floating effect is required (e.g., a modal or a primary action menu), use "Ambient Shadows":
*   **Blur:** 24px to 40px.
*   **Opacity:** 4% to 6%.
*   **Color:** Use a tint of the `on_surface` color (`#191c1d`) rather than pure black. This mimics natural light reflecting off the surface.

#### The "Ghost Border" Fallback
If a border is required for accessibility in dense data tables, use a **Ghost Border**:
*   Token: `outline_variant` (#bfcaba).
*   Opacity: Set to 15% - 20% maximum.
*   **Never use 100% opaque borders for containment.**

---

### 5. Components

#### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. Text in `on_primary`. Radius: `md` (0.375rem).
*   **Secondary:** `surface_container_high` with `on_surface`. No border.
*   **Tertiary:** Text-only using `primary` color. 
*   **States:** On hover, increase the background saturation by 5%. On active, apply a subtle inner shadow (2px blur, 10% opacity) to simulate a "press."

#### Status Badges (The Semantic System)
Badges use a "Low-Contrast Fill" approach for a professional look:
*   **Success:** `primary_container` background with `on_primary_fixed_variant` text.
*   **Error:** `error_container` background with `on_error_container` text.
*   **Warning:** Tertiary-toned yellow background (Custom: #FFF4D1) with `on_tertiary_fixed` text.
*   **Info:** Secondary-toned blue background (Custom: #E3F2FD) with `on_secondary_fixed_variant` text.

#### Input Fields
Avoid the "boxy" look. Use a `surface_container_lowest` fill with a bottom-only `Ghost Border` (2px). When focused, the border transitions to `primary` and the background shifts to `surface_bright`. 

#### Cards & Lists
*   **Rule:** Forbid divider lines between list items.
*   **Solution:** Use the 8px spacing scale (`0.5rem`) to create vertical breathing room. Use a subtle `surface_container_low` hover state to highlight the row the user is interacting with.

---

### 6. Do’s and Don’ts

#### Do
*   **Do** use intentional white space. If a page feels cluttered, increase the padding of the container rather than adding a border.
*   **Do** use `Manrope` weights (SemiBold vs Regular) to establish hierarchy rather than just changing font sizes.
*   **Do** use the `xl` (0.75rem) roundedness for large containers to soften the "industrial" feel of a dashboard.

#### Don’t
*   **Don't** use pure black (#000000) or pure gray. Always use our tonal neutrals.
*   **Don't** use "Drop Shadows" on standard cards. Reserve elevation for elements that actually float over the interface.
*   **Don't** use high-saturation reds/greens for status. Stick to the "Container" variants of the colors to maintain the "Editorial" professional tone.