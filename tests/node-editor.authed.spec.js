// F3 K1 — EDITOR U ČVORU: IO-šav `SokratAdmin.studioBridge` vezan na `node_content`.
// Trajni regresijski spec (pravilo #8): SAMO `authenticated` projekt sa STAGING_*.
// PIŠE u staging kroz owner-scoped RPC-ove i sve za sobom počisti. Prod se NE dira.
//
// Dokazuje ugovor faze F3: otvori study-čvor → uredi → `publish_node` → ponovno učitaj =
// sadržaj ostao + audit-redak zapisan + `base_version` lovi tuđu izmjenu.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');
const { radnjaRetka } = require('./helpers/izbornik-retka');
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
// ⚠️ T6: čišćenje traži APLIKACIJU. `SokratMaterials` ne postoji na stranici editora, a
// test ondje često i završi — bez povratka kući `finally` bi rušio test umjesto da čisti.
const rmNode = async (page, id) => {
  await otvoriAplikaciju(page);
  await page.waitForFunction(() => !!window.SokratMaterials, null, { timeout: 20000 });
  await page.evaluate((i) => window.SokratMaterials.deleteNode(i).catch(() => {}), id);
};

/** Pročitaj `node_content` izravno (anon/user JWT + owner-RLS). */
const readContent = (page, id) => page.evaluate(async (nodeId) => {
  const c = SokratAuth.getClient();
  const r = await c.from('node_content').select('payload,version').eq('node_id', nodeId).single();
  return r.error ? { error: r.error.message } : r.data;
}, id);

test.describe('F3 — editor u čvoru (studioBridge → node_content)', () => {
  test('novi study-čvor ima PRAZAN payload i može u draft-mod', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Prazan');
    try {
      // T6: bridge živi na stranici editora — dotad je bio u istom dokumentu kao polica.
      await otvoriStudio(page);
      // `create_node` upisuje redak s `{}` → prazno je legitimno početno stanje, ne greška.
      expect(await readContent(page, id)).toEqual({ payload: {}, version: 1 });

      const entered = await page.evaluate(async (nodeId) => {
        const b = window.SokratAdmin.studioBridge;
        b.setNode(nodeId, 'F3 Prazan', null);
        await b.enter();
        return { editing: b.isEditing(), working: b.workingData(), ctx: b.nodeCtx() };
      }, id);
      expect(entered.editing, 'nije ušao u draft-mod nad praznim čvorom').toBe(true);
      expect(entered.working).toEqual({});
      expect(entered.ctx.nodeId).toBe(id);
    } finally {
      await rmNode(page, id);
    }
  });

  test('uredi → publish_node → ponovno učitaj: sadržaj ostao + verzija + audit-redak', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Objava');
    try {
      // T6: bridge živi na stranici editora — dotad je bio u istom dokumentu kao polica.
      await otvoriStudio(page);
      const res = await page.evaluate(async (nodeId) => {
        const b = window.SokratAdmin.studioBridge;
        b.setNode(nodeId, 'F3 Objava', null);
        await b.enter();
        // Ista draft-mašinerija kao admin: op → working → publish (nema posebnog puta za čvor).
        const opRes = window.SokratDraft.applyOp('node:' + nodeId, 'content', {
          type: 'addCategory',
          catId: 'uvod',
          category: {
            name: 'Uvod', icon: 'fa-book', color: '#6366f1',
            flashcards: [{ question: 'Pitanje 1', answer: 'Odgovor 1' }],
            quiz: [], fillBlanks: []
          }
        });
        const d = window.SokratDraft.get('node:' + nodeId, 'content');
        // ⚠️ `dirty` se čita PRIJE objave — `commitDone` ga re-baselinea na false.
        const dirtyBefore = !!(d && d.dirty);
        await b.publish();
        return { opRes: opRes, dirtyBefore: dirtyBefore, editingAfter: b.isEditing() };
      }, id);
      expect(res.dirtyBefore, 'op nije ušao u draft (applyOp: '
        + JSON.stringify(res.opRes) + ')').toBe(true);
      expect(res.editingAfter, 'nije izašao iz draft-moda nakon objave').toBe(false);

      // 1) sadržaj je STVARNO u bazi, s bumpanom verzijom
      const after = await readContent(page, id);
      expect(after.version, 'verzija nije bumpana').toBe(2);
      expect(after.payload.uvod.name).toBe('Uvod');
      expect(after.payload.uvod.flashcards[0].question).toBe('Pitanje 1');

      // 2) audit: `node_content_versions` je dobio snimku (append-only)
      const audit = await page.evaluate(async (nodeId) => {
        const c = SokratAuth.getClient();
        const r = await c.from('node_content_versions').select('id,op').eq('node_id', nodeId);
        return r.error ? { error: r.error.message } : r.data.length;
      }, id);
      expect(audit, 'audit-redak nije zapisan').toBeGreaterThanOrEqual(1);
    } finally {
      await rmNode(page, id);
    }
  });

  test('base_version lovi tuđu izmjenu (publish_version_conflict)', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Konflikt');
    try {
      // T6: bridge živi na stranici editora — dotad je bio u istom dokumentu kao polica.
      await otvoriStudio(page);
      const err = await page.evaluate(async (nodeId) => {
        const c = SokratAuth.getClient();
        // netko drugi (drugi tab/uređaj) objavi PRIJE nas → verzija u bazi odmakne
        await c.rpc('publish_node', { p_node_id: nodeId, p_payload: { a: { name: 'A' } }, p_base_version: 1 });
        // mi objavljujemo na ZASTARJELU bazu
        const r = await c.rpc('publish_node', { p_node_id: nodeId, p_payload: { b: { name: 'B' } }, p_base_version: 1 });
        return r.error ? r.error.message : null;
      }, id);
      expect(err, 'zastarjeli base_version je prošao — optimistic concurrency ne radi').toMatch(/publish_version_conflict/);

      // izgubljeni pokušaj NIJE upisan
      const after = await readContent(page, id);
      expect(after.payload).toEqual({ a: { name: 'A' } });
    } finally {
      await rmNode(page, id);
    }
  });

  // ── K2 — ULAZ: klik na study-čvor otvara Studio vezan na taj čvor ──
  test('K2: klik „Uredi gradivo" otvara Studio na čvoru (crumb, naslov, panel)', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Ulaz');
    try {
      // pripremi sadržaj da canvas ima što nacrtati
      await page.evaluate(async (nodeId) => {
        const c = SokratAuth.getClient();
        await c.rpc('publish_node', {
          p_node_id: nodeId,
          p_payload: { uvod: { name: 'Uvod', flashcards: [{ question: 'P1', answer: 'O1' }], quiz: [], fillBlanks: [] } },
          p_base_version: 1
        });
      }, id);
      await page.evaluate(() => window.SokratMaterials.refresh());

      const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
      await expect(row).toHaveCount(1, { timeout: 20000 });
      await radnjaRetka(row, '[data-mm-open]');

      // 1) prebacio se na editor-stranicu i zna koji je čvor
      await expect(page.locator('#editor-page')).toHaveClass(/active/, { timeout: 20000 });
      // K2b: mrvica Studija je obrisana; polozaj sada nosi GLOBALNI drugi red.
      await expect(page.locator('#crumbs')).toContainText('F3 Ulaz', { timeout: 20000 });

      // 2) aside je panel ČVORA, ne katalog-stablo
      await expect(page.locator('#editor-page .st-nodename')).toHaveText('F3 Ulaz');
      await expect(page.locator('#stTree')).toHaveCount(0);

      // 3) canvas je nacrtao sadržaj čvora (naslov = naziv čvora), a bridge je u node-modu
      await expect(page.locator('#editor-page .st-head h1')).toHaveText('F3 Ulaz', { timeout: 20000 });
      expect(await page.evaluate(() => window.SokratAdmin.studioBridge.nodeCtx().nodeId)).toBe(id);

      // 4) „Uredi" je ponuđen (čvor je uredljiv) — bez toga K3 nema gdje početi
      await expect(page.locator('#stEdit')).toBeVisible();
    } finally {
      await rmNode(page, id);
    }
  });

  // C0: odredište je stranica vlastitog materijala, ne profil — ondje stablo i živi.
  test('K2: „natrag" iz Studija vraća na vlastiti materijal (ne na katalog)', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Natrag');
    try {
      await page.evaluate(() => window.SokratMaterials.refresh());
      const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
      await expect(row).toHaveCount(1, { timeout: 20000 });
      await radnjaRetka(row, '[data-mm-open]');
      await expect(page.locator('#editor-page')).toHaveClass(/active/, { timeout: 20000 });

      await page.click('#pathbarBack');   // K2b: jedan gumb natrag
      await expect(page.locator('#materials-page')).toHaveClass(/active/, { timeout: 20000 });
      await expect(page.locator('#myMaterials .mm-bar')).toBeVisible();
    } finally {
      await rmNode(page, id);
    }
  });

  // ── K3 — PRAZAN ČVOR: mora postojati put od `{}` do sadržaja ──
  test('K3: prazan čvor → „Uredi" → „＋ Nova sekcija" → Objavi → sadržaj u bazi', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 OdNule');
    try {
      await page.evaluate(() => window.SokratMaterials.refresh());
      const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
      await expect(row).toHaveCount(1, { timeout: 20000 });
      await radnjaRetka(row, '[data-mm-open]');
      await expect(page.locator('#editor-page')).toHaveClass(/active/, { timeout: 20000 });

      // prazan čvor: nema modova, ali NIJE slijepa ulica — „Uredi" postoji
      await expect(page.locator('#editor-page .st-empty')).toBeVisible({ timeout: 20000 });
      await page.click('#stEdit');

      // u edit-modu prazno stanje nudi „＋ Nova sekcija"
      const add = page.locator('#editor-page [data-st-addcat]').first();
      await expect(add).toBeVisible({ timeout: 20000 });
      await add.click();

      // sekcija se pojavila i Learn je odmah aktivan (ima gdje pisati)
      await expect(page.locator('#editor-page .st-tabs')).toBeVisible({ timeout: 20000 });
      await expect(page.locator('#editor-page .st-pane[data-pane="learn"]')).toHaveCount(1);
      await expect(page.locator('#stDraftChip')).toHaveClass(/dirty/);

      // objavi → sadržaj je STVARNO u bazi
      await page.click('#stPublish');
      await expect(page.locator('#stDraftChip')).not.toHaveClass(/dirty/, { timeout: 20000 });

      const saved = await readContent(page, id);
      expect(saved.version).toBe(2);
      const keys = Object.keys(saved.payload);
      expect(keys).toContain('sekcija-1');
      expect(saved.payload['sekcija-1'].learn.blocks).toEqual([]);
      expect(saved.payload['sekcija-1'].flashcards).toEqual([]);
    } finally {
      await rmNode(page, id);
    }
  });

  test('K3: druga sekcija dobiva NESUDARAJUĆI ključ', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Dvije');
    try {
      await page.evaluate(() => window.SokratMaterials.refresh());
      const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
      await expect(row).toHaveCount(1, { timeout: 20000 });
      await radnjaRetka(row, '[data-mm-open]');
      await expect(page.locator('#editor-page')).toHaveClass(/active/, { timeout: 20000 });
      await page.click('#stEdit');

      await page.locator('#editor-page [data-st-addcat]').first().click();
      await expect(page.locator('#editor-page .st-tabs')).toBeVisible({ timeout: 20000 });
      await page.locator('#editor-page [data-st-addcat]').first().click();

      await page.click('#stPublish');
      await expect(page.locator('#stDraftChip')).not.toHaveClass(/dirty/, { timeout: 20000 });

      const saved = await readContent(page, id);
      const keys = Object.keys(saved.payload).sort();
      expect(keys, 'druga sekcija je pregazila prvu').toEqual(['sekcija-1', 'sekcija-2']);
    } finally {
      await rmNode(page, id);
    }
  });

  test('setLesson gasi node-mod (povratak na klasični predmet ne piše u čvor)', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'F3 Prebacivanje');
    try {
      // T6: bridge živi na stranici editora — dotad je bio u istom dokumentu kao polica.
      await otvoriStudio(page);
      const ctx = await page.evaluate(async (nodeId) => {
        const b = window.SokratAdmin.studioBridge;
        b.setNode(nodeId, 'F3 Prebacivanje', null);
        const inNode = !!b.nodeCtx();
        b.setLesson('marketing', 'midterm-1', null);
        return { inNode: inNode, afterLesson: b.nodeCtx() };
      }, id);
      expect(ctx.inNode).toBe(true);
      expect(ctx.afterLesson, 'node-kontekst preživio povratak na predmet').toBeNull();
    } finally {
      await rmNode(page, id);
    }
  });
});
