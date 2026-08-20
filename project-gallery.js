(() => {
  const cards = [...document.querySelectorAll('.gallery-image-button')];
  const dialog = document.querySelector('[data-lightbox]');
  const image = dialog?.querySelector('[data-lightbox-image]');
  const caption = dialog?.querySelector('[data-lightbox-caption]');
  const original = dialog?.querySelector('[data-lightbox-open]');
  let active = 0;
  let returnFocus;
  const language = () => document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const update = index => {
    if (!cards.length) return;
    active = (index + cards.length) % cards.length;
    const card = cards[active];
    const text = card.dataset[`caption${language() === 'ar' ? 'Ar' : 'En'}`];
    image.src = card.dataset.imageSrc;
    image.alt = text;
    caption.textContent = `${String(active + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')} — ${text}`;
    original.href = card.dataset.imageSrc;
  };
  cards.forEach((card, index) => card.addEventListener('click', () => { if (!dialog?.showModal) return; returnFocus = card; update(index); dialog.showModal(); }));
  dialog?.querySelector('[data-lightbox-close]')?.addEventListener('click', () => dialog.close());
  dialog?.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => update(active - 1));
  dialog?.querySelector('[data-lightbox-next]')?.addEventListener('click', () => update(active + 1));
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => returnFocus?.focus());
  document.addEventListener('keydown', event => { if (!dialog?.open) return; if (event.key === 'ArrowLeft') update(active - 1); if (event.key === 'ArrowRight') update(active + 1); });
  document.addEventListener('portfolio:language', () => { if (dialog?.open) update(active); });
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
})();
