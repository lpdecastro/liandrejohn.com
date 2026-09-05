// Bootstrap handles the navbar collapse and scrollspy. analytics.js defines
// window.trackEvent before any of the code below runs (import order = execution
// order for ES modules). This is the single entry point Vite bundles from
// index.html — see the <script type="module"> tag there.
import 'bootstrap';
import './analytics.js';

// This small handler preserves the original static-demo mailto behavior.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Concept builds strip: advance exactly one card (+ gap) per prev/next click,
// disable the buttons at either end, and keep the position dots in sync. CSS
// scroll-snap settles the final position. Same strip at every viewport — the
// card width (src/scss/main.scss) is what changes.
const projectStrip = document.getElementById('projectStrip');
const stripButtons = document.querySelectorAll('[data-strip-scroll]');
const stripDots = document.getElementById('projectStripDots');

// Honor the OS "reduce motion" setting for programmatic scrolls, the same way
// src/scss/main.scss gates scroll-behavior: smooth. Read live so a settings
// change mid-session is picked up.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

if (projectStrip && stripButtons.length) {
  const stripStep = () => {
    const card = projectStrip.querySelector('.card');
    if (!card) return projectStrip.clientWidth || 1;
    const gap = parseFloat(getComputedStyle(projectStrip).columnGap) || 0;
    return card.getBoundingClientRect().width + gap || 1;
  };

  // Number of distinct snap stops = cards that can't all fit on screen at once.
  const stopCount = () => {
    const step = stripStep();
    const visible = Math.max(1, Math.floor((projectStrip.clientWidth + 1) / step));
    const cards = projectStrip.querySelectorAll('.card').length;
    return Math.max(1, cards - visible + 1);
  };

  const activeStop = () => {
    const max = projectStrip.scrollWidth - projectStrip.clientWidth;
    if (projectStrip.scrollLeft >= max - 1) return stopCount() - 1;
    return Math.min(stopCount() - 1, Math.max(0, Math.round(projectStrip.scrollLeft / stripStep())));
  };

  const syncStrip = () => {
    const max = projectStrip.scrollWidth - projectStrip.clientWidth;
    stripButtons.forEach((btn) => {
      const isNext = btn.dataset.stripScroll === 'next';
      btn.disabled = isNext
        ? projectStrip.scrollLeft >= max - 1
        : projectStrip.scrollLeft <= 1;
    });

    if (!stripDots) return;
    const count = stopCount();
    if (stripDots.childElementCount !== count) {
      stripDots.replaceChildren();
      for (let i = 0; i < count; i += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to project group ${i + 1}`);
        dot.addEventListener('click', () => {
          projectStrip.scrollTo({ left: i * stripStep(), behavior: scrollBehavior() });
        });
        stripDots.append(dot);
      }
    }
    const active = activeStop();
    Array.from(stripDots.children).forEach((dot, i) => {
      if (i === active) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  stripButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const direction = btn.dataset.stripScroll === 'next' ? 1 : -1;
      projectStrip.scrollBy({ left: direction * stripStep(), behavior: scrollBehavior() });
    });
  });

  projectStrip.addEventListener('scroll', syncStrip, { passive: true });
  window.addEventListener('resize', syncStrip);
  syncStrip();
}

// Show the floating back-to-top button only once the hero (above the fold) is
// scrolled past, and hide it again when the footer (which has its own "Back to
// top" link) comes into view so the two don't overlap.
const backToTop = document.getElementById('backToTop');
const hero = document.getElementById('top');
const footer = document.querySelector('footer');

if (backToTop && hero && 'IntersectionObserver' in window) {
  let pastHero = false;
  let atFooter = false;

  const syncBackToTop = () => {
    const show = pastHero && !atFooter;
    backToTop.classList.toggle('d-none', !show);
    backToTop.classList.toggle('d-inline-flex', show);
  };

  new IntersectionObserver(
    ([entry]) => {
      pastHero = !entry.isIntersecting;
      syncBackToTop();
    },
    // Trigger ~200px early so the button is already visible just before #what-i-do.
    { threshold: 0, rootMargin: '-200px 0px 0px 0px' }
  ).observe(hero);

  if (footer) {
    new IntersectionObserver(
      ([entry]) => {
        atFooter = entry.isIntersecting;
        syncBackToTop();
      },
      { threshold: 0 }
    ).observe(footer);
  }
}

// The fixed navbar rests transparent over the hero at the top of the page and
// gains its solid background + hairline border (src/scss/main.scss) as soon as
// the page is scrolled. Under lg the CSS keeps the bar solid regardless, so the
// collapsed menu always opens onto an opaque backdrop.
const mainNav = document.getElementById('mainNav');

if (mainNav) {
  const syncNav = () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 4);
  };

  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();
}

// Keep the footer copyright year current without a yearly edit (2026 ships as
// the no-JS fallback in the markup).
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Email is stored split so it isn't a clean string in the served HTML; assemble
// it into the visible link/label text on load. The mailto: href stays intact for
// no-JS visitors.
(() => {
  const address = ['liandrejohn88', 'gmail.com'].join('@');
  document.querySelectorAll('[data-email-text]').forEach((el) => {
    el.textContent = address;
  });
})();

if (contactForm && formStatus) {
  const submitButton = contactForm.querySelector('button[type="submit"]');

  // contact_form_start: fires once, on the first focus or edit of a
  // meaningful field (not the honeypot or the resume checkbox), so it
  // reflects real intent rather than an accidental tab-through.
  const meaningfulFields = ['fullName', 'email', 'projectDetails']
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  let formStarted = false;
  const markFormStarted = () => {
    if (formStarted) return;
    formStarted = true;
    window.trackEvent?.('contact_form_start', { section_name: 'get_in_touch', form_id: 'contact' });
  };
  meaningfulFields.forEach((field) => {
    field.addEventListener('focusin', markFormStarted, { once: true });
    field.addEventListener('input', markFormStarted, { once: true });
  });

  // tone: 'info' (sending), 'success' (delivered), 'error' (fell back to mailto).
  // The element stays in the DOM so the live region is always watched; the mt-3
  // spacer is only added while it carries a message, so it takes no room empty.
  const setStatus = (message, tone = 'info') => {
    formStatus.textContent = message;
    formStatus.classList.toggle('mt-3', Boolean(message));
    formStatus.classList.toggle('text-primary', tone === 'info');
    formStatus.classList.toggle('text-success', tone === 'success');
    formStatus.classList.toggle('text-danger', tone === 'error');
  };

  // Backup path: if the network request fails, hand the visitor a prefilled
  // mailto: so the submission isn't lost (matches the original static-demo behavior).
  const openMailtoFallback = ({ name, email, details, wantsResume }) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Liandre,\n\n${details}\n\nRequesting resume: ${wantsResume}\n\nFrom: ${name}\nEmail: ${email}`
    );
    window.location.href = `mailto:liandrejohn88@gmail.com?subject=${subject}&body=${body}`;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const resumeRequested = Boolean(data.get('requestResume'));
    const fields = {
      name: data.get('fullName'),
      email: data.get('email'),
      details: data.get('projectDetails'),
      wantsResume: resumeRequested ? 'Yes' : 'No',
    };

    // Give Web3Forms a readable subject and spell out the resume request as its
    // own line rather than a raw "on" checkbox value.
    data.set('subject', `Portfolio inquiry from ${fields.name}`);
    data.delete('requestResume');
    data.set('Requesting resume', fields.wantsResume);

    if (submitButton) submitButton.disabled = true;
    setStatus('Sending your message…', 'info');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Request failed (${response.status})`);
      }

      contactForm.reset();
      setStatus('Thanks for reaching out — your message came through. You’ll hear back from me shortly.', 'success');

      // contact_form_submit is the primary conversion; resume_request is a
      // second, distinct signal fired only when the checkbox was ticked —
      // one successful submission can legitimately be both.
      window.trackEvent?.('contact_form_submit', {
        section_name: 'get_in_touch',
        contact_method: 'form',
        resume_requested: resumeRequested,
      });
      if (resumeRequested) {
        window.trackEvent?.('resume_request', { section_name: 'get_in_touch', contact_method: 'form' });
      }
    } catch (error) {
      setStatus('That didn’t go through — opening your email app so your message isn’t lost.', 'error');
      formStatus.focus();
      openMailtoFallback(fields);
      window.trackEvent?.('contact_form_error', { section_name: 'get_in_touch', error_type: 'submit_failed' });
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
