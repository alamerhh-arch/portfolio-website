// Normalize display data without overwriting the editor's optional fields.
const text = (...values) => values.find(value => typeof value === 'string' && value.trim())?.trim() || '';
const groups = {
  pmi: ['Project Management Institute (PMI)', 'معهد إدارة المشاريع (PMI)'],
  autodesk: ['Autodesk Training Center', 'مركز Autodesk للتدريب'],
  'bim-solutions': ['BIM Solutions', 'BIM Solutions'],
  revizto: ['Revizto', 'Revizto'],
  sbc: ['Saudi Building Code', 'كود البناء السعودي'],
  other: ['Other certificates', 'شهادات أخرى']
};

export function normalizeCertificate(item, index = 0) {
  const titleEn = text(item.title_en, item.title_ar, item.title) || 'Certificate';
  const titleAr = text(item.title_ar, item.title_en, item.title) || 'شهادة';
  const category = text(item.category) || 'other';
  const group = groups[category] || groups.other;
  return {
    ...item,
    id: text(item.id) || `certificate-${index + 1}`,
    order: Number.isFinite(Number(item.order)) && Number(item.order) > 0 ? Number(item.order) : index + 1,
    image: text(item.image).replace(/^\/portfolio-website\//, '').replace(/^\//, ''),
    category,
    title_en: titleEn, title_ar: titleAr,
    issuer_en: text(item.issuer_en, item.issuer_ar, item.issuer),
    issuer_ar: text(item.issuer_ar, item.issuer_en, item.issuer),
    group_en: text(item.group_en, item.group_ar, item.group) || group[0],
    group_ar: text(item.group_ar, item.group_en, item.group) || group[1],
    alt_en: text(item.alt_en, item.alt_ar, item.alt) || titleEn,
    alt_ar: text(item.alt_ar, item.alt_en, item.alt) || titleAr
  };
}

export function visibleCertificates(items = []) {
  return items.map(normalizeCertificate)
    .filter(item => item.published !== false && item.image)
    .sort((a, b) => a.order - b.order);
}
