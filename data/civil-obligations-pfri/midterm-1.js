// Opći dio građanskog prava i obvezno pravo (PFRI) — Međuispit
// Granica iz izvedbenog plana: Klarić/Vedriš 3–182, 377–491, 557–566 + Slakoper 218–240 (zastara).
// Plan i izvori: docs/subjects/CIVIL_OBLIGATIONS_PLAN.md
// ⚠️ Obvezno pravo se piše PROTIV ZOO-a (pročišćeni tekst, NN 69/26) — gdje postoji broj članka, navodi se.

const ogpPfriM1 = {
  nacelaObveznog: {
    id: "n1ac3l",
    name: "Osnovna načela obveznog prava",
    icon: "fa-scale-balanced",
    color: "#4d7c0f",
    flashcards: [
      { id: "ob1cil", question: "Što ZOO uređuje (čl. 1.)?", answer: "Osnove obveznih odnosa (opći dio) te ugovorne i izvanugovorne obvezne odnose (posebni dio).", explanation: "Podjela na opći i posebni dio prati strukturu samoga Zakona." },
      { id: "ob2slo", question: "Što znači sloboda uređivanja obveznih odnosa (čl. 2.)?", answer: "Sudionici slobodno uređuju obvezne odnose, ali ne suprotno Ustavu, prisilnim propisima i moralu društva.", explanation: "To su tri granice autonomije volje; prekoračenje vodi ništetnosti." },
      { id: "ob3rav", question: "Koji je položaj sudionika u obveznom odnosu (čl. 3.)?", answer: "Sudionici su ravnopravni — nijedan nema vlast nad drugim, za razliku od javnopravnih odnosa.", explanation: "Ravnopravnost je obilježje cijelog građanskog prava." },
      { id: "ob4sav", question: "Što traži načelo savjesnosti i poštenja (čl. 4.)?", answer: "Da se sudionici tog načela drže i pri zasnivanju obveznih odnosa i pri ostvarivanju prava i obveza iz njih.", explanation: "Standard se prosuđuje objektivno; najčešće citirano načelo u praksi." },
      { id: "ob5sur", question: "Što nalaže dužnost suradnje (čl. 5.)?", answer: "Sudionici su dužni surađivati radi potpunog i urednog ispunjenja obveza i ostvarivanja prava.", explanation: "Dužnost je uzajamna i postoji i bez ugovorne odredbe." },
      { id: "ob6zlo", question: "Što zabranjuje zabrana zlouporabe prava (čl. 6.)?", answer: "Ostvarivanje prava iz obveznog odnosa suprotno svrsi zbog koje je ono propisom ustanovljeno ili priznato.", explanation: "Mjerilo je SVRHA prava, ne šteta drugome." },
      { id: "ob7jed", question: "Što kaže načelo jednake vrijednosti činidaba (čl. 7.)?", answer: "Pri sklapanju NAPLATNIH pravnih poslova polazi se od jednake vrijednosti uzajamnih činidaba; zakon određuje kad narušavanje povlači posljedice.", explanation: "Vrijedi samo za naplatne poslove — darovanje mu po naravi izmiče." },
      { id: "ob8ste", question: "Što propisuje zabrana prouzročenja štete (čl. 8.)?", answer: "Svatko je dužan suzdržati se od postupka kojim se može drugome prouzročiti šteta.", explanation: "Opća zapovijed neškodenja (neminem laedere); temelj izvanugovorne odgovornosti." },
      { id: "ob9isp", question: "Što propisuje dužnost ispunjenja obveze (čl. 9.)?", answer: "Sudionik je dužan ispuniti svoju obvezu i odgovoran je za njezino ispunjenje.", explanation: "Pacta sunt servanda u ZOO-u." },
      { id: "o10paz", question: "Koja se tri stupnja pažnje razlikuju (čl. 10.)?", answer: "Pažnja dobrog gospodarstvenika (trgovac), pažnja dobrog domaćina (ostali) i POVEĆANA pažnja dobrog stručnjaka u profesionalnoj djelatnosti.", explanation: "Stupanj pažnje određuje i strogost odgovornosti." },
      { id: "o11dis", question: "Što znači dispozitivnost odredaba ZOO-a (čl. 11.)?", answer: "Sudionici smiju odnos urediti drukčije nego ZOO, osim ako iz odredbe ili njezina smisla ne proizlazi što drugo.", explanation: "Suprotnost su prisilne (kogentne) odredbe." },
      { id: "o12obi", question: "Kada se primjenjuju trgovački običaji (čl. 12.)?", answer: "Među trgovcima: ugovoreni običaji i razvijena praksa, te običaji koji se redovito primjenjuju ako nisu isključeni. Među ostalima samo ako su ugovoreni ili propisani.", explanation: "Trgovački običaji mogu nadjačati i dispozitivni propis." },
      { id: "o14trg", question: "Što je trgovački ugovor prema ZOO-u (čl. 14.)?", answer: "Ugovor koji trgovci sklapaju među sobom u obavljanju djelatnosti koja čini predmet poslovanja barem jednoga od njih ili je s njom povezana.", explanation: "Dovoljno je da je djelatnost predmet poslovanja JEDNOG trgovca." },
      { id: "o15zas", question: "Kako se štiti povrijeđeno pravo (čl. 15.)?", answer: "Putem suda, osim ako je odlučivanje povjereno drugom nadležnom tijelu; tko se samovlasno štiti preko granica nužne obrane ili dopuštene samopomoći, za to odgovara.", explanation: "Zabrana samovlašća uz dvije imenovane iznimke." }
    ],
    quiz: [
      { id: "q1nace", question: "Granice slobode uređivanja obveznih odnosa (čl. 2.) jesu:", options: ["Ustav, prisilni propisi i moral društva", "prisilni propisi i trgovački običaji struke", "volja jače ugovorne strane u pregovorima", "statut pravne osobe i njezina interna pravila"], correct: 0 },
      { id: "q2zlou", question: "Zlouporaba prava prosuđuje se prema:", options: ["visini štete koja je drugoj strani nastala", "svrsi zbog koje je pravo ustanovljeno", "trajanju obveznog odnosa među strankama", "imovinskom stanju obiju ugovornih strana"], correct: 1 },
      { id: "q3jedn", question: "Načelo jednake vrijednosti činidaba primjenjuje se na:", options: ["sve pravne poslove bez iznimke", "samo na darovanje", "naplatne pravne poslove", "samo na trgovačke ugovore"], correct: 2 },
      { id: "q4pazn", question: "Pažnja dobrog stručnjaka traži se od sudionika koji obvezu ispunjava:", options: ["u profesionalnoj djelatnosti", "prema bliskom srodniku i bez naknade", "izvan redovnog radnog vremena", "na temelju usmenog dogovora stranaka"], correct: 0 },
      { id: "q5disp", question: "Odredbe ZOO-a su u pravilu:", options: ["kogentne", "dispozitivne", "neobvezujuće", "retroaktivne"], correct: 1 },
      { id: "q6obic", question: "Trgovački običaji mogu se primijeniti i ako su suprotni:", options: ["prisilnim propisima i Ustavu", "moralu društva i javnom poretku", "dispozitivnom propisu", "izričitoj volji obiju ugovornih strana"], correct: 2 },
      { id: "q7domo", question: "Pažnja dobrog domaćina mjerilo je za:", options: ["trgovca u njegovoj djelatnosti", "sudionika koji nije trgovac", "javnobilježnički posao", "liječnički zahvat"], correct: 1 },
      { id: "q8samo", question: "Samovlasna zaštita prava preko granica dopuštene samopomoći:", options: ["povlači odgovornost", "uvijek je dopuštena", "zamjenjuje sudsku zaštitu", "gasi obvezu"], correct: 0 },
      { id: "q9ravn", question: "Sudionici obveznog odnosa su:", options: ["u odnosu nadređenosti", "ravnopravni", "podređeni trgovcu", "ovisni o sudu"], correct: 1 }
    ],
    fillBlanks: [
      { id: "f1nace", sentence: "Sudionici slobodno uređuju obvezne odnose, ali ne suprotno Ustavu, prisilnim propisima i _______ društva.", answer: "moralu", hint: "Treća granica autonomije volje." },
      { id: "f2pazn", sentence: "U profesionalnoj djelatnosti traži se povećana pažnja, tzv. pažnja dobrog _______.", answer: "stručnjaka", hint: "Viši standard od gospodarstvenika." },
      { id: "f3zlou", sentence: "Zabranjeno je ostvarivanje prava suprotno _______ zbog koje je ono propisom ustanovljeno.", answer: "svrsi", hint: "Ne mjeri se šteta, nego cilj prava." },
      { id: "f4sted", sentence: "Svatko je dužan suzdržati se od postupka kojim se može drugome prouzročiti _______.", answer: "šteta", hint: "Neminem laedere." },
      { id: "f5disp", sentence: "Sudionici mogu svoj obvezni odnos urediti drukčije nego ZOO ako iz odredbe ne proizlazi što drugo — odredbe su dakle _______.", answer: "dispozitivne", hint: "Suprotno od kogentnih." }
    ],
    learn: {
      id: "l1nace",
      title: "Osnovna načela obveznog prava",
      content: `<h3>Što ZOO uređuje</h3>
<p>Zakon o obveznim odnosima uređuje <strong>osnove obveznih odnosa</strong> (opći dio) te <strong>ugovorne i izvanugovorne obvezne odnose</strong> (posebni dio) — <em>čl. 1.</em> Ta podjela je ujedno i struktura samoga Zakona, pa je korisna kao mapa gradiva.</p>

<h3>Autonomija volje i njezine granice</h3>
<p><strong>Sloboda uređivanja obveznih odnosa</strong> (<em>čl. 2.</em>) temeljno je načelo: sudionici svoje odnose uređuju sami. Sloboda nije neograničena — tri su granice: <strong>Ustav</strong>, <strong>prisilni propisi</strong> i <strong>moral društva</strong>. Prekoračenje tih granica po pravilu vodi ništetnosti posla.</p>
<p>Uz to, <strong>sudionici su ravnopravni</strong> (<em>čl. 3.</em>). Time se obvezni odnos razlikuje od javnopravnog: nijedna strana nema vlast nad drugom.</p>

<h3>Savjesnost, suradnja i zabrana zlouporabe</h3>
<p><strong>Načelo savjesnosti i poštenja</strong> (<em>čl. 4.</em>) obvezuje i pri <em>zasnivanju</em> odnosa i pri <em>ostvarivanju</em> prava i obveza. Standard se prosuđuje objektivno — ne pita se što je stranka mislila, nego kako bi postupio savjestan sudionik.</p>
<p><strong>Dužnost suradnje</strong> (<em>čl. 5.</em>) traži da sudionici surađuju radi potpunog i urednog ispunjenja; postoji i kad je ugovor ne spominje.</p>
<p><strong>Zabrana zlouporabe prava</strong> (<em>čl. 6.</em>) zabranjuje ostvarivanje prava <strong>suprotno svrsi</strong> zbog koje je ono ustanovljeno. ⚠️ Mjerilo je svrha prava, a ne to je li drugome nastala šteta.</p>

<h3>Jednaka vrijednost činidaba i zabrana štete</h3>
<p><strong>Načelo jednake vrijednosti činidaba</strong> (<em>čl. 7.</em>) vrijedi pri sklapanju <strong>naplatnih</strong> pravnih poslova; zakon posebno određuje kada narušavanje ravnoteže povlači pravne posljedice. Kod besplatnih poslova (darovanje) načelo po naravi ne dolazi do izražaja.</p>
<p><strong>Zabrana prouzročenja štete</strong> (<em>čl. 8.</em>): svatko se mora suzdržati od postupka kojim se drugome može prouzročiti šteta. To je opća zapovijed <em>neminem laedere</em> i polazište izvanugovorne odgovornosti.</p>

<h3>Ispunjenje i stupnjevi pažnje</h3>
<p><strong>Dužnost ispunjenja</strong> (<em>čl. 9.</em>): sudionik je dužan ispuniti obvezu i za ispunjenje odgovara.</p>
<p><em>Čl. 10.</em> razlikuje <strong>tri stupnja pažnje</strong>:</p>
<ul>
  <li><strong>pažnja dobrog gospodarstvenika</strong> — u trgovačkim odnosima,</li>
  <li><strong>pažnja dobrog domaćina</strong> — kod ostalih sudionika,</li>
  <li><strong>pažnja dobrog stručnjaka</strong> — <em>povećana</em>, za obveze iz profesionalne djelatnosti, prema pravilima struke i običajima.</li>
</ul>
<p>Uz to, sudionik se u ostvarivanju svog prava mora suzdržati od postupka kojim bi otežao ispunjenje obveze drugoga.</p>

<h3>Dispozitivnost, običaji i trgovački ugovori</h3>
<p><strong>Dispozitivnost</strong> (<em>čl. 11.</em>): sudionici smiju odnos urediti drukčije nego ZOO, osim ako iz pojedine odredbe ili njezina smisla ne proizlazi što drugo. Pravilo je dakle dispozitivnost, a kogentnost iznimka.</p>
<p><strong>Običaji i praksa</strong> (<em>čl. 12.</em>): među trgovcima primjenjuju se ugovoreni trgovački običaji i razvijena praksa, te običaji koje trgovci redovito primjenjuju ako ih nisu isključili. ⚠️ Takvi se običaji primjenjuju <strong>i ako su suprotni dispozitivnom propisu</strong>. Među ostalim sudionicima običaji vrijede samo ako su ugovoreni ili zakonom propisani.</p>
<p><strong>Trgovački ugovor</strong> (<em>čl. 14.</em>) je ugovor koji trgovci sklapaju među sobom u obavljanju djelatnosti koja čini predmet poslovanja <strong>barem jednoga</strong> od njih ili je s tim povezana. Odredbe o ugovorima na odgovarajući se način primjenjuju i na druge pravne poslove.</p>
<p><em>Čl. 13.</em> dodaje: pravna osoba postupa u skladu sa statutom, društvenim ugovorom odnosno pravilima, ali ugovor sklopljen suprotno njima <strong>ostaje na snazi</strong> — osim ako je druga strana za to znala ili zakon određuje drukčije.</p>

<h3>Zaštita prava</h3>
<p><strong>Zaštita prava</strong> (<em>čl. 15.</em>) ostvaruje se putem <strong>suda</strong>, osim kad je odlučivanje povjereno drugom nadležnom tijelu. Samovlasna zaštita dopuštena je samo u granicama <strong>nužne obrane</strong> i <strong>zakonom dopuštene samopomoći</strong>; tko te granice prekorači, za to odgovara.</p>`
    }
  }
};

if (typeof window !== 'undefined') window.ogpPfriM1 = ogpPfriM1;
if (typeof module !== 'undefined' && module.exports) module.exports = ogpPfriM1;
