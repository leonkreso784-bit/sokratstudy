// Europsko pravo II (PFRI) — M1 (međuispit)
// Opći dio europskog privatnog prava: pojam i izvori, usklađivanje, pravna osnova i granice,
// uredbe i direktive, preuzimanje, nadređenost, sukladno tumačenje i izravni učinak.

const ep2PfriM1 = {
  pojamEuropskogPrivatnogPrava: {
    name: "Pojam europskog privatnog prava",
    icon: "fa-scale-balanced",
    color: "#6366f1",
    flashcards: [
      { question: "Što je europsko privatno pravo u užem smislu?", answer: "Privatnopravna pravila sadržana u Ugovorima i na njima utemeljeno privatnopravno zakonodavstvo EU-a (primarno, sekundarno i tercijarno pravo).", explanation: "Prihvaća tradicionalnu podjelu izvora prava Unije.", id: "01c001" },
      { question: "Što obuhvaća europsko privatno pravo u širem smislu?", answer: "Pravo EU-a, nacionalno pravo koje se na njemu temelji i preuzima ga, međunarodno unificirano pravo, neobvezujuća načela znanstvenih skupina i praksu Suda EU-a.", explanation: "Većinski prihvaćena definicija polazi od šireg shvaćanja.", id: "01c002" },
      { question: "Iz kojih se triju komponenti sastoji europsko privatno pravo?", answer: "Fragmentirane direktive i uredbe o pojedinim pitanjima, sveobuhvatno nacionalno privatno pravo i uvelike ujednačeno međunarodno privatno pravo Unije.", explanation: "Tri komponente: sekundarno pravo, nacionalno pravo, međunarodno privatno pravo.", id: "01c003" },
      { question: "Što znači funkcionalni pristup europskog zakonodavca privatnom pravu?", answer: "Privatnopravne odnose uređuje se samo u mjeri u kojoj to doprinosi uspostavi i urednom funkcioniranju unutarnjeg tržišta.", explanation: "Pravna osnova je usklađivanje propisa radi unutarnjeg tržišta.", id: "01c004" },
      { question: "Kako čl. 26. st. 2. UFEU definira unutarnje tržište?", answer: "Prostor bez unutarnjih granica u kojem se jamči slobodno kretanje robe, osoba, usluga i kapitala u skladu s Ugovorima.", explanation: "Četiri slobode kretanja.", id: "01c005" },
      { question: "Što su Landova načela?", answer: "Neobvezujuća načela europskog ugovornog prava koja je izradila znanstvena skupina; ubrajaju se u meko pravo (soft law).", explanation: "Dio europskog privatnog prava u širem smislu.", id: "01c006" },
      { question: "Zašto razlike nacionalnih ugovornih prava smetaju unutarnjem tržištu?", answer: "Strana su prava teško razumljiva trgovcima i njihovim odvjetnicima, pa odvraćaju od prekogranične trgovine; to su necarinske prepreke trgovini.", explanation: "Svi se slobodni tokovi odvijaju putem ugovora.", id: "01c007" }
    ],
    quiz: [
      {
        question: "Europsko privatno pravo u užem smislu obuhvaća:",
        options: [
          "privatnopravna pravila Ugovora i sve na njima utemeljeno zakonodavstvo EU-a",
          "pravila uredbi i direktiva donesenih redovnim zakonodavnim postupkom u svim granama",
          "nacionalne građanske zakonike država članica koji su djelomično usklađeni s Unijom",
          "načela znanstvenih skupina zajedno s praksom nacionalnih sudova država članica"
        ],
        correct: 0, id: "01q001"
      },
      {
        question: "Koji se izvor ubraja u europsko privatno pravo tek u širem smislu?",
        options: [
          "uredba Unije o pravima putnika u zračnom prometu",
          "međunarodno unificirano pravo poput Bečke konvencije",
          "direktiva Unije o ugovorima sklopljenim izvan poslovnih prostorija",
          "privatnopravna pravila sadržana u Ugovoru o funkcioniranju EU-a"
        ],
        correct: 1, id: "01q002"
      },
      {
        question: "Funkcionalni pristup europskog zakonodavca privatnom pravu znači da se ono uređuje:",
        options: [
          "podjednako po granama privatnog prava kako bi se stvorio jedinstveni građanski zakonik",
          "prvenstveno radi zaštite obiteljskog i nasljednog prava država članica",
          "u mjeri u kojoj doprinosi uspostavi i funkcioniranju unutarnjeg tržišta",
          "radi ukidanja razlika među nacionalnim pravima neovisno o tržištu"
        ],
        correct: 2, id: "01q003"
      },
      {
        question: "Prema Ugovoru o funkcioniranju EU-a, unutarnje tržište je:",
        options: [
          "prostor jedinstvenih carina, u kojem se zajednički oporezuje roba iz trećih država",
          "područje na kojem vrijedi jedinstveni ugovorni zakonik, koji zamjenjuje nacionalna prava",
          "organizacija suradnje država članica, ograničena na pravila tržišnog natjecanja",
          "prostor bez unutarnjih granica, sa slobodnim kretanjem robe, osoba, usluga i kapitala"
        ],
        correct: 3, id: "01q004"
      },
      {
        question: "Landova načela po pravnoj snazi pripadaju:",
        options: [
          "neobvezujućem tzv. mekom pravu",
          "primarnom pravu Unije jednako kao i Ugovori",
          "tercijarnom pravu koje donosi Europska komisija",
          "obvezujućim pravilima sekundarnog prava Unije"
        ],
        correct: 0, id: "01q005"
      }
    ],
    fillBlanks: [
      { sentence: "Europsko privatno pravo u užem smislu obuhvaća privatnopravna pravila iz Ugovora i na njima doneseno privatnopravno _______ Unije.", answer: "zakonodavstvo", hint: "vrsta propisa koje donose institucije", id: "01f001" },
      { sentence: "Načela koja je izradila znanstvena skupina za europsko ugovorno pravo nazivaju se _______ načela.", answer: "Landova", hint: "prema imenu voditelja skupine", id: "01f002" },
      { sentence: "Unutarnje tržište je prostor bez unutarnjih _______ u kojem se jamči slobodno kretanje robe, osoba, usluga i kapitala.", answer: "granica", hint: "dio kopnenog ili morskog ruba država", id: "01f003" },
      { sentence: "Razlike među nacionalnim ugovornim pravima smatraju se _______ preprekama trgovini.", answer: "necarinskim", hint: "vrsta prepreka koja nije fiskalna", id: "01f004" }
    ],
    learn: {
      title: "Pojam europskog privatnog prava",
      content: `
<h3>Nema jedinstvene definicije</h3>
<p>U pravnoj doktrini ne postoji jedinstvena definicija europskog privatnog prava; pojam se objašnjava zbrajanjem dvaju pojmova – <strong>europsko</strong> i <strong>privatno</strong>. Shvaća se u užem i u širem smislu, a većinski se prihvaća šire shvaćanje.</p>

<h3>Uže i šire shvaćanje</h3>
<table>
<tr><th>Smisao</th><th>Što obuhvaća</th></tr>
<tr><td><strong>Uže</strong></td><td>Privatnopravna pravila sadržana u Ugovorima (osnivačkim ugovorima) i na temelju njih usvojeni izvori, tj. <strong>privatnopravno zakonodavstvo EU-a</strong>. Prihvaća se tradicionalna podjela izvora prava Unije na primarno, sekundarno i tercijarno pravo.</td></tr>
<tr><td><strong>Šire</strong></td><td>Pravila primarnog, sekundarnog i tercijarnog prava EU-a, <strong>nacionalno pravo država članica</strong> koje se na njima temelji i preuzima ih, <strong>međunarodno unificirano pravo</strong> (npr. Bečka konvencija o međunarodnoj prodaji robe – CISG), <strong>neobvezujuća načela znanstvenih skupina</strong> (npr. Landova načela), opća načela prava te <strong>praksa Suda EU-a</strong> koja ih tumači i odlučuje o njihovoj valjanosti.</td></tr>
</table>
<p>U najširem smislu uključuju se i akti drugih europskih organizacija koje nisu institucije EU-a, npr. Europska konvencija za zaštitu ljudskih prava i temeljnih sloboda (EKLJP) Vijeća Europe; ona je izvor prava EU-a inkorporiran čl. 6. st. 3. UEU-a (temeljna prava zajamčena EKLJP-om čine opća načela prava Unije).</p>
<p>Šira definicija europskog privatnog prava: europsko privatno pravo = privatnopravna pravila europskog prava, europskog unificiranog prava i sudske prakse Suda EU-a s jedne strane, te pravo država članica koje se na tim izvorima temelji i koje ih preuzima, s druge strane.</p>

<h3>Tri komponente europskog privatnog prava</h3>
<ol>
<li>veliki broj <strong>fragmentiranih direktiva i uredbi</strong> o posebnim pitanjima u pojedinim područjima privatnog prava;</li>
<li><strong>sveobuhvatno nacionalno privatno pravo</strong>, čija je primjena na području Unije uvjetovana pravom Unije;</li>
<li><strong>uvelike ujednačeno međunarodno privatno pravo</strong> Unije.</li>
</ol>

<h3>Privatno i javno pravo</h3>
<p>Uobičajeno je <em>privatno pravo</em> pravo koje uređuje odnose među građanima, a <em>javno pravo</em> odnose građana i države ili državnih institucija. Političke definicije: privatno je pravo usmjereno području privatnih odnosa lišenih državne intervencije, politički neutralno, a njegova je jedina svrha zajamčiti svakoj osobi ono na što ima pravo (<em>suum cuique tribuere</em> – svakome svoje). Temelji privatnog prava u pravnim poretcima država članica: <strong>apsolutno vlasništvo, sloboda ugovaranja i subjektivna odgovornost</strong>.</p>

<h3>Funkcionalni pristup</h3>
<p>Institucije Unije primjenjuju <strong>funkcionalni pristup</strong>: donose propise o odnosima privatnih osoba sa svrhom i na način koji doprinosi cilju <strong>unutarnjeg tržišta</strong>. Razlog je u primarnom pravu, koje daje pravnu osnovu za bogato sekundarno privatno pravo i dopušta usklađivanje propisa država članica radi uspostave i urednog funkcioniranja unutarnjeg tržišta. Zato je naglasak na onim granama privatnog prava i na onim izvorima, uglavnom sekundarnog prava, koji mogu značajno doprinijeti unutarnjem tržištu.</p>
<p>Unutarnje tržište je prema <strong>čl. 26. st. 2. UFEU-a</strong> „prostor bez unutarnjih granica na kojem se slobodno kretanje robe, osoba, usluga i kapitala jamči u skladu s odredbama Ugovora”.</p>

<h3>Zašto je potrebno usklađivanje ugovornog prava</h3>
<p>Prema jednom od autora Načela europskog ugovornog prava, Unija je gospodarska zajednica čija je svrha slobodno kretanje robe, osoba, usluga i kapitala, a sve se to kreće putem ugovora. Zato treba olakšati sklapanje i izvršenje ugovora te procjenu ugovornih rizika. Strana su prava često teško razumljiva trgovcima i njihovim domaćim odvjetnicima i mogu ih odvratiti od stranih tržišta; stoga se razlike ugovornih prava u Europi mogu smatrati <strong>necarinskim preprekama trgovini</strong>.</p>

<p><strong>Dopuna:</strong> Briselsku konvenciju o nadležnosti i izvršenju presuda iz 1968. najprije je zamijenila Uredba (EZ) br. 44/2001 („Bruxelles I”), a nju je preinačila Uredba (EU) br. 1215/2012 („Bruxelles I bis”, primjena od 10. 1. 2015.). Rimsku konvenciju o pravu mjerodavnom za ugovore iz 1980. zamijenila je Uredba (EZ) br. 593/2008 („Rim I”). Obje se i dalje navode u literaturi o ranijem pravu kao primjeri ujednačavanja prava.</p>
`,
      id: "01l000"
    },
    id: "01k000"
  },

  izvoriEuropskogPrivatnogPrava: {
    name: "Izvori europskog privatnog prava",
    icon: "fa-book-open",
    color: "#10b981",
    flashcards: [
      { question: "Što čini primarno pravo Unije?", answer: "Osnivački ugovori s protokolima, deklaracijama, dodatnim sporazumima, njihovim izmjenama i ugovorima o pristupanju; Povelja ima isti pravni učinak kao Ugovori.", explanation: "Čl. 1. st. 3. UEU: UEU i UFEU imaju istu pravnu vrijednost.", id: "02c001" },
      { question: "Što se danas razumije pod pojmom „Ugovori”?", answer: "Ugovor o Europskoj uniji (UEU) i Ugovor o funkcioniranju Europske unije (UFEU), jednake pravne vrijednosti.", explanation: "Unija je zamijenila i naslijedila Europsku zajednicu.", id: "02c002" },
      { question: "Što je tercijarno pravo Unije?", answer: "Nezakonodavni akti koji se donose na temelju ovlaštenja iz zakonodavnog akta, a dijele se na delegirane i provedbene akte.", explanation: "Čl. 290. i 291. UFEU.", id: "02c003" },
      { question: "Što je delegirani akt?", answer: "Nezakonodavni akt opće primjene koji Komisija usvaja na temelju ovlaštenja da dopuni ili izmijeni nebitne odredbe zakonodavnog akta (čl. 290. UFEU).", explanation: "Uvodi se pridjev „delegirani”.", id: "02c004" },
      { question: "Što je provedbeni akt?", answer: "Nezakonodavni akt koji usvaja Komisija ili iznimno Vijeće radi ujednačene provedbe pravno obvezujućih akata Unije (čl. 291. UFEU).", explanation: "Pridjev „provedbeni”; nadzor država članica (komitologija).", id: "02c005" },
      { question: "Zašto se uz naziv akta dodaje pridjev „delegirani” ili „provedbeni”?", answer: "Naziv uredbe, direktive ili odluke ne otkriva je li akt zakonodavni ili nezakonodavni, pa Ugovori propisuju obvezno umetanje pridjeva.", explanation: "Primjer: provedbena uredba Komisije (EU) 2015/1051 (platforma za online rješavanje sporova ugašena je 20. 7. 2025.).", id: "02c006" },
      { question: "Kako je EKLJP povezana s pravom EU-a?", answer: "Temeljna prava iz EKLJP-a čine opća načela prava Unije (čl. 6. st. 3. UEU), iako EKLJP nije akt institucije EU-a.", explanation: "Pristupanje Unije EKLJP-u zastalo je nakon Mišljenja Suda 2/13 i još nije dovršeno.", id: "02c007" }
    ],
    quiz: [
      {
        question: "Koji izvor spada u primarno pravo Unije?",
        options: [
          "Direktiva 2011/83/EU o pravima potrošača",
          "Provedbena uredba Komisije 2015/1051",
          "Povelja EU-a o temeljnim pravima",
          "presuda Suda EU-a o prethodnom pitanju"
        ],
        correct: 2, id: "02q001"
      },
      {
        question: "Delegirani akt Komisije služi za:",
        options: [
          "ujednačenu provedbu zakonodavnog akta u državama članicama",
          "dopunjavanje ili izmjenu nebitnih odredaba zakonodavnog akta",
          "zamjenu redovnog zakonodavnog postupka kad Vijeće ne može odlučiti",
          "donošenje preporuka državama članicama bez ikakva pravnog učinka"
        ],
        correct: 1, id: "02q002"
      },
      {
        question: "Provedbene akte iz čl. 291. st. 2. UFEU-a usvaja:",
        options: [
          "Europski parlament, zajedno s Vijećem",
          "pojedina država članica, za svoje područje",
          "Sud Europske unije, u prethodnom postupku",
          "Komisija, a iznimno Vijeće"
        ],
        correct: 3, id: "02q003"
      },
      {
        question: "Zašto Ugovori traže pridjev „delegirani” ili „provedbeni” uz naziv akta?",
        options: [
          "jer naziv akta ne pokazuje je li zakonodavni ili ne",
          "jer se uredbe smatraju nezakonodavnim aktima za razliku od direktiva",
          "jer se tako razlikuje obvezujući akt od neobvezujuće preporuke",
          "jer se ti akti donose za države izvan europodručja"
        ],
        correct: 0, id: "02q004"
      },
      {
        question: "Odnos EKLJP-a prema pravu Unije prema čl. 6. st. 3. UEU-a je takav da:",
        options: [
          "je EKLJP akt institucije Unije izjednačen s uredbom",
          "temeljna prava iz EKLJP-a čine opća načela prava Unije",
          "je Unija stranka EKLJP-a i podliježe nadzoru Europskog suda za ljudska prava",
          "EKLJP vrijedi u Uniji tek nakon preuzimanja u nacionalno pravo"
        ],
        correct: 1, id: "02q005"
      }
    ],
    fillBlanks: [
      { sentence: "Prema čl. 1. st. 3. UEU-a, UEU i UFEU imaju istu pravnu _______.", answer: "vrijednost", hint: "imenica uz pridjev „pravna”", id: "02f001" },
      { sentence: "Nezakonodavni akti donijeti na temelju ovlaštenja zakonodavnog akta čine izvore _______ prava Unije.", answer: "tercijarnog", hint: "treći stupanj u podjeli izvora", id: "02f002" },
      { sentence: "Akt koji Komisija donosi radi ujednačenog izvršavanja obvezujućih akata Unije naziva se _______ akt.", answer: "provedbeni", hint: "čl. 291. UFEU-a", id: "02f003" },
      { sentence: "Čl. 6. st. 3. UEU-a određuje da temeljna prava iz EKLJP-a čine opća _______ prava Unije.", answer: "načela", hint: "množina imenice srednjeg roda", id: "02f004" }
    ],
    learn: {
      title: "Izvori europskog privatnog prava",
      content: `
<h3>Primarno pravo</h3>
<p>Izvore primarnog prava Unije čine <strong>osnivački ugovori</strong>, uključujući protokole, deklaracije, dodatne sporazume te sve njihove izmjene i dopune. Prema <strong>čl. 1. st. 3. UEU-a</strong> Unija se temelji na UEU-u i UFEU-u (zajedno: „Ugovori”), koji imaju <strong>istu pravnu vrijednost</strong>; Unija zamjenjuje i nasljeđuje Europsku zajednicu. <strong>Povelja o temeljnim pravima EU-a</strong> po pravnom je učinku izjednačena s Ugovorima i ima status izvora primarnog prava.</p>
<p>Primarno pravo obuhvaća, među ostalim: Ugovor o osnivanju Europske zajednice za ugljen i čelik (1951.), Ugovore iz Rima (1957. – EEZ i EURATOM) i Sporazum o zajedničkim tijelima Europskih zajednica (1957.), Ugovor o spajanju (1965.), Jedinstveni europski akt (potpisan 1986., na snazi od 1. 7. 1987.), Ugovor iz Maastrichta (1992.), Amsterdama (1997.), Nice (2001.) i Lisabona (2007.) te sve ugovore o pristupanju država članica. Ključni su protokoli npr. Protokol br. 1 o ulozi nacionalnih parlamenata i Protokol br. 2 o primjeni načela supsidijarnosti i proporcionalnosti. Ugovor o EZUČ-u sklopljen je na 50 godina i prestao je važiti 2002.</p>
<p>Razlika: pod <em>osnivačkim ugovorima</em> misli se na tri međunarodna ugovora država osnivačica (EZUČ 1951., EURATOM i EEZ 1957.), a danas se pojmom <em>Ugovori</em> označavaju UEU i UFEU kao ugovori na kojima se Unija temelji.</p>

<h3>Sekundarno pravo</h3>
<p>Zakonodavni akti (uredbe, direktive, odluke) donose se redovnim ili posebnim zakonodavnim postupkom (čl. 289. UFEU-a); preporuke i mišljenja su neobvezujući akti (čl. 288. st. 5. i čl. 292. UFEU-a). O uredbama i direktivama u privatnom pravu govore posebne cjeline.</p>

<h3>Tercijarno pravo</h3>
<p>Izvori tercijarnog prava usvajaju se u postupku koji <strong>nije redovni ni posebni zakonodavni postupak</strong>. Riječ je o nezakonodavnim aktima donesenim na temelju ovlaštenja iz uredbi, direktiva i odluka kao zakonodavnih akata, a dijele se na <strong>delegirane</strong> i <strong>provedbene</strong>.</p>
<table>
<tr><th></th><th>Delegirani akt (čl. 290. UFEU)</th><th>Provedbeni akt (čl. 291. UFEU)</th></tr>
<tr><td>Pojam</td><td>Nezakonodavni akt opće primjene koji Komisija usvaja radi dopunjavanja ili mijenjanja nebitnih odredaba zakonodavnog akta</td><td>Nezakonodavni akt koji usvaja Komisija ili iznimno Vijeće radi provedbe pravno obvezujućih akata Unije</td></tr>
<tr><td>Uvjeti</td><td>Cilj, sadržaj, polje primjene i trajanje delegiranja izričito su utvrđeni zakonodavnim aktom; EP ili Vijeće mogu povući delegiranje, a akt stupa na snagu ako EP ili Vijeće ne uloži prigovor</td><td>Odstupanje od načela da države članice usvajaju mjere za provedbu (čl. 291. st. 1.); nužno za jedinstvene uvjete provedbe; nadzor država članica preko odbora (komitologija, čl. 291. st. 3.)</td></tr>
<tr><td>Naziv</td><td>Obvezan pridjev „delegirani” (čl. 290. st. 3.)</td><td>Obvezan pridjev „provedbeni” (čl. 291. st. 4.)</td></tr>
</table>
<p>Sva tri obvezujuća akta (uredba, direktiva, odluka) mogu se usvojiti i kao delegirani i kao provedbeni. Budući da naziv akta ne pokazuje je li zakonodavni ili nezakonodavni, Lisabonski ugovor traži da im se doda pridjev, npr. <em>provedbena uredba Komisije (EU) 2015/1051</em> o načinima korištenja funkcija platforme za online rješavanje sporova (platforma je ugašena 20. 7. 2025., kad je Uredba (EU) 2024/3228 stavila izvan snage osnovnu Uredbu 524/2013; primjer i dalje služi kao ilustracija pridjeva „provedbena”).</p>

<h3>Ostali izvori</h3>
<p>EKLJP nije akt institucije EU-a, ali je izvor prava EU-a inkorporiran čl. 6. st. 3. UEU-a (opća načela prava Unije). Čl. 6. st. 2. UEU obvezuje Uniju da joj pristupi, ali je taj proces zaustavilo Mišljenje Suda EU-a 2/13 (pregovori su nastavljeni 2020.) (Adhésion de l'Union à la CEDH, EU:C:2014:2454): sporazum o pristupanju nije u skladu s čl. 6. st. 2. UEU-a ni s Protokolom br. 8.</p>
<p>Uz navedeno, europskom privatnom pravu pripadaju i opća načela prava, praksa Suda EU-a, međunarodno unificirano pravo (CISG) te neobvezujuća načela znanstvenih skupina.</p>
<p><strong>Napomena o izmjeni:</strong> nakon Mišljenja 2/13 pregovori o pristupanju Unije EKLJP-u nastavljeni su 2020. (format „46+1”), a revidirani nacrt sporazuma usuglašen je na tehničkoj razini u ožujku 2023.; pristupanje još nije dovršeno. Pročišćene verzije UEU-a i UFEU-a objavljene su u SL C 202 od 7. 6. 2016. Ugovor o EZUČ-u više ne postoji (istekao 2002.), a nakon Lisabona Unija je pravni sljednik Zajednice.</p>
`,
      id: "02l000"
    },
    id: "02k000"
  },

  harmonizacijaPrivatnogPrava: {
    name: "Harmonizacija privatnog prava u EU",
    icon: "fa-arrows-to-circle",
    color: "#f59e0b",
    flashcards: [
      { question: "Što je negativna harmonizacija?", answer: "Uklanjanje prepreka unutarnjoj trgovini zabranama iz primarnog i sekundarnog prava te prakse Suda EU-a (zabrana diskriminacije, carina i povrede sloboda).", explanation: "Primjer: Cassis de Dijon.", id: "03c001" },
      { question: "Što je pozitivna harmonizacija?", answer: "Aktivno približavanje pravnih poredaka država članica usvajanjem sekundarnog prava kojim se smanjuju ili uklanjaju razlike među propisima.", explanation: "Metode: ujednačavanje i usklađivanje.", id: "03c002" },
      { question: "Razlika između ujednačavanja (unifikacije) i usklađivanja prava?", answer: "Ujednačavanje traži što uniformnija zajednička rješenja (npr. CISG); usklađivanje je širi pojam i uključuje sudsku praksu i meko pravo.", explanation: "Usklađivanje zakonodavstva samo je jedan oblik.", id: "03c003" },
      { question: "Koji su oblici i načini usklađivanja prava?", answer: "Zakonodavna djelatnost institucija EU-a, praksa Suda EU-a i djelovanje pravne doktrine.", explanation: "Tri oblika.", id: "03c004" },
      { question: "Što je odlučio Sud EU-a u predmetu Cassis de Dijon (120/78)?", answer: "Njemačko pravilo o najmanjem udjelu alkohola od 25 % u likerima bilo je mjera istovrsna količinskom ograničenju, protivna slobodi kretanja robe.", explanation: "Francuski liker imao je 15 do 20 % alkohola.", id: "03c005" },
      { question: "Navedi primjere akata ujednačavanja prava.", answer: "Bečka konvencija o međunarodnoj prodaji robe (1980.), Briselska konvencija o nadležnosti (1968.) i Rimska konvencija o mjerodavnom pravu (1980.).", explanation: "Briselsku i Rimsku konvenciju danas zamjenjuju Uredba 1215/2012 i Uredba 593/2008; CISG je i dalje na snazi.", id: "03c006" }
    ],
    quiz: [
      {
        question: "Negativna harmonizacija prvenstveno se ostvaruje:",
        options: [
          "novim direktivama koje usklađuju nacionalna pravila",
          "zabranama kojima se uklanjaju prepreke trgovini",
          "izradom neobvezujućih načela europskog ugovornog prava",
          "međunarodnim konvencijama koje države članice ratificiraju"
        ],
        correct: 1, id: "03q001"
      },
      {
        question: "Pozitivna harmonizacija znači:",
        options: [
          "ukidanje carina na robu iz država članica Unije i trećih država",
          "zabranu diskriminacije državljana drugih država članica pri zapošljavanju",
          "nadzor Komisije nad primjenom pravila o tržišnom natjecanju u državama",
          "aktivno djelovanje zakonodavca kojim se smanjuju razlike među propisima država članica"
        ],
        correct: 3, id: "03q002"
      },
      {
        question: "Bečka konvencija o međunarodnoj prodaji robe primjer je:",
        options: [
          "ujednačavanja odnosno unifikacije prava",
          "negativne harmonizacije zabranama",
          "tercijarnog prava Unije",
          "minimalne harmonizacije direktivom"
        ],
        correct: 0, id: "03q003"
      },
      {
        question: "Usklađivanje prava u odnosu na ujednačavanje je:",
        options: [
          "uži pojam koji se odnosi na uredbe Unije",
          "pojam istovjetan unifikaciji prava država članica",
          "širi pojam koji uključuje i meko pravo",
          "postupak koji provodi Sud Europske unije u prethodnom postupku"
        ],
        correct: 2, id: "03q004"
      },
      {
        question: "U predmetu Cassis de Dijon Sud EU-a ocijenio je njemački propis o najmanjem udjelu alkohola kao:",
        options: [
          "poreznu mjeru koja nije obuhvaćena pravom Unije",
          "dopuštenu mjeru zaštite javnog zdravlja bez ograničenja",
          "mjeru istovrsnu količinskom ograničenju",
          "povredu pravila o državnim potporama poduzećima"
        ],
        correct: 2, id: "03q005"
      }
    ],
    fillBlanks: [
      { sentence: "Harmonizacija koja se temelji na zabranama i uklanjanju prepreka trgovini zove se _______ harmonizacija.", answer: "negativna", hint: "suprotno od pozitivne", id: "03f001" },
      { sentence: "Približavanje pravnih poredaka što uniformnijim zajedničkim rješenjima naziva se _______ prava.", answer: "ujednačavanje", hint: "sinonim je unifikacija, ali se traži hrvatski izraz", id: "03f002" },
      { sentence: "Predmet Cassis de Dijon odnosio se na slobodno kretanje _______.", answer: "robe", hint: "jedna od četiri slobode", id: "03f003" },
      { sentence: "Uz zakonodavnu djelatnost institucija i praksu Suda EU-a, usklađivanju doprinosi i djelovanje pravne _______.", answer: "doktrine", hint: "znanost i teorija prava", id: "03f004" }
    ],
    learn: {
      title: "Harmonizacija privatnog prava u EU",
      content: `
<h3>Zašto i kako se približavaju pravni poredci</h3>
<p>Radi uklanjanja prepreka unutarnjoj trgovini Unija rabi dvije ključne metode koje se u teoriji nazivaju i metodama gospodarske integracije: <strong>negativnu</strong> i <strong>pozitivnu harmonizaciju</strong>. Obje približavaju pravne poretke država članica smanjivanjem ili uklanjanjem razlika među njima radi ostvarenja unutarnjeg tržišta.</p>

<h3>Negativna harmonizacija</h3>
<ul>
<li>Temelji se na <strong>uklanjanju prepreka</strong> unutarnjoj trgovini <strong>zabranama</strong> iz odredaba primarnog i sekundarnog prava te pratećom praksom Suda EU-a.</li>
<li>Prvenstveno se odnosi na zabranu diskriminacije, zabranu carina i povrede temeljnih gospodarskih sloboda te zabranu povrede poštenog tržišnog natjecanja nacionalnim propisima ili praksom.</li>
<li>Uklanja i prepreke koje proizlaze iz razlika među privatnim pravima država članica.</li>
</ul>
<p><strong>Predmet Rewe-Zentral (Cassis de Dijon), 120/78:</strong> njemačko je društvo uvezlo francuski liker od ribiza (Cassis de Dijon) s 15 do 20 % alkohola. Njemačka savezna uprava za monopol alkohola zabranila je uvoz i prodaju jer njemački propis traži najmanje 25 % alkohola u likerima. Društvo je tvrdilo da je takva odredba mjera s učinkom istovrsnim količinskom ograničenju i da je protivna slobodi kretanja robe iz čl. 34. UFEU-a (ex čl. 28. UEZ-a). Sud je ocijenio da je njemački zahtjev mjera s istovrsnim učinkom količinskom ograničenju, protivna tadašnjem čl. 30. UEEZ-a (danas čl. 34. UFEU-a). Roba koja je zakonito proizvedena i stavljena na tržište u jednoj državi članici u načelu se smije prodavati i u drugoj (načelo uzajamnog priznavanja), osim ako ograničenje opravdavaju obvezni zahtjevi. Predmet je primjer negativne harmonizacije (EU:C:1979:42).</p>

<h3>Pozitivna harmonizacija</h3>
<ul>
<li>Aktivno djelovanje, u prvom redu zakonodavca Unije, <strong>usvajanjem sekundarnog prava</strong> kojim se umanjuju ili otklanjaju razlike među propisima država članica koje čine prepreku trgovini.</li>
<li>Služi uklanjanju razlika među propisima privatnog prava, posebice ugovornog prava.</li>
<li>Na razini EU-a koriste se metode <strong>ujednačavanja i usklađivanja</strong> prava.</li>
</ul>
<table>
<tr><th>Pojam</th><th>Značenje</th></tr>
<tr><td><strong>Ujednačavanje (unifikacija)</strong></td><td>Približavanje pravnih poredaka različitih država radi što uniformnijih zajedničkih rješenja o određenim pitanjima. Primjeri: Bečka konvencija o međunarodnoj prodaji robe (CISG, 1980.), Briselska konvencija o nadležnosti i izvršenju presuda (1968.), Rimska konvencija o pravu mjerodavnom za ugovore (1980.).</td></tr>
<tr><td><strong>Usklađivanje</strong></td><td>Širi pojam od usklađivanja zakonodavstva: uz njega obuhvaća tumačenje i primjenu zakonodavstva sudskom praksom te tzv. <em>soft law</em> (neobvezujuće pravo), uključujući rezultate pravne doktrine i rada znanstvenih skupina.</td></tr>
</table>

<h3>Oblici i načini usklađivanja</h3>
<ol>
<li>zakonodavna djelatnost institucija EU-a;</li>
<li>praksa Suda EU-a;</li>
<li>djelovanje pravne doktrine.</li>
</ol>

<h3>Nadležnost EU-a za usklađivanje privatnog prava</h3>
<p>Pravo EU-a <strong>ne sadrži izričitu i opću nadležnost</strong> za usklađivanje privatnopravnih propisa država članica. Ovlast je izvedena <strong>posredno</strong> iz odredaba UFEU-a o usklađivanju: <strong>čl. 114.</strong> (ex čl. 95. UEZ-a, ex ex čl. 100.a UEEZ-a) i <strong>čl. 115.</strong> (ex čl. 94. UEZ-a, ex ex čl. 100. UEEZ-a). Pojedinosti su u sljedećoj cjelini.</p>
<p><strong>Napomena o izmjeni:</strong> predmet Cassis de Dijon vodi se pod brojem 120/78 (u ranijoj literaturi katkad pogrešno 129/78); u osnovi se uvoz robe iz druge države članice ne može zabraniti samo zato što ne udovoljava nacionalnim propisima o sastavu proizvoda.</p>
`,
      id: "03l000"
    },
    id: "03k000"
  },

  pravnaOsnovaUskladivanja: {
    name: "Pravna osnova usklađivanja: čl. 114. i 115. UFEU",
    icon: "fa-gavel",
    color: "#ef4444",
    flashcards: [
      { question: "Koja je odredba Ugovora najvažnija za usklađivanje privatnog prava?", answer: "Čl. 114. UFEU-a (ex čl. 95. UEZ-a, ex ex čl. 100.a UEEZ-a): mjere usklađivanja radi uspostave i funkcioniranja unutarnjeg tržišta.", explanation: "Uveden je Jedinstvenim europskim aktom (potpisan 1986., na snazi od 1987.).", id: "04c001" },
      { question: "Kojim postupkom se donose mjere iz čl. 114. st. 1. UFEU-a?", answer: "Redovnim zakonodavnim postupkom, uz savjetovanje s Gospodarskim i socijalnim odborom; odlučuje se kvalificiranom većinom.", explanation: "Jednoglasnost je ukinuta JEA-om.", id: "04c002" },
      { question: "Što je razlika između čl. 114. i čl. 115. UFEU-a?", answer: "Čl. 114.: mjere redovnim postupkom. Čl. 115.: direktive posebnim zakonodavnim postupkom, jednoglasno, uz savjetovanje s EP-om i EGSO-om.", explanation: "Čl. 115. je supsidijarna pravna osnova.", id: "04c003" },
      { question: "Koju razinu zaštite Komisija mora uzeti kao polazište prema čl. 114. st. 3. UFEU-a?", answer: "Visoku razinu zaštite zdravlja, sigurnosti, okoliša i potrošača, vodeći računa o znanstvenim činjenicama.", explanation: "Odnosi se na prijedloge Komisije.", id: "04c004" },
      { question: "Što je isključeno iz čl. 114. UFEU-a?", answer: "Fiskalne odredbe, odredbe o slobodnom kretanju osoba i o pravima i interesima zaposlenih (područje je uređeno posebnim odredbama – lex specialis).", explanation: "Čl. 114. je opća odredba (lex generalis).", id: "04c005" },
      { question: "Kako glasi „test duhana” iz predmeta Tobacco Advertising?", answer: "Mjera mora imati za cilj poboljšanje unutarnjeg tržišta te stvarno doprinositi uklanjanju prepreka slobodama ili znatnih narušavanja tržišnog natjecanja.", explanation: "Čl. 114. ne daje opću ovlast uređivanja unutarnjeg tržišta.", id: "04c006" },
      { question: "Smiju li se mjerama usklađivanja sprječavati buduće prepreke trgovini?", answer: "Da, ako je pojava prepreka vjerojatna i ako je mjera prikladna da ih spriječi.", explanation: "Predmet British American Tobacco.", id: "04c007" },
      { question: "Što je čl. 352. UFEU-a (klauzula fleksibilnosti)?", answer: "Klauzula za popunjavanje praznina: Vijeće jednoglasno, uz suglasnost Europskog parlamenta, donosi mjere potrebne za ciljeve Ugovora kad Ugovori ne daju ovlasti.", explanation: "Ex čl. 308. UEZ-a; različito od čl. 115.", id: "04c008" }
    ],
    quiz: [
      {
        question: "Mjere usklađivanja iz čl. 114. UFEU-a usvajaju se:",
        options: [
          "posebnim zakonodavnim postupkom uz jednoglasnu odluku Vijeća",
          "odlukom Komisije bez sudjelovanja Europskog parlamenta",
          "redovnim zakonodavnim postupkom uz savjetovanje s EGSO-om",
          "odlukom Europskog vijeća na prijedlog država članica"
        ],
        correct: 2, id: "04q001"
      },
      {
        question: "Čl. 115. UFEU-a razlikuje se od čl. 114. UFEU-a po tome što:",
        options: [
          "predviđa direktive i jednoglasnost u Vijeću",
          "dopušta Komisiji da samostalno donosi mjere usklađivanja",
          "isključuje potrebu savjetovanja s Europskim parlamentom",
          "zahtijeva redovni zakonodavni postupak umjesto posebnoga"
        ],
        correct: 0, id: "04q002"
      },
      {
        question: "Jedinstveni europski akt uveo je pravnu osnovu iz čl. 114. UFEU-a koja:",
        options: [
          "iziskuje jednoglasnost država članica",
          "omogućuje usklađivanje kvalificiranom većinom",
          "dodjeljuje Uniji isključivu nadležnost za unutarnje tržište",
          "ukida nadležnost država članica u području potrošača"
        ],
        correct: 1, id: "04q003"
      },
      {
        question: "U predmetu Tobacco Advertising I Sud EU-a poništio je direktivu jer:",
        options: [
          "se Njemačka pozvala na načelo supsidijarnosti iz čl. 5. UEU-a kao jedinu osnovu",
          "je Parlament nepravilno glasovao u postupku suodlučivanja iz čl. 251.",
          "je zabrana dovodila do povrede prava vlasništva proizvođača duhana",
          "čl. 100.a nije bio pravna osnova jer zabrana stvarno ne doprinosi tržištu"
        ],
        correct: 3, id: "04q004"
      },
      {
        question: "Prema predmetu British American Tobacco, načelo supsidijarnosti kod čl. 114. UFEU-a:",
        options: [
          "ne primjenjuje se jer Unija ima isključivu nadležnost prema čl. 3. UFEU-a",
          "primjenjuje se jer čl. 114. ne daje isključivu nadležnost",
          "primjenjuje se na direktive tek nakon njihova preuzimanja",
          "zamjenjuje načelo proporcionalnosti kao ograničenje čl. 114."
        ],
        correct: 1, id: "04q005"
      },
      {
        question: "Klauzula fleksibilnosti za popunjavanje pravnih praznina (ex čl. 308. UEZ-a) sadržana je u:",
        options: [
          "čl. 114. UFEU-a, a mjere se usvajaju kvalificiranom većinom u redovnom postupku",
          "čl. 345. UFEU-a, a države članice zadržavaju uređenje sustava vlasništva",
          "čl. 352. UFEU-a, a Vijeće odlučuje jednoglasno uz suglasnost Parlamenta",
          "čl. 115. UFEU-a, a direktive se usvajaju jednoglasno uz savjetovanje s EGSO-om"
        ],
        correct: 2, id: "04q006"
      }
    ],
    fillBlanks: [
      { sentence: "Za usklađivanje propisa radi unutarnjeg tržišta najvažniji je članak _______ Ugovora o funkcioniranju Europske unije.", answer: "114", hint: "ex čl. 95. UEZ-a", id: "04f001" },
      { sentence: "Čl. 114. UFEU-a odnosi se na mjere čiji je cilj uspostava i funkcioniranje unutarnjeg _______.", answer: "tržišta", hint: "gospodarski prostor", id: "04f002" },
      { sentence: "Jedinstveni europski akt ukinuo je za usklađivanje zahtjev jednoglasnosti i uveo odlučivanje kvalificiranom _______.", answer: "većinom", hint: "način glasovanja", id: "04f003" },
      { sentence: "Čl. 114. je opća odredba o usklađivanju, tj. lex _______.", answer: "generalis", hint: "latinski izraz, suprotno od specialis", id: "04f004" },
      { sentence: "Prema čl. 114. st. 3. UFEU-a Komisija u prijedlozima o zaštiti potrošača polazi od _______ razine zaštite.", answer: "visoke", hint: "suprotno od minimalne", id: "04f005" },
      { sentence: "Mjerama usklađivanja smiju se sprječavati i _______ prepreke trgovini ako je njihova pojava vjerojatna.", answer: "buduće", hint: "vremenski pridjev, ne trenutačne", id: "04f006" }
    ],
    learn: {
      title: "Pravna osnova usklađivanja: čl. 114. i 115. UFEU",
      content: `
<h3>Čl. 114. UFEU (ex čl. 95. UEZ, ex ex čl. 100.a UEEZ)</h3>
<p><strong>Jedinstveni europski akt (potpisan 1986., na snazi od 1. 7. 1987.)</strong> uveo je ex ex čl. 100.a UEEZ-a s ovlaštenjem za donošenje mjera usklađivanja radi uspostave i funkcioniranja unutarnjeg tržišta <strong>kvalificiranom većinom</strong>. Uklanjanjem zahtjeva jednoglasnosti iz ex ex čl. 100. UEEZ-a Unija je dobila pravni temelj koji je služio za usvajanje direktiva u cilju unutarnjeg tržišta. Zbog važnosti za zakonodavnu djelatnost Ugovor iz Lisabona premješta ga ispred ex čl. 100./94. i čini čl. 114. UFEU-a.</p>
<p><strong>St. 1.:</strong> osim ako je Ugovorima drukčije predviđeno, za ostvarenje ciljeva iz čl. 26. Europski parlament i Vijeće, odlučujući u skladu s redovnim zakonodavnim postupkom i nakon savjetovanja s Gospodarskim i socijalnim odborom, usvajaju mjere za usklađivanje odredaba zakona ili drugih propisa država članica čiji je cilj uspostava i funkcioniranje unutarnjeg tržišta.</p>
<p><strong>St. 3.:</strong> Komisija u svojim prijedlozima o zdravlju, sigurnosti, zaštiti okoliša i <strong>zaštiti potrošača</strong> polazi od <strong>visoke razine zaštite</strong>, posebice vodeći računa o novom razvoju utemeljenom na znanstvenim činjenicama; EP i Vijeće također teže tom cilju.</p>
<p>Široko se tumače „mjere”: obuhvaćaju sve izvore sekundarnog prava iz čl. 288. UFEU-a (uredbe, direktive, odluke, preporuke, mišljenja) te druge obvezujuće i neobvezujuće akte.</p>

<h3>Čl. 114. i čl. 115. – usporedba</h3>
<table>
<tr><th></th><th>Čl. 114. st. 1. UFEU</th><th>Čl. 115. UFEU</th></tr>
<tr><td>Akt</td><td><strong>Mjere</strong> za usklađivanje odredaba zakona i drugih propisa radi uspostave i funkcioniranja unutarnjeg tržišta</td><td><strong>Direktive</strong> za usklađivanje onih propisa koji izravno utječu na uspostavu ili funkcioniranje unutarnjeg tržišta</td></tr>
<tr><td>Postupak</td><td><strong>Redovni</strong> zakonodavni postupak i savjetovanje s Gospodarskim i socijalnim odborom</td><td><strong>Posebni</strong> zakonodavni postupak i savjetovanje s Europskim parlamentom i Gospodarskim i socijalnim odborom</td></tr>
<tr><td>Odlučivanje</td><td>Kvalificirana većina</td><td><strong>Jednoglasno</strong></td></tr>
</table>
<p>Čl. 115. je <strong>opća (supsidijarna) pravna osnova</strong> za direktive: čl. 114. st. 1. primjenjuje se „osim ako je Ugovorima drukčije predviđeno”, a čl. 115. traži jednoglasnost. Čl. 114. se ne primjenjuje na: <strong>fiskalne odredbe</strong>, odredbe o <strong>slobodnom kretanju osoba</strong> te odredbe o <strong>pravima i interesima zaposlenih</strong>. Budući da je čl. 114. opća odredba (<em>lex generalis</em>), isključenje je opravdano posebnim mjerama usklađivanja (npr. čl. 46. UFEU – <em>lex specialis</em>). Daljnja isključenja nalaze se u čl. 114. st. 4.–9. UFEU-a.</p>

<h3>Čl. 352. UFEU – klauzula fleksibilnosti</h3>
<p>Klauzula za popunjavanje pravnih praznina (klauzula fleksibilnosti) nije čl. 115., nego <strong>čl. 352. UFEU-a</strong> (ex čl. 308. UEZ-a, ex ex čl. 235. UEEZ-a). Ako je djelovanje Unije potrebno za ostvarenje ciljeva iz Ugovora u okviru politika određenih Ugovorima, a Ugovori nisu predvidjeli potrebne ovlasti, <strong>Vijeće jednoglasno</strong>, na prijedlog Komisije i uz suglasnost Europskog parlamenta, donosi odgovarajuće mjere. Služi samo kao dopuna: ne može proširiti ovlasti Unije izvan okvira Ugovora.</p>

<h3>Funkcionalnost usklađivanja</h3>
<p>Usklađivanje je uvjetovano i ograničeno ostvarenjem cilja uspostave i funkcioniranja unutarnjeg tržišta (čl. 26. UFEU; ranije čl. 3. UEZ: usklađivanje prava „u mjeri potrebnoj za funkcioniranje zajedničkog tržišta”).</p>

<h3>Predmet Tobacco Advertising I (C-376/98)</h3>
<p>Njemačka je tražila poništenje Direktive 98/43/EZ o oglašavanju i sponzoriranju duhanskih proizvoda, tvrdeći da su ex ex čl. 100.a, čl. 57. st. 2. i čl. 66. UEEZ-a pogrešne pravne osnove. Direktiva je zabranjivala sve oblike oglašavanja i sponzoriranja duhanskih proizvoda, a države članice mogle su zadržati strože uvjete radi zaštite zdravlja. Sud EU-a je ispitao doprinosi li direktiva <em>stvarno</em> uklanjanju prepreka slobodnom kretanju robe i pružanju usluga te tržišnom natjecanju. Zabranu oglašavanja npr. na pepeljarama, suncobranima ili u kinima nije povezao s olakšavanjem prekogranične trgovine, a ni s otklanjanjem prepreka tržišnom natjecanju, pa je direktivu proglasio <strong>ništetnom u cijelosti</strong>. Sud je naglasio da bi tumačenje čl. 100.a kao opće ovlasti za reguliranje unutarnjeg tržišta bilo protivno načelu ograničenih dodijeljenih ovlasti (danas čl. 5. UEU).</p>
<p><strong>Test duhana</strong> (uvjeti zakonitosti mjere iz čl. 114.):</p>
<ol>
<li>izvorni cilj mjere je poboljšanje uvjeta za uspostavu i funkcioniranje unutarnjeg tržišta;</li>
<li>mjera stvarno doprinosi uklanjanju prepreka temeljnim gospodarskim slobodama <strong>ili</strong> uklanjanju znatnih narušavanja tržišnog natjecanja (alternativni uvjeti; C-376/98, para. 84., 95.–97., 106.).</li>
</ol>
<p>Mjere mogu imati za cilj sprječavanje <strong>budućih</strong> prepreka trgovini koje bi mogle nastati zbog različitog razvoja nacionalnih prava, ali pod uvjetom da je pojava takvih prepreka <strong>vjerojatna</strong> i da je mjera <strong>prikladna</strong> da ih spriječi (predmet British American Tobacco, C-491/01).</p>
<p><strong>Napomena o izmjeni:</strong> u ranijem tekstu Ugovora ovlast je bila u ex čl. 95. UEZ-a, a postupak suodlučivanja nazivao se postupkom iz čl. 251.; od Lisabona to je redovni zakonodavni postupak.</p>
`,
      id: "04l000"
    },
    id: "04k000"
  },

  granicePravaUnije: {
    name: "Ograničenja usklađivanja: dodijeljene ovlasti, supsidijarnost, proporcionalnost",
    icon: "fa-ruler-combined",
    color: "#06b6d4",
    flashcards: [
      { question: "Što je načelo ograničenih dodijeljenih ovlasti (čl. 5. st. 2. UEU)?", answer: "Unija djeluje samo u granicama nadležnosti koje su joj države članice dodijelile Ugovorima; ostale nadležnosti ostaju državama članicama.", explanation: "Uz čl. 13. st. 2. UEU za institucije.", id: "05c001" },
      { question: "Kakva je nadležnost Unije za unutarnje tržište?", answer: "Podijeljena nadležnost s državama članicama (čl. 4. st. 2. točka (a) UFEU).", explanation: "Države članice djeluju samo ako Unija nije izvršila nadležnost (čl. 2. st. 2. UFEU).", id: "05c002" },
      { question: "Što propisuje načelo supsidijarnosti (čl. 5. st. 3. UEU)?", answer: "Izvan isključive nadležnosti Unija djeluje samo ako ciljeve ne mogu dostatno ostvariti države članice, a bolje ih ostvaruje Unija zbog opsega ili učinaka.", explanation: "Tri provjere: područje, nužnost, učinkovitost.", id: "05c003" },
      { question: "Što propisuje načelo proporcionalnosti (čl. 5. st. 4. UEU)?", answer: "Sadržaj i oblik djelovanja Unije ne prelazi ono što je nužno za ostvarenje ciljeva Ugovora.", explanation: "Prikladnost, nužnost i proporcionalnost u užem smislu.", id: "05c004" },
      { question: "Koja tri dijela ima test proporcionalnosti?", answer: "Prikladnost, nužnost (najblaža moguća mjera) i proporcionalnost u užem smislu (ravnoteža između cilja i suprotstavljenih interesa).", explanation: "Predmet C-380/03: zakonitost mjere pogođena je samo ako je očito neprikladna.", id: "05c005" },
      { question: "Što određuje čl. 345. UFEU?", answer: "Ugovori ni na koji način ne zadiru u pravila država članica kojima se uređuje sustav vlasništva.", explanation: "Ne izuzima vlasništvo iz temeljnih sloboda (Essent).", id: "05c006" },
      { question: "Što određuje čl. 149. st. 2. UFEU o poticajnim mjerama zapošljavanja?", answer: "Te mjere ne uključuju harmonizaciju zakona i uredbi država članica.", explanation: "Primjer zabrane harmonizacije.", id: "05c007" },
      { question: "Što je Sud EU-a utvrdio u predmetu Hauer (44/79) o pravu vlasništva?", answer: "Pravo vlasništva zajamčeno je u pravnom poretku Unije u skladu s idejama zajedničkim ustavima država članica, koje se ogledaju i u Prvom protokolu uz EKLJP.", explanation: "Para. 17.; zabrana novih nasada vinove loze.", id: "05c008" }
    ],
    quiz: [
      {
        question: "Unutarnje tržište spada u:",
        options: [
          "isključivu nadležnost država članica",
          "podijeljenu nadležnost Unije i država članica",
          "isključivu nadležnost Unije",
          "područje u kojem Unija koordinira politike država članica"
        ],
        correct: 1, id: "05q001"
      },
      {
        question: "Kad Unija izvrši podijeljenu nadležnost, države članice:",
        options: [
          "djeluju samo ako Unija nije izvršila svoju nadležnost",
          "i dalje mogu slobodno uređivati to područje i protivno propisu Unije",
          "gube nadležnost u srodnim područjima na neodređeno vrijeme",
          "smiju djelovati uz prethodnu suglasnost Suda EU-a"
        ],
        correct: 0, id: "05q002"
      },
      {
        question: "Načelo supsidijarnosti uvjetuje djelovanje Unije time da:",
        options: [
          "ciljeve bolje ostvaruje Unija jer ih države ne mogu dostatno ostvariti",
          "države članice jednoglasno pristanu na mjeru",
          "mjera mora biti blaža od nacionalnih mjera istog cilja",
          "se djelovanje ograničava na područja isključive nadležnosti Unije"
        ],
        correct: 0, id: "05q003"
      },
      {
        question: "Koji element testa proporcionalnosti traži izbor najmanje otežavajuće mjere?",
        options: [
          "prikladnost mjere",
          "proporcionalnost u užem smislu",
          "nužnost mjere",
          "ex officio primjena"
        ],
        correct: 2, id: "05q004"
      },
      {
        question: "Hrvatski zakonodavac pri izmjeni već usklađenih odredaba o nepoštenim ugovornim odredbama:",
        options: [
          "smije uvesti proturječna pravila jer je zaštita potrošača njegova nadležnost",
          "mora tražiti odobrenje Komisije za svaku izmjenu zakona",
          "ne može uvesti pravila koja bi to područje uređivala suprotno direktivi",
          "može ukinuti odredbe preuzete direktivom ako ih smatra nepotrebnima"
        ],
        correct: 2, id: "05q005"
      },
      {
        question: "U predmetu Hauer Sud EU-a utvrdio je da je pravo vlasništva:",
        options: [
          "izuzeto iz pravnog poretka Unije jer ga uređuje nacionalno pravo država članica",
          "podređeno općim ovlastima Komisije nad uređenjem tržišta vina",
          "zajamčeno tek Poveljom o temeljnim pravima koja je donesena nakon te presude",
          "zajamčeno u pravnom poretku Unije prema idejama zajedničkim ustavima država članica"
        ],
        correct: 3, id: "05q006"
      }
    ],
    fillBlanks: [
      { sentence: "Nadležnosti koje Ugovorima nisu dodijeljene Uniji ostaju kod država _______.", answer: "članica", hint: "imenica uz „država”", id: "05f001" },
      { sentence: "Unutarnje tržište je u pravu Unije područje _______ nadležnosti Unije i država članica.", answer: "podijeljene", hint: "suprotno od isključive", id: "05f002" },
      { sentence: "Prema načelu _______ Unija djeluje u neisključivim područjima samo ako države članice ne mogu dostatno ostvariti ciljeve.", answer: "supsidijarnosti", hint: "čl. 5. st. 3. UEU", id: "05f003" },
      { sentence: "Prema čl. 345. UFEU Ugovori ne zadiru u pravila kojima države članice uređuju sustav _______.", answer: "vlasništva", hint: "stvarno pravo", id: "05f004" },
      { sentence: "Poticajne mjere zapošljavanja iz čl. 149. st. 2. UFEU-a ne smiju uključivati _______ zakona država članica.", answer: "harmonizaciju", hint: "radnja koju Unija tu ne smije provoditi", id: "05f005" }
    ],
    learn: {
      title: "Ograničenja usklađivanja: dodijeljene ovlasti, supsidijarnost, proporcionalnost",
      content: `
<h3>Ograničenja usklađivanja</h3>
<ol>
<li>funkcionalnost odredaba o usklađivanju (vezano uz unutarnje tržište);</li>
<li>ograničena nadležnost EU-a – načela ograničenih dodijeljenih ovlasti, supsidijarnosti i proporcionalnosti;</li>
<li>pravila o zabrani/isključenju harmonizacije;</li>
<li>isključena područja privatnog prava.</li>
</ol>

<h3>Načelo ograničenih dodijeljenih ovlasti</h3>
<p><strong>Čl. 5. st. 1. UEU:</strong> granice nadležnosti Unije uređene su načelom ograničenih dodijeljenih ovlasti, a korištenje nadležnostima načelima supsidijarnosti i proporcionalnosti. <strong>Čl. 5. st. 2.:</strong> Unija djeluje samo u granicama nadležnosti koje su joj države članice dodijelile Ugovorima kako bi ostvarila njima određene ciljeve; nadležnosti koje nisu dodijeljene ostaju kod država članica. <strong>Čl. 13. st. 2. UEU:</strong> svaka institucija djeluje u granicama ovlasti koje su joj dodijeljene Ugovorima i u skladu s određenim postupcima, uvjetima i ciljevima.</p>
<p>Prema <strong>čl. 4. st. 2. točki (a) UFEU</strong> unutarnje tržište je područje <strong>podijeljene nadležnosti</strong>. Prema <strong>čl. 2. st. 2. UFEU</strong> Unija i države članice mogu donositi pravno obvezujuće akte, ali države članice vrše nadležnost samo u mjeri u kojoj Unija nije izvršila svoju. <em>Primjer:</em> hrvatski zakonodavac ne može mijenjati i dopunjavati već usklađene odredbe o nepoštenim ugovornim odredbama tako da to pitanje urede suprotno odredbama preuzete Direktive 93/13/EEZ.</p>

<h3>Načelo supsidijarnosti (čl. 5. st. 3. UEU)</h3>
<p>U područjima izvan isključive nadležnosti Unija djeluje samo ako i u mjeri u kojoj ciljeve predloženog djelovanja <strong>ne mogu dostatno ostvariti države članice</strong> (na središnjoj, regionalnoj ili lokalnoj razini), a zbog opsega ili učinaka ih <strong>može bolje ostvariti Unija</strong>. Provjere: (1) područje ne spada u isključivu nadležnost Unije; (2) nužnost djelovanja – države članice ne mogu dostatno ostvariti cilj; (3) učinkovitost djelovanja – Unija ga može bolje ostvariti. Prema predmetu C-491/01 <em>British American Tobacco</em> načelo vrijedi kad se zakonodavac poziva na čl. 114. UFEU jer on ne daje isključivu nadležnost za uređenje gospodarskih djelatnosti na unutarnjem tržištu, nego samo za poboljšanje uvjeta uspostave i funkcioniranja tržišta.</p>

<h3>Načelo proporcionalnosti (čl. 5. st. 4. UEU)</h3>
<p>Sadržaj i oblik djelovanja Unije ne prelazi ono što je nužno za ostvarenje ciljeva Ugovora; primjenjuje se prema Protokolu o primjeni načela supsidijarnosti i proporcionalnosti. Test proporcionalnosti:</p>
<ul>
<li><strong>prikladnost</strong> – mjera slijedi legitimni cilj i prikladna je za njegovo ostvarenje;</li>
<li><strong>nužnost</strong> – mjera ne prelazi ono što je nužno; ako postoji više prikladnih mjera, bira se najmanje otežavajuća;</li>
<li><strong>proporcionalnost u užem smislu</strong> – mjera vodi računa o ravnoteži između ostvarenja ciljeva Unije i suprotstavljenih interesa.</li>
</ul>
<p>Predmet C-380/03 <em>Njemačka protiv Parlamenta i Vijeća</em>: sredstva moraju biti prikladna za postizanje cilja i ne smiju ići izvan nužnog; zakonitost mjere pogođena je samo ako je mjera očito neprikladna s obzirom na cilj. Primjer iz preambule Direktive 2011/83/EU (recital 65.): direktiva u skladu s načelom proporcionalnosti ne ide izvan onoga što je nužno za postizanje cilja.</p>

<h3>Zabrana (isključenje) harmonizacije</h3>
<p><strong>Čl. 149. st. 2. UFEU:</strong> poticajne mjere za promicanje suradnje i djelovanja država članica u području zapošljavanja „neće uključivati harmonizaciju zakona i uredbi država članica”.</p>

<h3>Isključena područja privatnog prava – čl. 345. UFEU</h3>
<p>„Ugovori ni na koji način ne zadiru u pravila država članica kojima se uređuje sustav vlasništva.” Pravo vlasništva zajamčeno je u pravnom poretku Unije u skladu s idejama zajedničkim ustavima država članica, koje se ogledaju i u Prvom protokolu uz EKLJP (predmet 44/79 <em>Hauer</em>, EU:C:1979:290, para. 17.; zabrana novih nasada vinove loze). Učinak čl. 345. nije izuzeti sustav vlasništva država članica iz temeljnih pravila UFEU-a, osobito iz pravila o nediskriminaciji, slobodi poslovnog nastana i slobodi kretanja kapitala (spojeni predmeti C-105/12 do C-107/12 <em>Essent</em>, para. 30. i 36.). Više u cjelini o europskom stvarnom pravu.</p>
`,
      id: "05l000"
    },
    id: "05k000"
  },

  uredbeUPrivatnomPravu: {
    name: "Uredbe u privatnom pravu",
    icon: "fa-file-contract",
    color: "#a855f7",
    flashcards: [
      { question: "Koja obilježja uredbe propisuje čl. 288. st. 2. UFEU?", answer: "Ima opću primjenu, obvezuje u cijelosti i izravno je primjenjiva u svim državama članicama.", explanation: "Adresati su države članice i njihovi državljani.", id: "06c001" },
      { question: "Razlika između izravne primjene i izravnog učinka uredbe?", answer: "Izravna primjena: uredba vrijedi bez preuzimanja. Izravni učinak: njezine odredbe daju prava pojedincima koja nacionalni sudovi moraju štititi.", explanation: "Uvjeti izravnog učinka kod uredbi redovito su ispunjeni.", id: "06c002" },
      { question: "Djeluje li uredba u vertikalnim i horizontalnim odnosima?", answer: "Da: može dodjeljivati prava ili obvezivati osobe privatnog prava i prema državi i prema drugim osobama privatnog prava.", explanation: "Predmet Leonesio (93/71).", id: "06c003" },
      { question: "Što se događa s nacionalnom odredbom suprotnom uredbi?", answer: "Nije ništetna, ali mora ostati izvan primjene jer uredba ima prvenstvo u primjeni.", explanation: "Dužnost neprimjene po službenoj dužnosti.", id: "06c004" },
      { question: "Što su nepotpune („šepajuće”) uredbe?", answer: "Uredbe koje za primjenu traže provedbene mjere država članica pa ne ispunjavaju u cijelosti obilježje izravne primjene.", explanation: "Iznimka od pravila o izravnoj primjeni.", id: "06c005" },
      { question: "Koja je razlika uredbe i direktive s gledišta stupnja harmonizacije?", answer: "Uredba ujednačava (unificira) propise država članica, a direktiva ih usklađuje ostavljajući izbor oblika i metoda.", explanation: "Uredba je strože sredstvo od direktive.", id: "06c006" },
      { question: "Primjer uredbe koja državama članicama ostavlja prostor?", answer: "Opća uredba o zaštiti podataka (EU) 2016/679, čl. 88. st. 1.: države mogu propisati preciznija pravila za obradu podataka zaposlenika.", explanation: "Uredba nije uvijek potpuno ujednačujuća.", id: "06c007" },
      { question: "Što je Sud EU-a naveo u predmetu 819/79 Njemačka protiv Komisije o primjeni uredbi?", answer: "Odredbe uredbi Zajednice moraju se u svim državama članicama primjenjivati na ujednačen način i, koliko je moguće, postići jedan učinak na zajedničkom području.", explanation: "Uredba služi ujednačavanju.", id: "06c008" }
    ],
    quiz: [
      {
        question: "Uredba iz čl. 288. st. 2. UFEU-a je akt koji:",
        options: [
          "obvezuje države u pogledu rezultata, a oblik i metode prepušta državama",
          "ima opću primjenu, obvezuje u cijelosti i izravno je primjenjiva",
          "obvezuje one kojima je upućen i nema opću primjenu",
          "ima snagu neobvezujuće preporuke prema državama članicama"
        ],
        correct: 1, id: "06q001"
      },
      {
        question: "Domaća odredba koja je u suprotnosti s uredbom:",
        options: [
          "ništetna je, i to od trenutka stupanja uredbe na snagu",
          "mora biti ukinuta, i to prije nego što uredba počne vrijediti",
          "valjana je, jer ju je donio parlament države članice",
          "ostaje na snazi, ali se zbog prvenstva uredbe ne primjenjuje"
        ],
        correct: 3, id: "06q002"
      },
      {
        question: "Uredba u privatnom pravu može obvezivati osobe privatnog prava:",
        options: [
          "prema državi, ali tek nakon donošenja provedbenog zakona države članice",
          "prema drugim osobama privatnog prava, dok prema državi nema učinka",
          "u odnosu na osobe koje su izričito navedene u primarnom pravu Unije",
          "i prema državi i prema drugim osobama privatnog prava"
        ],
        correct: 3, id: "06q003"
      },
      {
        question: "Za razliku od direktive, uredba je sredstvo koje je prikladno za:",
        options: [
          "ujednačavanje, a ne samo usklađivanje propisa",
          "minimalno usklađivanje, uz slobodu država da zaoštre zaštitu",
          "uređivanje odnosa između država članica i Unije, a ne privatnih osoba",
          "postizanje rezultata, uz potpuni izbor oblika i metoda"
        ],
        correct: 0, id: "06q004"
      },
      {
        question: "Koji se primjer navodi kao uredba koja ipak dopušta nacionalna preciznija pravila?",
        options: [
          "Uredba o statutu europskog društva",
          "Uredba o prekograničnim plaćanjima",
          "Uredba o zaštiti osobnih podataka",
          "Uredba o zabrani geografskog blokiranja"
        ],
        correct: 2, id: "06q005"
      },
      {
        question: "Prema predmetu 819/79 Njemačka protiv Komisije odredbe uredbi moraju se u državama članicama primjenjivati:",
        options: [
          "prema običajima i pravnoj tradiciji svake države članice",
          "tek nakon što ih nacionalni zakonodavac preuzme u svoje pravo",
          "na ujednačen način radi jednakog učinka na zajedničkom području",
          "različito prema odluci nacionalnih sudova svake države"
        ],
        correct: 2, id: "06q006"
      }
    ],
    fillBlanks: [
      { sentence: "Uredba je prema čl. 288. st. 2. UFEU-a u svim državama članicama _______ primjenjiva.", answer: "izravno", hint: "bez posrednih mjera", id: "06f001" },
      { sentence: "Nacionalne odredbe suprotne uredbi nisu ništetne, nego ostaju izvan _______.", answer: "primjene", hint: "područje u kojem se norma ne koristi", id: "06f002" },
      { sentence: "Uredbe koje traže provedbu država članica nazivaju se nepotpune ili _______ uredbe.", answer: "šepajuće", hint: "slikovit pridjev", id: "06f003" },
      { sentence: "Uredba je pogodno sredstvo za _______ propisa država članica, a ne samo njihovo usklađivanje.", answer: "ujednačavanje", hint: "unifikacija", id: "06f004" }
    ],
    learn: {
      title: "Uredbe u privatnom pravu",
      content: `
<h3>Obilježja uredbe (čl. 288. st. 2. UFEU)</h3>
<ul>
<li><strong>opća primjena</strong>;</li>
<li><strong>obvezuje u cijelosti</strong> (ne samo u pogledu rezultata);</li>
<li><strong>izravno je primjenjiva</strong> u državama članicama – ne treba je preuzimati u nacionalno pravo.</li>
</ul>
<p>Izravni adresati su države članice i njihovi državljani. Uredba je učinkovitija kao sredstvo postupovne zaštite prava pojedinaca nego kao izvor kojim bi se uređivala subjektivna prava pojedinaca. Iznimke su nepotpune („šepajuće”) uredbe koje traže provedbene mjere.</p>

<h3>Djelovanje i učinci uredbe</h3>
<p>Treba razlikovati <em>djelovanje</em> (izravna primjena) od <em>učinaka</em>: uredba djeluje izravno i ima izravne učinke. Opće pretpostavke izravnog učinka koje je razvio Sud EU-a (dovoljna određenost odredbi, bezuvjetnost i nepostojanje potrebe preuzimanja) u privatnom će pravu kod uredbi redovito biti ispunjene. Učinak je moguć u <strong>vertikalnim i horizontalnim</strong> odnosima, tj. uredba može osobama privatnog prava izravno dodjeljivati prava ili ih obvezivati prema drugim osobama privatnog prava.</p>
<p>Predmet 93/71 <em>Leonesio</em>: uredba ima izravni učinak i kao takva sposobna je stvarati prava za pojedince koja nacionalni sudovi moraju štititi; prava prema državi nastaju kad su ispunjeni uvjeti iz uredbe, a njihovo ostvarivanje nije moguće uvjetovati dodatnim provedbenim odredbama.</p>
<p>Zbog neposrednog djelovanja uredba ima <strong>prvenstvo u primjeni</strong>: domaće odredbe suprotne njezinu sadržaju <strong>nisu ništetne, ali moraju ostati izvan primjene</strong>.</p>

<h3>Uredba u odnosu na direktivu</h3>
<p>Uredba je za države članice strože (otegotnije) sredstvo nego direktiva. Zato se prema načelu proporcionalnosti iz čl. 5. st. 4. UEU-a za usklađivanje privatnog prava u pravilu bira direktiva, a uredba onda kad je potrebno ujednačavanje.</p>
<p><strong>Primjeri uredbi u privatnom pravu:</strong> Uredba 1/2003 o provedbi pravila o tržišnom natjecanju; uredba o statutu europskog društva (<em>societas europaea</em>); uredba o europskom gospodarskom interesnom udruženju; uredba o statutu europskih zadruga; uredba o žigu Europske unije; uredba o dizajnu Zajednice (od 1. 5. 2025. „dizajn Europske unije”); uredba o slobodi kretanja radnika u Uniji; uredba o općim pravilima odštete i pomoći putnicima u slučaju uskraćenog ukrcaja, otkazivanja ili dužeg kašnjenja leta; uredba o prekograničnim plaćanjima; uredba o kreditnim transferima i izravnim terećenjima u euru (SEPA); uredba o uslugama prekogranične dostave paketa; uredba o zabrani geografskog blokiranja.</p>

<h3>Stupanj harmonizacije uredbom</h3>
<p>Uredba je pogodna za <strong>ujednačavanje</strong>, a ne usklađivanje propisa. Predmet 819/79 <em>Njemačka protiv Komisije</em>: odredbe uredbi Zajednice moraju se u svim državama članicama primjenjivati na ujednačen način i na zajedničkom području, koliko je moguće, postići jedan učinak.</p>
<p><strong>Iznimka – Opća uredba o zaštiti podataka</strong> (Uredba (EU) 2016/679), čl. 88. st. 1.: države članice mogu zakonom ili kolektivnim ugovorima propisati <em>preciznija pravila</em> radi zaštite prava i sloboda u vezi s obradom osobnih podataka zaposlenika u kontekstu zaposlenja (zapošljavanje, izvršavanje ugovora o radu, upravljanje i organizacija rada, jednakost na radnom mjestu, zdravlje i sigurnost, zaštita imovine, prestanak radnog odnosa).</p>
<p><strong>Napomena o izmjeni:</strong> uredba o slobodi kretanja radnika danas je Uredba (EU) br. 492/2011 (zamijenila je Uredbu 1612/68), a Opća uredba o zaštiti podataka zamijenila je ranije Direktivu 95/46/EZ – primjer prelaska s direktive na uredbu radi ujednačavanja. Uredbom (EU) 2024/2822 dizajn Zajednice od 1. 5. 2025. nosi naziv „dizajn Europske unije” (Uredba 6/2002 kako je izmijenjena).</p>
`,
      id: "06l000"
    },
    id: "06k000"
  },

  direktiveIIntenzitetHarmonizacije: {
    name: "Direktive i intenzitet harmonizacije",
    icon: "fa-sliders",
    color: "#6366f1",
    flashcards: [
      { question: "Što određuje čl. 288. st. 3. UFEU o direktivi?", answer: "Direktiva obvezuje države članice u pogledu rezultata koji treba postići, a izbor oblika i metoda prepušta nacionalnim tijelima.", explanation: "Primjenjuje se posredno, preuzimanjem u nacionalno pravo.", id: "07c001" },
      { question: "Koja su dva stadija djelovanja direktive?", answer: "1. objava i početak roka za preuzimanje (dužnost preuzimanja i suzdržavanja); 2. usklađivanje nacionalnog prava u roku uz slobodu izbora metoda.", explanation: "U prvom stadiju država ne smije ugroziti cilj direktive.", id: "07c002" },
      { question: "Razlika vertikalne i horizontalne direktive?", answer: "Vertikalna izdvojeno uređuje određenu problematiku; horizontalna (okvirna) pokriva veći broj pitanja iz više područja.", explanation: "Primjer horizontalne: Direktiva 2011/83/EU.", id: "07c003" },
      { question: "Što je minimalna harmonizacija?", answer: "Nacionalni zakonodavac smije propisati viši stupanj zaštite od onog u direktivi; posljedica su mnogobrojne razlike među propisima država članica.", explanation: "Klauzula u Direktivi 97/7/EZ, čl. 14.", id: "07c004" },
      { question: "Što je maksimalna harmonizacija?", answer: "Država članica ne smije zadržati ni uvesti odredbe koje odstupaju od direktive, ni strože radi veće zaštite potrošača; rijetka je i nefleksibilna.", explanation: "Primjeri: Direktiva 2005/29/EZ; 2008/48/EZ.", id: "07c005" },
      { question: "Što je potpuna ciljana harmonizacija?", answer: "Potpuna harmonizacija pitanja koja direktiva uređuje, uz mogućnost iznimaka, opcija i proširenja polja primjene (npr. Direktiva 2011/83/EU, čl. 4.).", explanation: "Države smiju odstupati samo gdje je direktivom predviđeno.", id: "07c006" },
      { question: "Što je mješovita (diferencirana) harmonizacija?", answer: "Kombinacija različitih stupnjeva harmonizacije u istoj direktivi; npr. Direktiva 2014/17/EU o stambenim potrošačkim kreditima (čl. 2.).", explanation: "Minimalna uz iznimke maksimalne (ESIS, EKS).", id: "07c007" }
    ],
    quiz: [
      {
        question: "Direktiva se na pojedince u pravilu primjenjuje:",
        options: [
          "izravno, od dana objave u Službenom listu EU-a",
          "posredno, nakon preuzimanja u nacionalno pravo",
          "izravno, od isteka roka za preuzimanje",
          "tek nakon odluke Suda EU-a o povredi države"
        ],
        correct: 1, id: "07q001"
      },
      {
        question: "U prvom stadiju djelovanja direktive države članice moraju:",
        options: [
          "odmah primjenjivati direktivu kao da je uredba",
          "izravno ukinuti proturječne odredbe bez preuzimanja",
          "ne ugrožavati propisima ili praksom cilj direktive",
          "ne mijenjati postojeće propise iz područja direktive"
        ],
        correct: 2, id: "07q002"
      },
      {
        question: "Okvirna direktiva koja pokriva više pitanja iz više područja zove se:",
        options: [
          "vertikalna direktiva",
          "minimalna direktiva",
          "djelomična direktiva",
          "horizontalna direktiva"
        ],
        correct: 3, id: "07q003"
      },
      {
        question: "Hrvatska je preuzimanjem minimalno harmoniziranih direktiva iz 1985. i 1997. povisila razinu zaštite tako da je:",
        options: [
          "rok za jednostrani raskid produljen sa 7 na 14 radnih dana",
          "ukinuto pravo na jednostrani raskid kod ugovora na daljinu",
          "rok za jednostrani raskid skraćen na 7 kalendarskih dana",
          "potrošačima uskraćen povrat novca nakon raskida ugovora"
        ],
        correct: 0, id: "07q004"
      },
      {
        question: "Mediaprint (C-540/08) odnosi se na zabranu strožih pravila od onih u Direktivi 2005/29/EZ jer ona:",
        options: [
          "dopušta državama članicama strože zaštitne mjere",
          "potpuno harmonizira pravila o nepoštenim poslovnim praksama",
          "uređuje odnose između trgovaca međusobno",
          "ostavlja uređenje poslovnih praksi nacionalnom pravu država članica"
        ],
        correct: 1, id: "07q005"
      },
      {
        question: "Direktiva 2014/17/EU o stambenim potrošačkim kreditima primjer je:",
        options: [
          "minimalne harmonizacije svih njezinih odredaba",
          "maksimalne harmonizacije svih njezinih odredaba",
          "harmonizacije koja se primjenjuje na prekogranične kredite",
          "mješovite harmonizacije s različitim stupnjem po odredbama"
        ],
        correct: 3, id: "07q006"
      }
    ],
    fillBlanks: [
      { sentence: "Direktiva obvezuje države članice u pogledu rezultata, a izbor oblika i _______ prepušta nacionalnim tijelima.", answer: "metoda", hint: "način postizanja rezultata", id: "07f001" },
      { sentence: "Direktiva koja uređuje samo jedno izdvojeno područje naziva se _______ direktiva.", answer: "vertikalna", hint: "suprotno od horizontalne", id: "07f002" },
      { sentence: "Kod minimalne harmonizacije država članica smije propisati viši stupanj _______ nego direktiva.", answer: "zaštite", hint: "odnosi se na potrošače", id: "07f003" },
      { sentence: "Rijetka i nefleksibilna harmonizacija, bliska uredbama, zove se _______ harmonizacija.", answer: "maksimalna", hint: "suprotno od minimalne", id: "07f004" },
      { sentence: "Direktiva 2011/83/EU primjer je potpune _______ harmonizacije.", answer: "ciljane", hint: "usmjerene na određene aspekte", id: "07f005" }
    ],
    learn: {
      title: "Direktive i intenzitet harmonizacije",
      content: `
<h3>Direktiva (čl. 288. st. 3. UFEU)</h3>
<ul>
<li>obvezuje sve države članice <strong>u pogledu rezultata</strong>, a <strong>izbor oblika i metoda</strong> prepušta nacionalnim tijelima;</li>
<li>primjenjuje se <strong>posredno</strong> – nužno ju je preuzeti u nacionalno zakonodavstvo;</li>
<li>akt opće i apstraktne naravi, prilagodljiv nacionalnim sustavima;</li>
<li>usklađivanje propisa: <strong>blaže sredstvo</strong> od uredbe.</li>
</ul>
<h3>Dva stadija djelovanja</h3>
<ol>
<li><strong>Prvi stadij</strong> – direktiva je usvojena i objavljena u Službenom listu EU-a, počinje teći rok za preuzimanje. Postoji samo dužnost preuzimanja te dužnost da država do tog trenutka ne usvaja propise niti primjenjuje postojeće pravo na način koji bi ugrozio cilj direktive.</li>
<li><strong>Drugi stadij</strong> – tijekom roka države članice usklađuju nacionalno pravo; postoji fleksibilnost u odabiru metoda i oblika.</li>
</ol>

<h3>Stupanj harmonizacije direktiva</h3>
<table>
<tr><th>Kriterij</th><th>Vrste</th></tr>
<tr><td>Prema predmetu</td><td><strong>vertikalna</strong> – izdvojeno uređenje određene problematike u pojedinim direktivama; <strong>horizontalna</strong> – pokriva više pitanja iz više područja okvirnim direktivama (npr. Direktiva 2011/83/EU o pravima potrošača, koja je zamijenila Direktivu 85/577/EEZ i Direktivu 97/7/EZ jednom direktivom)</td></tr>
<tr><td>Prema dosegu</td><td><strong>djelomična</strong> (Direktiva 2011/83/EU određuje standardna pravila za zajedničke aspekte ugovora, ali državama dopušta da za neke aspekte zadrže ili donesu nacionalna pravila) i <strong>potpuna</strong></td></tr>
</table>

<h3>Intenzitet harmonizacije</h3>
<ol>
<li><strong>Minimalna harmonizacija</strong> – nacionalni zakonodavac može predvidjeti viši stupanj zaštite od onog u direktivi. Primjer: preuzimajući Direktivu 85/577/EEZ i Direktivu 97/7/EZ (minimalna harmonizacija) hrvatski je zakonodavac produžio rok za jednostrani raskid sa 7 radnih dana na 14 radnih dana u Zakonu o zaštiti potrošača iz 2007. Klauzula minimalne harmonizacije (Direktiva 97/7/EZ, čl. 14.): države članice mogu uvesti i primjenjivati strože mjere u skladu s Ugovorom radi više razine zaštite potrošača. Posljedica: mnogobrojne razlike među propisima država članica.</li>
<li><strong>Maksimalna harmonizacija</strong> – u drugom stadiju državama se ne dopuštaju odstupanja; klauzule zabranjuju zadržavanje postojećih ili usvajanje novih propisa koji odstupaju od direktive. Rijetka je jer je nefleksibilna, približava se uredbi, a može dovesti do snižavanja razine pravne zaštite. Primjeri: Direktiva 2005/29/EZ o nepoštenoj poslovnoj praksi (recital 5.) i Direktiva 2008/48/EZ o potrošačkim kreditima (čl. 22. st. 1.). Predmet C-540/08 <em>Mediaprint</em>: budući da Direktiva 2005/29 potpuno harmonizira pravila o nepoštenim poslovnim praksama trgovaca prema potrošačima (čl. 4.), države članice ne smiju usvojiti stroža pravila, čak ni radi višeg stupnja zaštite potrošača.</li>
<li><strong>Potpuna ciljana harmonizacija</strong> – potpuna (maksimalna) harmonizacija pitanja koja direktiva uređuje. Moguća su odstupanja: iznimke, izbori među opcijama, proširenje polja primjene. Primjeri: Direktiva 2011/83/EU, čl. 4. (države ne smiju zadržati ni uvesti odredbe koje odstupaju, uključujući strože ili manje stroge, osim ako direktiva ne predviđa drukčije), čl. 5. st. 3. i 4. (države ne moraju primjenjivati pravila o informacijama na svakodnevne transakcije koje se izvršavaju odmah i mogu zadržati dodatne zahtjeve); Direktiva 2008/48/EZ, recital 10.</li>
<li><strong>Mješovita (diferencirana) harmonizacija</strong> – u istoj direktivi kombinacija različitih stupnjeva, od minimalne preko maksimalne do potpune ciljane. Primjer: Direktiva 2014/17/EU o stambenim potrošačkim kreditima, čl. 2. (strože odredbe dopuštene, ali ne u odnosu na europski standardizirani informativni obrazac (ESIS) i izračun efektivne kamatne stope (EKS)).</li>
</ol>
<p><strong>Napomena o izmjeni:</strong> Direktivu 2008/48/EZ o potrošačkim kreditima zamjenjuje Direktiva (EU) 2023/2225 o ugovorima o potrošačkim kreditima, i to s učinkom od 20. 11. 2026. (rok za preuzimanje bio je 20. 11. 2025.); do tog datuma Direktiva 2008/48/EZ još vrijedi i dalje se primjenjuje na kreditne ugovore sklopljene prije 20. 11. 2026. Nova direktiva također počiva na potpunoj harmonizaciji. Direktiva 2011/83/EU izmijenjena je Direktivom (EU) 2019/2161 („Omnibus”). Hrvatski rok za jednostrani raskid danas je 14 dana (Direktiva 2011/83/EU i Zakon o zaštiti potrošača iz 2022.).</p>
`,
      id: "07l000"
    },
    id: "07k000"
  },

  preuzimanjeDirektiva: {
    name: "Preuzimanje direktiva u nacionalno pravo",
    icon: "fa-file-import",
    color: "#10b981",
    flashcards: [
      { question: "Odakle proizlazi dužnost pravodobnog i ispravnog preuzimanja direktive?", answer: "Iz definicije direktive (čl. 288. st. 3. UFEU) i načela lojalnosti i iskrene suradnje (čl. 4. st. 3. UEU).", explanation: "Rok je u prijelaznim i završnim odredbama direktive.", id: "08c001" },
      { question: "Je li rok za preuzimanje isto što i datum početka primjene?", answer: "Ne: Direktiva 2011/83/EU – donošenje do 13. 12. 2013., a primjena mjera od 13. 6. 2014.", explanation: "Rok teče od objave u Službenom listu.", id: "08c002" },
      { question: "Što obuhvaća načelo lojalnosti iz čl. 4. st. 3. UEU?", answer: "Države članice poduzimaju sve odgovarajuće mjere za ispunjenje obveza, olakšavaju zadaće Unije i suzdržavaju se od mjera koje bi ugrozile njezine ciljeve.", explanation: "Dva podnačela: lojalnost i iskrena suradnja.", id: "08c003" },
      { question: "Što propisuje Ustav RH o pravu EU-a (glava VIII.)?", answer: "Akti prihvaćeni u institucijama EU-a primjenjuju se u skladu s pravnom stečevinom, a državna tijela izravno primjenjuju pravo EU-a; sudovi štite subjektivna prava iz stečevine.", explanation: "Čl. 143.–146. Ustava (NN 85/10); u Promjeni Ustava NN 76/10 čl. 141.a–141.d.", id: "08c004" },
      { question: "Koje su dvije tehnike preuzimanja direktiva?", answer: "Copy-paste (doslovno preuzimanje teksta, rizik sadržajne neusklađenosti) i tehnika „prevođenja” pojmova u nacionalne (rizik jezične neusklađenosti).", explanation: "Preuzimanje i sudsko tumačenje općih načela.", id: "08c005" },
      { question: "Koja su tri ishoda preuzimanja direktive?", answer: "Ispravno usklađeno, neispravno usklađeno i neusklađeno nacionalno pravo (uključuje i zakašnjelo usklađivanje).", explanation: "Utječu na izbor mehanizma zaštite.", id: "08c006" },
      { question: "Što je u Sporazumu o stabilizaciji i pridruživanju bila „harmonizacijska klauzula”?", answer: "Čl. 69. st. 1. SSP-a: Hrvatska nastoji postupno uskladiti postojeće i buduće zakonodavstvo s pravnom stečevinom Zajednice (acquis).", explanation: "Sporazum je bio u primjeni od 2005.", id: "08c007" },
      { question: "Koji je rok za preuzimanje Direktive 1999/44/EZ o prodaji robe široke potrošnje?", answer: "Države članice morale su usvojiti potrebne propise najkasnije do 1. 1. 2002. (čl. 11. Direktive 1999/44/EZ).", explanation: "Zamijenjena je Direktivom (EU) 2019/771.", id: "08c008" },
      { question: "Što određuje Direktiva 2014/104/EU o roku preuzimanja i vremenskoj primjeni?", answer: "Propisi se donose do 27. 12. 2016.; mjere se ne primjenjuju retroaktivno ni na postupke naknade štete pokrenute pred sudom prije 26. 12. 2014. (čl. 21., 22.).", explanation: "Direktiva o naknadi štete zbog povrede prava tržišnog natjecanja.", id: "08c009" }
    ],
    quiz: [
      {
        question: "Rok za preuzimanje direktive počinje teći:",
        options: [
          "od potpisivanja direktive u Vijeću",
          "od dana objave direktive u Službenom listu EU-a",
          "od dana stupanja na snagu nacionalnog provedbenog zakona",
          "od dana kad Komisija pozove državu na preuzimanje"
        ],
        correct: 1, id: "08q001"
      },
      {
        question: "Direktiva 2011/83/EU zahtijevala je od država članica da mjere usvoje i objave do 13. 12. 2013., a primjenjuju se od:",
        options: [
          "13. 12. 2013., istodobno s istekom roka za preuzimanje",
          "13. 12. 2015., dvije godine nakon roka za preuzimanje",
          "13. 6. 2014., šest mjeseci nakon roka za preuzimanje",
          "1. 1. 2014., s početkom sljedeće kalendarske godine"
        ],
        correct: 2, id: "08q002"
      },
      {
        question: "Čl. 4. st. 3. UEU uređuje načelo:",
        options: [
          "supsidijarnosti i proporcionalnosti djelovanja Unije",
          "lojalnosti i iskrene suradnje država članica i Unije",
          "nadređenosti prava Unije nad nacionalnim ustavima",
          "ograničenih dodijeljenih ovlasti institucija Unije"
        ],
        correct: 1, id: "08q003"
      },
      {
        question: "Tehnika preuzimanja kojom se tekst direktive doslovno prenosi u domaće pravo ima rizik:",
        options: [
          "jezične neusklađenosti zbog prevođenja pojmova",
          "gubitka nadležnosti u korist Komisije",
          "sadržajne neusklađenosti s direktivom",
          "ništetnosti nacionalnih propisa o istoj temi"
        ],
        correct: 2, id: "08q004"
      },
      {
        question: "Ustav RH nakon pristupanja Uniji određuje da državna tijela:",
        options: [
          "primjenjuju pravo EU-a tek nakon što ga Sabor preuzme zakonom",
          "pravo EU-a primjenjuju u sporovima s elementom inozemnosti",
          "mogu odbiti primjenu prava EU-a ako se protivi hrvatskom ustavu",
          "pravo EU-a neposredno primjenjuju"
        ],
        correct: 3, id: "08q005"
      },
      {
        question: "Direktivu 1999/44/EZ o prodaji robe široke potrošnje države članice morale su preuzeti najkasnije do:",
        options: [
          "1. 1. 2002., prema čl. 11. te direktive",
          "13. 6. 2014., kao i za Direktivu 2011/83/EU",
          "27. 12. 2016., kao i za Direktivu 2014/104/EU",
          "1. 7. 2021., kao i za Direktivu 2019/771"
        ],
        correct: 0, id: "08q006"
      }
    ],
    fillBlanks: [
      { sentence: "Dužnost preuzimanja direktive proizlazi i iz načela lojalnosti i iskrene _______ iz čl. 4. st. 3. UEU-a.", answer: "suradnje", hint: "zajednički rad", id: "08f001" },
      { sentence: "Tehnika kojom se tekst direktive doslovno unosi u nacionalni propis zove se _______-paste.", answer: "copy", hint: "engleska riječ iz naziva tehnike", id: "08f002" },
      { sentence: "Francuski naziv za pravnu stečevinu Unije glasi _______.", answer: "acquis", hint: "počinje slovom a", id: "08f003" },
      { sentence: "Rok za preuzimanje direktive nije isto što i datum početka _______ mjera.", answer: "primjene", hint: "kad pravila počinju vrijediti", id: "08f004" },
      { sentence: "Hrvatska se čl. 69. SSP-a obvezala postupno uskladiti postojeće i buduće zakonodavstvo s pravnom _______ Zajednice.", answer: "stečevinom", hint: "ukupnost prava i obveza Unije", id: "08f005" },
      { sentence: "Rok za preuzimanje Direktive 2014/104/EU istekao je 27. prosinca _______.", answer: "2016", hint: "godina isteka roka za preuzimanje", id: "08f006" }
    ],
    learn: {
      title: "Preuzimanje direktiva u nacionalno pravo",
      content: `
<h3>Dužnost preuzimanja</h3>
<p>Budući da direktive nisu izravno primjenjive, pojedinci se mogu služiti pravima iz direktiva tek pošto su preuzete u nacionalno zakonodavstvo. Dužnost pravodobnog i ispravnog preuzimanja proizlazi iz (1) <strong>definicije direktive</strong> i (2) <strong>načela lojalnosti i iskrene suradnje</strong>. Rok počinje teći nakon objave direktive u Službenom listu EU-a i u pravilu je određen u prijelaznim i završnim odredbama.</p>
<p><strong>Rok za preuzimanje nije datum početka primjene.</strong> Primjeri:</p>
<ul>
<li>Direktiva 1999/44/EZ, čl. 11.: države usvajaju potrebne propise najkasnije do 1. 1. 2002.</li>
<li>Direktiva 2011/83/EU, čl. 28.: države usvajaju i objavljuju propise do 13. 12. 2013., a primjenjuju ih od 13. 6. 2014.</li>
<li>Direktiva 2014/104/EU o naknadi štete: države donose propise do 27. 12. 2016.; nacionalne mjere ne primjenjuju se retroaktivno, niti na postupke za naknadu štete pokrenute pred nacionalnim sudom prije 26. 12. 2014. (čl. 21. i 22.).</li>
</ul>

<h3>Načelo lojalnosti i iskrene suradnje (čl. 4. st. 3. UEU)</h3>
<p>Dva podnačela: <strong>načelo lojalnosti</strong> – države članice poduzimaju sve odgovarajuće mjere, opće ili posebne, kako bi osigurale ispunjavanje obveza iz Ugovora ili akata institucija, olakšavaju ostvarivanje zadaća Unije i suzdržavaju se od svake mjere koja bi mogla ugroziti postizanje ciljeva Unije; i <strong>načelo iskrene suradnje</strong> – Unija i države članice uzajamno se poštuju i pomažu jedna drugoj u izvršavanju zadaća koje proizlaze iz Ugovora.</p>
<p><strong>U Republici Hrvatskoj:</strong> hrvatski ustavni okvir je glava VIII. Ustava „Europska unija” (u Promjeni Ustava NN 76/10 čl. 141.a–141.d; od pročišćenog teksta NN 85/10 čl. 143.–146.). Pravni akti i odluke koje je RH prihvatila u institucijama EU-a primjenjuju se u RH u skladu s pravnom stečevinom (<em>acquis</em>), a državna tijela, tijela jedinica lokalne i područne (regionalne) samouprave te pravne osobe s javnim ovlastima <strong>izravno primjenjuju pravo EU-a</strong>. Hrvatski sudovi štite subjektivna prava utemeljena na pravnoj stečevini EU-a. Državljani RH su građani EU-a i uživaju sva prava zajamčena stečevinom, u skladu s uvjetima i ograničenjima iz Ugovora i mjera donesenih na temelju njih.</p>

<h3>Način preuzimanja</h3>
<ul>
<li>preuzimanje u nacionalno zakonodavstvo;</li>
<li>izvođenje ciljeva direktive <em>sudskim tumačenjem</em> općih načela nacionalnog pravnog sustava;</li>
<li>zakonodavna tehnika: <strong>copy-paste</strong> (doslovno preuzimanje teksta direktive – rizik <em>sadržajne</em> neusklađenosti) ili tehnika <strong>„prevođenja”</strong> (prevođenje pojmova i odredaba direktive u odgovarajuće nacionalne pravne pojmove – rizik <em>jezične</em> neusklađenosti).</li>
</ul>

<h3>Ishodi preuzimanja</h3>
<p>Tri glavna ishoda usklađivanja nacionalnog prava: <strong>ispravno usklađeno</strong>, <strong>neispravno usklađeno</strong> i <strong>neusklađeno</strong> nacionalno pravo (uključuje i zakašnjelo usklađivanje).</p>

<h3>Prije pristupanja</h3>
<p>Sporazum o stabilizaciji i pridruživanju (SSP): čl. 69. st. 1. – tzv. harmonizacijska klauzula (Hrvatska nastoji osigurati postupno usklađivanje postojećih i budućih zakona s pravnom stečevinom Zajednice); čl. 69. st. 2. – usklađivanje počinje danom potpisivanja i postupno se proširuje na sve elemente stečevine, a osobito u ranoj fazi usredotočuje na temeljne dijelove stečevine o unutarnjem tržištu.</p>
<p><strong>Napomena o izmjeni:</strong> Direktiva 1999/44/EZ stavljena je izvan snage Direktivom (EU) 2019/771 (države su je morale preuzeti do 1. 7. 2021., a primjenjuje se od 1. 1. 2022. na ugovore sklopljene od tog datuma). Raniji hrvatski Zakon o zaštiti potrošača iz 2014. zamijenjen je Zakonom o zaštiti potrošača iz 2022. (NN 19/22), a ustavne odredbe o Uniji u Promjeni Ustava (NN 76/10) nosile su brojeve čl. 141.a–141.d, dok ih pročišćeni tekst Ustava (NN 85/10) numerira kao čl. 143.–146. Obveza usklađivanja nakon pristupanja (1. 7. 2013.) proizlazi iz članstva u Uniji.</p>
`,
      id: "08l000"
    },
    id: "08k000"
  },

  nadredenostISukladnoTumacenje: {
    name: "Nadređenost prava Unije i sukladno tumačenje",
    icon: "fa-layer-group",
    color: "#f59e0b",
    flashcards: [
      { question: "Što znači načelo nadređenosti prava Unije?", answer: "Pravo Unije ima prednost u primjeni pred nacionalnim pravom država članica; razvijeno praksom Suda EU-a (Costa protiv ENEL, 6/64).", explanation: "Apsolutno i neograničeno načelo.", id: "09c001" },
      { question: "Koja je posljedica nadređenosti za nacionalne sudove?", answer: "Ex officio dužnost neprimjene domaće odredbe koja je suprotna pravu Unije.", explanation: "Vrijedi za primarno i izvedeno pravo.", id: "09c002" },
      { question: "Što je dužnost sukladnog tumačenja?", answer: "Nacionalni sudovi i druga tijela moraju što je više moguće tumačiti nacionalno pravo u skladu s izričajem i svrhom direktive radi postizanja njezina učinka (effet utile).", explanation: "Faccini Dori, para. 26.", id: "09c003" },
      { question: "Od kada obvezuje sukladno tumačenje u odnosu na direktivu?", answer: "Od stupanja direktive na snagu država se suzdržava od mjera koje bi ozbiljno ugrozile cilj; od isteka roka za preuzimanje tumači nacionalno pravo u skladu s ciljem direktive.", explanation: "Obuhvaća svo nacionalno pravo, prije ili poslije direktive.", id: "09c004" },
      { question: "Koja su ograničenja sukladnog tumačenja?", answer: "Opća načela prava (zabrana retroaktivnosti, pravna sigurnost) i zabrana tumačenja contra legem (Dominguez, C-282/10, para. 25.).", explanation: "Obveza ne može biti osnova za tumačenje protivno zakonu.", id: "09c005" },
      { question: "Što je ako sukladno tumačenje ne uspije?", answer: "Pojedinac može tražiti naknadu štete od države zbog propusta ispravnog i pravodobnog preuzimanja direktive (Faccini Dori; Francovich).", explanation: "Vidi cjelinu o odgovornosti države.", id: "09c006" },
      { question: "Obvezuje li sukladno tumačenje i prije pristupanja Uniji?", answer: "Da, prema SSP-u; Vrhovni sud RH (Revt-249/14-2) navodi obvezu tumačenja nacionalnog prava u duhu prava EU-a i za odnose nastale prije pristupanja.", explanation: "Ustavni sud RH, U-III-1410/2007: primjena usklađenog zakonodavstva po duhu EU-a.", id: "09c007" }
    ],
    quiz: [
      {
        question: "Načelo nadređenosti prava Unije razvio je Sud EU-a u predmetu:",
        options: [
          "Van Gend en Loos",
          "Marleasing",
          "Francovich",
          "Costa protiv ENEL"
        ],
        correct: 3, id: "09q001"
      },
      {
        question: "Sud koji utvrdi suprotnost nacionalne odredbe i prava Unije mora:",
        options: [
          "po službenoj dužnosti ne primijeniti nacionalnu odredbu",
          "prekinuti postupak dok je domaći zakonodavac ne ukine",
          "primijeniti nacionalnu odredbu jer je nastala kasnije",
          "tražiti ukidanje odredbe pred ustavnim sudom prije odlučivanja"
        ],
        correct: 0, id: "09q002"
      },
      {
        question: "Dužnost sukladnog tumačenja nakon isteka roka za preuzimanje direktive odnosi se na:",
        options: [
          "propise donesene radi preuzimanja te direktive, a ne ostalo pravo",
          "propise donesene nakon objave direktive, a ne raniji propise",
          "zakone, ali ne i podzakonske akte i sudsku praksu",
          "svo nacionalno pravo, prije ili poslije direktive"
        ],
        correct: 3, id: "09q003"
      },
      {
        question: "Sukladno tumačenje ograničeno je zabranom:",
        options: [
          "tumačenja po analogiji u korist potrošača",
          "teleološkog tumačenja prema svrsi direktive",
          "tumačenja contra legem",
          "uporabe preambule direktive u tumačenju"
        ],
        correct: 2, id: "09q004"
      },
      {
        question: "Ako se rezultat direktive ne može postići tumačenjem, pojedincu preostaje:",
        options: [
          "tužba protiv drugog pojedinca radi izravnog učinka direktive",
          "naknada štete od države zbog neispravnog preuzimanja",
          "zahtjev da sud poništi nacionalne propise o toj temi",
          "pravo da ne poštuje nacionalni propis do izmjene zakona"
        ],
        correct: 1, id: "09q005"
      }
    ],
    fillBlanks: [
      { sentence: "Dužnost nacionalnih sudova da ne primijene suprotnu domaću odredbu postoji po službenoj dužnosti, tj. ex _______.", answer: "officio", hint: "latinski izraz", id: "09f001" },
      { sentence: "Praktični učinak direktive naziva se francuskim izrazom effet _______.", answer: "utile", hint: "učinak koji osigurava da pravilo doista djeluje", id: "09f002" },
      { sentence: "Tumačenje nacionalnog prava suprotno njegovu izričaju naziva se tumačenje contra _______.", answer: "legem", hint: "latinski, „zakon”", id: "09f003" },
      { sentence: "Načelo nadređenosti prava Unije potvrđeno je u predmetu Costa protiv _______.", answer: "ENEL", hint: "talijansko elektroprivredno poduzeće", id: "09f004" }
    ],
    learn: {
      title: "Nadređenost prava Unije i sukladno tumačenje",
      content: `
<h3>Načelo nadređenosti prava Unije</h3>
<p>Načelo je razvijeno ustaljenom praksom Suda EU-a (predmet 6/64 <em>Costa protiv ENEL-a</em>): pravo Unije je <strong>nadređeno</strong> nacionalnom pravu država članica, tj. ima prednost u primjeni. Primjenjuje se na sve izvore prava Unije, neovisno o tome je li riječ o primarnom ili iz njega izvedenom pravu. Načelo je <strong>apsolutno i neograničeno</strong>. Posljedica je <em>ex officio</em> dužnost neprimjene domaće odredbe suprotne pravu Unije.</p>

<h3>Načelo tumačenja sukladno pravu EU-a</h3>
<ul>
<li>Dužnost nacionalnih sudova i svih drugih tijela državne vlasti da <strong>tumače nacionalno pravo (sve) što je više moguće</strong> u skladu s izričajem i svrhom direktive s kojom je usklađeno, kako bi se postigao praktični (korisni) učinak direktive – <em>effet utile</em> (predmet C-478/99 <em>Komisija protiv Švedske</em>, para. 15.).</li>
<li>Odraz je načela nadređenosti u situacijama u kojima je njegova primjena u praksi otežana.</li>
<li>Opće primjenjivo načelo: odnosi se na tumačenje nacionalnih propisa u skladu s pravom EU-a općenito.</li>
</ul>
<p>Predmet C-91/92 <em>Faccini Dori</em>, para. 26.: kad se primjenjuje nacionalno pravo, usvojeno prije ili nakon direktive, nacionalni sudovi moraju ga tumačiti, što je više moguće, u svjetlu izričaja i svrhe direktive kako bi se postigao rezultat koji se imao u vidu.</p>

<h3>Prije i nakon pristupanja</h3>
<p><strong>Prije pristupanja:</strong> dužnost je proizlazila iz čl. 69. SSP-a (harmonizacijska klauzula). Ustavni sud RH (odluka od 13. 2. 2008., U-III-1410/2007): pri primjeni usklađenog zakonodavstva tijela RH moraju postupati kako je to u Europskim zajednicama, po smislu i duhu propisa na temelju kojih je usklađivanje obavljeno. Vrhovni sud RH (Revt-249/14-2 od 9. 4. 2015.): na odnose nastale prije ulaska u EU, na koje se pravo EU-a neposredno ne primjenjuje, postoji obveza hrvatskih sudova da tumače nacionalno pravo u duhu prava EU-a i sveopće pravne stečevine, uključujući praksu Suda EU-a.</p>
<p><strong>Nakon pristupanja:</strong> dužnost proizlazi iz definicije direktive i načela lojalnosti i iskrene suradnje, a na domaćoj razini iz Ustava RH (sudovi štite subjektivna prava utemeljena na pravnoj stečevini EU-a). Od stupanja direktive na snagu država se mora suzdržati od mjera koje bi ozbiljno ugrozile njezin cilj (predmet C-129/96 <em>Inter-Environnement Wallonie</em>, EU:C:1997:628, para. 45.); od trenutka isteka roka za preuzimanje dužnost je tumačiti nacionalno pravo u skladu sa svrhom i ciljevima direktive (uključujući odredbe preambule). Tumačenje je autonomno i proteže se na svo nacionalno pravo, usvojeno prije ili nakon direktive, tj. na neusklađeno te pravodobno i ispravno usklađeno pravo.</p>

<h3>Ograničenja i ishodi</h3>
<ul>
<li><strong>Uspješno tumačenje</strong> neusklađenog ili neispravno usklađenog prava postiže cilj direktive – tzv. neizravni (horizontalni) učinak direktive.</li>
<li><strong>Neuspješno tumačenje</strong> ne omogućuje postizanje cilja nepreuzete ili neispravno preuzete direktive.</li>
<li>Ograničenja: opća načela prava – <strong>zabrana retroaktivnosti</strong>, <strong>pravna sigurnost</strong> i <strong>zabrana tumačenja contra legem</strong> (predmet C-282/10 <em>Dominguez</em>, para. 25., uz upućivanje na predmete <em>Impact</em>, para. 100., i <em>Angelidaki</em>, para. 199.).</li>
</ul>
<p>Kad tumačenje nije moguće, preostaje <strong>odgovornost države za štetu</strong> zbog povrede dužnosti ispravnog i pravodobnog preuzimanja direktive (predmet C-91/92 <em>Faccini Dori</em>, para. 27., uz Francovich): ako se rezultat direktive ne može postići tumačenjem, pravo Unije zahtijeva da države članice nadoknade štetu uzrokovanu pojedincima propustom preuzimanja.</p>
<p><strong>Napomena o izmjeni:</strong> Ustavni tekst na koji se sudovi pozivaju danas je u čl. 145. pročišćenog Ustava (NN 85/10); u Promjeni Ustava NN 76/10 nosio je broj čl. 141.c. Ranija literatura rabi i izraz „Europski sud pravde” za današnji Sud Europske unije.</p>
`,
      id: "09l000"
    },
    id: "09k000"
  },

  izravniUcinak: {
    name: "Izravni učinak i učinci direktiva",
    icon: "fa-bolt",
    color: "#ef4444",
    flashcards: [
      { question: "Što je pravno načelo izravnog učinka?", answer: "Pod ispunjenjem uvjeta jamči da se pojedinci mogu izravno pozivati na odredbe prava Unije pred nacionalnim sudovima (Van Gend en Loos).", explanation: "Razvio ga je Sud EU-a.", id: "10c001" },
      { question: "Što je Sud odlučio u predmetu Van Gend en Loos?", answer: "Da ex čl. 12. UEEZ-a ima izravni učinak: pojedinci iz njega mogu izvoditi prava na koja sudac mora paziti (autonomni i jedinstveni poredak, učinkovita zaštita).", explanation: "Teleološko tumačenje.", id: "10c002" },
      { question: "Koje pretpostavke mora ispuniti odredba za izravni učinak?", answer: "Dovoljno jasna i precizna, potpuna i bezuvjetna te propisuje obvezu djelovanja ili propuštanja koja ne zahtijeva dodatnu provedbu.", explanation: "Vrijedi za primarno i sekundarno pravo.", id: "10c003" },
      { question: "Imaju li direktive izravni učinak?", answer: "U načelu ne; iznimno imaju vertikalni izravni učinak prema državi koja ih nije pravodobno ili ispravno preuzela.", explanation: "Država se ne smije pozivati na vlastiti propust (Becker).", id: "10c004" },
      { question: "Zašto direktive nemaju horizontalni izravni učinak?", answer: "Jer obvezuju države članice, a ne pojedince; protiv su načelo zabrane protivnog ponašanja, definicija direktive i pravna sigurnost (Marshall, Faccini Dori).", explanation: "Pojedinac se nije mogao upoznati sa svojom obvezom.", id: "10c005" },
      { question: "Što je neizravni (interpretativni) učinak direktive?", answer: "Učinak koji postiže sudac sukladnim tumačenjem nacionalnog prava u odnosu među pojedincima (Von Colson, Marleasing, Faccini Dori).", explanation: "Alternativa nepostojećem horizontalnom izravnom učinku.", id: "10c006" },
      { question: "Što je Sud EU-a utvrdio u predmetu Becker?", answer: "Država članica koja u roku nije donijela mjere koje direktiva traži ne može se braniti od pojedinaca pozivom na vlastito neispunjenje obveza.", explanation: "Predmet 8/81, para. 24.", id: "10c007" },
      { question: "Kako su hrvatski sudovi postupali s direktivama prije pristupanja Uniji?", answer: "Rano su priznali dužnost sukladnog tumačenja, čime se i u horizontalnim privatnopravnim odnosima postiže neizravni učinak direktiva.", explanation: "Ustavni sud RH, U-III-1410/2007; Vrhovni sud RH, Revt-249/14-2.", id: "10c008" },
      { question: "Što je Sud EU-a utvrdio u predmetu Rickmers-Linie (270/81)?", answer: "Kad je direktiva ispravno preuzeta, njezini učinci djeluju na pojedince posredno, kroz mjere države članice.", explanation: "Posredni učinak ispravno preuzete direktive.", id: "10c009" },
      { question: "Što je Sud EU-a utvrdio u predmetu Van Duyn (41/74)?", answer: "Pojedinac se pred nacionalnim sudom može pozvati na dovoljno jasnu i bezuvjetnu odredbu direktive protiv države (vertikalni izravni učinak).", explanation: "Jedan od ranih predmeta o izravnom učinku direktiva.", id: "10c010" }
    ],
    quiz: [
      {
        question: "Izravni učinak odredbe znači da se pojedinac:",
        options: [
          "na nju može pozvati pred Sudom EU-a, a ne pred nacionalnim sudom",
          "može izravno pozvati pred nacionalnim sudom",
          "na nju može pozvati tek nakon preuzimanja u nacionalno pravo",
          "može pozvati protiv drugih pojedinaca, a ne protiv države"
        ],
        correct: 1, id: "10q001"
      },
      {
        question: "Koji uvjet nije potreban da bi odredba imala izravni učinak?",
        options: [
          "dovoljna jasnoća i preciznost odredbe",
          "bezuvjetnost i potpunost odredbe",
          "obveza djelovanja ili propuštanja bez dodatne provedbe",
          "prethodna suglasnost nacionalnog parlamenta"
        ],
        correct: 3, id: "10q002"
      },
      {
        question: "Direktiva nepreuzeta ili neispravno preuzeta u pravilu ima:",
        options: [
          "vertikalni izravni učinak, ali ne i horizontalni",
          "učinak tek nakon presude Suda EU-a o povredi, a ne od isteka roka",
          "izravni učinak i prema državi i prema pojedincima, jednako kao uredba",
          "obvezujući učinak na teret pojedinaca, ako ga zatraži država"
        ],
        correct: 0, id: "10q003"
      },
      {
        question: "Zašto se država ne može pozivati na direktivu protiv pojedinca?",
        options: [
          "jer bi time povrijedila načelo supsidijarnosti Unije",
          "jer se ne smije pozivati na vlastiti propust",
          "jer su adresati direktive pojedinci umjesto država članica",
          "jer direktive vrijede između pojedinaca međusobno"
        ],
        correct: 1, id: "10q004"
      },
      {
        question: "Kojim se putem u odnosima između pojedinaca ostvaruje neizravni učinak direktive?",
        options: [
          "izravnom primjenom direktive kao uredbe",
          "odlukom Komisije upućenom pojedincima",
          "ukidanjem nacionalnog prava Europskim ugovorom",
          "sukladnim tumačenjem nacionalnog prava"
        ],
        correct: 3, id: "10q005"
      },
      {
        question: "Predmet Leonesio odnosi se na izravni učinak:",
        options: [
          "direktive u odnosima među trgovcima",
          "uredbe prema državi članici",
          "preporuke Komisije prema pojedincima",
          "odluke Vijeća upućene drugim državama"
        ],
        correct: 1, id: "10q006"
      },
      {
        question: "U predmetu Becker Sud EU-a utvrdio je da država članica koja direktivu nije preuzela u roku:",
        options: [
          "gubi pravo glasa u Vijeću dok direktivu ne preuzme u cijelosti",
          "ne može se protiv pojedinca pozivati na vlastiti propust u preuzimanju",
          "može protiv pojedinca primijeniti direktivu na isti način kao da je uredba",
          "oslobođena je obveze preuzimanja direktive nakon isteka roka"
        ],
        correct: 1, id: "10q007"
      },
      {
        question: "Prema hrvatskoj sudskoj praksi, neizravni učinak direktiva u privatnopravnim odnosima priznat je:",
        options: [
          "tek nakon pristupanja Republike Hrvatske Uniji 1. 7. 2013.",
          "još prije pristupanja Republike Hrvatske Uniji",
          "nakon prve presude Suda EU-a protiv Republike Hrvatske",
          "donošenjem Zakona o zaštiti potrošača iz 2022."
        ],
        correct: 1, id: "10q008"
      },
      {
        question: "U predmetu Rickmers-Linie Sud EU-a utvrdio je da ispravno preuzeta direktiva na pojedince djeluje:",
        options: [
          "izravno od dana objave u Službenom listu EU-a",
          "na temelju odluke Komisije upućene pojedincima",
          "posredno putem mjera države članice",
          "među pojedincima kao da je uredba"
        ],
        correct: 2, id: "10q009"
      },
      {
        question: "U predmetu Van Duyn Sud EU-a utvrdio je da se pojedinac pred nacionalnim sudom može pozvati na:",
        options: [
          "odredbu direktive protiv drugog pojedinca u privatnom sporu",
          "preporuku Komisije protiv države članice zbog kašnjenja",
          "odluku Vijeća koja je upućena drugim državama članicama",
          "dovoljno jasnu i bezuvjetnu odredbu direktive protiv države"
        ],
        correct: 3, id: "10q010"
      }
    ],
    fillBlanks: [
      { sentence: "U predmetu Van Gend en Loos Sud je priznao izravni učinak ex čl. 12. UEEZ-a, koji je zabranjivao uvođenje novih _______ među državama članicama.", answer: "carina", hint: "davanja pri prelasku granice", id: "10f001" },
      { sentence: "Izravni učinak direktive prema državi zove se _______ učinak.", answer: "vertikalni", hint: "odnos pojedinac–država", id: "10f002" },
      { sentence: "Odredba za izravni učinak mora biti jasna, precizna, potpuna i ne smije zahtijevati dodatnu _______.", answer: "provedbu", hint: "radnja države ili institucije Unije nakon donošenja akta", id: "10f003" },
      { sentence: "Načelo da se država ne smije pozivati na vlastiti propust u engleskom se pravu naziva _______.", answer: "estoppel", hint: "pravni pojam common lawa", id: "10f004" }
    ],
    learn: {
      title: "Izravni učinak i učinci direktiva",
      content: `
<h3>Načelo izravnog učinka</h3>
<p>Posebno načelo prava Unije, razvijeno u praksi Suda EU-a, kojim se pod ispunjenjem utvrđenih pretpostavki jamči <strong>izravni učinak pojedinih odredaba</strong> pravne stečevine u subjektivnoj zaštiti prava pojedinaca.</p>
<p><strong>Van Gend en Loos:</strong> ima li ex čl. 12. UEEZ-a (zabrana uvođenja novih carina među državama članicama) izravni učinak i mogu li iz njega pojedinci izravno izvoditi prava na koja sudac mora paziti? <em>Da</em> – teleološko tumačenje; doktrina autonomnog i jedinstvenog poretka prava Unije (subjekti su države članice i građani); učinkovita zaštita pojedinaca.</p>

<h3>Pretpostavke izravnog učinka</h3>
<p>Pravilo primarnog ili sekundarnog prava ima izravni učinak ako je:</p>
<ul>
<li>dovoljno <strong>jasno i precizno</strong>;</li>
<li><strong>potpuno i sadržajno neuvjetovano</strong> (bezuvjetno);</li>
<li>obveza djelovanja ili propuštanja koja <strong>ne zahtijeva provedbu</strong> države ili institucije Unije;</li>
<li>učinak je moguć u <strong>vertikalnom i horizontalnom</strong> odnosu (ovisno o aktu).</li>
</ul>
<p>Uredbe imaju izravni učinak i vertikalno i horizontalno (predmet 93/71 <em>Leonesio</em>): prava nastaju kad su ispunjeni uvjeti iz uredbe, a ostvarivanje se ne smije uvjetovati dodatnim provedbenim odredbama.</p>

<h3>Direktive</h3>
<p>U načelu direktive <strong>nemaju izravni učinak</strong>. Dok direktiva nije preuzeta, pojedinci u privatnim odnosima ne mogu se koristiti pravima i obvezama koje ona dodjeljuje; tek se odredbama nacionalnog prava direktiva posredno primjenjuje na privatnopravni odnos. Razlika izravne primjene i izravnog učinka: izravna primjena = akt vrijedi bez preuzimanja (uredba); izravni učinak = odredba se može primijeniti pred sudom i stvara prava. Predmet 270/81 <em>Felicitas Rickmers-Linie</em>: kad je direktiva ispravno preuzeta, njezini učinci djeluju na pojedince posredno, kroz mjere države članice.</p>
<p><strong>Iznimka – vertikalni izravni učinak:</strong></p>
<ul>
<li>sprječava da pojedinac bude kažnjen zbog propusta države, tj. da se država članica poziva protiv pojedinca na vlastiti propust u preuzimanju (predmet 8/81 <em>Becker</em>, para. 24.);</li>
<li>pretpostavke: direktiva nije pravodobno ili sadržajno ispravno preuzeta; pojedincima dodjeljuje subjektivna prava ili nameće obveze; odredbe su dovoljno jasne, precizne i bezuvjetne; direktiva je pravno potpuna i primjenjuje se bez daljnje konkretizacije.</li>
</ul>
<p>Predmet 41/74 <em>Van Duyn</em>: pojedinac se pred nacionalnim sudom može pozvati na dovoljno jasnu i bezuvjetnu odredbu direktive protiv države (vertikalni izravni učinak). Direktiva <strong>nema izravni učinak na teret pojedinaca</strong>, tj. u korist države koja je propustila preuzeti je ispravno ili na vrijeme. Razlozi: estoppel/<em>venire contra factum proprium</em>, definicija direktive iz čl. 288. st. 3. UFEU-a i pravna sigurnost (pojedinac se nije mogao upoznati sa svojom obvezom). Isto potvrđuje predmet 152/84 <em>Marshall</em>.</p>

<h3>Nemogućnost horizontalnog učinka – neizravni učinak</h3>
<ul>
<li>Glavni je razlog pravna narav direktiva kao akata koji obvezuju države članice kojima su upućeni.</li>
<li>Predmet C-91/92 <em>Faccini Dori</em> (EU:C:1994:292, para. 20.–25.): direktiva (ovdje Direktiva 85/577/EEZ o ugovorima sklopljenima izvan poslovnih prostorija) ne može sama po sebi stvarati obveze za pojedinca pa se na nju ne može izravno pozivati u sporu dvaju pojedinaca.</li>
<li>Neizravni horizontalni učinak postiže se <strong>sukladnim tumačenjem</strong> – sudac u odnosu između pojedinaca tumači nacionalno pravo u skladu s direktivom (<em>Von Colson i Kamann</em>, <em>Faccini Dori</em>, <em>Marleasing</em>).</li>
<li>Drugi oblik postizanja neizravnog (objektivnog) učinka je neprimjena i eventualna izmjena odredaba domaćeg prava suprotnih direktivi.</li>
<li>Ako rezultat ne može biti postignut tumačenjem, nastaje odgovornost države za štetu (Faccini Dori, para. 26. i 27.).</li>
</ul>

<h3>Učinci direktiva u praksi hrvatskih sudova</h3>
<p>Domaća sudska praksa priznala je dužnost kojom se postiže neizravni učinak direktiva u horizontalnim privatnopravnim odnosima vrlo rano, i prije pristupanja Republike Hrvatske Uniji (v. i Ustavni sud RH, U-III-1410/2007, te Vrhovni sud RH, Revt-249/14-2).</p>
<p><strong>Napomena o izmjeni:</strong> u ranijoj literaturi Sud EU-a naziva se „Europski sud pravde”, a čl. 189. UEEZ-a, na koji se pozivaju stare presude, danas je čl. 288. UFEU-a.</p>
`,
      id: "10l000"
    },
    id: "10k000"
  }
};

if (typeof window !== 'undefined') { window.ep2PfriM1 = ep2PfriM1; }
if (typeof module !== 'undefined' && module.exports) { module.exports = ep2PfriM1; }
