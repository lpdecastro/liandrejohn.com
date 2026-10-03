# Blog Post: React → Redux Toolkit → RTK Query Tutorial Spec

## Task

Publish a beginner-friendly, step-by-step tutorial post, `blog/react-redux-toolkit-rtk-query-tutorial.html`, that builds a product browser progressively (static JSX → `useState` → fetch → Ant Design → Redux Toolkit → RTK Query) and links to the shipped repo and live demo.

## Source Content

- **Primary:** `context/blogs/react-redux/React-Project-Practice.md`, **JavaScript track only** — from line ~1012 ("redo this again… use .js only… latest react") through the end (Steps 1–20 + "What you should understand"). Ignore the earlier TypeScript track (lines 1–1011) entirely.
- **Secondary:** `context/blogs/react-redux/Redux-Toolkit-Questions.md` — my beginner questions while learning `createSlice`, the store, `useSelector`/`useDispatch`, `createApi`, and middleware. Use these as "beginner question" asides inside the relevant step, not as a separate FAQ section.
- **Source of truth for code:** the shipped repo, [github.com/lpdecastro/redux-demo.liandrejohn.com](https://github.com/lpdecastro/redux-demo.liandrejohn.com). Where the chat and the repo disagree, the repo wins:
  - Slice file is `src/features/filters/filterSlice.js` (not `filtersSlice.js`).
  - React is `^19.2.x` per `package.json` — don't repeat the chat's "React 19.3" claim. Other versions: Vite 8, `@reduxjs/toolkit` 2.x, `react-redux` 9.x, `antd` 6.x, Bootstrap 5.3.
  - Debounce delay is 300ms; final `App.jsx` includes the `Loading…` / `No products found.` empty states.
  - Code style: single quotes, `const App = () => {}` — normalize the chat's intermediate snippets to match so the post reads as one codebase.
- Live demo: [redux-demo.liandrejohn.com](https://redux-demo.liandrejohn.com/) (returns 200).

## Content Structure

Intro: why I built this (practicing for live-coding interviews), and the one rule — **build only what you need, when you need it; introduce a library only after showing the plain React code it replaces.** Include the progression diagram (`Static JSX → .map() → useState → useEffect + fetch → loading/error → debounce → sorting/pagination → Ant Design → Redux Toolkit → RTK Query`) as a `<pre><code>` block. Link the repo + live demo up front.

Numbered sections, grouped in the TOC by part. The folder structure grows only when a step needs it — say so when a new folder appears.

**Part 1 — Plain React**
1. **Scaffold the project** — `npm create vite@latest product-browser -- --template react`, add Bootstrap, trim `main.jsx`. No Redux/AntD installed yet.
2. **Static JSX first** — hardcoded table + search input + sort select; the "build the UI, confirm structure, then make it dynamic" interview reasoning.
3. **Array + `.map()`** — replace hardcoded rows.
4. **`useState` for search** — controlled input, local filter; explain `[value, setValue]` and re-render. Plant the seed: "Redux is basically another place to store state."
5. **Fetch from the API** — `useEffect` + `fetch` against DummyJSON with `loading`/`error` state and `response.ok` check (the error-handling pattern RTK Query later replaces).
6. **Server search + debounce** — two states (`searchInput` vs `search`), `setTimeout` + cleanup; the "one request instead of five" diagram.
7. **Sorting + pagination** — `sortBy`/`order`/`page`/`total`, `URLSearchParams`, Prev/Next buttons. End with the state inventory list ("this should start feeling annoying — that's intentional").

**Part 2 — Ant Design**
8. **Swap in Ant Design** — Bootstrap gives CSS classes, AntD gives React components; `Input`, `Select`, `Alert`, `Table` (built-in loading + pagination). Make clear AntD does not replace state, Redux, or the API.

**Part 3 — Redux Toolkit**
9. **Why Redux now** — the filter state describes app-level state; the `SearchBar/SortControls/ProductTable/Pagination` prop-passing problem; "`useState`, but outside the component." Install `@reduxjs/toolkit react-redux` (RTK Query ships inside `@reduxjs/toolkit`).
10. **The slice** — build `filterSlice.js` incrementally. Explain action, action creator, reducer, slice. Beginner asides from the questions doc: why "slice" (grouping), where `payload` comes from, where `"filters/setSearch"` comes from (`name` + reducer key), same reducer name in another slice, what `setSort({ sortBy, order })` generates, named vs default export. Show the "what `createSlice` generates" hand-written equivalent (from the repo's commented block) as a `<pre><code>` block.
11. **The store** — `configureStore`; "the store is basically a bunch of reducers"; how the store infers initial state from the slice; resulting state shape.
12. **Connect React** — `<Provider>` in `main.jsx`; `useSelector` (reads state via a selector callback) and `useDispatch` (sends action objects). Replace the four filter `useState`s; keep `searchInput` local and explain why not all state belongs in Redux. Include the step-by-step "what happens behind `dispatch(setSearch('iphone'))`" flow.

**Part 4 — RTK Query**
13. **Why RTK Query** — client state (filters) vs server state (products, loading, error, cache); before/after comparison.
14. **The API service** — build `src/services/productsApi.js` incrementally (`createApi`, `fetchBaseQuery`, `builder.query`, generated `useGetProductsQuery`). Beginner JS asides: `() => {}` vs `() => ({})`; `...(search && { q: search })` vs `q: search || undefined`. Show the "what `createApi` generates" conceptual object.
15. **Wire it into the store** — computed key `[productsApi.reducerPath]`; middleware as the place async/API work runs between dispatch and reducer; `getDefaultMiddleware().concat(...)` keeps the defaults.
16. **Delete the manual fetch** — remove `products/loading/error/total` state and the fetch effect; show final `App.jsx` **verbatim from the repo**.
17. **The bug I hit** — pagination jumping back to page 1: debounce written with `setInterval` re-dispatched `setSearch` every 300ms, and `setSearch` resets `page`. Fix: `setTimeout`. Also the "calling `setPage(1)` without `dispatch` does nothing" mistake. Frame it as a real debugging lesson in how reducers interact.

**Wrap-up (unnumbered, matching prior posts)**
- Final project structure tree.
- Mental-model table (`useState` / Redux Toolkit / RTK Query / Ant Design / Bootstrap → "think of it as") and the per-tool breakdown of which state lives where in this app.
- One short paragraph on the architecture name (unidirectional data flow; slice-based organization) and the "data → responsibilities → boundaries → connections" checklist.
- **Resources:** repo, live demo, and official docs (Redux Toolkit, RTK Query, React `useState`/`useEffect`, Ant Design, DummyJSON products API). Verify each URL resolves before publishing; drop the chat's `?utm_source=chatgpt.com` params.

## Code Blocks

- All code in `<pre><code>` blocks, plain selectable text, reusing the existing code-block styling and `tok-*` token classes from prior posts where they apply. No runtime syntax-highlighting library, no new token classes.
- Each step shows only the delta (what to add/replace) with a one-line "in `src/…`" label, except Step 16, which shows the full final `App.jsx`.
- Final-state files (`filterSlice.js`, `store.js`, `productsApi.js`, `main.jsx`, `App.jsx`) must match the repo exactly. Don't reproduce the repo's commented "generated object" blocks inside the final-file listings — they appear only as separate explanatory blocks in Steps 10 and 14.
- Open decision for implementation: the repo's final `App.jsx` still calls `dispatch(setPage(1))` in the search `onChange`, which the source chat calls redundant (`setSearch` already resets the page). Either remove it from the repo first, or keep it verbatim and note it's redundant in Step 17. Don't silently diverge from the repo.

## Images

- One screenshot of the finished app: source `docs/screenshot.png` from the repo. Confirm it shows the final AntD version, convert to WebP at two widths (e.g. `public/images/blog/redux-demo-product-browser-800w.webp` / `-1600w.webp`, following the Unboxed naming pattern), with explicit `width`/`height`, `loading="lazy"`, descriptive `alt`, and a `<figcaption>` linking the live demo. Place it in the intro or right after Step 16.
- No dedicated OG image — inherit the sitewide `/images/og-card-v2.jpg`.

## SEO

- `<title>` ≤ 60 chars, e.g. "From useState to Redux Toolkit & RTK Query, Step by Step". The H1 can be longer.
- Meta description ~150–160 chars naming React, Redux Toolkit, RTK Query, and "step-by-step beginner tutorial".
- Canonical `https://liandrejohn.com/blog/react-redux-toolkit-rtk-query-tutorial`; robots, OG and Twitter card meta per existing posts.
- JSON-LD `@graph`: `BlogPosting` + reused `Person` (`#person`) + `Blog` (`#blog`, post added to `blogPost`) + `BreadcrumbList`. Add `keywords` (React, Redux Toolkit, RTK Query, useState, Ant Design, Vite, JavaScript). `wordCount` and `timeRequired` computed from final copy.
- `articleSection` / eyebrow: **"Frontend engineering"** — a new category; the existing three (AI-assisted engineering, Side projects, Cloud & DevOps) don't fit a framework tutorial. Make sure `blog/index.html` handles a new category label without layout or filter breakage.
- Semantic heading order (one H1, H2 per numbered section, H3 for asides); descriptive link text for repo/live links (no "click here").

## Analytics

Follow the existing declarative `data-analytics-*` conventions in `src/js/analytics.js`; add no new event names or JS.

- `<body data-article-id="react-redux-toolkit-rtk-query-tutorial">` so `section_view`, `section_engaged`, and `scroll_depth` fire automatically. GA4 snippet with `content_group: 'blog'`.
- Article header CTAs: "Read the tutorial" (jump link), "View Site", "View Code" — each `data-analytics-event="cta_click"`, `data-analytics-section-name="blog_header"`, `data-analytics-button-name` = `read_the_article` / `view_site` / `view_code`. External links open in a new tab with `rel="noopener"`.
- TOC links (desktop and mobile) use `toc_click`; navbar/breadcrumb use `nav_click`; navbar GitHub icon uses `social_click` — copied from existing post chrome.
- In-body links to the repo, demo, and docs need no attributes; they fall through to `content_link_click`.
- The screenshot gets `data-analytics-image-name` so `image_view` reports a readable name.

## Build & Site Integration

- `vite.config.mjs`: new input entry, e.g. `blogReduxTutorialPost: resolve(__dirname, 'blog/react-redux-toolkit-rtk-query-tutorial.html')`.
- `blog/index.html`: new card at the top of the list (newest-first) and an entry in the index `Blog` JSON-LD `blogPost` array.
- `public/sitemap.xml`: new `<url>` with `<lastmod>` = publish date.
- `public/llms.txt`: new `## Blog` entry above the current newest, one-paragraph summary, mentioning the repo and live demo.

## Out of Scope

- Adding the redux demo as a card in `#concept-builds` on `index.html`.
- The TypeScript version of the tutorial (first half of the practice doc).
- Changes to the redux-demo repo itself, unless the `dispatch(setPage(1))` decision above calls for it.
- Dedicated OG image, embedded live demo/iframe, or interactive code sandboxes.
- Cross-links to other posts (none relate to this topic).

## Acceptance Criteria

- [ ] `blog/react-redux-toolkit-rtk-query-tutorial.html` exists and matches existing posts' head, hero, TOC (desktop sticky + mobile `<details>`), section, and structured-data conventions.
- [ ] Content comes only from the JavaScript track of `React-Project-Practice.md` plus beginner asides from `Redux-Toolkit-Questions.md`; no TypeScript snippets.
- [ ] The post builds the app progressively across 17 numbered steps in four parts, and each library is introduced only after the plain React code it replaces.
- [ ] Final-state code blocks match the repo files exactly; `filterSlice.js` naming and actual dependency versions are used; no "React 19.3" claim.
- [ ] The `dispatch(setPage(1))` discrepancy is resolved one of the two ways above, not silently changed.
- [ ] Step 17 covers the `setInterval` pagination bug and its fix.
- [ ] Repo and live demo are linked in the header CTAs, intro, and Resources; all Resources URLs are verified and stripped of `utm_source` params.
- [ ] Screenshot is optimized to WebP at two widths with alt text, dimensions, lazy loading, and `data-analytics-image-name`.
- [ ] SEO: title ≤ 60 chars, meta description, canonical, OG/Twitter, JSON-LD with `keywords`, `articleSection` "Frontend engineering", and `wordCount`/`timeRequired` computed from the final copy.
- [ ] Analytics: `data-article-id` set; CTAs, TOC, nav, and social links carry the existing `data-analytics-*` attributes; no new event names.
- [ ] `vite.config.mjs`, `blog/index.html` (card + JSON-LD), `public/sitemap.xml`, and `public/llms.txt` are updated.
- [ ] `npm run build` and `npm run preview` succeed; the page renders at mobile and desktop widths with no horizontal scroll from code blocks; breadcrumb, TOC, and CTAs work.
