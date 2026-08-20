import fs from 'node:fs';
import path from 'node:path';
import sizeOf from 'image-size';
import { load } from 'cheerio';

const root = process.cwd();
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const projects = read('content/projects.json').projects;
const certificates = read('content/certificates.json').certificates;
const errors = [];
const unique = (items, key, label) => {
  const values = items.map(item => item[key]);
  values.forEach((value, index) => { if (!value || values.indexOf(value) !== index) errors.push(`${label}: invalid or duplicate ${key} "${value}"`); });
};
const image = (src, label) => {
  const file = path.join(root, String(src || '').replace(/^\/portfolio-website\//, '').replace(/^\//, ''));
  if (!fs.existsSync(file)) return errors.push(`${label}: missing ${src}`);
  try { sizeOf(fs.readFileSync(file)); } catch { errors.push(`${label}: unreadable image ${src}`); }
};
unique(projects, 'slug', 'Projects'); unique(projects, 'order', 'Projects');
unique(certificates, 'id', 'Certificates'); unique(certificates, 'order', 'Certificates');
for (const project of projects) {
  for (const key of ['title_en', 'title_ar', 'summary_en', 'summary_ar']) if (!project[key]) errors.push(`${project.slug}: missing ${key}`);
  image(project.coverImage, project.slug); image(project.detailCoverImage, project.slug);
  if (!project.pending && !project.groups?.length) errors.push(`${project.slug}: no gallery groups`);
  project.groups?.forEach(group => group.images?.forEach(item => image(item.src, project.slug)));
}
for (const item of certificates) {
  for (const key of ['title_en', 'title_ar', 'issuer_en', 'issuer_ar', 'alt_en', 'alt_ar']) if (!item[key]) errors.push(`${item.id}: missing ${key}`);
  image(item.image, item.id);
}
if (projects.filter(item => item.home && item.published !== false).length !== 8) errors.push('Homepage must contain exactly 8 projects.');
if (certificates.filter(item => item.featured && item.published !== false).length !== 8) errors.push('Homepage must contain exactly 8 certificates.');
const generatedPages = ['index.html', 'projects.html', 'certificates.html'];
if (fs.existsSync(path.join(root, 'projects'))) generatedPages.push(...fs.readdirSync(path.join(root, 'projects')).map(slug => `projects/${slug}/index.html`));
for (const page of generatedPages) {
  const file = path.join(root, page);
  if (!fs.existsSync(file)) { errors.push(`Missing generated page: ${page}`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const $ = load(html);
  $('img[src]').each((_, node) => { const src = $(node).attr('src'); if (src && (!$(node).attr('width') || !$(node).attr('height'))) errors.push(`${page}: image lacks width/height: ${src}`); });
  if ((html.match(/Generated from content/g) || []).length !== 1) errors.push(`${page}: generated marker is missing or duplicated`);
  if (page.startsWith('projects/')) {
    for (const selector of ['link[rel="canonical"]', 'meta[property="og:title"]', 'meta[property="og:description"]', 'meta[property="og:image"]', 'script[type="application/ld+json"]']) if (!$(selector).length) errors.push(`${page}: missing SEO element ${selector}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Content valid: ${projects.length} projects, ${certificates.length} certificates, all bilingual fields and images verified.`);
