# Bootstrap + Sass Portfolio Conversion

This is a Bootstrap/Sass rebuild of the supplied single-page portfolio.

## Constraints followed

- The HTML uses Bootstrap components and utility classes only.
- No project-specific/custom CSS class names were added.
- `src/scss/main.scss` customizes Bootstrap through Sass variables, then imports Bootstrap.
- Navbar collapse and project carousels use Bootstrap JavaScript.
- A small custom JavaScript file remains only for the static contact form's `mailto:` composer because Bootstrap does not provide that behavior.

## Versions

- Bootstrap: 5.3.8
- Dart Sass: 1.103.1

## Files

- `index.html` — converted page; uses Bootstrap 5.3.8 CDN so it opens immediately
- `src/scss/main.scss` — Bootstrap Sass variable overrides
- `assets/css/theme-preview.css` — direct-open preview fallback that mirrors the Sass values and only targets Bootstrap/root selectors
- `assets/js/main.js` — contact form mailto behavior only
- `package.json` — local Sass build dependencies/scripts

## Compile the real Sass build locally

```bash
npm install
npm run build:css
```

Then replace these two stylesheet lines in `index.html`:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" ...>
<link rel="stylesheet" href="assets/css/theme-preview.css">
```

with:

```html
<link rel="stylesheet" href="assets/css/main.css">
```

For development:

```bash
npm run watch:css
```
