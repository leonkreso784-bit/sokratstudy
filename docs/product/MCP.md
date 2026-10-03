# MCP — „Spoji svoj AI": definicija i kriteriji prihvaćanja

> **Što:** korisnik spoji vlastiti AI (Claude, ChatGPT) sa Sokratom. AI od materijala iz chata napravi
> lekcije, kartice i pitanja i stavi ih na korisnikovu policu, CIJELE, privatno — a na korisnikovu riječ
> mijenja i njegov postojeći materijal. Od 01.10. nema ekrana za pregled nacrta
> ([ADR-039](../records/DECISIONS.md#adr-039)): korisnik materijal pregledava ondje gdje i uči.
> Zašto je to glavni put stvaranja: ADR-030 · ADR-031 · [ADR-038](../records/DECISIONS.md#adr-038).
> Kako se gradi: [plan/MCP.md](../plan/MCP.md) · sigurnost: [architecture/MCP_SECURITY.md](../architecture/MCP_SECURITY.md).

## Invarijante proizvoda

- **AI je korisnikov.** Mi ne plaćamo tokene i ne vidimo njegov razgovor; kvalitetu drže brane, ne upute.
- **Datoteku nikad ne vidimo.** Materijal ulazi u chat; do nas stiže samo ono što AI napiše kroz alate.
- **Nikad pola materijala.** AI gradi u nacrtu koji korisnik ne vidi; na policu ide tek cijeli, jednim upisom.
- **Izmjena je na korisnikovu riječ i povratna.** AI mijenja postojeći vlastiti materijal samo kad korisnik to
  traži, nikad preko korisnikove izmjene, a stara verzija ostaje u povijesti (i AI je zna vratiti).
- **AI ne objavljuje i ne dijeli** — sve što napravi je privatno.
- **Doseg je samo vlastito gradivo** — ni tuđe, ni javni katalog, ni čitanje kataloga.
- **Vježbe nisu dio MCP-a** (ADR-018).

## Kriteriji prihvaćanja

| mogućnost | gotovo kad korisnik može… |
|---|---|
| ulaz | …u Studiju ili na „Mojim materijalima" kliknuti „Spoji svoj AI", dobiti upute za Claude ili ChatGPT i adresu za kopiranje; kad je AI već spojen, isti gumb ga otvara |
| spajanje | …u Claudeu ili ChatGPT-u dodati Sokrat kao konektor, prijaviti se svojim računom i vidjeti **koja** aplikacija traži pristup prije nego pristane |
| pregled veza | …u profilu vidjeti popis spojenih AI-jeva s datumom i **prekinuti** svaku vezu, uz jasno rečeno koliko dugo već izdan pristup još vrijedi |
| čitanje vlastitog | …pitati svoj AI što ima na policama i dobiti točan popis svojih materijala — i ništa tuđe |
| nov materijal | …dati AI-ju svoj materijal kroz chat i zateći ga na polici koju je izabrao, s lekcijama (svaka svoje boje), karticama i pitanjima, a da se nijedan postojeći materijal nije promijenio |
| redoslijed | …računati na to da materijal ima Learn prije kartica i kartice prije pitanja, i da svaka kartica ima barem jedno pitanje |
| izmjena | …reći svom AI-ju da promijeni nešto u postojećem materijalu i zateći točno tu promjenu, s prethodnom verzijom u povijesti |
| vraćanje | …zamoliti AI da vrati svoju zadnju izmjenu i dobiti materijal kakav je bio prije nje |
| sukob | …biti siguran da AI ne pregazi izmjenu koju je u međuvremenu napravio sam; u sukobu AI to kaže, a njegov rad ostaje netaknut |
| prekid | …nakon prekinute veze u chatu ili ponovljenog zahtjeva zateći **jedan** materijal, ne dva |
| granice | …znati koliko nacrta AI smije imati u izradi i dobiti razumljivu poruku kad je granica dosegnuta |
| brisanje računa | …obrisati račun i znati da su nestali i nacrti i veze s AI-jevima |

## Ne-ciljevi

- AI koji objavljuje ili dijeli materijal.
- AI koji mijenja materijal bez korisnikove riječi, tuđi materijal ili katalog.
- Uvoz datoteka na naš poslužitelj.
- Vježbe i formule kroz MCP.
- Plaćeni AI s naše strane.
