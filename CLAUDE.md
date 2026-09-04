# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single static page: the personal portfolio for liandrejohn.com.

## Main Goal

Act as an expert AWS DevOps engineer and static-site performance specialist. Help me deploy my portfolio website to AWS using a simple, clean, production-grade setup. Assume I am comfortable with development but still learning AWS infrastructure and DevOps, so explain important AWS decisions clearly and guide me step-by-step through anything I need to configure manually in the AWS Console. Do not introduce Terraform, CDK, or other Infrastructure as Code for now.

My existing infrastructure is already mostly set up: a GitHub repository, GitHub Actions, an S3 bucket, CloudFront, Route 53, ACM, and GitHub Actions authentication to AWS using IAM OIDC with an IAM role and policy. My GitHub repository variables are `AWS_REGION=ap-southeast-1`, `AWS_ROLE_ARN=arn:aws:iam::891022338050:role/GitHubDeployRole`, and `S3_BUCKET=liandrejohn.com`. Do not require a `CLOUDFRONT_DISTRIBUTION_ID` or automatically invalidate the CloudFront distribution after every deployment because I want to avoid unnecessary invalidations and keep the deployment simple and cost-conscious. Instead, design caching and asset versioning so new deployments propagate correctly without depending on routine CloudFront invalidations.

Create or improve a clean GitHub Actions CI/CD workflow that builds the website, produces an optimized production bundle, and deploys only the final build output to S3. I am open to a lightweight build tool such as Vite or another simple option if it provides meaningful benefits, but avoid unnecessary complexity. Optimize the deployment for production performance: minify HTML, CSS, and JavaScript; optimize static assets where practical; use hashed/versioned filenames for CSS, JavaScript, images, and other long-lived assets where the build tool supports it; and avoid uploading development files, source files, dependencies, configuration files, or anything unnecessary to S3. Recommend sensible S3 and CloudFront `Cache-Control` behavior, such as long-lived immutable caching for fingerprinted assets while keeping HTML short-lived or revalidated so website updates become visible without CloudFront invalidations. Keep the CI/CD workflow easy to understand, maintain, and troubleshoot.

The canonical production domain must be `https://liandrejohn.com/`. Treat this as the single source of truth for SEO. `https://www.liandrejohn.com` or `https://www.liandrejohn.com/` must permanently redirect to the equivalent URL on `https://liandrejohn.com/`, preserving the path and query string where appropriate. Because I already have CloudFront, Route 53, and ACM, prefer the simplest robust production-grade AWS approach rather than adding another server or unnecessary service. Prefer implementing the `www` → non-`www` redirect at the CloudFront edge using a lightweight CloudFront Function on the viewer-request event when appropriate. Guide me step-by-step through creating the function, attaching it to the correct CloudFront behavior, making sure the CloudFront distribution accepts both `liandrejohn.com` and `www.liandrejohn.com` as alternate domain names, ensuring the ACM certificate covers both hostnames, and configuring Route 53 alias records correctly. The redirect should use an SEO-safe permanent status such as `301`, preserve the requested pathname and query string, and avoid redirect loops. Explain any CloudFront configuration changes before asking me to make them.

Also make sure the website itself consistently uses `https://liandrejohn.com` for canonical URLs, Open Graph URLs, structured data URLs, sitemap URLs, internal absolute URLs where applicable, and other SEO-related references. There should be only one indexable version of each page. Check for duplicate-host issues involving HTTP vs HTTPS and `www` vs non-`www`, and recommend the simplest configuration that normalizes all public traffic to HTTPS on the non-`www` domain.

Work incrementally. First inspect or ask me for the relevant existing files such as `package.json`, the GitHub Actions workflow, build configuration, and current deployment structure before changing code. Reuse the AWS infrastructure I already have instead of rebuilding it. When AWS Console work is required, tell me the exact AWS service, menu, field, and value to use. Clearly distinguish between changes required in GitHub, the application repository, S3, CloudFront, Route 53, ACM, and IAM. Avoid unnecessary AWS services, unnecessary dependencies, overengineering, and premature infrastructure automation. The final result should be a fast static portfolio website with a minimal build process, clean GitHub Actions CI/CD, secure OIDC-based AWS deployment, efficient CloudFront caching, no routine cache invalidations, and a reliable `www.liandrejohn.com` → `liandrejohn.com` canonical redirect.


## Commands

```bash
npm install            # required before anything works
npm run build:css      # compile src/scss/main.scss -> assets/css/main.css (compressed, no sourcemap)
npm run watch:css      # same, in watch mode (also emits assets/css/main.css.map)
```
