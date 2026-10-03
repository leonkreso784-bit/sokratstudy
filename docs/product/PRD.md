# PRD — Sokrat Study

**Status:** živi dokument · **Verzija PRD-a:** 0.8 · **Zadnja izmjena:** listopad 2026

> ⚠️ **Novi smjer ([ADR-040](../records/DECISIONS.md)):** Sokrat se dovršava (`plan/ZAVRSNICA.md`) i ide u održavanje; Leonov glavni projekt je Xenokrat, zaseban proizvod izvan ovog repozitorija. Faze u §4 iza „MCP" (objava, natjecanje, organizacija, exam, monetizacija) su **zamrznute** osim dijeljenja linkom.

## 1. Vizija
Sokrat Study je platforma na kojoj **svatko gradi vlastiti materijal i iz njega uči** —
kartice, kvizove, dopune i skriptu — pa ga kasnije smije podijeliti i natjecati se.
**To je proizvod.** Javni katalog (predmeti s FMTU Opatija; broj zna `npm run verify`) je **jedan od izvora
gradiva**, dokaz da model radi i način da netko počne bez praznog ekrana — **ali nije ono
što platforma jest** ([ADR-029](../records/DECISIONS.md)).

Ništa u modelu ne pretpostavlja instituciju, smjer ni godinu: FMTU je odskočna daska,
ne opseg. Korisnik je **bilo tko** — student bilo kojeg fakulteta, srednjoškolac, samouk.

## 2. Korisnici
- **Student (primarni):** uči za kolokvije/ispite; želi brzo, mobilno, besplatno.
- **Admin/autor (ja, Leon):** dodaje predmete i sadržaj, održava kvalitetu.
- **Korisnik-autor:** gradi **vlastiti privatni materijal** — ručno u editoru; kasnije i preko
  vlastitog AI-a (MCP, ADR-026). **Bilo tko**, ne nužno student FMTU-a.
- **Organizacija** (firma · fakultet · škola): ima **svoj odjeljak** — vlastito gradivo, članove,
  uloge (voditelj vs polaznik) i statistiku ograničenu na sebe. **Prvi platiša** ([ADR-036](../records/DECISIONS.md));
  firma kupuje onboarding i **zapis o položenom**, ustanova gradivo kolegija i rano upozorenje
  tko zaostaje. ⚠️ Ovo **nije** osobni otok iz ADR-024 — v. [MONETIZATION §5](./MONETIZATION.md).
- **(kasnije) Pretplatnik:** plaća premium funkcionalnosti.

## 3. Što platforma danas radi

> **Ovdje NEMA kronologije ni brojeva verzija** — to je posao [records/HISTORY.md](../records/HISTORY.md) i
> [records/CHANGELOG.md](../records/CHANGELOG.md). Ovaj dokument opisuje **proizvod**, ne put do njega.
> Stanje pojedinih predmeta: [subjects/README.md](../subjects/README.md).

- **Vlastito gradivo (glavna površina)** — prijavljen korisnik slaže **vlastito ugniježđeno stablo polica**
  i u materijalu gradi kartice, kviz, dopune i learn; **uči iz njega istim ekranima** kao iz kataloga, a
  napredak mu živi u istom profilu. Privatno, bez objave na javni katalog. Definicija i kriteriji
  prihvaćanja: [UGC_SPEC.md](./UGC_SPEC.md).
- **Učenje iz javnog kataloga** — hijerarhija fakultet → smjer → godina → semestar → predmet → lekcija;
  modovi **Learn · Flashcards · Quiz · Fill · Exercises · Progress**, KaTeX za kvantitativne predmete.
- **Račun i napredak** — prijava e-mailom, napredak se sinkronizira između uređaja, profil + GDPR.
- **Autorstvo javnog sadržaja** — Studio editor za administratore; svaka objava je atomična i verzionirana.
- **Radi bez mreže** (Service Worker), dvojezično sučelje HR/EN.

> ⚠️ **Što osobni materijal NE nudi:** **vježbe.** Vježba je kôd (`generate()`), a UGC ne autorira kôd —
> tražit će vlastito rješenje i vlastiti spec (ADR-025). **U sučelju se zato ništa o njima ne obećava.**
> Ostali ne-ciljevi (dijeljenje, MCP, mobilni editor na dodir): [UGC_SPEC §4](./UGC_SPEC.md).

## 4. Opseg po fazama

> **Faza ima ime, ne slovo.** Ranija „F" numeriranja (temelj F1–F6, graditelj F0–F5) su **zatvorena**
> i žive samo kao povijest u [archive/](../archive/) i [plan/ROADMAP.md](../plan/ROADMAP.md).

| faza | opseg | status |
|---|---|---|
| **Temelj** | data-driven katalog, hijerarhijska navigacija, Supabase read-path (anon+RLS, ADR-011), CI/CD, offline, monitoring | ✅ |
| **Javni katalog + autorstvo** | sadržaj svih predmeta kataloga, Studio editor za administratore, atomična i verzionirana objava | ✅ |
| **Osobni materijal** | vlastito stablo polica, autorstvo kartica/kviza/dopuna/learna, učenje iz vlastitog materijala, napredak u istom profilu | ✅ — svih 5 kriterija iz [UGC_SPEC.md](./UGC_SPEC.md) |
| **Frontend redizajn** | sučelje se preuređuje **tek kad funkcija besprijekorno radi** (Leonova presuda); vlastiti materijal dobiva **ravnopravno odredište** — stranicu i ulaz u navigaciji, a ne pododjeljak profila (ADR-029) | 🟦 |
| **MCP — AI gradi gradivo** | korisnikov vlastiti AI stvara i mijenja **isključivo njegovo** gradivo; editor postaje alat za **doradu**, ne ishodište ([ADR-030](../records/DECISIONS.md)). **Gotovo kad korisnik iz svog AI-a napravi materijal i odmah iz njega uči, bez otvaranja editora.** ➕ [ADR-031](../records/DECISIONS.md) (2026-08-30) daje mu oblik: **cjevovod** `Learn → kartice → dopune/kviz`, sve u **nacrt**, doseg **samo vlastito gradivo**. ⚠️ Pristup je presuđen — konektor koji korisnik doda jednom (OAuth); seoba je OTKAZANA (2026-09-01) pa OAuth čeka samo **RAČUN blok** (`BACKLOG.md` §RAČUN) | ⬜ |
| **Objava i dijeljenje** | materijal se smije podijeliti — **link s tajnim tokenom, bez javne biblioteke** | ⬜ |
| **Natjecanje + društveno** | ljestvice, profili, statistika učenja, anti-cheat | ⬜ |
| **Organizacija (najam)** | firma/ustanova dobiva **svoj odjeljak**: članovi, uloge, gradivo u vlasništvu organizacije, statistika u dosegu organizacije ([ADR-036](../records/DECISIONS.md)). **Gotovo kad vlasnik firme doda zaposlenika, dodijeli mu gradivo i vidi njegov napredak — a taj zaposlenik ne vidi ništa izvan svoje organizacije.** | ⬜ |
| **Exam modul** | platforma se zaključa u ispit: bez navigacije, jedan pokušaj, sat teče; **vrijeme i ocjena se računaju na poslužitelju**. **Gotovo kad voditelj pošalje ispit, polaznik ga riješi pod satom, a voditelj dobije zapis s imenom, rezultatom, datumom i trajanjem koji smije ispisati.** ⚠️ Granica se kaže kupcu: preglednik ne sprječava drugi uređaj | ⬜ |
| **Monetizacija** | naplaćuje se **funkcionalnost i pristup organizacije, nikad tuđe gradivo**; redoslijed i paketi: [MONETIZATION.md](./MONETIZATION.md) | ⬜ |

⚠️ **Raniji opis „UGC MVP = korisnik uploada PDF/PPT → AI radi skriptu" je nadglašen.** Izgrađeno je
**ručno autorstvo** u vlastitom stablu; AI dolazi kasnije i to kroz **korisnikov vlastiti** AI (MCP),
ne kroz našu cijev — pa ni kvote troška nisu na nama.

## 5. Funkcionalni zahtjevi (Faza 0)
- F0-1: Katalog kao jedinstveni izvor istine za predmete/hijerarhiju.
- F0-2: Postojeći UI radi identično nakon migracije na katalog.
- F0-3: Sadržaj predmeta se učitava lijeno (lazy), ne sve odjednom.
- F0-4: Backend (Supabase) drži katalog + sadržaj; admin može uređivati.
- F0-5: Navigacija prikazuje hijerarhiju smjer/godina/semestar.

## 6. Ne-funkcionalni zahtjevi
- Mobile-first, radi offline za objavljene predmete (PWA).
- Prvo učitavanje brzo i na slabom mobitelu (kritično za skaliranje na 100+ predmeta).
- Trošak blizu nule dok je publika mala.

## 7. Ne-ciljevi (zasad)
- **Nema uploada dokumenata** (PDF/PPT) ni AI-generiranja sadržaja s naše strane — korisnik svoj
  materijal piše sam, a kasnije ga smije graditi **svojim** AI-em (MCP). Upload slika u osobnom
  materijalu postoji i **privatan je** (bucket `node-images`, owner-prefiks).
- ~~Nema naplate dok platforma ne dobije skalu.~~ **Nadglašeno ([ADR-036](../records/DECISIONS.md)):** naplata kreće od
  **organizacija prije skale** (firma odlučuje u jednom razgovoru), dok potrošačka naplata i dalje
  čeka masu. **Objava se ne naplaćuje nikad**, ni brojem ni veličinom.
- **Nema javne biblioteke osobnog materijala** — materijal je privatan; po [ADR-040](../records/DECISIONS.md) smije se **podijeliti linkom s tajnim tokenom** (faza DIJELJENJE u [plan/ZAVRSNICA.md](../plan/ZAVRSNICA.md)). Javna objava, prodaja i natjecanje su **zamrznuti** (ADR-035).
- Nema složenih uloga: postoje **vlasnik podatka** (`owner_id = auth.uid()`) i **administrator**
  javnog kataloga (`profiles.role` + `is_admin()`). Sadržajni suradnik radi kroz PR, ne kroz aplikaciju.

## 8. Mjere uspjeha
- **Pronalažljivost (ADR-029):** korisnik koji prvi put dođe **vidi put do vlastitog materijala bez
  objašnjenja i bez ulaska u profil**. Dok se do njega dolazi skrolanjem kroz postavke, ono nije proizvod.
- **Osobni materijal:** korisnik bez pomoći autora napravi materijal od nule i uči iz njega
  (mjeri se po [UGC_SPEC §2](./UGC_SPEC.md), ne po zelenim testovima).
- **Dugoročno:** ~1000 MAU; katalog prestaje biti uvjet rasta jer korisnik donosi svoj sadržaj.

## 9. Rizici (vidi i ARCHITECTURE/DECISIONS)
- AI trošak kad ga vode korisnici → kvote, "donesi svoj API ključ".
- Moderacija UGC-a i autorska prava na profesorske materijale.
- Anti-cheat na natjecanju.
