// Europsko pravo II (PFRI) — M2 (gradivo završnog ispita)
// Posebni dio europskog privatnog prava: potrošačko ugovorno pravo (ugovori na daljinu i izvan poslovnih
// prostorija, pravo na odustanak, elektronički ugovori, materijalni nedostatak, nepoštene odredbe),
// odgovornost proizvođača, odgovornost države članice, zabrana diskriminacije i europsko stvarno pravo.

const ep2PfriM2 = {
  uvodUPotrosackoPravo: {
    name: "Uvod u potrošačko ugovorno pravo EU-a",
    icon: "fa-handshake",
    color: "#06b6d4",
    flashcards: [
      { question: "Od koje razine zaštite Komisija polazi prema čl. 114. st. 3. UFEU-a u prijedlozima o zaštiti potrošača?", answer: "Od visoke razine zaštite, vodeći računa o svakom novom razvoju utemeljenom na znanstvenim činjenicama.", explanation: "Isto vrijedi za zdravlje, sigurnost i zaštitu okoliša.", id: "11c001" },
      { question: "Koje dvije pravne osnove nose potrošačko pravo EU-a i kakva je to nadležnost?", answer: "Zaštita potrošača (čl. 169. UFEU) i usklađivanje radi unutarnjeg tržišta (čl. 114. UFEU); nadležnost je podijeljena između Unije i država članica.", explanation: "Ograničavaju je supsidijarnost i proporcionalnost (čl. 5. UEU).", id: "11c002" },
      { question: "Što prema recitalu 4. Direktive 2011/83/EU treba postići usklađivanjem potrošačkih ugovora na daljinu i izvan poslovnih prostorija?", answer: "Pravu ravnotežu između visoke razine zaštite potrošača i konkurentnosti poduzeća, radi stvarnog potrošačkog unutarnjeg tržišta.", explanation: "Preambula je pomoć pri tumačenju direktive.", id: "11c003" },
      { question: "Što pravo uređeno direktivama redovito štiti?", answer: "Osobe koje u privatne svrhe sklapaju pravni posao s profesionalnom stranom; zaštita potrošača temeljni je poticaj modernizacije privatnog prava.", explanation: "Odnos je poslovni subjekt – potrošač (B2C).", id: "11c004" },
      { question: "Što je harmonizacijska klauzula iz čl. 69. SSP-a?", answer: "Obveza Hrvatske da postupno usklađuje postojeće i buduće zakonodavstvo s pravnom stečevinom Zajednice (acquis), najprije na području unutarnjeg tržišta.", explanation: "Usklađivanje je počelo potpisivanjem Sporazuma.", id: "11c005" },
      { question: "Što je Hrvatska preuzela čl. 74. SSP-a o zaštiti potrošača?", answer: "Uskladiti standarde zaštite potrošača s onima u EU-u, osigurati nadzor tržišta i provedbu zakona, aktivnu politiku zaštite i učinkovitu pravnu zaštitu.", explanation: "Dopunjuje opću harmonizacijsku klauzulu.", id: "11c006" },
      { question: "Koje je direktive prenio ZZP 2022. (čl. 2.)?", answer: "Među ostalima 93/13/EEZ, 2005/29/EZ, 2011/83/EU, 2019/770, 2019/771 i 2019/2161; izmjenom NN 59/26 i 2023/2673, 2024/825, 2024/1799.", explanation: "Popis je dulji; navedene su temeljne.", id: "11c007" },
      { question: "U kakvu su odnosu Zakon o zaštiti potrošača i Zakon o obveznim odnosima?", answer: "ZZP je posebni propis (lex specialis) prema ZOO-u; ZOO se primjenjuje samo ako ZZP ili posebni zakon nešto ne uređuje drukčije (čl. 3. ZZP-a).", explanation: "Posebni zakoni upravnih područja imaju prednost pred ZZP-om.", id: "11c008" },
      { question: "Što je kogentna narav potrošačkog prava prema čl. 45. ZZP-a?", answer: "Potrošač se ne može odreći prava niti mu se ona mogu ograničiti; odredbe nepovoljnije za potrošača od zakonskih ništetne su.", explanation: "Ništetnost odredbe ne povlači ništetnost ugovora ako on može opstati.", id: "11c009" },
      { question: "Kako ZZP definira potrošača (čl. 4. t. 28.)?", answer: "Svaka fizička osoba koja sklapa pravni posao ili djeluje na tržištu izvan svoje trgovačke, poslovne, obrtničke ili profesionalne djelatnosti.", explanation: "Personalni (fizička osoba) i funkcionalni kriterij (izvan djelatnosti).", id: "11c010" },
      { question: "Kako ZZP definira trgovca (čl. 4. t. 47.)?", answer: "Bilo koja osoba, fizička ili pravna, koja posluje u okviru svoje djelatnosti, i osoba koja nastupa u ime ili za račun trgovca; obuhvaća i proizvođača, distributera i uvoznika.", explanation: "Personalni kriterij za trgovca nije ograničen.", id: "11c011" },
      { question: "Koja dva zajednička kriterija sadrže definicije potrošača i trgovca u direktivama?", answer: "Personalni (potrošač je fizička osoba, trgovac bilo koja osoba) i funkcionalni (svrha pravnog posla: privatna kod potrošača, poslovna kod trgovca).", explanation: "Države članice smiju zaštitu proširiti i na druge osobe.", id: "11c012" },
      { question: "Što je Visoki upravni sud odlučio u slučaju Geneza?", answer: "Vlasnica obrta koja je pretplatnički ugovor sklopila u prodajnim prostorijama agencije uživa potrošačka prava jer zakon o elektroničkim komunikacijama upućuje na potrošački zakon.", explanation: "Odluka se oslanja na pogrešno shvaćene pojmove iz direktiva (potrošač, trgovac, izvan poslovnih prostorija).", id: "11c013" },
      { question: "Je li ugovor o posredovanju u prometu nekretnina potrošački ugovor?", answer: "Nije; nalogodavac može biti i pravna osoba, što ZZP ne dopušta, pa se primjenjuje zakon o posredovanju u prometu nekretnina.", explanation: "Mjerodavan je poseban propis.", id: "11c014" },
      { question: "Što je Sud EU-a presudio u predmetu Wathelet?", answer: "Pojam trgovca obuhvaća i posrednika za račun pojedinca koji kupca nije uredno obavijestio da je prodavatelj pojedinac, neovisno o naknadi.", explanation: "Presuda C-149/15 o Direktivi 1999/44.", id: "11c015" },
      { question: "Kada je osoba u ugovoru s dvojnom svrhom potrošač prema Direktivi 2011/83/EU?", answer: "Kad je poslovna svrha toliko ograničena da u cjelokupnom kontekstu ugovora nije prevladavajuća.", explanation: "Recital 17.; isto u recitalu 12. Direktive 2014/17/EU.", id: "11c016" },
      { question: "Koji je kriterij u predmetu Gruber za osobu s dvojnom svrhom?", answer: "Poslovna ili profesionalna svrha mora biti neznatna u cjelokupnom kontekstu ugovora; prevladavanje privatnog elementa nije važno.", explanation: "Presuda C-464/01 o pravilima o nadležnosti.", id: "11c017" },
      { question: "Što je Sud EU-a zaključio u predmetu Costea?", answer: "Odvjetnik koji s bankom sklopi kredit bez naznačene namjene potrošač je ako ugovor nije vezan uz njegovu profesiju; hipoteka na imovini ureda nije važna.", explanation: "Presuda C-110/14 o Direktivi 93/13/EEZ.", id: "11c018" },
      { question: "Kako se Costea odnosi prema Gruberu glede dvojne svrhe?", answer: "Gruber traži neznatnu poslovnu svrhu, a Direktiva 2011/83 uravnoteženije traži da poslovna svrha ne prevladava u cjelokupnom kontekstu ugovora.", explanation: "Prema mišljenju nezavisnog odvjetnika.", id: "11c019" },
      { question: "Što je ugovor o kupoprodaji u smislu ZZP-a (čl. 4. t. 51.) i što su mješoviti ugovori?", answer: "Ugovor kojim trgovac prenosi robu potrošaču za cijenu, uključujući ugovor koji istodobno ima za predmet robu i uslugu; mješoviti se odnose na predmet ugovora.", explanation: "Ne na svrhu djelovanja osobe.", id: "11c020" },
      { question: "Kako hrvatski sudovi tumače nacionalno pravo za odnose nastale prije ulaska u EU?", answer: "U duhu prava EU-a i pravne stečevine, uključujući praksu Suda EU-a, na što se Hrvatska obvezala SSP-om koji se primjenjuje od 2005.", explanation: "Vrhovni sud i Ustavni sud.", id: "11c021" }
    ],
    quiz: [
      {
        question: "Kakva je nadležnost Unije i država članica u zaštiti potrošača?",
        options: [
          "nadležnost Unije koja potiskuje nacionalne propise o zaštiti potrošača",
          "nadležnost država članica uz koordinaciju njihovih politika od Unije",
          "nadležnost koja se dijeli između Unije i država članica",
          "nadležnost Suda EU-a koji u prethodnom postupku donosi propise"
        ],
        correct: 2, id: "11q001"
      },
      {
        question: "Što Komisija prema čl. 114. st. 3. UFEU-a mora uzeti kao polaznu točku u prijedlozima o zaštiti potrošača?",
        options: [
          "najnižu zajedničku razinu zaštite u državama članicama",
          "visoku razinu zaštite i novi razvoj utemeljen na znanstvenim činjenicama",
          "razinu zaštite koju su države članice dosad uredile nacionalnim zakonima",
          "ravnotežu u kojoj konkurentnost poduzeća ima prednost pred zaštitom"
        ],
        correct: 1, id: "11q002"
      },
      {
        question: "Čl. 69. st. 1. Sporazuma o stabilizaciji i pridruživanju naziva se:",
        options: [
          "klauzula o izravnom učinku direktiva u hrvatskom pravu nakon pristupanja",
          "klauzula o slobodnom kretanju potrošača unutar EU-a",
          "klauzula o nadređenosti prava Zajednice nad Ustavom",
          "harmonizacijska klauzula o usklađivanju s pravnom stečevinom"
        ],
        correct: 3, id: "11q003"
      },
      {
        question: "Ako ZZP i ZOO uređuju isto pitanje potrošačkog ugovora, primjenjuje se:",
        options: [
          "ZZP kao poseban propis, a ZOO samo kad ZZP nešto ne uređuje",
          "ZOO kao opći propis jer je donesen prije ZZP-a",
          "oba zakona istodobno, a sud bira povoljniji za trgovca",
          "ZZP samo ako se stranke ugovorom na njega pozovu"
        ],
        correct: 0, id: "11q004"
      },
      {
        question: "Ugovorna odredba koja je za potrošača nepovoljnija od zakonske:",
        options: [
          "valjana je ako ju je potrošač izričito prihvatio u pisanom obliku",
          "ništetna je jer se potrošač ne može odreći svojih prava",
          "pobojna je i vrijedi dok je potrošač ne ospori",
          "valjana je do visine koju odredi sud po slobodnoj ocjeni"
        ],
        correct: 1, id: "11q005"
      },
      {
        question: "Koje je obilježje potrošača u smislu ZZP-a?",
        options: [
          "pravna ili fizička osoba koja kupuje robu u većoj količini",
          "fizička osoba koja posluje u okviru svoje obrtničke djelatnosti",
          "osoba koja je platila cijenu prije isporuke robe",
          "fizička osoba koja djeluje izvan svoje poslovne djelatnosti"
        ],
        correct: 3, id: "11q006"
      },
      {
        question: "Zašto ugovor o posredovanju u prometu nekretnina nije potrošački ugovor?",
        options: [
          "jer se sklapa u pisanom obliku s posrednikom koji je trgovac",
          "jer nalogodavac može biti i pravna osoba, a ne samo potrošač",
          "jer je predmet ugovora nekretnina, a ne pokretna stvar",
          "jer posrednik djeluje u ime i za račun trećeg"
        ],
        correct: 1, id: "11q007"
      },
      {
        question: "Prema presudi u predmetu Wathelet, pojam trgovca obuhvaća posrednika koji:",
        options: [
          "kupcu nije uredno priopćio da je prodavatelj pojedinac",
          "za posredovanje prima naknadu i vodi poslovne knjige",
          "je od pojedinca primio vozilo na čuvanje radi popravka",
          "je s kupcem sklopio ugovor izričito u svoje ime"
        ],
        correct: 0, id: "11q008"
      },
      {
        question: "Prema Direktivi 2011/83/EU, osoba iz ugovora s dvojnom svrhom smatra se potrošačem kad:",
        options: [
          "privatna svrha ugovora prevladava nad poslovnom u svakom slučaju",
          "je ugovor sklopljen izvan poslovnih prostorija trgovca",
          "poslovna svrha nije prevladavajuća u cjelokupnom kontekstu ugovora",
          "je predmet ugovora roba koja se uobičajeno rabi u kućanstvu"
        ],
        correct: 2, id: "11q009"
      },
      {
        question: "U predmetu Gruber, osoba s dvojnom svrhom oslanja se na potrošačka pravila o nadležnosti samo ako je poslovna svrha:",
        options: [
          "manja od polovice vrijednosti predmeta ugovora",
          "naznačena u ugovoru kao sporedna svrha",
          "utvrđena uvidom u poslovne knjige kupca za posljednju godinu",
          "toliko ograničena da je neznatna u cjelokupnom ugovoru"
        ],
        correct: 3, id: "11q010"
      },
      {
        question: "U predmetu Costea, odvjetnik je smatran potrošačem jer:",
        options: [
          "ugovor nije bio vezan uz njegovu profesionalnu djelatnost",
          "je hipoteka bila upisana na njegovu osobnom stanu u mjestu prebivališta",
          "je kredit uzeo kao zastupnik svog odvjetničkog ureda",
          "je banka u ugovoru naznačila stambenu namjenu kredita"
        ],
        correct: 0, id: "11q011"
      },
      {
        question: "Ugovor o kupoprodaji prema ZZP-u obuhvaća i ugovor kojemu je predmet:",
        options: [
          "nekretnina uz obvezu upisa u zemljišne knjige",
          "pružanje usluge bez prijenosa robe u vlasništvo",
          "pravo na vremenski ograničenu uporabu smještaja",
          "istodobno roba i usluga uz cijenu"
        ],
        correct: 3, id: "11q012"
      }
    ],
    fillBlanks: [
      { sentence: "Odnos između trgovca i potrošača naziva se odnosom poslovnog subjekta i potrošača, kratko _______.", answer: "B2C", hint: "kratica engleskog podrijetla od tri znaka", id: "11f001" },
      { sentence: "Zakon o zaštiti potrošača prema Zakonu o obveznim odnosima je _______ propis.", answer: "posebni", hint: "lex specialis, suprotno općem", id: "11f002" },
      { sentence: "Odredbe nepovoljnije za potrošača od zakonskih su _______.", answer: "ništetne", hint: "pravna posljedica, ne pobojnost", id: "11f003" },
      { sentence: "Prema _______ kriteriju potrošač je fizička osoba, a trgovac bilo koja osoba.", answer: "personalnom", hint: "odnosi se na vrstu osobe", id: "11f004" },
      { sentence: "Funkcionalni kriterij gleda _______ s kojom osoba sklapa pravni posao.", answer: "svrhu", hint: "privatna ili poslovna", id: "11f005" },
      { sentence: "U predmetu Gruber privatni element koji prevladava smatran je _______.", answer: "nevažnim", hint: "pojam koji ne utječe na ocjenu", id: "11f006" },
      { sentence: "Ugovori u kojima je predmet istodobno roba i usluga nazivaju se _______ ugovorima.", answer: "mješovitim", hint: "ugovori s dva različita predmeta", id: "11f007" },
      { sentence: "Harmonizacijska klauzula SSP-a traži usklađivanje s pravnom _______ Zajednice.", answer: "stečevinom", hint: "acquis, hrvatski izraz", id: "11f008" },
      { sentence: "Prema recitalu 4. Direktive 2011/83/EU treba postići pravu ravnotežu između visoke razine zaštite potrošača i _______ poduzeća.", answer: "konkurentnosti", hint: "sposobnost uspješnog natjecanja na tržištu", id: "11f009" },
      { sentence: "Zaštita potrošača temeljni je poticaj _______ privatnog prava.", answer: "modernizacije", hint: "poticaj promjene i obnove prava", id: "11f010" },
      { sentence: "Čl. 74. SSP-a traži aktivnu politiku zaštite potrošača i učinkovitu _______ zaštitu.", answer: "pravnu", hint: "suprotno od faktične", id: "11f011" },
      { sentence: "ZZP prenosi, među ostalim, Direktivu o nepoštenoj poslovnoj _______.", answer: "praksi", hint: "ponašanje trgovaca prema potrošačima", id: "11f012" },
      { sentence: "Trgovac je i osoba koja nastupa u ime ili za _______ trgovca.", answer: "račun", hint: "financijski posao za drugoga", id: "11f013" },
      { sentence: "Vlasnica obrta kojoj je Visoki upravni sud priznao potrošačka prava sudjelovala je u predmetu _______.", answer: "Geneza", hint: "naziv agencije koja je sklapala ugovore", id: "11f014" },
      { sentence: "Za razliku od Grubera, Direktiva 2011/83 traži da poslovna djelatnost ne prevladava u cjelokupnom ugovoru, tj. polazi od prevladavajuće _______.", answer: "svrhe", hint: "cilj sklapanja ugovora", id: "11f015" },
      { sentence: "Hrvatski sudovi tumače pravo u duhu prava EU-a i za odnose nastale prije ulaska u Uniju zbog obveze iz _______.", answer: "SSP-a", hint: "kratica sporazuma s EU-om iz 2005.", id: "11f016" }
    ],
    learn: {
      title: "Uvod u potrošačko ugovorno pravo EU-a",
      content: `
<h3>Pravna osnova i podijeljena nadležnost</h3>
<p>Europsko ugovorno pravo dio je pravne cjeline koja služi <strong>unutarnjem tržištu</strong>, uz europsko radno pravo i europsko pravo društava. Pravna osnova usklađivanja je <strong>čl. 114. UFEU-a</strong> (ranije čl. 95. UEZ-a, a prije toga čl. 100.a UEEZ-a): Europski parlament i Vijeće redovnim zakonodavnim postupkom, nakon savjetovanja s Gospodarskim i socijalnim odborom, usvajaju mjere za usklađivanje propisa država članica radi uspostave i funkcioniranja unutarnjeg tržišta. Prema <strong>čl. 114. st. 3.</strong> Komisija u prijedlozima o zdravlju, sigurnosti, zaštiti okoliša i zaštiti potrošača polazi od <strong>visoke razine zaštite</strong>, posebno vodeći računa o novom razvoju utemeljenom na znanstvenim činjenicama; isto nastoje Parlament i Vijeće.</p>
<p>Zaštita potrošača ima i vlastitu osnovu u <strong>čl. 169. UFEU-a</strong>. Nadležnost je <strong>podijeljena</strong> između država članica i Unije. Granice postavljaju načela supsidijarnosti i proporcionalnosti (čl. 5. st. 3. i 4. UEU-a), a razina usklađivanja ovisi o tome je li direktiva minimalne ili maksimalne harmonizacije (opće pravilo je u općem dijelu, ovdje se ne ponavlja).</p>
<p>Preambula direktive pomaže pri tumačenju. Recital 4. Direktive 2011/83/EU: usklađivanje određenih aspekata potrošačkih ugovora sklopljenih na daljinu i izvan poslovnih prostorija nužno je za stvarno <strong>potrošačko unutarnje tržište</strong> na kojem se postiže <strong>prava ravnoteža između visoke razine zaštite potrošača i konkurentnosti poduzeća</strong>.</p>
<p>Zaštita potrošača u pravu Zajednice temeljni je poticaj modernizacije privatnog prava: pravo uređeno direktivama redovito određuje zaštitu osoba koje <strong>u privatne svrhe sklapaju pravni posao s profesionalnom stranom</strong>.</p>

<h3>Direktive o zaštiti potrošača (pregled)</h3>
<ul>
<li>85/577/EEZ – ugovori izvan poslovnih prostorija (ukinuta Direktivom 2011/83/EU);</li>
<li>87/102/EEZ i 2008/48/EZ – potrošački krediti (2008/48/EZ zamjenjuje Direktiva (EU) 2023/2225, koja se primjenjuje od 20. 11. 2026.); 2014/17/EU – krediti za stambene nekretnine;</li>
<li>90/314/EEZ – putovanja po paket-aranžmanu (zamijenjena Direktivom (EU) 2015/2302, primjenjuje se od 1. 7. 2018.);</li>
<li><strong>93/13/EEZ – nepoštene odredbe u potrošačkim ugovorima</strong>;</li>
<li>94/47/EZ i 2008/122/EZ – timeshare i dugoročni proizvodi za odmor, preprodaja i razmjena;</li>
<li>97/7/EZ – ugovori na daljinu (ukinuta Direktivom 2011/83/EU);</li>
<li>1999/44/EZ – prodaja robe široke potrošnje i jamstva (zamijenjena Direktivom (EU) 2019/771);</li>
<li>2002/65/EZ – financijske usluge na daljinu (zamijenjena Direktivom (EU) 2023/2673, primjenjuje se od 19. 6. 2026.);</li>
<li><strong>2011/83/EU – prava potrošača</strong>.</li>
</ul>

<h3>Usklađivanje hrvatskog prava</h3>
<p><strong>Sporazum o stabilizaciji i pridruživanju (SSP)</strong>: čl. 69. st. 1. je tzv. <strong>harmonizacijska klauzula</strong> – Hrvatska nastoji postupno uskladiti postojeće i buduće zakone s pravnom stečevinom Zajednice (acquis). Čl. 69. st. 2.: usklađivanje počinje danom potpisivanja i proširuje se postupno, a u ranoj fazi usredotočuje se na temeljne dijelove stečevine o unutarnjem tržištu i drugim područjima vezanima uz trgovinu. Čl. 74. SSP-a o zaštiti potrošača: st. 1. – usklađivanje standarda zaštite s EU-om, osiguranje primjerenog funkcioniranja tržišnog gospodarstva te nadzora tržišta i provedbe zakona; st. 2. – obveza usklađivanja zakonodavstva i prilagodbe zaštite onoj u EU-u, politika aktivne zaštite potrošača i učinkovita pravna zaštita.</p>
<p>Zakon o zaštiti potrošača (ZZP) u čl. 2. navodi direktive koje prenosi, među njima 93/13/EEZ, 98/6/EZ (isticanje cijena), 2002/65/EZ, 2005/29/EZ (nepoštena poslovna praksa), 2008/122/EZ, 2009/22/EZ (sudski nalozi), <strong>2011/83/EU</strong>, 2019/770 (digitalni sadržaj i usluge), 2019/771 (kupoprodaja robe) i 2019/2161 (Omnibus). Nakon izmjene Zakonom NN 59/26 čl. 2. ZZP-a preuzima i Direktivu (EU) 2023/2673 (financijske usluge na daljinu), Direktivu (EU) 2024/825 (osnaživanje potrošača za zelenu tranziciju), Direktivu (EU) 2024/1799 (popravak robe) te delegiranu direktivu (EU) 2026/74. Zakon o obveznim odnosima (ZOO) u čl. 1.a prenosi među ostalim direktive o odgovornosti za neispravne proizvode i o prodaji robe široke potrošnje.</p>
<p>Ustavni sud (2008.): državna tijela pri primjeni usklađenog zakonodavstva dužna su postupati kao u Europskim zajednicama, tj. <strong>po smislu i duhu propisa na temelju kojih je usklađivanje obavljeno</strong>. Vrhovni sud (2015.): i na odnose nastale <strong>prije ulaska u EU</strong>, na koje se pravo EU-a neposredno ne primjenjuje, hrvatski sudovi dužni su tumačiti nacionalno pravo u duhu prava EU-a i pravne stečevine, uključujući praksu Suda EU-a, na što se Hrvatska obvezala SSP-om, koji se primjenjuje od 2005.</p>

<h3>Odnos ZZP-a prema drugim zakonima</h3>
<p>Prema <strong>čl. 3. ZZP-a</strong>: (1) ako su odredbe ZZP-a u suprotnosti s odredbama zakona kojima se uređuju pojedina upravna područja, na odnose potrošača i trgovaca primarno se primjenjuju ti posebni zakoni; (2) ako posebnim zakonima ili ZZP-om nije drukčije određeno, na obveznopravne odnose potrošača i trgovca primjenjuje se ZOO. Redoslijed: <em>lex specialissima</em> (posebni propisi, npr. o potrošačkom kreditiranju, kreditnim institucijama, osiguranju), <em>lex specialis</em> (ZZP) i <em>lex generalis</em> (ZOO) – <em>lex specialis derogat legi generali</em>.</p>
<h3>Kogentna (prisilna) narav potrošačkog prava</h3>
<p><strong>Čl. 45. ZZP-a</strong>: (1) potrošač se ne može odreći niti mu se mogu ograničiti prava koja ima na temelju ZZP-a ili drugih zakona o zaštiti potrošača; (2) ugovorne odredbe nepovoljnije za potrošača od onih propisanih tim zakonima <strong>ništetne</strong> su. Ništetnost pojedine odredbe ne povlači ništetnost ugovora ako on može opstati bez nje.</p>

<h3>Odnos poslovni subjekt – potrošač (B2C)</h3>
<p>Business su trgovac, obrtnik, kreditna institucija, operator elektroničkih komunikacija, osiguratelj, institucija platnog prometa; consumer su potrošač, osiguranik, platitelj, dužnik, putnik, pacijent, pretplatnik, turist. Propisi: zakoni o potrošačkom kreditiranju, potrošačkom stečaju, osiguranju, platnom prometu, elektroničkim komunikacijama, elektroničkoj trgovini, kreditnim institucijama, leasingu i dr.</p>

<h3>Pojmovi potrošača i trgovca</h3>
<p>Definicije u direktivama imaju dva zajednička obilježja. <strong>Personalni kriterij</strong>: potrošač je <em>fizička osoba</em>, trgovac je <em>fizička ili pravna osoba</em> (bilo koja). <strong>Funkcionalni kriterij</strong>: potrošač sklapa pravni posao ili djeluje na tržištu <em>izvan</em> svoje poslovne ili profesionalne djelatnosti, tj. u privatne svrhe; trgovac to čini <em>u okviru</em> svoje poslovne ili profesionalne djelatnosti.</p>
<p>ZZP, <strong>čl. 4. t. 28.</strong>: potrošač je svaka fizička osoba koja sklapa pravni posao ili djeluje na tržištu izvan svoje trgovačke, poslovne, obrtničke ili profesionalne djelatnosti. <strong>Čl. 4. t. 47.</strong>: trgovac je bilo koja osoba koja sklapa pravni posao ili djeluje na tržištu u okviru svoje trgovačke, poslovne, obrtničke ili profesionalne djelatnosti, uključujući i osobu koja nastupa u ime ili za račun trgovca; nakon NN 59/26 definicija izrijekom obuhvaća i distributera, ovlaštenog zastupnika, proizvođača, proizvođača tvorca, servisera i uvoznika. Države članice mogu primjenu direktive proširiti na područja izvan njezina područja primjene, npr. na pravne osobe, nevladine organizacije, novoosnovana te mala i srednja poduzeća (recital 2. Direktive 2011/83/EU).</p>
<p><strong>Napomena o izmjeni:</strong> ZZP iz 2014. zamijenjen je ZZP-om iz 2022. (NN 19/22), a on je izmijenjen Zakonom NN 59/26 (pročišćeni tekst: NN 19/22, 59/23, 59/26, na snazi od 17. 6. 2026.). Definicije koje su u ranijem tekstu Zakona bile u čl. 5. (potrošač t. 15., trgovac t. 26., ugovor o kupoprodaji t. 29.) danas su u čl. 4. (potrošač t. 28., trgovac t. 47., ugovor o kupoprodaji t. 51.); točke čl. 4. prenumerirane su izmjenom NN 59/26 jer su umetnuti novi pojmovi, pa je prema tekstu NN 19/22 potrošač bio t. 21., trgovac t. 34., a ugovor o kupoprodaji t. 37.; odredba o odnosu prema drugim zakonima nekad je bila čl. 4., a prisilna narav čl. 41., danas su čl. 3. i čl. 45. Tekst: https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html</p>

<h3>Slučaj Geneza (domaća praksa)</h3>
<p>Vlasnica obrta sklopila je na ime obrta pretplatnički ugovor u prodajnim prostorijama agencije koja je djelovala za telekomunikacijsko društvo, pa je željela odustati jer nije dobila potpune informacije. Agencija za poštu i elektroničke komunikacije priznala joj je potrošačka prava, a Visoki upravni sud (2012.) potvrdio je to: zakon o elektroničkim komunikacijama propisuje da pretplatnički ugovori moraju sadržavati odredbe iz potrošačkog zakona, a <em>pretplatnik</em> je svaka fizička ili pravna osoba. Odluka se temelji na pogrešno shvaćenim pojmovima preuzetim iz direktiva (potrošač, trgovac, ugovor sklopljen izvan poslovnih prostorija): ugovor je sklopljen u prodajnim prostorijama agencije, dakle nije bio ugovor izvan poslovnih prostorija.</p>
<h3>Ugovor o posredovanju u prometu nekretnina</h3>
<p>Ne smatra se potrošačkim ugovorom: nalogodavac može biti i fizička i pravna osoba (prodavatelj, kupac, zakupnik i dr.), što nije slučaj kod ZZP-a, pa se primjenjuje zakon o posredovanju u prometu nekretnina.</p>

<h3>Predmet Wathelet (C-149/15)</h3>
<p>Kupnja rabljenog vozila u autokući; kad se vozilo pokvarilo, autokuća je tvrdila da nije vlasnik jer je prodavala za račun pojedinca. Sud EU-a: pojam <strong>trgovca</strong> iz Direktive 1999/44/EZ obuhvaća i poslovni subjekt koji je kao posrednik za račun pojedinca <strong>nije uredno obavijestio</strong> potrošača-kupca da je vlasnik pojedinac, uz ocjenu svih okolnosti; <strong>naknada posrednika nije važna</strong>.</p>

<h3>Ugovori s dvojnom svrhom</h3>
<p>Recital 17. Direktive 2011/83/EU (isto recital 12. Direktive 2014/17/EU): osobu koja ugovor sklapa djelomično u okviru, a djelomično izvan svoje djelatnosti treba smatrati potrošačem kad je poslovna svrha toliko ograničena da u cjelokupnom kontekstu ugovora <strong>nije prevladavajuća</strong>.</p>
<ul>
<li><strong>Gruber (C-464/01):</strong> poljoprivrednik je kupio crijepove za imanje čiji je dio služio stanovanju; za pravila o potrošačkoj nadležnosti poslovna svrha mora biti <strong>neznatna</strong> u cjelokupnom kontekstu ugovora, a činjenica da privatni element prevladava <strong>nije važna</strong>.</li>
<li><strong>Costea (C-110/14):</strong> odvjetnik je s bankom sklopio kredit bez naznačene namjene, osiguran hipotekom na imovini njegova ureda. Sud EU-a: fizička osoba koja obavlja odvjetničku djelatnost i sklapa takav kredit potrošač je ako ugovor nije u vezi s njezinom profesionalnom djelatnošću; hipoteka koju je sklopio kao zastupnik ureda nije važna. Nezavisni odvjetnik: ako je nejasno, osobu treba smatrati potrošačem kad profesionalna svrha ne prevladava u cjelokupnom kontekstu ugovora; kriterij <em>neznatnosti</em> iz Grubera strožiji je od uravnoteženijeg kriterija <em>prevladavajuće svrhe</em> iz Direktive 2011/83.</li>
</ul>

<h3>Mješoviti ugovori</h3>
<p>Mješoviti se ugovori ne odnose na svrhu s kojom osoba djeluje (funkcionalni kriterij), nego na <strong>predmet ugovora</strong>. <strong>Ugovor o kupoprodaji</strong> (ZZP, čl. 4. t. 51.) je ugovor kojim trgovac prenosi ili se obvezuje prenijeti potrošaču robu u vlasništvo, a potrošač plaća ili se obvezuje platiti cijenu, uključujući ugovor koji istodobno ima za predmet robu i uslugu.</p>
`,
      id: "11l000"
    },
    id: "11k000"
  },
  ugovoriNaDaljinuInformiranje: {
    name: "Ugovori na daljinu i izvan poslovnih prostorija: pojmovi i informiranje",
    icon: "fa-laptop-file",
    color: "#10b981",
    flashcards: [
      { question: "Koja su obilježja Direktive 2011/83/EU o pravima potrošača?", answer: "Horizontalna direktiva na osnovi čl. 114. UFEU-a, potpune (ciljane) harmonizacije; obuhvaća tuzemne i prekogranične ugovore o robi i uslugama trgovca i potrošača.", explanation: "Odmiče se od minimalnog usklađivanja ranijih direktiva.", id: "12c001" },
      { question: "Što uređuje Direktiva 2011/83/EU?", answer: "Informacije koje treba pružiti u ugovorima na daljinu, izvan poslovnih prostorija i drugim ugovorima, pravo odustajanja te neke aspekte izvršenja ugovora.", explanation: "Zamijenila je Direktive 85/577/EEZ i 97/7/EZ.", id: "12c002" },
      { question: "Što je Omnibus (Direktiva 2019/2161) dodao polju primjene Direktive 2011/83/EU?", answer: "Digitalni sadržaj i usluge za koje potrošač umjesto cijene daje osobne podatke, osim ako se podaci obrađuju samo radi isporuke ili zakonskih zahtjeva.", explanation: "ZZP je prenio Omnibus.", id: "12c003" },
      { question: "Što je ugovor o usluzi prema ZZP-u (čl. 4. t. 52.)?", answer: "Ugovor kojim trgovac pruža ili se obvezuje pružiti uslugu potrošaču, uključujući digitalnu uslugu, a potrošač plaća ili se obvezuje platiti cijenu.", explanation: "Uz ugovor o kupoprodaji, vrsta ugovora s obzirom na predmet.", id: "12c004" },
      { question: "Što su poslovne prostorije prema čl. 4. t. 27. ZZP-a?", answer: "Prodajni prostor u nekretnini u kojem trgovac trajno obavlja djelatnost ili prodajni prostor u pokretnini u kojem je uobičajeno obavlja.", explanation: "Primjer pokretnine: kamion kao stalna prodavaonica.", id: "12c005" },
      { question: "Koji se prostori prema recitalu direktive smatraju, a koji ne smatraju poslovnim prostorijama?", answer: "Da: dućani, štandovi na tržnicama i sajmovima, sezonski objekti. Ne: ulice, trgovački centri, plaže, javni prijevoz, stambeni prostori i radna mjesta.", explanation: "Mjerilo je trajna ili uobičajena djelatnost, ne iznimna.", id: "12c006" },
      { question: "Koja tri slučaja čine ugovor sklopljen izvan poslovnih prostorija (čl. 4. t. 50. ZZP-a)?", answer: "Sklapanje uz fizičku prisutnost izvan prostorija trgovca; sklapanje odmah nakon osobnog pristupa potrošaču izvan prostorija; sklapanje na izletu radi promocije ili prodaje.", explanation: "Vrijedi i kad je potrošač dao ponudu.", id: "12c007" },
      { question: "Što je Sud EU-a presudio u predmetu Verbraucherzentrale Berlin?", answer: "Sajamski štand je poslovna prostorija ako razuman potrošač prema izgledu štanda i obavijestima na sajmu opravdano očekuje da trgovac ondje posluje i sklapa ugovore.", explanation: "Presuda C-485/17; provjerava nacionalni sud.", id: "12c008" },
      { question: "Što je ugovor na daljinu (čl. 4. t. 49. ZZP-a)?", answer: "Ugovor trgovca i potrošača sklopljen u organiziranom sustavu prodaje bez istodobne fizičke prisutnosti, uz isključivu uporabu sredstava daljinske komunikacije.", explanation: "Dva uvjeta: organizirani sustav i isključivo daljinska sredstva.", id: "12c009" },
      { question: "Koja su sredstva daljinske komunikacije?", answer: "Tiskani materijal i katalozi, pisma, telefon s ljudskim posredovanjem i bez njega, radio, videofon, videotekst, telefaks, televizija, internet i elektronička pošta.", explanation: "Popis je primjeran, ne iscrpan.", id: "12c010" },
      { question: "Koji su ugovori izuzeti iz primjene općih odredaba i odredaba o ugovorima na daljinu (čl. 44. ZZP-a)?", answer: "Među ostalim socijalne usluge, zdravstvena zaštita, igre na sreću, financijske usluge, nekretnine, gradnja i najam stambenih prostora, paket-aranžmani, prijevoz putnika, automati.", explanation: "Uz njih i ugovori pred javnopravnim tijelom te javne govornice.", id: "12c011" },
      { question: "Koja su dva osnovna sredstva zaštite potrošača u ugovorima na daljinu i izvan poslovnih prostorija?", answer: "Dužnost trgovca da potrošaču pruži sveobuhvatne informacije i pravo potrošača da odustane od već sklopljenog ugovora.", explanation: "Ostalo dopunjuje ta dva stupa.", id: "12c012" },
      { question: "Koju razliku čine opća obveza informiranja (čl. 46.) i predugovorne obavijesti (čl. 60.) u ZZP-u?", answer: "Čl. 46. vrijedi za ugovore koji nisu ni na daljinu ni izvan poslovnih prostorija; čl. 60. za ugovore izvan poslovnih prostorija i na daljinu, s pravom na raskid.", explanation: "Odgovara poglavljima II. i III. Direktive.", id: "12c013" },
      { question: "Koje osnovne obavijesti trgovac mora dati prema čl. 60. st. 1. ZZP-a prije sklapanja ugovora?", answer: "Glavna obilježja proizvoda, svoj identitet i adresu, cijenu s troškovima dostave, uvjete plaćanja i isporuke, pravo na raskid i obrazac te odgovornost za nedostatke.", explanation: "Ukupno 27 točaka, uključujući trajanje ugovora i izvansudsko rješavanje sporova.", id: "12c014" },
      { question: "O čemu čl. 60. st. 1. t. 6. ZZP-a obvezuje trgovca u vezi s cijenom?", answer: "Da obavijesti potrošača da je maloprodajna cijena personalizirana na osnovi sustava automatiziranog donošenja odluka.", explanation: "Dodano Omnibus direktivom.", id: "12c015" },
      { question: "Koji je pravni položaj obavijesti iz čl. 60. st. 1. ZZP-a?", answer: "Sastavni su dio ugovora i ne mogu se mijenjati, osim ako se strane izrijekom drukčije sporazume.", explanation: "Čl. 60. st. 2.", id: "12c016" },
      { question: "Što je posljedica propuštene obavijesti o dodatnim troškovima (čl. 60. st. 6.)?", answer: "Potrošač nije dužan snositi dodatne troškove o kojima nije bio obaviješten, npr. troškove dostave i druge naknade.", explanation: "Odnosi se na troškove iz točaka 5. i 11. te st. 3. do 5.", id: "12c017" },
      { question: "Na kojem jeziku i pismu mora biti obavijest iz čl. 60. ZZP-a?", answer: "Na hrvatskom jeziku i latiničnom pismu, uz mogućnost istodobne uporabe drugih jezika.", explanation: "Čl. 60. st. 9.", id: "12c018" },
      { question: "Na kome je teret dokaza da su predugovorne obavijesti pružene (čl. 64.)?", answer: "Na trgovcu.", explanation: "Potrošač ne dokazuje da obavijest nije dobio.", id: "12c019" },
      { question: "Što je informativni obrazac o pravu na jednostrani raskid (čl. 65. ZZP-a)?", answer: "Obrazac kojim se pružaju obavijesti o raskidu iz čl. 60. st. 1. t. 9.–12.; trgovac ispunjava obvezu ako preda ispravno popunjen obrazac.", explanation: "Sadržaj obrasca propisuje ministar.", id: "12c020" },
      { question: "Kako se potrošaču daju obavijesti i ugovor kod ugovora izvan poslovnih prostorija (čl. 66. i 67.)?", answer: "Na papiru ili, uz suglasnost potrošača, na drugom trajnom mediju, čitko i razumljivo; potrošač dobiva i primjerak ugovora ili pisanu potvrdu usmenog ugovora.", explanation: "Papir je pravilo, trajni medij iznimka.", id: "12c021" },
      { question: "Što je trajni medij (čl. 4. t. 45. ZZP-a)?", answer: "Sredstvo koje omogućuje pohranu informacija za kasniju uporabu i njihovu nepromijenjenu reprodukciju, npr. papir, e-pošta, CD, DVD, memorijska kartica, tvrdi disk.", explanation: "Mrežna stranica prema Content Services nije trajni medij.", id: "12c022" },
      { question: "Kako se obavijest daje kod ugovora na daljinu (čl. 72. ZZP-a)?", answer: "Prilagođena sredstvu daljinske komunikacije, jednostavnim jezikom; uz ograničen prostor barem ključni podaci; kod telefonskog poziva odmah navesti identitet i komercijalnu svrhu.", explanation: "Ostale obavijesti trgovac daje drugim putem.", id: "12c023" },
      { question: "Kada je ugovor o uslugama na daljinu sklopljen putem telefona (čl. 73. ZZP-a)?", answer: "Kad potrošač, nakon primitka ponude na trajnom mediju, trgovcu potvrdi suglasnost; teret dokaza o zaprimanju potvrde je na trgovcu.", explanation: "Sam telefonski razgovor ne sklapa ugovor.", id: "12c024" },
      { question: "Što trgovac mora učiniti kad potrošač elektroničkom narudžbom preuzima obvezu plaćanja (čl. 74. ZZP-a)?", answer: "Prije narudžbe jasno istaknuti ključne podatke i omogućiti izjavu da narudžba obvezuje na plaćanje; gumb označiti riječima poput „narudžba s obvezom plaćanja”.", explanation: "Povreda: ugovor je ništetan, odnosno narudžba neobvezujuća.", id: "12c025" },
      { question: "Što mora biti naznačeno na mrežnim stranicama trgovca najkasnije na početku naručivanja (čl. 75.)?", answer: "Postoje li ograničenja u dostavi i koja su sredstva plaćanja prihvaćena.", explanation: "Jasno i čitljivo.", id: "12c026" },
      { question: "Što je potvrda o sklopljenom ugovoru na daljinu (čl. 76. ZZP-a)?", answer: "Obavijest na trajnom mediju koju trgovac dostavlja u razumnom roku, najkasnije pri isporuci robe ili početku usluge, uz sve obavijesti iz čl. 60. koje već nisu dane.", explanation: "Uključuje i potvrdu prethodne suglasnosti kad je potrebna.", id: "12c027" },
      { question: "Što je Sud EU-a odlučio u predmetu Content Services o obavijesti na internetu?", answer: "Mrežna stranica na koju potrošač dolazi poveznicom nije trajni medij; zamjena papira prikladna je samo ako ispunjava istu funkciju.", explanation: "Presuda C-49/11; potrošač ne smije morati poduzimati posebne radnje.", id: "12c028" },
      { question: "Koje obavijesti mora dati pružatelj internetskog tržišta prije sklapanja ugovora (čl. 61. ZZP-a)?", answer: "Parametre rangiranja ponuda, je li ponuđač trgovac, da potrošačka prava ne vrijede ako nije trgovac, te podjelu ugovornih obveza.", explanation: "Nije dovoljno navesti ih samo u općim uvjetima poslovanja.", id: "12c029" }
    ],
    quiz: [
      {
        question: "Direktiva 2011/83/EU temelji se na načelu:",
        options: [
          "minimalne harmonizacije uz slobodu strože nacionalne zaštite",
          "potpune ciljane harmonizacije uz iznimke",
          "uzajamnog priznavanja nacionalnih propisa o potrošačima",
          "izravne primjene bez prenošenja u nacionalno pravo"
        ],
        correct: 1, id: "12q001"
      },
      {
        question: "Prema ZZP-u ugovor na daljinu sklapa se:",
        options: [
          "izvan poslovnih prostorija trgovca uz istodobnu fizičku prisutnost stranaka",
          "u poslovnim prostorijama trgovca uz pisanu potvrdu narudžbe",
          "uz jedno ili više sredstava daljinske komunikacije bez fizičke prisutnosti",
          "putem javne govornice uz posredovanje operatera elektroničkih komunikacija"
        ],
        correct: 2, id: "12q002"
      },
      {
        question: "Što se prema recitalu Direktive 2011/83/EU ne smatra poslovnim prostorijama?",
        options: [
          "sezonski objekt trgovca na skijalištu u turističkoj sezoni",
          "štand na tržnici koji trgovac redovito koristi",
          "kamion koji trgovcu služi kao uobičajeno prodajno mjesto",
          "javna plaža koju trgovac iznimno rabi za promociju"
        ],
        correct: 3, id: "12q003"
      },
      {
        question: "Prema Verbraucherzentrale Berlin sajamski štand je poslovna prostorija ako:",
        options: [
          "razumni potrošač opravdano očekuje da trgovac ondje posluje",
          "trgovac na štandu sklapa ugovore najmanje deset dana godišnje",
          "je štand registriran kao sjedište ili podružnica trgovačkog društva",
          "je sajam organiziran u državi sjedišta trgovca na štandu"
        ],
        correct: 0, id: "12q004"
      },
      {
        question: "Na koji se ugovor ne primjenjuju odredbe ZZP-a o ugovorima na daljinu?",
        options: [
          "ugovor o isporuci električne energije potrošaču",
          "ugovor o igrama na sreću s novčanim ulogom",
          "ugovor o pretplati na digitalnu uslugu",
          "ugovor o kupnji robe putem mrežne trgovine"
        ],
        correct: 1, id: "12q005"
      },
      {
        question: "Tko prema ZZP-u snosi teret dokaza da je potrošaču dana predugovorna obavijest?",
        options: [
          "potrošač koji tvrdi da je nije primio",
          "tijelo za zaštitu potrošača u upravnom postupku",
          "sud po službenoj dužnosti uz mogućnost vještačenja",
          "trgovac koji je dužan obavijestiti potrošača"
        ],
        correct: 3, id: "12q006"
      },
      {
        question: "Ako trgovac nije obavijestio potrošača o dodatnim troškovima, potrošač:",
        options: [
          "ih snosi do polovice njihova iznosa uz odobrenje suda",
          "ih nije dužan snositi",
          "ih snosi ako je ugovor sklopljen na daljinu",
          "ih snosi tek nakon isteka roka za odustanak"
        ],
        correct: 1, id: "12q007"
      },
      {
        question: "Obavijest kod ugovora sklopljenog izvan poslovnih prostorija daje se:",
        options: [
          "usmeno uz prisutnost svjedoka pri sklapanju ugovora",
          "elektroničkom poštom bez posebne suglasnosti potrošača",
          "mrežnom poveznicom na stranicu s općim uvjetima poslovanja trgovca",
          "na papiru ili na drugom trajnom mediju uz suglasnost potrošača"
        ],
        correct: 3, id: "12q008"
      },
      {
        question: "Ako trgovac na zaslonu ne označi gumb riječima „narudžba s obvezom plaćanja”, onda je:",
        options: [
          "narudžba neobvezujuća, odnosno ugovor ništetan",
          "ugovor valjan, a trgovac plaća novčanu kaznu",
          "ugovor pobojan na zahtjev potrošača u roku od godinu dana",
          "ugovor valjan uz pravo potrošača na sniženje cijene"
        ],
        correct: 0, id: "12q009"
      },
      {
        question: "U predmetu Content Services Sud EU-a je zaključio da mrežna stranica kojoj se pristupa poveznicom:",
        options: [
          "ispunjava zahtjev trajnog medija kad je dostupna dulje od godine dana",
          "nije trajni medij jer potrošač mora poduzeti radnje da bi pristupio informaciji",
          "je trajni medij ako je trgovac poslao poveznicu elektroničkom poštom",
          "zamjenjuje papirnati oblik kad potrošač prihvati opće uvjete poslovanja"
        ],
        correct: 1, id: "12q010"
      },
      {
        question: "Potvrdu o sklopljenom ugovoru na daljinu trgovac dostavlja:",
        options: [
          "u roku od četrnaest dana nakon isteka roka za odustanak od ugovora, e-poštom",
          "uz isporuku robe potrošaču u njegov dom, na papiru",
          "u razumnom roku, najkasnije pri isporuci, na trajnom mediju",
          "na zahtjev potrošača iznesen u pisanom obliku trgovcu, uz naknadu"
        ],
        correct: 2, id: "12q011"
      },
      {
        question: "Pružatelj internetskog tržišta mora potrošača obavijestiti, među ostalim, o:",
        options: [
          "cijeni isporuke koju određuje prijevoznik u svakom pojedinom slučaju",
          "ukupnom broju ugovora koje je ponuđač sklopio na tržištu",
          "povijesti cijena proizvoda u posljednjih šest mjeseci",
          "tome je li treća osoba koja nudi proizvode trgovac ili nije"
        ],
        correct: 3, id: "12q012"
      },
      {
        question: "Dva osnovna sredstva zaštite potrošača kod ugovora na daljinu i izvan poslovnih prostorija su:",
        options: [
          "obveza pisanog ugovora i pravo na naknadu štete",
          "pravo na sniženje cijene i jamstvo za ispravnost robe",
          "obveza osiguranja robe i pravo na povrat poštarine",
          "dužnost informiranja potrošača i pravo na odustanak"
        ],
        correct: 3, id: "12q013"
      }
    ],
    fillBlanks: [
      { sentence: "Za ugovor na daljinu ključno je da se sklapa bez istodobne fizičke _______ trgovca i potrošača.", answer: "prisutnosti", hint: "boravak na istom mjestu", id: "12f001" },
      { sentence: "Dućani, štandovi i kamioni kojima trgovac trajno obavlja posao jesu poslovne _______.", answer: "prostorije", hint: "imenica u množini", id: "12f002" },
      { sentence: "Informacija koju potrošač može pohraniti i nepromijenjeno reproducirati daje se na trajnom _______.", answer: "mediju", hint: "papir, e-pošta, CD", id: "12f003" },
      { sentence: "Obavijesti iz čl. 60. ZZP-a čine sastavni dio _______ i ne mogu se mijenjati bez izričitog dogovora.", answer: "ugovora", hint: "pravni posao koji potrošač sklapa", id: "12f004" },
      { sentence: "U vezi s obvezom obavještavanja potrošača teret dokaza je na _______.", answer: "trgovcu", hint: "stranka koja posluje", id: "12f005" },
      { sentence: "Ako trgovac ne ispuni zahtjeve za elektroničku narudžbu uz plaćanje, ugovor je _______.", answer: "ništetan", hint: "pravna sankcija koja djeluje od početka", id: "12f006" },
      { sentence: "Predmet C-485/17 nosi naziv Verbraucherzentrale _______.", answer: "Berlin", hint: "grad udruge potrošača", id: "12f007" },
      { sentence: "Direktiva 2011/83/EU je horizontalna direktiva koja počiva na načelu potpune ciljane _______.", answer: "harmonizacije", hint: "stupanj u kojem se nacionalna pravila izjednačuju", id: "12f008" },
      { sentence: "Direktiva 2011/83/EU stavila je izvan snage direktive o ugovorima izvan poslovnih prostorija i o ugovorima na _______.", answer: "daljinu", hint: "bez fizičke prisutnosti", id: "12f009" },
      { sentence: "Omnibus je polje primjene proširio na digitalni sadržaj za koji potrošač umjesto cijene daje osobne _______.", answer: "podatke", hint: "ime, adresa, OIB", id: "12f010" },
      { sentence: "Za razliku od ugovora o kupoprodaji robe, ugovor kojim trgovac za cijenu obavlja radnju za potrošača u ZZP-u se naziva ugovor o _______.", answer: "usluzi", hint: "predmet ugovora koji nije roba", id: "12f011" },
      { sentence: "Ugovor sklopljen za vrijeme _______ koji organizira trgovac radi promocije ili prodaje jest ugovor izvan poslovnih prostorija.", answer: "izleta", hint: "grupno putovanje", id: "12f012" },
      { sentence: "Telefon, radio, televizija, internet i elektronička pošta primjeri su sredstava daljinske _______.", answer: "komunikacije", hint: "razmjena poruka", id: "12f013" },
      { sentence: "Opća obveza obavještavanja iz čl. 46. ZZP-a ne odnosi se na svakodnevne poslove koji se ispunjavaju u trenutku njihova _______.", answer: "sklapanja", hint: "trenutak u kojem ugovor postaje obvezujući", id: "12f014" },
      { sentence: "Prije sklapanja ugovora trgovac mora potrošača obavijestiti i o pravu na jednostrani _______.", answer: "raskid", hint: "prestanak ugovora izjavom", id: "12f015" },
      { sentence: "Prema Omnibusu trgovac mora obavijestiti da je cijena personalizirana na osnovi automatiziranog donošenja _______.", answer: "odluka", hint: "izbor koji sustav izvršava umjesto čovjeka", id: "12f016" },
      { sentence: "Obavijest iz čl. 60. ZZP-a mora biti napisana na hrvatskom jeziku i _______ pismu.", answer: "latiničnom", hint: "ne ćiriličnom", id: "12f017" },
      { sentence: "Obvezu obavještavanja o raskidu trgovac ispunjava ako preda ispravno popunjen informativni _______.", answer: "obrazac", hint: "dokument s unaprijed ispisanim poljima", id: "12f018" },
      { sentence: "Pri telefonskom pozivu radi sklapanja ugovora trgovac mora na početku navesti identitet i komercijalnu _______ poziva.", answer: "svrhu", hint: "razlog poziva", id: "12f019" },
      { sentence: "Ugovor o uslugama sklopljen telefonom nastaje kad potrošač nakon primitka ponude potvrdi svoju _______.", answer: "suglasnost", hint: "izjava kojom se prihvaća ponuda", id: "12f020" },
      { sentence: "Na početku naručivanja trgovac mora naznačiti ograničenja u dostavi i prihvaćena sredstva _______.", answer: "plaćanja", hint: "novčani način podmirenja", id: "12f021" }
    ],
    learn: {
      title: "Ugovori na daljinu i izvan poslovnih prostorija: pojmovi i informiranje",
      content: `
<h3>Europski i domaći izvori</h3>
<p><strong>Direktiva 2011/83/EU o pravima potrošača</strong> (SL L 304, 22. 11. 2011.) je <strong>horizontalna direktiva</strong> utemeljena na <strong>čl. 114. UFEU-a</strong>. Stupanj harmonizacije je <strong>potpuna (ciljana) harmonizacija</strong>: odmiče se od minimalnog usklađivanja ranijih direktiva, ali državama članicama dopušta da za neke aspekte zadrže ili donesu nacionalna pravila. Polje primjene obuhvaća <strong>tuzemne i prekogranične</strong> ugovore o kupoprodaji robe i pružanju usluga zaključene između trgovca i potrošača. Direktiva je stavila izvan snage Direktive 85/577/EEZ (ugovori izvan poslovnih prostorija) i 97/7/EZ (ugovori na daljinu).</p>
<p>Direktiva uređuje: informacije koje se pružaju kod ugovora na daljinu, ugovora izvan poslovnih prostorija i drugih ugovora; <strong>pravo odustajanja</strong> kod ugovora na daljinu i izvan poslovnih prostorija; te usklađuje neke odredbe o izvršavanju i drugim aspektima ugovora poslovnih subjekata i potrošača. Cilj je da potpuna usklađenost informacija i prava odustajanja pridonese visokoj razini zaštite potrošača i boljem funkcioniranju unutarnjeg tržišta.</p>
<p>U hrvatskom pravu ZZP prenosi Direktivu 2011/83/EU i Direktivu (EU) 2019/2161 (<strong>Omnibus</strong>), koja mijenja Direktive 93/13/EEZ, 98/6/EZ, 2005/29/EZ i 2011/83/EU radi boljeg izvršavanja i modernizacije pravila Unije o zaštiti potrošača.</p>
<p><strong>Napomena o izmjeni:</strong> u ranijem tekstu Zakona (2014.) isti su pojmovi i odredbe nosili druge brojeve članaka (npr. pojmovi u čl. 5., obavještavanje u čl. 42. i 57., raskid u čl. 72.–79.). Danas vrijede brojevi iz ZZP-a 2022. s izmjenama (NN 19/22, 59/23, 59/26; pročišćeni tekst na snazi od 17. 6. 2026.) navedeni u nastavku. Izmjenom NN 59/26 u čl. 4. umetnuti su novi pojmovi pa su točke prenumerirane (npr. potrošač je prije bio t. 21., a danas je t. 28.), a u čl. 60. dodane su nove točke i stavci. Osnovni tekst: https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html</p>

<h3>Polje primjene</h3>
<p>Direktiva se primjenjuje na svaki ugovor trgovca i potrošača, uključujući ugovore o isporuci vode, plina, električne energije i područnog grijanja (i kad ih isporučuju javni davatelji usluga) u mjeri u kojoj se isporučuju na ugovornoj osnovi. Zahvaljujući <strong>Omnibusu</strong> primjenjuje se i kad trgovac isporučuje digitalni sadržaj (koji nije na materijalnom nosaču) ili digitalnu uslugu, a potrošač dostavlja ili se obvezuje dostaviti <strong>osobne podatke</strong> – osim ako trgovac te podatke obrađuje isključivo radi isporuke ili radi ispunjenja pravnih zahtjeva, a ne ni za koje druge svrhe.</p>
<p>ZZP, <strong>čl. 43.</strong>: ako nije drukčije određeno, odredbe glave I. i glave III. poglavlja I. dijela trećeg primjenjuju se na svaki ugovor trgovca i potrošača, uključujući ugovore o isporuci toplinske energije, vode, plina i električne energije (neovisno o ograničenom obujmu) te ugovore o digitalnom sadržaju i digitalnim uslugama za koje potrošač ne plaća cijenu, nego daje osobne podatke.</p>
<p><strong>Iznimke (čl. 44. st. 1.):</strong> ugovori o (1) socijalnim uslugama, (2) zdravstvenoj zaštiti, (3) igrama na sreću s novčanim ulogom (lutrija, casino, klađenje), (4) financijskim uslugama koje nisu obuhvaćene čl. 43. (v. čl. 43. st. 2.–3. i čl. 44. st. 3.), (5) stjecanju ili prijenosu nekretnina ili prava na nekretninama, (6) gradnji novih građevina ili rekonstrukciji postojećih te najmu stambenih prostora, (7) putovanju u paket-aranžmanu i povezanom putnom aranžmanu, (8) iz glave IV. (timeshare i dugotrajni turistički proizvodi), (9) sklopljeni pred javnopravnim tijelom koje je neovisno i nepristrano i dužno potrošaču dati sveobuhvatne obavijesti, (10) periodičnoj dostavi hrane, pića i proizvoda za dnevnu uporabu u kućanstvu putem pokretne prodaje, (11) putničkom prijevozu (uz iznimke), (12) sklopljeni putem automata, (13) sklopljeni s operatorom putem javne govornice. Prema st. 2. odredbe se ne primjenjuju ni na prodaju robe u ovršnom ili drugom prisilnom postupku.</p>

<h3>Vrste ugovora</h3>
<p><strong>Podjela prema predmetu:</strong> <em>ugovor o kupoprodaji</em> (čl. 4. t. 51.; vidi prethodnu cjelinu) i <em>ugovor o usluzi</em> (čl. 4. t. 52.): ugovor kojim trgovac pruža ili se obvezuje pružiti uslugu potrošaču, uključujući digitalnu uslugu, a potrošač plaća ili se obvezuje platiti cijenu.</p>
<p><strong>Podjela prema načinu sklapanja:</strong></p>
<table>
<tr><th>Pojam</th><th>Obilježja</th></tr>
<tr><td><strong>Poslovne prostorije</strong> (čl. 4. t. 27.)</td><td>prodajni prostor u nekretnini u kojem trgovac trajno obavlja djelatnost, odnosno prodajni prostor u pokretnini u kojem je uobičajeno obavlja</td></tr>
<tr><td><strong>Ugovor sklopljen izvan poslovnih prostorija</strong> (t. 50.)</td><td>(a) uz istodobnu fizičku prisutnost na mjestu koje nije poslovna prostorija trgovca, čak i kad je potrošač dao ponudu; (b) u poslovnim prostorijama ili sredstvima daljinske komunikacije <em>neposredno nakon</em> što je trgovac pristupio potrošaču osobno i individualno izvan svojih prostorija; (c) za vrijeme izleta koji je trgovac organizirao radi promocije ili prodaje</td></tr>
<tr><td><strong>Ugovor na daljinu</strong> (t. 49.)</td><td>sklopljen u okviru organiziranog sustava prodaje ili pružanja usluge, bez istodobne fizičke prisutnosti na jednom mjestu, uz isključivu uporabu jednog ili više sredstava daljinske komunikacije do trenutka i za sklapanje ugovora</td></tr>
<tr><td><strong>Sredstva daljinske komunikacije</strong> (t. 44.)</td><td>adresirani i neadresirani tiskani materijal, pisma, tiskane promidžbene poruke s narudžbenicom, katalozi, telefon s ljudskim posredovanjem i bez njega, radio, videofon, videotekst, telefaks, televizija, internet i elektronička pošta</td></tr>
<tr><td><strong>Trajni medij</strong> (t. 45.)</td><td>sredstvo koje omogućuje pohranu informacija za kasniju uporabu toliko dugo koliko je potrebno i nepromijenjenu reprodukciju: papir, e-pošta, CD, DVD, memorijska kartica, memorijski štapić, čvrsti disk</td></tr>
</table>
<p><strong>Što su poslovne prostorije (recital direktive):</strong> objekti bez obzira na oblik (dućani, štandovi, kamioni) koji trgovcu služe kao trajno ili uobičajeno mjesto obavljanja posla. Štandovi na tržnicama i sajmovima su poslovne prostorije ako ispunjavaju taj uvjet; sezonski objekti (skijališta, plaže u sezoni) također, jer trgovac ondje posluje redovito. <strong>Nisu</strong> poslovne prostorije prostori dostupni javnosti koje trgovac rabi tek iznimno (ulice, trgovački centri, plaže, sportski tereni, javni prijevoz) te stambeni prostori i radna mjesta. Poslovne prostorije osobe koja djeluje u ime ili za račun trgovca smatraju se poslovnim prostorijama.</p>
<p><strong>Verbraucherzentrale Berlin (C-485/17, 2018.):</strong> društvo prodaje robu isključivo na sajmovima; potrošač je kupio parni usisavač na štandu, a trgovac mu nije dao predugovorne informacije. Sud EU-a: štand koji trgovac drži na sajmu i na kojem nekoliko dana godišnje obavlja djelatnost je <em>poslovna prostorija</em> ako, s obzirom na sve okolnosti, osobito izgled štanda i obavijesti u prostorima sajma, uobičajeno obaviješten, razumno pažljiv i oprezan potrošač može opravdano očekivati da će trgovac ondje obavljati djelatnost i stupiti u vezu s njim radi sklapanja ugovora; to provjerava nacionalni sud.</p>

<h3>Dužnost informiranja</h3>
<p>Osnovna sredstva zaštite potrošača su <strong>dužnost trgovca da pruži sveobuhvatne informacije</strong> i <strong>pravo potrošača na odustanak</strong> od sklopljenog ugovora. Direktiva razlikuje informiranje kod ugovora koji nisu ni na daljinu ni izvan poslovnih prostorija (poglavlje II.) i kod ugovora na daljinu i izvan poslovnih prostorija s pravom odustajanja (poglavlje III.). U ZZP-u to su <strong>čl. 46.</strong> (opća obveza obavještavanja; ne odnosi se na svakodnevne poslove ispunjene pri sklapanju) i <strong>čl. 60.</strong> (obavijesti kod ugovora izvan poslovnih prostorija i na daljinu).</p>
<p><strong>Čl. 60. st. 1. – prije sklapanja ugovora ili obvezivanja ponudom trgovac mora jasno i razumljivo obavijestiti o:</strong> glavnim obilježjima proizvoda; svojem nazivu, sjedištu, telefonu, e-adresi i drugim sredstvima mrežne komunikacije; trgovcu u čije ime nastupa; adresi za pritužbe; maloprodajnoj cijeni i troškovima dostave (ili načinu izračuna); <strong>personaliziranoj cijeni zasnovanoj na automatiziranom donošenju odluka</strong>; trošku uporabe sredstava daljinske komunikacije; uvjetima plaćanja, isporuke, roku isporuke i rješavanju pritužbi; uvjetima, rokovima i postupku raskida te obrascu za raskid i funkciji za jednostrani raskid (čl. 81.a); trošku povrata robe; razumnom dijelu cijene ako je potrošač zatražio početak izvršenja prije isteka roka; slučajevima isključenja prava na raskid; odgovornosti za materijalne nedostatke; poslije-prodajnim uslugama i komercijalnim jamstvima; pravilima postupanja; trajanju ugovora, otkazu i automatskom produženju; minimalnom roku vezanosti; pologu; funkcionalnosti, kompatibilnosti i interoperabilnosti digitalnog sadržaja; izvansudskom rješavanju sporova. Obavijesti su <strong>sastavni dio ugovora</strong> (st. 2.). Kod ugovora na neodređeno vrijeme ili pretplate ukupna cijena odnosi se na ukupne troškove u obračunskom razdoblju (st. 3.), a kod fiksne naknade uključuje ukupne mjesečne troškove (st. 4.). Ako trgovac ne obavijesti o dodatnim troškovima, potrošač ih <strong>nije dužan snositi</strong> (st. 6.). Obavijest mora biti na <strong>hrvatskom jeziku i latiničnom pismu</strong> (st. 9.; st. 7. i 8. dodani su izmjenom NN 59/26). Čl. 60. st. 1. danas ima 27 točaka.</p>
<p><strong>Teret dokaza</strong> je na trgovcu (čl. 64.). <strong>Čl. 65.</strong>: obavijesti o raskidu mogu se dati informativnim obrascem, a trgovac je ispunio obvezu ako preda ispravno popunjen obrazac.</p>
<p><strong>Internetsko tržište (čl. 61.):</strong> pružatelj mora jasno obavijestiti o glavnim parametrima rangiranja ponuda i njihovoj relativnoj važnosti, o tome je li treća osoba koja nudi proizvode trgovac (prema njezinoj izjavi), o tome da se potrošačka prava iz propisa usklađenih s pravom EU-a ne primjenjuju ako ponuđač nije trgovac, te o podjeli ugovornih obveza između ponuđača i pružatelja. Nije dovoljno ako su obavijesti samo u općim uvjetima.</p>

<h3>Formalni zahtjevi za ugovor izvan poslovnih prostorija</h3>
<ul>
<li><strong>Čl. 66.:</strong> obavijest iz čl. 60. na papiru ili, uz suglasnost potrošača, na drugom trajnom mediju, čitko, jednostavno i razumljivo.</li>
<li><strong>Čl. 67.:</strong> trgovac dostavlja primjerak ugovora ili pisanu potvrdu usmeno sklopljenog ugovora (papir ili, uz suglasnost, drugi trajni medij), po potrebi s potvrdom prethodne suglasnosti potrošača za početak izvršenja.</li>
</ul>
<h3>Formalni zahtjevi za ugovor na daljinu</h3>
<ul>
<li><strong>Čl. 72.:</strong> obavijest prilagođena sredstvu daljinske komunikacije, jednostavnim jezikom, čitljiva ako je na trajnom mediju; uz ograničen prostor ili vrijeme barem ključni podaci na samom sredstvu; pri telefonskom pozivu trgovac na početku navodi svoj identitet (ili osobe za čiji račun nastupa) i komercijalnu svrhu poziva.</li>
<li><strong>Čl. 73. (ugovor o uslugama putem telefona):</strong> trgovac dostavlja ponudu na trajnom mediju tako da se može utvrditi trenutak zaprimanja; ugovor je sklopljen kad potrošač, nakon primitka ponude, potvrdi suglasnost; teret dokaza o zaprimanju potvrde je na trgovcu.</li>
<li><strong>Čl. 74. (obvezujuća narudžba):</strong> kad bi potrošač elektroničkim ugovorom preuzeo obvezu plaćanja, trgovac prije narudžbe jasno i lako uočljivo obavještava o točkama 1., 5., 17., 21. i 22. te st. 3.–5. čl. 60. i omogućuje jasnu izjavu da narudžba uključuje obvezu plaćanja; gumb mora biti označen riječima „narudžba s obvezom plaćanja” ili sličnim nedvojbenim izrazom. Ako trgovac ne ispuni obvezu, <strong>ugovor je ništetan, odnosno narudžba neobvezujuća</strong>.</li>
<li><strong>Čl. 75.:</strong> najkasnije na početku naručivanja mora se jasno naznačiti postoje li ograničenja u dostavi i koja su sredstva plaćanja prihvaćena.</li>
<li><strong>Čl. 76. (potvrda):</strong> u razumnom roku nakon sklapanja, najkasnije pri isporuci robe ili početku usluge, trgovac dostavlja potvrdu na trajnom mediju s obavijestima iz čl. 60. (osim ako su već dane na trajnom mediju) i potvrdom prethodne suglasnosti, ako je primjenjivo.</li>
<li><strong>Čl. 77.:</strong> zahtjev da izvršenje usluge (ili isporuka vode, plina, električne ili toplinske energije) započne prije isteka roka za raskid kod ugovora na daljinu mora biti <strong>izričito izjavljen</strong>; zahtjev na trajnom mediju traži čl. 68. za ugovore sklopljene izvan poslovnih prostorija.</li>
</ul>
<p><strong>Content Services (C-49/11, 2012.):</strong> društvo nudi preuzimanje sadržaja uz registraciju; potrošač „klikom” prihvaća opće uvjete i odriče se prava na odustanak, e-mail ne sadrži informacije o pravu na odustanak, a poslije stiže račun za 12 mjeseci. Sud EU-a (o Direktivi 97/7/EZ): zamjena papira može biti prikladna ako ispunjava istu funkciju kao papirnati oblik, ali <strong>mrežna stranica</strong> na kojoj je informacija dostupna poveznicom koju je poslao trgovac <strong>ne smatra se trajnim medijem</strong>; pri prijenosu informacije primatelj ne bi trebao poduzimati posebne radnje.</p>
<p><strong>Napomena o izmjeni:</strong> Direktiva (EU) 2023/2673 stavlja izvan snage Direktivu 2002/65/EZ (financijske usluge na daljinu) od 19. lipnja 2026. i dodaje u Direktivu 2011/83/EU čl. 11.a o funkciji odustajanja, koja vrijedi za sve ugovore na daljinu sklopljene putem mrežnog sučelja. Financijske usluge na daljinu Direktiva 2023/2673 uređuje zasebno, u novom poglavlju III.a (čl. 16.a–16.e). ZZP je tu direktivu već preuzeo Zakonom NN 59/26: u čl. 81.a uređena je funkcija za jednostrani raskid (na snazi od 19. 6. 2026.), a čl. 60. st. 1. t. 10. traži i obavijest o toj funkciji. Financijske usluge na daljinu u ZZP-u uređuje posebno poglavlje (od čl. 87.).</p>
`,
      id: "12l000"
    },
    id: "12k000"
  },
  pravoNaOdustanak: {
    name: "Pravo potrošača na odustanak i jednostrani raskid",
    icon: "fa-rotate-left",
    color: "#f59e0b",
    flashcards: [
      { question: "Što je pravo na odustanak (jednostrani raskid ugovora) u potrošačkom pravu?", answer: "Pravo potrošača da u određenom roku nakon sklapanja ugovora odustane od njega bez navođenja razloga i bez odgovornosti za neispunjenje.", explanation: "Engleski: right of withdrawal; cooling-off period.", id: "13c001" },
      { question: "Zašto potrošač ima pravo na odustanak kod ugovora na daljinu i izvan poslovnih prostorija?", answer: "Zbog učinka iznenađenja, nepripremljenosti, nemogućnosti provjere kvalitete proizvoda i usluge te nepoznavanja stranog prava.", explanation: "Potrošač ima razdoblje za razmišljanje bez utjecaja trgovca.", id: "13c002" },
      { question: "Čemu je svrha prava na odustanak prema Faccini Dori?", answer: "Zajamčiti potrošaču rok u kojem može procijeniti obveze koje proizlaze iz ugovora.", explanation: "Presuda C-91/92.", id: "13c003" },
      { question: "Po čemu se pravo na odustanak razlikuje od raskida ugovora zbog neispunjenja (čl. 368. ZOO-a)?", answer: "Odustanak nastupa prije ispunjenja obveza i vraća se primljeno bez naknade; raskid zbog neispunjenja ima posljedicu naknade koristi i štete.", explanation: "Pojmovi right of withdrawal i termination of contract.", id: "13c004" },
      { question: "Kojim je nazivom ZZP preveo right of withdrawal?", answer: "Pravo na jednostrani raskid ugovora; Zakon o potrošačkom kreditiranju rabi izraz pravo na odustanak od ugovora.", explanation: "Nazivlje EU-a nije dosljedno.", id: "13c005" },
      { question: "Koliki je rok za jednostrani raskid prema čl. 79. ZZP-a?", answer: "14 dana, bez navođenja razloga, računajući od sklapanja ugovora ili od preuzimanja robe.", explanation: "Isti rok za ugovore na daljinu i izvan poslovnih prostorija.", id: "13c006" },
      { question: "Kada počinje teći rok za raskid kod ugovora o kupoprodaji?", answer: "Od dana kad je potrošaču ili trećoj osobi koju je odredio potrošač, a nije prijevoznik, roba predana u posjed.", explanation: "Kod više komada ili pošiljaka od zadnjeg; kod redovite isporuke od prvog.", id: "13c007" },
      { question: "Kada počinje teći rok za raskid kod ugovora o uslugama i digitalnom sadržaju?", answer: "Od dana sklapanja ugovora (usluge, isporuka vode, plina, struje u neograničenoj količini, toplinska energija, digitalni sadržaj bez nosača).", explanation: "Čl. 79. st. 5.", id: "13c008" },
      { question: "Što je posljedica neobavještavanja o pravu na raskid (čl. 80. ZZP-a)?", answer: "Pravo na raskid traje godinu dana od isteka redovnog roka; ako trgovac obavijesti potrošača u tom roku, pravo prestaje 14 dana nakon primitka obavijesti.", explanation: "Isto u čl. 10. Direktive 2011/83/EU (12 mjeseci).", id: "13c009" },
      { question: "Kako potrošač koristi pravo na raskid (čl. 81. ZZP-a)?", answer: "Obavijesti trgovca prije isteka roka obrascem ili drugom nedvosmislenom izjavom; dovoljno je izjavu poslati prije isteka roka; potrošač dokazuje da je pravo ostvario.", explanation: "Mrežno sučelje: funkcija raskida (čl. 81.a, od 19. 6. 2026.); trgovac bez odgađanja potvrđuje primitak na trajnom mediju.", id: "13c010" },
      { question: "Koji je učinak raskida (čl. 82. ZZP-a)?", answer: "Strane nisu dužne ispuniti obveze; svaka vraća što je primila; potrošač ne naknađuje troškove, osim iznimaka iz čl. 83. st. 2. i čl. 84.", explanation: "Ako je ponudu dao potrošač, strane nisu dužne sklopiti ugovor.", id: "13c011" },
      { question: "Koje su obveze trgovca nakon raskida (čl. 83. ZZP-a)?", answer: "Vratiti sve plaćeno bez odgađanja, najkasnije za 14 dana od primitka obavijesti, istim sredstvom plaćanja; kod kupoprodaje tek kad primi robu ili dokaz o slanju.", explanation: "Ne vraća dodatne troškove skupljeg prijevoza po izboru potrošača.", id: "13c012" },
      { question: "Koje su obveze potrošača nakon raskida (čl. 84. ZZP-a)?", answer: "Vratiti robu bez odgađanja, najkasnije za 14 dana od obavijesti; snositi samo izravne troškove povrata, osim ako je trgovac pristao ili propustio obavijestiti.", explanation: "Rok je ispunjen ako potrošač u njemu pošalje robu.", id: "13c013" },
      { question: "Kada potrošač odgovara za umanjenje vrijednosti robe nakon raskida?", answer: "Za umanjenje nastalo rukovanjem robom preko onoga što je nužno za utvrđivanje prirode, obilježja i funkcionalnosti; ne odgovara ako nije obaviješten o pravu na raskid.", explanation: "Čl. 84. st. 6. i 7.; recital 47. Direktive.", id: "13c014" },
      { question: "Što je Sud EU-a presudio u predmetu Messner?", answer: "Nacionalno pravo ne smije općenito dopustiti prodavatelju naknadu za korištenje robe tijekom roka za odustanak; naknada je moguća samo za uporabu protivnu dobroj vjeri ili zabrani bogaćenja.", explanation: "Presuda C-489/07, o Direktivi 97/7/EZ.", id: "13c015" },
      { question: "Kako potrošač smije rukovati robom prema recitalu 47. Direktive 2011/83/EU?", answer: "Kao u trgovini: isprobati i pregledati s dužnom pažnjom, ali ne rabiti; odjeću samo isprobati. Obveze ne smiju obeshrabriti potrošača da odustane.", explanation: "Potrošač ne gubi pravo, ali odgovara za umanjenje vrijednosti.", id: "13c016" },
      { question: "Što je povezani ugovor i što mu se događa kad potrošač raskine glavni ugovor (čl. 85.)?", answer: "Ugovor o usluzi vezan uz glavni ugovor, a usluge pruža trgovac ili treća osoba po dogovoru s trgovcem; raskinut je zajedno s glavnim ugovorom, bez troškova za potrošača.", explanation: "Povezani ugovor: čl. 4. t. 30.", id: "13c017" },
      { question: "Koji su ugovori o robi izuzeti od prava na raskid (čl. 86. ZZP-a)?", answer: "Roba po specifikaciji potrošača, pokvarljiva, zapečaćena higijenska otpečaćena, nerazdvojivo pomiješana, otpečaćeni snimci i programi, tisak, alkohol s dostavom nakon 30 dana.", explanation: "Roba čija cijena ovisi o financijskom tržištu.", id: "13c018" },
      { question: "Koji su ugovori o uslugama i drugi ugovori izuzeti od prava na raskid (čl. 86. ZZP-a)?", answer: "Potpuno ispunjena usluga uz pristanak, hitni popravci, javna dražba, smještaj, prijevoz, najam vozila, catering i slobodno vrijeme na određeni datum, digitalni sadržaj uz pristanak.", explanation: "Uvjet: izričit prethodni pristanak i potvrda o gubitku prava.", id: "13c019" },
      { question: "Što je Sud EU-a presudio u predmetu slewo o madracu?", answer: "Madrac s kojeg je potrošač uklonio zaštitnu foliju nije originalno zatvorena roba nepogodna za povrat zbog higijene; pravo na odustanak ostaje.", explanation: "Presuda C-681/17; čl. 16. t. (e) Direktive 2011/83/EU.", id: "13c020" },
      { question: "Zašto Sud EU-a u slewo ne izjednačava madrac s higijenskim proizvodima poput četkica za zube?", answer: "Jer se vraćeni madrac može čišćenjem ili dezinfekcijom ponovno staviti na tržište, što pokazuju uporaba u hotelijerstvu i tržište rabljenih madraca.", explanation: "Isključenje vrijedi samo kad ponovna prodaja nije moguća.", id: "13c021" },
      { question: "Što se ne primjenjuje iz izuzeća (čl. 86. st. 2.) kod nezatraženih posjeta i izleta?", answer: "Izuzeća za potpuno ispunjene usluge, financijske cijene, robu po specifikaciji i otpečaćenu zapečaćenu robu ne vrijede kod nezatraženih posjeta domu i izleta.", explanation: "Točke 1., 2., 3. i 5. čl. 86. st. 1.", id: "13c022" },
      { question: "Što propisuje čl. 81.a ZZP-a o funkciji za jednostrani raskid?", answer: "Kod ugovora na daljinu putem mrežnog sučelja trgovac osigurava funkciju „raskid ugovora” i potvrdu „potvrditi raskid ugovora”; izjava poslana prije isteka roka je pravodobna.", explanation: "Trgovac bez odgode šalje potvrdu primitka na trajnom mediju, s datumom i vremenom; na snazi od 19. 6. 2026.", id: "13c023" }
    ],
    quiz: [
      {
        question: "Pravo na odustanak potrošač ostvaruje:",
        options: [
          "uz navođenje opravdanog razloga u pisanom obliku",
          "uz obrazloženje i suglasnost trgovca u pisanom obliku",
          "bez navođenja razloga u zakonskom roku od sklapanja ugovora",
          "ako je ugovor sklopljen u poslovnim prostorijama trgovca"
        ],
        correct: 2, id: "13q001"
      },
      {
        question: "Rok za jednostrani raskid ugovora sklopljenog na daljinu iznosi:",
        options: [
          "14 dana, a kod kupoprodaje teče od predaje robe u posjed",
          "30 dana, a teče od dana slanja narudžbe trgovcu putem interneta",
          "8 dana od isporuke za robu i 14 dana za usluge",
          "dva mjeseca ako trgovac ne dostavi račun"
        ],
        correct: 0, id: "13q002"
      },
      {
        question: "Ako trgovac nije obavijestio potrošača o pravu na raskid, to pravo prestaje:",
        options: [
          "istekom četrnaest dana od isporuke uz mogućnost produženja sudom",
          "istekom šest mjeseci od isteka redovnog roka",
          "tek nakon odluke suda o obvezi obavještavanja",
          "istekom godine dana od isteka redovnog roka"
        ],
        correct: 3, id: "13q003"
      },
      {
        question: "Trgovac je nakon raskida dužan potrošaču vratiti plaćeno najkasnije u roku od:",
        options: [
          "30 dana od dana sklapanja ugovora o kupoprodaji",
          "14 dana od primitka obavijesti o raskidu",
          "8 dana od povrata robe u poslovne prostorije trgovca",
          "14 dana od isteka roka za raskid prema čl. 79."
        ],
        correct: 1, id: "13q004"
      },
      {
        question: "U predmetu Messner Sud EU-a je odlučio da prodavatelj:",
        options: [
          "smije općenito tražiti naknadu za uporabu robe u roku za odustanak",
          "ne mora vratiti cijenu dok potrošač ne plati naknadu za uporabu",
          "ne smije općenito tražiti naknadu osim za uporabu protivnu dobroj vjeri",
          "smije tražiti naknadu ako je to predviđeno općim uvjetima poslovanja"
        ],
        correct: 2, id: "13q005"
      },
      {
        question: "Potrošač nakon raskida odgovara za umanjenje vrijednosti robe:",
        options: [
          "za umanjenje pa i ono nastalo uobičajenim pregledom robe",
          "ako je roba uništena zbog više sile ili događaja izvan kontrole potrošača",
          "za umanjenje nastalo tijekom dostave prijevoznika trgovca",
          "za ono nastalo rukovanjem preko nužnog za provjeru funkcionalnosti"
        ],
        correct: 3, id: "13q006"
      },
      {
        question: "Pravo na jednostrani raskid isključeno je kod robe koja je:",
        options: [
          "izrađena po specifikaciji potrošača ili prilagođena potrošaču",
          "kupljena u mrežnoj trgovini većeg trgovačkog društva",
          "dostavljena u više pošiljki u različitim razdobljima",
          "plaćena unaprijed bankovnom doznakom na račun trgovca"
        ],
        correct: 0, id: "13q007"
      },
      {
        question: "Presuda slewo odnosi se na madrac s kojeg je potrošač uklonio foliju, a Sud EU-a je odlučio da:",
        options: [
          "pravo na odustanak prestaje jer je roba otpečaćena odmah nakon dostave potrošaču",
          "pravo na odustanak ostaje jer madrac nije definitivno neprikladan za prodaju",
          "potrošač mora platiti naknadu za higijensku obradu madraca",
          "pravo na odustanak ostaje uz suglasnost trgovca dane pisanim putem"
        ],
        correct: 1, id: "13q008"
      },
      {
        question: "Pravo na odustanak razlikuje se od raskida zbog neispunjenja jer:",
        options: [
          "nastupa nakon neispunjenja ugovora uz pravo na naknadu štete i kamata",
          "zahtijeva sudsku odluku o prestanku ugovora",
          "nastupa prije ispunjenja obveza uz povrat primljenog bez naknade",
          "vrijedi za ugovore o prodaji vozila i nekretnina"
        ],
        correct: 2, id: "13q009"
      },
      {
        question: "Kod ugovora o uslugama rok za jednostrani raskid počinje teći:",
        options: [
          "od dana potpunog ispunjenja usluge od strane trgovca",
          "od dana kad je trgovac poslao potvrdu o ugovoru",
          "od dana kad je potrošač platio cijenu usluge",
          "od dana sklapanja ugovora"
        ],
        correct: 3, id: "13q010"
      },
      {
        question: "Ako potrošač raskine glavni ugovor, povezani ugovor:",
        options: [
          "raskinut je zajedno s njim i bez troškova za potrošača",
          "ostaje na snazi do isteka roka na koji je sklopljen",
          "raskinut je uz obvezu naknade štete trećoj osobi",
          "ostaje na snazi ako ga je pružila treća osoba"
        ],
        correct: 0, id: "13q011"
      },
      {
        question: "Koji natpis prema čl. 81.a ZZP-a mora imati funkcija potvrde jednostranog raskida na mrežnom sučelju?",
        options: [
          "odustajem od kupnje robe",
          "potvrditi raskid ugovora",
          "pošalji obrazac za reklamaciju",
          "zatraži povrat novca od banke"
        ],
        correct: 1, id: "13q012"
      }
    ],
    fillBlanks: [
      { sentence: "Pravo na odustanak potrošač ostvaruje bez navođenja _______.", answer: "razloga", hint: "ono što potrošač ne mora objašnjavati", id: "13f001" },
      { sentence: "Razdoblje u kojem potrošač bez pritiska trgovca razmišlja o ugovoru zove se cooling-off _______.", answer: "period", hint: "engleska riječ latinskog podrijetla", id: "13f002" },
      { sentence: "Obavijest o raskidu ugovora potrošač daje obrascem ili drugom _______ izjavom.", answer: "nedvosmislenom", hint: "izjavom koja ne ostavlja sumnju", id: "13f003" },
      { sentence: "Potrošač ne snosi troškove vraćanja ako je trgovac propustio ga o tome _______.", answer: "obavijestiti", hint: "radnja kojom se potrošaču priopćuje obveza", id: "13f004" },
      { sentence: "Roba izrađena po _______ potrošača izuzeta je od prava na raskid.", answer: "specifikaciji", hint: "pojedinačni zahtjevi naručitelja", id: "13f005" },
      { sentence: "U predmetu o madracu potrošač je uklonio zaštitnu foliju; predmet nosi naziv _______.", answer: "slewo", hint: "ime trgovačkog društva, malim slovima", id: "13f006" },
      { sentence: "Prema recitalu direktive potrošač smije robu pregledati kao u trgovini, ali odjeću smije samo _______.", answer: "isprobati", hint: "obući na kratko radi provjere", id: "13f007" },
      { sentence: "Posebni položaj potrošača proizlazi, među ostalim, iz učinka _______ i nepripremljenosti.", answer: "iznenađenja", hint: "razlog posebne zaštite: potrošač nije bio spreman", id: "13f008" },
      { sentence: "Prema Faccini Dori potrošač mora imati rok u kojem može procijeniti _______ koje proizlaze iz ugovora.", answer: "obveze", hint: "ono što ugovor nameće strankama", id: "13f009" },
      { sentence: "Zakon o potrošačkom kreditiranju isto pravo naziva pravom na _______ od ugovora.", answer: "odustanak", hint: "izraz direktive", id: "13f010" },
      { sentence: "Kod kupoprodaje rok za raskid teče od dana kad je roba predana potrošaču u _______.", answer: "posjed", hint: "faktična vlast nad stvari", id: "13f011" },
      { sentence: "Raskidom ugovora svaka strana vraća drugoj ono što je _______.", answer: "primila", hint: "radnja koja je ugovorom već izvršena", id: "13f012" },
      { sentence: "Ugovor sklopljen na javnoj _______ izuzet je od prava na jednostrani raskid.", answer: "dražbi", hint: "nadmetanje kupaca", id: "13f013" },
      { sentence: "Prema presudi o madracu trgovac ga nakon povrata može očistiti pa ga ponovno staviti na _______.", answer: "tržište", hint: "prodajni prostor", id: "13f014" },
      { sentence: "Izuzeća za robu po specifikaciji i otpečaćenu zapečaćenu robu ne vrijede za ugovore sklopljene na nezatraženim posjetima potrošačevu _______.", answer: "domu", hint: "mjesto stanovanja", id: "13f015" },
      { sentence: "Funkcija potvrde na mrežnom sučelju mora imati natpis „potvrditi _______ ugovora”.", answer: "raskid", hint: "suprotno od sklapanja", id: "13f016" }
    ],
    learn: {
      title: "Pravo potrošača na odustanak i jednostrani raskid",
      content: `
<h3>Pojam i svrha</h3>
<p><strong>Pravo na odustanak</strong> (<em>right of withdrawal</em>) je pravo potrošača da u određenom razdoblju nakon zaključenja ugovora od njega odustane <strong>ne navodeći razloge</strong> i bez odgovornosti za neispunjenje. Dopušteni nazivi: pravo na jednostrani raskid ugovora, pravo na raskid ugovora. Potrošač tako u dodatnom razdoblju (<em>withdrawal period</em>, tzv. <em>cooling-off period</em>), bez utjecaja trgovca, može razmisliti o svim važnim informacijama i odlučiti želi li ugovor.</p>
<p><strong>Razlozi posebnog položaja potrošača:</strong> učinak iznenađenja, nepripremljenost potrošača, nemogućnost provjere kvalitete proizvoda i usluga, nepoznavanje stranog prava. Prema <em>Faccini Dori</em> (C-91/92) svrha direktive je zajamčiti potrošaču pravo na odustanak u razdoblju koje mu omogućuje da procijeni obveze koje proizlaze iz ugovora. Prema jednom autoru, pravo potrošača na odustanak je temeljni koncept potrošačkog acquisa EU-a koji treba razlikovati od raskida ugovora.</p>
<p><strong>Terminologija.</strong> Nazivlje EU-a nije dosljedno (<em>right to withdraw</em>, <em>right of cancellation</em> rabe se kao istoznačnice). U pravu EU-a pravo na odustanak (<em>right of withdrawal</em>) razlikuje se od <em>termination of contract</em>. Hrvatski ZZP prevodi <em>right to withdraw</em> kao <strong>pravo na jednostrani raskid ugovora</strong>, a Zakon o potrošačkom kreditiranju kao <strong>pravo na odustanak od ugovora</strong> (čl. 14.).</p>
<table>
<tr><th>Raskid zbog neispunjenja (čl. 368. ZOO-a)</th><th>Pravo na odustanak / jednostrani raskid</th></tr>
<tr><td>posljedica neispunjenja obveza iz ugovora</td><td>nastupa u načelu prije nego što su strane počele ispunjavati obveze</td></tr>
<tr><td>međusobni povrat primljenog, naknada koristi i pravo na naknadu štete</td><td>povrat primljenog bez naknade ikakvih troškova koji bi nastali korištenjem prava</td></tr>
</table>

<h3>Rok (ZZP 2022., čl. 79.–80.)</h3>
<ul>
<li><strong>Čl. 79. st. 1.:</strong> potrošač može bez navođenja razloga jednostrano raskinuti ugovor sklopljen izvan poslovnih prostorija ili na daljinu od dana sklapanja, najkasnije u roku od <strong>14 dana</strong>. Isti rok za sve takve ugovore (recital 40. Direktive 2011/83/EU: različiti rokovi uzrokovali su pravnu nesigurnost i troškove usklađivanja).</li>
<li><strong>Kupoprodaja (st. 2.):</strong> rok teče od dana kad je potrošaču ili trećoj osobi koju je odredio potrošač, a koja nije prijevoznik, roba predana u posjed. Više komada jednom narudžbom isporučenih odvojeno ili više pošiljki (st. 3.): od predaje <em>zadnjeg</em> komada odnosno pošiljke. Redovita isporuka kroz razdoblje (st. 4.): od predaje <em>prvog</em> komada.</li>
<li><strong>Usluge, voda, plin i električna energija u neograničenom obujmu, toplinska energija, digitalni sadržaj bez materijalnog nosača (st. 5.):</strong> od dana sklapanja ugovora.</li>
<li><strong>Čl. 80. – neobavještavanje:</strong> ako trgovac nije obavijestio potrošača o pravu na raskid, pravo prestaje <strong>godinu dana</strong> od isteka redovnog roka; ako je obavijest dostavio unutar te godine, pravo prestaje 14 dana nakon što je potrošač obavijest primio. Isto čl. 10. Direktive 2011/83/EU (12 mjeseci, odnosno 14 dana od primitka informacije).</li>
</ul>

<h3>Način korištenja (čl. 81.)</h3>
<p>Potrošač mora prije isteka roka obavijestiti trgovca o odluci obrascem za jednostrani raskid ili drugom <strong>nedvosmislenom izjavom</strong>. Ako trgovac na mrežnoj stranici omogućuje raskid, potrošač ga može provesti elektronički, a trgovac mora bez odgađanja dostaviti potvrdu o primitku na trajnom mediju. Izjavu treba <strong>poslati</strong> prije isteka roka iz čl. 79. i 80. Potrošač dokazuje da je pravo ostvario u skladu s člankom. Obrazac propisuje ministar pravilnikom.</p>
<h3>Funkcija za jednostrani raskid (čl. 81.a, od 19. 6. 2026.)</h3>
<p>Zakonom NN 59/26 dodan je <strong>čl. 81.a</strong> ZZP-a. Kod ugovora na daljinu sklopljenog putem <strong>mrežnog sučelja</strong> trgovac mora osigurati <strong>funkciju raskida</strong> s natpisom „raskid ugovora”, a funkcija potvrde mora imati natpis „potvrditi raskid ugovora”. Trgovac <strong>bez odgode</strong> šalje potvrdu primitka na trajnom mediju, s datumom i vremenom. Izjava podnesena prije isteka roka smatra se <strong>pravodobnom</strong>. Odredba preuzima čl. 11.a Direktive 2011/83/EU (dodan Direktivom (EU) 2023/2673), a čl. 60. st. 1. t. 10. ZZP-a traži i obavijest o toj funkciji.</p>

<h3>Učinci raskida</h3>
<ul>
<li><strong>Čl. 82.:</strong> strane nisu dužne ispuniti obveze iz ugovora (ako je ponudu dao potrošač, nisu dužne sklopiti ugovor); svaka strana vraća drugoj što je primila; potrošač ne naknađuje troškove koji su posljedica korištenja prava, osim onih iz čl. 83. st. 2. i čl. 84.</li>
<li><strong>Obveze trgovca (čl. 83.):</strong> bez odgađanja, a najkasnije za <strong>14 dana</strong> od primitka obavijesti, vratiti sve što je potrošač platio; ne mora vratiti dodatne troškove skupljeg prijevoza koji je potrošač izričito odabrao; kod kupoprodaje vraća tek kad mu roba bude vraćena ili kad potrošač dostavi dokaz da ju je poslao (osim ako trgovac nije ponudio da sam preuzme robu); povrat istim sredstvom plaćanja, osim uz izričit pristanak potrošača; ne smije rabiti sadržaj koji nisu osobni podaci a koji je potrošač stvorio pri korištenju digitalnog sadržaja, uz iznimke.</li>
<li><strong>Obveze potrošača (čl. 84.):</strong> vratiti robu bez odgađanja, najkasnije za 14 dana od obavijesti (rok je ispunjen ako u njemu robu pošalje ili preda); ne smije rabiti digitalni sadržaj ni ga davati trećima; snosi <em>samo izravne troškove povrata</em>, osim ako je trgovac pristao snositi ih ili propustio obavijestiti potrošača o tom trošku; ako je roba kod ugovora izvan poslovnih prostorija dostavljena u dom, a ne može se vratiti poštom, trgovac je preuzima na svoj trošak; odgovara za <strong>umanjenje vrijednosti robe</strong> nastalo rukovanjem osim onoga što je potrebno za utvrđivanje prirode, obilježja i funkcionalnosti; ako trgovac nije obavijestio o pravu na raskid, ne odgovara za umanjenje, bez obzira na uzrok.</li>
<li><strong>Čl. 85.:</strong> raskidom ugovora raskida se i <em>povezan ugovor</em> (čl. 4. t. 30.: ugovor o usluzi koji se odnosi na glavni ugovor, a usluge pruža trgovac ili treća osoba na temelju dogovora s trgovcem), bez troškova osim propisanih odjeljkom.</li>
</ul>
<p><strong>Recital 47. Direktive 2011/83/EU:</strong> neki potrošači koriste pravo na odustanak nakon što su robu rabili više nego što je potrebno za utvrđivanje naravi, karakteristika i funkcioniranja. Tada potrošač ne gubi pravo, ali je odgovoran za umanjenje vrijednosti. Robom treba rukovati i pregledati je kao u trgovini; odjeću samo isprobati, ne nositi. Obveze potrošača ne bi smjele obeshrabriti korištenje prava.</p>
<p><strong>Messner (C-489/07, 2009.):</strong> potrošačica je putem interneta kupila rabljeni laptop, a ekran je poslije prestao raditi; odustala je od ugovora, a prodavatelj je tražio naknadu za osam mjeseci korištenja po tržišnoj vrijednosti najma. Sud EU-a (o Direktivi 97/7/EZ): odredbe direktive protive se nacionalnoj odredbi koja općenito dopušta prodavatelju da u slučaju odustanka potrošača zahtijeva <strong>naknadu vrijednosti korištenja</strong> robe; potrošač bi tada pravo mogao koristiti samo uz plaćanje naknade. Ipak, naknada se smije tražiti kad je potrošač robu koristio <strong>protivno načelima građanskog prava</strong> (dobra vjera, neosnovano bogaćenje), ako djelotvornost prava na odustanak nije dovedena u pitanje; ocjena je nacionalnog suda.</p>

<h3>Isključenje prava na raskid (čl. 86.)</h3>
<p>Potrošač <strong>nema</strong> pravo na jednostrani raskid ako je:</p>
<ol>
<li>potpuno ispunjen ugovor o uslugama za koji plaća cijenu, a ispunjenje je počelo uz izričit prethodni pristanak i potvrdu da zna da gubi pravo na raskid kad usluga bude potpuno ispunjena;</li>
<li>predmet proizvod čija cijena ovisi o promjenama na financijskom tržištu izvan utjecaja trgovca;</li>
<li>roba izrađena po specifikaciji potrošača ili jasno prilagođena potrošaču;</li>
<li>lako pokvarljiva roba ili roba kojoj brzo istječe rok uporabe;</li>
<li>zapečaćena roba nepogodna za povrat zbog zdravlja ili higijene ako je otpečaćena nakon dostave;</li>
<li>roba koja je nakon dostave zbog prirode nerazdvojivo pomiješana s drugim stvarima;</li>
<li>alkoholna pića s cijenom ugovorenom pri sklapanju, a dostavom tek nakon 30 dana, ako cijena ovisi o tržištu izvan utjecaja trgovca;</li>
<li>potrošač izričito zatražio posjet radi hitnih popravaka ili održavanja (za dodatne usluge i robu pravo ostaje);</li>
<li>zapečaćene audio ili videosnimke odnosno računalni programi otpečaćeni nakon isporuke;</li>
<li>novine, periodični tisak i magazini (osim pretplate);</li>
<li>ugovor sklopljen na javnoj dražbi;</li>
<li>smještaj koji nije stanovanje, prijevoz robe, najam vozila, catering ili usluge slobodnog vremena, ako je ugovoren određeni datum ili razdoblje;</li>
<li>digitalni sadržaj bez materijalnog nosača za koji se plaća cijena, ako je ispunjenje počelo uz izričit prethodni pristanak i potvrdu o gubitku prava;</li>
<li>potrošač posebno zatražio posjet radi usluge popravaka za koje plaća, a ugovor je uz njegov pristanak potpuno ispunjen.</li>
</ol>
<p>Prema <strong>st. 2.</strong> točke 1., 2., 3. i 5. ne primjenjuju se na ugovore sklopljene tijekom nezatraženih posjeta trgovca potrošačevu domu ili tijekom izleta radi promocije ili prodaje.</p>
<p><strong>slewo (C-681/17, 2019.):</strong> potrošač je putem interneta naručio madrac omotan zaštitnom folijom koju je uklonio, a zatim je odustao; opći uvjeti trgovca isključivali su raskid za otpečaćenu higijensku robu. Sud EU-a: čl. 16. t. (e) Direktive 2011/83/EU isključuje odustajanje samo kad se roba nakon otvaranja više ne može staviti na tržište zbog zdravlja ili higijene (npr. četkice za zube). Madrac nije <em>definitivno neprikladan</em> za ponovnu prodaju (uporaba u hotelijerstvu, tržište rabljenih madraca, mogućnost čišćenja); kao i odjeću, trgovac ga može nakon povrata očistiti ili dezinficirati. Pojam „originalno zatvorena roba koja nije pogodna za povrat zbog zaštite zdravlja ili higijene” ne obuhvaća madrac s kojeg je potrošač uklonio zaštitu.</p>
<p><strong>Napomena o izmjeni:</strong> brojevi članaka o raskidu u ranijem tekstu Zakona (čl. 72.–79.) danas su čl. 79.–86. ZZP-a (NN 19/22, 59/23, 59/26), a rok o neobavještavanju izražen je kao „godina dana” (Direktiva: 12 mjeseci); izmjenom NN 59/26 dodan je čl. 81.a. Osnovni tekst: https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html</p>
`,
      id: "13l000"
    },
    id: "13k000"
  },
  ugovorUElektronickomObliku: {
    name: "Ugovor u elektroničkom obliku i elektronički potpis",
    icon: "fa-file-signature",
    color: "#a855f7",
    flashcards: [
      { question: "Koji su propisi temelj ugovaranja u elektroničkom obliku?", answer: "Direktiva 2000/31/EZ o elektroničkoj trgovini, hrvatski Zakon o elektroničkoj trgovini (ZET) i, supsidijarno, Zakon o obveznim odnosima (čl. 10. ZET-a).", explanation: "ZOO se primjenjuje kad ZET nije drukčije odredio.", id: "14c001" },
      { question: "Što je ugovor u elektroničkom obliku prema čl. 2. t. 6. ZET-a?", answer: "Ugovor koji pravne i fizičke osobe u cijelosti ili djelomično sklapaju, šalju, primaju, raskidaju, otkazuju i prikazuju elektroničkim, optičkim ili sličnim sredstvima.", explanation: "Uključuje, ali nije ograničen na prijenos internetom.", id: "14c002" },
      { question: "Što određuje čl. 9. st. 1. i 2. ZET-a?", answer: "Sklapanje ugovora moguće je elektroničkim putem, a ponuda i prihvat ponude mogu se dati elektroničkim putem odnosno u elektroničkom obliku.", explanation: "Izričaj „moguće je” znači dopuštenost, ne obvezu.", id: "14c003" },
      { question: "Što određuje čl. 9. st. 3. ZET-a o valjanosti elektroničkog ugovora?", answer: "Ugovoru se ne može osporiti pravna valjanost samo zato što je sastavljen u obliku elektroničke poruke odnosno u elektroničkom obliku.", explanation: "Zabrana diskriminacije elektroničkog oblika.", id: "14c004" },
      { question: "Koji se pojmovi ponude i prihvata primjenjuju na elektroničke ugovore?", answer: "Oni iz općeg ugovornog prava (ZOO-a); ZET ne definira ponudu i prihvat, nego samo dopušta da se oni daju elektroničkim putem.", explanation: "Pitanje je u kojem je trenutku izlog internetske trgovine ponuda.", id: "14c005" },
      { question: "Koje predugovorne podatke mora osigurati davatelj usluga informacijskog društva (čl. 12. ZET-a)?", answer: "Stupnjeve postupka sklapanja ugovora, ugovorne odredbe, opće uvjete, jezike za sklapanje ugovora te kodekse postupanja i način njihova pregleda.", explanation: "Ne primjenjuje se na poruke e-pošte.", id: "14c006" },
      { question: "Što zahtijeva čl. 13. ZET-a o dostupnosti ugovornih odredbi?", answer: "Odredbe i opći uvjeti moraju biti dostupni korisnicima tako da ih mogu spremiti, ponovno rabiti i reproducirati.", explanation: "Odnosi se na davatelje usluga informacijskog društva.", id: "14c007" },
      { question: "Koji su ugovori izuzeti od elektroničkog oblika prema čl. 9. st. 4. ZET-a?", answer: "Obiteljski, nasljedni i darovni ugovori, ugovori o nekretninama (osim najma i zakupa), oni za koje je propisan javnobilježnički akt te jamstva potrošača-jamaca.", explanation: "Oblik zahtijevan posebnim zakonom ne može se zamijeniti.", id: "14c008" },
      { question: "Kada je ugovor u elektroničkom obliku sklopljen (čl. 15. st. 1. ZET-a)?", answer: "Onoga trenutka kad ponuditelj primi elektroničku poruku koja sadrži izjavu ponuđenog da prihvaća ponudu.", explanation: "Teorija primitka (recepcije).", id: "14c009" },
      { question: "Kada su elektronička ponuda i prihvat primljeni (čl. 15. st. 2. i 3.)?", answer: "Kad im osoba kojoj su upućeni može pristupiti; kod potrošačkih ugovora ta se odredba ne može isključiti.", explanation: "Kogentno u potrošačkim odnosima.", id: "14c010" },
      { question: "Što je potvrda primitka (čl. 14. st. 1. ZET-a) i kakva je njezina pravna priroda?", answer: "Davatelj bez odgode posebnom elektroničkom porukom potvrđuje primitak ponude ili prihvata; neformalna je i deklaratorna, ne utječe na sklapanje ugovora.", explanation: "Dispozitivna za nepotrošače, kogentna za potrošače.", id: "14c011" },
      { question: "Čime se razlikuju ugovori u e-obliku, na daljinu, među odsutnima i izvan prostorija?", answer: "E-oblik: elektroničkim sredstvima; na daljinu: bez istodobne fizičke prisutnosti; među odsutnima: bez kanala za trenutnu protuizjavu; izvan prostorija: uz prisutnost izvan prostora trgovca.", explanation: "ZET, Direktiva 2011/83/EU i čl. 263. st. 2. ZOO-a.", id: "14c012" },
      { question: "Što uređuje Uredba (EU) br. 910/2014 (eIDAS)?", answer: "Priznavanje sredstava elektroničke identifikacije među državama članicama i pravila o uslugama povjerenja: potpisi, pečati, vremenski žigovi, preporučena dostava, certificiranje mrežnih stranica.", explanation: "Izmijenjena Uredbom (EU) 2024/1183.", id: "14c013" },
      { question: "Što je elektronički potpis prema eIDAS-u (čl. 3. t. 10.)?", answer: "Podaci u elektroničkom obliku pridruženi ili logički povezani s drugim podacima u elektroničkom obliku koje potpisnik koristi za potpisivanje.", explanation: "Najšira kategorija, npr. klik na „prihvaćam”.", id: "14c014" },
      { question: "Što je napredan elektronički potpis (čl. 26. eIDAS-a)?", answer: "Povezan je nedvojbeno s potpisnikom, omogućuje njegovu identifikaciju, izrađen je pod potpisnikovom isključivom kontrolom i otkriva svaku naknadnu izmjenu podataka.", explanation: "Četiri kumulativna zahtjeva.", id: "14c015" },
      { question: "Što je kvalificirani elektronički potpis?", answer: "Napredan potpis izrađen kvalificiranim sredstvom za izradu potpisa i utemeljen na kvalificiranom certifikatu za elektroničke potpise.", explanation: "Jednak je pravni učinak kao vlastoručni potpis (čl. 25. st. 2.).", id: "14c016" },
      { question: "Koji je pravni učinak elektroničkog potpisa kao dokaza (čl. 25. eIDAS-a)?", answer: "Ne smije mu se uskratiti učinak i dopuštenost samo zato što je elektronički ili ne ispunjava zahtjeve kvalificiranog; kvalificirani vrijedi kao vlastoručni i priznaje se u svim državama članicama.", explanation: "Načelo države podrijetla.", id: "14c017" },
      { question: "Kako funkcionira digitalni potpis tehnički?", answer: "Iz podataka se hash-algoritmom izračuna sažetak i šifrira privatnim ključem potpisnika; provjeritelj ga javnim ključem dešifrira i usporedi s vlastitim sažetkom; potpis vrijedi kad su jednaki.", explanation: "Digitalni potpis je tehnička vrsta elektroničkog.", id: "14c018" }
    ],
    quiz: [
      {
        question: "Ako ZET ne određuje drukčije, na obveznopravne odnose iz elektroničkih ugovora primjenjuje se:",
        options: [
          "Direktiva o elektroničkoj trgovini izravnom primjenom na pojedinačne odnose",
          "Zakon o obveznim odnosima kao supsidijarni propis",
          "Zakon o zaštiti potrošača bez obzira na vrstu stranaka",
          "uredba eIDAS umjesto nacionalnog ugovornog prava"
        ],
        correct: 1, id: "14q001"
      },
      {
        question: "Odredba čl. 9. st. 3. ZET-a znači da se elektroničkom ugovoru:",
        options: [
          "automatski priznaje isti učinak kao ugovoru u obliku javnobilježničkog akta",
          "ne može osporiti valjanost samo zato što je u elektroničkom obliku",
          "pridaje veći dokazni učinak od papirnatog ugovora u parničnom postupku",
          "mora dodati pisana potvrda radi valjanosti prema ZET-u"
        ],
        correct: 1, id: "14q002"
      },
      {
        question: "Koji je ugovor izuzet od odredbi ZET-a o ugovorima u elektroničkom obliku?",
        options: [
          "ugovor o kupnji računalne opreme putem mrežne trgovine",
          "ugovor o najmu i zakupu nekretnine",
          "ugovor o darovanju između fizičkih osoba",
          "ugovor o pretplati na uslugu informacijskog društva"
        ],
        correct: 2, id: "14q003"
      },
      {
        question: "Prema čl. 15. ZET-a ugovor u elektroničkom obliku sklopljen je kad:",
        options: [
          "ponuđeni pošalje elektroničku poruku s prihvatom ponude",
          "obje stranke potpišu ugovor kvalificiranim potpisom",
          "davatelj usluga pošalje potvrdu primitka ponude",
          "ponuditelj primi poruku koja sadrži izjavu o prihvatu ponude"
        ],
        correct: 3, id: "14q004"
      },
      {
        question: "Elektronička poruka smatra se primljenom kad:",
        options: [
          "osoba kojoj je upućena može joj pristupiti",
          "je osoba kojoj je upućena stvarno pročitala",
          "je poslužitelj pošiljatelja zabilježio uspješno slanje",
          "je pošiljatelj dobio automatsku potvrdu čitanja"
        ],
        correct: 0, id: "14q005"
      },
      {
        question: "Potvrda primitka iz čl. 14. ZET-a je:",
        options: [
          "konstitutivna jer bez nje ugovor nije sklopljen",
          "deklaratorna pa potrošači ne mogu isključiti njezinu primjenu",
          "obvezna za ugovore sklopljene elektroničkom poštom i telefaksom",
          "dispozitivna i za potrošačke i za nepotrošačke ugovore"
        ],
        correct: 1, id: "14q006"
      },
      {
        question: "Ugovor „među odsutnima” prema čl. 263. st. 2. ZOO-a postoji kad:",
        options: [
          "stranke sklapaju ugovor izvan poslovnih prostorija trgovca ili na izletu",
          "ugovor sklapaju stranke iz različitih država članica Unije",
          "nije otvoren kanal neprekinute komunikacije pa protuizjava ne može odmah",
          "se ugovor sklapa elektroničkom poštom i telefaksom"
        ],
        correct: 2, id: "14q007"
      },
      {
        question: "Napredan elektronički potpis prema eIDAS-u, među ostalim, mora:",
        options: [
          "biti izdan od javnog bilježnika u državi članici",
          "sadržavati biometrijski otisak potpisnikova prsta",
          "biti pohranjen na papiru uz zaštitni žig tijela vlasti",
          "omogućavati otkrivanje naknadne izmjene potpisanih podataka"
        ],
        correct: 3, id: "14q008"
      },
      {
        question: "Kvalificirani elektronički potpis ima pravni učinak jednak:",
        options: [
          "vlastoručnom potpisu",
          "javnobilježničkoj ovjeri potpisa na ispravi",
          "pečatu pravne osobe bez potpisa ovlaštene osobe",
          "obični elektronički potpis u obliku klika"
        ],
        correct: 0, id: "14q009"
      },
      {
        question: "U tehničkom opisu digitalnog potpisa sažetak (hash) potpisnik šifrira:",
        options: [
          "javnim ključem primatelja dokumenta",
          "privatnim ključem potpisnika",
          "javnim ključem davatelja usluge povjerenja",
          "zajedničkom lozinkom koju poznaju obje stranke"
        ],
        correct: 1, id: "14q010"
      },
      {
        question: "Potpis je valjan kad provjeritelj utvrdi da je:",
        options: [
          "certifikat potpisnika izdan prije potpisivanja dokumenta",
          "sažetak iz potpisa jednak sažetku izračunatom iz dokumenta",
          "dokument pohranjen na poslužitelju davatelja usluge",
          "privatni ključ potpisnika poznat davatelju usluge povjerenja"
        ],
        correct: 1, id: "14q011"
      },
      {
        question: "Elektronički potpis prema eIDAS-u je:",
        options: [
          "potpis olovkom na papiru skeniran u računalo uz žig",
          "certifikat koji javni bilježnik izdaje za elektronički dokument",
          "elektronički podaci povezani s drugim podacima i rabljeni za potpisivanje",
          "potpis koji ima isti učinak kao vlastoručni tek nakon upisa u registar"
        ],
        correct: 2, id: "14q012"
      }
    ],
    fillBlanks: [
      { sentence: "Ugovor u elektroničkom obliku sklopljen je kad ponuditelj primi poruku s izjavom o _______ ponude.", answer: "prihvatu", hint: "suprotno od ponude", id: "14f001" },
      { sentence: "Potvrda primitka iz ZET-a ne utječe na sklapanje ugovora jer je po pravnoj prirodi _______.", answer: "deklaratorna", hint: "samo utvrđuje, ne stvara", id: "14f002" },
      { sentence: "Elektronički potpis koji ima isti učinak kao vlastoručni naziva se _______ potpis.", answer: "kvalificirani", hint: "najviša razina prema eIDAS-u", id: "14f003" },
      { sentence: "Uredba o elektroničkoj identifikaciji i uslugama povjerenja skraćeno se naziva _______.", answer: "eIDAS", hint: "kratica engleskog podrijetla", id: "14f004" },
      { sentence: "Sažetak podataka izračunat posebnim algoritmom naziva se engleski _______.", answer: "hash", hint: "jednosmjerna funkcija", id: "14f005" },
      { sentence: "Davatelj usluga informacijskog društva mora osigurati da se ugovorne odredbe mogu spremiti, ponovno rabiti i _______.", answer: "reproducirati", hint: "radnja koja se provodi sa spremljenom odredbom", id: "14f006" },
      { sentence: "Ugovori u elektroničkom obliku uređeni su Direktivom 2000/31/EZ o elektroničkoj _______.", answer: "trgovini", hint: "gospodarska djelatnost naznačena u naslovu direktive", id: "14f007" },
      { sentence: "Zakon o elektroničkoj trgovini definira ugovor u elektroničkom obliku kao ugovor sklopljen elektroničkim, optičkim ili sličnim _______.", answer: "sredstvima", hint: "imenica u instrumentalu množine", id: "14f008" },
      { sentence: "Čl. 9. st. 1. ZET-a dopušta elektroničko sklapanje ugovora; riječ „moguće je” ne znači _______ takvog sklapanja.", answer: "obvezu", hint: "izraz suprotan dopuštenosti", id: "14f009" },
      { sentence: "Pojmovi ponude i prihvata određuju se prema općem ugovornom pravu, tj. prema Zakonu o obveznim _______.", answer: "odnosima", hint: "naziv zakona", id: "14f010" },
      { sentence: "Davatelj usluga informacijskog društva mora osigurati podatke o jezicima ponuđenim za sklapanje i o kodeksima _______.", answer: "postupanja", hint: "skup dobrovoljnih pravila struke", id: "14f011" },
      { sentence: "Elektroničkom potpisu kao dokazu ne smije se uskratiti učinak i _______ samo zato što je u elektroničkom obliku.", answer: "dopuštenost", hint: "procesni uvjet uz pravni učinak", id: "14f012" }
    ],
    learn: {
      title: "Ugovor u elektroničkom obliku i elektronički potpis",
      content: `
<h3>Propisi i definicija</h3>
<p>Ugovaranje posredstvom digitalnih tehnologija uređuje <strong>Direktiva 2000/31/EZ o elektroničkoj trgovini</strong> i u Hrvatskoj <strong>Zakon o elektroničkoj trgovini (ZET)</strong>; <strong>supsidijarno</strong> se primjenjuje <strong>Zakon o obveznim odnosima</strong>. Čl. 10. ZET-a: ako ZET nije drukčije odredio, na obveznopravne odnose iz ugovora sklopljenih elektroničkim putem ili u elektroničkom obliku primjenjuju se odredbe ZOO-a, odnosno odgovarajući propis o ugovornim odnosima.</p>
<p><strong>Čl. 2. t. 6. ZET-a:</strong> ugovori u elektroničkom obliku su ugovori što ih pravne i fizičke osobe <strong>u cijelosti ili djelomično</strong> sklapaju, šalju, primaju, raskidaju, otkazuju, pristupaju im i prikazuju ih elektroničkim putem koristeći elektronička, optička ili slična sredstva, uključujući, ali ne ograničavajući se na prijenos internetom.</p>

<h3>Oblik ugovora</h3>
<ul>
<li><strong>Čl. 9. st. 1.:</strong> sklapanje ugovora moguće je elektroničkim putem odnosno u elektroničkom obliku („moguće je” znači dopuštenost; vidi uvodnu izjavu 37. Direktive o e-trgovini).</li>
<li><strong>Čl. 9. st. 2.:</strong> ponuda i prihvat ponude mogu se dati elektroničkim putem. Pojmovi ponude i prihvata određuju se općim ugovornim pravom (ZOO), a ne ZET-om.</li>
<li><strong>Čl. 9. st. 3.:</strong> ugovoru sastavljenom u obliku elektroničke poruke ne može se osporiti pravna valjanost <em>samo</em> zbog te činjenice. Svrha zakona je stvoriti pravni temelj za izjednačavanje <em>sigurnih</em> elektroničkih oblika poslovanja s klasičnim papirnatim oblikom.</li>
<li><strong>Čl. 9. st. 4. – izuzeci</strong> (prema važećem tekstu ZET-a, NN 67/25; izuzeće za ugovore s izričito propisanim vlastoručnim potpisom ili ovjerom potpisa više nije navedeno, a dodan je ugovor o dosmrtnom uzdržavanju)<strong>:</strong> imovinski, predbračni i bračni ugovori i drugi ugovori iz Obiteljskog zakona; ugovori o opterećenju i otuđenju imovine uz odobrenje centra za socijalnu skrb; ugovori o ustupu i raspodjeli imovine za života, o doživotnom i dosmrtnom uzdržavanju, nasljedni ugovori i oporuke; <strong>darovni ugovori</strong>; ugovori o prijenosu prava vlasništva na nekretninama i drugi pravni poslovi o stvarnim pravima na nekretninama (osim najma i zakupa); ugovori za koje je posebnim zakonom propisan javnobilježnički akt; ugovori i očitovanja jamaca ako jamac djeluje izvan svoje trgovačke, poslovne ili profesionalne djelatnosti.</li>
</ul>
<p>Treba razlikovati i pojmove: <strong>e-oblik</strong> (ZET, čl. 2. t. 6.), <strong>na daljinu</strong> (bez istodobne fizičke prisutnosti uz sredstva daljinske komunikacije; Direktiva 2011/83/EU, čl. 2. t. 7.), <strong>među odsutnima</strong> (nije otvoren kanal neprekinute komunikacije pa se protuizjava ne može dati odmah; čl. 263. st. 2. ZOO-a) te <strong>izvan prostorija</strong> (npr. izlet koji organizira trgovac, uz prisutnost izvan prostora trgovca; Direktiva 2011/83/EU, čl. 2. t. 8.).</p>

<h3>Predugovorne informacije</h3>
<p><strong>Čl. 12. st. 1. ZET-a:</strong> davatelj usluga informacijskog društva mora mogućem korisniku prije sklapanja ugovora jasno, razumljivo i nedvosmisleno osigurati podatke o: različitim stupnjevima u postupku sklapanja ugovora; ugovornim odredbama; općim uvjetima ako su dio ugovora; jezicima ponuđenim za sklapanje; kodeksima postupanja i načinu njihova pregleda elektroničkim putem. Ne primjenjuje se na poruke e-pošte. <strong>Čl. 13.:</strong> ugovorne odredbe i opći uvjeti moraju biti dostupni tako da ih korisnik može spremiti, ponovno rabiti i reproducirati.</p>

<h3>Trenutak sklapanja i potvrda primitka</h3>
<ul>
<li><strong>Čl. 15. st. 1.:</strong> ugovor je sklopljen onoga trenutka kad <strong>ponuditelj primi</strong> elektroničku poruku koja sadrži izjavu ponuđenog da prihvaća ponudu.</li>
<li><strong>Čl. 15. st. 2.:</strong> ponuda, prihvat i druge izjave volje primljeni su kad im osoba kojoj su upućeni <strong>može pristupiti</strong> (npr. ne ovisi o tome je li sandučić pun). <strong>St. 3.:</strong> kod potrošačkih ugovora ne smije se isključiti primjena st. 2.</li>
<li><strong>Čl. 14. st. 1. – potvrda primitka:</strong> davatelj usluga mora bez odgode, posebnom elektroničkom porukom, potvrditi primitak poruke s ponudom ili prihvatom. Pravna je priroda: neformalna (e-poruka ili konkludentno), <strong>deklaratorna</strong> (ne utječe na sklapanje ugovora), <strong>dispozitivna</strong> u odnosima bez potrošača (može se ugovoriti neprimjena) i <strong>kogentna</strong> kad sudjeluju potrošači. Ne primjenjuje se na poruke e-pošte.</li>
</ul>
<p>Pitanje <em>ponude</em> (izlog internetske knjižare s cijenama, košarica, podaci o plaćanju, pregled narudžbe, gumb „Naručite”) – je li izlaganje robe ponuda ili poziv na stavljanje ponude i kada je ugovor sklopljen – prosuđuje se prema općem pravu ponude i prihvata, a trenutak sklapanja prema čl. 15. ZET-a.</p>

<h3>Elektronički potpis – eIDAS</h3>
<p><strong>Uredba (EU) br. 910/2014 (eIDAS)</strong> o elektroničkoj identifikaciji i uslugama povjerenja za elektroničke transakcije na unutarnjem tržištu: (a) utvrđuje uvjete priznavanja sredstava elektroničke identifikacije fizičkih i pravnih osoba iz prijavljenih sustava druge države članice; (b) utvrđuje pravila za usluge povjerenja, osobito za elektroničke transakcije; (c) uspostavlja pravni okvir za elektroničke potpise, elektroničke pečate, vremenske žigove, elektroničke dokumente, usluge preporučene dostave i certificiranje autentikacije mrežnih stranica.</p>
<table>
<tr><th>Vrsta</th><th>Definicija / obilježja</th></tr>
<tr><td><strong>Elektronički potpis</strong> (čl. 3. t. 10.)</td><td>podaci u elektroničkom obliku pridruženi ili logički povezani s drugim podacima u elektroničkom obliku koje potpisnik koristi za potpisivanje (klik na „Accept”, otisak prsta, potpis olovkom na tabletu)</td></tr>
<tr><td><strong>Napredan elektronički potpis</strong> (čl. 3. t. 11. i čl. 26.)</td><td>(a) nedvojbeno je povezan s potpisnikom; (b) omogućava identifikaciju potpisnika; (c) izrađen je podacima koje potpisnik može uz visoku razinu pouzdanja koristiti pod svojom isključivom kontrolom; (d) povezan je s potpisanim podacima tako da se može otkriti svaka naknadna izmjena</td></tr>
<tr><td><strong>Kvalificirani elektronički potpis</strong> (čl. 3. t. 12.)</td><td>napredan potpis izrađen kvalificiranim sredstvima za izradu potpisa, na temelju kvalificiranog certifikata za elektroničke potpise</td></tr>
</table>
<p><strong>Pravni učinci (čl. 25.):</strong> (1) elektroničkom potpisu kao dokazu u sudskim postupcima ne smiju se uskratiti pravni učinak i dopuštenost samo zato što je u elektroničkom obliku ili ne ispunjava zahtjeve za kvalificirani potpis; (2) <strong>kvalificirani elektronički potpis ima jednak pravni učinak kao vlastoručni potpis</strong>; (3) kvalificirani potpis utemeljen na certifikatu izdanom u jednoj državi članici priznaje se kao kvalificirani u svim drugim državama članicama (načelo države podrijetla).</p>
<p><strong>Digitalni potpis – tehnički aspekt:</strong> potpisnik iz podataka hash-algoritmom izračuna sažetak (<em>hash</em>) i šifrira ga svojim <strong>privatnim ključem</strong>; time nastaje digitalno potpisani dokument. Provjeritelj <strong>javnim ključem</strong> dešifrira potpis i uspoređuje ga sa sažetkom koji sam izračuna iz dokumenta; potpis je valjan kad su vrijednosti jednake. Digitalni je potpis tehnička izvedba, dok je elektronički potpis pravni pojam.</p>
<p><strong>Napomena o izmjeni:</strong> eIDAS je izmijenjena Uredbom (EU) 2024/1183 (europski okvir za digitalni identitet). Budući da je eIDAS uredba, izravno se primjenjuje u svim državama članicama.</p>
`,
      id: "14l000"
    },
    id: "14k000"
  },
  materijalniNedostatak: {
    name: "Materijalni nedostatak i potrošačka kupoprodaja",
    icon: "fa-box-open",
    color: "#ef4444",
    flashcards: [
      { question: "Koji su ciljevi i pravna osnova Direktive 1999/44/EZ o prodaji robe široke potrošnje?", answer: "Istodobno uspostava i uredno funkcioniranje unutarnjeg tržišta i zaštita potrošača (osnova čl. 114. UFEU-a); minimalna harmonizacija.", explanation: "Izmijenjena Direktivom 2011/83/EU; zamijenjena Direktivom (EU) 2019/771.", id: "15c001" },
      { question: "Što znači poluprisilna narav pravila Direktive 1999/44/EZ (čl. 7. st. 1.)?", answer: "Odricanje od prava potrošača ili njihovo ograničenje ugovorom ne obvezuje potrošača, ali su valjane odredbe koje prava potrošača proširuju.", explanation: "Prava su kogentna samo prema dolje.", id: "15c002" },
      { question: "Koja su obilježja Direktive (EU) 2019/771 o ugovorima o kupoprodaji robe?", answer: "Ciljana maksimalna harmonizacija; stavlja izvan snage Direktivu 1999/44/EZ; primjenjuje se od 1. 1. 2022. na ugovore sklopljene od tog dana.", explanation: "Razlozi: neprilagođenost internetskoj trgovini i razlike nacionalnih propisa.", id: "15c003" },
      { question: "Što je prošireno preuzimanje Direktive 1999/44/EZ u hrvatskom ZOO-u?", answer: "Pravila o odgovornosti za neusklađenost primjenjuju se uz odstupanja na sve naplatne ugovore, neovisno o statusu stranaka (B2B, B2C, C2C).", explanation: "ZOO uređuje i potrošačku kupoprodaju.", id: "15c004" },
      { question: "Koji se propisi primjenjuju na potrošačku kupoprodaju u Hrvatskoj?", answer: "ZOO (odgovornost za materijalne nedostatke; Direktiva 1999/44/EZ) i ZZP (Direktiva 2011/83/EU); pojam potrošačkog ugovora definira ZOO.", explanation: "Dva zakona međusobno povezana.", id: "15c005" },
      { question: "Što je Sud EU-a odlučio u predmetu Faber?", answer: "Nacionalni sud mora po službenoj dužnosti ispitati je li kupac potrošač, jer potrošač može ne znati za svoju zaštitu; dovoljno je navesti manifestaciju nedostatka.", explanation: "Presuda C-497/13; načelo djelotvornosti.", id: "15c006" },
      { question: "Što je predmet potrošačke kupoprodaje prema Direktivi 1999/44/EZ?", answer: "Svaka tjelesna pokretna stvar; ne primjenjuje se na prodaju prava ni nekretnina; izuzeta su roba iz ovrhe, voda i plin koji nisu pakirani te električna struja.", explanation: "Direktiva 2011/83 uključuje energiju u ograničenom obujmu.", id: "15c007" },
      { question: "Kada ugovor koji uključuje uslugu ostaje kupoprodaja (predmet Schottelius)?", answer: "Kada je pružanje usluge isključivo akcesorno u odnosu na kupoprodaju (autonomno tumačenje, npr. montaža robe).", explanation: "Presuda C-247/16; mješoviti ugovori.", id: "15c008" },
      { question: "Što je načelo usklađenosti (sukladnosti) robe s ugovorom?", answer: "Svako odstupanje od ugovorenih svojstava i kvalitete robe je materijalni nedostatak (povreda ugovora) za koji trgovac odgovara potrošaču.", explanation: "Direktiva 1999/44/EZ, čl. 2.", id: "15c009" },
      { question: "Što je oboriva predmnijeva usklađenosti robe s ugovorom prema Direktivi 1999/44/EZ?", answer: "Popis uobičajenih slučajeva u kojima se roba smatra usklađenom; elementi se uzimaju kumulativno, pa nedostatak jednog znači neusklađenost; potrošač može dokazati drugo.", explanation: "Čl. 2. st. 2.", id: "15c010" },
      { question: "Kada prema čl. 401. st. 1. ZOO-a postoji materijalni nedostatak?", answer: "Kad stvar ne odgovara opisu, vrsti, količini i kvaliteti iz ugovora, nije prikladna za posebnu namjenu, nema dodatnu opremu i upute ili ažuriranja.", explanation: "Uz to i objektivni zahtjevi iz st. 2.", id: "15c011" },
      { question: "Koji su objektivni zahtjevi usklađenosti iz čl. 401. st. 2. ZOO-a?", answer: "Prikladnost za uobičajenu svrhu, odgovaranje uzorku ili modelu, dodatna oprema i upute, uobičajena svojstva (trajnost, sigurnost) te ispravna montaža.", explanation: "Javne izjave prodavatelja i proizvođača obvezuju prodavatelja.", id: "15c012" },
      { question: "Što je Direktiva (EU) 2019/771 promijenila u pojmu neusklađenosti?", answer: "Uključuje pravne nedostatke i dopunjuje zahtjeve: trajnost, količina, propisi i standardi, dodatna oprema; za digitalne elemente interoperabilnost i ažuriranja.", explanation: "Zadržani su svi zahtjevi iz Direktive 1999/44/EZ.", id: "15c013" },
      { question: "Kada prodavatelj ne odgovara za nedostatke prema Direktivi 1999/44/EZ?", answer: "Ako je potrošač u trenutku sklapanja ugovora za neusklađenost znao ili razumno nije mogao ne znati, ili ako ju je uzrokovao materijal koji je potrošač isporučio.", explanation: "ZOO čl. 402. ne primjenjuje pravilo „lako opaziti” na potrošačke ugovore.", id: "15c014" },
      { question: "Koji je odlučni trenutak za utvrđivanje usklađenosti i kako ZOO određuje odgovornost (čl. 400.)?", answer: "Odstupanje koje postoji pri isporuci; prodavatelj odgovara za nedostatke u trenutku prijelaza rizika i za one koji se pojave poslije zbog ranijeg uzroka.", explanation: "Rizik prelazi predajom (čl. 378. ZOO-a).", id: "15c015" },
      { question: "Kada prelazi rizik na potrošača prema čl. 49. ZZP-a?", answer: "Kad je roba predana potrošaču ili osobi koju je odredio, a koja nije prijevoznik; ako je prijevoznika predložio potrošač, predajom prijevozniku.", explanation: "Čl. 20. Direktive 2011/83/EU.", id: "15c016" },
      { question: "Koji je rok isporuke robe prema čl. 48. ZZP-a?", answer: "Bez odgađanja, najkasnije u roku od 30 dana od sklapanja ugovora, ako nije drukčije ugovoreno.", explanation: "Čl. 18. st. 1. Direktive 2011/83/EU.", id: "15c017" },
      { question: "Kakva je hijerarhija prava kupca prema Direktivi 1999/44/EZ?", answer: "Primarna prava: popravak ili zamjena; sekundarna: sniženje cijene ili raskid, ako primarna nisu moguća ili nisu ostvarena u razumnom roku bez znatnih neugodnosti.", explanation: "Hrvatski ZOO je do 2022. dopuštao slobodan izbor prava.", id: "15c018" },
      { question: "Što od 1. 1. 2022. vrijedi u ZOO-u o pravima kupca (čl. 410.)?", answer: "Kupac zahtijeva popravak ili zamjenu; sniženje cijene ili raskid tek ako prodavatelj nije uklonio nedostatak ili je to odbio ili nedostatak postoji unatoč pokušaju.", explanation: "Uz pravo na naknadu štete u svakom slučaju.", id: "15c019" },
      { question: "Što je popravak, a što zamjena robe i kako se provode (čl. 410.a ZOO-a)?", answer: "Popravak je dovođenje robe u usklađeno stanje, zamjena predaja identične robe bez nedostatka; oboje besplatno, u razumnom roku i bez znatnih neugodnosti za kupca.", explanation: "Besplatno: poštarina, rad i materijal.", id: "15c020" },
      { question: "Kada izbor između popravka i zamjene može biti ograničen?", answer: "Kad je odabrano pravo nemoguće ili neproporcionalno prema drugome zbog nerazumnih troškova; potrošač se tada mora zadovoljiti drugim pravom.", explanation: "Test proporcionalnosti vrijedi samo između popravka i zamjene.", id: "15c021" },
      { question: "Koja su tri kriterija testa proporcionalnosti?", answer: "Vrijednost robe bez neusklađenosti, važnost neusklađenosti i može li se drugo pravo ostvariti bez znatnih neugodnosti za potrošača.", explanation: "Treći kriterij uravnotežuje interese trgovca i potrošača.", id: "15c022" },
      { question: "Što je Sud EU-a presudio u predmetu Weber i Putz?", answer: "Kod zamjene neusklađene robe koju je potrošač u dobroj vjeri ugradio prodavatelj mora sam ukloniti staru i ugraditi novu robu ili snositi troškove.", explanation: "Spojeni predmeti C-65/09 i C-87/09.", id: "15c023" },
      { question: "Što je Sud EU-a presudio u predmetu Quelle?", answer: "Trgovac nema pravo na naknadu za korištenje neusklađene robe prije zamjene; potrošač se time nije neosnovano obogatio.", explanation: "Presuda C-404/06; ZOO čl. 410.a st. 6.", id: "15c024" },
      { question: "Kada kupac ne može raskinuti ugovor (čl. 410. st. 8. i čl. 412. ZOO-a)?", answer: "Kad je nedostatak neznatan (teret dokaza na prodavatelju) i, u pravilu, ako prodavatelju prethodno nije dao naknadni primjeren rok.", explanation: "Iznimke: odbijanje ispunjenja, očita nemogućnost, znatne neugodnosti.", id: "15c025" },
      { question: "Koliki je rok odgovornosti prodavatelja za nedostatke prema Direktivi 1999/44/EZ i ZOO-u?", answer: "Dvije godine od isporuke odnosno predaje stvari; kod trgovačkog ugovora šest mjeseci; rokovi se mogu ugovorom produljiti.", explanation: "Čl. 404. st. 2. i 4. ZOO-a; rabljene stvari: ugovor o jednoj godini.", id: "15c026" },
      { question: "Kakva je obveza potrošača pri otkrivanju vidljivog nedostatka (čl. 403. st. 4. ZOO-a)?", answer: "Ne mora pregledati stvar, ali mora obavijestiti prodavatelja u roku od dva mjeseca od otkrića, najkasnije dvije godine od prijelaza rizika.", explanation: "Opisivati nedostatak potanko nije potrebno (čl. 406.).", id: "15c027" },
      { question: "Što je prekluzivni rok iz čl. 422. st. 1. ZOO-a?", answer: "Prava kupca koji je pravodobno obavijestio prodavatelja gase se nakon dvije godine od dana odašiljanja obavijesti, osim kod prodavateljeve prijevare.", explanation: "Prigovor protiv zahtjeva za plaćanje cijene ostaje.", id: "15c028" },
      { question: "Što je predmnijeva postojanja nedostatka (Direktiva 1999/44/EZ, čl. 5. st. 3.)?", answer: "Nedostatak očit u šest mjeseci od isporuke smatra se postojećim pri isporuci, osim ako prodavatelj dokaže suprotno; ZOO sada: jedna godina.", explanation: "Iznimka od pravila da teret dokaza snosi kupac; kod trgovačkih ugovora šest mjeseci.", id: "15c029" },
      { question: "Što je pravo regresa (čl. 422.a ZOO-a)?", answer: "Prodavatelj koji je ispunio obveze kupcu može iste zahtjeve ostvariti prema svojem prethodnom prodavatelju, uz obavijest i uz rok od dvije godine od njihova prijelaza rizika.", explanation: "Odgovornost u lancu isporuke.", id: "15c030" },
      { question: "Što je komercijalno jamstvo (čl. 423. ZOO-a)?", answer: "Obveza prodavatelja ili proizvođača, povrh zakonske odgovornosti, da vrati cijenu, zamijeni ili popravi stvar; obvezuje u skladu s izjavom o jamstvu i oglašavanjem.", explanation: "Odvojeno od odgovornosti za materijalne nedostatke.", id: "15c031" },
      { question: "Koja je pravna posljedica odredbe kojom se u potrošačkom ugovoru isključuje odgovornost za nedostatke?", answer: "Odredba ne obvezuje potrošača ako je dogovorena prije nego što je potrošač obavijestio prodavatelja o nedostatku (čl. 408. st. 3. ZOO-a).", explanation: "Direktiva 1999/44/EZ (čl. 7. st. 1.): takve odredbe ne obvezuju potrošača.", id: "15c032" },
      { question: "Što je Direktiva (EU) 2024/1799 uvela u ZOO izmjenama NN 69/26?", answer: "Pravo na popravak robe: rok odgovornosti nakon popravka jednom se produljuje za 12 mjeseci (čl. 405. st. 2.); uređena je i obnovljena stvar (čl. 410.a st. 2.–3.).", explanation: "Primjenjuje se na ugovore sklopljene od 31. 7. 2026.", id: "15c033" }
    ],
    quiz: [
      {
        question: "Direktiva (EU) 2019/771 o kupoprodaji robe počiva na načelu:",
        options: [
          "minimalne harmonizacije uz slobodu strože nacionalne zaštite",
          "uzajamnog priznavanja potrošačkih zakona država članica",
          "djelomične harmonizacije za internetsku trgovinu",
          "ciljane maksimalne harmonizacije"
        ],
        correct: 3, id: "15q001"
      },
      {
        question: "Pravila Direktive 1999/44/EZ poluprisilna su jer:",
        options: [
          "ugovor kojim se prava potrošača proširuju nije valjan",
          "odricanje od prava ne obvezuje potrošača pa proširenje prava ostaje valjano",
          "se mogu mijenjati odlukom suda u svakom pojedinom slučaju potrošača",
          "se primjenjuju na ugovore s prekograničnim elementom"
        ],
        correct: 1, id: "15q002"
      },
      {
        question: "Ugovor koji uključuje uslugu montaže ostaje kupoprodaja kad je usluga:",
        options: [
          "vrijednosno veća od cijene robe koja se prodaje",
          "ugovorena u zasebnom ugovoru s trećom osobom",
          "isključivo akcesorna u odnosu na kupoprodaju",
          "plaćena unaprijed uz dostavu robe u dom potrošača"
        ],
        correct: 2, id: "15q003"
      },
      {
        question: "U predmetu Faber Sud EU-a je odlučio da nacionalni sud mora po službenoj dužnosti:",
        options: [
          "ispitati je li kupac u ugovoru imao svojstvo potrošača",
          "naložiti trgovcu da otkloni nedostatak bez zahtjeva kupca",
          "odrediti vještačenje radi utvrđivanja uzroka nedostatka",
          "ocijeniti proporcionalnost zahtjeva za zamjenom robe"
        ],
        correct: 0, id: "15q004"
      },
      {
        question: "Prema Direktivi 1999/44/EZ svi elementi predmnijeve usklađenosti uzimaju se:",
        options: [
          "alternativno, pa je dovoljan jedan od njih",
          "po izboru prodavatelja koji ih bira pri sklapanju ugovora",
          "kumulativno, pa nedostatak jednog znači neusklađenost",
          "uz suglasnost potrošača u pisanom obliku"
        ],
        correct: 2, id: "15q005"
      },
      {
        question: "Prema čl. 49. ZZP-a rizik slučajne propasti robe prelazi na potrošača kad mu je roba:",
        options: [
          "isporučena prijevozniku koji je odabran na prijedlog trgovca",
          "predana u posjed ili prijevozniku kojeg je potrošač predložio",
          "plaćena i potvrđena računom koji je trgovac izdao",
          "otpremljena iz skladišta trgovca prema odredištu"
        ],
        correct: 1, id: "15q006"
      },
      {
        question: "Hijerarhija prava kupca prema Direktivi 1999/44/EZ znači da su primarna prava:",
        options: [
          "sniženje cijene i raskid ugovora zbog neusklađenosti",
          "naknada štete i zadržavanje plaćanja nepodmirenog dijela cijene",
          "raskid ugovora i povrat plaćene cijene bez naknadnog roka",
          "popravak ili zamjena pa tek potom sniženje cijene ili raskid"
        ],
        correct: 3, id: "15q007"
      },
      {
        question: "Test proporcionalnosti kod ograničenja izbora prava provodi se između:",
        options: [
          "popravka i zamjene robe",
          "raskida ugovora i sniženja cijene",
          "popravka i sniženja cijene",
          "zamjene robe i raskida ugovora"
        ],
        correct: 0, id: "15q008"
      },
      {
        question: "Kriterij testa proporcionalnosti NIJE:",
        options: [
          "vrijednost robe bez neusklađenosti",
          "važnost neusklađenosti",
          "može li se drugo pravo ostvariti bez znatnih neugodnosti za potrošača",
          "stupanj krivnje prodavatelja za neusklađenost"
        ],
        correct: 3, id: "15q009"
      },
      {
        question: "U predmetu Quelle Sud EU-a je odbacio mogućnost da trgovac traži:",
        options: [
          "troškove poštarine za povrat neusklađene robe",
          "naknadu za uporabu neusklađene robe do zamjene",
          "sniženje cijene umjesto zamjene robe",
          "dodatni rok za uklanjanje nedostatka"
        ],
        correct: 1, id: "15q010"
      },
      {
        question: "U predmetu Weber i Putz obveza prodavatelja kod zamjene ugrađene robe obuhvaća:",
        options: [
          "isporuku nove robe uz troškove ugradnje koje snosi potrošač",
          "povrat cijene i pravo na naknadu štete",
          "uklanjanje stare i ugradnju nove robe ili snošenje troškova",
          "obvezu popravka ako je ugradnja bila ugovorena kupoprodajnim ugovorom"
        ],
        correct: 2, id: "15q011"
      },
      {
        question: "Prema ZOO-u potrošač vidljivi nedostatak mora prijaviti prodavatelju u roku od:",
        options: [
          "dva mjeseca od otkrića, najkasnije dvije godine od prijelaza rizika",
          "osam dana od otkrića, bez obzira na prijelaz rizika",
          "godine dana od otkrića, a najkasnije dvije godine od sklapanja ugovora",
          "dva mjeseca od prijelaza rizika, bez obzira na otkriće"
        ],
        correct: 0, id: "15q012"
      },
      {
        question: "Prava kupca koji je pravodobno obavijestio prodavatelja gase se nakon:",
        options: [
          "godine dana od dana primitka stvari kod kupca",
          "dvije godine od dana odašiljanja obavijesti",
          "šest mjeseci od prijelaza rizika na kupca",
          "tri godine od sklapanja ugovora o kupoprodaji"
        ],
        correct: 1, id: "15q013"
      },
      {
        question: "Komercijalno jamstvo je:",
        options: [
          "zakonska odgovornost prodavatelja za materijalne nedostatke",
          "obveza proizvođača naknade štete zbog neispravnog proizvoda",
          "osiguranje kupca od rizika slučajne propasti robe pri prijevozu",
          "obveza prodavatelja ili proizvođača povrh zakonske odgovornosti"
        ],
        correct: 3, id: "15q014"
      },
      {
        question: "Za koliko se mjeseci prema čl. 405. st. 2. ZOO-a (NN 69/26) rok odgovornosti jednom produljuje nakon popravka?",
        options: [
          "šest mjeseci",
          "dvanaest mjeseci",
          "tri mjeseca",
          "dvadeset četiri mjeseca"
        ],
        correct: 1, id: "15q015"
      }
    ],
    fillBlanks: [
      { sentence: "Svako odstupanje od ugovorenih svojstava robe je povreda načela _______ robe s ugovorom.", answer: "usklađenosti", hint: "svojstvo robe koje se mjeri prema ugovoru", id: "15f001" },
      { sentence: "Prema ZZP-u trgovac mora isporučiti robu najkasnije u roku od 30 dana, ako nije drukčije _______.", answer: "ugovoreno", hint: "glagolski pridjev trpni", id: "15f002" },
      { sentence: "Popravak ili zamjena robe provode se _______, u razumnom roku i bez znatnih neugodnosti za potrošača.", answer: "besplatno", hint: "prilog; odnosi se na trošak", id: "15f003" },
      { sentence: "U predmetu Quelle potrošač zbog zamjene robe nije se neosnovano _______.", answer: "obogatio", hint: "stekao bez pravne osnove", id: "15f004" },
      { sentence: "Odstupanje koje se pokaže unutar propisanog razdoblja predmijeva se da je postojalo u trenutku _______ rizika.", answer: "prijelaza", hint: "premještanje rizika na kupca", id: "15f005" },
      { sentence: "Prodavatelj koji je ispunio obveze kupcu može zahtjeve ostvariti prema prethodnom prodavatelju, tj. u lancu _______.", answer: "isporuke", hint: "slijed prodavatelja", id: "15f006" },
      { sentence: "Kod neznatnog nedostatka kupac nema pravo na _______ ugovora.", answer: "raskid", hint: "prestanak ugovora izjavom", id: "15f007" },
      { sentence: "Potrošač mora obavijestiti prodavatelja o vidljivom nedostatku u roku od dva mjeseca od _______.", answer: "otkrića", hint: "trenutak kad je mana primijećena", id: "15f008" },
      { sentence: "Pravo prodavatelja da od prethodnog prodavatelja traži ono što je ispunio kupcu naziva se pravo _______.", answer: "regresa", hint: "latinski podrijetlom, povratni zahtjev", id: "15f009" },
      { sentence: "Direktiva 1999/44/EZ usvojena je radi uspostave unutarnjeg tržišta i zaštite _______.", answer: "potrošača", hint: "slabija strana u ugovoru", id: "15f010" },
      { sentence: "Hrvatski ZOO pravila o neusklađenosti primjenjuje na sve naplatne ugovore, tzv. _______ preuzimanje.", answer: "prošireno", hint: "šire od minimuma", id: "15f011" },
      { sentence: "ZOO i ZZP međusobno su povezani u uređenju potrošačke _______.", answer: "kupoprodaje", hint: "prodaja robe potrošaču", id: "15f012" },
      { sentence: "Direktiva 1999/44/EZ ne primjenjuje se na prodaju prava ni na _______.", answer: "nekretnine", hint: "zemljišta i zgrade", id: "15f013" },
      { sentence: "Prema čl. 401. ZOO-a nedostatak postoji ako stvar nije isporučena sa svom dodatnom opremom i _______ za instalaciju.", answer: "uputama", hint: "tekst uz proizvod", id: "15f014" },
      { sentence: "Objektivni zahtjev usklađenosti je da stvar odgovara uzorku ili _______ koji je prodavatelj stavio na raspolaganje.", answer: "modelu", hint: "prototip, primjerak", id: "15f015" },
      { sentence: "Direktiva 2019/771 uključuje i odgovornost za _______ nedostatke stvari.", answer: "pravne", hint: "suprotno od materijalnih", id: "15f016" },
      { sentence: "Prodavatelj ne odgovara ako je potrošač pri sklapanju ugovora za neusklađenost znao ili razumno nije mogao ne _______.", answer: "znati", hint: "glagol koji se suprotstavlja neznanju", id: "15f017" },
      { sentence: "Prodavatelj odgovara za nedostatke koje je stvar imala u trenutku prijelaza _______.", answer: "rizika", hint: "opasnost slučajne propasti", id: "15f018" },
      { sentence: "Prema ZOO-u od 2022. kupac prvo traži popravak ili zamjenu, a tek potom sniženje cijene ili _______.", answer: "raskid", hint: "prestanak ugovora izjavom kupca", id: "15f019" },
      { sentence: "Rok odgovornosti prodavatelja za nedostatke kod trgovačkog ugovora kraći je: šest _______.", answer: "mjeseci", hint: "jedinica vremena", id: "15f020" },
      { sentence: "Odredba o isključenju odgovornosti za nedostatke dogovorena prije obavijesti o nedostatku ne _______ potrošača.", answer: "obvezuje", hint: "djeluje na stranku kao pravna dužnost", id: "15f021" },
      { sentence: "Direktiva (EU) 2024/1799 uvodi zajednička pravila za promicanje _______ robe.", answer: "popravka", hint: "radnja kojom se mana uklanja bez zamjene stvari", id: "15f022" }
    ],
    learn: {
      title: "Materijalni nedostatak i potrošačka kupoprodaja",
      content: `
<h3>Relevantne direktive</h3>
<ul>
<li><strong>Direktiva 1999/44/EZ</strong> o određenim aspektima prodaje robe široke potrošnje i o jamstvima za takvu robu: usvojena radi istodobnog ostvarenja dvaju ciljeva – uspostave i urednog funkcioniranja unutarnjeg tržišta i zaštite potrošača (osnova <strong>čl. 114. UFEU-a</strong>). Karakteristike: <strong>minimalna harmonizacija</strong>, <strong>poluprisilna narav</strong> pravila (čl. 7. st. 1.): potrošačima se dodjeljuju prava, a trgovcu nameću kogentne obveze, pa je svako ugovorno odricanje ili ograničenje tih prava neobvezujuće za potrošača, dok su ugovorne odredbe kojima se prava proširuju valjane. Izmijenjena je i dopunjena Direktivom 2011/83/EU (maksimalna ciljana harmonizacija).</li>
<li><strong>Direktiva (EU) 2019/771</strong> o određenim aspektima ugovora o kupoprodaji robe (usvojena u svibnju 2019.): države članice morale su uskladiti pravo do 1. srpnja 2021., a pravila se primjenjuju od 1. siječnja 2022., i to samo na ugovore sklopljene od tog datuma. Stavlja izvan snage Direktivu 1999/44/EZ; <strong>ciljana maksimalna harmonizacija</strong>. Razlozi: neprilagođenost pravila internetskoj trgovini i neujednačenost nacionalnih propisa nastala zbog minimalne harmonizacije.</li>
</ul>
<p>U hrvatskom pravu direktiva 1999/44/EZ preuzeta je odredbama <strong>ZOO-a</strong> (odgovornost za materijalne nedostatke, čl. 400.–429.). Zakonodavac se opredijelio za <strong>prošireno preuzimanje</strong>: pravila o odgovornosti prodavatelja za neusklađenost robe s ugovorom (uz određena odstupanja) primjenjuju se na sve naplatne ugovore bez obzira na status stranaka (B2B, B2C, C2C). Direktiva 2011/83/EU preuzeta je ZZP-om; ZOO i ZZP međusobno su povezani (ZZP upućuje na ZOO za materijalne nedostatke).</p>
<p><strong>Napomena o izmjeni:</strong> ZOO je izmijenjen 2021. (NN 126/21) radi preuzimanja Direktive (EU) 2019/771; ranije pravo (Direktiva 1999/44/EZ i raniji tekst ZOO-a) opisano je u nastavku gdje je potrebno radi razumijevanja. Čl. 401. ZOO-a mijenjan je i izmjenama NN 69/26, koje se primjenjuju na ugovore sklopljene od 31. srpnja 2026. Istim su izmjenama preuzeta i pravila o <strong>pravu na popravak</strong> (Direktiva (EU) 2024/1799): čl. 405. st. 2. (rok odgovornosti jednom se produljuje za 12 mjeseci nakon popravka), čl. 410. st. 4. (obveza obavijesti) i čl. 410.a st. 2.–3. (obnovljena stvar). Brojevi članaka ZOO-a navedeni u ovoj cjelini provjereni su prema pročišćenom tekstu: https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima</p>

<h3>Potrošačka kupoprodaja</h3>
<p>Direktiva uređuje određene aspekte potrošačkog ugovora o kupoprodaji, ali ne sadrži definiciju potrošačkog kupoprodajnog ugovora; dopunjena je Direktivom o pravima potrošača. <strong>Potrošač</strong> (čl. 1. st. 2. t. a): bilo koja fizička osoba (personalni kriterij) koja u ugovorima iz direktive djeluje u svrhe koje nisu u vezi s njezinom poslovnom ni profesionalnom djelatnošću (funkcionalni kriterij). Za ugovore s dvojnom svrhom vrijedi recital 17. Direktive 2011/83/EU (poslovna svrha nije prevladavajuća). <strong>Trgovac</strong> (čl. 1. st. 2. t. c): fizička ili pravna osoba koja prema ugovoru prodaje robu u okviru svoje poslovne ili profesionalne djelatnosti; ZZP ima nešto širu definiciju jer obuhvaća i posrednika. <strong>ZOO</strong> definira potrošački ugovor (jedina takva definicija u hrvatskom pravu), na temelju pojmova potrošača i trgovca iz Direktive 1999/44.</p>
<p><strong>Faber (C-497/13, 2015.):</strong> na temelju načela djelotvornosti nacionalni sud mora <em>po službenoj dužnosti</em> ispitati pripada li ugovor osobnom polju primjene direktive, tj. je li kupac potrošač, jer se sustav zaštite temelji na ideji da je potrošač u slabijem položaju (pregovaračka snaga, obaviještenost) i da postoji rizik da se zbog neznanja ne pozove na pravno pravilo. Tako potrošači uživaju zaštitu i kad se na nju ne pozivaju. Za obavijest o nedostatku dovoljno je navesti manifestaciju nedostatka, ne uzrok ni dokaz.</p>
<p><strong>Predmet:</strong> ugovori o kupoprodaji robe široke potrošnje, tj. svake tjelesne pokretne stvari (čl. 1. st. 2. t. b). Ne primjenjuje se na prodaju prava (npr. intelektualno vlasništvo) ni nekretnina. Iz pojma robe izuzeti su: roba prodana prisilnim izvršenjem sudskog naloga ili na drugi način po zakonskoj ovlasti, voda i plin kad nisu pakirani za prodaju u određenom volumenu ili količini, električna struja; države mogu isključiti rabljenu robu s javnih dražbi kojima potrošači mogu osobno prisustvovati. Direktiva 2011/83/EU uključuje električnu energiju u ograničenom obujmu i robu izrađenu po specifikaciji potrošača. ZOO primjenjuje opća pravila o predmetu kupoprodaje (stvar i pravo); pravila o materijalnim nedostacima obuhvaćaju pokretne i nepokretne stvari, vodu, plin, energiju, a i ugovore za isporuku stvari koja se tek proizvodi; isključena je prisilna javna prodaja (čl. 409.).</p>
<p><strong>Mješoviti ugovori</strong> (ugovor o robi koja se tek treba izraditi, ugovor s uslugom montaže): autonomno tumačenje; <strong>Schottelius (C-247/16, 2017.)</strong> – ugovor koji uključuje pružanje usluga je kupoprodaja samo ako je pružanje usluga <em>isključivo akcesorno</em> u odnosu na kupoprodaju.</p>

<h3>Usklađenost s ugovorom i materijalni nedostatak</h3>
<p>Direktiva 1999/44/EZ polazi od <strong>načela usklađenosti (sukladnosti) robe s ugovorom</strong>: svako odstupanje od ugovorenih svojstava i kvalitete robe je materijalni nedostatak (povreda ugovora) za koji trgovac odgovara. Uvodi <strong>oborivu predmnijevu</strong> usklađenosti (lista većine uobičajenih situacija); potrošač može dokazivati da roba koja udovoljava svim elementima ipak nije u skladu s ugovorom. Svi elementi uzimaju se <strong>kumulativno</strong> – roba nije usklađena i kad nedostaje samo jedan (čl. 2. st. 2.).</p>
<p><strong>Čl. 401. ZOO-a (važeći tekst):</strong> st. 1. – nedostatak postoji ako stvar (1) ne odgovara opisu, vrsti, količini i kvaliteti odnosno nema funkcionalnost, kompatibilnost, interoperabilnost i druge značajke iz ugovora; (2) nije prikladna za posebnu namjenu koju je kupac priopćio prodavatelju najkasnije pri sklapanju ugovora i s kojom je prodavatelj pristao; (3) nije isporučena sa svom dodatnom opremom i uputama za instalaciju; (4) nije isporučena s ažuriranjima. St. 2. – nedostatak postoji i ako stvar (1) nije prikladna za uobičajenu uporabu (uzimajući u obzir propise EU-a i RH, tehničke standarde i kodekse); (2) ne odgovara uzorku ili modelu; (3) nije isporučena s dodatnom opremom, uključujući ambalažu i upute, koju kupac razumno očekuje; (4) nema količinu i svojstva uobičajena za stvar iste vrste (trajnost, mogućnost popravka, funkcionalnost, kompatibilnost, sigurnost), uzimajući u obzir javne izjave prodavatelja, proizvođača i njihovih predstavnika (reklame, označavanje); (5) je nepravilno instalirana odnosno montirana kad montaža čini dio ugovora; (6) je nepravilno montirana od kupca zbog nedostataka u uputama.</p>
<p><strong>Neusklađenost prema Direktivi 2019/771:</strong> bitno mijenja koncept definiranja neusklađenosti; uključena je i odgovornost za <strong>pravne nedostatke</strong>; zadržani su svi zahtjevi iz Direktive 1999/44/EZ, a dopunjeni su za sve vrste robe (zahtjev trajnosti, količine, obveza uzimanja u obzir propisa i standarda, isporuka dodatne opreme) ili samo za robu s digitalnim sadržajem ili uslugama (interoperabilnost, ažuriranja).</p>
<p><strong>Isključenje odgovornosti.</strong> Prodavatelj ne odgovara za nedostatke koji su pri sklapanju ugovora bili poznati kupcu ili mu nisu mogli ostati nepoznati. Prema Direktivi: ako je potrošač znao ili razumno nije mogao ne znati za neusklađenost, ili ako je ona uzrokovana materijalima koje je potrošač isporučio. Za razliku od Direktive, ZOO sadrži pravilo da prodavatelj odgovara i za nedostatke koje je kupac mogao lako opaziti ako je izjavio da stvar nema nedostataka ili da ima određena svojstva (čl. 402. st. 4.; viši stupanj zaštite); pravilo o „lako opaziti” (st. 2.) ne primjenjuje se na potrošačke ugovore (st. 3.). Prodavatelj ne odgovara ni za nedostatke koji su posljedica postupanja kupca (materijali ili upute).</p>

<h3>Trenutak utvrđivanja usklađenosti i prijelaz rizika</h3>
<p>Trgovac odgovara za odstupanje koje postoji u trenutku <strong>isporuke</strong>. Direktiva 1999/44/EZ ne definira isporuku ni sankcije za zakašnjenje; prazninu popunjava Direktiva 2011/83/EU: čl. 18. st. 1. – ako stranke nisu drukčije dogovorile, trgovac isporučuje robu bez nepotrebnog odlaganja, najkasnije u roku od <strong>30 dana</strong> od sklapanja ugovora (ZZP, čl. 48.). Čl. 20. Direktive 2011/83/EU: rizik gubitka ili oštećenja prelazi na potrošača kad on ili treća strana koju je naveo, a koja nije prijevoznik, stekne robu u fizički posjed; ako je potrošač otpremu povjerio prijevozniku kojeg nije ponudio trgovac, rizik prelazi predajom prijevozniku (ZZP, čl. 49.). <strong>ZOO:</strong> prodavatelj odgovara za nedostatke koje je stvar imala u trenutku prijelaza rizika (čl. 400. st. 1.), a rizik prelazi s predajom stvari (čl. 378. st. 1.). Prodavatelj odgovara i za nedostatke koji se pojave <em>poslije</em> prijelaza rizika ako su posljedica uzroka koji je postojao prije toga (čl. 400. st. 2.).</p>

<h3>Prava kupca</h3>
<table>
<tr><th>Direktiva 1999/44/EZ i ZOO od 1. 1. 2022.</th><th>ZOO prije toga (slika 1.9.)</th></tr>
<tr><td><strong>Hijerarhija:</strong> primarna prava – besplatan popravak ili besplatna zamjena; sekundarna – sniženje cijene ili raskid ugovora (ako nema prava na primarna, izabrano nije izvršeno u razumnom roku ili se ne može izvršiti bez znatnih neugodnosti)</td><td>kupac „po svom izboru” zahtijeva uklanjanje nedostatka, predaju druge stvari bez nedostatka, sniženje cijene ili raskid ugovora (bez hijerarhije); raskid je sekundarno pravo</td></tr>
</table>
<p><strong>Čl. 410. ZOO-a:</strong> kupac koji je pravodobno i uredno obavijestio prodavatelja ovlašten je zahtijevati uklanjanje nedostatka (popravak), predaju druge stvari (zamjenu), razmjerno sniženje cijene i raskinuti ugovor; u svakom slučaju ima pravo na <strong>naknadu štete</strong>, uključujući štetu na drugim dobrima (st. 2.). Kod uklanjanja nedostatka kupac ima pravo izbora između popravka i zamjene, osim ako je odabrani način nemoguć ili bi prodavatelju nastali nerazmjerni troškovi (st. 3.). <strong>Sniženje cijene ili raskid</strong> kupac ima tek ako prodavatelj nije uklonio nedostatak ili je to odbio, ako nedostatak postoji unatoč pokušaju ili ako je prodavatelj izjavio da ga neće ukloniti (st. 6.). Kupac može uskratiti plaćanje nepodmirenog dijela cijene (st. 7.). Kod <strong>neznatnog nedostatka</strong> nema pravo na raskid, a teret dokaza da je nedostatak neznatan je na prodavatelju (st. 8. i 9.). Troškove snosi prodavatelj (st. 10.).</p>
<p><strong>Popravak i zamjena.</strong> Popravak je dovođenje robe u stanje usklađenosti s ugovorom (Direktiva, čl. 1. st. 2. t. f); zamjena je predaja druge stvari u svemu identične, bez nedostatka. <strong>Način</strong> (čl. 410.a ZOO-a; čl. 3. st. 4. Direktive): <em>besplatno</em> (nužni troškovi: poštarina, rad, materijal; presuda <em>Quelle</em>), <em>u razumnom roku</em> od obavijesti i <em>bez znatnih neugodnosti</em> za potrošača, uzimajući u obzir prirodu stvari i svrhu. Prodavatelj može za vrijeme popravka posuditi zamjensku stvar; kod instaliranih stvari obveza uključuje uklanjanje stare i ugradnju nove; potrošač ne plaća za uobičajenu upotrebu zamijenjene stvari. Prema čl. 411. ZOO-a kupac koji ne dobije ispunjenje u razumnom roku zadržava pravo raskinuti ugovor ili sniziti cijenu; prema čl. 412. raskid je u pravilu moguć tek nakon <em>naknadnog primjerenog roka</em> (iznimke: prodavatelj je izjavio da neće ispuniti, očito neće moći ispuniti, zakašnjenje onemogućuje svrhu, znatne neugodnosti), a čl. 413.a daje potrošaču ovlast izjaviti raskid ako prodavatelj u naknadnom roku ne ispuni ugovor.</p>
<p><strong>Ograničenje izbora između popravka i zamjene:</strong> (a) ako je ostvarivanje jednog prava nemoguće; (b) ako je izabrano pravo neproporcionalno u odnosu na drugo, tj. trgovcu nameće troškove koji su u usporedbi s alternativnim pravom nerazumni. U oba slučaja potrošač se mora zadovoljiti drugim pravom. <strong>Test proporcionalnosti</strong> (tri kriterija): (1) <em>vrijednost robe bez neusklađenosti</em> – kod stvari male vrijednosti troškovi popravka u pravilu znatno premašuju vrijednost, a kod stvari velike vrijednosti i skup popravak u pravilu ne dostiže vrijednost; (2) <em>važnost neusklađenosti</em> – težak nedostatak na stvari male vrijednosti u pravilu čini popravak neproporcionalnim; (3) <em>može li se drugo pravo ostvariti bez znatnih neugodnosti za potrošača</em> – uravnotežuje interese stranaka (npr. ako bi popravak potrošača dugotrajno lišio nužne stvari, popravak se utvrđuje neproporcionalnim prema zamjeni). Usporedba je moguća <em>isključivo</em> između prava na popravak i na zamjenu, ne i s raskidom ili sniženjem.</p>
<p><strong>Weber i Putz (C-65/09 i C-87/09, 2011.):</strong> kad se neusklađena roba koju je potrošač u dobroj vjeri ugradio (u skladu s prirodom i svrhom) usklađuje zamjenom, prodavatelj mora <em>sam ukloniti</em> robu s mjesta ugradnje i ugraditi zamjensku ili snositi troškove uklanjanja i ugradnje, neovisno o tome je li prema ugovoru bio obvezan ugraditi prvotno kupljenu robu. <strong>Quelle (C-404/06, 2008.):</strong> zabrana naknade za korištenje neusklađene robe – trgovac nema pravo na naknadu za korištenje; potrošač nije neosnovano obogaćen jer samo sa zakašnjenjem prima robu koju je trebao primiti na početku. Do 2022. ZOO nije imao test neproporcionalnosti kakav je u Direktivi (kupac je bio bolje zaštićen); danas ga ima u čl. 410. st. 3. i 5.</p>

<h3>Rokovi</h3>
<table>
<tr><th>Što</th><th>Pravilo</th></tr>
<tr><td>Rok odgovornosti</td><td>Direktiva 1999/44/EZ (čl. 5. st. 1.): dvije godine od isporuke; <strong>ZOO čl. 404. st. 2.</strong>: dvije godine od predaje, kod trgovačkog ugovora šest mjeseci; kod rabljene stvari može se ugovoriti godina dana; rokovi se mogu ugovorom produljiti (st. 3. i 4.)</td></tr>
<tr><td>Obavijest o nedostatku</td><td><strong>Čl. 403. st. 4.:</strong> potrošač nije obvezan pregledati stvar, ali mora obavijestiti o vidljivom nedostatku u roku od <strong>dva mjeseca</strong> od otkrića, najkasnije <strong>dvije godine</strong> od prijelaza rizika; kod skrivenih nedostataka isto dva mjeseca od otkrića (čl. 404. st. 1.)</td></tr>
<tr><td>Sadržaj obavijesti</td><td>kupac ne mora potanje opisati nedostatak ni pozvati prodavatelja na pregled, osim kod trgovačkog ugovora (čl. 406. st. 1.); dovoljno je manifestaciju nedostatka (Faber); pouzdano poslana obavijest koja zakasni ili ne stigne smatra se ispunjenom (st. 2.)</td></tr>
<tr><td>Prekluzivni rok</td><td><strong>Čl. 422. st. 1.:</strong> prava kupca koji je pravodobno obavijestio prodavatelja gase se nakon <strong>dvije godine od dana odašiljanja obavijesti</strong>, osim kod prodavateljeve prijevare; st. 2. – prigovor protiv zahtjeva za plaćanje cijene ostaje</td></tr>
<tr><td>Predmnijeva postojanja nedostatka</td><td>Direktiva 1999/44/EZ (čl. 5. st. 3.): nedostatak očit u roku od <strong>šest mjeseci</strong> od isporuke smatra se postojećim i pri isporuci, osim ako se dokaže suprotno ili je u neskladu s prirodom robe ili nedostatka – iznimka od pravila da je teret dokaza na potrošaču. <strong>ZOO čl. 400. st. 9. i 10.</strong> (važeći): <strong>godina dana</strong> od prijelaza rizika, kod trgovačkih ugovora šest mjeseci</td></tr>
<tr><td>Nakon popravka ili zamjene</td><td>rokovi teku ponovno od predaje popravljene stvari (čl. 405.); prema izmjenama NN 69/26 (ugovori sklopljeni od 31. 7. 2026.) kod popravka se rok odgovornosti jednom produljuje za dvanaest mjeseci (čl. 405. st. 2.)</td></tr>
</table>
<p><strong>Napomena o izmjeni:</strong> prema Direktivi (EU) 2019/771 odgovornost traje <strong>dvije godine</strong>, a predmnijeva da je nedostatak postojao pri isporuci <strong>jednu godinu</strong>; države članice mogu predvidjeti dvije godine. Ranije je Direktiva 1999/44/EZ predviđala šest mjeseci. Prodavatelj se oslobađa odgovornosti ako kupac ne dokaže da se nedostatak pojavio u propisanim rokovima.</p>
<p><strong>Zabrana isključenja odgovornosti.</strong> Prema Direktivi 1999/44/EZ u potrošačkim je ugovorima svaka odredba o isključenju ili ograničenju odgovornosti za nedostatke neobvezujuća za potrošača. Čl. 408. ZOO-a: ugovaratelji mogu ograničiti odgovornost, ali je odredba ništetna ako je prodavatelj znao za nedostatak i nije obavijestio kupca ili je nametnuta monopolskim položajem; kod potrošačkih ugovora takve odredbe, ako su dogovorene prije obavijesti prodavatelju o nedostatku, <strong>nisu obvezujuće</strong> za potrošača (st. 3.).</p>
<h3>Regres i komercijalno jamstvo</h3>
<p><strong>Pravo regresa (čl. 422.a ZOO-a, odgovornost u lancu isporuke):</strong> prodavatelj prema kojem je kupac ostvario prava ovlašten je ista prava ostvariti prema prethodnom prodavatelju, ako su i u njihovu odnosu ispunjene pretpostavke odgovornosti; mora bez odgađanja obavijestiti prethodnog prodavatelja; prethodni prodavatelj ne odgovara ako je od prijelaza rizika između njih prošlo više od dvije godine; strane mogu ugovoriti drukčije. <strong>Komercijalno jamstvo (čl. 423.)</strong> je obveza prodavatelja ili proizvođača, povrh zakonske odgovornosti za materijalne nedostatke, da vrati cijenu, zamijeni, popravi ili servisira stvar; obvezuje u skladu s izjavom o jamstvu i oglašavanjem dostupnim pri ili prije sklapanju ugovora; proizvođač koji nudi jamstvo trajnosti odgovara izravno kupcu.</p>
`,
      id: "15l000"
    },
    id: "15k000"
  },
  odgovornostProizvodjaca: {
    name: "Odgovornost proizvođača za neispravan proizvod",
    icon: "fa-triangle-exclamation",
    color: "#6366f1",
    flashcards: [
      { question: "Što uređuje Direktiva 85/374/EEZ i na koja pitanja odgovara?", answer: "Građanskopravnu deliktnu odgovornost za štetu izazvanu neispravnim proizvodom; odgovara tko odgovara, do koje visine i za koje štete.", explanation: "Izmijenjena Direktivom 99/34/EZ (pojam proizvoda).", id: "16c001" },
      { question: "Koja su obilježja Direktive 85/374/EEZ?", answer: "Potrošačka direktiva maksimalne harmonizacije s opcijama, poluprisilna, uređuje izvanugovornu objektivnu odgovornost i uravnotežuje interese potrošača i proizvođača.", explanation: "U ZOO-u preuzeta gotovo doslovno (čl. 1073.–1080.).", id: "16c002" },
      { question: "Koje opcije Direktiva 85/374/EEZ daje državama članicama?", answer: "Uvođenje obrane razvojnim rizikom, gornje granice odgovornosti za masovne štete te isključenje primarnih poljoprivrednih proizvoda i divljači iz pojma proizvoda.", explanation: "Direktiva 99/34/EZ uključila je primarne poljoprivredne proizvode.", id: "16c003" },
      { question: "Što znači poluprisilna narav Direktive 85/374/EEZ?", answer: "Primjena se ne može unaprijed ugovorom proizvođača i oštećenika ni isključiti ni ograničiti; takva je ugovorna odredba ništetna.", explanation: "ZOO čl. 1079. u novijem tekstu.", id: "16c004" },
      { question: "U kakvom je odnosu odgovornost proizvođača prema drugim sustavima odgovornosti?", answer: "Ne isključuje ih: ostaju pravila o opasnoj stvari ili djelatnosti, o materijalnim nedostacima i o ugovornoj i izvanugovornoj odgovornosti; zahtjevi za istu štetu ne smiju se kumulirati.", explanation: "Čl. 13. Direktive; Sánchez (C-183/00).", id: "16c005" },
      { question: "Tko se smatra proizvođačem prema ZOO-u (čl. 1076., do 8. 12. 2026.)?", answer: "Proizvođač gotovog proizvoda, sirovine ili dijela, osoba koja se predstavlja proizvođačem svojim imenom ili žigom te uvoznik u Uniju; popis je iscrpan.", explanation: "Skov (C-402/03): iscrpno određenje odgovornih osoba.", id: "16c006" },
      { question: "Kada odgovara dobavljač proizvoda?", answer: "Supsidijarno: samo ako se ne može utvrditi proizvođač (ili uvoznik), a on u razumnom roku ne obavijesti oštećenika o identitetu proizvođača ili svog dobavljača.", explanation: "Zamjenski proizvođač, ne odgovara u svakom slučaju.", id: "16c007" },
      { question: "Što je Sud EU-a presudio u predmetu Aventis Pasteur o obavijesti dobavljača?", answer: "Dobavljač se smatra proizvođačem ako na vlastitu inicijativu i hitno nije obavijestio oštećenika o identitetu proizvođača ili osobe od koje je nabavio proizvod.", explanation: "Presuda C-358/08; relevantno i za čl. 11. Direktive.", id: "16c008" },
      { question: "Što je Sud EU-a odlučio u predmetu Skov?", answer: "Pravila Direktive isključuju nacionalno pravo prema kojem posrednik odgovara jednako kao proizvođač; popis odgovornih osoba iscrpan je zbog potpune harmonizacije.", explanation: "Presuda C-402/03 od 10. 1. 2006.", id: "16c009" },
      { question: "Što je proizvod prema čl. 1074. ZOO-a (za proizvode do 8. 12. 2026.)?", answer: "Svaka pokretna stvar, i kad je ugrađena u drugu pokretnu ili nepokretnu stvar, te električna i drugi oblici energije.", explanation: "Sporno: softver, usluge u oblaku, internet stvari.", id: "16c010" },
      { question: "Koje su pretpostavke odgovornosti proizvođača?", answer: "Neispravnost proizvoda, šteta i uzročna veza između neispravnosti i štete.", explanation: "Krivnja se ne traži (objektivna odgovornost).", id: "16c011" },
      { question: "Kada je proizvod neispravan (čl. 6. st. 1. Direktive)?", answer: "Kad ne pruža sigurnost koju osoba ima pravo očekivati, prema objektivnom kriteriju, uzimajući u obzir predstavljanje, razumno očekivanu uporabu i vrijeme stavljanja na tržište.", explanation: "Test opravdanih očekivanja potrošača.", id: "16c012" },
      { question: "Je li proizvod neispravan samo zato što je naknadno stavljen bolji proizvod?", answer: "Nije; neispravnost se prosuđuje prema sigurnosti koja se opravdano očekuje u trenutku stavljanja u promet.", explanation: "Čl. 1075. ZOO-a.", id: "16c013" },
      { question: "Što je Sud EU-a presudio u predmetu Boston Scientific?", answer: "Proizvodi iz serije s znatno povećanim rizikom kvara (ugradbeni srčani uređaji) smatraju se neispravnima i bez utvrđene neispravnosti u konkretnom slučaju.", explanation: "C-503/13 i C-504/13; prvi put uključen potencijalno nesiguran proizvod.", id: "16c014" },
      { question: "Koje nove kriterije neispravnosti je Boston Scientific uveo?", answer: "Razumno očekivanu sigurnost za užu skupinu osoba kojima je proizvod namijenjen (npr. pacijente) te ozbiljnost i težinu štete.", explanation: "Nisu bili u primjerovnoj listi Direktive.", id: "16c015" },
      { question: "Koje štete naknađuje odgovornost proizvođača prema ZOO-u (čl. 1073. za proizvode do 8. 12. 2026.)?", answer: "Imovinsku štetu zbog smrti ili tjelesne ozljede i štetu na stvari različitoj od proizvoda, namijenjenoj osobnoj uporabi, koju je oštećenik uglavnom tako rabio.", explanation: "Kumulativno objektivni i subjektivni kriterij.", id: "16c016" },
      { question: "Koja franšiza vrijedi za štetu na stvari za proizvode stavljene na tržište do 8. 12. 2026.?", answer: "Naknađuje se samo dio štete koji prelazi iznos od 500 eura.", explanation: "Za proizvode stavljene na tržište od 9. 12. 2026. nema tog praga.", id: "16c017" },
      { question: "Kako se naknađuje neimovinska šteta zbog neispravnog proizvoda do 8. 12. 2026.?", answer: "Samo prema općim pravilima odštetne odgovornosti; od 9. 12. 2026. obuhvaćena je i sustavom odgovornosti proizvođača (čl. 1073. st. 3. ZOO-a).", explanation: "Imovinska šteta zbog smrti i ozljede: čl. 1093.–1097. ZOO-a.", id: "16c018" },
      { question: "Što su refleksne štete i tko ih naknađuje (šteta na stvari različitoj od proizvoda)?", answer: "Štete na oštećenikovoj drugoj stvari; naknađuje ih proizvođač po pravilima o odgovornosti proizvođača. Štetu na samom proizvodu kupcu naknađuje prodavatelj (materijalni nedostaci).", explanation: "Odgovornost proizvođača nije ograničena na vlasnika proizvoda.", id: "16c019" },
      { question: "Što je Sud EU-a presudio u predmetu Veedfald?", answer: "Država članica ne može ograničiti vrste materijalnih šteta za koje se daje naknada; nacionalni sud ne smije odbiti naknadu jer šteta ne spada ni u jednu vrstu.", explanation: "C-203/99; uništen organ za transplantaciju.", id: "16c020" },
      { question: "Koga opterećuje teret dokaza uzročne veze i što je Sanofi Pasteur dopustio?", answer: "Oštećenika; Sud EU-a dopušta da sud prihvati ozbiljne, precizne i dosljedne indicije neispravnosti i uzročnosti, i bez konačnog znanstvenog dokaza.", explanation: "Presuda C-621/15.", id: "16c021" },
      { question: "Kakva je odgovornost više osoba za istu štetu zbog proizvoda?", answer: "Objektivna i solidarna (čl. 1077. ZOO-a); udio u regresu prema težini krivnje i težini posljedica (čl. 1109.).", explanation: "Treća osoba koja je pridonijela odgovara solidarno s proizvođačem.", id: "16c022" },
      { question: "Kada se proizvođač djelomično oslobađa odgovornosti?", answer: "Kad je nastanku štete djelomično pridonio oštećenik ili osoba za koju on odgovara.", explanation: "Čl. 1078. st. 3. ZOO-a (do 8. 12. 2026.); pravilo vrijedi i prema novom tekstu.", id: "16c023" },
      { question: "Kada se smatra da je proizvod stavljen u promet?", answer: "Kad je izašao iz područja i mogućnosti kontrole proizvođača, ne protivno njegovoj volji; i besplatno dijeljenje promidžbenih uzoraka je stavljanje u promet.", explanation: "Naplatnost nije odlučna.", id: "16c024" },
      { question: "Koji su razlozi oslobođenja proizvođača od odgovornosti (čl. 7. Direktive, čl. 1078. ZOO-a do 8. 12. 2026.)?", answer: "Nije stavio proizvod u promet; neispravnost vjerojatno nije postojala pri stavljanju; nije u gospodarskoj svrsi; prisilni propisi; razvojni rizik; konstrukcija ili upute glavnog proizvođača.", explanation: "Teret dokaza je na proizvođaču.", id: "16c025" },
      { question: "Što je razvojni rizik kao razlog oslobođenja?", answer: "Stanje znanosti i tehnike u trenutku stavljanja u promet nije omogućivalo otkrivanje neispravnosti; najkontroverzniji razlog, opcija koju je ZOO iskoristio.", explanation: "Objektivan standard, najnaprednija razina znanja.", id: "16c026" },
      { question: "Koji su rokovi za ostvarivanje prava iz čl. 1080. ZOO-a (do 8. 12. 2026.)?", answer: "Zastara tri godine od saznanja za štetu, neispravnost i proizvođača; prekluzivni rok deset godina od stavljanja u promet, osim ako je u tom roku pokrenut postupak.", explanation: "Čl. 10. i 11. Direktive 85/374/EEZ.", id: "16c027" },
      { question: "Čime se razlikuju Direktiva 85/374/EEZ i Direktiva 1999/44/EZ?", answer: "Prva uređuje kompenzacijsku deliktnu odgovornost za štetu od proizvoda, druga odgovornost prodavatelja za neispunjenje ugovorne obveze predaje stvari bez nedostatka.", explanation: "Različite osnove i različiti odgovorni.", id: "16c028" },
      { question: "Koja se dva stadija utvrđivanja štete razlikuju?", answer: "Prvi: utvrđivanje povrede osobe ili imovine; drugi: utvrđivanje nastale štete i pokrivenosti štete pravilima o odgovornosti proizvođača.", explanation: "Samo pokrivena šteta ide po posebnim pravilima.", id: "16c029" }
    ],
    quiz: [
      {
        question: "Odgovornost proizvođača za neispravan proizvod prema Direktivi 85/374/EEZ je:",
        options: [
          "ugovorna odgovornost za materijalne nedostatke",
          "izvanugovorna objektivna odgovornost bez obzira na krivnju",
          "kaznena odgovornost uz nužan dokaz namjere proizvođača",
          "izvanugovorna odgovornost uz dokaz krivnje proizvođača"
        ],
        correct: 1, id: "16q001"
      },
      {
        question: "Dobavljač proizvoda odgovara kao proizvođač ako:",
        options: [
          "je proizvod prodao oštećeniku uz naknadu",
          "je proizvod stavio na tržište u okviru svoje gospodarske djelatnosti",
          "ne obavijesti oštećenika o identitetu proizvođača ili dobavljača",
          "ne vodi evidenciju o proizvodima koje stavlja u promet"
        ],
        correct: 2, id: "16q002"
      },
      {
        question: "Prema Skovu popis odgovornih osoba u Direktivi 85/374/EEZ je:",
        options: [
          "primjerovan i državama dopušta proširenje kruga odgovornih",
          "određen prema nacionalnom pravu uz uzajamno priznavanje",
          "ograničen na proizvođača gotovog proizvoda i uvoznika",
          "iscrpan zbog potpune harmonizacije"
        ],
        correct: 3, id: "16q003"
      },
      {
        question: "Proizvod je neispravan kad ne pruža sigurnost koju:",
        options: [
          "osoba ima pravo očekivati prema objektivnom kriteriju",
          "oštećenik subjektivno očekuje s obzirom na vlastita iskustva",
          "jamči proizvođač komercijalnim jamstvom u ugovoru",
          "propisuje tehnička norma države članice proizvođača"
        ],
        correct: 0, id: "16q004"
      },
      {
        question: "Prema presudi Boston Scientific proizvod može biti neispravan:",
        options: [
          "tek nakon što se kvar ostvario i prouzročio štetu u konkretnom slučaju",
          "ako je kvar nastao tek nakon isteka jamstvenog roka proizvođača",
          "ako je šteta nastala zbog proizvođačeve krivnje",
          "i bez dokazane neispravnosti ako serija ima povećan rizik kvara"
        ],
        correct: 3, id: "16q005"
      },
      {
        question: "Šteta koju naknađuje ZOO po pravilima o odgovornosti proizvođača za proizvode do 8. 12. 2026. uključuje:",
        options: [
          "neimovinsku štetu zbog neispravnog proizvoda po posebnim pravilima",
          "imovinsku štetu zbog smrti ili tjelesne ozljede",
          "štetu na samom neispravnom proizvodu koji je kupac platio",
          "štetu na stvarima kupljenima za poslovnu uporabu"
        ],
        correct: 1, id: "16q006"
      },
      {
        question: "U predmetu Veedfald Sud EU-a je odlučio da država članica:",
        options: [
          "može isključiti naknadu za štetu na tijelu bez tjelesne ozljede",
          "smije ograničiti naknadu na štete koje su nacionalnim pravom izričito navedene",
          "ne može ograničiti vrste materijalnih šteta koje treba naknaditi",
          "ne mora predvidjeti naknadu štete na stvarima za privatnu uporabu"
        ],
        correct: 2, id: "16q007"
      },
      {
        question: "Teret dokazivanja uzročne veze između neispravnosti i štete (za proizvode do 8. 12. 2026.):",
        options: [
          "snosi proizvođač koji dokazuje da nije odgovoran",
          "dijele proizvođač i dobavljač razmjerno svojoj odgovornosti za štetu",
          "snosi sud po službenoj dužnosti u svakom postupku",
          "snosi oštećenik uz mogućnost olakšavanja nacionalnim pravilima"
        ],
        correct: 3, id: "16q008"
      },
      {
        question: "Koji NIJE razlog oslobođenja proizvođača od odgovornosti?",
        options: [
          "proizvod nije stavljen u promet",
          "stanje znanosti nije omogućavalo otkrivanje neispravnosti",
          "neispravnost je nastala zbog pridržavanja prisilnih propisa",
          "proizvod je prodan uz sniženu cijenu zbog vidljive mane"
        ],
        correct: 3, id: "16q009"
      },
      {
        question: "Zastarni rok za naknadu štete od neispravnog proizvoda je:",
        options: [
          "tri godine od saznanja za štetu i osobu proizvođača",
          "pet godina od stavljanja proizvoda u promet",
          "dvije godine od nastanka štete bez obzira na saznanje",
          "deset godina od saznanja za štetu"
        ],
        correct: 0, id: "16q010"
      },
      {
        question: "Opće pravilo o prekluzivnom roku za pravo na naknadu iznosi:",
        options: [
          "tri godine od dana kad je šteta nastala",
          "deset godina od stavljanja proizvoda u promet",
          "dvije godine od dana odašiljanja obavijesti proizvođaču",
          "dvadeset pet godina od stavljanja proizvoda u promet"
        ],
        correct: 1, id: "16q011"
      },
      {
        question: "Što je prema novom čl. 1073. st. 3. ZOO-a (proizvodi od 9. 12. 2026.) novost glede neimovinske štete?",
        options: [
          "ostaje isključena iz sustava odgovornosti proizvođača",
          "naknađuje se uz dokaz krivnje proizvođača",
          "naknađuje se u okviru sustava odgovornosti proizvođača",
          "naknađuje se do iznosa franšize propisane zakonom"
        ],
        correct: 2, id: "16q012"
      }
    ],
    fillBlanks: [
      { sentence: "Odgovornost proizvođača je objektivna, tj. odgovara se bez obzira na _______.", answer: "krivnju", hint: "subjektivni element odgovornosti", id: "16f001" },
      { sentence: "Dobavljač je prema Direktivi samo _______ odgovoran ako se proizvođač ne može utvrditi.", answer: "supsidijarno", hint: "odnos prema glavnoj odgovornosti", id: "16f002" },
      { sentence: "U predmetu o srčanim uređajima sporna je neispravnost cijele _______ proizvoda.", answer: "serije", hint: "isti proizvodni niz", id: "16f003" },
      { sentence: "Razvojni rizik znači da stanje _______ i tehnike nije omogućavalo otkrivanje neispravnosti.", answer: "znanosti", hint: "akademska djelatnost, istraživanje", id: "16f004" },
      { sentence: "Više odgovornih za istu štetu odgovara _______.", answer: "solidarno", hint: "svaki za cijeli iznos", id: "16f005" },
      { sentence: "Rok od deset godina od stavljanja proizvoda u promet je _______ rok.", answer: "prekluzivni", hint: "gasi pravo, ne samo tužbu", id: "16f006" },
      { sentence: "Direktiva 99/34/EZ proširila je pojam proizvoda na primarne _______ proizvode.", answer: "poljoprivredne", hint: "vezano uz zemljoradnju", id: "16f007" },
      { sentence: "Uvjet da je proizvod stavljen u promet nije ispunjen ako je izašao iz kontrole proizvođača protivno njegovoj _______.", answer: "volji", hint: "ono što proizvođač nije htio", id: "16f008" },
      { sentence: "Direktiva 85/374/EEZ uređuje građanskopravnu _______ odgovornost za štetu zbog neispravnog proizvoda.", answer: "deliktnu", hint: "izvanugovornu", id: "16f009" },
      { sentence: "Direktiva 85/374/EEZ je potrošačka direktiva maksimalne _______.", answer: "harmonizacije", hint: "stupanj usklađenosti nacionalnih pravila", id: "16f010" },
      { sentence: "Ugovorna odredba koja unaprijed isključuje odgovornost proizvođača je _______.", answer: "ništetna", hint: "pravna sankcija koja djeluje od početka", id: "16f011" },
      { sentence: "Pravila o odgovornosti proizvođača ne isključuju odgovornost za štetu od opasne stvari i opasne _______.", answer: "djelatnosti", hint: "npr. eksploziv i strojevi", id: "16f012" },
      { sentence: "Osim proizvođača i osobe koja se predstavlja proizvođačem, odgovara i _______ proizvoda u Uniju.", answer: "uvoznik", hint: "osoba koja unosi robu iz trećih zemalja", id: "16f013" },
      { sentence: "Prema presudi Aventis Pasteur dobavljač se smatra proizvođačem ako na vlastitu inicijativu i _______ ne obavijesti oštećenika o proizvođaču.", answer: "hitno", hint: "prilog koji označuje žurnost", id: "16f014" },
      { sentence: "Pretpostavke odgovornosti proizvođača su neispravnost, šteta i _______ veza.", answer: "uzročna", hint: "povezanost događaja i štete", id: "16f015" },
      { sentence: "Proizvod nije neispravan samo zato što je naknadno stavljen na tržište _______ proizvod.", answer: "bolji", hint: "usporedni pridjev", id: "16f016" },
      { sentence: "Boston Scientific uveo je kriterij sigurnosti za užu skupinu osoba kojima je proizvod namijenjen, npr. za _______.", answer: "pacijente", hint: "osobe koje se liječe", id: "16f017" },
      { sentence: "Za proizvode stavljene na tržište do 8. 12. 2026. naknađuje se dio štete na stvari koji prelazi franšizu od petsto _______.", answer: "eura", hint: "valuta od 2023.", id: "16f018" },
      { sentence: "Za proizvode do 8. 12. 2026. neimovinska šteta od neispravnog proizvoda naknađuje se prema općim pravilima odštetne _______.", answer: "odgovornosti", hint: "obveza naknade", id: "16f019" },
      { sentence: "Štete na oštećenikovoj stvari različitoj od neispravnog proizvoda nazivaju se _______ štete.", answer: "refleksne", hint: "odraz, posredne", id: "16f020" },
      { sentence: "Ako je šteti djelomično pridonio oštećenik, proizvođač se djelomično _______ odgovornosti.", answer: "oslobađa", hint: "djelomično nestaje obveza", id: "16f021" },
      { sentence: "Direktiva 85/374/EEZ uređuje deliktnu odgovornost, a Direktiva 1999/44/EZ odgovornost zbog neispunjenja _______ obveze.", answer: "ugovorne", hint: "nastaje sklapanjem pravnog posla", id: "16f022" },
      { sentence: "Prvi stadij utvrđivanja štete je utvrđivanje povrede osobe ili _______.", answer: "imovine", hint: "stvari i prava", id: "16f023" }
    ],
    learn: {
      title: "Odgovornost proizvođača za neispravan proizvod",
      content: `
<h3>Izvori i obilježja</h3>
<p><em>Ova cjelina opisuje uređenje čl. 1073.–1080. ZOO-a za proizvode stavljene na tržište do 8. 12. 2026. To uređenje i dalje vrijedi i nakon 9. 12. 2026. za proizvode stavljene na tržište prije tog dana (čl. 21. st. 2. ZID-a NN 69/26). Novo uređenje za proizvode stavljene na tržište od 9. 12. 2026. opisano je u napomeni o izmjeni na kraju.</em></p>
<p><strong>Direktiva 85/374/EEZ</strong> o odgovornosti za štetu izazvanu neispravnim proizvodom jedna je od rijetkih direktiva koje uređuju pitanje <strong>građanskopravne deliktne odgovornosti</strong>. Odgovara na pitanja: <em>tko odgovara, do koje visine, za koje štete</em>. Izmijenjena je 1999. Direktivom 99/34/EZ (u pogledu pojma proizvoda – uključeni su primarni poljoprivredni proizvodi). Obilježja: potrošačka direktiva <strong>maksimalne harmonizacije</strong> unatoč opcijama; sadrži <strong>opcije</strong> (obrana razvojnim rizikom; gornja granica odgovornosti za masovne štete; isključenje primarnih poljoprivrednih proizvoda i divljači, koje je Direktiva 99/34/EZ ukinula); <strong>poluprisilna</strong> naravi (primjena se ne može ugovorom proizvođača i oštećenika unaprijed ni ograničiti ni isključiti – takva je odredba ništetna); <strong>izvanugovorna objektivna odgovornost</strong> koja balansira interese potrošača i proizvođača. U Hrvatskoj je preuzeta gotovo doslovno u <strong>ZOO (čl. 1073.–1080.)</strong>.</p>
<p><strong>Razlika prema Direktivi 99/44/EZ:</strong> Direktiva 85/374/EEZ uređuje kompenzacijsku, privatnopravnu odgovornost za štetu izazvanu proizvodom s nedostatkom (delikt); Direktiva 99/44/EZ uređuje odgovornost zbog neispunjenja ugovorne obveze predaje stvari bez nedostatka.</p>
<p><strong>Odnos prema drugim sustavima odgovornosti:</strong> čl. 13. Direktive – Direktiva nema utjecaja na prava koja oštećenik ima prema propisima o ugovornoj ili drugoj odgovornosti ili posebnom sustavu odgovornosti koji je postojao pri priopćenju Direktive; ZOO čl. 1073. st. 7. – odredbe ne isključuju pravila o odgovornosti za opasnu stvar ili opasnu djelatnost, o materijalnim nedostacima ispunjenja te o ugovornoj i izvanugovornoj odgovornosti za štetu. <strong>Zahtjevi za popravljanje iste štete ne smiju se kumulirati</strong> (Sánchez, C-183/00, 2002.).</p>

<h3>Tko odgovara</h3>
<p>Popis iz čl. 1076. ZOO-a (za proizvode do 8. 12. 2026.) <strong>iscrpan</strong> je: stvarni proizvođač (finalni proizvođač, proizvođač dijela ili sirovine), kvaziproizvođač (osoba koja se predstavlja proizvođačem navodeći svoje ime, žig ili drugi znak) i uvoznik u Uniju. <strong>Dobavljač</strong> je svaka osoba koja stavlja proizvod u promet, a nije proizvođač, kvaziproizvođač ni uvoznik. Njegova je odgovornost <strong>supsidijarna</strong>: odgovara samo ako se ne može utvrditi identitet proizvođača (kod uvezenih proizvoda: uvoznika) i ako oštećenika ne obavijesti u razumnom roku o identitetu proizvođača ili osobe od koje je nabavio proizvod. Ni Direktiva ni ZOO ne uređuju pobliže „razumni rok”; obavijest treba sadržavati dovoljno podataka da se nesumnjivo utvrdi identitet i da oštećenik može podnijeti zahtjev.</p>
<ul>
<li><strong>Skov (C-402/03, 2006.):</strong> kako Direktiva želi postići potpunu harmonizaciju, njezino određenje skupine odgovornih osoba (čl. 1. i 3.) <em>iscrpno</em> je. Nacionalno pravo prema kojem posrednik odgovara jednako kao proizvođač je isključeno. Dobavljač nije odgovoran u svakom slučaju, nego samo ako se proizvođač ne može utvrditi i ne obavijesti oštećenika; on je samo „zamjenski” proizvođač.</li>
<li><strong>Aventis Pasteur (C-358/08, 2009.):</strong> kad oštećenik razumno nije mogao utvrditi proizvođača da bi ostvario prava prema dobavljaču, dobavljač se smatra „proizvođačem”, posebno za potrebe čl. 11. Direktive, ako nije <em>na vlastitu inicijativu i hitno</em> obavijestio oštećenika o identitetu proizvođača ili osobe od koje je nabavio proizvod.</li>
</ul>

<h3>Pojam proizvoda</h3>
<p>Čl. 2. st. 1. Direktive: svaka pokretna stvar, čak i kad je ugrađena u drugu pokretnu ili nepokretnu stvar, uključujući električnu energiju. Opcija država: primarni poljoprivredni proizvodi i divljač mogu biti isključeni; Direktiva 99/34/EZ uključila je primarne poljoprivredne proizvode. Prema ZOO-u (čl. 1074. za proizvode do 8. 12. 2026.): proizvod je svaka pokretna stvar i kad je ugrađena u drugu stvar; proizvod su električna i drugi oblici energije. <strong>Problem:</strong> softver, usluga u oblaku, internet stvari – ako se isporuka smatra uslugom, a ne stvari, usluge nisu obuhvaćene pojmom proizvoda Direktive i ZOO-a.</p>

<h3>Pretpostavke odgovornosti</h3>
<p>(1) neispravnost proizvoda, (2) šteta, (3) uzročna veza. Oštećenik dokazuje sve tri.</p>
<p><strong>Neispravnost</strong> (čl. 6. st. 1. Direktive; ZOO čl. 1075.): proizvod je neispravan kad <strong>ne pruža sigurnost koju osoba ima pravo očekivati</strong> (test opravdanih očekivanja). Standard se prosuđuje prema <em>objektivnom kriteriju</em>, ne prema očekivanju konkretnog oštećenika. Uzimaju se sve okolnosti, npr. <em>predstavljanje proizvoda</em>, razumno očekivana uporaba i <em>vrijeme stavljanja na tržište</em>. Proizvod nije neispravan samo zato što je naknadno stavljen bolji proizvod.</p>
<p><strong>Boston Scientific (C-503/13 i C-504/13, 2015.):</strong> sporni su ugradbeni srčani stimulator i kardioverter defibrilator. Sud EU-a: neispravnost (nedostatak sigurnosti koja se opravdano očekuje) može se naći u <em>izrazito visokom potencijalu nanošenja štete</em>, makar se još nije ostvario; na temelju utvrđene potencijalne neispravnosti proizvoda iste skupine ili serije svi proizvodi iz serije smatraju se neispravnima. Prvi put je u pojam nesigurnog proizvoda uvršten i <em>potencijalno</em> nesiguran proizvod. Novi kriteriji (izvan primjerovne liste): razumno očekivana sigurnost za užu skupinu osoba kojima je namijenjen (npr. pacijenti) te ozbiljnost i težina štete.</p>

<h3>Šteta (čl. 1073. ZOO-a za proizvode stavljene na tržište do 8. 12. 2026.)</h3>
<ul>
<li>Imovinska šteta uzrokovana <strong>smrću ili tjelesnom ozljedom</strong> (obujam naknade: posebna pravila čl. 1093.–1097. ZOO-a).</li>
<li>Šteta uzrokovana <strong>uništenjem ili oštećenjem oštećenikove stvari različite od neispravnog proizvoda</strong>, ako je to stvar koja je uobičajeno namijenjena <em>osobnoj uporabi</em> i ako ju je oštećenik uglavnom tako rabio (<strong>kumulativno</strong>: objektivni i subjektivni kriterij). Naknađuje se samo dio štete koji prelazi iznos od <strong>500 eura</strong> (franšiza).</li>
<li><strong>Neimovinska šteta</strong> – za proizvode do 8. 12. 2026. samo prema općim pravilima odštetne odgovornosti; za proizvode od 9. 12. 2026. novi čl. 1073. st. 3. daje pravo na naknadu neimovinske štete u okviru sustava odgovornosti proizvođača. Kod imovinskih šteta nema isključenja (obična šteta i izmakla korist).</li>
<li>Naknađuju se tzv. <strong>refleksne štete</strong> (štete na oštećenikovoj stvari različitoj od neispravnog proizvoda): deliktna odgovornost nije ograničena na štete nastale vlasniku neispravnog proizvoda. To se razlikuje od štete na <em>samom</em> neispravnom proizvodu: kad je oštećenik i vlasnik neispravnog proizvoda stečenog kupoprodajom, tu štetu u pravilu naknađuje prodavatelj po pravilima o materijalnim nedostacima.</li>
</ul>
<p>Dva stadija utvrđivanja štete: (1) utvrđivanje povrede osobe i/ili imovine; (2) utvrđivanje nastale štete i njezine pokrivenosti pravilima o odgovornosti proizvođača.</p>
<p><strong>Veedfald (C-203/99, 2001.):</strong> uništen je organ namijenjen transplantaciji pa je sporno je li to „tjelesna ozljeda” ili „šteta na stvari”. Sud EU-a: iako je na nacionalnom pravu odrediti točan sadržaj tih vrsta štete, oštećenicima mora biti dostupna <em>puna i odgovarajuća naknada</em>; država članica ne može ograničiti vrste materijalnih šteta koje treba naknaditi. Nacionalni sud ispituje o kojoj je vrsti štete riječ (čl. 9. st. 1. t. a ili b, ili nematerijalna šteta po nacionalnom pravu), ali <strong>ne smije odbiti naknadu</strong> ako su ispunjeni drugi uvjeti odgovornosti pozivajući se na to da šteta ne spada ni u jednu vrstu.</p>

<h3>Uzročna veza</h3>
<p>Ni Direktiva ni ZOO ne definiraju uzročnu vezu; ona se utvrđuje prema kriterijima odštetne odgovornosti. <strong>Teret dokaza je na oštećeniku</strong> – jedna od najvećih prepreka ostvarenju njegovih prava. <strong>Sanofi Pasteur (C-621/15, 2017.):</strong> Sud EU-a prihvaća nacionalne sustave dokazivanja koji olakšavaju oštećeniku teret dokaza neispravnosti i uzročne veze; nacionalni sud može smatrati da činjenični elementi predstavljaju <em>ozbiljne, precizne i dosljedne indicije</em> neispravnosti i uzročne veze sa štetom, čak i bez konačnog znanstvenog dokaza.</p>

<h3>Solidarna odgovornost i oslobođenje</h3>
<p><strong>Objektivna solidarna odgovornost</strong> (čl. 1077. ZOO-a): svaki dužnik odgovara vjerovniku za cijeli dug i vjerovnik može tražiti ispunjenje od koga hoće. Direktiva ne sadrži posebna pravila, pa se primjenjuju opća pravila ZOO-a o pasivnim solidarnim obvezama (čl. 42.–53.) te o solidarnoj odgovornosti više osoba za istu štetu (čl. 1107. i 1109.). U regresnom odnosu udio se određuje „s obzirom na težinu njegove krivnje i težinu posljedica” (čl. 1109.). Ako je nastanku štete djelomično pridonijela treća osoba, odgovara solidarno s proizvođačem; ako je pridonio oštećenik ili osoba za koju on odgovara, proizvođač se djelomično oslobađa (čl. 1078.).</p>
<p><strong>Oslobođenje (čl. 7. Direktive, čl. 1078. ZOO-a)</strong> – teret dokaza je na proizvođaču. Dokazuje:</p>
<ol>
<li>da proizvod nije stavio u promet (stavljen je u promet kad je izašao iz područja i mogućnosti kontrole proizvođača, ako to nije bilo protivno njegovoj volji);</li>
<li>da neispravnost nije postojala u trenutku stavljanja u promet (dovoljno je dokazati da je to vjerojatno);</li>
<li>da proizvod nije proizveden niti stavljen u promet u bilo koju gospodarsku svrhu niti unutar proizvođačeva poslovanja (nije važno je li otuđen naplatno ili besplatno – i besplatno dijeljenje promidžbenih uzoraka je stavljanje u promet);</li>
<li>da je uzrok neispravnosti pridržavanje prisilnih propisa;</li>
<li>da stanje znanosti ili tehničkog znanja u trenutku stavljanja u promet nije omogućivalo otkrivanje neispravnosti (<strong>razvojni rizik</strong> – najkontroverzniji razlog; opcija koju je ZOO iskoristio; objektivan standard, uključujući najnapredniju razinu znanja);</li>
<li>proizvođač sirovine i dijela: da je neispravnost uzrokovana konstrukcijom glavnog proizvoda ili uputama proizvođača glavnog proizvoda.</li>
</ol>
<h3>Rokovi (čl. 10. i 11. Direktive; čl. 1080. ZOO-a)</h3>
<p><strong>Zastarni rok:</strong> tri godine od dana kad je oštećenik saznao ili morao saznati za štetu, neispravnost i osobu proizvođača. <strong>Prekluzivni rok:</strong> deset godina od dana stavljanja proizvoda u promet, osim ako je u tom roku protiv proizvođača pokrenut postupak pred sudom ili drugim nadležnim tijelom radi utvrđivanja ili ostvarivanja tražbine.</p>
<p><strong>Napomena o izmjeni:</strong> stari tekst čl. 1073.–1080. ZOO-a, opisan u ovoj cjelini, još je na snazi i primjenjuje se na proizvode stavljene na tržište do 8. 12. 2026. (i poslije tog dana za takve proizvode). Direktiva (EU) 2024/2853 stavlja izvan snage Direktivu 85/374/EEZ s učinkom od 9. prosinca 2026. i primjenjuje se na proizvode stavljene na tržište nakon tog datuma. U ZOO-u je to preuzeto izmjenama NN 69/26 (čl. 11.–20. ZID-a primjenjuju se na proizvode stavljene na tržište ili u uporabu od 9. 12. 2026.). Novi tekst čl. 1073.–1080. uvodi, među ostalim: pravo na naknadu <strong>neimovinske štete</strong> u okviru sustava odgovornosti proizvođača (čl. 1073. st. 3.); „gospodarski subjekt” kao odgovornu osobu (proizvođač proizvoda i sastavnog dijela, uvoznik, ovlašteni predstavnik, pružatelj usluga provođenja narudžbi, distributer, osoba koja znatno izmijeni proizvod, uz uvjete i pružatelj internetske platforme); šteta obuhvaća i medicinski priznatu povredu psihičkog zdravlja i uništenje ili oštećenje podataka koji se ne rabe u poslovne svrhe, a <strong>bez praga od 500 eura</strong>; uključuje i softver (osim besplatnog softvera otvorenog koda izvan poslovne djelatnosti); <strong>otkrivanje dokaza</strong> (čl. 1074.a) i predmnijeve neispravnosti i uzročne veze; procjenu neispravnosti uzimajući u obzir i sposobnost učenja, kibernetičku sigurnost i opoziv proizvoda; razlog oslobođenja da neispravnost nije postojala pri stavljanju na tržište ne vrijedi kad je neispravnost uzrokovana povezanom uslugom, softverom i ažuriranjima, izostankom sigurnosnih ažuriranja ili znatnom izmjenom proizvoda; rok gašenja prava deset godina, uz iznimku od 25 godina za latentne tjelesne ozljede. Tekst: https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima</p>
`,
      id: "16l000"
    },
    id: "16k000"
  },
  odgovornostDrzave: {
    name: "Odgovornost države članice za štetu zbog povrede prava Unije",
    icon: "fa-landmark",
    color: "#06b6d4",
    flashcards: [
      { question: "Na čemu Sud EU-a gradi načelo odgovornosti države članice za štetu pojedincima?", answer: "Na uzoru izvanugovorne odgovornosti Unije (čl. 340. st. 2. UFEU-a), načelu lojalne suradnje (čl. 4. st. 3. UEU-a) i korisnom učinku direktive (čl. 288. st. 3. UFEU-a).", explanation: "Ugovori ne uređuju odgovornost država članica pojedincima.", id: "17c001" },
      { question: "Što propisuje čl. 340. st. 2. UFEU-a?", answer: "Unija je u skladu s općim načelima zajedničkim pravima država članica dužna naknaditi svaku štetu koju njezine institucije ili službenici prouzroče pri obavljanju dužnosti.", explanation: "Uzor za odgovornost država članica.", id: "17c002" },
      { question: "Zašto u Francovichu nije bilo izravnog učinka direktive?", answer: "Odredbe nisu precizirale dužnika jamstva, a država se ne može smatrati dužnikom samo zato što nije preuzela direktivu u roku.", explanation: "Nisu ispunjeni uvjeti vertikalnog izravnog učinka.", id: "17c003" },
      { question: "Koji je prvi temelj Francovich odgovornosti države prema Sudu EU-a?", answer: "Puna učinkovitost pravila Zajednice dovedena bi u pitanje i zaštita prava oslabljena kad pojedinci ne bi mogli dobiti naknadu zbog povrede za koju je odgovorna država.", explanation: "Osobito kad učinkovitost ovisi o radnji države.", id: "17c004" },
      { question: "Što u Francovichu znači vlastiti pravni poredak Unije?", answer: "Ugovor je uspostavio vlastiti pravni poredak čiji su subjekti i države i građani; pravo Zajednice daje pojedincima prava koja postaju dio njihova pravnog nasljeđa.", explanation: "Prava nastaju i iz jasno određenih obveza Ugovora.", id: "17c005" },
      { question: "Koji je pravni temelj načela odgovornosti države prema Francovichu?", answer: "Načelo lojalnosti: države članice moraju poduzeti sve opće ili posebne mjere radi izvršavanja obveza iz prava Unije.", explanation: "Načelo je sastavni dio sustava Ugovora.", id: "17c006" },
      { question: "Što je o tužbi za odgovornost protiv države rekao nezavisni odvjetnik u predmetu Hedley Lomas?", answer: "Da je sredstvo protiv nepotpunog izravnog učinka: daje neizravan učinak odredbama i stupa na mjesto manjkavog preuzimanja i izravnog učinka.", explanation: "Mišljenje nezavisnog odvjetnika u C-5/94.", id: "17c007" },
      { question: "Koje su tri pretpostavke odgovornosti zbog nepreuzimanja direktive (Francovich)?", answer: "Direktiva dodjeljuje prava pojedincima, sadržaj prava dovoljno je precizno određen te postoji uzročna veza između povrede i štete.", explanation: "Dovoljne su za pravo na naknadu izravno iz prava Unije.", id: "17c008" },
      { question: "Koje su pretpostavke odgovornosti za druge vrste povreda (Brasserie)?", answer: "Pravilo Unije dodjeljuje prava pojedincima, povreda je dovoljno ozbiljna i postoji uzročna veza između povrede i štete.", explanation: "Šire pretpostavke odgovornosti.", id: "17c009" },
      { question: "Što je dovoljno ozbiljna povreda prema Brasserie du Pêcheur?", answer: "Očito i grubo nepoštovanje granica diskrecijske ovlasti države članice ili institucije.", explanation: "Presuda C-46/93 i C-48/93.", id: "17c010" },
      { question: "Koje čimbenike sud uzima pri ocjeni dovoljne ozbiljnosti (Brasserie, st. 56.)?", answer: "Jasnoću i preciznost pravila, opseg diskrecijskog prostora, namjernost povrede i štete, opravdanost pogrešne primjene te utjecaj stajališta institucije Unije.", explanation: "Pomoćni kriteriji.", id: "17c011" },
      { question: "Je li krivnja pretpostavka odgovornosti države?", answer: "Nije; jedan je od pomoćnih čimbenika kojim se ocjenjuje dovoljna ozbiljnost povrede.", explanation: "Pretpostavke su objektivne naravi.", id: "17c012" },
      { question: "Kada je povreda ozbiljna unatoč presudi Suda EU-a?", answer: "Kad se povreda nastavi usprkos objavi presude kojom je utvrđena, presudi o prethodnom pitanju ili ustaljenoj praksi Suda iz koje je jasno da je postupanje povreda.", explanation: "Dodatni kriterij ozbiljnosti.", id: "17c013" },
      { question: "Zašto nepreuzimanje direktive u pravilu čini povredu dovoljno ozbiljnom (Dillenkofer)?", answer: "Država u većini situacija ima uski ili nikakav diskrecijski prostor u postizanju rezultata direktive, pa propuštanjem mjera u roku očito i teško prekoračuje svoje ovlasti.", explanation: "Spojeni predmeti C-178/94 i dr.", id: "17c014" },
      { question: "Koja tijela države mogu povrijediti pravo Unije i na koji način?", answer: "Zakonodavna, izvršna i sudska vlast, činjenjem i propuštanjem; sva tijela moraju poštovati pravo Unije i prava koja ono daje pojedincima.", explanation: "Temelj za odgovornost i za sudske odluke.", id: "17c015" },
      { question: "Što je Sud EU-a odlučio u predmetu Köbler?", answer: "Država odgovara za štetu zbog odluke svojeg suda koji sudi u posljednjoj instanci, jer povreda inače ne bi mogla biti ispravljena.", explanation: "Presuda C-224/01.", id: "17c016" },
      { question: "Postoji li odgovornost države ako je povrijeđeno pravilo s izravnim učinkom?", answer: "Da; izravan učinak samo je minimum zaštite subjektivnih prava, pa odgovornost postoji i kad je pravilo izravno primjenjivo ili ima izravan učinak.", explanation: "Odnos izravnog učinka i odgovornosti države.", id: "17c017" },
      { question: "Kakva je visina i opseg naknade štete od države članice?", answer: "Odgovara stvarno pretrpljenoj šteti; dopuštene su sve vrste šteta kao u sličnim domaćim situacijama (stvarna šteta, izmakla dobit), uz načela ekvivalentnosti i učinkovitosti.", explanation: "Presuda Suda o povredi nije pretpostavka odgovornosti.", id: "17c018" },
      { question: "Koja se postupovna načela primjenjuju na tužbe protiv države zbog povrede prava Unije?", answer: "Postupovna autonomija država članica uz načelo ekvivalentnosti (ne manje povoljno od domaćih zahtjeva) i načelo učinkovitosti (ne preotežavati ostvarenje prava).", explanation: "Vodi se pred domaćim sudovima prema nacionalnim pravilima.", id: "17c019" },
      { question: "Koje su tri situacije odgovornosti države za štetu prouzročenu pojedincima kod direktiva?", answer: "Direktiva nije preuzeta u domaći propis; direktiva dodjeljuje pravo pojedincu; direktiva nema izravan učinak.", explanation: "Shema o odgovornosti države za štetu.", id: "17c020" }
    ],
    quiz: [
      {
        question: "Načelo odgovornosti države za štetu pojedincima Sud EU-a je prvi put izrekao u predmetu:",
        options: [
          "Brasserie du Pêcheur i Factortame",
          "Köbler protiv Republike Austrije",
          "Francovich i Bonifaci protiv Italije",
          "Dillenkofer protiv Njemačke"
        ],
        correct: 2, id: "17q001"
      },
      {
        question: "Odgovornost države za štetu nije izravno uređena Ugovorima, pa Sud EU-a polazi od:",
        options: [
          "načela lojalnosti iz čl. 4. st. 3. UEU-a i korisnog učinka direktive",
          "načela supsidijarnosti iz čl. 5. UEU-a i proporcionalnosti",
          "načela uzajamnog priznavanja nacionalnih sudskih odluka",
          "izričitog pravila čl. 340. st. 1. UFEU-a o ugovornoj odgovornosti Unije"
        ],
        correct: 0, id: "17q002"
      },
      {
        question: "Uvjeti odgovornosti zbog nepreuzimanja direktive (Francovich) NE uključuju:",
        options: [
          "da direktiva ima za cilj dodjelu prava pojedincima",
          "da je sadržaj prava dovoljno precizno određen",
          "da postoji uzročna veza povrede i štete",
          "da je država članica djelovala namjerno"
        ],
        correct: 3, id: "17q003"
      },
      {
        question: "Dovoljno ozbiljna povreda prema Brasserie du Pêcheur je:",
        options: [
          "povreda pravila Unije od strane tijela države",
          "povreda počinjena namjerno i uz dokaz krivnje službenika",
          "očito i grubo nepoštovanje granica diskrecijske ovlasti",
          "povreda koju je prethodno utvrdila Komisija tužbom zbog povrede"
        ],
        correct: 2, id: "17q004"
      },
      {
        question: "Krivnja države članice je u odnosu na odgovornost za štetu:",
        options: [
          "samo pomoćni čimbenik ocjene dovoljne ozbiljnosti povrede",
          "obvezna pretpostavka odgovornosti za povrede prava Unije",
          "uvjet samo kod povreda koje počini sudska vlast",
          "isključena i kao pomoćni kriterij ocjene ozbiljnosti"
        ],
        correct: 0, id: "17q005"
      },
      {
        question: "Zbog nepreuzimanja direktive u roku povreda je u pravilu dovoljno ozbiljna jer država:",
        options: [
          "ima široku diskrecijsku ovlast u odabiru sredstava preuzimanja",
          "ima uski ili nikakav diskrecijski prostor u postizanju rezultata direktive",
          "namjerno krši obveze iz UFEU-a s ciljem da ošteti pojedince",
          "odgovara ako je Sud EU-a prethodno utvrdio povredu u postupku zbog povrede"
        ],
        correct: 1, id: "17q006"
      },
      {
        question: "U predmetu Köbler Sud EU-a je odlučio da:",
        options: [
          "država odgovara za štetu zakonodavne i izvršne vlasti uz izuzeće sudske vlasti",
          "sudska odluka ne može biti osnova za odgovornost države zbog neovisnosti sudstva",
          "država odgovara za štetu zbog odluke suda posljednje instance",
          "o odgovornosti za sudske odluke odlučuje Sud EU-a umjesto nacionalnih sudova"
        ],
        correct: 2, id: "17q007"
      },
      {
        question: "Odgovornost države zbog povrede pravila s izravnim učinkom:",
        options: [
          "isključena je jer pojedinac može pravilo primijeniti pred nacionalnim sudom",
          "postoji samo ako je povrijeđena uredba, ne direktiva",
          "nastaje tek nakon što Sud EU-a utvrdi povredu u postupku",
          "postoji, jer je izravan učinak samo minimum zaštite subjektivnih prava"
        ],
        correct: 3, id: "17q008"
      },
      {
        question: "Visina naknade štete od države članice određuje se prema:",
        options: [
          "stvarno pretrpljenoj šteti uz načela ekvivalentnosti i učinkovitosti",
          "paušalnom iznosu koji utvrđuje Komisija za svaku povredu",
          "najvišem iznosu predviđenom nacionalnim propisom o državnoj odgovornosti",
          "iznosu naknade koji je naložio Sud EU-a u presudi o povredi"
        ],
        correct: 0, id: "17q009"
      },
      {
        question: "Načelo ekvivalentnosti znači da postupovna pravila za tužbe zbog povrede prava Unije:",
        options: [
          "ne smiju prekomjerno otežavati ostvarenje prava koja daje pravo Unije",
          "ne smiju biti manje povoljna od onih za slične domaće zahtjeve",
          "moraju biti ista kao u pravu Unije",
          "određuje Sud EU-a u svakom pojedinom predmetu"
        ],
        correct: 1, id: "17q010"
      },
      {
        question: "Prema Francovichu Ugovor je uspostavio:",
        options: [
          "jedinstveni građanski zakonik koji zamjenjuje nacionalna prava",
          "vlastiti pravni poredak čiji su subjekti države i njihovi državljani",
          "sustav prava koji obvezuje institucije Unije bez obveza za države članice",
          "hijerarhiju sudova koja nacionalne sudove podređuje Sudu EU-a"
        ],
        correct: 1, id: "17q011"
      }
    ],
    fillBlanks: [
      { sentence: "Načelo odgovornosti države za štetu pojedincima prvi je put izrečeno u predmetu _______.", answer: "Francovich", hint: "predmet talijanskih radnika", id: "17f001" },
      { sentence: "Za povredu koja se ne svodi na nepreuzimanje direktive vrijede pretpostavke iz presude _______.", answer: "Brasserie", hint: "prvi dio naziva francuskog pivovarskog društva", id: "17f002" },
      { sentence: "Odgovornost države za odluku suda posljednje instance utvrđena je u predmetu _______.", answer: "Köbler", hint: "austrijski profesor", id: "17f003" },
      { sentence: "Krivnja države nije pretpostavka odgovornosti, nego samo pomoćni _______.", answer: "čimbenik", hint: "kriterij ocjene ozbiljnosti", id: "17f004" },
      { sentence: "Postupovna pravila ne smiju prekomjerno otežavati ostvarenje prava prema načelu _______.", answer: "učinkovitosti", hint: "efektivnost zaštite", id: "17f005" },
      { sentence: "Odgovornost države nastaje činjenjem i _______.", answer: "propuštanjem", hint: "ono što tijelo nije učinilo", id: "17f006" },
      { sentence: "Sud EU-a ocjenjuje je li povreda dovoljno ozbiljna ako je država očito prekoračila granice svoje diskrecijske _______.", answer: "ovlasti", hint: "pravo tijela da samo odabere način", id: "17f007" },
      { sentence: "Čl. 340. st. 2. UFEU-a uređuje izvanugovornu odgovornost _______.", answer: "Unije", hint: "institucije Europske zajednice", id: "17f008" },
      { sentence: "U Francovichu direktiva nije imala izravni učinak jer nije određivala identitet _______ jamstva.", answer: "dužnika", hint: "osoba koja snosi obvezu", id: "17f009" },
      { sentence: "Prema Francovichu puna učinkovitost prava bila bi oslabljena kad pojedinci ne bi mogli dobiti _______ zbog povrede.", answer: "naknadu", hint: "ono što oštećenik traži od države", id: "17f010" },
      { sentence: "Prema nezavisnom odvjetniku tužba za odgovornost države sredstvo je protiv nepotpunog izravnog _______.", answer: "učinka", hint: "njegov pravni domet u odnosima pojedinaca", id: "17f011" },
      { sentence: "Pri ocjeni ozbiljnosti povrede uzima se u obzir opseg diskrecijskog _______ koji pravilo ostavlja tijelu.", answer: "prostora", hint: "ono što pravilo ostavlja tijelu za odlučivanje", id: "17f012" },
      { sentence: "Povreda je ozbiljna i kad se nastavi usprkos objavljenoj _______ Suda EU-a kojom je utvrđena.", answer: "presudi", hint: "akt kojim sud rješava spor", id: "17f013" },
      { sentence: "Kod direktiva razlikuju se situacije: direktiva nije preuzeta, dodjeljuje pravo pojedincu, nema izravan _______.", answer: "učinak", hint: "posljedica pravne norme u odnosima pojedinaca", id: "17f014" }
    ],
    learn: {
      title: "Odgovornost države članice za štetu zbog povrede prava Unije",
      content: `
<h3>Načelo i temelji</h3>
<p>Načelo odgovornosti države članice za štetu razvijeno je <strong>ustaljenom praksom Suda EU-a</strong> po uzoru na izvanugovornu odgovornost Unije. <strong>Čl. 340. st. 2. UFEU-a:</strong> u pogledu izvanugovorne odgovornosti Unija je, u skladu s općim načelima zajedničkim pravima država članica, dužna naknaditi svaku štetu koju njezine institucije ili službenici prouzroče pri obavljanju svojih dužnosti. Ugovori ne sadrže odgovarajuće odredbe o odgovornosti država članica za štetu koju su pojedincima prouzročile nepoštovanjem obveza iz Ugovora. Zato se praksa Suda oslanja na temeljne zahtjeve upućene državama članicama iz <strong>načela lojalnosti (čl. 4. st. 3. UEU-a)</strong> te iz <strong>definicije direktive (čl. 288. st. 3. UFEU-a)</strong>, odnosno njezina korisnog učinka (<em>effet utile</em>). Opće učinke direktiva i sukladno tumačenje vidi u općem dijelu; ovdje se obrađuje samo odgovornost države.</p>

<h3>Francovich i Bonifaci protiv Italije (C-6/90 i C-9/90, 1991.)</h3>
<ol>
<li><strong>Nema izravnog učinka (vertikalnog):</strong> odredbe direktive o korisnicima jamstva i sadržaju jamstva dovoljno su precizne i bezuvjetne, ali ne omogućuju pojedincu pozivanje na njih pred nacionalnim sudovima: odredbe ne određuju identitet dužnika jamstva, a država se ne može smatrati dužnikom samo zato što u roku nije poduzela mjere za prijenos direktive (st. 25. i 26.).</li>
<li><strong>Pojedinac ne smije biti kažnjen zbog propusta države (puna učinkovitost prava Unije):</strong> puna učinkovitost pravila Zajednice bila bi dovedena u pitanje i zaštita prava oslabljena kad pojedinci ne bi mogli dobiti naknadu zbog povrede za koju je odgovorna država članica; to je osobito nužno kad učinkovitost pravila ovisi o radnji države i pojedinci zbog izostanka te radnje ne mogu ostvariti prava pred nacionalnim sudovima (st. 33. i 34.).</li>
<li><strong>Vlastiti pravni poredak:</strong> Ugovor je uspostavio vlastiti pravni poredak uklopljen u pravne sustave država članica koji su njihovi sudovi obvezni primjenjivati; subjekti su države članice i njihovi državljani kojima pravo Zajednice uz obveze daje i prava koja postaju dio njihova pravnog nasljeđa; ta prava nastaju ne samo kad ih Ugovor izričito propisuje nego i na temelju obveza koje Ugovor jasno postavlja pojedincima, državama i institucijama (st. 31.).</li>
<li><strong>Zaključak (st. 35. i 37.):</strong> načelo odgovornosti države za štetu pojedincima povredama prava Zajednice za koje je država odgovorna je <em>sastavni dio sustava Ugovora</em>; države su obvezne naknaditi štetu.</li>
</ol>
<p><strong>Pravni temelj (st. 36.):</strong> načelo lojalnosti – države su dužne poduzeti sve mjere, opće ili posebne, radi izvršavanja obveza iz prava Unije. Nezavisni odvjetnik Léger (Hedley Lomas, C-5/94): tužba za odgovornost protiv države čini se <em>sredstvom protiv nepotpunog izravnog učinka</em>; priznavanjem zahtjeva za naknadu Sud sporne odredbe na neki način čini neizravno učinkovitim, jer se pojedinac može osloniti na njihovo nepreuzimanje; tužba za odgovornost stupa na mjesto manjkavog preuzimanja i manjkavog izravnog učinka.</p>

<h3>Pretpostavke odgovornosti</h3>
<table>
<tr><th>Nepreuzimanje direktive (Francovich)</th><th>Druge vrste povreda (Brasserie du Pêcheur, C-46/93, i Factortame, C-48/93; spojeni predmeti)</th></tr>
<tr><td>1. direktiva ima za cilj dodjelu prava pojedincima<br>2. sadržaj tih prava dovoljno je precizno određen u direktivi<br>3. uzročna veza između povrede obveze države i štete pojedinca</td><td>1. pravilo Unije ima za cilj dodjelu prava pojedincima<br>2. povreda pravila mora biti <strong>dovoljno ozbiljna</strong><br>3. uzročna veza između povrede i štete</td></tr>
</table>
<p>Pretpostavke iz Francovicha dovoljne su za pravo na naknadu koje se izravno temelji na pravu Unije. Razlika je u tome da kod nepreuzimanja direktive nema zasebnog zahtjeva ozbiljnosti – ona se uglavnom pretpostavlja (vidi Dillenkofer).</p>
<h3>Dovoljna ozbiljnost povrede</h3>
<p><strong>Kriterij:</strong> očito i grubo nepoštovanje granica diskrecijske ovlasti države članice ili institucije. Čimbenici koje nadležni sud može uzeti u obzir (Brasserie, st. 56.): <em>stupanj jasnoće i preciznosti povrijeđenog pravila</em>; <em>opseg diskrecijskog prostora</em> koji pravilo ostavlja nacionalnom tijelu ili tijelu Unije; <em>jesu li povreda i šteta namjerne ili nenamjerne</em>; <em>može li se pogrešna primjena prava opravdati</em>; mogućnost da su stajališta institucije Unije pridonijela propustu, donošenju ili zadržavanju nacionalnih mjera ili prakse suprotnih pravu Unije.</p>
<p><strong>Krivnja</strong> nije pretpostavka odgovornosti, ali je jedan od pomoćnih čimbenika ocjene dovoljne ozbiljnosti. Povreda je ozbiljna i kad se nastavila <em>usprkos objavi presude</em> kojom je utvrđena, presude o prethodnom pitanju ili ustaljene prakse Suda iz koje je jasno da je postupanje povreda.</p>
<p>Što se tiče manjkavog ili propuštenog usklađivanja nacionalnog prava s direktivama, država u većini situacija ima samo uske ili nikakve diskrecijske ovlasti u postizanju rezultata direktive, pa nastaje <strong>ozbiljna povreda</strong>. <strong>Dillenkofer (C-178/94 i dr., 1996., st. 26.):</strong> kad država kao u Francovichu povređuje čl. 288. st. 3. UFEU-a (ranije čl. 189. st. 3. UEZ-a) propustivši u roku donijeti mjere potrebne za postizanje rezultata direktive, očito i teško prekoračuje granice svojih ovlasti.</p>

<h3>Tko i kako može povrijediti pravo Unije</h3>
<p><strong>Tko:</strong> zakonodavna, izvršna i sudska vlast – Sud argumentaciju temelji na dužnosti svih tijela državne vlasti da poštuju pravo Unije i prava koja ono dodjeljuje i jamči pojedincima. <strong>Kako:</strong> činjenjem i propuštanjem.</p>
<p><strong>Köbler (C-224/01, 2003., st. 33. i 34.):</strong> s obzirom na ključnu ulogu pravosuđa u zaštiti prava pojedinaca, puna učinkovitost pravila bila bi dovedena u pitanje, a zaštita oslabljena kad pojedinci ne bi mogli, pod određenim pretpostavkama, dobiti naknadu zbog povrede koja se pripisuje odluci suda države članice koji sudi u <strong>posljednjoj instanci</strong>. Takav je sud posljednje pravosudno tijelo pred kojim pojedinci mogu ostvarivati prava, a povreda konačnom odlukom u načelu ne može biti ispravljena, pa pojedinci ne smiju biti lišeni mogućnosti da državu utvrde odgovornom.</p>

<h3>Odnos prema izravnom učinku</h3>
<p>Odgovornost postoji <strong>iako se radi o povredi pravila koje je izravno primjenjivo i/ili ima izravan učinak</strong>, jer je to samo minimum zaštite subjektivnih prava.</p>

<h3>Visina i opseg naknade; ostvarivanje zaštite</h3>
<ul>
<li>Visina naknade odgovara samo <strong>stvarno pretrpljenoj šteti</strong>.</li>
<li>Dopušteno je zahtijevati naknadu svih vrsta šteta koje su dopuštene u sličnim domaćim situacijama: stvarnu štetu, izmaklu dobit, ali i moguće posebne naknade.</li>
<li>Naknada nije ograničena na štete nastale nakon što je Sud EU-a utvrdio povredu, jer takvo utvrđenje nije pretpostavka odgovornosti.</li>
<li>Bez pravila Unije, opseg i visinu naknade određuje nacionalno pravo, a sudovi se vode <strong>načelima ekvivalentnosti i učinkovitosti</strong>.</li>
<li>Postupak se vodi pred domaćim nadležnim sudovima prema nacionalnim postupovnim pravilima (<em>postupovna autonomija</em>): pravila ne smiju biti manje povoljna od pravila za odgovarajuće zahtjeve temeljene na domaćem pravu (<strong>ekvivalentnost</strong>) i ne smiju ostvarenje zaštite prava činiti prekomjerno otežanim ili praktički nemogućim (<strong>učinkovitost</strong>).</li>
</ul>
<p>Tri situacije odgovornosti države za štetu pojedincima kod direktiva: (1) direktiva nije preuzeta u domaći propis; (2) direktiva dodjeljuje pravo pojedincu; (3) direktiva nema izravan učinak.</p>
`,
      id: "17l000"
    },
    id: "17k000"
  },
  zabranaDiskriminacije: {
    name: "Zabrana diskriminacije u europskom privatnom pravu",
    icon: "fa-people-arrows",
    color: "#10b981",
    flashcards: [
      { question: "Što zahtijeva opće načelo jednakog postupanja prema ustaljenoj praksi Suda EU-a?", answer: "Da se usporedive situacije ne tretiraju različito i različite situacije jednako, osim ako je takav tretman objektivno opravdan.", explanation: "Audiolux, C-101/08; Rodríguez Caballero, C-442/00.", id: "18c001" },
      { question: "Što je Sud EU-a odlučio u predmetu Mangold?", answer: "Zabrana diskriminacije na osnovi dobi opće je načelo prava Unije; nacionalni sud mora zajamčiti njegovu učinkovitost stavljanjem izvan primjene suprotne odredbe nacionalnog prava.", explanation: "Presuda C-144/04, st. 75. i 78.", id: "18c002" },
      { question: "Koji je položaj Povelje o temeljnim pravima i EKLJP-a u pravu Unije (čl. 6. UEU-a)?", answer: "Povelja ima istu pravnu snagu kao Ugovori; temeljna prava iz EKLJP-a i ustavnih tradicija država članica čine opća načela prava Unije.", explanation: "Jednakost: glava III. Povelje, čl. 20.–26.", id: "18c003" },
      { question: "Koje su odredbe UFEU-a o zabrani diskriminacije?", answer: "Opća zabrana na osnovi državljanstva (čl. 18.), zabrana među radnicima po državljanstvu (čl. 45.) i jednaka plaća za jednak rad muškaraca i žena (čl. 157.).", explanation: "Uz čl. 19. kao osnovu za mjere suzbijanja diskriminacije.", id: "18c004" },
      { question: "Što omogućuje čl. 19. UFEU-a (ranije čl. 13. UEZ-a)?", answer: "Vijeće jednoglasno, uz suglasnost Parlamenta, poduzima mjere protiv diskriminacije na osnovi spola, rase, etničkog podrijetla, vjere, invaliditeta, dobi ili spolne orijentacije.", explanation: "Uvedeno Ugovorom iz Amsterdama.", id: "18c005" },
      { question: "Koja je posebnost čl. 157. UFEU-a (ex čl. 141. UEZ-a)?", answer: "Izravni učinak u privatnopravnim odnosima (Defrenne) i nadležnost za mjere jednakih mogućnosti dodijeljena je tek Ugovorom iz Amsterdama uvođenjem st. 3.", explanation: "Jednako postupanje prema muškarcima i ženama u zapošljavanju.", id: "18c006" },
      { question: "Koje vrijednosti Unije povezane s nediskriminacijom navodi čl. 2. UEU-a?", answer: "Poštovanje ljudskog dostojanstva, slobode, demokracije, jednakosti, vladavine prava i ljudskih prava; zajedničke su pluralizam, nediskriminacija, tolerancija, pravda i solidarnost.", explanation: "Čl. 3. st. 3. UEU-a: Unija suzbija društvenu isključenost i diskriminaciju.", id: "18c007" },
      { question: "Koji su temeljni izvori zabrane diskriminacije u hrvatskom pravu?", answer: "Ustav (čl. 3., 14., 15., 26., 44.), Zakon o suzbijanju diskriminacije (lex generalis) i Zakon o ravnopravnosti spolova te posebni propisi s antidiskriminacijskim odredbama.", explanation: "Uz međunarodne konvencije, osobito EKLJP.", id: "18c008" },
      { question: "Koje direktive prenosi ZSD (čl. 1.a)?", answer: "Direktive 2000/78/EZ (zapošljavanje), 2000/43/EZ (rasno i etničko podrijetlo), 2004/113/EZ (dobra i usluge) i 2006/54/EZ (zapošljavanje, žene i muškarci).", explanation: "ZRS prenosi i Direktive 2010/41/EU, 92/85/EEZ i 79/7/EEZ.", id: "18c009" },
      { question: "Što je minimalni zahtjev u antidiskriminacijskim direktivama (odredba o minimalnim zahtjevima)?", answer: "Države smiju pružati viši stupanj zaštite od zajamčenog direktivom, a pri preuzimanju ne smije doći do snižavanja stupnja zaštite već zajamčenog.", explanation: "Svaka antidiskriminacijska direktiva ima takvu odredbu o minimalnim zahtjevima.", id: "18c010" },
      { question: "Što određuje čl. 8. ZSD-a (područje primjene ratione personae)?", answer: "Primjenjuje se na postupanje svih državnih tijela, tijela lokalne i područne samouprave, pravnih osoba s javnim ovlastima te svih pravnih i fizičkih osoba.", explanation: "Dakle i privatnopravni odnosi.", id: "18c011" },
      { question: "Koja područja obuhvaća čl. 8. ZSD-a (ratione materiae)?", answer: "Rad, obrazovanje, socijalnu sigurnost, zdravstvo, pravosuđe, stanovanje, medije, pristup dobrima i uslugama, udruge i stranke te kulturno i umjetničko stvaralaštvo.", explanation: "Deset područja.", id: "18c012" },
      { question: "Što je diskriminacija?", answer: "Neopravdano različito postupanje, tj. nepovoljnije postupanje prema osobi ili skupini na osnovi zabranjenih osnova, bez opravdanog i objektivnog razloga.", explanation: "ZSD nema jedinstvenu definiciju pojma.", id: "18c013" },
      { question: "Što je asocijativna diskriminacija (čl. 1. st. 2. ZSD-a)?", answer: "Stavljanje u nepovoljniji položaj osobe povezane s nositeljem zabranjene osnove rodbinskim ili drugim vezama.", explanation: "Coleman: majka koja skrbi o djetetu s invaliditetom.", id: "18c014" },
      { question: "Što je Sud EU-a odlučio u predmetu Coleman?", answer: "Zabrana izravne diskriminacije i uznemiravanja ne ograničava se na osobe s invaliditetom: obuhvaća zaposlenika kojem je nepovoljan tretman nastao zbog invaliditeta njegova djeteta.", explanation: "Presuda C-303/06, Direktiva 2000/78/EZ.", id: "18c015" },
      { question: "Što je diskriminacija na temelju pogrešne predodžbe (čl. 1. st. 3. ZSD-a)?", answer: "Stavljanje osobe u nepovoljniji položaj na temelju pogrešne predodžbe o postojanju zabranjene osnove diskriminacije.", explanation: "Osnova ne mora stvarno postojati.", id: "18c016" },
      { question: "Koje zabranjene osnove diskriminacije nabraja čl. 1. st. 1. ZSD-a?", answer: "Rasa, etnička pripadnost, boja kože, spol, jezik, vjera, uvjerenje, podrijetlo, imovina, sindikat, obrazovanje, položaj, status, dob, zdravlje, invaliditet, genetika, rodni identitet i orijentacija.", explanation: "Popis je zatvoren, ali širi od direktiva.", id: "18c017" },
      { question: "Koji su oblici diskriminacije prema ZSD-u?", answer: "Izravna, neizravna, uznemiravanje i spolno uznemiravanje, poticanje na diskriminaciju, propuštanje razumne prilagodbe, segregacija i teži oblici diskriminacije.", explanation: "Čl. 2.–6. ZSD-a.", id: "18c018" },
      { question: "Što je izravna diskriminacija (čl. 2. st. 1. ZSD-a)?", answer: "Postupanje uvjetovano zabranjenom osnovom kojim se osoba stavlja, bila je stavljena ili bi mogla biti stavljena u nepovoljniji položaj od druge osobe u usporedivoj situaciji.", explanation: "Mogućnost nepovoljnijeg položaja dovoljna je.", id: "18c019" },
      { question: "Što je Sud EU-a presudio u predmetu Feryn?", answer: "Javna izjava poslodavca da neće zapošljavati osobe određene etničke pripadnosti jest izravna diskriminacija jer razuvjerava kandidate i priječi im pristup tržištu rada.", explanation: "Presuda C-54/07, Direktiva 2000/43/EZ.", id: "18c020" },
      { question: "Što je Sud EU-a odlučio u predmetu Accept o žrtvi diskriminacije?", answer: "Izravna diskriminacija ne traži da postoji utvrdiv tužitelj koji tvrdi da je njezina žrtva.", explanation: "Presuda C-81/12, o izjavama protiv igrača druge spolne orijentacije.", id: "18c021" },
      { question: "Kako su hrvatski sudovi ocijenili izjave nogometnih dužnosnika o homoseksualcima u reprezentaciji?", answer: "Vrhovni sud utvrdio je izravnu diskriminaciju prema Feryn; Ustavni sud potvrdio je da izjava poziva na diskriminaciju i da je izravna diskriminacija po spolnoj orijentaciji.", explanation: "Niže su instance tražile stvarnu žrtvu, suprotno praksi Suda EU-a.", id: "18c022" },
      { question: "Što je neizravna diskriminacija (čl. 2. st. 2. ZSD-a)?", answer: "Naizgled neutralna odredba, kriterij ili praksa koja nepovoljno pogađa osobe po zabranjenoj osnovi, osim ako je objektivno opravdana legitimnim ciljem uz primjerena i nužna sredstva.", explanation: "Za razliku od izravne, može se opravdati.", id: "18c023" },
      { question: "Što je uznemiravanje (čl. 3. ZSD-a)?", answer: "Neželjeno ponašanje uzrokovano zabranjenom osnovom koje ima za cilj ili stvarno predstavlja povredu dostojanstva i stvara strah, neprijateljsko, ponižavajuće ili uvredljivo okruženje.", explanation: "Spolno uznemiravanje: ponašanje spolne naravi.", id: "18c024" },
      { question: "Što su poticanje na diskriminaciju i propuštanje razumne prilagodbe (čl. 4. ZSD-a)?", answer: "Oboje su diskriminacija; prilagodba znači omogućiti osobama s invaliditetom resurse, sudjelovanje i radno mjesto uz teret koji nije nerazmjeran.", explanation: "Prilagodba infrastrukture, prostora, opreme.", id: "18c025" },
      { question: "Što je segregacija prema čl. 5. ZSD-a?", answer: "Prisilno i sustavno razdvajanje osoba po zabranjenoj osnovi.", explanation: "Oblik diskriminacije.", id: "18c026" },
      { question: "Koji su teži oblici diskriminacije (čl. 6. ZSD-a)?", answer: "Višestruka (više osnova), ponovljena, produljena i ona koja posebno teško pogađa žrtvu; utječu na visinu neimovinske štete i kaznu.", explanation: "Sud mora voditi računa o okolnostima.", id: "18c027" },
      { question: "Što štiti čl. 7. ZSD-a (viktimizacija)?", answer: "Nitko ne smije biti stavljen u nepovoljniji položaj zato što je u dobroj vjeri prijavio diskriminaciju, nazočio joj, odbio nalog ili sudjelovao u postupku.", explanation: "Zaštita od odmazde.", id: "18c028" },
      { question: "Kako se opravdava izravna, a kako neizravna diskriminacija?", answer: "Izravna samo propisanim iznimkama i posebnim mjerama, bez općeg opravdanja; neizravna legitimnim ciljem i proporcionalnošću mjere cilju, uz propisane iznimke.", explanation: "Test: legitiman cilj, primjerenost i nužnost.", id: "18c029" },
      { question: "Koje iznimke od zabrane diskriminacije predviđa čl. 9. st. 2. ZSD-a (primjeri)?", answer: "Radi javnog zdravlja, sigurnosti i reda; posebne privremene mjere; socijalna politika; stvarni uvjet posla; crkve; osiguranje prema dobi; spol u sportu; dob; državljanstvo; obiteljsko pravo.", explanation: "Sve moraju biti primjerene i nužne (st. 3.).", id: "18c030" },
      { question: "Što je Ustavni sud zaključio u slučaju udomiteljstva istospolnog para?", answer: "Izostavljanje osoba istospolne orijentacije iz zakona je diskriminatorno; zakon nije ukinut, ali sudovi i tijela moraju odredbe primjenjivati tako da udomiteljstvo omoguće svima pod jednakim uvjetima.", explanation: "Odluka iz siječnja 2020.; iznimka iz čl. 9. st. 2. t. 4. nije primjenjiva.", id: "18c031" },
      { question: "Što je pravobranitelj kao tijelo zaštite od diskriminacije (čl. 12. ZSD-a)?", answer: "Pučki pravobranitelj je središnje tijelo: zaprima prijave, daje obavijesti, ispituje prijave, provodi mirenje, podnosi kaznene prijave i izvješćuje Sabor; posebni pravobranitelji rade dio poslova.", explanation: "Predpostupovna zaštita.", id: "18c032" },
      { question: "Koje posebne tužbe za zaštitu od diskriminacije predviđa ZSD?", answer: "Tužbu za utvrđenje diskriminacije, tužbu za zabranu ili otklanjanje diskriminacije i posljedica, tužbu za naknadu štete i zahtjev za objavu presude u medijima.", explanation: "Uz udružnu tužbu (čl. 24.) i incidentalnu zaštitu (čl. 16.).", id: "18c033" }
    ],
    quiz: [
      {
        question: "Opće načelo jednakog postupanja prema praksi Suda EU-a zabranjuje:",
        options: [
          "razlikovanje svih situacija bez obzira na njihovu usporedivost",
          "različit tretman svih usporedivih situacija bez objektivnog opravdanja",
          "svaku mjeru kojom se nepovoljno pogađa određena skupina osoba",
          "primjenu nacionalnih mjera koje nisu usklađene s direktivom"
        ],
        correct: 1, id: "18q001"
      },
      {
        question: "Zabrana diskriminacije na osnovi dobi prema Mangoldu je:",
        options: [
          "načelo koje postoji u nacionalnom pravu država članica, ali ne u pravu Unije",
          "pravilo koje obvezuje države članice, ali ne i privatne poslodavce",
          "opće načelo prava Unije čiju učinkovitost mora zajamčiti nacionalni sud",
          "neobvezujuća preporuka institucija Unije državama članicama"
        ],
        correct: 2, id: "18q002"
      },
      {
        question: "Čl. 19. UFEU-a ovlašćuje Vijeće da mjere suzbijanja diskriminacije donosi:",
        options: [
          "kvalificiranom većinom uz redovni zakonodavni postupak",
          "običnom većinom bez suglasnosti Europskog parlamenta",
          "dvotrećinskom većinom država članica uz savjetovanje Komisije",
          "jednoglasno uz suglasnost Europskog parlamenta"
        ],
        correct: 3, id: "18q003"
      },
      {
        question: "Koji je zakon u hrvatskom pravu opći propis (lex generalis) o suzbijanju diskriminacije?",
        options: [
          "Zakon o suzbijanju diskriminacije",
          "Zakon o ravnopravnosti spolova",
          "Zakon o radu",
          "Obiteljski zakon"
        ],
        correct: 0, id: "18q004"
      },
      {
        question: "Direktiva 2000/43/EZ zabranjuje diskriminaciju na osnovi:",
        options: [
          "spola pri zapošljavanju i obavljanju zanimanja",
          "rasnog ili etničkog podrijetla",
          "dobi i spolne orijentacije u zapošljavanju",
          "invaliditeta pri pristupu dobrima i uslugama"
        ],
        correct: 1, id: "18q005"
      },
      {
        question: "Asocijativna diskriminacija postoji kad se nepovoljno postupa prema osobi koja:",
        options: [
          "je članica sindikata i djeluje u poslodavčevu interesu",
          "sudjeluje u postupku protiv svojeg poslodavca u dobroj vjeri kao svjedok",
          "je povezana s osobom koja ima zabranjenu osnovu poput invaliditeta djeteta",
          "pogrešno smatra da joj pripada zabranjena osnova"
        ],
        correct: 2, id: "18q006"
      },
      {
        question: "Prema presudi Feryn izravna diskriminacija postoji kad poslodavac:",
        options: [
          "odbije konkretnog kandidata zbog manjka stručnih kvalifikacija",
          "primijeni naizgled neutralan kriterij koji pogađa određenu skupinu",
          "zapošljava osobe upućene preko agencije za zapošljavanje",
          "javno izjavi da neće zapošljavati osobe određene etničke pripadnosti"
        ],
        correct: 3, id: "18q007"
      },
      {
        question: "U predmetu Accept Sud EU-a je odlučio da izravna diskriminacija:",
        options: [
          "ne zahtijeva postojanje utvrdivog žalitelja koji je njezina žrtva",
          "zahtijeva konkretnu žrtvu koja je podnijela prijavu pravobranitelju",
          "ne može nastati bez prijave konkretnog radnika inspekciji rada",
          "ne obuhvaća javne izjave osoba izvan odnosa zapošljavanja"
        ],
        correct: 0, id: "18q008"
      },
      {
        question: "Neizravna diskriminacija može se opravdati kad je mjera:",
        options: [
          "propisana odlukom poslodavca bez obzira na cilj",
          "primjerena i nužna za ostvarenje legitimnog cilja",
          "korisna za većinu osoba na koje se primjenjuje",
          "u skladu s pisanim običajima gospodarske grane"
        ],
        correct: 1, id: "18q009"
      },
      {
        question: "Teži oblici diskriminacije prema ZSD-u NE uključuju:",
        options: [
          "višestruku diskriminaciju po više osnova",
          "ponovljenu diskriminaciju",
          "diskriminaciju koja posebno teško pogađa žrtvu",
          "diskriminaciju zbog pogrešne predodžbe o osnovi"
        ],
        correct: 3, id: "18q010"
      },
      {
        question: "Središnje tijelo za suzbijanje diskriminacije u Hrvatskoj je:",
        options: [
          "pravobraniteljica za ravnopravnost spolova",
          "Državno odvjetništvo Republike Hrvatske",
          "pučki pravobranitelj",
          "Ustavni sud Republike Hrvatske"
        ],
        correct: 2, id: "18q011"
      },
      {
        question: "Posebne tužbe za zaštitu od diskriminacije NE uključuju:",
        options: [
          "tužbu za utvrđenje diskriminacije",
          "tužbu za zabranu ili otklanjanje diskriminacije",
          "tužbu za poništenje diskriminatorne uredbe Unije",
          "tužbu za naknadu štete"
        ],
        correct: 2, id: "18q012"
      },
      {
        question: "Ustavni sud je izjavu izvršnog dopredsjednika nogometnog kluba o homoseksualcima ocijenio kao:",
        options: [
          "vrijednosni sud zaštićen slobodom izražavanja",
          "neizravnu diskriminaciju zbog naizgled neutralnog kriterija",
          "pogrešnu predodžbu bez diskriminatornog učinka na osobe",
          "izravnu diskriminaciju po osnovi spolne orijentacije"
        ],
        correct: 3, id: "18q013"
      },
      {
        question: "Na koga se prema čl. 8. ZSD-a primjenjuje zabrana diskriminacije?",
        options: [
          "na državna tijela i javne ovlasti, ali ne na privatne osobe",
          "na poslodavce i pružatelje usluga, ali ne na državna tijela",
          "na državna tijela i javne ovlasti, ali i na sve pravne i fizičke osobe",
          "na pravne osobe sa sjedištem u RH, ali ne na fizičke osobe"
        ],
        correct: 2, id: "18q014"
      }
    ],
    fillBlanks: [
      { sentence: "Prema Audiolux i Rodríguez Caballero usporedive situacije ne smiju se tretirati različito osim ako je razlika objektivno _______.", answer: "opravdana", hint: "ima razuman razlog", id: "18f001" },
      { sentence: "Načelo jednake plaće za jednak rad muškaraca i žena sadržano je u čl. 157. _______.", answer: "UFEU-a", hint: "ugovor o funkcioniranju Unije", id: "18f002" },
      { sentence: "Zabrana diskriminacije prema invaliditetu obuhvaća i majku koja skrbi o djetetu s invaliditetom prema presudi _______.", answer: "Coleman", hint: "prezime radnice iz Londona", id: "18f003" },
      { sentence: "Stavljanje u nepovoljniji položaj zbog pogrešne _______ o zabranjenoj osnovi također je diskriminacija.", answer: "predodžbe", hint: "pogrešno uvjerenje", id: "18f004" },
      { sentence: "Prisilno i sustavno razdvajanje osoba po zabranjenoj osnovi naziva se _______.", answer: "segregacija", hint: "odvajanje po osnovi", id: "18f005" },
      { sentence: "Za razliku od izravne, neizravna diskriminacija može se _______ legitimnim ciljem.", answer: "opravdati", hint: "imati dopušten razlog", id: "18f006" },
      { sentence: "Nitko ne smije biti doveden u nepovoljniji položaj zbog dobronamjerne prijave diskriminacije; to je zaštita od _______.", answer: "viktimizacije", hint: "odmazda prema žrtvi", id: "18f007" },
      { sentence: "Središnje tijelo za suzbijanje diskriminacije u Hrvatskoj je pučki _______.", answer: "pravobranitelj", hint: "institucija ombudsmana", id: "18f008" },
      { sentence: "Temeljna prava zajamčena EKLJP-om čine opća načela prava _______.", answer: "Unije", hint: "nadnacionalna zajednica država", id: "18f009" },
      { sentence: "Čl. 157. UFEU-a ima izravni učinak i u _______ odnosima među privatnim osobama.", answer: "horizontalnim", hint: "suprotno od vertikalnih", id: "18f010" },
      { sentence: "Čl. 2. UEU-a navodi da su državama članicama zajednički pluralizam, tolerancija, pravda, solidarnost i _______.", answer: "nediskriminacija", hint: "jednaki tretman", id: "18f011" },
      { sentence: "Direktiva 2000/43/EZ zabranjuje razlikovanje na osnovi rasnog ili etničkog _______.", answer: "podrijetla", hint: "porijeklo", id: "18f012" },
      { sentence: "Odredba o minimalnim zahtjevima dopušta višu razinu zaštite, ali ne i _______ već zajamčene zaštite.", answer: "snižavanje", hint: "smanjenje razine", id: "18f013" },
      { sentence: "ZSD se primjenjuje i na postupanje svih fizičkih i pravnih osoba, dakle i u _______ odnosima.", answer: "privatnopravnim", hint: "građanski odnosi", id: "18f014" },
      { sentence: "Jedno od područja primjene ZSD-a je pristup dobrima i _______.", answer: "uslugama", hint: "ono što se pruža", id: "18f015" },
      { sentence: "Neopravdano različito postupanje prema osobi na temelju zabranjene osnove naziva se _______.", answer: "diskriminacija", hint: "latinski discriminare", id: "18f016" },
      { sentence: "Zabranjena je i diskriminacija na osnovi rodnog identiteta, izražavanja ili spolne _______.", answer: "orijentacije", hint: "seksualna usmjerenost", id: "18f017" },
      { sentence: "Oblici diskriminacije uključuju i propuštanje razumne _______ osobama s invaliditetom.", answer: "prilagodbe", hint: "uređenje prostora prema potrebama", id: "18f018" },
      { sentence: "Izravna diskriminacija postoji i kad je osoba samo mogla biti stavljena u nepovoljniji položaj u usporedivoj _______.", answer: "situaciji", hint: "okolnosti", id: "18f019" },
      { sentence: "Uznemiravanje stvara strah te neprijateljsko, ponižavajuće ili uvredljivo _______.", answer: "okruženje", hint: "ambijent", id: "18f020" },
      { sentence: "Propuštanje razumne prilagodbe odnosi se na osobe s _______.", answer: "invaliditetom", hint: "tjelesno ili mentalno oštećenje", id: "18f021" },
      { sentence: "Izravna diskriminacija opravdava se samo propisanim iznimkama i posebnim _______.", answer: "mjerama", hint: "ono što država poduzima radi izjednačavanja", id: "18f022" },
      { sentence: "Sve iznimke iz čl. 9. st. 2. ZSD-a moraju biti primjerene i _______ za ostvarenje cilja.", answer: "nužne", hint: "neophodne", id: "18f023" },
      { sentence: "Ustavni sud je naložio da se odredbe o udomiteljstvu primjenjuju tako da ga omoguće svima pod _______ uvjetima.", answer: "jednakim", hint: "bez razlike među osobama", id: "18f024" }
    ],
    learn: {
      title: "Zabrana diskriminacije u europskom privatnom pravu",
      content: `
<h3>Načelo jednakosti u praksi Suda EU-a</h3>
<p>Aristotel: jednake treba tretirati jednako, a nejednake nejednako. Prema ustaljenoj praksi Suda EU-a <strong>opće načelo jednakog postupanja</strong> zahtijeva da se usporedive situacije ne smiju tretirati različito i različite situacije ne smiju tretirati jednako, osim ako je takav tretman <strong>objektivno opravdan</strong> (<em>Audiolux</em>, C-101/08, st. 54.; <em>Rodríguez Caballero</em>, C-442/00, st. 32.: temeljna prava uključuju načelo jednakosti i nediskriminacije).</p>
<p><strong>Mangold (C-144/04, 2005., st. 75. i 78.):</strong> načelo zabrane diskriminacije na osnovi dobi mora se smatrati <em>općim načelom prava Zajednice (Unije)</em>; odgovornost je nacionalnog suda zajamčiti potpunu učinkovitost općeg načela stavljanjem izvan primjene svake odredbe nacionalnog prava koja mu je suprotna.</p>

<h3>Primarno pravo EU-a</h3>
<ul>
<li><strong>Čl. 6. st. 1. i 3. UEU-a:</strong> Unija priznaje prava, slobode i načela iz Povelje EU-a o temeljnim pravima, koja ima istu pravnu snagu kao Ugovori; temeljna prava zajamčena EKLJP-om i proizašla iz ustavnih tradicija država članica čine opća načela prava Unije. Jednakost je uređena glavom III. Povelje (čl. 20.–26.).</li>
<li><strong>UFEU:</strong> opća zabrana diskriminacije na osnovi državljanstva (čl. 18.); posebne zabrane, npr. između radnika država članica po državljanstvu (čl. 45.) i po spolu glede jednake plaće za jednak rad ili rad jednake vrijednosti (čl. 157.).</li>
<li><strong>Čl. 157. UFEU-a</strong> (ex čl. 141. UEZ-a): izričita nadležnost Vijeća i Parlamenta za mjere osiguranja jednakih mogućnosti i jednakog postupanja prema muškarcima i ženama u pitanjima zapošljavanja i rada dodijeljena je tek Ugovorom iz Amsterdama (st. 3.). Odredba ima <strong>izravni učinak u privatnopravnim odnosima</strong> (<em>Defrenne</em>), a slijedilo je usvajanje brojnih direktiva i bogata praksa Suda.</li>
<li><strong>Čl. 19. UFEU-a</strong> (ex čl. 13. UEZ-a, također iz Amsterdama): Vijeće, odlučujući <strong>jednoglasno</strong>, po posebnom zakonodavnom postupku i uz prethodnu suglasnost Europskog parlamenta, poduzima odgovarajuće radnje radi suzbijanja diskriminacije na temelju spola, rasnog ili etničkog podrijetla, vjere ili uvjerenja, invaliditeta, dobi ili spolne orijentacije.</li>
<li><strong>Vrijednosti Unije:</strong> čl. 2. UEU-a – ljudsko dostojanstvo, sloboda, demokracija, jednakost, vladavina prava i ljudska prava, uključujući prava manjina; zajedničke su pluralizam, nediskriminacija, tolerancija, pravda, solidarnost i jednakost žena i muškaraca. Čl. 3. st. 3. UEU-a: Unija suzbija društvenu isključenost i diskriminaciju, promiče socijalnu pravdu i zaštitu, ravnopravnost žena i muškaraca, međugeneracijsku solidarnost i zaštitu prava djeteta.</li>
</ul>

<h3>Hrvatski pravni okvir</h3>
<p><strong>Ustav RH:</strong> čl. 3. (jednakost, ravnopravnost spolova i dr. kao najviše vrednote), čl. 14. (prava i slobode neovisno o rasi, boji kože, spolu, jeziku, vjeri, uvjerenju, podrijetlu, imovini, rođenju, naobrazbi, društvenom položaju ili drugim osobinama), čl. 15. (ravnopravnost nacionalnih manjina), čl. 26. (jednakost državljana i stranaca pred sudovima i tijelima s javnim ovlastima), čl. 44. (jednak pristup javnim poslovima i službama), čl. 55. i dalje (zapošljavanje i uvjeti rada). <strong>Međunarodni izvori:</strong> ICERD, CEDAW, ILO konvencije br. 100, 111, 156 i 159, međunarodni paktovi, konvencije o pravima djeteta i osoba s invaliditetom, Europska socijalna povelja i EKLJP. Hrvatska je dužna štititi ljudska prava u svojem pravnom poretku i jamčiti zaštitu spram protupravnih radnji bilo koga, uključujući treće osobe; sudovi poštuju zabranu diskriminacije iz čl. 14. EKLJP-a i opću zabranu iz čl. 1. Protokola br. 12. Ako domaći poredak ne uspije zaštititi prava, država mora pružiti zaštitu zajamčenu EKLJP-om. Izvori međunarodnog prava izravno su primjenjivi na države, a neizravno u odnosima osoba privatnog prava.</p>
<p><strong>Antidiskriminacijsko zakonodavstvo:</strong> <strong>Zakon o suzbijanju diskriminacije (ZSD; lex generalis)</strong> – osigurava zaštitu i promicanje jednakosti kao najviše vrednote i uređuje zaštitu od diskriminacije (čl. 1.); <strong>Zakon o ravnopravnosti spolova (ZRS)</strong>; uz njih Zakon o radu, o državnim službenicima, Kazneni zakon, zakoni o pučkom pravobranitelju i posebnim pravobraniteljima, Obiteljski zakon i dr. ZSD (čl. 1.a) prenosi Direktive 2000/78/EZ (okvir za jednak tretman pri zapošljavanju), 2000/43/EZ (rasno i etničko podrijetlo), 2004/113/EZ (roba i usluge, muškarci i žene) i 2006/54/EZ; ZRS dodatno Direktive 2010/41/EU, 92/85/EEZ i 79/7/EEZ. Antidiskriminacijske direktive sadrže <strong>odredbu o minimalnim zahtjevima</strong>: države smiju pružati viši stupanj zaštite, a pri preuzimanju ne smije doći do snižavanja već zajamčene zaštite.</p>
<p><strong>Napomena o izmjeni:</strong> prema pročišćenom tekstu ZSD-a na zakon.hr (NN 85/08, 112/12) brojevi članaka u ovoj cjelini vrijede; ZSD je i dalje temeljni opći zakon. Tekst: https://www.zakon.hr/z/490/Zakon-o-suzbijanju-diskriminacije</p>

<h3>Područje primjene ZSD-a (čl. 8.)</h3>
<p><strong>Ratione personae:</strong> svi državni organi, tijela lokalne i područne samouprave, pravne osobe s javnim ovlastima te sve pravne i fizičke osobe. <strong>Ratione materiae:</strong> (1) rad i radni uvjeti; (2) obrazovanje, znanost i šport; (3) socijalna sigurnost (socijalna skrb, mirovinsko i zdravstveno osiguranje, osiguranje za slučaj nezaposlenosti); (4) zdravstvena zaštita; (5) pravosuđe i uprava; (6) stanovanje; (7) javno informiranje i mediji; (8) pristup dobrima i uslugama; (9) članstvo i djelovanje u sindikatima, udrugama, strankama i drugim organizacijama; (10) sudjelovanje u kulturnom i umjetničkom stvaralaštvu.</p>

<h3>Pojam diskriminacije i zabranjene osnove</h3>
<p>Diskriminacija (lat. <em>discriminare</em>) je neopravdano različito postupanje, tj. nepovoljnije postupanje prema jednoj osobi ili skupini u odnosu na drugu na temelju pravom zabranjenih osnova, bez opravdanog i objektivnog razloga; osobe u usporedivom pravnom položaju nemaju jednake mogućnosti. ZSD nema jedinstvenu definiciju, ali odražava taj koncept.</p>
<p><strong>Zabranjene osnove (čl. 1. st. 1. ZSD-a):</strong> rasa, etnička pripadnost, boja kože, spol, jezik, vjera, političko ili drugo uvjerenje, nacionalno ili socijalno podrijetlo, imovno stanje, članstvo u sindikatu, obrazovanje, društveni položaj, bračni ili obiteljski status, dob, zdravstveno stanje, invaliditet, genetsko naslijeđe, rodni identitet, izražavanje ili spolna orijentacija. Popis je <strong>zatvoren</strong> (za razliku od čl. 14. Ustava nema formulacije „ili druge osobine”), ali je širi od popisa osnova u direktivama.</p>
<ul>
<li><strong>Asocijativna diskriminacija (čl. 1. st. 2.):</strong> stavljanje u nepovoljniji položaj osobe povezane s nositeljem osnove rodbinskim ili drugim vezama. <strong>Coleman (C-303/06, 2008.):</strong> radnica je radila kao poslovna tajnica, rodila sina s teškim bolestima dišnog sustava, koji zahtijeva posebnu njegu; prihvatila je sporazumni raskid i tvrdila da je bila nepovoljno tretirana zbog brige o djetetu s invaliditetom. Sud EU-a: zabrane izravne diskriminacije i uznemiravanja iz Direktive 2000/78/EZ <em>nisu ograničene na osobe koje su same invalidi</em>; kad poslodavac zaposlenika koji nije invalid tretira manje povoljno nego drugog u usporedivoj situaciji, a nepovoljniji položaj temelji se na invaliditetu njegova djeteta o kojem skrbi primarno taj zaposlenik, to je suprotno zabrani izravne diskriminacije (čl. 2. st. 2. t. a).</li>
<li><strong>Diskriminacija na temelju pogrešne predodžbe (čl. 1. st. 3.):</strong> stavljanje osobe u nepovoljniji položaj na temelju pogrešne predodžbe o postojanju zabranjene osnove.</li>
</ul>
<p>Domaći primjer: viši asistent na jednom fakultetu bio je sprječavan u napredovanju i izložen uznemiravanju zbog spolne orijentacije; općinski sud utvrdio je 2012. diskriminaciju i spolno uznemiravanje, žalba i revizija su odbijene (presedanska vrijednost kao prva takva presuda u RH). U drugom postupku optuženi za diskriminaciju tužio je asistenta zbog povrede prava osobnosti pa mu je dosuđeno trideset tisuća kuna neimovinske štete.</p>

<h3>Oblici diskriminacije</h3>
<table>
<tr><th>Oblik</th><th>Obilježja</th></tr>
<tr><td><strong>Izravna</strong> (čl. 2. st. 1. ZSD; čl. 7. st. 1. ZRS)</td><td>postupanje uvjetovano zabranjenom osnovom kojim se osoba stavlja, bila je stavljena ili bi mogla biti stavljena u nepovoljniji položaj od druge osobe u usporedivoj situaciji</td></tr>
<tr><td><strong>Neizravna</strong> (čl. 2. st. 2.)</td><td>naizgled neutralna odredba, kriterij ili praksa koja stavlja ili bi mogla staviti osobe u nepovoljniji položaj po zabranjenoj osnovi, osim ako se objektivno opravdava legitimnim ciljem, a sredstva su primjerena i nužna</td></tr>
<tr><td><strong>Uznemiravanje</strong> (čl. 3. st. 1.)</td><td>neželjeno ponašanje uzrokovano zabranjenom osnovom koje ima za cilj ili stvarno predstavlja povredu dostojanstva, uz strah, neprijateljsko, ponižavajuće ili uvredljivo okruženje</td></tr>
<tr><td><strong>Spolno uznemiravanje</strong> (čl. 3. st. 2.)</td><td>verbalno, neverbalno ili tjelesno neželjeno ponašanje spolne naravi koje ima za cilj ili stvarno predstavlja povredu dostojanstva</td></tr>
<tr><td><strong>Poticanje na diskriminaciju</strong> (čl. 4. st. 1.)</td><td>smatra se diskriminacijom</td></tr>
<tr><td><strong>Propuštanje razumne prilagodbe</strong> (čl. 4. st. 2.)</td><td>propust da se osobama s invaliditetom omogući korištenje javno dostupnih resursa, sudjelovanje u životu i pristup radnom mjestu prilagodbom koja nije nerazmjeran teret</td></tr>
<tr><td><strong>Segregacija</strong> (čl. 5.)</td><td>prisilno i sustavno razdvajanje osoba po zabranjenoj osnovi</td></tr>
<tr><td><strong>Teži oblici</strong> (čl. 6.)</td><td>višestruka (više osnova), ponovljena, produljena diskriminacija i ona koja posebno teško pogađa žrtvu; utječu na visinu neimovinske štete i kaznu</td></tr>
</table>
<p><strong>Viktimizacija (čl. 7.):</strong> nitko ne smije biti doveden u nepovoljniji položaj zato što je u dobroj vjeri prijavio diskriminaciju, nazočio joj, odbio nalog za diskriminatorno postupanje ili sudjelovao u postupku.</p>

<h3>Izravna diskriminacija: praksa</h3>
<ul>
<li><strong>Domaći predmeti – javne izjave nogometnih dužnosnika</strong> (izvršni dopredsjednik kluba i predsjednik saveza, 2010.) da homoseksualci ne mogu igrati u reprezentaciji: niže su instance, suprotno acquisu, zaključile da to nije izravna diskriminacija, među ostalim jer ne postoji stvarna žrtva. Vrhovni sud (2012.) u jednom je predmetu zaključio da nema okolnosti za zaključak da je pristup reprezentaciji bio onemogućen, a u drugom da je izjava „jasan primjer izravne diskriminacije” prema čl. 2. st. 1. ZSD-a. Vrhovni sud (2015.) je u predmetu istovjetnog činjeničnog stanja primijenio praksu <em>Feryn</em>. Ustavni sud (2017.): izjava nije vrijednosni sud utemeljen na činjenicama; s obzirom na utjecaj izvršnog dopredsjednika može potaknuti diskriminaciju i druge poslodavce te je njome počinjena izravna diskriminacija po spolnoj orijentaciji.</li>
<li><strong>Feryn (C-54/07, 2008., st. 25.):</strong> javna izjava poslodavca da neće zaposliti osobe određene etničke ili rasne pripadnosti, što će vrlo vjerojatno jako razuvjeriti kandidate od prijavljivanja i spriječiti im pristup tržištu rada, jest <em>izravna diskriminacija pri zapošljavanju</em> (Direktiva 2000/43/EZ).</li>
<li><strong>Asociaţia Accept (C-81/12, 2013., st. 36.):</strong> izravna diskriminacija iz čl. 2. st. 2. t. a Direktive 2000/78 <em>ne traži utvrdivog žalitelja</em> koji tvrdi da je bio žrtva.</li>
</ul>

<h3>Opravdanja diskriminacije</h3>
<p>Diskriminacija je zabranjena u svim pojavnim oblicima (čl. 9. st. 1.). <strong>Neizravna diskriminacija</strong> može se opravdati legitimnim ciljem uz proporcionalnost mjere cilju; <strong>izravna</strong> samo propisanim iznimkama i posebnim mjerama (nema općeg opravdanja). Sve iznimke moraju ostvarivati legitiman cilj te biti <em>primjerene i nužne</em> (čl. 9. st. 3.). <strong>Čl. 9. st. 2.</strong> navodi da se diskriminacijom ne smatra stavljanje u nepovoljniji položaj: (1) kad je određeno zakonom radi zdravlja, javne sigurnosti, javnog reda, prevencije kaznenih djela i zaštite prava drugih; (2) <em>posebne mjere</em> privremene naravi za stvarnu jednakost društvenih skupina u nepovoljnijem položaju; (3) mjere socijalne politike za osobe težeg imovinskog stanja; (4) kad značajka čini stvaran i odlučujući uvjet obavljanja posla, uz opravdanu svrhu i odmjeren uvjet; (5) crkve i vjerske zajednice te organizacije čiji se vrijednosti temelje na vjeri; (6) dob pri premijama osiguranja po aktuarskim načelima; (7) pristup dobrima, uslugama i sportu namijenjen jednom spolu ili osobama s invaliditetom; (8) dob, ako je objektivno opravdana legitimnim ciljem; (9) državljanstvo prema posebnim propisima; (10) <strong>obiteljsko pravo</strong> – radi legitimne zaštite prava i dobrobiti djece, javnog morala i pogodovanja braku, uz primjerena i nužna sredstva.</p>
<p><strong>Građanska inicijativa „U ime obitelji”:</strong> 2013. prikupila je potpise za referendumsko pitanje o ustavnoj definiciji braka kao životne zajednice žene i muškarca; ciljevi: zaštita braka, sprječavanje izjednačavanja istospolnih zajednica i braka, zaštita djece od usvajanja od istospolnih parova. Takvi ciljevi teško ispunjavaju uvjete iz čl. 9. st. 2. t. 10. i test proporcionalnosti iz čl. 9. st. 3. Ipak je 2014. izmijenjen Ustav (danas čl. 61. pročišćenog teksta definira brak kao životnu zajednicu žene i muškarca).</p>
<p><strong>Udomiteljstvo istospolnog para:</strong> centar za socijalnu skrb odbijao je izdati odobrenje za udomljenje djeteta istospolnom paru čak i nakon pravomoćne presude Upravnog suda (2019.) prema kojoj su odredbe tadašnjeg zakona o udomiteljstvu u suprotnosti s antidiskriminacijskim acquisom jer udomljenje omogućuju samo bračnim i izvanbračnim zajednicama; sud je odbio formalističko tumačenje i utvrdio da udomiteljsku obitelj mogu činiti udomitelj i njegov životni partner. <strong>Ustavni sud (siječanj 2020., U-I-144/2019 i dr.):</strong> izostavljanje osoba istospolne orijentacije iz zakona je diskriminatorno i ustavnopravno neprihvatljivo; iznimka iz čl. 9. st. 2. t. 4. ZSD-a nije primjenjiva; zakon u cjelini slijedi legitiman cilj (zaštita interesa socijalno ugroženih osoba) pa nije u nesuglasnosti s Ustavom; budući da poništenje odredbi ne bi uklonilo diskriminatorne učinke, <strong>sudovi i druga tijela dužni su odredbe tumačiti i primjenjivati tako da uklone diskriminatorne učinke</strong> i udomiteljstvo omoguće svim osobama pod jednakim uvjetima, neovisno o tome žive li u životnom ili neformalnom životnom partnerstvu.</p>

<h3>Pravna zaštita</h3>
<ul>
<li><strong>Informativna i predpostupovna zaštita (čl. 12.–15. ZSD-a):</strong> <strong>pučki pravobranitelj</strong> je središnje tijelo (zaprima prijave, pruža obavijesti, ispituje prijave, provodi mirenje, podnosi kaznene prijave, prikuplja statistiku, izvješćuje Sabor, daje mišljenja i preporuke); posebni pravobranitelji (za ravnopravnost spolova, za djecu, za osobe s invaliditetom) obavljaju dio poslova.</li>
<li><strong>Kaznenopravna zaštita:</strong> prekršajne kazne (čl. 25.–29. ZSD-a) i Kazneni zakon.</li>
<li><strong>Sudska zaštita u građanskom postupku (čl. 16.–24.):</strong> incidentalna zaštita (čl. 16.) i <strong>posebne tužbe</strong> (čl. 17.–23.): tužba za utvrđenje diskriminacije, tužba za zabranu ili otklanjanje diskriminacije ili njezinih posljedica, tužba za naknadu štete, zahtjev za objavu presude u medijima; uz njih <strong>udružna tužba</strong> (čl. 24.). Žrtva ima pravo na naknadu štete po propisima o obveznim odnosima (čl. 11.).</li>
</ul>
`,
      id: "18l000"
    },
    id: "18k000"
  },
  europskoStvarnoPravo: {
    name: "Europsko stvarno pravo: jamstvo vlasništva i stjecanje nekretnina",
    icon: "fa-house-chimney",
    color: "#f59e0b",
    flashcards: [
      { question: "Što propisuje čl. 345. UFEU-a o vlasništvu (prije čl. 295. UEZ-a)?", answer: "Ugovori ni na koji način ne zadiru u pravila država članica kojima se uređuje sustav vlasništva.", explanation: "Prije Lisabona: čl. 295. UEZ-a, bivši čl. 222.", id: "19c001" },
      { question: "Zašto čl. 345. UFEU-a ne isključuje stvarno pravo iz djelokruga Unije?", answer: "Jer brojni izvori sekundarnog prava i praksa Suda EU-a izričito uređuju pravo vlasništva i neka druga stvarna prava.", explanation: "Npr. direktive o kreditima za stambene nekretnine i o timeshareu.", id: "19c002" },
      { question: "Navedite primjere sekundarnog prava Unije s utjecajem na stvarno pravo.", answer: "Direktiva 2014/17/EU o potrošačkim kreditima za stambene nekretnine i Direktiva 2008/122/EZ o timeshareu, dugoročnim proizvodima za odmor, preprodaji i razmjeni.", explanation: "Europsko stvarno pravo nije ograničeno čl. 345.", id: "19c003" },
      { question: "Što je promijenio Lisabonski ugovor u pogledu EKLJP-a (čl. 6. UEU-a)?", answer: "Temeljna prava iz EKLJP-a i ustavnih tradicija postaju opća načela prava Unije, a Povelja je izvor primarnog prava iste pravne vrijednosti kao Ugovori.", explanation: "Ranije: Unija će poštivati temeljna prava iz EKLJP-a.", id: "19c004" },
      { question: "Što jamči čl. 1. Prvog protokola uz EKLJP?", answer: "Pravo svake fizičke i pravne osobe na mirno uživanje vlasništva; nitko se ne smije lišiti vlasništva osim u javnom interesu uz uvjete zakona i općih načela međunarodnog prava.", explanation: "Država smije uređivati upotrebu vlasništva u općem interesu.", id: "19c005" },
      { question: "Što je predmet jamstva vlasništva?", answer: "Subjektivno pravo vlasništva koje je osoba zakonito stekla; ne jamči se da će se vlasništvo steći (Sorić protiv Hrvatske).", explanation: "Široki pojam: vlasništvo, ograničena stvarna i obvezna prava, intelektualno vlasništvo, udjeli i dionice.", id: "19c006" },
      { question: "Koji je opseg pojma vlasništva u jamstvu EKLJP-a?", answer: "Vlasništvo u najužem smislu, ostala imovinska prava, ograničena stvarna prava, obvezna prava, intelektualno vlasništvo te članska prava u društvima (udjeli, dionice).", explanation: "Autonomno, široko tumačenje.", id: "19c007" },
      { question: "Od čega štiti jamstvo vlasništva?", answer: "Od lišenja vlasništva (izvlaštenja), od ograničavanja vlasništva i od nedopuštenih zahvata; jamstvo nije apsolutno.", explanation: "Zahvat je dopušten pod propisanim pretpostavkama.", id: "19c008" },
      { question: "Koje pretpostavke moraju biti ispunjene za lišenje vlasništva?", answer: "Javni interes, uvjeti predviđeni zakonom te opća načela međunarodnog prava.", explanation: "Ograničenje upotrebe: opći interes, porezi, doprinosi, kazne.", id: "19c009" },
      { question: "Koje su činjenice i odluka Suda EU-a u predmetu Hauer?", answer: "Zabrana novih nasada vinove loze nije lišenje vlasništva, nego dopušteno ograničenje upotrebe u općem interesu; pravo vlasništva zajamčeno je prema idejama zajedničkim ustavima država članica.", explanation: "Presuda 44/79, st. 17.", id: "19c010" },
      { question: "Što je Sud EU-a rekao o čl. 1. Protokola u Hauer?", answer: "Priznaje u načelu zakonitost ograničenja upotrebe vlasništva, ali ih ograničava na mjeru koju država smatra nužnom za zaštitu općeg interesa.", explanation: "Ograničava upotrebu, ne oduzima vlasništvo.", id: "19c011" },
      { question: "Koja su tri koraka testa proporcionalnosti?", answer: "Prikladnost (mjera uzročno djeluje na cilj), nužnost (nema blaže jednako uspješne mjere) i proporcionalnost u užem smislu (nedostaci nisu potpuno nesrazmjerni prednostima).", explanation: "Odvagnuti prednosti i nedostatke uz ustavna prava.", id: "19c012" },
      { question: "Što je Sud EU-a zaključio o čl. 222. Ugovora u predmetu Commission protiv Portugala?", answer: "Svaka država članica može organizirati sustav vlasništva nad poduzećima kako smatra prikladnim, ali se ne može pozivati na njega da opravda ograničenja temeljnih sloboda iz Ugovora.", explanation: "Presuda C-367/98, st. 48. (st. 28. izlaže stajalište Komisije).", id: "19c013" },
      { question: "Što je Sud EU-a odlučio u predmetu Essent?", answer: "Ugovori se u načelu ne protive nacionalizaciji ni privatizaciji, ali čl. 345. UFEU-a ne izuzima sustav vlasništva od pravila o nediskriminaciji, poslovnom nastanu i kretanju kapitala.", explanation: "Presuda C-105/12, st. 30. i 36.", id: "19c014" },
      { question: "Što propisuje čl. 17. Povelje o temeljnim pravima?", answer: "Svatko ima pravo na zakonito stečenu imovinu, njezino korištenje, raspolaganje i nasljeđivanje; oduzimanje samo u javnom interesu uz pravodobnu pravednu odštetu; zaštićeno je intelektualno vlasništvo.", explanation: "Korištenje se može regulirati zakonom u općem interesu.", id: "19c015" },
      { question: "Koje uvjete za ograničenje prava iz Povelje postavlja čl. 52. st. 1.?", answer: "Ograničenje mora biti predviđeno zakonom, poštovati bit prava te biti potrebno i proporcionalno ciljevima općeg interesa koje priznaje Unija ili zaštiti prava drugih.", explanation: "Čl. 52. st. 3.: značenje prava jednako kao u EKLJP-u.", id: "19c016" },
      { question: "Kako se stjecanje nekretnina odnosi prema slobodi kretanja kapitala?", answer: "Čl. 63. UFEU-a zabranjuje ograničenja kretanja kapitala; iznimke su čl. 65. st. 1. UFEU-a, protokoli (npr. za Dansku o drugim domovima) i odredbe ugovora o pristupanju.", explanation: "Prijelazna razdoblja za stjecanje drugih domova i zemljišta.", id: "19c017" },
      { question: "Koje je opće pravilo za stjecanje nekretnina stranim osobama u Hrvatskoj (ZV)?", answer: "Iste opće pretpostavke kao za domaće osobe; strane osobe nasljeđuju uz uzajamnost, a druge oblike stjecanja uz uzajamnost i suglasnost ministra pravosuđa (čl. 356., 357. ZV-a).", explanation: "Vrijedi za strane osobe izvan EU-a; osobe iz EU-a izjednačene su s domaćima (čl. 358.a ZV-a).", id: "19c018" },
      { question: "Kako strana osoba može zaobići ograničenja stjecanja nekretnine u RH?", answer: "Osnivanjem trgovačkog društva: društvo se smatra hrvatskom pravnom osobom pa nekretninu stječe bez posebnih uvjeta, a udio u društvu može se prodati stranoj osobi.", explanation: "Domaća osoba unese nekretninu kao temeljni ulog.", id: "19c019" },
      { question: "Koje su nekretnine u RH zatvorene za stjecanje vlasništva stranih osoba?", answer: "Isključena područja zbog sigurnosti, poljoprivredno zemljište, šume, zaštićena područja prirode i pomorsko dobro (samo pravo korištenja); kulturna dobra uz pravo prvokupa države.", explanation: "Iznimke prema međunarodnim ugovorima i za državljane EU.", id: "19c020" },
      { question: "Što je SSP uveo u pogledu vlasništva nad nekretninama za osobe iz EU-a?", answer: "Društva kćeri iz Zajednice stječu nekretnine kao hrvatska društva (osim prirodnih bogatstava, poljoprivrednog zemljišta i šuma); fizičke osobe postupno izjednačavanje u četiri godine.", explanation: "Čl. 49. st. 5. t. b i čl. 60. st. 2. SSP-a.", id: "19c021" },
      { question: "Kada su izjednačena prava hrvatskih državljana i državljana EU na stjecanje nekretnina?", answer: "Od 1. veljače 2009. (čl. 358.a ZV-a); izuzeti su poljoprivredno zemljište i zaštićeni dijelovi prirode, a poljoprivredno zemljište otvoreno je od 1. 7. 2023. uz uvjete posebnog zakona.", explanation: "Izmjena ZV-a NN 52/25 širi izjednačenje na EGP i OECD od pristupanja RH OECD-u.", id: "19c022" },
      { question: "Što mijenja izmjena Zakona o vlasništvu NN 52/25 u stjecanju nekretnina?", answer: "Izjednačenje s domaćima proširuje na države EGP-a i OECD-a, dopušta mjere radi javnog poretka i sigurnosti i izuzima poljoprivredno zemljište; stupa na snagu danom pristupanja RH OECD-u.", explanation: "Do tada vrijedi dosadašnji tekst ZV-a.", id: "19c023" }
    ],
    quiz: [
      {
        question: "Čl. 345. UFEU-a propisuje da Ugovori:",
        options: [
          "ni na koji način ne zadiru u pravila država članica o sustavu vlasništva",
          "u potpunosti uređuju i usklađuju sustav vlasništva država članica Unije",
          "zabranjuju državama članicama nacionalizaciju poduzeća",
          "daju Uniji isključivu nadležnost za pravo vlasništva"
        ],
        correct: 0, id: "19q001"
      },
      {
        question: "Direktiva 2014/17/EU je primjer sekundarnog prava koje utječe na stvarno pravo jer uređuje:",
        options: [
          "upis prava vlasništva u zemljišne knjige država članica",
          "ugovore o potrošačkim kreditima za stambene nekretnine",
          "ovlasti javnih bilježnika pri prijenosu nekretnina",
          "porezni tretman prodaje nekretnina u Uniji"
        ],
        correct: 1, id: "19q002"
      },
      {
        question: "U predmetu Sorić protiv Hrvatske naglašeno je da jamstvo vlasništva:",
        options: [
          "obuhvaća pravo svake osobe da stekne vlasništvo",
          "štiti vlasništvo od oduzimanja bez zaštite od ograničenja upotrebe",
          "ne jamči da će se vlasništvo steći",
          "ne obuhvaća intelektualno vlasništvo i dionice"
        ],
        correct: 2, id: "19q003"
      },
      {
        question: "Prema čl. 1. Prvog protokola uz EKLJP nitko se ne smije lišiti vlasništva osim:",
        options: [
          "po odluci upravnog tijela uz naknadu koju tijelo odredi po slobodnoj ocjeni",
          "uz suglasnost Vijeća Europe i države članice",
          "u privatnom interesu uz pravičnu naknadu",
          "u javnom interesu uz uvjete zakona i općih načela međunarodnog prava"
        ],
        correct: 3, id: "19q004"
      },
      {
        question: "U predmetu Hauer zabrana novih nasada vinove loze ocijenjena je kao:",
        options: [
          "lišenje vlasništva koje traži naknadu",
          "dopušteno ograničenje upotrebe vlasništva u općem interesu",
          "mjera koja potpuno isključuje vlasništvo nad zemljištem",
          "povreda slobode kretanja robe između država članica"
        ],
        correct: 1, id: "19q005"
      },
      {
        question: "Nužnost mjere u testu proporcionalnosti znači da:",
        options: [
          "mjera uzročno djeluje na postizanje cilja",
          "nedostaci mjere nisu potpuno nesrazmjerni njezinim prednostima",
          "ne postoji blaža mjera kojom bi se postigao isti cilj",
          "ne postoji drugi cilj koji bi mjera mogla ostvariti"
        ],
        correct: 2, id: "19q006"
      },
      {
        question: "Prema presudi Essent čl. 345. UFEU-a:",
        options: [
          "zabranjuje svaku privatizaciju poduzeća u javnom vlasništvu",
          "zabranjuje nacionalizaciju poduzeća bez odobrenja Komisije",
          "isključuje primjenu slobode kretanja kapitala na sustav vlasništva u državama članicama",
          "ne izuzima sustav vlasništva od pravila o nediskriminaciji i poslovnom nastanu"
        ],
        correct: 3, id: "19q007"
      },
      {
        question: "Čl. 17. Povelje o temeljnim pravima dopušta oduzimanje imovine:",
        options: [
          "samo u javnom interesu uz pravodobnu pravednu odštetu",
          "bez odštete ako to određuje zakon države članice",
          "isključivo odlukom Suda EU-a u prethodnom postupku",
          "samo radi plaćanja poreza i drugih doprinosa"
        ],
        correct: 0, id: "19q008"
      },
      {
        question: "Strana osoba može nekretninu u Hrvatskoj steći posredno tako da:",
        options: [
          "kupi nekretninu uz suglasnost Vlade bez ikakve uzajamnosti",
          "preko domaće osobe osnuje društvo i od nje kupi udio",
          "sklopi ugovor o dosmrtnom uzdržavanju s domaćom osobom",
          "otkupi pravo prvokupa od države za zaštićeni spomenik"
        ],
        correct: 1, id: "19q009"
      },
      {
        question: "Državljani EU-a izjednačeni su s hrvatskim državljanima u stjecanju nekretnina od:",
        options: [
          "dana pristupanja Hrvatske Europskoj uniji",
          "dana potpisivanja Sporazuma o stabilizaciji i pridruživanju",
          "1. veljače 2009., nakon četverogodišnjeg prijelaznog razdoblja",
          "1. siječnja 2023., uvođenjem eura"
        ],
        correct: 2, id: "19q010"
      },
      {
        question: "Kod prodaje nekretnine koja je zaštićeni spomenik kulture strana osoba ju može kupiti tek kad:",
        options: [
          "ministar pravosuđa izda suglasnost uz uzajamnost država",
          "se nekretnina prethodno unese u temeljni ulog društva",
          "Sabor donese zakon o izuzeću nekretnine od zaštite",
          "državna i lokalna tijela odbiju iskoristiti pravo prvokupa"
        ],
        correct: 3, id: "19q011"
      },
      {
        question: "Kada stupa na snagu izmjena ZV-a NN 52/25 kojom se izjednačenje u stjecanju nekretnina proširuje na države EGP-a i OECD-a?",
        options: [
          "danom pristupanja Republike Hrvatske OECD-u",
          "danom objave izmjene u Narodnim novinama",
          "danom pristupanja Republike Hrvatske Europskoj uniji",
          "danom donošenja posebnog zakona o poljoprivrednom zemljištu"
        ],
        correct: 0, id: "19q012"
      }
    ],
    fillBlanks: [
      { sentence: "Čl. 345. UFEU-a ugovorima ne zadire u pravila država članica o sustavu _______.", answer: "vlasništva", hint: "temeljno stvarno pravo", id: "19f001" },
      { sentence: "Jamstvo vlasništva sadržano je u čl. 1. Prvog _______ uz EKLJP.", answer: "protokola", hint: "dodatak konvenciji", id: "19f002" },
      { sentence: "Prema Hauer zabrana novih nasada vinove loze samo _______ upotrebu vlasništva.", answer: "ograničava", hint: "mjera koja ne lišava vlasnika vlasništva", id: "19f003" },
      { sentence: "U testu proporcionalnosti mjera je _______ kad uzročno djeluje na postizanje cilja.", answer: "prikladna", hint: "prvi korak testa", id: "19f004" },
      { sentence: "Povelja o temeljnim pravima ima istu pravnu vrijednost kao _______.", answer: "Ugovori", hint: "UEU i UFEU", id: "19f005" },
      { sentence: "Pravo na vlasništvo u čl. 17. Povelje zaštićuje i _______ vlasništvo.", answer: "intelektualno", hint: "autorska i industrijska prava", id: "19f006" },
      { sentence: "Strana osoba nasljeđuje nekretninu u RH pod pretpostavkom _______.", answer: "uzajamnosti", hint: "isti tretman naših osoba u toj državi", id: "19f007" },
      { sentence: "Ograničenja kretanja kapitala zabranjuje čl. 63. _______.", answer: "UFEU-a", hint: "ugovor o funkcioniranju", id: "19f008" },
      { sentence: "Čl. 345. UFEU-a ne isključuje stvarno pravo jer vlasništvo uređuju i izvori _______ prava Unije.", answer: "sekundarnog", hint: "uredbe i direktive", id: "19f009" },
      { sentence: "Nakon Lisabona Povelja je izvor _______ prava Unije.", answer: "primarnog", hint: "razina Ugovora", id: "19f010" },
      { sentence: "Pojam vlasništva u jamstvu EKLJP-a obuhvaća i članska prava u društvima, tj. udjele i _______.", answer: "dionice", hint: "vrijednosni papiri", id: "19f011" },
      { sentence: "Jamstvo vlasništva štiti od lišenja, od ograničavanja i od nedopuštenih _______ u vlasništvo.", answer: "zahvata", hint: "ono što država čini vlasniku bez pristanka", id: "19f012" },
      { sentence: "Prema Hauer Protokol ograničava ograničenja upotrebe na mjeru nužnu za zaštitu općeg _______.", answer: "interesa", hint: "korist zajednice", id: "19f013" },
      { sentence: "U predmetu Commission protiv Portugala Sud je u st. 48. naglasio da se države ne mogu pozivati na sustav vlasništva nad _______ kako bi opravdale ograničenja sloboda.", answer: "poduzećima", hint: "trgovačka društva u državnom ili privatnom vlasništvu", id: "19f014" },
      { sentence: "Čl. 52. Povelje traži da ograničenje prava poštuje bit prava i bude predviđeno _______.", answer: "zakonom", hint: "pravnim aktom parlamenta", id: "19f015" },
      { sentence: "Prema SSP-u trebalo je u četiri godine osigurati osobama iz EU-a isti tretman kao hrvatskim _______.", answer: "državljanima", hint: "osobe s hrvatskom putovnicom", id: "19f016" }
    ],
    learn: {
      title: "Europsko stvarno pravo: jamstvo vlasništva i stjecanje nekretnina",
      content: `
<h3>Nadležnost Unije i čl. 345. UFEU-a</h3>
<p>Prije Lisabonskog ugovora: <strong>čl. 295. UEZ-a</strong> (bivši čl. 222.) – „Ovim se Ugovorom ne zadire u pravila država članica kojima se uređuje vlasničkopravni sustav.” Nakon Lisabona: <strong>čl. 345. UFEU-a</strong> – „Ugovori ni na koji način ne zadiru u pravila država članica kojima se uređuje sustav vlasništva.” Iako se čini da odredba izričito isključuje ovo područje privatnog prava iz nadležnosti Unije, to nije tako: potvrđuju to brojni izvori sekundarnog prava i praksa Suda EU-a koji se izričito odnose na pravo vlasništva i neka druga stvarna prava, npr. <strong>Direktiva 2014/17/EU</strong> o ugovorima o potrošačkim kreditima koji se odnose na stambene nekretnine i <strong>Direktiva 2008/122/EZ</strong> o ugovorima o pravu na vremenski ograničenu uporabu nekretnine (<em>timeshare</em>), dugoročnim proizvodima za odmor, ponovnoj prodaji i razmjeni.</p>
<p>Europsko stvarno pravo gradi se na tri sloja: <strong>temeljna prava</strong> (Povelja, EKLJP; predmet Hauer), <strong>temeljne gospodarske slobode</strong> i <strong>sekundarno pravo</strong>. Predmet cjeline: jamstvo vlasništva u pravu EU-a; odnos vlasništva i temeljnih gospodarskih sloboda; stvarnopravne odredbe u sekundarnom pravu.</p>

<h3>EKLJP i Povelja</h3>
<ul>
<li><strong>Prije Lisabona (raniji čl. 6. UEU-a):</strong> Unija je utemeljena na slobodi, demokraciji, poštivanju ljudskih prava i vladavini prava te poštuje temeljna prava zajamčena EKLJP-om i ona koja proizlaze iz ustavnih tradicija kao opća načela prava Zajednice.</li>
<li><strong>Nakon Lisabona (čl. 6. st. 3. UEU-a):</strong> temeljna prava zajamčena EKLJP-om i iz ustavnih tradicija čine <strong>opća načela prava Unije</strong>, a Povelja (čl. 6. st. 1.) je izvor primarnog prava iste pravne vrijednosti kao Ugovori; njezine odredbe ne smiju proširiti nadležnosti Unije.</li>
</ul>
<h3>Jamstvo vlasništva</h3>
<p><strong>EKLJP, Prvi protokol (1952.), čl. 1.:</strong> svaka fizička ili pravna osoba ima pravo na mirno uživanje svojega vlasništva. Nitko se ne smije lišiti vlasništva, osim u javnom interesu, i to samo uz uvjete predviđene zakonom i općim načelima međunarodnoga prava. Te odredbe ne umanjuju pravo države da primijeni zakone koje smatra potrebnima da bi uredila upotrebu vlasništva u skladu s općim interesom ili radi osiguranja plaćanja poreza ili drugih doprinosa ili kazni.</p>
<ul>
<li><strong>Predmet jamstva:</strong> subjektivno pravo vlasništva koje je pravni subjekt <em>zakonito stekao</em>; jamstvo vlasništva nije jamstvo da će se vlasništvo steći (<em>Sorić protiv Hrvatske</em>).</li>
<li><strong>Široki pojam vlasništva:</strong> pravo vlasništva u najužem smislu, ostala imovinska prava, ograničena stvarna prava, obvezna prava, intelektualno vlasništvo, članska prava u trgovačkim društvima (udjeli, prava utjelovljena u dionicama).</li>
<li><strong>Zaštita:</strong> od lišenja vlasništva (izvlaštenja), od ograničavanja vlasništva i od nedopuštenih zahvata; jamstvo ne djeluje apsolutno. Lišenje: u javnom interesu, uz uvjete zakona i općih načela međunarodnog prava. Ograničavanje: pravo države da primijeni zakone koje smatra potrebnima da uredi upotrebu vlasništva u općem interesu, odnosno radi osiguranja poreza, doprinosa i kazni.</li>
</ul>
<h3>Test proporcionalnosti (razmjernosti)</h3>
<ol>
<li><strong>Prikladnost</strong> – mjera uzročno djeluje ili nastoji djelovati na postizanje cilja (za smanjenje emisija može se zatvoriti pogon, ali i nadograditi pročistači).</li>
<li><strong>Nužnost</strong> (neophodnost, potrebnost) – ne može se primijeniti druga blaža mjera koja bi postigla isti cilj.</li>
<li><strong>Proporcionalnost u užem smislu</strong> – nedostaci povezani s djelovanjem mjere nisu potpuno nesrazmjerni prednostima; treba odvagnuti sve prednosti i nedostatke uz pažnju na temeljna ljudska prava zajamčena Ustavom (npr. nadzor prostorija stana radi suzbijanja zločinačkih organizacija treba odvagnuti prema nepovredivosti doma).</li>
</ol>

<h3>Praksa Suda EU-a o vlasništvu</h3>
<ul>
<li><strong>Hauer (44/79, 1979.):</strong> vlasnica zemljišta zatražila je odobrenje za nove nasade vinove loze; odbijeno je zbog Uredbe Vijeća (EEZ) br. 1162/76 o privremenoj zabrani novih nasada. Sud EU-a: zabrana nije <em>lišenje</em> vlasništva jer vlasnik njime i dalje može slobodno raspolagati ili ga koristiti u druge dopuštene svrhe; ona <em>ograničava upotrebu</em>, što je u skladu s čl. 1. st. 2. Protokola, koji u načelu prihvaća zakonitost ograničenja upotrebe vlasništva i ograničava ih na mjeru koju država smatra nužnom za opći interes. St. 17.: pravo vlasništva zajamčeno je u pravnom poretku Zajednice u skladu s idejama zajedničkim ustavima država članica, koje se ogledaju i u Prvom protokolu uz EKLJP.</li>
<li><strong>Commission protiv Portugala (C-367/98, 2002.):</strong> st. 28. izlaže stajalište Komisije. Sud u st. 48. zaključuje da čl. 222. Ugovora (sada čl. 345. UFEU-a) samo znači da svaka država članica može organizirati sustav vlasništva nad poduzećima kako smatra prikladnim, <em>uz poštovanje temeljnih sloboda iz Ugovora</em>, pa se države ne mogu pozivati na vlastiti sustav vlasništva da bi opravdale ograničenja tih sloboda.</li>
<li><strong>Essent (C-105/12, 2013., st. 30. i 36.):</strong> Ugovori se u načelu ne protive ni nacionalizaciji ni privatizaciji poduzeća; ali učinak čl. 345. UFEU-a nije izuzeti sustav vlasništva od temeljnih pravila UFEU-a, osobito pravila o nediskriminaciji, slobodi poslovnog nastana i slobodi kretanja kapitala.</li>
</ul>
<h3>Povelja o temeljnim pravima</h3>
<p><strong>Čl. 17. – pravo na vlasništvo:</strong> (1) svatko ima pravo na vlasništvo nad svojom na zakonit način stečenom imovinom, njezino korištenje, raspolaganje i ostavljanje u nasljedstvo; imovina se ne može oduzeti osim radi zaštite javnog interesa ili u slučajevima i pod uvjetima koje propisuje zakon, ako se pravodobno isplati odšteta za gubitak; korištenje se može regulirati zakonom u mjeri u kojoj to zahtijeva opći interes. (2) Zaštićeno je intelektualno vlasništvo. <strong>Čl. 52.:</strong> (1) ograničenje mora biti predviđeno zakonom i poštovati bit prava; uz načelo proporcionalnosti moguće je samo ako je potrebno i stvarno odgovara ciljevima općeg interesa koje priznaje Unija ili potrebi zaštite prava i sloboda drugih; (2) prava iz Ugovora ostvaruju se pod uvjetima iz Ugovora; (3) prava koja odgovaraju pravima iz EKLJP-a imaju jednako značenje i opseg, uz pravo Unije da pruži širu zaštitu; (4) prava iz ustavnih tradicija tumače se u skladu s njima; (7) sudovi uzimaju u obzir objašnjenja uz Povelju.</p>

<h3>Vlasništvo i temeljne gospodarske slobode</h3>
<p>Slobodu kretanja kapitala ograničavati zabranjuje <strong>čl. 63. UFEU-a</strong>. Dopuštena ograničenja u primarnom pravu: <strong>čl. 65. st. 1. UFEU-a</strong>, protokoli (npr. Protokol o stjecanju nekretnina u Danskoj – Danska može zadržati zakonodavstvo o stjecanju drugih domova) i odredbe ugovora o pristupanju (Austrija, Finska, Švedska; Slovenija – opća zaštitna klauzula za tržište nekretnina do sedam godina; Češka – do pet godina zadržavanje pravila o stjecanju drugih domova za državljane drugih država članica; Mađarska – do sedam godina zabrane stjecanja poljoprivrednog zemljišta za nerezidente; Hrvatska – prijelazno razdoblje za poljoprivredno zemljište od 7 + 3 godine, koje je isteklo 30. 6. 2023.; za druge države trajno ili do 12 godina).</p>

<h3>Stjecanje nekretnina stranih osoba u Hrvatskoj</h3>
<p><strong>Zakon o vlasništvu i drugim stvarnim pravima (ZV):</strong> opće pretpostavke iste kao kad vlasništvo stječu domaće osobe (po svim pravnim temeljima), a posebne se razlikuju ovisno o stjecanju pravnim poslom, odlukom suda ili druge vlasti, nasljeđivanjem i na temelju zakona. Za strane fizičke i pravne osobe (čl. 356. i 357. ZV-a): nasljeđivanjem pod pretpostavkom <em>uzajamnosti</em>; drugim oblicima stjecanja također pod pretpostavkom uzajamnosti i <em>uz suglasnost ministra nadležnog za poslove pravosuđa</em>.</p>
<p><strong>Stjecanje osnivanjem trgovačkog društva:</strong> trgovačko društvo, neovisno o tome u čijem je vlasništvu, može steći nekretninu bez posebnih uvjeta jer se smatra hrvatskom pravnom osobom (Zakon o trgovačkim društvima izjednačuje inozemna društva i trgovce pojedince s domaćima pod propisanim uvjetima). Domaća osoba može osnovati društvo, unijeti nekretninu kao temeljni ulog, a udio prodati stranoj osobi.</p>
<p><strong>Nekretnine koje strane osobe ne mogu stjecati u vlasništvo</strong> (zaštita interesa i sigurnosti ili poseban gospodarski interes): <em>isključena područja</em> koja je zakonom proglašena područjima na kojima strane osobe ne mogu imati vlasništvo; <em>poljoprivredno zemljište</em> (Zakon o poljoprivrednom zemljištu, osim ako međunarodni ugovor nije drukčije određen); <em>šume i šumsko zemljište</em> (Zakon o šumama; iznimka: državljani EU-a); <em>kulturna dobra</em> – kod prodaje zaštićenog spomenika kulture vlasnik mora prvo ponuditi državnom tijelu (pravo prvokupa); <em>pomorsko dobro</em> – nevlasnički režim kojim upravlja država, moguće je stjecati pravo korištenja ali ne vlasništvo (Pomorski zakonik); <em>zaštićena područja prirode</em> (nacionalni parkovi, rezervati, parkovi prirode, Zakon o zaštiti prirode).</p>
<h3>Sporazum o stabilizaciji i pridruživanju</h3>
<p>SSP (29. 10. 2001., na snazi od 1. 2. 2005.): Hrvatska mijenja uvjete prema kojima strane osobe iz EU-a stječu vlasništvo nad nekretninama. <strong>Čl. 49. st. 5. t. b:</strong> društva kćeri trgovačkih društava Zajednice imaju pravo stjecanja i uživanja vlasništva na nekretninama kao hrvatska društva, a glede javnih dobara i dobara od općeg interesa ista prava kao hrvatska društva kad su potrebna za gospodarske djelatnosti radi kojih su osnovana, <em>isključujući prirodna bogatstva, poljoprivredno zemljište, šume i šumsko zemljište</em>. <strong>Čl. 60. st. 2.:</strong> u razdoblju od četiri godine od stupanja Sporazuma na snagu Hrvatska postupno usklađuje zakonodavstvo kako bi državljanima država članica osigurala isti tretman kao hrvatskim državljanima; nakon četvrte godine Vijeće za stabilizaciju i pridruživanje ispituje proširenje prava na područja iz Dodatka VII (poljoprivredno zemljište prema zakonu i područja zaštićena Zakonom o zaštiti prirode).</p>
<p><strong>Izjednačavanje državljana RH i EU:</strong> Hrvatska se obvezala da će nakon četverogodišnjeg prijelaznog razdoblja, koje je isteklo 1. veljače 2009., izjednačiti prava svojih državljana i državljana EU-a na stjecanje nekretnina. Prema <strong>čl. 358.a ZV-a</strong> (NN 146/08; na snazi od 1. 2. 2009.) odredbe čl. 354.–358. ne odnose se na državljane i pravne osobe iz država članica EU-a: oni stječu vlasništvo pod istim pretpostavkama kao hrvatski državljani i osobe sa sjedištem u RH. Iznimka (čl. 358.a st. 2., i danas važeći tekst): nekretnine u izuzetim područjima – poljoprivredno zemljište određeno posebnim zakonom i zaštićeni dijelovi prirode prema posebnom zakonu. Postupci za suglasnost pokrenuti prema čl. 356. i 357. u korist osoba iz EU-a, koji nisu pravomoćno okončani, obustavljaju se po službenoj dužnosti.</p>
<p><strong>Napomena o izmjeni:</strong> (a) čl. 358.a st. 2. ZV-a (izuzeća za poljoprivredno zemljište i zaštićene dijelove prirode) i danas je važeći tekst. (b) Prijelazno razdoblje za poljoprivredno zemljište iz Ugovora o pristupanju RH (7 + 3 godine) isteklo je 30. 6. 2023.; od 1. 7. 2023. osobe iz EU-a stječu poljoprivredno zemljište kao hrvatski državljani, uz uvjete Zakona o poljoprivrednom zemljištu. (c) Izmjena ZV-a NN 52/25 proširuje izjednačenje na države EGP-a i OECD-a, dopušta mjere radi javnog poretka i sigurnosti i izuzima poljoprivredno zemljište; stupa na snagu danom pristupanja RH OECD-u (do tada vrijedi dosadašnji tekst). Opseg stjecanja šuma i šumskog zemljišta uređuju posebni zakoni.</p>
<p>Na shemi europskog stvarnog prava uz sekundarno pravo navodi se predmet <em>Travel Vac</em> (C-423/97), a uz temeljne gospodarske slobode predmet <em>Konle</em> (C-302/97).</p>
`,
      id: "19l000"
    },
    id: "19k000"
  },
  nepostenePojam: {
    name: "Nepoštene ugovorne odredbe: pojam, područje primjene i test nepoštenosti",
    icon: "fa-scale-unbalanced",
    color: "#ef4444",
    flashcards: [
      { question: "Koji se problemi javljaju u praksi s unaprijed formuliranim potrošačkim ugovorima?", answer: "Upućivanje na opće uvjete koje potrošač nije vidio te široke privole za obradu i prosljeđivanje osobnih podataka trećima (bankama, agencijama za naplatu, marketingu).", explanation: "Standardizirani ugovori na koje potrošač nema utjecaja.", id: "20c001" },
      { question: "Koji je cilj Direktive 93/13/EEZ prema praksi Suda EU-a?", answer: "Obvezati države članice da propišu mehanizam kojim se svaka nepoštena odredba o kojoj se nije pojedinačno pregovaralo može ispitati, jer je potrošač slabija strana.", explanation: "Slabiji položaj: pregovaračka snaga i razina obaviještenosti.", id: "20c002" },
      { question: "Koja se dva propisa u RH primjenjuju na nepoštene odredbe i u kakvu su odnosu?", answer: "ZOO (opći uvjeti ugovora, čl. 295.–296.) kao opći i ZZP (čl. 53.–59.) kao posebni propis; lex specialis derogat legi generali.", explanation: "Posebniji propisi: npr. zakon o elektroničkim komunikacijama.", id: "20c003" },
      { question: "Čime se razlikuje primjena odredbi ZOO-a od ZZP-a o nepoštenim odredbama?", answer: "ZOO se primjenjuje na sve ugovore i ocjenjuje ništetnost općih uvjeta; ZZP na potrošačke ugovore (B2C) i ocjenjuje nepoštenost odredbi ugovora u cijelosti.", explanation: "Dva različita razmjera primjene.", id: "20c004" },
      { question: "Koji su ugovori izuzeti iz polja primjene Direktive 93/13/EEZ (recital 10.)?", answer: "Ugovori o zapošljavanju, nasljednim pravima, pravima iz obiteljskog prava te o osnivanju i organizaciji trgovačkih društava i ugovori o partnerstvu.", explanation: "Primjenjuje se na ugovore prodavatelja robe ili pružatelja usluga s potrošačem.", id: "20c005" },
      { question: "Koji je predmet uređenja čl. 1. Direktive 93/13/EEZ?", answer: "Usklađivanje propisa država članica o nepoštenim odredbama u ugovorima između prodavatelja robe ili pružatelja usluga i potrošača.", explanation: "Dva ugovorna subjekta: trgovac i potrošač.", id: "20c006" },
      { question: "Što je Sud EU-a odlučio u predmetu Pouvin i Dijoux?", answer: "Zaposlenik i njegov bračni drug koji s poslodavcem sklope kredit za privatno stjecanje nekretnine potrošači su, a široko tumačenje pojma prodavatelja ili pružatelja usluge služi zaštiti potrošača.", explanation: "Presuda C-590/17; kredit ograničen na članove osoblja.", id: "20c007" },
      { question: "Što je Sud EU-a odlučio u predmetu Šiba?", answer: "Direktiva 93/13/EEZ primjenjuje se na standardizirane ugovore o pravnim uslugama između odvjetnika i fizičke osobe koja ne postupa s ciljem povezanim s profesijom.", explanation: "Presuda C-537/13; i odvjetnik je pružatelj usluga.", id: "20c008" },
      { question: "Koji je test nepoštenosti prema čl. 53. st. 1. ZZP-a?", answer: "Odredba o kojoj se nije pojedinačno pregovaralo, suprotna je načelu savjesnosti i poštenja i uzrokuje znatnu neravnotežu u pravima i obvezama na štetu potrošača.", explanation: "Nepoštenost = ništetnost odredbe.", id: "20c009" },
      { question: "Koju razliku ZOO ima u testu iz čl. 296. st. 1.?", answer: "Traži očiglednu neravnopravnost u pravima i obvezama na štetu suugovaratelja sastavljača ili ugrožavanje svrhe ugovora, kod općih uvjeta ugovora.", explanation: "Alternativni uvjet: ugrožavanje svrhe.", id: "20c010" },
      { question: "Kada se smatra da o odredbi nije pojedinačno pregovarano (čl. 53. st. 2. ZZP-a)?", answer: "Kad ju je unaprijed formulirao trgovac pa potrošač nije imao utjecaja na sadržaj, osobito kod unaprijed formuliranog standardnog ugovora.", explanation: "Presumpcija nepostojanja pregovaranja.", id: "20c011" },
      { question: "Na kome je teret dokaza da se pojedinačno pregovaralo (čl. 53. st. 4.)?", answer: "Na trgovcu koji tvrdi da se o odredbi iz unaprijed formuliranog standardnog ugovora pojedinačno pregovaralo.", explanation: "Klauzula „o svemu se pregovaralo” ne dokazuje pregovaranje.", id: "20c012" },
      { question: "Što je pojedinačno pregovaranje o dijelu ugovora (čl. 53. st. 3.)?", answer: "Pregovaranje o pojedinim odredbama ne sprječava ocjenu ostalih odredbi kao nepoštenih ako cjelokupna ocjena pokazuje da je riječ o unaprijed formuliranom standardnom ugovoru trgovca.", explanation: "Cjelovit pogled na ugovor.", id: "20c013" },
      { question: "Na kojoj se ideji temelji sustav zaštite iz Direktive 93/13 (Kušionová)?", answer: "Potrošač je podređen prodavatelju u pregovaračkoj moći i informiranosti, pa pristaje na uvjete koje je sastavio prodavatelj bez mogućnosti utjecaja.", explanation: "Presuda C-34/13, st. 48.", id: "20c014" },
      { question: "Što je dobra vjera (savjesnost i poštenje) prema recitalu 16. Direktive 93/13?", answer: "Pozornost jačini pregovaračkih strana, je li potrošač naveden da prihvati odredbu i je li roba prodana po posebnoj narudžbi; trgovac je u dobroj vjeri ako postupa pošteno prema legitimnim interesima.", explanation: "Kriteriji ocjene dobre vjere.", id: "20c015" },
      { question: "Kako je VTS RH tumačio savjesnost i poštenje?", answer: "Autor općih uvjeta poštuje kriterij ako postupa pošteno i pravično i uzima u obzir legitimne interese druge strane; sud procjenjuje interese, pregovaračke pozicije i prinudu.", explanation: "Rješenje Pž. 3670/04-3 iz 2006.", id: "20c016" },
      { question: "Kakav je odnos između izostanka dobre vjere i znatne neravnoteže prema smjernicama Komisije iz 2019.?", answer: "Izričaj čl. 3. st. 1. i recitala 16. sugerira da je izostanak dobre vjere povezan sa znatnom neravnotežom uzrokovanom ugovornom odredbom.", explanation: "Sud EU-a odnos nije izričito objasnio.", id: "20c017" },
      { question: "Što je znatna neravnoteža prema predmetu Constructora Principado?", answer: "Ne traži se znatan ekonomski utjecaj prema iznosu transakcije; dovoljno je da odredba ozbiljno šteti pravnom položaju potrošača ograničenjem njegovih prava ili nametanjem dodatne obveze.", explanation: "Presuda C-226/12, st. 23.; pravna neravnoteža je dovoljna.", id: "20c018" },
      { question: "Koje su činjenice predmeta Constructora Principado?", answer: "Odredba kupoprodaje stana prema kojoj kupac snosi gradski porez na povećanje vrijednosti nekretnine i troškove komunalnih usluga, iako po zakonu plaća prodavatelj.", explanation: "Kupac tražio utvrđenje nepoštenosti odredbe.", id: "20c019" },
      { question: "Koje okolnosti se uzimaju pri ocjeni nepoštenosti (čl. 55. st. 2. ZZP-a)?", answer: "Priroda proizvoda, sve okolnosti prije i pri sklapanju ugovora, ostale odredbe i drugi povezani glavni ugovor; ZOO dodatno pravnu narav ugovora.", explanation: "Čl. 296. st. 2. ZOO-a.", id: "20c020" }
    ],
    quiz: [
      {
        question: "Direktiva 93/13/EEZ primjenjuje se na ugovore između:",
        options: [
          "prodavatelja robe ili pružatelja usluga i potrošača",
          "fizičkih i pravnih osoba bez obzira na svojstvo",
          "poslovnih subjekata u prekograničnim transakcijama",
          "poslodavaca i radnika u okviru ugovora o radu"
        ],
        correct: 0, id: "20q001"
      },
      {
        question: "Iz polja primjene Direktive 93/13/EEZ izuzeti su ugovori:",
        options: [
          "o kupoprodaji stana u stambenoj zgradi",
          "o zapošljavanju i nasljednim pravima",
          "o potrošačkom kreditu sa stambenom namjenom",
          "o pružanju telekomunikacijskih usluga"
        ],
        correct: 1, id: "20q002"
      },
      {
        question: "U odnosu ZOO-a i ZZP-a o nepoštenim odredbama primjenjuje se pravilo da:",
        options: [
          "opći propis ima prednost pred posebnim zbog starije odredbe",
          "propis koji je povoljniji za trgovca ima prednost",
          "ZZP kao posebni propis ima prednost pred ZOO-om kao općim",
          "nadležni sud bira propis koji primjenjuje po slobodnoj ocjeni"
        ],
        correct: 2, id: "20q003"
      },
      {
        question: "U predmetu Pouvin i Dijoux zajmoprimci su smatrani potrošačima jer su kredit:",
        options: [
          "dobili od banke radi financiranja poslovnog prostora",
          "ugovorili u okviru svoje profesionalne djelatnosti",
          "sklopili u vezi s društvom čiji su dioničari",
          "namijenili stjecanju nekretnine u privatne svrhe"
        ],
        correct: 3, id: "20q004"
      },
      {
        question: "Direktiva 93/13/EEZ primjenjuje se na standardizirane ugovore o pravnim uslugama kad je klijent:",
        options: [
          "fizička osoba koja ne postupa s ciljem povezanim s profesijom",
          "pravna osoba koja je naručila uslugu u poslovne svrhe",
          "odvjetnik koji koristi usluge drugog odvjetnika",
          "društvo kojemu odvjetnik pruža stalnu pravnu pomoć"
        ],
        correct: 0, id: "20q005"
      },
      {
        question: "Koji uvjet NIJE dio testa nepoštenosti prema čl. 53. st. 1. ZZP-a?",
        options: [
          "o odredbi se nije pojedinačno pregovaralo",
          "odredba nije bila vidljivo istaknuta u ugovoru",
          "odredba je suprotna načelu savjesnosti i poštenja",
          "odredba uzrokuje znatnu neravnotežu na štetu potrošača"
        ],
        correct: 1, id: "20q006"
      },
      {
        question: "Za trgovca koji tvrdi da se o odredbi iz standardnog ugovora pojedinačno pregovaralo vrijedi da:",
        options: [
          "potrošač mora dokazati da pregovora nije bilo",
          "sud to utvrđuje po službenoj dužnosti uz vještačenje",
          "mora to dokazati trgovac",
          "se pregovaranje pretpostavlja ako je potrošač potpisao ugovor"
        ],
        correct: 2, id: "20q007"
      },
      {
        question: "Prema Constructora Principado znatna neravnoteža može postojati kad odredba:",
        options: [
          "ima znatan ekonomski učinak u odnosu na ukupnu vrijednost cijelog ugovora o kupoprodaji",
          "je ugovorena uz cijenu nižu od tržišne",
          "isključuje potrošača iz sustava izvansudskog rješavanja sporova",
          "ozbiljno šteti pravnom položaju potrošača i bez znatnog ekonomskog učinka"
        ],
        correct: 3, id: "20q008"
      },
      {
        question: "Predmet Constructora Principado odnosio se na odredbu kojom kupac stana snosi:",
        options: [
          "porez i komunalne troškove koje po zakonu plaća prodavatelj",
          "troškove gradnje stana koji prelaze ugovorenu cijenu radova",
          "naknadu za upis vlasništva u zemljišne knjige i javnobilježničke pristojbe",
          "troškove osiguranja stana tijekom izgradnje do primopredaje"
        ],
        correct: 0, id: "20q009"
      },
      {
        question: "Savjesnost i poštenje u ocjeni odredbe prema recitalu 16. Direktive uključuje pitanje:",
        options: [
          "je li ugovor sklopljen u pisanom obliku",
          "je li potrošač bio naveden da prihvati odredbu",
          "je li ugovor sklopljen izvan poslovnih prostorija",
          "je li trgovac pravna ili fizička osoba"
        ],
        correct: 1, id: "20q010"
      },
      {
        question: "Čl. 296. st. 1. ZOO-a o općim uvjetima ugovora, umjesto testa znatne neravnoteže iz Direktive, traži:",
        options: [
          "očiglednu neravnopravnost ili ugrožavanje svrhe ugovora",
          "da je o odredbi pojedinačno pregovarano",
          "da je potrošač fizička osoba koja djeluje izvan djelatnosti",
          "da je odredba objavljena u službenom glasilu"
        ],
        correct: 0, id: "20q011"
      },
      {
        question: "Cilj Direktive 93/13/EEZ je da se svaka nepoštena odredba o kojoj se nije pojedinačno pregovaralo:",
        options: [
          "automatski briše iz ugovora u državama članicama Unije",
          "ocjenjuje u postupku pred Sudom EU-a umjesto pred nacionalnim sudovima",
          "može podvrgnuti ispitivanju radi zaštite potrošača kao slabije strane",
          "smatra valjanom ako je potrošač potpisao ugovor"
        ],
        correct: 2, id: "20q012"
      },
      {
        question: "Prema Kušionovoj potrošač je u odnosu na prodavatelja podređen u:",
        options: [
          "pregovaračkoj moći i razini informiranosti",
          "poreznom položaju i pravu na zastupanje",
          "pravu na izbor suda i jezika postupka",
          "mogućnosti odustajanja od ugovora i naknade štete"
        ],
        correct: 0, id: "20q013"
      },
      {
        question: "Prema smjernicama Komisije iz 2019. izostanak dobre vjere povezan je sa:",
        options: [
          "ekonomskom težinom troška za potrošača",
          "znatnom neravnotežom koju uzrokuje odredba",
          "formom ugovora u pisanom obliku",
          "prekograničnim obilježjem ugovora"
        ],
        correct: 1, id: "20q014"
      }
    ],
    fillBlanks: [
      { sentence: "Nepoštenost ugovorne odredbe u potrošačkom pravu ima posljedicu _______ odredbe.", answer: "ništetnosti", hint: "pravna sankcija koja djeluje od početka", id: "20f001" },
      { sentence: "Prema testu nepoštenosti o odredbi se nije _______ pregovaralo.", answer: "pojedinačno", hint: "za svaku odredbu zasebno", id: "20f002" },
      { sentence: "Opći uvjeti ugovora u ZOO-u uređeni su kao opći propis, a ZZP je prema njemu _______.", answer: "posebni", hint: "suprotno od općeg", id: "20f003" },
      { sentence: "Neravnoteža koja proizlazi iz ograničenja prava potrošača naziva se _______ neravnoteža.", answer: "pravna", hint: "dovoljna prema Constructora Principado", id: "20f004" },
      { sentence: "Dobra vjera u ugovornom pravu izražava se kao načelo savjesnosti i _______.", answer: "poštenja", hint: "ćudoredna vrlina u postupanju", id: "20f005" },
      { sentence: "Prema presudi Constructora Principado, za znatnu neravnotežu nije nužno da odredba ima značajan _______ utjecaj na potrošača.", answer: "ekonomski", hint: "Čl. 3. st. 1. Direktive 93/13 (C-226/12)", id: "20f006" },
      { sentence: "Predmet o standardiziranim ugovorima s odvjetnikom nosi naziv _______.", answer: "Šiba", hint: "litavski predmet iz 2015.", id: "20f007" },
      { sentence: "Potrošač se u praksi poziva na opće uvjete koje nikada nije _______.", answer: "vidio", hint: "osjetilo oka", id: "20f008" },
      { sentence: "ZOO ocjenjuje ništetnost općih uvjeta, a ZZP nepoštenost odredbi ugovora u _______.", answer: "cijelosti", hint: "sve odredbe zajedno", id: "20f009" },
      { sentence: "Pregovaranje o pojedinim odredbama ne sprječava ocjenu ostalih ako je riječ o unaprijed formuliranom standardnom _______ trgovca.", answer: "ugovoru", hint: "pravni posao", id: "20f010" },
      { sentence: "VTS je naglasio da autor općih uvjeta mora uzimati u obzir legitimne interese druge _______.", answer: "strane", hint: "ugovornik na drugom kraju", id: "20f011" },
      { sentence: "Pri ocjeni nepoštenosti uzima se u obzir i priroda proizvoda ili usluge koji su predmet _______.", answer: "ugovora", hint: "pravnog posla", id: "20f012" }
    ],
    learn: {
      title: "Nepoštene ugovorne odredbe: pojam, područje primjene i test nepoštenosti",
      content: `
<h3>Problemi u praksi</h3>
<p>Unaprijed formulirani standardizirani ugovori često sadrže: potvrdu da potrošač preuzima opće uvjete, uvjete korištenja usluga, cjenik i kodekse s mrežne stranice (<em>upućivanje na opće uvjete koje potrošač nije vidio</em>); široku privolu pretplatnika da operator obrađuje i upisuje osobne podatke (uključujući matični broj i OIB) za vlastite evidencije te ih prosljeđuje financijskim institucijama, bankama, agencijama za naplatu i društvima za provjeru kreditne sposobnosti; privolu za marketinške kontakte (slanje ponuda i istraživanje tržišta mobitelom, e-poštom i poštom) u općim uvjetima kartice vjernosti trgovačkog lanca; i bankinu mogućnost da osobne podatke proslijedi „pouzdanim poslovnim partnerima” za statističke analize, korisničku potporu i slične potrebe.</p>
<p>Prema ustaljenoj praksi Suda EU-a cilj <strong>Direktive 93/13/EEZ</strong> je obvezati države članice da propišu mehanizam kojim se svaka eventualno nepoštena ugovorna odredba o kojoj se nije pojedinačno pregovaralo može ispitati radi zaštite potrošača, koji je u slabijem položaju prema poslovnom subjektu u pregovaračkoj snazi i obaviještenosti.</p>

<h3>Nepoštene odredbe u hrvatskom pravu</h3>
<table>
<tr><th>Zakon o obveznim odnosima</th><th>Zakon o zaštiti potrošača</th></tr>
<tr><td><strong>opći propis</strong>, opći uvjeti ugovora (čl. 295.–296.)</td><td><strong>posebni propis</strong>, nepoštene odredbe u potrošačkim ugovorima (ZZP 2022.: čl. 53.–59.)</td></tr>
<tr><td>svi ugovori</td><td>ugovori u potrošačkim odnosima (B2C)</td></tr>
<tr><td>ocjena ništetnosti <em>općih uvjeta</em> ugovora</td><td>ocjena nepoštenosti <em>odredbi ugovora u cijelosti</em></td></tr>
</table>
<p>Odnos: <em>lex specialis derogat legi generali</em> – ZZP kao posebni propis ima prednost pred ZOO-om. Posebniji propisi: npr. Zakon o elektroničkim komunikacijama i pravilnik o obavljanju djelatnosti elektroničkih komunikacijskih mreža i usluga.</p>
<p><strong>Čl. 295. st. 1. ZOO-a:</strong> opći uvjeti ugovora su ugovorne odredbe sastavljene za veći broj ugovora koje jedna strana (sastavljač) prije ili pri sklapanju ugovora predlaže drugoj, bilo da su sadržane u formularnom (tipskom) ugovoru bilo da se na njih ugovor poziva. Obvezuju ako su bili poznati ili morali biti poznati pri sklapanju (st. 5.); u slučaju neslaganja s posebnim pogodbama vrijede posebne pogodbe (st. 3.).</p>
<p><strong>Napomena o izmjeni:</strong> u ranijem tekstu Zakona (ZZP 2014.) nepoštene odredbe bile su uređene u čl. 49.–56.; danas su u čl. 53.–59. ZZP-a (NN 19/22, 59/23, 59/26): čl. 53. test nepoštenosti, čl. 54. odredbe koje se mogu smatrati nepoštenima, čl. 55. utvrđivanje i ocjena, čl. 56. nedopuštenost ocjene, čl. 57. odredbe u pisanom obliku, čl. 58. tumačenje, čl. 59. posljedice. Tekst: https://narodne-novine.nn.hr/clanci/sluzbeni/2022_02_19_203.html. Čl. 295. i 296. ZOO-a provjereni su prema pročišćenom tekstu na https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima. Direktivu 93/13/EEZ izmijenila je Direktiva (EU) 2019/2161 (Omnibus).</p>

<h3>Polje primjene Direktive 93/13/EEZ</h3>
<p><strong>Čl. 1.:</strong> svrha je uskladiti zakone i druge propise država članica o nepoštenim odredbama u ugovorima između prodavatelja robe ili pružatelja usluga i potrošača; propisi se primjenjuju na sve takve ugovore (recital 10.). <strong>Izuzeti</strong> su: ugovori o zapošljavanju, ugovori o nasljednim pravima, ugovori o pravima iz obiteljskog prava te ugovori o osnivanju i organizaciji trgovačkih društava i ugovori o partnerstvu (recital 10.). Pojmovi potrošača i trgovca: ZZP, čl. 4. t. 28. i 47. (ranije čl. 5. t. 15. i 26.; prema tekstu NN 19/22 t. 21. i 34., prije prenumeracije izmjenom NN 59/26).</p>
<ul>
<li><strong>Pouvin i Dijoux (C-590/17, 2019.):</strong> poslodavac je zaposleniku i njegovu bračnom drugu odobrio zajam za stjecanje nekretnine u kojoj će stanovati (glavnica 57.625,73 eura, deset godina otplate); ugovor je predviđao automatski raskid i dospijeće glavnice ako zajmoprimac prestane biti zaposlenik. Sud EU-a: zaposlenik i bračni drug koji s poslodavcem sklope ugovor o kreditu čije je sklapanje načelno ograničeno na članove osoblja, a namijenjen je financiranju stjecanja nekretnine u privatne svrhe, <strong>potrošači</strong> su u smislu čl. 2. t. b Direktive; široko tumačenje pojma „prodavatelj robe ili pružatelj usluge” služi cilju zaštite potrošača kao slabije strane i uspostavi ravnoteže (<em>Sziber</em>, C-483/16).</li>
<li><strong>Šiba (C-537/13, 2015., st. 36.):</strong> osoba je s odvjetnikom sklopila tri unaprijed sastavljena standardizirana ugovora o pravnim uslugama za brakorazvodnu parnicu, a naknada nije bila određena. Sud EU-a: Direktiva se primjenjuje na standardizirane ugovore o pravnim uslugama sklopljene između odvjetnika i fizičke osobe koja ne postupa s ciljem povezanim s njezinom profesionalnom djelatnošću.</li>
</ul>

<h3>Test (ne)poštenosti – čl. 53. ZZP-a (čl. 296. st. 1. ZOO-a)</h3>
<p>Ugovorna odredba o kojoj se nije pojedinačno pregovaralo smatra se nepoštenom ako, <strong>suprotno načelu savjesnosti i poštenja</strong>, uzrokuje <strong>znatnu neravnotežu u pravima i obvezama</strong> ugovornih strana na štetu potrošača. Dakle kumulativno: (1) nepostojanje pojedinačnog pregovaranja; (2) suprotnost načelu savjesnosti i poštenja; (3) znatna neravnoteža na štetu potrošača. <strong>ZOO</strong> umjesto toga traži <em>očiglednu neravnopravnost</em> u pravima i obvezama na štetu suugovaratelja sastavljača općih uvjeta <em>ili ugrožavanje postizanja svrhe</em> ugovora. <strong>Nepoštenost = ništetnost</strong> odredbe.</p>
<h3>Nepostojanje pojedinačnog pregovaranja</h3>
<ul>
<li><strong>Čl. 53. st. 2.:</strong> smatra se da se o odredbi nije pojedinačno pregovaralo ako ju je unaprijed formulirao trgovac pa potrošač nije imao utjecaja na njezin sadržaj, osobito kad je riječ o odredbi unaprijed formuliranog standardnog ugovora.</li>
<li><strong>Čl. 53. st. 3.:</strong> pregovaranje o pojedinim aspektima odredbe ili o pojedinoj odredbi ne utječe na mogućnost da se ostale odredbe ocijene nepoštenima ako cjelokupna ocjena pokazuje da je riječ o unaprijed formuliranom standardnom ugovoru trgovca.</li>
<li><strong>Čl. 53. st. 4.:</strong> ako trgovac tvrdi da se o odredbi pojedinačno pregovaralo, <strong>dužan je to dokazati</strong>. (Primjer iz prakse: klauzula „potpisom ovog zahtjeva pretplatnik izjavljuje da je zahtjev ispunjen u skladu s njegovim željama i da se o svakoj odredbi pregovaralo” ne dokazuje pregovaranje.)</li>
<li>Čl. 296. st. 1. ZOO-a isključuje mogućnost pojedinačnog pregovaranja već definicijom općih uvjeta ugovora iz čl. 295. st. 1.</li>
<li><strong>Kušionová (C-34/13, 2014., st. 48.):</strong> sustav zaštite temelji se na ideji da je potrošač podređen prodavatelju u pregovaračkoj moći i informiranosti, što ga navodi da pristane na uvjete koje je prodavatelj ranije sastavio, a na koje nema utjecaja.</li>
</ul>
<h3>Suprotnost načelu savjesnosti i poštenja</h3>
<p><strong>Recital 16. Direktive 93/13/EEZ:</strong> pri ocjeni dobre vjere posebnu pozornost treba posvetiti jačini polazišta pregovaračkih strana, je li potrošač bio naveden da prihvati odredbu i je li roba ili usluga prodana ili pružena na temelju posebne narudžbe potrošača; prodavatelj ili pružatelj usluga može ispunjavati uvjet dobre vjere ako postupa pošteno i pravedno prema drugoj strani o čijim zakonitim interesima mora voditi računa. <strong>Visoki trgovački sud RH (2006.):</strong> smatra se da je autor općih uvjeta poštivao kriterij ako je uvijek postupao pošteno i pravično i uzimao u obzir legitimne interese druge strane; sud uzima u obzir sve interese, procjenjuje pregovaračke pozicije i snagu stranaka i utvrđuje je li jedna strana bila prinuđena sklopiti ugovor. Općinski sud u Osijeku (2015.): ugovor protivan savjesnosti i poštenju protivan je i moralu društva, jer moralne norme pretpostavljaju savjesno postupanje i zaštitu interesa obje strane. <strong>Smjernice Europske komisije (2019.):</strong> iako Sud EU-a nije objasnio odnos ovih dvaju kriterija, čl. 3. st. 1. i recital 16. sugeriraju da je izostanak dobre vjere povezan sa znatnom neravnotežom uzrokovanom odredbom.</p>
<h3>Znatna neravnoteža u pravima i obvezama</h3>
<p>Čl. 53. st. 1. ZZP: znatna neravnoteža na štetu potrošača; čl. 296. st. 1. ZOO: očigledna neravnopravnost na štetu suugovaratelja sastavljača. Direktiva, ZZP i ZOO ne sadrže kriterije za ocjenu neravnoteže. <strong>Constructora Principado (C-226/12, 2014., st. 23.):</strong> kupac je sklopio ugovor o kupoprodaji stana s odredbom prema kojoj snosi gradski porez na povećanje vrijednosti nekretnina (uzet u obzir pri određivanju cijene) i troškove komunalnih usluga čak i kad je prodavatelj platio predujam (ukupno 1.223,87 eura, od čega 1.000 eura porez); odredba je bila suprotna nacionalnom pravu. Sud EU-a: <em>znatna neravnoteža</em> ne zahtijeva nužno da troškovi koje odredba stavlja na teret potrošača imaju značajan ekonomski utjecaj u odnosu na iznos transakcije, nego može proizlaziti iz same činjenice da se dovoljno ozbiljno šteti pravnom položaju u koji je prema nacionalnim odredbama stavljen potrošač – ograničenjem sadržaja prava ili njihova korištenja ili nametanjem dodatne obveze koju nacionalna pravila ne predviđaju. Dovoljna je <strong>pravna neravnoteža</strong>, ekonomska nije nužna.</p>
<p><strong>Dodatni kriteriji (čl. 55. st. 2. ZZP-a; čl. 296. st. 2. ZOO-a):</strong> priroda proizvoda ili usluge koji su predmet ugovora, sve okolnosti prije i pri sklapanju ugovora, ostale ugovorne odredbe i neki drugi ugovor koji prema ugovoru koji se ocjenjuje predstavlja glavni ugovor; ZOO dodatno <em>pravnu narav ugovora</em>. Sud EU-a (st. 31.): nacionalni sud mora voditi računa o prirodi robe ili usluge, svim okolnostima sklapanja i svim drugim odredbama ugovora.</p>
`,
      id: "20l000"
    },
    id: "20k000"
  },
  nepostenePosljedice: {
    name: "Nepoštene odredbe: iznimke, transparentnost, siva lista i posljedice",
    icon: "fa-list-check",
    color: "#6366f1",
    flashcards: [
      { question: "Koje odredbe su isključene iz testa nepoštenosti?", answer: "Pojedinačno pregovarane odredbe, jasne i lako razumljive odredbe o predmetu ugovora i primjerenosti cijene te odredbe koje preuzimaju sadržaj važećih propisa.", explanation: "Čl. 53. st. 5. i čl. 56. ZZP-a; čl. 296. st. 3. ZOO-a.", id: "21c001" },
      { question: "Što propisuje čl. 53. st. 5. ZZP-a o zakonskim odredbama u ugovoru?", answer: "Odredbe o nepoštenosti ne primjenjuju se na ugovorne odredbe kojima se unose zakonske odredbe prisilne prirode ili odredbe i načela konvencija koje obvezuju RH.", explanation: "Slično: čl. 296. st. 3. ZOO-a, sadržaj iz važećih propisa.", id: "21c002" },
      { question: "Kada nije dopušteno ocjenjivati poštenost odredbi o predmetu ugovora i cijeni (čl. 56. ZZP-a)?", answer: "Ako su te odredbe jasne, lako razumljive i uočljive.", explanation: "Zahtjev transparentnosti.", id: "21c003" },
      { question: "Što određuje čl. 57. ZZP-a o pisanom obliku ugovora?", answer: "Ako zakon ili sporazum stranaka traži pisani oblik, odredbe moraju biti napisane jasno i razumljivo te lako uočljive.", explanation: "Dio zahtjeva transparentnosti.", id: "21c004" },
      { question: "Što je pravilo contra proferentem (čl. 58. st. 1. ZZP-a)?", answer: "Dvojbene ili nerazumljive ugovorne odredbe tumače se u smislu koji je povoljniji za potrošača.", explanation: "Čl. 58. st. 2.: ne vrijedi u postupcima iz čl. 114. ZZP-a; ti su članci prestali važiti 25. 6. 2023.", id: "21c005" },
      { question: "Što je Sud EU-a odlučio u predmetu Kásler o zahtjevu transparentnosti?", answer: "Zahtjev iz čl. 4. st. 2. ima isti opseg kao čl. 5. Direktive i ne smije se ograničiti na razumljivost na formalnoj i gramatičkoj razini.", explanation: "Presuda C-26/13, st. 69. i 71.", id: "21c006" },
      { question: "Što prema Van Hove znači jasno i razumljivo sastavljena odredba?", answer: "Potrošaču je gramatički razumljiva i ugovor razvidno izlaže funkcioniranje mehanizma i njegov odnos s drugim odredbama, pa može procijeniti ekonomske posljedice.", explanation: "Presuda C-96/14, st. 51.", id: "21c007" },
      { question: "Što je Sud EU-a rekao u predmetu Verein für Konsumenteninformation?", answer: "Nepoštena narav odredbe može proizlaziti iz formulacije koja ne udovoljava zahtjevu jasnoće i razumljivosti iz čl. 5. Direktive 93/13.", explanation: "Presuda C-191/15, st. 68.", id: "21c008" },
      { question: "Što mora transparentna odredba prema praksi Suda EU-a?", answer: "Utvrditi razloge i posebnosti ugovorenog mehanizma, njegov odnos prema drugim odredbama i omogućiti potrošaču procjenu ekonomskih posljedica prema preciznim, jasnim kriterijima.", explanation: "Invitel, RWE Vertrieb, Van Hove, Bucura, Kásler, Andriciuc.", id: "21c009" },
      { question: "Što je predmet Franak?", answer: "Kolektivna zaštita potrošača zbog nepoštenosti odredbi o promjenjivoj kamatnoj stopi i valutne klauzule u kreditima u švicarskim francima.", explanation: "Zahtjev transparentnosti ocjenjivan kod kamate i valutne klauzule.", id: "21c010" },
      { question: "Što je Vrhovni sud RH (2015.) argumentirao o transparentnosti valutne klauzule?", answer: "Prepoznatljivost valutne klauzule kao općeprihvaćenog instituta u društvu, a ne sadržajnu razumljivost odredbe; time je odstupio od praksi Suda EU-a.", explanation: "Presuda i rješenje Revt 249/14-2.", id: "21c011" },
      { question: "Što je VTS RH 2018. utvrdio o predugovornim informacijama banaka?", answer: "Propuštanje odgovarajućih informacija u predugovornoj fazi čini pisane odredbe nerazumljivima pa treba utvrditi jesu li banke dale točne, jasne i razumljive kriterije, u duhu prava EU-a.", explanation: "VSRH Rev-2221/2018-11 (3. 9. 2019.): banke potrošače nisu potpuno informirale o valutnoj klauzuli u CHF.", id: "21c012" },
      { question: "Što je siva lista nepoštenih odredbi (čl. 54. ZZP-a)?", answer: "Popis odredbi koje bi se mogle smatrati nepoštenima uz ispunjenje pretpostavki iz čl. 53.; primjerovan je i otvoren, odredba s popisa nije nužno nepoštena i obrnuto.", explanation: "Commission v. Sweden, C-478/99, st. 20.", id: "21c013" },
      { question: "Navedite primjere odredbi sa sive liste o odgovornosti i naknadi štete.", answer: "Isključenje odgovornosti za smrt ili ozljedu, trgovac zadržava plaćeno a potrošač nema isto pravo, previsoka naknada štete, raskid samo u korist trgovca, zadržavanje plaćenog za neizvršene usluge.", explanation: "Čl. 54. t. 1., 4., 5., 6. i 7.", id: "21c014" },
      { question: "Navedite primjere odredbi sa sive liste o izmjenama ugovora i pravnoj zaštiti.", answer: "Obveze s kojima se potrošač nije mogao upoznati, jednostrane izmjene odredbi ili obilježja bez valjanog razloga, ograničenje sudske zaštite, nezakonita arbitraža, teret dokaza na potrošaču.", explanation: "Čl. 54. t. 10., 11., 12. i 19.", id: "21c015" },
      { question: "Koji je primjer nepoštene jednostrane izmjene ugovora na portalu Vaša Europa?", answer: "Odredba kojom banka može jednostrano promijeniti kamatu bez mogućnosti da potrošač prije toga raskine ugovor; potrošač može uložiti prigovor.", explanation: "Jednostrane izmjene ugovora.", id: "21c016" },
      { question: "Što je pravna posljedica nepoštenosti odredbe (čl. 59. ZZP-a, čl. 6. Direktive)?", answer: "Nepoštena odredba je ništetna, odnosno ne obvezuje potrošača; ugovor ostaje na snazi ako može opstati bez nje.", explanation: "Nepoštenost utvrđuje sud pravomoćnom presudom (čl. 55. st. 1.).", id: "21c017" },
      { question: "Što je Sud EU-a odlučio u predmetu Océano Grupo?", answer: "Nacionalni sud smije po službenoj dužnosti ocijeniti nepoštenost odredbe jer se učinkovita zaštita potrošača inače ne bi postigla; prorogacijska klauzula u mjestu sjedišta trgovca je nepoštena.", explanation: "Spojeni predmeti C-240/98 do C-244/98, st. 26.", id: "21c018" },
      { question: "Zašto je prorogacijska klauzula u Océano Grupo bila nepoštena?", answer: "Određuje isključivu nadležnost suda udaljenog od prebivališta potrošača, što može odvratiti od pravne zaštite, a povoljna je za trgovca; odgovara odredbi sa sive liste.", explanation: "Isključuje ili ograničava pravo na pravnu zaštitu.", id: "21c019" },
      { question: "Što je Sud EU-a odlučio u predmetu Lintner?", answer: "Nacionalni sud nije obvezan po službenoj dužnosti ispitivati sve ostale odredbe koje potrošač nije osporio, nego samo one povezane s predmetom spora kako su ga odredile stranke.", explanation: "Presuda C-511/17, st. 50.", id: "21c020" },
      { question: "Što je CLAUDETTE?", answer: "Automatizirani sustav Europskog sveučilišnog instituta za otkrivanje potencijalno nepoštenih odredbi u ugovorima.", explanation: "Primjer tehnološke podrške zaštiti potrošača.", id: "21c021" },
      { question: "Što je od 2023. zamijenilo čl. 114.–130. ZZP-a o udružnim tužbama?", answer: "Zakon o predstavničkim tužbama za zaštitu kolektivnih interesa i prava potrošača (NN 59/23); čl. 114.–130. ZZP-a prestali su važiti 25. 6. 2023.", explanation: "Čl. 37. Zakona o predstavničkim tužbama.", id: "21c022" }
    ],
    quiz: [
      {
        question: "Test nepoštenosti NE primjenjuje se na odredbe koje:",
        options: [
          "je trgovac unaprijed formulirao u standardnom ugovoru",
          "su pojedinačno pregovarane s potrošačem",
          "uzrokuju znatnu neravnotežu u pravima potrošača",
          "su suprotne načelu savjesnosti i poštenja"
        ],
        correct: 1, id: "21q001"
      },
      {
        question: "Prema čl. 56. ZZP-a poštenost odredbi o predmetu ugovora i primjerenosti cijene ne ocjenjuje se ako su te odredbe:",
        options: [
          "unaprijed formulirane, ali potrošač ih je potpisao",
          "zakonito određene prema tržišnoj cijeni",
          "jasne, lako razumljive i uočljive",
          "pojedinačno pregovarane s potrošačem"
        ],
        correct: 2, id: "21q002"
      },
      {
        question: "Pravilo contra proferentem znači da se dvojbena odredba tumači:",
        options: [
          "u smislu povoljnijem za sastavljača ugovora",
          "prema namjeri stranaka u trenutku pregovora",
          "u skladu s običajima pojedine gospodarske grane",
          "u smislu povoljnijem za potrošača"
        ],
        correct: 3, id: "21q003"
      },
      {
        question: "Prema Kásleru zahtjev transparentnosti odredbe:",
        options: [
          "ne može se ograničiti na formalnu i gramatičku razumljivost",
          "ispunjen je kad je odredba gramatički razumljiva potrošaču",
          "ne odnosi se na odredbe o glavnom predmetu ugovora",
          "obvezuje trgovca uz izričit zahtjev potrošača"
        ],
        correct: 0, id: "21q004"
      },
      {
        question: "Vrhovni sud RH je valutnu klauzulu ocijenio transparentnom oslanjajući se prije svega na:",
        options: [
          "detaljan opis rizika tečaja u predugovornoj obavijesti banke",
          "njezinu prepoznatljivost kao općeprihvaćenog instituta",
          "mišljenje stručnog vještaka o utjecaju tečaja na anuitet",
          "stajalište Suda EU-a iz presude Kásler i Káslerné Rábai"
        ],
        correct: 1, id: "21q005"
      },
      {
        question: "Za odredbu koja se nalazi na sivoj listi vrijedi da je:",
        options: [
          "automatski ništetna bez ocjene nepoštenosti",
          "nepoštena ako je to prethodno utvrdilo tijelo za zaštitu potrošača u upravnom postupku",
          "nužno nepoštena i zato je odredba izvan liste poštena",
          "moguće nepoštena uz ispunjenje zakonskih pretpostavki kao i odredba izvan liste"
        ],
        correct: 3, id: "21q006"
      },
      {
        question: "Koja je odredba primjer sa sive liste?",
        options: [
          "odredba o plaćanju naknade za dostavu robe",
          "odredba o ugovornoj kazni uz zatezne kamate propisane zakonom i ugovorom",
          "odredba da trgovac jednostrano mijenja ugovor bez valjanog razloga",
          "odredba o načinu plaćanja kreditnom karticom"
        ],
        correct: 2, id: "21q007"
      },
      {
        question: "Posljedica nepoštenosti odredbe prema čl. 59. ZZP-a je da je odredba:",
        options: [
          "pobojna, pa potrošač može tražiti poništenje u roku od godinu dana",
          "valjana, ali se potrošaču dosuđuje sniženje cijene",
          "ništetna, a ugovor ostaje valjan ako može opstati bez nje",
          "ništetna, a ništetan je i cijeli ugovor"
        ],
        correct: 2, id: "21q008"
      },
      {
        question: "U predmetu Océano Grupo Sud EU-a je odlučio da nacionalni sud:",
        options: [
          "može po službenoj dužnosti ocjenjivati nepoštenost odredbe",
          "ocjenjuje nepoštenost tek na zahtjev potrošača u tužbi",
          "mora poništiti ugovor u cjelini kad sadrži nepoštenu odredbu",
          "ne može ocjenjivati odredbe o mjesnoj nadležnosti"
        ],
        correct: 0, id: "21q009"
      },
      {
        question: "Prorogacijska klauzula u predmetu Océano Grupo bila je nepoštena jer je:",
        options: [
          "određivala primjenu stranog prava u sporu s potrošačem iz druge države",
          "isključivala pravo potrošača na žalbu",
          "ugovarala nadležnost suda u mjestu sjedišta trgovca daleko od tuženika",
          "predviđala obvezu plaćanja sudskih pristojbi unaprijed za svakog tuženika"
        ],
        correct: 2, id: "21q010"
      },
      {
        question: "Prema Lintneru sud pred kojim je potrošač osporio pojedine odredbe:",
        options: [
          "ispituje po službenoj dužnosti sve odredbe ugovora",
          "ne smije ispitivati ni osporene odredbe bez prethodne odluke Suda EU-a",
          "ispituje i sve odredbe koje nisu osporene ako su povezane s predmetom spora",
          "predaje ocjenu ostalih odredbi tijelu za zaštitu potrošača"
        ],
        correct: 2, id: "21q011"
      },
      {
        question: "Odredba je prema Van Hove jasno i razumljivo sastavljena kad potrošač može:",
        options: [
          "pročitati ugovor u prijevodu na svoj materinski jezik prije potpisa",
          "dobiti objašnjenje od zaposlenika trgovca ako to zatraži",
          "na temelju točnih kriterija procijeniti ekonomske posljedice mehanizma",
          "razumjeti odredbu bez čitanja ostalih dijelova ugovora"
        ],
        correct: 2, id: "21q012"
      },
      {
        question: "Koja odredba spada na sivu listu iz čl. 54. ZZP-a?",
        options: [
          "pravo potrošača na raskid ugovora u zakonom propisanom roku",
          "ovlast trgovca da samostalno raskine ugovor bez istog prava potrošača",
          "obveza trgovca da vrati plaćeno nakon raskida ugovora",
          "jamstvo proizvođača za ispravnost proizvoda u jamstvenom roku"
        ],
        correct: 1, id: "21q013"
      },
      {
        question: "Koji je zakon od 2023. zamijenio odredbe ZZP-a o udružnim tužbama (čl. 114.–130.)?",
        options: [
          "Zakon o predstavničkim tužbama za zaštitu kolektivnih interesa i prava potrošača",
          "Zakon o zaštiti potrošača u dijelu o kolektivnim sporovima i nagodbama",
          "Zakon o parničnom postupku u dijelu o skupnim tužbama potrošača",
          "Zakon o obveznim odnosima u dijelu o odgovornosti za štetu"
        ],
        correct: 0, id: "21q014"
      }
    ],
    fillBlanks: [
      { sentence: "Latinsko pravilo da se dvojbena odredba tumači protiv sastavljača je contra _______.", answer: "proferentem", hint: "protiv onoga koji je ponudio tekst", id: "21f001" },
      { sentence: "Popis iz čl. 54. ZZP-a naziva se _______ lista nepoštenih odredbi.", answer: "siva", hint: "boja između crne i bijele", id: "21f002" },
      { sentence: "Zahtjev da je odredba jasna i razumljiva naziva se zahtjev _______.", answer: "transparentnosti", hint: "prozirnost ugovorne odredbe", id: "21f003" },
      { sentence: "Predmet o kolektivnoj zaštiti potrošača zbog kredita vezanih uz stranu valutu nosi naziv _______.", answer: "Franak", hint: "valuta kredita", id: "21f004" },
      { sentence: "Nepoštenost odredbe utvrđuje nadležni sud pravomoćnom sudskom _______.", answer: "presudom", hint: "odluka suda", id: "21f005" },
      { sentence: "Nepoštena odredba ne obvezuje potrošača, a ugovor ostaje na snazi ako može _______ bez nje.", answer: "opstati", hint: "nastaviti postojati", id: "21f006" },
      { sentence: "U predmetu o enciklopedijama sporna je bila prorogacijska _______.", answer: "klauzula", hint: "ugovorna odredba o nadležnosti", id: "21f007" },
      { sentence: "Odredba u kojoj trgovac određuje isključivo tumačenje ugovora nalazi se na sivoj _______.", answer: "listi", hint: "imenica ženskog roda u lokativu", id: "21f008" },
      { sentence: "Odredbe o nepoštenosti ne primjenjuju se na odredbe koje u ugovor unose zakonske odredbe prisilne _______.", answer: "prirode", hint: "kogentne naravi", id: "21f009" },
      { sentence: "Ako je pisani oblik ugovora obvezan, odredbe moraju biti jasne, razumljive i lako _______.", answer: "uočljive", hint: "koje se lako zamijete", id: "21f010" },
      { sentence: "Nepoštena narav odredbe može proizlaziti iz formulacije koja ne udovoljava zahtjevu _______ i razumljivosti.", answer: "jasnoće", hint: "ne zbunjuje", id: "21f011" },
      { sentence: "Transparentna odredba omogućuje potrošaču procjenu ekonomskih _______ koje iz nje proizlaze.", answer: "posljedica", hint: "ono što iz mehanizma slijedi za novac potrošača", id: "21f012" },
      { sentence: "VTS je 2018. naglasio da propuštanje informacija u _______ fazi čini odredbe nerazumljivima.", answer: "predugovornoj", hint: "prije sklapanja", id: "21f013" },
      { sentence: "Primjer jednostrane izmjene ugovora na portalu Vaša Europa odnosio se na promjenu _______ u kreditu za automobil.", answer: "kamate", hint: "cijena posuđenog novca", id: "21f014" },
      { sentence: "CLAUDETTE je automatizirani sustav za otkrivanje potencijalno nepoštenih _______.", answer: "odredbi", hint: "dijelovi ugovora", id: "21f015" },
      { sentence: "Prorogacijska klauzula u prodaji enciklopedija ugovarala je nadležnost suda u mjestu sjedišta _______.", answer: "trgovca", hint: "naziv iz ZZP-a za drugu stranu potrošačkog ugovora", id: "21f016" }
    ],
    learn: {
      title: "Nepoštene odredbe: iznimke, transparentnost, siva lista i posljedice",
      content: `
<h3>Iznimke od testa nepoštenosti</h3>
<ul>
<li><strong>Pojedinačno pregovarane odredbe.</strong> Čl. 53. st. 2. ZZP polazi od presumpcije da pojedinačnog pregovaranja nije bilo kod unaprijed formuliranog standardnog ugovora; ZOO (čl. 296. st. 1.) isključuje pregovaranje već definicijom općih uvjeta iz čl. 295. st. 1.</li>
<li><strong>Jasne, lako razumljive i uočljive odredbe o predmetu ugovora i primjerenosti cijene</strong> (čl. 56. ZZP-a; čl. 296. st. 3. ZOO-a).</li>
<li><strong>Odredbe koje preuzimaju sadržaj važećih propisa:</strong> čl. 53. st. 5. ZZP – odredbe ove glave ne primjenjuju se na ugovorne odredbe kojima se u ugovor unose zakonske odredbe prisilne prirode odnosno odredbe i načela konvencija koje obvezuju RH; čl. 296. st. 3. ZOO – ne primjenjuje se na odredbe općih uvjeta čiji je sadržaj preuzet iz važećih propisa.</li>
</ul>

<h3>Zahtjev transparentnosti</h3>
<ul>
<li><strong>Čl. 56. ZZP:</strong> nije dopušteno ocjenjivati jesu li odredbe o predmetu ugovora i primjerenosti cijene poštene ako su jasne, lako razumljive i uočljive.</li>
<li><strong>Čl. 57. ZZP:</strong> ako zakon ili sporazum stranaka traži pisani oblik, odredbe moraju biti napisane jasno i razumljivo i lako uočljive.</li>
<li><strong>Čl. 58. st. 1. ZZP (<em>contra proferentem</em>):</strong> dvojbene ili nerazumljive odredbe tumače se u smislu povoljnijem za potrošača; st. 2. – ne primjenjuje se u postupcima iz čl. 114. ZZP-a (udružne tužbe; v. napomenu o izmjeni na kraju cjeline).</li>
<li>Direktiva 93/13 traži „jasno i razumljivo”, ZZP i ZOO „jasno, (lako) razumljivo i lako uočljivo”.</li>
</ul>
<p><strong>Praksa Suda EU-a (Invitel, RWE Vertrieb, Van Hove, Bucura, Kásler, Andriciuc):</strong></p>
<ul>
<li><strong>Kásler i Káslerné Rábai (C-26/13, 2014., st. 69. i 71.):</strong> zahtjev iz čl. 4. st. 2. Direktive 93/13 ima isti opseg kao zahtjev iz čl. 5.; zahtjev transparentnosti ne može se ograničiti isključivo na razumljivost na formalnoj i gramatičkoj razini.</li>
<li><strong>Van Hove (C-96/14, 2015., st. 51.):</strong> odredba mora biti jasno i razumljivo sastavljena, tj. potrošaču ne samo gramatički razumljiva, nego ugovor mora razvidno izlagati funkcioniranje konkretnog mehanizma te njegov odnos s mehanizmima iz drugih odredaba, tako da potrošač na temelju točnih i razumljivih kriterija može procijeniti ekonomske posljedice.</li>
<li><strong>Verein für Konsumenteninformation (C-191/15, 2016., st. 68.):</strong> nepoštena narav odredbe može proisteći iz formulacije koja ne udovoljava zahtjevu jasnoće i razumljivosti iz čl. 5. Direktive.</li>
</ul>
<p>Transparentna odredba, tj. ugovor, mora: (1) utvrđivati razloge i posebnosti ugovorenog mehanizma odnosno aranžmana; (2) utvrđivati odnos s mehanizmima iz drugih odredaba; (3) omogućiti potrošaču da na temelju preciznih, jasnih i razumljivih kriterija procijeni ekonomske posljedice.</p>
<p><strong>Franak:</strong> niz presuda u postupku kolektivne zaštite potrošača radi utvrđenja nepoštenosti odredbi o promjenjivoj kamatnoj stopi i valutne klauzule u kreditima izraženim ili denominiranim u švicarskim francima. Zahtjev transparentnosti ispravno je tumačen kod promjenjive kamatne stope, ali je kod valutne klauzule domaća praksa odbila primjenu kriterija Suda EU-a pozivom na razlike u činjeničnom supstratu. <strong>Vrhovni sud RH (2015.)</strong> ocijenio je valutnu klauzulu transparentnom jer je institut općeprihvaćen i u svakodnevnoj primjeni i potrošačima „jako dobro poznat”, a ne prema sadržajnoj razumljivosti odredbe – odstupanje od zahtjeva autonomnog i ujednačenog tumačenja pojmova „jasno i razumljivo”. <strong>Visoki trgovački sud RH (2018.)</strong> je, prema tumačenju Suda EU-a u Kásleru i prema odlukama Ustavnog suda (2016.) i Vrhovnog suda (2017.), utvrdio da propuštanje odgovarajućih informacija potrošačima u predugovornoj fazi čini pisane odredbe nerazumljivima, pa treba utvrditi jesu li banke predočile informacije koje sadrže točne, nedvosmislene, jasne i razumljive kriterije, u duhu prava EU-a. Ishod: <strong>Vrhovni sud RH, Rev-2221/2018-11 od 3. 9. 2019.</strong>, odlučujući o reviziji protiv presude VTS-a Pž-6632/2017 od 14. 6. 2018., utvrdio je da banke potrošače nisu potpuno informirale o valutnoj klauzuli u CHF.</p>

<h3>Siva lista (čl. 54. ZZP-a; privitak Direktive 93/13)</h3>
<p>Odredbe koje bi se, uz ispunjenje pretpostavki iz čl. 53., mogle smatrati nepoštenima, među ostalima:</p>
<ol>
<li>ograničenje ili isključenje odgovornosti trgovca za štetu zbog smrti ili tjelesne ozljede potrošača, ako je šteta posljedica štetne radnje trgovca;</li>
<li>isključenje ili ograničenje prava potrošača prema trgovcu u slučaju potpunog ili djelomičnog neispunjenja;</li>
<li>obveza potrošača na ispunjenje, dok je ispunjenje trgovca uvjetovano okolnošću koja ovisi isključivo o njegovoj volji;</li>
<li>trgovac zadržava plaćeno kad potrošač ne sklopi ili ne ispuni ugovor, dok isto pravo nije predviđeno za potrošača;</li>
<li>naknada štete zbog neispunjenja znatno veća od stvarne štete;</li>
<li>ovlast trgovca na raskid prema vlastitoj diskrecijskoj ocjeni, bez istog prava potrošača;</li>
<li>zadržavanje plaćenog za usluge koje još nije obavio pri raskidu;</li>
<li>otkaz ugovora na neodređeno vrijeme bez razumnog otkaznog roka;</li>
<li>automatsko produljenje ugovora na određeno vrijeme ako potrošač ne izjavi da ne želi produljenje (uz prekratak rok);</li>
<li>obveze koje potrošač nije mogao upoznati prije sklapanja ugovora;</li>
<li>jednostrana izmjena ugovornih odredbi bez valjanog, ugovorom predviđenog razloga;</li>
<li>jednostrana izmjena obilježja proizvoda bez valjanog razloga;</li>
<li>cijena utvrđena pri isporuci ili ovlast povećanja cijene (uz uvjete);</li>
<li>pravo trgovca da ocjenjuje je li roba ili usluga u skladu s ugovorom;</li>
<li>isključivo pravo trgovca na tumačenje ugovora;</li>
<li>isključenje odgovornosti za obveze koje je za njega preuzeo zastupnik;</li>
<li>obveza potrošača da ispuni obveze i kad trgovac nije ispunio svoje;</li>
<li>prijenos prava i obveza na treću osobu bez pristanka potrošača, ako je time potrošač u nepovoljnijem položaju;</li>
<li>isključenje, ograničenje ili otežavanje prava potrošača da prava ostvari pred sudom ili drugim tijelom, osobito obvezna arbitraža koju zakon ne predviđa, onemogućavanje dokaza u korist potrošača ili prebacivanje tereta dokaza na potrošača.</li>
</ol>
<p><strong>Commission protiv Švedske (C-478/99, 2002., st. 20.):</strong> privitak sadrži <em>primjerovnu i otvorenu</em> listu odredbi koje se mogu smatrati nepoštenima; odredba s liste ne mora nužno biti nepoštena, a odredba koja nije na listi svejedno može biti nepoštena. Primjer s portala Vaša Europa (jednostrane izmjene ugovora): potrošač je podigao kredit za automobil, a rate su mu nakon osam mjeseci porasle zbog odredbe koja banci dopušta jednostrano promijeniti kamatu a da mu ne omogući raskid; savjet udruge: ne plaćati višu kamatu nego uložiti službeni prigovor – uspio je izmijeniti odredbu.</p>

<h3>Pravne posljedice nepoštenosti</h3>
<p><strong>Čl. 6. st. 1. Direktive 93/13/EEZ:</strong> države propisuju da nepoštene odredbe nisu obvezujuće za potrošača, a da ugovor i dalje obvezuje stranke ako može nastaviti važiti bez njih. <strong>Čl. 59. ZZP:</strong> (1) nepoštena ugovorna odredba je <strong>ništetna</strong>; (2) ništetnost pojedine odredbe ne povlači ništetnost ugovora ako on može opstati bez nje. Nepoštenost utvrđuje nadležni sud <strong>pravomoćnom presudom</strong> (čl. 55. st. 1.).</p>
<h3>Ocjena po službenoj dužnosti</h3>
<ul>
<li><strong>Océano Grupo Editorial i Salvat Editores (spojeni predmeti C-240/98 do C-244/98, 2000., st. 26.):</strong> prodavači enciklopedija na obroke tužili su neplatiše pred sudom u Barceloni; prorogacijska klauzula određivala je nadležnost suda u mjestu sjedišta trgovca, gdje nijedan tuženik nije imao prebivalište. Sud EU-a: klauzula je nepoštena (nije pregovarana, isključiva nadležnost suda udaljenog od prebivališta tuženika može odvratiti od pravne zaštite – odgovara odredbi sa sive liste koja isključuje ili ograničava pravo na pravnu zaštitu; povoljna je za trgovca). Cilj čl. 6. Direktive ne bi se postigao kad bi potrošač sam morao isticati nepoštenost; učinkovita zaštita može se postići samo ako sud može takve klauzule ocjenjivati <strong>po službenoj dužnosti</strong>.</li>
<li><strong>Lintner (C-511/17, 2020., st. 50.):</strong> sud pred kojim je potrošač tužbom zatražio utvrđenje nepoštenosti određenih odredaba nije obvezan pojedinačno i po službenoj dužnosti ispitivati sve ostale odredbe koje potrošač nije osporio; ispituje samo odredbe povezane s predmetom spora kako su ga odredile stranke, čim raspolaže potrebnim pravnim i činjeničnim elementima, uz, prema potrebi, izvođenje dokaza.</li>
</ul>
<p><strong>CLAUDETTE</strong> je automatizirani sustav Europskog sveučilišnog instituta za otkrivanje potencijalno nepoštenih odredbi.</p>
<p><strong>Napomena o izmjeni:</strong> čl. 114.–130. ZZP-a (udružne tužbe) prestali su važiti 25. 6. 2023. (čl. 37. Zakona o predstavničkim tužbama za zaštitu kolektivnih interesa i prava potrošača, NN 59/23). Upućivanje na čl. 114. ostalo je u čl. 58. st. 2. ZZP-a, ali takve postupke danas uređuje taj zakon.</p>
`,
      id: "21l000"
    },
    id: "21k000"
  },
};

if (typeof window !== 'undefined') { window.ep2PfriM2 = ep2PfriM2; }
if (typeof module !== 'undefined' && module.exports) { module.exports = ep2PfriM2; }
