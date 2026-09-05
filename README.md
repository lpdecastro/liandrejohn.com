# Bootstrap + Sass Portfolio Conversion

This is a Bootstrap/Sass rebuild of the supplied single-page portfolio from `local/original-portfolio.html`.

## Constraints followed

- The HTML uses Bootstrap components and utility classes only.
- No project-specific/custom CSS class names were added.
- `src/scss/main.scss` customizes Bootstrap through Sass variables, then imports Bootstrap.
- Navbar collapse and scrollspy use Bootstrap JavaScript.
- A small custom JavaScript file remains only for the static contact form's `mailto:` composer because Bootstrap does not provide that behavior.

## Versions

- Bootstrap: 5.3.8
- Dart Sass: 1.103.1

## Files

- `index.html` — page markup; entry point for the Vite build
- `src/scss/main.scss` — Bootstrap Sass variable overrides
- `src/js/main.js` / `src/js/analytics.js` — site behavior and GA4 event tracking
- `public/` — static files copied as-is to the build output (images, fonts, robots.txt, sitemap.xml, site.webmanifest, llms.txt)
- `package.json` — build dependencies/scripts

## Build locally

```bash
npm install
npm run build      # outputs the production site to dist/
```

For development:

```bash
npm run dev         # starts the Vite dev server
npm run preview     # serves the dist/ build locally, to sanity-check a build
```
