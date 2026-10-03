# RAČUN — prijava, identitet i doseg do korisnika

> ## 🗄 REFERENCA OD 2026-09-04 — R1 ISPORUČEN, R2/R3 SU PRESELJENI
> **R1 je ispunjen i na produkciji.** R2 (profil + tema uz račun) i R3 (mail-obavijesti) nastavljaju
> kao **Faza 2** u [RASPORED.md](./RASPORED.md), zajedno s CSS-om profila — ista površina, pa
> ide u istom prolazu. Ovaj dokument od danas **objašnjava ZAŠTO je R1 izveden odjednom**
> (`#authModal` je bio građen za jedan put), i **nije red čekanja.**
>
> ---
>
> **Izvorni status (do 2026-09-04):** 🟩 tekući spec — **R1 jezgra NA PRODUKCIJI 2026-09-02** (`921ef08`, Leonov OK):
novi dijalog + upitnik + Google-prijava (radi uživo) + U1/U2 popravci iz Leonovog testiranja.
**U5** (Google bez supabase-domene: id_token izravno) TAKOĐER na produkciji. **FB gumb
maknut na Leonovu riječ** („makni facebook za sada") — `FB_LOGIN=false`, Metine upute
spremljene u PROGRESS-u. **U3+U4 ✅ zatvorio Leon 2026-09-02** (Site URL + Resend SMTP,
BACKLOG §R1-UX). **Mail-identitet ✅ 2026-09-04:** pošiljatelj `sokrat@sokratstudy.com`,
Googleov avatar sa znakom, HR predlošci s potpisom (`supabase/email-templates/`) — time je
i **temelj R3 postavljen**, ostaje mu samo Edge Function + odjava + admin-forma.
⏭️ **Prije R2 idu DVIJE cigle iz [BACKLOG.md](../records/BACKLOG.md) §U TIJEKU** (Leon,
2026-09-04): ~~**učitavanje po ruti**~~ **✅ isporučeno 2026-09-04** (`js/loader.js`; prvi kadar
41→22 skripte) i **tema stranice = izgled maila** (mail već vozi indigo iz znaka; stranica ne).
Nisu RAČUN-cigle nego zatečeni nalazi, ali imaju prednost jer ih je Leon tražio imenom.
Leon je blok otvorio i PROŠIRIO
2026-09-02: Facebook uz Google (ne više uvjetno), a blok je izričito i **UX računskih
površina** (dijalog + profil), ne samo priključak providera. Napomena o dosegu: „frontend gotov (2026-09-01)" se odnosio na
REDIZAJN-spec (posjetiteljski + študentski put) — dijalog prijave i profil u njemu NISU bili,
ovo je njihov red. Ovaj blok je ujedno i priprema za MCP (ADR-030/031: konektor traži OAuth).
**Izvor želja:** Leon, 2026-09-01 (doslovno u [BACKLOG.md §RAČUN](../records/BACKLOG.md)).
**Preduvjeti pali:** frontend redizajn ✅ na produkciji 2026-09-01 · seoba otkazana (Supabase Pro
ostaje) → OAuth/redirect-URI ništa više ne čeka.

---

## 1 · Zašto ovim redom

`#authModal` je građen za jedan put — svaka mogućnost koja ga dira zasebno znači novi prepravak
cijelog dijaloga. Zato **prva cigla nosi SVE TROJE odjednom** (prepravak dijaloga + upitnik +
Google), inače se dijalog prepravlja treći put.

## 2 · Cigle — redom

| # | cigla | gotovo kad korisnik može… |
|---|---|---|
| **R1** | **A0 prepravak `#authModal` + UPITNIK pri registraciji + Google- i Facebook-prijava** (jedan zahvat) | …se registrirati Googleom, Facebookom ili e-mailom kroz ISTI dijalog, pri registraciji (i pri PRVOJ OAuth-prijavi!) reći tko je (student/škola + faks; FMTU se prepoznaje) i dati/uskratiti mail-pristanak — a postojeći korisnici se i dalje prijavljuju bez ikakve promjene |
| **R2** | **Profil** — slika (bucket po `node-images` obrascu: vlasnički prefiks + RLS), uređivanje podataka i izgleda profila **+ TEMA PRATI RAČUN** (Leon, 2026-09-04) | …staviti profilnu sliku, promijeniti ime, vidjeti svoj profil onako kako će ga vidjeti drugi — i **zateći svoju temu na svakom uređaju na kojem se prijavi** |
| **R3** | **Mail-obavijesti** — provider + Edge Function (ADR-016), pristanak iz upitnika; prvi segment = FMTU (obavijest o novim predmetima) | …primiti mail o novom predmetu SAMO ako je pristao, i odjaviti se jednim klikom iz samog maila |
| — | ~~Facebook = uvjetno~~ ~~Leon 2026-09-02: FB ide u R1 uz Google~~ **Leon 2026-09-02 kasnije: „makni facebook za sada, to ćemo kasnije dodat"** — gumb maknut s produkcije (`FB_LOGIN=false` u auth.js); povratak = Metini ključevi + flip zastavice. Metine upute korak-po-korak stoje u PROGRESS/chatu | — |

**Leonov dio R1:** ① ✅ **Google GOTOV i potvrđen uživo** (2026-09-02: GCP projekt „Sokrat
Study" → client → Supabase Providers → Leonova prava prijava prošla); ② ✅ **U3+U4**
(2026-09-02: Site URL + redirect lista; Resend — DNS u **Porkbunu**, SMTP u Supabaseu,
pošiljatelj sokrat@sokratstudy.com); ③ 💤 **Meta/Facebook ODGOĐEN na Leonovu riječ** —
upute spremljene, kod se vraća flipom `FB_LOGIN`.

## 3 · Tvrde granice (ne popuštaju ni ovdje)

- Identitet **isključivo iz JWT-a** (`getUser()`); `user_id` iz body-ja = eskalacija privilegija
  (naučeno na `delete-account`).
- `service_role` samo u Edge Functions (ADR-016) · RLS i `publish_document` **nedirnuti** ·
  osobni graditelj ostaje zaseban otok (ADR-024).
- Upitnik = **podaci uz pristanak** (GDPR: brisanje računa nosi i njih); mail ide SAMO uz
  izričit pristanak iz upitnika.
- Min. lozinka 8 + leaked-password ostaju (server-side, Pro) + klijentski dvojnik (D4).
- Svaki deploy = Leonov izričit OK (pravilo #2); cache bump (pravilo #1); preflight prije pusha.

## 4 · Što svjesno NIJE ovdje

MCP konektor (ADR-030/031 — traži OAuth pa dolazi IZA R1, ali je zaseban posao) · recepti za
vježbe · birač tema (backlog, Leonova odluka) · „Sign in with ChatGPT" (nepotvrđen, ne obećava se).
