// Centralized GA4 event tracking. Loaded after Bootstrap and before main.js
// (which calls window.trackEvent for the contact-form events) — see
// index.html. gtag.js itself is loaded from index.html's <head>; this file
// only defines the reusable helper, the declarative [data-analytics-event]
// click wiring, and the section view/engagement observers.
//
// No PII (name, email address, message text) is ever sent as an event
// parameter — see local/analytics-measurement-plan.md for the full event
// catalogue, parameter dictionary, and the reasoning behind each threshold.

// Wraps gtag('event', ...) and no-ops quietly if gtag never loaded (e.g. an
// ad blocker stripped the googletagmanager.com <script>), so callers never
// need to guard for it themselves.
//
// Every custom event is stamped with page_type (from <body data-page>:
// "portfolio" / "blog") unless the caller set it explicitly, so blog and
// portfolio traffic can be told apart in Explorations without relying on
// content_group alone. content_group itself is set per page in the gtag
// config snippet in each page's <head>.
window.trackEvent = function trackEvent(name, params = {}) {
  if (typeof window.gtag !== 'function') return;
  const pageType = document.body && document.body.dataset.page;
  const enriched =
    pageType && !('page_type' in params) ? { page_type: pageType, ...params } : params;
  window.gtag('event', name, enriched);
};

// Turns a clicked element's data-analytics-* attributes into GA4 event
// parameters: data-analytics-section-name -> { section_name: ... },
// data-analytics-project-type -> { project_type: ... }, etc. link_text and
// destination are inferred from the element itself when not set explicitly,
// so most tracked links only need data-analytics-event plus whichever
// fixed-vocabulary params apply (section_name, project_name, link_type, ...).
function paramsFromDataset(el) {
  const params = {};

  for (const [key, value] of Object.entries(el.dataset)) {
    if (key === 'analyticsEvent' || !key.startsWith('analytics')) continue;
    const paramName = key
      .slice('analytics'.length)
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '');
    params[paramName] = value;
  }

  if (!params.link_text) {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    if (text) params.link_text = text;
  }

  // mailto: links skip destination — contact_method already identifies the
  // channel, and a mailto: URL's "hostname" isn't meaningful.
  if (!params.destination) {
    const href = el.getAttribute('href');
    if (href && !href.startsWith('mailto:')) {
      if (href.startsWith('#')) {
        params.destination = href.slice(1).replace(/-/g, '_');
      } else {
        try {
          params.destination = new URL(href, window.location.href).hostname;
        } catch {
          // Not a parseable URL — leave destination unset rather than guess.
        }
      }
    }
  }

  return params;
}

// liandrejohn.com's own origins — links to these count as same-site even
// when written as an absolute https:// URL (the Results figcaption does this).
const INTERNAL_HOSTS = new Set(['liandrejohn.com', 'www.liandrejohn.com']);

// Fallback for in-article links the markup doesn't tag individually: prose
// and figcaption links inside <main id="content">. link_scope splits them
// into anchor / internal / external / exit_to_portfolio so one filter
// (link_scope = exit_to_portfolio) answers "did the article push readers
// into the portfolio". section_name comes from the nearest ancestor
// <section id>.
function contentLinkParams(link) {
  const params = {};

  const text = link.textContent.replace(/\s+/g, ' ').trim();
  if (text) params.link_text = text;

  const section = link.closest('section[id]');
  if (section) params.section_name = section.id.replace(/-/g, '_');

  const href = link.getAttribute('href') || '';

  if (href.startsWith('#')) {
    params.link_scope = 'anchor';
    params.destination = href.slice(1).replace(/-/g, '_');
    return params;
  }

  let url;
  try {
    url = new URL(href, window.location.href);
  } catch {
    params.link_scope = 'internal';
    return params;
  }

  const sameSite =
    url.origin === window.location.origin || INTERNAL_HOSTS.has(url.hostname);

  if (!sameSite) {
    params.link_scope = 'external';
    params.destination = url.hostname;
    return params;
  }

  // Same-site: anything outside /blog is the portfolio.
  params.link_scope = url.pathname.startsWith('/blog') ? 'internal' : 'exit_to_portfolio';
  params.destination = url.pathname + url.hash.replace(/-/g, '_');
  return params;
}

// One delegated listener covers every current [data-analytics-event]
// element — no per-element listeners to attach or double-bind. Un-tagged
// links inside the article body fall through to content_link_click.
document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-analytics-event]');
  if (el) {
    window.trackEvent(el.dataset.analyticsEvent, paramsFromDataset(el));
    return;
  }

  const link = event.target.closest('#content a[href]');
  if (link) {
    window.trackEvent('content_link_click', contentLinkParams(link));
  }
});

// Section reach + attention. section_view fires once a section is
// meaningfully on screen (>=50% visible, or fills >=75% of the viewport for
// sections taller than it — 50% is otherwise unreachable for those).
// section_engaged fires once that condition holds for 4 continuous seconds:
// long enough to take in a heading and lead paragraph, short enough that a
// genuine skim still counts. Both fire at most once per section per page
// load, entirely off intersection + a timer — never on scroll events.
//
// The observed-section list is per page, keyed off <body data-page>. A page
// with no recognised data-page is not instrumented here — this is what keeps
// blog loads out of the homepage section funnel (they used to still emit a
// hard-coded `hero` section_view on every page).
(function observeSections() {
  if (!('IntersectionObserver' in window)) return;

  const PAGE_SECTIONS = {
    portfolio: [
      ['what-i-do', 'what_i_do'],
      ['featured-work', 'featured_work'],
      ['concept-builds', 'concept_builds'],
      ['how-i-work', 'how_i_work'],
      ['get-in-touch', 'get_in_touch'],
    ],
    // Article sections + the 3.1–3.4 subsections, in document order.
    // section_engaged ÷ section_view per section = attention / drop-off point.
    blog: [
      ['1-what-i-built', '1_what_i_built'],
      ['2-tech-stack', '2_tech_stack'],
      ['3-claude-code', '3_claude_code'],
      ['3-1-claude-md', '3_1_claude_md'],
      ['3-2-context-files', '3_2_context_files'],
      ['3-3-fresh-sessions', '3_3_fresh_sessions'],
      ['3-4-review-artifacts', '3_4_review_artifacts'],
      ['4-results', '4_results'],
      ['5-conclusion', '5_conclusion'],
      ['6-resources', '6_resources'],
    ],
  };

  const page = document.body.dataset.page;
  const sections = PAGE_SECTIONS[page];
  if (!sections) return;

  const ENGAGED_MS = 4000;
  // page_type is stamped on every event by trackEvent() itself.

  sections.forEach(([id, sectionName]) => {
    const el = document.getElementById(id);
    if (!el) return;

    let viewFired = false;
    let engagedFired = false;
    let timer = null;

    const qualifies = (entry) => {
      if (entry.intersectionRatio >= 0.5) return true;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return entry.intersectionRect.height >= viewportHeight * 0.75;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const qualified = entry.isIntersecting && qualifies(entry);

        if (qualified && !viewFired) {
          viewFired = true;
          window.trackEvent('section_view', { section_name: sectionName, engagement_type: 'view' });
        }

        if (qualified && !engagedFired && !timer) {
          timer = setTimeout(() => {
            timer = null;
            engagedFired = true;
            window.trackEvent('section_engaged', { section_name: sectionName, engagement_type: 'engaged' });
            if (viewFired) observer.disconnect();
          }, ENGAGED_MS);
        } else if (!qualified && timer) {
          clearTimeout(timer);
          timer = null;
        }
      },
      { threshold: [0, 0.5] }
    );

    observer.observe(el);
  });

  // Hero (#top) is the homepage landing view — always seen, no observer
  // needed. Blog pages measure reach via observeReadDepth() instead.
  if (page === 'portfolio') {
    window.trackEvent('section_view', { section_name: 'hero', engagement_type: 'view' });
  }
})();

// Article read-through: start -> depth -> completion. Only runs on a single
// article page (<body data-article-id>), never the blog index.
//
// GA4 Enhanced Measurement only gives one 90% `scroll` for the whole
// document; scroll_depth scopes progress to the article column and reports
// it as discrete milestones. Four zero-size sentinels are dropped down <main
// id="content"> and an IntersectionObserver reports the deepest one reached,
// once each — no scroll handler. `article_start` is section 1 entering view
// (the first funnel step); `article_complete` is the end-of-article block
// coming into view. Read depth is deliberately not tracked on the
// fixed-height homepage (measurement plan §3 / §15).
(function observeReadDepth() {
  if (!('IntersectionObserver' in window)) return;

  const articleId = document.body.dataset.articleId;
  if (!articleId) return;

  const main = document.getElementById('content');
  if (!main) return;

  const withCtx = (extra) => Object.assign({ article_id: articleId }, extra);

  // fireOnce(id, event, params): the first time #id enters view, send `event`
  // and stop watching. Used for the start and completion funnel steps.
  const fireOnce = (id, name, extra) => {
    const target = document.getElementById(id);
    if (!target) return;
    let fired = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired) return;
        fired = true;
        obs.disconnect();
        window.trackEvent(name, withCtx(extra));
      },
      { threshold: 0.1 }
    );
    obs.observe(target);
  };

  // article_start: section 1 enters view — the first read-through funnel step.
  const articleSection = document.body.dataset.articleSection;
  fireOnce(
    '1-what-i-built',
    'article_start',
    articleSection ? { article_section: articleSection } : {}
  );

  // article_complete: the end-of-article block enters view.
  fireOnce('article-end', 'article_complete', {});

  if (getComputedStyle(main).position === 'static') {
    main.style.position = 'relative';
  }

  const firedDepths = new Set();
  const depthObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      depthObserver.unobserve(entry.target);
      const percent = Number(entry.target.dataset.depth);
      if (firedDepths.has(percent)) continue;
      firedDepths.add(percent);
      window.trackEvent('scroll_depth', withCtx({ percent }));
    }
  });

  [25, 50, 75, 100].forEach((percent) => {
    const mark = document.createElement('div');
    mark.dataset.depth = String(percent);
    mark.setAttribute('aria-hidden', 'true');
    mark.style.cssText =
      'position:absolute;left:0;width:1px;height:1px;visibility:hidden;pointer-events:none;';
    mark.style.top = percent + '%';
    main.appendChild(mark);
    depthObserver.observe(mark);
  });
})();
