const projectFilter = document.querySelector('[data-project-filter]');

if (projectFilter) {
  const buttons = [...projectFilter.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.projects-library [data-category]')];
  const status = projectFilter.querySelector('[data-filter-status]');

  const applyFilter = filter => {
    let visibleCount = 0;

    cards.forEach(card => {
      const categories = card.dataset.category.split(/\\s+/);
      const visible = filter === 'all' || categories.includes(filter);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    buttons.forEach(button => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const activeLabel = buttons.find(button => button.dataset.filter === filter)?.childNodes[0]?.textContent.trim() || 'All';
    const arabic = document.documentElement.lang === 'ar';
    status.textContent = arabic
      ? (filter === 'all' ? `عرض جميع المشاريع وعددها ${visibleCount}` : `عرض ${visibleCount} من المشاريع المصنفة ${activeLabel}`)
      : (filter === 'all' ? `Showing all ${visibleCount} projects` : `Showing ${visibleCount} ${activeLabel} project${visibleCount === 1 ? '' : 's'}`);
  };

  projectFilter.addEventListener('click', event => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    applyFilter(button.dataset.filter);
  });
}
