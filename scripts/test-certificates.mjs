import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { load } from 'cheerio';
import { normalizeCertificate, visibleCertificates } from './certificates.mjs';

const image = 'assets/certificates/autodesk-atc-acc.webp';
assert.equal(normalizeCertificate({ title_ar: 'شهادة اختبار' }).title_en, 'شهادة اختبار');
assert.equal(normalizeCertificate({ title: 'Legacy', issuer: 'Issuer' }).title_en, 'Legacy');
assert.equal(normalizeCertificate({ image: `/portfolio-website/${image}` }).image, image);
assert.equal(visibleCertificates([{}, { image, published: false }]).length, 0);
const config = fs.readFileSync('admin/config.yml', 'utf8').split('      - name: certificates')[1].split('      - name: site_settings')[0];
for (const line of config.split('\n').filter(line => line.includes('widget:') && line.includes('{'))) {
  assert.ok(line.includes('required: false'), `Certificate field still required: ${line}`);
}
assert.match(config, /widget: select\s+required: false/);
assert.match(config, /widget: list\s+required: false/);

// Exercise the real build and quality checks in isolation; never write test entries to CMS content.
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'certificate-fields-'));
try {
  for (const name of fs.readdirSync('.')) {
    if (name === '.git' || name === 'node_modules') continue;
    fs.cpSync(name, path.join(temp, name), { recursive: true });
  }
  fs.symlinkSync(path.resolve('node_modules'), path.join(temp, 'node_modules'), 'dir');
  for (const entries of [
    [{}, { image }, { image, title_ar: 'شهادة اختبار', order: 1, featured: true }, { image, title: 'Legacy', issuer: 'Legacy issuer', order: 1 }],
    []
  ]) {
    fs.writeFileSync(path.join(temp, 'content/certificates.json'), JSON.stringify({ certificates: entries }));
    for (const script of ['build-site.mjs', 'check-content.mjs', 'test-site.mjs']) {
      execFileSync(process.execPath, [`scripts/${script}`], { cwd: temp, stdio: 'pipe' });
    }
    const $ = load(fs.readFileSync(path.join(temp, 'certificates.html'), 'utf8'));
    assert.equal($('[data-certificate-card]').length, entries.length ? 3 : 0);
    if (entries.length) {
      assert.match($('body').text(), /شهادة اختبار/);
      assert.match($('body').text(), /Legacy/);
      $('[data-certificate-card] img').each((_, node) => assert.ok($(node).attr('alt')));
    }
  }
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
console.log('Optional certificate fields: image-only, Arabic-only, legacy, incomplete and empty collections passed.');
