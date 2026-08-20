(() => {
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
  let returnFocus;
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
    visible = cards.filter(card => category === 'all' || card.dataset.category === category);
    if (dialog?.open) dialog.close();
  }));
  cards.forEach(card => card.addEventListener('click', event => {
    if (!dialog?.showModal) return;
    event.preventDefault();
    visible = cards.filter(item => !item.closest('[data-certificate-group]')?.hidden);
    update(visible.indexOf(card));
    returnFocus = card;
    dialog.showModal();
  }));
  dialog?.querySelector('[data-certificate-close]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('[data-certificate-prev]')?.addEventListener('click', () => update(active - 1));
  dialog?.querySelector('[data-certificate-next]')?.addEventListener('click', () => update(active + 1));
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => returnFocus?.focus());
  document.addEventListener('keydown', event => { if (!dialog?.open) return; if (event.key === 'ArrowLeft') update(active - 1); if (event.key === 'ArrowRight') update(active + 1); });
})();
