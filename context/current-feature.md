# Current Feature: Blog Post — React → Redux Toolkit → RTK Query Tutorial

Spec: `context/features/blog-post-react-redux-tutorial-spec.md`

## Goals

- Publish `blog/react-redux-toolkit-rtk-query-tutorial.html`, a beginner step-by-step tutorial that builds a product browser progressively: static JSX → `.map()` → `useState` → fetch → debounce → sorting/pagination → Ant Design → Redux Toolkit → RTK Query.
- 17 numbered steps in four parts (Plain React, Ant Design, Redux Toolkit, RTK Query), each library introduced only after the plain React code it replaces, plus an unnumbered wrap-up (final structure, mental-model table, architecture note, Resources).
- Beginner asides from `Redux-Toolkit-Questions.md` woven into the relevant steps (slice/action/reducer, `createSlice`/`createApi` generated objects, `() => ({})`, conditional spread, computed keys, middleware/`concat`, `useSelector`/`useDispatch`).
- Step 17 covers the real `setInterval` debounce bug that reset pagination to page 1.
- Repo (github.com/lpdecastro/redux-demo.liandrejohn.com) and live demo (redux-demo.liandrejohn.com) linked in header CTAs, intro, and Resources.
- One WebP screenshot (two widths) from the repo's `docs/screenshot.png`.
- SEO: title ≤ 60 chars, meta description, canonical, OG/Twitter, JSON-LD (`BlogPosting` + `Person` + `Blog` + `BreadcrumbList`) with `keywords`, `articleSection` "Frontend engineering", computed `wordCount`/`timeRequired`.
- Analytics: `data-article-id`, existing `cta_click`/`toc_click`/`nav_click`/`social_click` attributes, `data-analytics-image-name` on the screenshot; no new event names.
- Wired into `vite.config.mjs`, `blog/index.html` (card + JSON-LD), `public/sitemap.xml`, `public/llms.txt`.
- `npm run build` and `npm run preview` pass; page renders at mobile and desktop with no horizontal scroll.

## Notes

- Sources: JS track only of `context/blogs/react-redux/React-Project-Practice.md` (line ~1012 onward) — ignore the TypeScript half.
- The repo is the source of truth for code: `filterSlice.js` (not `filtersSlice.js`), React `^19.2.x` (not "19.3"), 300ms debounce, single quotes, `const App = () => {}`. Final-state files must match the repo exactly.
- **Resolved:** repo `App.jsx` still has redundant `dispatch(setPage(1))` in the search `onChange` — kept verbatim in Step 16 and called out as redundant in Step 17 (repo left unchanged).
- Confirm `docs/screenshot.png` shows the final AntD version before using it.
- Verify all Resources URLs; strip `?utm_source=chatgpt.com`.
- "Frontend engineering" is a new category — check `blog/index.html` handles it.
- Code blocks: plain `<pre><code>` with existing `tok-*` classes only; no highlighting library or new token classes.
- Out of scope: concept-builds card, TypeScript version, OG image, embedded demo, cross-links.

## History

- Blog post: Unboxed Part 1 ("Why") — published `blog/why-i-built-unboxed.html` (intro + 4 sections + 2 screenshots), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-15.
- Blog post: Unboxed Part 2 ("How") — published `blog/how-i-built-unboxed.html` (intro + 5 sections, mobile screenshot converted JPEG→WebP, six-step workflow + verbatim log excerpts as styled code blocks), wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`; retrofitted Part 1's two "that's Part 2" mentions into real cross-links. Merged 2026-09-15.
- Navbar: added icon-only GitHub link (github.com/lpdecastro) next to "Blog", before the "Get in Touch" CTA, across `index.html`, `blog/index.html`, and all four `blog/*.html` posts. Reused the existing inline GitHub SVG and `social_click` analytics convention. Merged 2026-09-15.
- Concept Builds: added Unboxed (unboxed.liandrejohn.com) as the first card in the `#concept-builds` strip, pushing Altamira/Handa/Sereva/Stillward to positions 2–5. Live hero screenshot captured and optimized to WebP (`public/images/concept-unboxed.webp`), `View Site` + `View Code` CTAs, wired into the JSON-LD `ItemList` and `public/llms.txt`; section lead copy updated for five sites. Merged 2026-09-15.
- Tooling: filled in `.claude/skills/blog/SKILL.md`, which had been scaffolded empty since the Unboxed Part 1 commit. Documents the full post-publish checklist (head/JSON-LD/analytics conventions, image optimization, the four wiring points — `vite.config.mjs`, `blog/index.html`, `sitemap.xml`, `llms.txt`) plus a `crosslink` action, derived from how the four existing posts were actually built. Merged 2026-09-16.
- Blog post: "How I Built a CRO Copywriting Workflow in Claude Code" — published `blog/how-i-built-a-cro-copywriting-workflow-in-claude-code.html` from `context/blogs/claude-code-cro-workflow.md` (13 numbered sections including Conclusion/Resources, 6 diagram-as-code `<pre><code>` blocks reusing existing `tok-*` classes, no images, no cross-post links), category "AI-assisted engineering". Wired into `vite.config.mjs`, `blog/index.html`, `public/sitemap.xml`, and `public/llms.txt`. Merged 2026-09-16.
