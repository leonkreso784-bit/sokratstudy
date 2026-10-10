// F2/5a — ZID GRADIVA NA PROFILU (STAGING).
//
// ── ZAŠTO OVAJ SPEC POSTOJI ──────────────────────────────────────────────────────
// Leonov kriterij za F2/5: „korisnik otvori svoj profil i vidi što je napravio". Pješčanik
// (`tests/unit/my-materials.test.js`) čuva IZBOR (zadnjih 6, redoslijed po izmjeni gradiva,
// stalna boja); ovo mjeri ono što se VIDI i DODIRNE:
//   ① pravi materijal (RPC, staging) stigne na zid kao prva pločica, s mapom, stalnom bojom i
//     ESCAPANIM imenom — i dodir ga otvara za UČENJE (anketa 14.09.: dodir = učenje);
//   ② rešetka: 2 stupca na telefonu, 3 na stolnom, ništa ne bježi vodoravno, dodir ≥ 44 px;
//   ③ prazno stanje vodi u radionicu, a „Svi materijali" se tada ne nudi;
//   ④ neuspjelo čitanje kaže da nije stiglo (ne „nemaš materijala") i „Pokušaj ponovno" radi.
// ②–④ ne ovise o tome što test-račun ima (ondje leži ~40 starih materijala): odgovor na čitanje
// `nodes` se podmeće (`page.route`), RPC-ovi prolaze netaknuti.
//
// ⚠️ ① PIŠE na STAGING (create_node) i briše za sobom (delete_node, soft) u `finally`.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');

const CITANJE_NODES = /\/rest\/v1\/nodes\?/;

async function naProfilu(page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('sokrat-cookie-consent', 'denied'); } catch (e) { /* private mode */ }
  });
  await page.goto('/');
  await ucitajPakete(page, ['profile']);
  await page.waitForFunction(() => typeof window.navigateTo === 'function' && !!window.SokratMaterials
    && window.SokratMaterials.isAvailable(), null, { timeout: 20000 });
  await page.evaluate(() => navigateTo('profile'));
  await zidGotov(page);
}

/** Čeka da čitanje ZAVRŠI — skeleton i gotov zid dijele rešetku, pa se inače mjeri skeleton. */
async function zidGotov(page) {
  await page.waitForSelector('#profileShelf[aria-busy="false"]', { timeout: 20000 });
}

/** Podmetnut odgovor mora izgledati kao PostgREST-ov: `loadTree` (ZAVRSNICA K/6) traži `count=exact` i čita
 *  ukupan broj iz `Content-Range` — bez njega odbija, jer bi inače tiho prikazao samo prvih 1 000. */
function kaoPostgrest(odgovor) {
  let n = -1;
  try { const j = JSON.parse(odgovor.body); if (Array.isArray(j)) n = j.length; } catch (e) { /* nije niz */ }
  if (odgovor.status !== 200 || n < 0) return odgovor;
  // Kao pravi Supabase: bez `Expose-Headers` preglednik zaglavlje primi, ali ga kod ne smije pročitati (CORS).
  return Object.assign({}, odgovor, { headers: { 'Content-Range': (n ? '0-' + (n - 1) : '*') + '/' + n,
    'Access-Control-Expose-Headers': 'Content-Range', 'Access-Control-Allow-Origin': '*' } });
}

/** Podmetni odgovor na čitanje `nodes` (samo GET; RPC-ovi idu na /rpc/ i prolaze). */
async function podmetni(page, odgovor) {
  await page.route(CITANJE_NODES, (route) => {
    if (route.request().method() !== 'GET') return route.continue();
    return route.fulfill(kaoPostgrest(odgovor));
  });
}

const DUGO = 'Makroekonomija — skripta za drugi kolokvij s formulama i primjerima';
function redci(n) {
  const r = [{ id: 'f-1', parent_id: null, kind: 'folder', name: 'Ispiti 2. godine', created_at: '2026-09-01T10:00:00Z', node_content: null }];
  for (let i = 0; i < n; i++) {
    r.push({
      id: '00000000-0000-4000-8000-00000000000' + i, parent_id: i % 2 ? 'f-1' : null, kind: 'study',
      name: DUGO + ' ' + i, created_at: '2026-09-01T10:00:00Z',
      node_content: { updated_at: '2026-09-1' + i + 'T10:00:00Z' }
    });
  }
  return r;
}

test('① novi materijal je prva pločica: mapa, stalna boja, escapano ime — dodir ga otvara za učenje', async ({ page }) => {
  await naProfilu(page);
  const oznaka = Date.now();
  const imeMape = 'Zid-test ' + oznaka;
  const ime = 'Zid <i>test</i> ' + oznaka;
  let mapa = null;
  let mat = null;
  try {
    mapa = await page.evaluate((n) => SokratMaterials.createNode(null, 'folder', n), imeMape);
    mat = await page.evaluate(([p, n]) => SokratMaterials.createNode(p, 'study', n), [mapa, ime]);
    expect(mat, 'create_node nije vratio id').toBeTruthy();

    await page.evaluate(() => navigateTo('profile'));
    await zidGotov(page);

    const prva = page.locator('#profileShelf .profile-tile').first();
    await expect(prva, 'novi materijal nije PRVI na zidu').toHaveAttribute('data-shelf-learn', mat);
    await expect(prva.locator('.profile-tile-name')).toHaveText(ime);
    expect(await prva.locator('.profile-tile-name i').count(), 'ime materijala je ušlo kao HTML').toBe(0);
    await expect(prva.locator('.profile-tile-folder')).toHaveText(imeMape);

    const boja = await prva.evaluate((el, id) => ({
      tile: el.style.getPropertyValue('--tile-color').trim(),
      ocekivana: window.bojaMaterijala(id),
      ink: el.querySelector('.profile-tile-icon').getAttribute('data-ink'),
    }), mat);
    expect(boja.tile, 'pločica ne nosi stalnu boju materijala').toBe(boja.ocekivana);
    expect(['light', 'dark']).toContain(boja.ink);

    const broj = await page.locator('#profileShelf .profile-tile').count();
    expect(broj, 'zid nosi najviše 6 pločica').toBeLessThanOrEqual(6);
    await expect(page.locator('.profile-shelf-all')).toBeVisible();

    await prva.click();
    await expect.poll(() => page.evaluate(() => [AppState.nav.page, AppState.nav.subject]), {
      timeout: 20000, message: 'dodir na pločicu nije otvorio materijal za učenje',
    }).toEqual(['study', 'node:' + mat]);
  } finally {
    await page.evaluate(async (ids) => {
      for (const id of ids) if (id) await SokratMaterials.deleteNode(id).catch(() => {});
    }, [mat, mapa]);
  }
});

for (const [sirina, visina, stupaca] of [[320, 568, 2], [393, 852, 2], [1280, 800, 3]]) {
  test(`② rešetka @${sirina}px: ${stupaca} stupca, bez vodoravnog bijega, dodir ≥ 44 px`, async ({ page }) => {
    await page.setViewportSize({ width: sirina, height: visina });
    await podmetni(page, { status: 200, contentType: 'application/json', body: JSON.stringify(redci(8)) });
    await naProfilu(page);

    const m = await page.evaluate(() => {
      const g = document.getElementById('profileShelf');
      const plocice = [...g.querySelectorAll('.profile-tile')].map((t) => t.getBoundingClientRect());
      const imena = [...g.querySelectorAll('.profile-tile-name')].map((n) => {
        const lh = parseFloat(getComputedStyle(n).lineHeight);
        return Math.round(n.getBoundingClientRect().height / lh);
      });
      return {
        stupaca: getComputedStyle(g).gridTemplateColumns.split(' ').length,
        broj: plocice.length,
        najnize: Math.min(...plocice.map((r) => r.height)),
        najdesnije: Math.max(...plocice.map((r) => r.right)),
        sirina: document.documentElement.clientWidth,
        bijeg: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        redaka: imena,
      };
    });
    expect(m.broj, 'zid mora stati na 6 pločica i kad materijala ima više').toBe(6);
    expect(m.stupaca).toBe(stupaca);
    expect(m.najnize).toBeGreaterThanOrEqual(44);
    expect(m.najdesnije, 'pločica izlazi iz ekrana').toBeLessThanOrEqual(m.sirina);
    expect(m.bijeg, 'stranica se vodoravno pomiče').toBeLessThanOrEqual(0);
    expect(Math.max(...m.redaka), 'ime smije u NAJVIŠE dva retka').toBeLessThanOrEqual(2);
    expect(Math.max(...m.redaka), 'dugo ime mora zauzeti dva retka, ne biti rezano na jedan').toBe(2);
  });
}

test('③ prazno stanje vodi u radionicu, a „Svi materijali" se ne nudi', async ({ page }) => {
  await podmetni(page, { status: 200, contentType: 'application/json', body: '[]' });
  await naProfilu(page);
  await expect(page.locator('#profileShelf .profile-tile')).toHaveCount(1);
  await expect(page.locator('#profileShelf .profile-tile--make')).toBeVisible();
  await expect(page.locator('.profile-shelf-all')).toBeHidden();
  await page.click('#profileShelf .profile-tile--make');
  await expect.poll(() => page.evaluate(() => AppState.nav.page)).toBe('materials');
});

// Birač teme stoji NA profilu; svaki izbor piše u račun (`USER_UPDATED`), a auth.js tada crta profil
// iznova. Prije ove brane je zid na svaki klik teme padao na sive plohe i čitao bazu ispočetka.
// Ovdje se crtež profila okida izravno (isti put kao auth.js), a drugo čitanje namjerno kasni 2 s.
test('⑤ ponovno crtanje profila (npr. izbor teme) NE vraća zid na sive plohe', async ({ page }) => {
  let citanja = 0;
  await page.route(CITANJE_NODES, async (route) => {
    if (route.request().method() !== 'GET') return route.continue();
    citanja++;
    if (citanja > 1) await new Promise((r) => setTimeout(r, 2000));
    return route.fulfill(kaoPostgrest({ status: 200, contentType: 'application/json', body: JSON.stringify(redci(3)) }));
  });
  await naProfilu(page);
  await expect(page.locator('#profileShelf .profile-tile')).toHaveCount(3);

  await page.evaluate(() => renderProfilePage());
  // odmah, dok drugo čitanje još traje:
  const odmah = await page.evaluate(() => ({
    sivih: document.querySelectorAll('#profileShelf .profile-tile--skeleton').length,
    plocica: document.querySelectorAll('#profileShelf [data-shelf-learn]').length,
    sviVidljiv: !document.querySelector('.profile-shelf-all').hidden,
  }));
  expect(odmah, 'zid je trepnuo na sive plohe pri ponovnom crtanju').toEqual({ sivih: 0, plocica: 3, sviVidljiv: true });
  await zidGotov(page);
  expect(citanja, 'svježe čitanje se mora dogoditi (zid se osvježava, ne smrzava)').toBe(2);
  await expect(page.locator('#profileShelf .profile-tile')).toHaveCount(3);
});

test('④ neuspjelo čitanje kaže da nije stiglo, a „Pokušaj ponovno" ga dovrši', async ({ page }) => {
  await podmetni(page, { status: 500, contentType: 'application/json', body: '{"message":"boom"}' });
  await naProfilu(page);
  await expect(page.locator('#profileShelf [data-shelf-retry]')).toBeVisible();
  await expect(page.locator('#profileShelf .profile-tile--make'), 'greška se ne smije prikazati kao „nemaš materijala"')
    .toHaveCount(0);

  await page.unroute(CITANJE_NODES);
  await podmetni(page, { status: 200, contentType: 'application/json', body: JSON.stringify(redci(3)) });
  await page.click('#profileShelf [data-shelf-retry]');
  await expect(page.locator('#profileShelf .profile-tile')).toHaveCount(3);
  await expect(page.locator('#profileShelf [data-shelf-retry]')).toHaveCount(0);
});
