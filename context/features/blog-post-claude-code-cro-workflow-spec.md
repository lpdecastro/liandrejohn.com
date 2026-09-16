# Blog Post: Claude Code CRO Copywriting Workflow Spec

## Task

Publish `context/blogs/claude-code-cro-workflow.md` as a new blog post page, `blog/how-i-built-a-cro-copywriting-workflow-in-claude-code.html`, matching the structure and conventions of the four existing posts.

## Source Content

- Source: `context/blogs/claude-code-cro-workflow.md` — "How I Built a CRO Copywriting Workflow in Claude Code."
- Architecture/process post: how a fixed pipeline of skills, subagents, and reference material (applied to CRO landing-page copywriting, using a fictional nighttime-supplement product so no real client work is exposed) replaces one long back-and-forth chat. Not part of a series — no existing post to cross-link.
- ~2,180 words in the source doc. No images referenced or supplied — every diagram in the source (pipeline, folder tree, four-agent table, rubric, before/after) is ASCII art meant for `<pre><code>` blocks, not a screenshot.
- Status per source doc: describes the CRO pipeline hypothetically/plausibly (explicitly not run end-to-end) — don't reword hedges like "would plausibly produce" or "I haven't run this four-agent version end to end" into claims of a finished, tested result.

## Page Requirements

Follow the existing post template — most closely `blog/how-i-built-my-portfolio-with-claude-code.html`, which is the other process/architecture post (vs. the two Unboxed posts, which are project build-story posts) — for chrome and conventions:

- Same `<head>`: GA4 snippet (`content_group: 'blog'`), meta description, robots, favicons, canonical URL (`https://liandrejohn.com/blog/how-i-built-a-cro-copywriting-workflow-in-claude-code`), OG + Twitter card meta (sitewide default `/images/og-card-v2.jpg`, no dedicated OG asset), self-hosted font preload, `<link rel="stylesheet" href="/src/scss/main.scss">`.
- JSON-LD `@graph`: `BlogPosting` + reused `Person` (`#person`) + `Blog` (`#blog`, with this post added to its `blogPost`) + `BreadcrumbList`. `articleSection`: "AI-assisted engineering" (same category as the portfolio-build post — this is a Claude Code workflow/architecture piece, not a "Side projects" build story or "Cloud & DevOps" post). Word count / `timeRequired` computed from final copy (source is ~2,180 words → roughly a 9–10 min read; confirm against the actual published copy).
- Same page chrome: skip link, dark hero panel (navbar, breadcrumb, article header with eyebrow/H1/lead/byline/CTAs), white `<main id="content">` body, sticky right-column TOC (`.blog-toc`) at `lg`+ with a `<details class="blog-toc-mobile">` fallback below `lg`, `data-article-id="how-i-built-a-cro-copywriting-workflow-in-claude-code"` on `<body>`.
- Byline date: today's publish date at implementation time. Reading time: computed per above.
- Article header CTAs: "Read the blog" (jump link) + one relevant external CTA if the source doc's Resources section resolves to a real link by publish time (e.g. Claude Code docs) — otherwise omit the second CTA rather than link a placeholder. No repo to link (this post describes a pattern, not a shipped project).

## Content Structure

Map the source markdown into numbered `<section>`s with matching TOC entries — this doc has more headers than prior posts, so keep the mapping 1:1 with the source's own `##` breaks rather than merging sections for brevity:

1. **The Problem With One Long Conversation** — intro paragraphs (no header in source) as lead-in copy above/within this section, then the "correction loop" explanation.
2. **The Shape of the Fix** — the pipeline diagram (Brief → Research → Strategy → Draft → Independent Critique → Revision → Evaluation → Final copy) as a `<pre><code>` block, plus the explanatory paragraph.
3. **The Workspace** — the folder-tree diagram (`claude-copy-workspace/...`) as a `<pre><code>` block using the existing `tok-dir`/`tok-branch`/`tok-comment` token-span classes (per `how-i-built-my-portfolio-with-claude-code.html`'s precedent), the six bullet points (one per folder/file), and the paragraph noting this article itself went through the structurally identical three-agent version of this pipeline.
4. **The Skill Is the Orchestrator, Not the Brain** — the explanatory paragraph, the "Research" skill-step code snippet as a second `<pre><code>` block (reuse `tok-heading`/`tok-comment` for the `###`/comment-like lines), and the closing paragraph on why business knowledge stays out of the skill.
5. **Reference Material: Selective, Not Total** — plain paragraphs, no code block.
6. **Four Agents, Four Jobs** — the four-agent breakdown (Researcher/Strategist/Copywriter/Critic → responsibilities) as a `<pre><code>` block, then the critic-design paragraph and the three-vs-four-agent comparison paragraph.
7. **Walking Through the Fictional Example** — intro paragraph on the fictional supplement product, then the four-item bulleted list (Research/Strategy/Draft/Critique would plausibly produce), then the closing caveat paragraph. Plain `<ul>` with bold lead-ins (`<strong>`), not the icon-tile decision-card grid — this is narrative/hypothetical content, not a spec sheet.
8. **Why an Evaluation Rubric Matters** — intro paragraph, the nine-item rubric list as a `<pre><code>` block (matches the source's fenced-list treatment), and the closing paragraph.
9. **Before vs. After** — intro paragraph, the Traditional/Structured before-after diagram as a `<pre><code>` block, and the closing paragraph on the shift in role.
10. **What I Learned** — the seven-bullet list as a `<ul>` with bold lead-ins, plus the one-line transition sentence into Limitations.
11. **Limitations** — the five-bullet list as a `<ul>`.

Close with a **Conclusion** paragraph pair (no numbered section, matching how prior posts end) and a **Resources** list — verify the Claude Code docs link resolves to a real current URL before publishing (source doc flags this explicitly); if it can't be verified, keep the reference as plain text without a hyperlink rather than guessing a path.

## Code Blocks

- Five `<pre><code>` blocks (pipeline diagram, folder tree, skill-step snippet, four-agent breakdown, rubric list, before/after diagram — six total) reuse the token-span pattern already defined in `blog/how-i-built-my-portfolio-with-claude-code.html` (`tok-heading`, `tok-comment`, `tok-dir`, `tok-branch`, etc. — check that post's inline `<style>` for the full class list before reusing; introduce no new token classes).
- All six blocks are pasted from the source doc unmodified — these are the structural artifacts the post is explaining; don't paraphrase or reflow them.
- `<pre>` stays plain/selectable text (no syntax-highlighting JS wired at runtime — token spans are static markup only), matching existing posts' accessibility precedent.

## Images

None. The source doc has no screenshots or figures — every visual is one of the six code blocks above. Do not invent a hero image or OG asset for this post; it inherits the sitewide default OG card like the other process/architecture post.

## Cross-Post Links

None. This post isn't part of a series and doesn't reference another post on the site. If a future post picks up this thread, wire the cross-link then (see the `blog` skill's `crosslink` action) — don't add a placeholder link now.

## Build & Site Integration

- Add a new Vite input entry in `vite.config.mjs`, e.g. `blogCroWorkflowPost: resolve(__dirname, 'blog/how-i-built-a-cro-copywriting-workflow-in-claude-code.html')`.
- Add a new `<li><article>` card at the top of the post list in `blog/index.html` (list is newest-first) and add this post's entry to the index page's `Blog` JSON-LD `blogPost` array.
- Add a `<url>` entry to `public/sitemap.xml` for `https://liandrejohn.com/blog/how-i-built-a-cro-copywriting-workflow-in-claude-code` with `<lastmod>` set to the publish date.
- Add an entry under the `## Blog` section of `public/llms.txt`, newest-first, matching the one-paragraph-summary style of the existing entries.

## Out of Scope

- Building or scaffolding an actual `claude-copy-workspace/` (skills, subagents, references, evals) — the post documents the pattern, it doesn't ship the workspace.
- Any dedicated OG image, hero screenshot, or new figure — this post is diagrams-as-code-blocks only.
- Cross-linking to any other post — none exists yet for this topic.

## Acceptance Criteria

- [ ] `blog/how-i-built-a-cro-copywriting-workflow-in-claude-code.html` exists, builds cleanly (`npm run build`), and matches the existing posts' head/hero/TOC/section/structured-data conventions.
- [ ] All source content from `claude-code-cro-workflow.md` is represented across 11 numbered sections plus Conclusion and Resources, with no hedged/hypothetical language (e.g. "would plausibly produce," "I haven't run this end to end") rewritten as a claim of a finished or tested result.
- [ ] All six `<pre><code>` blocks (pipeline diagram, folder tree, skill-step snippet, four-agent breakdown, rubric list, before/after diagram) render using the existing token-span classes and reproduce the source text verbatim.
- [ ] `articleSection`/eyebrow is "AI-assisted engineering"; word count and `timeRequired` are computed from the actual published copy, not guessed.
- [ ] The Resources section's Claude Code docs reference is either a verified working link or plain unlinked text — never a guessed URL.
- [ ] `vite.config.mjs` has a new input entry for the post.
- [ ] `blog/index.html` has a new post card at the top of the list linking to `/blog/how-i-built-a-cro-copywriting-workflow-in-claude-code`, and the `Blog` JSON-LD includes it.
- [ ] `public/sitemap.xml` includes the new post URL with today's `<lastmod>`.
- [ ] `public/llms.txt` has a new `## Blog` entry for the post, placed above the previous newest entry.
- [ ] `npm run build` and `npm run preview` succeed; the page renders correctly and internal nav (breadcrumb, TOC, CTAs) works.
