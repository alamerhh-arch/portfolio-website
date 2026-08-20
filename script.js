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
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 960) closeMenu(); }, { passive: true });
window.addEventListener('pageshow', closeMenu);
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 28);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
const sectionLinks = [...document.querySelectorAll('[data-section-link]')];
const sections = sectionLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
if (sections.length) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(link => link.toggleAttribute('aria-current', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-30% 0px -60%', threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('visible');
  observer.unobserve(entry.target);
}), { threshold: 0.12, rootMargin: '0px 0px -40px' });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
