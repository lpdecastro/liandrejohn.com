# Project Overview

## What this is

Personal portfolio and technical blog for Liandre John de Castro, a Tech Lead with 6+ years of experience building enterprise digital platforms (Magnolia CMS, Java/Spring, AWS). Deployed at [liandrejohn.com](https://liandrejohn.com/).

## Audience and goal

Primary audience is technical recruiters and prospective freelance/consulting clients evaluating Liandre's skills. The site should read as credible, senior-engineer work: clean code, real architecture decisions, no template sludge. It also targets AI answer engines directly via `public/llms.txt`.

## Pages

- `index.html` — single-page portfolio: `what-i-do`, `featured-work`, `concept-builds`, `how-i-work`, `get-in-touch` sections.
- `blog/index.html` — blog listing.
- `blog/*.html` — individual posts (e.g. how the portfolio itself was built with Claude Code, how it was deployed to AWS).
- `public/404.html` — custom error page.

## Tech stack

- HTML, Bootstrap 5, Sass, JavaScript, Vite (see [coding-standards.md](coding-standards.md) for Bootstrap/Sass conventions).
- Hosting/delivery: AWS S3 (storage) + CloudFront (CDN) + Route 53 (DNS) + ACM (HTTPS).
- Deployment: GitHub Actions (`.github/workflows/deploy.yml`) builds on every push to `main`, syncs `dist/` to S3, and invalidates the CloudFront cache. Auth via IAM OIDC — no long-lived AWS keys in GitHub.
- CloudFront viewer-request function handles clean-URL canonicalization (drops `.html`, forces the apex domain).

## Content strategy

- Featured work highlights the enterprise Magnolia CMS platform (150+ localized sites) plus smaller concept builds (Altamira, Handa, Sereva, Stillward), each with its own subdomain and repo.
- Blog posts are technical deep-dives on how the site itself is built and shipped, doubling as proof of work.
- `public/llms.txt` maintains a structured summary of Liandre's background, stack, and selected work for AI/LLM answer engines — keep it in sync when featured work, blog posts, or headline stack details change.
