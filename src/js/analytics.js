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
window.trackEvent = function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
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

// One delegated listener covers every current [data-analytics-event]
// element — no per-element listeners to attach or double-bind.
document.addEventListener('click', (event) => {
  const el = event.target.closest('[data-analytics-event]');
  if (!el) return;
  window.trackEvent(el.dataset.analyticsEvent, paramsFromDataset(el));
});

// Section reach + attention. section_view fires once a section is
// meaningfully on screen (>=50% visible, or fills >=75% of the viewport for
// sections taller than it — 50% is otherwise unreachable for those).
// section_engaged fires once that condition holds for 4 continuous seconds:
// long enough to take in a heading and lead paragraph, short enough that a
// genuine skim still counts. Both fire at most once per section per page
// load, entirely off intersection + a timer — never on scroll events.
(function observeSections() {
  if (!('IntersectionObserver' in window)) return;

  const SECTIONS = [
    ['what-i-do', 'what_i_do'],
    ['featured-work', 'featured_work'],
    ['concept-builds', 'concept_builds'],
    ['how-i-work', 'how_i_work'],
    ['get-in-touch', 'get_in_touch'],
  ];
  const ENGAGED_MS = 4000;

  SECTIONS.forEach(([id, sectionName]) => {
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

  // Hero (#top) is the landing view — always seen, no observer needed.
  window.trackEvent('section_view', { section_name: 'hero', engagement_type: 'view' });
})();
