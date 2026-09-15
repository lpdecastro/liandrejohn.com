# Current Feature

## Goals

<!-- Bullet points of what success looks like -->

## Notes

<!-- Additional context, constraints, or details from spec -->

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
- Blog post: Unboxed Part 2 ("How") — published `blog/how-i-built-unboxed.html` (intro + 5 sections, mobile screenshot converted JPEG→WebP, six-step workflow + verbatim log excerpts as styled code blocks), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`; retrofitted Part 1's two "that's Part 2" mentions into real cross-links. Merged 2026-09-15.
- Navbar: added icon-only GitHub link (github.com/lpdecastro) next to "Blog", before the "Get in Touch" CTA, across `index.html`, `blog/index.html`, and all four `blog/*.html` posts. Reused the existing inline GitHub SVG and `social_click` analytics convention. Merged 2026-09-15.
- Concept Builds: added Unboxed (unboxed.liandrejohn.com) as the first card in the `#concept-builds` strip, pushing Altamira/Handa/Sereva/Stillward to positions 2–5. Live hero screenshot captured and optimized to WebP (`public/images/concept-unboxed.webp`), `View Site` + `View Code` CTAs, wired into the JSON-LD `ItemList` and `public/llms.txt`; section lead copy updated for five sites. Merged 2026-09-15.
