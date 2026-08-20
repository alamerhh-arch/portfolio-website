import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';
import sizeOf from 'image-size';

const root = process.cwd();
const baseUrl = 'https://alamerhh-arch.github.io/portfolio-website';
const assetVersion = '41';
const readJson = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const projects = readJson('content/projects.json').projects.filter(item => item.published !== false).sort((a, b) => a.order - b.order);
const certificates = readJson('content/certificates.json').certificates.filter(item => item.published !== false).sort((a, b) => a.order - b.order);
const site = readJson('content/site.json');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const attrs = (en, ar) => `data-content-en="${esc(en)}" data-content-ar="${esc(ar || en)}"`;
const altAttrs = (en, ar) => `alt="${esc(en)}" data-alt-en="${esc(en)}" data-alt-ar="${esc(ar || en)}"`;
const localPath = src => path.join(root, String(src).replace(/^\/portfolio-website\//, '').replace(/^\//, ''));
const dimensions = (src, fallback = {}) => {
  try { return sizeOf(fs.readFileSync(localPath(src))); }
  catch { return { width: fallback.width || 1, height: fallback.height || 1 }; }
};
const write = (file, value) => {
  const target = path.join(root, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const clean = value.replace(/\n?<!-- Generated from content\/\*\.json\. Run npm run build; do not edit generated cards manually\. -->/g, '').replace(/[ \t]+$/gm, '');
  fs.writeFileSync(target, clean.replace(/<html([^>]*)>/, '<html$1>\n<!-- Generated from content/*.json. Run npm run build; do not edit generated cards manually. -->'), 'utf8');
};
const imageTag = ({ src, en, ar, eager = false, fallback = {} }) => {
  const { width, height } = dimensions(src, fallback);
  return `<img src="${esc(src)}" ${altAttrs(en, ar)} width="${width}" height="${height}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>`;
};

const cardProject = (project, homepage = false) => {
  const titleEn = homepage ? (project.homeTitle_en || project.title_en) : project.title_en;
  const titleAr = homepage ? (project.homeTitle_ar || project.title_ar) : project.title_ar;
  if (project.pending) return `<article class="${homepage ? 'home-project-card home-project-card-pending reveal' : 'gallery-project-card gallery-project-pending'}" ${homepage ? '' : `data-category="${esc(project.filters.join(' '))}"`} aria-label="${esc(project.title_en)} case study is in preparation"><div class="${homepage ? 'home-project-thumb home-project-thumb-taqa' : 'gallery-cover gallery-cover-taqa'}"><span>${String(project.order).padStart(2, '0')}</span><strong>TAQA<br>MODON</strong><small ${attrs(project.type_en, project.type_ar)}>${esc(project.type_en)}</small></div><div class="${homepage ? 'home-project-copy' : 'gallery-card-copy'}"><span ${attrs(project.label_en, project.label_ar)}>${esc(project.label_en)}</span><h${homepage ? '3' : '2'} ${attrs(titleEn, titleAr)}>${esc(titleEn)}</h${homepage ? '3' : '2'}><b ${attrs(homepage ? 'Case study in preparation' : 'In preparation', homepage ? 'دراسة الحالة قيد الإعداد' : 'قيد الإعداد')}>${homepage ? 'Case study in preparation' : 'In preparation'}</b></div></article>`;
  const count = project.groups.reduce((sum, group) => sum + group.images.length, 0);
  const image = imageTag({ src: project.coverImage, en: `${titleEn} project preview`, ar: `معاينة مشروع ${titleAr}`, fallback: { width: project.coverWidth, height: project.coverHeight } });
  if (!homepage) return `<a class="gallery-project-card" data-category="${esc(project.filters.join(' '))}" href="projects/${esc(project.slug)}/"><div class="gallery-cover">${image}<span>${count} selected sheets</span></div><div class="gallery-card-copy"><span ${attrs(project.label_en, project.label_ar)}>${esc(project.label_en)}</span><h2 ${attrs(project.title_en, project.title_ar)}>${esc(project.title_en)}</h2><b>View gallery ↗</b></div></a>`;
  return `<a class="home-project-card${project.featured ? ' home-project-featured' : ''} reveal" href="projects/${esc(project.slug)}/"><div class="home-project-thumb${project.logo ? ' home-project-thumb-logo' : ''}">${image}<span>${String(project.order).padStart(2, '0')}</span></div><div class="home-project-copy"><span ${attrs(project.label_en, project.label_ar)}>${esc(project.label_en)}</span><h3 ${attrs(titleEn, titleAr)}>${esc(titleEn)}</h3>${project.featured ? `<p ${attrs(project.summary_en, project.summary_ar)}>${esc(project.summary_en)}</p>` : ''}<b>${project.featured ? 'View case study' : 'View project'} <i>↗</i></b></div></a>`;
};

const cardCertificate = (item, action, reveal = false) => `<a class="certificate-card${reveal ? ' reveal' : ''}" data-certificate-card data-category="${esc(item.category)}" href="${esc(item.image)}" target="_blank" rel="noopener noreferrer"><div class="certificate-preview">${imageTag({ src: item.image, en: item.alt_en, ar: item.alt_ar, fallback: item })}</div><div class="certificate-copy"><span ${attrs(item.issuer_en, item.issuer_ar)}>${esc(item.issuer_en)}</span><h3 ${attrs(item.title_en, item.title_ar)}>${esc(item.title_en)}</h3><b>${action} <span>↗</span></b></div></a>`;

function buildIndex() {
  const $ = load(fs.readFileSync(path.join(root, 'index.html'), 'utf8'), { decodeEntities: false });
  const home = projects.filter(item => item.home);
  $('.home-project-featured-grid').html(home.filter(item => item.featured).map(item => cardProject(item, true)).join('\n'));
  $('.home-project-compact-grid').html(home.filter(item => !item.featured).map(item => cardProject(item, true)).join('\n'));
  $('.certificate-showcase-grid').html(certificates.filter(item => item.featured).slice(0, 8).map(item => cardCertificate(item, 'Open certificate', true)).join('\n'));
  const socialProject = home.find(item => item.featured && !item.pending) || home.find(item => !item.pending);
  const socialImage = `${baseUrl}/${socialProject.detailCoverImage}`;
  const socialSize = dimensions(socialProject.detailCoverImage, { width: socialProject.detailCoverWidth, height: socialProject.detailCoverHeight });
  $('meta[property="og:image"]').attr('content', socialImage);
  $('meta[property="og:image:alt"]').attr('content', `${socialProject.title_en} — selected work by Ahmed Alamer`);
  ensureMeta($, 'property', 'og:image:width', String(socialSize.width));
  ensureMeta($, 'property', 'og:image:height', String(socialSize.height));
  $('meta[name="twitter:image"]').attr('content', socialImage);
  ensureMeta($, 'name', 'twitter:image:alt', `${socialProject.title_en} — selected work by Ahmed Alamer`);
  patchSite($);
  write('index.html', $.html());
}

function buildProjectsIndex() {
  const $ = load(fs.readFileSync(path.join(root, 'projects.html'), 'utf8'), { decodeEntities: false });
  $('.projects-library').html(projects.map(item => cardProject(item)).join('\n'));
  $('[data-filter]').each((_, node) => {
    const filter = $(node).attr('data-filter');
    const count = filter === 'all' ? projects.length : projects.filter(item => item.filters.includes(filter)).length;
    $(node).find('b').text(String(count));
  });
  $('.projects-index-intro div').eq(0).find('strong').text(String(projects.length));
  $('.projects-index-intro div').eq(1).find('strong').text(String(projects.reduce((sum, item) => sum + item.groups.reduce((s, group) => s + group.images.length, 0), 0)));
  const socialProject = projects.find(item => item.featured && !item.pending) || projects.find(item => !item.pending);
  patchSocialImage($, socialProject.detailCoverImage, `${socialProject.title_en} — selected project by Ahmed Alamer`, { width: socialProject.detailCoverWidth, height: socialProject.detailCoverHeight });
  patchSite($);
  write('projects.html', $.html());
}

function buildCertificates() {
  const $ = load(fs.readFileSync(path.join(root, 'certificates.html'), 'utf8'), { decodeEntities: false });
  $('[data-certificate-group]').remove();
  const categories = [...new Set(certificates.map(item => item.category))];
  categories.forEach((category, index) => {
    const items = certificates.filter(item => item.category === category);
    const groupEn = items[0].group_en;
    const groupAr = items[0].group_ar;
    $('.certificate-library-section').append(`<section class="certificate-group" data-certificate-group data-category="${esc(category)}"><div class="certificate-group-heading"><div><span>${String(index + 1).padStart(2, '0')}</span><h2 ${attrs(groupEn, groupAr)}>${esc(groupEn)}</h2></div><b>${items.length} certificates</b></div><div class="certificate-grid">${items.map(item => cardCertificate(item, 'Inspect certificate')).join('\n')}</div></section>`);
  });
  $('[data-certificate-filter]').each((_, node) => {
    const category = $(node).attr('data-certificate-filter');
    $(node).find('b').text(String(category === 'all' ? certificates.length : certificates.filter(item => item.category === category).length));
  });
  $('.certificates-index-intro div').eq(0).find('strong').text(String(certificates.length));
  $('.certificates-index-intro div').eq(1).find('strong').text(String(categories.length).padStart(2, '0'));
  const socialCertificate = certificates.find(item => item.featured) || certificates[0];
  patchSocialImage($, socialCertificate.image, `${socialCertificate.title_en} certificate earned by Ahmed Alamer`, socialCertificate);
  patchSite($);
  write('certificates.html', $.html());
}

function patchSite($) {
  $('link[rel="stylesheet"][href^="styles.css?v="]').attr('href', `styles.css?v=${assetVersion}`);
  $('a[href^="mailto:"]').attr('href', `mailto:${site.contact.email}`);
  $('a[href^="tel:"]').attr('href', `tel:${site.contact.phoneLink}`);
  $('a[href*="linkedin.com"]').attr('href', site.contact.linkedin);
  $('a[href$="ahmed-alamer-cv.pdf"]').attr('href', site.contact.cv);
}

function ensureMeta($, attribute, key, content) {
  let element = $(`meta[${attribute}="${key}"]`);
  if (!element.length) { $('head').append(`<meta ${attribute}="${esc(key)}" content="${esc(content)}">`); element = $(`meta[${attribute}="${key}"]`); }
  element.attr('content', content);
}

function patchSocialImage($, src, alt, fallback = {}) {
  const url = `${baseUrl}/${src}`;
  const size = dimensions(src, fallback);
  ensureMeta($, 'property', 'og:image', url);
  ensureMeta($, 'property', 'og:image:width', String(size.width));
  ensureMeta($, 'property', 'og:image:height', String(size.height));
  ensureMeta($, 'property', 'og:image:alt', alt);
  ensureMeta($, 'name', 'twitter:image', url);
  ensureMeta($, 'name', 'twitter:image:alt', alt);
}

function buildProject(project) {
  const $ = load(fs.readFileSync(path.join(root, 'templates/project.html'), 'utf8'), { decodeEntities: false });
  const url = `${baseUrl}/projects/${project.slug}/`;
  const cover = `${baseUrl}/${project.detailCoverImage}`;
  $('head').prepend('<base href="../../">');
  $('title').text(`${project.title_en} | Ahmed Alamer`);
  $('body').attr({ 'data-page-title-en': `${project.title_en} | Ahmed Alamer`, 'data-page-title-ar': `${project.title_ar} | أحمد العامر` });
  $('meta[name="description"]').attr('content', project.summary_en);
  $('[data-project-canonical]').attr('href', url);
  $('[data-project-og-title]').attr('content', `${project.title_en} | Ahmed Alamer`);
  $('[data-project-og-description]').attr('content', project.summary_en);
  $('[data-project-og-url]').attr('content', url);
  $('[data-project-og-image]').attr('content', cover);
  const socialSize = dimensions(project.detailCoverImage, { width: project.detailCoverWidth, height: project.detailCoverHeight });
  $('head').append(`<meta property="og:image:width" content="${socialSize.width}"><meta property="og:image:height" content="${socialSize.height}"><meta property="og:image:alt" content="${esc(`${project.title_en} project by Ahmed Alamer`)}"><meta property="og:locale" content="en_US"><meta property="og:locale:alternate" content="ar_SA"><meta name="twitter:title" content="${esc(project.title_en)}"><meta name="twitter:description" content="${esc(project.summary_en)}"><meta name="twitter:image" content="${esc(cover)}"><meta name="twitter:image:alt" content="${esc(`${project.title_en} project by Ahmed Alamer`)}"><link rel="alternate" hreflang="x-default" href="${esc(url)}"><link rel="alternate" hreflang="en" href="${esc(url)}"><script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title_en, alternateName: project.title_ar, description: project.summary_en, url, image: { '@type': 'ImageObject', url: cover, width: socialSize.width, height: socialSize.height }, creator: { '@type': 'Person', name: 'Ahmed Alamer', jobTitle: 'Architectural BIM Engineer' }, inLanguage: ['en', 'ar'] }).replace(/<\//g, '<\\/')}</script>`);
  const set = (selector, en, ar) => $(selector).text(en).attr('data-content-en', en).attr('data-content-ar', ar || en);
  set('[data-project-category]', project.category_en, project.category_ar);
  set('[data-project-title]', project.title_en, project.title_ar);
  set('[data-project-summary]', project.summary_en, project.summary_ar);
  set('[data-project-type]', project.type_en, project.type_ar);
  set('[data-project-role]', project.role_en, project.role_ar);
  set('[data-project-scope]', project.scope_en, project.scope_ar);
  set('[data-project-stage]', project.stage_en, project.stage_ar);
  $('[data-project-tools]').text(project.tools);
  const total = project.groups.reduce((sum, group) => sum + group.images.length, 0);
  $('[data-project-count]').text(String(total));
  const coverDims = dimensions(project.detailCoverImage, { width: project.detailCoverWidth, height: project.detailCoverHeight });
  $('[data-project-cover]').attr({ src: project.detailCoverImage, width: coverDims.width, height: coverDims.height, loading: 'eager', decoding: 'async', fetchpriority: 'high', alt: `${project.title_en} project cover`, 'data-alt-en': `${project.title_en} project cover`, 'data-alt-ar': `غلاف مشروع ${project.title_ar}` });
  const gallery = project.groups.map((group, groupIndex) => `<section class="gallery-group"><div class="gallery-group-heading"><h3 ${attrs(group.label_en, group.label_ar)}>${esc(group.label_en)}</h3><span>${group.images.length} images</span></div><div class="project-image-grid">${group.images.map((image, imageIndex) => `<button type="button" class="gallery-image-button" data-image-src="${esc(image.src)}" data-caption-en="${esc(image.alt_en)}" data-caption-ar="${esc(image.alt_ar)}"><span>${String(groupIndex + 1).padStart(2, '0')}.${String(imageIndex + 1).padStart(2, '0')}</span>${imageTag({ src: image.src, en: image.alt_en, ar: image.alt_ar, fallback: image })}</button>`).join('')}</div></section>`).join('\n');
  $('[data-gallery-root]').html(gallery);
  if (project.video?.id) {
    $('[data-project-video-section]').removeAttr('hidden');
    $('[data-project-video]').attr({ src: `https://www.youtube-nocookie.com/embed/${project.video.id}`, title: project.video.title_en, 'data-title-en': project.video.title_en, 'data-title-ar': project.video.title_ar || project.video.title_en });
    $('[data-project-video-link]').attr('href', `https://youtu.be/${project.video.id}`);
  } else $('[data-project-video-section]').remove();
  $('script[src^="projects.js"]').attr('src', 'project-gallery.js?v=1');
  patchSite($);
  write(`projects/${project.slug}/index.html`, $.html());
}

function buildLegacyRedirect() {
  write('project.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${baseUrl}/projects.html"><title>Project moved | Ahmed Alamer</title></head><body><p>This project page has moved. <a href="projects.html">Browse all projects</a>.</p><script>const id=new URLSearchParams(location.search).get('id');if(id&&/^[a-z0-9-]+$/.test(id))location.replace('projects/'+id+'/');</script></body></html>`);
}

function buildSitemap() {
  const urls = [
    [`${baseUrl}/`, '1.0'], [`${baseUrl}/projects.html`, '0.9'],
    ...projects.filter(item => !item.pending).map(item => [`${baseUrl}/projects/${item.slug}/`, '0.8']),
    [`${baseUrl}/certificates.html`, '0.8']
  ];
  fs.writeFileSync(path.join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(([url, priority]) => `  <url><loc>${url}</loc><priority>${priority}</priority></url>`).join('\n')}\n</urlset>\n`);
}

buildIndex();
buildProjectsIndex();
buildCertificates();
projects.filter(item => !item.pending).forEach(buildProject);
buildLegacyRedirect();
buildSitemap();
console.log(`Built ${projects.length - projects.filter(item => item.pending).length} project pages, ${projects.length} project cards, and ${certificates.length} certificates.`);
