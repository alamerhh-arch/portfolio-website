const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

const closeMenu = () => {
  navigation?.classList.remove('open');
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  document.documentElement.classList.remove('menu-open');
  document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  navigation.classList.toggle('open', open);
  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.documentElement.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-open', open);
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth > 960) closeMenu();
}, { passive: true });
window.addEventListener('pageshow', closeMenu);

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 28);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const sections = sectionLinks
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

if (sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60%', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px' });

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', async () => {
  const featuredGrid = document.querySelector('.home-project-featured-grid');
  const compactGrid = document.querySelector('.home-project-compact-grid');
  if (!featuredGrid || !compactGrid) return;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
  try {
    const response = await fetch('content/projects.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Projects request failed: ${response.status}`);
    const projects = (await response.json()).projects.filter(item => item.published !== false && item.home).sort((a, b) => a.order - b.order);
    const card = project => {
      if (project.pending) return `<article class="home-project-card home-project-card-pending reveal visible" aria-label="${esc(project.title)} case study is in preparation"><div class="home-project-thumb home-project-thumb-taqa" aria-label="${esc(project.title)} project graphic"><span>${String(project.order).padStart(2, '0')}</span><strong>TAQA<br>MODON</strong><small>${esc(project.type)}</small></div><div class="home-project-copy"><span>${esc(project.label)}</span><h3>${esc(project.title)}</h3><b>Case study in preparation</b></div></article>`;
      const title = project.homeTitle || project.title;
      const thumbClass = project.logo ? ' home-project-thumb-logo' : '';
      const summary = project.featured ? `<p>${esc(project.summary)}</p>` : '';
      return `<a class="home-project-card${project.featured ? ' home-project-featured' : ''} reveal visible" href="project.html?id=${encodeURIComponent(project.slug)}"><div class="home-project-thumb${thumbClass}"><img src="${esc(project.coverImage)}" alt="${esc(title)} project preview" loading="lazy"><span>${String(project.order).padStart(2, '0')}</span></div><div class="home-project-copy"><span>${esc(project.label)}</span><h3>${esc(title)}</h3>${summary}<b>${project.featured ? 'View case study' : 'View project'} <i>↗</i></b></div></a>`;
    };
    featuredGrid.innerHTML = projects.filter(item => item.featured).map(card).join('');
    compactGrid.innerHTML = projects.filter(item => !item.featured).map(card).join('');
    window.PortfolioI18n?.applyLanguage(window.PortfolioI18n.language());
  } catch (error) {
    console.error('Unable to load homepage projects.', error);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('content/site.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Site content request failed: ${response.status}`);
    const site = await response.json();
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => { link.href = `mailto:${site.contact.email}`; const text = link.querySelector('span'); if (text?.childNodes.length) text.lastChild.nodeValue = site.contact.email; });
    document.querySelectorAll('a[href^="tel:"]').forEach(link => { link.href = `tel:${site.contact.phoneLink}`; const text = link.querySelector('span'); if (text?.childNodes.length) text.lastChild.nodeValue = site.contact.phone; });
    document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => { link.href = site.contact.linkedin; });
    document.querySelectorAll('a[href$="ahmed-alamer-cv.pdf"]').forEach(link => { link.href = site.contact.cv; });
  } catch (error) {
    console.error('Unable to load site settings.', error);
  }
});
