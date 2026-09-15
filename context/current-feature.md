# Current Feature: Blog Post — Unboxed Part 2 ("How")

## Goals

- Publish `context/blogs/blog-post-part2-how.md` as `blog/how-i-built-unboxed.html`, matching the head/hero/TOC/section/structured-data conventions of the three existing posts.
- Represent all source content: intro (Part 1 backlink + repo link), mobile games-page screenshot, "The Stack," the six-step workflow loop (with verbatim log excerpt), the MongoDB verification section (with verbatim excerpt), "A Few Calls I'd Make Again," and the closing "What I'd Tell Someone" list.
- Optimize and ship the newly captured screenshot (`context/blogs/images/mobile-games.jpeg`) as WebP at two widths, sized appropriately for its portrait/mobile aspect ratio.
- Cross-link Part 1 ↔ Part 2 with real URLs now that both exist (retrofit Part 1's two "that's Part 2" plain-text mentions; Part 2's Part 1 references get real hrefs).
- Wire the new post into `vite.config.mjs`, `blog/index.html` (post list + JSON-LD), `public/sitemap.xml`, and `public/llms.txt` (including updating the Part 1 llms.txt entry to reflect Part 2's existence).
- `npm run build` and `npm run preview` succeed; page renders correctly, internal nav and cross-post links work.

## Notes

Full spec: `context/features/blog-post-unboxed-part2-how-spec.md`

- Follow existing templates: `blog/how-i-built-my-portfolio-with-claude-code.html`, `blog/how-i-deployed-my-portfolio-to-aws.html`, `blog/why-i-built-unboxed.html`.
- Canonical URL: `https://liandrejohn.com/blog/how-i-built-unboxed`. Eyebrow: "Side projects." Byline date 2026-09-15, 5 min read. `data-article-id="how-i-built-unboxed"`.
- CTAs: "Read the blog" (jump link), "View site" (unboxed.liandrejohn.com), "View repo" (github.com/lpdecastro/unboxed.liandrejohn.com) — this post links the repo, unlike Part 1.
- Two `<pre><code>` blocks reuse the token-span classes (`tok-heading`, `tok-comment`, `tok-dir`, `tok-branch`, etc.) already defined in `how-i-built-my-portfolio-with-claude-code.html` — check its inline `<style>` for the exact class list. Both the six-step loop diagram and the two verbatim log excerpts (Google Places migration, MongoDB verification) must be pasted unmodified from the source doc.
- Sections 1 and 4 use plain `<ul>`/`<strong>` treatment, not the icon-tile decision-card grid.
- Images: convert `context/blogs/images/mobile-games.jpeg` (944×2046 JPEG, ~80KB) via `cwebp` to two WebP widths — `unboxed-mobile-games-944x2046.webp` (native) and `unboxed-mobile-games-472x1023.webp` (half) — into `public/images/blog/`. Confirm WebP output is smaller than the JPEG source at each size. Since this is a portrait/mobile capture (unlike Part 1's 16:9 shots), constrain its display width with a centered Bootstrap grid column (e.g. `row justify-content-center` / `col-8 col-sm-6 col-md-4`) rather than the `66vw` sizing Part 1 used — no custom CSS, per `coding-standards.md`. Alt text: "The Unboxed games page on mobile, showing the game grid with a sticky booking summary pinned to the bottom of the screen."
- Part 1 retrofit: update the two plain-text "that's Part 2" mentions in `blog/why-i-built-unboxed.html` (~line 612, ~line 850) to link `/blog/how-i-built-unboxed`.
- `blog/index.html`: new post card goes above the Part 1 card (newest-first, Part 2 is the later of the two actions today).
- Out of scope: dedicated OG image for this post; any changes to the Unboxed site/repo itself.

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
