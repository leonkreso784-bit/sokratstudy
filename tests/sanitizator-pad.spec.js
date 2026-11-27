// sanitizator-pad.spec.js — F6 ②/0d (MCP_SECURITY N2): kad DOMPurify NE STIGNE, sadržaj s HTML-om
// se prikazuje kao TEKST i ne izvršava ništa.
//
// Povod (dionica A, 29.09.): raw fallback + `iframe srcdoc` učitao je skriptu s dopuštenog CDN-a i
// uz produkcijski CSP pročitao sesiju. Ovdje se mjeri sam renderer, u pravom pregledniku, s
// KONTROLOM: isti sadržaj upisan izravno u `innerHTML` MORA izvršiti skriptu. Bez kontrole bi
// zeleno moglo značiti samo „pokus je pokvaren" (npr. preglednik koji `srcdoc` ne izvršava).
// CSP (②/0e) se ovdje NE mjeri — lokalni poslužitelj ga ne šalje, i to je namjerno: renderer mora
// držati i kad CSP ne pomogne.
const { test, expect } = require('@playwright/test');

const ZLO = '<p>vidljiv tekst</p>'
  + '<iframe srcdoc="<script>parent.__n2 = (parent.__n2 || 0) + 1</script>"></iframe>'
  + '<img src="x-ne-postoji.png" onerror="window.__n2img = 1">';

test('DOMPurify stiže s NAŠE domene i prolazi SRI (Leon, anketa 30.09.: vlastito posluživanje)', async ({ page }) => {
  const izvori = [];
  page.on('request', (r) => { if (/purify/i.test(r.url())) izvori.push(new URL(r.url()).host); });
  await page.goto('/');
  await page.waitForFunction(() => window.SokratLoad && typeof window.SokratLoad.paket === 'function');
  await page.evaluate(() => window.SokratLoad.paket('study'));
  await page.waitForFunction(() => window.DOMPurify && typeof window.DOMPurify.sanitize === 'function', null, { timeout: 10000 });
  expect(izvori.length, 'DOMPurify nije ni zatražen').toBeGreaterThan(0);
  expect(izvori.filter((h) => h !== new URL(page.url()).host), 'DOMPurify je zatražen s tuđe domene').toEqual([]);
});

test('N2: bez DOMPurifyja legacy-html ne izvršava ništa (kontrola: sirov isti sadržaj izvrši)', async ({ page }) => {
  let blokirano = 0;
  await page.route('**/purify.min.js*', (r) => { blokirano++; return r.abort(); });
  await page.goto('/');
  await page.waitForFunction(() => window.SokratLoad && typeof window.SokratLoad.paket === 'function');
  await page.evaluate(() => window.SokratLoad.paket('study'));
  await page.waitForFunction(() => typeof window.renderContentBlocks === 'function');

  expect(blokirano, 'zahtjev za DOMPurify nije ni poslan — pokus ne mjeri pad sanitizatora').toBeGreaterThan(0);
  expect(await page.evaluate(() => typeof window.DOMPurify), 'DOMPurify je ipak učitan').toBe('undefined');

  // ① renderer
  const renderer = await page.evaluate(async (zlo) => {
    const el = document.createElement('div');
    el.id = 'n2-renderer';
    document.body.appendChild(el);
    el.innerHTML = window.renderContentBlocks([{ type: 'legacy-html', html: zlo }]);
    await new Promise((r) => setTimeout(r, 1500));
    return { n2: window.__n2 || 0, img: window.__n2img || 0,
      oznake: el.querySelectorAll('iframe, img, script, p').length, tekst: el.textContent };
  }, ZLO);
  expect(renderer.oznake, 'renderer je napravio HTML oznake').toBe(0);
  expect(renderer.n2, 'skripta iz srcdoc se IZVRŠILA kroz renderer').toBe(0);
  expect(renderer.img, 'onerror se IZVRŠIO kroz renderer').toBe(0);
  expect(renderer.tekst).toContain('vidljiv tekst');

  // ② kontrola: isti sadržaj bez renderera — pokus mora biti živ
  await page.evaluate((zlo) => {
    const el = document.createElement('div');
    el.id = 'n2-kontrola';
    document.body.appendChild(el);
    el.innerHTML = zlo;
  }, ZLO);
  await expect.poll(() => page.evaluate(() => window.__n2 || 0), {
    message: 'KONTROLA: sirov sadržaj nije izvršio skriptu — pokus ništa ne dokazuje', timeout: 5000
  }).toBe(1);
});
