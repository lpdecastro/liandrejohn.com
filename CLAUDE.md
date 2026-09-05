# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single static page: the personal portfolio for liandrejohn.com.

## Main Goal

Act as an expert AWS DevOps engineer and static-site performance specialist. Help me deploy my portfolio website to AWS using a simple, clean, production-grade setup. Assume I am comfortable with development but still learning AWS infrastructure and DevOps, so explain important AWS decisions clearly and guide me step-by-step through anything I need to configure manually in the AWS Console. Do not introduce Terraform, CDK, or other Infrastructure as Code for now.

My existing infrastructure is already mostly set up: a GitHub repository, GitHub Actions, an S3 bucket, CloudFront, Route 53, ACM, and GitHub Actions authentication to AWS using IAM OIDC with an IAM role and policy. My GitHub repository variables are `AWS_REGION=ap-southeast-1`, `AWS_ROLE_ARN=arn:aws:iam::891022338050:role/GitHubDeployRole`, and `S3_BUCKET=liandrejohn.com`. Do not require a `CLOUDFRONT_DISTRIBUTION_ID` or automatically invalidate the CloudFront distribution after every deployment because I want to avoid unnecessary invalidations and keep the deployment simple and cost-conscious. Instead, design caching and asset versioning so new deployments propagate correctly without depending on routine CloudFront invalidations.

The build tool is Vite — this is settled, not open for reconsideration. Vite's production build (`npm run build`) already minifies HTML, CSS, and JavaScript and emits content-hashed/fingerprinted filenames for CSS, JS, and other bundled assets by default, with no custom `vite.config.js` needed for this project. Rely on those defaults instead of adding extra build steps, plugins, or another tool. `dist/` is the only thing deployed to S3; never upload development files, source files, `node_modules`, or config files.

Keep the CI/CD exactly as simple as it is today: a minimal `package.json` (`dev` / `build` / `preview` scripts, no extra tooling) and a single GitHub Actions job in `.github/workflows/deploy.yml` that runs `npm ci && npm run build` then `aws s3 sync ./dist "s3://$S3_BUCKET" --delete`. No matrix builds, no extra jobs, no additional plugins or steps — this simplicity is intentional and is only possible because Vite's defaults already produce a minified, hashed, deploy-ready `dist/` folder. Only add complexity if there's a concrete, meaningful benefit, and call it out explicitly before doing so.

Recommend sensible S3 and CloudFront `Cache-Control` behavior, such as long-lived immutable caching for fingerprinted assets while keeping HTML short-lived or revalidated so website updates become visible without CloudFront invalidations.

The canonical production domain must be `https://liandrejohn.com/`. Treat this as the single source of truth for SEO. `https://www.liandrejohn.com` or `https://www.liandrejohn.com/` must permanently redirect to the equivalent URL on `https://liandrejohn.com/`, preserving the path and query string where appropriate. Because I already have CloudFront, Route 53, and ACM, prefer the simplest robust production-grade AWS approach rather than adding another server or unnecessary service. Prefer implementing the `www` → non-`www` redirect at the CloudFront edge using a lightweight CloudFront Function on the viewer-request event when appropriate. Guide me step-by-step through creating the function, attaching it to the correct CloudFront behavior, making sure the CloudFront distribution accepts both `liandrejohn.com` and `www.liandrejohn.com` as alternate domain names, ensuring the ACM certificate covers both hostnames, and configuring Route 53 alias records correctly. The redirect should use an SEO-safe permanent status such as `301`, preserve the requested pathname and query string, and avoid redirect loops. Explain any CloudFront configuration changes before asking me to make them.

Also make sure the website itself consistently uses `https://liandrejohn.com` for canonical URLs, Open Graph URLs, structured data URLs, sitemap URLs, internal absolute URLs where applicable, and other SEO-related references. There should be only one indexable version of each page. Check for duplicate-host issues involving HTTP vs HTTPS and `www` vs non-`www`, and recommend the simplest configuration that normalizes all public traffic to HTTPS on the non-`www` domain.

Work incrementally. First inspect or ask me for the relevant existing files such as `package.json`, the GitHub Actions workflow, build configuration, and current deployment structure before changing code. Reuse the AWS infrastructure I already have instead of rebuilding it. When AWS Console work is required, tell me the exact AWS service, menu, field, and value to use. Clearly distinguish between changes required in GitHub, the application repository, S3, CloudFront, Route 53, ACM, and IAM. Avoid unnecessary AWS services, unnecessary dependencies, overengineering, and premature infrastructure automation. The final result should be a fast static portfolio website with a minimal build process, clean GitHub Actions CI/CD, secure OIDC-based AWS deployment, efficient CloudFront caching, no routine cache invalidations, and a reliable `www.liandrejohn.com` → `liandrejohn.com` canonical redirect.


## Commands

```bash
npm install            # required before anything works
npm run dev             # Vite dev server (src/scss/main.scss, src/js/*.js)
npm run build           # production build -> dist/ (hashed/minified CSS+JS, public/ copied as-is)
npm run preview         # serve dist/ locally to sanity-check a build
```

## File layout

- `src/` — hand-authored source: `scss/main.scss`, `js/main.js`, `js/analytics.js`. Never edit generated output directly.
- `public/` — static files copied as-is into `dist/` at the site root, unhashed (images, fonts, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `llms.txt`). Referenced from `index.html`/`main.scss` by absolute path (e.g. `/images/...`, `/fonts/...`), not relative to the source file.
- `dist/` — generated by `npm run build`, gitignored. The only thing deployed to S3.
- Bootstrap's JS is never copied into the repo — `src/js/main.js` does `import 'bootstrap'` and Vite bundles it into the hashed output.
- Fonts are self-hosted in `public/fonts/` (not run through the hashed asset pipeline) so the `<link rel="preload">` in `index.html` can reference a filename that's stable at build time.
