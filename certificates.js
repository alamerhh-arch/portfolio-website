const cards = [...document.querySelectorAll('[data-certificate-card]')];
const groups = [...document.querySelectorAll('[data-certificate-group]')];
const filters = [...document.querySelectorAll('[data-certificate-filter]')];
const dialog = document.querySelector('[data-certificate-lightbox]');
const image = dialog?.querySelector('[data-certificate-image]');
const title = dialog?.querySelector('[data-certificate-title]');
const issuer = dialog?.querySelector('[data-certificate-issuer]');
const position = dialog?.querySelector('[data-certificate-position]');
const original = dialog?.querySelector('[data-certificate-original]');
let visibleCards = cards;
let activeIndex = 0;

const updateViewer = index => {
  if (!visibleCards.length) return;
  activeIndex = (index + visibleCards.length) % visibleCards.length;
  const card = visibleCards[activeIndex];
  const cardImage = card.querySelector('img');
  const cardTitle = card.querySelector('h3').textContent;
  image.src = card.href;
  image.alt = cardImage.alt;
  title.textContent = cardTitle;
  issuer.textContent = card.querySelector('.certificate-copy > span').textContent;
  position.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(visibleCards.length).padStart(2, '0')}`;
  original.href = card.href;
};

filters.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.certificateFilter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  groups.forEach(group => {
    group.hidden = category !== 'all' && group.dataset.category !== category;
  });
  cards.forEach(card => {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  });
  visibleCards = cards.filter(card => !card.hidden);
  if (dialog?.open) dialog.close();
}));

cards.forEach(card => card.addEventListener('click', event => {
  if (!dialog || typeof dialog.showModal !== 'function') return;
  event.preventDefault();
  visibleCards = cards.filter(item => !item.hidden);
  updateViewer(visibleCards.indexOf(card));
  dialog.showModal();
}));

dialog?.querySelector('[data-certificate-close]').addEventListener('click', () => dialog.close());
dialog?.querySelector('[data-certificate-prev]').addEventListener('click', () => updateViewer(activeIndex - 1));
dialog?.querySelector('[data-certificate-next]').addEventListener('click', () => updateViewer(activeIndex + 1));
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
document.addEventListener('keydown', event => {
  if (!dialog?.open) return;
  if (event.key === 'ArrowLeft') updateViewer(activeIndex - 1);
  if (event.key === 'ArrowRight') updateViewer(activeIndex + 1);
});
