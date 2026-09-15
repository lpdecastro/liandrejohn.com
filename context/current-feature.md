# Current Feature: Add GitHub Link to Navbar

## Goals

- Add an icon-only link to https://github.com/lpdecastro in the navbar, next to the "Blog" link and before the "Get in Touch" CTA.
- Apply consistently across all pages that share the navbar: `index.html`, `blog/index.html`, and every `blog/*.html` post.

## Notes

- Reuse the existing inline GitHub logo SVG (`class="bi"`, viewBox 16x16) already used elsewhere in the codebase (e.g. blog post header "View repo" buttons) rather than inventing new icon markup — icons are inline SVGs, not the Bootstrap Icons web font (see `src/scss/main.scss` `.bi` comment).
- Follow the existing GitHub link convention: `target="_blank" rel="noopener"`, `data-analytics-event="social_click"`, plus `data-analytics-position="navbar"`.
- Icon-only link needs `aria-label="GitHub"` for accessibility since there's no visible text.

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
- Blog post: Unboxed Part 2 ("How") — published `blog/how-i-built-unboxed.html` (intro + 5 sections, mobile screenshot converted JPEG→WebP, six-step workflow + verbatim log excerpts as styled code blocks), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`; retrofitted Part 1's two "that's Part 2" mentions into real cross-links. Merged 2026-09-15.
