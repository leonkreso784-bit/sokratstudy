// M1 — AUTORSTVO U PRAZNOM MATERIJALU (faza „Materijal od nule do učenja").
// Trajni regresijski spec (pravilo #8): SAMO `authenticated` projekt sa STAGING_*.
// PIŠE u staging kroz owner-scoped RPC-ove i sve za sobom počisti. Prod se NE dira.
//
// BUG koji ovo lovi (Leon, 2026-08-07): u vlastitom materijalu se NIJE mogla napraviti
// nijedna kartica, pitanje kviza ni dopuna. `presentModes` je označavao mod postojećim
// SAMO ako je niz nepraznan → nov materijal ima prazne nizove → tab se ne nacrta →
// nema gumba „＋ Dodaj" → prva stavka se ne može dodati NIKAD.
// Uređivači su cijelo vrijeme postojali i radili — bili su samo nedostupni.
//
// Zato prvi test gleda AFORDANCIJU (postoji li put do prve stavke), a drugi prolazi
// tim putem do kraja i provjerava da stavke prežive objavu. Kriterij 1 iz
// `docs/product/UGC_SPEC.md` traži oboje.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');
const { radnjaRetka } = require('./helpers/izbornik-retka');
// T6: editor ima vlastitu adresu — gdje točno, zna helper (jedno mjesto, ne sedamnaest).
const { otvoriAplikaciju } = require('./helpers/studio-entry');

const MODES = ['learn', 'cards', 'quiz', 'fill'];

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
  // ⚠ Spinner dijeli selektor s praznim stanjem — čekaj da NESTANE, inače test prolazi nad učitavanjem.
  await page.waitForSelector('#myMaterials .mm-spin', { state: 'detached', timeout: 20000 });
}

const mkNode = (page, p, k, n) =>
  page.evaluate(([a, b, c]) => window.SokratMaterials.createNode(a, b, c), [p, k, n]);
// ⚠️ T6: otvaranje materijala vodi na `editor.html`, gdje `SokratMaterials` ne postoji —
// čišćenje zato UVIJEK prvo vrati stranicu u aplikaciju. Bez toga četiri testa padnu na
// vlastitom pospremanju, dakle na krivom mjestu: tvrdnje su prije toga već prošle.
const rmNode = async (page, id) => {
  await otvoriAplikaciju(page);
  await page.waitForFunction(() => !!window.SokratMaterials, null, { timeout: 20000 });
  await page.evaluate((i) => window.SokratMaterials.deleteNode(i).catch(() => {}), id);
};
const readContent = (page, id) => page.evaluate(async (nodeId) => {
  const c = SokratAuth.getClient();
  const r = await c.from('node_content').select('payload,version').eq('node_id', nodeId).single();
  return r.error ? { error: r.error.message } : r.data;
}, id);

/** Otvori SVJEŽ materijal u Studiju, uđi u draft-mod i dodaj prvu sekciju. */
async function openFreshMaterialWithSection(page, name) {
  const id = await mkNode(page, null, 'study', name);
  await page.evaluate(() => window.SokratMaterials.refresh());
  const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
  await expect(row).toHaveCount(1, { timeout: 20000 });
  await radnjaRetka(row, '[data-mm-open]');

  await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });
  await page.click('#stEdit');

  // Prazan materijal → canvas nudi samo „＋ Nova sekcija" (nema nijedne kategorije).
  await page.click('#stCanvas [data-st-addcat]');
  await expect(page.locator('#stCanvas .st-learn-cat')).toHaveCount(1, { timeout: 20000 });
  return id;
}

test.describe('M1 — autorstvo u praznom materijalu', () => {
  test('nova sekcija nudi SVA ČETIRI moda, svaki s putem do prve stavke', async ({ page }) => {
    await openMaterials(page);
    const id = await openFreshMaterialWithSection(page, 'M1 Modovi');
    try {
      // ── JEZGRA REGRESIJE ──
      // Prije popravka ovdje je bio SAMO `learn` (prazni nizovi = mod „ne postoji").
      for (const mode of MODES) {
        await expect(
          page.locator('#stCanvas .st-tab[data-mode="' + mode + '"]'),
          'mod „' + mode + '" se ne nudi u praznom materijalu → prva stavka se ne može dodati'
        ).toHaveCount(1);
      }

      // Afordancija mora POSTOJATI, ne samo tab: svaki od tri kviz-modova nudi „＋ Dodaj".
      for (const [mode, type] of [['cards', 'flashcard'], ['quiz', 'quiz'], ['fill', 'fill']]) {
        await page.click('#stCanvas .st-tab[data-mode="' + mode + '"]');
        const pane = page.locator('#stCanvas .st-pane[data-pane="' + mode + '"]');
        await expect(
          pane.locator('[data-admin-add][data-type="' + type + '"]'),
          'mod „' + mode + '" nema gumb za dodavanje prve stavke'
        ).toHaveCount(1);
      }
    } finally {
      await rmNode(page, id);
    }
  });

  test('kartica + pitanje kviza + dopuna: dodaj kroz UI → objavi → prežive', async ({ page }) => {
    await openMaterials(page);
    const id = await openFreshMaterialWithSection(page, 'M1 Prva stavka');
    try {
      // ── KARTICA ──
      await page.click('#stCanvas .st-tab[data-mode="cards"]');
      await page.click('#stCanvas .st-pane[data-pane="cards"] [data-admin-add][data-type="flashcard"]');
      await page.waitForSelector('#adminEditModal #adminEditQ');
      await page.fill('#adminEditQ', 'M1 pitanje kartice');
      await page.fill('#adminEditA', 'M1 odgovor');
      await page.click('#adminEditSave');
      await expect(page.locator('#stCanvas .st-pane[data-pane="cards"] .st-edit-item')).toHaveCount(1);

      // ── PITANJE KVIZA ── (2 opcije; druga je točna)
      await page.click('#stCanvas .st-tab[data-mode="quiz"]');
      await page.click('#stCanvas .st-pane[data-pane="quiz"] [data-admin-add][data-type="quiz"]');
      await page.waitForSelector('#adminQuizModal #adminQuizQ');
      await page.fill('#adminQuizQ', 'M1 pitanje kviza');
      const opts = page.locator('#adminQuizOpts .admin-quiz-optinput');
      while (await opts.count() < 2) await page.click('#adminQuizAddOpt');
      await opts.nth(0).fill('netočno');
      await opts.nth(1).fill('točno');
      await page.locator('#adminQuizOpts input[type=radio]').nth(1).check();
      await page.click('#adminQuizSave');
      await expect(page.locator('#stCanvas .st-pane[data-pane="quiz"] .st-edit-item')).toHaveCount(1);

      // ── DOPUNA ──
      await page.click('#stCanvas .st-tab[data-mode="fill"]');
      await page.click('#stCanvas .st-pane[data-pane="fill"] [data-admin-add][data-type="fill"]');
      await page.waitForSelector('#adminFillModal #adminFillS');
      await page.fill('#adminFillS', 'M1 rečenica s _______ prazninom');
      await page.fill('#adminFillA', 'jednom');
      await page.click('#adminFillSave');
      await expect(page.locator('#stCanvas .st-pane[data-pane="fill"] .st-edit-item')).toHaveCount(1);

      // ── OBJAVA ──
      // ⚠ Objava NEMA potvrdu (za razliku od „Odbaci"/brisanja) — `#stPublish` zove publish izravno.
      await page.click('#stPublish');
      await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });

      // ── DOKAZ U BAZI: stavke su preživjele, ne samo nacrtane ──
      const saved = await readContent(page, id);
      expect(saved.error, 'node_content se ne da pročitati').toBeUndefined();
      const cat = Object.values(saved.payload)[0];
      expect(cat, 'objavljeni payload nema nijednu sekciju').toBeTruthy();
      expect(cat.flashcards.map((f) => f.question)).toContain('M1 pitanje kartice');
      expect(cat.quiz.map((q) => q.question)).toContain('M1 pitanje kviza');
      expect(cat.quiz[0].correct, 'točan odgovor nije zapamćen kao indeks 1').toBe(1);
      expect(cat.fillBlanks.map((f) => f.answer)).toContain('jednom');
      expect(saved.version, 'objava mora podići verziju').toBeGreaterThan(1);
    } finally {
      await rmNode(page, id);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// M2 — UČENJE IZ VLASTITOG MATERIJALA.
// BUG: `initStudyPage` kreće od `subjectDataMap[subjectId]` = KATALOG, a `js/navigation.js`
// nema nijednu referencu na čvorove → iz vlastitog materijala se nije moglo učiti.
// Kriteriji 2 i 3 iz `docs/product/UGC_SPEC.md`.
// ─────────────────────────────────────────────────────────────────────────────

/** Napravi materijal s gotovim sadržajem (kroz RPC — brže i neovisno o editoru). */
async function mkMaterialWithContent(page, name) {
  const id = await mkNode(page, null, 'study', name);
  await page.evaluate(async (nodeId) => {
    const c = SokratAuth.getClient();
    await c.rpc('publish_node', {
      p_node_id: nodeId,
      p_payload: {
        tema1: {
          name: 'M2 Tema', icon: 'fa-book', color: '#6366f1',
          flashcards: [{ question: 'M2 pitanje kartice', answer: 'M2 odgovor kartice' }],
          quiz: [{ question: 'M2 pitanje kviza', options: ['a', 'b'], correct: 1 }],
          fillBlanks: [{ sentence: 'M2 rečenica s _______ prazninom', answer: 'jednom' }],
          learn: { blocks: [{ id: 'b1', type: 'paragraph', text: 'M2 tijelo learna' }] }
        }
      },
      p_base_version: 1
    });
  }, id);
  await page.evaluate(() => window.SokratMaterials.refresh());
  return id;
}

/**
 * Klikni „Uči" i pričekaj da `initStudyPage` STVARNO završi.
 *
 * ⚠ Bez ovog čekanja test trči u utrku: `#study-page.active` se doda ODMAH (sinkrono), ali
 * `initStudyPage` je async i NA KRAJU sam zove `switchSection('home')`. Svaki raniji prelazak
 * na kartice bio bi pregažen, pa bi klik na gumb kartice čekao vidljivost do isteka testa.
 * Zato se čeka na STVARNI ishod — učitane podatke u `AppState.nav.data` — a ne na CSS-klasu.
 */
async function openForStudy(page, id) {
  const row = page.locator('#myMaterials .mm-row[data-mm-id="' + id + '"]');
  await expect(row).toHaveCount(1, { timeout: 20000 });
  await expect(
    row.locator('.mm-menu [data-mm-learn]'),
    'materijal nema „Uči" u izborniku → iz vlastitog sadržaja se ne može učiti'
  ).toHaveCount(1);
  // F2/5b: dodir na redak = UČENJE (Leon, anketa 14.09.) — to je put koji korisnik zapravo prolazi.
  await row.locator('[data-mm-main]').click();
  await expect(page.locator('#study-page.active')).toHaveCount(1, { timeout: 20000 });
  await page.waitForFunction(
    (nodeId) => AppState.nav.subject === 'node:' + nodeId
      && AppState.nav.data && Object.keys(AppState.nav.data).length > 0,
    id, { timeout: 20000 });
}

/** Prijeđi na mod ISTIM gumbom kojim to radi korisnik. */
async function gotoSection(page, section) {
  await page.click('.study-nav-btn[data-section="' + section + '"]');
  await expect(page.locator('#' + section + '.section.active')).toHaveCount(1, { timeout: 10000 });
}

test.describe('M2 — učenje iz vlastitog materijala', () => {
  test('„Uči" otvara study-stranicu s MOJIM sadržajem (kartice, kviz, dopune, learn)', async ({ page }) => {
    await openMaterials(page);
    const id = await mkMaterialWithContent(page, 'M2 Učenje');
    try {
      // ── JEZGRA REGRESIJE: prije M2 gumb „Uči" nije ni postojao ──
      await openForStudy(page, id);
      await expect(page.locator('#currentLessonTitle')).toHaveText('M2 Učenje');

      // Sadržaj je STVARNO moj materijal, ne neki katalog-predmet.
      const loaded = await page.evaluate(() => ({
        subject: AppState.nav.subject,
        cats: Object.keys(AppState.nav.data || {}),
        fc: (AppState.nav.data.tema1 || {}).flashcards
      }));
      expect(loaded.subject).toBe('node:' + id);
      expect(loaded.cats).toEqual(['tema1']);
      expect(loaded.fc[0].question).toBe('M2 pitanje kartice');

      // Kartice se stvarno crtaju kroz postojeći study-DOM.
      // ⚠ `toBeVisible`, ne samo `toHaveText`: tekst postoji i u SAKRIVENOJ sekciji, pa bi
      // provjera teksta prošla i da prelazak na kartice uopće nije uspio (i jednom jest).
      await gotoSection(page, 'flashcards');
      await expect(page.locator('#cardQuestion')).toBeVisible();
      await expect(page.locator('#cardQuestion')).toHaveText('M2 pitanje kartice');

      // Vježbe i slijepa karta se NE nude — materijal nema `features` (mora biti namjerno).
      await expect(page.locator('#exercisesNavBtn')).toBeHidden();
      await expect(page.locator('#blindMapNavBtn')).toBeHidden();
    } finally {
      await rmNode(page, id);
    }
  });

  test('napredak iz materijala živi pod ključem `node:<id>` i vidi ga sinkronizacija', async ({ page }) => {
    await openMaterials(page);
    const id = await mkMaterialWithContent(page, 'M2 Napredak');
    try {
      await openForStudy(page, id);

      // Označi karticu kao naučenu → napredak se mora zapisati pod ključem materijala.
      await gotoSection(page, 'flashcards');
      await page.click('#btnCorrect');

      const saved = await page.evaluate((nodeId) => {
        const raw = localStorage.getItem('node:' + nodeId);
        return raw ? JSON.parse(raw) : null;
      }, id);
      expect(saved, 'napredak materijala se nigdje ne sprema').toBeTruthy();
      expect(saved.flashcardsLearned.length).toBeGreaterThan(0);

      // Kriterij 3: ista sinkronizacija kao katalog — ključ mora biti NA POPISU za sync.
      const watched = await page.evaluate(() => CloudSync.watchedKeys());
      expect(watched, 'ključ materijala nije na popisu za sinkronizaciju').toContain('node:' + id);
    } finally {
      await rmNode(page, id);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// M3a — BOJA BLOKA (akcent). Kriterij 4 iz `docs/product/UGC_SPEC.md`.
// Ugovor §3: akcent = slobodni #rrggbb (rub + tinta), odsutno = NASLIJEDI od sekcije.
// Ovdje se dokazuje CIJELI put: klik u editoru → draft → objava → baza.
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// M3b — BOJA KARTICE / PITANJA / DOPUNE. Zatvara kriterij 4 iz `UGC_SPEC.md`.
//
// Druga površina od M3a: kartice/kviz/dopune NEMAJU zajednički prikazivač — tri
// zasebna modula pišu u FIKSNI DOM, pa nema omota u koji bi se boja umetnula.
// Akcent zato ide kao `--item-acc` na spremnik, a nasljeđivanje (sekcija → stavka)
// mora se dokazati NA STUDY-EKRANU, ne samo u bazi.
// ─────────────────────────────────────────────────────────────────────────────

/** Pročitaj akcent koji je prikazivač STVARNO postavio na spremnik. */
const accentOn = (page, sel) => page.evaluate((s) => {
  const el = document.querySelector(s);
  return el ? el.style.getPropertyValue('--item-acc').trim() : null;
}, sel);

test.describe('M3b — boja kartice, pitanja i dopune', () => {
  test('kvadratić oboji karticu → objavi → boja u bazi; „⊘" je vrati na nasljeđivanje', async ({ page }) => {
    await openMaterials(page);
    const id = await openFreshMaterialWithSection(page, 'M3b Boja kartice');
    try {
      await page.click('#stCanvas .st-tab[data-mode="cards"]');
      await page.click('#stCanvas .st-pane[data-pane="cards"] [data-admin-add][data-type="flashcard"]');
      await page.waitForSelector('#adminEditModal #adminEditQ');
      await page.fill('#adminEditQ', 'M3b pitanje');
      await page.fill('#adminEditA', 'M3b odgovor');
      await page.click('#adminEditSave');

      const stavka = page.locator('#stCanvas .st-pane[data-pane="cards"] .st-edit-item');
      await expect(stavka).toHaveCount(1);

      // ── OBOJI ── (kvadratići su skriveni do hovera — hover je dio afordancije)
      await stavka.hover();
      await stavka.locator('[data-st-icolor="#10b981"]').click();
      await expect(
        page.locator('#stCanvas .st-pane[data-pane="cards"] .st-edit-item [data-st-icolor="#10b981"].on'),
        'kvadratić se ne označi kao odabran'
      ).toHaveCount(1);

      await page.click('#stPublish');
      await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });

      const obojena = await readContent(page, id);
      const kartice = Object.values(obojena.payload)[0].flashcards;
      expect(kartice[0].color, 'boja kartice nije preživjela objavu').toBe('#10b981');

      // ── ⊘ → NASLIJEDI (ključ se MIČE, ne postaje null ni prazan niz) ──
      await page.click('#stEdit');
      await page.click('#stCanvas .st-tab[data-mode="cards"]');
      const stavka2 = page.locator('#stCanvas .st-pane[data-pane="cards"] .st-edit-item');
      await stavka2.hover();
      await stavka2.locator('[data-st-icolor=""]').click();
      await page.click('#stPublish');
      await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });

      const vracena = await readContent(page, id);
      const k2 = Object.values(vracena.payload)[0].flashcards[0];
      expect(
        Object.prototype.hasOwnProperty.call(k2, 'color'),
        '„⊘" mora UKLONITI ključ (odsutno = naslijedi), ne upisati null ili prazan niz'
      ).toBe(false);
    } finally {
      await rmNode(page, id);
    }
  });

  test('na study-ekranu: stavka bez boje NASLIJEDI sekciju, a vlastita boja je PREGAZI', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'M3b Nasljeđivanje');
    try {
      // Sekcija je zelena; kartica ima SVOJU crvenu, kviz i dopuna nemaju ništa.
      await page.evaluate(async (nodeId) => {
        const c = SokratAuth.getClient();
        await c.rpc('publish_node', {
          p_node_id: nodeId,
          p_payload: {
            tema1: {
              name: 'M3b Tema', icon: 'fa-book', color: '#10b981',
              flashcards: [{ question: 'M3b pitanje', answer: 'M3b odgovor', color: '#ef4444' }],
              quiz: [{ question: 'M3b kviz', options: ['a', 'b'], correct: 1 }],
              fillBlanks: [{ sentence: 'M3b rečenica s _______ prazninom', answer: 'jednom' }],
              learn: { blocks: [{ id: 'b1', type: 'paragraph', text: 'tijelo' }] }
            }
          },
          p_base_version: 1
        });
      }, id);
      await page.evaluate(() => window.SokratMaterials.refresh());
      await openForStudy(page, id);

      // ── KARTICA: vlastita boja pregazi sekciju ──
      await gotoSection(page, 'flashcards');
      await expect(page.locator('#cardQuestion')).toBeVisible();
      expect(await accentOn(page, '#flashcard'),
        'kartica sa svojom bojom mora pregaziti sekciju').toBe('#ef4444');

      // ── KVIZ: bez svoje boje → naslijedi sekciju ──
      await gotoSection(page, 'quiz');
      await page.evaluate(() => startQuiz());
      await expect(page.locator('#quizGame .question-card')).toBeVisible();
      expect(await accentOn(page, '#quizGame .question-card'),
        'pitanje bez boje mora naslijediti boju sekcije').toBe('#10b981');

      // ── DOPUNA: bez svoje boje → naslijedi sekciju ──
      await gotoSection(page, 'fill');
      await expect(page.locator('#fill .fill-card')).toBeVisible();
      expect(await accentOn(page, '#fill .fill-card'),
        'dopuna bez boje mora naslijediti boju sekcije').toBe('#10b981');

      // ── LEARN: boju sekcije nosi kartica sekcije ──
      // Neobojan blok NEMA omot koji bi se obojao (renderer ga namjerno ne stvara), pa se
      // nasljeđivanje na studentskoj strani vidi na kartici. Do M3b se `--st-acc` postavljao
      // samo u Studiju → onaj tko uči nije vidio boju sekcije nigdje u learnu.
      await gotoSection(page, 'learn');
      const learnAcc = await page.evaluate(() => {
        const el = document.querySelector('#learn .learn-card');
        return el ? el.style.getPropertyValue('--st-acc').trim() : null;
      });
      expect(learnAcc, 'learn-kartica ne pokazuje boju sekcije onome tko uči').toBe('#10b981');
    } finally {
      await rmNode(page, id);
    }
  });

  // F6 ②/0b: nevaljanu boju od 30.09. ne prima ni BAZA (strogi profil na `publish_node`), pa se
  // do prikazivača više ne da dovesti kroz objavu. Obje linije stoje: ovdje se mjeri baza, a da
  // prikazivač i dalje pada na sekciju mjeri unit `blocks-renderer` (`accentFrom`, '#fff').
  test('NEVALJANA boja stavke: baza je ne primi, materijal ostaje netaknut', async ({ page }) => {
    await openMaterials(page);
    const id = await mkNode(page, null, 'study', 'M3b Nevaljana boja');
    try {
      const ishod = await page.evaluate(async (nodeId) => {
        const c = SokratAuth.getClient();
        const r = await c.rpc('publish_node', {
          p_node_id: nodeId,
          p_payload: {
            tema1: {
              name: 'M3b Tema', icon: 'fa-book', color: '#6366f1',
              // Namjerno NEVALJANE boje: baza ih mora odbiti (②/0b), prikazivač ih ne interpolira.
              flashcards: [{ question: 'p', answer: 'o', color: '#fff' }],
              quiz: [{ question: 'q', options: ['a', 'b'], correct: 0 }],
              fillBlanks: [{ sentence: 'r _______ x', answer: 'y' }],
              learn: { blocks: [{ id: 'b1', type: 'paragraph', text: 'tijelo' }] }
            }
          },
          p_base_version: 1
        });
        const { data } = await c.from('node_content').select('version').eq('node_id', nodeId).single();
        return { poruka: r.error ? r.error.message : null, verzija: data && data.version };
      }, id);
      // `#fff` je nevaljan (traži se točno 6 znamenki) → baza odbija imenovanom greškom.
      expect(ishod.poruka, 'baza je primila nevaljanu boju stavke').toMatch(/^sadrzaj_neispravan/);
      expect(ishod.verzija, 'odbijena objava je ipak promijenila materijal').toBe(1);
    } finally {
      await rmNode(page, id);
    }
  });
});

test.describe('M3a — boja bloka', () => {
  test('kvadratić oboji blok → objavi → boja u bazi; „⊘" je vrati na nasljeđivanje', async ({ page }) => {
    await openMaterials(page);
    const id = await openFreshMaterialWithSection(page, 'M3 Boja');
    try {
      // Nova sekcija sije `learn: { blocks: [] }` → dodaj prvi blok.
      await page.click('#stCanvas .st-tab[data-mode="learn"]');
      await page.click('#stCanvas .be-bigplus, #stCanvas .be-add');
      const tip = page.locator('.be-menu button, [data-be-type]').first();
      await tip.click();
      const blok = page.locator('#stCanvas .be-block').first();
      await expect(blok).toHaveCount(1, { timeout: 10000 });

      // ── OBOJI ──
      await blok.locator('[data-be-bcolor="#10b981"]').click();
      await expect(
        page.locator('#stCanvas .be-block [data-be-bcolor="#10b981"].on'),
        'kvadratić se ne označi kao odabran'
      ).toHaveCount(1);

      await page.click('#stPublish');
      await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });

      const obojen = await readContent(page, id);
      const blokovi = Object.values(obojen.payload)[0].learn.blocks;
      expect(blokovi[0].color, 'boja bloka nije preživjela objavu').toBe('#10b981');

      // ── ⊘ → NASLIJEDI (ključ se MIČE, ne postaje null/prazan string) ──
      await page.click('#stEdit');
      await page.click('#stCanvas .st-tab[data-mode="learn"]');
      await page.locator('#stCanvas .be-block').first().locator('[data-be-bcolor=""]').click();
      await page.click('#stPublish');
      await page.waitForSelector('#stEdit:not([hidden])', { timeout: 20000 });

      const vracen = await readContent(page, id);
      const b2 = Object.values(vracen.payload)[0].learn.blocks[0];
      expect(
        Object.prototype.hasOwnProperty.call(b2, 'color'),
        '„⊘" mora UKLONITI ključ (odsutno = naslijedi), ne upisati null ili prazan niz'
      ).toBe(false);
    } finally {
      await rmNode(page, id);
    }
  });
});

// ── U1 (R1-UX, Leon uživo 2026-09-02): korisnik NE SMIJE ostati zarobljen u jednoj sekciji ──
// Jedina afordancija za novu sekciju bila je u st-metas retku na VRHU canvasa, koji skrola
// iz vida čim se radi na blokovima. Ovaj test zabija: na DNU learn panea postoji
// .st-addcat-foot i klik na njega STVARNO dodaje drugu sekciju.
test('U1: „＋ Nova sekcija" postoji na dnu learn panea i dodaje drugu sekciju', async ({ page }) => {
  await openMaterials(page);
  const id = await openFreshMaterialWithSection(page, 'U1 Druga sekcija');
  try {
    const foot = page.locator('#stCanvas .st-pane[data-pane="learn"] .st-addcat-foot');
    await expect(foot, 'dno learn panea nema afordanciju za novu sekciju').toHaveCount(1);
    await foot.click();
    await expect(page.locator('#stCanvas .st-learn-cat')).toHaveCount(2, { timeout: 20000 });
  } finally {
    await rmNode(page, id);
  }
});
