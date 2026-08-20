(() => {
  const STORAGE_KEY = 'portfolio-language';
  const translations = {};
  const originalText = new WeakMap();
  const normalize = value => value.replace(/\s+/g, ' ').trim();
  const translateNode = (node, language) => {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    if (language === 'en') { node.nodeValue = source; return; }
    const translated = translations[normalize(source)];
    if (!translated) return;
    node.nodeValue = `${source.match(/^\s*/)?.[0] || ''}${translated}${source.match(/\s*$/)?.[0] || ''}`;
  };
  const applyLanguage = language => {
    const selected = language === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', selected === 'ar');
    document.querySelectorAll('[data-content-en]').forEach(element => { element.textContent = selected === 'ar' ? element.dataset.contentAr : element.dataset.contentEn; });
    document.querySelectorAll('[data-alt-en]').forEach(element => { element.alt = selected === 'ar' ? element.dataset.altAr : element.dataset.altEn; });
    document.querySelectorAll('[data-title-en]').forEach(element => { element.title = selected === 'ar' ? element.dataset.titleAr : element.dataset.titleEn; });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: node => ['SCRIPT', 'STYLE'].includes(node.parentElement?.tagName) || node.parentElement?.closest('[data-content-en]') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    while (walker.nextNode()) translateNode(walker.currentNode, selected);
    document.querySelectorAll('[aria-label], [title]').forEach(element => ['aria-label', 'title'].forEach(attribute => {
      if (!element.hasAttribute(attribute) || element.hasAttribute(`data-${attribute === 'title' ? 'title' : 'aria'}-en`)) return;
      const key = `original${attribute === 'title' ? 'Title' : 'Aria'}`;
      if (!element.dataset[key]) element.dataset[key] = element.getAttribute(attribute);
      const source = element.dataset[key];
      element.setAttribute(attribute, selected === 'ar' && translations[normalize(source)] ? translations[normalize(source)] : source);
    }));
    const page = location.pathname.split('/').pop() || 'index.html';
    const titles = { 'index.html': ['Ahmed Alamer | Architectural BIM Engineer', 'أحمد العامر | مهندس نمذجة معلومات مبانٍ معماري'], 'projects.html': ['Projects | Ahmed Alamer', 'المشاريع | أحمد العامر'], 'certificates.html': ['Professional Certificates | Ahmed Alamer', 'الشهادات المهنية | أحمد العامر'] };
    if (document.body.dataset.pageTitleEn) document.title = selected === 'ar' ? document.body.dataset.pageTitleAr : document.body.dataset.pageTitleEn;
    else if (titles[page]) document.title = titles[page][selected === 'ar' ? 1 : 0];
    document.querySelectorAll('[data-language-toggle]').forEach(button => {
      button.textContent = selected === 'ar' ? 'English' : 'العربية';
      button.lang = selected === 'ar' ? 'en' : 'ar';
      button.setAttribute('aria-label', selected === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    });
    localStorage.setItem(STORAGE_KEY, selected);
    document.dispatchEvent(new CustomEvent('portfolio:language', { detail: { language: selected } }));
  };
  const initial = localStorage.getItem(STORAGE_KEY) === 'ar' ? 'ar' : 'en';
  window.PortfolioI18n = { applyLanguage, language: () => document.documentElement.lang };
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('content/translations.json', { cache: 'no-store' });
      if (!response.ok) throw new Error(`Translations request failed: ${response.status}`);
      const data = await response.json();
      data.translations.forEach(item => { if (item.english && item.arabic) translations[item.english] = item.arabic; });
    } catch (error) { console.warn('Translation file could not be loaded; English remains available.', error); }
    applyLanguage(initial);
    document.addEventListener('click', event => { if (event.target.closest('[data-language-toggle]')) applyLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'); });
  });
})();
