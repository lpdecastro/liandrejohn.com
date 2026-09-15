# Blog Post: Unboxed Part 2 ("How") Spec

## Task

Publish `context/blogs/blog-post-part2-how.md` as a new blog post page, `blog/how-i-built-unboxed.html`, matching the structure and conventions of the three existing posts, and link it back-and-forth with the now-published Part 1 (`blog/why-i-built-unboxed.html`).

## Source Content

- Source: `context/blogs/blog-post-part2-how.md` — "Part 2: 'How I Actually Built It — Next.js, MongoDB, and an AI Coding Agent.'"
- Technical build-story post about [Unboxed](https://unboxed.liandrejohn.com): stack, the six-step feature workflow, verification discipline, and a few reusable engineering calls. Part 2 of 2 — the "how" (Part 1, the "why," is already published at `/blog/why-i-built-unboxed`).
- Status per source doc: numbers, code, and file paths are accurate as of 2026-09-15. Source doc marks one screenshot as a placeholder pending capture (`screenshot-placeholder-mobile-games.png`); the capture is now in the repo at `context/blogs/images/mobile-games.jpeg` — see Images for optimization and placement.

## Page Requirements

Follow the existing post template (`blog/how-i-built-my-portfolio-with-claude-code.html`, `blog/how-i-deployed-my-portfolio-to-aws.html`, `blog/why-i-built-unboxed.html`) for chrome and conventions:

- Same `<head>`: GA4 snippet (`content_group: 'blog'`), meta description, robots, favicons, canonical URL (`https://liandrejohn.com/blog/how-i-built-unboxed`), OG + Twitter card meta (sitewide default `/images/og-card-v2.jpg`, no dedicated OG asset), self-hosted font preload, `<link rel="stylesheet" href="/src/scss/main.scss">`.
- JSON-LD `@graph`: `BlogPosting` + reused `Person` (`#person`) + `Blog` (`#blog`, with this post added to its `blogPost`) + `BreadcrumbList`. Word count / `timeRequired` computed from final copy (~5 min read per source doc).
- Same page chrome: skip link, dark hero panel (navbar, breadcrumb, article header with eyebrow/H1/lead/byline/CTAs), white `<main id="content">` body, sticky right-column TOC (`.blog-toc`) at `lg`+ with a `<details class="blog-toc-mobile">` fallback below `lg`, `data-article-id="how-i-built-unboxed"` on `<body>`.
- Eyebrow / `article:section`: "Side projects" — same category as Part 1, since this is the same project's other half (source doc's suggested tags: nextjs, ai-coding, claude-code, mongodb, side-project).
- Byline date: 2026-09-15 (today, matching Part 1's publish date — both parts ship together). Reading time: 5 min, matching the source doc's estimate.
- Article header CTAs: "Read the blog" (jump link) + "View site" (`https://unboxed.liandrejohn.com`, external) + "View repo" (`https://github.com/lpdecastro/unboxed.liandrejohn.com`, external) — this post references the public repo directly (source doc links it in the intro and closing), unlike Part 1.

## Content Structure

Map the source markdown into numbered `<section>`s with TOC entries:

1. **The Stack** — intro paragraph (Part 1 backlink + repo link) as the lead paragraph, then the mobile games-page screenshot (see Images), then the "deliberately boring" framing and the bulleted stack list (Next.js/App Router, Bootstrap+Sass, MongoDB+Mongoose, Web3Forms/Google Places/GA4, AWS Amplify+GitHub Actions), closing with the "process mattered more than the tool" line.
2. **The Loop That Kept It From Turning Into a Mess** — the six-step workflow (DOCUMENT → BRANCH → IMPLEMENT → VERIFY → COMMIT → LOG) as a `<pre><code>` block using the existing token-span classes (`.tok-heading`/`.tok-comment`/etc. per `how-i-built-my-portfolio-with-claude-code.html`'s precedent), the paragraph on why steps 1 and 6 matter most, and the verbatim log excerpt (Google Places migration) as a second `<pre><code>` block.
3. **Verification Isn't Optional When Real Money's Involved** — the GCash/real-money framing paragraph and the verbatim "verified directly against MongoDB" excerpt as a `<pre><code>` block, closing with the trust-the-codebase line.
4. **A Few Calls I'd Make Again** — the three bullets (server-side pricing, the Google Places mobile UI tradeoff, the Bootstrap trim) as a `<ul>`, bold lead-ins preserved as `<strong>` per source doc.
5. **What I'd Tell Someone Trying This** — the four-bullet closing list, then the closing paragraph (live site link, spec-history repo link, Part 1 backlink with a real `href` this time).

Use plain `<ul>`/`<strong>` treatment (not the icon-tile decision-card grid) for sections 1 and 4, consistent with how Part 1 handled narrative content over spec-sheet content.

## Code Blocks

- Two `<pre><code>` blocks reuse the token-span pattern already defined in `blog/how-i-built-my-portfolio-with-claude-code.html` (`tok-heading`, `tok-comment`, `tok-dir`, `tok-branch` etc. — check that post's inline `<style>` for the class list before reusing).
- The six-step loop block and both verbatim excerpts (Google Places migration log, MongoDB verification log) are pasted from the source doc unmodified — these are the "proof" artifacts the post is about; don't paraphrase them.
- Follow the same accessibility precedent as the existing post: `<pre>` stays plain/selectable text (no syntax-highlighting JS wired at runtime — the token spans are static markup only).

## Images

Source doc marks one screenshot as a placeholder (`screenshot-placeholder-mobile-games.png`, "mobile screenshot of the games page showing the sticky booking summary"), placed right after the intro paragraph/repo link, before "The stack" — the post's lead image, same slot Part 1 used for its homepage screenshot.

The capture now exists at `context/blogs/images/mobile-games.jpeg` (944×2046, portrait/mobile aspect ratio — unlike Part 1's two 16:9 landscape captures — JPEG, ~80KB).

Handling:

- **Optimize before use:** convert the JPEG to WebP (`cwebp` is available on the machine) at a similar quality tier to the site's other blog images. Generate two widths, both ≤ the source's native 944px (don't upscale): a full size at native resolution (`944x2046`) and a half size (`472x1023`), preserving the exact aspect ratio.
- Move both into `public/images/blog/`, named `unboxed-mobile-games-944x2046.webp` and `unboxed-mobile-games-472x1023.webp`, following the `{name}-{width}x{height}.webp` precedent set by `unboxed-homepage-*` / `unboxed-booking-summary-*`. Confirm the resulting WebP files are meaningfully smaller than the source JPEG (they should be — WebP at equivalent quality typically beats JPEG by 25–35% — if `cwebp`'s default settings don't get there, raise compression before falling back to accepting a larger file).
- Reference from the page as `/images/blog/unboxed-mobile-games-944x2046.webp` with `srcset="/images/blog/unboxed-mobile-games-472x1023.webp 472w, /images/blog/unboxed-mobile-games-944x2046.webp 944w"`, `width="944" height="2046"`, `loading="lazy"`, following the existing `<figure><img class="img-fluid rounded-4 border">` + `<figcaption>` pattern.
- **Sizing differs from Part 1's images:** Part 1's screenshots are 16:9 landscape and use `sizes="(min-width: 992px) 66vw, 100vw"`, appropriate for a wide image. This screenshot is a tall phone capture — rendered at that same width it would tower over the surrounding text. Constrain it with Bootstrap's grid instead of the 66vw pattern: wrap the `<figure>` in a centered, narrower column (e.g. `<div class="row justify-content-center"><div class="col-8 col-sm-6 col-md-4">…</div></div>`) rather than inline/custom CSS, per [coding-standards.md](../coding-standards.md)'s Bootstrap-only rule. Pick column widths that read as phone-sized at every breakpoint without introducing new CSS.
- Alt text: "The Unboxed games page on mobile, showing the game grid with a sticky booking summary pinned to the bottom of the screen."

## Cross-Post Links

- **Part 1 → Part 2 (retrofit):** Part 1 (`blog/why-i-built-unboxed.html`) currently has two plain-text "that's Part 2" mentions with no link — line ~612 ("This post isn't about the code (that's Part 2)") and line ~850 ("...are worth their own post — that's Part 2."). Update both to link to `/blog/how-i-built-unboxed` now that it exists, matching the site's external-link `<a>` pattern (internal link, no `target="_blank"`/`rel`).
- **Part 2 → Part 1:** the source doc's `[In Part 1](#)` intro reference and `[Part 1](#)` closing reference both get a real `href="/blog/why-i-built-unboxed"`.
- Link `[Unboxed](https://unboxed.liandrejohn.com)` / `unboxed.liandrejohn.com` mentions and the repo link (`https://github.com/lpdecastro/unboxed.liandrejohn.com`, appears in the intro and the closing "spec history" line) as external links (`target="_blank" rel="noopener"`), consistent with existing posts.

## Build & Site Integration

- Add a new Vite input entry in `vite.config.mjs` (alongside `blogUnboxedWhyPost`), e.g. `blogUnboxedHowPost: resolve(__dirname, 'blog/how-i-built-unboxed.html')`.
- Add a new `<li><article>` card at the **top** of the post list in `blog/index.html` (list is newest-first, so this post goes above the Part 1 card since both publish today but Part 2 is the second/newer action) and add this post's entry to the index page's `Blog` JSON-LD `blogPost` array.
- Add a `<url>` entry to `public/sitemap.xml` for `https://liandrejohn.com/blog/how-i-built-unboxed` with `<lastmod>2026-09-15</lastmod>`.
- Add an entry under the `## Blog` section of `public/llms.txt`, matching the style of the existing entries, placed above the Part 1 entry. Update the Part 1 entry's closing clause ("Part 1 of 2; Part 2 covers the technical build.") to link the fact that Part 2 now exists, consistent with the retrofit in Cross-Post Links.

## Out of Scope

- A dedicated OG image for this post (the mobile games screenshot is an in-article figure, not the OG card).
- Any changes to the Unboxed site/repo itself — this is a portfolio blog post only.

## Acceptance Criteria

- [ ] `blog/how-i-built-unboxed.html` exists, builds cleanly (`npm run build`), and matches the existing posts' head/hero/TOC/section/structured-data conventions.
- [ ] All source content from `blog-post-part2-how.md` is represented (intro, stack list, six-step loop diagram, verbatim log excerpt, verification excerpt, three "calls I'd make again," closing four-bullet list, mobile games-page screenshot).
- [ ] Both `<pre><code>` blocks (six-step loop, log excerpts) render using the existing token-span classes and reproduce the source text verbatim.
- [ ] `mobile-games.jpeg` is converted to WebP at two widths (944w/472w), placed in `public/images/blog/` as `unboxed-mobile-games-944x2046.webp` / `unboxed-mobile-games-472x1023.webp`, and is smaller than the 80KB JPEG source at each size. The `<figure>` renders in a Bootstrap grid column narrow enough to read as phone-sized, not stretched to `66vw`.
- [ ] `vite.config.mjs` has a new input entry for the post.
- [ ] `blog/index.html` has a new post card at the top of the list linking to `/blog/how-i-built-unboxed`, and the `Blog` JSON-LD includes it.
- [ ] `public/sitemap.xml` includes the new post URL.
- [ ] `public/llms.txt` has a new `## Blog` entry for the post, and the existing Part 1 entry reflects that Part 2 is now published.
- [ ] `blog/why-i-built-unboxed.html`'s two "that's Part 2" mentions link to `/blog/how-i-built-unboxed`.
- [ ] `blog/how-i-built-unboxed.html`'s Part 1 references link to `/blog/why-i-built-unboxed`.
- [ ] `npm run build` and `npm run preview` succeed; the page renders correctly and internal nav (breadcrumb, TOC, CTAs, cross-post links) works.
