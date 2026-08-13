const projects = {
  'cultural-center-marlowe': {
    title: 'Cultural Center — Marlowe',
    category: 'Cultural / Architectural redesign',
    type: 'Cultural center',
    role: 'Architectural designer',
    scope: 'Design & documentation',
    stage: 'Concept to detailed design',
    tools: 'Revit · AutoCAD · Visualization',
    summary: 'A cultural center redesign presented through architectural concept imagery, plans, elevations, sections, and detailed construction information.',
    cover: 1,
    video: {
      id: 'DwV8U7zahrY',
      title: 'Cultural Center — Marlowe project presentation'
    },
    groups: [{ label: 'Design presentation & documentation', images: [1, 4, 5, 7, 8, 9, 14, 18] }]
  },
  'dammam-school': {
    title: 'Dammam School',
    category: 'Education / Architecture',
    type: 'Educational',
    role: 'Architectural designer',
    scope: 'Architecture & BIM',
    stage: 'Design development',
    tools: 'Revit · AutoCAD · Visualization',
    summary: 'A coordinated school design package combining architectural visualization, plans, elevations, structural information, details, and environmental studies.',
    cover: 1,
    video: {
      id: 'sTII2z1BTTU',
      title: 'Dammam School project presentation'
    },
    groups: [{ label: 'Architectural & technical package', images: [1, 2, 3, 7, 8, 16, 24, 28] }]
  },
  'dr-sarah-villa': {
    title: 'Dr. Sarah Villa',
    category: 'Residential / Design',
    type: 'Private villa',
    role: 'Architectural designer',
    scope: 'Space planning',
    stage: 'Concept design',
    tools: 'AutoCAD · Visualization',
    summary: 'Residential space planning developed through clear, furnished floor plans that communicate circulation, zoning, and room relationships.',
    cover: 1,
    video: {
      id: '3ffOgybiq6o',
      title: 'Dr. Sarah Villa project presentation'
    },
    groups: [{ label: 'Villa floor plans', images: [1, 2] }]
  },
  'neom-sports-village': {
    title: 'NEOM Sports Village',
    category: 'Sports / Architecture & BIM',
    type: 'Sports village',
    role: 'Architectural BIM engineer',
    scope: 'Multidisciplinary documentation',
    stage: 'Detailed design',
    tools: 'Revit · Navisworks · ACC',
    summary: 'A detailed BIM documentation set covering the dining facility and sports center, with coordinated plans, elevations, sections, schedules, and construction details.',
    cover: 29,
    groups: [
      { label: 'Dining Facility', images: [1, 3, 8, 9, 17] },
      { label: 'Sports Center', images: [29, 32, 35, 36, 43] }
    ]
  },
  'qiddiya-worker-camps': {
    title: 'Qiddiya Worker Camps',
    category: 'Residential program / BIM',
    type: 'Worker accommodation',
    role: 'Architectural BIM engineer',
    scope: 'Architecture & coordination',
    stage: 'Detailed design',
    tools: 'Revit · Navisworks · ACC',
    summary: 'A coordinated BIM package spanning worker housing, a dining facility, and a fire station, with model views and detailed architectural documentation.',
    cover: 14,
    groups: [
      { label: 'B01 — Worker Housing', images: [1, 6, 9] },
      { label: 'B05 — Dining Facility', images: [14, 15, 18, 25] },
      { label: 'B21 — Fire Station', images: [31, 37, 42] }
    ]
  },
  'red-sea-turtle-bay': {
    title: 'Red Sea — Turtle Bay Substructure',
    category: 'Hospitality / Structural documentation',
    type: 'Hospitality',
    role: 'Structural BIM modeler',
    scope: 'Substructure package',
    stage: 'Technical documentation',
    tools: 'Revit · Navisworks',
    summary: 'Structural documentation for the Turtle Bay substructure, including coordinated plans, foundation details, schedules, and a three-dimensional model view.',
    cover: 8,
    groups: [{ label: 'Substructure documentation', images: [2, 3, 4, 5, 6, 7, 8, 9] }]
  },
  'nesma-parking-building': {
    title: 'Nesma Parking Building — Al Khobar Business Park',
    category: 'Commercial / Architectural documentation',
    type: 'Multi-storey parking building',
    role: 'Architectural BIM engineer',
    scope: 'Architecture & technical documentation',
    stage: 'Detailed design',
    tools: 'Revit · AutoCAD · BIM documentation',
    summary: 'A coordinated architectural package for the Nesma multi-storey parking building at Al Khobar Business Park, combining exterior visualization with site planning, floor plans, elevations, sections, and construction information.',
    cover: 1,
    groups: [
      { label: 'Architectural visualization', images: [1, 2, 3, 4] },
      { label: 'Technical documentation', images: [5, 6, 7, 8] }
    ]
  },
  'zain': {
    title: 'Zain — HCL Tank Farm & Warehouse',
    category: 'Industrial / Documentation',
    type: 'Industrial facility',
    role: 'Architectural BIM engineer',
    scope: 'Architectural documentation',
    stage: 'Technical documentation',
    tools: 'Revit · AutoCAD · ACC',
    summary: 'An industrial drawing package covering the HCL tank farm and warehouse through plans, elevations, schedules, sections, and envelope details.',
    cover: 14,
    groups: [
      { label: 'HCL Tank Farm', images: [1, 2, 4, 5] },
      { label: 'Warehouse', images: [8, 9, 14, 20] }
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
const project = projects[projectId];

if (!project) {
  window.location.replace('index.html#work');
} else {
  const pad = number => String(number).padStart(2, '0');
  const imagePath = number => `assets/projects/${projectId}/${pad(number)}.webp`;
  const total = project.groups.reduce((sum, group) => sum + group.images.length, 0);
  const allImages = [];

  document.title = `${project.title} | Ahmed Alamer`;
  document.querySelector('[data-project-title]').textContent = project.title;
  document.querySelector('[data-project-category]').textContent = project.category;
  document.querySelector('[data-project-summary]').textContent = project.summary;
  document.querySelector('[data-project-type]').textContent = project.type;
  document.querySelector('[data-project-role]').textContent = project.role;
  document.querySelector('[data-project-scope]').textContent = project.scope;
  document.querySelector('[data-project-stage]').textContent = project.stage;
  document.querySelector('[data-project-tools]').textContent = project.tools;
  document.querySelector('[data-project-count]').textContent = `${total} images`;

  const canonicalUrl = `https://alamerhh-arch.github.io/portfolio-website/project.html?id=${encodeURIComponent(projectId)}`;
  const imageUrl = new URL(imagePath(project.cover), window.location.href).href;
  document.querySelector('[data-project-canonical]').href = canonicalUrl;
  document.querySelector('[data-project-og-title]').content = `${project.title} | Ahmed Alamer`;
  document.querySelector('[data-project-og-description]').content = project.summary;
  document.querySelector('[data-project-og-url]').content = canonicalUrl;
  document.querySelector('[data-project-og-image]').content = imageUrl;

  const cover = document.querySelector('[data-project-cover]');
  cover.src = imagePath(project.cover);
  cover.alt = `${project.title} project cover`;

  const videoSection = document.querySelector('[data-project-video-section]');
  if (project.video && videoSection) {
    const videoFrame = videoSection.querySelector('[data-project-video]');
    const videoLink = videoSection.querySelector('[data-project-video-link]');
    videoFrame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(project.video.id)}?rel=0`;
    videoFrame.title = project.video.title;
    videoLink.href = `https://www.youtube.com/watch?v=${encodeURIComponent(project.video.id)}`;
    videoSection.hidden = false;
  }

  const galleryRoot = document.querySelector('[data-gallery-root]');
  project.groups.forEach(group => {
    const section = document.createElement('section');
    section.className = 'gallery-group';
    const heading = document.createElement('div');
    heading.className = 'gallery-group-heading';
    heading.innerHTML = `<h3>${group.label}</h3><span>${group.images.length} images</span>`;
    const grid = document.createElement('div');
    grid.className = 'project-image-grid';

    group.images.forEach(number => {
      const item = { number, group: group.label, src: imagePath(number) };
      allImages.push(item);
      const button = document.createElement('button');
      button.className = 'gallery-image-button';
      button.type = 'button';
      button.dataset.imageIndex = String(allImages.length - 1);
      button.setAttribute('aria-label', `Open ${project.title}, ${group.label}, image ${number}`);
      button.innerHTML = `<img src="${item.src}" alt="${project.title} — ${group.label} — image ${number}" loading="lazy"><span>${pad(number)}</span>`;
      grid.appendChild(button);
    });
    section.append(heading, grid);
    galleryRoot.appendChild(section);
  });

  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  const lightboxOpen = document.querySelector('[data-lightbox-open]');
  let activeIndex = 0;

  const showImage = index => {
    activeIndex = (index + allImages.length) % allImages.length;
    const item = allImages[activeIndex];
    lightboxImage.src = item.src;
    lightboxImage.alt = `${project.title} — ${item.group} — image ${item.number}`;
    lightboxOpen.href = item.src;
    lightboxCaption.textContent = `${project.title} · ${item.group} · Sheet ${pad(item.number)} · ${pad(activeIndex + 1)} / ${pad(total)}`;
  };

  galleryRoot.addEventListener('click', event => {
    const button = event.target.closest('[data-image-index]');
    if (!button) return;
    showImage(Number(button.dataset.imageIndex));
    lightbox.showModal();
  });
  document.querySelector('[data-lightbox-close]').addEventListener('click', () => lightbox.close());
  document.querySelector('[data-lightbox-prev]').addEventListener('click', () => showImage(activeIndex - 1));
  document.querySelector('[data-lightbox-next]').addEventListener('click', () => showImage(activeIndex + 1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener('keydown', event => {
    if (!lightbox.open) return;
    if (event.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (event.key === 'ArrowRight') showImage(activeIndex + 1);
  });
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
}
