// Google Ads / pravne stranice: statične, crawlable, bez overflowa.
const { test, expect } = require('@playwright/test');

const PAGES = [
  { url: '/privacy.html', h1: 'Privacy Policy' },
  { url: '/terms.html', h1: 'Terms of Use' },
  { url: '/faq.html', h1: 'Frequently Asked Questions' },
  { url: '/contact.html', h1: 'Contact' },
  { url: '/ai.html', h1: 'Connect your AI to Sokrat' },
];

for (const p of PAGES) {
  test(`legal page ${p.url} renders without errors or overflow`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));

    const resp = await page.goto(p.url);
    expect(resp.status()).toBe(200);

    // `:visible` — dvojezične stranice (F3/1) nose DVA h1, a vidi se jedan.
    await expect(page.locator('h1:visible')).toHaveText(p.h1);
    await expect(page.locator('.legal-nav .legal-logo')).toBeVisible();
    await expect(page.locator('.legal-footer nav a[href="privacy.html"]')).toBeVisible();

    // Kontakt email mora biti prisutan (Google Ads: provjerljiv kontakt)
    await expect(page.locator('a[href^="mailto:"]').first()).toBeAttached();

    const vw = page.viewportSize().width;
    const docScrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docScrollW).toBeLessThanOrEqual(vw + 1);

    expect(errors).toEqual([]);
  });
}

// F1/5 (2026-09-06): pravne stranice prate UREĐAJ kao i aplikacija (F1/3) — do tada nisu imale ni
// `data-theme` ni `boot.js`, pa je korisnik na tamnom telefonu dobivao crn katalog i bijela Pravila.
// Mjeri se ISCRTANO (atribut na <html>, `color-scheme`, izračunata pozadina <body> == token teme),
// ne prisutnost skripte. Imena tema su odluka iz F1/3 (`boot.js` ZADANA), ne kopija palete.
const hexUrgb = (hex) => {
  const h = hex.replace('#', '');
  const p = h.length === 3 ? h.split('').map((c) => c + c) : [h.slice(0, 2), h.slice(2, 4), h.slice(4, 6)];
  return 'rgb(' + p.map((x) => parseInt(x, 16)).join(', ') + ')';
};
for (const [shema, tema] of [['dark', 'carbon'], ['light', 'academic']]) {
  test(`legal pages follow the device colour scheme (${shema} → ${tema})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: shema });
    for (const p of PAGES) {
      await page.goto(p.url);
      const s = await page.evaluate(() => ({
        tema: document.documentElement.getAttribute('data-theme'),
        shema: document.documentElement.style.colorScheme,
        bg: getComputedStyle(document.body).backgroundColor,
        surface0: getComputedStyle(document.documentElement).getPropertyValue('--color-surface-0').trim(),
      }));
      expect(s.tema, p.url + ': data-theme').toBe(tema);
      expect(s.shema, p.url + ': color-scheme').toBe(shema);
      expect(s.bg, p.url + ': body pozadina == --color-surface-0 teme').toBe(hexUrgb(s.surface0));
    }
  });
}

// ── F3/1 (Leon 2026-09-16): OBA JEZIKA U STRANICI ────────────────────────────────────────
// Engleski i hrvatski blok stoje u istoj stranici; vidi se onaj iz `<html data-ui-lang>`, koji
// `boot.js` upiše PRIJE crtanja. Mjeri se ono što korisnik vidi i čuje (vidljiv h1, `lang`,
// naslov kartice, zaglavlje, podnožje) i — što nijedna statička brana ne može — je li engleski
// blok ikad ušao u stranicu dok `<html>` još nije rekao hrvatski (bljesak).
// Od F3/1 ③d su sve četiri pravne stranice dvojezične — tvrdnja ispod traži da popis ostane == PAGES.
const DVOJEZICNE = [
  { url: '/ai.html', h1: { en: 'Connect your AI to Sokrat', hr: 'Poveži svoj AI sa Sokratom' }, naslov: { en: 'Connect your AI — Sokrat Study', hr: 'Poveži svoj AI — Sokrat Study' } },
  { url: '/contact.html', h1: { en: 'Contact', hr: 'Kontakt' }, naslov: { en: 'Contact — Sokrat Study', hr: 'Kontakt — Sokrat Study' } },
  { url: '/faq.html', h1: { en: 'Frequently Asked Questions', hr: 'Česta pitanja' }, naslov: { en: 'FAQ — Sokrat Study', hr: 'Česta pitanja — Sokrat Study' } },
  { url: '/privacy.html', h1: { en: 'Privacy Policy', hr: 'Pravila privatnosti' }, naslov: { en: 'Privacy Policy — Sokrat Study', hr: 'Pravila privatnosti — Sokrat Study' } },
  { url: '/terms.html', h1: { en: 'Terms of Use', hr: 'Uvjeti korištenja' }, naslov: { en: 'Terms of Use — Sokrat Study', hr: 'Uvjeti korištenja — Sokrat Study' } },
];

test('svaka pravna stranica je dvojezična (nova ne ulazi samo na engleskom)', () => {
  expect(DVOJEZICNE.map((d) => d.url).sort()).toEqual(PAGES.map((p) => p.url).sort());
});

for (const p of DVOJEZICNE) {
  test(`${p.url}: spremljen hrvatski → hrvatski od prvog crtanja, bez bljeska engleskog`, async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('sokrat-ui-lang', 'hr'); } catch (e) { /* privatni način */ }
      // Za svaki engleski blok koji parser ubaci zapiši što <html> u tom času kaže o jeziku.
      window.__jezikUzEngleskiBlok = [];
      new MutationObserver((zapisi) => {
        for (const z of zapisi) {
          for (const n of z.addedNodes) {
            if (n.nodeType === 1 && n.matches('.jezik[lang="en"]')) {
              window.__jezikUzEngleskiBlok.push(document.documentElement.getAttribute('data-ui-lang'));
            }
          }
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto(p.url);
    const uz = await page.evaluate(() => window.__jezikUzEngleskiBlok);
    expect(uz.length, 'mjerač je vidio bar jedan engleski blok').toBeGreaterThan(0);
    expect(uz, '<html data-ui-lang> je bio "hr" prije SVAKOG engleskog bloka').toEqual(uz.map(() => 'hr'));

    await expect(page.locator('h1:visible')).toHaveText(p.h1.hr);
    await expect(page.locator('h1', { hasText: p.h1.en })).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('hr');
    await expect(page).toHaveTitle(p.naslov.hr);
    await expect(page.locator('.legal-nav a.legal-back')).toHaveText('← Natrag u aplikaciju');
    await expect(page.locator('.legal-footer a[href="privacy.html"]')).toHaveText('Pravila privatnosti');
    await expect(page.locator('.legal-lang .jezik:visible')).toHaveText('HR');

    // Najuža širina (spec §2): hrvatsko zaglavlje je dulje od engleskog.
    await page.setViewportSize({ width: 320, height: 568 });
    for (const jezik of ['hr', 'en']) {
      if (jezik === 'en') await page.locator('.legal-lang').click();
      const sirina = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(sirina, jezik + ': nema vodoravnog pomaka na 320 px').toBeLessThanOrEqual(321);
    }
  });

  test(`${p.url}: prekidač prebaci jezik i izbor preživi ponovno učitavanje`, async ({ page }) => {
    await page.goto(p.url);
    await expect(page.locator('h1:visible')).toHaveText(p.h1.en);
    await expect(page.locator('.legal-lang .jezik:visible')).toHaveText('EN');
    await page.locator('.legal-lang').click();
    await expect(page.locator('h1:visible')).toHaveText(p.h1.hr);
    await expect(page.locator('.legal-lang')).toHaveAccessibleName('Jezik: hrvatski / engleski');
    expect(await page.evaluate(() => localStorage.getItem('sokrat-ui-lang'))).toBe('hr');
    await page.reload();
    await expect(page.locator('h1:visible')).toHaveText(p.h1.hr);
    await page.locator('.legal-lang').click();
    await expect(page.locator('h1:visible')).toHaveText(p.h1.en);
    expect(await page.evaluate(() => document.documentElement.lang)).toBe('en');
  });
}

test('landing footer links to legal pages', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('.landing-footer');
  await expect(page.locator('.landing-footer a[href="privacy.html"]')).toBeAttached();
  await expect(page.locator('.landing-footer a[href="terms.html"]')).toBeAttached();
  await expect(page.locator('.landing-footer a[href="faq.html"]')).toBeAttached();
  await expect(page.locator('.landing-footer a[href="contact.html"]')).toBeAttached();
});
