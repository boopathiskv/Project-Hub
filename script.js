/* ============================================
   PROJECT HUB — Main Script (ES2024+)
   ============================================ */

'use strict';

/* ----------- 1. Project Data ----------- */
const projects = [
    {
    title: 'Project Hub',
    description: 'About🚀 Project Hub — A premium single-page dashboard for showcasing all my hosted static websites. Built with only HTML5, CSS3 & Vanilla JS (ES2024+). Zero frameworks, zero dependencies. Features glassmorphism, dark/light mode, live search, animated counters, enterprise workflow card, reveal animations & full WCAG accessibility.',
    category: 'UI',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://boopathiskv.github.io/Project-Hub/',
    github: 'https://github.com/boopathiskv/Project-Hub',
    featured: true,
    gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)',
  },
   {
    title: 'Emergency Contact QR Code',
    description: 'A static web app helping people recover lost items like luggage, wallets, or keys. Users enter contact details to generate a unique QR code to print and attach to belongings. If an item goes missing, finders simply scan the QR code to instantly view owner details and get in touch. Built fast and secure using HTML, CSS, and JavaScript.',
    category: 'Tools',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://emergencycontactsdetails.github.io/ECQC/',
    github: 'https://github.com/emergencycontactsdetails/ECQC',
    featured: true,
    gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)',
  },
    {
    title: 'Daily Work Follow-Up Tracker',
    description: '🗂️ Daily Work Follow-Up Tracker — a secure, offline, single-page task manager built with pure HTML5, CSS3 & vanilla JS. Features auto Task IDs from Start Date, JSON Import/Export, search, filters, sort, summary dashboard, overdue detection, popup-based UX, strict CSP, and zero external dependencies. Fully responsive.',
    category: 'Tools',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://boopathiskv.github.io/daily-work-tracker/',
    github: 'https://github.com/boopathiskv/daily-work-tracker',
    featured: true,
    gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)',
  },
    {
    title: 'Password Manager',
    description: 'Password Manager is a 100% offline, static single-page password manager built with pure HTML5, CSS3, and vanilla JavaScript. Features multi-layer encryption (AES-GCM 256 + PBKDF2 600k + XOR + Base64), per-record 6-digit PIN protection, enterprise dashboard UI, CRUD, search, categories, import/export — zero dependencies, zero CDN, runs from a Usb static',
    category: 'Tools',
    tech: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://boopathiskv.github.io/PasswordManager/',
    github: 'https://github.com/boopathiskv/PasswordManager',
    featured: true,
    gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)',
  },
   
 

];

const CATEGORIES = ['All', 'HTML', 'CSS', 'JavaScript', 'UI', 'Landing Pages', 'Dashboards', 'Tools'];

/* ----------- Derived stats ----------- */
const getStats = () => {
  const totalProjects = projects.length;

  // Unique technologies across all projects
  const techSet = new Set();
  projects.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
  const totalTech = techSet.size;

  // Unique categories actually used by projects (excluding "All")
  const catSet = new Set(projects.map((p) => p.category));
  const totalCategories = catSet.size;

  return { totalProjects, totalTech, totalCategories };
};

/* ----------- 2. DOM refs ----------- */
const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];

const dom = {
  loader:        $('#loader'),
  scrollBar:     $('#scrollProgress'),
  nav:           $('#nav'),
  themeToggle:   $('#themeToggle'),
  burger:        $('#navBurger'),
  navLinks:      $('.nav__links'),
  filters:       $('#filters'),
  search:        $('#searchInput'),
  grid:          $('#projectsGrid'),
  featuredGrid:  $('#featuredGrid'),
  emptyState:    $('#emptyState'),
  backToTop:     $('#backToTop'),
  year:          $('#year'),
};

/* ----------- 3. State ----------- */
const state = {
  activeCategory: 'All',
  query: '',
};

/* ----------- 4. Utilities ----------- */
const escapeHTML = (s = '') =>
  s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));

const debounce = (fn, ms = 200) => {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

/* ----------- 5. Theme ----------- */
const initTheme = () => {
  const saved = localStorage.getItem('ph-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = saved ?? (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', theme);
};

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ph-theme', next);
};

/* ----------- 6. Loader ----------- */
const hideLoader = () => {
  // Slight delay so the loader feels intentional
  setTimeout(() => dom.loader?.classList.add('is-hidden'), 600);
};

/* ----------- 7. Scroll Progress ----------- */
const updateScrollProgress = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  dom.scrollBar.style.width = `${Math.min(scrolled * 100, 100)}%`;
};

/* ----------- 8. Back to top ----------- */
const toggleBackToTop = () => {
  dom.backToTop.classList.toggle('is-visible', window.scrollY > 600);
};
dom.backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ----------- 9. Filters ----------- */
const renderFilters = () => {
  dom.filters.innerHTML = CATEGORIES.map((cat) => `
    <button
      class="filter-btn ${cat === state.activeCategory ? 'is-active' : ''}"
      data-category="${escapeHTML(cat)}"
      role="tab"
      aria-selected="${cat === state.activeCategory}"
    >${escapeHTML(cat)}</button>
  `).join('');

  dom.filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    state.activeCategory = btn.dataset.category;
    $$('.filter-btn', dom.filters).forEach((b) => {
      const on = b.dataset.category === state.activeCategory;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on);
    });
    renderProjects();
  }, { once: false });
};

/* ----------- 10. Card builder ----------- */
const cardTemplate = (p) => {
  const techBadges = p.tech.map((t) =>
    `<span class="tech-badge">${escapeHTML(t)}</span>`
  ).join('');

  const githubBtn = p.github
    ? `<a href="${escapeHTML(p.github)}" target="_blank" rel="noopener" class="btn btn--ghost" aria-label="View source for ${escapeHTML(p.title)}">
         <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
           <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.1-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
         </svg>
         Code
       </a>`
    : '';

  return `
    <article class="card" style="--preview:${p.gradient}">
      <div class="card__preview">
        <span class="card__badge">${escapeHTML(p.category)}</span>
      </div>
      <div class="card__body">
        <h3 class="card__title">${escapeHTML(p.title)}</h3>
        <p class="card__desc">${escapeHTML(p.description)}</p>
        <div class="card__tech">${techBadges}</div>
        <div class="card__actions">
          <a href="${escapeHTML(p.live)}" target="_blank" rel="noopener" class="btn btn--primary" aria-label="Open live demo for ${escapeHTML(p.title)}">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 3h6v6M10 14L21 3M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/>
            </svg>
            Live Demo
          </a>
          ${githubBtn}
        </div>
      </div>
    </article>
  `;
};

/* ----------- 11. Render projects ----------- */
const filterProjects = () => projects.filter((p) => {
  const matchCat = state.activeCategory === 'All' || p.category === state.activeCategory
    || p.tech.includes(state.activeCategory);
  const q = state.query.trim().toLowerCase();
  if (!q) return matchCat;
  const haystack = [
    p.title, p.description, p.category, ...p.tech,
  ].join(' ').toLowerCase();
  return matchCat && haystack.includes(q);
});

const renderProjects = () => {
  const list = filterProjects();
  dom.grid.innerHTML = list.map(cardTemplate).join('');
  dom.emptyState.hidden = list.length !== 0;
  // Re-observe newly-added cards for reveal
  observeReveals();
};

const renderFeatured = () => {
  const list = projects.filter((p) => p.featured);
  dom.featuredGrid.innerHTML = list.map(cardTemplate).join('');
};

/* ----------- 12. Search ----------- */
const handleSearch = debounce((e) => {
  state.query = e.target.value;
  renderProjects();
}, 180);

/* ----------- 13. Reveal Observer ----------- */
let revealObserver;
const observeReveals = () => {
  if (!('IntersectionObserver' in window)) {
    $$('.reveal, .card, .about-card, .stat-card').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  revealObserver ??= new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  $$('.reveal').forEach((el) => {
    if (!el.classList.contains('is-visible')) revealObserver.observe(el);
  });
};

/* ----------- 14. Animated counters ----------- */
const animateCounter = (el) => {
  const target = Number(el.dataset.countTarget) || 0;
  const suffix = el.dataset.countSuffix ?? '';
  const duration = 1600;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    // EaseOutCubic
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${Math.floor(eased * target)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = `${target}${suffix}`;
  };
  requestAnimationFrame(tick);
};

/* ----------- Animated counters (dynamic) ----------- */
const initCounters = () => {
  const { totalProjects, totalTech, totalCategories } = getStats();

  // Map element IDs to their dynamic values
  const targets = {
    aboutProjectsCount:  totalProjects,
    aboutTechCount:      totalTech,
    statProjectsCount:   totalProjects,
    statCategoriesCount: totalCategories,
    statTechCount:       totalTech,
  };

  // Apply the computed values as data attributes
  Object.entries(targets).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.dataset.countTarget = String(value);
  });

  const counters = $$('[data-count-target]');

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((el) => obs.observe(el));
};

/* ----------- 15. Mobile nav ----------- */
dom.burger?.addEventListener('click', () => {
  const open = dom.navLinks.classList.toggle('is-open');
  dom.burger.setAttribute('aria-expanded', open);
});
$$('.nav__links a').forEach((a) =>
  a.addEventListener('click', () => {
    dom.navLinks.classList.remove('is-open');
    dom.burger.setAttribute('aria-expanded', 'false');
  })
);

/* ----------- 16. Event wiring ----------- */
const init = () => {
  initTheme();
  dom.themeToggle?.addEventListener('click', toggleTheme);
  dom.search?.addEventListener('input', handleSearch);
  dom.year.textContent = new Date().getFullYear();

  renderFilters();
  renderFeatured();
  renderProjects();
  observeReveals();
  initCounters();

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleBackToTop();
  }, { passive: true });

  window.addEventListener('load', hideLoader);
  // Safety net: hide loader even if `load` is delayed
  setTimeout(hideLoader, 2500);
};

document.addEventListener('DOMContentLoaded', init);

