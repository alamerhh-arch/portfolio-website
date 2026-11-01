(() => {
  const root = document.querySelector('[data-project-filter]');
  if (!root) return;
  const buttons = [...root.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('.projects-library [data-category]')];
  const status = root.querySelector('[data-filter-status]');
  const apply = filter => {
    let count = 0;
    cards.forEach(card => { const show = filter === 'all' || card.dataset.category.split(/\s+/).includes(filter); card.hidden = !show; if (show) count += 1; });
    buttons.forEach(button => { const active = button.dataset.filter === filter; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
    const label = buttons.find(button => button.dataset.filter === filter)?.childNodes[0]?.textContent.trim() || 'All';
    status.textContent = document.documentElement.lang === 'ar' ? (filter === 'all' ? `عرض جميع المشاريع وعددها ${count}` : `عرض ${count} من المشاريع المصنفة ${label}`) : (filter === 'all' ? `Showing all ${count} projects` : `Showing ${count} ${label} project${count === 1 ? '' : 's'}`);
  };
  root.addEventListener('click', event => { const button = event.target.closest('[data-filter]'); if (button) apply(button.dataset.filter); });
  apply('all');
})();
