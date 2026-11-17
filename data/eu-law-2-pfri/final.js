// Europsko pravo II (PFRI) — Final (cijelo gradivo)
// Spaja M1 + M2 + examPractice. MORA se učitati POSLIJE midterm-1/2.

const ep2PfriFinalExamPractice = {
  name: "Ponavljanje kroz cijelo gradivo",
  icon: "fa-graduation-cap",
  color: "#6366f1",
  flashcards: [
    { question: "Kada pojedinac umjesto pozivanja na direktivu može tražiti naknadu štete od države?", answer: "Kad direktiva nema izravan učinak i ne može se postići usklađenim tumačenjem; uvjeti: prava pojedincima, dovoljna preciznost i uzročna veza (Francovich).", explanation: "Odgovornost države nadomješta manjkav izravni učinak.", id: "90c001" },
    { question: "Koja tri mehanizma štite pojedinca kad država nije uredno preuzela direktivu?", answer: "Sukladno tumačenje nacionalnog prava, vertikalni izravni učinak prema državi i naknada štete od države članice.", explanation: "Redoslijed primjene ovisi o prirodi spora.", id: "90c002" },
    { question: "Može li se pojedinac pozvati na odredbu direktive protiv drugog pojedinca?", answer: "Ne izravno (nema horizontalnog izravnog učinka); ali sud mora nacionalno pravo tumačiti usklađeno, a šteta se može tražiti od države.", explanation: "Faccini Dori; opći dio gradiva.", id: "90c003" },
    { question: "Kako se kroz potrošačke direktive mijenja intenzitet harmonizacije?", answer: "Starije su minimalne (npr. o nepoštenim odredbama, o prodaji robe), novije ciljane maksimalne (o pravima potrošača, o kupoprodaji robe); Direktiva o proizvodima maksimalna.", explanation: "Maksimalna ne dopušta strože nacionalne odredbe.", id: "90c004" },
    { question: "Koje pravne osnove i koja pravila nose potrošačko ugovorno pravo EU-a?", answer: "Čl. 114. UFEU-a (usklađivanje radi unutarnjeg tržišta, uz visoku razinu zaštite) i čl. 169. UFEU-a; nadležnost je podijeljena, uz supsidijarnost i proporcionalnost.", explanation: "Direktive donose Parlament i Vijeće redovnim postupkom.", id: "90c005" },
    { question: "Kako se razlikuju kriteriji za potrošača s dvojnom svrhom u presudama Gruber i Costea?", answer: "Gruber traži neznatnu poslovnu svrhu; Direktiva 2011/83 i Costea polaze od toga da poslovna svrha ne smije prevladavati u cjelokupnom kontekstu ugovora.", explanation: "Odvjetnik s kreditom bez naznačene namjene može biti potrošač.", id: "90c006" },
    { question: "Što je zajedničko zaštiti potrošača kod ugovora na daljinu i izvan poslovnih prostorija?", answer: "Predugovorno informiranje (teret dokaza na trgovcu) i pravo na jednostrani raskid bez razloga; obje mjere štite slabiju stranu iznenađenu načinom sklapanja.", explanation: "Poslije toga: potvrda ugovora na trajnom mediju.", id: "90c007" },
    { question: "Kako se računaju rokovi prava na odustanak i povrata u ZZP-u?", answer: "Rok za raskid je 14 dana (kod robe od preuzimanja, kod usluga od sklapanja); bez obavijesti o pravu traje godinu dana duže; povrat novca i robe unutar 14 dana.", explanation: "Čl. 79.–84. ZZP-a.", id: "90c008" },
    { question: "Kada potrošač ne može iskoristiti pravo na raskid, a kada može unatoč otvaranju robe?", answer: "Nema ga kod robe po specifikaciji, pokvarljive ili otpečaćene higijenske robe; ima ga kod madraca s kojeg je skinuta folija jer se ponovno može prodati (slewo).", explanation: "Čl. 86. ZZP-a.", id: "90c009" },
    { question: "Kada je sajamski štand poslovna prostorija, a kada se ugovor smatra sklopljenim izvan prostorija?", answer: "Štand jest ako razuman potrošač opravdano očekuje da trgovac ondje posluje; izvan prostorija je ugovor sklopljen u prisutnosti trgovca izvan njegovih prostora ili na izletu.", explanation: "Verbraucherzentrale Berlin.", id: "90c010" },
    { question: "Što je zajedničko predmetu Content Services i potvrdi ugovora kupljenog putem mrežne trgovine?", answer: "Obavijest mora biti na trajnom mediju koji potrošač može pohraniti; poveznica na mrežnu stranicu nije trajni medij.", explanation: "Potvrda ugovora dostavlja se najkasnije pri isporuci.", id: "90c011" },
    { question: "Kako se kod elektroničkog ugovora određuje trenutak sklapanja i kakvu ulogu ima potvrda primitka?", answer: "Ugovor je sklopljen kad ponuditelj primi poruku s prihvatom; potvrda primitka je deklaratorna i ne utječe na sklapanje, a kod potrošača se ne može isključiti.", explanation: "Čl. 14. i 15. ZET-a.", id: "90c012" },
    { question: "Koje razine elektroničkog potpisa razlikuje eIDAS i koja je pravna razlika među njima?", answer: "Obični, napredan (povezan s potpisnikom, otkriva izmjene) i kvalificirani; samo kvalificirani ima učinak jednak vlastoručnom potpisu, a drugima se ne smije uskratiti dopuštenost kao dokazu.", explanation: "Čl. 25. i 26. Uredbe.", id: "90c013" },
    { question: "Kakva je hijerarhija prava kupca kod materijalnog nedostatka u potrošačkoj kupoprodaji?", answer: "Prvo popravak ili zamjena (besplatno, u razumnom roku, bez znatnih neugodnosti), a tek potom sniženje cijene ili raskid; naknada štete uz svako pravo.", explanation: "ZOO od 1. 1. 2022.", id: "90c014" },
    { question: "Koji se rokovi vežu uz odgovornost prodavatelja za nedostatke?", answer: "Odgovornost dvije godine, obavijest potrošača dva mjeseca od otkrića, predmnijeva postojanja nedostatka jedna godina i gašenje prava dvije godine od obavijesti.", explanation: "Trgovački ugovor: šest mjeseci.", id: "90c015" },
    { question: "Zašto prodavatelj ponekad može odbiti zamjenu i ponuditi popravak?", answer: "Kad je zamjena nemoguća ili neproporcionalno skupa prema popravku, prema vrijednosti robe bez nedostatka, težini nedostatka i neugodnostima za potrošača.", explanation: "Usporedba samo između popravka i zamjene.", id: "90c016" },
    { question: "Čime se razlikuje odgovornost proizvođača od odgovornosti prodavatelja za nedostatke?", answer: "Proizvođač odgovara izvanugovorno (objektivno) za štetu od neispravnog proizvoda; prodavatelj ugovorno za nesukladnost robe s ugovorom.", explanation: "Zahtjevi za istu štetu ne smiju se kumulirati.", id: "90c017" },
    { question: "Kako proizvođač može izbjeći odgovornost i na kome je teret dokaza?", answer: "Dokazom da proizvod nije stavio u promet, da neispravnost vjerojatno nije postojala, razvojnim rizikom i drugim razlozima; teret dokaza je na proizvođaču.", explanation: "Razvojni rizik je opcija koju je ZOO iskoristio.", id: "90c018" },
    { question: "Koji se rokovi i koje pravo vrijede za odgovornost proizvođača danas i od prosinca 2026.?", answer: "Zastara tri godine, gašenje deset godina; Direktiva 2024/2853 zamjenjuje Direktivu 85/374/EEZ i vrijedi za proizvode stavljene na tržište nakon 9. 12. 2026.", explanation: "Nova pravila uključuju softver i otkrivanje dokaza.", id: "90c019" },
    { question: "Čime se razlikuju pretpostavke odgovornosti države u Francovichu, Brasserieu i Köbleru?", answer: "Francovich: nepreuzeta direktiva; Brasserie: dovoljno ozbiljna povreda drugih pravila; Köbler: i odluka suda posljednje instance; sve uz uzročnu vezu.", explanation: "Krivnja je samo pomoćni čimbenik ozbiljnosti.", id: "90c020" },
    { question: "Koja tri elementa čine test nepoštenosti ugovorne odredbe i tko dokazuje pregovaranje?", answer: "Nepostojanje pojedinačnog pregovaranja, suprotnost savjesnosti i poštenju te znatna neravnoteža na štetu potrošača; teret dokaza pregovaranja je na trgovcu.", explanation: "Posljedica: ništetnost odredbe.", id: "90c021" },
    { question: "Što znači da je siva lista nepoštenih odredbi primjerovna i kada se odredba ne ocjenjuje?", answer: "Odredba s liste nije nužno nepoštena, a odredba izvan liste može biti; ne ocjenjuju se jasne odredbe o predmetu i cijeni te pojedinačno pregovarane odredbe.", explanation: "Sud smije ocjenjivati po službenoj dužnosti (Océano).", id: "90c022" },
    { question: "Kako se razlikuju izravna i neizravna diskriminacija i kako se opravdavaju?", answer: "Izravna: postupanje uvjetovano zabranjenom osnovom, opravdava se samo zakonskim iznimkama; neizravna: neutralan kriterij, opravdava se legitimnim ciljem i proporcionalnošću.", explanation: "Feryn i Accept: nije potrebna konkretna žrtva.", id: "90c023" },
    { question: "Kako Unija utječe na pravo vlasništva unatoč čl. 345. UFEU-a?", answer: "Čl. 345. ne izuzima vlasništvo od sloboda i nediskriminacije; vlasništvo štite Povelja i EKLJP, a ograničenje upotrebe je dopušteno uz test proporcionalnosti.", explanation: "Hauer; Essent.", id: "90c024" }
  ],
  quiz: [
    {
      question: "Kad pojedinac ne može primijeniti direktivu protiv privatnog trgovca, a država ju nije preuzela, najčešće mu preostaje:",
      options: [
        "tužba protiv države radi naknade štete zbog nepreuzimanja",
        "izravna primjena direktive i protiv trgovca kao pravne osobe",
        "poništenje direktive pred Općim sudom zbog nepreuzimanja",
        "zahtjev Komisiji za izricanje novčane kazne trgovcu"
      ],
      correct: 0, id: "90q001"
    },
    {
      question: "Koja je od navedenih direktiva primjer potpune ciljane harmonizacije?",
      options: [
        "Direktiva o nepoštenim odredbama u potrošačkim ugovorima",
        "Direktiva o pravima potrošača",
        "Direktiva o prodaji robe široke potrošnje iz kraja devedesetih",
        "Direktiva o putovanjima u paket-aranžmanima iz početka devedesetih"
      ],
      correct: 1, id: "90q002"
    },
    {
      question: "Potrošač s ugovorom s dvojnom svrhom prema Direktivi 2011/83/EU je potrošač ako je poslovna svrha:",
      options: [
        "neznatna u odnosu na vrijednost cijelog ugovora",
        "prethodno prijavljena trgovcu pri sklapanju ugovora",
        "ograničena i u cjelokupnom ugovoru nije prevladavajuća",
        "manja od polovice vrijednosti robe iz ugovora"
      ],
      correct: 2, id: "90q003"
    },
    {
      question: "Ako trgovac ne obavijesti potrošača o pravu na raskid, rok za raskid:",
      options: [
        "ne počinje teći dok trgovac ne ispuni obvezu obavještavanja",
        "traje četrnaest dana od dana primitka robe",
        "istječe šest mjeseci od isteka redovnog roka za raskid",
        "produljuje se za godinu dana od isteka redovnog roka"
      ],
      correct: 3, id: "90q004"
    },
    {
      question: "Madrac s kojeg je potrošač skinuo zaštitnu foliju po presudi slewo:",
      options: [
        "nije izuzet od prava na raskid jer se može ponovno staviti na tržište",
        "je izuzet od prava na raskid jer je roba otpečaćena nakon dostave",
        "može se vratiti uz naknadu štete koju trgovac pretrpi",
        "može se vratiti ako je folija ostala u cijelosti na proizvodu"
      ],
      correct: 0, id: "90q005"
    },
    {
      question: "Ako se ugovor sklapa razmjenom elektroničkih poruka, odlučan je trenutak:",
      options: [
        "kad ponuditelj primi poruku koja sadrži prihvat ponude",
        "kad ponuđeni pošalje poruku s prihvatom ponude",
        "kad davatelj usluga pošalje potvrdu primitka ponude",
        "kad su stranke potpisale ugovor kvalificiranim potpisom"
      ],
      correct: 0, id: "90q006"
    },
    {
      question: "Pravni učinak kao vlastoručni potpis prema eIDAS-u ima:",
      options: [
        "običan elektronički potpis uključujući klik na gumb prihvaćanja",
        "napredan elektronički potpis povezan s potpisnikom",
        "kvalificirani elektronički potpis",
        "digitalni potpis bez kvalificiranog certifikata"
      ],
      correct: 2, id: "90q007"
    },
    {
      question: "Nakon izmjene ZOO-a od 2022. potrošač koji je otkrio nedostatak robe najprije može zahtijevati:",
      options: [
        "raskid ugovora i povrat cijene bez ostavljanja roka",
        "sniženje cijene razmjerno vrijednosti nedostatka",
        "popravak ili zamjenu robe bez naknade",
        "naknadu štete umjesto uklanjanja nedostatka"
      ],
      correct: 2, id: "90q008"
    },
    {
      question: "Predmnijeva da je nedostatak postojao u trenutku prijelaza rizika prema važećem ZOO-u vrijedi za nedostatak koji se pojavi unutar:",
      options: [
        "dvije godine od prijelaza rizika u ugovorima općenito",
        "šest mjeseci od prijelaza rizika u potrošačkim ugovorima",
        "dva mjeseca od otkrića nedostatka u potrošačkim ugovorima",
        "godine dana od prijelaza rizika u potrošačkim ugovorima"
      ],
      correct: 3, id: "90q009"
    },
    {
      question: "Za razliku od odgovornosti prodavatelja za nedostatke, odgovornost proizvođača prema Direktivi 85/374/EEZ:",
      options: [
        "je izvanugovorna i ne ovisi o krivnji proizvođača",
        "je ugovorna i ovisi o krivnji proizvođača",
        "je kaznena i ovisi o namjeri proizvođača",
        "je izvanugovorna i ovisi o dokazanoj krivnji proizvođača"
      ],
      correct: 0, id: "90q010"
    },
    {
      question: "Razvojni rizik kao razlog oslobođenja proizvođača znači da:",
      options: [
        "je proizvođač postupao prema internim standardima kvalitete",
        "stanje znanosti nije omogućavalo otkrivanje neispravnosti",
        "je oštećenik znao za mogućnost kvara prije uporabe",
        "je proizvod stavljen u promet prije donošenja propisa"
      ],
      correct: 1, id: "90q011"
    },
    {
      question: "Odluka suda posljednje instance države članice može izazvati odgovornost države prema:",
      options: [
        "predmetu Francovich i Bonifaci",
        "predmetu Brasserie du Pêcheur",
        "predmetu Köbler",
        "predmetu Dillenkofer"
      ],
      correct: 2, id: "90q012"
    },
    {
      question: "Za nepoštenost odredbe o kojoj nije pojedinačno pregovarano potrebno je da odredba:",
      options: [
        "bude uključena u opće uvjete objavljene u službenom glasilu države članice",
        "uzrokuje znatnu štetu koja prelazi zakonski određeni iznos",
        "isključuje odgovornost trgovca za štete na robi",
        "suprotno savjesnosti i poštenju uzrokuje znatnu neravnotežu na štetu potrošača"
      ],
      correct: 3, id: "90q013"
    },
    {
      question: "Po presudi Océano Grupo nepoštenost ugovorne odredbe nacionalni sud:",
      options: [
        "ocjenjuje po službenoj dužnosti i bez zahtjeva potrošača",
        "ocjenjuje tek kad potrošač prigovori u roku od godinu dana",
        "ocjenjuje tek nakon mišljenja Europske komisije",
        "prepušta ocjenu tijelu za zaštitu potrošača"
      ],
      correct: 0, id: "90q014"
    },
    {
      question: "Predmet Feryn pokazuje da izravna diskriminacija pri zapošljavanju postoji i kad:",
      options: [
        "poslodavac je odbio kandidata zbog manjka stručnih kvalifikacija",
        "poslodavac javno izjavi da neće zaposliti osobe određene etničke skupine",
        "je neutralni kriterij pogodio većinu kandidata iz iste skupine",
        "poslodavac nije ponudio razumnu prilagodbu osobi s invaliditetom"
      ],
      correct: 1, id: "90q015"
    },
    {
      question: "U predmetu Hauer Sud EU-a je ograničenja korištenja vlasništva smatrao dopuštenima ako:",
      options: [
        "služe ciljevima općeg interesa Unije i ne zadiru u samu bit prava",
        "su izričito predviđena odredbom Ugovora o osnivanju Zajednice",
        "traže prethodnu suglasnost vlasnika i naknadu tržišne vrijednosti",
        "su prethodno odobrena presudom nacionalnog suda države članice"
      ],
      correct: 0, id: "90q016"
    },
    {
      question: "Test proporcionalnosti u užem smislu znači da nedostaci mjere nisu:",
      options: [
        "uzročno povezani s ostvarenjem cilja mjere",
        "u suprotnosti s blažom mjerom jednako uspješnom",
        "propisani zakonom o ograničenju vlasništva",
        "potpuno nesrazmjerni prednostima koje mjera donosi"
      ],
      correct: 3, id: "90q017"
    },
    {
      question: "Nakon 9. 12. 2026. za proizvode stavljene na tržište primjenjuje se:",
      options: [
        "Direktiva (EU) 2024/2853 o odgovornosti za neispravne proizvode",
        "Direktiva 85/374/EEZ uz nepromijenjena pravila o softveru",
        "Direktiva 1999/44/EZ o prodaji robe široke potrošnje",
        "Uredba (EU) 2024/1183 o europskom digitalnom identitetu"
      ],
      correct: 0, id: "90q018"
    }
  ],
  fillBlanks: [
    { sentence: "Odgovornost države zbog nepreuzimanja direktive u pravilu ima dovoljno ozbiljnu povredu jer država nema diskrecijski _______.", answer: "prostor", hint: "sloboda procjene pri postizanju rezultata", id: "90f001" },
    { sentence: "Pružatelj internetskog tržišta ne ispunjava obvezu obavještavanja ako je obavijesti naveo samo u općim _______ poslovanja.", answer: "uvjetima", hint: "standardizirane ugovorne odredbe", id: "90f002" },
    { sentence: "Potrošač se ne može odreći prava iz ZZP-a jer je potrošačko pravo po naravi _______.", answer: "kogentno", hint: "pravilo od kojeg se ne može odstupiti", id: "90f003" },
    { sentence: "Direktive o potrošačima donose se redovnim zakonodavnim postupkom na temelju čl. 114. _______.", answer: "UFEU-a", hint: "ugovor o funkcioniranju Unije", id: "90f004" },
    { sentence: "Trajni medij je svako sredstvo koje omogućuje nepromijenjenu _______ pohranjenih informacija.", answer: "reprodukciju", hint: "ponovno prikazivanje", id: "90f005" },
    { sentence: "Obavijest o raskidu ugovora mora biti poslana prije isteka roka, a dokaz da je pravo na raskid ostvareno snosi slabija ugovorna strana, tj. _______.", answer: "potrošač", hint: "ugovorna strana suprotna trgovcu", id: "90f006" },
    { sentence: "Kod odgovornosti proizvođača oštećenik dokazuje neispravnost, štetu i uzročnu _______.", answer: "vezu", hint: "poveznica uzroka i posljedice", id: "90f007" },
    { sentence: "Prema Direktivi 2019/771 odgovornost prodavatelja traje dvije godine, a predmnijeva postojanja nedostatka godinu _______.", answer: "dana", hint: "jedinica vremena", id: "90f008" },
    { sentence: "Usporedba popravka i zamjene prema testu proporcionalnosti ne može se provesti s pravom na _______ cijene.", answer: "sniženje", hint: "pravo kupca u drugoj fazi hijerarhije", id: "90f009" },
    { sentence: "Osoba koja zbog invaliditeta svojeg djeteta trpi nepovoljniji tretman na poslu žrtva je tzv. _______ diskriminacije.", answer: "asocijativna", hint: "povezanost s nositeljem osnove", id: "90f010" },
    { sentence: "Prekluzivni rok od deset godina kod odgovornosti proizvođača teče od stavljanja proizvoda u _______.", answer: "promet", hint: "tržište, distribucija", id: "90f011" },
    { sentence: "Čl. 345. UFEU-a ne izuzima sustav vlasništva od temeljnih pravila UFEU-a, osobito slobode poslovnog nastana i kretanja _______.", answer: "kapitala", hint: "novac i ulaganja", id: "90f012" },
    { sentence: "Nova pravila o odgovornosti proizvođača obuhvaćaju i _______ te omogućuju sudu da naloži otkrivanje dokaza.", answer: "softver", hint: "nematerijalan proizvod koji se izvršava na računalu", id: "90f013" },
    { sentence: "Prema čl. 288. UFEU-a direktiva obvezuje u pogledu rezultata, a izbor oblika i metoda ostavlja nacionalnim _______.", answer: "tijelima", hint: "institucije vlasti", id: "90f014" }
  ],
  learn: {
    title: "Ponavljanje kroz cijelo gradivo",
    content: `
<h3>Usporedni pregled: kako Unija štiti pojedinca u privatnom pravu</h3>
<table>
<tr><th>Mehanizam</th><th>Kada vrijedi</th><th>Posljedica za pojedinca</th></tr>
<tr><td><strong>Sukladno tumačenje</strong></td><td>uvijek kad nacionalni sud primjenjuje pravo preuzeto iz direktive</td><td>nacionalno pravo tumači se prema izričaju i svrsi direktive</td></tr>
<tr><td><strong>Izravni učinak</strong></td><td>jasna, bezuvjetna i potpuna odredba protiv države (vertikalno)</td><td>pozivanje na direktivu pred sudom protiv države</td></tr>
<tr><td><strong>Odgovornost države</strong></td><td>nepreuzimanje direktive ili dovoljno ozbiljna povreda prava Unije</td><td>naknada stvarno pretrpljene štete od države</td></tr>
</table>

<h3>Usporedni pregled: odgovornost prodavatelja, proizvođača i države</h3>
<table>
<tr><th></th><th>Prodavatelj (materijalni nedostatak)</th><th>Proizvođač (neispravan proizvod)</th><th>Država članica</th></tr>
<tr><td>Pravna priroda</td><td>ugovorna, zbog nesukladnosti robe s ugovorom</td><td>izvanugovorna, objektivna</td><td>izvanugovorna, zbog povrede prava Unije</td></tr>
<tr><td>Što se traži</td><td>popravak ili zamjena, zatim sniženje cijene ili raskid, naknada štete</td><td>naknada štete zbog smrti, tjelesne ozljede i oštećenja stvari za osobnu uporabu</td><td>naknada stvarno pretrpljene štete</td></tr>
<tr><td>Rokovi</td><td>odgovornost dvije godine; obavijest dva mjeseca od otkrića; gašenje prava dvije godine od obavijesti; predmnijeva jedna godina</td><td>zastara tri godine od saznanja; gašenje deset godina od stavljanja u promet</td><td>nacionalna pravila uz načela ekvivalentnosti i učinkovitosti</td></tr>
<tr><td>Oslobođenje</td><td>kupac je znao za nedostatak; materijal je dao kupac</td><td>razvojni rizik, nije stavio u promet i dr.; teret dokaza na proizvođaču</td><td>povreda nije dovoljno ozbiljna</td></tr>
</table>

<h3>Usporedni pregled: potrošački ugovori</h3>
<ul>
<li><strong>Ugovori na daljinu i izvan poslovnih prostorija:</strong> predugovorne obavijesti (teret dokaza na trgovcu), potvrda ugovora na trajnom mediju, pravo na raskid u roku od 14 dana, uz iznimke (npr. roba po specifikaciji, pokvarljiva roba, otpečaćena zapečaćena higijenska roba).</li>
<li><strong>Elektronički ugovor:</strong> sklopljen prijemom prihvata; potvrda primitka je deklaratorna; kvalificirani elektronički potpis jednak je vlastoručnom.</li>
<li><strong>Nepoštene odredbe:</strong> test od tri elementa, ništetnost, ocjena po službenoj dužnosti, siva lista kao primjerovni popis, iznimka za jasne odredbe o predmetu i cijeni.</li>
</ul>

<h3>Niti kroz gradivo</h3>
<ul>
<li><strong>Slabija strana:</strong> zaštita potrošača temelji se na ideji da je potrošač podređen u pregovaračkoj snazi i obaviještenosti; zato sud smije po službenoj dužnosti ispitati potrošačko svojstvo (Faber) i nepoštenost odredbe (Océano).</li>
<li><strong>Autonomno tumačenje pojmova:</strong> pojmovi poput potrošača, trgovca, trajnog medija i jasno i razumljivo tumače se ujednačeno, bez obzira na nacionalne definicije.</li>
<li><strong>Test proporcionalnosti:</strong> prikladnost, nužnost i proporcionalnost u užem smislu pojavljuju se kod popravka i zamjene, ograničenja vlasništva, iznimaka od zabrane diskriminacije i ograničenja prava iz Povelje.</li>
<li><strong>Promjene prava:</strong> ZZP iz 2022. zamjenjuje raniji Zakon, a izmijenjen je Zakonom NN 59/26 (pročišćeni tekst NN 19/22, 59/23, 59/26): preuzeta je Direktiva (EU) 2023/2673 (novi čl. 81.a, funkcija za jednostrani raskid, od 19. 6. 2026.; financijske usluge na daljinu), prenumerirane su točke čl. 4. i dodane nove točke čl. 60.; čl. 114.–130. ZZP-a (udružne tužbe) prestali su važiti 25. 6. 2023. (Zakon o predstavničkim tužbama, NN 59/23); Direktiva (EU) 2019/771 zamjenjuje Direktivu 1999/44/EZ; ZOO je izmijenjen Zakonom NN 69/26: pravo na popravak robe (Direktiva (EU) 2024/1799) i novi čl. 1072.a–1080. o odgovornosti proizvođača, koji se primjenjuju na proizvode stavljene na tržište od 9. 12. 2026., dok stari čl. 1073.–1080. vrijede za ranije stavljene proizvode; Direktiva (EU) 2024/2853 zamjenjuje Direktivu 85/374/EEZ za proizvode stavljene na tržište nakon 9. prosinca 2026.; Uredba (EU) 2024/1183 mijenja eIDAS.</li>
</ul>
`,
    id: "90l000"
  },
  id: "90k000"
};

const ep2PfriFinal = Object.assign(
  {},
  (typeof window !== "undefined" && window.ep2PfriM1) ? window.ep2PfriM1 : {},
  (typeof window !== "undefined" && window.ep2PfriM2) ? window.ep2PfriM2 : {},
  { examPractice: ep2PfriFinalExamPractice }
);

if (typeof window !== "undefined") { window.ep2PfriFinal = ep2PfriFinal; }
