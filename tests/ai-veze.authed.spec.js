// F6 ①/5 — POVEZANI AI-JEVI: popis veza i prekid (STAGING).
//
// ── ZAŠTO OVAJ SPEC POSTOJI ──────────────────────────────────────────────────────
// Korisnik svom Claudeu/ChatGPT-u daje pristup VLASTITOM gradivu. Do ①/5 taj pristup nije mogao
// povući — nije bilo ni popisa ni prekidača. Ovdje se mjeri ono što korisnik vidi i dodirne:
//   ① veze se izlistaju (ime, datum) i uz svaku stoji prekidač;
//   ② ime aplikacije je TUĐI TEKST — DCR je otvoren, registrirati klijenta imena
//     `<img onerror=…>` može bilo tko (ADR-038 ③). Mora se vidjeti kao tekst, a ne izvršiti;
//   ③ „Prekini vezu" traži potvrdu pa pošalje DELETE s TOČNIM `client_id`;
//   ④ prazan popis kaže da veza nema — i tada nema prekidača.
//
// ⚠️ NE OVISI o tome što test-račun ima: odgovor na `/user/oauth/grants` se PODMEĆE (`page.route`).
//    Ovaj spec zato ništa ne upisuje ni ne briše na stagingu.
//
// ⚠️ Napomena tvrdi „vrijedi odmah" tek od K/8 (15.10.): baza na svakom pozivu konektora traži živu
//    sesiju. Da je to ISTINA, ne mjeri ovaj spec (on podmeće odgovor) nego `npm run mcp:opoziv` na stagingu.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');

const GRANTS = /\/auth\/v1\/user\/oauth\/grants/;
const ZLOBNO = '<img src=x onerror="window.__xss=1">Zli konektor';

function veza(id, ime, kada) {
  return { client: { id: id, name: ime }, scopes: ['email'], granted_at: kada };
}

/** Podmetni popis veza; vrati zapis o poslanim DELETE-ovima. */
async function podmetniVeze(page, popis) {
  const obrisani = [];
  await page.route(GRANTS, (route) => {
    const req = route.request();
    if (req.method() === 'DELETE') {
      obrisani.push(new URL(req.url()).searchParams.get('client_id'));
      return route.fulfill({ status: 204, body: '' });
    }
    if (req.method() === 'GET') {
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(popis) });
    }
    return route.continue();
  });
  return obrisani;
}

async function naProfilu(page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('sokrat-cookie-consent', 'denied'); } catch (e) { /* private mode */ }
  });
  await page.goto('/');
  await ucitajPakete(page, ['profile']);
  await page.waitForFunction(() => typeof window.navigateTo === 'function', null, { timeout: 20000 });
  await page.evaluate(() => navigateTo('profile'));
  // Skeleton i gotov popis dijele isti čvor → čeka se KRAJ čitanja, inače se mjeri „Učitavanje…".
  await page.waitForSelector('#profileAiList[aria-busy="false"]', { timeout: 20000 });
}

test('① veze se izlistaju s imenom, datumom i prekidačem — i trajna napomena o prekidu stoji', async ({ page }) => {
  await podmetniVeze(page, [
    veza('11111111-1111-4111-8111-111111111111', 'Claude', '2026-09-18T19:47:59Z'),
    veza('22222222-2222-4222-8222-222222222222', 'ChatGPT', '2026-09-01T08:00:00Z')
  ]);
  await naProfilu(page);

  const redci = page.locator('.profile-ai-row');
  await expect(redci).toHaveCount(2);
  await expect(redci.first()).toContainText('Claude');
  await expect(redci.nth(1)).toContainText('ChatGPT');
  await expect(page.locator('[data-ai-revoke]')).toHaveCount(2);
  // Istina o trajanju je TRAJAN tekst, ne poruka koja nestane.
  await expect(page.locator('.profile-ai-note')).toBeVisible();
});

test('② ime aplikacije je tuđi tekst — vidi se, ali se NE izvršava', async ({ page }) => {
  await podmetniVeze(page, [veza('33333333-3333-4333-8333-333333333333', ZLOBNO, '2026-09-18T19:47:59Z')]);
  await naProfilu(page);

  await expect(page.locator('.profile-ai-row')).toHaveCount(1);
  await expect(page.locator('.profile-ai-who strong')).toHaveText(ZLOBNO);
  expect(await page.evaluate(() => window.__xss)).toBeUndefined();
  expect(await page.locator('.profile-ai-who img').count()).toBe(0);
});

test('③ „Prekini vezu" traži potvrdu pa šalje DELETE s točnim client_id', async ({ page }) => {
  const ID = '44444444-4444-4444-8444-444444444444';
  const obrisani = await podmetniVeze(page, [veza(ID, 'Claude', '2026-09-18T19:47:59Z')]);
  await naProfilu(page);

  await page.click('[data-ai-revoke]');
  await page.waitForSelector('sokrat-confirm .sokrat-confirm__ok', { state: 'visible' });
  expect(obrisani).toEqual([]);            // potvrda još nije dana → ništa nije poslano
  await page.click('sokrat-confirm .sokrat-confirm__ok');

  await expect.poll(() => obrisani, { timeout: 10000 }).toEqual([ID]);
});

test('④ bez veza: kaže da ih nema i ne nudi prekidač', async ({ page }) => {
  await podmetniVeze(page, []);
  await naProfilu(page);

  await expect(page.locator('#profileAiList')).toContainText(/nijedna|No AI app/i);
  await expect(page.locator('[data-ai-revoke]')).toHaveCount(0);
});
