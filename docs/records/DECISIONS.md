# Arhitektonske odluke (ADR)

Svaka značajna odluka: kontekst → odluka → posljedice. Najnovija na vrhu.

---

## ADR-039 — Materijal od AI-ja ide na policu SAM, cijel, bez ekrana za pregled; izmjene na korisnikovu riječ
**Datum:** 2026-10-01 · **Status:** ✅ ODLUČENO (Leon, anketa) · **Vezano:** mijenja [ADR-031](#adr-031) („sve ide u nacrt,
korisnik prihvaća") i [ADR-038](#adr-038) t.1 („materijal nastaje tek korisnikovim Prihvati iz obične sesije") ·
smjer [ADR-035](#adr-035) · **Faza:** F6 ②/4 u [plan/MCP.md](../plan/MCP.md)

**Kontekst.** Prvi pravi pokus s ②/4.2 (01.10., „Kemija 3. razred", 12 lekcija / 194 kartice, ~7 min): Claude je javio
„gotovo", a na polici nije bilo ničega — nacrt čeka ekran za Prihvati (②/4.3). Leon: ekran ne treba. Pregled je
trebao zaustaviti loš sadržaj prije nego ga itko vidi, a osobni materijal je **privatan** — vidi ga samo vlasnik, javna
objava je zasebna buduća faza. Najgori ishod je loš materijal u vlastitoj polici, koji se briše jednim klikom.

**Odluke (Leon, 2026-10-01):**
1. **Nov materijal ide na policu sam, ali CIJEL, na kraju.** AI i dalje gradi u nacrtu (`node_drafts`, skriven od
   korisnika); `predaj_nacrt` ga u **jednoj transakciji** pretvori u materijal u polici iz nacrta i nacrt obriše.
   Nikad pola-materijal na polici (prekid usred gradnje ostavlja samo nacrt, koji istječe). **Ekran ②/4.3 otpada.**
2. **AI smije mijenjati postojeći vlastiti materijal — ono što mu korisnik kaže.** Bez ekrana za pregled. Stara verzija
   ostaje u povijesti verzija (`node_content_versions`), pa je izmjena povratna; ako se materijal promijenio otkad ga je
   AI pročitao, upis se **odbija, ne prepisuje**.
3. **Smjer, ne posao sad:** platforma postaje društvena (javna objava, blog, profili); korisnici će moći vidjeti
   **analitiku jedni drugih — samo ako to sami dopuste**. Ništa od toga ne ulazi u F6.

**Što ostaje netaknuto:** doseg = samo vlastito gradivo (tuđe i katalog nikad) · token AI-ja ne dobiva ništa izvan
nacrta i tog jednog prijelaza · validator ②/0a i četiri brane ③ vrijede **na prijelazu u materijal** (sad bez
čovjeka u petlji su one jedina kontrola kvalitete — ③ time dobiva na važnosti) · materijal je privatan.

**Posljedice:** ograda iz ②/4.1 („samo obična sesija smije prihvatiti") se za `predaj_nacrt` **svjesno** diže, i to samo
za nov materijal u vlastitu policu; `prihvati_nacrt`/`odbaci_nacrt` iz obične sesije ostaju (npr. za nacrt koji je AI
predao prije ove odluke). `review_url` postaje link na **materijal**, ne na nacrt. ②/4b više nije „nacrt izmjene +
prihvat" nego izravna izmjena s provjerom verzije.

---

## ADR-038 — MCP: nacrt u zasebnoj tablici · naša domena · DCR uz popis hostova · sigurnost u bazi, kvaliteta u poslužitelju
**Datum:** 2026-09-17 · **Status:** ✅ ODLUČENO (Leon, anketa) · **Vezano:** [ADR-031](#adr-031) (cjevovod, nacrt, četiri brane), [ADR-030](#adr-030), [ADR-026](#adr-026) (MCP invarijante), [ADR-024](#adr-024) (osobni otok), ADR-027 · **Faza:** F6 u [plan/MCP.md](../plan/MCP.md)

**Kontekst.** [ADR-031](#adr-031) je presudio **što** MCP radi, ali je dvije stvari uzeo kao riješene: da šav za nacrt
postoji i da je pristup pitanje jedne prijave. Mjerenje 17.09. (RASPORED §F6 „Provjereno") oborilo je obje: nacrt
osobnog materijala na poslužitelju **ne postoji**, a Supabase OAuth token AI-ja je **običan korisnički JWT + `client_id`**
— nije vezan na naš poslužitelj (`aud` ostaje `authenticated`) i smije sve što i prijavljeni korisnik. Supabase nema
CIMD, pa se klijent identificira kroz DCR ili unaprijed registriran klijent.

**Odluke (Leon, 2026-09-17 — prihvaćene sve četiri preporuke):**

1. **Nacrt živi u zasebnoj tablici `node_drafts`.** AI piše samo ondje, nikad u `nodes` / `node_content`; postojeći
   materijal se ne prepisuje; više nacrta smije postojati usporedo. Materijal nastaje tek korisnikovim **Prihvati** iz
   obične sesije.
2. **Adresa konektora na produkciji = `www.sokratstudy.com/mcp`** (Vercel rewrite na Edge Function); Supabase URL služi
   samo pokusu na stagingu. Adresa se poslije ne mijenja — promjena znači da svaki korisnik ponovno dodaje konektor.
3. **DCR je uključen, a stranica za odobrenje pušta samo poznate hostove preusmjeravanja** (`claude.ai`, `chatgpt.com`).
   Supabase DCR hostove ne ograničava; odobrenje traži korisnikovu prijavu s našeg origina, pa se stranica ne zaobilazi.
4. **Sigurnost u bazi, kvaliteta u MCP poslužitelju.** Token drži broker Anthropica/OpenAI-ja, ne model: model do baze
   dolazi samo kroz naše alate, a tko drži token dolazi i mimo njih. Zato **čiji su podaci i koje su radnje dopuštene**
   presuđuje baza (token s `client_id` = zabrana po defaultu), a **četiri brane** žive u poslužitelju i čitaju iste module
   kao preglednik (`js/card-limits.js` je treći čitatelj, ne kopija) — i ponavljaju se pri **Prihvati**, pa nacrt upisan
   mimo poslužitelja ne postaje materijal bez brana.

**Posljedice:**
- ADR-031 ⑤ („šav postoji: `SokratDraft` → `publish_document`") **ne vrijedi za osobni materijal**, a ADR-026 („MCP ne
  dobiva nijedan nov put upisa, koristi postojećih 7 RPC-ova") je **nadglašen**: tih 7 piše živo, a živo je upravo ono
  što AI ne smije. MCP dobiva jedan nov put — u nacrt — i nijedan u žive tablice.
- **Brava ide prije ikakvog OAuth-a na produkciji.** `PUT /auth/v1/user` brava u bazi ne doseže → oslonac je postavka
  „traži trenutnu lozinku" u dashboardu.
- Svaki budući RPC je **zatvoren za token AI-ja dok se izričito ne otvori** (inventarska brana, F6 ①/2).
- `KURIRANE_BOJE` i `normFill` izlaze u zasebne module po kalupu `card-limits.js`, jer ih treba i Deno.
- Vercel rewrite za MCP promet nije provjeren — provjerava se na previewu prije produkcije; ako ne radi, odluka 2 se
  otvara ponovno, ne zaobilazi.

---

## ADR-037 — Pravne stranice nose OBA jezika u stranici; `boot.js` bira prije crtanja
**Datum:** 2026-09-16 · **Status:** ✅ ODLUČENO (Leon, anketa) · **Vezano:** [ADR-033](#adr-033) (sučelje je dvojezično), ADR-012 (jezik gradiva = program), ADR-027, BUG-025 (`innerHTML` granica) · **Faza:** F3/1 u [RASPORED.md](../plan/RASPORED.md)

**Kontekst.** Četiri pravne stranice (`contact` · `faq` · `privacy` · `terms`) nisu učitavale `js/i18n.js`, a tekst im
je pun podebljanja i poveznica usred rečenice. Mehanizam sučelja (`data-i18n` → `textContent`) taj markup briše.

**Odluka (Leon, 2026-09-16):** **oba jezika u stranici** — `<div class="jezik" lang="en|hr">`; `boot.js` upiše
`data-ui-lang` + `lang` na `<html>` PRIJE crtanja, `css/legal.css` skriva drugi blok. Zaglavlje, podnožje i naslov
kartice ostaju na `data-i18n` (dijele ključeve s aplikacijom).

**Zašto ne ostala dva puta:** tekst u rječniku traži **nov `innerHTML`-put** (odbijen na „O nama" 24.08., BUG-025) i
dodaje ~60 KB pravnog teksta u `i18n.js`, koji je već 75 KB na putu SVAKOG posjetitelja naslovnice (`check:budget`).
Zasebne stranice po jeziku = četiri nove datoteke s dvostrukim zaglavljem i podnožjem, sitemap/canonical/hreflang, a
prekidač postaje navigacija.

**Posljedice:**
- `check:i18n` presuda ④: blok je preveden samo uz SUSJEDNI blok drugog jezika istog **oblika** (naslovi · odlomci ·
  stavke · poveznice) koji nije doslovna kopija — inače su svi engleski nositelji nalazi.
- `tests/legal.spec.js`: popis dvojezičnih stranica == sve pravne stranice; bljesak engleskog se MJERI.
- **Nova pravna stranica nosi oba bloka od prvog commita.** Izmjena teksta = izmjena u oba bloka istog commita.
- Stranica nosi oba teksta (Pravila ~2× bajtova) — pravne stranice nisu na putu posjetitelja naslovnice.
- Tražilica vidi oba jezika na jednom URL-u, kao i na ostatku stranice; hreflang se ne uvodi.

---

## ADR-036 — Monetizacija: najam je ORGANIZACIJA, firme plaćaju prve, prodaju prvo organizacije
**Datum:** 2026-09-07 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-035](#adr-035) (proizvod je tržište gradiva), [ADR-029](#adr-029), [ADR-031](#adr-031) (korisnik plaća svoj AI), [ADR-024](#adr-024) (osobni otok) · **Model u cijelosti:** [MONETIZATION.md](../product/MONETIZATION.md)

**Kontekst.** [ADR-035](#adr-035) je definirao **što** je proizvod, ali ne i **tko plaća**. Dotadašnji
model ([MONETIZATION.md](../product/MONETIZATION.md), 2026-06-27) pretpostavljao je maturu kao tržište i „donesi svoj ključ"
kao prvi korak naplate — oboje je nadglašeno: matura je ostala hipoteza, a korisnikov AI se kroz MCP
plaća sam, pa nije proizvod nego pretpostavka arhitekture.

Presudila su dva Leonova nalaza istoga dana. Prvi: **fakultet ne može kupiti unutar šestomjesečnog
programa** — javna nabava i akademski ciklusi ne staju u tu rupu. Drugi: kupac koji odlučuje u jednom
razgovoru već postoji, i to su **male firme ljudi koje poznaje**.

**Odluka (Leon):** *„najbolje bi bilo da prodam nekima od svojih kolega koji imaju firme nešto za jako
male novce. npr. moj prijatelj ima firmu i da plati da ima svoj vlastiti odjeljak platforme gdje
mu novi zaposlenici uče o firmi i svemu što se treba raditi, i on prati njihov progress i vrijeme
rješavanja. Trebamo nadodat exam module gdje se platforma locka na exam samo i ima timer."*

Uz to (isti dan): *„platforma bi trebala biti prilagođena za sve ustanove, ne samo za moj fakultet"* i
*„ustanova bira, ustanova može dalje to prodavat i mi dobivamo proviziju"*.

**Pet odluka koje iz toga slijede:**

1. **Najam je ORGANIZACIJA — firma · fakultet · škola.** Jedan model, tri tržišta, jedna izgradnja.
   **Firme idu prve** jer vlasnik odlučuje sam; ustanove kupuju po akademskim ciklusima.
2. **Objava se NE naplaćuje, ni brojem ni veličinom.** Ponuda je oskudan resurs; naplatiti je znači
   gušiti jedino čega nemamo. Naplaćuje se **pravo prodaje**, napredni načini učenja i statistika.
   **Osnovna petlja učenja ostaje besplatna zauvijek** — inače tuđi objavljeni rad izgleda pokvareno i
   autor prestane objavljivati.
3. **Organizacija bira po kolegiju:** privatno · javno besplatno · javno naplatno. **Zadano privatno.**
4. **⚠️ Prodaju PRVO organizacije; pojedinci kasnije.** Čim pojedinac proda, mi smo posrednik koji
   isplaćuje **fizičke osobe** — porezi, doprinosi, PDV po zemlji kupca, računi. Organizacija ima OIB,
   izdaje račun i ima knjigovođu. **Provizija 15–20 %** (niže od uobičajenih 30 %: cilj je da objavi,
   ne da se cjenka).
5. **Exam modul** — platforma se zaključa u ispit (bez navigacije, jedan pokušaj, sat teče), a **vrijeme
   i ocjena se računaju na poslužitelju**. Proizvod nije ispit nego **zapis** („ime, test, datum,
   rezultat, trajanje"), koji je u firmi dijelom zakonska obveza.

**Posljedice:**
- **⚠️ Višenajmnost NIJE osobni otok.** Organizacija traži entitet, članove, uloge i statistiku u
  dosegu organizacije — [ADR-024](#adr-024) veže sve uz jednog vlasnika (`owner_id = auth.uid()`). Projektira se
  unaprijed ili se gradi dvaput.
- **Exam modul se gradi jednom, služi trima tržištima:** evidencija u firmi · kolokviji na ustanovi ·
  matura kad na nju dođe red. Njegova granica se **kaže kupcu unaprijed**: preglednik ne može spriječiti
  drugi uređaj, pa modul dokazuje da je gradivo prođeno, ne da je netko bio sam u sobi.
- **Prodaja između korisnika nas čini POSREDNIKOM** → Stripe Connect ili MoR koji podnosi marketplace,
  isplate i PDV na prodavačevoj strani. Zato provizija dolazi kasno u redoslijedu.
- **Autorstvo jamči organizacija ugovorno** — inače smo uvučeni u spor profesora i ustanove kao platforma.
- **Naplata prije firme ide kroz pismo namjere ili ugovor o djelu.** Inkubator prima samo fizičke osobe
  **bez registriranog subjekta u trenutku prijave**, pa se subjekt osniva tek nagradom, na kraju programa.
- **[HOTEL_SIM.md](../ideas/HOTEL_SIM.md) je preklasificiran: NIJE proizvod za inkubator.** Simulacija se ne može prodati bez
  demoa koji uvjerljivo igra, a to je već većina posla — uz zajednički bazen potražnje, runde kao novu
  backend-formu i balans koji traži profesora kao suautora. Ostaje drugi čin i kandidat za diplomski.
- **Ne mijenja se ništa sigurnosno.** [ADR-024](#adr-024)/[ADR-025](#adr-025)/[ADR-018](#) i MCP-invarijante stoje netaknuti.

---

## ADR-035 — Proizvod je TRŽIŠTE studentskog gradiva: objavi · (možda) prodaj · natječi se. Katalog je POČETNA ZALIHA, ne priča
**Datum:** 2026-09-06 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-029](#adr-029) (UGC je glavni proizvod), [ADR-030](#adr-030) (MCP je glavni put stvaranja), [ADR-031](#adr-031) (MCP je cjevovod), [ADR-025](#adr-025) (doseg osobnog materijala), [ADR-018](#) (podatak, nikad kod) · **Faza:** F7 objava u [RASPORED.md](../plan/RASPORED.md)

**Kontekst.** [ADR-029](#adr-029) je već presudio da katalog nije srce platforme, a [ADR-030](#adr-030)/[ADR-031](#adr-031)
da gradivo nastaje kroz korisnikov AI. Ali **kamo to gradivo ide nakon što nastane nije nigdje bilo
zapisano kao odluka.** „Dijeljenje" i „natjecanje" stoje kao `F4`/`F5` u [VISION.md](../product/VISION.md) i `M3` u
[ROADMAP.md](../plan/ROADMAP.md) — oba označena **⬜ ideja** od prvog dana. **Prodaja korisničkog sadržaja ne postoji
nigdje**: [MONETIZATION.md](../product/MONETIZATION.md) govori isključivo o tome kako *mi* naplaćujemo *svoju* uslugu.
Posljedica te rupe je da se proizvod u razgovoru opetovano opisivao preko 24 predmeta — jedine stvari
koja je bila zapisana do kraja.

**Odluka (Leon):** *„ovo se ne reklamira kao FMTU, kao ima 24 predmeta. ovo će biti platforma na kojoj
će ljudi pomoću MCP-a objavljivat svoje radove, možda i prodavat, bit će mogućnost da korisnici
objavljuju svoje sadržaje i prodaju i da se međusobno natječu unutar sadržaja ili predmeta."*

Proizvod se definira kao **tržište studentskog gradiva** s tri radnje nad vlastitim materijalom:
**objavi** (iz privatnog u javno) · **prodaj** (opcijski, nije uvjet objave) · **natječi se**
(rezultati drugih nad istim gradivom ili predmetom). Katalog od 24 predmeta ostaje na produkciji, ali
mu se uloga **preimenuje**: on je **početna zaliha i dokaz da stroj radi** — nikad naslov priče.

**Posljedice:**
- **Katalog se ne briše niti umanjuje, ali prestaje biti argument.** Njegova jedina strateška
  vrijednost od danas je **hladan start**: tržište bez sadržaja je prazna polica, a mi na dan objave
  imamo 24 predmeta gradiva. Tako se i predstavlja — kao zaliha, ne kao ponuda.
- **⚠️ „Prodaj" uvodi stranu koju platforma nikad nije imala: novac između dva korisnika.** Time
  prestajemo biti trgovac vlastite usluge i postajemo **posrednik** — što traži isplate prodavačima,
  Stripe Connect ili MoR koji podnosi *marketplace*, PDV na prodavačevoj strani i račune. Postojeći
  [MONETIZATION.md](../product/MONETIZATION.md) §PDV **NE pokriva ovaj slučaj** i mora se dopuniti prije ijedne cigle prodaje.
  **Otvoreno**, ne odlučeno ovim ADR-om.
- **⚠️ Autorsko-pravna izloženost skače za red veličine.** [VISION.md](../product/VISION.md) §4.3 je rizik opisao za
  *privatno* dijeljenje. **Naplata tuđeg gradiva izvedenog iz profesorskih materijala je druga
  kategorija rizika** i prva stvar koju će pogoditi svaki pravnik. Predodluka: prodaje se **samo
  vlastito autorstvo**, uz ToS-tvrdnju, prijavu i uklanjanje. Objava bez naplate ostaje blaži režim.
- **Natjecanje prestaje biti „⬜ ideja".** Bodovi i ljestvice postaju dio definicije proizvoda →
  **anti-cheat na poslužitelju od prve cigle** ([VISION.md](../product/VISION.md) §4.5), nikad iz klijenta.
- **Ništa sigurnosno ne popušta.** [ADR-024](#adr-024) (zaseban otok, owner-RLS, upis samo kroz `SECURITY DEFINER`
  RPC), [ADR-026](#adr-026)/[ADR-030](#adr-030) MCP-invarijante (nikad katalog · nikad `is_admin()` · nikad
  `service_role`) i [ADR-018](#) (podaci, nikad kod) stoje **netaknuti**. Ovo je odluka o **proizvodu i
  redoslijedu**, ne o pravima.
- **Redoslijed:** objava je **F7** u [RASPORED.md](../plan/RASPORED.md) i dolazi iza računa (F2) i MCP-a (F6). **Prodaja i
  natjecanje dolaze IZA objave** — objava bez njih je upotrebljiv proizvod, obrnuto nije.
- **Kriterij prihvaćanja (objava):** gotovo kad korisnik svoj materijal iz police objavi javno, drugi
  ga korisnik nađe i uči iz njega bez ijedne posebne ovlasti, a autor to može povući.

---

## ADR-034 — Stranica se NE zumira: ništa se ne povećava ni smanjuje, sve ostaje na mjestu
**Datum:** 2026-09-05 · **Status:** ✅ ODLUČENO (Leon) · **provedeno F1/11 iste večeri** (meta na 6 stranica · reset `pan-x pan-y` · `ISKLJUCENO_ODLUKOM` u `axe-gate.js`) — na iPhoneu to NIJE držalo štipanje → **② `js/no-zoom.js`** (JS sloj, `gesturestart` + `touchmove` `scale`); dodir potvrđen ugašenim, štipanje opet presuđuje iPhone · **Vezano:** F1/10 (zoom na dodir), BUG-043, [ADR-027](#adr-027) (rub → test)

**Kontekst.** F1/10 je isti dan zatvorio dva uzroka zooma (polja < 16 px pri fokusu · dvostruki dodir
kroz `touch-action: manipulation`) i **svjesno odbacio** `user-scalable=no` / `maximum-scale=1`, jer
gase štipanje — WCAG 1.4.4, axe pravilo `meta-viewport` (razina AA, dakle u našem a11y-gateu). Meta je
zato namjerno govorila `user-scalable=yes, maximum-scale=5.0`. Leon je nakon deploya `c53c28c`
presudio suprotno.

**Odluka (Leon):** *„Stranica uopće ne bi trebala imati mogućnost da se nešto povećava ili smanjuje na njoj ikako. Treba ostati na mjestu."*

Dakle **nijedna gesta ne smije mijenjati mjerilo stranice** — ni štipanje, ni dvostruki dodir, ni
fokus polja. To je odluka o proizvodu koja svjesno **nadjačava** pristupačnosnu preporuku 1.4.4 za
zumiranje gestom; povećanje teksta ostaje moguće postavkama sustava (iOS Dynamic Type, Android
veličina fonta) i preglednikovim zumom na stolnom računalu.

**Posljedice:**
- **F1/11** provodi: `maximum-scale=1, user-scalable=no` u viewport-meti na svih **6** stranica
  (`index` · `editor` · 4 pravne, koje danas nemaju ni `viewport-fit`) **i** sloj za iOS — Safari na
  iOS-u od verzije 10 **ignorira `user-scalable=no` za štipanje**, pa meta sama ondje ne radi.
  Kandidati za mjerenje na uređaju: `touch-action: pan-x pan-y` na korijenu (štipanje otpada, skrol
  ostaje) i/ili `gesturestart` → `preventDefault()` (Safarijev nestandardni događaj). Što od toga
  stvarno drži iPhone **zna samo iPhone** — headless ne izvodi štipanje (BUG-043: 24 mjerenja,
  `visualViewport.scale` uvijek 1).
- a11y-gate (`tests/helpers/axe-gate.js`): `meta-viewport` je AA → pao bi. Cigla dodaje **imenovanu
  iznimku s ovim ADR-om kao razlogom**, ne gasi pravilo šutke; `meta-viewport-large` (≥ 5) prestaje
  biti relevantan.
- Tvrdnja ⑨ `phone-gate`-a (polja ≥ 16 px na dodiru) **ostaje** — fokus-zoom je i dalje zoom, a meta
  ga na iOS-u ne gasi.
- Izlaz iz faze F1 „dodir ne zumira" postaje **„ništa ne zumira"**; presuda ostaje Leonova, na uređaju.

---

## ADR-033 — Dvojezičnost se PREVODI, ne gasi; jezik sučelja NIKAD ne dira predmete
**Datum:** 2026-09-01 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-012](#) (sadržaj po programu), [ADR-027](#adr-027) (znanje u kod)

**Kontekst.** Cigla MREŽA B5 je izmjerila ono što je dotad bila anegdota: **421 nositelj
korisniku vidljivog teksta bez i18n ključa u 23 datoteke** (`scripts/i18n-baseline.json`),
među njima četiri cijele stranice koje `js/i18n.js` ni ne učitavaju (privacy 96 · terms 40 ·
faq 34 · contact 26). Brojka je otvorila pitanje: prevoditi sve, ili ugasiti dvojezičnost i
prestati je plaćati.

**Odluka (Leon):** *„moja odluka je prevoditi, jako je bitno da je stranica dvojezicna. eng
i hrv. predmeti i materijali za ucenje moraju biti nepromjenjeni na temelju jezika. dakle
mjenjanje jezika ne dira nikad predmete."*

Dva dijela:
1. **SUČELJE je dvojezično (HR/EN) i to se dovršava, ne gasi** — osnovica 421 je red čekanja
   za prevođenje, cilj je **0**; 🌐 toggle ostaje.
2. **SADRŽAJ predmeta je izvan dosega jezika sučelja** — predmet i materijali za učenje su
   **nepromjenjivi na temelju jezika**; jezik gradiva je svojstvo PROGRAMA (ADR-012, HR =
   klon-program), ne postavke sučelja. Ovo potvrđuje postojeću arhitekturu i pretvara je u
   tvrdo pravilo: nijedna buduća cigla ne smije vezati prikaz gradiva uz `sokrat-ui-lang`.

**Posljedice:**
- Prevođenje 421 nositelja je **odlučen posao bez termina** — nije dio faze MREŽA; kada se
  radi, čegrtaljka `check:i18n` mjeri silazak (spuštanje osnovice = dokaz, ne procjena).
- Četiri stranice bez i18n-a moraju **prvo dobiti mehanizam** (učitati `js/i18n.js` +
  `data-i18n`), tek onda prijevod.
- **K5** (editor dvojezično; 31 `studio.*` + 2 `admin.*` ključa bez rječnika) dobiva smjer:
  ključevi se **pišu u rječnik**, ne brišu iz koda.
- `data/**` ostaje jednojezično po datoteci — granica mjere `check:i18n` („`data/**` je
  ADR-012 domena") sada ima i odluku iza sebe, ne samo razgraničenje.

---

## ADR-032 — Semantika je UVIJEK PUNA ISPUNA; prilagođava se TINTA, ne ispuna
**Datum:** 2026-08-30 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-028](#adr-028) (Tailwind/tokeni), [ADR-027](#adr-027) (jedna činjenica = jedno mjesto)

**Kontekst.** Kroz cigle C4–C5a izmjereno je **11 fatalnih pravila palete** — mjesta gdje tekst na
ispuni pada ispod praga čitljivosti u bar jednoj temi. **Sedam ih dijeli jedan uzrok:** zakucano
`white`/`#fff` na `var(--danger)` ili `var(--success)`, u pet datoteka (`blind-map`, `profile` ×2,
`progress-section`, `quiz-section` ×2, `sidebar`) i kroz četiri cigle. Pitanje nije bilo koji token
odabrati, nego **smiju li zelena i crvena uopće biti ISPUNA, ili samo obrub i tekst** — jer je
„samo obrub" bio jeftin izlaz koji bi zatvorio svih sedam odjednom.

**Odluka (Leon):** *„ne smije biti obruba uopće, uvijek mora biti potpuna ispuna. boja mora biti
prilagođena na način da ne ruši tekst. tako isto za kartice."*

---

### Odluka

**① Puna ispuna je OBAVEZNA.** Obrub smije **dopuniti** ispunu, ali je **nikad ne zamjenjuje**.
Ovo je izgledna, ne tehnička odluka: „točno/netočno" je najvažniji signal u alatu za učenje i mora
se vidjeti prije nego se pročita.

**② Prilagođava se TINTA, ne ispuna.** Ovo je mjerom izabrano između dva čitanja Leonove rečenice,
i mjera je jednoznačna — kontrast punih ispuna po temama:

| tema | `--color-ok` | `--color-danger` | bijeli tekst | tamni tekst (`#14161a`) |
|---|---|---|---|---|
| `academic` | `#10794a` | `#c0332b` | **5.45 / 5.60** ✅ | 3.33 / 3.23 |
| `paper` | `#15703c` | `#c6362c` | **6.15 / 5.30** ✅ | 2.95 / 3.42 |
| `chalk` | `#8fbf6b` | `#e3705c` | 2.14 / 3.12 ⛔ | **8.48 / 5.81** ✅ |
| `mint` | `#6bcb77` | `#e2725f` | 2.01 / 3.09 ⛔ | **9.00 / 5.87** ✅ |

**Svaka ispuna VEĆ ima tintu koja prolazi AA (4.5:1) — samo u `chalk` i `mint` to nije bijela.**
Zato se boje ispuna **ne diraju**: mijenjati ih da bijelo prolazi svugdje značilo bi potamniti
zelenu i crvenu u obje svijetle pastelne teme, čime `chalk` i `mint` gube ono po čemu postoje.

**③ Mehanizam = isti koji marka već koristi.** Uvode se `--color-on-ok` i `--color-on-danger`, po
temi, točno kako `--color-on-brand` već stoji (bijelo u `academic`/`paper`, tamno u `chalk`/`mint`
— **isti raspored koji mjera iz ② traži**, što je neovisna potvrda da je obrazac pravi).

**④ Kartice su isti princip, drugi smjer.** Ondje boja dolazi **izvana** (katalog, korisnik) pa se
ispuna ne može unaprijed namjestiti → tintu bira **`inkForTint()`** (od MREŽA-C2; od cigle
„učitavanje po ruti" 2026-09-04 stanuje u **`js/utils.js`**, jedinoj datoteci koju učitavaju i
`index.html` i `editor.html` — prije toga u `js/blocks-renderer.js`, koji od tada stiže tek s
paketom `study`. Prag je IZVEDEN iz para tinti i zapisan uz kod — `check:contrast` ih drži
usklađenima), što je **već izvedeno u C5a/4** za `.category-bar-icon`. Pravilo: **gdje boju
kontroliramo mi → token po temi; gdje dolazi izvana → `inkForTint()`.** Puna ispuna u oba slučaja.

---

### Posljedice

- **Gasi 7 od 11 fatalnih pravila palete** i time **otključava birač tema**, koji je na njih čekao.
- Izvedba je **razdijeljena po ciglama** koje ionako diraju te datoteke (C5b nosi `blind-map`),
  a ne kao zaseban zahvat — pravila palete su čegrtaljka, ne jednokratni popravak.
- **Nijedna boja ispune se ne mijenja** → `check:contrast` po temi i `check:contrast:live` ostaju
  mjera, a ne pregovaračka strana.
- ⚠️ Preostala **4 fatalna pravila NISU pokrivena** ovom odlukom (poluprozirno bijelo na
  poluprozirnom bijelom, bijelo na gradijentu) — njih rješava cigla koja ih drži.

---

## ADR-031 — MCP je CJEVOVOD `Learn → kartice → dopune/kviz`, u nacrt, kroz KORISNIKOV AI
**Datum:** 2026-08-30 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-030](#adr-030) (MCP je glavni put stvaranja), [ADR-026](#adr-026) (MCP invarijante), [ADR-025](#adr-025) (doseg osobnog materijala), [ADR-018](#) (podatak, nikad kod)

**Kontekst.** [ADR-030](#adr-030) je odlučio **da** MCP postane glavni put stvaranja, ali je ostavio
otvorenim **što točno radi** i **kako korisnik do njega dolazi** — i sam je zapisao da je *pristup prvi
problem*. Ovaj ADR zatvara oboje. Povod je Leonov opis tijeka, 2026-08-30.

**⚠️ Prethodna pretpostavka je bila KRIVA.** Plan je MCP zamišljao kao skup CRUD-alata („dodaj
karticu", „uredi lekciju"). Leon je opisao **cjevovod**: svaki korak jede izlaz prethodnog. To nije
ista stvar i mijenja oblik alata — CRUD bi dao AI-ju tisuću sitnih poteza i nikakav redoslijed.

---

### Odluka

**① Ulaz.** Gumb u aplikaciji nudi korisniku njegove AI-jeve i vodi ga u chat.
⚠️ **Nijedan AI ne može „odmah znati" za nas** — ChatGPT i Claude to rade preko konektora koje
korisnik **doda jednom, kod sebe**. Zato je tijek: *prvi put* gumb vodi na upute + prijavu u naš
konektor; *svaki sljedeći put* gumb je samo prečac, a AI već zna. Leon: *„Gumb je prihvatljiv, upravo
to sam i mislio."*

**② AI je KORISNIKOV, ne naš** (Leon: *„njihov"*). Ne plaćamo tokene i ne održavamo model.
**Cijena te odluke:** nad kvalitetom ishoda imamo utjecaj **samo** kroz upute i kroz brane u
write-putu — nikad kroz vlastiti prompt-inženjering nad tuđim modelom. Zato su brane iz ⑤ obavezne,
a ne kozmetika.

**③ Materijal dolazi kroz CHAT, ne kroz nas.** Korisnik ubaci PDF/bilješke u svoj AI; AI to pročita i
zove naše alate s **gotovim tekstom**. **Mi datoteku nikad ne vidimo.** Leon: *„To je bio i glavni
plan."* Manje koda, manje odgovornosti, manje GDPR-a — izvorna datoteka nikad ne dođe na naš disk.

**④ Cjevovod, i to ovim redom:**

1. **`Learn` je podloga svega i najbitniji je.** AI **prvo prepoznaje strukturu** — različite
   lekcije/sekcije predmeta ili materijala — pa unutar Learna piše **skriptu**.
2. **Kartice iz Learna.** Oblik je **pojam ili pitanje → objašnjenje** (*„što je API"*, pa
   objašnjenje). Samo kratke stavke; ono što je bitno za znati.
   **Boja po lekciji, i to sa svrhom: da se vidi kojoj lekciji kartica pripada** — nije ukras.
3. **Dopune i kviz iz kartica.** Kartice su **na bazi pitanja**, pa su pitanja izvedena, ne izmišljena.
   ⚠️ Traži se **POKRIVENOST**, ne uzorak — Leon: *„da uvrsti sve moguće da učenje bude što bolje
   kroz pitanja."*
4. **Vježbe su IZVAN ovog ADR-a** — *„to ćemo kasnije razjasniti kako će se raditi."* I dalje vrijedi
   ADR-018/BUG-012: vježba je podatak, nikad kod.

**⑤ Sve ide u NACRT, korisnik objavljuje** (Leon: *„naravno uvijek nacrt ide u draft"*).
Razlog je asimetrija: AI u minuti napiše skriptu i dvjesto kartica, a **poništavanja nema** —
`content_versions` je append-only audit, ne undo. Šav postoji (`SokratDraft` → `publish_document`),
pa MCP ne izmišlja treći write-put.

**⑥ Doseg.** **Samo vlastito gradivo prijavljenog korisnika**, i čitanje i pisanje. **Javni katalog je
izvan dosega — i za čitanje**, dok se izričito ne otvori. Koliko materijala ulazi u jednu sesiju
**odlučuje korisnik** i kaže to svom AI-ju; mi opseg ne ograničavamo umjesto njega.
Invarijante iz ADR-026/030 stoje netaknute: **nikad katalog · nikad `is_admin()` · nikad
`service_role`**.

**⑦ ČETIRI TVRDE BRANE U WRITE-PUTU** (Leon: *„slažem se sa svime"*). Brane, ne preporuke — jer AI
nema ekran na kojem bi ga se upozorilo:

| brana | zašto postoji |
|---|---|
| **duljina kartice** (200 upozorenje / 500 blokada) | politika već postoji u `js/card-limits.js`, ali živi u **editoru**, koji MCP preskače — mora postati **treći čitatelj, nikad treća kopija** (ADR-027/030) |
| **svaka kartica daje bar jedno pitanje** | mjerljiv oblik Leonova zahtjeva za pokrivenošću; bez toga je gradivo pokriveno napola, a to se ne vidi |
| **svaka lekcija dobiva boju** | boja je nositelj pripadnosti (④.2), pa je izostanak boje gubitak podatka, ne izgleda |
| **dopuna ima jednoznačan odgovor** | BUG-024/025: jedno pitanje u katalogu bilo je **neodgovorljivo**; AI taj razred greške proizvodi brže od čovjeka |

**⑧ Vrijeme: TEK NAKON FRONTENDA** (Leon: *„MCP radimo nakon šta je frontend gotov"*).

---

**Posljedice**

- **`js/card-limits.js` mora prijeći u write-put na serveru.** Dok je politika samo u pregledniku,
  brana ⑦.1 ne postoji za MCP.
- **Alati se oblikuju kao koraci cjevovoda, ne kao CRUD.** Ime i potpis alata nose redoslijed;
  „dodaj karticu" bez Learna iznad sebe je poziv koji ne bi trebao uspjeti.
- **Konektor traži OAuth nad našim MCP poslužiteljem** — to je odgovor na *„pristup je prvi problem"*
  iz ADR-030. ⚠️ Ovisi o Supabase Authu, pa se **radi tek nakon seobe** (mijenja se URL, a time i
  redirect URI).
- **Ne mijenja se ništa sigurnosno.** ADR-024/025 stoje.

---

## ADR-030 — AI kroz MCP je GLAVNI put stvaranja; editor je dorada, ne ishodište
**Datum:** 2026-08-13 · **Status:** ✅ ODLUČENO (Leon) · **Vezano:** [ADR-026](#adr-026) (MCP invarijante), [ADR-029](#adr-029) (UGC je glavni proizvod), [ADR-018](#) (podatak, nikad kod)

**Kontekst.** Leon, opisujući stanje za ~2 mjeseca: *„MCP za spojiti AI će biti primjećeniji i najviše
održan da korisnika vuče na to da koristi AI MCP da se ne mora jebat s editorom; editor će korisnik
najviše koristiti da edita svoj sadržaj koji mu je AI napravio preko MCP-a."*

[ADR-026](#adr-026) je MCP već uveo, ali **kao rješenje za MOBILNO autorstvo** — editor na dodir je bio
neupotrebljiv, pa je AI bio zaobilaznica. Ovo je šire i obrnuto: MCP postaje **primarni put stvaranja
na svim uređajima**, a editor se iz ishodišta pretvara u alat za **doradu**.

**Odluka.** **Gradivo prvenstveno nastaje kroz korisnikov AI (MCP); editor postoji da se ono
dotjera.** Editor se time smije **pojednostaviti** — smije IZGUBITI funkcije, ne dobiti ih.

**Posljedice:**
- **MCP prestaje biti spike i postaje proizvod.** Danas je `mcp-admin/` untracked, read-only pokus
  ([[mcp-admin-spike]]). Kao glavni put stvaranja treba write-putove, autentikaciju, validaciju i
  upute za krajnjeg korisnika. **To je najveći neriješeni komad plana — veći od cijelog frontenda.**
- **⚠️ PRISTUP JE PRVI PROBLEM, NE ZADNJI.** Sve se danas oslanja na JWT iz prijave u pregledniku;
  korisnikov Claude nema preglednik. Treba osobni token ili OAuth. **Dok to nije presuđeno, ostatak
  MCP-a nema smisla graditi** — svaki write-put ovisi o tome čijim imenom piše.
- **⚠️ KONTROLA KVALITETE SELI S EKRANA U WRITE-PUT.** Strop duljine kartice (200 upozorenje / **500
  tvrda blokada**) danas živi u **editoru**. Ako AI piše izravno, editor se preskače — i strop nestaje.
  Šav srećom postoji: `js/card-limits.js` je jedna politika koju čitaju editor **i** `validate:content`;
  MCP mora postati **treći čitatelj, nikad treća kopija** (ADR-027). Isto vrijedi za escaping i shemu.
- **Granica opsega se postavlja UNAPRIJED, ne usput.** MCP smije stvarati i mijenjati **isključivo
  vlastito gradivo prijavljenog korisnika**. Invarijante iz ADR-026 stoje netaknute: **nikad katalog ·
  nikad `is_admin()` · nikad `service_role`**. Vrijedi i ADR-018: AI piše **PODATKE, nikad KOD** →
  **vježbe ostaju izvan MCP-a** (`generate()` ne preživi serijalizaciju, BUG-012).
- **Ne mijenja se ništa sigurnosno.** ADR-024 (osobni graditelj = zaseban otok, owner-RLS, upis samo
  kroz `SECURITY DEFINER` RPC) i ADR-025 stoje. Ovo je odluka o **istaknutosti i redoslijedu**.
- **Frontend se ne usporava.** C3–C7 teku dalje; ADR-030 mijenja što „polish editora" znači —
  manje površine, ne više.

---

## ADR-029 — UGC je glavni proizvod; javni katalog je JEDAN izvor gradiva, ne srce platforme
**Datum:** 2026-08-09 · **Status:** ✅ ODLUČENO (Leon: *„to nam postaje glavna stvar, predmeti su samo jedna stvar"*) · **Plan:** [archive/FRONTEND_REDIZAJN.md](../archive/FRONTEND_REDIZAJN.md)

**Kontekst.** `PRD.md` je od početka pisao *„zvijezda je UGC"*, ali proizvod to nikad nije odražavao.
Provjereno u kodu, ne po dojmu: **„Moji materijali" nisu stranica** — montiraju se kao `<div class="mm">`
**unutar profila** (`js/profile.js`), nema `#materials-page`, nema rute, nema ulaza u navigaciji.
Landing nav glasi `Subjects · How it works · Study modes · About` — **glavni proizvod nije spomenut nigdje.**
Jedini put do njega: prijavi se → otvori profil → skrolaj. Drugim riječima, UGC je bio **widget u
postavkama**, a katalog je zauzimao cijelu površinu.

**Odluka.** UGC je **primarna površina proizvoda**. Javni katalog od 22 predmeta ostaje — ali kao
**jedan od izvora gradiva**, ne kao ono što platforma jest. Posjetitelj mora vidjeti *„napravi svoje
gradivo"* prije nego *„evo 22 predmeta s FMTU-a"*.

**Posljedice:**
- **„Moji materijali" postaju ravnopravno odredište** — vlastita stranica, ulaz u navigaciji i na
  landingu, dostupna izravno, a ne kroz profil.
- **Redoslijed redizajna se mijenja:** editor i osobni materijal idu **prije** četiriju modova učenja i
  browsea. Prije je editor bio zadnji jer je bio periferan; ta pretpostavka više ne vrijedi.
- **Ne mijenja se ništa sigurnosno.** [ADR-024](#) (osobni graditelj = zaseban otok, owner-RLS, upis samo
  kroz `SECURITY DEFINER` RPC), ADR-025 (doseg) i ADR-018 (student uploada PODATKE, nikad KOD) stoje
  netaknuti. Ovo je odluka o **istaknutosti**, ne o popuštanju granice.
- **Ne mijenja se prioritet sadržaja.** Sadržajna staza ostaje pauzirana (ADR-018); HR nosi suradnik.

### ➕ Dopuna 2026-08-14 — „prije" postaje „ravnopravno" (Leon, na maketi)

Izvorni tekst traži da posjetitelj vidi *„napravi svoje gradivo"* **prije** *„evo 22 predmeta"*.
Provedeno doslovno, to je dalo landing koji **skriva jedini dokaz da sadržaja uopće ima** — a Leon je
tražio suprotno: *„trebaju biti predmeti i sve"*, pa u istoj sesiji i *„ugc je skriven još uvijek…
kada ju otvori bilo tko da vidi da može radit svoj sadržaj tu"*. **Oba zahtjeva su točna i nisu u
sukobu**; sukob je bio u riječi „prije".

**Razrješenje:** *prije* → **ravnopravno, i to u herou**.

- **Naslov pokriva OBA izvora** — odakle gradivo dolazi (katalog ili ti) je **detalj nabave, a ne
  proizvod**; proizvod je pretvorba u četiri načina učenja. Time UGC nije dodatak nego pola obećanja.
- **Dvoja vrata jednake težine** u herou; ni jedna nisu „sekundarna akcija".
- **Katalog ostaje prva sekcija** — kao dokaz supstance, ne kao hijerarhija. **Vlastito gradivo je
  puna sekcija odmah iza**, ne traka pri dnu.
- **Mreža predmeta mora izgledati OTVORENO:** „＋ Tvoj predmet" kao zadnja pločica. Popis od 22
  inače čita kao zatvoren katalog jednog fakulteta.

⚠️ **Ovo je ublažavanje izvorne odredbe i tako se i vodi**, a ne njezino ispunjenje. Mjerilo ostaje
Leonovo: *platforma mora biti takva da svatko tko je otvori odmah vidi da tu može raditi svoj
sadržaj.* Detalji i mjere: spec **§7.13**.

---

## ADR-028 — Frontend prelazi na Tailwind, ali SAMO preko CLI-ja; sadržaj ostaje bez utility-klasa
**Datum:** 2026-08-09 · **Status:** ✅ ODLUČENO (Leon: *„koristio bi tailwind za front end"*) · **Plan:** [archive/FRONTEND_REDIZAJN.md](../archive/FRONTEND_REDIZAJN.md)

**Kontekst — izmjereno prije odluke, ne po dojmu.** CSS je narastao na **10.568 redaka u 32 modula**, a
`variables.css` ima **147 redaka i ~25 tokena**. Ostalo živi izvan sustava: **62 jedinstvene hex-boje**
(225 pojavljivanja) izvan token-datoteke · **109 `@media` blokova s 90 različitih breakpointa** ·
**115 `!important`** (49 samo u `subject-selector.css`, 40 u `responsive/*`). Imena tih datoteka —
`mobile-core`, `mobile-extra`, `device-sizes`, `component-improvements` — sama priznaju što su:
slojevi zakrpa. Posljedica nije estetska nego operativna: **svaka vizualna promjena je lov kroz 32
datoteke i 115 `!important`-a**, zbog čega i sitnica poput „akcent = cijela kartica" izgleda kao projekt.

**Odluka.** Tailwind v4 kao **npm devDependency**; CLI generira **commitan** CSS.

**Zašto baš tako, a ne drukčije:**
- **Ne rješavamo disciplinom.** Skala se ne održava dogovorom — 90 breakpointa je nastalo unatoč
  postojanju token-datoteke. Tailwind ih uklanja **po konstrukciji**, jer vlastitu skalu ne možeš izmisliti.
- **CDN otpada bez rasprave.** `cdn.tailwindcss.com` / `@tailwindcss/browser` ubacuju kompajler u
  preglednik, skeniraju DOM u runtimeu i rade bljesak neostiliranog sadržaja — i izravno se tuku sa
  **Service Workerom i immutable cacheom** koje smo gradili cijelu F3 fazu. Tailwind to i sam ne
  preporučuje za produkciju.
- **Ne uvodi nov stroj.** `npm run build:css` **već jest** build-korak (32 modula → `styles.bundle.css`,
  uz CI drift-gate). Tailwind CLI ima **isti oblik**: izvor → generirani bundle → commitan → drift-gate →
  `?v=` bump (ADR-017). Ograničenje „bez build-koraka" iz `CLAUDE.md` odnosi se na **runtime i
  frameworke**, i tako se dalje čita.

**Tvrda granica — Tailwind NIKAD ne ulazi u `data/`.** Gradivo sadrži sirovi HTML s klasama. Utility-klase
ondje značile bi da stil živi u **podatku**, pa bi svaki idući redizajn morao migrirati 22 predmeta i sve
korisničke materijale — a i UGC-autor bi pisao stil, ne sadržaj. Sadržaj zadržava **semantičke** klase;
Tailwind je isključivo jezik **okvira aplikacije**. Isto vrijedi za `blocks-renderer.js` kao jedinu
sigurnosnu granicu renderiranja (ostaje netaknut kao granica, mijenja mu se samo izlazni skup klasa).

**Posljedice:**
- `styles.bundle.css` i Tailwind-izlaz **koegzistiraju** kroz cijelu tranziciju; modul se briše tek kad
  njegova površina potpuno prijeđe. Površina je **ili cijela nova ili cijela stara** — polovična je
  jamstvo za rat specifičnosti.
- **Dinamički građene klase su nevidljive Tailwindu** (skenira izvor, ne runtime). Naš markup velikim
  dijelom nastaje u JS-u, pa svako `'bg-' + boja` tiho nestaje iz izlaza. Paleta od 8 boja u editoru mora
  ostati na **CSS varijablama**, ne na generiranim imenima klasa.
- Redizajn **ne mijenja ponašanje**. Želja za promjenom toka ide u `BACKLOG.md`, ne u ovu fazu.

### Odbijeno u istom dahu: Next.js (Leon: *„možemo li koristiti next.js"*)

**Ne — i nije blizu.** To nije redizajn nego **prepisivanje cijele aplikacije**: 12.716 redaka JS-a
pisano je kao **globalne skripte fiksnog redoslijeda** (`window.AppState`, goli `const SokratAuth`);
**vježbe su kôd** koji se ubrizgava kao `<script>` preko `codeScripts` (pouka BUG-012) i tuče se s
bundlerom; `data/*.js` pišu u `window` uz dual-read DB→JSON→`.js`; **Service Worker i `?v=` cache-busting**
(cijela faza F3 + ADR-017) postaju mrtvi jer Next ima vlastito hashiranje; velik dio od **304 Playwright
testa** gađa `window.*` kroz `page.evaluate`. Ishod: mjeseci u kojima ništa nije deployabilno, da bi se
na kraju **ponovno izveo sav rad koji danas radi** — offline, editor, cloud-sync, vježbe. Protivno
Leonovom vlastitom pravilu *„sve mora savršeno raditi prije nego ga uredimo"*.

**Argument za Next koji jest postojao i zašto ne drži:** prave rute i SSR za **dijeljeni materijal**
(preview-kartica, indeksiranje). Ali doseg dijeljenja je presuđen kao **link s tajnim tokenom, bez javne
biblioteke** — dakle te stranice **ne smiju** biti javno pronalažljive, pa glavni SSR-argument otpada.
Prava ruta + token provjeren kroz RLS radi i u vanili (ADR-011).

**Ako Next ikad — kao zasebna, svjesna migracija odlučena na vlastite zasluge, nikad prošvercana kroz
redizajn.** Ovo je zapisano da se ne otvara svaku sesiju iznova.

---

## ADR-027 — Znanje ide u kod i testove; proza nosi samo ZAŠTO
**Datum:** 2026-08-08 · **Status:** ✅ ODLUČENO (Leon) · **Povod:** [BUG-023](./BUGS.md) + Leonov nalaz *„cijeli projekt je postao masivan i težak za održavanje"*

**Kontekst — izmjereno, ne po osjećaju.**

| | |
|---|---|
| kod (`js/`) | 38 datoteka · **11.926 redaka** |
| CSS | 32 · 8.048 |
| testovi | 50 · 8.486 |
| **dokumentacija** (`docs/**`) | 44 · **11.242 retka** |
| `CLAUDE.md` (učitava se SVAKU sesiju) | **26,7 KB**, od čega **12,5 KB** povijesti u sekciji naslovljenoj „TRENUTNO" |

**Kod nije velik.** 12.000 redaka je posve obična srednja aplikacija. **Dokumentacija je bila jednako velika
kao cijeli kod** — i to je težina koja se osjeća.

Dokaz da to nije estetika nego trošak: u dva dana smo tri puta čistili istu vrstu kvara —
**A4** (četiri neistine u `TEAM.md`/`ROADMAP.md`/`PRD.md`), **pred-compact revizija** (jedanaest zastarjelih
tvrdnji + osam mrtvih putanja u memoriji), i **duplikat povijesti** u `CLAUDE.md` koji je `HISTORY.md`
ionako već imao. Nula tih sati nije otišlo u proizvod.

**Presudni dokaz je BUG-023.** Rizik je bio **zapisan** u planu faze — *„`saveCurrentPosition` → obnova gađa
id koji još nije registriran"* — pročitan, i **svejedno isporučen na produkciju**. Rečenica u dokumentu nije
spriječila ništa. `if` u kodu ili jedan test bi spriječili.

**Odluka.**

1. **Znanje o PONAŠANJU ide u kod i testove.** Rub koji prepoznaš **isti čas** dobiva test ili guard.
   „Zabilježit ćemo pa riješiti kasnije" je uredno dokumentiran propust, ne plan.
2. **Proza nosi samo ZAŠTO** — odluke, kompromise, cijenu. *Što* sustav radi neka piše u kodu; *kako* je
   došlo dotle u `records/`.
3. **Jedna činjenica = jedno mjesto.** Ista cigla više se ne prepisuje u plan + CHANGELOG + PROGRESS +
   memoriju. Jedno mjesto nosi tekst, ostala pokazuju na njega.
4. **Duplikat se briše, ne sinkronizira.** Ako `HISTORY.md` već ima priču, `CLAUDE.md` je ne ponavlja.
5. **`CLAUDE.md` je „što vrijedi SAD", nikad dnevnik.** Povijest u njemu je bug jednake težine kao mrtva
   poveznica — jer se učitava svaku sesiju i tiho oblikuje svaku sljedeću odluku.
6. **Kopiju u kodu tretiramo kao rizik.** Pet mjesta koja čitaju istu stvar na isti način moraju postati
   jedna funkcija; BUG-023 je nastao točno u toj petostrukoj kopiji.

**Posljedice.**
- `CLAUDE.md`: **26,7 → 17,2 KB** (−36 %); cijela F0–F5 kronologija obrisana jer `HISTORY.md` ju ima.
- Preostalih ~17 KB su **žive reference** (komande, arhitektonske zamke, kritična pravila) — dalje rezanje
  bi gubilo vrijednost, pa se **ne** reže radi brojke.
- `npm run check:docs` dobiva **šestu** provjeru: dokument u `plan/` ili `product/` ne smije označiti
  dokument iz `archive/` kao „AKTIVNO/AKTIVNI". Prve četiri čuvaju strukturu, peta i šesta **istinitost**.
- Ovo **ne** znači „manje dokumentacije". Znači: ista količina znanja, ali na mjestu gdje ne može lagati.

**Cijena koju svjesno prihvaćamo.** Manje proze znači da se dio konteksta mora pročitati iz koda i testova.
To je prihvatljivo jer kod i testovi **ne mogu zastarjeti neopaženo** — CI ih vrti; dokument nitko ne vrti.

---

## ADR-026 — Zove se „materijal"; mobilno autorstvo ide preko korisnikovog AI-a, ne preko touch-editora
**Datum:** 2026-08-07 · **Status:** ✅ ODLUČENO (Leon) · **Dopunjuje:** [ADR-025](#adr-025--osobno-gradivo-osam-presuda-o-dosegu-vježbe-dijeljenje-napredak-boje-opseg) · [ADR-024](#adr-024--osobni-ugc-graditelj--zaseban-otok-nodes-stablo-owner-rls-a-ne-proširenje-kataloga)

**Kontekst.** Nakon ADR-025 ostala su dva otvorena pitanja koja mijenjaju opseg posla: kako se **zove** ono
što korisnik gradi, i mora li se to moći graditi **na mobitelu**. Drugo pitanje je izgledalo kao „koliko posla
oko touch-editora", a odgovor ga je pretvorio u nešto drugo.

**Odluke (Leon).**
1. **Ono što korisnik gradi zove se „materijal (za učenje)", ne „gradivo".** *„Gradivo"* ostaje rezervirano za
   **javni katalog** — ono što objavljujemo mi. Riječ povlači granicu između dva svijeta i mora biti
   **institucijski neutralna**: „gradivo" miriše na propisani kurikul, a po ADR-025 §6 korisnik je **bilo tko**.
   Kratki oblik **„materijal"** u gumbima, puni **„materijal za učenje"** u prozi.

   **Rječnik osobnog prostora (obvezujuć za sučelje):**

   | `nodes.kind` | hrvatski | engleski | radnje |
   |---|---|---|---|
   | `folder` | **polica** *(ž. rod: nova polica, nadređenu policu)* | folder | stvori · preimenuj · premjesti · obriši |
   | `study` | **materijal** | material | **stvori** (*„Novi materijal"*) · **uredi** (*„Uredi materijal"*) |

   Metafora je namjerna i dosljedna: **polica drži materijale**. Zato *ne* „mapa" ni „direktorij" — oni
   opisuju datotečni sustav, a ovo je polica s gradivom za učenje.

   **Dvije radnje nad materijalom su create i edit** (Leon): *„Novi materijal"* stvara nov, *„Uredi materijal"*
   otvara **bilo koji** koji je korisnik već napravio. Nema treće radnje ni skrivenog stanja između njih.

   **Izuzetak — dijeljeni nizovi ostaju „gradivo".** Study-stranica je jedan DOM za oba svijeta, pa
   `learn.title` i `quiz.res.ok.m` vrijede i kad se uči vlastiti materijal; ondje „gradivo" znači *ono što učiš*,
   ne *ono što smo objavili*. Landing (`how.2.p`, `sec.modes.title`, `mode.learn.p`) opisuje javni katalog i
   ostaje kakav jest. Dijeljen niz točan u oba svijeta jeftiniji je od dva koja se moraju držati usklađena.

   **Engleski ostaje „folder"** (Leon) — *ne* „shelf". Metafora se **lokalizira, konvencija ne**: engleskom
   korisniku „folder" je odmah razumljiv, dok hrvatski dobiva topliju i prepoznatljiviju riječ. Namjerna
   asimetrija, ne propust u prijevodu — nemoj je „ispravljati" pri idućem prolasku kroz `js/i18n.js`.
2. **Mobilno autorstvo ide preko korisnikovog AI-a (MCP), ne preko editora na dodir.** Podjela uloga:

   | | računalo | mobitel |
   |---|---|---|
   | učenje | da | da |
   | autorstvo **rukom** | **„brutalan" editor** (Leonov izraz) — nosi diferencijaciju | ne |
   | autorstvo **preko AI-a** | gumb → spoji svoj AI | gumb → spoji svoj AI |

3. **AI-gumb OSTAJE — i na računalu i na mobitelu — ali mijenja značenje.** Nije *„mi generiramo umjesto tebe"*,
   nego *„ovo te spaja s AI-em kojeg već koristiš"*. Korisnik svom AI-u donese kontekst (bilješke, PDF,
   predavanje), a taj AI piše u njegovo stablo kroz MCP.

**Izvedene posljedice (ne odluke — proizlaze iz gornjeg).**
- **Današnji tekst gumba je pogrešan i mora se promijeniti.** [`studio.js:235-237`](../../js/studio.js#L235-L237) obećava
  *„Napiši samo Learn — kartice, kviz i dopuni nastaju automatski"* uz `disabled` gumb *„Generiraj iz Learna"*.
  To je **druga značajka** (automatska generacija iz Learna) od one koja je odlučena (spajanje vlastitog AI-a).
- **Jedna radnja, dva ulaza.** Gumb danas živi u inspektoru Studija — jedinoj površini koje na mobitelu neće biti.
  Na mobitelu mora stajati ondje gdje mobilno autorstvo počinje: **„Moji materijali"** na profilu
  (`css/my-materials.css` već ima `@media (max-width: 640px)`). Projektirati kao **jednu radnju s dva ulaza**,
  da se ne izgradi dvaput.
- **„Spoji direktno" ovisi o tuđem klijentu, ne o nama.** Najbolji put je dubinska poveznica / instalacija
  konektora u korisnikovoj AI-aplikaciji, ispravan mehanizam je OAuth, a **zajamčen** put je kopiranje URL-a i
  koda. Gumb se projektira tako da mu je *najbolji* put dubinska poveznica, a *sigurnosni* kopiranje —
  besešavnu verziju ne smijemo obećati jer je ne kontroliramo.
- **MCP ne dobiva nijedan nov put upisa.** Koristi postojećih 7 owner-scoped RPC-ova (ADR-024 je to predvidio).

**Invarijante MCP-a (zapisati sad, dok je jeftino).**
- MCP alati **nikad** ne izlažu javni katalog ni `is_admin()` — samo čvorove vlasnika.
- MCP glumi **korisnika** (njegov JWT), **nikad `service_role`** (ADR-016). Iznad korisnika = jedan bug čita svima sve.
- Time je domet prompt-injectiona iz korisnikovog PDF-a **njegovo vlastito stablo** — ne katalog, ne tuđi
  materijali. To svojstvo je posljedica „dva svijeta" (ADR-024) i mora se čuvati, ne potrošiti.
- Mobilni MCP znači **hostani** MCP (stdio-spike `mcp-admin/` je lokalan i read-only → mobitel do njega ne dolazi).
  Jedini sankcionirani dom = **Supabase Edge Function** (ADR-016), što je i spike-ov vlastiti sljedeći korak.

**Preporuka izvedbe (Claude, nije Leonova odluka).** MCP **ne ide gore** u redoslijedu. Alat koji piše kartice i
kvizove u model u kojem se oni još ne mogu ni autorirati ni učiti (rupe iz ADR-025) gradi cijev prema
nedovršenom spremniku. Redoslijed ostaje: **dovrši model → pa MCP.** Gumb do tada ne smije lagati.

---

## ADR-025 — Osobno gradivo: osam presuda o dosegu (vježbe, dijeljenje, napredak, boje, opseg)
**Datum:** 2026-08-07 · **Status:** ✅ ODLUČENO (Leon, odgovori na izravna pitanja) · **Dokument:** [ARCHITECTURE.md](../architecture/ARCHITECTURE.md)

**Kontekst.** ADR-024 je presudio *gdje* osobno gradivo živi, ali ne i *dokle seže*. Posljedica: fazni plan je
isporučio instalacije (baza, stablo, editor, produkcija) a da nitko nije zapisao **što korisnik mora moći
napraviti**. Zato je bilo moguće proglasiti plan ispunjenim dok korisnik ne može napraviti nijednu karticu.
Ove su odluke donesene prije pisanja arhitekture, upravo da se to ne ponovi.

**Odluke.**
1. **Vježbe — ODGOĐENE, i tražit će vlastito rješenje.** Vježba je danas kôd (`generate()`), a UGC ne može
   autorirati kôd. Leon: *„morat ćemo osmislit potpuno poseban način kako ćemo to napraviti."* → **nije**
   proširenje sadašnjeg engine-a, nego zaseban budući spec. **U sučelju se ništa ne obećava.**
2. **Dijeljenje — privatno sad, model spreman.** Owner-RLS ostaje, ali se projektira tako da se dijeljenje
   kasnije doda bez migracije. **Zapisana cijena:** slike su vezane na vlasnički prefiks putanje, pa primatelj
   podijeljenog gradiva **ne bi vidio slike** — to je jedina stavka koju spremnost ne pokriva besplatno.
3. **Napredak — isti kao za katalog** (jedna statistika, jedna sinkronizacija). **Košta ništa:** `progress` je
   generički key-value, pa osobno gradivo koristi ključ `node:<uuid>` bez promjene sheme.
4. **Boje — nasljeđuju se od sekcije, smiju se pregaziti.** Odsutna vrijednost znači *naslijedi*, ne *bez boje*.
   Blok i kartica danas **nemaju** polje boje → stvarno proširenje sheme, renderera i editora.
5. **Svjetovi se NE miješaju.** Bez kopiranja kataloga u osobno gradivo, bez veze na original.
6. **Korisnik je BILO TKO** — ne samo student FMTU-a. Prvi ekran nakon prijave mora ravnopravno nuditi
   „uči" i „gradi"; javni katalog je samo jedan sadržaj koji nudimo.
7. **Opseg stabla nepoznat → projektirati da izdrži.** Pretragu i lijeno učitavanje grana **planirati, ne graditi**;
   ograničenja zapisati kao mjerljive brojke.
8. **Kvote — granicu zapisati sad, provesti kasnije.** Danas postoji samo 5 MB po datoteci.

**Posljedica** (zapisana 2026-08-05, **✅ ISPUNJENA** — v. `docs/archive/`)**.** Sljedeći posao tada nije bio frontend redizajn nego **dovršetak osobnog gradiva**: kartice/kviz/dopune
se nisu mogle napraviti od nule (`presentModes` crta mod samo ako je niz neprazan) i iz vlastitog materijala se
**nije moglo učiti** (`initStudyPage` je vukao isključivo iz kataloga).
⚠️ **Ovo je povijesno obrazloženje, ne nalog** — oboje je izvedeno i na produkciji; tekući redoslijed zna
`CLAUDE.md` §Gdje smo. ADR-ovi se ne prepravljaju, ali se ispunjena posljedica **označi**, jer inače
sljedeća sesija pročita „sljedeći posao je…" kao uputu.

---

## ADR-024 — Osobni UGC-graditelj = ZASEBAN otok (`nodes` stablo, owner-RLS), a ne proširenje kataloga
**Datum:** 2026-08-02 · **Status:** ✅ ODLUČENO (Leon) · **Dokument:** `docs/archive/CREATE_BACKEND_SPEC.md` v3 · **F1 izveden na STAGINGU**

**Kontekst.** B1 („predmet od nule") blokirao je editor na 4 sloja: UI-stub (`studio.js:133`), draft-ops bez
`addSubject/addLesson`, `publish_document` radi SAMO `UPDATE` (`publish_missing_row`), a struktura kataloga je
statički kôd. Prva dva nacrta spec-a (v1/v2) rješavala su to **proširenjem javnog kataloga** (`subjects` tablica +
`create_subject` + dual-read strukture). Senior-revizija našla 5 rupa, od kojih je najveća bila **guranje async
baze u sinkroni studentski vrući put**. Leon je zatim presudio smjer: korisnik gradi **vlastito ugniježđeno stablo**
(„nešto unutar nečega"), **privatno na profilu, BEZ objave na javni katalog**; platforma je **za SVE** (FMTU =
odskočna daska), matura izbačena.

**Odluka.** Osobni graditelj je **zaseban otok**, ne proširenje kataloga:
- **`nodes`** — self-referencijalno stablo (`folder` | `study`), `owner_id`, `position`, soft-delete. Korisnik
  imenuje i gnijezdi po želji → entitet je **institucijski-agnostičan** (nema `subject`/`program`/`faculty` pojmova).
- **`node_content`** — payload study-čvora u **istom obliku koji editor VEĆ uređuje** + `version` (optimistic concurrency).
- **`node_content_versions`** — append-only audit (STARO stanje prije upisa), zrcali `content_versions`.
- **Sigurnost:** `anon` nema NIŠTA · `authenticated` ima **SAMO SELECT** (RLS filtrira na vlasnika) · **svaki upis ide
  kroz SECURITY DEFINER RPC s owner-checkom**. RLS write-policyji ostaju kao druga brava.
- **Javni katalog, 22 predmeta, studentski vrući put i `publish_document` = NEDIRNUTI.**

**Zašto ovako (a ne v1/v2).** Nestaje najveći rizik (async u sinkroni katalog), nema grandfather-migracije
postojećih predmeta, nema split-brain strukture, a privatnost je jednostavan i tvrd invarijant (`owner_id = auth.uid()`)
umjesto matrice `visibility × status × role`. Duh ADR-018 („student uploada PODATKE, nikad KOD") je očuvan.

**Posljedice.**
- Editor se veže na čvor kroz **`SokratAdmin.studioBridge`** — mijenjaju se samo 3 IO-metode (`setLesson`/`enter`/`publish`);
  draft-store, block-editor, media i renderer ostaju **nepromijenjeni** (~100 % reuse).
- **Dva publish-puta** svjesno koegzistiraju: `publish_document` (admin → javni predmeti) i `publish_node`
  (vlasnik → osobni čvor). Isti kalup (FOR UPDATE + `base_version` + validacija payloada), različita autorizacija.
- **Objava/dijeljenje na javni katalog = kasnija faza** i tražit će vlastitu odluku (moderacija, sigurnost).
- **MCP** kasnije koristi **iste** `create_node`/`publish_node` — vanjski AI su samo još jedna vrata na isti backend.
- Ograničenje po dizajnu: dijete smije visjeti samo o `folder`-u (study-čvor = list), payload je jedan po čvoru
  (bez M1/M2/Final kompozicije). Lakše je kasnije popustiti nego stegnuti.

---

## ADR-023 — Prvi suradnik: content-staza kroz PR+CI, least-privilege, ADR-022 pull-forward
**Datum:** 2026-07-09 · **Status:** ⚰️ **OTKAZANO 2026-09-04 (Leon)** — suradnja je prekinuta, pa
t.1–t.4 (uloge, granice, pristupi, dnevnik-pravila) **više ne opisuju ništa živo**. **t.5 stoji i
dalje** (ADR-022 pull-forward = U2.5 je izveden 2026-07-11 i živi u `data/catalog.js`) — ta cigla
nije ovisila o suradniku nego o rasporedu. · **Dokument:** `docs/archive/TEAM.md` (arhiviran istog dana)

> **Što ostaje nakon otkazivanja:** sedam HR predmeta koje je ta staza proizvela **živi su i na
> produkciji**; HR-ploča (`docs/subjects/README.md` §HR) od 2026-09-04 nema vlasnika. Odluka se ne
> briše nego dobiva pečat, jer objašnjava zašto postoje branch-protection, least-privilege ključevi
> i `content-review` agent — mehanizmi koji su nadživjeli povod.

**Izvorni status:** ✅ ODLUČENO (korisnik 2026-07-08/09)
**Kontekst:** content-suradnik (student prog. inž., Algebra) pridružuje se kao content-suradnik: HR program do pune 2 godine
(prijevod + HR materijali), zatim MUT/MOR smjerovi. Prvi suradnik ikad → treba model koji ubrzava, a **ne može srušiti sustav**.
**Odluka:**
1. **Uloge:** Leon = vlasnik/platforma, JEDINI mergea u `main` (merge = deploy!); suradnik = content na granama + PR;
   oba rade sa svojim Claudeom (role-router u CLAUDE.md preko `git config user.name` → suradnikov Claude čita TEAM.md §2).
2. **Tvrde granice** (TEAM.md §2): Suradnik smije SAMO `data/<subj>-hr/` + export:json + catalog-unos + svoj redak statusne ploče +
   bump ISKLJUČIVO kroz `npm run bump`; sve ostalo (js/css/engine, EN predmeti, docs, infra) = zabranjeno. Preporuka: GitHub
   branch-protection na main (PR + CI obavezni) → kršenje tehnički nemoguće, ne samo zabranjeno.
3. **Least-privilege pristupi:** vlastiti Anthropic ključ (Leon financira, budget-cap); BEZ Supabase/`service_role`/TEST_ADMIN/Vercel.
4. **Kvaliteta:** „prijevod je BAZA, HR materijali su AUTORITET" (pouka te2) — obavezan korak u definition-of-done (TEAM.md §5);
   dnevnik-pravila protiv drifta (suradnik piše samo subjects-ploču + PR-opis; PROGRESS/CHANGELOG pri mergeu piše Leon/Claude).
5. **ADR-022 se POVLAČI NAPRIJED = cigla U2.5** (odmah iza U1+U2 u EDITOR_PLAN.md §12; umjesto „nakon F4"): preduvjet MUT/MOR (S7).
   Tri tvrda uvjeta: nakon U1+U2 (migracije uzastopno, NIKAD isprepleteno) · aditivna/dual-mode izvedba · puni gate + staging.
   Obrazloženje: identitet PRIJE write-puta je zdraviji redoslijed (draft/editor sjedaju na stabilan temelj); ne-povlačenje
   ima veći rizik (suradnik bi MUT/MOR gradio copy-pasteom = dupliciran sadržaj + rascjepkan napredak).
**Posljedice:** sadržajna staza odmrznuta za suradnika (ADR-018 pauza bila kapacitetna — platforma-first za NAS ostaje);
dvije paralelne pruge (U-staza platforma · S-staza content) s jednom ovisnošću (S7←U2.5). CI gateovi (F1) postaju
automatska obrana od suradničkih grešaka. Nadopunjuje ADR-012 (HR klon), ADR-018 (platform-first), ADR-022 (identitet).

## ADR-022 — Identitet predmeta preko programa i fakulteta: placement ≠ sadržaj, prefiks fakulteta, dijeli-unutar-fakulteta
**Datum:** 2026-07-06 · **Status:** ✅ ODLUČENO (korisnik) · **Implementacija: povučena NAPRIJED = cigla U2.5** (EDITOR_PLAN.md §12; bilo „nakon F4" — resekvencirano ADR-023 t.5, 2026-07-09)
**Kontekst:** Rast ide preko **HR 1. godine za 3 smjera** (Menadžment u Hotelijerstvu / u Turizmu / održivog razvoja), koji **dijele „vezne" predmete**
(isti kolegij u više smjerova). Kasnije i drugi fakulteti. Korisnik strahuje da baza „pukne" kad se isti predmet pojavi na više mjesta
(„matematika na drugom fakultetu"). Ovo je i odgovor na #5 (grubi-blob/model podataka): pitanje je zapravo **identitet sadržaja vs mjesto prikaza.**
**Odluka:**
1. **Dvije odvojene osi:** **placement** (hijerarhija fakultet→smjer→godina→semestar = GDJE se predmet prikazuje u Browse-u) ≠ **identitet sadržaja** (kartice/kviz/fill/learn = ŠTO predmet nosi). Hijerarhija se NIKAD ne krši — svaki predmet ima eksplicitne koordinate; ali jedan sadržaj može biti postavljen na VIŠE koordinata.
2. **Kanonski id s prefiksom fakulteta:** `<fakultet>-<predmet>-<jezik>` (npr. `fmtu-matematika-hr`). Različit fakultet → različit id → **fizički nemoguća kolizija.**
3. **Dijeljenje SAMO unutar istog fakulteta, među smjerovima, i SAMO kad je silabus identičan** (jedan sadržaj, više placement-koordinata → uređuješ jednom). Kad se sadržaj razlikuje → **dupliciraj** (`fmtu-matematika-mor` zasebno). **Preko fakulteta = UVIJEK dupliciraj.**
4. **Napredak prati identitet sadržaja:** dijeljeni predmet = jedan `storageKey` (naučiš jednom = vrijedi u svim smjerovima); duplicirani = vlastiti `storageKey`.
5. **`verify-catalog.js` gate čuva invarijante** (jedinstveni id-jevi; predmet u više programa smije SAMO ako mu se sadržaj+storageKey identično razrješavaju) → „da se sijebe" je crveno PRIJE deploya. Ovo je sigurnosna mreža, ne oprez.
6. **Čist maping na bazu (F4+):** jedan red sadržaja po kanonskom id-u + tablica placementa (predmet → fakultet/smjer/godina/semestar, više redaka za dijeljene). Prezentacijski naziv („Matematika") ostaje ljudski, id je interni.
**Posljedice:** Zajednička 1.-god jezgra se održava jednom umjesto ×3; nula kolizija preko fakulteta; UGC-/multi-fakultet-spremno. Detaljan model + primjeri + verify-pravila: `docs/architecture/CATALOG_ARCHITECTURE.md`. Nadopunjuje ADR-002 (hijerarhija), ADR-003 (catalog izvor istine), ADR-012 (HR klon), ADR-021 (F4). [[hrv-program]] [[content-roadmap-sequencing]]

---

## ADR-018 — Platforma-first SKROZ do UGC-a prije sadržaja; UGC dizajniran u CRUD ali otključan tek nakon F6
**Datum:** 2026-07-05 · **Status:** ✅ ODLUČENO (korisnik)
**Kontekst:** Razmatrali smo dvije stvari: (a) kada se vratiti dodavanju sadržaja, (b) treba li admin CRUD (F4) odmah omogućiti
studentima da uploadaju svoj sadržaj (UGC). Korisnik je htio da studenti dodaju sadržaj (skaliranje preko jednog autora = cijela vizija),
ali je osjetio da to „razbija plan". Razbija — jer bi „student-upload odmah" preskočio **F6 (pred-UGC sigurnost)** koja postoji baš da UGC bude siguran.
**Odluka:**
1. **Puni redoslijed: F3 → F4 (CRUD) → F5 (SRS) → F6 (sigurnost) → UGC → tek onda nazad na SADRŽAJ.** Sadržaj kroz datoteke i dalje radi
   (dual-read), ali svjesno se NE vraćamo dodavanju dok temelj + UGC ne stoje. *(Mijenja raniju ideju „sadržaj se može nastaviti već nakon F3/verifiera" — korisnik bira potpuni temelj prvo.)*
2. **F4 CRUD se DIZAJNIRA UGC-spreman od početka** (multi-user, RLS, vlasništvo retka, `draft→published` stanja, uloge) — jer je jeftinije nego
   naknadno retrofitati. **ALI student-upload NE ide živ prije F6.** Isti authoring sustav služi i autoru (admin) i studentima; „student gate" se upali kad su spremni:
   **DOMPurify** (saniziraj SAV korisnički HTML — learn se ubacuje `innerHTML`, inače XSS na prave studente) + **moderacijski red** (draft → pregled → objava) + **CSP**.
3. **Tvrda linija: student uploada PODATKE (kartice/kviz/fill/learn, saniziran HTML), NIKAD KOD.** Vježbe (JS `generate()`, BUG-012) = ostaju autorske / deklarativni sandbox (F6 6D). Student nikad ne ubacuje izvršni kod.
**Posljedice:** Jedan reusable authoring podsistem umjesto dva; UGC nije naknadna krpa nego otključavanje. Sigurnosni sloj (F6) je nepovrediv preduvjet živog UGC-a.
Precizira ADR-013 (F4 flip) + F6 plan. [[foundation-pivot]]

---

## ADR-019 — Maksimalno-rizične cigle (Service Worker) autoriraju se na FABLE modelu
**Datum:** 2026-07-05 · **Status:** ✅ ODLUČENO (korisnik) · prvi slučaj: SW 3A.3 + deploy
**Kontekst:** Service Worker je najrizičnija cigla (ostaje u pregledniku korisnika, može servirati stari keš „zauvijek", teško se izbacuje).
Korisnik želi da se SW radi na **Fable** modelu — ne zato što je Opus loš, nego jer **drugi model = jeftin sigurnosni sloj** (svjež pogled hvata
što prvi ne). 3A.1/3A.2 su već napisani + testirani (Opus, Playwright 173/0) → Fable dobiva **testiranu bazu za kritički pregled**, ne prazan papir.
**Odluka:** Za **maksimalno-opasne, teško-reverzibilne cigle** (SW; kasnije npr. source-of-truth flip u F4) koristi se **drugi model (Fable)** kao neovisna provjera/izrada.
Prebacivanje modela radi korisnik (model-selector); asistent se ne prebacuje sam. Handoff = čist commitani + testirani checkpoint.
**Posljedice:** +malo režije (prebacivanje, ponovni kontekst) za osjetljive cigle — prihvatljivo za rizik koji nose. Nije pravilo za svaku ciglu, samo za one gdje je cijena greške velika i trajna.

---

## ADR-020 — Točnost sadržaja: dvo-ključni „verify" pipeline (Sonnet piše → Opus provjerava/označava → čovjek presudi)
**Datum:** 2026-07-05 · **Status:** ✅ ODLUČENO (gradi se u fazi sadržaja, ne sad)
**Kontekst:** Najveći tihi rizik proizvoda: quiz `correct` indeks / fill odgovor može biti **činjenično kriv** (dio sadržaja generiran Sonnetom). Deterministički
validator provjerava da je indeks u RASPONU, NE je li STVARNO točan. Kriv ključ uči studente krivo → reputacijski rizik. Postojećih 18 predmeta su spot-checkani, NE iscrpno.
**Odluka:** Pipeline `Sonnet (piše) → Opus (SAMO provjerava + označava krive) → čovjek (finalna riječ)`:
- **Opus verifier NE prepisuje** — čita `izvorni tekst teme` (iz `topics.json`) + `generirano pitanje/označen odgovor` → vraća **samo sumnjive stavke** (`[{stavka, zašto}]`),
  structured output, mali `max_tokens` → **potrošnja minimalna** (presuđuje, ne piše).
- **Ograničen na najskuplji rizik:** quiz `correct` + fill odgovori (+ flagrantne flashcard greške). Ne troši Opus na ono što deterministički gate već hvata.
- **MORA imati izvorni materijal** (ne nagađa iz zraka). Reusable cigla `scripts/verify-subject.js` u generatoru; **retroaktivno na svih 18 predmeta** (jednokratno → triaža flagova).
**Posljedice:** Novi (i stari) sadržaj dobiva neovisnu semantičku provjeru uz minimalan trošak; ljudski pregled ostaje finalni, ali fokusiran. Detaljan plan: `content/CONTENT_GENERATOR.md`. Nadopunjuje ADR-010 (generator).

---

## ADR-021 — F4 Admin CRUD: direktni RLS-write, `profiles.role` admin, grubi blob, stupnjeviti flip
**Datum:** 2026-07-06 · **Status:** ✅ ODLUČENO (korisnik)
**Kontekst:** F4 = uređivanje sadržaja kroz sučelje bez deploya (custom, ne CMS; ADR-013). Temelj već daje: `subject_content` (public-read, **bez write-policya**),
auth (email+lozinka), ContentRepository šav (S1), JSON Schema (2A.1), Web Components (S4). Nedostaje: write-path, admin identitet, CRUD UI, export-generator, safety-net.
Razmatrane opcije za svaku os (write-path / identitet / granularnost / prva cigla) — korisnik izabrao preporučeni put.
**Odluka:**
1. **Write-path = direktno preglednik → Supabase pod admin-JWT + admin-only RLS na `subject_content`.** Nula server-koda; po **ADR-016** admin-write pod JWT+RLS **ne treba `service_role`** → smije direktno. (Edge Function / Vercel `/api` odbačeni kao nepotrebna složenost.)
2. **Admin identitet = `profiles(user_id, role)` tablica**; RLS provjerava `role='admin'` preko SQL `is_admin()`. `role` se mijenja **SAMO preko dashboarda/`service_role`** (klijent se ne može sam promaknuti — nema client update-policya na `role`). UGC-spremno (ADR-018), RLS-testabilno (1E obrazac). (Odbačeno: hardkodiran UID = nije UGC-spremno; `app_metadata` claim = neizravnije.)
3. **Model podataka = grubi blob** (postojeći `subject_content`: 1 red = 1 window-var = cijeli kolokvij). Edit = read-modify-write `jsonb`. **Read-path netaknut**; verzija = snapshot blob-a (trivijalno). Normalizacija (tablice po kartici) odgođena dok UGC ne zatreba.
4. **Safety-net od PRVE cigle:** `content_versions` (append-only snapshot na svaki write = **undo + audit „tko/kad"**, 4E.1+4E.2 odmah) + **dry-run diff** prije flipa (4E.3).
5. **Source-of-truth flip = stupnjeviti**, predmet-po-predmet, **tek nakon čistog dry-run diffa**; dual-read već nosi fallback → reverzibilno. NE „big bang".
6. **Prva cigla = jedna kartica end-to-end** (najtanji vertikalni rez: uredi→spremi→RLS→verzija→live).
**Izuzetak:** vježbe ostaju JS moduli (**BUG-012**) — CRUD ih ne dira.
**Posljedice:** Najjeftiniji/najsigurniji put; nula nove infrastrukture osim 2 tablice; UGC-spreman; poštuje ADR-013/016/018. Detaljan brick-slijed: `docs/archive/CRUD_PLAN.md`. [[foundation-pivot]]

---

## ADR-017 — Cache-busting: jedan uniformni auto-bumpani token za cijelu aplikaciju (ne per-file content-hash)
**Datum:** 2026-07-04 · **Status:** ✅ ODLUČENO + 3C.1 IMPLEMENTIRANO (grana `foundation/f3`; F3 3C)
**Kontekst:** Vercel servira `js`/`css`/`data` s `immutable` cacheom (1 god) → svaka izmjena traži novi `?v=` token, inače je deploy nevidljiv
(BUG-004). Tokeni su bili **ručno** održavani na ~92 mjesta (5 HTML + `styles.css` @import + `manifest.json`) + `CONTENT_VERSION` (data), s
**23 različite vrijednosti** u opticaju → zaboraviti podskup je bilo trivijalno. F3 3C traži automatizaciju. Pitanje: **jedan uniformni token
(svi isti, bumpani zajedno) ILI per-file content-hash (svaki fajl svoj hash → busta se samo promijenjeni)?**
**Odluka:** **Jedan uniformni token za cijelu aplikaciju**, generiran/zamijenjen skriptom `scripts/bump-version.js` (`npm run bump`), +
**konzistencijski CI gate** (`npm run bump:check`: svi tokeni moraju biti identični; drift = crveno). Token = `YYYYMMDDHHMMSS` timestamp
(monoton, čitljiv „kad je deployano"). Format prelazi s dotadašnjih 8-znamenkastih (`20260709`) na 14-znamenkasti timestamp — **sigurno jer se token
nigdje ne uspoređuje numerički u runtimeu** (opaki cache-buster, samo string).
**Obrazloženje (zašto uniformni, ne content-hash):**
1. **Jednostavnost = pouzdanost.** Uniformni bump je find-replace regexom → nema mapiranja „koji fajl referencira koji asset", nema rubnih slučajeva
   ugniježđenih `@import`-a. Manje koda = manje bugova u alatu koji čuva od bugova.
2. **Nezaboravljiva invalidacija.** „Svi isti" je invarijanta koju CI trivijalno provjerava; content-hash nema takvu jednostavnu globalnu provjeru.
3. **Trade-off prihvatljiv na ovoj skali.** Mana uniformnog: svaki deploy busta SVE cacheve (i nepromijenjene fajlove) → povremeni re-download ~par
   stotina KB. Za statični site s ~30 JS + 1 (budući) CSS bundle = zanemarivo; **Service Worker (3A) ionako lokalno kešira** pa je mrežni trošak još manji.
   Content-hash bi uštedio taj re-download, ali po cijenu bitno složenijeg alata — ne isplati se dok smo mali.
**Posljedice:** Cache-bump je sada `npm run bump` (jedan potez), a `bump:check` u CI-u čini **parcijalni** zaborav nemogućim (BUG-004 klasa zatvorena za
taj slučaj). **Ostaje rupa:** „zaboravio pokrenuti bump UOPĆE" (svi tokeni ostanu stari-uniformni → check prolazi) — zatvara se u **3C.2**: git-diff
freshness gate (promijenjen cache-bustani asset ⇒ token mora napredovati vs baza) ILI, čišće, **auto-bump na Vercel deploy-u** (nula discipline), što
se prirodno veže uz 3B build-korak. `CONTENT_VERSION` (data cache-buster) namjerno **uključen** u isti broj → „jedan broj za cijelu aplikaciju".
Ručni per-file tokeni (ADR-015 #3, „čeka F3") = ovime riješeni. [[foundation-pivot]]

---

## ADR-016 — Privilegirane operacije (`service_role`) → Supabase Edge Functions, NIKAD Vercel
**Datum:** 2026-07-04 · **Status:** ✅ ODLUČENO (implementacija odgođena; prvi konzument = brisanje računa)
**Kontekst:** App treba „Obriši račun" (GDPR pravo na zaborav — trenutno samo ručno mailom + „Delete cloud data" gumb
koji briše samo `progress` retke). Brisanje `auth.users` retka zahtijeva **`service_role`** ključ (`auth.admin.deleteUser()`) —
ključ koji **zaobilazi SVE RLS = root nad bazom**. Danas taj ključ postoji SAMO u lokalnom `.env` (migracijske skripte);
nijedan deployani sustav ga nema → Vercel je „inertan" (statičke datoteke, proboj ne curi ništa što šteti bazi). Pitanje
(sigurnost = najvažnija): gdje smije živjeti taj ključ? Razmatrano: **(A) Supabase Edge Function** (Deno, ključ u Supabase
secrets) vs **(B) Vercel `/api`** (ključ u Vercel env). ADR-001/008 su generički rekli „Vercel Functions + Supabase" — ovo precizira.
**Odluka:** **(A) Supabase Edge Function** za sve što traži `service_role`. Trajno pravilo:
> **Sve što traži `service_role` → Supabase Edge Function. Sve što može ići pod korisnikovim/anon JWT-om uz RLS → bilo gdje (uklj. Vercel `/api`).**

**Obrazloženje (sigurnosno):**
1. **Ko-lokacija tajne s resursom** — `service_role` ostaje unutar Supabasea (isti dvorac kao baza koju može uništiti); ne pretvaramo inertni Vercel u nositelja DB-root moći.
2. **Manje sustava koji mogu iscuriti ključ** — jedan (Supabase) umjesto dva (Supabase + Vercel env/build-logovi/npm supply-chain).
3. **Nativna provjera identiteta** — JWT-verify i admin-akcija u istom runtimeu; nema ručne JWT-validacije na Vercelu (izbjegnut klasičan „obriši tuđi račun" bug ako se vjeruje `user_id` iz body-ja umjesto iz tokena).
4. **Blast-radius** bilo kojeg Vercel incidenta ostaje „statičke datoteke" (kao danas).
**Cijena / posljedice:** +1 deploy-toolchain (Supabase CLI + Deno) za malu, rijetko-mijenjanu funkciju — prihvatljivo za maksimalno-opasnu, niskofrekventnu operaciju. F4 (Admin CRUD) i dalje smije koristiti Vercel `/api` za operacije pod RLS-om; `service_role` **nikad ne ulazi u Vercel.** ⚠️ Pri gradnji provjeriti postoji li do tada **nativni Supabase „delete self" RPC** (tada ni Edge Function ne treba `service_role`); odluka „gdje živi privilegirani ključ" vrijedi bez obzira. Detaljan dizajn: [BACKLOG.md](./BACKLOG.md) §Brisanje računa. [[foundation-pivot]]

---

## ADR-015 — Tech-debt triage: „briše li ga F4?" (accounting→JSON DA; root-lokacije & Supabase-sleep NE)
**Datum:** 2026-07-03 · **Status:** ✅ ODLUČENO + accounting-dio IZVRŠEN (grana `foundation/f2a-accounting`)
**Kontekst:** Pregled cijelog projekta (2026-07-03) iznio je 4 „iskrene" stavke tech-duga. Pitanje: koje popraviti,
kojim redom. Ključni princip presude: **F4 (Admin CRUD → baza autoritativna, datoteke = generirani export) je
gravitacijski centar temelja** — svaku stavku mjeri prema tome hoće li je F4 ionako učiniti bespredmetnom.
**Odluka (triage):**
1. **Accounting → JSON dual-read = NAPRAVITI (akumulira se).** Bio je jedini predmet izvan JSON supstrata (17/18).
   F4 je „dual-read, predmet-po-predmet" → 1 nemigriran predmet = specijalni slučaj kroz cijelu migraciju.
   Dovršetak na **18/18** znači F4 kreće s uniformne baze. Mehanički, reverzibilno, format-only (0 diranja sadržaja →
   ne aktivira „zasićenost računovodstvom"). **✅ IZVRŠENO:** `export:json accounting` (3 JSON, round-trip 0) +
   `dataFormat:'json'` u catalog + catalog.js token `20260702→20260704` + novi `dual-read.spec` accounting test.
2. **Root `data-*.js` lokacije (12 datoteka: marketing/geography/econ-hospitality/food-nutrition) = NE popravljati.**
   Čisto kozmetika (krši „mapa po predmetu", ADR-006), ali funkcionalno svejedno (JSON mirror + dual-read rade).
   **F4 čini datoteke generiranim exportom → exporter ih piše gdje god, nered se riješi sam.** Premještanje sad =
   bacanje posla + diranje 4 radna predmeta za 0 dobiti. Svjesno otpisano do F4.
3. **Ručni per-file cache-tokeni = NE prčkati ručno; čeka F3.** Prava klasa rizika (BUG-004), ali rješenje je
   **auto version-bump** koji F3 već planira — ubija cijelu klasu trajno. Ad-hoc ručni rad = pola posla. Odgođeno na F3.
4. **Supabase free-tier uspavljivanje (~7 dana) = PRIHVATITI (nije inženjerski zadatak).** Fallback na datoteke je
   točno ponašanje; padnu samo login/sync do restore-a. Alternativa (Pro $25/mj) već odbačena. Revidirati tek uz monetizaciju.
**Posljedice:** JSON supstrat je sad **18/18 uniforman** (spreman za F4 flip bez specijalnih slučajeva). Stavke #2/#4
prestaju biti „trebamo li?" teret — eksplicitno su otpisane s razlogom. Sljedeći korak (nepromijenjen): **F2 2D (Web Components).**
[[foundation-pivot]]

---

## ADR-014 — Engineering standardi temelja: CI/CD-gated, type-check bez build-a, Web Components, monitoring
**Datum:** 2026-06-29 · **Status:** ▶ ODLUČENO, izvršavanje kroz [FOUNDATION_PLAN.md](../archive/FOUNDATION_PLAN.md) (Faze 1–2)
**Kontekst:** „Platforma-first" odluka (vidi ADR-013) traži da projekt postane **profesionalniji, reliable, WOW** —
ne samo „radi". Trenutno: testovi se pokreću RUČNO, nema CI-a, nema type-provjere, UI se gradi ad-hoc `innerHTML`
stringovima, nema error-monitoringa. Sve to skalira loše kako dolaze CRUD/UGC/tutor.
**Odluka:** Četiri presjećna standarda, uvode se rano (Faza 1–2), **bez napuštanja „vanilla/no-build" etosa:**
1. **CI/CD gate (GitHub Actions + Vercel preview deploys):** svaki push pokreće `validate:content`+`verify`+`test:unit`+
   Playwright; crveno = ne ide u `main`. Vercel preview po grani = pravi staging prije produkcije.
2. **Type-safety bez build-a:** JSDoc tipovi + `// @ts-check` + `tsc --checkJs --noEmit` **samo kao CI checker**
   (nula runtime/build promjene; browser i dalje vrti čisti JS). Uvodi se **modul-po-modul**, ne globalni strict odmah.
3. **Reusable UI = Web Components** (custom elements, **light-DOM** bez Shadow DOM) umjesto ad-hoc `innerHTML` —
   native, framework-free, riješi i `innerHTML`/XSS brigu kontroliranim renderom. Uvodi se inkrementalno (toast → modal → …).
4. **Error monitoring** (Sentry free ILI mini-logger → Supabase) — app zna kad pukne kod korisnika.
**Posljedice:** Temelj prestaje biti samo „CRUD-ready" i postaje **CI-gated, tipiziran, komponentno-reusable, monitoran.**
`tsconfig.json`/`.github/workflows/ci.yml`/`typescript` devDep su jedini novi alati — svi su dev/CI, ne runtime.
Odbačeno: frontend framework, runtime build-step, CMS (vidi ADR-013). [[foundation-pivot]]

**Dodatak (2026-06-29) — razina podignuta na „brutalnu" (korisnik: „ne zdrav nego jeben i brutalan"):** 4 standarda gore
dobivaju **TVRDE gateove + 5 konkretizacija** (detalji [FOUNDATION_PLAN.md](../archive/FOUNDATION_PLAN.md) §7):
1. **Perf/a11y/visual = TVRDI gateovi** (Lighthouse budžeti Performance≥0.95/LCP≤2s + axe-core 0 serious + Playwright `toHaveScreenshot` baseline) — **blokada, ne upozorenje**; prošlost ne može truniti (BUG-015 nemoguć).
2. **Monitoring = Sentry s release-trackingom** (git SHA), consent-aware — ne maglovit „mini-logger".
3. **RLS + migracije testirane na ephemeral Supabase branchu** u CI (RLS = dokazana, ne nadana).
4. **CRUD source-of-truth flip dobiva versioning + audit-log + dry-run diff** (undo/povijest/kočnica).
5. **SRS dobiva dizajn-dok PRIJE koda + FSRS** (2024+ algoritam), ne nabacani SM-2.
Trošak alata = **0 €** (sve free na ovoj skali). Svjesno NE: product-analytics (Posthog), framework, runtime build, microservices.

**▶ IMPLEMENTIRANO (2026-06-30 / 2026-07-01, sve LIVE):** **F1** = CI/CD (`.github/workflows/ci.yml`) + `tsc --checkJs` (scoped) + hardening + TVRDI gateovi 1D
(axe 0-serious, layout-guard, Lighthouse budžeti) + RLS-test. **F2 2E** = Sentry error-monitoring (`js/monitoring.js`→`window.SokratMonitor`): consent-gated
(isti gate kao GA), **Loader Script EU/DE** (`js-de.sentry-cdn.com`), **samo hvatanje grešaka** (Tracing/Replay/Logs isključeni), `sendDefaultPii:false`, release
`sokrat-study@20260699`; uživo verificiran. **Točka #4 (nadogradnja) = ISPUNJENA** (Sentry + release-tracking, ne mini-logger). **F2 2C (2026-07-02, grana `foundation/f2c`)** = **AppState (S3)**: SVI mutable globali iz config.js
(nav/cards/quiz/fill/session — 5 grupa) → `window.AppState` namespace, grupa-po-grupa s funkcionalnim testovima; config.js bez ijednog mutable `let`; `js/app-state.js` u typecheck scopeu. **⬜ Preostaje:** Web Components (S4, F2 2D) + pixel `toHaveScreenshot` (F3, treba Linux baseline).

---

## ADR-013 — Content arhitektura: podatak ≠ ponašanje + ContentRepository šav (source-of-truth)
**Datum:** 2026-06-29 · **Status:** ▶ ODLUČENO, izvršavanje kroz [FOUNDATION_PLAN.md](../archive/FOUNDATION_PLAN.md) (Faza 2, flip u Faza 4)
**Kontekst:** Sadržaj je trenutno **`.js` kod** (`window.X = {...}`, ponekad s funkcijama). To ne skalira: ne validira se
kao podatak, ne ide čisto u bazu/CMS, i izvor je BUG-012 (vježbe s `generate()`). Admin CRUD bi ovo obrnuo
(baza = istina), ali to je velika odluka koju treba donijeti SVJESNO, ne usput. Korisnik bira **platforma-first**.
**Odluka:**
- **Razdvoji podatak od ponašanja:** study sadržaj → **čisti JSON** (portabilan, validabilan); vježbe/generatori →
  **zasebni JS moduli** (kod, ostaju datoteke). To je najveći reusable potez i preduvjet svega.
- **Uvedi `ContentRepository` šav** (S1): jedno sučelje `getSubject/getLesson/listSubjects…` neovisno o izvoru;
  implementacije `FileRepo`(JSON) + `SupabaseRepo` iza istog sučelja, fallback ostaje. Prebacivanje izvora = config.
- **Ciljani model:** **baza = autoritativna u runtimeu, datoteke = generirani export** (commitane zbog gita/offline-a,
  više se NE uređuju ručno). Flip se izvodi u Fazi 4 (Admin CRUD), **jedan predmet odjednom uz dual-read** (loader
  čita i staro `.js` i novo `.json`) → nikad „big bang".
- **Admin CRUD = CUSTOM** (korisnik: „radio bih CRUD normalno"), NE CMS — ali tek nakon što su S1/S2 čisti, pa je build malen.
**Posljedice:** Svaki budući sadržaj (HR ×16, 3. god, UGC) rađa se u CRUD-spremnom formatu → nema velike kasnije
migracije. Vježbe ostaju izuzetak (BUG-012) — CRUD ih ne uređuje. Datoteke + git-povijest + offline fallback ostaju.
Odbačeno: i18n-u-sadržaju (ADR-012), CMS (Decap/Directus/Sanity — premda S1/S2 ostavljaju tu opciju otvorenom). [[foundation-pivot]]

**▶ IMPLEMENTIRANO (2026-07-01, LIVE — dio šava):** **S1 `ContentRepository` = `window.SokratContent`** (`js/content-repo.js`): `listSubjects/getSubject/isLessonComingSoon/loadLesson/isLoaded` —
tanki omotač koji objedinjuje 3 razbacana puta dohvata (catalog + `loadSubjectContent` + `getSubjectData`); `navigation.js` sada ide kroz njega. **NULA promjene ponašanja** (DB↔datoteka
fallback već u loaderu). „Podatak≠kod" već strukturno čuvan u loaderu (`scripts` vs `codeScripts`, BUG-012).

**▶ IMPLEMENTIRANO (2026-07-02, LIVE — S2 čisti JSON format, F2 2A):** study sadržaj **portabilan kao čisti JSON** — `data/json/<id>/<var>.json` (51 datoteka, 17/18 predmeta;
accounting odgođen). Strojni ugovor `schema/subject-content.schema.json` (draft-07) + `npm run validate:schema` (ajv, CI). Exporter `npm run export:json [id] [--check]`
(round-trip bez gubitka, deterministički; CI drift-gate). **Dual-read u loaderu: baza → JSON (catalog `content.dataFormat:'json'`) → `.js` fallback** — `.js` OSTAJE izvor istine
do flipa u Fazi 4. Vježbe NIKAD u JSON (BUG-012). **⬜ Preostaje:** formalni `FileRepo`/`SupabaseRepo` (2B.2, kad zatreba) + source-of-truth flip u Fazi 4.

---

## ADR-012 — HRV program: KLON programa + globalni UI toggle (sadržaj ≠ sučelje)
**Datum:** 2026-06-28 · **Status:** ✅ implementirano + LIVE (cigle 1–5c, `320d413..4b795c8`)
**Kontekst:** Treba hrvatska verzija platforme („Menadžment u Hotelijerstvu"). Dvije razdvojene potrebe:
(1) hrvatski **SADRŽAJ** predmeta, (2) hrvatsko **SUČELJE**. Korisnik izričito: „translate ne dira predmete".
**Odluka:** **Dvije neovisne osi.**
- **Sadržaj = KLON programa (Opcija A), NE i18n u sadržaju.** Paralelni `program` `hospitality-management-hr` +
  `data/<subj>-hr/*.js` (isti engine, 0 promjena; vlastiti `storageKey` → napredak odvojen). Prijevod alatom
  `scripts/translate-subject.js` (Sonnet tool_use; **slot-pristup** = model prevodi samo string-polja iz bijelog popisa,
  JS rekonstruira strukturu → `quiz.correct`/`_______`/KaTeX/HTML očuvani po konstrukciji; **salvage-parser** za
  tool_use koji vrati `translations` kao pokvaren JSON-string). Vježbe = posebno (samo string-polja). Odbačeno:
  i18n ključevi u sadržaju (`{en,hr}` po flashcardu) — zagadilo bi schemu i engine.
- **Sučelje = GLOBALNI toggle (master), neovisan o programu.** `js/i18n.js` rječnik `{en,hr}` + `t()` +
  `applyTranslations()` nad `[data-i18n]`; izbor u `localStorage 'sokrat-ui-lang'`. 🌐 gumb u nav-u. Opening HR
  programa samo „predloži" hrvatski prvi put (ako korisnik nije birao). **EN dict-vrijednosti = ORIGINALNI tekst →
  EN bajt-identičan.** Landing/sidebar pokazuju `PRIMARY_PROGRAM` (EN); HR program dostupan kroz Browse drill-down.
**Posljedice:** Hrvatski student dobije potpuno hrvatsko sučelje i sadržaj; engine se nikad ne dira. Baza: HR =
**novi redovi u POSTOJEĆIM tablicama** (`subject_content`/`progress` su ključani po id-u → 0 novih tablica/koda).
Long-tail chrome (profil/pravne stranice/blind-map) ostaje za dovršiti. Detalji: [HRV_PLAN.md](../archive/HRV_PLAN.md). [[hrv-program]]

---

## ADR-011 — Blok B read-path: sadržaj iz baze DIREKTNO preko anon keya (ne `/api`)
**Datum:** 2026-06-23 · **Status:** ✅ implementirano (aktivno lokalno)
**Kontekst:** Blok B (sadržaj→Supabase). Originalni plan (ADR-008/BACKEND.md) predviđao je `/api`
Vercel funkcije. Ali sadržaj je **javan** (svi čitaju isti katalog) → ne treba per-user logiku ni
skrivanje iza servera.
**Odluka:** Sadržaj se čita **direktno preko supabase-js (anon/publishable key) + public-read RLS**
(`using(true)`), isto kao što napredak već radi — **bez `/api` funkcija, bez service-keya na frontu**.
Tablica `public.subject_content` (1 red = 1 window var, `jsonb`). `js/content-loader.js` proba bazu pa
**padne na datoteke** (offline-first; datoteke = izvor istine, baza = zrcalo koje puni
`scripts/migrate-content.js` sa service-keyem). `/api` funkcije ostaju za KASNIJE (admin CRUD, AI tutor).
**Posljedice:** Najmanji setup, ništa se ne kvari ako baza padne/uspava se (fallback). Free tier uspava
projekt ~7 dana → restore besplatan; uspavan = sadržaj iz datoteka, login/sync stanu. Puna migracija
(„baza = jedini izvor" + admin CRUD) tek kad je 1. godina gotova. Detalji: [BACKEND.md](../architecture/BACKEND.md) §Staza B2.
**Dopuna (2026-06-27, BUG-012):** read-path nosi SAMO čisto-podatkovne window-varove (M1/M2/Final = flashcards/quiz/fill/learn).
**VJEŽBE (`*Exercises`) se NE migriraju** — sadrže `generate()` funkcije koje `JSON.stringify` izbriše; uvijek se učitaju iz
datoteke preko **`content.codeScripts`** (loader: `filesToLoad = fromDb ? codeScripts : scripts`). `verify-catalog.js` to forsira.
Općenito pravilo: **payload s funkcijama nije JSON-migracijski → kod ostaje u datotekama, baza nosi samo podatke.** Vidi [BUGS.md](./BUGS.md) §BUG-012.

## ADR-010 — Generator predmeta (manje Opus-usagea) + tool_use structured output
**Datum:** 2026-06-22/23 · **Status:** ✅ implementirano (pilot: Academic Writing)
**Kontekst:** Ručno autorstvo predmeta troši puno (skupog) Opus-vremena. Korisnik želi dodavati predmete
uz minimalan moj usage, PA tek onda puni Blok B.
**Odluka:** Pipeline `scripts/`: `build-topics.js` (materijali→topics.json) → `generate-subject.js`
(**Anthropic Sonnet preko korisnikovog `.env` ključa** — bulk drafting OFF Opus) → `assemble-subject.js`
(draft→`data/<id>/*.js`) → gate (`validate-content.js` + verify + Playwright + moj činjenični spot-check).
**Točnost nose deterministički zaštitari**, ne model. Output = isti `data/*.js` format → migracijski siguran.
**Ključno (pilot-nalaz):** drafting koristi **Anthropic `tool_use` (forced tool_choice)** → API jamči valjan
objekt → nestaje cijela klasa „unescaped quote → nevaljan JSON" padova (sadržaj prepun navodnika). +`coerce`
(learn kao string) +retry (learn prazan). **Inherentni limit:** validator provjerava da je quiz `correct` u
rasponu, NE je li stvarno točan → hvata samo Opus/ljudski spot-check (zato gate postoji).
**Posljedice:** Novi predmet ~$1–1.5 (Sonnet, korisnikov račun) umjesto sati Opus-rada. Pouka: generirani
sadržaj VERIFICIRATI protiv predavanja. Detalji: [CONTENT_GENERATOR.md](../workflow/CONTENT_GENERATOR.md).

## ADR-009 — Kvantitativni predmeti (Math/Micro/Macro/Statistika): KaTeX + "worked problems"
**Datum:** 2026-06-05 · **Status:** ✅ **implementirano** (KaTeX cigla, 2026-06-14)
**Implementacija (2026-06-14):** `js/math.js` (`renderMath(container)` = KaTeX auto-render, tihi no-op ako
CDN padne) + KaTeX CDN u `<head>` + `css/math.css` (dark + mobilni overflow). `renderMath` se zove na kraju
sva četiri renderera (`learn.js`/`flashcards.js`/`quiz.js`/`fill-blanks.js`). Test `tests/katex.spec.js`.
**⚠️ ISPRAVAK delimitera (currency-safe):** plan je predviđao `$...$` inline, ALI postojeći sadržaj ima 120+
valutnih `$NN` (npr. „$25 per night") → s `$...$` bi KaTeX parsirao tekst između dvaju `$` kao matematiku i
**pokvario live sadržaj**. Zato: **inline `\( \)`, blok `\[ \]` / `$$ $$`; jedan `$` se NE koristi.** Te se
sekvence ne pojavljuju u običnom tekstu (provjereno grep-om) → render je globalan ali za tekstualne predmete
**no-op** (nije potreban opt-in flag). Konvencija autorstva: [CONTENT_SCHEMA.md](../architecture/CONTENT_SCHEMA.md) § Matematika.
**Kontekst:** Math, Microeconomics, Macroeconomics i Statistika su **formula- i zadatak-orijentirani**;
postojeća schema (Learn/Flashcards/Quiz/Fill) rađena je za konceptualno, tekstualno gradivo. Tri problema:
(1) prikaz **formula** (HTML tekst ne prikazuje razlomke/eksponente/sume/integrale), (2) bit je
**rješavanje zadataka korak-po-korak** (ne prepoznavanje), (3) **grafovi** (ponuda/potražnja, tangente,
distribucije). Math materijal je u JPG slajdovima (PPT export).
**Odluka:**
1. **Rendering formula = KaTeX** (CDN `<link>` + `<script>`, bez build-a; isti alat kao Khan/Brilliant).
   Sadržaj se piše kao **LaTeX** unutar `$...$` / `$$...$$` u POSTOJEĆIM poljima (flashcard/quiz/fill/learn).
   Jedan helper `renderMath(container)` (KaTeX auto-render) zove se nakon što sekcija ubaci HTML.
   **Migracijski sigurno** — payload ostaje string (LaTeX), struktura scheme se NE mijenja.
2. **Pedagogija = "worked problems" konvencija na POSTOJEĆIM modovima** (bez novog moda zasad):
   Learn = teorija + formule + riješeni primjeri; Flashcards = zadatak → puno rješenje; Quiz = numerički,
   **distraktori = tipične greške**; Fill = popuni formulu/korak. Namjenski "Problems" mod (otkrivanje
   koraka jedan-po-jedan) gradimo TEK ako se reuse pokaže nedovoljnim.
3. **Grafovi = statične SVG / croppane slike u Learn** (`learn.image` već postoji). Interaktivni grafovi = ne sad.
**Posljedice:** KaTeX integracija je stvaran (ali kontroliran) posao u rendererima (learn/flashcards/quiz/
fill) → cache bump + test. Točnost formula iz slika = glavni rizik → male serije + **obavezan ljudski pregled**.
**Redoslijed:** prvo lagani tekstualni predmeti; KaTeX cigla PRIJE prvog kvantitativnog; pilot na predmetu
s materijalima (Statistika je PRAZNA, Micro tanak → realno Math ili Macro); **čista Matematika ZADNJA**.
Detalji: [CONTENT_SCHEMA.md](../architecture/CONTENT_SCHEMA.md) (LaTeX konvencija) + [CONTENT_INTAKE.md](../workflow/CONTENT_INTAKE.md) (image→LaTeX, inventar).

## ADR-008 — Backend hosting: Vercel Functions + Supabase
**Datum:** 2026-06-03 · **Status:** prihvaćeno
**Kontekst:** Treba odlučiti gdje hostati backend. Razmatrano: Vercel Functions +
Supabase, all-Vercel (Neon+Blob+auth), i Railway (always-on server+Postgres).
**Odluka:** **Vercel serverless funkcije (`/api`) + Supabase** (Postgres/Auth/Storage).
Frontend ostaje statički na istom Vercel projektu/deployu. Railway se razmatra KASNIJE
samo kao zaseban worker za dugotrajni AI ingest (serverless timeout), ne za cijeli backend.
**Razlozi:** besplatno na startu, Auth+Storage+DB u jednom, minimalno održavanja, paše
postojećem no-build statičkom setupu (Vercel sam servira `/api`).
**Posljedice:** Serverless timeout (10–60s) → tešku AI obradu chunkamo / kasnije worker.
**Migracija sadržaja:** ne sad; jednom u Bloku B (datoteke → DB 1:1). Vidi [BACKEND.md](../architecture/BACKEND.md).

## ADR-007 — Navigacija: puni drill-down (Fakultet → Smjer → Godina → Predmet)
**Datum:** 2026-06-02 · **Status:** ✅ implementirano (2026-06-02, M0.5)
**Kontekst:** Stranica treba biti strukturirana po fakultetu/smjeru/godini; korisnik
želi da se eksplicitno vidi hijerarhija ("uđeš na fakultete → smjerovi → godine").
**Odluka:** Puni drill-down korak po korak: Start → Fakulteti → Smjerovi → Godine →
Predmeti (po semestru), čak i kad razina ima samo jednu opciju. Breadcrumbs na svakom
ekranu. (Razmatran "pametni skip" jednolične razine — odbijen jer korisnik želi
eksplicitnu strukturu.) ~~Logo se zadržava.~~ **PROMJENA (2026-06-28): logo redizajniran** — `logo.png` (raster) → `assets/logo.svg` (vektorizirani glatki Sokrat, glava ispunjava krug, indigo gradijent); ✅ LIVE `19f07db`. Vidi `CLAUDE.md` §Ključne odluke + `docs/records/PROGRESS.md`.
**Vizualni stil (revidirano 2026-06-02):** **„čisto i bogato" (clean & rich, Brilliant/
Quizlet-feel), dark** — NE preminimalistički; treba izgledati kao „prava stranica"
(bogate kartice s gradijent-ikonama, breadcrumb, napredak). Mijenja raniji opis
„minimalistički".
**Implementacija:** zasebna `#browse-page` stranica; render iz `data/catalog.js` preko
helpera `SokratCatalog.faculties()/programsOf()/yearsOf()/subjectsOf()/semestersOf()`
u `js/navigation.js` (`renderBrowse()` + `initBrowse()`), stil u `css/browse.css`.
Dodavanjem fakulteta/smjera/godine/predmeta u catalog kartice se pojave bez izmjene UI-a.
Test: `tests/browse.spec.js` (drill-down + overflow guard, sva 4 iPhone profila).
**Posljedice:** Par dodatnih klikova dok je 1 fakultet/smjer, ali jasna struktura i
spremnost za više smjerova/fakulteta bez promjene toka.

## ADR-006 — Struktura sadržaja: mapa po predmetu, datoteka po lekciji
**Datum:** 2026-06-02 · **Status:** prihvaćeno
**Kontekst:** Uskoro se dodaje cijela 1. godina (po predmetu: k1, k2, završni) →
~15 novih lekcija. Postojeći nered (jedna velika datoteka vs modularni accounting)
ne skalira za autorstvo.
**Odluka:** Novi predmeti idu u `data/<subject-id>/{midterm-1,midterm-2,final}.js`
(jedna datoteka po lekciji, svaka izlaže `window.<var>`), uz `data/_template/
lesson.template.js` i `scripts/scaffold-subject.js`. Postojeći 2. god. predmeti se
NE prepravljaju (rade; catalog ih već apstrahira; migracija u bazu ih svejedno
normalizira). Autorstvo u datotekama je migracijski sigurno (Blok B uvozi 1:1).
**Posljedice:** Brže i dosljednije dodavanje; čista migracija u Supabase kasnije.

## ADR-005 — Playwright za vizualne responsive testove
**Datum:** 2026-06-01 · **Status:** prihvaćeno
**Kontekst:** Responzivnost mora biti savršena na svim uređajima; vizualne bugove
(npr. horizontalni overflow) ne hvataju logički testovi, a ručno testiranje na
svakom iPhoneu nije održivo.
**Odluka:** Dodati Playwright (chromium) kao dev-dependency + `tests/responsive.spec.js`
koji emulira iPhone širine (375/393/430 + landscape 852), mjeri overflow i radi
screenshotove. Mali vlastiti static server (`scripts/static-server.js`).
**Posljedice:** Regresije responzivnosti hvatamo automatski. `node_modules` i
Playwright artefakti su u `.gitignore`.

## ADR-004 — Svi data-*.js izlažu objekt na `window`
**Datum:** 2026-06-01 · **Status:** prihvaćeno
**Kontekst:** `getSubjectData()` sada razrješava podatke po IMENU varijable iz
catalog-a (`content.resolve`). Top-level `const` u skripti nije dostupan kao
`window[ime]`, a samo su 3 od 8 predmeta to imala.
**Odluka:** Standardizirati: svaki `data-*.js` na kraju radi `window.X = X`.
**Posljedice:** Catalog lookup radi uniformno; ujedno preduvjet za lazy loading
(A4) gdje se skripte učitavaju dinamički i moraju biti dostupne preko `window`.

## ADR-003 — Catalog kao jedinstveni izvor istine
**Datum:** 2026-06-01 · **Status:** prihvaćeno
**Kontekst:** Predmeti su bili hardkodirani na 3 mjesta (`subjectDataMap`,
`getSubjectData()` if-lanci, ručni HTML u sidebaru) → ne skalira na 100+ predmeta.
**Odluka:** Uvesti `data/catalog.js` kao jedini izvor istine. `content.resolve`
mapira (predmet, lekcija) → globalna varijabla, čime generalizira `getSubjectData()`.
**Posljedice:** Novi predmet = jedan unos u katalog. Kasnije katalog dolazi iz baze
bez promjene UI logike. Migracija na bazu je trivijalna jer model već odgovara.

## ADR-002 — Hijerarhija s `institutions/faculties` od početka
**Datum:** 2026-06-01 · **Status:** prihvaćeno
**Kontekst:** Cilj je širenje na cijelo sveučilište i druga sveučilišta.
**Odluka:** Model uključuje razine ustanova/fakultet/smjer/godina/semestar već sad,
iako kreće s jednim fakultetom (FMTU Opatija, Hospitality Management).
Konvencija: `semester` ∈ {1,2} unutar `year`.
**Posljedice:** Buduće širenje ne traži migraciju sheme.

## ADR-001 — Supabase kao backend (Faza 0)
**Datum:** 2026-06-01 · **Status:** prihvaćeno
**Kontekst:** Treba pravi backend (baza, auth, storage, serverless) uz malo
održavanja i nisku cijenu na početku; jedini autor sam ja.
**Odluka:** Supabase (Postgres + Auth + Storage + Edge Functions); frontend ostaje
na Vercelu. Razmatrano: čisti statički JSON (premalo za UGC kasnije) i custom
Node+Postgres (previše održavanja za sada).
**Posljedice:** Besplatan tier dovoljan na početku; lagan put do UGC-a (Faza 1+).
