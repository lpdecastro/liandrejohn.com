# Current Feature: Add Unboxed Concept Build Card

## Goals

- Add Unboxed (unboxed.liandrejohn.com) as the first card in the `#concept-builds` strip on `index.html`, pushing Altamira/Handa/Sereva/Stillward to positions 2–5.
- Card follows the exact existing markup pattern: icon-labeled eyebrow, `h3` name, one-line description, 3-item feature list, CTA row.
- Ship the pre-optimized WebP screenshot into `public/images/`.
- Keep the section lead copy, JSON-LD `ItemList`, and `public/llms.txt` in sync with the new 5-card count.

## Notes

**Card content:**
- Eyebrow icon + label: "Board Game Rentals" (pick an existing Bootstrap Icons glyph, e.g. `dice-5`)
- Name (h3): Unboxed
- Description: A personal board game rental service for Metro Manila.
- Feature list (3 items):
  - Real-time availability by rental date
  - GCash payment, verified by hand
  - Lalamove delivery across Metro Manila
- CTAs: `View Site` (`btn btn-primary btn-sm` → `https://unboxed.liandrejohn.com/`) and `View Code` (`btn btn-outline-secondary btn-sm` → `https://github.com/lpdecastro/unboxed.liandrejohn.com`), matching the other four cards. (Earlier draft assumed no public repo; corrected once the user supplied the repo URL.)
- Analytics attrs: `data-analytics-event="project_click"`, `data-analytics-project-name="unboxed"`, `data-analytics-project-type="board_game_rental"`, `data-analytics-link-type="live_site"`, `data-analytics-section-name="concept_builds"`.

**Image:**
- Live hero screenshot, viewport locked to 1200×675 (matches `ratio-16x9` cards exactly, no cropping needed), optimized to WebP q75 (58 KB, in line with existing 15–70 KB assets).
- Staged at scratchpad path — move into place during implementation:
  - Source: `/private/tmp/claude-501/-Users-lpdecastro-Documents-GitHub-liandrejohn-com/a82799d8-b908-45fa-81ab-0c101e7181f2/scratchpad/concept-unboxed.webp`
  - Destination: `public/images/concept-unboxed.webp`
- `alt`: "Unboxed board game rental site concept"

**Placement & renumbering:**
- Insert `<article id="concept-unboxed">` as the first card inside `#projectStrip`, before `concept-altamira`.
- Renumber the four existing `<!-- Concept build N: ... -->` HTML comments from 1–4 to 2–5.
- `#projectStripDots` and prev/next controls in `src/js/main.js` are DOM-driven — no JS/SCSS changes needed.

**Copy & schema updates:**
- Section lead paragraph: "Four live sites across marketing, booking, and e-commerce" → "Five live sites across marketing, booking, rentals, and e-commerce".
- JSON-LD `ItemList` (`#concept-builds`): `description` "Four self-directed..." → "Five self-directed...", `numberOfItems` 4 → 5, add new `ListItem` at `position: 1` for Unboxed (`CreativeWork`, `url`, `mainEntityOfPage: "#concept-unboxed"`, `about: "Board game rentals"`, `creator` back-reference, `hasPart`/`SoftwareSourceCode` → `https://github.com/lpdecastro/unboxed.liandrejohn.com`), renumber existing four `position` values 1–4 → 2–5.
- `public/llms.txt` Concept Builds: add Unboxed entry in the existing `- [Name](url) — description. Code: repo-url` pattern, including the "Code:" clause.

**Out of scope:**
- No changes to the two Unboxed blog posts (already merged).
- No new sitemap.xml entry (concept-build subdomains are separate deployments and are never listed there).

**Acceptance criteria:**
- [ ] `concept-unboxed.webp` (1200×675, optimized WebP) is in `public/images/`.
- [ ] New card is the first `<article>` in `#projectStrip`, with `View Site` and `View Code` CTAs.
- [ ] Existing four cards' HTML comments and JSON-LD `position` values are renumbered 2–5.
- [ ] JSON-LD `numberOfItems` is `5` and its `description` says "Five self-directed sites...".
- [ ] Section lead paragraph reflects five sites and mentions rentals as a category.
- [ ] `public/llms.txt` lists Unboxed under Concept Builds with a "Code:" clause.
- [ ] `npm run build` passes.
- [ ] Card renders correctly in the scroll-snap strip on mobile and desktop widths, including nav dots.

Full spec: `context/features/add-unboxed-concept-build-card-spec.md`

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
- Blog post: Unboxed Part 2 ("How") — published `blog/how-i-built-unboxed.html` (intro + 5 sections, mobile screenshot converted JPEG→WebP, six-step workflow + verbatim log excerpts as styled code blocks), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`; retrofitted Part 1's two "that's Part 2" mentions into real cross-links. Merged 2026-09-15.
- Navbar: added icon-only GitHub link (github.com/lpdecastro) next to "Blog", before the "Get in Touch" CTA, across `index.html`, `blog/index.html`, and all four `blog/*.html` posts. Reused the existing inline GitHub SVG and `social_click` analytics convention. Merged 2026-09-15.
