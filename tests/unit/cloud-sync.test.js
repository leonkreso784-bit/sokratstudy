/* eslint-disable no-console */
// ===== Node unit testovi za CloudSync — cigla P4 (faza POLICA) =====
// Pokreni: `npm run test:unit` (ili: node tests/unit/cloud-sync.test.js)
//
// ⚠️ ZAŠTO P4 NE GRADI NIŠTA NEGO DOKAZUJE: sinkronizacija je offline-first od F-faze
// i radi. Ali cijela faza POLICA obećava učenje BEZ MREŽE, a to obećanje ima naličje
// koje dosad nitko nije mjerio: što se dogodi s tim napretkom kad se mreža vrati.
//
// Dva su načina da se napredak izgubi, i oba su tiha:
//   ① MERGE koji preferira udaljeno → sve naučeno offline nestane pri prvoj prijavi;
//   ② PUSH koji se označi kao obavljen iako je pao → promjena se nikad ne pošalje.
// Nijedan se ne vidi kao greška. Korisnik samo jednog dana ima manje nego jučer.
//
// `SokratAuth`, `localStorage` i `subjectDataMap` se u kodu referenciraju GOLO
// (leksički globali, v. CLAUDE.md), pa se ovdje predaju kao PARAMETRI funkcije —
// parametar zasjeni globalni pretražitelj imena. `setInterval` isto: bez njega bi
// `start()` ostavio pravi tajmer i Node ne bi izašao.

const assert = require('assert');
const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;
function test(name, fn) {
  try { fn(); passed++; console.log('  ✓ ' + name); }
  catch (e) { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
}
function testAsync(name, fn) {
  return fn().then(
    () => { passed++; console.log('  ✓ ' + name); },
    (e) => { failed++; console.error('  ✗ ' + name + '\n      ' + e.message); }
  );
}

console.log('\n=== cloud-sync (P4 · POLICA) ===\n');

const ROOT = path.join(__dirname, '..', '..');
const KOD = fs.readFileSync(path.join(ROOT, 'js', 'cloud-sync.js'), 'utf8');

function lazniLocalStorage(pocetno) {
  const m = new Map(Object.entries(pocetno || {}));
  return {
    _m: m,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); }
  };
}

/**
 * Svježa instanca.
 * @param {object} o `{ ls, klijent, predmeti }`
 */
function load(o) {
  const opts = o || {};
  const ls = opts.ls || lazniLocalStorage();
  const slusaci = [];
  const ticks = [];
  const win = { addEventListener: () => {}, t: null };
  const doc = { addEventListener: () => {}, visibilityState: 'visible' };
  const predmeti = opts.predmeti || { statistics: { storageKey: 'statistics-progress' } };
  const auth = {
    getClient: () => opts.klijent || null,
    setSyncInfo: () => {},
    onChange: (fn) => slusaci.push(fn)
  };
  const CS = new Function(
    'window', 'document', 'localStorage', 'subjectDataMap', 'SokratAuth', 'setInterval',
    KOD + '\n;return CloudSync;'
  )(win, doc, ls, predmeti, auth, (fn) => { ticks.push(fn); return 1; });
  return { CS: CS, ls: ls, ticks: ticks };
}

const M = load().CS.mergeValues;

// ── PRAVILA SPAJANJA ───────────────────────────────────────────────────
test('brojači idu na MAX — offline naučeno ne smije pasti na udaljenu brojku', () => {
  assert.strictEqual(M(12, 5), 12);
  assert.strictEqual(M(5, 12), 12);
});

test('id-evi naučenih kartica idu u UNIJU, bez duplikata', () => {
  assert.deepStrictEqual(M(['a', 'b'], ['b', 'c']).sort(), ['a', 'b', 'c']);
});

// BUG-048: do 12.09. je ovdje stajalo „pobjeđuje DULJE" — i test je to TVRDIO. Dva uređaja
// s po jednim kvizom ([80] i [90]) davala su [80]: rezultat s drugog uređaja je nestajao,
// a nijedan test nije pao jer je upravo to očekivao. Pravilo je sad MULTISKUP-MAKSIMUM po
// vrijednosti: svaka vrijednost preživi u onoliko primjeraka koliko ih ima strana s više.
test('⛔ polja koja nisu stringovi (quizScores) → NIJEDNA vrijednost ne nestaje (multiskup-max)', () => {
  assert.deepStrictEqual(M([80], [90]).slice().sort(), [80, 90]);
  assert.deepStrictEqual(M([90], [80]).slice().sort(), [80, 90]);
  assert.deepStrictEqual(M([{ s: 1 }, { s: 2 }], [{ s: 3 }]).length, 3);
});

test('isti rezultat dvaput na JEDNOM uređaju ostaje dvaput (multiskup, ne skup)', () => {
  assert.deepStrictEqual(M([80, 80], [80]), [80, 80]);
  assert.deepStrictEqual(M([80], [80, 80]), [80, 80]);
});

test('spajanje istog stanja sa samim sobom ne raste (idempotentno — inače bi svaki pull duplicirao)', () => {
  assert.deepStrictEqual(M([80, 90, 80], [80, 90, 80]), [80, 90, 80]);
});

test('stari brojčani zapisi naučenih kartica (indeksi, BUG-047) se isto spajaju bez gubitka', () => {
  assert.deepStrictEqual(M([0, 1], [2, 3]).slice().sort(), [0, 1, 2, 3]);
});

test('objekti se spajaju REKURZIVNO (napredak je ugniježđen po kategorijama)', () => {
  const spoj = M(
    { probability: { cardsStudied: 9, learned: ['p1'] } },
    { probability: { cardsStudied: 4, learned: ['p2'] } }
  );
  assert.strictEqual(spoj.probability.cardsStudied, 9);
  assert.deepStrictEqual(spoj.probability.learned.sort(), ['p1', 'p2']);
});

test('null/undefined s jedne strane → druga strana preživi cijela', () => {
  assert.deepStrictEqual(M(null, { a: 1 }), { a: 1 });
  assert.deepStrictEqual(M({ a: 1 }, null), { a: 1 });
  assert.deepStrictEqual(M(undefined, ['x']), ['x']);
});

// ── SVOJSTVO KOJE JE ZAPRAVO OBEĆANJE FAZE ─────────────────────────────
// Ne „vraća li točno ovo" nego „može li se išta izgubiti". Tvrdnja o REZULTATU
// ostari s podacima; tvrdnja o SVOJSTVU vrijedi za svaki ulaz.
test('⛔ BEZ GUBITKA: nijedna naučena kartica i nijedan brojač ne padaju spajanjem', () => {
  const lokalno = {                       // uređaj: učio u zrakoplovu
    cardsStudied: 40, quizzesTaken: 3, fillSolved: 7,
    flashcardsLearned: ['c1', 'c2', 'c3', 'c9'],
    lastStudy: '2026-08-28T10:00:00.000Z'
  };
  const udaljeno = {                      // oblak: stariji rad s drugog uređaja
    cardsStudied: 12, quizzesTaken: 9, fillSolved: 2,
    flashcardsLearned: ['c1', 'c5'],
    lastStudy: '2026-08-20T10:00:00.000Z'
  };

  [[lokalno, udaljeno], [udaljeno, lokalno]].forEach((par) => {
    const spoj = M(par[0], par[1]);
    ['cardsStudied', 'quizzesTaken', 'fillSolved'].forEach((k) => {
      assert.ok(spoj[k] >= lokalno[k], k + ' je pao ispod lokalnog: ' + spoj[k]);
      assert.ok(spoj[k] >= udaljeno[k], k + ' je pao ispod udaljenog: ' + spoj[k]);
    });
    lokalno.flashcardsLearned.concat(udaljeno.flashcardsLearned).forEach((id) => {
      assert.ok(spoj.flashcardsLearned.indexOf(id) !== -1, 'izgubljena kartica: ' + id);
    });
  });
});

test('⛔ OBRNUTO: spajanje NIJE „udaljeno pobjeđuje" (to bi pobrisalo sve naučeno offline)', () => {
  const spoj = M({ cardsStudied: 40 }, { cardsStudied: 0 });
  assert.notStrictEqual(spoj.cardsStudied, 0, 'udaljena nula ne smije pregaziti lokalnih 40');
  assert.strictEqual(spoj.cardsStudied, 40);
});

// ── SLANJE: pad mreže ne smije „potrošiti" promjenu ────────────────────
// Prekidac umjesto liste odgovora: `pullAndMerge()` na prijavi VEC potrosi jedan
// upsert, pa bi redoslijed odgovora tiho iskliznuo za jedan. Prva verzija ovog
// testa je pala upravo na tome i mjerila tudji poziv.
function lazniKlijent() {
  const o = {
    padaj: false,
    poslano: [],
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      upsert: (rows) => {
        o.poslano.push(rows);
        return Promise.resolve({ error: o.padaj ? { message: 'offline' } : null });
      }
    })
  };
  return o;
}

/** Pusti da se async lanac (`pullAndMerge`) slegne. */
function slegni() { return new Promise((r) => setTimeout(r, 30)); }

Promise.resolve()
  .then(() => testAsync('⛔ PAD SLANJA se ne označi kao uspjeh — promjena čeka i ide u sljedećem pokušaju', function () {
    // Drugi tihi način da napredak nestane: `snapshot` se pomakne iako upsert nije
    // prošao → ključ više nije „promijenjen" i nikad se ne pošalje. Korisnik ne vidi
    // ništa; napredak jednostavno ne stigne na drugi uređaj.
    const ls = lazniLocalStorage({ 'statistics-progress': JSON.stringify({ cardsStudied: 40 }) });
    const klijent = lazniKlijent();
    const { CS } = load({ ls: ls, klijent: klijent });

    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      const osnovica = klijent.poslano.length;   // ono što je poslao PULL, ne mi

      // Učenje offline: brojka naraste POSLIJE prijave, pa je ključ stvarno promijenjen.
      ls.setItem('statistics-progress', JSON.stringify({ cardsStudied: 55 }));
      klijent.padaj = true;

      return CS.pushNow().then(() => {
        assert.strictEqual(klijent.poslano.length, osnovica + 1, 'promjena mora otići na mrežu');
        klijent.padaj = false;
        return CS.pushNow().then(() => {
          assert.strictEqual(klijent.poslano.length, osnovica + 2, 'poslije pada se MORA pokušati ponovno');
          const zadnji = klijent.poslano[klijent.poslano.length - 1];
          const red = zadnji.filter((r) => r.key === 'statistics-progress')[0];
          assert.ok(red, 'ponovni pokušaj mora nositi isti ključ');
          assert.strictEqual(red.data.cardsStudied, 55, 'i podatke naučene offline');
        });
      });
    });
  }))

  .then(() => testAsync('uspješno slanje se NE ponavlja — inače bi svaki interval pisao isto', function () {
    const ls = lazniLocalStorage({ 'statistics-progress': JSON.stringify({ cardsStudied: 40 }) });
    const klijent = lazniKlijent();
    const { CS } = load({ ls: ls, klijent: klijent });

    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      ls.setItem('statistics-progress', JSON.stringify({ cardsStudied: 55 }));
      return CS.pushNow().then(() => {
        const poslije = klijent.poslano.length;
        return CS.pushNow().then(() => {
          assert.strictEqual(klijent.poslano.length, poslije, 'nepromijenjen ključ ne smije ponovno na mrežu');
        });
      });
    });
  }))

  .then(() => testAsync('⛔ POVRATAK MREŽE: prijava ne pregazi ono što je naučeno offline', function () {
    // Kriterij faze, doslovno: „uči offline i po povratku mreže mu se napredak spoji
    // bez gubitka". Udaljeni red je STARIJI (drugi uređaj) — naivan pull bi ga upisao
    // preko lokalnog i pojeo cijelu offline sesiju.
    const ls = lazniLocalStorage({
      'statistics-progress': JSON.stringify({ cardsStudied: 40, flashcardsLearned: ['c1', 'c9'] })
    });
    const poslano = [];
    const klijent = {
      from: () => ({
        select: () => Promise.resolve({
          data: [{ key: 'statistics-progress', data: { cardsStudied: 12, flashcardsLearned: ['c1', 'c5'] } }],
          error: null
        }),
        upsert: (rows) => { poslano.push(rows); return Promise.resolve({ error: null }); }
      })
    };
    const { CS } = load({ ls: ls, klijent: klijent });

    CS.handleAuthChange({ id: 'u1' });
    // `handleAuthChange` je sinkron ulaz u async lanac; pusti mikrozadatke da se slegnu.
    return slegni().then(() => {
      const spoj = JSON.parse(ls.getItem('statistics-progress'));
      assert.strictEqual(spoj.cardsStudied, 40, 'offline brojka je pregažena udaljenom');
      ['c1', 'c5', 'c9'].forEach((id) => {
        assert.ok(spoj.flashcardsLearned.indexOf(id) !== -1, 'izgubljena kartica: ' + id);
      });
      // I obrnuto: razlika mora otići GORE, inače drugi uređaj nikad ne sazna.
      assert.ok(poslano.length > 0, 'spojeno stanje se mora poslati natrag u oblak');
    });
  }))

  // ── BUG-049: PAD PRVOG SLANJA (u pullu) ne smije potrošiti promjenu ────────────
  // Test iznad štiti `pushChanges`; ovaj štiti `pullAndMerge`, koji je isti kvar imao
  // na svoj način: `snapshot[key]` se pisao PRIJE upserta. Padne li taj prvi upsert
  // (prijava na lošoj mreži), ključ za `collectChanged` više nije „promijenjen" —
  // nikad se ne pošalje, a „sinkronizirano u HH:MM" se svejedno ispiše.
  .then(() => testAsync('⛔ PAD SLANJA U PULLU: spojeno stanje čeka i ide u sljedećem pokušaju, bez lažnog „sinkronizirano"', function () {
    const ls = lazniLocalStorage({
      'statistics-progress': JSON.stringify({ cardsStudied: 40, flashcardsLearned: ['c9'] })
    });
    const poslano = [];
    let padaj = true;
    const klijent = {
      from: () => ({
        select: () => Promise.resolve({
          data: [{ key: 'statistics-progress', data: { cardsStudied: 12, flashcardsLearned: ['c5'] } }],
          error: null
        }),
        upsert: (rows) => { poslano.push(rows); return Promise.resolve({ error: padaj ? { message: 'offline' } : null }); }
      })
    };
    const sinkInfo = [];
    const auth = { getClient: () => klijent, setSyncInfo: (s) => sinkInfo.push(s), onChange: () => {} };
    const CS = new Function(
      'window', 'document', 'localStorage', 'subjectDataMap', 'SokratAuth', 'setInterval',
      KOD + '\n;return CloudSync;'
    )({ addEventListener: () => {}, t: null }, { addEventListener: () => {}, visibilityState: 'visible' },
      ls, { statistics: { storageKey: 'statistics-progress' } }, auth, () => 1);

    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      assert.strictEqual(poslano.length, 1, 'pull je morao pokušati poslati spojeno stanje');
      assert.strictEqual(sinkInfo.length, 0, 'pali upsert se NE smije prikazati kao „sinkronizirano"');
      padaj = false;
      return CS.pushNow();
    }).then(() => {
      assert.strictEqual(poslano.length, 2, 'poslije pada u pullu sljedeći push MORA ponovno poslati ključ');
      const red = poslano[1].filter((r) => r.key === 'statistics-progress')[0];
      assert.ok(red, 'ponovni pokušaj nosi isti ključ');
      assert.strictEqual(red.data.cardsStudied, 40);
      ['c5', 'c9'].forEach((id) => assert.ok(red.data.flashcardsLearned.indexOf(id) !== -1, 'izgubljena kartica: ' + id));
      assert.ok(sinkInfo.length > 0, 'uspjeli push se smije prikazati kao sinkroniziran');
    });
  }))

  // ── BUG-050: VLASNIK LOKALNOG NAPRETKA (Leon, 12.09.) ──────────────────────────
  // Odjava ostavlja napredak na uređaju (toast to i obećava). Ali sljedeća prijava ga je
  // spajala u KOJI GOD račun — na zajedničkom računalu B je nasljeđivao A-ovo učenje.
  // Pravilo: lokalni napredak pripada računu koji ga je ZADNJI sinkronizirao.
  //   ista osoba natrag  → spaja se kao dosad (ništa se ne gubi);
  //   drugi račun        → lokalno se briše PRIJE pulla;
  //   gost bez ijednog računa → spaja se u prvi račun (put „učio kao gost, pa se prijavio").
  .then(() => testAsync('⛔ DRUGI RAČUN na istom pregledniku ne nasljeđuje napredak prethodnog', function () {
    const ls = lazniLocalStorage({ 'statistics-progress': JSON.stringify({ cardsStudied: 40 }) });
    const poslano = [];
    const oblak = { u1: [], u2: [{ key: 'statistics-progress', data: { cardsStudied: 5 } }] };
    let tko = null;
    const klijent = {
      from: () => ({
        select: () => Promise.resolve({ data: oblak[tko], error: null }),
        upsert: (rows) => { poslano.push({ tko: tko, rows: rows }); return Promise.resolve({ error: null }); }
      })
    };
    const { CS } = load({ ls: ls, klijent: klijent });

    tko = 'u1';
    CS.handleAuthChange({ id: 'u1' });                 // A: gost-napredak (40) ide u A
    return slegni().then(() => {
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 40);
      CS.handleAuthChange(null);                       // A se odjavi; lokalno ostaje
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 40, 'odjava NE briše (obećanje toasta)');
      tko = 'u2';
      CS.handleAuthChange({ id: 'u2' });               // B se prijavi na istom pregledniku
      return slegni();
    }).then(() => {
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 5, 'B mora vidjeti SVOJ napredak, ne A-ov');
      const zaB = poslano.filter((p) => p.tko === 'u2');
      zaB.forEach((p) => p.rows.forEach((r) => {
        assert.notStrictEqual(r.data.cardsStudied, 40, 'A-ov napredak ne smije otići u B-ov oblak');
      }));
    });
  }))

  .then(() => testAsync('ISTA OSOBA natrag: lokalni napredak preživi odjavu i spoji se', function () {
    const ls = lazniLocalStorage();
    const klijent = lazniKlijent();
    const { CS } = load({ ls: ls, klijent: klijent });
    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      ls.setItem('statistics-progress', JSON.stringify({ cardsStudied: 40 }));   // učio prijavljen
      CS.handleAuthChange(null);
      ls.setItem('statistics-progress', JSON.stringify({ cardsStudied: 44 }));   // učio i odjavljen
      CS.handleAuthChange({ id: 'u1' });
      return slegni();
    }).then(() => {
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 44, 'ista osoba ne smije izgubiti ništa');
    });
  }))

  .then(() => testAsync('GOST bez ijednog računa: prvi račun dobiva gostov napredak', function () {
    const ls = lazniLocalStorage({ 'statistics-progress': JSON.stringify({ cardsStudied: 40 }) });
    const klijent = lazniKlijent();
    const { CS } = load({ ls: ls, klijent: klijent });
    CS.handleAuthChange({ id: 'u9' });
    return slegni().then(() => {
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 40);
      const red = klijent.poslano[0].filter((r) => r.key === 'statistics-progress')[0];
      assert.ok(red && red.data.cardsStudied === 40, 'gostov napredak mora otići u prvi račun');
    });
  }))

  // ── merge skalara ──
  .then(() => {
    test('boolean: a || b (done/learned se nikad ne poništava)', () => {
      assert.strictEqual(M(true, false), true);
      assert.strictEqual(M(false, true), true);
      assert.strictEqual(M(false, false), false);
      assert.deepStrictEqual(M({ done: true }, { done: false }), { done: true });
    });
    test('dva ISO/YYYY-MM-DD datuma → noviji, bez obzira na stranu', () => {
      assert.strictEqual(M('2026-08-28T10:00:00.000Z', '2026-08-20T10:00:00.000Z'), '2026-08-28T10:00:00.000Z');
      assert.strictEqual(M('2026-08-20T10:00:00.000Z', '2026-08-28T10:00:00.000Z'), '2026-08-28T10:00:00.000Z');
      assert.strictEqual(M('2026-09-01', '2026-08-01'), '2026-09-01');
      assert.deepStrictEqual(M({ lastStudy: '2026-09-01T00:00:00.000Z' }, { lastStudy: '2026-08-01T00:00:00.000Z' }), { lastStudy: '2026-09-01T00:00:00.000Z' });
    });
    test('ostali stringovi: remote ostaje (nisu datumi)', () => {
      assert.strictEqual(M('lokalno', 'udaljeno'), 'udaljeno');
      assert.strictEqual(M('2026-09-01', 'nije datum'), 'nije datum');
    });
    test('sokrat-last-position: cijeli objekt s novijim timestampom pobjeđuje (bez miješanja polja)', () => {
      const lok = { page: 'study', subject: 'a', lesson: 'l1', timestamp: 2000 };
      const rem = { page: 'quiz', subject: 'b', section: 's', timestamp: 1000 };
      assert.deepStrictEqual(M(lok, rem, 'sokrat-last-position'), lok);
      assert.deepStrictEqual(M(rem, lok, 'sokrat-last-position'), lok);
    });
  })

  // ── allowlist ──
  .then(() => testAsync('pull odbija ključeve izvan allowliste (override, owner), prihvaća node:<uuid>', function () {
    const ls = lazniLocalStorage();
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const klijent = lazniKlijent();
    klijent.from = () => ({
      select: () => Promise.resolve({ error: null, data: [
        { key: 'sokrat-supabase-override', data: { url: 'https://evil.supabase.co', publishableKey: 'x' } },
        { key: 'sokrat-progress-owner', data: 'napadac' },
        { key: 'sokrat-theme', data: 'x' },
        { key: 'node:' + uuid, data: { cardsStudied: 3 } },
        { key: 'physics-exercises-progress', data: { e1: { done: true } } },
        { key: 'sokrat-last-position', data: { page: 'study', timestamp: 5 } }
      ] }),
      upsert: () => Promise.resolve({ error: null })
    });
    const { CS } = load({ ls: ls, klijent: klijent });
    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      assert.strictEqual(ls.getItem('sokrat-supabase-override'), null);
      assert.strictEqual(ls.getItem('sokrat-theme'), null);
      assert.strictEqual(ls.getItem('sokrat-progress-owner'), 'u1', 'owner ostaje onaj koji je app sam postavio');
      assert.ok(ls.getItem('node:' + uuid), 'node:<uuid> mora proći');
      assert.ok(ls.getItem('physics-exercises-progress'));
      assert.ok(ls.getItem('sokrat-last-position'));
    });
  }))

  // ── bez pusha prije uspjelog pulla ──
  .then(() => testAsync('⛔ pull pada → interval NE pusha (ponavlja pull); nakon uspjeha merge pa push', function () {
    const ls = lazniLocalStorage({ 'statistics-progress': JSON.stringify({ cardsStudied: 40 }) });
    const klijent = lazniKlijent();
    let pullPada = true;
    let pullova = 0;
    klijent.from = () => ({
      select: () => { pullova++; return Promise.resolve(pullPada
        ? { data: null, error: { message: 'offline' } }
        : { error: null, data: [{ key: 'statistics-progress', data: { cardsStudied: 50 } }] }); },
      upsert: (rows) => { klijent.poslano.push(rows); return Promise.resolve({ error: null }); }
    });
    const { CS, ticks } = load({ ls: ls, klijent: klijent });
    CS.handleAuthChange({ id: 'u1' });
    return slegni().then(() => {
      assert.strictEqual(pullova, 1);
      assert.strictEqual(ticks.length, 1, 'start() mora postaviti interval');
      ticks[0]();                                   // interval: pull još nije uspio
      return slegni();
    }).then(() => {
      assert.strictEqual(pullova, 2, 'interval ponavlja pull');
      assert.strictEqual(klijent.poslano.length, 0, 'ništa se ne smije poslati prije pulla');
      return CS.pushNow();
    }).then(() => {
      assert.strictEqual(klijent.poslano.length, 0, 'ni pushNow prije pulla');
      pullPada = false;
      ticks[0]();
      return slegni();
    }).then(() => {
      assert.strictEqual(JSON.parse(ls.getItem('statistics-progress')).cardsStudied, 50);
      ls.setItem('statistics-progress', JSON.stringify({ cardsStudied: 60 }));
      return CS.pushNow();
    }).then(() => {
      const zadnji = klijent.poslano[klijent.poslano.length - 1];
      assert.strictEqual(zadnji[0].data.cardsStudied, 60, 'nakon pulla push radi');
    });
  }))

  .then(() => {
    console.log('\n  ' + passed + ' prošlo, ' + failed + ' palo\n');
    process.exit(failed ? 1 : 0);
  });
