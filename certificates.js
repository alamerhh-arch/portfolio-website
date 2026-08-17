(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[c]);
  const cardHtml = (item, action, reveal = false) => `<a class="certificate-card${reveal ? ' reveal visible' : ''}" data-certificate-card data-category="${esc(item.category)}" href="${esc(item.image)}" target="_blank" rel="noopener noreferrer"><div class="certificate-preview"><img src="${esc(item.image)}" alt="${esc(item.alt)}" loading="lazy"></div><div class="certificate-copy"><span>${esc(item.issuer)}</span><h3>${esc(item.title)}</h3><b>${action} <span>↗</span></b></div></a>`;

  const loadData = async () => {
    const response = await fetch('content/certificates.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`Certificates request failed: ${response.status}`);
    const data = await response.json();
    return data.certificates.filter(item => item.published !== false).sort((a, b) => a.order - b.order);
  };

  const render = certificates => {
    const showcase = document.querySelector('.certificate-showcase-grid');
    if (showcase) showcase.innerHTML = certificates.filter(item => item.featured).slice(0, 8).map(item => cardHtml(item, 'Open certificate', true)).join('');

    const library = document.querySelector('.certificate-library-section');
    if (library) {
      library.querySelectorAll('[data-certificate-group]').forEach(group => group.remove());
      const order = ['autodesk', 'bim-solutions', 'revizto', 'sbc'];
      const labels = { autodesk: 'Autodesk Training Center', 'bim-solutions': 'BIM Solutions', revizto: 'Revizto', sbc: 'Saudi Building Code' };
      order.forEach((category, index) => {
        const items = certificates.filter(item => item.category === category);
        if (!items.length) return;
        const section = document.createElement('section');
        section.className = 'certificate-group';
        section.dataset.certificateGroup = '';
        section.dataset.category = category;
        section.innerHTML = `<div class="certificate-group-heading"><div><span>${String(index + 1).padStart(2, '0')}</span><h2>${esc(labels[category])}</h2></div><b>${items.length} certificates</b></div><div class="certificate-grid">${items.map(item => cardHtml(item, 'Inspect certificate')).join('')}</div>`;
        library.appendChild(section);
      });
      document.querySelectorAll('[data-certificate-filter]').forEach(button => {
        const category = button.dataset.certificateFilter;
        const count = category === 'all' ? certificates.length : certificates.filter(item => item.category === category).length;
        if (button.querySelector('b')) button.querySelector('b').textContent = count;
      });
    }
  };

  const bind = () => {
    const cards = [...document.querySelectorAll('[data-certificate-card]')];
    const groups = [...document.querySelectorAll('[data-certificate-group]')];
    const filters = [...document.querySelectorAll('[data-certificate-filter]')];
    const dialog = document.querySelector('[data-certificate-lightbox]');
    const image = dialog?.querySelector('[data-certificate-image]');
    const title = dialog?.querySelector('[data-certificate-title]');
    const issuer = dialog?.querySelector('[data-certificate-issuer]');
    const position = dialog?.querySelector('[data-certificate-position]');
    const original = dialog?.querySelector('[data-certificate-original]');
    let visible = cards;
    let active = 0;
    let returnFocus = null;
    const update = index => {
      if (!visible.length) return;
      active = (index + visible.length) % visible.length;
      const card = visible[active];
      image.src = card.href;
      image.alt = card.querySelector('img').alt;
      title.textContent = card.querySelector('h3').textContent;
      issuer.textContent = card.querySelector('.certificate-copy > span').textContent;
      position.textContent = `${String(active + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
      original.href = card.href;
    };
    filters.forEach(button => button.addEventListener('click', () => {
      const category = button.dataset.certificateFilter;
      filters.forEach(item => { const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected)); });
      groups.forEach(group => { group.hidden = category !== 'all' && group.dataset.category !== category; });
      cards.forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
      visible = cards.filter(card => !card.hidden);
      if (dialog?.open) dialog.close();
    }));
    cards.forEach(card => card.addEventListener('click', event => {
      if (!dialog?.showModal) return;
      event.preventDefault();
      visible = cards.filter(item => !item.hidden);
      update(visible.indexOf(card));
      returnFocus = card;
      dialog.showModal();
    }));
    dialog?.querySelector('[data-certificate-close]')?.addEventListener('click', () => dialog.close());
    dialog?.querySelector('[data-certificate-prev]')?.addEventListener('click', () => update(active - 1));
    dialog?.querySelector('[data-certificate-next]')?.addEventListener('click', () => update(active + 1));
    dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog?.addEventListener('close', () => returnFocus?.focus());
    document.addEventListener('keydown', event => { if (dialog?.open && event.key === 'ArrowLeft') update(active - 1); if (dialog?.open && event.key === 'ArrowRight') update(active + 1); });
  };

  document.addEventListener('DOMContentLoaded', async () => {
    try { render(await loadData()); } catch (error) { console.error('Unable to load certificate content.', error); }
    bind();
    window.PortfolioI18n?.applyLanguage(window.PortfolioI18n.language());
  });
})();
