# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single static page: the personal portfolio for liandrejohn.com.

## Main Goal

Act as an expert technical SEO strategist, web analytics specialist, and personal-brand growth strategist.

The portfolio website content is already complete. Your job is now to optimize the site for **SEO, discoverability, analytics, and measurable recruiter conversion** without unnecessarily changing the existing content, visual design, or user experience.

The website is a single-page MVP for **Liandre John de Castro**, a software developer and tech lead. The primary audience is **technical recruiters**, followed by potential freelance clients and my LinkedIn network. The main conversion goals are for visitors to:

- Contact me through the portfolio contact form
- Message me on LinkedIn
- Email me directly
- Ask for my resume
- Explore my projects and professional experience

Use `local/resume.md` as the source of truth for factual information about my professional experience, skills, achievements, technologies, and credentials. Do not invent experience, metrics, job titles, clients, technologies, or accomplishments.

Optimize the website for relevant search intent around my **name, software engineering experience, technical leadership, backend development, Java/Spring expertise, cloud/platform engineering, and other skills supported by my resume and portfolio content**. Prioritize natural, useful content over keyword stuffing.

Review and improve all important technical SEO elements, including page title, meta description, canonical URL, heading hierarchy, semantic HTML, crawlability, indexability, robots.txt, sitemap.xml, Open Graph metadata, social sharing metadata, image alt text, internal linking, URL structure, performance/Core Web Vitals, mobile usability, accessibility where it affects search quality, and structured data using appropriate Schema.org types such as `Person`, `WebSite`, and relevant project/work entities.

Implement analytics using **Google Analytics 4 and Google Search Console** where applicable. Track meaningful user actions rather than unnecessary events. At minimum, consider tracking contact-form submissions, contact-form starts, LinkedIn clicks, email clicks, resume clicks/downloads, project-detail clicks, project external-site clicks, navigation interactions, and other high-intent recruiter actions. Use clear, consistent GA4 event names and useful parameters.

Define the most important conversions so I can measure whether the portfolio is actually generating recruiter interest. Recommend which GA4 events should be marked as key events/conversions and explain how I can evaluate performance using metrics such as organic search traffic, recruiter-intent interactions, project engagement, contact conversions, Search Console queries, impressions, clicks, CTR, and ranking positions.

When making recommendations, prioritize them by **expected SEO or conversion impact**. Avoid adding SEO features merely for completeness if they provide little practical value. Keep the implementation simple, maintainable, fast, and appropriate for a personal portfolio MVP.

When modifying code, preserve the existing design and content unless a change is genuinely necessary for SEO, accessibility, performance, analytics, or conversion tracking. Explain significant changes briefly and clearly.

## Positioning

Lead with this identity everywhere it fits (hero, nav eyebrow, meta, section framing):

- **Tech Lead • Enterprise Digital Platforms**

When surfacing technical depth, prioritize these four technologies as the headline stack. Mention others from `local/resume.md` only as supporting detail:

- **Java** — backend systems, services, and integrations
- **Next.js** — front-end and web application delivery
- **AWS** — cloud architecture and serverless platforms
- **Magnolia CMS** — enterprise CMS platform work

Never use the word "headless" anywhere in the portfolio content or in proposed copy options.

Also highlight **AI engineering** as a differentiator that complements (not replaces) the headline stack above — pair it with full-stack framing (Java + Next.js already spans backend and frontend) rather than positioning AI as a separate specialty. Position it as a modern force multiplier on delivery speed, quality, and leadership—not as a buzzword. Cover:

- **AI-assisted development** — shipping production work with tools like Claude Code, ChatGPT, and Gemini
- **Prompt and context engineering** — designing effective prompts, context, and workflows to get reliable results from LLMs
- **Agentic AI & MCP (Model Context Protocol)** — working with agentic workflows and MCP-based tooling as part of the delivery toolkit
- **Applying AI in real engineering work** — using these tools to accelerate delivery, raise code quality, and support technical decision-making across a team, plus the GEO (Generative Engine Optimization) work that turned AI answer engines into a real referral-traffic channel

Keep all AI-engineering claims consistent with `local/resume.md`; do not invent specific tools, projects, metrics, or seniority/expertise levels ("expert," "years of experience," etc.) that it does not support. Confident framing, prioritization, and emphasis are fair game for differentiation — fabricated claims are not, since they put the person's credibility at risk with recruiters who verify.

## Commands

```bash
npm install            # required before anything works
npm run build:css      # compile src/scss/main.scss -> assets/css/main.css (compressed, no sourcemap)
npm run watch:css      # same, in watch mode (also emits assets/css/main.css.map)
```
