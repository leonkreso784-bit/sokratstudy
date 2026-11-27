// Regresija BUG-056: izbor kategorije na Home-u nije radio NIŠTA.
//
// ZAŠTO OVAJ TEST POSTOJI. `AppState.nav.category` je do ovog popravka bio stanje koje se
// ZAPISUJE a nigdje ne ČITA: klik na karticu u „Odaberi kategoriju za učenje" podigao bi
// toast i spremio izbor u localStorage (24 h), ali nijedan od četiri načina učenja nije ga
// pitao. Quick Start gumb „Brzi kviz" ga je čak izričito gazio s 'all'. Korisnik je dakle
// dobivao potvrdu za radnju koja se nikad nije dogodila — a nijedna brana to nije vidjela
// jer ni jedan spec nije dirao `.category-btn` ni Quick Start gumbe.
//
// ŠTO TVRDI. Nakon izbora kategorije sva ČETIRI moda gledaju samo nju (kviz, learn, kartice,
// dopune), a ponovni klik na istu karticu izbor PONIŠTI i sva se četiri vrate na cijelu lekciju.
//
// ⚠️ DRUGA POLOVICA JE JEDNAKO VAŽNA KAO PRVA. Prvi predloženi popravak sužavao je postojeći
// špil (`deck.filter(...)`) bez obnove iz izvora. To prođe jednom, a onda se sužavanja SLAŽU:
// tko uđe s kategorijom A ostao bi na A zauvijek, i kad poslije uđe bez ikakvog izbora. Zato
// ovdje nije dovoljno dokazati da se filtar primijeni — mora se dokazati i da se špil VRATI.
// Bez toga je ovo isti razred curenja koji je BUG-020 već jednom platio na dijeljenom DOM-u.
const { test, expect } = require('@playwright/test');
const { ucitajPakete } = require('./helpers/paketi');

test('izbor kategorije drži u sva četiri moda i poništava se (BUG-056)', async ({ page }) => {
  // Traženje fixturea učita sadržaj više predmeta dok ne nađe prikladan — to je mreža, ne račun.
  test.setTimeout(120_000);

  await page.goto('/');
  await ucitajPakete(page, ['study']);   // kartice/kviz/dopune/learn stižu s paketom
  await page.waitForFunction(() =>
    window.SOKRAT_CATALOG && window.navigateTo && window.switchSection &&
    window.aktivnaKategorija && window.primijeniKategoriju);

  // ── FIXTURE ─────────────────────────────────────────────────────────────────────────
  // Treba lekcija s BAREM DVIJE kategorije koje obje imaju i kartice i dopune: s jednom
  // kategorijom „filtrirano" i „nefiltrirano" izgledaju identično, pa test ne bi RAZLIKOVAO
  // popravak od kvara. Predmet se ne zakucava — katalog je izvor istine, a sadržaj se mora
  // učitati da bi se kategorije uopće vidjele (katalog zna samo putanje skripti).
  const fixture = await page.evaluate(async () => {
    const kandidati = window.SOKRAT_CATALOG.subjects
      .map((s) => {
        const lekcija = (s.lessons || []).find((l) => window.SokratCatalog.resolveDataVar(s.id, l.id));
        return lekcija ? { id: s.id, lesson: lekcija.id } : null;
      })
      .filter(Boolean)
      .slice(0, 10);

    for (const k of kandidati) {
      const sirovo = await window.SokratContent.loadLesson(k.id, k.lesson);
      const data = window.getStudyData(sirovo);
      // `getStudyData` jamči da su sva tri polja nizovi — meta-ključ ne može proći (BUG-055).
      const pune = window.getCategories(data)
        .filter((c) => data[c].flashcards.length > 0 && data[c].fillBlanks.length > 0);
      if (pune.length >= 2) return { ...k, kategorije: pune.slice(0, 2) };
    }
    return null;
  });

  expect(fixture, 'treba lekcija s ≥2 kategorije koje imaju I kartice I dopune — bez toga test ne razlikuje popravak od kvara').not.toBeNull();
  const meta = fixture.kategorije[0];   // ovu biramo
  const druga = fixture.kategorije[1];  // ova dokazuje da nefiltrirano stanje obuhvaća više od jedne

  // ── SONDA ───────────────────────────────────────────────────────────────────────────
  const probe = () => {
    const filtar = document.querySelector('.learn-filter .filter-btn.active');
    const kartica = document.querySelector('.category-btn.active');
    const jedinstvene = (niz) => [...new Set(niz.map((x) => x.category))].sort();
    return {
      navKat: window.AppState.nav.category,
      aktivna: window.aktivnaKategorija(),
      quizSel: document.getElementById('quizCategory').value,
      learnFiltar: filtar ? filtar.dataset.filter : null,
      aktivnaKartica: kartica ? kartica.dataset.category : null,
      deckKat: jedinstvene(window.AppState.cards.deck),
      deckLen: window.AppState.cards.deck.length,
      fillKat: jedinstvene(window.AppState.fill.questions),
      fillLen: window.AppState.fill.questions.length,
    };
  };

  // Klik tražimo po `dataset`, ne CSS-selektorom: ključ kategorije dolazi iz sadržaja i
  // smije sadržavati znakove koje bi selektor trebao escapeati.
  const kliknikarticu = (kat) => {
    const btn = [...document.querySelectorAll('.category-btn')].find((b) => b.dataset.category === kat);
    if (!btn) throw new Error('nema kartice kategorije: ' + kat);
    btn.click();
  };

  // ── 1) Otvori lekciju i postavi determinističnu polazišnu točku ─────────────────────
  await page.evaluate(({ id, lesson }) => window.navigateTo('study', { subject: id, lesson }), fixture);
  await page.waitForFunction((id) => window.isSubjectContentLoaded && window.isSubjectContentLoaded(id), fixture.id, { timeout: 15000 });

  // `nav.category` preživi 24 h kroz `restoreLastPosition`, pa prethodna sesija može zagaditi
  // polazište. Izričito ga vraćamo na 'all' da mjerimo popravak, a ne zatečeno stanje.
  await page.evaluate(() => { window.AppState.nav.category = 'all'; window.primijeniKategoriju(); });
  await page.waitForTimeout(150);

  const prije = await page.evaluate(probe);
  expect(prije.aktivna, "bez izbora `aktivnaKategorija()` vraća null").toBeNull();
  expect(prije.quizSel, 'kviz polazi od svih kategorija').toBe('all');
  expect(prije.deckKat, 'špil bez filtra mora obuhvaćati OBJE kategorije fixturea').toEqual(expect.arrayContaining([meta, druga]));
  expect(prije.fillKat, 'dopune bez filtra moraju obuhvaćati OBJE kategorije fixturea').toEqual(expect.arrayContaining([meta, druga]));

  // Kartica mora biti i STVARNO vidljiva, ne samo postojati u DOM-u: ovo je jedini ulaz u
  // izbor kategorije, a kontrola koja se ne da kliknuti je isti kvar u drugom ruhu (BUG-032).
  // Do nje se ide po REDNOM BROJU, ne atributnim selektorom: ključ kategorije dolazi iz
  // sadržaja i smije sadržavati znakove koje bi selektor trebao escapeati.
  const redniBroj = await page.evaluate(
    (kat) => [...document.querySelectorAll('.category-btn')].findIndex((b) => b.dataset.category === kat),
    meta);
  expect(redniBroj, 'kartica odabrane kategorije mora postojati u DOM-u').toBeGreaterThanOrEqual(0);
  await expect(page.locator('.category-btn').nth(redniBroj)).toBeVisible();

  // ── 2) Odaberi kategoriju → sva četiri moda je moraju poštovati ─────────────────────
  await page.evaluate(kliknikarticu, meta);
  await page.waitForTimeout(150);

  const poslije = await page.evaluate(probe);
  expect(poslije.navKat, 'klik upisuje izbor u stanje').toBe(meta);
  expect(poslije.aktivna, '`aktivnaKategorija()` vraća odabranu').toBe(meta);
  expect(poslije.aktivnaKartica, 'odabrana kartica nosi `active`').toBe(meta);
  expect(poslije.quizSel, 'KVIZ: dropdown mora stajati na odabranoj (prije popravka ga je `startQuickQuiz` gazio s "all")').toBe(meta);
  expect(poslije.learnFiltar, 'LEARN: aktivan filter-čip mora biti odabrana kategorija (prije popravka je ostajao "all")').toBe(meta);
  expect(poslije.deckKat, 'KARTICE: špil smije sadržavati SAMO odabranu kategoriju').toEqual([meta]);
  expect(poslije.deckLen, 'suženi špil ne smije biti prazan').toBeGreaterThan(0);
  expect(poslije.fillKat, 'DOPUNE: smiju sadržavati SAMO odabranu kategoriju').toEqual([meta]);
  expect(poslije.fillLen, 'sužene dopune ne smiju biti prazne').toBeGreaterThan(0);

  // ── 3) Ponovni klik PONIŠTAVA izbor → sve se vraća na cijelu lekciju ────────────────
  // Ovo je rub zbog kojeg test postoji u ovom obliku: sužavanje bez obnove iz izvora prođe
  // korak 2 i padne ovdje, jer se špil nikad ne vrati.
  await page.evaluate(kliknikarticu, meta);
  await page.waitForTimeout(150);

  const natrag = await page.evaluate(probe);
  expect(natrag.navKat, 'ponovni klik na istu karticu poništava izbor').toBe('all');
  expect(natrag.aktivna, 'poslije poništenja nema aktivne kategorije').toBeNull();
  expect(natrag.aktivnaKartica, 'nijedna kartica ne smije ostati `active`').toBeNull();
  expect(natrag.quizSel, 'KVIZ se vraća na sve kategorije').toBe('all');
  expect(natrag.deckKat, 'KARTICE: špil se mora VRATITI na obje kategorije — ako ostane sužen, sužavanja se slažu (isti razred curenja kao BUG-020)').toEqual(expect.arrayContaining([meta, druga]));
  expect(natrag.deckLen, 'vraćeni špil mora biti veći od suženog').toBeGreaterThan(poslije.deckLen);
  expect(natrag.fillKat, 'DOPUNE se moraju vratiti na obje kategorije').toEqual(expect.arrayContaining([meta, druga]));
  expect(natrag.fillLen, 'vraćene dopune moraju biti brojnije od suženih').toBeGreaterThan(poslije.fillLen);
});

// Zasebna tvrdnja, zasebna posljedica: izbor iz PROŠLE lekcije ne smije „procuriti" u novu.
// Kategorije su lokalne za lekciju (ključevi se razlikuju), a `nav.category` preživi navigaciju
// jer ga `saveCurrentPosition` serijalizira. Bez zaštite bi novi predmet filtrirao po ključu
// koji u njemu ne postoji → prazan špil i prazan kviz, bez ijedne poruke zašto.
test('zastarjela kategorija iz prošle lekcije ne filtrira novu (BUG-056)', async ({ page }) => {
  test.setTimeout(60_000);

  await page.goto('/');
  await ucitajPakete(page, ['study']);
  await page.waitForFunction(() =>
    window.SOKRAT_CATALOG && window.navigateTo && window.aktivnaKategorija);

  const sub = await page.evaluate(() => {
    const s = window.SOKRAT_CATALOG.subjects
      .map((x) => {
        const l = (x.lessons || []).find((y) => window.SokratCatalog.resolveDataVar(x.id, y.id));
        return l ? { id: x.id, lesson: l.id } : null;
      })
      .filter(Boolean)[0];
    return s || null;
  });
  expect(sub, 'treba barem jedan predmet s rješivom lekcijom').not.toBeNull();

  await page.evaluate(({ id, lesson }) => window.navigateTo('study', { subject: id, lesson }), sub);
  await page.waitForFunction((id) => window.isSubjectContentLoaded && window.isSubjectContentLoaded(id), sub.id, { timeout: 15000 });

  // Podmetni ključ koji u ovoj lekciji sigurno ne postoji — točno ono što ostane iza prelaska
  // na drugi predmet ili iza 24-satne obnove pozicije.
  const ishod = await page.evaluate(() => {
    window.AppState.nav.category = 'ova-kategorija-ne-postoji';
    window.primijeniKategoriju();
    return {
      aktivna: window.aktivnaKategorija(),
      quizSel: document.getElementById('quizCategory').value,
      deckLen: window.AppState.cards.deck.length,
    };
  });

  expect(ishod.aktivna, 'nepoznat ključ se NE smije smatrati izborom').toBeNull();
  expect(ishod.quizSel, 'kviz pada natrag na sve kategorije').toBe('all');
  expect(ishod.deckLen, 'špil ne smije ostati prazan zbog ključa iz druge lekcije').toBeGreaterThan(0);
});
