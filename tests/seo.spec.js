// ===== ŠTO TRAŽILICA I PRETPREGLED LINKA VIDE U PRAVOM PREGLEDNIKU =====
//
// ZAŠTO POSTOJI: `index.html`, `js/i18n.js` i `scripts/build-og-image.js` navodili su
// `tests/seo.spec.js` kao branu koja čuva da se naslov i opis ne raziđu — **a datoteka
// nikad nije postojala** (`git log --diff-filter=D` prazan). Tri su datoteke tri
// mjeseca tvrdile da ih netko čuva. Ovo je ta brana.
//
// `scripts/check-seo.js` čita `<head>` S DISKA i to je dovoljno za meta-podatke. Ovdje
// se mjeri ono što disk ne može pokazati:
//   ① stranica predmeta POSTOJI na svojoj adresi i vraća 200
//   ② sadržaj je u POSLUŽENOM HTML-u, dakle vidljiv i bez izvršenog JS-a
//      (cijela poanta cigle: dotad u HTML-u nije bilo nijednog imena predmeta)
//   ③ `<html lang>` ostaje jezik GRADIVA i nakon što se `boot.js` probudi
//      (`data-lang-fixed`; bez toga čitač ekrana hrvatsku skriptu čita engleski)
//   ④ poveznica u aplikaciju stvarno otvara taj predmet
//   ⑤ `Course` shema parsira u pregledniku i imenuje isti predmet
//   ⑥ naslovnica: jedna priča na tri mjesta (ono što je §9.15 obećao braniti)
//
// ⚠️ Stranice su GENERIRANE — popis se čita iz `data/catalog.js`, ne piše ovdje.
// Ručni popis bi prvi nov predmet pregazio.

const { test, expect } = require('@playwright/test');
const { SokratCatalog } = require('../data/catalog.js');

/** Uzorak koji pokriva oba jezika i oba fakulteta, bez vrtnje svih 59. */
function uzorak() {
  const svi = SokratCatalog.all();
  const hr = svi.find((s) => SokratCatalog.uiLangOf(s) === 'hr');
  const en = svi.find((s) => SokratCatalog.uiLangOf(s) !== 'hr');
  const pfri = svi.find((s) => s.programId === 'law-integrated-hr');
  return [...new Set([hr, en, pfri].filter(Boolean))];
}

for (const s of uzorak()) {
  const jezik = SokratCatalog.uiLangOf(s) === 'hr' ? 'hr' : 'en';

  test(`stranica predmeta ${s.id} (${jezik}) je prava adresa s pravim sadržajem`, async ({ page }) => {
    const greske = [];
    page.on('pageerror', (e) => greske.push('pageerror: ' + e.message));

    // ① adresa postoji
    const resp = await page.goto(`/predmet/${s.id}.html`);
    expect(resp.status()).toBe(200);

    // ② sadržaj je u POSLUŽENOM HTML-u, ne naknadno nacrtan.
    // Mjeri se tijelo odgovora, ne DOM: DOM bi prošao i da ga je JS složio.
    const posluzeno = await resp.text();
    expect(posluzeno).toContain(s.name);
    expect(posluzeno).toContain('<h1>');
    for (const l of s.lessons) expect(posluzeno).toContain(l.name);

    // Jedan h1 po dokumentu — `index.html` ih nosi 15 jer je SPA; ovdje je stranica stranica.
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveText(s.name);

    // ③ jezik gradiva preživi boot.js (koji inače upiše jezik SUČELJA)
    await expect(page.locator('html')).toHaveAttribute('lang', jezik);

    // ⑤ shema parsira i imenuje isti predmet
    const sheme = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(sheme.length).toBeGreaterThan(0);
    const tipovi = sheme.map((t) => JSON.parse(t)); // puca ako shema ne parsira — i to je tvrdnja
    const kurs = tipovi.find((o) => o['@type'] === 'Course');
    expect(kurs, 'stranica predmeta mora nositi Course shemu').toBeTruthy();
    expect(kurs.name).toBe(s.name);
    expect(kurs.url).toContain(`/predmet/${s.id}.html`);

    expect(greske).toEqual([]);
  });
}

test('poveznica sa stranice predmeta otvara taj predmet u aplikaciji', async ({ page }) => {
  const s = uzorak()[0];
  await page.goto(`/predmet/${s.id}.html`);
  // Bira se po ODREDIŠTU, ne po klasi: klasa je stvar izgleda i mijenja se, a tvrdnja
  // ovog testa je da poveznica vodi u TAJ predmet. (Prva verzija je gađala `.legal-cta`,
  // klasu koju sam izmislio i poslije zamijenio postojećom — test je tad visio 2 minute.)
  await page.locator(`a[href="/#/subject/${s.id}"]`).click();
  // ④ aplikacija preuzima rutu iz hasha i pokaže lekcije TOG predmeta.
  await expect.poll(() => page.evaluate(() => location.hash), { timeout: 10000 })
    .toContain(`#/subject/${s.id}`);
  await expect(page.locator('#lessons-page.active, .lessons-page.active')).toBeVisible();
});

test('čvor kataloga vodi na svaki predmet, i to iz posluženog HTML-a', async ({ page }) => {
  const resp = await page.goto('/predmeti.html');
  expect(resp.status()).toBe(200);
  const posluzeno = await resp.text();
  // Svaki predmet iz kataloga mora biti dosežljiv s čvora — inače tražilica dio ne nađe.
  for (const s of SokratCatalog.all()) {
    expect(posluzeno, `čvor ne vodi na ${s.id}`).toContain(`/predmet/${s.id}.html`);
  }
});

test('naslovnica: jedna priča na tri mjesta (§9.15)', async ({ page }) => {
  await page.goto('/');
  const uzmi = (sel, atr) => page.locator(sel).first().getAttribute(atr);
  const naslov = await page.title();
  expect(await uzmi('meta[property="og:title"]', 'content')).toBe(naslov);
  const opis = await uzmi('meta[name="description"]', 'content');
  expect(await uzmi('meta[name="twitter:description"]', 'content')).toBe(opis);
  // Kartica pretpregleda: mreže traže 1200×630, a kvadratna ikona je zatečeni kvar iz §9.15.
  expect(await uzmi('meta[property="og:image:width"]', 'content')).toBe('1200');
  expect(await uzmi('meta[property="og:image:height"]', 'content')).toBe('630');
});
