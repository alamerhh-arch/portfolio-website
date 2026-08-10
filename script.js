const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

const closeMenu = () => {
  navigation?.classList.remove('open');
  menuButton?.classList.remove('active');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open navigation');
  document.body.style.overflow = '';
};

menuButton?.addEventListener('click', () => {
  const open = !navigation.classList.contains('open');
  navigation.classList.toggle('open', open);
  menuButton.classList.toggle('active', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflow = open ? 'hidden' : '';
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 28);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const projectList = document.querySelector('.project-list');
const moreProjects = document.querySelector('.more-projects');
if (projectList && moreProjects) {
  moreProjects.insertAdjacentHTML('beforebegin', `
    <div class="gallery-intro reveal">
      <p class="section-number">Detailed project galleries</p>
      <h3>Drawings, models &<br><em>design development.</em></h3>
      <p>Open each project to review a curated set of the supplied architectural, structural, and BIM documentation.</p>
    </div>
    <div class="gallery-projects">
      <a class="gallery-project-card reveal" href="project.html?id=cultural-center-marlowe">
        <div class="gallery-cover"><img src="assets/projects/cultural-center-marlowe/01.webp" alt="Cultural Center Marlowe presentation board" loading="lazy"><span>8 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Cultural / Redesign</span><h3>Cultural Center — Marlowe</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=dammam-school">
        <div class="gallery-cover"><img src="assets/projects/dammam-school/01.webp" alt="Dammam School architectural presentation" loading="lazy"><span>8 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Education / Architecture</span><h3>Dammam School</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=dr-sarah-villa">
        <div class="gallery-cover"><img src="assets/projects/dr-sarah-villa/01.webp" alt="Dr. Sarah Villa floor plan" loading="lazy"><span>2 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Residential / Design</span><h3>Dr. Sarah Villa</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=neom-sports-village">
        <div class="gallery-cover"><img src="assets/projects/neom-sports-village/29.webp" alt="NEOM Sports Village sports center drawing" loading="lazy"><span>10 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Sports / BIM</span><h3>NEOM Sports Village</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=qiddiya-worker-camps">
        <div class="gallery-cover"><img src="assets/projects/qiddiya-worker-camps/14.webp" alt="Qiddiya Worker Camps BIM model" loading="lazy"><span>10 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Residential / BIM</span><h3>Qiddiya Worker Camps</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=red-sea-turtle-bay">
        <div class="gallery-cover"><img src="assets/projects/red-sea-turtle-bay/08.webp" alt="Red Sea Turtle Bay substructure model" loading="lazy"><span>8 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Hospitality / Structure</span><h3>Red Sea — Turtle Bay</h3><b>Open project ↗</b></div>
      </a>
      <a class="gallery-project-card reveal" href="project.html?id=zain">
        <div class="gallery-cover"><img src="assets/projects/zain/14.webp" alt="Zain warehouse architectural elevation" loading="lazy"><span>8 selected sheets</span></div>
        <div class="gallery-card-copy"><span>Industrial / Documentation</span><h3>Zain — HCL Tank Farm & Warehouse</h3><b>Open project ↗</b></div>
      </a>
    </div>
  `);
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
