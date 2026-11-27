// F4 — PUNI E2E OSOBNOG GRADIVA + „obriši sekciju" (CREATE_BACKEND_SPEC §6 F4).
// Trajni regresijski spec (pravilo #8): SAMO `authenticated` projekt sa STAGING_*.
// PIŠE u staging kroz owner-scoped RPC-ove i sve za sobom počisti. Prod se NE dira.
//
// Dokazuje ugovor faze F4: cijeli životni ciklus u JEDNOM toku —
// napravi folder → ugnijezdi gradivo → uredi u Studiju → objavi → obriši → VRATI,
// uz tvrdnju koja je najlakše promašiti: **sadržaj preživi soft-delete i povratak.**
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');
// T6: editor je vlastiti dokument — gdje točno, zna helper (jedno mjesto, ne sedamnaest).
const { otvoriStudio, otvoriAplikaciju } = require('./helpers/studio-entry');

async function openMaterials(page) {
  await page.addInitScript(() => {
    try { localStorage.setItem('sokrat-cookie-consent', 'denied'); } catch (e) { /* private mode */ }
  });
  await page.goto('/');
  await ucitajPakete(page, ['profile']);
  await page.waitForFunction(() =>
    !!window.SokratMaterials && !!window.SokratAdmin
    && typeof window.navigateTo === 'function');
  await page.waitForFunction(() => window.SokratMaterials.isAvailable(), null, { timeout: 20000 });
  await page.evaluate(() => navigateTo('materials'));
  await page.waitForSelector('#myMaterials .mm-bar', { timeout: 20000 });
  await page.waitForSelector('#myMaterials .mm-spin', { state: 'detached', timeout: 20000 });
}

const mkNode = (page, p, k, n) =>
  page.evaluate(([a, b, c]) => window.SokratMaterials.createNode(a, b, c), [p, k, n]);
// ⚠️ T6: čišćenje traži APLIKACIJU — `SokratMaterials` ne postoji na stranici editora,
// a test ondje često i završi; bez povratka kući `finally` bi rušio umjesto da čisti.
const rmNode = async (page, id) => {
  await otvoriAplikaciju(page);
  await page.waitForFunction(() => !!window.SokratMaterials, null, { timeout: 20000 });
  await page.evaluate((i) => window.SokratMaterials.deleteNode(i).catch(() => {}), id);
};
const readContent = (page, id) => page.evaluate(async (nodeId) => {
  const r = await SokratAuth.getClient().from('node_content')
    .select('payload,version').eq('node_id', nodeId).single();
  return r.error ? { error: r.error.message } : r.data;
}, id);

/** Objavi payload kroz Studio-bridge (isti put kao gumb „Objavi"). */
// ⚠️ T6: most (`SokratAdmin.studioBridge`) postoji SAMO na `editor.html`, pa helper sam
// otvara tu stranicu — kao što se `rmNode` sam vraća u aplikaciju. Znanje o tome gdje koja
// polovica proizvoda živi stoji u helperu, ne u svakom testu koji ga zove.
const publishSections = async (page, id, name, sections) => {
  await otvoriStudio(page);
  return page.evaluate(async ([nodeId, nm, secs]) => {
  const b = window.SokratAdmin.studioBridge;
  b.setNode(nodeId, nm, {});
  await b.enter();
  const d = window.SokratDraft.get('node:' + nodeId, 'content');
  secs.forEach((s) => {
    window.SokratDraft.applyOp(d.subjectId, d.lessonId, {
      type: 'addCategory', catId: s.key,
      category: { name: s.name, icon: 'fa-book', color: '#6366f1',
        flashcards: [], quiz: [], fillBlanks: [],
        learn: { blocks: [{ type: 'paragraph', text: s.text }] } }
    });
  });
  await b.publish();
  }, [id, name, sections]);
};

test.describe('F4 — puni životni ciklus osobnog gradiva', () => {
  test('napravi → ugnijezdi → uredi → objavi → obriši → VRATI (sadržaj preživi)', async ({ page }) => {
    await openMaterials(page);
    const folder = await mkNode(page, null, 'folder', 'F4 E2E Fakultet');
    let study = null;
    try {
      // 1) UGNIJEZDI gradivo u folder.
      study = await mkNode(page, folder, 'study', 'F4 E2E Gradivo');
      const nested = await page.evaluate(async ([f, s]) => {
        const r = await SokratAuth.getClient().from('nodes')
          .select('id,parent_id,kind,deleted_at').in('id', [f, s]);
        return r.error ? { error: r.error.message } : r.data;
      }, [folder, study]);
      const kid = nested.find((n) => n.id === study);
      expect(kid.parent_id, 'gradivo mora biti U folderu').toBe(folder);
      expect(kid.kind).toBe('study');

      // 2) UREDI + OBJAVI.
      await publishSections(page, study, 'F4 E2E Gradivo', [
        { key: 'sekcija-1', name: 'Uvod', text: 'prvi odlomak' },
      ]);
      const afterPublish = await readContent(page, study);
      expect(afterPublish.version).toBe(2);
      expect(afterPublish.payload['sekcija-1'].learn.blocks[0].text).toBe('prvi odlomak');

      // 3) OBRIŠI (soft) — nestaje iz stabla. Natrag u aplikaciju: `SokratMaterials` je njezin.
      await otvoriAplikaciju(page);
      await page.waitForFunction(() => !!window.SokratMaterials, null, { timeout: 20000 });
      await page.evaluate((i) => window.SokratMaterials.deleteNode(i), study);
      const gone = await page.evaluate(async (s) => {
        const r = await SokratAuth.getClient().from('nodes').select('id').eq('id', s).is('deleted_at', null);
        return r.error ? { error: r.error.message } : r.data;
      }, study);
      expect(gone, 'obrisan čvor NE SMIJE biti među živima').toHaveLength(0);

      // 4) VRATI — i čvor i SADRŽAJ se moraju vratiti netaknuti.
      await page.evaluate((i) => window.SokratMaterials.restoreNode(i), study);
      const back = await page.evaluate(async (s) => {
        const r = await SokratAuth.getClient().from('nodes')
          .select('id,parent_id,name').eq('id', s).is('deleted_at', null).single();
        return r.error ? { error: r.error.message } : r.data;
      }, study);
      expect(back.parent_id, 'vraćeno gradivo mora biti u ISTOM folderu').toBe(folder);
      expect(back.name).toBe('F4 E2E Gradivo');

      const afterRestore = await readContent(page, study);
      expect(afterRestore.version, 'verzija se ne smije pomaknuti od brisanja/vraćanja').toBe(2);
      expect(afterRestore.payload['sekcija-1'].learn.blocks[0].text,
        'SADRŽAJ mora preživjeti soft-delete + restore').toBe('prvi odlomak');
    } finally {
      if (study) await rmNode(page, study);
      await rmNode(page, folder);
    }
  });

  test('Studio: 🗑 obriši sekciju → removeCategory u draftu; „Odbaci" je vrati', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F4 Brisanje sekcije');
    try {
      await publishSections(page, id, 'F4 Brisanje sekcije', [
        { key: 'sekcija-1', name: 'Prva', text: 'a' },
        { key: 'sekcija-2', name: 'Druga', text: 'b' },
      ]);

      await page.evaluate((nodeId) => window.SokratStudio.openNode(nodeId, 'F4 Brisanje sekcije'), id);
      await page.waitForSelector('#editor-page.active', { timeout: 15000 });
      await page.click('#stEdit');
      await page.waitForSelector('.st-learn-cat [data-st-catdel]', { timeout: 15000 });

      const before = await page.$$eval('.st-learn-cat', (els) => els.length);
      expect(before, 'obje sekcije moraju biti nacrtane').toBe(2);

      await page.click('[data-st-catdel="sekcija-1"]');
      await page.waitForSelector('sokrat-confirm .sokrat-confirm__ok', { state: 'visible' });
      await page.click('sokrat-confirm .sokrat-confirm__ok');

      // Draft: sekcija-1 nestala, sekcija-2 ostala; ORIGINAL (baza) još ima obje.
      const d = await page.evaluate((nodeId) => {
        const draft = window.SokratDraft.get('node:' + nodeId, 'content');
        return { working: Object.keys(draft.working), original: Object.keys(draft.original), dirty: draft.dirty };
      }, id);
      expect(d.working).toEqual(['sekcija-2']);
      expect(d.original.sort()).toEqual(['sekcija-1', 'sekcija-2']);
      expect(d.dirty).toBe(true);

      await expect.poll(() => page.$$eval('.st-learn-cat', (els) => els.length),
        { timeout: 5000 }).toBe(1);

      // Baza NETAKNUTA dok se ne objavi.
      const stored = await readContent(page, id);
      expect(Object.keys(stored.payload).sort()).toEqual(['sekcija-1', 'sekcija-2']);

      // „Odbaci" vraća obje. NAPOMENA: odbacivanje izlazi iz draft-moda, a read-only prikaz crta
      // `.st-kv` (edit crta `.st-learn-cat`) → broji se DRUGI selektor, inače test laže.
      await page.click('#stDiscard');
      await page.waitForSelector('sokrat-confirm .sokrat-confirm__ok', { state: 'visible' });
      await page.click('sokrat-confirm .sokrat-confirm__ok');
      await expect.poll(() => page.$$eval('.st-kv', (els) => els.length),
        { timeout: 5000 }).toBe(2);
      const afterDiscard = await page.evaluate((nodeId) =>
        !window.SokratDraft.get('node:' + nodeId, 'content'), id);
      expect(afterDiscard, 'draft mora biti očišćen nakon „Odbaci"').toBe(true);
    } finally {
      await rmNode(page, id);
    }
  });

  // K/10 priprema (Leon 17.11., odluka „b"): materijal NE SMIJE ostati bez sekcija. Strogi profil (F6
  // `schema/ugc-content.schema.json`, `minProperties: 1`) odbija `{}` pri objavi — bez ovoga bi korisnik obrisao
  // jedinu sekciju, kliknuo „Objavi" i dobio grešku baze. Isto pravilo AI-jev put već ima (`alat_zadnja_lekcija`).
  test('Studio: ZADNJA sekcija se ne briše; „Objavi" bez sekcija odbija i baza ostaje netaknuta', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F4 Zadnja sekcija');
    try {
      await publishSections(page, id, 'F4 Zadnja sekcija', [
        { key: 'sekcija-1', name: 'Prva', text: 'a' },
        { key: 'sekcija-2', name: 'Druga', text: 'b' },
      ]);
      await page.evaluate((nodeId) => window.SokratStudio.openNode(nodeId, 'F4 Zadnja sekcija'), id);
      await page.waitForSelector('#editor-page.active', { timeout: 15000 });
      await page.click('#stEdit');
      await page.waitForSelector('.st-learn-cat [data-st-catdel]', { timeout: 15000 });

      // Dok su dvije, nijedna nije označena kao zadnja.
      expect(await page.$$eval('[data-st-catdel][aria-disabled="true"]', (els) => els.length)).toBe(0);
      await page.click('[data-st-catdel="sekcija-1"]');
      await page.click('sokrat-confirm .sokrat-confirm__ok');
      await expect.poll(() => page.$$eval('.st-learn-cat', (els) => els.length), { timeout: 5000 }).toBe(1);

      // Zadnja: označena, klik NE otvara potvrdu nego kaže zašto, i draft je i dalje ima.
      await expect(page.locator('[data-st-catdel="sekcija-2"]')).toHaveAttribute('aria-disabled', 'true');
      // `force`: Playwright `aria-disabled` gumb smatra onemogućenim i čekao bi ga do isteka; preglednik
      // klik propušta (aria je samo opis), a upravo taj klik mora reći ZAŠTO umjesto da tiho ne radi ništa.
      await page.click('[data-st-catdel="sekcija-2"]', { force: true });
      await expect(page.locator('#toast')).toContainText(/at least one section|barem jednu sekciju/i);
      await expect(page.locator('sokrat-confirm .sokrat-confirm__ok')).toBeHidden();
      const working = await page.evaluate((nodeId) => Object.keys(window.SokratDraft.get('node:' + nodeId, 'content').working), id);
      expect(working).toEqual(['sekcija-2']);

      // Mimo gumba (izravan op) do NULA sekcija → „Objavi" odbija PRIJE baze.
      await page.evaluate((nodeId) => window.SokratDraft.applyOp('node:' + nodeId, 'content', { type: 'removeCategory', catId: 'sekcija-2' }), id);
      await page.click('#stPublish');
      await expect(page.locator('#toast')).toContainText(/before publishing|prije objave/i);
      const stored = await readContent(page, id);
      expect(stored.version, 'objava bez sekcija ne smije stići do baze').toBe(2);
      expect(Object.keys(stored.payload).sort()).toEqual(['sekcija-1', 'sekcija-2']);
    } finally {
      await rmNode(page, id);
    }
  });
});
