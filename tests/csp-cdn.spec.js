// csp-cdn.spec.js — F6 ②/0e (MCP_SECURITY N2): `script-src` dopušta TOČNE CDN datoteke, ne hostove.
//
// Lokalni poslužitelj ne šalje CSP, pa ga ovdje NAMEĆEMO dokumentu: vrijednost se čita iz
// `vercel.json` u trenutku testa — mjeri se ono što stvarno ide na produkciju, ne kopija.
// CDN se ne dira: napadačeva i kontrolna adresa se poslužuju lokalno kroz `page.route`, a CSP ih
// sudi po ADRESI, kao i pravi preglednik.
//
//   ① napad (pokus N2 s oslabljenim ②/0d): `iframe srcdoc` učita skriptu s jsdelivr `/gh/…` →
//      mora biti blokirana (securitypolicyviolation), ništa se ne izvrši
//   ② KONTROLA: isti srcdoc s TOČNOM dopuštenom datotekom → izvrši se. Bez nje bi zeleno moglo
//      značiti samo „srcdoc ovdje ne radi" ili „CSP nije ni primijenjen"
//   ③ stranica s tim CSP-om i dalje radi: paket `study` (KaTeX) bez ijednog script-src kršenja
const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

const CSP = (() => {
  const v = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'vercel.json'), 'utf8'));
  const h = v.headers.flatMap((x) => x.headers).find((x) => x.key === 'Content-Security-Policy');
  return h.value;
})();
const NAPAD = 'https://cdn.jsdelivr.net/gh/napadac/alat@1.0.0/citaj-sesiju.js';
const DOPUSTENO = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/auto-render.min.js';

async function sCspom(page) {
  await page.addInitScript(() => {
    window.__csp = [];
    document.addEventListener('securitypolicyviolation', (e) => window.__csp.push(e.violatedDirective + ' ' + e.blockedURI));
  });
  await page.route('**/*', async (route) => {
    const req = route.request();
    if (req.url() === NAPAD) return route.fulfill({ contentType: 'text/javascript', body: 'parent.__napad = 1;' });
    if (req.resourceType() !== 'document' || !req.url().startsWith('http://localhost')) return route.fallback();
    const odg = await route.fetch();
    return route.fulfill({ response: odg, headers: Object.assign({}, odg.headers(), { 'content-security-policy': CSP }) });
  });
}

test('CSP iz vercel.json: skripta s jsdelivr /gh/ u srcdoc BLOKIRANA (kontrola: dopuštena datoteka se izvrši)', async ({ page }) => {
  const scriptSrc = (CSP.match(/script-src[^;]*/) || [''])[0];
  expect(scriptSrc, 'script-src i dalje dopušta cijeli jsdelivr host').not.toMatch(/https:\/\/cdn\.jsdelivr\.net(\s|$)/);
  await sCspom(page);
  // kontrolna adresa: dopuštena datoteka, ali poslužena lokalno s oznakom izvršavanja
  await page.route(DOPUSTENO, (r) => r.fulfill({ contentType: 'text/javascript', body: 'parent.__kontrola = 1;' }));
  await page.goto('/');

  await page.evaluate(({ napad, dopusteno }) => {
    for (const [id, src] of [['n2e-napad', napad], ['n2e-kontrola', dopusteno]]) {
      const f = document.createElement('iframe');
      f.id = id;
      f.srcdoc = '<script src="' + src + '"></scr' + 'ipt>';
      document.body.appendChild(f);
    }
  }, { napad: NAPAD, dopusteno: DOPUSTENO });

  await expect.poll(() => page.evaluate(() => window.__kontrola || 0), {
    message: 'KONTROLA: dopuštena datoteka se u srcdoc nije izvršila — pokus ništa ne dokazuje', timeout: 5000
  }).toBe(1);
  expect(await page.evaluate(() => window.__napad || 0), 'napadačeva skripta s jsdelivr /gh/ se IZVRŠILA').toBe(0);
});

test('stranica s produkcijskim CSP-om radi: paket study učita KaTeX bez ijednog script-src kršenja', async ({ page }) => {
  await sCspom(page);
  await page.goto('/');
  await page.waitForFunction(() => window.SokratLoad && typeof window.SokratLoad.paket === 'function');
  await page.evaluate(() => window.SokratLoad.paket('study'));
  await page.waitForFunction(() => window.katex && typeof window.renderMathInElement === 'function', null, { timeout: 15000 });
  const krsenja = await page.evaluate(() => window.__csp.filter((x) => /^script-src/.test(x)));
  expect(krsenja).toEqual([]);
});
