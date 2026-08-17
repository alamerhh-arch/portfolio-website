(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);
  document.addEventListener('DOMContentLoaded', async () => {
    const projectFilter = document.querySelector('[data-project-filter]');
    const library = document.querySelector('.projects-library');
    if (!projectFilter || !library) return;
    let projects;
    try {
      const response = await fetch('content/projects.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Projects request failed: ${response.status}`);
      projects = (await response.json()).projects.filter(item => item.published !== false).sort((a, b) => a.order - b.order);
      library.innerHTML = projects.map(project => {
        if (project.pending) return `<article class="gallery-project-card gallery-project-pending" data-category="${esc(project.filters.join(' '))}" aria-label="${esc(project.title)} case study is in preparation"><div class="gallery-cover gallery-cover-taqa"><strong>TAQA<br>MODON</strong><small>${esc(project.type)}</small><span>Case study pending</span></div><div class="gallery-card-copy"><span>${esc(project.label)}</span><h2>${esc(project.title)}</h2><b>In preparation</b></div></article>`;
        const count = project.groups.reduce((sum, group) => sum + group.images.length, 0);
        return `<a class="gallery-project-card" data-category="${esc(project.filters.join(' '))}" href="project.html?id=${encodeURIComponent(project.slug)}"><div class="gallery-cover"><img src="${esc(project.coverImage)}" alt="${esc(project.title)} project preview" loading="lazy"><span>${count} selected sheets</span></div><div class="gallery-card-copy"><span>${esc(project.label)}</span><h2>${esc(project.title)}</h2><b>View gallery ↗</b></div></a>`;
      }).join('');
    } catch (error) {
      console.error('Unable to load project library.', error);
      projects = [...library.querySelectorAll('[data-category]')].map(card => ({ filters: card.dataset.category.split(/\s+/) }));
    }

    const buttons = [...projectFilter.querySelectorAll('[data-filter]')];
    const cards = [...library.querySelectorAll('[data-category]')];
    const status = projectFilter.querySelector('[data-filter-status]');
    buttons.forEach(button => {
      const filter = button.dataset.filter;
      const count = filter === 'all' ? cards.length : cards.filter(card => card.dataset.category.split(/\s+/).includes(filter)).length;
      if (button.querySelector('b')) button.querySelector('b').textContent = count;
    });
    const applyFilter = filter => {
      let visibleCount = 0;
      cards.forEach(card => { const show = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter); card.hidden = !show; if (show) visibleCount += 1; });
      buttons.forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
      const label = buttons.find(button => button.dataset.filter === filter)?.childNodes[0]?.textContent.trim() || 'All';
      status.textContent = document.documentElement.lang === 'ar' ? (filter === 'all' ? `عرض جميع المشاريع وعددها ${visibleCount}` : `عرض ${visibleCount} من المشاريع المصنفة ${label}`) : (filter === 'all' ? `Showing all ${visibleCount} projects` : `Showing ${visibleCount} ${label} project${visibleCount === 1 ? '' : 's'}`);
    };
    projectFilter.addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (button) applyFilter(button.dataset.filter); });
    applyFilter('all');
    window.PortfolioI18n?.applyLanguage(window.PortfolioI18n.language());
  });
})();
