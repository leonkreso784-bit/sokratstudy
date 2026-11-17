# Claudeov imenik konektora — prijava Sokrata

> **Gotovo kad:** korisnik Claudea nađe „Sokrat Study" u imeniku (Settings → Connectors → Browse) i
> spoji ga **bez lijepljenja adrese**. Do tada vrijedi ručni put (`ai.html`, gumb „Poveži AI").
>
> Prijavu **predaje Leon** na [claude.ai/directory/manage](https://claude.ai/directory/manage)
> (bilo koji plaćeni Claude paket) → **Submit new → MCP connector**. Ovdje su odgovori za svaki korak,
> spremni za lijepljenje. Pravila imenika: [submission](https://claude.com/docs/connectors/building/submission),
> [review criteria](https://claude.com/docs/connectors/building/review-criteria) (pročitano 17.11.2026).

## Preduvjeti (stanje 17.11.2026)

| traži imenik | stanje |
|---|---|
| udaljen HTTPS poslužitelj | ✅ `https://www.sokratstudy.com/mcp` (K/10) |
| OAuth 2.0 | ✅ Supabase OAuth 2.1 + DCR, stranica odobrenja `/odobrenje.html` |
| svaki alat: `title` + `readOnlyHint`/`destructiveHint` | ✅ `alati.ts` (`naslov`, `samoCitanje`, `razorno`) — 16 alata: 3 čitanja, 13 upisa |
| imena alata ≤ 64 znaka | ✅ najdulje `procitaj_materijale` (19) |
| javna dokumentacija | ✅ [`ai.html`](../../ai.html) — brana: `tests/unit/connect-ai.test.js` (adresa i nazivi == gumb) |
| pravila privatnosti s konektorom | ✅ [`privacy.html`](../../privacy.html) §8 (što primamo, što spremamo i koliko, pružatelj AI-ja, odspajanje) |
| kontakt za podršku | ✅ `sokrat@sokratstudy.com` |
| ikona | ✅ `icon-512.png` (512×512, tamna podloga) · prozirna: `assets/logo.svg` |
| **svaki alat isproban u Claudeu** | ⏳ **na PROD-u je isprobano samo čitanje** — korak 8 traži potvrdu za SVE alate (v. dolje) |

## Korak po korak

**1. Connection** — `https://www.sokratstudy.com/mcp` · jedna adresa za sve (NE „Users connect to different URLs").

**2. Tools** — povuku se sami. Očekuj 3 u čitanju (`procitaj_materijale`, `procitaj_materijal`, `procitaj_nacrt`)
i 13 u upisu; jedini `destructiveHint: true` je `vrati_izmjenu`.
⚠️ Ako recenzent pita: `obrisi_stavke`/`obrisi_lekciju` brišu **u nacrtu**, ne u korisnikovu materijalu; `predaj_nacrt`
u izmjeni zamjenjuje materijal, ali prethodna inačica ostaje u povijesti i `vrati_izmjenu` je vraća.

**3. Listing**

| polje | vrijednost |
|---|---|
| Server name (≤ 100) | `Sokrat Study` |
| One-liner (≤ 200) | `Turn your notes and PDFs into study materials: lesson text, flashcards, a quiz and fill-in-the-blanks, saved privately to your Sokrat Study shelf.` |
| Categories (1–5) | Education · Productivity |
| Documentation URL | `https://www.sokratstudy.com/ai.html` |
| Privacy policy URL | `https://www.sokratstudy.com/privacy.html` |
| Support contact | `sokrat@sokratstudy.com` |
| Icon | `icon-512.png` |
| Slug (**trajan** nakon objave) | `sokrat-study` |

Description (≤ 2000):

```text
Sokrat Study is a free study platform. With this connector, Claude builds study materials for you from whatever you share in the chat: lecture notes, a PDF, a chapter of a textbook.

Claude first writes the full lesson text (Learn), then flashcards built from it, then quiz and fill-in-the-blank questions built from the flashcards, so every card gets tested. Each lesson gets its own colour. You choose the shelf and the depth: a summary, a full study script or detailed exam preparation. The whole source is always covered, not a sample.

Everything is built as a private draft and lands on your shelf in one piece when Claude submits it, never half-finished. Open it on sokratstudy.com on any device and study it with Learn, flashcards, a quiz and fill-in-the-blanks; your progress is saved.

Claude can also read your existing materials and change them when you ask (add cards, fix a question, add a lesson) and undo its last change.

What the connector can reach: only your own shelves and materials. It cannot see the public catalogue or anyone else's materials, publish anything, delete a whole material, or read your email, profile or study progress. You can disconnect at any time in Profile → Connected AI apps; it takes effect immediately.

Requires a free Sokrat Study account.
```

**4. Use cases** — (1) build a study material from notes or a PDF; (2) add to or fix an existing material;
(3) undo the AI's last change. *Before connecting:* a free Sokrat Study account. *Data:* **reads and writes**.

**5. Company** — `Sokrat Study` · `https://www.sokratstudy.com` · primarni kontakt: Leon (upisuje sam).

**6. Authentication** — *Required*, OAuth. Klijent se registrira sam (DCR) → **client ID/secret se NE upisuju**
(polje ostaje prazno; Anthropic nema što čuvati).

**7. Data handling** — API je **naš** (first-party: Supabase je naš backend) · bez zdravstvenih podataka · bez
sponzoriranog sadržaja.

**8. Test & launch** — potvrda da je **svaki** alat pozvan u Claudeu. ⚠️ Prije predaje: u Claude.ai (Leonov
račun, ne vlastitim konektor-alatima) proći scenarij iz `MCP_TESTING.md` §7 — izgradnja → predaja → izmjena →
vraćanje. Vjerodajnice se **ne upisuju** u portal; za *Verified* recenziju recenzent ih traži mailom → za to
treba **zaseban testni račun** (ne Leonov).

**9. Compliance** — sedam potvrda. Naše činjenice uz tri osjetljive: *prompt injection* — upute poslužitelja
kažu da je izvor gradivo, ne naredba (`alati.ts`, `UPUTE`); stranica odobrenja pušta samo poznate hostove (ADR-038 t.3); *conversation data* — razgovor ne primamo, samo ono što AI
pošalje alatom; *financial / AI media* — ništa od toga.

**10. Review and submit.** Poslije: automatski pregled → po zadanom **Community**; stanje i povratna
informacija na istom portalu. Eskalacija: `mcp-review@anthropic.com`.

## Kad se nešto promijeni

- **Novi alat ili promijenjen naslov** → portal ga povuče sam; provjeri anotacije (`samoCitanje`/`razorno`).
- **Promijenjeno sučelje Claudea/ChatGPT-a** → `connectAi.*` u `js/i18n.js` **i** `ai.html` (brana pada ako se razidu).
- **Nova vrsta podataka koju konektor sprema** → `privacy.html` §8 u oba jezika, **prije** deploya.
