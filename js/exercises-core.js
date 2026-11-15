// ===== SOKRAT STUDY — EXERCISES CORE (čiste funkcije, bez DOM-a) =====
//
// JEZGRA Exercises enginea: parsiranje i usporedba brojeva + multiset ocjenjivanje.
// NEMA DOM-a, NEMA domenskih (engl./hr) stringova → 100% node-testabilno i reusable.
// Sadržaj (tekstovi, računi, jezik) NIKAD nije ovdje — to ide u data/<subject>/exercises.js.
//
// Izvozi se i na `window.ExercisesCore` (browser, koristi ga js/exercises.js) i preko
// `module.exports` (node testovi: tests/unit/exercises-core.test.js).
//
// Konvencije (vidi docs/architecture/EXERCISES_ENGINE.md §3): u DATA su iznosi čisti Number; korisnički
// unos se normalizira preko parseAmount; novac se uspoređuje na razini centi; nikad == na float.

(function (root) {
    'use strict';

    // --- Zaokruživanje na cente (interna pomoćna) ----------------------------
    // Vrati iznos u cijelim centima (Number). Mali ε prema predznaku rješava
    // klasičan float-rub (npr. 1.005 * 100 = 100.4999…) deterministički.
    function toCents(x) {
        if (!Number.isFinite(x)) return NaN;
        const sign = x < 0 ? -1 : 1;
        return Math.round(Math.abs(x) * 100 + 1e-6) * sign;
    }

    // --- parseAmount(input) → Number | NaN -----------------------------------
    // Normalizira korisnički unos iznosa. Podržava:
    //   "120000" "120,000" "120.000" → 120000        (grupiranje tisuća: . , ili razmak)
    //   "63.60" "63,60"               → 63.6          (jedan decimalni separator)
    //   "1,234.56" "1.234,56"         → 1234.56       (US i EU mješavina)
    //   "$120,000.00" " 120 000,50 "  → 120000 / 120000.5  (valuta/razmaci se ignoriraju)
    //   "(50)" "-50"                  → -50           (zagrade = negativno, računovodstvo)
    //   "" "abc"                      → NaN
    //
    // Pravilo razrješenja dvosmislenosti (jedan separator, 3 znamenke iza = grupiranje;
    // ako su prisutna OBA separatora, ZADNJI je decimalni). Vidi testove za rubne slučajeve.
    function parseAmount(input) {
        if (typeof input === 'number') return Number.isFinite(input) ? input : NaN;
        if (input == null) return NaN;
        let s = String(input).trim();
        if (s === '') return NaN;

        s = s.replace(/[\u2212\u2012-\u2015]/g, '-'); // unicode minus i crtice → '-'
        s = s.replace(/\s/g, ''); // razmaci (i tanki/non-break) = grupiranje → makni

        // Predznak: vodeći +/- ili računovodstvene zagrade (50) = -50
        let neg = false;
        if (/^\(.*\)$/.test(s)) { neg = true; s = s.slice(1, -1); }
        if (s[0] === '-') { neg = !neg; s = s.slice(1); }
        else if (s[0] === '+') { s = s.slice(1); }

        s = s.replace(/[^0-9.,]/g, ''); // makni valutu/slova; ostaju znamenke + . ,
        if (s === '') return NaN;

        const lastDot = s.lastIndexOf('.');
        const lastComma = s.lastIndexOf(',');
        let decimalPos = -1;

        if (lastDot !== -1 && lastComma !== -1) {
            // Oba prisutna → zadnji separator je decimalni, drugi je grupiranje.
            decimalPos = Math.max(lastDot, lastComma);
        } else if (lastDot !== -1 || lastComma !== -1) {
            const ch = lastDot !== -1 ? '.' : ',';
            const pos = lastDot !== -1 ? lastDot : lastComma;
            const occurrences = s.split(ch).length - 1;
            const trailing = s.length - pos - 1;
            // Jedan separator s točno 3 znamenke iza = grupiranje tisuća (npr. "120,000").
            // Inače (≠3 znamenke iza) = decimalni. Više od jednog = grupiranje.
            // IZNIMKA: dio prije separatora prazan ili same nule ("0.576", ".025") → decimalni
            //   i kad ima 3 znamenke iza — grupirani broj nikad ne počinje nula-grupom
            //   (generičko, unatrag-kompatibilno; npr. "120.000" ostaje 120000). Vidi stat-parse.test.js.
            if (occurrences === 1 && (trailing !== 3 || /^0*$/.test(s.slice(0, pos)))) decimalPos = pos;
        }

        let intPart = decimalPos === -1 ? s : s.slice(0, decimalPos);
        let fracPart = decimalPos === -1 ? '' : s.slice(decimalPos + 1);
        intPart = intPart.replace(/[.,]/g, '');
        fracPart = fracPart.replace(/[.,]/g, '');
        if (intPart === '' && fracPart === '') return NaN;

        const num = Number((intPart || '0') + (fracPart ? '.' + fracPart : ''));
        if (!Number.isFinite(num)) return NaN;
        return neg ? -num : num;
    }

    // --- formatAmount(n, opts) → string --------------------------------------
    // Prikaz iznosa (rješenja, hintovi). Default: 2 decimale + grupiranje tisuća.
    // opts: { decimals=2, currency='', groupSep=',', decimalSep='.' } — jezik prikaza
    // (npr. EU: groupSep:'.', decimalSep:',') dolazi iz content packa, ne hardkodirano.
    function formatAmount(n, opts) {
        if (!Number.isFinite(n)) return '';
        opts = opts || {};
        const decimals = opts.decimals != null ? opts.decimals : 2;
        const groupSep = opts.groupSep != null ? opts.groupSep : ',';
        const decimalSep = opts.decimalSep != null ? opts.decimalSep : '.';
        const currency = opts.currency || '';

        const neg = n < 0;
        const fixed = Math.abs(n).toFixed(decimals);
        const parts = fixed.split('.');
        let intStr = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSep);
        let out = intStr + (parts[1] ? decimalSep + parts[1] : '');
        if (currency) out = currency + out;
        return (neg ? '-' : '') + out;
    }

    // --- numEq(a, b, tol) → bool ---------------------------------------------
    // Apsolutna tolerancija (default 0.005). Za omjere/postotke `tol` dolazi po polju.
    // `a` smije biti string (parsira se) ili Number; `b` je očekivani Number.
    function numEq(a, b, tol) {
        if (tol == null) tol = 0.005;
        const x = typeof a === 'number' ? a : parseAmount(a);
        return Number.isFinite(x) && Number.isFinite(b) && Math.abs(x - b) <= tol + 1e-9;
    }

    // --- numEqMoney(a, b) → bool ---------------------------------------------
    // Usporedba novca na razini centi (zaokruži oba pa usporedi cijele cente).
    function numEqMoney(a, b) {
        const x = typeof a === 'number' ? a : parseAmount(a);
        if (!Number.isFinite(x) || !Number.isFinite(b)) return false;
        return toCents(x) === toCents(b);
    }

    // --- canonicalKey(value) → string (interna; za multiset usporedbu) -------
    // Stabilan ključ neovisan o redoslijedu polja, velikim/malim slovima, razmacima
    // i float-reprezentaciji novca (brojevi → cente). Objekti se sortiraju po ključu.
    function canonicalKey(value) {
        if (value === null || value === undefined) return '∅';
        const t = typeof value;
        if (t === 'number') return 'n:' + (Number.isFinite(value) ? toCents(value) : 'NaN');
        if (t === 'boolean') return 'b:' + value;
        if (t === 'string') return 's:' + value.trim().toLowerCase().replace(/\s+/g, ' ');
        if (Array.isArray(value)) return '[' + value.map(canonicalKey).join(',') + ']';
        const keys = Object.keys(value).sort();
        return '{' + keys.map((k) => k + '=' + canonicalKey(value[k])).join('|') + '}';
    }

    // --- gradeSet(expected[], got[], keyFn?) → rezultat ----------------------
    // Redoslijed-neovisna (multiset) usporedba dvije liste stavki — za knjiženje
    // (debit/credit linije) i klasifikaciju. Vraća koliko se stavki poklapa.
    //   { score, max, correct, missing, extra }
    // - score   = broj poklopljenih stavki (min count po ključu)
    // - max     = expected.length
    // - correct = sve točno I bez viška (got se poklapa s expected kao multiset)
    // - missing = neunesene očekivane stavke
    // - extra   = suvišne (pogrešne/dodatne) unesene stavke
    function gradeSet(expected, got, keyFn) {
        const key = keyFn || canonicalKey;
        expected = Array.isArray(expected) ? expected : [];
        got = Array.isArray(got) ? got : [];

        const expCount = new Map();
        expected.forEach((e) => { const k = key(e); expCount.set(k, (expCount.get(k) || 0) + 1); });
        const gotCount = new Map();
        got.forEach((g) => { const k = key(g); gotCount.set(k, (gotCount.get(k) || 0) + 1); });

        let matched = 0;
        expCount.forEach((c, k) => { matched += Math.min(c, gotCount.get(k) || 0); });

        return {
            score: matched,
            max: expected.length,
            correct: matched === expected.length && got.length === expected.length,
            missing: Math.max(0, expected.length - matched),
            extra: Math.max(0, got.length - matched)
        };
    }

    // --- seededRandom(seed) → fn() ∈ [0,1) ----------------------------------
    // Deterministički PRNG (mulberry32). Isti seed ⇒ isti niz brojeva. Koristi se za
    // parametrizirane vježbe (gumb "New numbers" daje novi seed; rješenje je reproducibilno).
    function seededRandom(seed) {
        let a = (seed >>> 0) || 1;
        return function () {
            a = (a + 0x6D2B79F5) | 0;
            let t = Math.imul(a ^ (a >>> 15), 1 | a);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // --- pickParams(spec, seed) → { key: value } -----------------------------
    // Deterministički odabir konkretnih parametara iz spec-a (za randomizirane vježbe).
    // Spec po ključu:
    //   { min, max, step? }   → broj iz raspona (step default 1; decimalni step podržan)
    //   { choices: [...] }     → jedan element iz liste
    //   literal (number/...)   → fiksna vrijednost (passthrough)
    // Redoslijed ključeva = redoslijed izvlačenja → isti seed daje identičan rezultat.
    function pickParams(spec, seed) {
        const out = {};
        if (!spec || typeof spec !== 'object') return out;
        const rnd = seededRandom(seed == null ? 1 : seed);
        Object.keys(spec).forEach((key) => {
            const d = spec[key];
            if (d != null && Array.isArray(d.choices)) {
                const i = Math.floor(rnd() * d.choices.length);
                out[key] = d.choices[Math.min(i, d.choices.length - 1)];
            } else if (d != null && typeof d.min === 'number' && typeof d.max === 'number') {
                const step = d.step != null ? d.step : 1;
                const steps = Math.floor((d.max - d.min) / step + 1e-9);
                const k = Math.floor(rnd() * (steps + 1));
                let v = d.min + k * step;
                if (!Number.isInteger(step)) v = Math.round(v * 1e6) / 1e6;
                out[key] = Math.min(v, d.max);
            } else {
                out[key] = d; // literal / fiksna vrijednost
            }
        });
        return out;
    }

    // ========================================================================
    // TYPE GRADERS — čiste funkcije po tipu vježbe (node-testabilne, bez DOM-a).
    // DOM sloj (js/exercises.js) samo SKUPLJA unos i poziva ovo. Svaki vraća
    // jednoličan oblik: { score, max, perField:[{…, ok, expected, got}], correct }.
    // ========================================================================

    // --- gradeChoice(ex, answers) -------------------------------------------
    // ex.items: [{ q, kind:'tf'|'mc', options?, answer }]
    // answers:  [ <bool za tf> | <index za mc> | null ]  (po stavci, isti redoslijed)
    function gradeChoice(ex, answers) {
        const items = (ex && Array.isArray(ex.items)) ? ex.items : [];
        answers = Array.isArray(answers) ? answers : [];
        const perField = items.map((item, i) => {
            const got = answers[i] === undefined ? null : answers[i];
            const ok = got !== null && got === item.answer; // tf: bool===bool; mc: idx===idx
            return { index: i, ok: !!ok, expected: item.answer, got: got };
        });
        const score = perField.filter((f) => f.ok).length;
        return { score: score, max: items.length, perField: perField, correct: items.length > 0 && score === items.length };
    }

    // Jedan separator + točno 3 znamenke iza (npr. "1.667", "2,500") → alternativno decimalno čitanje; inače null.
    function decimalReading(raw) {
        if (typeof raw !== 'string') return null;
        const m = /^\s*([-+\u2212\u2012-\u2015]?)\s*(\d{1,3})[.,](\d{3})\s*$/.exec(raw);
        if (!m) return null;
        const n = Number(m[2] + '.' + m[3]);
        return m[1] && m[1] !== '+' ? -n : n;
    }

    // --- gradeNumeric(ex, answers) ------------------------------------------
    // ex.fields: [{ key, label, answer, tol?, unit?, hint? }]
    // answers:   { <key>: <raw string ili Number> }  → parsira se preko parseAmount
    function gradeNumeric(ex, answers) {
        const fields = (ex && Array.isArray(ex.fields)) ? ex.fields : [];
        answers = answers || {};
        const perField = fields.map((f) => {
            const got = parseAmount(answers[f.key]);
            const tol = f.tol != null ? f.tol : 0.005;
            let ok = numEq(got, f.answer, tol);
            // "1.667" parseAmount čita kao tisuće (1667); ako je dvosmisleno, probaj i decimalno čitanje.
            if (!ok) {
                const alt = decimalReading(answers[f.key]);
                if (alt != null) ok = numEq(alt, f.answer, tol);
            }
            return { key: f.key, ok: ok, expected: f.answer, got: Number.isFinite(got) ? got : null };
        });
        const score = perField.filter((p) => p.ok).length;
        return { score: score, max: fields.length, perField: perField, correct: fields.length > 0 && score === fields.length };
    }

    // --- statementCells(ex) → [{key,label,answer,isTotal?,derived?,section?}] -
    // Pljosnati popis svih ćelija (linije po sekcijama + totali) s STABILNIM ključem.
    // Dijele ga grader I widget (render/collect) → nula drifta. Ključ: line.key/total.key
    // (eksplicitan u podacima) uz indeksni fallback.
    function statementCells(ex) {
        const cells = [];
        const sections = (ex && Array.isArray(ex.sections)) ? ex.sections : [];
        sections.forEach((sec, si) => {
            (sec.lines || []).forEach((line, li) => {
                cells.push({
                    key: line.key || ('s' + si + '-l' + li),
                    label: line.label, answer: line.answer,
                    section: sec.key || ('s' + si)
                });
            });
        });
        const totals = (ex && Array.isArray(ex.totals)) ? ex.totals : [];
        totals.forEach((t, ti) => {
            cells.push({ key: t.key || ('t' + ti), label: t.label, answer: t.answer, isTotal: true, derived: !!t.derived });
        });
        return cells;
    }

    // --- gradeStatement(ex, answers) ----------------------------------------
    // Ocjenjuje svaku liniju i total kao novac (numEqMoney). answers: { <key>: raw }.
    function gradeStatement(ex, answers) {
        answers = answers || {};
        const cells = statementCells(ex);
        const perField = cells.map((c) => {
            const got = parseAmount(answers[c.key]);
            const ok = numEqMoney(got, c.answer);
            return { key: c.key, ok: ok, expected: c.answer, got: Number.isFinite(got) ? got : null };
        });
        const score = perField.filter((p) => p.ok).length;
        return { score: score, max: cells.length, perField: perField, correct: cells.length > 0 && score === cells.length };
    }

    // --- gradeClassify(ex, answers) -----------------------------------------
    // ex.rows: [{ text, entries:[{account, cls, effect}] }]  (račun je ZADAN u slotu)
    // answers: [ [ {cls, effect}, … ] ]  (po retku, po slotu; account se ne unosi)
    // Per-slot: točno ako su I klasa I efekt točni. (gradeSet/redoslijed-neovisno = journal.)
    function gradeClassify(ex, answers) {
        const rows = (ex && Array.isArray(ex.rows)) ? ex.rows : [];
        // Effect dropdown je OPCIONALAN: ako ex.effects nije zadan, ocjenjuje se samo klasa
        // (jednoosna klasifikacija, npr. račun → bilančna kategorija).
        const hasEffects = !!(ex && Array.isArray(ex.effects) && ex.effects.length > 0);
        answers = Array.isArray(answers) ? answers : [];
        const perField = [];
        rows.forEach((row, ri) => {
            const ansRow = Array.isArray(answers[ri]) ? answers[ri] : [];
            (row.entries || []).forEach((entry, ei) => {
                const got = ansRow[ei] || {};
                const gotCls = got.cls != null ? got.cls : null;
                const gotEff = got.effect != null ? got.effect : null;
                const ok = gotCls === entry.cls && (!hasEffects || gotEff === entry.effect);
                perField.push({
                    key: ri + '-' + ei, row: ri, entry: ei, ok: ok,
                    expected: { cls: entry.cls, effect: entry.effect },
                    got: { cls: gotCls, effect: gotEff },
                    account: entry.account
                });
            });
        });
        const score = perField.filter((p) => p.ok).length;
        return { score: score, max: perField.length, perField: perField, correct: perField.length > 0 && score === perField.length };
    }

    // --- gradeJournal(ex, answers) ------------------------------------------
    // ex.transactions: [{ text, entries:[{account, side:'D'|'C', amount}] }]
    // answers:         [ [ {account, side, amount(raw)}, … ] ]  (po transakciji, po liniji)
    // Po transakciji: multiset poklapanje stavki (gradeSet, redoslijed-neovisno) + balance
    // (Σdebit=Σcredit). Točno = točan skup stavki za svaku transakciju.
    function sumBySide(entries, side) {
        return (entries || []).reduce((a, e) =>
            a + (e && e.side === side && Number.isFinite(e.amount) ? e.amount : 0), 0);
    }
    function gradeJournal(ex, answers) {
        const trans = (ex && Array.isArray(ex.transactions)) ? ex.transactions : [];
        answers = Array.isArray(answers) ? answers : [];
        const perField = trans.map((t, i) => {
            const raw = Array.isArray(answers[i]) ? answers[i] : [];
            const got = raw.map((g) => ({ account: g.account, side: g.side, amount: parseAmount(g.amount) }));
            const setRes = gradeSet(t.entries || [], got);
            const sumD = sumBySide(got, 'D');
            const sumC = sumBySide(got, 'C');
            const balanced = sumD > 0 && toCents(sumD) === toCents(sumC);
            return {
                index: i, ok: setRes.correct, balanced: balanced,
                setScore: setRes.score, setMax: setRes.max,
                debits: round2c(sumD), credits: round2c(sumC)
            };
        });
        const score = perField.filter((p) => p.ok).length;
        return { score: score, max: trans.length, perField: perField, correct: trans.length > 0 && score === trans.length };
    }
    function round2c(x) { return Number.isFinite(x) ? toCents(x) / 100 : 0; }

    // --- normalizeCite(s) ----------------------------------------------------
    // "Pametno-tolerantna" normalizacija upisanog citata (npr. Chicago):
    //   • mala slova (case-insensitive)            • kose navodnike “ ” ‘ ’ → ravne " '
    //   • en/em crticu – — → minus -               • razmake (i tabove/nove redove) → jedan razmak
    //   • makni POČETNE/ZAVRŠNE razmake i ZAVRŠNU točku/točke
    // ZADRŽAVA unutarnju interpunkciju (zarezi, dvotočke, unutarnje točke, redoslijed) —
    // ona je bit ispravnog formata i MORA se poklapati. Čista funkcija (node-testabilna).
    function normalizeCite(s) {
        if (s == null) return '';
        let t = String(s);
        if (t.normalize) t = t.normalize('NFC');
        t = t
            .replace(/[“”„‟″]/g, '"')   // “ ” „ ‟ ″ → "
            .replace(/[‘’‚‛′]/g, "'")   // ‘ ’ ‚ ‛ ′ → '
            .replace(/[‐-―−]/g, '-')              // ‐ ‑ ‒ – — ― − → -
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase()
            .replace(/[.\s]+$/, '');                             // završna točka/razmaci nebitni
        return t;
    }

    // --- gradeCite(ex, answers) ---------------------------------------------
    // ex.items: [{ given, answer, accept?:[…alt točni oblici…], hint? }]
    // answers:  [ <upisani string po stavci, isti redoslijed> ]
    // Točno = normalizeCite(upis) === normalizeCite(answer) ILI jednako nekom accept[].
    function gradeCite(ex, answers) {
        const items = (ex && Array.isArray(ex.items)) ? ex.items : [];
        answers = Array.isArray(answers) ? answers : [];
        const perField = items.map((item, i) => {
            const got = answers[i] == null ? '' : String(answers[i]);
            const gotN = normalizeCite(got);
            const accepted = [item.answer].concat(Array.isArray(item.accept) ? item.accept : []);
            const ok = gotN.length > 0 && accepted.some((a) => normalizeCite(a) === gotN);
            return { index: i, ok: !!ok, expected: item.answer, got: got };
        });
        const score = perField.filter((f) => f.ok).length;
        return { score: score, max: items.length, perField: perField, correct: items.length > 0 && score === items.length };
    }

    const ExercisesCore = {
        parseAmount,
        formatAmount,
        numEq,
        numEqMoney,
        gradeSet,
        canonicalKey,
        toCents,
        seededRandom,
        pickParams,
        gradeChoice,
        gradeNumeric,
        statementCells,
        gradeStatement,
        gradeClassify,
        gradeJournal,
        normalizeCite,
        gradeCite,
        sumBySide
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = ExercisesCore;
    if (root) root.ExercisesCore = ExercisesCore;
})(typeof window !== 'undefined' ? window : null);
