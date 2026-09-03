# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single static page: the personal portfolio for liandrejohn.com. There is no framework and, on the `feature/redesign` branch, no bundler. `index.html` at the repo root is the deployed artifact.

## Main Goal

Convert the `local/original-portfolio.html` to Bootstrap and Sass while keeping the design as close as possible. Improve the current design.

## Commands

```bash
npm install            # required before anything works
npm run build:css      # compile src/scss/main.scss -> assets/css/main.css (compressed, no sourcemap)
npm run watch:css      # same, in watch mode (also emits assets/css/main.css.map)
```

There are no tests and no linter.

To preview, serve the repo root with any static server (e.g. `python3 -m http.server`) and open `index.html`. Opening the file directly with `file://` breaks the Google Fonts preconnect and relative asset paths less reliably, so prefer a server.

Only `src/scss/main.scss`, `index.html`, `assets/js/main.js`, and the images under `assets/images/` are tracked. `git ls-files` is the fastest way to see what's real vs. generated/vendored.

## Styling model — the core constraint

The HTML must use **Bootstrap 5.3 components and utility classes only**. Do not introduce project-specific CSS class names or a separate stylesheet. (The one vendored third-party stylesheet is Bootstrap Icons — see "Icons" below.)

All visual customization happens in `src/scss/main.scss`: set Sass variables (`$primary`, `$border-radius`, `$spacers`, `$display-font-sizes`, carousel/navbar/form vars, …) _before_ the `@import 'bootstrap/scss/bootstrap'` line, then rebuild. The Sass loads Bootstrap from `node_modules` via `--load-path=node_modules`.

The typeface is **Inter** (Google Fonts, loaded in `<head>`), wired through `$font-family-sans-serif`. The palette lives in one block of seven Sass variables at the top of `main.scss` (`$primary`, `$secondary`, `$dark`, `$light`, `$border-subtle`, `$border-hover`, `$accent-soft`) — reskin by editing those.

Two utilities are added through Bootstrap's `$utilities` API (not hand-written selectors): `.w-rule` (2rem fixed width for the eyebrow accent bar) and `.mw-prose` (`max-width: 40rem` — caps section title + deck at the 640px measure).

Hand-written selectors after the `@import` are kept to a minimum and only where Bootstrap has no equivalent. Existing ones: `.tracking-wide`, `h2` / `.h2` (fluid `clamp()` section-title size — overrides Bootstrap's RFS step-scaling), `.hero-image`, `.bg-hero` (the `#top` radial-glow backdrop — stops derived from `$primary` / `$dark`), the `#what-i-do .card` hover system (lift + wash + `[data-icon-tile]` flip — no Bootstrap card hover state or fixed-square sizing), and the `#projectStripDesktop` / `#projectStripDots` rules (see JavaScript below). Match that pattern if a genuinely missing utility is unavoidable; otherwise compose existing utilities.

## Icons

Icons are **Bootstrap Icons** (`bootstrap-icons`, pinned in `package.json`), used as the web font: `index.html` links `node_modules/bootstrap-icons/font/bootstrap-icons.min.css` in `<head>`, vendored from `node_modules` the same way the Bootstrap JS bundle is. Markup is `<i class="bi bi-<name>" aria-hidden="true"></i>` — decorative only, always `aria-hidden` (every icon sits next to a text label or on an `aria-label`led control). Size with `fs-*` utilities, color with `text-*` (the font is `currentColor`). No inline `<svg>` icons, no emoji/Unicode glyphs. The mobile carousel and desktop strip duplicate the six project-category icons — change both.

## JavaScript

- Bootstrap's bundle drives the navbar collapse and the mobile project carousel declaratively via `data-bs-*` attributes — no custom JS for those.
- **Exception (approved):** the desktop projects list is `#projectStripDesktop`, a CSS scroll-snap strip (not a Bootstrap carousel). `assets/js/main.js` wires its `[data-strip-scroll]` prev/next buttons to scroll one card at a time and populates the `#projectStripDots` position indicators (one per snap stop, count derived from how many cards fit); `src/scss/main.scss` holds the scroll-snap, `flex: 0 0 30%` card sizing, and dot styling (no Bootstrap utility for any of it).
- The same six projects appear in **two** places: `#projectStripDesktop` (shown `d-none d-lg-block`) and the `#projectCarouselMobile` carousel (shown `d-lg-none`). Any change to a project must be made in both.
- `assets/js/main.js` holds three small bespoke behaviors: the `#contactForm` submit → prefilled `mailto:` to liandrejohn88@gmail.com, the `#backToTop` show/hide on scroll past the hero, and the `#projectStripDesktop` scroll buttons above.

Page sections are anchor-linked by id: `#what-i-do`, `#projects`, `#how-i-work`, `#contact` (plus `#top`).
