# Blog Post: Unboxed Part 1 ("Why") Spec

## Task

Publish `context/blogs/blog-post-part1-why.md` as a new blog post page, `blog/why-i-built-unboxed.html`, matching the structure and conventions of the two existing posts.

## Source Content

- Source: `context/blogs/blog-post-part1-why.md` — "Part 1: 'I Own 8 Board Games. Here's What I Built Around Them.'"
- Personal/product-story post about [Unboxed](https://unboxed.liandrejohn.com), a board-game rental side project. Part 1 of 2 — the "why" (decisions, constraints, scope discipline). Part 2 ("how", technical build) is a separate future post from `blog-post-part2-how.md`, **not** in scope here.
- Status per source doc: numbers, policies, and file paths are accurate as of 2026-09-15. Source doc originally marked two screenshots as placeholders pending capture; both are now captured (see Images).

## Page Requirements

Follow the existing post template (`blog/how-i-built-my-portfolio-with-claude-code.html`, `blog/how-i-deployed-my-portfolio-to-aws.html`) for chrome and conventions:

- Same `<head>`: GA4 snippet, meta description, robots, favicons, canonical URL (`https://liandrejohn.com/blog/why-i-built-unboxed`), OG + Twitter card meta, self-hosted font preload, `<link rel="stylesheet" href="/src/scss/main.scss">`.
- JSON-LD `@graph`: `BlogPosting` + reused `Person` (`#person`) + `Blog` (`#blog`, with this post added to its `blogPost`) + `BreadcrumbList`. Word count / `timeRequired` computed from final copy (~5 min read per source doc).
- Same page chrome: skip link, dark hero panel (navbar, breadcrumb, article header with eyebrow/H1/lead/byline/CTAs), white `<main id="content">` body, sticky right-column TOC (`.blog-toc`) at `lg`+ with a `<details class="blog-toc-mobile">` fallback below `lg`.
- Eyebrow / `article:section`: "Side projects" (source doc's suggested tags: side-project, personal-project, mvp, product-thinking).
- Byline date: 2026-09-15 (today; source doc states content is accurate as of this date). Reading time: 5 min, matching the source doc's estimate.
- Article header CTAs: "Read the blog" (jump link) + "View site" (`https://unboxed.liandrejohn.com`, external) — no GitHub repo link, since Unboxed isn't this repo.

## Content Structure

Map the source markdown into numbered `<section>`s with TOC entries:

1. **The Constraint That Shaped Everything** — solo-operator framing; GCash/manual payment, Lalamove/manual delivery, one-game-one-booking, each as its own point (a plain list or short sub-headed paragraphs, not the icon-tile decision-card grid used for the other two posts' "what/stack" sections — this content is narrative, not a spec sheet).
2. **Policies That Stay Consistent Even Without Automation** — the four bullet policies (payment-before-confirmation, deposit-vs-rental-fee refund rules, cancellation terms, 2+ game discount) as a `<ul>`, plus the framing line about policy vs. code.
3. **What the Website Is Actually Responsible For** — the three numbered responsibilities (availability, pricing, Metro Manila boundary), plus the closing line on what stays manual.
4. **Why I'm Sharing This Instead of Just Linking the Site** — over-building risk, the scope-discipline takeaway, and the Part 2 teaser.

Include the intro paragraph (the "8 board games" line) as the lead paragraph above section 1, following the existing posts' lead/TL;DR pattern.

## Images

Source doc marks two screenshots as placeholders (`screenshot-placeholder-homepage.png`, `screenshot-placeholder-booking-summary.png`) with the status "draft, needs screenshots before publishing" — the actual captures now exist at `context/blogs/images/`:

- `unboxed-homepage-1600x900.webp` / `unboxed-homepage-800x450.webp` — homepage hero (logo, headline "Game night without buying the game.", stacked board games photo). Replaces `screenshot-placeholder-homepage.png`, placed after the intro paragraph, above section 1.
- `unboxed-booking-summary-1600x900.webp` / `unboxed-booking-summary-800x450.webp` — the booking page's game grid plus the "Your Booking" summary panel showing dates, per-game pricing, multi-game discount, deposits, and total. Replaces `screenshot-placeholder-booking-summary.png`, placed in section 2 (Policies), near the multi-game discount bullet.

Handling:

- Move both pairs from `context/blogs/images/` into `public/images/blog/` (following the `portfolio-header-1600.webp` / `-800.webp` naming precedent) before implementation, then reference them from the page as `/images/blog/unboxed-homepage-*.webp` and `/images/blog/unboxed-booking-summary-*.webp`.
- Each `<figure>` follows the existing pattern: `<img>` with `srcset` (800w/1600w), `sizes="(min-width: 992px) 66vw, 100vw"`, `width="1600" height="900"`, `loading="lazy"`, and a `<figcaption>`.
- Alt text: homepage image — "The Unboxed homepage: a headline over a photo of the 8 rentable board games stacked together, with GCash and Lalamove rental details below." Booking summary image — "The Unboxed booking page: a grid of available games next to a booking summary showing rental dates, per-game pricing, the multi-game discount, refundable deposits, and the total amount to pay."
- Use the sitewide default OG image (`/images/og-card-v2.jpg`) rather than inventing a dedicated one, since no Unboxed-specific OG asset exists.

## Cross-Post Links

- Part 2 doesn't have a URL yet. Keep the "that's Part 2" / "that's Part 2" references as plain text (no link, or a link to `/blog/` if a destination is required) rather than a dead anchor — swap in the real `href` once Part 2 ships.
- Link `[Unboxed](https://unboxed.liandrejohn.com)` and `unboxed.liandrejohn.com` mentions as external links (`target="_blank" rel="noopener"`), consistent with how the existing posts link out to Altamira/Handa/etc.

## Build & Site Integration

- Add a new Vite input entry in `vite.config.mjs` (alongside `blogPortfolioPost` / `blogAwsDeploymentPost`), e.g. `blogUnboxedWhyPost: resolve(__dirname, 'blog/why-i-built-unboxed.html')`.
- Add a new `<li><article>` card at the **top** of the post list in `blog/index.html` (list is newest-first), matching the existing card markup (kicker/date/read-time, `<h2>` headline link with `.stretched-link`, deck paragraph, "Read the post" link) and add this post's `blogPost` reference to the index page's own `Blog` JSON-LD if present there.
- Add a `<url>` entry to `public/sitemap.xml` for `https://liandrejohn.com/blog/why-i-built-unboxed` with `<lastmod>2026-09-15</lastmod>`.
- Add an entry under the `## Blog` section of `public/llms.txt`, matching the style of the two existing entries (link + one-paragraph summary).

## Out of Scope

- Part 2 ("how") page — separate future feature.
- A dedicated OG image for this post.
- Cross-linking Part 1 → Part 2 with a real URL (until Part 2 exists).

## Acceptance Criteria

- [ ] `blog/why-i-built-unboxed.html` exists, builds cleanly (`npm run build`), and matches the existing posts' head/hero/TOC/section/structured-data conventions.
- [ ] All source content from `blog-post-part1-why.md` is represented (intro, four sections, policy list, three responsibilities, closing) including the two screenshots.
- [ ] `vite.config.mjs` has a new input entry for the post.
- [ ] `blog/index.html` has a new post card at the top of the list linking to `/blog/why-i-built-unboxed`.
- [ ] `public/sitemap.xml` includes the new post URL.
- [ ] `public/llms.txt` has a new `## Blog` entry for the post.
- [ ] Homepage and booking-summary screenshots are moved into `public/images/blog/` and rendered via `<figure>`/`<img>` with correct `srcset`, dimensions, and alt text.
- [ ] `npm run build` and `npm run preview` succeed; the page renders correctly and internal nav (breadcrumb, TOC, CTAs) works.
