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

The HTML must use **Bootstrap 5.3 components and utility classes only**. Do not introduce project-specific CSS class names or a separate stylesheet.

All visual customization happens in `src/scss/main.scss`: set Sass variables (`$primary`, `$border-radius`, `$spacers`, `$display-font-sizes`, carousel/navbar/form vars, …) _before_ the `@import 'bootstrap/scss/bootstrap'` line, then rebuild. The Sass loads Bootstrap from `node_modules` via `--load-path=node_modules`.

The only hand-written selector allowed is the one utility already in `main.scss` (`.tracking-normal`), added after the import because Bootstrap has no equivalent. Match that pattern if a genuinely missing utility is unavoidable; otherwise compose existing utilities.

## JavaScript

- Bootstrap's bundle drives the navbar collapse and both project carousels declaratively via `data-bs-*` attributes — no custom JS for those.
- There are **two** carousels holding the same projects: `#projectCarouselDesktop` (shown `d-none d-lg-block`) and `#projectCarouselMobile` (shown `d-lg-none`). Any change to a project must be made in both.
- `assets/js/main.js` exists solely to turn the `#contactForm` submit into a prefilled `mailto:` to liandrejohn88@gmail.com. It is the one piece of bespoke behavior.

Page sections are anchor-linked by id: `#what-i-do`, `#projects`, `#how-i-work`, `#contact` (plus `#top`).
