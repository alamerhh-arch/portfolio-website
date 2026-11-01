(() => {
  const surfaces = [
    '.home-project-thumb',
    '.gallery-cover',
    '.certificate-preview',
    '.project-cover-image',
    '.gallery-image-button',
    '.project-lightbox figure',
    '.certificate-lightbox figure'
  ].join(',');

  const protect = root => {
    root.querySelectorAll(surfaces).forEach(surface => {
      surface.classList.add('protected-image-surface');
      surface.querySelectorAll('img').forEach(image => image.draggable = false);
    });
  };

  document.addEventListener('DOMContentLoaded', () => protect(document));
  document.addEventListener('dragstart', event => {
    if (event.target.closest?.(`${surfaces} img`)) event.preventDefault();
  }, true);
  document.addEventListener('contextmenu', event => {
    if (event.target.closest?.(surfaces)) event.preventDefault();
  }, true);
})();
