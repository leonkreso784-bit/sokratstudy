# Google Search Console — prijava stranice (Leonov korak)

> **Zašto ovaj dokument postoji.** Do 28.11.2026. u cijelom repozitoriju **nije bilo nijednog spomena**
> Search Consolea ni `google-site-verification`. SEO-temelji su postavljeni 24.08.2026. (`FRONTEND_REDIZAJN.md`
> §9.15) i od tada nitko Googleu nije rekao da stranica postoji. [ADR-043](../records/DECISIONS.md) je napravio
> **69 indeksabilnih adresa** umjesto 5 — ali indeks ne nastaje sam, nego kad tražilica dobije sitemap.
>
> **Ovo Claude ne može umjesto tebe:** traži prijavu na tvoj Google račun. Zato su ovdje samo koraci i
> ono što je u repou već pripremljeno.

## Što je već spremno

| | stanje |
|---|---|
| `sitemap.xml` | **69 URL-ova**, generiran iz stanja na disku (`node scripts/check-seo.js --write`) |
| `robots.txt` | `Allow: /` + `Sitemap: https://www.sokratstudy.com/sitemap.xml` |
| stranice | 59 predmeta · 4 programa · 1 čvor · 5 zatečenih (`predmeti.html` je ulaz za obilazak) |
| shema | `Course` + `BreadcrumbList` po predmetu · `WebSite` + `EducationalOrganization` na naslovnici |

## Koraci

1. **Otvori** [search.google.com/search-console](https://search.google.com/search-console) i prijavi se.
2. **Dodaj vlasništvo.** Biraj **Domain** (`sokratstudy.com`) ako možeš dodati DNS TXT zapis — pokriva i
   `www` i `https`, i ne može se slučajno izgubiti. Ako ne, **URL prefix** `https://www.sokratstudy.com/`.
3. **Potvrdi vlasništvo.**
   - *Domain* → TXT zapis kod registrara domene.
   - *URL prefix* → najlakše **HTML tag**: dobiješ `<meta name="google-site-verification" content="…">`.
     **Pošalji mi tu vrijednost i ja je ugradim u `index.html`** uz cache-bump.
     ⚠️ **NE biraj „HTML file upload".** Ta datoteka bi sjela u korijen kao `google….html`, a `check:seo`
     čita **sve** `*.html` s diska i tražio bi od nje naslov, opis i canonical — stranica koja ih nema
     oborila bi branu. Meta-tag nema taj problem.
4. **Pošalji sitemap:** Sitemaps → `sitemap.xml` → Submit.
5. **Zatraži indeksiranje** za dvije-tri adrese ručno (URL Inspection → Request indexing), npr.
   `https://www.sokratstudy.com/predmeti.html` i jedan predmet. Ostalo Google nađe iz sitemapa.

⚠️ **Prvi rezultati stižu za dane do tjedana**, ne sati. Indeksiranje 69 adresa nije trenutno.

## Što gledati nakon 4–6 tjedana — i zašto baš tada

Tek tada postoji podatak za **jedinu odluku koju smo namjerno odgodili**: isplati li se napraviti i
**stranice po lekciji (171)**. Nisu napravljene jer je rizik tankog sadržaja stvaran, a pogoditi unaprijed
ne možemo. Iz Performance izvještaja:

- **koji predmeti dobivaju prikaze** — ako ih nekolicina nosi većinu, lekcije imaju smisla samo za njih;
- **kojim upitima ljudi dolaze** — hrvatski upiti („*skripta*", „*kolokvij*", „*pitanja*") potvrdili bi
  odluku da stranice nose jezik programa;
- **Pages → Indexed vs Not indexed** — ako Google velik dio ostavi neindeksiranim, to je presuda o
  tankom sadržaju i **stranice po lekciji se tada NE rade**.

## Što NE raditi

- **Ne dodavati `meta keywords`** — §9.15 ih je svjesno **obrisao**, Google ih ignorira od 2009.
- **Ne dodavati `lastmod` u sitemap** — *„datum koji nitko ne održava je datum koji laže"*.
- **Ne pisati broj predmeta u ijednu rečenicu** — ta je greška već bila na produkciji (pisalo 17 od 22).
- **Ne uključivati `cleanUrls` u `vercel.json`** — izmjereno: `/contact` je 404, `/contact.html` je 200.
  Uključivanje bi natjeralo 308 preusmjeravanje i razišlo sve postojeće canonicale i sitemap.
- **SEM (plaćeno oglašavanje) ide odvojeno i poslije** — odluka o budžetu, ne o kodu (§9.15).
