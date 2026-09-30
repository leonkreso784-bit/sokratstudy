// ===== SOKRAT STUDY — MCP alati: ČISTA jezgra (F6 ①/1, ADR-030/031/038) =====
//
// Zašto zaseban modul: `index.ts` je samo omot (prijava + MCP prijenos) i ne da se testirati bez
// Denoa i mreže. Sve što alat ODLUČUJE — koje stupce čita, kako slaže stablo, što vraća AI-ju —
// živi ovdje, bez ijednog Deno- ili npm-uvoza, pa ga Node 24 učita izravno
// (`tests/unit/mcp-alati.test.js`, kalup `_shared/mail-core.ts`).
//
// ─── DOSEG (ADR-026/031, tvrdo) ─────────────────────────────────────────────────────────────────
//   • Čita se SAMO kroz klijent koji je `withSupabase({ auth: 'user' })` vezao na korisnikov token
//     → RLS (`nodes_select_own`) vraća isključivo njegove čvorove. Ovaj modul NIKAD ne dobiva
//     admin-klijent i ne zna za javni katalog (ni čitanje).
//   • ②/2: AI PIŠE, ali SAMO u vlastiti nacrt i SAMO kroz pet `mcp_*` RPC-ova (`f6-nacrt.sql`) —
//     nikad u žive tablice. Svaki RPC ide kroz `pozovi()`, jedino mjesto koje zove `.rpc(` i koje
//     grešku baze predaje `prevediOdbijanje` (N9; unit pada na `.rpc(` izvan njega i na nuli).

/** Upute koje AI dobiva pri spajanju (MCP `instructions`). Kvalitetu držimo branama, ne promptom. */
export const UPUTE = [
  'Sokrat Study is a study platform. This connector works ONLY with the signed-in user\'s own study materials.',
  'You can read the user\'s shelves and materials (procitaj_materijale), and you can BUILD a new study material as a DRAFT.',
  'A draft is never live: the user reviews it in Sokrat and decides whether to accept it. You cannot publish.',
  'Before you start, ask the user two things:',
  '  • which shelf the material goes on — call procitaj_materijale to show their existing shelves (use its id as shelf_id), or take a name for a new shelf (new_shelf);',
  '  • how deep it should be — scope: summary (the key points), standard (a full study script) or detailed (exam preparation). Every scope covers the WHOLE source; only the depth differs.',
  'Build a material from the user\'s source (notes, a PDF they shared in the chat) in this order, one lesson at a time:',
  '  1. zapocni_nacrt — name the material, give the shelf and scope, and list its lessons, each with its own colour (#rrggbb).',
  '  2. napisi_learn — for each lesson write the full study text (Learn) first. Everything else is built from it. Learn is the script the user studies from, not a summary: explain every term and idea of the source, at the depth the scope asks for.',
  '  3. dodaj_kartice — flashcards for that lesson: a term or question, and a short explanation (under 200 characters is best).',
  '  4. dodaj_pitanja — quiz questions and fill-in-the-blank sentences built from those flashcards. Every question names its flashcard in "card" (a card_id returned by dodaj_kartice). In a fill-in sentence write each gap as ___ and give one answer per gap, in order.',
  '  5. predaj_nacrt — submit the finished draft. After that it is frozen until the user accepts or discards it. Give the user the review_url it returns: that is where they review and accept the draft.',
  'Cover the WHOLE source, not a sample. Send at most one lesson per call.',
  'If the source ends with a final test or review questions, do not make a separate lesson for them: put each question into the lesson it belongs to, built from that lesson\'s flashcards.',
  'Every writing call takes a repeat_key: if you are unsure whether a call went through, send the SAME call with the SAME repeat_key again — nothing is duplicated. Use a NEW repeat_key for new content.',
  'procitaj_nacrt shows your drafts and what each lesson already has, so you can continue where you stopped.',
  'If a tool returns an error, its "kind" says what to do: ispravi = fix exactly what the message says and call again · ponovno = read the draft again and retry · korisnik = ask the user · stop = do not repeat this call · kvar = temporary failure, try once more.',
  'Reply to the user in the language they write in.'
].join('\n');

export const POSLUZITELJ = { name: 'sokrat-study', version: '0.3.0' } as const;

/** Stupci koje alat čita — izričito, nikad `*` (novi stupac ne smije tiho procuriti AI-ju). */
export const STUPCI_CVORA = 'id,parent_id,kind,name,position,updated_at';

export interface Cvor {
  id: string;
  parent_id: string | null;
  kind: 'folder' | 'study';
  name: string;
  position: number;
  updated_at: string;
}

export interface Stavka {
  id: string;
  vrsta: 'polica' | 'materijal';
  naziv: string;
  djeca?: Stavka[];
}

/** Minimalni oblik supabase-js klijenta koji alat koristi — test ga podmeće. */
export interface CitacCvorova {
  from(tablica: 'nodes'): {
    select(stupci: string): {
      is(stupac: 'deleted_at', vrijednost: null): {
        order(stupac: 'position', opcije: { ascending: boolean }): PromiseLike<{ data: Cvor[] | null; error: { message: string } | null }>;
      };
    };
  };
}

/** Složi ravan popis čvorova u stablo polica → materijala, redom `position`. */
export function slozStablo(cvorovi: Cvor[]): Stavka[] {
  const poRoditelju = new Map<string | null, Cvor[]>();
  for (const c of cvorovi) {
    const k = c.parent_id ?? null;
    if (!poRoditelju.has(k)) poRoditelju.set(k, []);
    poRoditelju.get(k)!.push(c);
  }
  const ids = new Set(cvorovi.map((c) => c.id));
  const grana = (roditelj: string | null, put: Set<string>): Stavka[] =>
    (poRoditelju.get(roditelj) ?? [])
      .slice()
      .sort((a, b) => a.position - b.position)
      .filter((c) => !put.has(c.id))
      .map((c) => {
        const s: Stavka = { id: c.id, vrsta: c.kind === 'folder' ? 'polica' : 'materijal', naziv: c.name };
        if (c.kind === 'folder') s.djeca = grana(c.id, new Set(put).add(c.id));
        return s;
      });
  // Čvor čiji roditelj nije u popisu (roditelj obrisan, dijete nije) ne smije NESTATI iz odgovora:
  // stavi ga u korijen, da AI ne tvrdi korisniku da materijal ne postoji.
  const siroce = cvorovi.filter((c) => c.parent_id !== null && !ids.has(c.parent_id)).map((c) => c.parent_id);
  const korijen = grana(null, new Set());
  for (const p of new Set(siroce)) korijen.push(...grana(p, new Set()));
  return korijen;
}

function brojiMaterijale(stablo: Stavka[]): number {
  return stablo.reduce((n, s) => n + (s.vrsta === 'materijal' ? 1 : 0) + brojiMaterijale(s.djeca ?? []), 0);
}

/** Alat `procitaj_materijale`: vlastite police i materijali prijavljenog korisnika. */
export async function procitajMaterijale(klijent: CitacCvorova): Promise<{ tekst: string; stablo: Stavka[]; materijala: number }> {
  const { data, error } = await klijent.from('nodes').select(STUPCI_CVORA).is('deleted_at', null).order('position', { ascending: true });
  if (error) throw new Error('read_failed: ' + error.message);
  const stablo = slozStablo(data ?? []);
  const materijala = brojiMaterijale(stablo);
  const tekst = stablo.length === 0
    ? 'The user has no shelves or materials yet.'
    : JSON.stringify({ materijala, stablo }, null, 2);
  return { tekst, stablo, materijala };
}

// ─── ②/1b (N9): imenovano odbijanje iz baze → poruka koju AI može ISKORISTITI ─────────────────────
// PostgREST kvotu i „već predan" vraća kao HTTP 500, pa AI ne razlikuje „pokušaj kasnije" od kvara.
// Baza svako odbijanje imenuje (`<ime>: …`); ovdje se ime prevodi u VRSTU (što AI treba učiniti) i
// poruku. Popis se ne pamti: unit ga izvodi iz `f6-nacrt.sql` + validatora i pada na novom imenu
// bez prijevoda ili na mrtvom prijevodu. Nepoznato = „kvar", bez unutarnjih detalja.
export type VrstaOdbijanja = 'ispravi' | 'ponovno' | 'korisnik' | 'stop' | 'kvar';
export const ODBIJANJA: Record<string, { vrsta: VrstaOdbijanja; poruka: string }> = {
  sadrzaj_neispravan: { vrsta: 'ispravi', poruka: 'The content breaks a Sokrat content rule. Fix exactly this and send it again:' },
  nacrt_prevelik: { vrsta: 'ispravi', poruka: 'The draft is larger than 1 MB. Split the material into several drafts.' },
  nacrt_los_oblik: { vrsta: 'ispravi', poruka: 'The draft content must be a JSON object (lessons keyed by id).' },
  nacrt_los_kljuc: { vrsta: 'ispravi', poruka: 'The repeat key is required: 1–100 characters from A-Z a-z 0-9 _ . : -' },
  nacrt_bez_verzije: { vrsta: 'ispravi', poruka: 'Send the draft version you started from (read the draft first).' },
  nacrt_kartica_ne_postoji: { vrsta: 'ispravi', poruka: 'A question points to a flashcard this lesson does not have. Use a card_id returned by dodaj_kartice for THIS lesson.' },
  nacrt_opseg: { vrsta: 'ispravi', poruka: 'The scope must be one of: summary, standard, detailed. Ask the user which one they want.' },
  nacrt_polica: { vrsta: 'ispravi', poruka: 'Give exactly one shelf: shelf_id of an existing shelf (from procitaj_materijale) or new_shelf with a name.' },
  nacrt_polica_ne_postoji: { vrsta: 'ispravi', poruka: 'The user has no shelf with that shelf_id. Call procitaj_materijale and use one of their shelves, or give new_shelf.' },
  nacrt_prazan: { vrsta: 'ispravi', poruka: 'An empty draft cannot be submitted. Write at least one lesson first.' },
  nacrt_sukob: { vrsta: 'ponovno', poruka: 'The draft changed since you read it. Read it again, merge your change, and write with the new version.' },
  nacrt_ne_postoji: { vrsta: 'stop', poruka: 'This draft does not exist (or it expired after 7 days untouched). Start a new draft.' },
  nacrt_predan: { vrsta: 'stop', poruka: 'This draft is already submitted and frozen. The user must accept or discard it; start a new draft for more changes.' },
  nacrt_kvota_u_izradi: { vrsta: 'korisnik', poruka: 'The user already has 3 drafts in progress. Submit one of them before starting another.' },
  nacrt_kvota_nepregledano: { vrsta: 'korisnik', poruka: '10 drafts are waiting for the user\'s review. Ask the user to accept or discard some in Sokrat.' },
  nacrt_samo_ai: { vrsta: 'stop', poruka: 'Drafts can only be written through a connected AI.' },
  nacrt_bez_identiteta: { vrsta: 'stop', poruka: 'The connection has no signed-in user. Ask the user to reconnect Sokrat.' }
};

/** Greška iz supabase-js (`{ message }`) → `{ kod, vrsta, poruka }`. Razlog se zadržava samo za
 *  `sadrzaj_neispravan` (govori o korisnikovom vlastitom sadržaju i AI ga mora znati da ispravi). */
export function prevediOdbijanje(greska: { message?: string } | null | undefined): { kod: string; vrsta: VrstaOdbijanja; poruka: string } {
  const tekst = String((greska && greska.message) || '');
  const kod = (tekst.match(/^([a-z_]+)(?::|$)/) || [])[1] || '';
  const znano = kod ? ODBIJANJA[kod] : undefined;
  if (!znano) return { kod: '', vrsta: 'kvar', poruka: 'Sokrat could not complete this request. Try once more; if it fails again, tell the user.' };
  const razlog = kod === 'sadrzaj_neispravan' ? ' ' + tekst.slice(kod.length + 1).trim().slice(0, 300) : '';
  return { kod, vrsta: znano.vrsta, poruka: znano.poruka + razlog };
}

// ═══ ②/2 ALATI CJEVOVODA (ADR-031: Learn → kartice → pitanja → predaja) ═══════════════════════════
//
// Redoslijed i idempotencija žive OVDJE (ADR-038 ④); oblik, veličina, vlasništvo, kvota i strogi
// profil sadržaja žive u BAZI (`f6-nacrt.sql`, `f6-sadrzaj.sql`) — jer isti token RPC zove i mimo
// ovog poslužitelja (N5). Zato alat nikad ne „pomaže" bazi: što baza odbije, AI dobije prevedeno.
//
// ─── ISTI POZIV DVAPUT = JEDNOM (ključ ponavljanja, N8) ─────────────────────────────────────────
// Svaki alat koji stvara prima `repeat_key`. Nacrt: baza vraća isti nacrt za isti ključ. Kartice i
// pitanja: id svake stavke IZVODI se iz lekcije i ključa (`idIzKljuca`), pa ponovljen poziv PREPIŠE iste
// stavke umjesto da ih doda; ako je rezultat jednak onome što već stoji, upisa uopće nema.
//
// ─── USPOREDNI UPIS (N7) ────────────────────────────────────────────────────────────────────────
// Upis je „pročitaj → izmijeni → upiši s verzijom". Na `nacrt_sukob` alat pročita ponovno i
// ponovi izmjenu (najviše `POKUSAJA` puta) — izmjene su idempotentne, pa je ponavljanje sigurno.

/** Tuđa odbijanja iz ALATA (ne iz baze) — isti oblik kao `ODBIJANJA`, zaseban popis jer ga unit ne
 *  uspoređuje sa SQL-om. Redoslijed cjevovoda je pravilo poslužitelja, ne baze (ADR-038 ④). */
export const ODBIJANJA_ALATA: Record<string, { vrsta: VrstaOdbijanja; poruka: string }> = {
  alat_los_ulaz: { vrsta: 'ispravi', poruka: 'The input does not match this tool. Fix exactly this and call again:' },
  alat_nema_lekcije: { vrsta: 'ispravi', poruka: 'This draft has no lesson with that lesson_id. Use a lesson_id returned by zapocni_nacrt or procitaj_nacrt.' },
  alat_nema_learna: { vrsta: 'ispravi', poruka: 'Write the Learn text of this lesson first (napisi_learn). Flashcards are built from it.' },
  alat_nema_kartica: { vrsta: 'ispravi', poruka: 'Add flashcards to this lesson first (dodaj_kartice). Questions are built from the flashcards.' },
  alat_kartica_ne_postoji: { vrsta: 'ispravi', poruka: 'This lesson has no flashcard with that card id. Use a card_id returned by dodaj_kartice (or procitaj_nacrt) for THIS lesson.' }
};

/** Odbijanje koje alat vraća AI-ju kao rezultat s `isError` (nikad kao 500). */
export class Odbijanje extends Error {
  kod: string;
  vrsta: VrstaOdbijanja;
  constructor(o: { kod: string; vrsta: VrstaOdbijanja; poruka: string }) {
    super(o.poruka);
    this.kod = o.kod || 'kvar';
    this.vrsta = o.vrsta;
  }
}
function odbij(kod: string, dodatak?: string): never {
  const o = ODBIJANJA_ALATA[kod];
  throw new Odbijanje({ kod, vrsta: o.vrsta, poruka: o.poruka + (dodatak ? ' ' + dodatak : '') });
}

/** Pet RPC-ova nacrta — jedini upis koji AI ima (`f6-nacrt.sql` §4; unit ga uspoređuje s grantom). */
export type RpcNacrta = 'mcp_zapocni_nacrt' | 'mcp_upisi_nacrt' | 'mcp_predaj_nacrt' | 'mcp_procitaj_nacrt' | 'mcp_moji_nacrti';

/** Minimalni oblik supabase-js klijenta za alate cjevovoda — test ga podmeće. */
export interface Klijent extends CitacCvorova {
  rpc(ime: RpcNacrta, args?: Record<string, unknown>): PromiseLike<{ data: unknown; error: { message?: string } | null }>;
}

/** JEDINI poziv baze u alatima (N9). Greška baze → prevedeno odbijanje; nikad sirova poruka. */
async function pozovi<T>(klijent: Klijent, ime: RpcNacrta, args: Record<string, unknown>): Promise<T> {
  const { data, error } = await klijent.rpc(ime, args);
  if (error) throw new Odbijanje(prevediOdbijanje(error));
  return data as T;
}

interface Nacrt { id: string; name: string; status: 'u_izradi' | 'predan'; payload: Record<string, Lekcija>; verzija: number; opseg?: Opseg | null }

// ─── ②/4.2 OPSEG (Leon, anketa 30.09.) ──────────────────────────────────────────────────────────
// Tri razine; SVE pokrivaju cijeli izvor (ADR-031), razlika je samo DUBINA. AI vidi engleska imena,
// baza drži svoja (`node_drafts.opseg`). Uputa se vraća uz svaki alat koji piše, jer AI kroz dug
// cjevovod (76 poziva u prvom pokusu) zaboravi što je korisnik tražio na početku.
type Opseg = 'sazeto' | 'standardno' | 'detaljno';
export const OPSEZI: Record<string, { baza: Opseg; uputa: string }> = {
  summary: { baza: 'sazeto', uputa: 'SUMMARY: cover the whole source, but keep Learn short: every key idea in a sentence or two. Flashcards for the core terms only.' },
  standard: { baza: 'standardno', uputa: 'STANDARD: cover the whole source. Learn is a study script, not a summary: explain every term and idea from the source. A flashcard for every term.' },
  detailed: { baza: 'detaljno', uputa: 'DETAILED (exam preparation): cover the whole source. Learn explains every term fully, with examples and the connections between ideas. Flashcards for every term and fact, and more questions.' }
};
/** Opseg nacrta za AI: `{ scope, scope_hint }`, ili ništa za nacrt iz vremena prije opsega. */
function opsegZa(d: { opseg?: Opseg | null }): { scope?: string; scope_hint?: string } {
  const e = Object.entries(OPSEZI).find(([, o]) => o.baza === d.opseg);
  return e ? { scope: e[0], scope_hint: e[1].uputa } : {};
}

// ─── ②/4.2 LINK NATRAG ──────────────────────────────────────────────────────────────────────────
// `predaj_nacrt` vraća adresu na kojoj korisnik pregleda nacrt (nalaz prvog pokusa: upute su
// obećavale „pregledaj u Sokratu", a nitko nije znao gdje). Adresa stranice dolazi iz okoline
// (`SOKRAT_APP_URL`: staging = lokalni poslužitelj, anketa 30.09.); sve što nije http(s) → produkcija.
export interface Okolina { appUrl?: string }
const ZADANA_ADRESA = 'https://www.sokratstudy.com';
export function adresaPregleda(okolina: Okolina | undefined, draftId: string): string {
  let baza = ZADANA_ADRESA;
  try {
    const u = new URL(String((okolina && okolina.appUrl) || ''));
    if (u.protocol === 'https:' || u.protocol === 'http:') baza = (u.origin + u.pathname).replace(/\/+$/, '');
  } catch (e) { /* nije adresa → zadana */ }
  return baza + '/#/materials/nacrt/' + encodeURIComponent(draftId);
}
interface Lekcija {
  name: string; color?: string; icon?: string;
  learn?: { title?: string; blocks?: Record<string, unknown>[] };
  flashcards?: Record<string, unknown>[]; quiz?: Record<string, unknown>[]; fillBlanks?: Record<string, unknown>[];
}

/** Isti sadržaj bez obzira na redoslijed ključeva — `jsonb` ih sprema sortirane po svom. */
function kanon(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(kanon);
  if (v && typeof v === 'object') {
    const o: Record<string, unknown> = {};
    for (const k of Object.keys(v as Record<string, unknown>).sort()) o[k] = kanon((v as Record<string, unknown>)[k]);
    return o;
  }
  return v;
}
const isto = (a: unknown, b: unknown) => JSON.stringify(kanon(a)) === JSON.stringify(kanon(b));

/** 64-bitni FNV-1a (dva 32-bitna prolaza) → base36. Deterministički, bez uvoza (Deno i Node isto). */
function sazetak(s: string): string {
  let a = 0x811c9dc5; let b = 0x01000193 ^ 0x5bd1e995;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    a = Math.imul(a ^ c, 0x01000193) >>> 0;
    b = Math.imul(b ^ c, 0x01000193 + 2) >>> 0;
  }
  return a.toString(36) + b.toString(36);
}
/** Id stavke izveden iz ključa ponavljanja: isti ključ → isti id-evi → ponovljen poziv prepiše, ne doda. */
export const idIzKljuca = (predmetak: string, kljuc: string, i: number) => predmetak + sazetak(kljuc) + '-' + i;

/** Dodaj ili prepiši stavke po id-u, redom kojim su stigle. */
function upisiPoId(postojece: Record<string, unknown>[] | undefined, nove: Record<string, unknown>[]) {
  const van = (postojece || []).slice();
  for (const n of nove) {
    const i = van.findIndex((x) => x && x.id === n.id);
    if (i >= 0) van[i] = n; else van.push(n);
  }
  return van;
}

const POKUSAJA = 3;
/**
 * Pročitaj → izmijeni → upiši s verzijom. `izmjena` dobiva KOPIJU payloada i vraća novi (ili baci
 * `Odbijanje`). Jednak rezultat = bez upisa (ponovljen poziv ne troši verziju). Sukob = ponovi.
 */
async function izmijeni(klijent: Klijent, draftId: string, izmjena: (p: Record<string, Lekcija>) => Record<string, Lekcija>): Promise<Nacrt> {
  for (let pokusaj = 1; ; pokusaj++) {
    const d = await pozovi<Nacrt>(klijent, 'mcp_procitaj_nacrt', { p_id: draftId });
    const novi = izmjena(JSON.parse(JSON.stringify(d.payload || {})));
    if (isto(novi, d.payload || {})) return d;
    try {
      const verzija = await pozovi<number>(klijent, 'mcp_upisi_nacrt', { p_id: draftId, p_payload: novi, p_verzija: d.verzija });
      return Object.assign({}, d, { payload: novi, verzija });
    } catch (e) {
      if (!(e instanceof Odbijanje && e.kod === 'nacrt_sukob') || pokusaj >= POKUSAJA) throw e;
    }
  }
}

function lekcijaIz(p: Record<string, Lekcija>, lessonId: string): Lekcija {
  if (!Object.prototype.hasOwnProperty.call(p, lessonId) || lessonId === 'schemaVersion') odbij('alat_nema_lekcije', 'Unknown: ' + lessonId);
  return p[lessonId];
}

/** Sažetak lekcije za AI: koliko čega ima — da nastavi gdje je stao, bez vraćanja cijelog payloada. */
function sazetakLekcija(p: Record<string, Lekcija>) {
  return Object.keys(p).filter((k) => k !== 'schemaVersion').map((k) => ({
    lesson_id: k, name: p[k].name, color: p[k].color,
    learn_blocks: (p[k].learn && p[k].learn!.blocks || []).length,
    cards: (p[k].flashcards || []).length, quiz: (p[k].quiz || []).length, fill_blanks: (p[k].fillBlanks || []).length
  }));
}

// ─── ulaz: JSON Schema koju AI VIDI je ista ona koju jezgra PROVJERAVA ─────────────────────────────
// SDK dobiva shemu samo za oglas (`index.ts`: validator koji propušta); provjera je ovdje, u Nodeu
// testirana, i vraća imenovano odbijanje umjesto generičke greške SDK-a. Podskup JSON Scheme koji
// alati koriste — ništa više (nepoznata ključna riječ u shemi = pad testa, ne tiho propuštanje).
type Shema = Record<string, unknown>;
const POZNATE = new Set(['type', 'description', 'properties', 'required', 'additionalProperties', 'items', 'minItems',
  'maxItems', 'minLength', 'maxLength', 'pattern', 'minimum', 'maximum', 'enum']);

export function provjeriUlaz(s: Shema, v: unknown, put = 'input'): string | null {
  for (const k of Object.keys(s)) if (!POZNATE.has(k)) return 'schema uses unsupported keyword ' + k;
  const t = s.type as string | undefined;
  if (t === 'object') {
    if (!v || typeof v !== 'object' || Array.isArray(v)) return put + ' must be an object';
    const o = v as Record<string, unknown>; const props = (s.properties || {}) as Record<string, Shema>;
    for (const r of (s.required || []) as string[]) if (o[r] === undefined) return put + '.' + r + ' is required';
    for (const k of Object.keys(o)) {
      if (!props[k]) { if (s.additionalProperties === false) return put + '.' + k + ' is not allowed'; continue; }
      const g = provjeriUlaz(props[k], o[k], put + '.' + k); if (g) return g;
    }
    return null;
  }
  if (t === 'array') {
    if (!Array.isArray(v)) return put + ' must be an array';
    if (typeof s.minItems === 'number' && v.length < s.minItems) return put + ' needs at least ' + s.minItems + ' items';
    if (typeof s.maxItems === 'number' && v.length > s.maxItems) return put + ' allows at most ' + s.maxItems + ' items';
    if (s.items) for (let i = 0; i < v.length; i++) { const g = provjeriUlaz(s.items as Shema, v[i], put + '[' + i + ']'); if (g) return g; }
    return null;
  }
  if (t === 'string') {
    if (typeof v !== 'string') return put + ' must be a string';
    if (typeof s.minLength === 'number' && v.length < s.minLength) return put + ' must not be empty';
    if (typeof s.maxLength === 'number' && v.length > s.maxLength) return put + ' is longer than ' + s.maxLength + ' characters';
    if (typeof s.pattern === 'string' && !new RegExp(s.pattern).test(v)) return put + ' has the wrong format (' + s.pattern + ')';
    if (Array.isArray(s.enum) && !s.enum.includes(v)) return put + ' must be one of: ' + s.enum.join(', ');
    return null;
  }
  if (t === 'integer') {
    if (typeof v !== 'number' || !Number.isInteger(v)) return put + ' must be an integer';
    if (typeof s.minimum === 'number' && v < s.minimum) return put + ' must be at least ' + s.minimum;
    if (typeof s.maximum === 'number' && v > s.maximum) return put + ' must be at most ' + s.maximum;
    return null;
  }
  if (t === 'boolean') return typeof v === 'boolean' ? null : put + ' must be true or false';
  return 'schema without a known type at ' + put;
}

const tekst = (min: number, max: number, opis?: string): Shema => Object.assign({ type: 'string', minLength: min, maxLength: max }, opis ? { description: opis } : {});
const KLJUC: Shema = { type: 'string', pattern: '^[A-Za-z0-9_.:-]{1,100}$',
  description: 'Repeat key: any new value for new content; the SAME value when repeating a call you are unsure about. 1-100 characters A-Z a-z 0-9 _ . : -' };
const DRAFT_ID: Shema = { type: 'string', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', description: 'draft_id from zapocni_nacrt or procitaj_nacrt' };
const LESSON_ID: Shema = { type: 'string', pattern: '^[A-Za-z0-9_-]{1,64}$', description: 'lesson_id from zapocni_nacrt or procitaj_nacrt' };
const objekt = (props: Record<string, Shema>, required: string[], opis?: string): Shema =>
  Object.assign({ type: 'object', properties: props, required, additionalProperties: false }, opis ? { description: opis } : {});

// Granice po pozivu: jedna lekcija, ne cijeli materijal (plan ②/2) — i znatno ispod granica baze.
const KARTICA = objekt({ question: tekst(1, 500, 'Term or question'), answer: tekst(1, 500, 'Short explanation (under 200 characters is best)'),
  explanation: tekst(1, 2000, 'Optional longer detail') }, ['question', 'answer']);
// ②/3: svako pitanje nosi `card` = id kartice iz koje je nastalo (ADR-031: pitanja iz kartica).
const CARD: Shema = { type: 'string', pattern: '^[A-Za-z0-9_-]{1,64}$', description: 'card_id (from dodaj_kartice) of the flashcard this question is built from' };
const KVIZ = objekt({ question: tekst(1, 1000), options: { type: 'array', minItems: 2, maxItems: 6, items: tekst(1, 500) },
  correct: { type: 'integer', minimum: 0, maximum: 5, description: 'Index of the correct option (0-based)' }, card: CARD },
['question', 'options', 'correct', 'card']);
// Oblik dopune = oblik gradiva (D2, `js/fill-blanks.js`): marker `_______`, `answers` = odgovor ZA SVAKU
// prazninu redom, `answer` = prvi. AI piše prazninu kao `___` (3+ podvlaka), alat je svodi na marker.
const DOPUNA = objekt({ sentence: tekst(1, 1000, 'Sentence with each gap written as ___ (three or more underscores)'),
  answers: { type: 'array', minItems: 1, maxItems: 10, items: tekst(1, 200), description: 'The answer for EACH gap, in order (one per gap)' },
  hint: tekst(1, 500), card: CARD }, ['sentence', 'answers', 'card']);
const FILL_MARK = '_______';   // isti marker kao renderer (`js/fill-blanks.js`) i kataloška shema
// ②/3: bez slika i videa u prvom izdanju — samo tekstualni blokovi (plan ②/3).
export const TIPOVI_BLOKA = ['heading', 'paragraph', 'list', 'callout', 'table', 'formula'];
const BLOK: Shema = { type: 'object', required: ['type'], properties: { type: { type: 'string', enum: TIPOVI_BLOKA } },
  description: 'One Learn block. {type:"heading",text,level?:2-4} · {type:"paragraph",text} · ' +
  '{type:"list",items:[text],ordered?} · {type:"callout",text,variant?:"info"|"warning"|"tip",title?} · {type:"table",header?:[text],rows:[[text]]} · ' +
  '{type:"formula",tex,display?}. text = plain string, or an array of runs {text,b?,i?,math?,href?}. No HTML, no images, no video.' };

export interface Alat {
  ime: string; naslov: string; opis: string; ulaz: Shema; samoCitanje: boolean;
  izvedi(klijent: Klijent, a: Record<string, any>, okolina?: Okolina): Promise<unknown>;
}

export const ALATI: Alat[] = [
  {
    ime: 'procitaj_materijale', naslov: 'List my study materials', samoCitanje: true,
    opis: 'Lists the signed-in user\'s own shelves and study materials (names and ids). Read-only.',
    ulaz: objekt({}, []),
    izvedi: async (k) => (await procitajMaterijale(k)).tekst
  },
  {
    ime: 'zapocni_nacrt', naslov: 'Start a draft material', samoCitanje: false,
    opis: 'Step 1. Starts a new DRAFT study material with its lessons (each lesson has a name and its own colour). ' +
      'Give the shelf the user chose (shelf_id of an existing shelf OR new_shelf with a name, exactly one) and the scope. ' +
      'Returns draft_id and a lesson_id for every lesson. Repeating the call with the same repeat_key returns the same draft.',
    ulaz: objekt({ name: tekst(1, 200, 'Name of the material'), repeat_key: KLJUC,
      shelf_id: { type: 'string', pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$', description: 'id of an existing shelf (from procitaj_materijale)' },
      new_shelf: tekst(1, 200, 'Name of a NEW shelf; it is created when the user accepts the draft'),
      scope: { type: 'string', enum: Object.keys(OPSEZI), description: 'How deep: summary · standard · detailed (exam preparation). Ask the user. Every scope covers the whole source.' },
      lessons: { type: 'array', minItems: 1, maxItems: 100, items: objekt({ name: tekst(1, 200),
        color: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$', description: 'Lesson colour as #rrggbb' } }, ['name', 'color']) } },
    ['name', 'repeat_key', 'scope', 'lessons']),
    izvedi: async (k, a) => {
      // Točno jedna polica — shema to ne zna izraziti (podskup bez oneOf), a baza bi odbila tek iza poziva.
      if ((a.shelf_id === undefined) === (a.new_shelf === undefined)) odbij('alat_los_ulaz', 'give exactly one of input.shelf_id or input.new_shelf');
      const id = await pozovi<string>(k, 'mcp_zapocni_nacrt', { p_name: a.name, p_kljuc: a.repeat_key,
        p_polica: a.shelf_id ?? null, p_nova_polica: a.new_shelf ?? null, p_opseg: OPSEZI[a.scope].baza });
      // ②/3: nacrt JEST gradivo — `schemaVersion: 2` (Learn u blokovima) i ikona kakvu Studio daje novoj lekciji.
      const kostur: Record<string, any> = { schemaVersion: 2 };
      (a.lessons as { name: string; color: string }[]).forEach((l, i) => {
        // Prazni nizovi kao nova sekcija u Studiju (`js/studio.js`): lekcija bez sadržaja je i dalje valjano gradivo.
        kostur['l' + (i + 1)] = { name: l.name, icon: 'fa-book', color: l.color.toLowerCase(), flashcards: [], quiz: [], fillBlanks: [] };
      });
      // Nov nacrt je prazan → upiši kostur. Ponovljen početak (isti ključ) zatekne ga već upisanog → ne dira ga.
      const d = await izmijeni(k, id, (p) => Object.keys(p).length === 0 ? kostur : p);
      return Object.assign({ draft_id: d.id, status: d.status, lessons: sazetakLekcija(d.payload) }, opsegZa(d),
        { next: 'Call napisi_learn for each lesson, then dodaj_kartice, then dodaj_pitanja.' });
    }
  },
  {
    ime: 'napisi_learn', naslov: 'Write the Learn text of a lesson', samoCitanje: false,
    opis: 'Step 2. Writes (or replaces) the full study text of ONE lesson as blocks. Write it before flashcards and questions — they are built from it.',
    ulaz: objekt({ draft_id: DRAFT_ID, lesson_id: LESSON_ID, repeat_key: KLJUC, title: tekst(1, 200),
      blocks: { type: 'array', minItems: 1, maxItems: 200, items: BLOK } }, ['draft_id', 'lesson_id', 'repeat_key', 'blocks']),
    izvedi: async (k, a) => {
      const blokovi = (a.blocks as Record<string, unknown>[]).map((b, i) => Object.assign({}, b, { id: idIzKljuca('b', a.lesson_id + '/' + a.repeat_key, i) }));
      const d = await izmijeni(k, a.draft_id, (p) => {
        const l = lekcijaIz(p, a.lesson_id);
        l.learn = Object.assign(a.title ? { title: a.title } : {}, { blocks: blokovi });
        return p;
      });
      return Object.assign({ draft_id: d.id, lesson: sazetakLekcija(d.payload).find((x) => x.lesson_id === a.lesson_id) }, opsegZa(d));
    }
  },
  {
    ime: 'dodaj_kartice', naslov: 'Add flashcards to a lesson', samoCitanje: false,
    opis: 'Step 3. Adds flashcards (term or question → short explanation) to ONE lesson that already has its Learn text. At most 50 per call.',
    ulaz: objekt({ draft_id: DRAFT_ID, lesson_id: LESSON_ID, repeat_key: KLJUC,
      cards: { type: 'array', minItems: 1, maxItems: 50, items: KARTICA } }, ['draft_id', 'lesson_id', 'repeat_key', 'cards']),
    izvedi: async (k, a) => {
      const nove = (a.cards as Record<string, unknown>[]).map((c, i) => Object.assign({ id: idIzKljuca('k', a.lesson_id + '/' + a.repeat_key, i) }, c));
      const d = await izmijeni(k, a.draft_id, (p) => {
        const l = lekcijaIz(p, a.lesson_id);
        if (!l.learn || !(l.learn.blocks || []).length) odbij('alat_nema_learna');
        l.flashcards = upisiPoId(l.flashcards, nove);
        return p;
      });
      return Object.assign({ draft_id: d.id, lesson: sazetakLekcija(d.payload).find((x) => x.lesson_id === a.lesson_id),
        cards: nove.map((c) => ({ card_id: c.id, question: c.question })) }, opsegZa(d));
    }
  },
  {
    ime: 'dodaj_pitanja', naslov: 'Add quiz and fill-in questions to a lesson', samoCitanje: false,
    opis: 'Step 4. Adds quiz questions and/or fill-in-the-blank sentences to ONE lesson that already has flashcards. Build them from the flashcards. At most 50 of each per call.',
    ulaz: objekt({ draft_id: DRAFT_ID, lesson_id: LESSON_ID, repeat_key: KLJUC,
      quiz: { type: 'array', maxItems: 50, items: KVIZ }, fill_blanks: { type: 'array', maxItems: 50, items: DOPUNA } },
    ['draft_id', 'lesson_id', 'repeat_key']),
    izvedi: async (k, a) => {
      const kviz = (a.quiz || []) as { options: string[]; correct: number }[];
      const dopune = (a.fill_blanks || []) as Record<string, unknown>[];
      if (kviz.length + dopune.length === 0) odbij('alat_los_ulaz', 'input needs at least one quiz or fill_blanks item');
      kviz.forEach((q, i) => { if (q.correct >= q.options.length) odbij('alat_los_ulaz', 'input.quiz[' + i + '].correct points past the last option'); });
      const q = kviz.map((x, i) => Object.assign({ id: idIzKljuca('q', a.lesson_id + '/' + a.repeat_key, i) }, x));
      // Dopuna u obliku gradiva (D2): `___` → marker, jedan odgovor po praznini; `answer` = prvi (keširana
      // stara skripta čita samo njega), `answers` tek od dvije praznine — kao u katalogu.
      const f = dopune.map((x, i) => {
        const { sentence, answers, ...ostalo } = x as { sentence: string; answers: string[] } & Record<string, unknown>;
        const s = sentence.replace(/_{3,}/g, FILL_MARK);
        const praznina = s.split(FILL_MARK).length - 1;
        if (praznina === 0) odbij('alat_los_ulaz', 'input.fill_blanks[' + i + '].sentence has no gap — write each gap as ___');
        if (praznina !== answers.length) odbij('alat_los_ulaz', 'input.fill_blanks[' + i + '] has ' + praznina + ' gap(s) but ' + answers.length + ' answer(s) — give exactly one answer per gap, in order');
        return Object.assign({ id: idIzKljuca('f', a.lesson_id + '/' + a.repeat_key, i), sentence: s, answer: answers[0] }, praznina > 1 ? { answers } : {}, ostalo);
      });
      const d = await izmijeni(k, a.draft_id, (p) => {
        const l = lekcijaIz(p, a.lesson_id);
        if (!(l.flashcards || []).length) odbij('alat_nema_kartica');
        const kartice = new Set((l.flashcards || []).map((c) => c.id));
        for (const x of [...q, ...f]) if (!kartice.has(x.card)) odbij('alat_kartica_ne_postoji', 'Unknown: ' + x.card);
        if (q.length) l.quiz = upisiPoId(l.quiz, q);
        if (f.length) l.fillBlanks = upisiPoId(l.fillBlanks, f);
        return p;
      });
      return { draft_id: d.id, lesson: sazetakLekcija(d.payload).find((x) => x.lesson_id === a.lesson_id) };
    }
  },
  {
    ime: 'procitaj_nacrt', naslov: 'Read my drafts', samoCitanje: true,
    opis: 'Without draft_id: lists your drafts. With draft_id: what each lesson already has. With draft_id and lesson_id: the full content of that lesson.',
    ulaz: objekt({ draft_id: DRAFT_ID, lesson_id: LESSON_ID }, []),
    izvedi: async (k, a) => {
      if (!a.draft_id) {
        if (a.lesson_id) odbij('alat_los_ulaz', 'input.lesson_id needs input.draft_id');
        const popis = await pozovi<{ id: string; name: string; status: string; updated_at?: string; velicina: number }[]>(k, 'mcp_moji_nacrti', {});
        return { drafts: (popis || []).map((x) => ({ draft_id: x.id, name: x.name, status: x.status, updated_at: x.updated_at, bytes: x.velicina })) };
      }
      const d = await pozovi<Nacrt>(k, 'mcp_procitaj_nacrt', { p_id: a.draft_id });
      const p = d.payload || {};
      if (a.lesson_id) return { draft_id: d.id, status: d.status, lesson_id: a.lesson_id, lesson: lekcijaIz(p, a.lesson_id) };
      return Object.assign({ draft_id: d.id, name: d.name, status: d.status, lessons: sazetakLekcija(p) }, opsegZa(d));
    }
  },
  {
    ime: 'predaj_nacrt', naslov: 'Submit the draft for review', samoCitanje: false,
    opis: 'Step 5. Submits the finished draft. It is then frozen: the user reviews it in Sokrat and accepts or discards it.',
    ulaz: objekt({ draft_id: DRAFT_ID }, ['draft_id']),
    izvedi: async (k, a, okolina) => {
      const kad = await pozovi<string>(k, 'mcp_predaj_nacrt', { p_id: a.draft_id });
      return { draft_id: a.draft_id, status: 'predan', submitted_at: kad, review_url: adresaPregleda(okolina, a.draft_id),
        next: 'Give the user the review_url: there they review the draft and accept it (or discard it).' };
    }
  }
];

export interface Rezultat { content: { type: 'text'; text: string }[]; isError?: boolean }

/** Izvedi alat po imenu: provjera ulaza → alat → tekst za AI. Svaka greška = rezultat s `isError`,
 *  nikad iznimka prema SDK-u (koji bi je pretvorio u generičku poruku) i nikad unutarnji detalj. */
export async function izvediAlat(ime: string, klijent: Klijent, args: unknown, okolina?: Okolina): Promise<Rezultat> {
  const alat = ALATI.find((a) => a.ime === ime);
  try {
    if (!alat) throw new Odbijanje({ kod: 'alat_los_ulaz', vrsta: 'ispravi', poruka: 'Unknown tool ' + ime });
    const g = provjeriUlaz(alat.ulaz, args === undefined ? {} : args);
    if (g) odbij('alat_los_ulaz', g);
    const r = await alat.izvedi(klijent, (args || {}) as Record<string, unknown>, okolina);
    return { content: [{ type: 'text', text: typeof r === 'string' ? r : JSON.stringify(r, null, 2) }] };
  } catch (e) {
    const o = e instanceof Odbijanje ? e : new Odbijanje(prevediOdbijanje(null));
    return { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: o.kod, kind: o.vrsta, message: o.message }) }] };
  }
}

/** Registriraj SVE alate na MCP poslužitelj. `uShemu` pretvara JSON Schemu u ono što SDK traži
 *  (`index.ts`: `fromJsonSchema`); ovdje se ne uvozi SDK, pa jezgra ostaje testabilna u Nodeu. */
export function registrirajAlate(
  server: { registerTool(ime: string, cfg: Record<string, unknown>, cb: (args: unknown) => Promise<Rezultat>): unknown },
  klijent: Klijent,
  uShemu: (s: Shema) => unknown,
  okolina?: Okolina
): void {
  for (const a of ALATI) {
    server.registerTool(a.ime, {
      title: a.naslov, description: a.opis, inputSchema: uShemu(a.ulaz),
      annotations: a.samoCitanje ? { readOnlyHint: true } : { readOnlyHint: false, destructiveHint: false, idempotentHint: true }
    }, (args) => izvediAlat(a.ime, klijent, args, okolina));
  }
}
