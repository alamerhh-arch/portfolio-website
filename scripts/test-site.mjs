import fs from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

const root = process.cwd();
const pages = ['index.html', 'projects.html', 'certificates.html', ...fs.readdirSync('projects', { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `projects/${entry.name}/index.html`)];
const expectedStyleVersion = '42';
const expectedHomeSocialImage = 'https://alamerhh-arch.github.io/portfolio-website/assets/social/bim-coordination-card.webp';
const failures = [];
const isExternal = value => /^(https?:|mailto:|tel:|#)/.test(value);
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page), 'utf8');
  const $ = load(html);
  const ids = new Set();
  $('[id]').each((_, node) => { const id = $(node).attr('id'); if (ids.has(id)) failures.push(`${page}: duplicate id #${id}`); ids.add(id); });
  $('a[href]').each((_, node) => {
    const href = $(node).attr('href');
    if (!href || isExternal(href)) return;
    const base = $('base').attr('href');
    const from = base ? path.resolve(path.dirname(path.join(root, page)), base) : path.dirname(path.join(root, page));
    const target = href.split(/[?#]/)[0];
    const resolved = path.resolve(from, target || '.');
    const candidate = target.endsWith('/') ? path.join(resolved, 'index.html') : resolved;
    if (!fs.existsSync(candidate)) failures.push(`${page}: broken internal link ${href}`);
  });
  $('img[src]').each((_, node) => {
    const image = $(node); const src = image.attr('src');
    if (!src) return;
    if (!image.attr('alt')) failures.push(`${page}: missing alt text for ${src}`);
    if (!image.attr('width') || !image.attr('height')) failures.push(`${page}: missing dimensions for ${src}`);
    if (!image.attr('decoding')) failures.push(`${page}: missing decoding policy for ${src}`);
  });
  if (!$('meta[name="viewport"]').length) failures.push(`${page}: missing mobile viewport`);
  if ($('script[src="image-protection.js?v=1"]').length !== 1) failures.push(`${page}: missing image protection layer`);
  if ($('link[rel="stylesheet"][href="styles.css?v=' + expectedStyleVersion + '"]').length !== 1) failures.push(`${page}: stale or missing stylesheet cache version`);
  if (!$('link[rel="canonical"]').length) failures.push(`${page}: missing canonical URL`);
  if (!$('meta[property="og:image:width"]').length || !$('meta[property="og:image:height"]').length || !$('meta[property="og:image:alt"]').length) failures.push(`${page}: incomplete social image metadata`);
  $('script[type="application/ld+json"]').each((_, node) => { try { JSON.parse($(node).text()); } catch { failures.push(`${page}: invalid JSON-LD`); } });
  $('[data-content-en]').each((_, node) => { if (!$(node).attr('data-content-ar')) failures.push(`${page}: bilingual field missing Arabic value`); });
}
{
  const $ = load(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
  if ($('meta[property="og:image"]').attr('content') !== expectedHomeSocialImage) failures.push('index.html: homepage social preview must use the BIM coordination card');
  if ($('meta[name="twitter:image"]').attr('content') !== expectedHomeSocialImage) failures.push('index.html: Twitter preview must use the BIM coordination card');
  if ($('meta[property="og:image:width"]').attr('content') !== '1200' || $('meta[property="og:image:height"]').attr('content') !== '630') failures.push('index.html: BIM social card must be 1200x630');
}
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
for (const query of ['@media (max-width: 960px)', '@media (max-width: 680px)']) if (!css.includes(query)) failures.push(`styles.css: missing responsive breakpoint ${query}`);
if (!css.includes(':focus-visible')) failures.push('styles.css: missing visible keyboard focus styling');
if (!css.includes('.protected-image-surface::after')) failures.push('styles.css: missing protected image overlay');
if (/\.orbit\s*\{[^}]*inset\s*:\s*50%/s.test(css)) failures.push('styles.css: orbit centering must use physical top/left coordinates so RTL cannot move it');
if (!/\.orbit\s*\{[^}]*top\s*:\s*50%[^}]*left\s*:\s*50%/s.test(css)) failures.push('styles.css: orbit centering coordinates are missing');
if (failures.length) { console.error(failures.join('\n')); process.exit(1); }
console.log(`Site tests passed: ${pages.length} pages, internal links, image stability, SEO, bilingual fields, and responsive foundations.`);
