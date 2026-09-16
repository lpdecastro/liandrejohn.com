# Current Feature: Blog Post — Claude Code CRO Copywriting Workflow

## Goals

- Publish `context/blogs/claude-code-cro-workflow.md` as `blog/how-i-built-a-cro-copywriting-workflow-in-claude-code.html`, matching the existing posts' head/hero/TOC/section/structured-data conventions.
- Map the source into 11 numbered `<section>`s plus a closing Conclusion and Resources section, per the spec's section-by-section mapping.
- Reproduce all six source diagrams (pipeline, folder tree, skill-step snippet, four-agent breakdown, rubric list, before/after) verbatim as `<pre><code>` blocks reusing the existing `tok-*` token-span classes — no new token classes, no paraphrasing.
- Wire the post into all four integration points: `vite.config.mjs`, `blog/index.html` (card + JSON-LD), `public/sitemap.xml`, `public/llms.txt`.
- No images (source has none) and no cross-post links (not part of a series).

## Notes

- Full spec: `context/features/blog-post-claude-code-cro-workflow-spec.md`.
- Slug: `how-i-built-a-cro-copywriting-workflow-in-claude-code`. Category/`articleSection`/eyebrow: "AI-assisted engineering" (same as the portfolio-build post, not the Unboxed "Side projects" posts or the AWS "Cloud & DevOps" post).
- Source is ~2,180 words → roughly a 9–10 min read; compute exact word count / `timeRequired` from the final published copy, don't guess.
- Resources section references Claude Code docs — verify the link resolves before hyperlinking it; if it can't be verified, leave as plain unlinked text rather than guessing a URL.
- Preserve the source's hedging language ("would plausibly produce," "haven't run this four-agent version end to end") — don't rewrite as a claim of a finished/tested result.
- Out of scope: don't scaffold an actual `claude-copy-workspace/`; no dedicated OG image or hero screenshot.

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
- Blog post: Unboxed Part 2 ("How") — published `blog/how-i-built-unboxed.html` (intro + 5 sections, mobile screenshot converted JPEG→WebP, six-step workflow + verbatim log excerpts as styled code blocks), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`; retrofitted Part 1's two "that's Part 2" mentions into real cross-links. Merged 2026-09-15.
- Navbar: added icon-only GitHub link (github.com/lpdecastro) next to "Blog", before the "Get in Touch" CTA, across `index.html`, `blog/index.html`, and all four `blog/*.html` posts. Reused the existing inline GitHub SVG and `social_click` analytics convention. Merged 2026-09-15.
- Concept Builds: added Unboxed (unboxed.liandrejohn.com) as the first card in the `#concept-builds` strip, pushing Altamira/Handa/Sereva/Stillward to positions 2–5. Live hero screenshot captured and optimized to WebP (`public/images/concept-unboxed.webp`), `View Site` + `View Code` CTAs, wired into the JSON-LD `ItemList` and `public/llms.txt`; section lead copy updated for five sites. Merged 2026-09-15.
- Tooling: filled in `.claude/skills/blog/SKILL.md`, which had been scaffolded empty since the Unboxed Part 1 commit. Documents the full post-publish checklist (head/JSON-LD/analytics conventions, image optimization, the four wiring points — `vite.config.mjs`, `blog/index.html`, `sitemap.xml`, `llms.txt`) plus a `crosslink` action, derived from how the four existing posts were actually built. Merged 2026-09-16.
