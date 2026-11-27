# Pixel accents theme: plan

Status: phases 1 to 3 done in code. Phase 3 added five "How we work" scenes (24×16) above each story step and a pod of five student engineer sprites (12×16) in the homepage ecosystem section, all drawn as grids in `components/pixel-icon.tsx`. The pod also appears in the /ecosystem operating model section (`components/pixel-pod.tsx`). Not done: section-header scenes. A designer can refine the art without changing the component.

Reference: shopify.dev keeps its interface clean and modern and puts pixel art in a separate illustration layer (window scenes, character sprites, a colour per section, hard 2px outlines, flat fills). We take the same split, with a little more pixel in the interface: icons, small labels, buttons and the hero grid.

## 1. Principles

1. **Pixels for delight, never for proof.** Case study screenshots, metrics, quotes, the booking form and case study articles stay crisp and real.
2. **Reading stays in Mona Sans.** Headings, body copy, buttons and navigation keep the current fonts. The pixel font is only for short uppercase labels.
3. **One grid, integer scaling.** Card icons are drawn on a 12×12 grid and interface glyphs on 8×8 or 9×9, rendered only at whole-number scales (2× or 3×). Scenes use multiples of 8, with `shape-rendering: crispEdges`. No anti-aliasing, no fractional sizes.
4. **A small palette.** Brand blue plus four accents, defined as tokens with light and dark values. Nothing else.
5. **Motion is optional.** Every pixel interaction has a static fallback for touch screens and `prefers-reduced-motion`.

## 2. Decisions

| Question | Default | Notes |
| --- | --- | --- |
| Who draws the art | Icons and UI pixels are hand-coded as grids in the repo. Scenes and character sprites come from a designer | Code-drawn icons are cheap to change. Scenes need an artist to look good |
| Mascots | Yes, in phase 3, as student engineer sprites on the ecosystem page and in the "How we work" story | "Built by NST student engineers" is our model, so the sprites carry the story. Can be skipped without affecting phases 1 and 2 |
| Colour per section | No for the interface. Yes for pixel art only: each section's illustrations use one accent | Keeps the site recognisably blue while giving scenes variety |
| Pixel font | Silkscreen through `next/font/google` | Departure Mono is an alternative for a mono feel, but needs a self-hosted file |

## 3. Tokens

Add to `app/globals.css` alongside the existing tokens:

```css
:root {
  --font-pixel: var(--font-silkscreen), var(--font-mono), monospace;
  --px: 2px;                 /* one art pixel at the base size */
  --px-ink: #111311;         /* outlines */
  --px-blue: #0673f9;        /* brand */
  --px-sky: #8ec5ff;
  --px-violet: #7f77dd;
  --px-green: #18b875;
  --px-amber: #f0a020;
}
:root[data-theme="dark"] {
  --px-ink: #f6f7f8;
  --px-blue: #2989ff;
  --px-sky: #a8d0ff;
}
```

Load Silkscreen in `app/layout.tsx` with `variable: "--font-silkscreen"` and one weight (400) to keep the font payload small.

## 4. Building blocks

### `PixelIcon` component

`components/pixel-icon.tsx`. Takes a name and a size (16, 32 or 48). Each icon is a string map like the one below, with `#` for ink, `a` for the accent, `b` for a second accent, and `.` for empty. It renders as an SVG of `<rect>`s with `crispEdges`, using `currentColor` for ink so it follows the theme.

```ts
shield: [
  "................",
  "...##########...",
  "..#aaaaaaaaaa#..",
  // 16 rows
]
```

### Pixel button style

A modifier class, `.button.pixel`. It gives a stepped two-pixel shadow (`box-shadow: var(--px) var(--px) 0 var(--px-ink)`), square corners cut with a stepped `clip-path`, and a press state that moves the button down and right by one art pixel and removes the shadow. Apply it to primary calls to action only.

### Pixel labels

Switch `.eyebrow`, card numbers, tags and other short uppercase labels from JetBrains Mono to `--font-pixel`. Keep JetBrains Mono for code, tables and anything longer than a few words. Check every label is still at least 10px.

## 5. Where it appears

| Area | Change | Phase |
| --- | --- | --- |
| Eyebrows and labels | Pixel font | 1 |
| Services, six cards | Replace line icons with pixel icons: window, workflow, spark, rescue, integration, research | 1 |
| UI glyphs | Pixel arrow, calendar, sun, moon, menu, plus, external link | 1 |
| Trust, six cards | Add pixel icons: NDA (lock), your environment (server), no live data (database), approved AI (chip with check), access removed (key), you own it (flag) | 1 |
| Primary buttons | Pixel button style | 2 |
| Hero background | Replace the warped line grid with a pixel field: cells near the cursor light up in blue and fade out, leaving a short trail. Same touch and reduced-motion fallbacks as today | 2 |
| Packages, six cards | One pixel icon each | 2 |
| 404 page | A small pixel scene, such as a broken pipeline | 2 |
| "How we work" story | Five pixel scenes, one per step: brief becoming a contract, system map, parallel lanes, proof gate, handover folder | 3 |
| Ecosystem page | Student engineer sprites, with section accent colours | 3 |
| Section headers | Optional small pixel scene beside key section headings, Shopify-style | 3 |

Does not change: case study cards and pages, metrics, the testimonial, the booking form, the footer, the one-pager PDF.

## 6. Rollout

**Phase 1, foundation (about 2 days).** Tokens, Silkscreen, `PixelIcon`, the services, trust and UI icon sets, pixel labels. Ships behind no flag; it is low risk.

**Phase 2, interaction (about 2 to 3 days).** Pixel buttons, the hero pixel field, package icons, the 404 scene.

**Phase 3, illustration (depends on art).** Brief a designer with this document's palette and grid rules. Integrate scenes and sprites as optimised SVGs or PNGs scaled by whole numbers with `image-rendering: pixelated`.

## 7. Acceptance checks

- Icons are crisp at 1× and 2× screens, with no blurry edges, in both themes.
- Text contrast is unchanged for headings, body and buttons. Pixel labels meet 4.5:1 against their background.
- Touch devices and reduced motion get the static versions.
- No layout shift from the new font: labels keep their current height.
- Lighthouse performance on the homepage does not drop. The hero pixel field stays under 1,000 cells and only animates while the cursor moves.

## 8. Risks

- **Too much pixel** makes the studio look like a game studio. If in doubt, leave it out; phase 3 items are each optional.
- **Blurry art** from fractional scaling ruins the effect. Enforce whole-number sizes in the component's props.
- **Inconsistent icons** if different people draw them on different grids. One grid, one palette, one component.
