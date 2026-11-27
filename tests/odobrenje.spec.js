// F6 ①/1 — STRANICA ODOBRENJA ZA KORISNIKOV AI (`odobrenje.html`), bez pravog projekta.
//
// ── ZAŠTO OVAJ SPEC POSTOJI ──────────────────────────────────────────────────────
// Ovamo Supabase OAuth poslužitelj šalje korisnika kad njegov Claude/ChatGPT traži pristup.
// DCR je uključen (ADR-038 ③), pa klijenta može registrirati BILO TKO — ova stranica je jedina
// točka na kojoj se pristup daje. Tvrdi se ono što korisnik vidi i što stranica POŠALJE:
//   ① poveznica bez `authorization_id` → objašnjenje, nijedan zahtjev prema Authu;
//   ② nije prijavljen → poziv na prijavu, detalji se ni ne traže;
//   ③ poznat AI (claude.ai): ime, host i račun; otvaranje NE odobrava; „Dopusti" pošalje
//     `approve` i tek onda vodi natrag u AI;
//   ④ nepoznat povratak (tuđa stranica) → nema gumba, nijedno odobrenje ne ode;
//   ⑤ „Odbij" pošalje `deny`;
//   ⑩ „Nisi ti?" odjavi lokalno i ništa ne odobri (K/9).
// Auth se PODMEĆE (`page.route`) na izmišljenom projektu; pravi lanac mjeri `npm run mcp:probe`
// i spajanje pravog Claudea na STAGING.
const { test, expect } = require('@playwright/test');

const PROJEKT = 'https://odobrenjetest.supabase.co';
const AUTH_ID = 'a1b2c3d4-0000-4000-8000-000000000001';
const CLAUDE_CB = 'https://claude.ai/api/mcp/auth_callback';

function sesija() {
  const sad = Math.floor(Date.now() / 1000);
  return {
    access_token: 'e30.e30.e30', token_type: 'bearer', expires_in: 3600, expires_at: sad + 3600,
    refresh_token: 'lazni-refresh',
    user: { id: '00000000-0000-4000-8000-00000000abcd', aud: 'authenticated', role: 'authenticated', email: 'student@primjer.hr' }
  };
}

async function otvori(page, { upit = '', prijavljen = false, jezik = 'hr' } = {}) {
  await page.addInitScript(([p, s, j]) => {
    try {
      localStorage.setItem('sokrat-ui-lang', j);
      localStorage.setItem('sokrat-supabase-override', JSON.stringify({ url: p, publishableKey: 'sb_publishable_test' }));
      if (s) localStorage.setItem('sb-odobrenjetest-auth-token', JSON.stringify(s));
    } catch (e) { /* private */ }
  }, [PROJEKT, prijavljen ? sesija() : null, jezik]);
  await page.goto('/odobrenje.html' + upit);
  await page.waitForFunction(() => typeof window.t === 'function');
}

/** Podmetni Auth; vrati popis poziva prema projektu. */
async function podmetniAuth(page, { redirectUri = CLAUDE_CB } = {}) {
  const pozivi = [];
  await page.route(PROJEKT + '/**', async (route) => {
    const r = route.request();
    const url = new URL(r.url());
    pozivi.push({ metoda: r.method(), put: url.pathname, tijelo: r.postData() });
    if (r.method() === 'GET' && url.pathname === '/auth/v1/oauth/authorizations/' + AUTH_ID) {
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
        authorization_id: AUTH_ID, redirect_uri: redirectUri, scope: '',
        client: { id: 'c1', name: 'Claude', uri: '', logo_uri: '' },
        user: { id: '00000000-0000-4000-8000-00000000abcd', email: 'student@primjer.hr' }
      }) });
    }
    if (r.method() === 'POST' && url.pathname === '/auth/v1/oauth/authorizations/' + AUTH_ID + '/consent') {
      const akcija = JSON.parse(r.postData() || '{}').action;
      return route.fulfill({ status: 200, contentType: 'application/json',
        body: JSON.stringify({ redirect_url: redirectUri + '?' + (akcija === 'approve' ? 'code=kod123' : 'error=access_denied') + '&state=s' }) });
    }
    return route.fulfill({ status: 404, contentType: 'application/json', body: '{}' });
  });
  await page.route('https://claude.ai/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<h1>claude</h1>' }));
  return pozivi;
}

test('① bez authorization_id → objašnjenje, nijedan zahtjev prema Authu', async ({ page }) => {
  const pozivi = await podmetniAuth(page);
  await otvori(page, { prijavljen: true });
  await expect(page.locator('h1')).toHaveText('Poveži svoj AI sa Sokrat Studyjem');
  await expect(page.locator('#oauthStatus')).toContainText('Poveznica nije potpuna');
  await expect(page.locator('#oauthActions')).toBeHidden();
  expect(pozivi).toEqual([]);
});

test('② nije prijavljen → poziv na prijavu, detalji se ne traže', async ({ page }) => {
  const pozivi = await podmetniAuth(page);
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID });
  await expect(page.locator('#oauthSigninBtn')).toBeVisible();
  await expect(page.locator('#oauthStatus')).toContainText('drugom prozoru');
  await expect(page.locator('#oauthActions')).toBeHidden();
  expect(pozivi.filter((p) => p.put.includes('/oauth/'))).toEqual([]);
});

test('③ poznat AI: detalji, otvaranje ne odobrava, „Dopusti" pošalje approve i vrati u AI', async ({ page }) => {
  const pozivi = await podmetniAuth(page);
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID, prijavljen: true });
  await expect(page.locator('#oauthActions')).toBeVisible();
  await expect(page.locator('#oauthClient')).toHaveText('Claude');
  await expect(page.locator('#oauthHost')).toHaveText('claude.ai');
  await expect(page.locator('#oauthAccount')).toHaveText('student@primjer.hr');
  await expect(page.locator('#oauthAllow')).toHaveText('Dopusti');
  await page.waitForTimeout(300);
  expect(pozivi.filter((p) => p.metoda === 'POST'), 'stranica je sama odobrila prije klika').toEqual([]);

  await Promise.all([page.waitForURL(/^https:\/\/claude\.ai\/api\/mcp\/auth_callback\?code=kod123/), page.click('#oauthAllow')]);
  const post = pozivi.filter((p) => p.metoda === 'POST');
  expect(post.length).toBe(1);
  expect(JSON.parse(post[0].tijelo)).toEqual({ action: 'approve' });
});

test('④ nepoznat povratak → nema gumba, odobrenje ne ode', async ({ page }) => {
  const pozivi = await podmetniAuth(page, { redirectUri: 'https://zla-stranica.example/cb' });
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID, prijavljen: true });
  await expect(page.locator('#oauthStatus')).toContainText('ne prepoznajemo');
  await expect(page.locator('#oauthHost')).toHaveText('zla-stranica.example');
  await expect(page.locator('#oauthActions')).toBeHidden();
  await page.waitForTimeout(300);
  expect(pozivi.filter((p) => p.metoda === 'POST')).toEqual([]);
});

test('⑤ „Odbij" pošalje deny', async ({ page }) => {
  const pozivi = await podmetniAuth(page);
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID, prijavljen: true, jezik: 'en' });
  await expect(page.locator('#oauthDeny')).toHaveText('Deny');
  await Promise.all([page.waitForURL(/error=access_denied/), page.click('#oauthDeny')]);
  const post = pozivi.filter((p) => p.metoda === 'POST');
  expect(post.length).toBe(1);
  expect(JSON.parse(post[0].tijelo)).toEqual({ action: 'deny' });
});

// ⑦ POVOD (①/3): tko na ovu stranicu stigne neprijavljen, dosad je morao POČETI ISPOČETKA iz svoje AI
// aplikacije — poveznica na prijavu vodila je s ove stranice, a s njom je nestajao i `authorization_id`.
// Prijava zato ide u DRUGI prozor, a ova stranica čeka i nastavi sama. Tvrdi se upravo to: bez ijednog
// osvježavanja i bez novog povezivanja, stranica iz „prijavi se" prijeđe u „Dopusti / Odbij".
// (Da se detalji ne mogu pokazati PRIJE prijave nije naš izbor: poslužitelj na GET bez tokena vrati 401.)
test('⑦ prijava u drugom prozoru → stranica sama nastavi, ID povezivanja ostaje', async ({ page }) => {
  await podmetniAuth(page);
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID });          // bez sesije
  await expect(page.locator('#oauthSigninBtn')).toBeVisible();
  await expect(page.locator('#oauthActions')).toBeHidden();

  // Osluškivač se veže PRIJE klika (inače se događaj može propustiti), ali se ne čeka odmah:
  // prvo se tvrdi da stranica NIJE otišla s adrese. Tako pad imenuje pravi kvar — gubitak
  // povezivanja — umjesto da istekne čekanje na prozor koji nikad ne dolazi.
  const prozorStize = page.waitForEvent('popup', { timeout: 15000 });
  await page.click('#oauthSigninBtn');
  await page.waitForTimeout(300);
  expect(page.url(), 'stranica je otišla sa svoje adrese → povezivanje je izgubljeno').toContain('authorization_id=' + AUTH_ID);
  const prozor = await prozorStize;
  await expect(page.locator('#oauthStatus')).toContainText('Čekam da se prijaviš');

  // Prijava se dogodi u DRUGOM prozoru: on piše u isti localStorage, što u ovoj stranici
  // digne `storage` (preglednik ga šalje samo drugim dokumentima istog origina).
  await prozor.waitForLoadState('domcontentloaded');
  await prozor.evaluate((s) => localStorage.setItem('sb-odobrenjetest-auth-token', JSON.stringify(s)), sesija());

  await expect(page.locator('#oauthActions')).toBeVisible();
  await expect(page.locator('#oauthClient')).toHaveText('Claude');
  await expect(page.locator('#oauthSignin')).toBeHidden();
  expect(page.url(), 'stranica je otišla s adrese i izgubila povezivanje').toContain('authorization_id=' + AUTH_ID);
});

// ⑧ DRUGA MREŽA. `storage` je dobar mehanizam, ali ga preglednik u nekim stanjima ne pošalje
// (privatni način, ugrađeni webview). Tada stranicu mora pokrenuti povratak na karticu. Ovdje se
// sesija upisuje iz ISTE stranice — isti dokument `storage` NE dobiva, pa prve mreže doslovno nema
// i mjeri se samo druga. Bez ove tvrdnje briše se `visibilitychange` a da ništa ne pocrveni.
test('⑧ druga mreža: kad `storage` izostane, povratak na karticu ipak nastavi', async ({ page }) => {
  await podmetniAuth(page);
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID });
  await expect(page.locator('#oauthSigninBtn')).toBeVisible();

  await page.evaluate((s) => localStorage.setItem('sb-odobrenjetest-auth-token', JSON.stringify(s)), sesija());
  await page.waitForTimeout(300);
  await expect(page.locator('#oauthActions'), 'prva mreža se oglasila — ⑧ tada ne mjeri drugu').toBeHidden();

  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await expect(page.locator('#oauthActions')).toBeVisible();
  await expect(page.locator('#oauthClient')).toHaveText('Claude');
});

// ⑨ ZAUSTAVLJEN PROZOR. Korisnik na ovu stranicu često stiže iz ugrađenog preglednika AI aplikacije,
// gdje `window.open` zna vratiti `null`. Tada gumb ne smije tiho ne raditi: stranica mora reći što se
// dogodilo i ostaviti drugi put. Bez ove tvrdnje ta se poruka može obrisati neprimijećeno.
test('⑨ preglednik zaustavi novi prozor → stranica to KAŽE, gumb ostaje', async ({ page }) => {
  await podmetniAuth(page);
  await page.addInitScript(() => { window.open = function () { return null; }; });
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID });

  await page.click('#oauthSigninBtn');
  await expect(page.locator('#oauthStatus')).toContainText('zaustavio novi prozor');
  await expect(page.locator('#oauthSigninBtn')).toBeVisible();
  await expect(page.locator('#oauthActions')).toBeHidden();
});

// ⑥ POVOD (ručni pokus ①/1, 18.09.): prebacivanje na staging je nestalo iz preglednika, stranica je
// TIHO otišla na produkciju (gdje OAuth poslužitelj nije uključen), rekla „prijavi se prvo", pa je i
// prijava završila na PRODUKCIJI. Na lokalnoj adresi tihi povratak na produkciju ne smije postojati.
test('⑥ na localhostu bez odabranog projekta stranica stane i ne dira produkciju', async ({ page }) => {
  const vanjski = [];
  await page.route((url) => url.hostname.endsWith('supabase.co'), async (route) => {
    vanjski.push(route.request().url());
    await route.fulfill({ status: 500, contentType: 'application/json', body: '{}' });
  });
  await page.addInitScript(() => {
    try {
      localStorage.setItem('sokrat-ui-lang', 'hr');
      localStorage.removeItem('sokrat-supabase-override');
    } catch (e) { /* private */ }
  });
  await page.goto('/odobrenje.html?authorization_id=' + AUTH_ID);
  await page.waitForFunction(() => typeof window.t === 'function');
  await expect(page.locator('#oauthStatus')).toContainText('localhostu');
  await expect(page.locator('#oauthActions')).toBeHidden();
  await page.waitForTimeout(300);
  expect(vanjski).toEqual([]);
});

// ⑩ POVOD (K/9, 16.10.): u pregledniku je bio prijavljen DRUGI račun, pa je AI dvaput spojen na krivi
// (test-admin umjesto test-prazan) — stranica je nudila samo „Dopusti" na krivi račun ili „Odbij".
// „Nisi ti?" odjavi SAMO ovdje i NE nastavlja isto povezivanje: poslužitelj ga veže za prvi račun koji
// otvori detalje (drugi dobiva 404 — izmjereno na stagingu, `docs/workflow/MCP_TESTING.md` §5).
test('⑩ „Nisi ti?" → lokalna odjava, nijedno odobrenje, poruka da se spajanje pokrene ispočetka', async ({ page, context }) => {
  const pozivi = await podmetniAuth(page);
  await page.route(PROJEKT + '/auth/v1/logout**', (route) => {
    pozivi.push({ metoda: route.request().method(), put: route.request().url(), tijelo: null });
    return route.fulfill({ status: 204, body: '' });
  });
  await otvori(page, { upit: '?authorization_id=' + AUTH_ID, prijavljen: true });
  await expect(page.locator('#oauthAccount')).toHaveText('student@primjer.hr');
  await expect(page.locator('#oauthSwitch')).toHaveText('Nisi ti? Prijavi se drugim računom');

  await page.click('#oauthSwitch');
  await expect(page.locator('#oauthStatus')).toContainText('ponovno pokreni spajanje');
  await expect(page.locator('#oauthDetails')).toBeHidden();
  await expect(page.locator('#oauthActions')).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('sb-odobrenjetest-auth-token'))).toBeNull();
  const odjave = pozivi.filter((p) => /\/auth\/v1\/logout/.test(p.put));
  expect(odjave.length, 'odjava mora otići poslužitelju').toBe(1);
  expect(new URL(odjave[0].put).searchParams.get('scope'), 'odjava je LOKALNA, ne global').toBe('local');
  expect(pozivi.filter((p) => /\/consent$/.test(p.put)), 'promjena računa ne smije ništa odobriti').toEqual([]);
  expect(page.url()).toContain('authorization_id=' + AUTH_ID);

  const [prozor] = await Promise.all([context.waitForEvent('page'), page.click('#oauthSigninBtn')]);
  await prozor.waitForLoadState('domcontentloaded');
  expect(new URL(prozor.url()).pathname).toBe('/');
});
