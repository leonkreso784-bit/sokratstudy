/* eslint-disable no-console */
// ===== MCP (F6 ①/1) — jezgra alata + omot Edge Functiona, BEZ mreže =====
// Pokreni: node tests/unit/mcp-alati.test.js  (uključeno u `npm run test:unit`)
//
// ZAŠTO POSTOJI: MCP je vrata na koja ulazi TUĐI model s korisnikovim tokenom (ADR-030/031/038).
// Dvije stvari se tvrde prije ijednog pravog poziva:
//   ① ŠTO alat vraća — stablo polica i materijala, izričiti stupci (nikad `*`: novi stupac u
//     `nodes` ne smije tiho procuriti AI-ju), bez obrisanih čvorova, i nijedan materijal ne nestaje
//     iz odgovora samo zato što mu roditelj nije u popisu;
//   ② ŠTO omot NE SMIJE — admin-klijent, service_role, tajni ključ, upis bilo koje vrste (brava
//     za token s `client_id` još ne postoji, ①/2), plutajuće verzije paketa (pravilo #9) i
//     nestabilni `pipeline` oblik `@supabase/server`-a.
// Jezgra je `.ts` bez ijednog Deno-uvoza → Node 24 je učita izravno (kalup mail-core.test.js).

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const KORIJEN = path.join(__dirname, '..', '..');
const MAPA = path.join(KORIJEN, 'supabase', 'functions', 'mcp');
let pao = 0;
let proslo = 0;
const test = async (ime, fn) => {
  try { await fn(); proslo++; console.log('  ✓ ' + ime); }
  catch (e) { pao++; console.log('  ✗ ' + ime + '\n      ' + e.message); }
};

const cvor = (id, parent_id, kind, name, position) => ({ id, parent_id, kind, name, position, updated_at: '2026-09-17T00:00:00Z' });

/** Lažni supabase-js klijent koji pamti što je alat tražio. */
function lazniKlijent(redovi, greska) {
  const zapis = {};
  return {
    zapis,
    from(t) {
      zapis.tablica = t;
      return {
        select(s) {
          zapis.stupci = s;
          return {
            is(st, v) {
              zapis.filter = [st, v];
              return {
                order(st2, o) {
                  zapis.redoslijed = [st2, o];
                  return Promise.resolve({ data: greska ? null : redovi, error: greska || null });
                }
              };
            }
          };
        }
      };
    }
  };
}

(async () => {
  console.log('\n=== MCP alati (F6 ①/1) ===\n');
  const A = await import(pathToFileURL(path.join(MAPA, 'alati.ts')).href);

  await test('stablo: police nose djecu, redom `position`, vrsta i naziv na hrvatskom ključu', () => {
    const s = A.slozStablo([
      cvor('m2', 'p1', 'study', 'Drugi', 1),
      cvor('p1', null, 'folder', 'Ekonomija', 0),
      cvor('m1', 'p1', 'study', 'Prvi', 0),
      cvor('m0', null, 'study', 'Slobodni', 1)
    ]);
    assert.deepStrictEqual(s, [
      { id: 'p1', vrsta: 'polica', naziv: 'Ekonomija', djeca: [
        { id: 'm1', vrsta: 'materijal', naziv: 'Prvi' },
        { id: 'm2', vrsta: 'materijal', naziv: 'Drugi' }
      ] },
      { id: 'm0', vrsta: 'materijal', naziv: 'Slobodni' }
    ]);
  });

  await test('materijal čiji roditelj nije u popisu NE nestaje — ide u korijen', () => {
    const s = A.slozStablo([cvor('m9', 'nema-ga', 'study', 'Siroce', 0)]);
    assert.deepStrictEqual(s, [{ id: 'm9', vrsta: 'materijal', naziv: 'Siroce' }]);
  });

  await test('ciklus u podacima ne vrti beskonačno', () => {
    const s = A.slozStablo([cvor('a', null, 'folder', 'A', 0), cvor('b', 'a', 'folder', 'B', 0)]);
    assert.strictEqual(s[0].djeca[0].id, 'b');
  });

  await test('alat čita IZRIČITE stupce iz `nodes`, bez obrisanih, redom position', async () => {
    const k = lazniKlijent([cvor('m1', null, 'study', 'X', 0)]);
    const r = await A.procitajMaterijale(k);
    assert.strictEqual(k.zapis.tablica, 'nodes');
    assert.strictEqual(k.zapis.stupci, 'id,parent_id,kind,name,position,updated_at');
    assert.ok(!k.zapis.stupci.includes('*'), 'stupci ne smiju biti *');
    assert.deepStrictEqual(k.zapis.filter, ['deleted_at', null]);
    assert.deepStrictEqual(k.zapis.redoslijed, ['position', { ascending: true }]);
    assert.strictEqual(r.materijala, 1);
    assert.deepStrictEqual(JSON.parse(r.tekst), { materijala: 1, stablo: [{ id: 'm1', vrsta: 'materijal', naziv: 'X' }] });
  });

  await test('prazan korisnik → jasna rečenica, ne prazan JSON', async () => {
    const r = await A.procitajMaterijale(lazniKlijent([]));
    assert.strictEqual(r.materijala, 0);
    assert.match(r.tekst, /no shelves or materials/);
  });

  await test('greška čitanja se NE pretvara u „nemaš materijala"', async () => {
    await assert.rejects(() => A.procitajMaterijale(lazniKlijent(null, { message: 'boom' })), /read_failed: boom/);
  });

  const INDEX = fs.readFileSync(path.join(MAPA, 'index.ts'), 'utf8');
  const ALATI = fs.readFileSync(path.join(MAPA, 'alati.ts'), 'utf8');
  const kod = (s) => s.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');

  await test('omot: nikad admin-klijent, service_role ni tajni ključ (ADR-026)', () => {
    for (const [ime, src] of [['index.ts', kod(INDEX)], ['alati.ts', kod(ALATI)]]) {
      assert.ok(!/supabaseAdmin|service_role|SERVICE_ROLE|SECRET_KEY|secretKey/.test(src), ime + ' spominje privilegirani pristup');
    }
  });

  // ②/2 (zamjenjuje ①/1 „samo čitanje"): AI SMIJE pisati, ali SAMO kroz pet `mcp_*` RPC-ova nacrta —
  // nikad izravno u tablicu (insert/update/upsert/delete) i nikad čitati išta osim `nodes`.
  await test('②/2 doseg upisa: nema insert/update/upsert/delete, `.from()` samo `nodes`, `.rpc(` samo u alati.ts', () => {
    for (const [ime, src] of [['index.ts', kod(INDEX)], ['alati.ts', kod(ALATI)]]) {
      assert.ok(!/\.(insert|update|upsert|delete)\(/.test(src), ime + ' piše izravno u tablicu');
      const tablice = [...src.matchAll(/\.from\(\s*([^)]*)\)/g)].map((m) => m[1].trim());
      assert.ok(tablice.every((t) => t === "'nodes'"), ime + ' čita tablicu mimo nodes: ' + tablice.join(', '));
    }
    assert.ok(!/\.rpc\(/.test(kod(INDEX)), 'index.ts zove rpc mimo jezgre (mimo prevediOdbijanje)');
  });

  await test('prijava: korisnički mod (`auth: \'user\'`) i ugniježđeni (stabilni) oblik, ne `pipeline`', () => {
    assert.ok(/withSupabase\(\{ auth: 'user' \}/.test(INDEX), 'withSupabase mora biti auth: user');
    assert.ok(/withOAuthProtectedResource\(\s*\{/.test(INDEX), 'withOAuthProtectedResource s izričitom adresom resursa');
    assert.ok(!/@supabase\/middleware|pipeline\(/.test(kod(INDEX)), 'pipeline je alpha');
  });

  await test('paketi pinani TOČNO (pravilo #9) i samo poznati', () => {
    const uvozi = [...INDEX.matchAll(/from '((?:npm|jsr):[^']+)'/g)].map((m) => m[1]);
    assert.deepStrictEqual(uvozi.sort(), ['npm:@modelcontextprotocol/server@2.0.0', 'npm:@supabase/server@1.7.0']);
    for (const u of uvozi) assert.ok(/@\d+\.\d+\.\d+$/.test(u), u + ' nije točna verzija');
  });

  await test('javni katalog izvan dosega i za čitanje (ADR-031 ⑥)', () => {
    assert.ok(!/subject_content|content_versions|is_admin|catalog/.test(kod(INDEX) + kod(ALATI)));
  });

  // ── ②/1b (N9): imenovano odbijanje iz baze → poruka koju AI može iskoristiti ──
  // PostgREST kvotu i „već predan" vraća kao HTTP 500 — AI tada ne razlikuje „pokušaj kasnije" od
  // kvara. Popis imena se IZVODI iz SQL-a: svaki `raise exception '<ime>…` u nacrtu i validatoru
  // mora imati prijevod, i nijedan prijevod ne smije biti mrtav.
  const IZ_SQL = new Set();
  for (const f of ['f6-nacrt.sql', 'f6-sadrzaj.sql']) {
    // Iz validatora samo dio koji AI doseže (`_provjeri_sadrzaj`); `publish_node` (②/0b) je Studijev put.
    const sql = fs.readFileSync(path.join(KORIJEN, 'supabase', f), 'utf8').split('-- ─── ②/0b')[0];
    for (const m of sql.matchAll(/raise exception '([a-z_]+)/g)) IZ_SQL.add(m[1]);
  }
  await test('N9: svako ime odbijanja iz f6-nacrt.sql + f6-sadrzaj.sql ima prijevod, nijedan prijevod nije mrtav', () => {
    assert.ok(IZ_SQL.size >= 10, 'iz SQL-a izvučeno premalo imena: ' + IZ_SQL.size);
    assert.strictEqual(typeof A.prevediOdbijanje, 'function', 'nema prevediOdbijanje');
    const poznato = Object.keys(A.ODBIJANJA || {});
    assert.deepStrictEqual({ bezPrijevoda: [...IZ_SQL].filter((x) => !poznato.includes(x)).sort(),
      mrtvo: poznato.filter((x) => !IZ_SQL.has(x)).sort() }, { bezPrijevoda: [], mrtvo: [] });
  });
  await test('N9: kvota = „korisnik", sukob = „pročitaj ponovno", sadržaj = „ispravi" uz razlog', () => {
    const k = A.prevediOdbijanje({ message: 'nacrt_kvota_u_izradi: najviše 3 nacrta u izradi — predaj ili pričekaj' });
    assert.strictEqual(k.kod, 'nacrt_kvota_u_izradi'); assert.strictEqual(k.vrsta, 'korisnik');
    const s = A.prevediOdbijanje({ message: 'nacrt_sukob: nacrt je u međuvremenu promijenjen (verzija 3, poslano 2) — pročitaj ga ponovno' });
    assert.strictEqual(s.vrsta, 'ponovno'); assert.ok(/read|again/i.test(s.poruka), s.poruka);
    const v = A.prevediOdbijanje({ message: 'sadrzaj_neispravan: "x" is longer than 500 characters' });
    assert.strictEqual(v.vrsta, 'ispravi'); assert.ok(v.poruka.includes('longer than 500'), 'razlog se ne smije izgubiti: ' + v.poruka);
  });
  await test('N9: nepoznata greška = „kvar", bez unutarnjih detalja (SQL, putanje) u poruci', () => {
    const n = A.prevediOdbijanje({ message: 'relation "public.node_drafts" does not exist at /var/lib/x' });
    assert.strictEqual(n.vrsta, 'kvar'); assert.ok(!/node_drafts|\/var/.test(n.poruka), n.poruka);
    assert.strictEqual(A.prevediOdbijanje(null).vrsta, 'kvar');
  });

  // ══ ②/2 ALATI CJEVOVODA ═══════════════════════════════════════════════════════════════════════
  // Mjeri se nad LAŽNOM bazom koja drži istu semantiku kao `f6-nacrt.sql` (ključ ponavljanja =
  // isti nacrt, verzija = sukob, predan = zamrznut). Prava baza je e2e: `npm run mcp:alati`.
  console.log('\n  — ②/2 alati —');

  /** Pet RPC-ova koje `f6-nacrt.sql` otvara ulozi `mcp_klijent` — izvedeno iz SQL-a, ne pisano rukom. */
  // Dva oblika granta: petlja u `f6-nacrt.sql` (`foreach … array[…]` + `to mcp_klijent`) i izravan
  // `grant execute on function public.mcp_x(…) to mcp_klijent` u BILO KOJOJ `supabase/*.sql` — da grant
  // napisan drugdje ne promakne (revizor ②/2, N2).
  const RPC_IZ_SQL = (() => {
    const imena = new Set();
    for (const f of fs.readdirSync(path.join(KORIJEN, 'supabase')).filter((x) => x.endsWith('.sql'))) {
      const sql = fs.readFileSync(path.join(KORIJEN, 'supabase', f), 'utf8');
      for (const m of sql.matchAll(/foreach\s+\w+\s+in\s+array\s+array\[([\s\S]*?)\]\s*loop([\s\S]*?)end loop/gi)) {
        if (/to mcp_klijent/.test(m[2])) for (const x of m[1].matchAll(/'(mcp_[a-z_]+)\(/g)) imena.add(x[1]);
      }
      for (const m of sql.matchAll(/grant\s+execute\s+on\s+function\s+public\.(mcp_[a-z_]+)\s*\([^)]*\)\s+to\s+mcp_klijent/gi)) imena.add(m[1]);
    }
    return [...imena].sort();
  })();

  /** Lažna baza: pamti nacrte, broji upise, i na zahtjev obori ZADANI rpc zadanom porukom.
   *  `pocetno` = stanje nacrta (duboka kopija) — da oborena baza kreće od ISTOG stanja kao sretna. */
  let idBr = 0;   // zajednički za sve lažne baze: kopirano stanje i novi nacrt ne smiju dijeliti id
  // ②/4b: korisnikov postojeći materijal (Studio): stavka i blok BEZ id-a (gradivo starije od id-eva),
  // kartica s bojom (polje koje AI ne piše), dopuna s dvije praznine, pitanja iz kartice kc1, dvije lekcije.
  const MAT = '33333333-3333-4333-8333-333333333333';
  const materijalPocetni = () => ({ id: MAT, name: 'Kemija', verzija: 5, aiIzmjena: true, payload: { schemaVersion: 2,
    content: { name: 'Atomi', icon: 'fa-book', color: '#6366f1',
      learn: { blocks: [{ id: 'b1', type: 'paragraph', text: 'Atom je najmanja čestica elementa.' }, { type: 'paragraph', text: 'Blok bez id-a.' }] },
      flashcards: [{ id: 'kc1', question: 'Što je atom?', answer: 'Najmanja čestica elementa.', color: '#a855f7' }, { question: 'Proton?', answer: 'Pozitivna čestica jezgre.' }],
      quiz: [{ id: 'q1', question: 'Naboj protona?', options: ['+', '-'], correct: 0, card: 'kc1' }],
      fillBlanks: [{ id: 'f1', sentence: 'Atom ima _______ i _______.', answer: 'jezgru', answers: ['jezgru', 'omotač'], hint: 'dva dijela', card: 'kc1' }] },
    l2: { name: 'Molekule', icon: 'fa-book', color: '#10b981', flashcards: [], quiz: [], fillBlanks: [] } } });
  function lazniNacrt(opcije = {}, pocetno) {
    const nacrti = new Map(pocetno ? JSON.parse(JSON.stringify([...pocetno])) : []);
    const materijali = new Map([[MAT, materijalPocetni()]]);
    const zapis = { upisa: 0, pozivi: [], predaje: [], argumenti: [] };
    const predani = new Map();   // nacrt → materijal (bilješka ②/4.3′)
    const odg = (data) => Promise.resolve({ data, error: null });
    const greska = (message) => Promise.resolve({ data: null, error: { message } });
    const kopija = (v) => JSON.parse(JSON.stringify(v));
    const brojPoziva = {};
    return {
      zapis, nacrti, materijali,
      from(t) { return lazniKlijent([]).from(t); },
      rpc(ime, a) {
        zapis.pozivi.push(ime);
        zapis.argumenti.push([ime, a]);
        brojPoziva[ime] = (brojPoziva[ime] || 0) + 1;
        // `oboriOd` = obori tek N-ti poziv tog RPC-a (grana ponovnog pokušaja nakon sukoba, revizor ②/2 F1)
        if (opcije.obori && opcije.obori[ime] && brojPoziva[ime] >= (opcije.oboriOd || 1)) {
          const o = opcije.obori[ime];
          if (o === 'baci') return Promise.reject(new Error('fetch failed at /var/x node_drafts'));
          return greska(o);
        }
        // ②/4b: RPC-ovi nad MATERIJALOM (p_id = id materijala, ne nacrta) — semantika kao `f6-nacrt.sql` § „②/4b".
        if (ime === 'mcp_procitaj_materijal' || ime === 'mcp_zapocni_izmjenu' || ime === 'mcp_vrati_izmjenu') {
          const m = materijali.get(a.p_id);
          if (ime === 'mcp_zapocni_izmjenu') {
            for (const d of nacrti.values()) {
              if (d.kljuc === a.p_kljuc) return d.izvor_id === a.p_id ? odg(d.id) : greska('nacrt_kljuc_zauzet: taj ključ već pripada drugom nacrtu');
            }
          }
          if (!m) return greska('materijal_ne_postoji: tog materijala nema među korisnikovim materijalima');
          if (ime === 'mcp_procitaj_materijal') return odg(kopija({ id: m.id, name: m.name, parent_id: null, verzija: m.verzija, payload: m.payload }));
          if (ime === 'mcp_vrati_izmjenu') {
            if (!m.aiIzmjena) return greska('izmjena_nema: ovaj materijal nema AI izmjene');
            m.verzija++; return odg(m.verzija);
          }
          for (const [id, d] of [...nacrti]) if (d.izvor_id === m.id) nacrti.delete(id);   // nova izmjena zamijeni staru
          const id = '00000000-0000-4000-8000-' + String(++idBr).padStart(12, '0');
          nacrti.set(id, { id, name: m.name, kljuc: a.p_kljuc, status: 'u_izradi', payload: kopija(m.payload), verzija: 1, izvor_id: m.id, polazna_verzija: m.verzija });
          return odg(id);
        }
        if (ime === 'mcp_zapocni_nacrt') {
          for (const d of nacrti.values()) if (d.kljuc === a.p_kljuc) return d.izvor_id ? greska('nacrt_kljuc_zauzet: x') : odg(d.id);
          const id = '00000000-0000-4000-8000-' + String(++idBr).padStart(12, '0');
          nacrti.set(id, { id, name: a.p_name, kljuc: a.p_kljuc, status: 'u_izradi', payload: {}, verzija: 1,
            polica_id: a.p_polica, nova_polica: a.p_nova_polica, opseg: a.p_opseg });
          return odg(id);
        }
        if (ime === 'mcp_moji_nacrti') return odg([...nacrti.values()].map((x) => ({ id: x.id, name: x.name, status: x.status, verzija: x.verzija, velicina: 2 })));
        const d = nacrti.get(a.p_id);
        if (!d && ime === 'mcp_predaj_nacrt' && predani.has(a.p_id)) return odg(predani.get(a.p_id));   // ponovljena predaja
        if (!d) return greska('nacrt_ne_postoji');
        if (ime === 'mcp_procitaj_nacrt') return odg(JSON.parse(JSON.stringify({ id: d.id, name: d.name, status: d.status, payload: d.payload, verzija: d.verzija,
          opseg: d.opseg === undefined ? null : d.opseg, polica_id: d.polica_id === undefined ? null : d.polica_id,
          nova_polica: d.nova_polica === undefined ? null : d.nova_polica, izvor_id: d.izvor_id || null, polazna_verzija: d.polazna_verzija || null })));
        if (ime === 'mcp_preimenuj_nacrt') {
          const ime2 = String(a.p_name || '').trim();
          if (ime2.length < 1 || ime2.length > 120) return greska('nacrt_ime: ime materijala ima 1–120 znakova');
          d.name = ime2; return odg(null);
        }
        if (ime === 'mcp_upisi_nacrt') {
          if (d.status !== 'u_izradi') return greska('nacrt_predan: predan nacrt se više ne mijenja');
          if (opcije.sukobi && opcije.sukobi > 0) { opcije.sukobi--; d.verzija++; }   // netko drugi upisao u međuvremenu
          if (d.verzija !== a.p_verzija) return greska('nacrt_sukob: verzija ' + d.verzija + ', poslano ' + a.p_verzija);
          zapis.upisa++;
          d.payload = JSON.parse(JSON.stringify(a.p_payload)); d.verzija++;
          return odg(d.verzija);
        }
        if (ime === 'mcp_predaj_nacrt' && d.izvor_id) {
          // ②/4b: nacrt izmjene → upis u svoj materijal, samo uz polaznu verziju; polica se ne bira.
          if (a.p_polica || a.p_nova_polica) return greska('izmjena_polica: izmjena ostaje gdje je materijal');
          const m = materijali.get(d.izvor_id);
          if (!m) return greska('materijal_ne_postoji: x');
          if (m.verzija !== d.polazna_verzija) return greska('izmjena_sukob: materijal je promijenjen (verzija ' + m.verzija + ', polazna ' + d.polazna_verzija + ')');
          if (JSON.stringify(m.payload) !== JSON.stringify(d.payload)) { m.payload = kopija(d.payload); m.verzija++; m.aiIzmjena = true; }
          m.name = d.name;
          predani.set(d.id, m.id); nacrti.delete(d.id); return odg(m.id);
        }
        if (ime === 'mcp_predaj_nacrt') {
          // ②/4.3′: nacrt postaje materijal (polica iz poziva ILI zapamćena), nacrt nestaje, bilješka pamti id.
          const polica = a.p_polica || a.p_nova_polica || d.polica_id || d.nova_polica;
          if (!polica) return greska('nacrt_bez_police: nacrt nema policu');
          const mid = '11111111-1111-4111-8111-' + String(++idBr).padStart(12, '0');
          predani.set(d.id, mid); zapis.predaje.push({ id: d.id, p_polica: a.p_polica, p_nova_polica: a.p_nova_polica });
          nacrti.delete(d.id); return odg(mid);
        }
        return greska('PGRST202 nepoznata funkcija ' + ime);
      }
    };
  }
  const izlaz = (r) => { try { return JSON.parse(r.content[0].text); } catch (e) { return { _tekst: r.content && r.content[0] && r.content[0].text }; } };
  const LEKCIJE = [{ name: 'Uvod', color: '#6366f1' }, { name: 'BDP', color: '#10b981' }];
  // ②/4.2: polica i opseg biraju se NA POČETKU (Leon, ankete 30.09.) — svaki početak ih nosi.
  const PO = { new_shelf: 'Makro', scope: 'standard' };
  const LEARN = { blocks: [{ type: 'heading', text: 'BDP' }, { type: 'paragraph', text: 'Bruto domaći proizvod je …' }] };
  const KARTICE = [{ question: 'Što je BDP?', answer: 'Vrijednost proizvodnje u zemlji.' }, { question: 'Tko ga mjeri?', answer: 'DZS.' }];
  // ②/3: svako pitanje nosi `card` = id kartice iz koje je nastalo. Id-evi kartica su deterministički
  // (izvedeni iz lekcije i ključa ponavljanja), pa ih test zna unaprijed: lekcija l2, ključ 'kartice-1', prva kartica.
  const K0 = typeof A.idIzKljuca === 'function' ? A.idIzKljuca('k', 'l2/kartice-1', 0) : 'nema';
  const PITANJA = { quiz: [{ question: 'BDP mjeri?', options: ['proizvodnju', 'uvoz'], correct: 0, card: K0 }],
    fill_blanks: [{ sentence: 'BDP mjeri ___.', answers: ['proizvodnju'], card: K0 }] };

  /** Cijeli cjevovod nad lažnom bazom; vraća id nacrta i id lekcije. */
  async function cjevovod(k) {
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'Makro', repeat_key: 'start-1', lessons: LEKCIJE, ...PO }));
    const draft_id = z.draft_id; const lesson_id = z.lessons && z.lessons[1] && z.lessons[1].lesson_id;
    await A.izvediAlat('napisi_learn', k, { draft_id, lesson_id, repeat_key: 'learn-1', blocks: LEARN.blocks });
    await A.izvediAlat('dodaj_kartice', k, { draft_id, lesson_id, repeat_key: 'kartice-1', cards: KARTICE });
    await A.izvediAlat('dodaj_pitanja', k, Object.assign({ draft_id, lesson_id, repeat_key: 'pitanja-1' }, PITANJA));
    return { draft_id, lesson_id };
  }

  await test('②/2 + ②/4b.2 alati: točno sedam iz ②/2 i devet za izmjenu, svaki s opisom i JSON-shemom ulaza', () => {
    assert.ok(Array.isArray(A.ALATI), 'nema ALATI');
    assert.deepStrictEqual(A.ALATI.map((a) => a.ime).sort(), ['dodaj_kartice', 'dodaj_lekciju', 'dodaj_pitanja', 'izmijeni_stavke',
      'napisi_learn', 'obrisi_lekciju', 'obrisi_stavke', 'predaj_nacrt', 'preimenuj_materijal', 'procitaj_materijal', 'procitaj_materijale',
      'procitaj_nacrt', 'uredi_lekciju', 'vrati_izmjenu', 'zapocni_izmjenu', 'zapocni_nacrt']);
    for (const a of A.ALATI) {
      assert.ok(a.opis && a.opis.length > 40, a.ime + ' bez opisa');
      assert.strictEqual(a.ulaz.type, 'object', a.ime + ' ulaz nije objekt');
      assert.strictEqual(a.ulaz.additionalProperties, false, a.ime + ' prima nepoznata polja');
    }
  });

  // Alati koji NE stvaraju ništa novo nego mijenjaju/brišu PO ID-U (ili predaju/vraćaju po id-u) ponovljeni
  // daju isto stanje i bez ključa — to za svaki od njih mjeri test „②/4b.2 dvaput = jednom" niže.
  const PO_ID_U = ['izmijeni_stavke', 'obrisi_lekciju', 'obrisi_stavke', 'predaj_nacrt', 'preimenuj_materijal', 'uredi_lekciju', 'vrati_izmjenu'];
  await test('②/2 svaki alat koji DODAJE/STVARA traži ključ ponavljanja (repeat_key)', () => {
    const pisu = A.ALATI.filter((x) => !x.samoCitanje && !PO_ID_U.includes(x.ime)).map((x) => x.ime).sort();
    assert.deepStrictEqual(pisu, ['dodaj_kartice', 'dodaj_lekciju', 'dodaj_pitanja', 'napisi_learn', 'zapocni_izmjenu', 'zapocni_nacrt']);
    assert.ok(PO_ID_U.every((x) => A.ALATI.some((a) => a.ime === x && !a.samoCitanje)), 'PO_ID_U imenuje alat koji ne postoji ili samo čita');
    for (const a of A.ALATI.filter((x) => pisu.includes(x.ime))) {
      assert.ok((a.ulaz.required || []).includes('repeat_key'), a.ime + ' piše bez ključa ponavljanja');
    }
  });

  await test('②/2 cjevovod nad lažnom bazom: nacrt nastane, a payload prolazi STROGI profil (ugc-content.schema.json)', async () => {
    const Ajv = require('ajv');
    const provjeri = new Ajv({ allErrors: false, allowUnionTypes: true }).compile(require(path.join(KORIJEN, 'schema', 'ugc-content.schema.json')));
    const k = lazniNacrt();
    const { draft_id, lesson_id } = await cjevovod(k);
    const d = k.nacrti.get(draft_id);
    assert.ok(d, 'nacrt nije nastao');
    assert.ok(provjeri(d.payload), 'payload pada na shemi: ' + JSON.stringify(provjeri.errors && provjeri.errors[0]));
    const l = d.payload[lesson_id];
    assert.deepStrictEqual([l.name, l.color, l.learn.blocks.length, l.flashcards.length, l.quiz.length, l.fillBlanks.length],
      ['BDP', '#10b981', 2, 2, 1, 1]);
    assert.strictEqual(Object.keys(d.payload).filter((x) => x !== 'schemaVersion').length, 2, 'obje lekcije');
  });

  await test('②/2 redoslijed: kartice PADAJU bez Learna, pitanja PADAJU bez kartica, nepoznata lekcija pada', async () => {
    const k = lazniNacrt();
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO }));
    const l = z.lessons[1].lesson_id;
    const r1 = await A.izvediAlat('dodaj_kartice', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'kartice-1', cards: KARTICE });
    assert.strictEqual(r1.isError, true); assert.strictEqual(izlaz(r1).error, 'alat_nema_learna');
    await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'l', blocks: LEARN.blocks });
    const r2 = await A.izvediAlat('dodaj_pitanja', k, Object.assign({ draft_id: z.draft_id, lesson_id: l, repeat_key: 'p' }, PITANJA));
    assert.strictEqual(r2.isError, true); assert.strictEqual(izlaz(r2).error, 'alat_nema_kartica');
    const r3 = await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: 'nema', repeat_key: 'l2', blocks: LEARN.blocks });
    assert.strictEqual(r3.isError, true); assert.strictEqual(izlaz(r3).error, 'alat_nema_lekcije');
    // kontrola: s Learnom kartice prolaze, s karticom pitanja prolaze
    assert.ok(!(await A.izvediAlat('dodaj_kartice', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'kartice-1', cards: KARTICE })).isError);
    assert.ok(!(await A.izvediAlat('dodaj_pitanja', k, Object.assign({ draft_id: z.draft_id, lesson_id: l, repeat_key: 'p' }, PITANJA))).isError);
  });

  await test('②/2 isti poziv DVAPUT ne duplicira: ni nacrt, ni lekciju, ni kartice, ni pitanja (i ne troši upis)', async () => {
    const k = lazniNacrt();
    const { draft_id, lesson_id } = await cjevovod(k);
    const prije = JSON.stringify(k.nacrti.get(draft_id).payload);
    const upisa = k.zapis.upisa;
    const z2 = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'Makro', repeat_key: 'start-1', lessons: LEKCIJE, ...PO }));
    assert.strictEqual(z2.draft_id, draft_id, 'ponovljen početak = novi nacrt');
    assert.strictEqual(k.nacrti.size, 1);
    await A.izvediAlat('napisi_learn', k, { draft_id, lesson_id, repeat_key: 'learn-1', blocks: LEARN.blocks });
    await A.izvediAlat('dodaj_kartice', k, { draft_id, lesson_id, repeat_key: 'kartice-1', cards: KARTICE });
    await A.izvediAlat('dodaj_pitanja', k, Object.assign({ draft_id, lesson_id, repeat_key: 'pitanja-1' }, PITANJA));
    assert.strictEqual(JSON.stringify(k.nacrti.get(draft_id).payload), prije, 'ponovljeni pozivi promijenili nacrt');
    assert.strictEqual(k.zapis.upisa, upisa, 'ponovljeni pozivi trošili upis');
    // kontrola: DRUGI ključ = nove kartice (dodaje, ne prepisuje)
    await A.izvediAlat('dodaj_kartice', k, { draft_id, lesson_id, repeat_key: 'kartice-2', cards: KARTICE });
    assert.strictEqual(k.nacrti.get(draft_id).payload[lesson_id].flashcards.length, 4);
  });

  await test('②/2 sukob verzije: alat pročita ponovno i uspije; stalni sukob = „ponovno", ne kvar', async () => {
    const k = lazniNacrt({ sukobi: 1 });
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO }));
    assert.ok(z.draft_id, JSON.stringify(z));
    assert.strictEqual(Object.keys(k.nacrti.get(z.draft_id).payload).filter((x) => x !== 'schemaVersion').length, 2, 'upis nakon sukoba se izgubio');
    const k2 = lazniNacrt({ sukobi: 99 });
    const r = await A.izvediAlat('zapocni_nacrt', k2, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO });
    assert.strictEqual(r.isError, true); assert.strictEqual(izlaz(r).error, 'nacrt_sukob'); assert.strictEqual(izlaz(r).kind, 'ponovno');
  });

  await test('②/2 ulaz se provjerava u JEZGRI: bez ključa, nepoznato polje, 501 znak, kriva boja, loš ključ, `correct` izvan opcija', async () => {
    const k = lazniNacrt();
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO }));
    const l = z.lessons[0].lesson_id;
    await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'l', blocks: LEARN.blocks });
    const lose = [
      ['dodaj_kartice', { draft_id: z.draft_id, lesson_id: l, cards: KARTICE }],
      ['dodaj_kartice', { draft_id: z.draft_id, lesson_id: l, repeat_key: 'k', cards: KARTICE, zlo: 1 }],
      ['dodaj_kartice', { draft_id: z.draft_id, lesson_id: l, repeat_key: 'k', cards: [{ question: 'q', answer: 'x'.repeat(501) }] }],
      ['zapocni_nacrt', { name: 'Y', repeat_key: 's2', lessons: [{ name: 'L', color: 'red' }], ...PO }],
      ['zapocni_nacrt', { name: 'Y', repeat_key: 'ima razmak', lessons: LEKCIJE, ...PO }],
      ['dodaj_pitanja', { draft_id: z.draft_id, lesson_id: l, repeat_key: 'q', quiz: [{ question: 'q', options: ['a', 'b'], correct: 2, card: 'k1' }] }]
    ];
    for (const [alat, arg] of lose) {
      const r = await A.izvediAlat(alat, k, arg);
      assert.strictEqual(r.isError, true, alat + ' prošao: ' + JSON.stringify(arg).slice(0, 80));
      assert.strictEqual(izlaz(r).error, 'alat_los_ulaz', alat + ': ' + JSON.stringify(izlaz(r)));
    }
    assert.strictEqual(k.nacrti.size, 1, 'loš ulaz ipak stvorio nacrt');
    const kv = await A.izvediAlat('dodaj_kartice', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'kartice-1', cards: KARTICE });
    assert.ok(!kv.isError, 'kontrola: valjan ulaz pada: ' + kv.content[0].text);
  });

  // ── N9 (uvjet ②/2): SVAKI `rpc(...)` u alatima ide kroz `prevediOdbijanje` ──────────────────────
  // Statički: identifikator `rpc` postoji (nula = pad), i SVAKA pojava je u tijelu jedinog pomoćnika
  // koji grešku predaje `prevediOdbijanje` (ili u deklaraciji sučelja `Klijent`). Traži se RIJEČ
  // `rpc`, ne zapis `.rpc(` — revizor ②/2 je izmjerio tri zaobilaska tog zapisa (`klijent['rpc']`,
  // generik `.rpc<T>(`, poziv iza `/*` u istom retku). Komentari i nizovi se uklanjaju tokenizatorom,
  // ne filtrom redaka. Dinamički: za svaki (alat, RPC, redni broj poziva) — uključujući granu
  // ponovnog pokušaja nakon sukoba — baza obori baš taj poziv; alat mora vratiti PREVEDENO odbijanje.

  /** Izvor bez komentara. Nizovi OSTAJU netaknuti (preskaču se samo da `//` u njima nije komentar):
   *  `'rpc'` u nizu broji se kao poziv, jer može biti ključ (`k['rpc']`, `k[s]`). */
  function bezKomentara(s) {
    let van = ''; let i = 0;
    while (i < s.length) {
      const c = s[i]; const d = s[i + 1];
      if (c === '/' && d === '/') { while (i < s.length && s[i] !== '\n') i++; continue; }
      if (c === '/' && d === '*') { const k = s.indexOf('*/', i + 2); i = k < 0 ? s.length : k + 2; van += ' '; continue; }
      if (c === '\'' || c === '"' || c === '`') {
        let j = i + 1;
        while (j < s.length && s[j] !== c) { if (s[j] === '\\') j++; j++; }
        van += s.slice(i, j + 1); i = j + 1; continue;
      }
      van += c; i++;
    }
    return van;
  }
  /** [od, do] tijela (vitičaste) prve deklaracije koja odgovara uzorku. */
  function tijeloOd(src, uzorak) {
    const p = src.search(uzorak);
    if (p < 0) return null;
    const od = src.indexOf('{', p);
    let i = od; let dubina = 0;
    for (; i < src.length; i++) { if (src[i] === '{') dubina++; else if (src[i] === '}' && --dubina === 0) break; }
    return [od, i];
  }

  await test('N9 statički: svaka pojava `rpc` u alati.ts je u tijelu `pozovi` (ili sučelju Klijent), a `pozovi` grešku predaje prevediOdbijanje', () => {
    const src = bezKomentara(ALATI);
    const mjesta = [...src.matchAll(/\brpc\b/g)].map((m) => m.index);
    assert.ok(mjesta.length >= 1, 'u alati.ts nema nijednog rpc — brana nema što mjeriti');
    const poz = tijeloOd(src, /async function pozovi\b[^{]*\)\s*:\s*Promise<T>\s*/);
    assert.ok(poz, 'nema funkcije pozovi');
    const suc = tijeloOd(src, /export interface Klijent\b/);
    assert.ok(suc, 'nema sučelja Klijent');
    const unutar = (m, [od, do_]) => m > od && m < do_;
    const izvan = mjesta.filter((m) => !unutar(m, poz) && !unutar(m, suc));
    assert.deepStrictEqual(izvan.map((m) => src.slice(Math.max(0, m - 30), m + 20).replace(/\s+/g, ' ')), [],
      mjesta.length + ' × rpc, izvan pozovi/Klijent: ' + izvan.length);
    assert.strictEqual(mjesta.filter((m) => unutar(m, poz)).length, 1, 'pozovi mora zvati rpc točno jednom');
    const tijelo = src.slice(poz[0], poz[1] + 1);
    assert.ok(/if\s*\(\s*error\s*\)\s*throw new Odbijanje\(\s*prevediOdbijanje\(\s*error\s*\)\s*\)/.test(tijelo), 'pozovi ne predaje grešku prevediOdbijanje: ' + tijelo);
  });

  await test('N9 statički: tokenizator vidi zaobilaske koje je revizor izmjerio (kontrola same brane)', () => {
    const riječi = (s) => [...bezKomentara(s).matchAll(/\brpc\b/g)].length;
    assert.strictEqual(riječi("x = await k['rpc']('a');"), 1, "klijent['rpc'] se ne vidi");
    assert.strictEqual(riječi('/* ponovi */ await k.rpc(\'a\');'), 1, 'poziv iza /* u istom retku se ne vidi');
    assert.strictEqual(riječi('await k.rpc<Nacrt>(\'a\');'), 1, 'generik se ne vidi');
    assert.strictEqual(riječi('const s = \'rpc\'; k[s](\'a\');'), 1, 'ime u nizu (k[s]) se ne vidi');
    assert.strictEqual(riječi('// k.rpc(\'a\')\n/* k.rpc() */ const u = \'http://x\'; // rpc'), 0, 'komentar se broji kao poziv');
    assert.strictEqual(riječi('const u = \'http://x\'; k.rpc(\'a\');'), 1, '`//` u nizu progutao ostatak retka');
  });

  await test('N9 dinamički: svaki poziv RPC-a (i u grani ponovnog pokušaja) oboren iz baze → alat vraća PREVEDENO odbijanje', async () => {
    assert.strictEqual(RPC_IZ_SQL.length, 9, 'iz supabase/*.sql izvučeno ' + RPC_IZ_SQL.length + ' RPC-ova za mcp_klijent, očekivano 9 (5 nacrta + 4 izmjene, ②/4b)');
    assert.ok(Array.isArray(A.ALATI), 'nema ALATI');
    const parovi = [];
    for (const a of A.ALATI) {
      const pozivi = {
        procitaj_materijale: [() => ({})],
        // ②/4b.2 — `ids.izmjena` = nacrt izmjene materijala MAT (započet u pripremi, prije stanja)
        procitaj_materijal: [() => ({ material_id: MAT }), () => ({ material_id: MAT, lesson_id: 'content' })],
        zapocni_izmjenu: [() => ({ material_id: MAT, repeat_key: 'izmjena-x' })],
        izmijeni_stavke: [(ids) => ({ draft_id: ids.izmjena, lesson_id: 'content', cards: [{ id: 'kc1', answer: 'Novo objašnjenje.' }] })],
        obrisi_stavke: [(ids) => ({ draft_id: ids.izmjena, lesson_id: 'content', ids: ['q1'] })],
        dodaj_lekciju: [(ids) => ({ draft_id: ids.izmjena, repeat_key: 'lekcija-x', name: 'Ioni', color: '#ef4444' })],
        uredi_lekciju: [(ids) => ({ draft_id: ids.izmjena, lesson_id: 'content', name: 'Atomi i ioni' })],
        obrisi_lekciju: [(ids) => ({ draft_id: ids.izmjena, lesson_id: 'l2' })],
        preimenuj_materijal: [(ids) => ({ draft_id: ids.izmjena, name: 'Kemija 2' })],
        vrati_izmjenu: [() => ({ material_id: MAT })],
        zapocni_nacrt: [(ids) => ({ name: 'Makro', repeat_key: 'novi-start', lessons: LEKCIJE, ...PO })],
        napisi_learn: [(ids) => ({ draft_id: ids.draft_id, lesson_id: ids.lesson_id, repeat_key: 'learn-x', blocks: [{ type: 'paragraph', text: 'novo' }] })],
        dodaj_kartice: [(ids) => ({ draft_id: ids.draft_id, lesson_id: ids.lesson_id, repeat_key: 'kartice-x', cards: KARTICE })],
        dodaj_pitanja: [(ids) => Object.assign({ draft_id: ids.draft_id, lesson_id: ids.lesson_id, repeat_key: 'pitanja-x' }, PITANJA)],
        procitaj_nacrt: [() => ({}), (ids) => ({ draft_id: ids.draft_id }), (ids) => ({ draft_id: ids.draft_id, lesson_id: ids.lesson_id })],
        predaj_nacrt: [(ids) => ({ draft_id: ids.draft_id }), (ids) => ({ draft_id: ids.izmjena })]
      }[a.ime];
      assert.ok(pozivi, a.ime + ': nov alat bez poziva u N9 brani');
      for (const zaArg of pozivi) {
        const k = lazniNacrt(); const ids = await cjevovod(k);
        ids.izmjena = izlaz(await A.izvediAlat('zapocni_izmjenu', k, { material_id: MAT, repeat_key: 'izmjena-1' })).draft_id;
        assert.ok(ids.izmjena, 'priprema: nacrt izmjene nije nastao');
        const stanje = new Map(k.nacrti);           // stanje PRIJE poziva — i oborena baza kreće od njega
        const argumenti = zaArg(ids);
        // Dva scenarija: bez sukoba i s JEDNIM sukobom (tada alat ide granom ponovnog pokušaja).
        for (const sukobi of [0, 1]) {
          const sretna = lazniNacrt({ sukobi }, stanje);
          const r = await A.izvediAlat(a.ime, sretna, argumenti);
          assert.ok(!r.isError, a.ime + ' sretan put (sukobi ' + sukobi + ') pao: ' + r.content[0].text);
          const broj = {};
          for (const x of sretna.zapis.pozivi) broj[x] = (broj[x] || 0) + 1;
          for (const [rpcIme, n] of Object.entries(broj)) {
            for (let od = 1; od <= n; od++) {       // obori tek `od`-ti poziv: pokriva i ponovljeni poziv
              const kk = lazniNacrt({ sukobi, oboriOd: od, obori: { [rpcIme]: 'nacrt_kvota_u_izradi: najviše 3 nacrta u izradi' } }, stanje);
              const rr = await A.izvediAlat(a.ime, kk, argumenti);
              const o = izlaz(rr);
              const oznaka = a.ime + ' / ' + rpcIme + ' #' + od + ' (sukobi ' + sukobi + ')';
              assert.strictEqual(rr.isError, true, oznaka + ': oborena baza, a alat javio uspjeh');
              assert.deepStrictEqual([o.error, o.kind], ['nacrt_kvota_u_izradi', 'korisnik'], oznaka + ' NIJE preveden: ' + JSON.stringify(o));
              assert.ok(!/najviše 3 nacrta/.test(rr.content[0].text), 'sirova poruka baze procurila AI-ju');
              const kb = lazniNacrt({ sukobi, oboriOd: od, obori: { [rpcIme]: 'baci' } }, stanje);
              const rb = await A.izvediAlat(a.ime, kb, argumenti);
              assert.deepStrictEqual([rb.isError, izlaz(rb).kind], [true, 'kvar'], oznaka + ' pucanje mreže nije „kvar"');
              assert.ok(!/var\/x|node_drafts|fetch failed/.test(rb.content[0].text), 'unutarnji detalji procurili: ' + rb.content[0].text);
              parovi.push(a.ime + '→' + rpcIme + '#' + od + (sukobi ? 's' : ''));
            }
          }
        }
      }
    }
    const pokriveno = [...new Set(parovi.map((p) => p.split('→')[1].split('#')[0]))].sort();
    const ponovljeni = parovi.filter((p) => /#[2-9]/.test(p)).length;
    console.log('      (dotaknuto ' + parovi.length + ' poziva alat→RPC, od toga ' + ponovljeni + ' u grani ponovnog pokušaja; RPC-ovi: ' + pokriveno.join(', ') + ')');
    assert.ok(ponovljeni >= 4, 'grana ponovnog pokušaja nije mjerena (' + ponovljeni + ')');
    assert.ok(parovi.length >= RPC_IZ_SQL.length, 'premalo parova: ' + parovi.length);
    assert.deepStrictEqual(pokriveno, RPC_IZ_SQL, 'alati ne zovu točno RPC-ove koje f6-nacrt.sql otvara mcp_klijentu');
  });

  await test('②/4.3′ predaja: materijal na polici, nacrt nestao (upis poslije = `nacrt_ne_postoji` / stop), ponovljena = ISTI materijal', async () => {
    const k = lazniNacrt();
    const { draft_id, lesson_id } = await cjevovod(k);
    const p1 = izlaz(await A.izvediAlat('predaj_nacrt', k, { draft_id }));
    assert.ok(/^[0-9a-f-]{36}$/.test(p1.material_id || ''), 'predaja ne vraća id materijala: ' + JSON.stringify(p1));
    assert.strictEqual(p1.status, 'on_shelf');
    const r = await A.izvediAlat('napisi_learn', k, { draft_id, lesson_id, repeat_key: 'poslije', blocks: [{ type: 'paragraph', text: 'kasno' }] });
    assert.deepStrictEqual([r.isError, izlaz(r).error, izlaz(r).kind], [true, 'nacrt_ne_postoji', 'stop']);
    const p2 = izlaz(await A.izvediAlat('predaj_nacrt', k, { draft_id }));
    assert.deepStrictEqual([p2.material_id, p2.review_url], [p1.material_id, p1.review_url], 'ponovljena predaja ne vraća isti materijal i link');
  });

  await test('②/4.3′ polica pri predaji: shelf_id ILI new_shelf idu u bazu; oboje = odbijeno BEZ poziva baze; bez police = „korisnik"', async () => {
    const SHELF = '22222222-2222-4222-8222-222222222222';
    for (const [arg, ocek] of [[{}, [null, null]], [{ shelf_id: SHELF }, [SHELF, null]], [{ new_shelf: 'Kemija' }, [null, 'Kemija']]]) {
      const k = lazniNacrt(); const { draft_id } = await cjevovod(k);
      const r = await A.izvediAlat('predaj_nacrt', k, Object.assign({ draft_id }, arg));
      assert.ok(!r.isError, JSON.stringify(arg) + ': ' + r.content[0].text);
      assert.deepStrictEqual([k.zapis.predaje[0].p_polica, k.zapis.predaje[0].p_nova_polica], ocek, 'polica nije prosljeđena: ' + JSON.stringify(arg));
    }
    const k = lazniNacrt(); const { draft_id } = await cjevovod(k);
    const prije = k.zapis.pozivi.length;
    const oba = await A.izvediAlat('predaj_nacrt', k, { draft_id, shelf_id: SHELF, new_shelf: 'Dvije' });
    assert.deepStrictEqual([oba.isError, izlaz(oba).error], [true, 'alat_los_ulaz']);
    assert.strictEqual(k.zapis.pozivi.length, prije, 'oboje odjednom, a alat je ipak zvao bazu');
    k.nacrti.get(draft_id).nova_polica = null; k.nacrti.get(draft_id).polica_id = null;   // nacrt iz vremena prije ②/4.2
    const bez = izlaz(await A.izvediAlat('predaj_nacrt', k, { draft_id }));
    assert.deepStrictEqual([bez.error, bez.kind], ['nacrt_bez_police', 'korisnik']);
    assert.ok(/ask the user/i.test(bez.message) && /shelf_id|new_shelf/.test(bez.message), 'poruka ne kaže AI-ju što da učini: ' + bez.message);
  });

  await test('②/2 omot registrira SVE alate iz jezgre (nijedan alat ne živi samo u index.ts)', () => {
    const src = kod(INDEX);
    assert.ok(/registrirajAlate\(/.test(src), 'index.ts ne zove registrirajAlate');
    assert.ok(!/registerTool\(/.test(src), 'index.ts registrira alat mimo jezgre');
    const reg = []; A.registrirajAlate({ registerTool: (ime, cfg, cb) => reg.push([ime, cfg, cb]) }, lazniNacrt(), (s) => s);
    assert.deepStrictEqual(reg.map((r) => r[0]).sort(), A.ALATI.map((a) => a.ime).sort());
    assert.ok(reg.every((r) => typeof r[2] === 'function' && r[1].inputSchema && r[1].description));
  });

  await test('②/2 upute (`instructions`) opisuju cjevovod redom; ②/4.3′: materijal ide na policu CIJEL i privatan je (ADR-039)', () => {
    const redom = ['zapocni_nacrt', 'napisi_learn', 'dodaj_kartice', 'dodaj_pitanja', 'predaj_nacrt'].map((x) => A.UPUTE.indexOf(x));
    assert.ok(redom.every((x, j) => x >= 0 && (j === 0 || x > redom[j - 1])), 'redoslijed u uputama: ' + redom);
    assert.ok(/whole material goes onto the user's shelf/i.test(A.UPUTE) && /never half/i.test(A.UPUTE), 'upute ne kažu da materijal ide na policu cijel');
    assert.ok(/private/i.test(A.UPUTE), 'upute ne kažu da je materijal privatan');
    assert.ok(!/accepts? (it|the draft)|review(s)? (it|the draft) in Sokrat/i.test(A.UPUTE + A.ALATI.map((x) => x.opis).join(' ')),
      'upute ili opis alata i dalje obećavaju pregled/prihvat koji je otpao (ADR-039)');
  });

  // ══ ②/3 OBLIK MATERIJALA: nacrt JEST gradivo (anketa 30.09.: „nacrt u obliku gradiva") ══════════
  // Prihvati (②/4) nacrt prepisuje u materijal bez pretvorbe — zato izlaz alata mora već biti valjano
  // GRADIVO: i strogi profil (baza), i kataloška shema (`validate:schema`, ono što renderer očekuje).
  console.log('\n  — ②/3 oblik materijala —');
  const AjvS = require('ajv');
  const shemaKat = new AjvS({ allErrors: true, allowUnionTypes: true }).compile(require(path.join(KORIJEN, 'schema', 'subject-content.schema.json')));
  const shemaUgc = new AjvS({ allErrors: true, allowUnionTypes: true }).compile(require(path.join(KORIJEN, 'schema', 'ugc-content.schema.json')));
  const greskeSheme = (v) => (v.errors || []).map((e) => e.instancePath + ' ' + e.message).join('; ');

  await test('②/3 izlaz cjevovoda prolazi KATALOŠKU shemu (subject-content) i strogi profil (ugc-content)', async () => {
    const k = lazniNacrt();
    const { draft_id } = await cjevovod(k);
    const p = k.nacrti.get(draft_id).payload;
    assert.ok(shemaKat(p), 'kataloška shema: ' + greskeSheme(shemaKat));
    assert.ok(shemaUgc(p), 'strogi profil: ' + greskeSheme(shemaUgc));
  });

  await test('②/3 v2: `schemaVersion: 2`, svaka lekcija ima ikonu, svaka stavka i blok imaju id', async () => {
    const k = lazniNacrt();
    const { draft_id } = await cjevovod(k);
    const p = k.nacrti.get(draft_id).payload;
    assert.strictEqual(p.schemaVersion, 2, 'nema schemaVersion 2');
    const lekcije = Object.keys(p).filter((x) => x !== 'schemaVersion');
    assert.strictEqual(lekcije.length, 2);
    for (const l of lekcije) {
      assert.match(p[l].icon || '', /^fa-[a-z0-9-]+$/, l + ' bez ikone');
      for (const niz of ['flashcards', 'quiz', 'fillBlanks']) assert.ok(Array.isArray(p[l][niz]), l + '.' + niz + ' nije niz (kostur mora biti kao nova sekcija u Studiju)');
      for (const niz of ['flashcards', 'quiz', 'fillBlanks']) for (const x of p[l][niz] || []) assert.ok(x.id, l + '.' + niz + ' stavka bez id-a');
      for (const b of (p[l].learn || {}).blocks || []) assert.ok(b.id, l + ' blok bez id-a');
    }
  });

  await test('②/3 svako pitanje nosi `card` koja POSTOJI u istoj lekciji; nepostojeća kartica i bez `card` padaju', async () => {
    const k = lazniNacrt();
    const { draft_id, lesson_id } = await cjevovod(k);
    const l = k.nacrti.get(draft_id).payload[lesson_id];
    const ids = new Set(l.flashcards.map((c) => c.id));
    for (const x of [...l.quiz, ...l.fillBlanks]) assert.ok(ids.has(x.card), 'pitanje bez valjane kartice: ' + JSON.stringify(x));
    const bez = await A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id, repeat_key: 'p2', quiz: [{ question: 'q', options: ['a', 'b'], correct: 0 }] });
    assert.strictEqual(izlaz(bez).error, 'alat_los_ulaz', 'pitanje bez card prošlo');
    const bezD = await A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id, repeat_key: 'p4', fill_blanks: [{ sentence: 'a ___', answers: ['x'] }] });
    assert.strictEqual(izlaz(bezD).error, 'alat_los_ulaz', 'dopuna bez card prošla');
    const tudja = await A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id, repeat_key: 'p3', quiz: [{ question: 'q', options: ['a', 'b'], correct: 0, card: 'nema-je' }] });
    assert.deepStrictEqual([tudja.isError, izlaz(tudja).error], [true, 'alat_kartica_ne_postoji']);
  });

  await test('②/3 dodaj_kartice vraća id-eve kartica (AI ih treba za `card`) — isti kao u nacrtu', async () => {
    const k = lazniNacrt();
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO }));
    await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: 'l1', repeat_key: 'l', blocks: LEARN.blocks });
    const r = izlaz(await A.izvediAlat('dodaj_kartice', k, { draft_id: z.draft_id, lesson_id: 'l1', repeat_key: 'kk', cards: KARTICE }));
    assert.deepStrictEqual((r.cards || []).map((c) => c.card_id), k.nacrti.get(z.draft_id).payload.l1.flashcards.map((c) => c.id));
    assert.strictEqual((r.cards || []).length, 2);
  });

  await test('②/3 dopuna: praznina = `_______` (alat normalizira `___`), `answers` = odgovor PO praznini, `answer` = prvi', async () => {
    const k = lazniNacrt();
    const { draft_id, lesson_id } = await cjevovod(k);
    const d = (sentence, answers) => A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id, repeat_key: 'f-' + sentence.length + '-' + answers.length,
      fill_blanks: [{ sentence, answers, card: K0 }] });
    const jedna = await d('BDP mjeri ____ zemlje.', ['proizvodnju']);
    const dvije = await d('___ i ___ su dva pristupa.', ['proizvodni', 'rashodovni']);
    assert.ok(!jedna.isError && !dvije.isError, jedna.content[0].text + ' / ' + dvije.content[0].text);
    const f = k.nacrti.get(draft_id).payload[lesson_id].fillBlanks;
    const j = f.find((x) => x.sentence.includes('zemlje')); const v = f.find((x) => x.sentence.includes(' i '));
    assert.deepStrictEqual([j.sentence, j.answer, j.answers], ['BDP mjeri _______ zemlje.', 'proizvodnju', undefined]);
    assert.deepStrictEqual([v.sentence, v.answer, v.answers], ['_______ i _______ su dva pristupa.', 'proizvodni', ['proizvodni', 'rashodovni']]);
    for (const [s, a] of [['Bez praznine.', ['x']], ['___ i ___', ['samo jedan']], ['___', ['a', 'b']]]) {
      const r = await d(s, a);
      assert.strictEqual(izlaz(r).error, 'alat_los_ulaz', 'prošla dopuna ' + s + ' / ' + a.length + ' odgovora');
    }
    // Rečenica bez praznine dobiva VLASTITU poruku (AI mora znati da je zaboravio `___`, a ne da broji krivo).
    assert.match(izlaz(await d('Bez praznine.', ['x'])).message, /no gap/, 'rečenica bez praznine bez jasne poruke');
  });

  await test('②/3 bez slika i videa u prvom izdanju: blok `image`/`video` pada, ostali tipovi prolaze', async () => {
    const k = lazniNacrt();
    const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 's', lessons: LEKCIJE, ...PO }));
    for (const b of [{ type: 'video', url: 'https://youtu.be/x' }, { type: 'image', src: 'https://x/y.png' }, { type: 'legacy-html', html: '<b>x</b>' }]) {
      const r = await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: 'l1', repeat_key: 'b-' + b.type, blocks: [b] });
      assert.strictEqual(izlaz(r).error, 'alat_los_ulaz', b.type + ' prošao');
    }
    const svi = [{ type: 'heading', text: 'H', level: 2 }, { type: 'paragraph', text: 'P' }, { type: 'list', items: ['a'] },
      { type: 'callout', text: 'C', variant: 'tip' }, { type: 'table', rows: [['a']] }, { type: 'formula', tex: 'x^2' }];
    const ok = await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: 'l1', repeat_key: 'svi', blocks: svi });
    assert.ok(!ok.isError, ok.content[0].text);
  });

  await test('②/3 sheme: `card` je OPCIONALNO polje kviza i dopune u OBJE sheme (aditivno), oblik id-a', () => {
    const kviz = (dod) => ({ l1: { name: 'L', icon: 'fa-book', color: '#6366f1', quiz: [Object.assign({ question: 'q', options: ['a', 'b'], correct: 0 }, dod)] } });
    const dop = (dod) => ({ l1: { name: 'L', icon: 'fa-book', color: '#6366f1', fillBlanks: [Object.assign({ sentence: 'a _______', answer: 'x' }, dod)] } });
    for (const [ime, v] of [['katalog', shemaKat], ['ugc', shemaUgc]]) {
      assert.ok(v(kviz({})) && v(dop({})), ime + ': bez card više ne prolazi (nije aditivno) ' + greskeSheme(v));
      assert.ok(v(kviz({ card: 'k1abc-0' })) && v(dop({ card: 'k1abc-0' })), ime + ': card ne prolazi ' + greskeSheme(v));
      assert.ok(!v(kviz({ card: 'loš id!' })) && !v(dop({ card: '' })), ime + ': card krivog oblika prolazi');
    }
  });

  await test('②/3 kartica iz DRUGE lekcije ne vrijedi; isti ključ u dvije lekcije daje RAZLIČITE id-eve', async () => {
    const k = lazniNacrt();
    const { draft_id } = await cjevovod(k);                 // l2 ima kartice s ključem 'kartice-1'
    await A.izvediAlat('napisi_learn', k, { draft_id, lesson_id: 'l1', repeat_key: 'learn-1', blocks: LEARN.blocks });
    await A.izvediAlat('dodaj_kartice', k, { draft_id, lesson_id: 'l1', repeat_key: 'kartice-1', cards: KARTICE });
    const p = k.nacrti.get(draft_id).payload;
    const l1 = p.l1.flashcards.map((c) => c.id); const l2 = p.l2.flashcards.map((c) => c.id);
    assert.strictEqual(l1.length, 2);
    assert.ok(l1.every((id) => !l2.includes(id)), 'isti id kartice u dvije lekcije: ' + l1 + ' / ' + l2);
    const verzija = k.nacrti.get(draft_id).verzija;
    const r = await A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id: 'l2', repeat_key: 'tudja', quiz: [{ question: 'q', options: ['a', 'b'], correct: 0, card: l1[0] }] });
    assert.deepStrictEqual([r.isError, izlaz(r).error], [true, 'alat_kartica_ne_postoji'], 'kartica iz l1 prošla u l2');
    assert.strictEqual(k.nacrti.get(draft_id).verzija, verzija, 'odbijeno pitanje ipak upisano');
    const ok = await A.izvediAlat('dodaj_pitanja', k, { draft_id, lesson_id: 'l1', repeat_key: 'svoja', quiz: [{ question: 'q', options: ['a', 'b'], correct: 0, card: l1[0] }] });
    assert.ok(!ok.isError, 'kontrola: vlastita kartica pada: ' + ok.content[0].text);
  });

  await test('②/3 UPUTE korak 4 kažu AI-ju za `card`/`card_id` i prazninu `___` s odgovorom po praznini', () => {
    const korak4 = A.UPUTE.split('\n').find((r) => /^\s*4\. dodaj_pitanja/.test(r)) || '';
    assert.ok(korak4, 'nema koraka 4');
    for (const x of ['"card"', 'card_id', '___', 'one answer per gap']) assert.ok(korak4.includes(x), 'korak 4 ne spominje ' + x + ': ' + korak4);
  });

  await test('②/3 marker praznine u alatu == marker renderera (`js/fill-blanks.js`)', async () => {
    const mark = (f) => (fs.readFileSync(path.join(KORIJEN, f), 'utf8').match(/const FILL_MARK = '([^']+)'/) || [])[1];
    const renderer = mark('js/fill-blanks.js'); const alat = mark('supabase/functions/mcp/alati.ts');
    assert.ok(renderer && renderer.length >= 3, 'renderer marker nije pročitan');
    assert.strictEqual(alat, renderer, 'alat i renderer imaju različit marker');
    const k = lazniNacrt(); const { draft_id, lesson_id } = await cjevovod(k);
    assert.ok(k.nacrti.get(draft_id).payload[lesson_id].fillBlanks[0].sentence.includes(renderer), 'spremljena dopuna nema marker renderera');
  });

  // ══ ②/4.2 POLICA, OPSEG, LINK NATRAG (Leon, ankete 30.09.) ═════════════════════════════════════
  console.log('\n  — ②/4.2 polica, opseg, link natrag —');
  const UUID_P = '11111111-2222-4333-8444-555555555555';

  await test('②/4.2 zapocni_nacrt TRAŽI opseg i TOČNO jednu policu (postojeću ili novu po imenu)', async () => {
    const lose = [
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, new_shelf: 'P' },                                        // bez opsega
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, scope: 'standard' },                                     // bez police
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, scope: 'standard', shelf_id: UUID_P, new_shelf: 'P' },  // obje
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, scope: 'huge', new_shelf: 'P' },                         // nepoznat opseg
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, scope: 'standard', shelf_id: 'nije-uuid' },              // krivi id
      { name: 'X', repeat_key: 'a', lessons: LEKCIJE, scope: 'standard', new_shelf: '' }                       // prazno ime
    ];
    for (const arg of lose) {
      const k = lazniNacrt();
      const r = await A.izvediAlat('zapocni_nacrt', k, arg);
      assert.deepStrictEqual([r.isError, izlaz(r).error], [true, 'alat_los_ulaz'], 'prošlo: ' + JSON.stringify(arg).slice(0, 90));
      assert.strictEqual(k.nacrti.size, 0, 'odbijen početak ipak stvorio nacrt');
    }
    // Kontrola: bez nje test prolazi i na starom kodu (stara shema odbija SVAKO nepoznato polje).
    for (const ok of [{ new_shelf: 'P', scope: 'standard' }, { shelf_id: UUID_P, scope: 'summary' }]) {
      const r = await A.izvediAlat('zapocni_nacrt', lazniNacrt(), Object.assign({ name: 'X', repeat_key: 'a', lessons: LEKCIJE }, ok));
      assert.ok(!r.isError, 'kontrola: ispravan početak odbijen: ' + r.content[0].text);
    }
  });

  await test('②/4.2 polica i opseg idu u bazu (p_polica · p_nova_polica · p_opseg), opseg preveden na bazin rječnik', async () => {
    const slucajevi = [
      [{ new_shelf: 'Biologija', scope: 'summary' }, { polica_id: null, nova_polica: 'Biologija', opseg: 'sazeto' }],
      [{ shelf_id: UUID_P, scope: 'standard' }, { polica_id: UUID_P, nova_polica: null, opseg: 'standardno' }],
      [{ shelf_id: UUID_P, scope: 'detailed' }, { polica_id: UUID_P, nova_polica: null, opseg: 'detaljno' }]
    ];
    for (const [ulaz, ocek] of slucajevi) {
      const k = lazniNacrt();
      const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, Object.assign({ name: 'X', repeat_key: 'a', lessons: LEKCIJE }, ulaz)));
      const d = k.nacrti.get(z.draft_id);
      assert.ok(d, 'nacrt nije nastao: ' + JSON.stringify(z));
      assert.deepStrictEqual({ polica_id: d.polica_id, nova_polica: d.nova_polica, opseg: d.opseg }, ocek, JSON.stringify(ulaz));
    }
  });

  await test('②/4.2 alati PONAVLJAJU opseg AI-ju (zapocni · napisi_learn · dodaj_kartice · procitaj_nacrt), uputa se razlikuje po opsegu', async () => {
    const upute = {};
    for (const scope of ['summary', 'standard', 'detailed']) {
      const k = lazniNacrt();
      const z = izlaz(await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 'a', lessons: LEKCIJE, new_shelf: 'P', scope }));
      const l = z.lessons && z.lessons[0] && z.lessons[0].lesson_id;
      const learn = izlaz(await A.izvediAlat('napisi_learn', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'l', blocks: LEARN.blocks }));
      const kart = izlaz(await A.izvediAlat('dodaj_kartice', k, { draft_id: z.draft_id, lesson_id: l, repeat_key: 'k', cards: KARTICE }));
      const cit = izlaz(await A.izvediAlat('procitaj_nacrt', k, { draft_id: z.draft_id }));
      for (const [ime, o] of [['zapocni_nacrt', z], ['napisi_learn', learn], ['dodaj_kartice', kart], ['procitaj_nacrt', cit]]) {
        assert.strictEqual(o.scope, scope, ime + ' ne ponavlja opseg: ' + JSON.stringify(o).slice(0, 120));
        assert.ok(typeof o.scope_hint === 'string' && o.scope_hint.length > 40, ime + ' bez upute za opseg');
      }
      upute[scope] = z.scope_hint;
    }
    assert.strictEqual(new Set(Object.values(upute)).size, 3, 'ista uputa za različite opsege');
    for (const u of Object.values(upute)) assert.ok(/whole source/i.test(u), 'uputa ne kaže da se pokriva CIJELI izvor (ADR-031): ' + u);
  });

  await test('②/4.3′ predaj_nacrt vraća review_url na MATERIJAL; adresa iz okoline, pogrešna → zadana produkcijska', async () => {
    const k = lazniNacrt(); const { draft_id } = await cjevovod(k);
    const stanje = new Map(k.nacrti);
    const predaja = async (okolina) => izlaz(await A.izvediAlat('predaj_nacrt', lazniNacrt({}, stanje), { draft_id }, okolina));
    const ruta = (mid) => '/#/subject/node%3A' + mid + '/content';
    let p = await predaja({ appUrl: 'http://localhost:5051/' });
    assert.strictEqual(p.review_url, 'http://localhost:5051' + ruta(p.material_id));
    p = await predaja(undefined); assert.strictEqual(p.review_url, 'https://www.sokratstudy.com' + ruta(p.material_id));
    p = await predaja({ appUrl: 'javascript:alert(1)' }); assert.strictEqual(p.review_url, 'https://www.sokratstudy.com' + ruta(p.material_id));
    p = await predaja({ appUrl: 'https://drugi.example/x?y#z' });
    assert.strictEqual(p.review_url, 'https://drugi.example/x' + ruta(p.material_id), 'upit i sidro adrese nisu odrezani');
    const reg = [];
    A.registrirajAlate({ registerTool: (ime, cfg, cb) => reg.push([ime, cb]) }, lazniNacrt({}, stanje), (s) => s, { appUrl: 'http://localhost:5051' });
    const r = izlaz(await reg.find((x) => x[0] === 'predaj_nacrt')[1]({ draft_id }));
    assert.strictEqual(r.review_url, 'http://localhost:5051' + ruta(r.material_id), 'registrirajAlate ne prosljeđuje okolinu alatu');
  });

  await test('②/4.3′ link na materijal = ruta koju APLIKACIJA otvara: pravi parseRoute (js/navigation.js) → study, node:<id>, LESSON_ID iz js/my-materials.js', () => {
    const vm = require('vm');
    const ctx = { console, window: {}, document: { addEventListener() {}, querySelectorAll() { return []; } }, history: {}, location: { hash: '' }, localStorage: { getItem() { return null; } } };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(path.join(KORIJEN, 'js', 'navigation.js'), 'utf8') + ';this.__parseRoute = parseRoute;', ctx);
    const lekcija = (fs.readFileSync(path.join(KORIJEN, 'js', 'my-materials.js'), 'utf8').match(/const LESSON_ID = '([^']+)'/) || [])[1];
    assert.ok(lekcija, 'LESSON_ID nije nađen u js/my-materials.js');
    assert.strictEqual(A.LEKCIJA_MATERIJALA, lekcija, 'alat i aplikacija se ne slažu oko lekcije materijala');
    const mid = '11111111-1111-4111-8111-000000000042';
    const url = A.adresaMaterijala({ appUrl: 'http://localhost:5051' }, mid);
    const r = ctx.__parseRoute(url.slice(url.indexOf('#')));
    assert.deepStrictEqual(JSON.parse(JSON.stringify(r)), { page: 'study', data: { subject: 'node:' + mid, lesson: lekcija, section: 'home' } });
  });

  await test('②/4.2 omot čita SOKRAT_APP_URL iz okoline i predaje ga jezgri', () => {
    const src = kod(INDEX);
    assert.ok(/Deno\.env\.get\(\s*['"]SOKRAT_APP_URL['"]\s*\)/.test(src), 'index.ts ne čita SOKRAT_APP_URL');
    assert.ok(/registrirajAlate\([^;]*appUrl:\s*APP_URL/.test(src), 'index.ts ne predaje appUrl u registrirajAlate');
  });

  await test('②/4.2 UPUTE: pitaj policu i opseg PRIJE zapocni_nacrt · Learn = skripta, ne sažetak · završni test po lekcijama · link korisniku', () => {
    const U = A.UPUTE;
    const prije = U.slice(0, Math.max(0, U.indexOf('1. zapocni_nacrt')));
    for (const x of ['procitaj_materijale', 'shelf', 'summary', 'standard', 'detailed']) assert.ok(prije.includes(x), 'prije koraka 1 nema „' + x + '"');
    assert.ok(/not a summary/i.test(U), 'upute ne kažu da Learn nije sažetak');
    assert.ok(/final test/i.test(U), 'upute ne kažu gdje idu pitanja završnog testa');
    const korak5 = U.split('\n').find((r) => /^\s*5\. predaj_nacrt/.test(r)) || '';
    assert.ok(/review_url/.test(korak5), 'korak 5 ne kaže da korisniku da link: ' + korak5);
  });

  // ══ ②/4b.2 IZMJENA POSTOJEĆEG VLASTITOG MATERIJALA (ADR-039 t.2; anketa 02.10.) ════════════════
  // Lažna baza drži semantiku `f6-nacrt.sql` § „②/4b" (kopija s polaznom verzijom, predaja uz istu verziju);
  // pravu bazu mjeri `mcp:izmjena`, a alate kroz pravi MCP `mcp:alati` ⑧.
  console.log('\n  — ②/4b.2 izmjena postojećeg materijala —');
  const izmjena = async (k, kljuc) => izlaz(await A.izvediAlat('zapocni_izmjenu', k, { material_id: MAT, repeat_key: kljuc || 'izm-1' }));
  const lekcijaNacrta = (k, id, l) => k.nacrti.get(id).payload[l || 'content'];
  const greskaIz = (r) => [r.isError, izlaz(r).error, izlaz(r).kind];

  await test('②/4b.2 procitaj_materijal: sažetak s verzijom, puna lekcija, nepoznato = imenovano; NIŠTA ne piše', async () => {
    const k = lazniNacrt();
    const s = izlaz(await A.izvediAlat('procitaj_materijal', k, { material_id: MAT }));
    assert.deepStrictEqual([s.material_id, s.name, s.version, (s.lessons || []).map((x) => x.lesson_id)], [MAT, 'Kemija', 5, ['content', 'l2']], JSON.stringify(s).slice(0, 160));
    assert.deepStrictEqual([s.lessons[0].cards, s.lessons[0].quiz, s.lessons[0].fill_blanks, s.lessons[0].learn_blocks], [2, 1, 1, 2]);
    const l = izlaz(await A.izvediAlat('procitaj_materijal', k, { material_id: MAT, lesson_id: 'content' }));
    assert.strictEqual(l.lesson.flashcards[0].color, '#a855f7', 'puna lekcija nije vraćena: ' + JSON.stringify(l).slice(0, 120));
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('procitaj_materijal', k, { material_id: MAT, lesson_id: 'nema' })), [true, 'alat_nema_lekcije', 'ispravi']);
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('procitaj_materijal', k, { material_id: '44444444-4444-4444-8444-444444444444' })), [true, 'materijal_ne_postoji', 'korisnik']);
    assert.deepStrictEqual([...new Set(k.zapis.pozivi)], ['mcp_procitaj_materijal'], 'čitanje je zvalo još nešto: ' + k.zapis.pozivi.join(', '));
    assert.strictEqual(k.nacrti.size, 0, 'čitanje stvorilo nacrt');
  });

  await test('②/4b.2 zapocni_izmjenu: kopija u nacrt izmjene; stavka/blok bez id-a dobije STALAN id, postojeći id-evi netaknuti; isti ključ = isti nacrt bez upisa', async () => {
    const k = lazniNacrt();
    const z = await izmjena(k);
    assert.deepStrictEqual([z.edit_of, z.name, (z.lessons || []).length], [MAT, 'Kemija', 2], JSON.stringify(z).slice(0, 160));
    const d = k.nacrti.get(z.draft_id);
    assert.deepStrictEqual([d.izvor_id, d.polazna_verzija], [MAT, 5], 'nacrt nije nacrt izmjene ovog materijala');
    const l = d.payload.content;
    assert.deepStrictEqual(l.flashcards.map((x) => x.id), ['kc1', A.idIzKljuca('s', 'content/flashcards', 1)]);
    assert.deepStrictEqual(l.learn.blocks.map((x) => x.id), ['b1', A.idIzKljuca('b', 'content/learn', 1)]);
    // Osim dodanih id-eva nacrt JEST materijal (kontrola: kopija ne smije ništa izgubiti ni promijeniti).
    const bezNovihId = JSON.parse(JSON.stringify(d.payload));
    delete bezNovihId.content.flashcards[1].id; delete bezNovihId.content.learn.blocks[1].id;
    assert.deepStrictEqual(bezNovihId, materijalPocetni().payload, 'kopija se razlikuje od materijala');
    assert.deepStrictEqual(k.materijali.get(MAT), materijalPocetni(), 'početak izmjene dirnuo materijal');
    const upisa = k.zapis.upisa;
    const z2 = await izmjena(k);
    assert.deepStrictEqual([z2.draft_id, k.nacrti.size, k.zapis.upisa], [z.draft_id, 1, upisa], 'ponovljen početak: novi nacrt ili nov upis');
    // ključ koji već nosi NOV nacrt → odbijen imenovano (baza), ne vraćen kao izmjena
    await A.izvediAlat('zapocni_nacrt', k, { name: 'X', repeat_key: 'zauzet', lessons: LEKCIJE, ...PO });
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('zapocni_izmjenu', k, { material_id: MAT, repeat_key: 'zauzet' })), [true, 'nacrt_kljuc_zauzet', 'ispravi']);
  });

  await test('②/4b.2 izmijeni_stavke: šalje se SAMO što se mijenja, ostalo (i boja iz Studija) ostaje; dopuna ostaje u obliku gradiva', async () => {
    const k = lazniNacrt(); const { draft_id } = await izmjena(k);
    let r = await A.izvediAlat('izmijeni_stavke', k, { draft_id, lesson_id: 'content', cards: [{ id: 'kc1', answer: 'Najmanji dio elementa.' }],
      fill_blanks: [{ id: 'f1', hint: 'jezgra i omotač' }] });
    assert.ok(!r.isError, r.content[0].text);
    let l = lekcijaNacrta(k, draft_id);
    assert.deepStrictEqual(l.flashcards[0], { id: 'kc1', question: 'Što je atom?', answer: 'Najmanji dio elementa.', color: '#a855f7' });
    assert.deepStrictEqual(l.fillBlanks[0], { id: 'f1', sentence: 'Atom ima _______ i _______.', answer: 'jezgru', answers: ['jezgru', 'omotač'], hint: 'jezgra i omotač', card: 'kc1' },
      'promjena samo savjeta pokvarila dopunu');
    r = await A.izvediAlat('izmijeni_stavke', k, { draft_id, lesson_id: 'content', fill_blanks: [{ id: 'f1', sentence: 'Jezgra je u ___ atoma.', answers: ['središtu'] }],
      quiz: [{ id: 'q1', correct: 1, options: ['-', '+'] }] });
    assert.ok(!r.isError, r.content[0].text);
    l = lekcijaNacrta(k, draft_id);
    assert.deepStrictEqual([l.fillBlanks[0].sentence, l.fillBlanks[0].answer, l.fillBlanks[0].answers], ['Jezgra je u _______ atoma.', 'središtu', undefined], 'jedna praznina: `answers` mora otići');
    assert.deepStrictEqual([l.quiz[0].correct, l.quiz[0].options, l.quiz[0].card], [1, ['-', '+'], 'kc1']);
    const upisa = k.zapis.upisa; const prije = JSON.stringify(l);
    const lose = [
      [{ cards: [{ id: 'nema', answer: 'x' }] }, 'alat_stavka_ne_postoji'],
      [{ quiz: [{ id: 'q1', correct: 2 }] }, 'alat_los_ulaz'],
      [{ quiz: [{ id: 'q1', card: 'k-nema' }] }, 'alat_kartica_ne_postoji'],
      [{ fill_blanks: [{ id: 'f1', sentence: '___ i ___' }] }, 'alat_los_ulaz'],
      [{ cards: [{ id: 'kc1', zlo: 1 }] }, 'alat_los_ulaz'],
      [{ cards: [{ answer: 'bez id-a' }] }, 'alat_los_ulaz'],
      [{}, 'alat_los_ulaz']
    ];
    for (const [arg, kod] of lose) {
      const rr = await A.izvediAlat('izmijeni_stavke', k, Object.assign({ draft_id, lesson_id: 'content' }, arg));
      assert.deepStrictEqual([rr.isError, izlaz(rr).error], [true, kod], JSON.stringify(arg) + ' → ' + rr.content[0].text);
    }
    assert.deepStrictEqual([k.zapis.upisa, JSON.stringify(lekcijaNacrta(k, draft_id))], [upisa, prije], 'odbijena izmjena ipak upisana');
  });

  await test('②/4b.2 obrisi_stavke: kartica iz koje su pitanja → odbijeno uz popis pitanja; zajedno s njima prolazi; ponovljeno = bez upisa', async () => {
    const k = lazniNacrt(); const { draft_id } = await izmjena(k);
    const upisa = k.zapis.upisa;
    const r = await A.izvediAlat('obrisi_stavke', k, { draft_id, lesson_id: 'content', ids: ['kc1'] });
    assert.deepStrictEqual(greskaIz(r), [true, 'alat_kartica_u_upotrebi', 'ispravi']);
    assert.ok(/q1/.test(izlaz(r).message) && /f1/.test(izlaz(r).message), 'poruka ne imenuje pitanja: ' + izlaz(r).message);
    assert.strictEqual(k.zapis.upisa, upisa, 'odbijeno brisanje upisano');
    const o = izlaz(await A.izvediAlat('obrisi_stavke', k, { draft_id, lesson_id: 'content', ids: ['kc1', 'q1', 'f1', 'nema'] }));
    assert.deepStrictEqual([o.deleted, o.not_found], [['kc1', 'q1', 'f1'], ['nema']], JSON.stringify(o));
    const l = lekcijaNacrta(k, draft_id);
    assert.deepStrictEqual([l.flashcards.length, l.quiz.length, l.fillBlanks.length], [1, 0, 0]);
    const upisa2 = k.zapis.upisa;
    const o2 = izlaz(await A.izvediAlat('obrisi_stavke', k, { draft_id, lesson_id: 'content', ids: ['kc1', 'q1', 'f1'] }));
    assert.deepStrictEqual([o2.deleted, o2.not_found.length, k.zapis.upisa], [[], 3, upisa2], 'ponovljeno brisanje nije bez učinka');
  });

  await test('②/4b.2 lekcije: dodaj (isti ključ = jedna), uredi (ime/boja), obriši (ponovljeno bez učinka), zadnja = „korisnik"', async () => {
    const k = lazniNacrt(); const { draft_id } = await izmjena(k);
    const a1 = izlaz(await A.izvediAlat('dodaj_lekciju', k, { draft_id, repeat_key: 'lek-1', name: 'Ioni', color: '#EF4444' }));
    const a2 = izlaz(await A.izvediAlat('dodaj_lekciju', k, { draft_id, repeat_key: 'lek-1', name: 'Ioni', color: '#EF4444' }));
    assert.deepStrictEqual([a1.lesson_id, a2.lesson_id, Object.keys(k.nacrti.get(draft_id).payload).length], [a1.lesson_id, a1.lesson_id, 4], 'ponovljeno dodavanje dodalo drugu lekciju');
    assert.deepStrictEqual(lekcijaNacrta(k, draft_id, a1.lesson_id), { name: 'Ioni', icon: 'fa-book', color: '#ef4444', flashcards: [], quiz: [], fillBlanks: [] });
    assert.ok(!(await A.izvediAlat('napisi_learn', k, { draft_id, lesson_id: a1.lesson_id, repeat_key: 'l', blocks: LEARN.blocks })).isError, 'nova lekcija ne prima Learn');
    await A.izvediAlat('uredi_lekciju', k, { draft_id, lesson_id: 'content', name: 'Atomi i ioni', color: '#0EA5E9' });
    assert.deepStrictEqual([lekcijaNacrta(k, draft_id).name, lekcijaNacrta(k, draft_id).color, lekcijaNacrta(k, draft_id).flashcards.length], ['Atomi i ioni', '#0ea5e9', 2]);
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('uredi_lekciju', k, { draft_id, lesson_id: 'content' })), [true, 'alat_los_ulaz', 'ispravi']);
    const o1 = izlaz(await A.izvediAlat('obrisi_lekciju', k, { draft_id, lesson_id: 'l2' }));
    const upisa = k.zapis.upisa;
    const o2 = izlaz(await A.izvediAlat('obrisi_lekciju', k, { draft_id, lesson_id: 'l2' }));
    assert.deepStrictEqual([o1.deleted, o2.deleted, k.zapis.upisa], [true, false, upisa], 'ponovljeno brisanje lekcije nije bez učinka');
    await A.izvediAlat('obrisi_lekciju', k, { draft_id, lesson_id: a1.lesson_id });
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('obrisi_lekciju', k, { draft_id, lesson_id: 'content' })), [true, 'alat_zadnja_lekcija', 'korisnik']);
    assert.ok(lekcijaNacrta(k, draft_id), 'zadnja lekcija ipak obrisana');
  });

  await test('②/4b.2 ime ≤120 = granica čvora (Leon 03.10.): preimenuj, zapocni_nacrt (ime i nova polica), predaj_nacrt — 121 pada BEZ poziva baze, 120 prolazi', async () => {
    const d120 = 'x'.repeat(120); const d121 = 'x'.repeat(121);
    const k = lazniNacrt(); const { draft_id } = await izmjena(k);
    const prije = k.zapis.pozivi.length;
    const lose = [
      ['preimenuj_materijal', { draft_id, name: d121 }],
      ['zapocni_nacrt', { name: d121, repeat_key: 'n1', lessons: LEKCIJE, new_shelf: 'P', scope: 'standard' }],
      ['zapocni_nacrt', { name: 'X', repeat_key: 'n2', lessons: LEKCIJE, new_shelf: d121, scope: 'standard' }],
      ['predaj_nacrt', { draft_id, new_shelf: d121 }]
    ];
    for (const [alat, arg] of lose) assert.deepStrictEqual(greskaIz(await A.izvediAlat(alat, k, arg)), [true, 'alat_los_ulaz', 'ispravi'], alat + ' prima 121 znak');
    assert.strictEqual(k.zapis.pozivi.length, prije, 'predugo ime ipak stiglo do baze');
    const p = izlaz(await A.izvediAlat('preimenuj_materijal', k, { draft_id, name: d120 }));
    assert.deepStrictEqual([p.name, k.nacrti.get(draft_id).name], [d120, d120]);
    const p2 = izlaz(await A.izvediAlat('preimenuj_materijal', k, { draft_id, name: '  Kemija 2 ' }));
    assert.deepStrictEqual([p2.name, k.nacrti.get(draft_id).name], ['Kemija 2', 'Kemija 2'], 'AI-ju javljeno drugo ime od onog koje baza spremi (btrim)');
    assert.deepStrictEqual(k.zapis.argumenti.filter((x) => x[0] === 'mcp_preimenuj_nacrt').map((x) => Object.keys(x[1]).sort()), [['p_id', 'p_name'], ['p_id', 'p_name']]);
    assert.ok(!(await A.izvediAlat('zapocni_nacrt', lazniNacrt(), { name: d120, repeat_key: 'n3', lessons: LEKCIJE, new_shelf: d120, scope: 'standard' })).isError, 'kontrola: 120 odbijeno');
  });

  await test('②/4b.2 predaja izmjene: materijal = nacrt (i ime), nacrt nestao, ponovljena = isti; korisnik mijenjao u međuvremenu → „korisnik", materijal netaknut', async () => {
    const Ajv = require('ajv');
    const provjeri = new Ajv({ allErrors: false, allowUnionTypes: true }).compile(require(path.join(KORIJEN, 'schema', 'ugc-content.schema.json')));
    const k = lazniNacrt(); const { draft_id } = await izmjena(k);
    await A.izvediAlat('izmijeni_stavke', k, { draft_id, lesson_id: 'content', cards: [{ id: 'kc1', answer: 'Novo.' }] });
    await A.izvediAlat('obrisi_stavke', k, { draft_id, lesson_id: 'content', ids: ['q1'] });
    await A.izvediAlat('preimenuj_materijal', k, { draft_id, name: 'Kemija (popravljeno)' });
    const nacrt = JSON.parse(JSON.stringify(k.nacrti.get(draft_id).payload));
    assert.ok(provjeri(nacrt), 'izmijenjen nacrt pada na strogom profilu: ' + JSON.stringify(provjeri.errors && provjeri.errors[0]));
    const p1 = izlaz(await A.izvediAlat('predaj_nacrt', k, { draft_id }, { appUrl: 'http://localhost:5051' }));
    const m = k.materijali.get(MAT);
    assert.deepStrictEqual([p1.material_id, m.name, m.verzija, k.nacrti.has(draft_id)], [MAT, 'Kemija (popravljeno)', 6, false]);
    assert.deepStrictEqual(m.payload, nacrt, 'materijal nije dobio nacrt');
    assert.strictEqual(p1.review_url, 'http://localhost:5051/#/subject/node%3A' + MAT + '/content');
    assert.strictEqual(izlaz(await A.izvediAlat('predaj_nacrt', k, { draft_id })).material_id, MAT, 'ponovljena predaja');
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('predaj_nacrt', k, Object.assign({ draft_id: (await izmjena(k, 'izm-2')).draft_id }, { shelf_id: UUID_P }))),
      [true, 'izmjena_polica', 'ispravi'], 'izmjena prima policu');
    // sukob: korisnik spremi u Studiju (verzija skoči) nakon kopije
    const k2 = lazniNacrt(); const z2 = await izmjena(k2);
    await A.izvediAlat('izmijeni_stavke', k2, { draft_id: z2.draft_id, lesson_id: 'content', cards: [{ id: 'kc1', answer: 'AI-jevo.' }] });
    k2.materijali.get(MAT).verzija = 6; k2.materijali.get(MAT).payload.content.flashcards[0].answer = 'Korisnikovo.';
    const s = await A.izvediAlat('predaj_nacrt', k2, { draft_id: z2.draft_id });
    assert.deepStrictEqual(greskaIz(s), [true, 'izmjena_sukob', 'korisnik']);
    assert.ok(/NOT saved/.test(izlaz(s).message) && /untouched/.test(izlaz(s).message), 'poruka ne kaže da ništa nije spremljeno: ' + izlaz(s).message);
    assert.strictEqual(k2.materijali.get(MAT).payload.content.flashcards[0].answer, 'Korisnikovo.', 'sukob prepisao korisnikov rad');
  });

  await test('②/4b.2 vrati_izmjenu: zove bazu s id-em materijala, vraća verziju i link; bez AI izmjene = „stop"; jedini RAZORAN alat (traži potvrdu)', async () => {
    const k = lazniNacrt();
    const v = izlaz(await A.izvediAlat('vrati_izmjenu', k, { material_id: MAT }, { appUrl: 'http://localhost:5051' }));
    assert.deepStrictEqual([v.material_id, v.version, v.review_url], [MAT, 6, 'http://localhost:5051/#/subject/node%3A' + MAT + '/content']);
    assert.deepStrictEqual(k.zapis.argumenti, [['mcp_vrati_izmjenu', { p_id: MAT }]]);
    k.materijali.get(MAT).aiIzmjena = false;
    assert.deepStrictEqual(greskaIz(await A.izvediAlat('vrati_izmjenu', k, { material_id: MAT })), [true, 'izmjena_nema', 'stop']);
    const reg = []; A.registrirajAlate({ registerTool: (ime, cfg) => reg.push([ime, cfg.annotations]) }, lazniNacrt(), (s) => s);
    const razorni = reg.filter(([, an]) => an.destructiveHint === true).map(([ime]) => ime);
    assert.deepStrictEqual(razorni, ['vrati_izmjenu'], 'razorni alati: ' + razorni.join(', '));
    assert.deepStrictEqual(reg.find(([ime]) => ime === 'procitaj_materijal')[1], { readOnlyHint: true });
  });

  await test('②/4b.2 UPUTE: izmjena samo na korisnikovu riječ, redom procitaj_materijal → zapocni_izmjenu → izmjene → predaj_nacrt; sukob; povijest; vrati', () => {
    const U = A.UPUTE;
    const od = U.indexOf('CHANGE one of the user');
    assert.ok(od > 0 && /only when the user asks/i.test(U.slice(od, od + 200)), 'upute ne kažu da izmjena ide samo na korisnikovu riječ');
    const dio = U.slice(od);
    const redom = ['procitaj_materijal', 'zapocni_izmjenu', 'izmijeni_stavke', 'obrisi_stavke', 'predaj_nacrt'].map((x) => dio.indexOf(x));
    assert.ok(redom.every((x, j) => x >= 0 && (j === 0 || x > redom[j - 1])), 'redoslijed izmjene u uputama: ' + redom);
    for (const a of A.ALATI.filter((x) => !x.samoCitanje || x.ime === 'procitaj_materijal')) {
      assert.ok(U.includes(a.ime), 'upute ne spominju alat ' + a.ime);
    }
    assert.ok(/history/i.test(dio) && /changed the material/i.test(dio) && /nothing is written/i.test(dio), 'upute ne opisuju povijest i sukob');
    assert.ok(/vrati_izmjenu[^\n]*only when the user asks/i.test(dio), 'vrati_izmjenu bez „samo na korisnikovu riječ"');
  });

  console.log('\n  ' + proslo + ' prošlo, ' + pao + ' palo\n');
  process.exit(pao ? 1 : 0);
})();
