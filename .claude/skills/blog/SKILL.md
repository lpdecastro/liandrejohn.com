---
name: blog
description: Write and publish a new blog post, or cross-link an existing one, wiring it into the build, blog index, sitemap, and llms.txt
argument-hint: <post title or topic>
---

# Blog Post Workflow

Publishing a post here isn't just writing `blog/{slug}.html` — every post is wired
into five other places, and skipping one leaves the post live but half-indexed
(missing from the build, invisible on the blog index, absent from search/AI
crawlers). This skill is the checklist so that doesn't happen silently.

## Task

Execute the requested action: $ARGUMENTS

| Action | Description |
| --- | --- |
| `new` | Write and publish a new post from a title/topic |
| `crosslink` | Wire a real cross-link between two existing posts (e.g. a "Part 1/Part 2" pair) |

If no action is given, ask whether this is a new post or a cross-link between existing ones.

## `new` — write and publish a post

1. Read `context/project-overview.md` and the two most recently published posts
   (check `context/current-feature.md` History for the latest) to match voice,
   structure, and length. Don't invent a new tone per post.

2. Derive a kebab-case slug from the title (e.g. "Why I Built Unboxed" →
   `why-i-built-unboxed`). Confirm it doesn't already exist under `blog/`.

3. Write `blog/{slug}.html`, copying the structure of the most recent post
   file rather than reinventing it:
   - `<head>`: charset/viewport, GA4 snippet (`content_group: "blog"`),
     description + robots + author meta, favicons, canonical
     (`https://liandrejohn.com/blog/{slug}`), Open Graph + Twitter card,
     and a JSON-LD `@graph` with `BlogPosting`, `Person`, `Blog`, and
     `BreadcrumbList` nodes — `BlogPosting.@id` is
     `https://liandrejohn.com/blog/{slug}#article`.
   - `<body data-page="blog" data-article-id="{slug}" data-article-section="...">`
     — `data-article-id` drives scroll-depth/CTA analytics in `src/js/analytics.js`
     and must match the JSON-LD slug exactly.
   - Navbar + breadcrumb (`data-analytics-position="breadcrumb"`), hero header
     (kicker, `<h1 class="display-3 fw-bold mb-0">`, dek, read/view CTAs with
     `data-analytics-event="cta_click"`).
   - Table of contents, both mobile and desktop variants, one `<a href="#{n-slug}">`
     per section — anchors must match section `id`s exactly
     (`data-analytics-event="toc_click"`).
   - One `<section id="{n}-{slug}-title-free-slug" aria-labelledby="{id}-title">`
     per topic, heading `id="{section-id}-title"`.
   - Every internal link, CTA, and social icon carries the existing
     `data-analytics-*` attributes (`nav_click`, `social_click`, `cta_click`,
     `toc_click`) — copy the attribute names from the reference post, don't
     invent new event names.
   - Footer matches the sitewide footer markup verbatim.

4. Images: convert to WebP, provide two widths (e.g. `-800x450` /
   `-1600x900`) with `srcset`/`sizes`, explicit `width`/`height`, and
   `loading="lazy"`. Store under `public/images/blog/`. Never reference
   unoptimized JPEG/PNG in the published post.

5. Wire the post into the build and discovery surfaces — all four, every time:
   - `vite.config.mjs`: add one `rollupOptions.input` entry
     (`blog{PascalCaseSlug}Post: resolve(__dirname, 'blog/{slug}.html')`).
   - `blog/index.html`: add an `<article>` card (kicker, `<h2 class="h3 fw-bold mb-3">`,
     dek, `data-analytics-article-id="{slug}"`) above older posts, and add the
     matching `BlogPosting` node to the index page's own `@graph`.
   - `public/sitemap.xml`: add a `<url>` entry with today's date as `<lastmod>`.
   - `public/llms.txt`: add a bullet under `## Blog`, newest first, in the
     same one-paragraph-summary style as the existing entries.

6. If this post is part of a series, cross-link it (see `crosslink` below)
   rather than leaving a "more on this later" placeholder.

7. Run `npm run build` to confirm the new input compiles and no asset paths
   are broken before treating the post as done.

## `crosslink` — link two existing posts

1. Identify the two posts and which is earlier/later in the series.
2. In the earlier post, replace any vague forward-reference ("that's a story
   for another post") with a real `<a href="/blog/{later-slug}">Part 2</a>`
   (or the appropriate label) inline in the prose — see
   `blog/why-i-built-unboxed.html` for the pattern.
3. In the later post, add a matching backward-reference near the intro.
4. Do not add a "Related posts" section or a design element that doesn't
   already exist elsewhere in the post template — a cross-link is one inline
   sentence with a real `<a>`, not a new UI component.

## Notes

- Never write custom CSS for a post — every visual pattern here (cards,
  ToC, figure captions, code blocks) already exists in Bootstrap classes used
  by prior posts. Copy from them; see `context/coding-standards.md`.
- Keep `public/llms.txt` and `public/sitemap.xml` in sync on every publish —
  they're easy to forget because the post still renders fine without them.
