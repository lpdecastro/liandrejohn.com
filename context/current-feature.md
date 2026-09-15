# Current Feature: Blog Post - Unboxed Part 1 ("Why")

## Goals

- Publish `context/blogs/blog-post-part1-why.md` as `blog/why-i-built-unboxed.html`, matching the structure/conventions of the two existing blog posts.
- Represent all source content: intro, four numbered sections (constraint framing, policies, website responsibilities, why-sharing/scope-discipline), and the two now-captured screenshots.
- Wire the post into the site: new Vite input entry, new card at top of `blog/index.html`, new `sitemap.xml` URL, new `llms.txt` entry.
- Ship a clean, verified build (`npm run build` + `npm run preview`) with working nav (breadcrumb, TOC, CTAs).

## Notes

- Source: `context/blogs/blog-post-part1-why.md` — Part 1 of 2 ("why"); Part 2 ("how") is out of scope, not yet published/linked.
- Template reference: `blog/how-i-built-my-portfolio-with-claude-code.html` and `blog/how-i-deployed-my-portfolio-to-aws.html` for head, hero, TOC, JSON-LD `@graph` (BlogPosting + Person `#person` + Blog `#blog` + BreadcrumbList), and section structure.
- Canonical URL: `https://liandrejohn.com/blog/why-i-built-unboxed`. Byline date: 2026-09-15. Reading time: 5 min.
- Eyebrow/section: "Side projects". Header CTAs: "Read the blog" (jump link) + "View site" (`https://unboxed.liandrejohn.com`, external) — no GitHub link.
- Section 1 ("The Constraint That Shaped Everything") is narrative (plain list/short sub-headed paragraphs), NOT the icon-tile decision-card grid style used in other posts.
- Section 2 policies as a `<ul>` (payment-before-confirmation, deposit-vs-rental-fee refunds, cancellation terms, 2+ game discount) plus policy-vs-code framing line.
- Section 3: three numbered responsibilities (availability, pricing, Metro Manila boundary) + closing line on what stays manual.
- Section 4: over-building risk, scope-discipline takeaway, Part 2 teaser (plain text, no dead link).
- Images: move `unboxed-homepage-{1600x900,800x450}.webp` and `unboxed-booking-summary-{1600x900,800x450}.webp` from `context/blogs/images/` to `public/images/blog/`, reference as `/images/blog/...`. Homepage image goes after intro paragraph (above section 1); booking-summary image goes in section 2 near the multi-game discount bullet. Each in a `<figure>` with srcset (800w/1600w), `sizes="(min-width: 992px) 66vw, 100vw"`, width/height 1600x900, `loading="lazy"`, figcaption, and the exact alt text specified in the spec.
- Use sitewide default OG image (`/images/og-card-v2.jpg`) — no dedicated OG asset.
- External links (Unboxed site mentions) use `target="_blank" rel="noopener"`.
- Full spec: `context/features/blog-post-unboxed-part1-why-spec.md`.

## History

-
