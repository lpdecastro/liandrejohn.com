# Add Unboxed Concept Build Card Spec

## Task

Add [Unboxed](https://unboxed.liandrejohn.com/) as the first card in the `#concept-builds` strip on `index.html`, pushing Altamira/Handa/Sereva/Stillward to positions 2–5.

## Card Content

Copy follows the exact markup pattern of the four existing `<article class="card overflow-hidden">` entries (icon-labeled eyebrow, `h3` name, one-line description, 3-item feature list, CTA row).

- **Eyebrow icon + label:** "Board Game Rentals" (new Bootstrap Icon glyph — reuse the `bi` sizing/class conventions already on the other four eyebrows; e.g. `dice-5` or similar from the Bootstrap Icons set)
- **Name (h3):** Unboxed
- **Description:** A personal board game rental service for Metro Manila.
- **Feature list (3 items, matches site content gathered from unboxed.liandrejohn.com):**
  - Real-time availability by rental date
  - GCash payment, verified by hand
  - Lalamove delivery across Metro Manila
- **CTAs:** `View Site` (`btn btn-primary btn-sm` → `https://unboxed.liandrejohn.com/`) and `View Code` (`btn btn-outline-secondary btn-sm` → `https://github.com/lpdecastro/unboxed.liandrejohn.com`), matching the other four cards.
- **Analytics attributes:** `data-analytics-event="project_click"`, `data-analytics-project-name="unboxed"`, `data-analytics-project-type="board_game_rental"`, `data-analytics-section-name="concept_builds"`, with `data-analytics-link-type` set to `live_site` or `source_code` per button — same convention as the other cards.

## Image

- Screenshot captured live from unboxed.liandrejohn.com's hero (viewport locked to 1200×675 to match the existing `ratio-16x9` cards exactly, no cropping needed).
- Optimized to WebP at quality 75 (58 KB — in line with the existing `concept-*.webp` files, which range 15–70 KB).
- Prepared file is at the scratchpad path below; move it into place during implementation:
  - Source: `/private/tmp/claude-501/-Users-lpdecastro-Documents-GitHub-liandrejohn-com/a82799d8-b908-45fa-81ab-0c101e7181f2/scratchpad/concept-unboxed.webp`
  - Destination: `public/images/concept-unboxed.webp`
- `alt` text: "Unboxed board game rental site concept" (matches the `{Name} {category} concept` pattern used by the other four).

## Placement & Renumbering

- Insert the new `<article id="concept-unboxed">` as the **first** card inside `#projectStrip`, before `concept-altamira`.
- Renumber the four existing `<!-- Concept build N: ... -->` HTML comments from 1–4 to 2–5.
- `#projectStripDots` and the prev/next scroll controls in `src/js/main.js` are DOM-driven (count `.card` elements dynamically) — no JS/SCSS changes needed.

## Copy & Schema Updates (keep in sync)

- Section lead paragraph (`index.html`, `#concept-builds`): "Four live sites across marketing, booking, and e-commerce" → "Five live sites across marketing, booking, rentals, and e-commerce".
- JSON-LD `ItemList` (`@id": "https://liandrejohn.com/#concept-builds"`):
  - `description`: "Four self-directed sites..." → "Five self-directed sites..."
  - `numberOfItems`: `4` → `5`
  - Add a new `ListItem` at `position: 1` for Unboxed (`CreativeWork`, `url`, `mainEntityOfPage: "#concept-unboxed"`, `about: "Board game rentals"`, `creator` back-reference, `hasPart`/`SoftwareSourceCode` → `https://github.com/lpdecastro/unboxed.liandrejohn.com`).
  - Renumber the existing four `ListItem.position` values from 1–4 to 2–5.
- `public/llms.txt` Concept Builds line: add an Unboxed entry following the existing `- [Name](url) — description. Code: repo-url` pattern, including the "Code:" clause.

## Out of Scope

- No changes to `blog/why-i-built-unboxed.html` or `blog/how-i-built-unboxed.html` (already published/merged).
- No new Bootstrap Icon glyph beyond picking an existing one from the icon set already used elsewhere on the site if a board-game-appropriate glyph isn't already in use.
- No sitemap.xml change — concept-build subdomains are separate repos/deployments and are never listed there (confirmed: none of the other four appear in `public/sitemap.xml` either).

## Acceptance Criteria

- [ ] `concept-unboxed.webp` (1200×675, optimized WebP) is in `public/images/`.
- [ ] New card is the first `<article>` in `#projectStrip`, with `View Site` and `View Code` CTAs.
- [ ] Existing four cards' HTML comments and JSON-LD `position` values are renumbered 2–5.
- [ ] JSON-LD `numberOfItems` is `5` and its `description` says "Five self-directed sites...".
- [ ] Section lead paragraph reflects five sites and mentions rentals as a category.
- [ ] `public/llms.txt` lists Unboxed under Concept Builds without a "Code:" clause.
- [ ] `npm run build` passes.
- [ ] Card renders correctly in the scroll-snap strip on mobile and desktop widths, including nav dots.
