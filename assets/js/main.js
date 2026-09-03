// Bootstrap handles the navbar collapse and the mobile project carousel.
// This small handler preserves the original static-demo mailto behavior.
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Desktop projects strip: advance exactly one card (+ gap) per prev/next click,
// disable the buttons at either end, and keep the position dots in sync. CSS
// scroll-snap settles the final position.
const projectStrip = document.getElementById('projectStripDesktop');
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

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get('fullName');
    const email = data.get('email');
    const details = data.get('projectDetails');
    const wantsResume = data.get('requestResume') ? 'Yes' : 'No';

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Liandre,\n\n${details}\n\nRequesting resume: ${wantsResume}\n\nFrom: ${name}\nEmail: ${email}`
    );

    formStatus.textContent = 'Opening your email app…';
    window.location.href = `mailto:liandrejohn88@gmail.com?subject=${subject}&body=${body}`;
  });
}
