// Rimsko privatno pravo (PFRI) — M2 (gradivo završnog ispita nakon položenog međuispita)
// Završni (parcijalni) ispit po izvedbenom planu: opći dio imovinskog prava; posjed; stvarna prava;
// obvezno pravo (materijalno i postupovno). Model: kartice <= 200 znakova, detalj u learn.

const rppPfriM2 = {
  imovinskoPravoSustav: {
    id: "sr4qwa",
    name: "Opći dio imovinskog prava: sustav",
    icon: "fa-sitemap",
    color: "#6366f1",
    flashcards: [
      { id: "np18zr", question: "Sustav imovinskog prava", answer: "Stvarno pravo (vlasništvo i iura in re aliena: služnosti, zalog, superficies, emfiteuza) i obvezno pravo (obligatio); nasljedno pravo uređuje prijelaz imovine mortis causa.", explanation: "Gajeva res: odnosi ljudi s obzirom na stvari." },
      { id: "9h90l7", question: "Stvarno pravo – obilježja", answer: "Subjektivno pravo na određenoj stvari koje djeluje prema svima (erga omnes), apsolutno i negativno – svi su se dužni suzdržati od smetanja.", explanation: "Štiti se actiones in rem." },
      { id: "jf7xe8", question: "Obvezno pravo – obilježja", answer: "Pravni odnos u kojem je dužnik obvezan na činidbu (dare, facere, praestare) prema vjerovniku; djeluje inter partes, relativno i pozitivno.", explanation: "Štiti se actiones in personam." },
      { id: "ye4p13", question: "Actio in rem", answer: "Tužba za zaštitu stvarnog prava – tvrdnja da je stvar naša ili da nam pripada neko pravo; tuženi je bilo tko tko smeta (slučajni protivnik).", explanation: "Rei vindicatio, Publiciana, confessoria, negatoria." },
      { id: "u57hat", question: "Actio in personam", answer: "Tužba protiv onoga tko nam je obvezan iz ugovora ili delikta; intencija traži dare, facere ili praestare.", explanation: "Gai. 4.2." },
      { id: "qnhz1y", question: "Iudicia stricti iuris i iudicia bonae fidei", answer: "Stricti iuris: sudac samo utvrđuje propisani oblik i iznos tražbine. Bonae fidei: sudac ocjenjuje sve okolnosti po pravičnosti (aequitas) i dobroj vjeri.", explanation: "Stricti iuris: stipulacija, zajam, literalni ugovori." },
      { id: "kk9trn", question: "Pravne činjenice", answer: "Zbivanja za koja pravni poredak veže pravne posljedice: prirodni događaji (protek vremena, rođenje, smrt) i ljudska djelovanja – dopuštena i nedopuštena.", explanation: "Pravni posao je dopušteno ljudsko djelovanje." },
      { id: "3ngom0", question: "Originarno i derivativno stjecanje prava", answer: "Originarno – samostalno, bez obzira na pravo prethodnika. Derivativno – pravo stjecatelja izvodi se iz prava prethodnika (auctor).", explanation: "Nemo plus iuris…" },
      { id: "x8fhj1", question: "Translativno i konstitutivno derivativno stjecanje", answer: "Translativno – pravo prelazi u punom sadržaju. Konstitutivno – na temelju prethodnikova prava stvara se novo, uže pravo (npr. vlasnik osnuje služnost).", explanation: "Npr. proda zemlju, a sebi pridrži služnost prolaza." },
      { id: "8ryzdq", question: "Vrijeme (tempus) u rimskom pravu", answer: "Računa se po kalendaru: mjesec 30 dana, godina 365 dana; dan je najmanja jedinica (sati se ne računaju).", explanation: "Dies a quo non computatur in termino." },
      { id: "9j4s9r", question: "Ignorantia iuris non excusat (nocet)", answer: "„Nepoznavanje prava ne ispričava (škodi).“ Zabluda o pravnim propisima u pravilu se ne uvažava; iznimke: maloljetnici ispod 25 i žene u nekim slučajevima.", explanation: "Paul. D. 22.6.9 pr." },
      { id: "w7jlyt", question: "Ignorantia facti excusat (non nocet)", answer: "„Nepoznavanje činjenica ispričava (ne škodi).“ Ispričiva zabluda o činjenicama može učiniti pravni posao nevaljanim.", explanation: "Uz Ignorantia iuris – regule o zabludi." }
    ],
    quiz: [
      { id: "pp3fql", question: "Stvarno pravo djeluje:", options: ["samo prema dužniku", "inter partes", "erga omnes", "samo prema nasljednicima"], correct: 2 },
      { id: "6622g8", question: "Koja je tužba actio in personam?", options: ["actio empti", "actio Publiciana", "rei vindicatio", "actio negatoria"], correct: 0 },
      { id: "nv7fl4", question: "Obvezno pravo je:", options: ["apsolutno i negativno", "relativno i negativno", "apsolutno i pozitivno", "relativno i pozitivno"], correct: 3 },
      { id: "wgn980", question: "U iudicia bonae fidei sudac:", options: ["utvrđuje samo propisani oblik i iznos tražbine", "ocjenjuje sve okolnosti po pravičnosti", "je vezan isključivo riječima stipulacije", "ne smije uzeti u obzir nikakve prigovore"], correct: 1 },
      { id: "wlkv0w", question: "Vlasnik osnuje plodouživanje u korist drugoga; plodouživatelj stječe:", options: ["derivativno-translativno", "originarno, bez prethodnika", "derivativno-konstitutivno", "dosjelošću (usucapio)"], correct: 2 },
      { id: "xa3ver", question: "Najmanja jedinica vremena u rimskom pravu bio je:", options: ["sat", "tjedan", "mjesec", "dan"], correct: 3 },
      { id: "npzwyl", question: "Kod koga se po Paulu (D. 22.6.9) dopušta nepoznavanje prava?", options: ["kod robova i oslobođenika uvijek", "kod maloljetnika ispod 25 i ponekad žena", "kod vojnika i veterana u službi", "kod peregrina i Latina Iuniana"], correct: 1 },
      { id: "hdgy4g", question: "Smrt i protek vremena su primjeri:", options: ["pravnih poslova mortis causa", "nedopuštenih ljudskih radnji", "prirodnih pravnih događaja", "kontrakata i kvazikontrakata"], correct: 2 },
      { id: "f6dr0a", question: "Tužbom actio in rem tvrdimo da:", options: ["nam je netko obvezan iz ugovora ili delikta", "nam je netko nanio štetu deliktom", "je stvar naša ili nam pripada pravo na njoj", "nam dužnik treba vratiti primljeni zajam"], correct: 2 },
      { id: "f5x6rs", question: "Zabluda o činjenicama prema rimskim regulama:", options: ["ispričava (ne škodi)", "uvažava se samo kod žena", "nikad se ne uvažava", "uvijek čini posao ništavim"], correct: 0 }
    ],
    fillBlanks: [
      { id: "eau8dq", sentence: "Ignorantia iuris non _______.", answer: "excusat", hint: "Ne ispričava." },
      { id: "m3gidv", sentence: "Stvarno pravo djeluje erga _______.", answer: "omnes", hint: "Prema svima." }
    ],
    learn: {
      id: "rtqvg1",
      title: "Sustav imovinskog prava; stvarno i obvezno pravo",
      content: `<h3>Pojam i podjela imovinskog prava</h3>
<p>Imovinsko pravo (Gajev <em>ius quod ad res pertinet</em>) uređuje odnose među ljudima s obzirom na stvari – inter vivos i mortis causa. Sustav:</p>
<ul>
<li><strong>Stvarno pravo (in rem)</strong>: vlasništvo (<em>dominium, proprietas</em>) i stvarna prava na tuđoj stvari (<em>iura in re aliena</em>): služnosti (<em>servitutes</em>), založno pravo (<em>pignus, hypotheca</em>), <em>superficies</em>, <em>emphyteusis</em>.</li>
<li><strong>Obvezno pravo (obligatio)</strong>: obveze iz kontrakata, delikata, kvazikontrakata i kvazidelikata.</li>
<li><strong>Nasljedno pravo</strong> – prijelaz imovine mortis causa.</li>
</ul>

<h3>Stvarno i obvezno pravo – usporedba</h3>
<table>
<tr><th></th><th>Stvarno pravo</th><th>Obvezno pravo</th></tr>
<tr><td>sadržaj</td><td>subjektivno pravo ovlaštenika da na određeni način iskorištava stvar, uz negativnu dužnost svih da ga ne smetaju</td><td>pravni odnos u kojem je dužnik (debitor) obvezan na činidbu prema vjerovniku (creditor) i za neispunjenje odgovara imovinom</td></tr>
<tr><td>djelovanje</td><td><strong>erga omnes</strong> – apsolutno</td><td><strong>inter partes</strong> – relativno</td></tr>
<tr><td>zahtjev</td><td><strong>negativan</strong> – da nitko ne smeta</td><td><strong>pozitivan</strong> – da dužnik nešto učini</td></tr>
<tr><td>objekt</td><td>res (stvar)</td><td>činidba: dare, facere, praestare</td></tr>
<tr><td>zaštita</td><td><strong>actiones in rem</strong></td><td><strong>actiones in personam</strong></td></tr>
</table>
<p><strong>Gai. Inst. 4.2–3:</strong> „Actio in personam je ona koju pokrećemo kad god vodimo spor s nekim tko nam je obvezan iz ugovora ili iz delikta. Actio in rem je ona kojom tvrdimo da je neka stvar naša ili da nam pripada neko pravo.“ Kod actio in rem tuženi je samo slučajni protivnik – bilo tko tko ometa ovlaštenika; zato se u intenciji ne navodi tuženik.</p>
<p>Kod actiones in personam razlikuju se ovlaštenja suca:</p>
<ul>
<li><strong>iudicia stricti iuris</strong> – sudac samo utvrđuje je li posao zaključen u propisanom obliku i kolika je tražbina (verbalni i literalni kontrakti, zajam); prednost ima vjerovnik;</li>
<li><strong>iudicia bonae fidei</strong> – sudac uzima u obzir sve okolnosti slučaja koje nalaže načelo pravičnosti (<em>aequitas</em>) i dobre vjere, više volju stranaka nego formu (realni osim zajma, konsenzualni, inominatni kontrakti, pakti); povoljnije za dužnika.</li>
</ul>

<h3>Pravne činjenice</h3>
<p>Pravni poslovi samo su dio društvenih zbivanja koja se nazivaju <strong>pravne činjenice</strong> – za njih pravni poredak veže pravne posljedice:</p>
<ul>
<li><strong>prirodna zbivanja</strong> (pravni događaji) – protek vremena, godišnje doba, rođenje, smrt;</li>
<li><strong>ljudska djelovanja</strong> – dopuštena (npr. pravni poslovi) i nedopuštena (delikti).</li>
</ul>
<p>Posljedice su <strong>postanak (stjecanje)</strong> prava – kad se pravo nađe kod subjekta – i <strong>prestanak (gubitak)</strong> – kad se odvoji od subjekta.</p>
<h4>Vrste stjecanja</h4>
<ul>
<li><strong>originarno</strong> – bez obzira na pravo prethodnika (npr. okupacija);</li>
<li><strong>derivativno</strong> – pravo se izvodi iz prava prethodnika (<em>auctor</em>):
<ul><li><em>translativno</em> – pravo prelazi u punom sadržaju;</li>
<li><em>konstitutivno</em> – stvara se novo pravo užeg sadržaja (vlasnik prenese nekretninu, a sebi ostavi služnost prolaza; ili osnuje plodouživanje).</li></ul></li>
</ul>
<h4>Vrijeme (tempus)</h4>
<p>Protek vremena u nizu slučajeva dovodi do nastanka ili prestanka prava (dosjelost, zastara, rokovi). Računa se po kalendaru: mjesec ima 30 dana, godina 365; <strong>dan je najmanja jedinica</strong> – sati se ne računaju. <em>Dies a quo non computatur in termino</em> – početni dan se ne računa u rok.</p>

<h3>Zabluda o pravu i činjenicama – regule</h3>
<ul>
<li><em>Ignorantia iuris non excusat (nocet)</em> – „Nepoznavanje prava ne ispričava (škodi)“.</li>
<li><em>Ignorantia facti excusat (non nocet)</em> – „Nepoznavanje činjenica ispričava (ne škodi)“.</li>
</ul>
<p><strong>Paul. D. 22.6.9 pr.:</strong> <em>Regula est iuris quidem ignorantiam cuique nocere, facti vero ignorantiam non nocere… minoribus viginti quinque annis ius ignorare permissum est, quod et in feminis in quibusdam causis…</em> – „Pravno je pravilo da neznanje prava svakome škodi, a neznanje činjenica ne škodi; maloljetnicima ispod 25 godina dopušteno je ne poznavati pravo, što se uzima i za žene u nekim slučajevima“ (zbog „slabosti spola“). Za maloljetnike i žene vrijedi dakle <em>ignorantia iuris non nocet</em> – iznimka od pravila. Detaljnije o zabludama – pravni posao i njegova valjanost.</p>`
    }
  },

  res: {
    id: "t385li",
    name: "Stvari (res) i njihova dioba",
    icon: "fa-cubes",
    color: "#f59e0b",
    flashcards: [
      { id: "alp1wh", question: "Pojam stvari (res)", answer: "Prostorno odijeljeni dijelovi vanjske prirode dostupni ljudima; sve što može biti predmet odnosa među ljudima i ulaziti u nečiju imovinu.", explanation: "Objekti imovinskopravnih odnosa." },
      { id: "5uljbt", question: "Res corporales i res incorporales", answer: "Tjelesne – mogu se utvrditi osjetilima (dotaknuti). Netjelesne – sastoje se od prava (nasljedstvo, tražbine, služnosti); do njih se dolazi logičkim zaključivanjem.", explanation: "Netjelesne se prenose in iure cessio." },
      { id: "txosmu", question: "Res mancipi", answer: "Stvari koje se prenose samo formalističkim aktima (mancipatio, in iure cessio): italska zemljišta, robovi, volovi, konji, mazge, magarci i četiri stare poljske služnosti.", explanation: "Iter, via, actus, aquaeductus." },
      { id: "u2ch45", question: "Res nec mancipi", answer: "Sve ostale stvari; vlasništvo se nad njima prenosi neformalno, predajom iz ruke u ruku (traditio).", explanation: "Razlika nestaje kod Justinijana." },
      { id: "e8qqpt", question: "Res extra commercium humani iuris", answer: "Izvan prometa po ljudskom pravu: res communes omnium (zrak, tekuća voda, more, morska obala) i res publicae (stvari u vlasništvu države).", explanation: "Res communes štiti pretor." },
      { id: "8hknyn", question: "Res extra commercium divini iuris", answer: "Izvan prometa po božanskom pravu: res sacrae (posvećene bogovima – hramovi), res religiosae (podzemnim bogovima – grobovi), res sanctae (gradski zidovi i vrata).", explanation: "Ne mogu biti u privatnom vlasništvu." },
      { id: "3idgp1", question: "Res in patrimonio i extra patrimonium", answer: "In patrimonio – stvari koje mogu biti u privatnoj imovini. Extra patrimonium – u određenom času nisu ničija imovina: res nullius (ničije) i res derelictae (napuštene).", explanation: "Stječu se originarno – okupacijom." },
      { id: "gjyc3s", question: "Res mobiles i res immobiles", answer: "Pokretne se mogu premjestiti bez gubitka ili oštećenja bitnih svojstava; nepokretne ne mogu.", explanation: "Važno za dosjelost i interdikte." },
      { id: "2z9s4z", question: "Res fungibiles (genus) i non fungibiles (species)", answer: "Zamjenjive – određene brojem, težinom, mjerom (res quae numero, pondere, mensura consistunt). Nezamjenjive – individualno određene.", explanation: "Zajam se daje u genusu." },
      { id: "xliydk", question: "Genus perire non censetur", answer: "„Stvari određene po rodu ne propadaju.“ Propast generične stvari ne oslobađa dužnika – mora dati drugu iste vrste.", explanation: "Npr. kod zajma." },
      { id: "9qpw1m", question: "Species perit ei cui debetur", answer: "„Individualno određena stvar propada na štetu vjerovnika.“ Ako species propadne bez dužnikove krivnje, dužnik se oslobađa zbog nemogućnosti činidbe.", explanation: "Nemogućnost mora biti objektivna i trajna." },
      { id: "2q98hq", question: "Potrošne i nepotrošne stvari", answer: "Res quae usu consumuntur – troše se jednokratnom uporabom (vino); res quae usu non consumuntur – ne troše se (prsten).", explanation: "Plodouživanje načelno samo na nepotrošnim." },
      { id: "sk7puk", question: "Djeljive i nedjeljive stvari", answer: "Djeljive (divisibiles) se mogu rastaviti na više dijelova bez gubitka vrijednosti; nedjeljive (indivisibiles) ne mogu.", explanation: "Važno za razvrgnuće suvlasništva." },
      { id: "m9yjky", question: "Jednostavne, složene i kompleksne stvari", answer: "Jednostavne – jedna cjelina (greda, kamen); složene – iz više dijelova (kuća, brod); kompleksne – gospodarska ili pravna cjelina (stado, nasljedstvo).", explanation: "Universitas rerum." },
      { id: "xfeeym", question: "Fructus (plodovi) – vrste", answer: "Dijelovi stvari koji odvajanjem postaju samostalni: pendentes (neodvojeni), separati – percepti (ubrani) i percipiendi (koje je trebalo ubrati), extantes (postoje), consumpti (potrošeni).", explanation: "Kamate se ne ubrajaju u plodove." },
      { id: "a3233h", question: "Accessio cedit principali", answer: "„Pripadak dijeli pravnu sudbinu glavne stvari“ (accessorium sequitur principale) – npr. poljoprivredni alat (instrumentum fundi) slijedi zemljište (fundus).", explanation: "Glavna stvar i pertinencija." }
    ],
    quiz: [
      { id: "mlp3x4", question: "Koja je stvar res mancipi?", options: ["ovca", "provincijsko zemljište", "zlatni prsten", "rob"], correct: 3 },
      { id: "s5qyqw", question: "Hramovi su:", options: ["res religiosae", "res sacrae", "res sanctae", "res publicae"], correct: 1 },
      { id: "67j532", question: "Grobovi su:", options: ["res religiosae", "res sacrae", "res communes omnium", "res nullius"], correct: 0 },
      { id: "7i4vos", question: "Gradski zidovi i vrata su:", options: ["res derelictae", "res sacrae", "res publicae", "res sanctae"], correct: 3 },
      { id: "hh9idw", question: "More i morska obala su:", options: ["res publicae (državne)", "res communes omnium", "res nullius (ničije)", "res sacrae (posvećene)"], correct: 1 },
      { id: "x7mzo4", question: "Stvar koju je vlasnik napustio u namjeri da se odrekne vlasništva jest:", options: ["res nullius", "res furtiva", "res derelicta", "res religiosa"], correct: 2 },
      { id: "jkzqdm", question: "„Genus perire non censetur“ znači da:", options: ["vlasnik uvijek snosi slučajnu propast stvari", "species propada na štetu dužnika koji ju duguje", "generična stvar ne propada – dužnik ostaje obvezan", "pertinencija dijeli pravnu sudbinu glavne stvari"], correct: 2 },
      { id: "hdvaqb", question: "Ako individualno određena stvar propadne bez krivnje dužnika:", options: ["dužnik se oslobađa obveze", "dužnik mora dati drugu iste vrste", "dužnik plaća dvostruko", "obveza prelazi na nasljednike"], correct: 0 },
      { id: "2gspwx", question: "Plodovi koje je trebalo ubrati, a nisu ubrani, zovu se:", options: ["percepti", "extantes", "pendentes", "percipiendi"], correct: 3 },
      { id: "7aamrl", question: "Stado ovaca i nasljedstvo primjeri su:", options: ["jednostavnih stvari", "kompleksnih stvari", "složenih stvari", "potrošnih stvari"], correct: 1 },
      { id: "8q7cwo", question: "Res incorporales (netjelesne stvari) su npr.:", options: ["tražbine i služnosti", "zemljišta i kuće", "robovi i stoka", "novac i žito"], correct: 0 },
      { id: "w1ym6x", question: "Zamjenjive stvari određene su:", options: ["individualno", "upisom u knjige", "samo vrijednošću u novcu", "brojem, težinom i mjerom"], correct: 3 },
      { id: "ztmrlo", question: "Poljoprivredni alat (instrumentum fundi) u odnosu na zemljište je:", options: ["glavna stvar", "pertinencija", "res extra commercium", "plod"], correct: 1 },
      { id: "uccv61", question: "Pravilo „accessio cedit principali“ znači da:", options: ["plodovi uvijek pripadaju posjedniku", "glavna stvar slijedi sudbinu pripatka", "pripadak slijedi sudbinu glavne stvari", "tko gradi na tuđem, stječe zemljište"], correct: 2 }
    ],
    fillBlanks: [
      { id: "c6e9bm", sentence: "Species perit ei cui _______.", answer: "debetur", hint: "Kome se duguje." },
      { id: "j51cci", sentence: "Stvari koje nisu ni u čijem vlasništvu zovu se res _______.", answer: "nullius", hint: "Ničije." }
    ],
    learn: {
      id: "14mquq",
      title: "Stvari i njihova dioba",
      content: `<h3>Pojam stvari</h3>
<p><strong>Res</strong> su prostorno odijeljeni dijelovi vanjske prirode dostupni ljudima, objekti imovinskopravnih odnosa – sve ono što može biti predmetom odnosa među ljudima i ulaziti u nečiju imovinu.</p>
<h3>Diobe stvari</h3>
<table>
<tr><th>Dioba</th><th>Sadržaj</th></tr>
<tr><td><strong>res corporales / res incorporales</strong></td><td>tjelesne – utvrđuju se osjetilima; netjelesne – sastoje se od prava (nasljedstvo, tražbine, iura in re aliena), do njih se dolazi logičkim zaključivanjem</td></tr>
<tr><td><strong>res mancipi / res nec mancipi</strong></td><td>res mancipi prenose se samo formalističkim i svečanim poslovima (<em>mancipatio, in iure cessio</em>): italska zemljišta (nekad ager Romanus, heredij), pokretnine koje su osnovica vojničko-seljačkog gospodarstva (robovi, volovi, konji, mazge, magarci) i četiri stare poljske služnosti (iter, via, actus, aquaeductus); res nec mancipi – ostale, prenose se predajom (<em>traditio</em>)</td></tr>
<tr><td><strong>res in patrimonio / extra patrimonium</strong></td><td>u imovini mogu biti; izvan imovine u određenom času: <em>res nullius</em> (ničije) i <em>res derelictae</em> (napuštene) – stječu se originarno</td></tr>
<tr><td><strong>res in commercio / extra commercium</strong></td><td>izvan prometa po ljudskom pravu (<em>humani iuris</em>): <strong>res communes omnium</strong> – po prirodi služe svima (aer – zrak, aqua profluens – tekuća voda, mare – more, litora maris – morska obala; štiti ih pretor) i <strong>res publicae</strong> (vlasništvo države); po božanskom pravu (<em>divini iuris</em>): <strong>res sacrae</strong> (posvećene bogovima – hramovi), <strong>res religiosae</strong> (posvećene podzemnim bogovima, kultu pokojnika – grobovi), <strong>res sanctae</strong> (pod posebnom zaštitom bogova – gradski zidovi i vrata)</td></tr>
<tr><td><strong>res mobiles / immobiles</strong></td><td>pokretne se mogu premjestiti bez gubitka ili oštećenja bitnih svojstava; nepokretne ne mogu</td></tr>
<tr><td><strong>zamjenjive (fungibiles, genus) / nezamjenjive (species)</strong></td><td>zamjenjive su <em>res quae numero, pondere, mensura consistunt</em> – određene brojem, težinom, mjerom (novac, žito); nezamjenjive su individualno određene</td></tr>
<tr><td><strong>potrošne / nepotrošne</strong></td><td><em>res quae usu consumuntur</em> – troše se jednokratnom uporabom (vino); <em>quae usu non consumuntur</em> – ne troše se (prsten)</td></tr>
<tr><td><strong>djeljive / nedjeljive</strong></td><td>mogu se ili ne mogu rastaviti na više dijelova ili pojedinačnih stvari</td></tr>
<tr><td><strong>jednostavne / složene / kompleksne</strong></td><td>jednostavne – jedna cjelina (greda, kamen); složene – iz više dijelova (kuća, brod); kompleksne – tek gospodarski ili pravno cjelina (stado ovaca, nasljedstvo)</td></tr>
<tr><td><strong>glavne / pertinencije</strong></td><td>glavna stvar (npr. <em>fundus</em> – zemljište) i pripadak (npr. <em>instrumentum fundi</em> – poljoprivredni alat)</td></tr>
</table>

<h3>Plodovi (fructus)</h3>
<p>Dijelovi stvari koji odvajanjem postaju samostalne stvari (prirodni – naturales; i civilni – civiles):</p>
<ul>
<li><strong>pendentes</strong> – još povezani s glavnom stvari (njen sastavni dio, ne mogu biti predmet samostalnog vlasništva);</li>
<li><strong>separati</strong> – odvojeni: <strong>percepti</strong> (ubrani) i <strong>percipiendi</strong> (koje je trebalo ubrati, a nisu ubrani ili su propali);</li>
<li><strong>extantes</strong> – oni koji još postoje; <strong>consumpti</strong> – potrošeni.</li>
</ul>
<p>Kamate se ne smatraju plodom u pravom smislu.</p>

<h3>Regule o stvarima</h3>
<ul>
<li><em>Genus perire non censetur</em> – „Ne propadaju stvari određene po rodu“: propast generične stvari ne oslobađa dužnika (npr. zajmoprimca), mora dati drugu iste vrste.</li>
<li><em>Species perit ei cui debetur</em> – „Individualno određena stvar propada na štetu vjerovnika“: propadne li species bez dužnikove krivnje, dužnik se oslobađa zbog nemogućnosti činidbe (objektivne i trajne). Povezano: <em>ad impossibilia nemo tenetur</em>.</li>
<li><em>Accessio cedit principali</em> (<em>accessorium sequitur principale</em>) – „Pripadak (pertinencija) dijeli pravnu sudbinu glavne stvari“.</li>
</ul>
<p>Shema veze stvari i stjecanja vlasništva: <strong>res mancipi</strong> – mancipatio ili in iure cessio → kviritsko vlasništvo; traditio res mancipi → bonitarno (pretorsko) vlasništvo → usucapio → kviritsko. <strong>Res nec mancipi</strong> – traditio → kviritsko vlasništvo.</p>`
    }
  },

  negotium: {
    id: "snhlvl",
    name: "Pravni posao (negotium): vrste i sastojci",
    icon: "fa-file-contract",
    color: "#10b981",
    flashcards: [
      { id: "mpuil9", question: "Negotium (pravni posao)", answer: "Očitovanje privatne volje usmjereno na postizanje dopuštenih pravnih učinaka (u skladu s pravnim poretkom).", explanation: "Volja je središnji element." },
      { id: "odvskw", question: "Negotia unilateralia i bilateralia", answer: "Jednostrani – dovoljno očitovanje volje jedne strane (oporuka). Dvostrani – potrebna su očitovanja dviju strana, sporazum (consensus); svi kontrakti su dvostrani poslovi.", explanation: "Primjer jednostranog posla je oporuka, a dvostranog kupoprodaja." },
      { id: "6hkjrq", question: "Contractus unilateralis", answer: "Jednostrano obvezujući ugovor – na činidbu je obvezana samo jedna strana (npr. mutuum, stipulatio).", explanation: "Dvostrani posao, jednostrana obveza." },
      { id: "2gjjlz", question: "Contractus bilateralis aequalis i inaequalis", answer: "Aequalis – potpuno dvostrano obvezujući (sinalagmatični), obje strane obvezane (kupoprodaja). Inaequalis – nepotpuno: jedna obvezana, druga samo iznimno (ostava, posudba, nalog).", explanation: "Kod inaequalis postoji actio contraria." },
      { id: "ziy5aq", question: "Onerosa i lucrativa; inter vivos i mortis causa", answer: "Naplatni (kupoprodaja) i besplatni (darovanje) poslovi; poslovi među živima i za slučaj smrti (oporuka, darovanje za slučaj smrti).", explanation: "Modus samo kod lukrativnih." },
      { id: "s5p1fo", question: "Apstraktni i kauzalni poslovi", answer: "Apstraktni – iz posla se ne vidi pravni razlog (stipulacija, mancipacija); formalni su, ne istražuje se volja. Kauzalni – razlog je vidljiv (kupoprodaja); valjanost ovisi o kauzi.", explanation: "Kod kauzalnih se istražuje prava volja." },
      { id: "c1jmgg", question: "Essentialia negotii", answer: "Bitni sastojci bez kojih posao ne može nastati; različiti za svaki posao (kod kupoprodaje res i pretium).", explanation: "Kod locatio conductio operis: opus i merces." },
      { id: "dm6cbs", question: "Naturalia negotii", answer: "Prirodni sastojci koji se podrazumijevaju i bez ugovaranja (dispozitivne norme); stranke ih mogu isključiti ili ograničiti, npr. odgovornost prodavatelja za mane.", explanation: "Proizlaze iz naravi posla." },
      { id: "ceqooc", question: "Accidentalia negotii", answer: "Slučajni sastojci koje stranke po volji unose u posao: condicio (uvjet), dies (rok), modus (namet).", explanation: "Za razliku od bitnih sastojaka (essentialia), posao bez njih ostaje valjan." },
      { id: "v08xiw", question: "Condicio (uvjet)", answer: "Budući i objektivno neizvjestan događaj o kojem po volji stranaka ovisi učinak pravnog posla.", explanation: "Budućnost + neizvjesnost." },
      { id: "iuc2fv", question: "Suspenzivni i rezolutivni uvjet", answer: "Suspenzivni (odgodni) odgađa nastanak učinka posla („dobit ćeš auto ako položiš ispite“); rezolutivni (raskidni) – nastupom uvjeta posao prestaje („vratit ćeš auto ako ne položiš“).", explanation: "Kod suspenzivnog: condicio pendet." },
      { id: "rh1bax", question: "Afirmativni i negativni uvjet", answer: "Afirmativni – ispunjen kad se okolnost dogodi; negativni – ispunjen kad postane sigurno da do uvjetovane promjene neće doći.", explanation: "Npr. „ako ne nađem boljeg kupca“." },
      { id: "fo6vof", question: "Potestativni, kauzalni i mikstni uvjet", answer: "Potestativni – ovisi o volji ovlaštenika; kauzalni – o objektivnim okolnostima, slučaju (kiša, dobra ljetina); mikstni – dijelom o volji ovlaštenika, dijelom treće osobe.", explanation: "„Dat ću ti šator ako bude padala kiša“ – kauzalni." },
      { id: "tirgzw", question: "Nepravi uvjeti", answer: "Prividni (već se dogodio) i nužni (sigurno nastupa) – posao je bezuvjetan, nužni djeluje kao rok; nemogući, nemoralni i nedopušteni – inter vivos ništavost, mortis causa se brišu.", explanation: "Impossibilium nulla obligatio." },
      { id: "zntvp8", question: "Condicio pendet, existit, deficit", answer: "Pendet – vrijeme čekanja ispunjenja (pendencija); existit – očito je da se uvjet ispunio; deficit – očito je da se izjalovio.", explanation: "Kod suspenzivnog uvjeta tijekom pendencije posao još ne djeluje." },
      { id: "j1xw4x", question: "Fikcija ispunjenja uvjeta (Ulp. D. 50.17.161)", answer: "Ako onaj u čijem je interesu da se uvjet ne ispuni spriječi njegovo ispunjenje, uvjet se smatra ispunjenim.", explanation: "Quotiens per eum, cuius interest condicionem non impleri…" },
      { id: "ulyji9", question: "Actus legitimi", answer: "Formalistički poslovi starog prava (mancipatio, in iure cessio, hereditatis aditio, akti očinske vlasti) uz koje se ne smije staviti uvjet ni rok – postaju ništavi.", explanation: "Npr. akceptilacija se ne može uvjetovati." },
      { id: "zqw161", question: "Dies (rok)", answer: "Budući izvjestan događaj o kojem po volji stranaka ovisi početak (dies a quo) ili prestanak (dies ad quem) učinka posla.", explanation: "Za razliku od uvjeta – izvjestan." },
      { id: "eo8w2k", question: "Četiri vrste rokova", answer: "Certus an certus quando (datum); certus an incertus quando (nečija smrt); incertus an certus quando (nečija punoljetnost); incertus an incertus quando (nečije diplomiranje).", explanation: "Prva dva su pravi rokovi." },
      { id: "zm4q7i", question: "Dies incertus pro condicione habetur", answer: "„Neizvjesni rok smatra se uvjetom.“ Rokovi kod kojih je neizvjesno hoće li nastupiti (incertus an) po svojoj su biti uvjeti.", explanation: "Incertus an certus/incertus quando." },
      { id: "n405a1", question: "Dies interpellat pro homine", answer: "„Rok opominje umjesto čovjeka“ – kad je obveza vezana uz kalendarski rok, dužnika ne treba posebno opominjati; protekom roka pada u zakašnjenje.", explanation: "Veza s mora debitoris." },
      { id: "vapuz2", question: "Dies a quo non computatur in termino", answer: "„Početni dan ne računa se u rok.“", explanation: "Dan je najmanja jedinica vremena." },
      { id: "ib1pxw", question: "Modus (namet)", answer: "Uzgredna odredba kojom se primatelju besplatne koristi nameće dužnost (npr. podići spomenik); samo kod lukrativnih poslova; učinak nastupa odmah. Uvjet odgađa, ali ne sili; namet sili.", explanation: "Justinijan: actio praescriptis verbis, condictio." }
    ],
    quiz: [
      { id: "93r1eu", question: "Koji od navedenih poslova je negotium unilaterale?", options: ["mutuum", "emptio venditio", "oporuka", "depositum"], correct: 2 },
      { id: "bodsa4", question: "Mutuum je s obzirom na obveze stranaka:", options: ["contractus unilateralis", "contractus bilateralis aequalis", "contractus bilateralis inaequalis", "negotium unilaterale"], correct: 0 },
      { id: "gjkhst", question: "Kupoprodaja je:", options: ["contractus unilateralis", "contractus bilateralis inaequalis", "negotium unilaterale", "contractus bilateralis aequalis"], correct: 3 },
      { id: "yhdsvo", question: "Stipulacija je primjer pravnog posla koji je:", options: ["kauzalni i neformalni", "apstraktni i formalni", "realni i neformalni", "konsenzualni"], correct: 1 },
      { id: "toz8df", question: "Što je modus?", options: ["slučajni sastojak posla", "bitni sastojak posla", "prirodni sastojak posla", "oblik konsenzualnog kontrakta"], correct: 0 },
      { id: "vob67k", question: "„X će sutra dati Y šator ako bude padala kiša.“ To je:", options: ["potestativni uvjet", "rok certus an certus quando", "mikstni uvjet", "kauzalni uvjet"], correct: 3 },
      { id: "jorx71", question: "„Muž obećaje ženi vilu kad mu rodi sina.“ Riječ je o:", options: ["emptio rei speratae", "suspenzivnom uvjetu", "modusu", "dies certus an certus quando"], correct: 1 },
      { id: "7cvift", question: "Nečija smrt kao početak učinka posla jest:", options: ["dies certus an certus quando", "dies incertus an certus quando", "dies certus an incertus quando", "condicio"], correct: 2 },
      { id: "xb37io", question: "Nečija punoljetnost (ako doživi) jest:", options: ["dies certus an certus quando", "dies certus an incertus quando", "dies incertus an certus quando", "dies incertus an incertus quando"], correct: 2 },
      { id: "xxn7ie", question: "„Ako je Ticije bio konzul“ (prošli događaj) jest:", options: ["prividni uvjet", "kauzalni uvjet", "nemogući uvjet", "rezolutivni uvjet"], correct: 0 },
      { id: "tfrri8", question: "Nemogući uvjet u poslu inter vivos čini posao:", options: ["valjanim bez uvjeta", "rezolutivno uvjetovanim", "pobojnim", "ništavim"], correct: 3 },
      { id: "bk6nkl", question: "Ako onaj kome je u interesu da se uvjet ne ispuni spriječi ispunjenje:", options: ["uvjet se smatra izjalovljenim", "uvjet se smatra ispunjenim", "posao je ništav", "nastupa pobojnost"], correct: 1 },
      { id: "8runyi", question: "Uz koji posao se ne smije staviti uvjet?", options: ["mancipatio", "emptio venditio", "locatio conductio", "donatio"], correct: 0 },
      { id: "41br92", question: "„Uvjet odgađa, ali ne sili; namet ne odgađa, ali sili“ – opisuje razliku:", options: ["roka i uvjeta", "essentialia i naturalia", "modusa i roka", "uvjeta i modusa"], correct: 3 },
      { id: "v55gxd", question: "Odgovornost prodavatelja za mane stvari pripada:", options: ["essentialia negotii", "naturalia negotii", "accidentalia negotii", "actus legitimi"], correct: 1 },
      { id: "v8rrex", question: "Dies interpellat pro homine znači:", options: ["početni dan se ne računa", "neizvjesni rok drži se uvjetom", "rok opominje umjesto čovjeka", "rok se računa po satima"], correct: 2 },
      { id: "acvdqh", question: "Modus se može dodati:", options: ["samo naplatnim poslovima", "samo kontraktima stricti iuris", "samo lukrativnim poslovima", "samo stipulaciji"], correct: 2 },
      { id: "5kqasi", question: "Vrijeme pendencije suspenzivnog uvjeta označava se kao:", options: ["condicio pendet", "condicio deficit", "condicio existit", "dies cedens"], correct: 0 }
    ],
    fillBlanks: [
      { id: "dp0qsi", sentence: "Dies incertus pro _______ habetur.", answer: "condicione", hint: "Uvjet – condicio." },
      { id: "5xg80d", sentence: "Bitni sastojci pravnog posla zovu se essentialia _______.", answer: "negotii", hint: "Genitiv od negotium." },
      { id: "s5uamd", sentence: "Početni rok zove se dies a _______.", answer: "quo", hint: "Od kojeg." },
      { id: "t4ipw6", sentence: "Uvjet koji ovisi dijelom o volji ovlaštenika, a dijelom o volji treće osobe, zove se condicio _______.", answer: "mixta", hint: "Ni potestativni ni kauzalni uvjet." },
      { id: "nxgzq5", sentence: "Uvjet čijim nastupom posao prestaje zove se condicio _______.", answer: "resolutiva", hint: "Suprotno suspenzivnom." }
    ],
    learn: {
      id: "stc0u7",
      title: "Negotium – pravni posao: vrste i sastojci",
      content: `<h3>Pojam</h3>
<p><strong>Pravni posao (negotium)</strong> je očitovanje privatne volje usmjereno na postizanje dopuštenih pravnih učinaka. Volja je središnji element – bez odgovarajuće izjave volje pravni posao ne može nastati.</p>

<h3>Vrste pravnih poslova</h3>
<ul>
<li><strong>Unilateralia</strong> (jednostrani) – potrebno je očitovanje volje jedne strane (npr. oporuka) / <strong>bilateralia</strong> (dvostrani) – očitovanja dviju strana; potreban je, ali ne uvijek i dovoljan sporazum (<em>consensus, conventio</em>). <strong>Svi ugovori (contractus) su dvostrani pravni poslovi</strong>, a s obzirom na obveze mogu biti:
<ul>
<li><strong>contractus unilateralis</strong> – jednostrano obvezujući (mutuum, stipulatio);</li>
<li><strong>contractus bilateralis aequalis</strong> – potpuno dvostrano obvezujući, sinalagmatični (kupoprodaja, zakup, ortakluk);</li>
<li><strong>contractus bilateralis inaequalis</strong> – nepotpuno dvostrano obvezujući: jedna strana je obvezana, druga samo iznimno (ostava, posudba, ugovor o zalogu, nalog).</li>
</ul></li>
<li><strong>Onerosa</strong> (naplatni – kupoprodaja) / <strong>lucrativa</strong> (besplatni – darovanje).</li>
<li><strong>Inter vivos</strong> / <strong>mortis causa</strong> (oporuka, darovanje za slučaj smrti).</li>
<li><strong>Apstraktni</strong> – ne vidi se pravni razlog (što ne znači da ne postoji), npr. stipulacija, mancipacija; formalni su, valjanost ovisi o formi, ne istražuje se volja / <strong>kauzalni</strong> – razlog je vidljiv (kupoprodaja); neformalni, valjanost ovisi o ispravnosti razloga; istražuje se prava volja (konsenzualni kontrakti).</li>
<li><strong>Formalni</strong> – volja se mora očitovati u određenom obliku / <strong>neformalni</strong> – stranke biraju oblik.</li>
<li><strong>Personalia</strong> (osobnopravni) / <strong>patrimonialia</strong> (imovinskopravni).</li>
</ul>

<h3>Sastojci pravnog posla</h3>
<ol>
<li><strong>Essentialia negotii</strong> – bitni elementi, nužni minimum bez kojeg posao ne nastaje; različiti za svaki posao (kupoprodaja: sporazum o <em>res</em> i <em>pretium</em>).</li>
<li><strong>Naturalia negotii</strong> – prirodni elementi koji su uključeni i bez izričitog ugovaranja jer proizlaze iz naravi posla; to su <strong>dispozitivne norme</strong> koje stranke mogu isključiti, umanjiti ili ograničiti (npr. odgovornost prodavatelja za mane stvari).</li>
<li><strong>Accidentalia negotii</strong> – slučajni elementi koje stranke po volji uključuju: <strong>condicio</strong> (uvjet), <strong>dies</strong> (rok), <strong>modus</strong> (namet).</li>
</ol>

<h3>Condicio – uvjet</h3>
<p>Budući i <strong>objektivno neizvjestan</strong> događaj o kojem po volji stranaka ovisi učinak pravnog posla.</p>
<table>
<tr><th>Podjela</th><th>Vrste</th></tr>
<tr><td>prema učinku</td><td><strong>suspenzivni</strong> (odgodni, <em>condicio suspensiva</em>) – odgađa nastanak i učinak posla; <strong>rezolutivni</strong> (raskidni, <em>condicio resolutiva</em>) – nastupom uvjeta posao prestaje</td></tr>
<tr><td>prema sadržaju</td><td><strong>afirmativni</strong> – ispunjen kad se okolnost dogodi; <strong>negativni</strong> – ispunjen kad postane sigurno da do uvjetovane promjene ne može doći</td></tr>
<tr><td>prema ovisnosti</td><td><strong>potestativni</strong> – ovisi o volji ovlaštenika; <strong>kazualni</strong> – o objektivnim okolnostima, slučaju (kiša, dobra ljetina); <strong>mikstni</strong> (<em>condicio mixta</em>) – dijelom o volji ovlaštenika, dijelom o volji treće osobe</td></tr>
</table>
<h4>Nepravi uvjeti (nedostaje budućnost ili neizvjesnost)</h4>
<ul>
<li><strong>prividni</strong> – uvjetovana okolnost već postoji ili se dogodila („ako je Ticije bio konzul“, „ako je jučer padala kiša“) – posao je bezuvjetan;</li>
<li><strong>nužni</strong> – sigurno će nastupiti („ako Ticije umre“) – bezuvjetan posao, ima učinak roka;</li>
<li><strong>nemogući</strong> („ako prstom dotakneš nebo“) – <em>impossibilium nulla obligatio</em>: poslovi inter vivos su <strong>ništavi</strong>, a u poslovima mortis causa uvjet se uzima kao nenapisan (<em>pro non scripto</em>);</li>
<li><strong>nemoralni</strong> (turpis, contra bonos mores) i <strong>nedopušteni</strong> (contra legem) – izjednačeni s nemogućima; i besmisleni uvjeti.</li>
</ul>
<h4>Učinak pravih uvjeta</h4>
<ul>
<li><strong>condicio pendet</strong> – vrijeme pendencije (čeka se ishod); kod suspenzivnog uvjeta posao još ne proizvodi učinak;</li>
<li><strong>condicio existit</strong> – očito je da se uvjet ispunio;</li>
<li><strong>condicio deficit</strong> – očito je da se uvjet izjalovio.</li>
</ul>
<p><strong>Fikcija ispunjenja uvjeta</strong> – Ulp. D. 50.17.161: <em>Quotiens per eum, cuius interest condicionem non impleri, fiat quominus impleatur, perinde haberi, ac si impleta condicio fuisset</em> – „Kad onaj kojem je u interesu da se uvjet ne ispuni učini da se ne ispuni, treba uzeti kao da je uvjet ispunjen.“</p>
<p><strong>Actus legitimi</strong> – formalistički poslovi starog civilnog prava (mancipatio, in iure cessio, hereditatis aditio, akti osnivanja i prijenosa očinske vlasti, oslobađanja) uz koje se ne može staviti ni uvjet ni rok – inače postaju ništavi.</p>

<h3>Dies – rok</h3>
<p>Budući <strong>izvjestan</strong> događaj od čijeg nastupanja po volji stranaka ovisi početak (<strong>dies a quo</strong>) ili prestanak (<strong>dies ad quem</strong>) učinka posla.</p>
<table>
<tr><th>Vrsta</th><th>Hoće li nastupiti / kada</th><th>Primjer</th></tr>
<tr><td>dies certus an, certus quando</td><td>sigurno; zna se kada</td><td>1. siječnja određene godine</td></tr>
<tr><td>dies certus an, incertus quando</td><td>sigurno; ne zna se kada</td><td>nečija smrt</td></tr>
<tr><td>dies incertus an, certus quando</td><td>ne zna se hoće li; zna se kada bi</td><td>nečija punoljetnost</td></tr>
<tr><td>dies incertus an, incertus quando</td><td>ne zna se ni hoće li ni kada</td><td>nečije diplomiranje</td></tr>
</table>
<h4>Regule o roku</h4>
<ul>
<li><em>Dies incertus pro condicione habetur</em> – „Neizvjesni rok drži se uvjetom“: rokovi kod kojih je neizvjesno hoće li nastupiti po svojoj su biti uvjeti.</li>
<li><em>Dies interpellat pro homine</em> – „Rok opominje umjesto čovjeka“: kod obveze s kalendarskim rokom dužnika ne treba opominjati.</li>
<li><em>Dies a quo non computatur in termino</em> – „Početni dan ne računa se u rok“.</li>
</ul>

<h3>Modus – namet</h3>
<p>Uzgredna odredba kojom se primatelju nameće izvršenje neke dužnosti. Dodaje se <strong>samo lukrativnim poslovima</strong> – inter vivos (darovanje, manumisija) i mortis causa (nasljedstvo, legat). Učinak nastupa <strong>odmah</strong> (primanjem dara, nasljedstva, legata) uz dužnost izvršenja naloga. <em>Uvjet odgađa, ali ne sili; namet ne odgađa, ali sili.</em> Kod Justinijana izvršenje se može tražiti tužbom <em>actio praescriptis verbis</em> ili <em>condictio causa data causa non secuta</em>.</p>
<p><strong>Gai. D. 35.1.17.4:</strong> „Ako je nekome zapisano tako da iz zapisa nešto učini, npr. spomenik oporučitelju, zgradu ili gozbu općinarima, ili da dio isplati drugome, smatra se da je zapisano pod nametom.“</p>`
    }
  },

  valjanostPoslova: {
    id: "bkyynr",
    name: "Valjanost pravnih poslova: volja, zablude, nevaljanost",
    icon: "fa-scale-unbalanced",
    color: "#ef4444",
    flashcards: [
      { id: "dkebw3", question: "Teorije o volji i očitovanju", answer: "Teorija volje (mjerodavna volja – štiti izjavitelja), teorija očitovanja (mjerodavno očitovanje – štiti primatelja), teorija povjerenja (načelno volja, uz zaštitu povjerenja).", explanation: "Staro rimsko pravo stoji na teoriji očitovanja." },
      { id: "8z5of1", question: "Izričito i prešutno očitovanje", answer: "Izričito – usmeno, pismeno, znacima; prešutno – iz ponašanja (konkludentne radnje). Šutnja se načelno ne smatra pristankom.", explanation: "Qui tacet consentire videtur – sporno pravilo." },
      { id: "nsycva", question: "Qui tacet consentire videtur", answer: "„Tko šuti, smatra se da pristaje (priznaje).“ Paul (D. 50.17.142) ograničava: tko šuti, ne priznaje, ali ipak ne niječe.", explanation: "Šutnja nije pristanak na ponudu." },
      { id: "blq5el", question: "Tumačenje volje – fragmenti", answer: "Gdje u riječima nema nejasnoće, ne istražuje se volja (Paul. D. 32.25.1); oporuke se tumače šire (D. 50.17.12); u ugovorima se više gleda volja nego riječ (D. 50.16.219).", explanation: "Kod formalističkih poslova volja se ne istražuje." },
      { id: "l8jw8m", question: "Nemo invitus agere cogitur", answer: "„Nikoga se ne može siliti na djelovanje protiv njegove volje.“", explanation: "Volja kao temelj pravnog posla." },
      { id: "s4f17g", question: "Ad probationem i ad sollemnitatem", answer: "Ad probationem – isprava služi radi dokazivanja (dokazna). Ad sollemnitatem – isprava je uvjet valjanosti posla (dispozitivna, npr. pretorska oporuka).", explanation: "Testatio (3. lice) i chirographum (1. lice) – dokazne isprave." },
      { id: "eg00vc", question: "Svjesni nesklad volje i očitovanja", answer: "Reservatio mentalis – posao vrijedi (vrijedi očitovanje); iocandi gratia (u šali, na pozornici) – posao ne vrijedi; simulacija – prividni posao je ništav.", explanation: "Varro, De lingua Latina 6.72: tko je rekao u šali, ne odgovara iz stipulacije." },
      { id: "n6wh9f", question: "Apsolutna i relativna simulacija", answer: "Apsolutna: stranke prividno sklapaju posao koji uopće ne žele – ništav. Relativna: prividnim (simuliranim) poslom prikrivaju drugi (disimulirani), koji vrijedi ako ispunjava pretpostavke.", explanation: "Npr. prodaja među supružnicima radi darovanja." },
      { id: "rt6n7e", question: "Error essentialis", answer: "Bitna zabluda koja čini posao nevaljanim: error in corpore (o predmetu), in substantia (o tvari), in negotio (o vrsti posla); error in persona samo kad je osoba bitna (brak, darovanje).", explanation: "Stih umjesto Pamfila; pozlaćeno umjesto zlatnog." },
      { id: "1flsu2", question: "Error nominis i error in motivo", answer: "Zabluda o imenu ne škodi (falsa demonstratio non nocet); zabluda o pobudi ne utječe na posao, osim u nasljednom pravu (oporuka).", explanation: "Paul. D. 5.2.28: majka je krivo čula da joj je sin umro." },
      { id: "3pllaz", question: "Dissensus", answer: "Nesporazum – stranke nesvjesno misle na različito (npr. jedna 5, druga 50); zabluda o pravoj volji druge strane – posao je ništav (Pomp. D. 44.7.57).", explanation: "Povezano s error in negotio." },
      { id: "wti6m5", question: "Dolus (prijevara) kao mana volje", answer: "Zlonamjerno dovođenje ili održavanje drugoga u zabludi radi protupravne koristi. Civilno ne utječe na posao; pretor daje actio doli (1 godina, jednostruko), exceptio doli i restitutio in integrum.", explanation: "Dolus non praesumitur." },
      { id: "866jdc", question: "Dolus non praesumitur", answer: "„Zla namjera se ne predmnijeva“ – onaj tko je tvrdi, mora je dokazati.", explanation: "Uz Ignorantia iuris/facti – regula općeg dijela." },
      { id: "y39g9k", question: "Vis ac metus", answer: "Sila i strah: vis absoluta (fizička – ništavost), vis compulsiva (psihička – pobojnost). Pretor: actio quod metus causa (4-struko u godini), exceptio metus, restitutio in integrum.", explanation: "Strah opravdan, prisila protupravna." },
      { id: "9cgwlo", question: "Razlozi nevaljanosti pravnog posla", answer: "Nedostaci u subjektu (pravna i djelatna sposobnost), u volji i suglasnosti očitovanja, u formi, u činidbi (sadržaju) i u pravnoj dopuštenosti.", explanation: "Bitan nedostatak – ništavost; manji – pobojnost." },
      { id: "1vcvly", question: "Ništavost (nullitas)", answer: "Posao zbog bitnog nedostatka ne proizvodi učinke, ex tunc (od sklapanja). Apsolutna – sudac pazi po službenoj dužnosti; relativna – na nju paze stranke.", explanation: "Može biti potpuna ili djelomična, početna ili naknadna." },
      { id: "5hgg4z", question: "Pobojnost", answer: "Posao s manjim nedostatkom koji se na zahtjev stranke može proglasiti nevaljanim; djeluje ex nunc, od pravomoćnosti presude.", explanation: "Razvila se pretorskim pravom." },
      { id: "owsdoj", question: "Lex perfecta, minus quam perfecta, imperfecta", answer: "Perfecta – posao protivan normi je ništav. Minus quam perfecta – vrijedi, ali stranke snose posljedicu. Imperfecta – vrijedi bez posljedica (uputa).", explanation: "Plus quam perfecta – ništav i kažnjiv." },
      { id: "8ldfti", question: "Utile per inutile non vitiatur", answer: "„Valjani dio pravnog posla ostaje na snazi unatoč nevaljanom dijelu.“", explanation: "Djelomična ništavost." },
      { id: "739le1", question: "Quod initio vitiosum est non potest tractu temporis convalescere", answer: "„Što je od početka nevaljano, ne može se tijekom vremena ispraviti“ (regula Catoniana).", explanation: "Iznimke: konvalidacija." },
      { id: "xbe6xt", question: "Konvalidacija: ratihabicija i konverzija", answer: "Ratihabitio – naknadno priznanje posla ili otpadanje razloga nevaljanosti (npr. prodavatelj tuđe stvari postane vlasnik). Conversio – nevaljani posao održava se kao drugi valjani posao.", explanation: "Nevaljana akceptilacija → pactum de non petendo." },
      { id: "grqhbq", question: "Praesumitur ignorantia ubi scientia non probatur", answer: "„Predmnijeva se neznanje ako se ne dokaže znanje.“", explanation: "Teret dokaza je na onome tko tvrdi znanje." },
      { id: "tldw2t", question: "Zastupanje u rimskom pravu", answer: "Neposredno zastupanje (u tuđe ime i za tuđi račun) civilno pravo nije dopuštalo; posredni zastupnik djeluje u svoje ime za tuđi račun. Glasnik (nuntius) samo prenosi volju.", explanation: "Iznimke: actiones adiecticiae qualitatis." },
      { id: "nd52e6", question: "In fraudem legis", answer: "Poslovi kojima se zaobilazi zakon su nevaljani – npr. Lex Fufia Caninia ograničava oporučno oslobađanje robova i poništava odredbe kojima se htjelo izigrati zakon.", explanation: "Od 439. svi zabranjeni poslovi su ništavi." }
    ],
    quiz: [
      { id: "1r9an0", question: "Koja regula vrijedi za maloljetnike i žene prema Paul. D. 22.6.9?", options: ["ignorantia facti nocet", "dolus praesumitur", "ignorantia iuris semper nocet", "ignorantia iuris non nocet"], correct: 3 },
      { id: "fh6fpz", question: "Posao sklopljen u šali (iocandi gratia):", options: ["vrijedi jer vrijedi očitovanje", "nije valjan", "pobojan je u roku od godine", "vrijedi kao darovanje"], correct: 1 },
      { id: "l6x5h4", question: "Kod mentalne rezervacije posao je:", options: ["valjan", "pobojan", "ništav", "relativno ništav"], correct: 0 },
      { id: "xdx91l", question: "Netko kupuje predmet misleći da je od zlata, a pozlaćen je. To je:", options: ["error nominis", "error in motivo", "error in persona", "error in substantia"], correct: 3 },
      { id: "m8sinn", question: "Zabluda o pobudi utječe na valjanost posla:", options: ["uvijek, kod svih poslova", "samo u nasljednom pravu", "nikada, ni kod oporuke", "samo kod kupoprodaje"], correct: 1 },
      { id: "lxvgoi", question: "Ništavost djeluje:", options: ["ex nunc", "od pravomoćnosti presude", "ex tunc", "od isteka roka zastare"], correct: 2 },
      { id: "qojht4", question: "Pobojnost djeluje:", options: ["ex tunc", "od sklapanja posla", "ex nunc", "retroaktivno"], correct: 2 },
      { id: "kdc2ba", question: "Na apsolutnu ništavost pazi:", options: ["sud po službenoj dužnosti", "samo oštećena stranka u roku", "pretor na zahtjev vjerovnika", "nitko, posao ostaje valjan"], correct: 0 },
      { id: "duqap4", question: "Fizička prisila (vis absoluta) dovodi do:", options: ["pobojnosti", "konverzije", "valjanosti", "ništavosti"], correct: 3 },
      { id: "pqnzd7", question: "Actio quod metus causa u roku od godine ide na:", options: ["jednostruki iznos", "četverostruki iznos", "trostruki iznos", "dvostruki iznos"], correct: 1 },
      { id: "lospc5", question: "Actio doli imala je rok od:", options: ["godine dana", "dvije godine", "tri godine", "30 dana"], correct: 0 },
      { id: "lzlg4r", question: "Koju tužbu pretor daje onome tko je posao sklopio pod prisilom (metus)?", options: ["actio quod metus causa", "actio doli (zbog prijevare)", "actio negotiorum gestorum", "condictio indebiti (nedug)"], correct: 0 },
      { id: "w6hqqg", question: "Ako je posao protivan normi koja je lex minus quam perfecta:", options: ["posao je ništav od početka, bez ikakvih učinaka", "vrijedi, ali stranke snose posljedicu", "vrijedi i nema nikakvih posljedica", "ništav je i stranke se kažnjavaju"], correct: 1 },
      { id: "ezekx9", question: "Netko proda tuđu stvar, a kasnije postane njezin vlasnik. Posao se ispravlja:", options: ["konverzijom", "simulacijom", "ratihabicijom", "novacijom"], correct: 2 },
      { id: "mbv9zm", question: "Nevaljana akceptilacija održava se kao neformalni pactum de non petendo. To je:", options: ["dissensus", "ratihabicija", "konverzija", "restitutio"], correct: 2 },
      { id: "xjs0uy", question: "Ako jedna strana misli na zakup, a druga na kupnju, posao je:", options: ["ništav zbog dissensusa", "valjan kao ugovor o zakupu", "valjan kao ugovor o kupnji", "pobojan na zahtjev kupca"], correct: 0 },
      { id: "e1scem", question: "Neposredno zastupanje po rimskom civilnom pravu:", options: ["bilo je pravilo", "vrijedilo je samo u postupku", "vrijedilo je samo za robove", "nije bilo dopušteno"], correct: 3 },
      { id: "gmc6bn", question: "Isprava kojom se posao samo dokazuje sastavlja se:", options: ["ad sollemnitatem", "ad probationem", "in fraudem legis", "ex tunc"], correct: 1 },
      { id: "v4r80q", question: "Relativna simulacija: disimulirani posao je:", options: ["valjan ako ispunjava pretpostavke", "uvijek ništav kao i simulirani", "pobojan na zahtjev trećih osoba", "valjan samo ako je sklopljen pisano"], correct: 0 },
      { id: "tuza6d", question: "Hadrijan je odlučio da nasljedstvo pripada sinu vojniku za kojeg je majka krivo čula da je umro. Riječ je o:", options: ["simulaciji oporučne raspoložbe", "error in substantia glede cijele ostavine", "dissensu između majke i sina", "error in motivo u nasljednom pravu"], correct: 3 },
      { id: "gcdsh0", question: "Što od navedenog nije ispravna regula?", options: ["dolus non praesumitur", "ignorantia iuris excusat", "ignorantia facti excusat", "utile per inutile non vitiatur"], correct: 1 }
    ],
    fillBlanks: [
      { id: "tvh6v2", sentence: "Valjani dio posla ostaje unatoč nevaljanom: utile per inutile non _______.", answer: "vitiatur", hint: "Ne kvari se." },
      { id: "4e1zsu", sentence: "Dolus non _______.", answer: "praesumitur", hint: "Ne predmnijeva se." },
      { id: "yfk16x", sentence: "Praesumitur ignorantia ubi _______ non probatur.", answer: "scientia", hint: "Znanje." }
    ],
    learn: {
      id: "0jfoyw",
      title: "Pretpostavke valjanosti i nevaljanost pravnih poslova",
      content: `<h3>Volja i očitovanje</h3>
<p>Volja je središnji element pravnog posla; mora biti privatna, očitovana i usmjerena na dopuštene pravne učinke. Odnos volje i očitovanja objašnjavaju:</p>
<ul>
<li><strong>teorija volje</strong> – mjerodavna je volja (štiti onoga tko daje očitovanje);</li>
<li><strong>teorija očitovanja</strong> – mjerodavno je očitovanje (štiti onoga kome je dano); staro rimsko pravo stoji na njoj (formalizam);</li>
<li><strong>teorija povjerenja</strong> – načelno volja, uz zaštitu opravdanog povjerenja.</li>
</ul>
<p>Prema obliku očitovanja poslovi su <strong>formalni</strong> (oblik određuje pravni učinak) i <strong>neformalni</strong> – volja se izražava <strong>izričito</strong> (usmeno, pismeno, znacima) ili <strong>prešutno</strong> (konkludentnim radnjama). Šutnja se načelno ne smatra pristankom na ponudu.</p>
<h4>Pravila tumačenja</h4>
<ul>
<li><em>Qui tacet consentire videtur</em> – „Tko šuti, priznaje“ – sporno; Paul. D. 50.17.142: <em>Qui tacet, non utique fatetur; sed tamen verum est eum non negare</em> – „Tko šuti, nikako ne priznaje, ali je istina da ne niječe.“</li>
<li>Nedvosmislenost: Paul. D. 32.25.1 – „Ako nema nejasnoće u riječima, ne može se dopustiti istraživanje volje.“</li>
<li>Nasljedno pravo: Paul. D. 50.17.12 – „U oporukama tumačimo što šire volju oporučitelja.“</li>
<li>Konsenzualni ugovori: Paul. D. 50.16.219 – „U ugovorima treba više paziti na volju ugovaratelja nego na riječi.“</li>
<li>Kod formalističkih poslova volja se ne istražuje.</li>
<li><em>Nemo invitus agere cogitur</em> – „Nikoga se ne može siliti na djelovanje protiv njegove volje.“</li>
<li><em>Praesumitur ignorantia ubi scientia non probatur</em> – „Predmnijeva se neznanje ako se ne dokaže znanje.“</li>
</ul>
<h4>Isprave</h4>
<p>Ako je pisana forma bitni element valjanosti, isprava je <strong>dispozitivna</strong> – <em>ad sollemnitatem</em> (radi valjanosti; npr. pretorska oporuka). Kod neformalnih poslova isprava je <strong>dokazna</strong> – <em>ad probationem</em> (radi dokazivanja): <strong>testatio</strong> (stilizirana u 3. licu) i <strong>chirographum</strong> (u 1. licu; u principatu ih je sastavljao pisar – <em>tabellio</em>).</p>

<h3>Razlozi nevaljanosti</h3>
<p>Nedostaci u: <strong>subjektu</strong> (pravna i djelatna sposobnost); <strong>volji</strong> (valjano i suglasno očitovanje kod dvostranih poslova); <strong>formi</strong>; <strong>činidbi</strong> (sadržaju) i <strong>pravnoj dopuštenosti</strong>.</p>
<h4>Sadržaj posla – odnos norme i posla</h4>
<table>
<tr><th>Vrsta zakona</th><th>Posao protivan normi</th></tr>
<tr><td><strong>lex perfecta</strong></td><td>ništav</td></tr>
<tr><td><strong>lex minus quam perfecta</strong></td><td>vrijedi, ali stranke snose posljedicu (sankciju)</td></tr>
<tr><td><strong>lex imperfecta</strong></td><td>vrijedi, bez posljedica za stranke (više uputa)</td></tr>
<tr><td><em>lex plus quam perfecta</em></td><td>ništav, a stranke se i kažnjavaju</td></tr>
</table>
<p>Edikt Teodozija II. i Valentinijana III. (439.) – svi zabranjeni poslovi su ništavi (kasnije: ako nije propisana druga sankcija). Poslovi <strong>in fraudem legis</strong> (radi zaobilaženja zakona) su nevaljani – npr. <em>Lex Fufia Caninia</em> (2. pr. Kr.) ograničava oporučno oslobađanje robova i poništava odredbe kojima se htjelo izigrati zakon.</p>

<h3>Nesklad volje i očitovanja</h3>
<h4>I. Svjesni nesklad</h4>
<ul>
<li><strong>Reservatio mentalis</strong> – stranka svjesno izjavi ono što ne želi; posao <strong>vrijedi</strong> (vrijedi očitovanje).</li>
<li><strong>Iocandi gratia</strong> – u šali ili na pozornici; nema volje za posao – <strong>nije valjan</strong>. Varro, <em>De lingua Latina</em> 6.72: „Ako je rekao u šali, ne može se s njim voditi spor iz stipulacije“ (glumac u drami koji pita „sjećaš li se da si mi obećao kćer?“).</li>
<li><strong>Simulacija</strong> – stranke posao sklapaju samo prividno da kod trećih stvore dojam. <em>Apsolutna</em> – simulirani posao je ništav; <em>relativna</em> – simulirani je ništav, a prikriveni (disimulirani) valjan ako ispunjava pretpostavke valjanosti. Ulp. D. 24.1.5.5: prodaja između muža i žene radi darovanja nije valjana (Neracije).</li>
</ul>
<h4>II. Nesvjesni nesklad – zablude (error)</h4>
<p><strong>Error</strong> je netočna predodžba o činjenici bitnoj za posao: <em>error facti</em> (o činjenicama) i <em>error iuris</em> (o pravnim propisima). Uvažava se zabluda koja je ispričiva i bitna; rimsko klasično pravo u pravilu nije tražilo da bude neskrivljena.</p>
<table>
<tr><th>Zabluda</th><th>Primjer</th><th>Učinak</th></tr>
<tr><td><strong>error in corpore</strong></td><td>htio kupiti roba Stiha, kupio Pamfila</td><td>nevaljan posao (bitna)</td></tr>
<tr><td><strong>error in substantia</strong></td><td>misli da je predmet od zlata, a pozlaćen je</td><td>nevaljan (bitna)</td></tr>
<tr><td><strong>error in negotio</strong></td><td>jedan daje zajam, drugi misli da je darovanje</td><td>ništav (bitna)</td></tr>
<tr><td><strong>error in persona</strong></td><td>važna je osoba kod darovanja (ne kod kupoprodaje)</td><td>bitna samo kod nekih poslova (npr. brak – iznimka)</td></tr>
<tr><td><strong>error nominis</strong></td><td>rob se zove Stih, a misli se da je Julije</td><td>ne škodi – <em>falsa demonstratio non nocet</em></td></tr>
<tr><td><strong>error in motivo</strong></td><td>kupuje srećku uvjeren da će dobiti</td><td>ne utječe, <strong>osim u nasljednom pravu</strong></td></tr>
</table>
<p><strong>Paul. D. 5.2.28:</strong> „Kako je majka krivo čula da joj je sin vojnik umro i oporukom postavila druge za nasljednike, božanski Hadrijan odredio je da nasljedstvo pripada sinu“ – error in motivo u nasljednom pravu.</p>
<p><strong>Dissensus</strong> – zabluda o pravoj volji druge strane (jedna misli 5, druga 50); Pomp. D. 44.7.57 pr.: „Ako kod sklapanja poslova kupac ili zakupoprimac misli jedno, a druga strana drugo, ništa ne vrijedi od onoga što je učinjeno“ – ništavost.</p>
<p><strong>Error facti / error iuris:</strong> <em>ignorantia facti excusat – non nocet</em>; <em>ignorantia iuris non excusat – nocet</em>; iznimka za maloljetnike ispod 25 i žene u nekim slučajevima (Paul. D. 22.6.9 pr.) – za njih <em>ignorantia iuris non nocet</em>.</p>
<h4>Dolus (prijevara)</h4>
<p>Zlonamjerno dovođenje drugoga u zabludu ili održavanje u zabludi da bi se izvukla protupravna imovinska korist – volja je stvorena lažnim prikazivanjem činjenica. Po starom civilnom pravu ne utječe na posao; pretor daje: <strong>actio doli</strong> (rok 1 godina, naknada štete u jednostrukom iznosu, arbitrarna klauzula, infamija), <strong>exceptio doli</strong> (prigovor protiv tužbe prevaranta) i <strong>restitutio in integrum</strong>. <em>Dolus non praesumitur</em> – zla namjera se ne predmnijeva.</p>
<h4>Vis ac metus (sila i strah)</h4>
<p>Očitovanje je suglasno s voljom, ali je volja nastala prisilom izvana; strah mora biti opravdan, a prisila protupravna. <strong>Vis absoluta</strong> (fizička prisila) – ništavost; <strong>vis compulsiva</strong> (psihička) – pobojnost. Po civilnom pravu posao vrijedi, a pretor daje <strong>actio quod metus causa</strong> (u roku godine na četverostruku vrijednost), <strong>exceptio metus</strong> i <strong>restitutio in integrum</strong>.</p>

<h3>Ništavost i pobojnost</h3>
<table>
<tr><th></th><th>Ništavost</th><th>Pobojnost</th></tr>
<tr><td>uzrok</td><td>bitan nedostatak</td><td>manji nedostatak</td></tr>
<tr><td>djelovanje</td><td><strong>ex tunc</strong> – od sklapanja</td><td><strong>ex nunc</strong> – od pravomoćnosti presude, za ubuduće</td></tr>
<tr><td>tko pazi</td><td>apsolutna – <strong>sud ex offo</strong>; relativna – stranke (posao vrijedi dok ovlaštena strana ne zatraži poništenje)</td><td>stranke (samo na zahtjev)</td></tr>
</table>
<p>Ništavost može biti potpuna ili djelomična (preostali dio vrijedi – <em>utile per inutile non vitiatur</em>), početna ili naknadna. Staro civilno pravo znalo je samo ništavost; pobojnost se razvila pretorskim pravom.</p>
<h4>Konvalidacija</h4>
<p>Načelo – <strong>regula Catoniana</strong>: <em>Quod initio vitiosum est non potest tractu temporis convalescere</em> – „Što je od početka nevaljano, ne može se tijekom vremena ispraviti.“ Iznimno se nevaljanost ispravlja:</p>
<ul>
<li><strong>ratihabitio</strong> – naknadno priznanje posla (od druge strane) ili otpadanje razloga nevaljanosti (kod pobojnosti ili relativne ništavosti) – npr. tko proda tuđu stvar pa naknadno postane njezin vlasnik;</li>
<li><strong>conversio</strong> – sadržaj nevaljanog posla održava se kao drugi posao čije pretpostavke ispunjava – npr. akceptilacija nevaljana zbog forme održava se kao neformalni <em>pactum de non petendo</em>.</li>
</ul>

<h3>Stranka i zastupanje</h3>
<p>Stranka mora imati pravnu i djelatnu sposobnost i interes za posao. Posao se može sklopiti preko trećega: <strong>glasnik (nuntius)</strong> samo prenosi tuđu volju (ne treba djelatnu sposobnost); <strong>zastupnik</strong> očituje vlastitu volju za drugoga. <strong>Neposredno zastupanje</strong> (u tuđe ime i za tuđi račun – učinci odmah za zastupanoga) rimsko civilno pravo <strong>nije dopuštalo</strong> (ni Justinijan načelno); <strong>posredno zastupanje</strong> (u svoje ime, za tuđi račun) – zastupnik stječe prava i obveze pa ih internim odnosom prenosi na gospodara posla. Zastupanje je nužno (zakonsko – tutor, kurator) ili dobrovoljno (mandatum, negotiorum gestio). Za obveze osoba u vlasti pretor daje actiones adiecticiae qualitatis. <em>Ratihabitio mandato comparatur</em> – naknadno odobrenje izjednačuje se s nalogom.</p>`
    }
  },

  possessio: {
    id: "f2y8ki",
    name: "Posjed (possessio)",
    icon: "fa-hand-holding-hand",
    color: "#06b6d4",
    flashcards: [
      { id: "kqhskd", question: "Possessio", answer: "Faktična vlast na tjelesnoj stvari, neovisno o pravu, uz koju pravni poredak veže pravne učinke (zaštitu). Posjed nije vlasništvo ni stvarno pravo, nego pravna činjenica.", explanation: "Posjed ≠ vlasništvo." },
      { id: "0z7v79", question: "Elementi posjeda", answer: "Corpus – faktično držanje stvari; animus possidendi – volja da se stvar drži za sebe.", explanation: "Bez animusa – detencija." },
      { id: "4d19xq", question: "Detentio", answer: "Puko držanje stvari (obično za drugoga, na temelju obveznog posla) bez animus possidendi – bez posjedovne zaštite (possessio naturalis).", explanation: "Npr. depozitar, komodatar, zakupnik." },
      { id: "v6vm7y", question: "Izvedeni posjed – tko je zaštićen bez animusa?", answer: "Prekarist (stvar na besplatno korištenje do opoziva), sekvestar (stvar u pohrani za trajanja spora) i založni vjerovnik (ručni zalog) – imaju interdiktnu zaštitu iako drže stvar za drugoga.", explanation: "Iznimke od pravila o detenciji." },
      { id: "6mnu85", question: "Possessio ad interdicta", answer: "Posjed zaštićen pretorskim interdiktima – corpus i animus possidendi; imaju ga i vlasnik, i pošteni, i nepošteni posjednik (ovaj samo prema trećima).", explanation: "Ne pita se o pravu na posjed." },
      { id: "l3w00o", question: "Possessio civilis (ad usucapionem)", answer: "Interdiktni posjed uz pravni razlog (iusta causa, iustus titulus) – vodi stjecanju vlasništva tradicijom i dosjelošću.", explanation: "U postklasici possessio iusta = civilis." },
      { id: "d71xth", question: "Possessio vitiosa i non vitiosa", answer: "Viciozan je posjed stečen silom (vi), potajno (clam) ili na molbu do opoziva (precario) – u odnosu prema protivniku; neviciozan je bez tih mana.", explanation: "Važno kod interdikata (exceptio vitiosae possessionis)." },
      { id: "zuzcus", question: "Possessio bonae fidei i malae fidei", answer: "Bonae fidei – stjecatelj je u oprostivoj zabludi da ne vrijeđa tuđe pravo. Malae fidei – znao je ili je uz dužnu pažnju mogao znati za nedostatak prava prethodnika.", explanation: "Važno za dosjelost, plodove i izdatke." },
      { id: "4ug7zp", question: "Stjecanje posjeda – originarno i derivativno", answer: "Originarno – jednostranim zauzimanjem (occupatio). Derivativno – dogovorom s dotadašnjim posjednikom: traditio (i njezini oblici) i constitutum possessorium.", explanation: "Pukom voljom posjed se ne stječe." },
      { id: "q1etm4", question: "Traditio longa manu i simbolička tradicija", answer: "Longa manu – prodavatelj kupcu pokaže zemljište s obližnjeg mjesta; simbolička – predaja simbola (ključevi, gruda zemlje).", explanation: "Mijenja se faktično stanje (stječe se corpus i animus)." },
      { id: "4qmfd0", question: "Traditio brevi manu", answer: "Detentor naknadnim dogovorom stječe i animus possidendi – postaje posjednik bez promjene faktičnog stanja (npr. zakupnik kupi zakupljenu stvar).", explanation: "Detentor → posjednik." },
      { id: "6odjlu", question: "Constitutum possessorium", answer: "Posjednik postaje detentor – stjecatelj stječe posjed samim dogovorom bez predaje (npr. vlasnik proda kuću i ostane u njoj kao najmoprimac). U klasici još nije poznat.", explanation: "Posjednik → detentor." },
      { id: "9h751o", question: "Paul. D. 41.2.3.3 (Neracije i Prokul)", answer: "„Ne možemo steći posjed samom namjerom, ako ne prethodi faktično držanje.“ (solo animo non posse nos adquirere possessionem)", explanation: "Za stjecanje posjeda trebaju i corpus i animus; sama volja bez faktičnog držanja nije dovoljna." },
      { id: "5n689e", question: "Gubitak posjeda", answer: "Gubitkom corpusa ili animusa: uništenje, krađa, otmica ili gubitak stvari. Posjed se može zadržati samom voljom (zimski i ljetni pašnjaci), ali se samom voljom ne stječe.", explanation: "Animo retinetur." },
      { id: "e7k3l9", question: "Melior est condicio possidentis", answer: "„Bolji je položaj posjednika“ – u sporu posjednik je tuženi i ne mora dokazivati; tužitelj dokazuje.", explanation: "Prednost posjeda." },
      { id: "9q4zeo", question: "Interdicta retinendae possessionis", answer: "Prohibitorni interdikti za zaštitu posjeda od smetanja (zabrana, jamstvo, naknada štete); rok jedne godine (tempus utile): uti possidetis i utrubi.", explanation: "Interdicta duplicia – obje stranke." },
      { id: "0pjois", question: "Interdictum uti possidetis", answer: "Štiti posjed nekretnina: zaštićen je sadašnji (posljednji) posjednik, ako posjed nije viciozan prema protivniku.", explanation: "Kod vicioznog postaje restitutoran." },
      { id: "lftxb6", question: "Interdictum utrubi", answer: "Štiti posjed pokretnina: pobjeđuje onaj tko je stvar (neviciozno) držao dulje u protekloj godini, računajući unatrag od izdavanja interdikta.", explanation: "Za razliku od interdikta za nekretnine, kod pokretnina presuđuje dulji posjed u godini, a ne trenutni." },
      { id: "7nct63", question: "Interdicta recuperandae possessionis", answer: "Restitutorni interdikti za vraćanje oduzetog posjeda (interdicta simplicia): interdictum de vi i de vi armata.", explanation: "Odnose se na izbacivanje s nekretnine." },
      { id: "lqcm47", question: "Interdictum de vi i de vi armata", answer: "De vi – nasilno izbacivanje bez oružja, rok 1 godina, samo neviciozni posjednik (exceptio). De vi armata – izbacivanje oružjem ili gomilom, bez roka i bez exceptio, i protiv vlasnika.", explanation: "Nakon godine – actio in factum." },
      { id: "rh2hxr", question: "Zabrana petitornih prigovora", answer: "U posjedovnom sporu ne raspravlja se o pravu na posjed, nego samo o stanju posjeda; vlasnik koji izgubi posjedovni spor može pokrenuti rei vindicatio.", explanation: "Cilj: mirno stanje." },
      { id: "tznwrj", question: "Javol. D. 41.3.16 (ugovor o zalogu)", answer: "„Tko je dao zalog, posjeduje samo glede dosjelosti; za sve ostale posljedice posjeduje onaj tko je primio.“", explanation: "Založni dužnik – ad usucapionem; vjerovnik – ad interdicta." },
      { id: "cd5vt1", question: "Flor. D. 16.3.17.1 (ostava i sekvestar)", answer: "Vlasništvo i posjed deponirane stvari ostaju kod deponenta, osim kod sekvestra – tada posjeduje sekvestar, da nijednoj strani ne teče vrijeme posjeda.", explanation: "Depozitar je samo detentor." },
      { id: "dbtnrn", question: "Actio momentariae possessionis", answer: "Justinijanovo sredstvo za vraćanje posjeda oduzetog i bez uporabe sile.", explanation: "Postklasika: actio (interdictum) momentaria." },
      { id: "fscbz4", question: "Quasi possessio", answer: "„Posjed prava“ – izvršavanje sadržaja prava (npr. služnosti) koje se štiti analogno posjedu stvari.", explanation: "Traditio / patientia služnosti." }
    ],
    quiz: [
      { id: "bziija", question: "Detentor je osoba koja ima:", options: ["corpus i animus possidendi", "samo animus possidendi", "samo corpus", "pravo vlasništva"], correct: 2 },
      { id: "vwh3kr", question: "Tko od navedenih ima posjedovnu zaštitu iako drži stvar za drugoga?", options: ["depozitar", "komodatar", "sekvestar", "zakupnik"], correct: 2 },
      { id: "fkko2h", question: "Koji je interdikt za zaštitu posjeda pokretnina?", options: ["interdictum utrubi", "interdictum uti possidetis", "interdictum de vi", "interdictum Salvianum"], correct: 0 },
      { id: "skjju3", question: "Kod interdictum utrubi pobjeđuje:", options: ["posljednji posjednik u času izdavanja interdikta", "tko je prvi podnio zahtjev pretoru i dao jamce", "vlasnik stvari ako dokaže kviritsko vlasništvo", "tko je dulje neviciozno držao stvar u protekloj godini"], correct: 3 },
      { id: "ur9oxq", question: "Koji su interdikti restitutorni?", options: ["uti possidetis i utrubi", "de vi i de vi armata", "utrubi i de vi", "Salvianum i quorum bonorum"], correct: 1 },
      { id: "tcmisv", question: "Interdictum de vi armata:", options: ["nije vremenski ograničen", "sadrži exceptio vitiosae possessionis", "ograničen je na godinu dana", "štiti samo pokretnine"], correct: 0 },
      { id: "0yyiwe", question: "Kod kojeg načina stjecanja posjeda ne dolazi do promjene faktičnog stanja?", options: ["traditio longa manu", "simbolička tradicija", "occupatio", "traditio brevi manu"], correct: 3 },
      { id: "ybnjoq", question: "Vlasnik proda kuću i ostane u njoj kao najmoprimac. Kupac je posjed stekao:", options: ["traditio brevi manu", "constitutum possessorium", "traditio longa manu", "simbolička tradicija"], correct: 1 },
      { id: "bjtsql", question: "Tko u ugovoru o zalogu (ručni zalog) posjeduje glede dosjelosti?", options: ["založni vjerovnik", "nitko", "zalogodavac (založni dužnik)", "obje strane jednako"], correct: 2 },
      { id: "b1bfvi", question: "Tko u ugovoru o zalogu posjeduje glede svih ostalih posljedica (interdikti)?", options: ["zalogodavac (založni dužnik)", "nitko, jer je riječ o detenciji", "zalogoprimac (založni vjerovnik)", "sekvestar kojeg odredi pretor"], correct: 2 },
      { id: "332ahj", question: "Posjed stečen potajno naziva se posjedom stečenim:", options: ["clam", "vi", "precario", "bona fide"], correct: 0 },
      { id: "tb3x30", question: "Može li vlasnik biti neposjednik?", options: ["samo kod nekretnina u provinciji", "ne, vlasništvo uvijek uključuje i posjed", "samo kod res nec mancipi stečenih predajom", "da – rei vindicatio podiže vlasnik neposjednik"], correct: 3 },
      { id: "b99d34", question: "Po Neraciju i Prokulu, posjed se ne može steći:", options: ["tradicijom od dotadašnjeg posjednika", "samom namjerom bez faktičnog držanja", "preko zastupnika ili osobe u vlasti", "simboličkom predajom ključeva"], correct: 1 },
      { id: "dsaaki", question: "Posjed se gubi kad:", options: ["je stvar ukradena ili izgubljena", "vlasnik privremeno otputuje na ljetni pašnjak", "posjednik spava", "posjednik da stvar u ostavu"], correct: 0 },
      { id: "6exci0", question: "U posjedovnom sporu pred pretorom:", options: ["raspravlja se o pravu vlasništva", "dokazuje se kviritsko vlasništvo", "presudu donosi centumvirski sud", "zabranjeni su petitorni prigovori"], correct: 3 },
      { id: "ga73fl", question: "Interdictum uti possidetis štiti:", options: ["posjed pokretnina", "posjed nekretnina", "posjed prava", "detentore"], correct: 1 },
      { id: "erg5jg", question: "„Melior est condicio possidentis“ znači:", options: ["posjednik je uvijek vlasnik", "posjed se stječe voljom", "bolji je položaj posjednika", "vlasnik snosi slučaj"], correct: 2 }
    ],
    fillBlanks: [
      { id: "d5uqy9", sentence: "Volja da se stvar drži za sebe zove se animus _______.", answer: "possidendi", hint: "Posjedovati." },
      { id: "xgrt9o", sentence: "Posjed stečen silom, potajno ili precario zove se possessio _______.", answer: "vitiosa", hint: "S manom." },
      { id: "y2rcjv", sentence: "Restitutorni interdikt za nasilno izbacivanje bez oružja zove se interdictum de _______.", answer: "vi", hint: "Sila." },
      { id: "k6b3pj", sentence: "Melior est condicio _______.", answer: "possidentis", hint: "Onoga tko posjeduje." },
      { id: "3oftj6", sentence: "Prohibitorni interdikti zovu se interdicta _______ possessionis.", answer: "retinendae", hint: "Zadržavanje posjeda." },
      { id: "zlui80", sentence: "Neovisno o pravu, posjed je faktična vlast koja je pravna _______, a ne pravo.", answer: "činjenica", hint: "Ne pravo, nego…" },
      { id: "276fzh", sentence: "Izvršavanje sadržaja prava, npr. služnosti, naziva se quasi _______.", answer: "possessio", hint: "Posjed." },
      { id: "g8sub4", sentence: "Justinijanovo sredstvo za oduzeti posjed i bez sile jest actio momentariae _______.", answer: "possessionis", hint: "Genitiv od possessio." }
    ],
    learn: {
      id: "nzdpfg",
      title: "Posjed: pojam, vrste, stjecanje, gubitak i zaštita",
      content: `<h3>Pojam</h3>
<p><strong>Possessio</strong> je faktična vlast na tjelesnoj stvari, bez obzira na pravo; faktično stanje koje ima odraz u pravu. Posjed je neovisan o tome ima li posjednik pravo na tu vlast. <strong>Posjed ≠ vlasništvo</strong>, <strong>posjed ≠ stvarno pravo</strong> – posjed je <strong>pravna činjenica</strong>: držanje stvari kojem pravo pruža zaštitu.</p>
<ul>
<li><strong>Possessio</strong> – pravna (interdiktna) zaštita (+); <strong>detentio</strong> – puko držanje (npr. za drugoga), bez zaštite (–); <em>retentio</em> – zadržavanje stvari (uz založno pravo).</li>
<li><strong>Elementi</strong>: <strong>corpus</strong> (faktično držanje) i <strong>animus possidendi</strong> (volja držati stvar za sebe).</li>
<li><strong>Posljedice</strong> posjeda: dosjelost (usucapio), položaj tuženika u rei vindicatio, interdiktna zaštita (u kojoj su zabranjeni petitorni prigovori – rješava se samo o stanju posjeda, ne o pravu).</li>
</ul>
<p>U klasici pretor štiti interdiktima i neke osobe koje drže stvar za drugoga – imaju samo corpus (<em>naturalis possessio</em>), ali su zaštićene („izvedeni posjed“): <strong>prekarist</strong> (stvar na besplatnu uporabu do opoziva), <strong>sekvestar</strong> (stvar koju su mu stranke povjerile do kraja spora) i <strong>založni vjerovnik</strong> (ručni zalog).</p>

<h3>Vrste posjeda</h3>
<ul>
<li><strong>Possessio ad interdicta</strong> – corpus + animus; zaštićen interdiktima; imaju ga vlasnik-posjednik, <em>bonae fidei possessor</em> (stekao u dobroj vjeri od nevlasnika) i <em>malae fidei possessor</em> (npr. kradljivac) – ovaj samo prema trećima, ne prema onome od koga je protupravno stekao.</li>
<li><strong>Possessio naturalis</strong> – samo corpus = <strong>detencija</strong>; detentori drže u tuđe ime, obično na temelju obveznog posla, bez zaštite.</li>
<li><strong>Possessio civilis</strong> – possessio ad interdicta + pravni razlog (<em>causa, titulus</em>) = <strong>possessio ad usucapionem</strong>; vodi stjecanju vlasništva tradicijom i dosjelošću.</li>
<li><strong>Possessio vitiosa / non vitiosa</strong> – viciozan je posjed stečen <strong>vi</strong> (silom), <strong>clam</strong> (potajno) ili <strong>precario</strong> (na molbu do opoziva) – relativno, prema protivniku. Vitiosa/non vitiosa ≈ iniusta/iusta; u postklasici possessio iusta = possessio civilis.</li>
<li><strong>Possessio bonae fidei / malae fidei</strong> – dobra vjera: oprostiva zabluda stjecatelja (ne iz nepažnje); zla vjera: znao je ili je uz dužnu pažnju mogao znati za nedostatak prava prethodnika. Važno za dosjelost, izdatke (rei vindicatio) i plodove.</li>
<li><strong>Quasi possessio</strong> – „posjed prava“ (izvršavanje sadržaja služnosti).</li>
</ul>

<h3>Stjecanje posjeda</h3>
<ul>
<li><strong>Originarno</strong> – <em>occupatio</em> (zauzimanje).</li>
<li><strong>Derivativno</strong> – dogovorom s dotadašnjim posjednikom:
<ul>
<li><strong>traditio</strong> (predaja); <strong>traditio longa manu</strong> – prodavatelj pokaže kupljeno zemljište s obližnjeg mjesta; <strong>simbolička tradicija</strong> – predaja ključeva, grude zemlje, cigle;</li>
<li><strong>traditio brevi manu</strong> – detentor naknadnim ugovorom stječe i animus (detentor → posjednik), npr. zakupac kupi zakupljenu nekretninu;</li>
<li><strong>constitutum possessorium</strong> – pravi posjednik pretvara se u detentora (posjednik → detentor), npr. vlasnik proda kuću i ostane u njoj kao najmoprimac; stjecanje posjeda običnim dogovorom bez predaje; <strong>u klasici još nije poznat</strong>.</li>
</ul></li>
</ul>
<p><strong>Traditio brevi manu i constitutum possessorium</strong> su načini stjecanja <strong>bez promjene faktičnog stanja</strong>. <strong>Paul. D. 41.2.3.3:</strong> <em>Neratius et Proculus et solo animo non posse nos adquirere possessionem, si non antecedat naturalis possessio</em> – „Neracije i Prokul naučavali su da ne možemo steći posjed samom namjerom ako ne prethodi faktično držanje.“</p>

<h3>Gubitak posjeda</h3>
<p>Posjed se gubi gubitkom <strong>corpusa</strong> ili <strong>animusa</strong>: uništenjem, krađom, otmicom ili gubitkom stvari. Posjednik zadržava posjed i <strong>samom voljom</strong> (<em>solo animo</em>) iako dugo nije fizički prisutan (zimski i ljetni pašnjaci), ali se samom voljom posjed <strong>ne stječe</strong>. Gubitak animusa vezan je uz constitutum possessorium.</p>

<h3>Zaštita posjeda – interdikti</h3>
<p>Posjed nije pravo, ali uživa zaštitu: posjedovni spor teži uspostavi mirnog stanja bez raspravljanja o pravu. Pretor štiti posjed <strong>interdiktima</strong> (hitnim sredstvima) bez obzira ima li posjednik pravo na posjed; vlasnik koji izgubi mogao je zatim podići rei vindicatio. <em>Melior est condicio possidentis</em> – „Bolji je položaj posjednika“; <em>Petitorium absorbet possessorium</em> – vlasnička tužba uključuje i zaštitu posjeda.</p>
<table>
<tr><th>Skupina</th><th>Interdikt</th><th>Sadržaj</th></tr>
<tr><td rowspan="2"><strong>Interdicta retinendae possessionis</strong> – prohibitorni (zaštita od smetanja: zabrana, jamstvo, naknada štete); rok 1 godina (<em>tempus utile</em>); <em>interdicta duplicia</em></td><td><strong>uti possidetis</strong></td><td><strong>nekretnine</strong>; štiti se posljednji (sadašnji) posjednik ako mu posjed nije viciozan prema protivniku (<em>exceptio vitiosae possessionis</em>); kod vicioznog posjeda dobiva restitutorni karakter</td></tr>
<tr><td><strong>utrubi</strong></td><td><strong>pokretnine</strong>; pobjeđuje onaj tko je (neviciozno) dulje držao stvar u protekloj godini, računajući unatrag od izdavanja interdikta</td></tr>
<tr><td rowspan="2"><strong>Interdicta recuperandae possessionis</strong> – restitutorni (vraćanje oduzetog posjeda); <em>interdicta simplicia</em></td><td><strong>de vi</strong> (non armata)</td><td>nasilno izbacivanje bez oružja; samo u roku od <strong>1 godine</strong>, uz neviciozan posjed prema protivniku (exceptio); nakon godine – actio in factum</td></tr>
<tr><td><strong>de vi armata</strong></td><td>izbacivanje oružjem ili gomilom (robova); <strong>bez vremenskog ograničenja</strong>, bez exceptio vitiosae possessionis – i protiv vlasnika koji je nasilno došao po svoje; bezuvjetna obveza vraćanja</td></tr>
</table>
<p>Postklasika: <em>actio (interdictum) momentaria</em>; Justinijan: <strong>actio momentariae possessionis</strong> – i za oduzimanje posjeda bez uporabe sile.</p>

<h3>Važni fragmenti o posjedu</h3>
<ul>
<li><strong>Javol. D. 41.3.16</strong> – <em>Qui pignori dedit, ad usucapionem tantum possidet, quod ad reliquas omnes causas pertinet, qui accepit, possidet</em> – „Tko je dao zalog, posjeduje samo s obzirom na dosjelost, a glede svih ostalih posljedica posjeduje onaj tko ga je primio.“</li>
<li><strong>Flor. D. 16.3.17.1</strong> – „Vlasništvo deponirane stvari ostaje kod deponenta, a također i posjed, osim ako nije deponirana kod sekvestra; tada samo sekvestar posjeduje, jer se takvim depozitom postiže da nijednoj strani ne teče vrijeme posjeda.“</li>
</ul>`
    }
  },

  vlasnistvo: {
    id: "1vdcxa",
    name: "Vlasništvo: pojam, vrste i stjecanje",
    icon: "fa-house-chimney",
    color: "#a855f7",
    flashcards: [
      { id: "s0birw", question: "Dominium, proprietas", answer: "Vlasništvo – najpunija i isključiva pravna vlast na tjelesnoj stvari koja djeluje prema svima (plena in re potestas); zbroj ovlaštenja uti, frui, abuti.", explanation: "Usus, fructus, abusus." },
      { id: "u3shio", question: "Uti, frui, abuti", answer: "Uti (usus) – korištenje stvari; frui (fructus) – ubiranje plodova (prirodnih i civilnih); abuti (abusus) – raspolaganje, pa i otuđenje i uništenje.", explanation: "Abusus je najšire ovlaštenje." },
      { id: "mwwbdz", question: "Qui iure suo utitur neminem laedit", answer: "„Nikoga ne oštećuje onaj tko se služi vlastitim pravom.“", explanation: "Regula o vlasništvu." },
      { id: "05wu67", question: "Dominium ex iure Quiritium", answer: "Kviritsko vlasništvo: samo rimski građanin sui iuris (iznimno Latin ili peregrin s ius commercii); nad pokretninama i italskim zemljištem; res mancipi se prenose mancipacijom ili in iure cessio.", explanation: "Apsolutni oblik." },
      { id: "w2yqo7", question: "In bonis esse (bonitarno, pretorsko vlasništvo)", answer: "Nastaje kad vlasnik res mancipi preda stvar samom tradicijom, bez mancipacije ili in iure cessio; dosjelošću prelazi u kviritsko vlasništvo.", explanation: "Stjecatelj od nevlasnika u dobroj vjeri nije bonitarni vlasnik, nego bonae fidei possessor; štiti ga pretor." },
      { id: "j5798w", question: "Zaštita bonitarnog vlasništva", answer: "Exceptio rei venditae ac traditae (prigovor protiv kviritskog vlasnika) i actio Publiciana (vraćanje izgubljenog posjeda od trećega).", explanation: "Pretorska zaštita djeluje i prema kviritskom vlasniku, što civilno pravo ne bi dopustilo." },
      { id: "rgj221", question: "Provincijska zemljišta", answer: "Na njima nema ni kviritskog ni bonitarnog vlasništva; korisnici plaćaju stipendium (senatske provincije) ili tributum (carske) i imaju habere, possidere, frui.", explanation: "Praedia stipendiaria i tributaria." },
      { id: "o8jaqo", question: "Condominium (suvlasništvo)", answer: "Jedna nepodijeljena stvar u vlasništvu više osoba; svakom pripada idealni dio (pars pro indiviso) kojim slobodno raspolaže.", explanation: "Namjerno, voljom trećega ili slučajno." },
      { id: "getb33", question: "Razvrgnuće suvlasništva", answer: "Actio communi dividundo (među suvlasnicima) i actio familiae erciscundae (među sunasljednicima); sudac ima adiudicatio – dijeli stvar ili je dodjeljuje jednome uz naknadu ostalima.", explanation: "Ili prodaje i dijeli cijenu." },
      { id: "957j9t", question: "Nemo plus iuris ad alium transferre potest quam ipse haberet", answer: "„Nitko ne može na drugoga prenijeti više prava nego što ga sam ima.“ Temelj derivativnog stjecanja.", explanation: "Iznimka: založni vjerovnik može prodati tuđu stvar." },
      { id: "bvir30", question: "Mancipatio", answer: "Svečani, formalistički, apstraktni posao per aes et libram za prijenos kviritskog vlasništva nad res mancipi: 5 svjedoka (punoljetni građani) i libripens, svečane riječi, udarac bakrom o vagu.", explanation: "Imaginaria venditio (Gaj)." },
      { id: "cioc3s", question: "Formula mancipacije", answer: "„Hunc ego hominem ex iure Quiritium meum esse aio isque mihi emptus esto hoc aere aeneaque libra.“ – Tvrdim da je ovaj rob moj po kviritskom pravu i neka mi bude kupljen ovim bakrom i mjedenom vagom.", explanation: "Mancipacija služi i za coemptio, emancipatio, nexum." },
      { id: "2bf5y3", question: "Actio auctoritatis", answer: "Ako mancipant nije bio vlasnik pa treći oduzme stvar (evikcija), mancipatar tuži mancipanta (auctor) na dvostruki iznos plaćene cijene.", explanation: "Mancipatar dakle ima pravno sredstvo." },
      { id: "aa4ngv", question: "In iure cessio", answer: "Apstraktni, formalistički prijenos kviritskog vlasništva (res mancipi i nec mancipi) prividnim sporom pred magistratom: stjecatelj vindicira, otuđitelj šuti, magistrat dodijeli stvar.", explanation: "Prikladna za netjelesne stvari; nije per aes et libram." },
      { id: "rew5du", question: "Traditio", answer: "Neformalni, kauzalni prijenos vlasništva predajom posjeda; iz ius gentium. Nad res nec mancipi daje kviritsko, nad res mancipi bonitarno vlasništvo; kod Justinijana jedini derivativni način.", explanation: "Pretpostavke: vlasnik, volja, iusta causa." },
      { id: "j5vojk", question: "Pretpostavke tradicije", answer: "Tradent mora biti vlasnik (nemo plus iuris), volja obiju strana da se vlasništvo prenese i primi, i opravdan pravni razlog (iusta causa traditionis).", explanation: "Npr. kupoprodaja, darovanje." },
      { id: "ua8dum", question: "Occupatio", answer: "Originarno stjecanje zauzimanjem ničije stvari (res nullius) ili stvari koju je vlasnik napustio (res derelicta).", explanation: "Npr. divlje životinje, napuštene stvari." },
      { id: "o24crc", question: "Thesaurus", answer: "Nalaz blaga – vrijednosti skrivenih toliko dugo da se ne zna vlasnik; po Hadrijanu pola pripada nalazniku, pola vlasniku zemljišta.", explanation: "Originarni način." },
      { id: "gkdhob", question: "Accessio – oblici", answer: "Spajanje glavne i sporedne stvari: alluvio (riječni nanos), avulsio (otkinuti komad zemlje), implantatio (sađenje), inaedificatio (građenje), satio (sijanje), textura, tinctura, pictura.", explanation: "Plus insula in flumine nata, alveus derelictus." },
      { id: "lc1s83", question: "Superficies solo cedit", answer: "„Zgrada pripada zemljištu“ – vlasnik zemljišta postaje vlasnik onoga što je na njemu sagrađeno ili posađeno.", explanation: "Primjenjuje se kod inaedificatio i implantatio." },
      { id: "f01yte", question: "Specificatio", answer: "Izrada nove stvari od tuđeg materijala: po sabinovcima vlasnik je vlasnik materijala, po prokulovcima prerađivač.", explanation: "Gubitnik ima pravo na naknadu." },
      { id: "fzhca6", question: "Commixtio i confusio", answer: "Miješanje krutih (commixtio) ili tekućih (confusio) stvari različitih vlasnika; ako se ne mogu razdvojiti, a miješanje je voljom vlasnika, nastaje suvlasništvo razmjerno vrijednosti.", explanation: "Inače vindicira dio koji odgovara vrijednosti." },
      { id: "fwzrps", question: "Stjecanje plodova (fructus)", answer: "Plodovi pripadaju vlasniku; pošteni posjednik i emfiteut stječu ih odvajanjem (separatio), a plodouživatelj i zakupnik tek ubiranjem (perceptio).", explanation: "Pendentes su dio glavne stvari." },
      { id: "0ant5z", question: "Usucapio", answer: "Stjecanje vlasništva neprekidnim posjedovanjem kroz zakonom određeno vrijeme; faktično stanje pretvara se u pravno. Služi kod tradicije res mancipi i stjecanja od nevlasnika.", explanation: "XII ploča: 1 godina pokretnine, 2 nekretnine." },
      { id: "0nnrv2", question: "Res habilis, titulus, fides, possessio, tempus", answer: "„Podobna stvar, naslov, savjesnost, posjed, vrijeme“ – pretpostavke dosjelosti.", explanation: "Svih pet pretpostavki mora biti ispunjeno; nedostaje li jedna, dosjelost se ne zasniva." },
      { id: "x7myod", question: "Res habilis i titulus kod dosjelosti", answer: "Res habilis – nisu podobne ukradene (res furtivae) i silom oduzete stvari (res vi possessae). Titulus mora biti verus (stvaran), ne putativus (zamišljen).", explanation: "Npr. pro emptore, pro herede." },
      { id: "5zjer9", question: "Mala fides superveniens non nocet", answer: "„Kasnije nepoštenje ne škodi“ – dobra vjera traži se samo u času stjecanja posjeda.", explanation: "Uz bona fides kod dosjelosti." },
      { id: "sx1ww7", question: "Accessio temporis", answer: "Pribrajanje vremena posjeda prednika vlastitom posjedu pri računanju roka dosjelosti.", explanation: "Npr. nasljednik pribraja vrijeme posjeda ostavitelja." },
      { id: "738nwz", question: "Longi temporis praescriptio", answer: "Reskript Severa i Karakale (199.) za provincijska zemljišta: prigovor (zastara tužbe) nakon 10 godina inter praesentes ili 20 inter absentes, uz naslov i dobru vjeru.", explanation: "Kod Justinijana – redovna dosjelost nekretnina." },
      { id: "km8h2z", question: "Justinijanova dosjelost", answer: "Redovna: pokretnine 3 godine, nekretnine 10/20 godina (naslov + dobra vjera). Izvanredna (praescriptio longissimi temporis): 30 godina (crkva 40), bez naslova, uz dobru vjeru i posjed stečen bez sile.", explanation: "Nestaje razlika res mancipi / nec mancipi." },
      { id: "athvb5", question: "Prestanak vlasništva", answer: "Voljom vlasnika (derivativni prijenos, derelikcija) ili neovisno o njoj: propast stvari, stvar postaje extra commercium ili res nullius, ratni plijen neprijatelja, capitis deminutio vlasnika.", explanation: "Objektivni i subjektivni razlozi." }
    ],
    quiz: [
      { id: "2fwfrm", question: "Kako je nastajalo pretorsko (bonitarno) vlasništvo?", options: ["mancipacijom res mancipi od vlasnika", "in iure cessio pred magistratom i svjedocima", "tradicijom res mancipi od vlasnika", "okupacijom napuštenih stvari"], correct: 2 },
      { id: "fyrwkt", question: "In iure cessio je stvarnopravni posao per aes et libram?", options: ["nije ispravno – nije gestum per aes et libram", "nije ispravno – nije stvarnopravni posao", "ispravno – kao i mancipacija", "nije ispravno – in iure cessio je dioba stvari"], correct: 0 },
      { id: "a958c4", question: "Mancipatar koji je res mancipi stekao od nevlasnika nema pravnog sredstva protiv mancipanta?", options: ["točno, zbog formalizma mancipacije", "točno, zbog stvarnopravnog učinka", "točno, jer se volja ne istražuje", "nije točno – ima actio auctoritatis"], correct: 3 },
      { id: "8a5ahv", question: "Tradicijom res nec mancipi stječe se:", options: ["bonitarno vlasništvo", "kviritsko vlasništvo", "samo detencija", "samo posjed ad interdicta"], correct: 1 },
      { id: "aetpb6", question: "Koji je originarni način stjecanja vlasništva?", options: ["occupatio", "traditio", "mancipatio", "in iure cessio"], correct: 0 },
      { id: "p1swqv", question: "Po Hadrijanovoj konstituciji blago se dijeli:", options: ["cijelo pripada nalazniku blaga", "cijelo pripada vlasniku zemljišta", "napola državi i napola nalazniku", "napola nalazniku i vlasniku zemljišta"], correct: 3 },
      { id: "4ayhoz", question: "Po prokulovcima, kod specifikacije vlasnik nove stvari postaje:", options: ["vlasnik materijala", "prerađivač", "obojica kao suvlasnici", "država"], correct: 1 },
      { id: "idzv9g", question: "Koja stvar nije res habilis za dosjelost?", options: ["kupljena pokretnina", "naslijeđeno zemljište", "ukradena stvar", "darovani rob"], correct: 2 },
      { id: "3k9onr", question: "Rok dosjelosti nekretnina po Zakoniku XII ploča iznosio je:", options: ["jednu godinu", "deset godina", "dvije godine", "trideset godina"], correct: 2 },
      { id: "ihuzxh", question: "Longi temporis praescriptio uvedena je:", options: ["reskriptom Severa i Karakale 199.", "Zakonikom XII ploča za italska zemljišta", "Justinijanovom novelom o dosjelosti", "pretorskim ediktom Salvija Julijana"], correct: 0 },
      { id: "z17p6c", question: "Izvanredna dosjelost kod Justinijana traži posjed od:", options: ["10 godina", "20 godina", "3 godine", "30 godina"], correct: 3 },
      { id: "836rmo", question: "Titulus putativus (zamišljeni naslov) za dosjelost:", options: ["dovoljan je", "nije dovoljan", "dovoljan je samo za pokretnine", "dovoljan je uz zlu vjeru"], correct: 1 },
      { id: "xsykml", question: "Vrste originarnog stjecanja vlasništva su:", options: ["occupatio, accessio, specificatio, usucapio", "mancipatio, in iure cessio, traditio", "traditio brevi manu, constitutum possessorium", "legatum, fideicommissum"], correct: 0 },
      { id: "cjkq4p", question: "Tužba za razvrgnuće suvlasništva među suvlasnicima jest:", options: ["actio familiae erciscundae", "actio finium regundorum", "actio pro socio", "actio communi dividundo"], correct: 3 },
      { id: "qdxoyi", question: "Kod nedjeljive stvari sudac u diobnoj parnici može:", options: ["samo odbiti tužbu kao neosnovanu", "dodijeliti je jednome uz naknadu ostalima", "dati je u vlasništvo državi", "proglasiti je ničijom stvari (res nullius)"], correct: 1 },
      { id: "xvqsy7", question: "Ovlaštenje uništiti ili otuđiti stvar zove se:", options: ["usus", "fructus", "abusus", "habitatio"], correct: 2 },
      { id: "ro2ojc", question: "Pošteni posjednik stječe plodove:", options: ["ubiranjem (perceptio)", "tek dosjelošću stvari", "odvajanjem (separatio)", "nikada, pripadaju vlasniku"], correct: 2 },
      { id: "ybgug9", question: "Mancipacija se odvijala uz:", options: ["5 svjedoka i libripensa", "magistrata i 2 svjedoka", "7 svjedoka bez vage", "pontifika i kurije"], correct: 0 },
      { id: "ncnzzq", question: "Što od navedenog nije pretpostavka tradicije?", options: ["tradent je vlasnik", "volja obiju strana", "iusta causa traditionis", "prisutnost pet svjedoka"], correct: 3 },
      { id: "3pchzj", question: "Na provincijskim zemljištima postojalo je:", options: ["kviritsko vlasništvo korisnika", "korištenje uz stipendium ili tributum", "bonitarno vlasništvo korisnika", "samo res nullius bez ikakvog prava"], correct: 1 },
      { id: "hjbas8", question: "Novi otok nastao u rijeci (insula in flumine nata):", options: ["dijeli se priobalnim vlasnicima", "pripada rimskoj državi", "pripada prvom okupantu", "ostaje trajno res nullius"], correct: 0 },
      { id: "h9zslt", question: "Kviritski vlasnik mogao je biti:", options: ["svaki slobodni stanovnik carstva", "samo patricij iz starih gensova", "i osoba alieni iuris pod vlašću", "rimski građanin, osoba sui iuris"], correct: 3 },
      { id: "77il16", question: "Accessio temporis znači:", options: ["prirast zemljišta riječnim nanosom", "pribrajanje vremena posjeda prednika", "produljenje roka zastare tužbe", "stjecanje plodova odvajanjem od stvari"], correct: 1 },
      { id: "v15vzx", question: "„Mala fides superveniens non nocet“ kod dosjelosti znači da:", options: ["zla vjera nikad ne škodi", "dobra vjera se traži cijelo vrijeme", "kasnija zla vjera ne škodi", "zla vjera prekida rok"], correct: 2 },
      { id: "ra1i9a", question: "Vlasništvo prestaje iz subjektivnih razloga kad vlasnik:", options: ["proda stvar drugome", "da stvar u zakup na deset godina", "pretrpi capitis deminutio maxima", "osnuje služnost na svojoj stvari"], correct: 2 }
    ],
    fillBlanks: [
      { id: "8xi25p", sentence: "Nemo plus iuris ad alium transferre potest quam ipse _______.", answer: "haberet", hint: "Sam ima." },
      { id: "r01pur", sentence: "Res habilis, titulus, fides, possessio, _______.", answer: "tempus", hint: "Vrijeme." },
      { id: "ai3lqu", sentence: "Superficies solo _______.", answer: "cedit", hint: "Ustupa, pripada." },
      { id: "bgirjq", sentence: "Kviritsko vlasništvo latinski se zove dominium ex iure _______.", answer: "Quiritium", hint: "Kviriti – Rimljani." },
      { id: "5lb3hj", sentence: "Opravdan pravni razlog predaje zove se iusta causa _______.", answer: "traditionis", hint: "Predaja – traditio." },
      { id: "q9ayn6", sentence: "Qui iure suo utitur neminem _______.", answer: "laedit", hint: "Ne oštećuje." }
    ],
    learn: {
      id: "xetmxc",
      title: "Vlasništvo: pojam, tipovi, suvlasništvo, stjecanje i prestanak",
      content: `<h3>Pojam</h3>
<p><strong>Dominium, proprietas</strong> – daje ovlašteniku najpunija i isključiva prava korištenja i raspolaganja stvari; potpuna i isključiva pravna vlast na tjelesnoj stvari koja djeluje prema svima (<strong>erga omnes</strong>) – <em>plena in re potestas</em>. U klasici postoji samo jedan tip vlasništva, a ostalo su iura in re aliena. Vlasništvo je zbroj ovlaštenja:</p>
<ul>
<li><strong>uti (usus)</strong> – korištenje stvari na uobičajen način;</li>
<li><strong>frui (fructus)</strong> – ubiranje plodova (naturales, civiles);</li>
<li><strong>abuti (abusus)</strong> – raspolaganje, pa i otuđenje i uništenje (najšire ovlaštenje).</li>
</ul>
<p><em>Qui iure suo utitur neminem laedit</em> – „Nikoga ne oštećuje onaj tko se služi vlastitim pravom.“</p>

<h3>Tipovi vlasništva</h3>
<table>
<tr><th>Tip</th><th>Obilježja</th></tr>
<tr><td><strong>dominium ex iure Quiritium</strong> (kviritsko)</td><td>samo rimski građani sui iuris, iznimno Latini ili peregrini s ius commercii; nad pokretninama i italskim zemljištem (<em>fundi Italici</em>); res mancipi prenose se mancipacijom ili in iure cessio – apsolutni oblik</td></tr>
<tr><td><strong>in bonis esse</strong> (bonitarno, pretorsko)</td><td>nastaje kad vlasnik res mancipi preda stvar <strong>samom tradicijom</strong> (formalni nedostatak: nema mancipacije ni in iure cessio); <strong>protekom dosjelosti prelazi u kviritsko</strong>; zaštita: <em>exceptio rei venditae ac traditae</em> i <em>actio Publiciana</em> („in bonis rem habere“). Tko stvar stekne <strong>od nevlasnika u dobroj vjeri</strong>, nije bonitarni vlasnik nego <strong>bonae fidei possessor</strong> (<em>possessio civilis ad usucapionem</em>): štiti ga actio Publiciana, ali ne prema vlasniku</td></tr>
<tr><td><strong>provincijska zemljišta</strong></td><td>ni kviritsko ni bonitarno vlasništvo; korisnici plaćaju <strong>stipendium</strong> (senatske provincije – <em>praedia stipendiaria</em>) ili <strong>tributum</strong> (carske – <em>praedia tributaria</em>); prava: <em>habere, possidere, frui</em></td></tr>
<tr><td><strong>peregrinsko vlasništvo</strong></td><td>po autonomnim pravima uključenih naroda; nestaje izjednačavanjem 212. (Karakala)</td></tr>
</table>
<p><strong>Postklasika:</strong> nestaje razlika ius civile – ius honorarium, a time i kviritskog i bonitarnog vlasništva; italska i provincijska zemljišta se izjednačuju (dominium, proprietas, possessio); nestaju mancipatio i in iure cessio. <strong>Justinijan</strong> ukida podjelu res mancipi/nec mancipi i dvostruki tip vlasništva – jedinstveno <em>dominium/proprietas</em>.</p>

<h3>Suvlasništvo (condominium)</h3>
<p>Jedna nepodijeljena stvar u vlasništvu više osoba. Nastaje <strong>namjerno</strong> (zajednička kupnja), <strong>voljom trećega</strong> (ostavina više nasljednicima) ili <strong>slučajno</strong> (miješanje stvari). Svakom pripada <strong>idealni dio – pars pro indiviso</strong>; svaki ima vlasništvo u punom opsegu na idealnom dijelu i njime slobodno raspolaže. <strong>Razvrgnuće</strong>: <em>actio communi dividundo</em> (suvlasnici), <em>actio familiae erciscundae</em> (sunasljednici); sudac ima <strong>adiudicatio</strong> – dijeli stvar na realne dijelove, a nedjeljivu dodjeljuje jednom suvlasniku uz novčanu naknadu ostalima ili je prodaje i dijeli cijenu.</p>

<h3>Stjecanje vlasništva</h3>
<p><strong>Originarno</strong> – pravo se stječe samostalno, bez obzira na pravo prethodnika. <strong>Derivativno</strong> – pravo stjecatelja izvodi se iz prava prethodnika: <em>Nemo plus iuris ad alium transferre potest quam ipse haberet</em> – „Nitko ne može na drugoga prenijeti više prava nego što ga sam ima“ (iznimka: založni vjerovnik koji nije vlasnik može prodati založenu stvar).</p>
<h4>Derivativni načini</h4>
<ul>
<li><strong>Mancipatio</strong> – svečani, <strong>formalistički i apstraktni</strong> posao starog civilnog prava za prijenos kviritskog vlasništva nad <strong>res mancipi</strong>; <em>gestum per aes et libram</em>: <strong>5 svjedoka</strong> (punoljetni građani) i <strong>libripens</strong>; stjecatelj drži stvar i izgovara: <em>Hunc ego hominem ex iure Quiritium meum esse aio isque mihi emptus esto hoc aere aeneaque libra</em> („Tvrdim da je ovaj rob moj po kviritskom pravu i neka mi bude kupljen ovim bakrom i mjedenom vagom“), udari bakrom o vagu i preda ga otuđitelju – <em>imaginaria venditio</em> (Gaj). Služila je i za coemptio, emancipaciju, nexum, oporuku per aes et libram.
<br><strong>Evikcija kod mancipacije:</strong> ako mancipant nije bio vlasnik i treći oduzme stvar, mancipatar tuži mancipanta (<em>auctor</em>) tužbom <strong>actio auctoritatis</strong> na <strong>dvostruki iznos</strong> plaćene cijene.</li>
<li><strong>In iure cessio</strong> – apstraktni, formalistički prijenos kviritskog vlasništva nad res mancipi i nec mancipi <strong>prividnim sporom pred magistratom</strong> (oblik legis actio sacramento in rem): stjecatelj vindicira („Hunc ego hominem ex iure Quiritium meum esse aio“), otuđitelj ne kontravindicira (šuti), magistrat dodjeljuje stvar. Nije gestum per aes et libram; prikladna za <strong>netjelesne stvari</strong> (prava).</li>
<li><strong>Traditio</strong> – <strong>neformalno, kauzalno</strong> stjecanje predajom posjeda; podrijetlo iz ius gentium; u klasici pretežni, kod <strong>Justinijana jedini</strong> derivativni način. Res nec mancipi – kviritsko vlasništvo; res mancipi – bonitarno (dosjelošću kviritsko). <strong>Pretpostavke</strong>: tradent je vlasnik (nemo plus iuris), volja obiju strana da prenesu/prime vlasništvo, <strong>iusta causa traditionis</strong>.</li>
</ul>
<h4>Originarni načini</h4>
<ul>
<li><strong>Occupatio</strong> – zauzimanje <em>res nullius</em> (nikad ničije) ili <em>res derelicta</em> (vlasnik napustio u namjeri da se odrekne).</li>
<li><strong>Thesaurus</strong> – nalaz blaga (vrijednosti skrivenih tako dugo da se ne zna vlasnik); Hadrijan: na jednake dijelove nalazniku i vlasniku zemljišta.</li>
<li><strong>Accessio</strong> (priraštaj) – sjedinjenje glavne i sporedne stvari različitih vlasnika:
<ul>
<li>pokretnina s pokretninom: <em>textura</em> (utkivanje tuđih niti), <em>tinctura</em> (bojenje tuđom bojom), <em>pictura</em> (slikanje na tuđem platnu);</li>
<li>nekretnina s nekretninom: <em>alluvio</em> (riječni nanos), <em>avulsio</em> (voda otkine komad zemljišta i nanese ga drugome);</li>
<li>pokretnina s nekretninom: <em>implantatio</em> (sađenje), <em>inaedificatio</em> (građenje tuđim materijalom), <em>satio</em> (sijanje) – pripada vlasniku zemljišta: <em>superficies solo cedit</em>;</li>
<li>bez spajanja: <em>insula in flumine nata</em> (otok u rijeci) i <em>alveus derelictus</em> (napušteno korito) – dijele se među priobalnim vlasnicima.</li>
</ul></li>
<li><strong>Specificatio</strong> – izrada nove stvari od tuđeg materijala: po <strong>sabinovcima</strong> vlasnik je vlasnik materijala, po <strong>prokulovcima</strong> prerađivač; tko izgubi materijal ili rad ima zahtjev za naknadu.</li>
<li><strong>Commixtio</strong> (krute stvari) i <strong>confusio</strong> (tekuće) – ako se mogu razdvojiti, svatko ostaje vlasnik (actio ad exhibendum, pa rei vindicatio); ako ne mogu, a miješanje je voljom vlasnika – suvlasništvo razmjerno vrijednosti; bez njihove volje svaki vindicira dio koji odgovara vrijednosti njegove stvari.</li>
<li><strong>Fructus</strong> – plodovi pripadaju vlasniku; <strong>pošteni posjednik i emfiteut</strong> stječu ih <strong>separacijom</strong> (odvajanjem), <strong>plodouživatelj i zakupnik</strong> tek <strong>percepcijom</strong> (ubiranjem).</li>
<li><strong>Adiudicatio</strong> – dosuđivanje u diobnim parnicama.</li>
<li><strong>Usucapio</strong> (dosjelost).</li>
</ul>

<h3>Usucapio – dosjelost</h3>
<p>Stjecanje vlasništva neprekidnim posjedovanjem kroz zakonom propisano vrijeme; faktično stanje se nakon nekog vremena legalizira bez obzira na pravo i volju dosadašnjeg vlasnika. Dovodi do civilnog vlasništva kad se res mancipi prenese tradicijom i kad se stvar stekne od nevlasnika. Stranac ne može dosjesti.</p>
<p><em>Res habilis, titulus, fides, possessio, tempus</em> – „Podobna stvar, naslov, savjesnost, posjed, vrijeme“:</p>
<ul>
<li><strong>res habilis</strong> – određena negativno: nisu podobne <em>res furtivae</em> (ukradene – dok imaju to svojstvo, pa ni kod poštenog stjecatelja) i <em>res vi possessae</em> (silom oduzete), ni res extra commercium;</li>
<li><strong>titulus</strong> – priznati pravni razlog (pro emptore, pro herede, pro donato…); mora biti <strong>iustus, verus</strong>, a ne <strong>putativus</strong> (zamišljen) – važan fragment o titulus putativus;</li>
<li><strong>fides</strong> – <em>bona fides</em>: uvjerenje posjednika o ispravnosti i zakonitosti posjedovanja u času stjecanja; <em>mala fides superveniens non nocet</em> – kasnija zla vjera ne škodi;</li>
<li><strong>possessio</strong> – neprekinut posjed;</li>
<li><strong>tempus</strong> – po XII ploča <strong>1 godina za pokretnine, 2 godine za nekretnine</strong>; <em>accessio temporis</em> – pribrajanje vremena prednika.</li>
</ul>
<p><strong>Longi temporis praescriptio</strong> – reskript Severa i Karakale (<strong>199.</strong>) za provincijska zemljišta: najprije prigovor protiv tužbe ranijeg vlasnika (zastara tužbe) nakon <strong>10 godina inter praesentes</strong> (u istoj provinciji) ili <strong>20 godina inter absentes</strong>; traže se naslov i dobra vjera.</p>
<p><strong>Postklasika (Konstantin):</strong> 40 godina posjeda bez naslova i dobre vjere. <strong>Justinijan:</strong> redovna dosjelost – pokretnine <strong>3 godine</strong>, nekretnine <strong>10/20 godina</strong> (naslov + dobra vjera); izvanredna – <em>praescriptio longissimi temporis</em> <strong>30 godina</strong> (crkvene stvari 40), bez naslova, uz dobru vjeru i ako posjed nekretnine nije stečen silom.</p>

<h3>Prestanak vlasništva</h3>
<ul>
<li>voljom vlasnika (derivativni prijenos, derelikcija);</li>
<li>neovisno o volji – objektivno: propast stvari, stvar postane extra commercium ili res nullius, stekne je neprijatelj kao ratni plijen; subjektivno: capitis deminutio maxima, media (u ranije doba i minima).</li>
</ul>`
    }
  },

  zastitaVlasnistva: {
    id: "6itil0",
    name: "Zaštita vlasništva",
    icon: "fa-shield-halved",
    color: "#ec4899",
    flashcards: [
      { id: "bvt6gc", question: "Rei vindicatio", answer: "Vlasnička tužba (actio in rem) kojom vlasnik neposjednik traži stvar od nevlasnika posjednika; tužitelj dokazuje kviritsko vlasništvo.", explanation: "Posjed odvojen od vlasništva – povrat." },
      { id: "9f9fpm", question: "Formula rei vindicatio", answer: "„Si paret rem qua de agitur ex iure Quiritium Auli Agerii esse neque ea res restituetur, quanti ea res erit, tantam pecuniam iudex Numerium Negidium Aulo Agerio condemna, si non paret, absolve.“", explanation: "Intentio (certa), arbitrarna klauzula, condemnatio." },
      { id: "zjcz6l", question: "Prijevod formule rei vindicatio", answer: "Ako se dokaže da je sporna stvar Aula Agerija po kviritskom pravu, a ne bude vraćena, koliko stvar vrijedi, na toliko novca osudi, suče, N. N. A. A.; ako se ne dokaže, oslobodi.", explanation: "Tuženik se u intenciji ne spominje – actio in rem." },
      { id: "dioasn", question: "Arbitrarna klauzula (formula arbitraria)", answer: "Dio formule („neque ea res restituetur“) kojim se tuženik poziva da dobrovoljno vrati stvar; ako vrati prije presude, postupak se obustavlja, inače osuda glasi na novac.", explanation: "Zbog klauzule presuda ne glasi odmah na novac, nego tuženik prvo dobiva priliku vratiti stvar." },
      { id: "nsstc7", question: "Stječe li vlasnik rei vindicatio uvijek posjed stvari?", answer: "Ne – ako tuženik ne vrati stvar, osuda glasi na novčanu vrijednost (litis aestimatio), a ne na izručenje stvari.", explanation: "Načelo formularnog postupka: presuda glasi na novac." },
      { id: "aa66wv", question: "Qui dolo desiit possidere i qui liti se obtulit", answer: "Justinijan dopušta rei vindicatio i protiv nevlasnika: onoga tko je zlonamjerno napustio posjed i onoga tko se lažno upustio u spor kao posjednik.", explanation: "Gai. D. 6.1.36; Paul. D. 6.1.27." },
      { id: "7tdo10", question: "Nominatio (laudatio) auctoris", answer: "Detentor tužen rei vindicatio imenuje osobu za koju drži stvar i tako na nju prebacuje parnicu.", explanation: "Tuženi mora biti posjednik." },
      { id: "q4vkid", question: "Probatio diabolica", answer: "„Đavolski dokaz“ – vrlo težak dokaz vlasništva kod rei vindicatio, jer tužitelj mora dokazati i vlasništvo prednika (ako nije protekao rok dosjelosti).", explanation: "Zato se i kviritski vlasnici služe Publicianom." },
      { id: "djcw60", question: "Actio negatoria", answer: "Tužba vlasnika kad mu je vlasništvo povrijeđeno na drugi način, a ne oduzimanjem posjeda – npr. kad netko tvrdi služnost na njegovoj stvari; traži prestanak smetanja i naknadu štete.", explanation: "Naličje actio confessoria." },
      { id: "rb2u81", question: "Actio Publiciana", answer: "Pretorska tužba (pretor Publicije, kraj republike) bonitarnog vlasnika i poštenog posjednika na putu dosjelosti protiv trećeg posjednika; fikcija da je rok dosjelosti protekao.", explanation: "Formula ficticia." },
      { id: "5roxf0", question: "Formula actio Publiciana", answer: "„Si quem hominem Aulus Agerius emit et is ei traditus est, anno possedisset, tum si eum hominem… eius ex iure Quiritium esse oporteret…“ – fikcija godine dana posjeda.", explanation: "Fikcija omogućuje tužitelju koji još nije dosjeo da tuži kao da je dosjeo." },
      { id: "jija1x", question: "Protiv koga uspijeva actio Publiciana?", answer: "Bonitarni vlasnik i protiv svakoga (kviritskom vlasniku suprotstavlja exceptio); pošteni posjednik od nevlasnika – protiv svih osim vlasnika i jačeg poštenog posjednika.", explanation: "Nemo plus iuris…" },
      { id: "2pi4ad", question: "Exceptio rei venditae ac traditae", answer: "Prigovor bonitarnog vlasnika protiv kviritskog vlasnika koji je prodao i tradirao res mancipi pa je traži natrag rei vindicatio – tužitelj se odbija.", explanation: "Prigovor prodane i predane stvari." },
      { id: "ezom3k", question: "Petitorium absorbet possessorium", answer: "„Vlasnička tužba uključuje u sebi i zaštitu posjeda.“", explanation: "Petitorni (vlasnički) zahtjev obuhvaća posjedovni." },
      { id: "lmxf6k", question: "Actio ad exhibendum", answer: "Tužba kojom vlasnik traži da posjednik pokretnine (ili tko je zlonamjerno prestao posjedovati) stvar izloži (donese) pred sud radi daljnjeg spora.", explanation: "Priprema rei vindicatio." },
      { id: "39dfx1", question: "Rei vindicatio per sponsionem", answer: "Stranke se izazivaju na okladu (sponsio) o tome čija je tvrdnja ispravna; tuženi obećava povrat stvari s plodovima (sponsio pro praede litis et vindiciarum).", explanation: "Kad tuženi samo poriče tvrdnju." },
      { id: "178hny", question: "Interdictum quem fundum", answer: "Interdikt koji pretor daje vlasniku kad nevlasnik koji posjeduje nekretninu ne želi stupiti u parnicu.", explanation: "Prisila na upuštanje u spor." }
    ],
    quiz: [
      { id: "dj6txw", question: "Rei vindicatio podiže:", options: ["vlasnik neposjednik protiv nevlasnika posjednika", "vlasnik posjednik protiv onoga tko ga smeta", "nevlasnik posjednik protiv vlasnika neposjednika", "pošteni posjednik protiv bilo koga tko ima stvar"], correct: 0 },
      { id: "piny3l", question: "Actio negatoria služi vlasniku kad je njegovo pravo povrijeđeno:", options: ["oduzimanjem posjeda stvari", "prodajom tuđe stvari bez ovlasti", "krađom stvari od strane trećega", "drukčije, a ne oduzimanjem posjeda"], correct: 3 },
      { id: "zcrnus", question: "Actio Publiciana sadrži fikciju da:", options: ["je tuženik vlasnik", "je protekao rok dosjelosti", "je stvar mancipirana", "je tužitelj rimski građanin"], correct: 1 },
      { id: "2owli0", question: "Tko se služi actio Publiciana?", options: ["bonitarni vlasnik i pošteni posjednik", "zakupnik i depozitar kao detentori", "samo kviritski vlasnik u posjedu", "založni vjerovnik protiv dužnika"], correct: 0 },
      { id: "kcg9u2", question: "Exceptio rei venditae ac traditae ulaže:", options: ["kviritski vlasnik protiv kupca stvari", "pretor po službenoj dužnosti u formuli", "kradljivac protiv vlasnika ukradene stvari", "bonitarni vlasnik protiv kviritskog vlasnika"], correct: 3 },
      { id: "2nape2", question: "Osuda u rei vindicatio u formularnom postupku glasi na:", options: ["izručenje stvari", "novčani iznos", "dvostruku vrijednost", "noksalnu predaju"], correct: 1 },
      { id: "czq72u", question: "Arbitrarna klauzula je:", options: ["fikcija proteka roka dosjelosti", "prigovor tuženika unesen u formulu", "poziv tuženiku na dobrovoljni povrat", "ovlast suca da podijeli stvar"], correct: 2 },
      { id: "tlawks", question: "Dokaz vlasništva prednika kod rei vindicatio naziva se:", options: ["nominatio auctoris", "litis aestimatio", "probatio diabolica", "cautio"], correct: 2 },
      { id: "wzq44c", question: "Justinijan dopušta rei vindicatio protiv onoga tko:", options: ["je zlonamjerno napustio posjed", "drži stvar kao zakupnik ili najmoprimac", "je stvar kupio u dobroj vjeri od vlasnika", "je stvar valjano dosjeo"], correct: 0 },
      { id: "mh6lu2", question: "„Petitorium absorbet possessorium“ znači:", options: ["posjed apsorbira vlasništvo", "petitorni prigovori su dopušteni u interdiktu", "posjedovni spor isključuje vlasnički", "vlasnička tužba uključuje i zaštitu posjeda"], correct: 3 },
      { id: "v34x06", question: "Kod actio Publiciana nije potrebno dokazivati:", options: ["valjani pravni razlog stjecanja", "vlasništvo i pravne prednike", "da stvar nije ukradena", "dobru vjeru"], correct: 1 },
      { id: "yq40qz", question: "Detentor tužen rei vindicatio može parnicu prebaciti na:", options: ["osobu za koju drži stvar", "pretora koji je izdao formulu", "svoje buduće nasljednike", "državnu blagajnu (aerarium)"], correct: 0 },
      { id: "q5az7t", question: "Interdictum quem fundum daje se vlasniku kad:", options: ["mu je oduzet posjed pokretnine", "je stvar propala kod posjednika", "netko tvrdi služnost na njegovoj stvari", "nevlasnik posjednik zemljišta neće u parnicu"], correct: 3 },
      { id: "plphjt", question: "Prema Paul. D. 6.1.27, tko se lažno upusti u parnicu kao posjednik:", options: ["oslobađa se", "treba biti osuđen", "postaje vlasnik", "plaća pretoru kaznu"], correct: 1 },
      { id: "ulxkxw", question: "Actio ad exhibendum služi da:", options: ["se podijeli suvlasništvo", "se utvrdi postojanje služnosti", "se stvar izloži pred sudom", "se vrati zajam s kamatama"], correct: 2 },
      { id: "d6j2mh", question: "Rei vindicatio per sponsionem temelji se na:", options: ["stipulaciji jamstva", "zakletvi pred pontifikom", "okladi stranaka", "pisanoj ispravi"], correct: 2 }
    ],
    fillBlanks: [
      { id: "yoanxd", sentence: "Vlasnička tužba uključuje posjedovnu: petitorium absorbet _______.", answer: "possessorium", hint: "Posjedovni zahtjev." }
    ],
    learn: {
      id: "6mdquh",
      title: "Zaštita vlasništva",
      content: `<p>Vlasništvo se štiti <strong>actiones in rem</strong> – sudskim postupcima kojima se utvrđuje da netko ima pravo na određenoj stvari.</p>
<h3>1. Rei vindicatio</h3>
<p>Tužba za zaštitu (kviritskog) vlasništva koju podiže <strong>vlasnik koji nije u posjedu</strong> protiv <strong>nevlasnika koji je u posjedu</strong> – posjed je odvojen od vlasništva, traži se povrat.</p>
<ul>
<li>Tuženi mora biti posjednik; <strong>detentor</strong> može imenovati osobu za koju drži stvar – <em>nominatio (laudatio) auctoris</em> – i prebaciti parnicu na nju.</li>
<li><strong>Justinijan</strong> dopušta tužbu i protiv onih koji stvar ne drže, a kvalificira ih nepošteno ponašanje: <strong>qui dolo desiit possidere</strong> (zlonamjerno napustio posjed prije litiskontestacije) i <strong>qui liti se obtulit</strong> (zlonamjerno se upustio u parnicu kao posjednik). Gai. D. 6.1.36: tužitelj treba ispitati je li tuženi posjednik (ili je dolozno prestao posjedovati); Paul. D. 6.1.27: tko kaže da posjeduje i upusti se u parnicu, treba svakako biti osuđen.</li>
<li>Tužitelj dokazuje kviritsko vlasništvo; kod res mancipi kojoj nije protekao rok dosjelosti mora dokazivati i vlasništvo prednika – <strong>probatio diabolica</strong>.</li>
<li><em>Petitorium absorbet possessorium</em> – vlasnička tužba uključuje i zaštitu posjeda.</li>
</ul>
<h4>Formula (formula arbitraria)</h4>
<p><em>Si paret rem qua de agitur ex iure Quiritium Auli Agerii esse neque ea res restituetur, quanti ea res erit, tantam pecuniam iudex Numerium Negidium Aulo Agerio condemna, si non paret, absolve.</em></p>
<p>„Ako se dokaže da je stvar o kojoj se vodi spor u vlasništvu Aula Agerija po kviritskom pravu, a on (tuženik) neće stvar vratiti (na tvoju odluku), koliko ta stvar vrijedi, na toliko novca, suče, osudi Numerija Negidija Aulu Ageriju; ako se pak ne dokaže, oslobodi.“</p>
<ul>
<li><strong>intentio</strong> – „si paret… Auli Agerii esse“ (<em>certa</em>); kao actio in rem ne spominje tuženika, samo traži utvrđenje da je tužitelj vlasnik;</li>
<li><strong>arbitrarna klauzula</strong> – „neque ea res restituetur“ – poziv tuženiku na dobrovoljni povrat (s plodovima); ako vrati prije presude, postupak se obustavlja;</li>
<li><strong>condemnatio</strong> – „quanti ea res erit… condemna, si non paret, absolve“ – osuda na <strong>novčani iznos</strong> (vrijednost koju procijeni tužitelj), ne na izručenje stvari; zato vlasnik ne stječe uvijek posjed;</li>
<li>tuženi može uložiti <strong>exceptio</strong>.</li>
</ul>

<h3>2. Actio negatoria</h3>
<p>Služi kviritskom vlasniku kad mu je pravo ugroženo <strong>na drugi način, a ne oduzimanjem posjeda</strong> (npr. netko tvrdi da ima služnost na njegovoj stvari). Vlasnik dokazuje vlasništvo i činjenicu smetanja; ako uspije, tuženi naknađuje štetu i mora prestati sa smetanjem. Naličje je <em>actio confessoria</em> (zaštita služnosti).</p>

<h3>3. Actio Publiciana</h3>
<p>Pretorska tužba koju je potkraj republike uveo pretor <strong>Publicije</strong>. Štiti:</p>
<ul>
<li><strong>bonitarnog vlasnika</strong> – kupca koji je res mancipi stekao tradicijom od vlasnika pa izgubio posjed;</li>
<li><strong>poštenog posjednika</strong> (<em>bonae fidei possessor</em>, posjednik <em>in statu usucapiendi</em>) – koji je stvar stekao od nevlasnika na temelju valjanog naslova, u dobroj vjeri, a stvar nije ukradena.</li>
</ul>
<p>Pretor <strong>fingira da je protekao rok dosjelosti</strong> pa sudac sudi kao da je tužitelj kviritski vlasnik – <em>formula ficticia</em> (zaštita „vlasništva u nastajanju“). Bonitarni vlasnik može tražiti stvar od svakoga, pa i od kviritskog vlasnika (kojemu suprotstavlja exceptio); pošteni posjednik od svakoga <strong>osim od vlasnika</strong> (nemo plus iuris…) i jačeg poštenog posjednika. Ne treba dokazivati vlasništvo ni prednike – samo stjecanje na temelju valjanog pravnog razloga; zato su je koristili i kviritski vlasnici da izbjegnu probatio diabolica.</p>
<h4>Formula</h4>
<p><em>Si quem hominem Aulus Agerius emit et is ei traditus est, anno possedisset, tum si eum hominem, de quo agitur, eius ex iure Quiritium esse oporteret neque ea res restituetur, quanti ea res erit, tantam pecuniam iudex Numerium Negidium Aulo Agerio condemna, si non paret, absolve.</em></p>
<p>„Kad bi onoga roba što ga je kupio i što mu je predan Aulo Agerije posjedovao godinu dana, i kad bi tada taj rob o kojem se vodi spor trebao biti njegov po kviritskom pravu, a on (tuženik) neće stvar vratiti, koliko ta stvar vrijedi, na toliko novca, suče, osudi Numerija Negidija Aulu Ageriju; ako se ne dokaže, oslobodi.“ Dijelovi: intentio s <strong>fikcijom</strong> („anno possedisset“), arbitrarna klauzula, condemnatio.</p>

<h3>4. Exceptio rei venditae ac traditae</h3>
<p>Prigovor bonitarnog vlasnika <strong>protiv kviritskog vlasnika</strong> koji je prodao res mancipi i predao je tradicijom kupcu, a zatim je traži rei vindicatio – tužitelj (prodavatelj) se odbija na temelju prigovora prodane i predane stvari.</p>

<h3>5. Ostala sredstva</h3>
<ul>
<li><strong>Rei vindicatio per sponsionem</strong> – stranke se izazivaju na okladu (<em>sponsio</em>) o tome čija je tvrdnja ispravna; tuženi posjednik obećava povrat stvari s plodovima (<em>sponsio pro praede litis et vindiciarum</em>); kad tuženi samo poriče tužiteljevu tvrdnju.</li>
<li><strong>Actio ad exhibendum</strong> – za pokretnine u rukama nevlasnika: vlasnik traži da posjednik (ili tko je zlonamjerno prestao posjedovati) stvar izloži pred sudom.</li>
<li><strong>Interdictum quem fundum</strong> – kad nevlasnik koji posjeduje nekretninu neće stupiti u parnicu.</li>
</ul>`
    }
  },

  sluznosti: {
    id: "4zkv2q",
    name: "Služnosti (servitutes)",
    icon: "fa-road",
    color: "#84cc16",
    flashcards: [
      { id: "krwbye", question: "Servitutes – pojam", answer: "Stvarna prava na tuđoj stvari na temelju kojih se ovlaštenik može na određeni način koristiti tuđom stvari; ograničenje prava vlasništva.", explanation: "Iura in re aliena." },
      { id: "xidmg0", question: "Nemini res sua servit", answer: "„Nitko ne može imati služnost na vlastitoj stvari.“ Kad se vlasništvo i služnost sjedine u jednoj osobi, služnost prestaje.", explanation: "Confusio, consolidatio." },
      { id: "0pw9dx", question: "Servitus in faciendo consistere nequit", answer: "„Služnost se ne može sastojati u činjenju“ – vlasnik poslužne stvari mora trpjeti (pati) ili propuštati (non facere), a ne činiti.", explanation: "Iznimka: servitus oneris ferendi (održavanje zida)." },
      { id: "5f4cf5", question: "Servitus servitutis esse non potest", answer: "„Ne može postojati služnost na služnosti.“", explanation: "Opće načelo." },
      { id: "p7qjr4", question: "Servitutibus civiliter utendum est", answer: "„Služnosti se treba koristiti obzirno“ – uz što manju štetu za poslužno dobro (Cels. D. 8.1.9).", explanation: "Put se ne smije voditi kroz vinograd." },
      { id: "e6usa8", question: "Servitutes praediorum (zemljišne služnosti)", answer: "Služnosti u interesu zemljišta: vlasnik povlasnog zemljišta (praedium dominans) ima pravo na poslužnom (praedium serviens); vezane su uz zemljište, ne uz osobu.", explanation: "Nedjeljive; dijele sudbinu zemljišta." },
      { id: "9xczb7", question: "Načela zemljišnih služnosti", answer: "Praedia debent esse vicina (zemljišta susjedna), servitus fundo utilis esse debet (korisna zemljištu), causa perpetua (trajan razlog), dijeli sudbinu zemljišta, nedjeljivost.", explanation: "D. 8.3.5.1 – samo koliko treba zemljištu." },
      { id: "yxfx8o", question: "Poljske služnosti (rusticorum)", answer: "Iter (prolaz pješice, na konju ili nosiljci), actus (tjeranje stoke), via (prolaz kolima), aquaeductus (provođenje vode); u starom pravu res mancipi.", explanation: "Prestaju non usu (2 godine)." },
      { id: "1zfjfy", question: "Gradske služnosti (urbanorum)", answer: "Altius non tollendi (zabrana nadogradnje), oneris ferendi (oslanjanje na susjedov zid), stillicidii (odvođenje kišnice).", explanation: "Prestaju usucapio libertatis." },
      { id: "g80znf", question: "Servitutes personarum (osobne služnosti)", answer: "Služnosti u interesu određene osobe, vremenski ograničene (prestaju njezinom smrću): ususfructus, usus, habitatio, operae servorum vel animalium.", explanation: "Načelno djeljiva prava." },
      { id: "lp4nfd", question: "Ususfructus est ius alienis rebus utendi fruendi salva rerum substantia", answer: "„Plodouživanje je pravo uporabe i korištenja tuđe stvari uz čuvanje njezine supstance.“ Uti i frui, ali ne abuti; strogo osobno, nepotrošne stvari.", explanation: "Svrha: uzdržavanje osobe do smrti." },
      { id: "bcz1bw", question: "Ususfructus irregularis (Ulp. D. 7.5.1)", answer: "Senatusconsultum je dopustio legirati plodouživanje i potrošnih stvari: uživalac postaje vlasnik i na kraju vraća istu količinu i kakvoću (režim zajma).", explanation: "Naziva se i quasi ususfructus, jer pravi uživalac mora očuvati bit stvari, a ovdje je troši." },
      { id: "lieu3c", question: "Ususfructus i usus – razlike", answer: "Usufruktuar upotrebljava i ubire plodove, izvršavanje može prepustiti drugome, pravo je djeljivo. Usuar samo upotrebljava, ne prenosi izvršavanje, pravo je nedjeljivo.", explanation: "Oba: bez promjene namjene stvari." },
      { id: "ujnhrt", question: "Habitatio i operae servorum vel animalium", answer: "Habitatio – pravo stanovanja u tuđoj kući (može se dati u najam); operae – pravo korištenja rada tuđih robova i životinja. Ne prestaju capitis deminutio ni non usu.", explanation: "Justinijan ih izdvaja od ususa." },
      { id: "8be2dd", question: "Stjecanje služnosti", answer: "Mancipatio i in iure cessio, deductio servitutis, legatum per vindicationem, adiudicatio, pactionibus et stipulationibus (provincije), kasnije traditio i patientia.", explanation: "Lex Scribonia zabranila dosjelost služnosti." },
      { id: "d6a6cg", question: "Lex Scribonia", answer: "Zakon s kraja republike kojim je zabranjena dosjelost (usucapio) služnosti.", explanation: "Služnost se stoga stjecala mancipacijom, in iure cessio ili legatom, a ne dugotrajnim korištenjem." },
      { id: "0zyw5h", question: "Deductio servitutis", answer: "Pridržaj služnosti pri otuđenju stvari mancipacijom ili in iure cessio (npr. mancipatio deducto usufructu).", explanation: "Konstitutivno derivativno stjecanje." },
      { id: "hkb2ct", question: "Prestanak služnosti", answer: "Odricanje, confusio/consolidatio, propast poslužne stvari, smrt i capitis deminutio ovlaštenika (ususfructus, usus), non usus (1 ili 2 g.; Justinijan 10/20), usucapio libertatis, istek roka.", explanation: "Osobne na određeno vrijeme prestaju ipso iure." },
      { id: "c0wnab", question: "Non usus i usucapio libertatis", answer: "Non usus – nevršenje poljske služnosti 2 godine (plodouživanja 1 ili 2). Usucapio libertatis – kod gradskih: vlasnik drži poslužno dobro 2 godine u stanju suprotnom služnosti.", explanation: "Justinijan: 10 godina inter praesentes, 20 inter absentes." },
      { id: "0h09h3", question: "Actio confessoria (vindicatio servitutis, ususfructus)", answer: "Tužba za zaštitu služnosti protiv vlasnika koji ometa ovlaštenika (naličje negatorije); u postklasici protiv svakoga.", explanation: "Daje se i emfiteutu, superficijaru i založnom vjerovniku." },
      { id: "psaweo", question: "Cautio usufructuaria", answer: "Stipulacijsko jamstvo kojim se plodouživatelj prije preuzimanja stvari obvezuje vlasniku da će je uživati s pažnjom dobrog gospodara i vratiti je.", explanation: "Kod ususa – cautio usuaria." },
      { id: "970skx", question: "Ima li plodouživatelj posjed?", answer: "Ne – vlasnik ostaje u posjedu i ima interdiktnu zaštitu; plodouživatelj se štiti vindicatio ususfructus.", explanation: "Izvršava pravo, ne posjeduje stvar." }
    ],
    quiz: [
      { id: "k0h8pf", question: "Načelo „servitus in faciendo consistere nequit“ znači da:", options: ["služnost se ne može sastojati u činjenju", "služnost ne može postojati na vlastitoj stvari", "nema služnosti na služnosti", "služnost se vrši obzirno"], correct: 0 },
      { id: "f2atna", question: "Iznimka od načela da se služnost ne sastoji u činjenju jest:", options: ["servitus stillicidii", "iter", "servitus altius non tollendi", "servitus oneris ferendi"], correct: 3 },
      { id: "geu5il", question: "Koja je služnost poljska?", options: ["altius non tollendi", "aquaeductus", "stillicidii", "oneris ferendi"], correct: 1 },
      { id: "cs8xob", question: "Pravo tjeranja stoke preko tuđeg zemljišta zove se:", options: ["actus", "via", "iter", "aquaeductus"], correct: 0 },
      { id: "mk9hxc", question: "Može li se služnost dosjesti?", options: ["da, uvijek", "da, ali samo plodouživanje", "ne, zbog Lex Poetelia", "ne, zbog Lex Scribonia"], correct: 3 },
      { id: "yyqw5q", question: "Plodouživatelj ima ovlaštenja:", options: ["uti, frui i abuti", "uti i frui", "samo uti", "samo frui"], correct: 1 },
      { id: "awcx4c", question: "Usuar može:", options: ["upotrebljavati i ubirati plodove", "prodati stvar", "samo upotrebljavati stvar", "prenijeti pravo na drugoga"], correct: 2 },
      { id: "iy15eq", question: "Po Ulp. D. 7.5.1, senatusconsultum je dopustio zapisati plodouživanje:", options: ["samo italskih zemljišta", "samo robova i stoke", "stvari koje se uporabom troše", "samo kuća u gradu Rimu"], correct: 2 },
      { id: "ughd8q", question: "Gradske služnosti prestaju:", options: ["usucapio libertatis", "smrću ovlaštenika", "non usu od jedne godine", "capitis deminutio minima"], correct: 0 },
      { id: "6gwz84", question: "Koja osobna služnost ne prestaje capitis deminutio?", options: ["ususfructus", "usus", "nijedna", "habitatio"], correct: 3 },
      { id: "9gpmuy", question: "Tužba za zaštitu služnosti jest:", options: ["actio negatoria", "actio confessoria", "actio Publiciana", "actio Serviana"], correct: 1 },
      { id: "2ji1kv", question: "„Nemini res sua servit“ znači:", options: ["nitko ne može imati služnost na vlastitoj stvari", "služnost se mora vršiti obzirno prema vlasniku", "nitko ne prenosi na drugoga više prava nego ima", "ne može postojati služnost na drugoj služnosti"], correct: 0 },
      { id: "w0au0g", question: "Poslužno zemljište zove se:", options: ["praedium dominans", "ager publicus", "fundus Italicus", "praedium serviens"], correct: 3 },
      { id: "vz60wu", question: "Koje načelo vrijedi za zemljišne služnosti?", options: ["moraju biti vremenski ograničene", "zemljišta moraju biti susjedna", "prestaju smrću vlasnika", "djeljive su"], correct: 1 },
      { id: "5lvrfs", question: "Po Justinijanu rok nevršenja služnosti inter praesentes iznosi:", options: ["2 godine", "5 godina", "10 godina", "30 godina"], correct: 2 },
      { id: "idw30f", question: "Na provincijskim zemljištima služnosti su se osnivale:", options: ["mancipacijom pred svjedocima", "in iure cessio pred pretorom", "pactionibus et stipulationibus", "dosjelošću od dvije godine"], correct: 2 },
      { id: "g67pf8", question: "Osobne služnosti mogle su se osnovati legatom:", options: ["per vindicationem", "per damnationem", "sinendi modo", "fideikomisom samo"], correct: 0 },
      { id: "86ye49", question: "Koji je stav o posjedu plodouživatelja?", options: ["on je posjednik stvari", "posjed ima pretor", "posjed dijele napola", "vlasnik ostaje posjednik"], correct: 3 },
      { id: "t0ior6", question: "Prestankom služnosti spajanjem vlasništva i plodouživanja u istoj osobi zove se:", options: ["deductio", "consolidatio", "patientia", "non usus"], correct: 1 },
      { id: "eapfgh", question: "Celzov fragment D. 8.1.9 primjer je načela:", options: ["servitutibus civiliter utendum est", "servitus servitutis esse non potest", "nemini res sua servit", "causa perpetua"], correct: 0 }
    ],
    fillBlanks: [
      { id: "6fnov1", sentence: "Ususfructus est ius alienis rebus utendi fruendi salva rerum _______.", answer: "substantia", hint: "Bit, supstanca." },
      { id: "j99r1x", sentence: "Servitus _______ esse non potest.", answer: "servitutis", hint: "Služnost na služnosti." }
    ],
    learn: {
      id: "fm8dk0",
      title: "Služnosti",
      content: `<h3>Pojam i načela</h3>
<p><strong>Servitutes</strong> su stvarna prava na <strong>tuđoj</strong> stvari na temelju kojih se ovlaštenik može na određeni način koristiti tuđom stvari – <strong>ograničenje prava vlasništva</strong>.</p>
<table>
<tr><th>Načelo</th><th>Prijevod i smisao</th></tr>
<tr><td><em>Nemini res sua servit</em></td><td>Nitko ne može imati služnost na vlastitoj stvari – sjedinjenjem vlasništva i služnosti u istoj osobi služnost prestaje.</td></tr>
<tr><td><em>Servitus in faciendo consistere nequit</em></td><td>Služnost se ne može sastojati u činjenju – vlasnik poslužnog dobra trpi (<em>pati</em>) ili propušta (<em>non facere</em>). Iznimka: <em>servitus oneris ferendi</em> – vlasnik mora održavati zid.</td></tr>
<tr><td><em>Servitus servitutis esse non potest</em></td><td>Ne može postojati služnost na služnosti.</td></tr>
<tr><td><em>Servitutibus civiliter utendum est</em></td><td>Služnosti se treba koristiti obzirno.</td></tr>
</table>
<p><strong>Cels. D. 8.1.9:</strong> „Ako je nekome ustanovljena služnost puta preko nečijeg zemljišta bez pobližeg određenja, može prolaziti i tjerati stoku bilo kojim dijelom, ali obzirno (<em>civiliter modo</em>) – ne kroz dvorište ni posred vinograda, kad to može jednako udobno drugim krajem uz manju štetu za poslužno dobro. Kuda je put prvi put određen, onuda se mora ići i ne smije se kasnije mijenjati“ (Sabin – primjer potoka).</p>

<h3>Podjela</h3>
<h4>1. Servitutes praediorum (rerum) – zemljišne (stvarne)</h4>
<p>U interesu zemljišta: vlasniku <strong>povlasnog</strong> zemljišta (<em>praedium dominans</em>) daju prava na <strong>poslužnom</strong> (<em>praedium serviens</em>). Vezane su uz stvar – promjena vlasnika ne dira služnost.</p>
<p><strong>Načela:</strong> <em>praedia debent esse vicina</em> – zemljišta moraju biti susjedna; <em>servitus fundo utilis esse debet</em> – služnost mora biti korisna zemljištu (ne osobi); <em>causa perpetua</em> – razlog mora biti trajne naravi; služnost dijeli pravnu sudbinu zemljišta; <strong>nedjeljivost</strong> (ne stječe se ni gubi po dijelovima). Ulp. D. 8.3.5.1: ne može se crpsti voda, napajati stoka, vaditi glina ili gasiti vapno na tuđem zemljištu ako nemaš susjedno zemljište, i to samo koliko treba tom zemljištu.</p>
<table>
<tr><th>Poljske (rusticorum)</th><th>Gradske (urbanorum)</th></tr>
<tr><td><strong>iter</strong> – prolaz pješice, na konju ili u nosiljci<br><strong>actus</strong> – tjeranje stoke<br><strong>via</strong> – prolaz kolima (spoj itera i actusa)<br><strong>aquaeductus</strong> – provođenje vode<br>(i služnosti vode, ispaše, vađenja građe)<br>Četiri najstarije su <strong>res mancipi</strong>; prestaju <em>non usu</em> – nevršenjem 2 godine</td><td><strong>altius non tollendi</strong> – zabrana podizanja (nadogradnje) kuće<br><strong>oneris ferendi</strong> – oslanjanje građevine na susjedov zid<br><strong>stillicidii</strong> – odvođenje kišnice<br>Prestaju <em>usucapio libertatis</em> – vlasnik 2 godine drži poslužno dobro u stanju suprotnom sadržaju služnosti</td></tr>
</table>

<h4>2. Servitutes personarum – osobne</h4>
<p>U interesu određene osobe; <strong>vremenski ograničene</strong> (prestaju smrću titulara); načelno djeljive.</p>
<ul>
<li><strong>Ususfructus</strong> (plodouživanje) – <em>Ususfructus est ius alienis rebus utendi fruendi salva rerum substantia</em> – „pravo uporabe i korištenja tuđe stvari uz čuvanje njezine supstance“: <strong>uti +, frui +, abuti –</strong>. Strogo osobno pravo, na nepotrošnim stvarima, vremenski ograničeno. Svrha: osigurati uzdržavanje osobe do smrti, a da vlasništvo prijeđe na druge. Definicija je djelomično neprecizna (plodouživatelj smije vaditi kamen i pijesak). Može se osnovati <em>mancipatio deducto usufructu</em> i legatom, ne tradicijom; nije postojalo na provincijskom zemljištu.<br><strong>Ulp. D. 7.5.1:</strong> „Senatskim mišljenjem utvrđeno je da se može zapisati plodouživanje stvari koje uporabom nestaju ili se umanjuju“ – <strong>ususfructus irregularis</strong>: uživalac postaje vlasnik i na kraju vraća istu količinu i kakvoću (režim zajma).<br>Plodouživatelj <strong>nema posjeda</strong> (vlasnik zadržava posjed i interdiktnu zaštitu); prije preuzimanja daje stipulaciju <strong>cautio usufructuaria</strong> (uživat će s pažnjom dobrog gospodara i neće mijenjati bit); štiti se <em>vindicatio ususfructus</em>.</li>
<li><strong>Usus</strong> – ovlaštenik stvar samo upotrebljava, ne ubire plodove; potpuno nenasljedivo.</li>
<li><strong>Habitatio</strong> – pravo stanovanja u tuđoj kući ili njezinu dijelu; može se dati u najam trećima; ne prestaje capitis deminutio ni non usu.</li>
<li><strong>Operae servorum vel animalium</strong> – pravo korištenja radne snage tuđih robova i životinja; ne prestaje capitis deminutio ni non usu.</li>
</ul>
<table>
<tr><th>Ususfructus</th><th>Usus</th></tr>
<tr><td>bez promjene namjene stvari (ni na bolje)</td><td>bez promjene namjene stvari</td></tr>
<tr><td>može ubirati plodove</td><td>samo upotrebljava, ne ubire plodove</td></tr>
<tr><td>strogo osobno, ali izvršavanje može prepustiti drugome</td><td>strogo osobno, ne može prenijeti ni izvršavanje</td></tr>
<tr><td>djeljivo</td><td>nedjeljivo</td></tr>
<tr><td>cautio usufructuaria</td><td>cautio usuaria</td></tr>
</table>

<h3>Stjecanje služnosti</h3>
<ul>
<li><strong>mancipatio / in iure cessio</strong> – četiri poljske služnosti (res mancipi); isprva su se mogle i <strong>dosjesti</strong>, dok <strong>Lex Scribonia</strong> (kraj republike) to nije zabranila;</li>
<li><strong>in iure cessio</strong> za osobne služnosti (netjelesne stvari) – <em>vindicatio servitutis / ususfructus</em>;</li>
<li><strong>deductio servitutis</strong> – pridržaj služnosti pri otuđenju vlasništva mancipacijom ili in iure cessio;</li>
<li><strong>legatum per vindicationem</strong> – osobne služnosti mortis causa;</li>
<li><strong>adiudicatio</strong> – u diobenim parnicama;</li>
<li><strong>pactionibus et stipulationibus</strong> – na provincijskim zemljištima (neformalni pristanak / formalno obećanje da se neće smetati) – s vremenom najvažniji načini;</li>
<li>kasnije: <strong>traditio</strong> (kvazitradicija – držanje stvari kod osobnih, vršenje kod zemljišnih) i <strong>patientia</strong> (prešutni pristanak vlasnika). U postklasici stare poljske služnosti mogu se dosjesti nakon 2 godine.</li>
</ul>

<h3>Prestanak služnosti</h3>
<ol>
<li>odreknuće ovlaštenika (in iure cessio, exceptio);</li>
<li><strong>confusio</strong> (kod plodouživanja <strong>consolidatio</strong>) – spajanje vlasništva i služnosti u istoj osobi;</li>
<li>propast poslužne stvari ili njezin prelazak extra commercium;</li>
<li>smrt i capitis deminutio ovlaštenika – ususfructus i usus (ne habitatio i operae);</li>
<li><strong>non usus</strong> – nevršenje 1 ili 2 godine (poljske služnosti, plodouživanje, usus); kod gradskih <strong>usucapio libertatis</strong>; Justinijan: <strong>10 godina inter praesentes, 20 inter absentes</strong>;</li>
<li>osobne služnosti osnovane na određeno vrijeme prestaju ipso iure istekom roka ili nastupom rezolutivnog uvjeta.</li>
</ol>

<h3>Zaštita</h3>
<ul>
<li><strong>Vindicatio ususfructus</strong> – protiv vlasnika (i posjednika) koji ometa ovlaštenika.</li>
<li><strong>Actio confessoria</strong> (vindicatio servitutis) – osnovna tužba za zaštitu služnosti: isprva protiv vlasnika, u postklasici protiv svakoga tko ometa; naličje negatorije; priznavana i emfiteutu, superficijaru i založnom vjerovniku.</li>
<li><strong>Actio negatoria</strong> – vlasnik niječe postojanje tuđeg stvarnog prava na svojoj stvari.</li>
</ul>`
    }
  },

  zaloznoPravo: {
    id: "ni3tr7",
    name: "Založno pravo (pignus, hypotheca)",
    icon: "fa-lock",
    color: "#0ea5e9",
    flashcards: [
      { id: "l8h4wx", question: "Založno pravo – pojam", answer: "Stvarno pravo na tuđoj stvari radi osiguranja tražbine: ako dug ne bude plaćen, vjerovnik se namiruje iz stvari. Ograničava vlasnikovo ovlaštenje abuti.", explanation: "Realno osiguranje, za razliku od jamstva." },
      { id: "0a41jn", question: "Akcesornost založnog prava", answer: "Založno pravo nastaje, postoji i prestaje ovisno o tražbini koju osigurava; jedino je stvarno pravo po naravi vremenski ograničeno.", explanation: "Prestaje utrnućem glavne obveze." },
      { id: "c27fln", question: "Fiducia (cum creditore)", answer: "Najstariji oblik osiguranja: dužnik mancipacijom ili in iure cessio prenosi vjerovniku vlasništvo uz pactum fiduciae o povratu nakon namirenja. Nije založno pravo.", explanation: "Actio fiduciae – samo inter partes." },
      { id: "ph4bx7", question: "Pignus datum (ručni zalog)", answer: "Dužnik neformalno predaje stvar vjerovniku u posjed kao osiguranje; vjerovnik je zadržava do ispunjenja i ima interdiktnu zaštitu, a dužnik ostaje vlasnik.", explanation: "Izvedeni posjed vjerovnika." },
      { id: "97lpdz", question: "Hypotheca (pignus conventum)", answer: "Ugovorni zalog bez predaje stvari – samo sporazumom određena stvar služi kao osiguranje; razvio se kod zakupa zemljišta (invecta et illata).", explanation: "Pactum hypothecae – neformalan." },
      { id: "hzz6yd", question: "Invecta et illata", answer: "Stvari koje zakupnik unese na zakupljeno zemljište (alat, stoka, robovi, sjeme) i daje kao osiguranje zakupnine vlasniku zemljišta.", explanation: "Izvor hipoteke." },
      { id: "lfmgs7", question: "Interdictum Salvianum i actio Serviana", answer: "Salvianum – zakupodavac traži posjed založenih stvari samo od zakupnika. Serviana – actio in rem protiv svakoga tko ih posjeduje; hipoteka time postaje stvarno pravo.", explanation: "Actio quasi Serviana – za svakog založnog vjerovnika." },
      { id: "b80m69", question: "Actio quasi Serviana (hypothecaria)", answer: "Proširenje Serviane na svakog vjerovnika osiguranog ugovornim zalogom, i na ručni zalog kad je vjerovnik izgubio posjed; kod Justinijana actio hypothecaria.", explanation: "Stvarnopravna tužba." },
      { id: "pbnued", question: "Načini nastanka založnog prava", answer: "Ugovorom (contractus pigneraticius kod ručnog zaloga; pactum hypothecae), sudskom odlukom (pignus iudiciale) i zakonom (pignus legale, tacitum).", explanation: "Generalne hipoteke množe se kod Justinijana." },
      { id: "ygqoee", question: "Ius possidendi i ius distrahendi", answer: "Possidendi – pravo posjeda stvari (ručni zalog odmah, hipoteka po dospijeću). Distrahendi – pravo prodati stvar i namiriti se; višak (superfluum) vraća se dužniku.", explanation: "Vjerovnik ne smije upotrebljavati stvar – furtum usus." },
      { id: "v4eslv", question: "Lex commissoria u založnom pravu", answer: "Ugovorna odredba da založena stvar pripada vjerovniku u vlasništvo ako dug ne bude plaćen na vrijeme; zabranio ju je Konstantin.", explanation: "Razlikuj lex commissoria uz kupoprodaju." },
      { id: "ujla0h", question: "Pactum antichreticum", answer: "Ugovor da plodovi založene stvari umjesto kamata pripadaju založnom vjerovniku (antihreza).", explanation: "Inače plodovi pripadaju vlasniku." },
      { id: "70fr22", question: "Pignus Gordianum", answer: "Pravo vjerovnika (od 239.) da zadrži zalog i nakon namirenja osigurane tražbine dok mu dužnik ne plati druge tražbine – retencija.", explanation: "Ius retentionis." },
      { id: "zu2a0l", question: "Prior tempore, potior iure", answer: "„Prvi u vremenu, jači u pravu“ – kod više založnih prava na istoj stvari prednost ima ranije osnovano.", explanation: "Uz ius offerendi et succedendi." },
      { id: "ch8gxm", question: "Ius offerendi et succedendi", answer: "Kasniji založni vjerovnik može isplatiti ranijeg i stupiti na njegovo mjesto.", explanation: "Zaštita kasnijih vjerovnika." },
      { id: "2ue1vl", question: "Prestanak založnog prava", answer: "Utrnućem tražbine (solutio, datio in solutum, pactum de non petendo), propašću stvari, confusio, odricanjem, prodajom stvari, zastarom tužbe i dosjelošću.", explanation: "Kao akcesorno i kao stvarno pravo." },
      { id: "7f7q7x", question: "Tko je posjednik u ugovoru o zalogu?", answer: "Zalogodavac (dužnik) posjeduje samo glede dosjelosti; za sve ostale posljedice posjeduje zalogoprimac – vjerovnik (Javol. D. 41.3.16).", explanation: "Vjerovnik ima interdikte." },
      { id: "os9ob8", question: "Iznimka od nemo plus iuris kod zaloga", answer: "Založni vjerovnik koji nije vlasnik može po dospijeću prodati založenu stvar; kupac res mancipi stječe tradicijom, a kviritski vlasnik postaje tek dosjelošću.", explanation: "Vjerovnik ne može mancipirati." }
    ],
    quiz: [
      { id: "5fcl93", question: "Fiducia je:", options: ["zakonsko založno pravo na cijeloj imovini dužnika", "ručni zalog bez prijenosa vlasništva na vjerovnika", "ugovorni zalog bez predaje stvari vjerovniku", "prijenos vlasništva vjerovniku uz pactum fiduciae"], correct: 3 },
      { id: "mj2fc0", question: "Kod hipoteke (pignus conventum) vjerovnik pri osnivanju:", options: ["odmah stječe vlasništvo", "ne dobiva stvar u posjed", "odmah stječe posjed", "stječe posjed dosjelošću"], correct: 1 },
      { id: "aq855g", question: "Tužba kojom zakupodavac traži založene stvari od svakoga tko ih posjeduje jest:", options: ["interdictum Salvianum", "actio fiduciae", "actio Serviana", "actio pigneraticia directa"], correct: 2 },
      { id: "lzjwwa", question: "Interdictum Salvianum mogao se koristiti:", options: ["protiv svakoga posjednika", "samo protiv kasnijeg vjerovnika", "samo protiv zakupnika", "samo protiv kupca stvari"], correct: 2 },
      { id: "1kpeos", question: "Lex commissoria u založnom pravu zabranio je:", options: ["Konstantin", "Hadrijan", "Justinijan", "Gordijan"], correct: 0 },
      { id: "g25ohj", question: "Višak cijene nakon prodaje založene stvari zove se:", options: ["canon", "antichresis", "solarium", "superfluum"], correct: 3 },
      { id: "6xse8u", question: "Što je ius offerendi et succedendi?", options: ["pravo vjerovnika da proda založenu stvar", "pravo kasnijeg vjerovnika da isplati ranijeg", "pravo dužnika da ponudi drugu stvar u zalog", "pravo zadržavanja stvari i nakon namirenja"], correct: 1 },
      { id: "vflpo6", question: "Ako založni vjerovnik upotrebljava založenu stvar bez dopuštenja, čini:", options: ["furtum usus", "damnum iniuria datum", "iniuriju", "rapinu"], correct: 0 },
      { id: "fao2p2", question: "Pignus Gordianum omogućuje vjerovniku:", options: ["prodati založenu stvar prije dospijeća", "ubirati plodove stvari umjesto kamata", "steći vlasništvo stvari bez prodaje", "zadržati stvar zbog drugih tražbina"], correct: 3 },
      { id: "y0eci9", question: "Plodove umjesto kamata vjerovniku daje:", options: ["lex commissoria", "pactum antichreticum", "pactum fiduciae", "pactum de non petendo"], correct: 1 },
      { id: "esrgig", question: "Actio fiduciae djeluje:", options: ["erga omnes", "protiv svakog posjednika", "samo protiv ugovornog partnera", "samo protiv države"], correct: 2 },
      { id: "i5uuor", question: "Ako vjerovnik stekne vlasništvo založene stvari, založno pravo prestaje:", options: ["solucijom", "novacijom", "konfuzijom", "remisijom"], correct: 2 },
      { id: "6nidti", question: "Prema Javolenu, zalogodavac posjeduje:", options: ["samo glede dosjelosti", "glede svih posljedica", "samo glede interdikata", "uopće ne posjeduje"], correct: 0 },
      { id: "j3w9sy", question: "Lex commissoria u založnom pravu je ugovor da:", options: ["kasniji vjerovnik isplati ranijeg i stupi na njegovo mjesto", "prodavatelj odustane od kupnje ako kupac ne plati na vrijeme", "plodovi založene stvari pripadnu vjerovniku umjesto kamata", "stvar pripadne vjerovniku ako dug ne bude plaćen"], correct: 3 }
    ],
    fillBlanks: [
      { id: "emavjw", sentence: "Stvari koje zakupnik unese na zemljište zovu se invecta et _______.", answer: "illata", hint: "Unesene." },
      { id: "bm5sqj", sentence: "Prior tempore, potior _______.", answer: "iure", hint: "Pravom." },
      { id: "qpyccl", sentence: "Proširena Servijanska tužba zove se actio quasi _______.", answer: "Serviana", hint: "Po pretoru Serviju." },
      { id: "mix05j", sentence: "Založno pravo nastaje, postoji i prestaje ovisno o tražbini – ono je _______.", answer: "akcesorno", hint: "Sporedno." }
    ],
    learn: {
      id: "g34hek",
      title: "Založno pravo",
      content: `<h3>Pojam</h3>
<p><strong>Založno pravo</strong> je stvarno pravo na tuđoj stvari koje služi osiguranju tražbine – jamstvo vjerovniku za slučaj da dužnik sam ili uz pomoć jamaca ne ispuni obvezu. Za razliku od ostalih stvarnih prava ne daje pravo korištenja, nego <strong>realno osiguranje</strong>; ograničava vlasnikovo ovlaštenje <em>abuti</em>. <strong>Akcesorno</strong> je – nastaje, postoji i prestaje ovisno o tražbini; jedino je stvarno pravo po naravi vremenski ograničeno.</p>
<h3>Tri tipa osiguranja tražbine</h3>
<ol>
<li><strong>Fiducia (cum creditore)</strong> – nije založno pravo: dužnik mancipacijom ili in iure cessio prenosi <strong>vlasništvo</strong> stvari na vjerovnika uz uglavak <em>pactum fiduciae</em> da će je vratiti nakon namirenja. Isprva samo moralna obveza, u 3.–2. st. pr. Kr. utuživa <em>actio fiduciae</em> – obveznopravna, samo protiv ugovornog partnera; ako vjerovnik stvar otuđi, dužnik traži samo naknadu štete. (<em>Fiducia cum amico</em> služila je čuvanju ili posudbi.)</li>
<li><strong>Pignus datum (ručni zalog)</strong> – dužnik neformalno predaje stvar vjerovniku u posjed s pravom da je zadrži do ispunjenja. Vjerovnik je u biti detentor, ali ima interdiktnu zaštitu (izvedeni posjed); dužnik ostaje vlasnik (rei vindicatio protiv trećih), a nakon ispunjenja traži stvar <em>actio pigneraticia directa</em> iz <em>contractus pigneraticius</em>.</li>
<li><strong>Pignus conventum (hypotheca)</strong> – ugovorni zalog <strong>bez predaje stvari</strong>: sporazum da određena stvar služi kao osiguranje. Razvio se kod zakupa poljoprivrednog zemljišta: zakupnik je stvari koje je unio na zemljište (<strong>invecta et illata</strong> – alat, stoka, robovi, sjeme) davao kao jamstvo zakupnine.</li>
</ol>
<h4>Razvoj hipotekarne zaštite</h4>
<ul>
<li><strong>Interdictum Salvianum</strong> – zakupodavac stječe posjed založenih stvari, ali <strong>samo protiv zakupnika</strong>;</li>
<li><strong>actio Serviana</strong> – actio in rem protiv <strong>svakoga</strong> tko posjeduje založene stvari – hipoteka postaje stvarno pravo;</li>
<li><strong>actio quasi Serviana</strong> – za svakog vjerovnika s ugovornim zalogom, i za ručni zalog kad je vjerovnik izgubio posjed;</li>
<li>kod Justinijana <strong>actio hypothecaria</strong> i <strong>actio pigneraticia in rem</strong>.</li>
</ul>
<h3>Nastanak</h3>
<ol>
<li><strong>ugovorom</strong> – ručni zalog: realni kontrakt <em>contractus pigneraticius</em> (sporazum + predaja); hipoteka: neformalni <em>pactum hypothecae (conventum)</em> bez predaje;</li>
<li><strong>sudskom odlukom</strong> (<em>pignus iudiciale</em>, u ovrsi);</li>
<li><strong>zakonom</strong> – <em>pignus tacitum, pignus legale, hypotheca legalis</em>; u kasnoj klasici prešutni ugovor o zalogu (<em>tacita conventio</em>); u klasici samo specijalne, kod Justinijana sve više generalnih hipoteka na cijeloj imovini (npr. štićenik na imovini tutora).</li>
</ol>
<h3>Položaj založnog vjerovnika</h3>
<ul>
<li><strong>Ius possidendi</strong> – kod ručnog zaloga odmah, kod hipoteke tek po bezuspješnom proteku roka. Vjerovnik ne smije stvar upotrebljavati – čini <strong>furtum usus</strong>. Plodovi pripadaju vlasniku, osim ako je ugovoren <strong>pactum antichreticum</strong> (plodovi umjesto kamata).</li>
<li><strong>Ius distrahendi</strong> – kad osigurana obveza nije ispunjena, vjerovnik prodaje stvar i namiruje se; višak (<strong>superfluum, hyperocha</strong>) vraća dužniku. Ne nađe li kupca, može od cara tražiti dodjelu vlasništva. Budući da može samo tradirati (ne mancipirati), kupac res mancipi postaje kviritski vlasnik tek dosjelošću – iznimka od <em>nemo plus iuris</em>.</li>
<li><strong>Lex commissoria</strong> – ugovor da stvar pripadne vjerovniku ako dug ne bude plaćen; u klasici dopuštena, <strong>Konstantin ju je zabranio</strong>.</li>
<li><strong>Ius retentionis – pignus Gordianum</strong> (od 239.): vjerovnik zadržava zalog i nakon namirenja dok mu se ne podmire druge tražbine prema istom dužniku.</li>
<li>Predmet: najprije samo tjelesne stvari; u klasici i tražbina (<em>pignus nominis</em>), samo založno pravo, neke služnosti, skupine stvari. Otuđenjem stvari stjecatelj se ne oslobađa tereta.</li>
<li><strong>Više založnih prava na istoj stvari</strong>: <em>Prior tempore, potior iure</em> – „Prvi u vremenu, jači u pravu“; <strong>ius offerendi et succedendi</strong> – kasniji vjerovnik isplaćuje ranijeg i stupa na njegovo mjesto.</li>
</ul>
<h3>Prestanak</h3>
<ol>
<li>kao akcesorno – utrnućem glavne obveze: <em>solutio</em> (ispunjenje), <em>datio in solutum</em> (davanje umjesto plaćanja), <em>pactum de non petendo</em> (oprost), novacija;</li>
<li>kao stvarno pravo – propašću stvari; <em>confusio</em> (vjerovnik stekne vlasništvo stvari);</li>
<li><em>remissio</em> – odricanje (bez forme); prodaja (namirenje); zastara actio hypothecaria (30 ili 40 godina); dosjelost <em>longi temporis praescriptio</em> – tko je stvar stekao s naslovom u dobroj vjeri ne znajući za zalog, postaje vlasnik bez tereta nakon 10/20 godina.</li>
</ol>
<h3>Primjer (ugovor o zalogu)</h3>
<p>Gaj je od Augusta pozajmio 100 zlatnika i kao osiguranje predao mu konja. Gaj je <strong>založni dužnik – zalogodavac</strong> (u zajmu dužnik), August <strong>založni vjerovnik – zalogoprimac</strong>. Iz ugovora o zalogu (inter partes) nastaje založno pravo (erga omnes). U obveznom odnosu iz ugovora o zalogu dužnik povrata stvari je zalogoprimac, a vjerovnik zalogodavac. Javol. D. 41.3.16: zalogodavac posjeduje samo glede dosjelosti, za sve ostalo posjeduje zalogoprimac.</p>`
    }
  },

  superficiesEmfiteuza: {
    id: "y3zg6q",
    name: "Superficies i emfiteuza",
    icon: "fa-building",
    color: "#f97316",
    flashcards: [
      { id: "dar2l7", question: "Superficies", answer: "Nasljedivo i otuđivo pravo korištenja zgrade podignute na tuđem zemljištu, uz plaćanje godišnje naknade (solarium).", explanation: "Spaja superficies solo cedit i trajno korištenje nevlasnika." },
      { id: "2ehyte", question: "Podrijetlo superficijesa", answer: "Iz obveznog odnosa vlasnika zemljišta i graditelja – zakupa (uz solarium) ili kupnje prava korištenja – razvilo se stvarno pravo.", explanation: "Domena obveznog pa stvarnog prava." },
      { id: "ft6dfj", question: "Zaštita superficijara", answer: "Interdictum de superficiebus, zatim actio in rem protiv trećih i vlasnika zemljišta; kod Justinijana actiones utiles (kao vlasnik).", explanation: "Uz actio confessoria." },
      { id: "e9b7xl", question: "Prestanak superficijesa", answer: "Istekom roka, propašću zemljišta i ako superficijar 2 godine ne plaća solarium.", explanation: "Emfiteuza – 3 godine canona." },
      { id: "09y0yf", question: "Emphyteusis", answer: "Nasljedivi i otuđivi zakup poljoprivrednog zemljišta stvarnopravnog karaktera, trajan (in perpetuum), uz godišnju naknadu – canon.", explanation: "Kod Justinijana samostalno stvarno pravo." },
      { id: "vwl8xv", question: "Podrijetlo emfiteuze", answer: "Ager vectigalis (država i općine daju zemlju u dugi zakup uz vectigal) i emphyteusis istoka; car Zenon ih spaja u contractus emphyteuticarius.", explanation: "Ius perpetuum i ius emphyteuticum." },
      { id: "oic3er", question: "Canon", answer: "Godišnja naknada (u novcu ili naturi) koju emfiteut plaća vlasniku zemljišta.", explanation: "Plaćanje kanona glavna je obveza emfiteuta, a neplaćanje može dovesti do gubitka prava." },
      { id: "uck96v", question: "Ius protimeseos i laudemium", answer: "Pri otuđenju emfiteut obavještava vlasnika koji u roku od 2 mjeseca ima pravo prvokupa (ius protimeseos); pri prodaji trećem vlasnik dobiva 2 % cijene (laudemium).", explanation: "Justinijanovo pravo." },
      { id: "83ihhh", question: "Prava i dužnosti emfiteuta", answer: "Puno korištenje zemljišta, plodovi separacijom kao vlasnik, smije mijenjati kulturu; ne smije pogoršati zemljište, snosi javne terete.", explanation: "Zaštita: actio in rem vectigalis, confessoria, negatoria." },
      { id: "j2a297", question: "Prestanak emfiteuze", answer: "Ako emfiteut 3 godine ne plaća canon ili javne terete, propašću stvari, odreknućem i konfuzijom.", explanation: "Superficies – 2 godine solariuma." }
    ],
    quiz: [
      { id: "l6dvqv", question: "Superficies je pravo:", options: ["korištenja tuđeg poljoprivrednog zemljišta", "korištenja zgrade na tuđem zemljištu", "prolaza kolima preko tuđeg zemljišta", "zaloga na tuđoj zgradi"], correct: 1 },
      { id: "izpwlx", question: "Naknada koju plaća superficijar zove se:", options: ["solarium", "vectigal", "merces", "canon"], correct: 0 },
      { id: "u3xs3r", question: "Canon je:", options: ["zakupnina koju plaća superficijar", "pravo prvokupa vlasnika zemljišta", "dva posto cijene pri prodaji prava", "godišnja naknada emfiteuta vlasniku"], correct: 3 },
      { id: "t6t9tu", question: "Emfiteuza prestaje ako emfiteut ne plaća canon:", options: ["1 godinu", "3 godine", "2 godine", "10 godina"], correct: 1 },
      { id: "61hx8l", question: "Superficijes prestaje ako superficijar ne plaća solarium:", options: ["5 godina", "3 godine", "2 godine", "nikad ne prestaje"], correct: 2 },
      { id: "vsv855", question: "Laudemium iznosi:", options: ["1/4 cijene", "1/10 prihoda", "2 % cijene", "dvostruki canon"], correct: 2 },
      { id: "hpd7en", question: "Ius perpetuum i ius emphyteuticum spojio je u contractus emphyteuticarius car:", options: ["Zenon", "Konstantin", "Dioklecijan", "Hadrijan"], correct: 0 },
      { id: "zrcle6", question: "Načelo superficies solo cedit znači:", options: ["zgrada i zemljište su suvlasništvo", "zemljište pripada graditelju", "zgrada je res nullius", "zgrada pripada vlasniku zemljišta"], correct: 3 },
      { id: "3q22wr", question: "Emfiteut stječe plodove:", options: ["percepcijom kao zakupnik", "separacijom kao vlasnik", "tek dosjelošću", "uopće ih ne stječe"], correct: 1 },
      { id: "5w8ctk", question: "Rok prvokupa vlasnika (ius protimeseos) iznosio je:", options: ["2 mjeseca", "30 dana", "1 godinu", "100 dana"], correct: 0 }
    ],
    fillBlanks: [],
    learn: {
      id: "6aa3er",
      title: "Superficies i emfiteuza",
      content: `<h3>Superficies</h3>
<p><strong>Nasljedivo i otuđivo pravo korištenja zgrade podignute na tuđem zemljištu.</strong> Spaja načelo <em>superficies solo cedit</em> („zgrada pripada zemljištu“ – vlasnik zemljišta je vlasnik građevine) s potrebom da se nevlasniku osigura trajno korištenje građevine.</p>
<ul>
<li><strong>Razvoj:</strong> isprva odnos vlasnika zemljišta i graditelja u domeni obveznog prava – zakup (<em>locatio conductio</em>, uz godišnju naknadu <strong>solarium</strong>) ili kupnja prava korištenja (isplata odjednom); iz obveznog odnosa nastaje stvarno pravo (nasljedivo, otuđivo).</li>
<li><strong>Zaštita:</strong> <em>interdictum de superficiebus</em>; u klasici <em>actio in rem</em> protiv trećih i vlasnika zemljišta; Justinijan superficijara izjednačuje s vlasnikom – <em>actiones utiles</em>; priznaje mu se i actio confessoria.</li>
<li>Superficijar upotrebljava građevinu po volji, ali je ne smije pogoršati.</li>
<li><strong>Prestanak:</strong> istek roka, propast zemljišta, neplaćanje solariuma <strong>2 godine</strong>.</li>
</ul>
<h3>Emphyteusis (emfiteuza)</h3>
<p><strong>Nasljedivi i otuđivi zakup poljoprivrednog zemljišta stvarnopravnog karaktera</strong> – ugovor sa stvarnopravnim učincima, trajno korištenje zemlje (<em>in perpetuum</em>).</p>
<ul>
<li><strong>Korijeni:</strong> <em>ager vectigalis</em> (zapad) – država i općine još u republici daju neobrađenu zemlju privatnicima u dugotrajni zakup (oko 100 godina) uz godišnji <em>vectigal</em>; zaštita <em>actio in rem vectigalis</em>; i <em>emphyteusis</em> u užem smislu (istok). Klasika to još smatra obveznim odnosom (zakupom).</li>
<li>Potkraj klasike i u postklasici <em>ius perpetuum</em> i <em>ius emphyteuticum</em> (osobito na carskim dobrima) se izjednačuju; car <strong>Zenon</strong> stvara samostalni <em>contractus emphyteuticarius</em>; kod <strong>Justinijana</strong> emfiteuza je posebno stvarno pravo na tuđoj stvari, otuđivo i nasljedivo.</li>
<li><strong>Canon</strong> – godišnja naknada vlasniku (u novcu ili naturi).</li>
<li><strong>Otuđenje:</strong> emfiteut mora najaviti namjeru vlasniku, koji u roku od <strong>2 mjeseca</strong> ima pravo prvokupa (<strong>ius protimeseos</strong>); kod prodaje trećem plaća vlasniku <strong>2 % cijene</strong> (<strong>laudemium</strong>).</li>
<li><strong>Prava i dužnosti:</strong> puno korištenje; plodovi separacijom kao vlasnik; smije mijenjati kulturu, ne smije pogoršati zemljište; snosi javne terete.</li>
<li><strong>Zaštita:</strong> actio in rem vectigalis, actio confessoria, actio negatoria.</li>
<li><strong>Prestanak:</strong> neplaćanje canona ili javnih tereta <strong>3 godine</strong>, propast stvari, odreknuće, konfuzija.</li>
</ul>`
    }
  },

  obligatioOpce: {
    id: "aoe9s9",
    name: "Obvezno pravo – opći dio: obligatio i činidba",
    icon: "fa-link",
    color: "#14b8a6",
    flashcards: [
      { id: "q48pld", question: "Obligatio – pojam", answer: "Pravna veza između vjerovnika (creditor) i dužnika (debitor) na temelju koje je dužnik obvezan ispuniti određenu činidbu, a vjerovnik ovlašten tražiti njezino ispunjenje.", explanation: "Debitum – dug." },
      { id: "zy375f", question: "Objekt obveze – činidba", answer: "Dare (prijenos vlasništva ili mirnog posjeda), facere (činjenje ili nečinjenje – non facere) i praestare (odgovornost, osobito za štetu).", explanation: "Obligatio in dando, in faciendo, in praestando." },
      { id: "c7n24h", question: "Svojstva činidbe", answer: "Ljudska radnja ili propust, imovinskog karaktera (procjenjiva u novcu), fizički i pravno moguća, dopuštena i moralna, određena ili barem odrediva.", explanation: "Presuda u formularnom postupku glasi na novac." },
      { id: "hn3yct", question: "Ad impossibilia nemo tenetur", answer: "„Nitko nije obvezan na nemoguću činidbu.“ Obveza s objektivno nemogućom činidbom je ništava.", explanation: "Impossibilium nulla obligatio." },
      { id: "hfhnf7", question: "Summa divisio obligationum (Gaj)", answer: "Omnis obligatio vel ex contractu nascitur vel ex delicto – svaka obveza nastaje ili iz ugovora ili iz delikta; Gaj kasnije dodaje ex variis causarum figuris.", explanation: "Gai. Inst. 3.88." },
      { id: "2gy2tt", question: "Justinijanova kvadriparticija", answer: "Obveze ex contractu, quasi ex contractu, ex delicto i quasi ex delicto.", explanation: "Simetrija podjele." },
      { id: "rrjnv8", question: "Obligationes civiles, praetoriae, naturales", answer: "Civilne – utužive po civilnom pravu; pretorske – zaštićene pretorovim tužbama; naturalne – plative, ali neutužive.", explanation: "Podjela po zaštiti." },
      { id: "xe896t", question: "Obligatio naturalis", answer: "Plativa, ali civilno neutuživa obveza (razradio Julijan): obveze robova, između oca i sina u vlasti, štićenika bez tutora. Plaćeno se ne vraća; može se osigurati jamstvom.", explanation: "Obligatio naturalis ne daje tužbu, ali ima učinke: plaćeno se ne može tražiti natrag." },
      { id: "ogieod", question: "Alternativna obveza", answer: "U obvezi su dvije ili više činidbi, dužnik ispunjava jednu; izbor (ius variandi) pripada dužniku dok ne ispuni. Duae sive plures res in obligatione, una in solutione.", explanation: "Paul. D. 18.1.34.6: „Stih ili Pamfil“." },
      { id: "rxq8n4", question: "Facultas alternativa", answer: "U obvezi je jedna stvar, ali se dužnik može osloboditi dajući drugu; vjerovnik može utužiti samo dugovanu. Una res in obligatione, duae in solutione.", explanation: "Primjeri: neprava ugovorna kazna, noxae deditio." },
      { id: "rpriu7", question: "Paul. D. 44.7.44.5", answer: "„Ako mi je obećano: ako ne dadeš zemljište, obećaješ li dati stotinu? – u obvezi je samo stotina, a u ispunjenju (i) zemljište.“ – facultas alternativa.", explanation: "Dužnik duguje samo stotinu, ali se može osloboditi i davanjem zemljišta." },
      { id: "xce3gj", question: "Generička i individualno određena činidba", answer: "Generička – određena vrstom (genus); ne propada, dužnik daje bilo koju (Justinijan: srednje kakvoće). Individualna – species; propašću bez krivnje dužnik se oslobađa.", explanation: "Genus perire non censetur." },
      { id: "kexroe", question: "Djeljive i nedjeljive činidbe", answer: "Djeljive se mogu ispuniti u dijelovima bez štete za vjerovnika (obveze na dare); nedjeljive ne mogu (obveze na facere i non facere).", explanation: "Važno kod više dužnika." },
      { id: "snwpy2", question: "Obligationes stricti iuris i bonae fidei", answer: "Stricti iuris – sudac utvrđuje samo formu i iznos (verbalni, literalni, zajam). Bonae fidei – sudac slobodno ocjenjuje po dobroj vjeri (realni, konsenzualni, inominatni, pakti).", explanation: "Bonae fidei povoljnije za dužnika." },
      { id: "00fgn6", question: "Kamate (usurae)", answer: "Naknada za korištenje tuđe glavnice (sors, caput) ili kazna za zakašnjenje; akcesorne. Dugovale su se samo ako su ugovorene stipulacijom ili propisane (bonae fidei, mora).", explanation: "Neformalni pakt o kamatama nije bio utuživ." },
      { id: "bnkf5h", question: "Visina kamata", answer: "XII ploča: faenus unciarium; kasna republika i carstvo: usurae centesimae (1 % mjesečno, 12 % godišnje); Justinijan 6 %. Zabranjene usurae usurarum i kamate ultra duplum.", explanation: "Ultra duplum – iznad glavnice." },
      { id: "dei5uy", question: "Ugovori u korist i na teret trećih", answer: "U klasici ništavi su obećanje da će treći nešto učiniti i obećanje u korist trećeg (alteri stipulari nemo potest), osim u korist imaoca vlasti.", explanation: "Pomoć – stipulatio poenae." }
    ],
    quiz: [
      { id: "drn7p7", question: "Što je obveza?", options: ["pravo stupiti u ostavinu umrle osobe", "faktična vlast na tjelesnoj stvari i volja da se zadrži", "stvarno pravo na tuđoj stvari prema svima", "pravna veza vjerovnika i dužnika o činidbi"], correct: 3 },
      { id: "7eiyy9", question: "„Duae sive plures res in obligatione, una in solutione“ opisuje:", options: ["facultas alternativa", "alternativno određenu činidbu", "pasivnu delegaciju (dužnika)", "aktivnu delegaciju (vjerovnika)"], correct: 1 },
      { id: "2768r5", question: "„Una res in obligatione, duae in solutione“ opisuje:", options: ["alternativnu obvezu više stvari", "solidarnu obvezu više dužnika", "facultas alternativa dužnika", "generičku obvezu po vrsti"], correct: 2 },
      { id: "1go5i3", question: "Noxae deditio primjer je za:", options: ["naturalnu obvezu robova", "alternativnu obvezu", "facultas alternativa", "solidarnu obvezu"], correct: 2 },
      { id: "u883qk", question: "Tko se obvezuje samo naturaliter?", options: ["rob", "emancipirani sin", "pater familias", "zakupnik"], correct: 0 },
      { id: "fp6ncw", question: "Plaćeno na temelju naturalne obveze:", options: ["može se tražiti natrag kondikcijom", "pripada fiscusu kao bona vacantia", "vraća se dužniku u dvostrukom iznosu", "ne može se tražiti natrag"], correct: 3 },
      { id: "rc4yg3", question: "Justinijanova podjela obveza po postanku je:", options: ["dvodioba (ugovor i delikt)", "kvadriparticija (četiri)", "triparticija (tri izvora)", "pentaparticija (pet izvora)"], correct: 1 },
      { id: "y1zag3", question: "Prema Gaju (summa divisio) svaka obveza nastaje:", options: ["iz ugovora ili iz delikta", "iz zakona ili iz edikta", "iz posjeda ili iz zakona", "iz presude suca ili pretora"], correct: 0 },
      { id: "yz5baz", question: "Obveze na facere su načelno:", options: ["djeljive na jednake dijelove", "naturalne, bez utuživosti", "generičke, po vrsti", "nedjeljive po svojoj naravi"], correct: 3 },
      { id: "o041u9", question: "Usurae centesimae iznosile su godišnje:", options: ["6 %", "12 %", "100 %", "10 %"], correct: 1 },
      { id: "y5vgxd", question: "Justinijan je najvišu kamatnu stopu snizio na:", options: ["4 %", "8 %", "6 %", "12 %"], correct: 2 },
      { id: "o8wqcz", question: "Kamate po rimskom pravu dugovale su se:", options: ["iz svakog neformalnog pakta stranaka", "nikada u klasičnom pravu", "samo uz stipulaciju ili po zakonu", "samo kod obveza iz delikata"], correct: 2 },
      { id: "dqq8fq", question: "Izbor kod alternativne obveze pripada u pravilu:", options: ["dužniku", "vjerovniku", "sucu", "ždrijebu"], correct: 0 },
      { id: "sw3d4c", question: "Obveza iz ugovora o zajmu jest:", options: ["obligatio bonae fidei", "obligatio praetoria", "obligatio naturalis", "obligatio stricti iuris"], correct: 3 },
      { id: "hlsfu5", question: "Alteri stipulari nemo potest znači:", options: ["nitko ne može stipulirati bez svjedoka", "nitko ne može stipulirati u korist trećega", "stipulacija ne treba sukladni odgovor", "treći mora odobriti svaku stipulaciju"], correct: 1 },
      { id: "f1dbtz", question: "Činidba praestare odnosi se prvenstveno na:", options: ["odgovornost, osobito za štetu", "prijenos vlasništva stvari", "nečinjenje (non facere)", "predaju mirnog posjeda"], correct: 0 },
      { id: "t7ab5z", question: "Obveza s objektivno nemogućom činidbom je:", options: ["valjana", "naturalna", "pobojna", "ništava"], correct: 3 }
    ],
    fillBlanks: [],
    learn: {
      id: "8au5pf",
      title: "Obligatio – pojam, činidba, podjele",
      content: `<h3>Pojam</h3>
<p><strong>Obligatio</strong> je pravna veza između vjerovnika (<em>creditor</em>) i dužnika (<em>debitor</em>) u pogledu određene činidbe: dužnik je dužan ispuniti činidbu (<em>debitum</em>), a vjerovnik je ovlašten tražiti ispunjenje. Obvezno pravo djeluje inter partes, relativno i pozitivno, a štiti se <strong>actiones in personam</strong>.</p>
<h3>Činidba</h3>
<ul>
<li><strong>dare</strong> – davanje stvari u vlasništvo (ili miran posjed – kod kupoprodaje prodavatelj ne prenosi vlasništvo) – <em>obligatio in dando</em>;</li>
<li><strong>facere</strong> – činjenje (<em>in faciendo</em>) ili nečinjenje, propuštanje (<em>in non faciendo</em>);</li>
<li><strong>praestare</strong> – izraz nije posve jasan; upućuje na odgovornost, osobito za štetu ako dužnik ne ispuni ili ne ispuni uredno prvotnu obvezu.</li>
</ul>
<p><strong>Svojstva:</strong> rezultat ljudske radnje ili propusta; <strong>imovinski karakter</strong> (procjenjiva u novcu, jer presuda glasi na novac); fizički i pravno <strong>moguća</strong> – <em>Ad impossibilia nemo tenetur</em> („nitko nije obvezan na nemoguće“; obveza je ništava samo kod objektivne nemogućnosti); dopuštena i moralna; <strong>određena</strong> (<em>certa</em>) ili barem <strong>odrediva</strong> (<em>incerta</em>).</p>
<h4>Vrste činidaba</h4>
<ul>
<li><strong>Alternativna</strong> – u obvezi su dvije ili više činidbi, dužnik ispunjava jednu: <em>duae sive plures res in obligatione, una in solutione</em>; izbor (<em>ius variandi</em>) ima dužnik dok ne ispuni, ako nije drukčije ugovoreno. Paul. D. 18.1.34.6: „Ako je kupnja sklopljena ovako: kupio sam Stiha ili Pamfila, prodavatelj je ovlašten dati koga hoće, kao i kod stipulacije.“</li>
<li><strong>Facultas alternativa</strong> – u obvezi je jedna stvar, ali se dužnik može osloboditi dajući drugu (povlastica dužnika): <em>una res in obligatione, duae in solutione</em>; vjerovnik utužuje samo dugovanu. Paul. D. 44.7.44.5: „ako ne dadeš zemljište, obećaješ li dati stotinu?“ – u obvezi je samo stotina, u ispunjenju i zemljište (neprava ugovorna kazna). Primjer je i noxae deditio.</li>
<li><strong>Generička / individualno određena</strong> – genus ne propada (u klasici bilo koja stvar vrste, Justinijan: srednje kakvoće); species propada na štetu vjerovnika.</li>
<li><strong>Djeljiva / nedjeljiva</strong> – djeljive su obveze na dare, nedjeljive na facere i non facere; <strong>trenutna / trajna</strong>.</li>
</ul>
<h3>Podjele obveza</h3>
<ul>
<li>po zaštiti: <strong>civiles</strong> (utužive civilnim tužbama), <strong>praetoriae</strong>, <strong>naturales</strong>;</li>
<li>po sadržaju: određene/odredive, djeljive/nedjeljive, <strong>stricti iuris / bonae fidei</strong>;</li>
<li>po postanku: <strong>klasika (Gaj)</strong> – <em>summa divisio</em>: <em>omnis enim obligatio vel ex contractu nascitur vel ex delicto</em> (Gai. 3.88); kasnije Gaj dodaje <em>ex variis causarum figuris</em> (iz drugih razloga); <strong>Justinijan</strong> – kvadriparticija: ex contractu, quasi ex contractu, ex delicto, quasi ex delicto.</li>
</ul>
<h4>Obligatio naturalis</h4>
<p>Plativa, ali civilnopravno <strong>neutuživa</strong> obveza (pojam razvijen u klasici, razradio Julijan). U klasici: obveze robova, obveze između imaoca vlasti i osoba u vlasti, obveza štićenika preuzeta bez tutorove auctoritas; nakon capitis deminutio kontraktna obveza ostaje kao naturalna. Posljedice: plaćeno se ne može tražiti natrag; može se osigurati jamstvom, možda novirati i osigurati zalogom.</p>
<h3>Kamate (usurae)</h3>
<p>Iznosi u novcu ili zamjenjivim stvarima koje dužnik plaća za korištenje glavnice (<em>sors, caput</em>) ili kao kaznu za zakašnjenje; <strong>akcesorne</strong> (prestankom glavnog duga prestaju). Dugovale su se samo ako su <strong>ugovorene formalnim poslom – stipulacijom</strong> (neformalni pakt nije rađao obvezu) ili ako ih propisuje pravni poredak (iudicia bonae fidei, zakašnjenje, nakon litiskontestacije). Visina: XII ploča – <em>faenus unciarium</em>; kasna republika i carstvo – <strong>usurae centesimae</strong> (1 % mjesečno, 12 % godišnje); Justinijan – <strong>6 %</strong> (uz iznimke). Zabranjene su kamate na kamate (<em>usurae usurarum</em>), a od 3. st. i kamate čim zaostale dosegnu glavnicu (<em>ultra duplum</em>).</p>
<h3>Ugovori u korist i na teret trećih</h3>
<p>U klasici su ništavi: obveza koja počinje tek nakon smrti stranaka, obećanje da će treći nešto učiniti i obećanje primljeno u korist trećega – <em>alteri stipulari nemo potest</em> (osim u korist imaoca vlasti). Posredno sredstvo bila je <em>stipulatio poenae</em> za slučaj neispunjenja prema trećem; stajalište je kasnije napušteno.</p>`
    }
  },

  subjektiObveza: {
    id: "prfhdj",
    name: "Subjekti obveza, osiguranje i promjena subjekata",
    icon: "fa-users",
    color: "#8b5cf6",
    flashcards: [
      { id: "fhemql", question: "Razdijeljena obveza", answer: "Kod djeljive činidbe s više vjerovnika ili dužnika nastaje onoliko obveza koliko ima osoba; svaki traži ili duguje samo svoj dio (pars virilis).", explanation: "Nomina sunt ipso iure divisa." },
      { id: "1glt66", question: "Nomina sunt ipso iure divisa", answer: "„Dugovi (tražbine) su djeljivi sami po sebi“ – djeljiva obveza više osoba po samom pravu se dijeli na dijelove.", explanation: "Npr. tražbine među sunasljednicima." },
      { id: "0xxtyv", question: "Solidarna obveza", answer: "Kod nedjeljive činidbe ili po ugovoru: svaki dužnik duguje cijelu činidbu (pasivna), odnosno svaki vjerovnik smije tražiti cijelu (aktivna); ispunjenje jednoga oslobađa sve.", explanation: "Korealna stipulacija." },
      { id: "k087a4", question: "Elektivna i kumulativna solidarnost", answer: "Elektivna (ugovori) – vjerovnik bira jednog dužnika, plaćanjem jednoga oslobađaju se svi. Kumulativna (delikti) – svaki supočinitelj plaća cijelu kaznu.", explanation: "U klasici već litiskontestacija oslobađa ostale." },
      { id: "774d3a", question: "Beneficium divisionis i cedendarum actionum", answer: "Divisionis – svaki od više dužnika (jamaca) odgovara samo za svoj dio. Cedendarum actionum – dužnik koji je platio traži da mu vjerovnik ustupi tužbe protiv ostalih.", explanation: "Klasika ih još ne zna za sudužnike; kod jamaca Hadrijan." },
      { id: "yrlh1z", question: "Adstipulatio", answer: "Uz glavnog vjerovnika uvodi se sporedni (akcesorni) vjerovnik – adstipulator – kojem dužnik istom stipulacijom obećava istu činidbu, za slučaj spriječenosti glavnog; primljeno predaje glavnom.", explanation: "Strogo osobno; ne prelazi na nasljednike." },
      { id: "6y74a4", question: "Poručanstvo (adpromissio, jamstvo)", answer: "Obveza treće osobe (jamca) uz glavnog dužnika na istu činidbu radi osiguranja vjerovnika; akcesorna – ne više ni strože od glavnog dužnika; prestaje s glavnom obvezom.", explanation: "Personalno osiguranje." },
      { id: "cnd8ky", question: "Sponsio, fidepromissio, fideiussio", answer: "Sponsio – samo za Rimljane; fidepromissio – i za peregrine; obje ne prelaze na nasljednike jamca. Fideiussio – za sve i prelazi na nasljednike, osigurava i neverbalne obveze.", explanation: "Tri tipa jamstva u obliku stipulacije." },
      { id: "6lotsw", question: "Supsidijarnost jamstva", answer: "Jamac odgovara tek ako se vjerovnik ne može namiriti od glavnog dužnika – u klasici ne vrijedi; uvodi je Justinijan (beneficium excussionis sive ordinis).", explanation: "Beneficium excussionis znači da vjerovnik prvo mora tužiti glavnog dužnika." },
      { id: "we8tqn", question: "Neformalno jamstvo", answer: "Constitutum debiti alieni (obećanje platiti tuđi dug u roku), receptum argentarii (obećanje bankara) i mandatum qualificatum (nalog da se trećem pozajmi novac).", explanation: "Pretorska i ugovorna osnova." },
      { id: "3uf6pr", question: "Intercessio i SC Vellaeanum", answer: "Intercesija – svako preuzimanje obveze za trećega (kumulativna, privativna, prešutna). SC Vellaeanum (46.) ženama zabranjuje intercesiju; vjerovnik se odbija prigovorom.", explanation: "Exceptio SC Vellaeani." },
      { id: "6p275w", question: "Arrha (kapara)", answer: "Stvar ili novac dan pri sklapanju: confirmatoria (dokaz sklapanja), poenitentialis (odustatnina), poenalis (kazna). Tko je dao i ne ispuni, gubi je; tko je primio, vraća dvostruko.", explanation: "Kod Justinijana ovisno o obliku kupoprodaje." },
      { id: "n1we2o", question: "Cessio (ustup tražbine)", answer: "Vjerovnik (cedent) ustupa tražbinu drugome (cesionaru); u klasici preko zastupanja – cesionar tuži kao procurator in rem suam (formula s promijenjenim subjektima).", explanation: "Za razliku od delegacije, obveza ne prestaje." },
      { id: "9d7fs6", question: "Expromissio (preuzimanje duga)", answer: "Uz pristanak vjerovnika netko se stipulacijom obvezuje platiti dug umjesto dotadašnjeg dužnika; stari dužnik se oslobađa (pasivna novacija).", explanation: "Promjena dužnika." },
      { id: "n8nmj6", question: "Actiones adiecticiae qualitatis", answer: "Pretorske tužbe vjerovnika protiv imaoca vlasti (oca, gospodara) za poslove osoba u vlasti: de peculio, de in rem verso, tributoria, quod iussu, institoria, exercitoria.", explanation: "Naziv je glosatorski." },
      { id: "tsx81o", question: "Actio de peculio i de in rem verso", answer: "De peculio – odgovornost imaoca vlasti do visine pekulija. De in rem verso – do visine koristi koja je ušla u njegovu imovinu.", explanation: "Ograničena odgovornost." },
      { id: "xwzwc3", question: "Actio quod iussu, institoria, exercitoria", answer: "Quod iussu – posao sklopljen po nalogu imaoca vlasti (neograničeno). Institoria – poslovođa trgovine ili radnje; exercitoria – zapovjednik broda; vlasnik odgovara neograničeno.", explanation: "Institoria i exercitoria i za osobe izvan vlasti." },
      { id: "3wadcl", question: "Actio tributoria", answer: "Ako je pekulij uz znanje imaoca vlasti upotrijebljen u poslovanju, vjerovnici traže razmjernu raspodjelu pekulija (i imalac vlasti kao vjerovnik).", explanation: "Distribuere – raspodijeliti." },
      { id: "b7tvwn", question: "Noxa caput sequitur", answer: "„Deliktna odgovornost prati počinitelja“ – noksalnom tužbom odgovara tko ima vlast nad počiniteljem u času tužbe; oslobođeni počinitelj odgovara sam.", explanation: "Actiones noxales." },
      { id: "kqjeu4", question: "Actiones noxales", answer: "Tužbe za delikte osoba u vlasti: imalac vlasti plaća kaznu ili predaje počinitelja (noxae deditio); sin predan u noksu odrađuje štetu pa se otpušta; Justinijan zabranjuje noksu sinova.", explanation: "Ako je delikt po nalogu oca – on odgovara." }
    ],
    quiz: [
      { id: "nhz5d5", question: "Sponsio je:", options: ["oblik jamstva dostupan i peregrinima", "oblik jamstva dostupan samo Rimljanima", "oblik jamstva koji prelazi na nasljednike", "neformalni oblik jamstva bankara za klijenta"], correct: 1 },
      { id: "kjcvm6", question: "Fidepromissio je:", options: ["oblik jamstva samo za rimske građane", "oblik jamstva koji prelazi na nasljednike", "oblik jamstva dostupan i peregrinima", "senatska zabrana intercesije žena"], correct: 2 },
      { id: "p361cy", question: "Koji oblik jamstva prelazi na nasljednike jamca?", options: ["sponsio", "fidepromissio", "fideiussio", "adstipulatio"], correct: 2 },
      { id: "g3mqx5", question: "Supsidijarnost jamstva (beneficium excussionis) uveo je:", options: ["Justinijan", "Hadrijan", "pretor", "Zakonik XII ploča"], correct: 0 },
      { id: "rebtvy", question: "Beneficium divisionis za jamce uveo je:", options: ["August", "Justinijan", "Konstantin", "Hadrijan"], correct: 3 },
      { id: "onfnue", question: "SC Vellaeanum zabranjuje:", options: ["zajam sinu u vlasti", "intercesiju žena", "kamate na kamate", "darovanja među supružnicima"], correct: 1 },
      { id: "pg2dfm", question: "Sporedni vjerovnik uz glavnog zove se:", options: ["adstipulator", "fideiussor", "cesionar", "expromissor"], correct: 0 },
      { id: "ihjq86", question: "Kod delikata više supočinitelja odgovara:", options: ["razdijeljeno po glavama, svaki svoj dio", "elektivno solidarno, plaća jedan za sve", "samo najstariji među supočiniteljima", "kumulativno – svaki cijelu kaznu"], correct: 3 },
      { id: "zplvco", question: "Actiones adiecticiae qualitatis podiže:", options: ["imalac vlasti protiv sina u vlasti", "vjerovnik protiv imaoca vlasti", "rob protiv gospodara iz pekulija", "sin u vlasti protiv vjerovnika"], correct: 1 },
      { id: "m539f8", question: "Odgovornost do visine koristi koja je ušla u imovinu imaoca vlasti daje:", options: ["actio de peculio", "actio quod iussu", "actio de in rem verso", "actio tributoria"], correct: 2 },
      { id: "7qgz8n", question: "Protiv vlasnika broda za poslove zapovjednika služi:", options: ["actio institoria", "actio tributoria", "actio exercitoria", "actio quod iussu"], correct: 2 },
      { id: "j5faox", question: "Ako je imalac vlasti naredio sklapanje posla, vjerovnik ima:", options: ["actio quod iussu", "actio de peculio", "actio de in rem verso", "actio noxalis"], correct: 0 },
      { id: "t1cbid", question: "Ako sin u vlasti počini delikt pa bude adoptiran, noksalna tužba ide protiv:", options: ["dotadašnjeg imaoca očinske vlasti", "nikoga, tužba se gasi", "samog sina kao počinitelja", "novog imaoca očinske vlasti"], correct: 3 },
      { id: "l9q543", question: "Kapara koja služi kao odustatnina jest:", options: ["arrha confirmatoria", "arrha poenitentialis", "arrha poenalis", "stipulatio poenae"], correct: 1 },
      { id: "bxxe2e", question: "Stranka koja je primila kaparu, a ne ispuni obvezu:", options: ["vraća je u dvostrukom iznosu", "zadržava je", "vraća je u jednostrukom iznosu", "plaća četverostruko"], correct: 0 },
      { id: "xkn7hb", question: "Preuzimanje duga stipulacijom uz pristanak vjerovnika zove se:", options: ["cessio", "acceptilatio", "adstipulatio", "expromissio"], correct: 3 },
      { id: "pch3d8", question: "Cesionar je u klasici tužio dužnika kao:", options: ["heres (nasljednik)", "procurator in rem suam", "adstipulator (dodatni stipulant)", "vindex (branitelj)"], correct: 1 },
      { id: "0q4rvk", question: "„Nomina sunt ipso iure divisa“ odnosi se na:", options: ["solidarne obveze dužnika", "založno pravo na stvarima", "djeljive tražbine i dugove", "naturalne obveze robova"], correct: 2 },
      { id: "2v2h7h", question: "Constitutum debiti alieni je:", options: ["prijenos tražbine na drugoga", "formalna stipulacija jamstva", "neformalno obećanje platiti tuđi dug", "oprost duga neformalnim paktom"], correct: 2 },
      { id: "z5yd97", question: "Djelomično ispunjenje kod solidarne obveze jednog dužnika:", options: ["oslobađa sve za ispunjeni iznos", "oslobađa samo njega", "nema učinka", "pretvara obvezu u naturalnu"], correct: 0 }
    ],
    fillBlanks: [],
    learn: {
      id: "nyc6to",
      title: "Subjekti obveza, osiguranje i promjena subjekata",
      content: `<h3>Subjekti obveze</h3>
<p>U obvezi postoje najmanje dva subjekta – vjerovnik i dužnik (dualistička obveza); može ih biti više (pluralistička). Položaj stranaka je <strong>koordiniran</strong> (isti ekonomski i pravni interes – razdijeljene i solidarne obveze) ili <strong>akcesoran</strong> (sporedni vjerovnik, sporedni dužnik).</p>
<h4>Razdijeljene obveze</h4>
<p>Kod <strong>djeljive činidbe</strong> s više osoba na jednoj strani nastaje onoliko obveza koliko ima osoba; svaki vjerovnik traži, a svaki dužnik duguje samo svoj dio (<em>pars virilis</em>). <em>Nomina sunt ipso iure divisa</em> – „dugovi su djeljivi sami po sebi“.</p>
<h4>Solidarne obveze</h4>
<p>Kod <strong>nedjeljive činidbe</strong> ili kad je tako ugovoreno: <strong>pasivna</strong> solidarnost – svaki od više dužnika obvezan je na cijelu činidbu; <strong>aktivna</strong> – svaki od više vjerovnika ovlašten je tražiti cijelu. Ispunjenje jednome (ili od jednoga) gasi obvezu za sve.</p>
<ul>
<li><strong>Elektivna</strong> (ugovori, korealna stipulacija) – vjerovnik bira dužnika; u klasici već <strong>litiskontestacija</strong> protiv jednoga oslobađa ostale (konsumptivni učinak), kod Justinijana tek namirenje.</li>
<li><strong>Kumulativna</strong> (delikti) – svaki supočinitelj plaća cijelu kaznu.</li>
<li>Prave (korealne) solidarne obveze nastaju iz ugovora; nepotpune iz naknade štete i delikata.</li>
<li>Klasika još ne zna za sudužnike <em>beneficium divisionis</em>, <em>cedendarum actionum</em> ni <em>excussionis</em>; Justinijan (Nov. 99) uvodi da vjerovnik od sudužnika traži samo njegov dio.</li>
</ul>
<h3>Uzgredni subjekti</h3>
<h4>Adstipulatio – sporedni vjerovnik</h4>
<p>Dužnik istom (ili manjom) stipulacijom obećava činidbu i <strong>adstipulatoru</strong>, da bi se omogućilo ispunjenje i kad je glavni vjerovnik spriječen; adstipulator primljeno mora predati glavnom. Strogo osobni odnos (ne prelazi na nasljednike). Ako adstipulator akceptilacijom na štetu glavnog vjerovnika oprosti dug, odgovara po <strong>Lex Aquilia</strong> (2. glava).</p>
<h4>Poručanstvo (adpromissio) – sporedni dužnik</h4>
<p>Treća osoba (jamac, poruk) obvezuje se uz glavnog dužnika na istu činidbu radi boljeg osiguranja vjerovnika. Obilježja:</p>
<ul>
<li><strong>akcesornost</strong> – ne može se obvezati više ni strože od glavnog dužnika; prestankom glavne obveze prestaje i jamčeva;</li>
<li><strong>supsidijarnost</strong> – <em>ne u klasici</em>: vjerovnik je mogao odmah tužiti jamca (time su ostali, i glavni dužnik, bili oslobođeni); Justinijan uvodi <strong>beneficium excussionis sive ordinis</strong> – najprije se pokušava naplata od glavnog dužnika;</li>
<li>više jamaca: <strong>beneficium divisionis</strong> (Hadrijan, 2. st.) – Gai. 3.121: vjerovnik od pojedinih solventnih jamaca traži samo njihov dio;</li>
<li><strong>regres</strong> – Lex Publilia ga daje sponzoru (ako mu dužnik ne vrati u 6 mjeseci); Justinijan ga generalizira, uz <strong>beneficium cedendarum actionum</strong>.</li>
</ul>
<table>
<tr><th>Tip (stipulacijom)</th><th>Dostupnost</th><th>Nasljeđivanje</th></tr>
<tr><td><strong>sponsio</strong></td><td>samo rimski građani</td><td>ne prelazi na nasljednike</td></tr>
<tr><td><strong>fidepromissio</strong></td><td>i peregrini</td><td>ne prelazi na nasljednike</td></tr>
<tr><td><strong>fideiussio</strong></td><td>Rimljani i peregrini; osigurava i neverbalne obveze</td><td>prelazi na nasljednike</td></tr>
</table>
<p><strong>Neformalno jamstvo:</strong> <em>constitutum debiti alieni</em> (neformalno obećanje da će se tuđi dug platiti u određeno vrijeme), <em>receptum argentarii</em> (obećanje bankara da će platiti dug klijenta), <em>mandatum qualificatum</em> (mandant nalaže mandataru da trećemu pozajmi novac – odgovara ako treći ne vrati).</p>
<h4>Intercessio</h4>
<p>Svako preuzimanje obveze za trećega: <strong>kumulativna</strong> (dodatnim obvezivanjem), <strong>privativna</strong> (preuzimanje tuđeg duga) i <strong>prešutna</strong> (sklapanje obveze radi trećega). <strong>SC Vellaeanum (46.)</strong> zabranjuje ženama intercesiju; žena civilno odgovara, ali se vjerovnik odbija <em>exceptio senatusconsulti Vellaeani</em>.</p>
<h3>Druga sredstva osiguranja</h3>
<p>Uz personalna (jamstvo, intercesija) i realna (fiducia, pignus, hypotheca): <strong>arrha (kapara)</strong> – <em>confirmatoria</em> (dokaz sklapanja), <em>poenitentialis</em> (odustatnina), <em>poenalis</em> (ugovorna kazna); tko je dao kaparu i ne ispuni, gubi je; tko je primio i ne ispuni, vraća <strong>dvostruko</strong>. Također pretvaranje posla bonae fidei u stricti iuris (stipulacijom) i zakletva (<em>cautio iuratoria</em>).</p>
<h3>Promjena subjekata</h3>
<p>Vezana uz novaciju (<em>novatio qualificata</em> – delegacija):</p>
<ul>
<li><strong>Cessio</strong> – ustup tražbine: vjerovnik (<em>cedent</em>) ustupa tražbinu <em>cesionaru</em>. U klasici cesionar tuži dužnika kao vjerovnikov zastupnik (<em>cognitor, procurator</em>) – formulom s promijenjenim subjektima (vjerovnik u intenciji, cesionar u kondemnaciji) – zapravo vodi svoj posao: <strong>procurator in rem suam</strong>.</li>
<li><strong>Expromissio</strong> – preuzimanje duga: uz pristanak vjerovnika netko se stipulacijom obvezuje platiti umjesto dotadašnjeg dužnika (pasivna novacija).</li>
</ul>
<h3>Sudjelovanje trećih – actiones adiecticiae qualitatis</h3>
<p>Pretorske tužbe (od 2. st. pr. Kr.; naziv iz doba glosatora) kojima vjerovnik ostvaruje tražbinu iz posla osobe u vlasti (sina, roba) protiv <strong>imaoca vlasti</strong> – dodatna odgovornost uz odgovornost osobe u vlasti. Sin se može obvezati, ali nema imovine; robova obveza je naturalna.</p>
<table>
<tr><th>Tužba</th><th>Slučaj</th><th>Odgovornost imaoca vlasti</th></tr>
<tr><td><strong>actio de peculio</strong></td><td>posao osobe s pekulijem</td><td>do visine pekulija (u času presude)</td></tr>
<tr><td><strong>actio de in rem verso</strong></td><td>imalac vlasti imao je korist od posla</td><td>do visine obogaćenja; vremenski neograničena</td></tr>
<tr><td><strong>actio tributoria</strong></td><td>pekulij je uz znanje imaoca korišten u poslovanju</td><td>razmjerna raspodjela pekulija među vjerovnicima (i imaocem)</td></tr>
<tr><td><strong>actio quod iussu</strong></td><td>imalac vlasti naredio je posao</td><td>neograničeno, solidarno</td></tr>
<tr><td><strong>actio institoria</strong></td><td>osoba postavljena za poslovođu trgovine, radnje</td><td>neograničeno</td></tr>
<tr><td><strong>actio exercitoria</strong></td><td>zapovjednik broda (exercitor navis)</td><td>neograničeno</td></tr>
</table>
<p>Institoria i exercitoria mogle su se podići i kad poslovođa nije bio u vlasti (protiv <em>dominus negotii</em>).</p>
<h4>Actiones noxales</h4>
<p>Za delikt osobe u vlasti počinjen po nalogu ili uz znanje imaoca vlasti odgovara on sam; inače može platiti ili počinitelja predati oštećenome (<strong>noxae deditio</strong> – mancipacijom; rob u vlasništvo, sin u mancipium dok ne odradi štetu, pa ga treba otpustiti). <strong>Noxa caput sequitur</strong> – ako počinitelj u međuvremenu bude prodan ili adoptiran, tuži se novi imalac vlasti; ako je postao slobodan, odgovara sam (običnom deliktnom tužbom). Justinijan zabranjuje noksalnu predaju sinova.</p>`
    }
  },

  neispunjenje: {
    id: "qcost1",
    name: "Neispunjenje obveza: zakašnjenje, šteta, krivnja",
    icon: "fa-triangle-exclamation",
    color: "#6366f1",
    flashcards: [
      { id: "cvl10q", question: "Mora debitoris", answer: "Zakašnjenje dužnika: dužnik svojom krivnjom ne ispuni dospjelu, valjanu i utuživu obvezu; po pravilu nakon opomene vjerovnika (interpellatio).", explanation: "Nema zakašnjenja kod naturalnih obveza." },
      { id: "5v37tb", question: "Posljedice mora debitoris", answer: "Pooštrenje odgovornosti – perpetuatio obligationis: dužnik odgovara i za slučajnu propast stvari; kod bonae fidei i za kamate, plodove i štetu.", explanation: "Justinijan: oslobođen ako bi stvar propala i kod vjerovnika." },
      { id: "xikutf", question: "Pomp. D. 12.1.5", answer: "„Ako je ono što si bio dužan dati propalo nakon što si ti skrivio da mi ne dadeš, nedvojbeno to ide na tvoju štetu.“ – mora debitoris.", explanation: "Perpetuatio obligationis." },
      { id: "fsfkaw", question: "Kada dužnika ne treba opominjati?", answer: "Kod deliktne obveze i kod obveze s kalendarskim rokom – dies interpellat pro homine.", explanation: "Rok opominje umjesto čovjeka." },
      { id: "emp9n0", question: "Purgatio (emendatio) morae", answer: "Prestanak dužnikova zakašnjenja kad dužnik naknadno ponudi, a vjerovnik primi ispunjenje.", explanation: "Kod vjerovnika – izjava da će primiti." },
      { id: "p671tm", question: "Mora creditoris (accipiendi)", answer: "Vjerovnik bez opravdanog razloga odbije stvarno ponuđenu činidbu; ne traži se ni krivnja ni dospjelost. Dužnik tada odgovara samo za dolus.", explanation: "Rizik prelazi na vjerovnika." },
      { id: "4hy3bo", question: "Pomp. D. 18.6.18 (17)", answer: "„Nakon što je kupac pao u zakašnjenje, prodavatelj više ne odgovara za culpa, nego samo za dolus.“ – mora creditoris (kupac je vjerovnik predaje).", explanation: "Zakašnjenje vjerovnika (mora creditoris) olakšava položaj dužnika: njegova se odgovornost sužava." },
      { id: "j2s8nu", question: "Damnum emergens i lucrum cessans", answer: "Damnum emergens – stvarna šteta, umanjenje postojeće imovine (pozitivna). Lucrum cessans – izmakla korist koja bi se po redovnom tijeku stekla (negativna).", explanation: "Kasnije razlikovanje." },
      { id: "866p38", question: "Pretpostavke naknade štete", answer: "Štetna radnja, posljedica (umanjenje imovine), protupravnost i uzročna veza (kauzalni neksus); naknada naturalnom restitucijom ili u novcu.", explanation: "Uz krivnju štetnika." },
      { id: "r3oe4a", question: "Dolus i culpa", answer: "Dolus – svjesno i namjerno nanošenje štete. Culpa – nepažnja: propuštanje dužne pažnje uz koju bi se posljedica mogla predvidjeti.", explanation: "Stupnjevi krivnje." },
      { id: "m38iut", question: "Culpa lata dolo aequiparatur", answer: "„Krajnja nepažnja izjednačuje se s namjerom.“ Culpa lata – ne ulaže se ni pažnja najprosječnijeg čovjeka.", explanation: "Npr. depozitar u postklasici." },
      { id: "lnalji", question: "Culpa levis in abstracto i in concreto", answer: "In abstracto – izostanak pažnje brižnog oca obitelji (diligens pater familias). In concreto – dužnik ne postupa kao u vlastitim stvarima.", explanation: "In concreto: ortaci, sudionici zajednice." },
      { id: "exvw1i", question: "Custodia i casus", answer: "Custodia – stroga odgovornost za čuvanje, i za slučajnu propast (krađu), ali ne za višu silu. Casus – slučaj, za koji se načelno ne odgovara; casum sentit dominus.", explanation: "Vis maior – viša sila." },
      { id: "e257hr", question: "Načelo utiliteta", answer: "Tko iz ugovora ima korist, odgovara strože: depozitar (bez koristi) samo za dolus, komodatar (ima korist) za svaku krivnju i custodia.", explanation: "Utilitetno načelo." },
      { id: "oz4qcm", question: "Stipulatio poenae (ugovorna kazna)", answer: "Novčani iznos koji se dužnik stipulacijom obvezuje platiti ako ne ispuni (uredno) činidbu; uvjetna obveza, utuživa tek nakon dospijeća glavne.", explanation: "Umjesto dokazivanja štete." },
      { id: "sd92ai", question: "Prava i neprava ugovorna kazna", answer: "Prava – ugovorene su glavna činidba i kazna, vjerovnik može utužiti obje. Neprava – ugovorena je samo kazna uvjetno, dužnik se oslobađa i glavnom činidbom (facultas alternativa).", explanation: "Paul. D. 44.7.44.5." }
    ],
    quiz: [
      { id: "l2sunn", question: "Posljedica dužnikova zakašnjenja jest:", options: ["smanjenje njegove odgovornosti na dolus", "prijelaz rizika propasti na vjerovnika", "prestanak obveze zbog nemogućnosti", "pooštrenje odgovornosti i za slučaj"], correct: 3 },
      { id: "7v45lb", question: "Posljedica vjerovnikova zakašnjenja jest da dužnik odgovara samo za:", options: ["custodia", "dolus", "culpa levis", "vis maior"], correct: 1 },
      { id: "w36055", question: "U Pomponijevu fragmentu D. 18.6.18 kupac je u zakašnjenju kao:", options: ["vjerovnik", "dužnik", "jamac", "posrednik"], correct: 0 },
      { id: "gl0p3q", question: "Za mora creditoris traži se:", options: ["krivnja vjerovnika i opomena", "dospjelost tražbine i istek roka", "opomena dužnika pred svjedocima", "neopravdano odbijanje ponuđene činidbe"], correct: 3 },
      { id: "4frgzu", question: "Izmakla dobit naziva se:", options: ["damnum emergens", "lucrum cessans", "litis aestimatio", "poena"], correct: 1 },
      { id: "xjh8et", question: "Krajnja nepažnja izjednačuje se s:", options: ["slučajem", "laganom nepažnjom", "dolusom", "višom silom"], correct: 2 },
      { id: "c5mjpg", question: "Nepažnja kakvu dužnik ne bi pokazao u vlastitim stvarima jest:", options: ["culpa lata", "culpa levis in abstracto", "culpa levis in concreto", "custodia"], correct: 2 },
      { id: "9uae2y", question: "Mjerilo za culpa levis in abstracto jest:", options: ["diligens pater familias", "prosječan čovjek", "vlastite stvari dužnika", "volja vjerovnika"], correct: 0 },
      { id: "rrbpz0", question: "Custodia znači odgovornost:", options: ["samo za dolus druge strane", "samo za krajnju nepažnju", "i za višu silu (vis maior)", "i za slučaj, ali ne za višu silu"], correct: 3 },
      { id: "ubov4j", question: "Neprava ugovorna kazna funkcionira kao:", options: ["alternativna obveza", "facultas alternativa", "solidarna obveza", "naturalna obveza"], correct: 1 },
      { id: "b8lkm2", question: "Ugovorna kazna može se tražiti:", options: ["tek nakon dospijeća glavne obveze", "odmah pri sklapanju ugovora", "samo ako je šteta dokazana", "samo kod obveza iz delikata"], correct: 0 },
      { id: "hplj8d", question: "Dužnika s kalendarskim rokom ne treba opominjati jer:", options: ["casum sentit dominus", "dies a quo non computatur in termino", "dolus non praesumitur", "dies interpellat pro homine"], correct: 3 },
      { id: "pbm8df", question: "Prestanak dužnikova zakašnjenja naknadnom ponudom i prihvatom zove se:", options: ["perpetuatio obligationis", "purgatio morae", "datio in solutum", "novatio"], correct: 1 },
      { id: "f039iq", question: "Po načelu utiliteta depozitar odgovara za:", options: ["svaku, i laganu krivnju", "custodia i dolus", "dolus i culpa lata", "višu silu i dolus"], correct: 2 },
      { id: "giwwiq", question: "Kod koje obveze nema dužnikova zakašnjenja?", options: ["kod kupoprodaje", "kod zajma", "kod naturalne obveze", "kod stipulacije"], correct: 2 },
      { id: "4uq6wz", question: "Šteta koja se nadoknađuje uspostavom prijašnjeg stanja jest:", options: ["naturalna restitucija", "novčana naknada", "litis crescentia", "poena dupli"], correct: 0 }
    ],
    fillBlanks: [],
    learn: {
      id: "ychrwv",
      title: "Posljedice neispunjenja: zakašnjenje, naknada štete, krivnja, ugovorna kazna",
      content: `<p>Ispunjenjem obveza prestaje. Ako činidba ne bude ispunjena ili ne na vrijeme, obveza može prestati ili se njezin sadržaj mijenja: umjesto glavne nastupa sekundarna činidba – kamate, ugovorna kazna ili naknada štete. Najčešći uzrok je zakašnjenje (<em>mora</em>).</p>
<h3>Mora debitoris – zakašnjenje dužnika</h3>
<ul>
<li>Nastaje kad dužnik u vrijeme dospjelosti <strong>svojom krivnjom</strong> (bez opravdanog razloga) ne ispuni obvezu; obveza mora biti valjana i utuživa (nema zakašnjenja kod naturalnih obveza).</li>
<li>Važna je opomena vjerovnika (<strong>interpellatio</strong>); ne treba je kod obveza iz delikta i obveza s kalendarskim rokom – <em>dies interpellat pro homine</em>.</li>
<li><strong>Posljedica: pooštrenje odgovornosti</strong> – <em>perpetuatio obligationis</em>: dužnik odgovara i za slučajnu propast stvari, uzima se kao da je činidba moguća. Justinijan: oslobađa se ako dokaže da bi stvar na isti način propala i kod vjerovnika. Kod poslova bonae fidei naknađuje i plodove, koristi i kamate.</li>
<li><strong>Pomp. D. 12.1.5:</strong> <em>Quod te mihi dare oporteat si id postea perierit, quam per te factum erit quominus id mihi dares, tuum fore id detrimentum constat</em> – „Ako je ono što si mi bio dužan dati propalo nakon što si ti skrivio da mi ne dadeš, nedvojbeno to ide na tvoju štetu.“</li>
<li>Prestanak: <strong>purgatio (emendatio) morae</strong> – dužnik naknadno ponudi, a vjerovnik primi ispunjenje.</li>
</ul>
<h3>Mora creditoris (accipiendi) – zakašnjenje vjerovnika</h3>
<ul>
<li>Vjerovnik <strong>bez opravdanog razloga odbije</strong> stvarno ponuđenu činidbu; ne traži se ni krivnja ni istek roka (dospjelost).</li>
<li><strong>Posljedica: smanjenje dužnikove odgovornosti</strong> – odgovara samo za <strong>dolus</strong>, ne više za culpa i custodia; nemogućnost činidbe pada na vjerovnika. Novčani dug dužnik može zapečatiti i položiti (deponirati) i tako se osloboditi i zateznih kamata.</li>
<li>Prestaje kad vjerovnik izjavi da će primiti ranije odbijenu činidbu.</li>
<li><strong>Pomp. D. 18.6.18 (17):</strong> <em>Illud sciendum est, cum moram emptor adhibere coepit, iam non culpam, sed dolum malum tantum praestandum a venditore</em> – „Treba znati da, nakon što kupac padne u zakašnjenje, prodavatelj više ne odgovara za kulpu, nego samo za dolus.“ Prodavatelj je ovdje <strong>dužnik</strong> predaje, kupac <strong>vjerovnik</strong> – riječ je o <strong>mora creditoris</strong>.</li>
</ul>
<h3>Naknada štete</h3>
<p>Ako dužnik ne ispuni činidbu, vjerovniku nastaje šteta (<em>damnum</em>): <strong>damnum emergens</strong> – stvarna, pozitivna šteta (umanjenje postojeće imovine) i <strong>lucrum cessans</strong> – izmakla korist (negativna šteta). Naknada: <strong>naturalna restitucija</strong> (uspostava prijašnjeg stanja) ili <strong>novčana naknada</strong>. Pretpostavke: štetna radnja, posljedica (umanjenje imovine), protupravnost, uzročna veza – objektivna okolnost – i subjektivna krivnja.</p>
<h3>Stupnjevi krivnje</h3>
<table>
<tr><th>Stupanj</th><th>Sadržaj</th></tr>
<tr><td><strong>dolus</strong></td><td>zla namjera – svjesno i namjerno nanošenje štete; <em>dolus non praesumitur</em></td></tr>
<tr><td><strong>culpa lata</strong></td><td>krajnja nepažnja – ne ulaže se ni pažnja najprosječnijeg čovjeka; <em>culpa lata dolo aequiparatur</em> – izjednačuje se s namjerom</td></tr>
<tr><td><strong>culpa levis in abstracto</strong></td><td>laka nepažnja – izostanak pažnje brižnog oca obitelji (<em>diligens pater familias</em>)</td></tr>
<tr><td><strong>culpa levis in concreto</strong></td><td>dužnik ne postupa kao u vlastitim stvarima (ortaci, slučajna zajednica)</td></tr>
<tr><td><strong>culpa in eligendo</strong></td><td>nemarnost pri izboru suradnika – odgovornost za rad trećih</td></tr>
<tr><td><strong>custodia</strong></td><td>stroga odgovornost za čuvanje – i za slučajnu propast (npr. krađu), ali ne za višu silu (<em>vis maior</em>)</td></tr>
<tr><td><strong>casus</strong></td><td>slučaj – načelno se ne odgovara; štetu trpi onaj u čijoj je imovini nastala (<em>casum sentit dominus</em>)</td></tr>
</table>
<p><strong>Načelo utiliteta:</strong> stupanj odgovornosti ovisi o koristi koju ugovaratelj ima od ugovora – depozitar (nema koristi) odgovara samo za dolus (u postklasici i culpa lata), komodatar (ima korist) za svaku krivnju pa i custodia. Justinijanovo pravo razvija shvaćanje da se odgovornost temelji na krivnji (<em>dolus, desidia, neglegentia, culpa lata, culpa levis in abstracto / in concreto, exactissima diligentia</em>).</p>
<h3>Ugovorna kazna – stipulatio poenae</h3>
<p>Novčani iznos (ili druga korist) koji se dužnik obvezuje platiti ako ne ispuni ili ne ispuni na vrijeme glavnu obvezu; svrha je da vjerovnik umjesto dokazivanja štete dobije unaprijed ugovoren iznos. To je <strong>uvjetna obveza</strong> (ovisi o neispunjenju) i može se tražiti tek nakon <strong>dospijeća</strong> glavne obveze.</p>
<ul>
<li><strong>Prava ugovorna kazna</strong> – stipulacijom su ugovorene dvije činidbe (glavna i kazna); vjerovnik može utužiti i jednu i drugu.</li>
<li><strong>Neprava ugovorna kazna</strong> – ugovorena je samo kazna u uvjetnom obliku; vjerovnik utužuje samo kaznu, a dužnik se može osloboditi ispunjenjem druge činidbe – funkcionira kao <strong>facultas alternativa</strong> (<em>una res in obligatione, duae in solutione</em>). Paul. D. 44.7.44.5: „ako ne dadeš zemljište, obećaješ li dati stotinu?“ – u obvezi je stotina, u ispunjenju i zemljište.</li>
</ul>`
    }
  },

  prestanakObveza: {
    id: "wstra4",
    name: "Prestanak obveza",
    icon: "fa-circle-check",
    color: "#f59e0b",
    flashcards: [
      { id: "2y225n", question: "Prestanak obveza ipso iure i ope exceptionis", answer: "Ipso iure – po civilnom pravu, samim činom (solutio, acceptilatio, novatio…). Ope exceptionis – po pretorskom pravu, tek kad se u formulu unese prigovor (pactum de non petendo, compensatio).", explanation: "Contrarius actus – obveza prestaje kako je nastala." },
      { id: "53gn0o", question: "Solutio per aes et libram", answer: "Simbolično ispunjenje vagom i bakrom pred 5 svjedoka i libripensom – gasi obveze iz nexuma, presude i legatum per damnationem.", explanation: "Contrarius actus formalnog posla." },
      { id: "sj13q9", question: "Acceptilatio", answer: "Verbalni otpust duga: dužnik pita je li vjerovnik primio, vjerovnik potvrđuje („imaginaria solutio“); bez uvjeta i roka; gasi verbalne obveze.", explanation: "Stipulatio Aquiliana pretvara druge obveze u stipulaciju radi akceptilacije." },
      { id: "au89bj", question: "Solutio", answer: "Stvarno ispunjenje dugovane činidbe s namjerom gašenja obveze; može ispuniti i treći; vjerovnik ne mora primiti djelomično ispunjenje ni nešto drugo.", explanation: "Apocha – priznanica." },
      { id: "zdzzhm", question: "Datio in solutum", answer: "Uz pristanak vjerovnika dužnik se oslobađa davanjem nečeg drugog umjesto dugovanog.", explanation: "Gasi i založno pravo." },
      { id: "obr5j3", question: "Depositio pecuniae", answer: "Kad ispunjenje nije moguće zbog vjerovnika, dužnik se oslobađa polaganjem zapečaćenog novca kod trećega, u hramu ili kod javnog tijela.", explanation: "Kod polaganja kod kuće prestaju samo kamate." },
      { id: "yb6z2n", question: "Contrarius consensus", answer: "Sporazumni raskid konsenzualnog ugovora dok nijedna strana nije počela ispunjavati (re integra); Justinijan proširuje na sve konsenzualne ugovore.", explanation: "Najprije kod kupoprodaje i zakupa." },
      { id: "gs9cij", question: "Novatio", answer: "Ugovor (novaciona stipulacija) kojim stara obveza prestaje, a nastaje nova; voluntaria ili necessaria (litiskontestacijom); simplex (isti subjekti) ili qualificata (novi subjekt).", explanation: "Justinijan traži izričit animus novandi." },
      { id: "4pokw6", question: "Litiscontestatio kao način prestanka", answer: "U formularnom postupku tražbina se litiskontestacijom konzumira i pretvara u condemnari oportere, a presudom u iudicatum facere oportere; ne smije se ponovno tužiti (bis de eadem re).", explanation: "Kod Justinijana gubi novacijski učinak." },
      { id: "xd85lv", question: "Smrt i capitis deminutio", answer: "Kontraktne obveze prelaze na nasljednike, osim strogo osobnih (adstipulator, sponsio, societas, mandatum, delikt). C. d. maxima i media gase kontraktnu obvezu – ostaje naturalna.", explanation: "Delikti ne prestaju capitis deminutio." },
      { id: "ums4pw", question: "Confusio", answer: "Dug i tražbina sjedine se u istoj osobi (npr. dužnik naslijedi vjerovnika) – obveza prestaje ipso iure.", explanation: "Nestaje dvojnost subjekata." },
      { id: "fjwrc6", question: "Concursus causarum", answer: "Vjerovnik species stekne iz druge osnove od trećega; po starijem pravu obveza prestaje; kod Justinijana samo ako su obje osnove besplatne.", explanation: "Concursus duarum causarum lucrativarum." },
      { id: "y6w4lb", question: "Nemogućnost ispunjenja", answer: "Naknadna, objektivna i trajna nemogućnost bez krivnje dužnika gasi obvezu (propast species, stvar postane extra commercium); skrivljena – nastaje obveza naknade štete.", explanation: "Species perit ei cui debetur." },
      { id: "y12uf6", question: "Pactum de non petendo", answer: "Neformalni sporazum o oprostu duga (in perpetuum) ili odgodi (in tempus); civilno gasi samo deliktne obveze, inače djeluje kao exceptio pacti de non petendo.", explanation: "Ope exceptionis." },
      { id: "vj86g5", question: "Compensatio", answer: "Prijeboj uzajamnih tražbina; u klasici kod poslova bonae fidei iz istog odnosa, kod bankara (argentarius) i bonorum emptora; kod Justinijana ipso iure kod svih tužbi.", explanation: "Ostaje samo razlika." },
      { id: "2wfcgp", question: "Restitutio in integrum", answer: "Pretor uklanja učinke civilno valjane obveze uspostavom prijašnjeg stanja – zbog maloljetnosti (ob aetatem), odsutnosti, prijevare ili straha.", explanation: "Ope exceptionis / pretorsko sredstvo." }
    ],
    quiz: [
      { id: "sllrzz", question: "Otpust duga u obliku pitanja i odgovora zove se:", options: ["solutio", "compensatio", "novatio", "acceptilatio"], correct: 3 },
      { id: "kqmw6h", question: "Acceptilatio se u izvorima naziva i:", options: ["datio in solutum", "imaginaria solutio", "contrarius consensus", "depositio"], correct: 1 },
      { id: "cu78x5", question: "Uz akceptilaciju se mogao staviti:", options: ["ni uvjet ni rok", "rok, ali ne uvjet", "uvjet, ali ne rok", "i uvjet i rok"], correct: 0 },
      { id: "h8qxqx", question: "Davanje nečeg drugog umjesto dugovanog uz pristanak vjerovnika jest:", options: ["confusio", "depositio pecuniae", "novatio", "datio in solutum"], correct: 3 },
      { id: "xpedfx", question: "Kad dužnik naslijedi vjerovnika, obveza prestaje:", options: ["kompenzacijom", "konfuzijom", "novacijom", "pactum de non petendo"], correct: 1 },
      { id: "gno1u6", question: "Novacija u toku procesa (litiskontestacijom) jest:", options: ["novatio voluntaria", "novatio qualificata", "novatio necessaria", "delegatio"], correct: 2 },
      { id: "yap3yp", question: "Pactum de non petendo djeluje u pravilu:", options: ["ipso iure kod svih obveza", "samo kod nexuma", "ope exceptionis", "samo kod legata"], correct: 2 },
      { id: "9uevcl", question: "Kompenzacija je kod Justinijana:", options: ["ipso iure kod svih tužbi", "moguća samo kod bankara", "zabranjena", "samo kod stricti iuris poslova"], correct: 0 },
      { id: "9p1fic", question: "Solutio per aes et libram služila je za gašenje obveza iz:", options: ["kupoprodaje, zakupa i drugih konsenzualnih", "ortakluka i naloga među ortacima", "ostave, posudbe i ugovora o zalogu", "nexuma, presude i legata per damnationem"], correct: 3 },
      { id: "f5agps", question: "Contrarius consensus moguć je:", options: ["kod svih kontrakata, uvijek i bez uvjeta", "kod konsenzualnih dok su re integra", "samo kod stipulacije i nexuma", "samo kod obveza iz delikata"], correct: 1 },
      { id: "pda3cv", question: "Priznanica o namirenju duga zove se:", options: ["apocha", "chirographum", "cautio", "syngrapha"], correct: 0 },
      { id: "dpildh", question: "Koje obveze ne prestaju capitis deminutio?", options: ["kontraktne", "naturalne", "sve prestaju", "deliktne"], correct: 3 },
      { id: "gv90pd", question: "Smrću stranke ne prestaje obveza iz:", options: ["mandatuma", "kupoprodaje", "societasa", "adstipulacije"], correct: 1 },
      { id: "la2ka0", question: "Restitutio in integrum ob aetatem daje se:", options: ["robovima", "odsutnima", "maloljetnicima", "pretorima"], correct: 2 },
      { id: "ylh399", question: "Dužnik se ne može osloboditi:", options: ["ispunjenjem trećega u njegovo ime", "polaganjem novca kod vjerovnikova odbijanja", "djelomičnim ispunjenjem bez pristanka", "davanjem drugoga uz pristanak vjerovnika"], correct: 2 },
      { id: "hm0odd", question: "Ako vjerovnik species stekne od trećega iz besplatne osnove, a dužnik je duguje iz besplatne, kod Justinijana:", options: ["obveza prestaje", "dužnik plaća vrijednost", "dužnik plaća dvostruko", "obveza postaje naturalna"], correct: 0 }
    ],
    fillBlanks: [],
    learn: {
      id: "c77seu",
      title: "Prestanak obveza",
      content: `<h3>Prestanak ipso iure (po civilnom pravu)</h3>
<p>Izvorno obveza prestaje na isti način na koji je nastala – suprotnim aktom (<em>contrarius actus</em>).</p>
<ul>
<li><strong>Solutio per aes et libram</strong> – za obveze iz <em>nexuma</em>, presude (<em>ex causa iudicati</em>) i <em>legatum per damnationem</em>: pred vjerovnikom, 5 svjedoka i libripensom dužnik izgovara formulu da vagom plaća i time se oslobađa, udari novčićem o vagu i preda ga vjerovniku – simbolično ispunjenje.</li>
<li><strong>Acceptilatio</strong> – dužnik pita vjerovnika je li primio što mu je obećano, vjerovnik potvrđuje; nema stvarnog plaćanja – <em>imaginaria solutio</em> (oprost duga) za verbalne obveze. Ne može se dodati uvjet ni rok; djeluje prema svim vjerovnicima. <em>Stipulatio Aquiliana</em> pretvara druge obveze u stipulaciju da bi se ugasile akceptilacijom.</li>
<li><strong>Solutio</strong> – neformalno stvarno ispunjenje s namjerom gašenja obveze, bez obzira kako je obveza nastala. Može ispuniti i treći (ako činidba nije strogo osobna), čak bez znanja i protiv volje dužnika; ispunjava se vjerovniku ili ugovorenom primatelju (<em>solutionis causa adiectus</em>). Vjerovnik ne mora primiti djelomično ispunjenje ni nešto drugo. Kod više istovrsnih dugova: određuje dužnik, inače vjerovnik; inače najprije kamate pa glavnica, najprije teži pa stariji dugovi. <strong>Datio in solutum</strong> – nešto drugo uz pristanak vjerovnika. <strong>Depositio pecuniae</strong> – zbog razloga na strani vjerovnika polaganje zapečaćenog novca kod trećega, u hramu ili kod javnog tijela (polaganjem kod kuće prestaju samo kamate). <strong>Apocha</strong> – pisana priznanica.</li>
<li><strong>Contrarius consensus</strong> – sporazumni raskid kupoprodaje (pa zakupa) dok nijedna strana nije počela ispunjavati (<em>re integra</em>); Justinijan proširuje na societas i mandatum.</li>
<li><strong>Novatio</strong> – stara obveza prestaje, a nastaje nova (novaciona stipulacija): <em>voluntaria</em> (voljom stranaka) i <em>necessaria</em> (u postupku – litiskontestacijom); <em>simplex</em> (inter easdem personas – mijenja se osnova) i <em>qualificata</em> (inter novas personas – delegacija: aktivna – promjena vjerovnika, pasivna – promjena dužnika). Ako uz izmjenu nastane nova obveza, novacija se predmnijeva; Justinijan traži izričit <em>animus novandi</em>.</li>
<li><strong>Litiscontestatio</strong> – u formularnom postupku završetkom faze in iure vjerovnikova tražbina se konzumira i pretvara u obvezu <em>condemnari oportere</em>, a presudom u <em>iudicatum facere oportere</em>; ne smije se ponovno tužiti (<em>ne bis in idem; bis de eadem re agere non licet</em>). Kod Justinijana gubi taj učinak.</li>
<li><strong>Smrt</strong> – kontraktne obveze načelno prelaze na nasljednike; prestaju: tražbine adstipulatora, <em>actiones vindictam spirantes</em>, obveze iz sponsio i fidepromissio, penalne tužbe pasivno, tužbe iz societas i mandatum; nasljednik delinkventa odgovara samo za stečenu korist.</li>
<li><strong>Capitis deminutio</strong> – maxima i media gase kontraktnu obvezu (ostaje obligatio naturalis); deliktne ne prestaju.</li>
<li><strong>Confusio</strong> – dug i tražbina sjedine se u istoj osobi (dužnik naslijedi vjerovnika).</li>
<li><strong>Concursus causarum</strong> – vjerovnik species stekne po drugoj osnovi od trećega; po starijem pravu prestanak (ista stvar ne stječe se dvaput); Justinijan – samo ako su obje osnove besplatne (<em>concursus duarum causarum lucrativarum</em>), inače ostaje naknada vrijednosti.</li>
<li><strong>Nemogućnost ispunjenja</strong> – naknadna, objektivna i trajna, bez krivnje dužnika: propast species, stvar postane extra commercium, objektivna nemogućnost facere (npr. invalidnost). Ako je skrivljena – sekundarna obveza naknade štete.</li>
<li>Ostalo: pakt (kod delikata), otkaz, istek roka, ispunjenje ili izjalovljenje uvjeta.</li>
</ul>
<h3>Prestanak ope exceptionis (po pretorskom pravu)</h3>
<p>Obveza gubi učinak tek kad se na zahtjev tuženog u formulu uvrsti prigovor:</p>
<ul>
<li><strong>Pactum de non petendo</strong> – neformalni sporazum o oprostu (usmeno, pismeno, i konkludentno – vraćanjem zadužnice); <em>in perpetuum</em> (trajno) ili <em>in tempus</em> (odgoda). Civilno gasi samo deliktne obveze; kod kontraktnih pretor daje <em>exceptio pacti de non petendo</em>.</li>
<li><strong>Compensatio</strong> – prijeboj uzajamnih tražbina; manja prestaje, od veće ostaje razlika. U klasici kod poslova bonae fidei iz istog odnosa (ne stricti iuris); <strong>bankar</strong> (<em>argentarius</em>) mora prije tužbe obračunati dospjele istovrsne tražbine; <strong>bonorum emptor</strong> mora dopustiti odbitak. Justinijan: kod svih tužbi i <strong>ipso iure</strong>.</li>
<li><strong>Restitutio in integrum</strong> – pretor oduzima učinak civilno valjanoj obvezi uspostavom prijašnjeg stanja: zbog neiskustva maloljetnika (<em>ob aetatem</em>), odsutnosti (<em>ob absentiam</em>), prijevare i straha (<em>ob dolum, ob metum</em>).</li>
</ul>`
    }
  },

  verbalniLiteralni: {
    id: "6ovw1d",
    name: "Kontrakti – sustav; verbalni i literalni kontrakti",
    icon: "fa-comments",
    color: "#10b981",
    flashcards: [
      { id: "z3733u", question: "Podjela kontrakata po načinu nastanka", answer: "Realni (consensus + re), verbalni (consensus + verbis), literalni (consensus + litteris), konsenzualni (samo consensus); inominatni (consensus + ispunjena činidba jedne strane).", explanation: "Za sve kontrakte potreban je konsenzus." },
      { id: "0djf42", question: "Ex nudo pacto obligatio non nascitur", answer: "„Iz golog sporazuma ne nastaje obveza“ – za utuživu civilnu obvezu sporazum mora biti zaodjenut u priznatu formu; iznimke se postupno priznaju.", explanation: "Konsenzualni kontrakti, pacta vestita." },
      { id: "tcr52m", question: "Ex nuda pollicitatione nulla actio nascitur", answer: "„Iz gole ponude ne nastaje tužba“ – ugovor nastaje sukladnim prihvatom ponude; ograničeni prihvat je nova ponuda.", explanation: "Ponuda + prihvat = consensus." },
      { id: "sf093w", question: "Nexum", answer: "Starinski verbalni ugovor o zajmu per aes et libram (5 svjedoka, libripens): dužnik je jamčio osobno – pri neispunjenju padao je pod vlast vjerovnika (manus iniectio, nexi).", explanation: "Ukinut Lex Poetelia Papiria 326. pr. Kr." },
      { id: "yh7195", question: "Lex Poetelia Papiria de nexis (326. pr. Kr.)", answer: "Oslobodila je dužnike iz nexuma (uz prisegu da će dug vratiti imovinom), zabranila sklapanje nexuma i osobnu ovrhu nad tim dužnicima.", explanation: "Ublažavanje položaja dužnika." },
      { id: "hz5j26", question: "Vadiatura i praediatura", answer: "Verbalni jamstveni ugovori starog prava: vades jamče da će tuženi doći na raspravu; praedes jamče državi (zakup poreza, javni radovi) i u legisactio sacramento.", explanation: "Vadiaturu zamjenjuje vadimonium." },
      { id: "jjwlzn", question: "Po čemu se dotis dictio razlikuje od stipulacije?", answer: "Nastaje jednostranom svečanom izjavom obećavatelja, bez pitanja vjerovnika i podudarnog odgovora kao kod stipulacije.", explanation: "Ukinuo Justinijan." },
      { id: "b0qyr9", question: "Iurata promissio liberti", answer: "Prisegom potvrđeno obećanje oslobođenika da će bivšem gospodaru (patronu) činiti usluge; obvezuje tek ako je prisega ponovljena nakon manumisije.", explanation: "Patron ima iudicium operarum." },
      { id: "229mh9", question: "Stipulatio", answer: "Najvažniji verbalni kontrakt: svečano pitanje vjerovnika i sukladan odgovor dužnika („Spondesne mihi centum dare? Spondeo!“); formalistički, apstraktni, stricti iuris, jednostrano obvezujući.", explanation: "Stipulator (reus stipulandi), promissor (reus promittendi)." },
      { id: "efzu7s", question: "Razvoj stipulacije", answer: "Isprva sponsio samo za Rimljane, zatim i drugi glagoli (ius gentium); car Leon (472.) – bilo kojim riječima; Justinijan – dovoljan i znak; isprava (cautio) najprije dokazna, zatim gotovo dispozitivna.", explanation: "Stipulacija nema svjedoka – zato isprava." },
      { id: "l9y0az", question: "Exceptio non numeratae pecuniae i querella", answer: "Protiv stipulacije o neisplaćenom zajmu: exceptio doli (dužnik dokazuje); od 3. st. exceptio i querella non numeratae pecuniae – teret dokaza na vjerovniku; rok querelle 1, kod Justinijana 2 godine.", explanation: "Slabljenje apstraktnosti." },
      { id: "0p3b23", question: "Ništave stipulacije", answer: "Stipulacija koja se odnosi na vrijeme poslije smrti stranke, obećanje da će treći nešto učiniti i obećanje u korist trećega.", explanation: "Pomoć: adstipulator." },
      { id: "5abbem", question: "Tužbe iz stipulacije", answer: "Condictio certae creditae pecuniae (novac), condictio certae rei (određena stvar; kod Justinijana triticaria) i actio incerti ex stipulatu (neodređeni sadržaj).", explanation: "Stricti iuris." },
      { id: "76ivzz", question: "Literalni kontrakti", answer: "Formalistički, apstraktni ugovori stricti iuris koji nastaju pisanjem (ad sollemnitatem): nomen transscripticium (expensilatio), chirographum, syngrapha.", explanation: "Tužba: condictio certae creditae pecuniae." },
      { id: "i1n48u", question: "Nomen transscripticium (expensilatio)", answer: "Obveza nastaje upisom u vjerovnikovu blagajničku knjigu (codex accepti et expensi): transscriptio a re in personam (nova osnova) ili a persona in personam (novi dužnik).", explanation: "Nomina arcaria imaju samo dokazni karakter." },
      { id: "1ch9xp", question: "Chirographum i syngrapha", answer: "Literalni ugovori peregrina: chirographum – isprava u 1. licu koju potpisuje dužnik; syngrapha – zapisnik u 3. licu koji potpisuju obje stranke, dispozitivnog karaktera.", explanation: "Orijentalno podrijetlo." }
    ],
    quiz: [
      { id: "hm3yep", question: "Nexum je pravni posao per aes et libram?", options: ["netočno", "točno, provodio se slično in iure cessiji", "netočno, nexum je realni kontrakt", "točno, provodio se slično mancipaciji"], correct: 3 },
      { id: "tmtfqe", question: "Nexum je ukinuo zakon:", options: ["Lex Aquilia o šteti", "Lex Poetelia Papiria", "Lex Cincia o darovanju", "Lex Plaetoria o maloljetnicima"], correct: 1 },
      { id: "umy5xr", question: "Stipulacija nastaje:", options: ["pitanjem i sukladnim odgovorom", "upisom u vjerovnikovu knjigu", "predajom stvari uz svjedoke", "golim neformalnim sporazumom stranaka"], correct: 0 },
      { id: "hcvdyk", question: "Stipulacija je:", options: ["kauzalna i bonae fidei", "konsenzualna i stricti iuris", "realna i bonae fidei", "apstraktna i stricti iuris"], correct: 3 },
      { id: "prxnel", question: "Querella non numeratae pecuniae kod Justinijana podiže se u roku od:", options: ["1 godine", "2 godine", "5 godina", "30 dana"], correct: 1 },
      { id: "su2i6r", question: "Kod querella non numeratae pecuniae teret dokaza je na:", options: ["dužniku", "svjedocima", "vjerovniku", "pretoru"], correct: 2 },
      { id: "xbr75t", question: "Svečano jednostrano obećanje miraza je:", options: ["vadiatura", "iurata promissio liberti", "dotis dictio", "pollicitatio"], correct: 2 },
      { id: "h37j87", question: "Literalni kontrakt koji nastaje upisom u vjerovnikovu blagajničku knjigu je:", options: ["nomen transscripticium", "syngrapha (isprava)", "chirographum (isprava)", "stipulatio (usmeni ugovor)"], correct: 0 },
      { id: "t87f2b", question: "Isprava u 3. licu koju potpisuju obje stranke jest:", options: ["chirographum", "testatio", "apocha", "syngrapha"], correct: 3 },
      { id: "f30t5c", question: "Tužba iz stipulacije novčanog iznosa jest:", options: ["actio empti (tužba iz kupnje)", "condictio certae creditae pecuniae", "actio depositi directa (tužba iz pologa)", "actio pro socio (iz ortakluka)"], correct: 1 },
      { id: "8lym3h", question: "Ništava je stipulacija kojom:", options: ["se obećava činidba poslije smrti stranke", "se obećava iznos od stotinu sestercija", "se obećava prijenos italskog zemljišta", "se ugovaraju kamate na zajam putem stipulacije"], correct: 0 },
      { id: "wf0wgp", question: "„Ex nudo pacto obligatio non nascitur“ znači:", options: ["kontrakt nastaje samo predajom stvari", "svaki sporazum obvezuje stranke", "pakti se moraju uvijek poštovati", "iz golog sporazuma ne nastaje obveza"], correct: 3 },
      { id: "kaezcn", question: "Vadiatura je služila za jamstvo da će:", options: ["dužnik vratiti zajam", "tuženi doći na raspravu", "zakupnik platiti porez", "oslobođenik raditi"], correct: 1 },
      { id: "eea5s8", question: "Iurata promissio liberti obvezuje:", options: ["čim je dana, još prije manumisije", "samo uz pristanak pretora i patrona", "ako se prisega ponovi nakon oslobođenja", "samo nasljednike oslobođenika"], correct: 2 },
      { id: "qtvt36", question: "Upisi u knjigu koji samo dokazuju isplatu po drugom poslu zovu se:", options: ["nomina transscripticia", "syngraphae", "nomina arcaria", "stipulationes"], correct: 2 },
      { id: "c61nwk", question: "Ugovor nastaje sporazumom ponude i prihvata; gola ponuda:", options: ["ne rađa tužbu", "uvijek obvezuje", "obvezuje 100 dana", "obvezuje samo trgovce"], correct: 0 }
    ],
    fillBlanks: [],
    learn: {
      id: "nszjps",
      title: "Sustav kontrakata; verbalni i literalni kontrakti",
      content: `<h3>Kontrakti – sustav</h3>
<p>Najvažniji izvor obveza su obvezni ugovori – dvostrani pravni poslovi upravljeni na osnivanje obveze. Sporazum nastaje ponudom i prihvatom (<em>pollicitatio</em> + prihvat); <em>ex nuda pollicitatione nulla actio nascitur</em> – gola ponuda ne rađa tužbu; ograničen prihvat je nova ponuda. <strong>Konsenzus mora imati svaki ugovor, ali za većinu nije dovoljan</strong>: po rimskom pravu sporazum mora biti zaodjenut u priznatu formu – <em>ex nudo pacto obligatio non nascitur</em> („iz golog sporazuma ne nastaje obveza“).</p>
<table>
<tr><th>Skupina</th><th>Formula nastanka</th><th>Kontrakti</th></tr>
<tr><td>realni</td><td>consensus + <strong>re</strong> (predaja)</td><td>mutuum, (fiducia), depositum, commodatum, contractus pigneraticius</td></tr>
<tr><td>verbalni</td><td>consensus + <strong>verbis</strong></td><td>nexum, vadiatura, praediatura, dotis dictio, iurata promissio liberti, stipulatio</td></tr>
<tr><td>literalni</td><td>consensus + <strong>litteris</strong></td><td>nomen transscripticium (expensilatio), chirographum, syngrapha</td></tr>
<tr><td>konsenzualni</td><td>consensus + 0</td><td>emptio venditio, locatio conductio, societas, mandatum</td></tr>
<tr><td>inominatni</td><td>consensus + činidba jedne strane</td><td>permutatio, aestimatum, transactio, precarium, datio ad experiundum</td></tr>
</table>
<p>Verbalni i literalni su formalni (stariji), realni i konsenzualni neformalni. Za svaki ugovor uči se: pojam, skupina, obveze stranaka (unilateralis / bilateralis aequalis / inaequalis), stricti iuris ili bonae fidei, essentialia negotii, odgovornost (načelo utiliteta), tužbe.</p>

<h3>Verbalni kontrakti</h3>
<p>Nastaju izgovaranjem određenih riječi; formalizam i apstraktnost – obvezuju i kad se ekonomski cilj ne ostvari. Tri skupine:</p>
<h4>a) Staro civilno pravo</h4>
<ul>
<li><strong>Nexum</strong> – starinski ugovor o zajmu u obliku <em>gesta per aes et libram</em> (kao mancipacija: 5 svjedoka, libripens, formula). Vjerovnik predaje novac ili zamjenjive stvari, dužnik se obvezuje vratiti u roku i jamči radnom snagom; neispunjenje – <em>manus iniectio</em>, dugovinsko ropstvo (posebna skupina <em>nexi</em>). <strong>Lex Poetelia Papiria de nexis (326. pr. Kr.)</strong> oslobađa dužnike iz nexuma (ako prisegnu da će dug vratiti imovinom), zabranjuje nexum i osobnu ovrhu.</li>
<li><strong>Vadiatura</strong> – jamstvo (vas, vades) pitanjem i odgovorom da će tuženi doći na iduću raspravu in iure; brzo nestaje, zamjenjuje je <em>vadimonium</em> (tuženi sam stipulacijom obećava doći).</li>
<li><strong>Praediatura</strong> – praedes jamče za tuđu činidbu, najčešće državi (zakup poreza, javni radovi – državi primarno odgovaraju praedes, ne zakupac <em>manceps</em>) i u legisactio sacramento (iznos oklade 50 ili 500 asa).</li>
</ul>
<h4>b) Klasično pravo</h4>
<ul>
<li><strong>Dotis dictio</strong> – svečano jednostrano obećanje miraza budućem zetu (otac, srodnik po ocu, sama nevjesta ili njezin dužnik, ne srodnik po majci); i pri zarukama. Justinijan ukida; već Teodozije i Valentinijan čine utuživim neformalno obećanje (<em>pollicitatio dotis</em>).</li>
<li><strong>Iurata promissio liberti</strong> – prisegom potvrđeno obećanje oslobođenika da će bivšem gospodaru činiti usluge ili davanja; prije manumisije obvezuje samo moralno, pravno tek ako se prisega ponovi nakon oslobođenja; patron ima <em>iudicium operarum</em>, a pretor štiti oslobođenika od pretjeranih zahtjeva prigovorom.</li>
</ul>
<h4>c) Stipulatio</h4>
<ul>
<li>Najvažniji verbalni kontrakt (od XII ploča do Justinijana): svečano pitanje budućeg vjerovnika i sukladan odgovor dužnika – <em>Spondesne mihi centum dare? Spondeo!</em> („Obećaješ li mi dati sto? Obećajem!“). Prvotni naziv <strong>sponsio</strong> (samo za Rimljane); kasnije i drugi glagoli – dostupna peregrinima (ius gentium).</li>
<li>Stranke: <strong>stipulator</strong> (reus stipulandi – vjerovnik), <strong>promissor</strong> (reus promittendi – dužnik); obje moraju biti prisutne. Strogi formalistički, <strong>apstraktni</strong> posao (iz oblika se ne vidi causa – plaćanje cijene, darovanje, miraz…), <strong>stricti iuris</strong>, <strong>jednostrano obvezujući</strong>; sadržaj dare ili facere – „koliko predmeta, toliko stipulacija“.</li>
<li>Car Leon (472.): dovoljne su bilo koje riječi koje izražavaju volju; Justinijan: dovoljno i kimanje glavom. Bez svjedoka – opasnost prijevare, pa se u klasici sastavlja isprava (<em>cautio</em>) najprije dokazna, kasnije praktično dispozitivna.</li>
<li><strong>Zaštita dužnika</strong> kad causa ne postoji (npr. obećao vratiti zajam koji nije primio): <em>exceptio doli</em> (tuženi dokazuje nepostojanje kauze – teško); od 3. st. (Karakala) <em>exceptio non numeratae pecuniae</em> i <strong>querella non numeratae pecuniae</strong> – dužnik sam pokreće postupak, a <strong>teret dokaza je na vjerovniku</strong>; rok najprije 1 godina, Dioklecijan 5, Justinijan 2 godine. Kod Justinijana stipulacija je ništava ako causa ne postoji ili je nedopuštena.</li>
<li><strong>Ništave</strong> su stipulacije o vremenu nakon smrti stranke (<em>post mortem meam dari spondes?</em>), obećanje činidbe trećega i obećanje u korist trećega; treći kao <strong>adstipulator</strong> može identičnom stipulacijom primiti obećanje u korist vjerovnika.</li>
<li><strong>Tužbe</strong>: <em>condictio certae creditae pecuniae</em> (novac), <em>condictio certae rei</em> (određena stvar; kod Justinijana <em>triticaria</em>), <em>actio incerti ex stipulatu</em> (neodređen sadržaj). Stipulacijom se ugovarala i ugovorna kazna (<em>stipulatio poenae</em>); pretori su stipulacijama tjerali stranke na činidbe (<em>stipulationes praetoriae</em>).</li>
</ul>
<h3>Literalni kontrakti</h3>
<p>Formalistički i načelno apstraktni, <strong>stricti iuris</strong>; obveza nastaje pisanjem (<em>ad sollemnitatem</em>). Tužba: <em>condictio certae creditae pecuniae</em>.</p>
<ul>
<li><strong>Nomen transscripticium (expensilatio)</strong> – upis u vjerovnikovu blagajničku knjigu izdatka u korist dužnika (<em>obligatus</em>); rano nestaje. <em>Transscriptio a re in personam</em> – postojeća tražbina upiše se kao primljena pa kao izdana istom dužniku bez osnove – mijenja se osnova (novatio simplex); <em>transscriptio a persona in personam</em> – mijenja se dužnik (novatio qualificata). <strong>Nomina arcaria</strong> – upisi stvarnih isplata iz drugog posla, imaju samo dokazni karakter.</li>
<li><strong>Chirographum</strong> – peregrinski: isprava u <strong>1. licu</strong> koju izdaje i potpisuje dužnik.</li>
<li><strong>Syngrapha</strong> – peregrinski: zapisnik u <strong>3. licu</strong> koji potpisuju obje stranke, svaka zadržava primjerak; apstraktna obveza, dispozitivan karakter.</li>
</ul>`
    }
  },

  realniKontrakti: {
    id: "ud1qeg",
    name: "Realni kontrakti",
    icon: "fa-handshake",
    color: "#ef4444",
    flashcards: [
      { id: "r5vw7c", question: "Realni kontrakti – obilježja", answer: "Nastaju predajom stvari (re) uz sporazum; kauzalni, iz ius gentium, bonae fidei (osim mutuuma). Predaja prenosi vlasništvo (mutuum), posjed (zalog) ili detenciju (ostava, posudba).", explanation: "Stvar se daje contrahendi causa." },
      { id: "570y0n", question: "Mutuum (zajam)", answer: "Zajmodavac prenosi zajmoprimcu vlasništvo novca ili drugih zamjenjivih (potrošnih) stvari, a zajmoprimac se obvezuje vratiti istu količinu iste vrste i kakvoće.", explanation: "Contractus unilateralis, stricti iuris, besplatan." },
      { id: "3yzgz2", question: "Kamate kod zajma", answer: "Zajam je besplatan; kamate se ugovaraju posebnom stipulacijom (stipulatio usurarum) – neformalni pactum usurarum nije utuživ.", explanation: "Mutuum je stricti iuris." },
      { id: "2n1mr9", question: "Tužbe iz zajma", answer: "Condictio (actio) certae creditae pecuniae za novac i condictio certae rei za druge zamjenjive stvari.", explanation: "Stroge tužbe." },
      { id: "rh9ykv", question: "Casum sentit dominus", answer: "„Vlasnik snosi slučaj“ – kod zajma zajmoprimac postaje vlasnik, pa i nakon slučajne propasti (pa i višom silom) ostaje obvezan vratiti; prije predaje rizik je na zajmodavcu.", explanation: "Uz genus perire non censetur." },
      { id: "30eyk0", question: "SC Macedonianum", answer: "Senatusconsultum (Vespazijan, 1. st.) zabranjuje davanje zajma sinu u vlasti bez očeva odobrenja; posao civilno vrijedi, ali se vjerovnik odbija prigovorom ili uskratom tužbe.", explanation: "Plaćeno se ne vraća." },
      { id: "d8j1gr", question: "Fenus nauticum (pecunia traiecticia)", answer: "Pomorski zajam: zajmoprimac vraća samo ako roba ili novac sretno stigne na odredište (rizik na zajmodavcu); dopuštene visoke kamate.", explanation: "Grčko podrijetlo; suspenzivni uvjet." },
      { id: "ao1ay9", question: "Depositum (ostava)", answer: "Deponent predaje depozitaru pokretnu stvar na besplatno čuvanje, a depozitar je vraća na zahtjev; depozitar je samo detentor i ne smije stvar upotrebljavati (furtum usus).", explanation: "Bilateralis inaequalis, bonae fidei." },
      { id: "9ewm58", question: "Odgovornost kod ostave", answer: "Depozitar (bez koristi) odgovara samo za dolus, u postklasici i za culpa lata; deponent odgovara za svaku krivnju i naknađuje troškove i štetu.", explanation: "Načelo utiliteta." },
      { id: "32kjup", question: "Tužbe iz ostave", answer: "Actio depositi directa (deponent; osuda povlači infamiju) i actio depositi contraria (depozitar za troškove) – zato je bilateralis inaequalis.", explanation: "Isprva actio in factum." },
      { id: "31ty5l", question: "Posebne vrste ostave", answer: "Depositum irregulare (novac, potrošne stvari – vraća se ista količina, kao zajam), depositum miserabile (u nevolji – tužba in duplum) i depositum in sequestrem (sekvestar posjeduje).", explanation: "Sekvestar ima posjedovnu zaštitu." },
      { id: "7ufc45", question: "Commodatum (posudba)", answer: "Komodant predaje komodataru nepotrošnu stvar na besplatnu uporabu, a komodatar je vraća nakon roka ili uporabe; komodatar je detentor.", explanation: "Bilateralis inaequalis, bonae fidei." },
      { id: "esh47s", question: "Commodatum ad pompam vel ostentationem", answer: "Iznimno se može posuditi i potrošna stvar ako se daje samo radi pokazivanja (Paul. D. 13.6.3.6) – npr. čokoladna skulptura za izložbu.", explanation: "Ne smije se potrošiti." },
      { id: "sxkgmo", question: "Odgovornost kod posudbe", answer: "Komodatar (ima korist) odgovara za svaku krivnju i custodia, ne za višu silu; snosi redovne troškove. Komodant odgovara samo za dolus (postklasika i culpa lata) i izvanredne troškove.", explanation: "Actio commodati directa i contraria." },
      { id: "mvwzkk", question: "Contractus pigneraticius", answer: "Založni dužnik (zalogodavac) predaje založnom vjerovniku (zalogoprimcu) stvar u posjed radi osiguranja tražbine; vjerovnik je vraća kad založno pravo prestane.", explanation: "Bilateralis inaequalis, bonae fidei." },
      { id: "mcko9y", question: "Odgovornost i tužbe kod ugovora o zalogu", answer: "Zalogoprimac odgovara za dolus, culpa i custodia; zalogodavac za štetu i troškove. Actio pigneraticia directa (zalogodavac – povrat, superfluum) i contraria (zalogoprimac).", explanation: "Isprva actio in factum." },
      { id: "u16qaw", question: "Koji realni kontrakt prenosi vlasništvo, a koji posjed?", answer: "Mutuum prenosi vlasništvo; contractus pigneraticius posjed; depositum i commodatum samo detenciju (sekvestar iznimno posjed).", explanation: "Razlika u predmetu prijenosa pokazuje svrhu kontrakta: zajam troši stvar, a posudba i polog samo povjeravaju držanje." }
    ],
    quiz: [
      { id: "sac6zl", question: "Koji je realni kontrakt jednostrano obvezujući?", options: ["depositum", "commodatum", "contractus pigneraticius", "mutuum"], correct: 3 },
      { id: "6hylo8", question: "Mutuum je jedini realni kontrakt koji je:", options: ["bonae fidei", "stricti iuris", "naplatan", "nepotpuno dvostran"], correct: 1 },
      { id: "18k0cn", question: "Zajmoprimac kojem viša sila nakon predaje uništi primljeno žito:", options: ["ostaje u obvezi", "oslobađa se obveze", "plaća samo kamate", "vraća polovicu"], correct: 0 },
      { id: "k7uz4y", question: "Ako stvar propadne prije predaje zajmoprimcu:", options: ["zajmoprimac je ipak dužan vratiti", "rizik snosi pretor", "zajmoprimac plaća kamate", "ugovor o zajmu nije ni nastao"], correct: 3 },
      { id: "rmbf73", question: "SC Macedonianum zabranjuje:", options: ["intercesiju žena za tuđe dugove", "zajam sinu u vlasti bez očeva odobrenja", "kamate iznad dvanaest posto godišnje", "pomorski zajam bez ugovorenih kamata"], correct: 1 },
      { id: "sfnyzf", question: "Depozitar po klasičnom pravu odgovara za:", options: ["svaku krivnju", "custodia", "dolus", "višu silu"], correct: 2 },
      { id: "hvyafe", question: "Što je zajedničko depositumu i commodatumu?", options: ["prenosi se vlasništvo", "naplatni su", "prenosi se samo detencija", "stricti iuris su"], correct: 2 },
      { id: "z3phl6", question: "Komodant odgovara samo za dolus?", options: ["da – po načelu utiliteta", "ne, za svaku krivnju", "ne, za custodia", "ne odgovara uopće"], correct: 0 },
      { id: "t89sm8", question: "Potrošna stvar može se posuditi:", options: ["nikada ni pod kojim uvjetom", "samo u obliku nepravog zajma", "uz plaćanje ugovorenih kamata", "samo radi pokazivanja (ad pompam)"], correct: 3 },
      { id: "wxx9iy", question: "Koji od navedenih nije jednostrano obvezujući pravni posao?", options: ["zajam", "posudba", "stipulacija", "dotis dictio"], correct: 1 },
      { id: "nbzk14", question: "Kod depositum irregulare primjenjuju se pravila:", options: ["zajma", "posudbe", "zaloga", "zakupa"], correct: 0 },
      { id: "e4qn95", question: "Ostava kod slučajne osobe zbog nesreće (požar, brodolom) jest:", options: ["depositum irregulare", "commodatum", "depositum in sequestrem", "depositum miserabile"], correct: 3 },
      { id: "yerp6b", question: "Tko u ugovoru o zalogu daje stvar kao osiguranje?", options: ["zajmodavac (vjerovnik iz zajma)", "založni dužnik – zalogodavac", "zalogoprimac (založni vjerovnik)", "sekvestar kao treća osoba"], correct: 1 },
      { id: "2nbqv7", question: "Debitor u obveznom odnosu iz ugovora o zalogu (dužnik povrata stvari) jest:", options: ["zalogodavac", "zajmoprimac", "zalogoprimac", "jamac"], correct: 2 },
      { id: "736ngd", question: "Ugovor o zalogu prenosi:", options: ["vlasništvo", "samo detenciju", "posjed", "služnost"], correct: 2 },
      { id: "emic0b", question: "Zalogoprimac odgovara za:", options: ["dolus, culpa i custodia", "samo dolus", "samo culpa lata", "ne odgovara"], correct: 0 },
      { id: "ijo9lj", question: "Pomorski zajam vraća se:", options: ["uvijek", "u dvostrukom iznosu", "samo ako brod potone", "samo ako pothvat uspije"], correct: 3 }
    ],
    fillBlanks: [],
    learn: {
      id: "qde4ao",
      title: "Realni kontrakti",
      content: `<p><strong>Realni kontrakti</strong> nastaju kad se uz sporazum stvar preda drugoj strani (<em>re</em>) da bi se time zasnovala obveza (<em>contrahendi causa</em>, ne radi ispunjenja). Nastali su pod utjecajem ius gentium, kauzalni su i <strong>bonae fidei</strong> (osim zajma). Načelno su jednostrano obvezujući (samo primatelj mora vratiti), ali su ostava, posudba i ugovor o zalogu <strong>bilateralis inaequalis</strong> – iznimno nastaje i obveza druge strane. <em>Casum sentit dominus</em> – vlasnik snosi slučaj.</p>
<table>
<tr><th>Kontrakt</th><th>Predaja prenosi</th><th>Narav</th></tr>
<tr><td>mutuum</td><td>vlasništvo</td><td>unilateralis, stricti iuris</td></tr>
<tr><td>depositum</td><td>detenciju (sekvestru posjed)</td><td>bilateralis inaequalis, bonae fidei</td></tr>
<tr><td>commodatum</td><td>detenciju</td><td>bilateralis inaequalis, bonae fidei</td></tr>
<tr><td>contractus pigneraticius</td><td>posjed</td><td>bilateralis inaequalis, bonae fidei</td></tr>
</table>
<h3>Mutuum – zajam</h3>
<ul>
<li>Zajmodavac prenosi zajmoprimcu <strong>vlasništvo</strong> novca ili drugih zamjenjivih (potrošnih) stvari, a zajmoprimac se obvezuje vratiti <strong>istu količinu iste vrste i kakvoće</strong> (genus). Davanje može biti i posredno (delegacijom ili nalogom da se proda stvar i cijena zadrži kao zajam). Gajevo tumačenje naziva (<em>ex meo tuum</em>) nije ispravno.</li>
<li><strong>Contractus unilateralis, stricti iuris</strong>, besplatan; kamate se ugovaraju posebnom stipulacijom (<em>stipulatio usurarum</em>), neformalni pakt nije utuživ. Potrebna je suglasna volja – inače error in negotio ili in persona.</li>
<li><strong>Rizik</strong>: <em>casum sentit dominus</em> i <em>genus perire non censetur</em> – zajmoprimac kao vlasnik ostaje obvezan i ako primljeno propadne (i višom silom). Ključan je trenutak predaje: propadne li stvar prije predaje, zajam nije ni nastao. Primjer: Ticije obećava Varonu dati u zajam žito iz svojeg skladišta; prije predaje žito izgori – ugovor o zajmu nije zaključen.</li>
<li><strong>Tužbe</strong>: <em>condictio certae creditae pecuniae</em> (novac) i <em>condictio certae rei</em> (druge stvari).</li>
<li><strong>SC Macedonianum</strong> (1. st., Vespazijan): zabrana zajma sinu u vlasti bez očeva odobrenja; posao civilno vrijedi, ali se vjerovnik odbija <em>exceptio SC Macedoniani</em> ili uskratom tužbe; ne vrijedi ako je otac odobrio ili imao korist, ili ako je sin platio nakon što je postao sui iuris (plaćeno se ne vraća).</li>
<li><strong>Fenus nauticum (pecunia traiecticia)</strong> – pomorski zajam (grčki i orijentalni običaji): zajmoprimac vraća samo ako roba ili novac sretno stigne na odredište (suspenzivni uvjet; rizik na zajmodavcu); vrlo visoke kamate.</li>
</ul>
<h3>Fiducia</h3>
<p>U klasici realni kontrakt: prijenos vlasništva mancipacijom ili in iure cessio uz obvezu povrata pod određenim uvjetima – <em>fiducia cum creditore</em> (osiguranje, preteča zaloga) i <em>fiducia cum amico</em> (čuvanje ili besplatna uporaba – preteča ostave i posudbe).</p>
<h3>Depositum – ostava</h3>
<ul>
<li>Deponent predaje depozitaru <strong>pokretnu</strong> stvar (potrošnu ili nepotrošnu) na <strong>besplatno</strong> čuvanje; depozitar je vraća na zahtjev ili po roku. Ako se naplaćuje, riječ je o zakupu.</li>
<li>Depozitar je <strong>detentor</strong> – nema posjedovne zaštite; ne smije stvar upotrebljavati (čini <em>furtum usus</em>).</li>
<li><strong>Odgovornost (načelo utiliteta)</strong>: depozitar samo za <strong>dolus</strong>, u postklasici i <strong>culpa lata</strong>; deponent za svaku krivnju (štetu od stvari i troškove).</li>
<li><strong>Tužbe</strong>: <em>actio depositi directa</em> (deponent; osuđeni postaje infaman jer je izigrao povjerenje) i <em>actio depositi contraria</em> (depozitar – izdaci); isprva pretorova actio in factum, u klasici civilna.</li>
<li><strong>Depositum irregulare</strong> – potrošne stvari (novac) uz pravo potrošnje i vraćanje iste količine – primjenjuju se pravila zajma. <strong>Depositum miserabile</strong> – u nevolji (požar, brodolom) stvar se povjerava slučajnoj osobi; protiv nevjernog depozitara <em>actio in duplum</em> (kod Justinijana samo ako dolozno poriče primitak). <strong>Depositum in sequestrem</strong> – stranke u sporu povjere stvar trećem (sekvestru) do kraja spora; i nekretnina; <strong>sekvestar posjeduje</strong> i ima posjedovnu zaštitu.</li>
<li><strong>Flor. D. 16.3.17.1</strong>: vlasništvo i posjed ostaju kod deponenta, osim kod sekvestra, da nijednoj strani ne teče vrijeme posjeda.</li>
</ul>
<h3>Commodatum – posudba</h3>
<ul>
<li>Komodant predaje komodataru stvar na <strong>besplatnu uporabu</strong>; komodatar je vraća nakon roka ili dogovorene uporabe. Predmet: načelno <strong>nepotrošne</strong> stvari, pokretne i nepokretne; iznimno potrošne radi pokazivanja – <strong>commodatum ad pompam vel ostentationem</strong> (Paul. D. 13.6.3.6; npr. čokoladna skulptura za izložbu na domjenku).</li>
<li>Komodatar je <strong>detentor</strong>; snosi redovne troškove (hrana posuđenog konja), komodant izvanredne (liječenje konja).</li>
<li><strong>Odgovornost</strong>: komodatar (posudba je u njegovu interesu) za <strong>svaku krivnju i custodia</strong>, ne za višu silu; komodant samo za dolus (postklasika i culpa lata).</li>
<li><strong>Tužbe</strong>: <em>actio commodati directa</em> (komodant – povrat) i <em>contraria</em> (komodatar – izvanredni izdaci; prijeboj i retencija).</li>
</ul>
<h3>Contractus pigneraticius – ugovor o zalogu</h3>
<ul>
<li><strong>Založni dužnik (zalogodavac)</strong> predaje <strong>založnom vjerovniku (zalogoprimcu)</strong> stvar u <strong>posjed</strong> radi osiguranja tražbine; ovaj je vraća kad založno pravo prestane. Predmet: pokretne i nepokretne stvari.</li>
<li>Obje strane su u posjedu: zalogodavac <em>ad usucapionem</em>, zalogoprimac s interdiktnom zaštitom (Javol. D. 41.3.16). Zalog kao stvarno pravo djeluje erga omnes, ugovor inter partes; u obvezi povrata zalogoprimac je dužnik, zalogodavac vjerovnik.</li>
<li><strong>Odgovornost</strong>: zalogoprimac za dolus, culpa i custodia; zalogodavac za štetu i troškove. Furtum usus / pactum antichreticum.</li>
<li><strong>Tužbe</strong>: <em>actio pigneraticia directa</em> (zalogodavac – povrat ili <em>superfluum</em>) i <em>contraria</em> (zalogoprimac – izdaci, šteta); isprva actio in factum, civilna potkraj klasike. Zalogoprimac smije zadržati zalog i zbog drugih dugova (pignus Gordianum).</li>
</ul>`
    }
  },

  kupoprodaja: {
    id: "xmo8qf",
    name: "Kupoprodaja (emptio venditio)",
    icon: "fa-cart-shopping",
    color: "#06b6d4",
    flashcards: [
      { id: "4wl7wo", question: "Emptio venditio – pojam", answer: "Konsenzualni, potpuno dvostrano obvezujući ugovor bonae fidei: prodavatelj (venditor) se obvezuje kupcu (emptor) prepustiti stvar u miran posjed (habere licere), a kupac platiti cijenu (pretium).", explanation: "Nastao oko 3. st. pr. Kr. u prometu s peregrinima." },
      { id: "zso49l", question: "Conventio perficit emptionem", answer: "„Kupnja nastaje sporazumom“ – kupoprodaja je sklopljena čim se stranke suglase o stvari i cijeni.", explanation: "Konsenzualni kontrakt." },
      { id: "gge7gt", question: "Essentialia negotii kupoprodaje", answer: "Res (stvar u prometu – tjelesna ili netjelesna, sadašnja ili buduća) i pretium (cijena u novcu, određena ili odrediva, istinita).", explanation: "Res + pretium." },
      { id: "9oi3xh", question: "Emptio rei speratae i emptio spei", answer: "Rei speratae – kupnja buduće stvari pod uvjetom da nastane (plodovi, porod). Spei – bezuvjetna kupnja nade: valjana i ako se ništa ne dobije (ulov ribe – aleatorni posao).", explanation: "Pomp. D. 18.1.8 pr. i 1." },
      { id: "03rvqk", question: "Pretium – zahtjevi", answer: "Cijena mora biti u novcu (numerata pecunia), određena ili odrediva (certum; Justinijan: i po trećem), istinita (verum); ne smije se prepustiti nahođenju stranke (Gai. D. 18.1.35.1).", explanation: "„Koliko hoćeš“ – posao nije sklopljen." },
      { id: "rkupaa", question: "Laesio enormis", answer: "Ako je cijena manja od polovice prave vrijednosti, prodavatelj može tražiti raskid, a kupac zadržati stvar doplatom do pravedne cijene (C. 4.44.2, 285.).", explanation: "Pretium iustum; u klasici se smjelo „nadmudriti“." },
      { id: "5i93ki", question: "Habere licere (Afr. D. 19.1.30.1)", answer: "Prodavatelj je dužan samo osigurati kupcu miran posjed stvari, a ne i prenijeti vlasništvo; kupoprodaja je samo causa za tradiciju.", explanation: "Prijenos vlasništva – ne bi bila kupoprodaja nego inominatni ugovor." },
      { id: "0khk90", question: "Zašto je kupoprodaja u klasici obveznopravna?", answer: "Jer sama ne prenosi vlasništvo – stvara samo obveze; vlasništvo kupac stječe tek tradicijom (ili dosjelošću).", explanation: "U staro doba – mancipacija s neposrednim učinkom." },
      { id: "qqu1km", question: "Obveze kupca", answer: "Prenijeti prodavatelju vlasništvo novca (cijene) i platiti kamate od dana predaje stvari.", explanation: "Actio venditi." },
      { id: "wcpt3j", question: "Obveze prodavatelja", answer: "Predati stvar u miran posjed (habere licere), čuvati je do predaje i odgovarati za pravne (evikcija) i faktične nedostatke.", explanation: "Actio empti." },
      { id: "r6lmg1", question: "Evikcija", answer: "Gubitak stvari jer treći (npr. pravi vlasnik) ima jače pravo i oduzme je kupcu sudskim putem; prodavatelj odgovara za pravne nedostatke.", explanation: "Kupac obavještava prodavatelja o sporu." },
      { id: "zbicdg", question: "Sredstva kupca kod evikcije", answer: "Kod mancipacije actio auctoritatis (dvostruka cijena); kod konsenzualne kupnje stipulatio habere licere i stipulatio duplae, a kasnije i bez stipulacije actio empti.", explanation: "Evikcija je gubitak stvari zbog prava trećega; zaštita kupca ovisi o obliku prijenosa." },
      { id: "0raljr", question: "Actio redhibitoria i actio quanti minoris", answer: "Edilske tužbe za faktične nedostatke: redhibitoria – raskid ugovora i povrat cijene u roku od 6 mjeseci; aestimatoria (quanti minoris) – sniženje cijene u roku od 1 godine.", explanation: "Kurulski edili – robovi i stoka." },
      { id: "qz8zzv", question: "Odgovornost prodavatelja do predaje", answer: "Klasika: za svaku krivnju i custodia (i slučajnu propast), ali ne za višu silu. Postklasika i Justinijan: dolus, culpa lata i culpa levis in abstracto, ne za slučaj.", explanation: "Uz periculum est emptoris." },
      { id: "v759s8", question: "Periculum est emptoris", answer: "„Kupac snosi rizik“ – ako species propadne nakon sklapanja, a prije predaje, bez krivnje prodavatelja (višom silom), kupac mora platiti cijenu iako ne dobiva stvar.", explanation: "Iul. D. 18.5.5.2: rob umre – kupcu propada." },
      { id: "w7r3b7", question: "Cuius commodum, eius periculum", answer: "„Čija je korist, njegov je i rizik“ – opravdanje da kupac, kojem od sklapanja pripadaju koristi od stvari, snosi i rizik njezine propasti.", explanation: "Načelo pravičnosti uz periculum est emptoris." },
      { id: "9f8y8h", question: "Pacta adiecta uz kupoprodaju", answer: "In diem addictio (prodavatelj odustaje ako nađe boljeg kupca), lex commissoria (prodavatelj odustaje ako kupac ne plati u roku), pactum displicentiae (kupac odustaje ako mu se stvar ne svidi).", explanation: "U klasici – rezolutivni uglavci." },
      { id: "kath2o", question: "Lex commissoria uz kupoprodaju", answer: "Uglavak kojim prodavatelj pridržava pravo odustati od ugovora ako kupac ne plati cijenu u ugovorenom roku.", explanation: "Lex commissoria je pactum adiectum, tj. uglavak uz glavni ugovor, a ne samostalan ugovor." },
      { id: "bda8lk", question: "Arrha kod kupoprodaje", answer: "U klasici samo dokaz sklapanja (confirmatoria); kod Justinijana usmena kupnja – confirmatoria i poenitentialis, pisana – poenalis.", explanation: "Kapara." },
      { id: "fugqvd", question: "Kupoprodaja u postklasici i kod Justinijana", answer: "Konstantin: pisana prodaja zemljišta, predaja pred susjedima, plaćena cijena – stvarnopravni učinak. Justinijan: usmena ili pisana; vlasništvo tradicijom uz plaćenu ili osiguranu cijenu.", explanation: "I. 2.1.41." },
      { id: "01eim5", question: "Gai. 3.147 – zlatar i prstenje", answer: "Izradi li zlatar prstenje od svog zlata za cijenu – većina smatra da je kupoprodaja; ako mu dam svoje zlato uz plaću za rad – ugovor o djelu (locatio conductio operis).", explanation: "Razgraničenje kupoprodaje i ugovora o djelu." }
    ],
    quiz: [
      { id: "xfaccq", question: "Bitni sastojci kupoprodaje su:", options: ["res i merces", "res i pretium", "opus i merces", "consensus i traditio"], correct: 1 },
      { id: "bscra1", question: "Kupoprodaja je u klasičnom pravu:", options: ["konsenzualni kontrakt", "realni kontrakt", "verbalni kontrakt", "inominatni kontrakt"], correct: 0 },
      { id: "ionnn4", question: "Prodavatelj je u klasici dužan kupcu:", options: ["prenijeti vlasništvo stvari mancipacijom", "dati jamca za plaćanje cijene", "dati stvar samo u detenciju", "osigurati miran posjed (habere licere)"], correct: 3 },
      { id: "86ayjr", question: "Zašto je kupoprodaja u klasici obveznopravni odnos?", options: ["jer je stricti iuris", "jer je samo causa za tradiciju", "jer zahtijeva mancipaciju", "jer je apstraktna"], correct: 1 },
      { id: "qunhgt", question: "Kupnja ulova ribe bez obzira na ishod jest:", options: ["emptio rei speratae", "permutatio", "emptio spei", "locatio conductio"], correct: 2 },
      { id: "csemfs", question: "Kupnja budućeg poroda pod uvjetom da nastane jest:", options: ["emptio spei", "aestimatum", "emptio rei speratae", "datio ad experiundum"], correct: 2 },
      { id: "veh5ht", question: "Je li sigurno da će kupac dobiti stvar kupoprodajom?", options: ["nije – npr. emptio spei, propast stvari", "da, uvijek čim je ugovor sklopljen", "da, ako je cijenu platio unaprijed", "da, ako je ugovor sklopljen pisanim putem"], correct: 0 },
      { id: "wg8yyo", question: "„Periculum est emptoris“ znači da:", options: ["prodavatelj snosi rizik sve do predaje", "rizik snosi država ako je bila viša sila", "rizik se dijeli napola među strankama", "kupac snosi rizik propasti prije predaje"], correct: 3 },
      { id: "mry42v", question: "Prodavatelj u klasici do predaje ne odgovara za:", options: ["dolus", "višu silu", "custodia", "culpa"], correct: 1 },
      { id: "hnmlls", question: "Kupac protiv prodavatelja zbog evikcije u klasici (i bez stipulacije) tuži:", options: ["actio empti", "rei vindicatio", "condictio furtiva", "exceptio non numeratae pecuniae"], correct: 0 },
      { id: "3h7gos", question: "Edilska tužba za raskid ugovora zbog skrivenog nedostatka ima rok:", options: ["30 dana", "1 godinu", "2 godine", "6 mjeseci"], correct: 3 },
      { id: "wjxjqc", question: "Actio quanti minoris služi za:", options: ["raskid ugovora", "sniženje cijene", "povrat dvostruke cijene", "predaju stvari"], correct: 1 },
      { id: "b65bi0", question: "Koje akcije pripadaju kupcu?", options: ["actio venditi", "actio locati", "actio empti", "actio pro socio"], correct: 2 },
      { id: "4wy75h", question: "Pravo prodavatelja da odustane ako u roku nađe boljeg kupca je:", options: ["lex commissoria", "pactum displicentiae", "in diem addictio", "laesio enormis"], correct: 2 },
      { id: "6seeb5", question: "Pravo kupca da odustane ako mu se stvar ne svidi je:", options: ["pactum displicentiae", "in diem addictio", "lex commissoria", "datio ad experiundum"], correct: 0 },
      { id: "x13qaq", question: "Laesio enormis postoji ako je plaćena cijena manja od:", options: ["četvrtine prave cijene", "ugovorene kapare", "dvije trećine", "polovice prave cijene"], correct: 3 },
      { id: "dgxt5e", question: "„Genus perire non censetur“ točno je za odnos:", options: ["depozita species", "zajma (mutuum)", "rapine", "nijedan"], correct: 1 },
      { id: "qyfejs", question: "Ako zlatar izradi prstenje od vlastitog zlata za cijenu, prema većini:", options: ["kupoprodaja", "ugovor o djelu", "zamjena", "ortakluk"], correct: 0 },
      { id: "mb1g0v", question: "Mancipatar kod evikcije ima tužbu na dvostruku cijenu:", options: ["condictio indebiti", "actio redhibitoria", "actio venditi", "actio auctoritatis"], correct: 3 },
      { id: "yt3lmy", question: "Kod Justinijana vlasništvo kupljene stvari prelazi:", options: ["samim sklapanjem ugovora o kupnji", "tradicijom uz plaćanje ili osiguranje cijene", "samo mancipacijom pred pet svjedoka", "upisom u javne zemljišne i porezne knjige"], correct: 1 }
    ],
    fillBlanks: [
      { id: "vrxbno", sentence: "Conventio perficit _______.", answer: "emptionem", hint: "Kupnju." }
    ],
    learn: {
      id: "0akk87",
      title: "Kupoprodaja – emptio venditio",
      content: `<h3>Pojam</h3>
<p><strong>Emptio venditio</strong> je konsenzualni, potpuno dvostrano obvezujući (<em>bilateralis aequalis</em>), neformalni i kauzalni ugovor <strong>bonae fidei</strong> kojim se prodavatelj (<em>venditor</em>) obvezuje kupcu (<em>emptor</em>) prepustiti određenu stvar u miran posjed (<em>habere licere</em>), a kupac prodavatelju platiti cijenu (<em>pretium</em>). Bitan je trenutak sporazuma: <em>Conventio perficit emptionem</em> – „Kupnja nastaje sporazumom“. Kao konsenzualni kontrakt pojavila se oko 3. st. pr. Kr. u poslovima s peregrinima (koji nisu mogli mancipirati), a u 2. st. pr. Kr. dobila je samostalnu zaštitu.</p>
<h3>Razvoj</h3>
<ul>
<li><strong>Staro civilno pravo</strong> – kupnja se obavlja <strong>mancipacijom</strong> (neposredna razmjena stvari za novac – realna kupnja, stvarnopravni učinak); prateći neformalni dogovor nije utuživ.</li>
<li><strong>Klasika</strong> – samostalni konsenzualni ugovor s <strong>obveznopravnim učinkom</strong>: ugovor je samo <em>causa</em> za tradiciju; kupac postaje vlasnik (ili bonae fidei possessor) tek predajom.</li>
<li><strong>Postklasika (Konstantin, CT 3.1.2)</strong> – za prodaju zemljišta: kupac preuzima zemljišni porez, prodaja je pisana (<em>sollemniter</em>), tradicija pred susjedima ulazi u ugovor, cijena se mora platiti – prodaja ima stvarnopravni učinak.</li>
<li><strong>Justinijan</strong> – usmena kupnja (konsenzualna) ili pisana (valjana tek kad je isprava dovršena i potpisana – praktično literalni kontrakt); za prijenos vlasništva traži se tradicija uz plaćanje ili osiguranje cijene (I. 2.1.41: prodane i predane stvari kupac ne stječe dok ne plati cijenu ili dade osiguranje – poruka ili zalog).</li>
</ul>
<h3>Essentialia negotii</h3>
<h4>Res</h4>
<p>Stvar u pravnom prometu – tjelesna ili netjelesna (nasljedstvo, tražbine, iura in re aliena), sadašnja ili buduća:</p>
<ul>
<li><strong>emptio rei speratae</strong> – uvjetna kupnja stvari koja će tek nastati, ako doista nastane. Pomp. D. 18.1.8 pr.: „Budući plodovi i porod mogu se pravovaljano kupiti, pa kad dođe do poroda, smatra se da je prodaja učinjena već kad je posao sklopljen.“</li>
<li><strong>emptio spei</strong> – bezuvjetna kupnja nade (aleatorni posao). Pomp. D. 18.1.8.1: „Koji put je prodaja valjana i bez stvari – kad se kupuje ulov riba, ptica ili bačenih darova; kupnja je sklopljena i ako se ništa ne uhvati, jer je kupnja nade.“</li>
</ul>
<h4>Pretium</h4>
<ul>
<li>u <strong>novcu</strong> (<em>numerata pecunia</em>) – inače zamjena;</li>
<li><strong>određena ili odrediva</strong> (<em>certum</em>); Justinijan dopušta da je odredi treći; Gai. D. 18.1.35.1: posao nije sklopljen ako prodavatelj kaže „koliko hoćeš, koliko smatraš pravednim, koliko procijeniš“;</li>
<li><strong>istinita</strong> (<em>verum</em>) – ozbiljno odlučena;</li>
<li>odnos cijene i vrijednosti: u klasici je bilo dopušteno da se ugovaratelji „nadmudre“ (Ulp. D. 4.4.16.4); <strong>laesio enormis</strong> (C. 4.44.2, 285.) – ako nije plaćena ni polovica prave cijene, prodavatelj može uz sud vratiti cijenu i uzeti stvar natrag, a kupac može izabrati doplatu do pravedne cijene (<em>pretium iustum</em>) – facultas alternativa.</li>
</ul>
<h3>Obveze stranaka</h3>
<ul>
<li><strong>Kupac</strong> – prenijeti prodavatelju vlasništvo novca (cijene) i platiti kamate od predaje; tužba prodavatelja <strong>actio venditi</strong>. Kupac je mogao odbiti plaćanje ako je prijetila evikcija.</li>
<li><strong>Prodavatelj</strong> – predati stvar u <strong>miran posjed</strong> (<em>habere licere</em>), ne i prenijeti vlasništvo: Afr. D. 19.1.30.1 – „prodavatelj je dužan jedino stvar prenijeti u miran posjed kupca, a ne i u vlasništvo“; kad bi prenio vlasništvo, po rimskom shvaćanju ne bi bila kupoprodaja nego inominatni ugovor. Čuva stvar do predaje i odgovara za nedostatke; tužba kupca <strong>actio empti</strong>.</li>
</ul>
<h3>Odgovornost za pravne nedostatke – evikcija</h3>
<p>Evikcija: treći ima jače pravo na stvari od prodavatelja (npr. vlasnik) i oduzme je kupcu u parnici – kupcu je onemogućeno mirno uživanje. Kupac obavještava prodavatelja, koji preuzima parnicu ili pomaže.</p>
<ul>
<li>kod <strong>mancipacije</strong> – <em>actio auctoritatis</em> na dvostruku cijenu;</li>
<li>kod konsenzualne kupnje – najprije posebne stipulacije: <em>stipulatio habere licere</em> (obećanje mirnog posjeda) i <strong>stipulatio duplae</strong> (dvostruka cijena za slučaj evikcije, kod vrednijih stvari); kasnije se odgovornost predmnijeva pa kupac tuži <strong>actio empti</strong> i bez stipulacije – u klasici i za cijeli interes ako mu je prodavatelj svjesno prodao tuđu stvar.</li>
</ul>
<h3>Odgovornost za faktične nedostatke</h3>
<p>Prodavatelj odgovara ako stvar nema uobičajena ili obećana svojstva ili ima skrivene nedostatke koji bitno umanjuju vrijednost, a postojali su pri sklapanju. Isprva samo za dolozno prešućivanje ili kroz posebne stipulacije (kupac – actio empti). Zaslužni su <strong>kurulski edili</strong> (nadzor trgova, osobito prodaje robova i stoke) – prodavatelj mora objaviti nedostatke, a kupac ima:</p>
<ul>
<li><strong>actio redhibitoria</strong> – raskid, povrat stvari i cijene u roku od <strong>6 mjeseci</strong>;</li>
<li><strong>actio aestimatoria (quanti minoris)</strong> – sniženje cijene u roku od <strong>1 godine</strong>.</li>
</ul>
<p>Justinijan proširuje edilsko jamstvo na sve prodaje, i nekretnina. <em>Simplaria venditio</em> – prodaja sitnica bez jamstva.</p>
<h3>Rizik – periculum</h3>
<ul>
<li>Do predaje prodavatelj u klasici odgovara za svaku krivnju i <strong>custodia</strong> (pa i slučajnu propast), ali <strong>ne za višu silu</strong>; u postklasici i kod Justinijana za dolus, culpa lata i culpa levis in abstracto, ne za slučaj.</li>
<li><strong>Periculum est emptoris</strong> – „rizik snosi kupac“: ako individualno određena stvar (species) nakon sklapanja, a prije predaje, propadne bez krivnje prodavatelja (višom silom), kupac mora platiti cijenu iako ne dobiva stvar (<em>perfecta emptione</em>). Iul. D. 18.5.5.2: „Ako rob umre, prodaja vrijedi kao da je predan – prodavatelj se oslobađa, a kupcu rob propada.“</li>
<li><em>Cuius commodum, eius periculum</em> – „čija korist, njegov i rizik“: kupcu od sklapanja pripadaju i koristi od stvari.</li>
<li>Razlikovati: sklapanje ugovora ≠ prijenos vlasništva (traditio – <em>modus adquirendi</em>).</li>
</ul>
<h3>Pacta adiecta</h3>
<p>Sporedni uglavci sklopljeni odmah uz ugovor (<em>in continenti</em>) utuživi su ugovornom tužbom:</p>
<ul>
<li><strong>in diem addictio</strong> – prodavatelj odustaje ako u roku nađe boljeg kupca (prvi kupac može ponuditi isto i zadržati ugovor);</li>
<li><strong>lex commissoria</strong> – prodavatelj odustaje ako kupac ne plati cijenu u ugovorenom roku;</li>
<li><strong>pactum displicentiae</strong> – kupac odustaje u roku ako mu se stvar ne svidi (kupnja na ogled).</li>
</ul>
<p>Isprva shvaćeni kao suspenzivni uvjeti, u klasici kao bezuvjetna kupnja uz rezolutivni uglavak.</p>
<h3>Kapara i razgraničenja</h3>
<p><strong>Arrha</strong> u klasici samo dokazuje sklapanje (<em>confirmatoria</em>); kod Justinijana uz usmenu kupnju i odustatnina (<em>poenitentialis</em>), uz pisanu ugovorna kazna (<em>poenalis</em>). <strong>Gai. 3.147</strong>: ugovori li zlatar da od svog zlata izradi prstenje za 200 denara – većina smatra da je kupoprodaja; dam li mu svoje zlato uz plaću za rad – <em>locatio conductio</em> (ugovor o djelu). <strong>Cels. D. 12.4.16</strong>: „Dao sam ti novac da mi dadeš Stiha“ – Celz drži da to nije kupoprodaja, nego davanje radi protučinidbe koja nije uslijedila (inominatni ugovor).</p>`
    }
  },

  ostaliKonsenzualni: {
    id: "wz7vtf",
    name: "Locatio conductio, societas, mandatum",
    icon: "fa-people-carry-box",
    color: "#a855f7",
    flashcards: [
      { id: "up6qdn", question: "Konsenzualni kontrakti", answer: "Nastaju samom suglasnošću volja bez forme: emptio venditio, locatio conductio, societas, mandatum – četiri sporazuma uzdignuta na razinu kontrakata; bonae fidei, kauzalni.", explanation: "Mogu prestati contrarius consensus dok su re integra." },
      { id: "5ew3w3", question: "Locatio conductio – pojam", answer: "Konsenzualni, potpuno dvostrani ugovor bonae fidei: jedna strana prepušta stvar na uporabu (rei), daje svoju radnu snagu (operarum) ili izvršava djelo (operis), a druga plaća naknadu (merces).", explanation: "Tužbe actio locati i actio conducti." },
      { id: "nud8h8", question: "Locatio conductio rei", answer: "Locator (zakupodavac) daje stvar na uporabu i korištenje, conductor (zakupnik) plaća merces; zakupnik nema posjed, nego je detentor.", explanation: "Najam i zakup." },
      { id: "xan59p", question: "Emptio tollit locatum", answer: "„Kupnja (prodaja) ukida zakup“ – zakupnik nije zaštićen ako zakupodavac proda stvar trećemu koji ga želi ukloniti.", explanation: "Zakupnik nema posjed." },
      { id: "ig64l8", question: "Locatio conductio operarum", answer: "Najamni radnik (locator) daje svoju radnu snagu, poslodavac (conductor) plaća merces; ograničena primjena (robovski rad), ne za intelektualne usluge (honorarium).", explanation: "Ugovor o službi." },
      { id: "ngnmj3", question: "Locatio conductio operis", answer: "Naručitelj (locator) naručuje djelo i daje materijal te plaća merces; izvođač (conductor) izrađuje djelo. Ako izvođač daje i materijal – kupoprodaja.", explanation: "Ugovor o djelu; essentialia: opus i merces." },
      { id: "1jpp3y", question: "Odgovornost kod locatio conductio", answer: "Zakupnik odgovara za svaku krivnju (i custodia), ne za višu silu. Izvođač djela za dolus i culpa (i imperitia, culpa in eligendo); oni koji čiste i krpaju odjeću i za custodia.", explanation: "Najstroža odgovornost najnižih obrtnika." },
      { id: "eode5x", question: "Lex Rhodia de iactu", answer: "Kod prijevoza morem, ako je roba bačena radi spašavanja broda, vlasnici spašene robe i broda razmjerno naknađuju štetu onome čija je roba žrtvovana (Paul. D. 14.2.1).", explanation: "Rodsko pomorsko pravo." },
      { id: "lyvkd3", question: "Societas – pojam", answer: "Konsenzualni, potpuno dvostrani ugovor bonae fidei kojim se dvoje ili više ortaka (socii) obvezuju zajedničkim ulaganjem sredstava i/ili rada ostvariti zajedničku svrhu.", explanation: "Affectio societatis." },
      { id: "82vsmi", question: "Vrste ortakluka", answer: "Omnium bonorum (sva sadašnja i buduća imovina), universalis quaestus (sva buduća stečena), quaestus (iz poslovanja), unius rei ili alicuius negotiationis (jedan posao).", explanation: "Omnium bonorum sličan consortium." },
      { id: "s3v29c", question: "Societas leonina", answer: "„Lavlje društvo“ – ništav ortakluk u kojem bi neki član snosio samo gubitke, a bio isključen od dobiti.", explanation: "Communicatio lucri et damni." },
      { id: "9gjz8n", question: "Prestanak ortakluka", answer: "Sporazumom, jednostranim otkazom (renuntiatio), smrću ili capitis deminutio ortaka, protekom roka, ispunjenjem cilja, propašću imovine, stečajem.", explanation: "Ortakluk se temelji na povjerenju među ortacima, pa prestaje i kad ortak promijeni pravni položaj (smrt, capitis deminutio)." },
      { id: "nsyzg6", question: "Tužbe iz ortakluka i odgovornost", answer: "Actio pro socio (povlači infamiju) i actio communi dividundo; ortaci odgovaraju u klasici za dolus, kod Justinijana i culpa lata i culpa levis in concreto.", explanation: "Ortakluk je sličan slučajnoj zajednici (communio incidens)." },
      { id: "q24jpa", question: "Mandatum – pojam", answer: "Konsenzualni, nepotpuno dvostrani ugovor bonae fidei: mandatar se obvezuje mandantu (dominus negotii) besplatno izvršiti posao, uz moguću naknadu troškova i štete.", explanation: "Jedini besplatni konsenzualni kontrakt." },
      { id: "wd56uc", question: "Mandatar prema trećima i odgovornost", answer: "Mandatar nastupa prema trećima u svoje ime (posredno zastupanje); u klasici odgovara za dolus, kasnije (Justinijan) i za culpa.", explanation: "Ratihabitio mandato comparatur." },
      { id: "d33tzx", question: "Prestanak naloga i tužbe", answer: "Izvršenjem, istekom roka, opozivom mandanta (revocatio), otkazom mandatara (renuntiatio), smrću stranke. Tužbe: actio mandati directa i contraria.", explanation: "Osuda iz actio mandati – infamija." }
    ],
    quiz: [
      { id: "51z3rz", question: "Što vrijedi za locatio conductio operis?", options: ["conductor (izvođač) plaća merces naručitelju", "conductor naručuje djelo i daje materijal", "locator naručuje djelo i plaća merces", "locator izrađuje djelo za izvođača"], correct: 2 },
      { id: "jlx4dl", question: "Što vrijedi za locatio conductio operarum?", options: ["conductor (poslodavac) daje radnu snagu", "locator (radnik) plaća merces", "locator (radnik) daje radnu snagu", "nema naknade za rad (besplatno)"], correct: 2 },
      { id: "hbw75o", question: "Ako izvođač daje i materijal i rad, posao je:", options: ["kupoprodaja", "locatio conductio operis", "mandatum", "societas"], correct: 0 },
      { id: "5t90yq", question: "„Emptio tollit locatum“ znači:", options: ["zakupnik stječe vlasništvo", "zakup ukida kupnju", "kupac snosi rizik", "kupnja ukida zakup"], correct: 3 },
      { id: "1u6ztd", question: "Locatio conductio rei je:", options: ["contractus unilateralis", "contractus bilateralis aequalis", "contractus bilateralis inaequalis", "negotium unilaterale"], correct: 1 },
      { id: "7f43kr", question: "Tko plaća merces kod locatio conductio operis, a tko kod locatio conductio operarum?", options: ["u operis merces plaća locator, u operarum conductor", "u operis merces plaća conductor, u operarum locator", "u objema merces plaća locator", "u objema merces plaćaju obje strane"], correct: 0 },
      { id: "lenn6h", question: "Mandatum je:", options: ["naplatan i potpuno dvostran", "verbalni kontrakt", "realni kontrakt", "besplatan i nepotpuno dvostran"], correct: 3 },
      { id: "06zynv", question: "Mandatar u klasici odgovara za:", options: ["custodia", "dolus", "višu silu", "slučaj"], correct: 1 },
      { id: "ifl6in", question: "Societas leonina je:", options: ["dopuštena", "pobojna", "ništava", "društvo za trgovinu stokom"], correct: 2 },
      { id: "no83fx", question: "Koji od navedenih nije način prestanka ortakluka?", options: ["jednostrani otkaz", "smrt ortaka", "isplata dobiti ortacima", "ispunjenje cilja"], correct: 2 },
      { id: "l5peb2", question: "Ortakluk je najsličniji kojem kvazikontraktu?", options: ["communio incidens", "negotiorum gestio", "condictio indebiti", "nijednom"], correct: 0 },
      { id: "r8y1i2", question: "Tužba iz ortakluka koja povlači infamiju jest:", options: ["actio conducti", "actio communi dividundo", "actio locati", "actio pro socio"], correct: 3 },
      { id: "3j2d3v", question: "Zajednica cjelokupne sadašnje i buduće imovine zove se:", options: ["societas quaestus", "societas omnium bonorum", "societas unius rei", "societas leonina"], correct: 1 },
      { id: "hhmvx6", question: "Lex Rhodia de iactu uređuje:", options: ["naknadu za robu bačenu radi spasa broda", "odgovornost gostioničara za stvari putnika", "pomorski zajam s visokim kamatama", "zakup luke i plaćanje lučkih pristojbi"], correct: 0 },
      { id: "67wo8e", question: "Zakupnik u rimskom sustavu ima:", options: ["posjed stvari", "služnost", "vlasništvo stvari", "samo detenciju"], correct: 3 },
      { id: "ftjvsk", question: "Mandat prestaje opozivom mandanta, što se zove:", options: ["renuntiatio", "revocatio", "rescissio", "remissio"], correct: 1 }
    ],
    fillBlanks: [],
    learn: {
      id: "oi7a1y",
      title: "Locatio conductio, societas i mandatum",
      content: `<h3>Konsenzualni kontrakti</h3>
<p>Nastaju običnom suglasnošću volja (<em>consensus</em>), bez forme; četiri sporazuma uzdignuta su na razinu kontrakata: <strong>emptio venditio, locatio conductio, societas, mandatum</strong>. Neformalni, kauzalni, <strong>bonae fidei</strong>. Kupoprodaja, zakup i ortakluk su <em>bilateralis aequalis</em>, nalog <em>bilateralis inaequalis</em>. Kod sinalagmatičnih vrijedi: strana koja sama nije ispunila ne može tražiti ispunjenje od druge. Kako nastaju sporazumom, mogu i prestati suprotnim sporazumom dok nijedna strana nije počela ispunjavati. Učinak počiva na volji i povjerenju (consensus + bona fides).</p>
<h3>Locatio conductio</h3>
<p>Konsenzualni, kauzalni, potpuno dvostrani ugovor bonae fidei kojim se jedna strana obvezuje drugoj prepustiti stvar na uporabu i korištenje, staviti na raspolaganje radnu snagu ili izvršiti djelo, a druga se obvezuje platiti naknadu (<strong>merces</strong>). Pravno je blizak kupoprodaji (sporazum o merces kao o cijeni). Tužbe: <strong>actio locati</strong> i <strong>actio conducti</strong> (bonae fidei).</p>
<table>
<tr><th>Vrsta</th><th>Locator</th><th>Conductor</th><th>Merces plaća</th></tr>
<tr><td><strong>rei</strong> (zakup, najam)</td><td>daje stvar</td><td>uzima stvar na uporabu</td><td>conductor</td></tr>
<tr><td><strong>operarum</strong> (ugovor o službi)</td><td>najamni radnik – daje radnu snagu</td><td>poslodavac</td><td>conductor</td></tr>
<tr><td><strong>operis</strong> (ugovor o djelu)</td><td>naručitelj – naručuje djelo, daje materijal</td><td>izvođač – izrađuje djelo</td><td>locator</td></tr>
</table>
<ul>
<li><strong>Rei:</strong> zakupnik nema posjed (detentor) i nije zaštićen ako zakupodavac proda stvar trećemu koji ga želi odstraniti – <em>emptio tollit locatum</em> („kupnja poništava zakup“). Zakupnik odgovara za dolus, culpa i custodia, oslobađa ga samo viša sila.</li>
<li><strong>Operarum:</strong> ograničene primjene – najteže poslove obavljaju robovi, a intelektualne usluge (<em>operae liberales</em>) nisu se davale u najam za plaću, nego se nagrađivale kao stvar časti (<em>honorarium</em>), kasnije utjerive u kognicijskom postupku.</li>
<li><strong>Operis:</strong> naručitelj daje materijal; ako izvođač daje i materijal i rad, riječ je o <strong>kupoprodaji</strong> (Gai. 3.147 – zlatar). Essentialia: <em>opus</em> i <em>merces</em>. Izvođač djelo izvršava savjesno, osobno ili s pomoćnicima; odgovara za dolus i culpa (svaku krivnju), i za stručnost (<em>imperitia</em>) i izbor pomoćnika (<em>culpa in eligendo</em>); čistači i krpači odjeće i za <strong>custodia</strong> – najstroža odgovornost. Naručitelj predaje materijal, preuzima djelo i plaća.</li>
<li><strong>Prijevoz morem – Lex Rhodia de iactu:</strong> Paul. D. 14.2.1 – „ako je radi olakšanja broda roba bačena, doprinosom svih nadoknađuje se ono što je učinjeno za sve“: vlasnici spašene robe i broda razmjerno naknađuju štetu vlasniku žrtvovane robe.</li>
</ul>
<h3>Societas – ortakluk</h3>
<p>Konsenzualni, kauzalni, potpuno dvostrani ugovor bonae fidei kojim se dvije ili više osoba (<em>socii</em>) međusobno obvezuju ostvariti zajedničku svrhu zajedničkim ulaganjem sredstava i/ili rada; bitna je <em>affectio societatis</em>. Sličan je starinskom <em>consortium (ercto non cito)</em>.</p>
<ul>
<li><strong>Vrste:</strong> <em>societas omnium bonorum</em> – cjelokupna sadašnja i buduća imovina (stečena radom ili slučajem – <em>ex fortuna</em>: nasljedstvo, dar); <em>societas universalis quaestus</em> – cjelokupna buduća imovina stečena radom ili drugačije; <em>societas quaestus</em> – buduća imovina iz poslovne djelatnosti; <em>societas unius rei / alicuius negotiationis</em> – jedan posao ili određena vrsta poslova.</li>
<li>Ulozi ne moraju biti jednaki, ali ne smije sudjelovati onaj tko ništa ne ulaže. <strong>Communicatio lucri et damni</strong> – dobit i gubitak dijele se po sporazumu, inače na jednake dijelove. Ništava je <strong>societas leonina</strong> („lavlje društvo“) – član bi snosio samo gubitak bez udjela u dobiti.</li>
<li><strong>Odgovornost:</strong> ortak odgovara za dolus i za culpa mjerenu pažnjom kakvu ulaže u vlastite stvari (<em>diligentia quam suis rebus</em> – culpa in concreto, Gai. D. 17.2.72); kod Justinijana dolus, culpa lata i <strong>culpa levis in concreto</strong>.</li>
<li><strong>Tužbe:</strong> <em>actio pro socio</em> (infamija; u klasici dovodi do prestanka) i <em>actio communi dividundo</em>.</li>
<li><strong>Prestanak:</strong> sporazum (<em>dissensus</em>), jednostrani otkaz (<em>renuntiatio</em> – ne u nevrijeme), smrt ortaka (nastavak = novi ugovor), capitis deminutio (maxima, media), protek roka, ispunjenje cilja ili uvjeta, propast imovine, stečaj ortaka, svaka promjena članova.</li>
</ul>
<h3>Mandatum – nalog</h3>
<p>Konsenzualni, <strong>nepotpuno dvostrani</strong> ugovor bonae fidei kojim se jedna strana (<strong>mandatar</strong>) obvezuje drugoj (<strong>mandant, dominus negotii</strong>) <strong>besplatno</strong> izvršiti neki posao, uz eventualnu naknadu troškova i štete. Jedini je <strong>besplatni</strong> (lukrativni) konsenzualni kontrakt.</p>
<ul>
<li>Mandatar prema trećima nastupa u svoje ime (posredno zastupanje); legitimira se punomoći koju mu izdaje mandant. <em>Ratihabitio mandato comparatur</em> – naknadno odobrenje izjednačuje se s nalogom.</li>
<li><strong>Odgovornost:</strong> u klasici za dolus, kod Justinijana i za culpa (svaku krivnju).</li>
<li><strong>Tužbe:</strong> <em>actio mandati directa</em> (mandant; osuda povlači infamiju) i <em>actio mandati contraria</em> (mandatar – izdaci i šteta).</li>
<li><strong>Prestanak:</strong> izvršenje, istek roka, opoziv mandanta (<strong>revocatio</strong>), otkaz mandatara (<strong>renuntiatio</strong>), smrt jedne strane.</li>
<li><em>Mandatum qualificatum</em> (mandatum pecuniae credendae) služi kao neformalno jamstvo.</li>
</ul>
<h3>Tužbe iz konsenzualnih kontrakata</h3>
<p>Sve su bonae fidei: kupac <em>actio empti</em>, prodavatelj <em>actio venditi</em>; zakup <em>actio locati / conducti</em>; ortakluk <em>actio pro socio</em>; nalog <em>actio mandati (directa, contraria)</em>. Osuda iz actio pro socio i actio mandati povlači infamiju.</p>`
    }
  },

  inominatniPakta: {
    id: "6eb2ia",
    name: "Inominatni kontrakti, pakti i darovanje",
    icon: "fa-file-signature",
    color: "#ec4899",
    flashcards: [
      { id: "5p2poy", question: "Inominatni kontrakti", answer: "Potpuno dvostrani ugovori koji nastaju kad jedna strana ispuni svoju činidbu, pa je druga dužna izvršiti obećanu protučinidbu; „bezimeni“ jer nisu postali tipični.", explanation: "Bonae fidei; približavaju se realnima." },
      { id: "2afk80", question: "Četiri skupine inominatnih kontrakata", answer: "Do ut des (dajem da daš), do ut facias (dajem da učiniš), facio ut des (činim da daš), facio ut facias (činim da učiniš).", explanation: "Justinijanova podjela prema činidbama." },
      { id: "9ehnue", question: "Zaštita prije priznanja utuživosti", answer: "Stranka koja je ispunila nije mogla tražiti protučinidbu: za dare – condictio ob rem dati (povrat), za facere – actio doli (naknada štete).", explanation: "Condictio ob rem dati vraća ono što je dano, dok actio doli daje naknadu štete kad je ispunjeno facere." },
      { id: "7vmacj", question: "Actio praescriptis verbis", answer: "Pretor je davao actio in factum na ispunjenje protučinidbe s opisom činjenica; Justinijan ju spaja s civilnom actio incerti u actio praescriptis verbis za sve inominatne ugovore.", explanation: "Uz condictio causa data causa non secuta i ex poenitentia." },
      { id: "qwsatk", question: "Condictio causa data causa non secuta", answer: "Povrat danog kad očekivana protučinidba nije uslijedila; kod Justinijana uz inominatne ugovore samo ako je druga strana kriva ili u zakašnjenju.", explanation: "Kondikcija pretpostavlja da je jedna strana ispunila, a protučinidba je izostala." },
      { id: "2akyyf", question: "Condictio ex poenitentia", answer: "Justinijanovo sredstvo: strana koja je ispunila može se pokajati, jednostrano odustati i tražiti povrat prije nego druga padne u zakašnjenje.", explanation: "Kondikcija zbog pokajanja." },
      { id: "wwqaig", question: "Permutatio (zamjena)", answer: "Do ut des: jedna strana prenosi drugoj vlasništvo stvari, a druga se obvezuje prenijeti vlasništvo druge stvari. Sabinovci – vrsta kupnje; prokulovci – samo povrat.", explanation: "Cels. D. 12.4.16 – Stih za novac." },
      { id: "l15mcg", question: "Aestimatum (nalog prodaje)", answer: "Vlasnik predaje stvar drugome da je proda i plati dogovorenu procijenjenu svotu, a višak zadrži; primatelj je detentor (actio de aestimato).", explanation: "Do ut facias." },
      { id: "6v83lk", question: "Transactio (nagodba)", answer: "Stranke riješe sporni odnos tako da svaka nešto popusti; po učinku izjednačena s presudom.", explanation: "Nagodba pretpostavlja spornost odnosa i uzajamno popuštanje, a ne priznanje tuđeg zahtjeva." },
      { id: "pv26ko", question: "Precarium (prekarij)", answer: "Prepuštanje stvari na besplatnu uporabu do svakodobnog opoziva; prekarist ima posjedovnu zaštitu protiv trećih, ne protiv davatelja; povrat interdictum de precario.", explanation: "Nakon zahtjeva za povrat – viciozni posjednik." },
      { id: "lqlkqm", question: "Datio ad experiundum (davanje na probu)", answer: "Stvar se daje drugome da je ispita radi moguće kupnje; samostalni posao – za razliku od pactum displicentiae uz već sklopljenu kupnju.", explanation: "Za razliku od pactum displicentiae, kod davanja na probu kupnja još nije sklopljena." },
      { id: "fgs8xd", question: "Pactum (pakt)", answer: "Neformalni sporazum kojemu dugo nije priznata utuživost (pacta nuda); utuživi pakti zovu se pacta vestita: adiecta, praetoria, legitima.", explanation: "Pacta sunt servanda." },
      { id: "7j51i8", question: "Pacta sunt servanda", answer: "„Sporazume (ugovore) treba poštivati.“", explanation: "Načelo obveznosti dogovora." },
      { id: "wseyg4", question: "Pacta praetoria", answer: "Pakti koje je pretor zaštitio actio in factum: constitutum debiti, receptum nautarum cauponum stabulariorum, receptum argentarii, receptum arbitrii, pactum iurisiurandi.", explanation: "Pretor ih je zaštitio svojim ediktom, a ne civilno pravo; ukupno je pet pakata." },
      { id: "6qlagr", question: "Constitutum debiti", answer: "Neformalno obećanje da će se postojeći dug, svoj ili tuđi, platiti u određeno vrijeme; za tuđi dug ima učinak jamstva.", explanation: "Pretorski pakt." },
      { id: "gjuul5", question: "Receptum nautarum, cauponum, stabulariorum", answer: "Preuzeta odgovornost brodara, gostioničara i vlasnika staja za stvari putnika bez obzira na krivnju (custodia, ne viša sila); kasnije se predmnijeva; actio de recepto.", explanation: "Pretorski pakt." },
      { id: "qavnvv", question: "Pacta legitima", answer: "Pakti utuživi na temelju carskih konstitucija: compromissum (arbitražni sporazum), pollicitatio dotis (obećanje miraza), donatio (darovanje).", explanation: "Za razliku od pretorskih pakata, njihovu je utuživost uvela carska zakonodavna vlast." },
      { id: "nvb5an", question: "Donatio (darovanje)", answer: "U klasici nije poseban posao nego causa (dare, stipulacija, akceptilacija) besplatnog povećanja tuđe imovine; Lex Cincia (oko 204. pr. Kr.) ograničava visinu; Justinijan priznaje usmeno obećanje.", explanation: "Opoziv zbog nezahvalnosti oslobođenika." }
    ],
    quiz: [
      { id: "171ah9", question: "Prije priznanja utuživosti inominatnih kontrakata condictio ob rem dati mogla je natjerati drugu stranu na:", options: ["činidbu dare", "činidbu facere", "vraćanje danog", "naknadu dvostruke štete"], correct: 2 },
      { id: "tvr73b", question: "Ako je stranka ispunila činidbu facere, a protučinidba izostala, prije priznanja utuživosti mogla je tražiti:", options: ["rei vindicatio – povrat stvari", "actio empti – ispunjenje", "actio doli – naknadu štete", "ništa, bez ikakve zaštite"], correct: 2 },
      { id: "w3wnyq", question: "Kada obje strane popuste i tako riješe sporni odnos, riječ je o:", options: ["transactio", "kvazikontraktu", "inominatnom kontraktu permutatio", "kvazideliktu"], correct: 0 },
      { id: "1wdcr4", question: "Zamjena (permutatio) je tip:", options: ["facio ut facias", "do ut facias", "facio ut des", "do ut des"], correct: 3 },
      { id: "flg0uf", question: "Prema Celzu (D. 12.4.16), davanje novca da bi se dobio rob Stih:", options: ["je kupoprodaja (emptio venditio)", "nije kupoprodaja – samo povrat danog", "je zajam (mutuum) s kamatama", "je darovanje uz modus"], correct: 1 },
      { id: "bn344s", question: "Pacta praetoria su:", options: ["constitutum debiti, receptum, pactum iurisiurandi", "lex commissoria, in diem addictio i displicentia", "compromissum, pollicitatio dotis i donatio", "stipulatio, nexum, dotis dictio i vadiatura"], correct: 0 },
      { id: "6249uv", question: "Compromissum je:", options: ["nagodba sklopljena pred pretorom", "neformalno obećanje miraza mužu", "prijeboj uzajamnih tražbina stranaka", "sporazum da se spor riješi arbitražom"], correct: 3 },
      { id: "b3dh6i", question: "Kako se mogao obećati miraz?", options: ["samo mancipacijom pred svjedocima", "dotis dictio, stipulacijom, pollicitatio", "samo kvazikontraktom bez forme", "samo oporukom kao legat"], correct: 1 },
      { id: "322c6y", question: "Brodar i gostioničar za stvari putnika odgovaraju na temelju:", options: ["constitutum debiti (pakta)", "lex commissoria uz zakup", "receptum nautarum, cauponum…", "mandatum (naloga putnika)"], correct: 2 },
      { id: "t0uvn9", question: "Prekarist ima posjedovnu zaštitu:", options: ["protiv svih, uključujući davatelja", "nikakvu", "samo protiv trećih", "samo protiv vlasnika"], correct: 2 },
      { id: "o0cp8k", question: "Datio ad experiundum je:", options: ["samostalni posao radi moguće kupnje", "sporedni uglavak uz već sklopljenu kupnju", "vrsta zajma potrošnih stvari", "oblik jamstva za tuđi dug"], correct: 0 },
      { id: "ab3ish", question: "Justinijan je dopustio da se kod inominatnih ugovora odustane prije zakašnjenja druge strane tužbom:", options: ["condictio indebiti", "actio doli", "condictio furtiva", "condictio ex poenitentia"], correct: 3 },
      { id: "r7bbz2", question: "Tužba za ispunjenje protučinidbe kod svih inominatnih ugovora kod Justinijana:", options: ["actio empti", "actio praescriptis verbis", "actio in rem", "actio de aestimato"], correct: 1 },
      { id: "t742t4", question: "Lex Cincia uređuje:", options: ["darovanja", "kamate", "zajam sinu", "nexum"], correct: 0 },
      { id: "dmbaqu", question: "„Pacta sunt servanda“ znači:", options: ["kupnja nastaje sporazumom", "iz golog pakta nema obveze", "pakt ne obvezuje", "sporazume treba poštivati"], correct: 3 },
      { id: "iqar9l", question: "Constitutum debiti alieni ima učinak:", options: ["novacije", "jamstva", "oprosta duga", "darovanja"], correct: 1 },
      { id: "pjfusk", question: "Nalog prodaje (aestimatum) je tip:", options: ["do ut des", "facio ut facias", "do ut facias", "facio ut des"], correct: 2 },
      { id: "fkna8d", question: "Darovanje u klasičnom pravu je:", options: ["poseban konsenzualni kontrakt", "realni kontrakt", "causa drugih pravnih poslova", "delikt"], correct: 2 }
    ],
    fillBlanks: [],
    learn: {
      id: "0blxrx",
      title: "Inominatni kontrakti, pakti i darovanje",
      content: `<h3>Inominatni kontrakti</h3>
<p>Potpuno dvostrano obvezujući ugovori koji nastaju time što je jedna strana <strong>ispunila svoju činidbu</strong>, pa je druga obvezana izvršiti obećanu protučinidbu (zato ih neki zovu inominatni realni kontrakti). Od konsenzualnih se razlikuju jer sporazum nije dovoljan, a od realnih jer činidba ne mora biti predaja stvari. Neformalni, kauzalni, bonae fidei. „Bezimeni“ su jer nisu postali tipični (osim nekih). Justinijanova podjela:</p>
<ul>
<li><strong>do ut des</strong> – obje činidbe su dare (prijenos vlasništva);</li>
<li><strong>do ut facias</strong> – dare za facere (dam prsten, ti naslikaš portret);</li>
<li><strong>facio ut des</strong> – facere za dare;</li>
<li><strong>facio ut facias</strong> – obje su facere.</li>
</ul>
<h4>Zaštita</h4>
<ul>
<li>Isprva nisu neposredno utuživi: tko je ispunio, ne može tražiti protučinidbu, nego samo povrat – kod dare <strong>condictio ob rem dati</strong> (kod Justinijana <em>condictio causa data causa non secuta</em>), kod facere <strong>actio doli</strong> (naknada štete).</li>
<li>Pretor je dekretima (iznimno ediktom) davao <strong>actio in factum</strong> s opisom činjenica za ispunjenje protučinidbe; pravnici zatim civilnu <em>actio civilis incerti</em>; Justinijan ih spaja u <strong>actio praescriptis verbis</strong> za sve inominatne ugovore.</li>
<li>Uz nju kod Justinijana: <em>condictio causa data causa non secuta</em> – samo ako je protivna strana kriva za neizvršenje ili u zakašnjenju; <strong>condictio ex poenitentia</strong> – jednostrani odustanak i povrat prije zakašnjenja druge strane.</li>
<li>Ulp. D. 2.14.7: sporazumi iuris gentium nekad su zaštićeni tužbama, nekad prigovorima; oni koji rađaju tužbu prelaze u imena kontrakata (kupoprodaja, zakup, ortakluk, posudba, ostava).</li>
</ul>
<h4>Pojedini inominatni kontrakti</h4>
<ul>
<li><strong>Permutatio (zamjena)</strong> – do ut des, bilateralis aequalis, bonae fidei: jedna strana prenosi vlasništvo stvari, druga se obvezuje prenijeti vlasništvo druge. U klasici nije priznata kao poseban ugovor: sabinovci su je smatrali kupnjom, prokulovci su priznavali samo povrat. Stranke odgovaraju za svaku krivnju i za pravne i faktične nedostatke. <strong>Cels. D. 12.4.16</strong>: „Dao sam ti novac da mi dadeš Stiha – je li to vrsta kupoprodaje ili nema druge obveze osim povrata danog jer predaja nije uslijedila? Sklon sam ovom drugom.“</li>
<li><strong>Aestimatum (nalog prodaje)</strong> – do ut facias: vlasnik predaje stvar da je primatelj proda i plati dogovorenu procijenjenu svotu, a višak zadrži; primatelj je detentor (ne smije upotrebljavati – furtum usus), odgovara za dolus i culpa lata; <em>actio de aestimato</em>.</li>
<li><strong>Transactio (nagodba)</strong> – stranke riješe sporni odnos tako da svaka nešto popusti (bez toga bi bilo darovanje); učinak je izjednačen s presudom.</li>
<li><strong>Precarium</strong> – prepuštanje stvari na uporabu do svakodobnog opoziva; prekarist ima posjedovnu zaštitu samo prema trećima; ako ne vrati – <em>interdictum de precario</em> i rei vindicatio; od zahtjeva za povrat postaje viciozni posjednik. Prekarij se ne smatra pravim kontraktom.</li>
<li><strong>Datio ad experiundum</strong> – davanje stvari na probu radi moguće kupnje; samostalni posao koji tek može dovesti do kupnje, dok je <em>pactum displicentiae</em> rezolutivni uglavak uz kupnju koja već proizvodi učinke.</li>
</ul>
<h3>Pacta</h3>
<p><strong>Pactum (pactio, conventio)</strong> – neformalna suglasnost volja kojoj dugo nije priznata utuživost i koja ni nakon toga nije uzdignuta na razinu kontrakta. <em>Ex nudo pacto obligatio non nascitur</em>; s druge strane <em>pacta sunt servanda</em> – sporazume treba poštivati. U najstarije doba pakti djeluju samo kod deliktnih obveza (oprost). Utuživi pakti (<em>pacta vestita</em>) nasuprot neutuživima (<em>pacta nuda</em>):</p>
<ol>
<li><strong>Pacta adiecta</strong> – dodatni sporazumi uz poslove bonae fidei sklopljeni odmah (<em>in continenti</em>), utuživi ugovornom tužbom: in diem addictio, lex commissoria, pactum displicentiae (uz kupoprodaju).</li>
<li><strong>Pacta praetoria</strong> – zaštićeni pretorovom actio in factum:
<ul>
<li><strong>constitutum debiti</strong> – neformalno obećanje da će se postojeći dug (svoj ili tuđi) platiti u određeno vrijeme; za tuđi dug – jamstvo;</li>
<li><strong>receptum nautarum, cauponum et stabulariorum</strong> – brodari, gostioničari i vlasnici staja preuzimaju odgovornost za unesene stvari putnika bez obzira na krivnju (custodia, ne viša sila); kasnije se predmnijeva čim se putnik smjesti; <em>actio de recepto</em>;</li>
<li><strong>receptum argentarii</strong> – bankar preuzima obvezu platiti dug klijenta (stroga <em>actio recepticia</em>);</li>
<li><strong>receptum arbitrii</strong> – arbitar preuzima dužnost odlučiti spor;</li>
<li><strong>pactum iurisiurandi</strong> – sporazum o polaganju odlučne zakletve kojom se okončava spor.</li>
</ul></li>
<li><strong>Pacta legitima</strong> – utuživost daju carske konstitucije: <strong>compromissum</strong> (stranke će spor riješiti arbitražom, mimo redovnog suda), <strong>pollicitatio dotis</strong> (neformalno obećanje miraza – od 428. utuživo, muž tuži condictio ex lege), <strong>donatio</strong> (obećanje darovanja).</li>
</ol>
<h3>Darovanje (donatio)</h3>
<p>U klasici darovanje nije poseban tip posla, nego <strong>causa</strong> drugih poslova kojima se prenosi vlasništvo (mancipacija, in iure cessio, tradicija), osniva (stipulacija) ili ukida obveza (akceptilacija) – uz obilježje besplatnog povećanja imovine obdarenoga i umanjenja darovateljeve (<em>animus donandi</em>, dobrovoljnost). <strong>Lex Cincia</strong> (oko 204. pr. Kr.) ograničava visinu darovanja, osim među bliskim srodnicima (do 5. stupnja) i nekim osobama. Darovanja među supružnicima u klasici su zabranjena. Opoziv – samo zbog nezahvalnosti obdarenog oslobođenika. Konstantin: isprava, tradicija pred susjedima i upis u javne knjige. Justinijan: usmeno obećanje darovanja je valjano; upis samo iznad 500 solida.</p>`
    }
  },

  kvazikontrakti: {
    id: "8h922n",
    name: "Kvazikontrakti",
    icon: "fa-scale-balanced",
    color: "#84cc16",
    flashcards: [
      { id: "pyalkb", question: "Kvazikontrakti – pojam", answer: "Obvezni odnosi koji se ne temelje na sporazumu, ali po učinku sliče kontraktima jer iz njih nastaje utuživa civilna obveza; pojam Justinijanovih kompilatora.", explanation: "Negotiorum gestio, communio incidens, condictiones sine causa." },
      { id: "51ytkt", question: "Negotiorum gestio", answer: "Poslovodstvo bez naloga: negotiorum gestor po svojoj volji obavlja tuđi posao (dominus negotii) bez naloga; posao mora biti tuđ i korisno (utiliter) započet; uspjeh se ne traži.", explanation: "Slično nalogu, ali bez sporazuma." },
      { id: "d22g95", question: "Odgovornost negotiorum gestora", answer: "Odgovara za svaku krivnju, iznimno i custodia (novi poslovi); samo za dolus i culpa lata ako je spriječio neposrednu štetu; mora položiti račun i dovršiti posao.", explanation: "Gospodar naknađuje korisne troškove." },
      { id: "9lz3sb", question: "Tužbe iz negotiorum gestio", answer: "Actio negotiorum gestorum directa (gospodar) i contraria (gestor – troškovi); naknadnim odobrenjem (ratihabitio) i netuđi posao dobiva zaštitu.", explanation: "Kod Justinijana i actio funeraria." },
      { id: "5q7nug", question: "Communio incidens", answer: "Slučajna zajednica: dvije ili više osoba bez ugovora postanu suvlasnici (nasljeđivanjem, miješanjem); uz suvlasništvo nastaju obveze o troškovima, plodovima, šteti.", explanation: "Odgovornost culpa levis in concreto." },
      { id: "kj7y2p", question: "Tužbe za razvrgnuće slučajnih zajednica", answer: "Actio familiae erciscundae (sunasljednici), actio communi dividundo (suvlasnici), actio finium regundorum (susjedi – međe); actiones duplices i mixtae.", explanation: "Svaka strana je i tužitelj i tuženik." },
      { id: "s0f6q4", question: "Condictiones sine causa", answer: "Obveza povrata onoga što je netko stekao iz tuđe imovine bez pravne osnove; apstraktne tužbe (condictiones) za certum; kod Justinijana condictiones sine causa.", explanation: "Bezrazložno bogaćenje." },
      { id: "6jts03", question: "Condictio indebiti", answer: "Povrat onoga što je netko platio u ispričivoj zabludi da dug postoji, a dug ne postoji. Bez zablude – darovanje; ako primatelj zna da duga nema – krađa.", explanation: "Primatelj plaćanja nepostojećeg duga dužan je vratiti primljeno jer je stekao bez pravnog osnova." },
      { id: "zzwxq0", question: "Condictio ob causam datorum (causa data causa non secuta)", answer: "Povrat onoga što je dano radi budućeg događaja ili posla koji je izostao – npr. miraz dan, a brak nije sklopljen.", explanation: "I kod inominatnih ugovora." },
      { id: "9cc5ej", question: "Condictio ob turpem causam i ob iniustam causam", answer: "Povrat danog u nemoralnu svrhu ako je nemoralno samo primanje (ne i davanje); povrat danog protivno pravnoj zabrani. Ako su nemoralne obje strane – nema povrata.", explanation: "In pari turpitudine…" },
      { id: "gctuz9", question: "Condictio ob causam finitam", answer: "Povrat kad je pravna osnova postojala pri davanju, ali je kasnije otpala – npr. darovanje opozvano zbog nezahvalnosti.", explanation: "Naknadni otpadak kauze." },
      { id: "1sdo79", question: "Condictio furtiva", answer: "Tužba vlasnika protiv kradljivca na povrat stvari (ili vrijednosti) bez dokazivanja vlasništva; uz nju rei vindicatio i kaznena actio furti.", explanation: "Uvedena iz odbojnosti prema kradljivcima." },
      { id: "y83zbo", question: "Obligationes ex tutela i ex legato", answer: "Nakon tutorstva tutor polaže račun i naknađuje štetu (actio tutelae directa i contraria). Iz legata per damnationem nasljednik duguje legataru (actio certi / incerti ex testamento).", explanation: "Obveze iz drugih pravnih razloga." }
    ],
    quiz: [
      { id: "o1pezi", question: "Poslovodstvo bez naloga zove se:", options: ["negotiorum gestio", "mandatum", "communio incidens", "condictio indebiti"], correct: 0 },
      { id: "r8saum", question: "Što podrazumijeva condictio indebiti?", options: ["da je dug osiguran zalogom", "da je dug zastario", "da je dug naturalan", "da dug ne postoji"], correct: 3 },
      { id: "yx177g", question: "Ako je davatelj znao da duga nema, a ipak platio, riječ je o:", options: ["condictio indebiti", "darovanju", "krađi", "zajmu"], correct: 1 },
      { id: "3rtuf3", question: "Ako je primatelj znao da duga nema, a primio je plaćeno, to je:", options: ["krađa novca (furtum)", "darovanje (donatio)", "nagodba (transactio)", "prijeboj (compensatio)"], correct: 0 },
      { id: "nfn88x", question: "Dan je miraz, a brak nije sklopljen. Povrat se traži:", options: ["condictio indebiti (nedug)", "actio doli (prijevara)", "condictio furtiva (krađa)", "condictio ob causam datorum"], correct: 3 },
      { id: "4ukb9m", question: "Što je causa data causa non secuta?", options: ["dano bez ikakvog pravnog razloga", "dano radi svrhe koja nije uslijedila", "dano u nemoralnu svrhu primatelja", "dano u zabludi da postoji dug"], correct: 1 },
      { id: "98v3vh", question: "Slučajna zajednica među susjedima glede međa razvrgava se tužbom:", options: ["actio communi dividundo", "actio familiae erciscundae", "actio finium regundorum", "actio pro socio"], correct: 2 },
      { id: "zjr5r4", question: "Sudionici slučajne zajednice odgovaraju za:", options: ["samo dolus (zlu namjeru)", "custodia (čuvanje stvari)", "culpa levis in concreto", "višu silu (vis maior)"], correct: 2 },
      { id: "kvesyp", question: "Za negotiorum gestio bitno je da:", options: ["se obavlja tuđi posao korisno", "posao uspješno završi za vlasnika", "postoji pisani nalog vlasnika", "gestor bude plaćen za trud"], correct: 0 },
      { id: "zol7wy", question: "Ako je dano iz nemoralnih razloga, a nemoralno je i davanje, davatelj:", options: ["traži povrat kondikcijom", "tuži actio doli za naknadu", "dobiva dvostruku vrijednost", "ne može tražiti povrat danoga"], correct: 3 },
      { id: "6hp244", question: "Condictio furtiva služi:", options: ["kazni kradljivca četverostrukim iznosom", "povratu stvari ili vrijednosti od kradljivca", "zaštiti posjeda od smetanja kradljivca", "naknadi štete koju je počinila tuđa životinja"], correct: 1 },
      { id: "afbv8h", question: "Tutor nakon prestanka tutorstva odgovara tužbom:", options: ["actio tutelae directa", "actio mandati (iz naloga)", "actio pro socio (ortak)", "actio legis Aquiliae"], correct: 0 },
      { id: "wjmb3c", question: "Kvazikontrakti se od kontrakata razlikuju jer:", options: ["nisu utuživi pred sudom", "ih štiti samo pretor ediktom", "su po svojoj naravi delikti", "ne temelje se na sporazumu"], correct: 3 }
    ],
    fillBlanks: [],
    learn: {
      id: "k5mrf7",
      title: "Kvazikontrakti",
      content: `<p><strong>Kvazikontrakti</strong> (<em>obligationes quasi ex contractu</em>) su obvezni odnosi koji se, za razliku od kontrakata, <strong>ne temelje na sporazumu</strong>, ali su po učincima slični kontraktima jer iz njih nastaje civilna utuživa obveza. Pojam su stvorili Justinijanovi kompilatori (Gaj: ostale obveze iz dopuštenih djelovanja). Najvažniji su poslovodstvo bez naloga, slučajna zajednica i stjecanje bez osnove.</p>
<h3>Negotiorum gestio – poslovodstvo bez naloga</h3>
<ul>
<li><strong>Negotiorum gestor</strong> (poslovođa) po vlastitoj slobodnoj volji obavlja poslove druge osobe (<strong>dominus negotii</strong>) bez naloga i sporazuma. Sličan je nalogu, ali bez sporazuma; štićen najprije actio in factum (oko 2. st. pr. Kr.), od 1. st. i civilnom tužbom bonae fidei.</li>
<li>Obilježja: posao mora biti <strong>tuđ</strong>; mora biti obavljen <strong>korisno (utiliter)</strong> za gospodara; uspjeh se ne traži; besplatan je. Iznimno, i netuđi posao gospodar može naknadno odobriti (<strong>ratihabitio</strong>) pa gestor ima zaštitu.</li>
<li><strong>Odgovornost:</strong> položiti račun, predati sve stečeno, dovršiti započeti posao; odgovara za svaku krivnju (iznimno i custodia – npr. ako započne posao koji gospodar inače ne radi), a samo za dolus i culpa lata ako je spriječio neposrednu i nenadoknadivu štetu.</li>
<li><strong>Tužbe:</strong> <em>actio negotiorum gestorum directa</em> (gospodar) i <em>contraria</em> (gestor – naknada korisnih troškova). Kod Justinijana: <em>actio funeraria</em> – tko je sahranio pokojnika traži troškove od nasljednika.</li>
</ul>
<h3>Communio incidens – slučajna zajednica</h3>
<p>Odnos osoba koje su se bez ugovora (nasljeđivanjem, miješanjem stvari – commixtio, confusio) našle u položaju suvlasnika. Uz stvarnopravni odnos (<em>condominium</em>) nastaju i obveznopravni (<em>praestationes personales</em>): podjela troškova, plodova i koristi, naknada štete sudionicima i trećima, uvjeti razvrgnuća. Sličan je ortakluku. Sudionici odgovaraju za <strong>culpa levis in concreto</strong>.</p>
<ul>
<li><strong>actio familiae erciscundae</strong> – među sunasljednicima;</li>
<li><strong>actio communi dividundo</strong> – među suvlasnicima;</li>
<li><strong>actio finium regundorum</strong> – među susjedima (zajednica međa).</li>
</ul>
<p>To su <em>actiones duplices</em> (svaka je strana ujedno tužitelj i tuženik) i <em>actiones mixtae</em> (stvarnopravne i obveznopravne).</p>
<h3>Condictiones sine causa – stjecanje bez osnove</h3>
<p>Povećanje imovine iz tuđe imovine bez pravne osnove (ili kad je osnova otpala) stvara obvezu povrata. Pretor dopušta apstraktno formulirane tužbe – <strong>condictiones</strong> (bez navođenja pravnog razloga, na <em>certum</em>), kad tužitelj nema drugog sredstva. U klasici samo kad je došlo do prijenosa vlasništva (dare) – <em>condictio certae rei / certae pecuniae</em>; u postklasici i <em>condictio incerti</em>; kod Justinijana <em>condictiones sine causa</em>. Kondikcije su služile i za zajam, stipulaciju i literalne ugovore.</p>
<ul>
<li><strong>Condictio indebiti</strong> – plaćeno u ispričivoj zabludi da dug postoji. Ako davatelj zna da duga nema – darovanje; ako primatelj zna – krađa.</li>
<li><strong>Condictio ob causam datorum (causa data causa non secuta)</strong> – dano u očekivanju događaja ili posla koji je izostao (miraz bez braka).</li>
<li><strong>Condictio ob turpem causam</strong> – povrat danog u nemoralnu svrhu ako je nemoralno samo primanje; ako su nemoralne obje strane ili davatelj, stvar ostaje kod posjednika.</li>
<li><strong>Condictio ob iniustam causam</strong> – povrat danog protivno pravnoj zabrani.</li>
<li><strong>Condictio ob causam finitam</strong> – osnova je postojala, ali je otpala (darovanje opozvano zbog nezahvalnosti).</li>
<li><strong>Condictio furtiva</strong> – kradljivac ne postaje vlasnik, ali vlasnik od njega (ili suučesnika) kondikcijom traži stvar bez dokazivanja vlasništva (uvedena iz odbojnosti prema kradljivcima). Uz nju: <em>rei vindicatio</em> (povrat na temelju vlasništva) i kaznena <em>actio furti</em> (dvostruka ili četverostruka vrijednost, ne povrat).</li>
</ul>
<p>Pretor je uz kondikcije davao i <em>actio in factum</em> (npr. protiv onoga tko je prijevarno postigao akceptilaciju) do visine neopravdano stečenog.</p>
<h3>Ostale obveze iz dopuštenih djelovanja</h3>
<ul>
<li><strong>Obligationes ex tutela</strong> – nakon tutorstva tutor polaže račun o upravljanju i naknađuje štetu: <em>actio tutelae directa</em> (štićenik), <em>contraria</em> (tutor).</li>
<li><strong>Obligationes ex legato</strong> – iz legata nastaje dužnost nasljednika da ga ispuni: <em>actio certi ex testamento</em> (određena stvar), <em>actio incerti ex testamento</em> (neodređena).</li>
</ul>`
    }
  },
  delikti: {
    id: "bd5k9a",
    name: "Delikti i kvazidelikti",
    icon: "fa-user-ninja",
    color: "#0ea5e9",
    flashcards: [
      { id: "olo5py", question: "Delictum – pojam", answer: "Protupravno djelo iz kojeg, zbog povrede zaštićenih dobara, bez obzira na volju počinitelja nastaje obveza plaćanja novčane kazne oštećenome (jednostruke ili višestruke vrijednosti).", explanation: "Objektivna povreda + krivnja (dolus, kasnije culpa)." },
      { id: "860ca5", question: "Delicta publica i delicta privata", answer: "Publica (crimina) progoni država javnom kaznom u kaznenom postupku (perduellio, parricidium). Privata (maleficia) progoni oštećeni u civilnom postupku, kazna ide njemu.", explanation: "Furtum, rapina, damnum iniuria datum, iniuria." },
      { id: "rrsjwy", question: "Obilježja deliktnih obveza", answer: "Pasivno nenasljedive (smrću počinitelja se gase), aktivno nasljedive (osim actiones vindictam spirantes), kumulativne, noksalne, ne prestaju capitis deminutio, kraći rokovi.", explanation: "Prestaju i običnim paktom (furtum, iniuria)." },
      { id: "hbo0gi", question: "Nulla poena sine lege, nullum crimen sine lege", answer: "„Nema kazne bez zakona, nema kaznenog djela bez zakona“ – načelo zakonitosti kažnjavanja.", explanation: "Regula iz popisa dicta et regulae iuris." },
      { id: "57408y", question: "Furtum (krađa)", answer: "Zlonamjerno (dolozno) oduzimanje tuđe stvari radi protupravne koristi, u širokom smislu (i furtum usus); tužbu ima svatko tko ima interes da stvar ne bude oduzeta.", explanation: "Actio furti – kaznena, infamija." },
      { id: "0vtoci", question: "Vrste krađe", answer: "Furtum manifestum (uhvaćen na djelu), nec manifestum (obična), conceptum (stvar nađena neformalnom pretragom), prohibitum (opiranje svečanoj pretrazi), oblatum (stvar podmetnuta u tuđu kuću).", explanation: "Podjela se temelji na načinu na koji je kradljivac otkriven i stvar pronađena." },
      { id: "vnwfh6", question: "Kazne za krađu", answer: "Manifestum: po XII ploča predaja okradenome (addictio), po pretoru četverostruko; nec manifestum dvostruko; conceptum i oblatum trostruko; prohibitum četverostruko.", explanation: "Kazne su privatne i pripadaju okradenome, a ne državi." },
      { id: "cyrajg", question: "Rapina (razbojnička krađa)", answer: "Nasilno oduzimanje tuđe stvari; pretorska actio vi bonorum raptorum: u roku od godine četverostruka vrijednost, nakon toga jednostruka.", explanation: "Kvalificirani oblik krađe." },
      { id: "xyve48", question: "Damnum iniuria datum", answer: "Protupravno oštećenje tuđe stvari; jedinstveno uređeno Lex Aquilia (287./286. pr. Kr.); šteta nanesena tijelom na tijelo (damnum corpore corpori datum).", explanation: "Actio legis Aquiliae – vlasnik stvari." },
      { id: "qpcjvz", question: "Tri glave Lex Aquilia", answer: "1. ubijanje tuđeg roba ili četveronožne životinje – najviša vrijednost u zadnjoj godini; 2. adstipulator koji akceptilacijom oprosti dug; 3. ostala oštećenja – vrijednost u zadnjih 30 dana.", explanation: "Zakon uređuje odgovornost za protupravno prouzročenu štetu na tuđoj imovini (damnum iniuria datum)." },
      { id: "mwckid", question: "Iniuria", answer: "Namjerna povreda tuđe osobnosti – realna (tjelesna) i verbalna (čast); actio iniuriarum aestimatoria, kaznu po slobodnoj ocjeni određuju rekuperatori; osobna tužba, infamija.", explanation: "Actio vindictam spirans." },
      { id: "wgvz36", question: "Iniuria po Zakoniku XII ploča", answer: "Za uništenje organa talion (ako nema nagodbe), za slomljenu kost slobodnog 300 asa, roba 150 asa, za ostale ozljede 25 asa.", explanation: "Kasnije novčana kazna po ocjeni." },
      { id: "c2sn3p", question: "Volenti non fit iniuria", answer: "„Onome tko pristaje ne čini se nepravda“ – pristanak oštećenoga isključuje protupravnost.", explanation: "Regula uz deliktnu odgovornost." },
      { id: "eoacan", question: "Delikti pretorskog prava", answer: "Dolus (prijevara), metus (zastrašivanje), alienatio in fraudem creditorum (otuđenje na štetu vjerovnika); uz njih i vis.", explanation: "Pretor je te delikte uveo svojim ediktom jer ih civilno pravo nije poznavalo." },
      { id: "wjq6x0", question: "Actio doli (de dolo)", answer: "Uveo Akvilije Gal (1. st. pr. Kr.): supsidijarna penalna tužba na jednostruku štetu u roku od godine, s arbitrarnom klauzulom; osuda – infamija.", explanation: "Uz exceptio doli i restitutio." },
      { id: "r835pj", question: "Actio quod metus causa", answer: "Pretor Oktavije (oko 80. pr. Kr.): u roku od godine četverostruka vrijednost, kasnije jednostruka; i protiv trećeg koji ima korist; bez infamije; restitutorna klauzula.", explanation: "Uz exceptio metus i restitutio." },
      { id: "6iol4a", question: "Alienatio in fraudem creditorum", answer: "Dužnik otuđuje imovinu da izigra vjerovnike; edictum fraudatorium, restitutio in integrum i (Justinijan) actio Pauliana – u roku od godine, na vraćanje obogaćenja.", explanation: "Moguće tek uz imovinsku ovrhu." },
      { id: "6smb4a", question: "Kvazidelikti", answer: "Pretorski delikti pojačane odgovornosti koje Justinijan izdvaja: iudex qui litem suam fecit, actio de effusis vel deiectis, actio de positis vel suspensis, odgovornost brodara i gostioničara.", explanation: "Kod njih se često odgovara za štetu koja potječe iz kuće ili s plovila, a ne nužno za vlastiti čin." },
      { id: "zz1tbv", question: "Iudex qui litem suam fecit", answer: "Sudac koji zlonamjerno ili nemarno donese nepravilnu presudu ili je ne donese na vrijeme „učini spor svojim“ i osobno naknađuje štetu stranci.", explanation: "Nije bilo žalbe." },
      { id: "oas2c5", question: "Actio de effusis vel deiectis", answer: "Protiv stanara (vlasnika ili zakupca) stana iz kojeg je nešto izliveno ili izbačeno na ulicu pa je nastala šteta – dvostruki iznos štete.", explanation: "Odgovornost bez krivnje." },
      { id: "pvavbq", question: "Actio de positis vel suspensis", answer: "Protiv vlasnika ili zakupca kuće na kojoj je prema ulici nešto postavljeno ili obješeno što može pasti; tužbu može podići svatko – kažnjava se opasnost.", explanation: "Popularna tužba." },
      { id: "ecyhrs", question: "Odgovornost brodara, gostioničara i vlasnika staja", answer: "Odgovaraju za krađu i oštećenje stvari putnika koje počine njihovi ljudi (culpa in eligendo), ne i slučajni prolaznik.", explanation: "Uz receptum nautarum." }
    ],
    quiz: [
      { id: "57rnnx", question: "Kakva je kazna za furtum nec manifestum?", options: ["jednostruka", "dvostruka", "trostruka", "talion"], correct: 1 },
      { id: "aipb0x", question: "Furtum oblatum kažnjava se:", options: ["jednostruko", "dvostruko", "trostruko", "četverostruko"], correct: 2 },
      { id: "c12gqh", question: "Furtum conceptum kažnjava se:", options: ["dvostruko", "četverostruko", "trostruko", "talionom"], correct: 2 },
      { id: "xe079e", question: "Što vrijedi za rapinu?", options: ["u godini četverostruko, zatim jednostruko", "u godini jednostruko, zatim dvostruko", "150 asa za svakog okradenog roba", "uvijek dvostruka vrijednost stvari"], correct: 0 },
      { id: "p9k03q", question: "Kvazidelikti su:", options: ["furtum, rapina, iniuria i damnum iniuria datum", "dolus, metus, alienatio in fraudem creditorum", "negotiorum gestio, communio incidens, indebiti solutio", "iudex qui litem suam fecit, de effusis, de positis"], correct: 3 },
      { id: "zsjyhv", question: "Delikti pretorskog prava su:", options: ["furtum, rapina i iniuria", "dolus, metus, alienatio in fraudem", "iniuria i damnum iniuria datum", "parricidium i perduellio"], correct: 1 },
      { id: "t3p2nb", question: "Što je metus?", options: ["delikt", "konsenzualni kontrakt", "inominatni kontrakt", "uzgredni sastojak posla"], correct: 0 },
      { id: "ealoir", question: "3. glava Lex Aquilia određuje za ostala oštećenja vrijednost stvari u zadnjih:", options: ["godinu dana", "100 dana", "6 mjeseci", "30 dana"], correct: 3 },
      { id: "e095cp", question: "Za ubijanje tuđeg roba po Lex Aquilia plaća se:", options: ["vrijednost u zadnjih 30 dana", "najviša vrijednost u zadnjoj godini", "dvostruka vrijednost roba", "fiksni iznos od 150 asa"], correct: 1 },
      { id: "pun83a", question: "Za slomljenu kost roba po XII ploča plaćalo se:", options: ["300 asa", "25 asa", "150 asa", "talion"], correct: 2 },
      { id: "ruw9sx", question: "Actio doli bila je:", options: ["civilna, aktivno i pasivno nasljediva", "četverostruka i bez vremenskog roka", "supsidijarna, jednostruko, godinu dana", "stvarnopravna tužba protiv svakoga"], correct: 2 },
      { id: "xzo2ez", question: "Actio quod metus causa u roku od godine ide na:", options: ["četverostruko", "dvostruko", "trostruko", "jednostruko"], correct: 0 },
      { id: "q3deh6", question: "Deliktna odgovornost na pasivnoj strani:", options: ["prelazi na nasljednike", "dijeli se među supočiniteljima", "prestaje capitis deminutio", "gasi se smrću počinitelja"], correct: 3 },
      { id: "p2fu8z", question: "Više supočinitelja delikta odgovara:", options: ["razdijeljeno, svaki svoj dio", "kumulativno – svaki cijelu kaznu", "elektivno – plaća onaj koga izabere", "supsidijarno, najprije glavni"], correct: 1 },
      { id: "g2il5y", question: "Actio Pauliana služi:", options: ["pobijanju dužnikovih otuđenja", "naknadi štete od tuđe životinje", "zaštiti posjeda nekretnina", "povratu neisplaćenog zajma"], correct: 0 },
      { id: "a2kv83", question: "Vrste krađe u starom civilnom pravu su:", options: ["parricidium, perduellio i homicidium", "rapina, dolus, metus i vis", "furtum usus i furtum possessionis", "manifestum, nec manifestum, conceptum…"], correct: 3 },
      { id: "wvqba5", question: "Tko može podići actio de positis vel suspensis?", options: ["samo vlasnik kuće", "svatko", "samo ozlijeđeni", "samo pretor"], correct: 1 },
      { id: "sewht6", question: "Damnum iniuria datum uređuje:", options: ["Lex Cincia", "Lex Poetelia Papiria", "Lex Aquilia", "Lex Falcidia"], correct: 2 },
      { id: "i0sx5x", question: "„Volenti non fit iniuria“ znači:", options: ["nikoga se ne sili na djelovanje", "tko šuti, smatra se da pristaje", "onome tko pristaje ne čini se nepravda", "nema kazne ni djela bez zakona"], correct: 2 },
      { id: "9srfdx", question: "Iniuria je kao tužba:", options: ["strogo osobna (vindictam spirans)", "aktivno i pasivno nasljediva", "stvarnopravna", "supsidijarna"], correct: 0 },
      { id: "1tvidu", question: "Sudac koji namjerno donese nepravilnu presudu odgovara kao:", options: ["mandatar koji je prekoračio nalog", "fur manifestus (očiti kradljivac)", "negotiorum gestor bez naloga", "iudex qui litem suam fecit"], correct: 3 },
      { id: "jozkhm", question: "„Nulla poena sine lege“ izražava načelo:", options: ["slobode ugovaranja", "zakonitosti kažnjavanja", "zabrane taliona", "kumulativne odgovornosti"], correct: 1 }
    ],
    fillBlanks: [],
    learn: {
      id: "6yrli2",
      title: "Delikti i kvazidelikti",
      content: `<h3>Pojam</h3>
<p><strong>Delicta</strong> su protupravna djela na temelju kojih, zbog povrede pravno zaštićenih dobara, nastaje obveza počinitelja – neovisno o njegovoj volji – na plaćanje novčane kazne oštećenome (u jednostrukom ili višestrukom iznosu vrijednosti povrijeđenog dobra), kasnije naknade štete. Za obvezu se traži objektivna protupravna povreda i subjektivna krivnja (namjera – <em>dolus</em>, kasnije i <em>culpa</em>). Sadržaj: osobna zadovoljština, kazna, naknada štete.</p>
<ul>
<li><strong>Delicta publica (crimina)</strong> – teža djela koja država progoni javnom kaznom (<em>poena publica</em>) u kaznenom postupku bez obzira na volju oštećenog: <em>perduellio</em> (izdaja), <em>parricidium</em> (ubojstvo oca obitelji), ubojstvo.</li>
<li><strong>Delicta privata (maleficia)</strong> – progoni ih oštećeni u redovnom civilnom postupku, kazna ide njemu; civilna (iz XII ploča) i pretorska.</li>
</ul>
<p><em>Nulla poena sine lege, nullum crimen sine lege</em> – „Nema kazne bez zakona, nema kaznenog djela bez zakona“ (načelo zakonitosti). <em>Volenti non fit iniuria</em> – „Onome tko pristaje ne čini se nepravda“.</p>
<h4>Obilježja deliktnih obveza</h4>
<ul>
<li>pasivno <strong>nenasljedive</strong> – smrću počinitelja zahtjev se gasi (nasljednik odgovara samo za stečenu korist); aktivno <strong>nasljedive</strong> – osim <em>actiones vindictam spirantes</em> (strogo osobne, npr. iniuria);</li>
<li><strong>kumulativne</strong> – svaki supočinitelj plaća cijelu kaznu;</li>
<li><strong>noksalne</strong> – za osobe u vlasti odgovara imalac vlasti (<em>noxa caput sequitur</em>);</li>
<li>ne prestaju capitis deminutio (odgovornost prati osobu); ne vrijede među članovima iste obitelji; kraći rokovi; kod furtuma i iniurije prestaju i neformalnim paktom.</li>
</ul>

<h3>Delikti civilnog prava</h3>
<h4>Furtum – krađa</h4>
<p>Zlonamjerno (dolozno) oduzimanje tuđe stvari u najširem smislu (i <em>furtum usus</em> – zloupotreba uporabe). Tužbu ima ne samo vlasnik, nego svatko tko ima interes (založni vjerovnik, posudovnik).</p>
<table>
<tr><th>Vrsta</th><th>Sadržaj</th><th>Kazna</th></tr>
<tr><td><strong>furtum manifestum</strong></td><td>kradljivac uhvaćen na djelu</td><td>XII ploča: dodjela okradenom (strogo postupanje, praktički ropstvo); pretor: četverostruko</td></tr>
<tr><td><strong>furtum nec manifestum</strong></td><td>obična krađa</td><td>dvostruko</td></tr>
<tr><td><strong>furtum conceptum</strong></td><td>stvar nađena u kući neformalnom pretragom</td><td>trostruko</td></tr>
<tr><td><strong>furtum oblatum</strong></td><td>stvar podmetnuta u tuđu kuću i ondje nađena</td><td>trostruko (protiv podmetača)</td></tr>
<tr><td><strong>furtum prohibitum</strong></td><td>opiranje svečanoj pretrazi (stvar nađena pri svečanoj pretrazi)</td><td>strogo kao manifestum; pretor četverostruko</td></tr>
</table>
<p><strong>Actio furti</strong> – kaznena tužba (dvostruko ili četverostruko), trajna, uvijek povlači infamiju, pasivno nenasljediva; ne vraća stvar. Za povrat: <em>rei vindicatio</em> i <em>condictio furtiva</em>.</p>
<h4>Rapina – razbojnička krađa</h4>
<p>Nasilno oduzimanje tuđe stvari – kvalificirani oblik krađe (do kraja republike dio furtuma). Pretorska <strong>actio vi bonorum raptorum</strong>: u roku od <strong>godine četverostruko</strong>, nakon toga <strong>jednostruko</strong>; mogu je podići i drugi zainteresirani. Kod Justinijana actio mixta (jednostruki povrat + trostruka kazna); kod pobune ili nemira dvostruko u godini.</p>
<h4>Damnum iniuria datum – protupravno oštećenje stvari</h4>
<p>Pojedine oblike uređuje već XII ploča, a cjelovito <strong>Lex Aquilia</strong> (287./286. pr. Kr.): šteta mora biti nanesena aktivno i neposredno – <em>damnum corpore corpori datum</em> (tijelom na tijelo); izvorno za spaljivanje, lomljenje, uništenje (<em>usserit, fregerit, ruperit</em>), u klasici prošireno na svako oštećenje; Gaj u pojam iniuria uključuje i culpa.</p>
<ol>
<li>glava: protupravno ubijanje tuđeg <strong>roba ili četveronožne životinje</strong> (stoke) – <strong>najviša vrijednost u zadnjoj godini</strong>;</li>
<li>glava: <strong>adstipulator</strong> koji akceptilacijom na štetu glavnog vjerovnika oprosti dug – iznos oproštenog duga;</li>
<li>glava: sva ostala oštećenja tuđih stvari – <strong>vrijednost u zadnjih 30 dana</strong>.</li>
</ol>
<p>Tužba: <strong>actio legis Aquiliae</strong> (vlasnik uništene ili oštećene stvari). Za delikte osoba u vlasti noksalno odgovara imalac vlasti u času tužbe (noxae deditio – mancipacijom); slično vlasnik četveronožne životinje za štetu koju ona počini (plaća ili predaje životinju).</p>
<h4>Iniuria – povreda osobnosti</h4>
<p>Namjerna povreda tuđe osobnosti (napad na osobu, ne imovinu): <strong>realna</strong> (tjelesna) i <strong>verbalna</strong> (čast). Po <strong>XII ploča</strong>: za uništenje organa <strong>talion</strong> ako nema nagodbe; slomljena kost slobodnog <strong>300 asa</strong>, roba <strong>150 asa</strong>; ostale ozljede <strong>25 asa</strong>. U klasici pojam obuhvaća svaku fizičku i moralnu povredu; pretorska <strong>actio iniuriarum aestimatoria</strong> – visinu kazne po slobodnoj ocjeni određuju suci <em>recuperatores</em>; strogo osobna (aktivno i pasivno nenasljediva prema većini), kumulativna, rok 1 godina, infamija.</p>

<h3>Delikti pretorskog prava</h3>
<ul>
<li><strong>Dolus</strong> – namjerno djelo radi oštećenja drugoga u imovini (prijevara, kasnije svako zlonamjerno postupanje; kod iudicia bonae fidei odgovornost za dolus podrazumijeva se i ne treba je ugovarati, kod stricti iuris samo uz stipulaciju – <em>clausula doli</em>). <strong>Actio de dolo</strong> (Akvilije Gal, 1. st. pr. Kr.): penalna, na jednostruku štetu, u roku od <strong>godine</strong>, <strong>supsidijarna</strong> (samo kad nema druge tužbe), s arbitrarnom klauzulom (povratom se izbjegava osuda), infamija, osobna. Uz nju <em>exceptio doli</em> i <em>restitutio in integrum ob dolum</em>.</li>
<li><strong>Metus</strong> – prisila protupravnom silom ili prijetnjom na posao ili drugo djelo na štetu vlastite imovine. <strong>Actio quod metus causa</strong> (pretor Oktavije, oko 80. pr. Kr.): u roku od godine <strong>četverostruko</strong>, poslije jednostruko (povrat obogaćenja); i protiv trećega koji ima korist, čak i bona fide; bez infamije; restitutorna klauzula; kumulativna. Uz nju <em>exceptio metus</em> i <em>restitutio in integrum ob metum</em>.</li>
<li><strong>Alienatio in fraudem creditorum</strong> – dužnik otuđuje imovinu da izigra vjerovnike (moguće tek kad imovinska ovrha zamijeni osobnu). Sredstva: <em>edictum fraudatorium</em>, <em>restitutio in integrum</em> (za upravitelja imovine), kod Justinijana <strong>actio Pauliana</strong> – pobijanje svakog otuđenja na štetu vjerovnika, u roku od godine, na vraćanje obogaćenja, i protiv trećih koji su znali.</li>
</ul>

<h3>Kvazidelikti (obligationes quasi ex delicto)</h3>
<p>Kažnjiva djela koja je pretor progonio <em>actiones in factum</em>, a Justinijanovi kompilatori svrstali u posebnu skupinu (radi simetrije kvadriparticije – nema namjere ili posljedice, pa nisu pravi delikti; delikti pojačane odgovornosti):</p>
<ul>
<li><strong>Iudex qui litem suam fecit</strong> – sudac (<em>iudex privatus</em>) koji ne donese presudu na vrijeme ili zlonamjerno ili nemarno presudi na štetu stranke „učini spor svojim“ (nije bilo žalbe) i osobno odgovara stranci (actio in factum, na dvostruki iznos štete).</li>
<li><strong>Actio de effusis vel deiectis</strong> – protiv imaoca stana (vlasnika ili stanara) iz kojeg je nešto izliveno ili izbačeno na ulicu – <strong>dvostruki</strong> iznos štete.</li>
<li><strong>Actio de positis vel suspensis</strong> – protiv vlasnika ili zakupca kuće na kojoj je prema ulici nešto postavljeno ili obješeno što može pasti; kažnjava se <strong>opasnost</strong>, tužbu može podići <strong>svatko</strong>; ako stvar padne i ozlijedi – actio legis Aquiliae.</li>
<li><strong>Actio furti et damni adversus nautas, caupones et stabularios</strong> – brodari, gostioničari i vlasnici staja odgovaraju za krađu i štetu na stvarima putnika koje počine njihovi ljudi (<em>culpa in eligendo</em>), ne slučajni prolaznici; uz to i po paktu receptum.</li>
</ul>`
    }
  },

  postupak: {
    id: "kwiy4j",
    name: "Postupovno pravo: legisakcije, formularni i kognicijski postupak",
    icon: "fa-gavel",
    color: "#f97316",
    flashcards: [
      { id: "s2crjh", question: "Tri tipa rimskog civilnog postupka", answer: "Legisakcijski (staro civilno pravo), formularni (pretklasika i klasika) i kognicijski (postklasika, kao izvanredni od Augusta).", explanation: "Gajev ius quod ad actiones pertinet." },
      { id: "i58xab", question: "Dvodioba postupka", answer: "U legisakcijskom i formularnom postupku: in iure (pred magistratom – stranke, predmet, sudac, formula) i apud iudicem (pred privatnim sucem – dokazi i presuda).", explanation: "U kognicijskom nestaje." },
      { id: "w3vpmu", question: "In ius vocatio", answer: "Tužitelj sam poziva tuženog pred magistrata; ako ne dođe, smije ga dovesti silom (manus iniectio) ili tuženi daje vindeksa; u formularnom pretor kažnjava neodazivanje.", explanation: "XII ploča: si in ius vocat, ito." },
      { id: "elo45q", question: "Legis actiones – pet oblika (Gaj)", answer: "Sacramento (in rem i in personam), per iudicis postulationem, per condictionem – za utvrđivanje prava; per manus iniectionem i per pignoris capionem – za ovrhu.", explanation: "Formalističke usmene izjave i kretnje." },
      { id: "ufopm6", question: "Legisactio sacramento in rem", answer: "Obje stranke vindiciraju stvar štapićem (vindicta) i izazivaju se okladom (sacramentum 50 ili 500 asa); sudac odlučuje o okladi, a time i o pravu; pretor daje privremeni posjed uz jamce.", explanation: "Mittite ambo hominem." },
      { id: "5wi81p", question: "Legisactio per manus iniectionem", answer: "Ovrha na osobi: nakon 30 dana od priznanja ili presude tužitelj hvata tuženog; bez vindeksa – odvodi ga kući, a nakon tri sajma prodaje preko Tibera ili ubija.", explanation: "Za razliku od sacramenta, nije služila utvrđivanju spornog prava, nego ovrsi već utvrđene tražbine." },
      { id: "zeo2lt", question: "Legisactio per pignoris capionem", answer: "Ovrha na stvarima: vjerovnik (u određenim slučajevima) oduzima dužnikovu stvar kao zalog.", explanation: "Uz manus iniectio." },
      { id: "z4mekx", question: "Formularni postupak – nastanak", answer: "Vjerojatno ga je uveo praetor peregrinus (od 242. pr. Kr.); Lex Aebutia (2. st. pr. Kr.) ga širi na Rimljane, a August (17. pr. Kr.) ukida legisakcije.", explanation: "Formula – pisani program za suca." },
      { id: "y3hhtf", question: "Litis contestatio", answer: "Završetak faze in iure kad se stranke suglase s formulom; posljedica – o istoj stvari ne smije se ponovno tužiti (bis de eadem re agere non licet) i novacija tražbine.", explanation: "U kognicijskom – odgovor tuženog na tužbu." },
      { id: "uwzfi8", question: "Dijelovi formule", answer: "Intentio (zahtjev), demonstratio (opis činjenica kod incertum), condemnatio (osuda ili oslobađanje), adiudicatio (dioba), exceptio (prigovor), praescriptio; uz to arbitrarna klauzula.", explanation: "Demonstratio, intentio, adiudicatio i condemnatio su glavni dijelovi, a exceptio i praescriptio dodaju se po potrebi." },
      { id: "ws2voc", question: "Intentio certa i incerta", answer: "Certa – zahtjev za točno određeni iznos ili stvar (decem milia); incerta – „quidquid… dare facere oportet“; kondemnacija prati intenciju.", explanation: "Kod incerta – demonstratio." },
      { id: "22uvxx", question: "Aulus Agerius i Numerius Negidius", answer: "Tipična imena u formulama: AA – tužitelj, NN – tuženik.", explanation: "Kao „X i Y“." },
      { id: "7f1nv2", question: "Formula condictio certae pecuniae (zajam)", answer: "„Si paret NN AA sestertium decem milia dare oportere, iudex NN AA sestertium decem milia condemnato, si non paret, absolvito.“ – civilna (dare oportere), certa.", explanation: "Bez demonstratio." },
      { id: "26xkm1", question: "Formula actio venditi", answer: "„Quod AA NN hominem quo de agitur vendidit (demonstratio), quidquid ob eam rem NN AA dare facere oportet ex fide bona (intentio incerta), eius iudex NN condemna, si non paret, absolve.“", explanation: "Bonae fidei, incerta." },
      { id: "hpna4u", question: "Formula actio depositi (in factum)", answer: "„Si paret AA apud NN mensam argenteam deposuisse eamque dolo malo NN AA redditam non esse, quanti ea res erit…“ – opis činjenica (in factum concepta).", explanation: "Odgovornost depozitara za dolus." },
      { id: "fh5ni9", question: "Formula kod prejudicijalnih tužbi", answer: "Samo intentio, bez kondemnacije: „An Stichus Auli Agerii libertus sit?“ – je li Stih oslobođenik Aula Agerija.", explanation: "Tužba na utvrđenje." },
      { id: "qlzehn", question: "Actio ex stipulatu s exceptio metus", answer: "„Quod AA de NN incertum stipulatus est, quidquid… dare facere oportet, si in ea re nihil metus causa factum est, eius iudex… condemna…“ – exceptio metus u formuli.", explanation: "Incerta." },
      { id: "hb92ai", question: "Actiones in ius i in factum conceptae; actiones utiles, ficticiae", answer: "In ius – intentio se poziva na civilno pravo (oportere); in factum – opis činjenica kad nema ediktne formule; utiles – prilagođena ediktna formula; ficticiae – s fikcijom (Publiciana).", explanation: "Pretorske prilagodbe." },
      { id: "3ktla7", question: "Postupak apud iudicem", answer: "Suca biraju stranke (album iudicum, ždrijeb); posebni suci recuperatores i centumviri; sudac vezan formulom slobodno ocjenjuje dokaze uz consilium; presuda konačna, glasi na novac.", explanation: "Formalna i materijalna pravomoćnost." },
      { id: "nhgnxv", question: "Ovrha u formularnom postupku", answer: "Ako dužnik ne ispuni presudu u 30 dana – actio iudicati (litiskrescencija na dvostruko); missio in bona, infamija, magister bonorum prodaje imovinu (venditio bonorum) bonorum emptoru; cessio bonorum.", explanation: "Imovinska ovrha potiskuje osobnu." },
      { id: "2iegp6", question: "Posebna pretorska sredstva", answer: "Interdikti (brzi nalozi i zabrane), restitutio in integrum, missio in bona / in possessionem, stipulationes praetoriae.", explanation: "Izvan redovnog postupka." },
      { id: "3osluc", question: "Kognicijski postupak", answer: "Cijeli postupak pred državnim činovnikom (sucem), bez dvodiobe; od 342. formule zabranjene; tužba (libellus) dostavlja sud; dokazna pravila; presuda ne mora glasiti na novac; žalba (appellatio).", explanation: "Od 3. st. potiskuje formularni." },
      { id: "5gke17", question: "Iura novit curia", answer: "„Sud poznaje pravo“ – stranke dokazuju činjenice, a pravo poznaje i primjenjuje sud.", explanation: "Regula postupka." },
      { id: "489kix", question: "Actore non probante, reus absolvitur", answer: "„Ako tužitelj ne dokaže, tuženi se oslobađa“ – teret dokazivanja je na tužitelju (actori incumbit probatio).", explanation: "Regula o teretu dokaza." },
      { id: "djq707", question: "Reus excipiendo fit actor", answer: "„Tuženi postaje tužiteljem davanjem prigovora“ – tko ističe exceptio, mora dokazati okolnosti na kojima se temelji (stranke se ne mijenjaju).", explanation: "Dokazivanje prigovora." },
      { id: "wy61ou", question: "Ne eat iudex ultra petita partium", answer: "„Neka sudac ne dosuđuje više od onoga što stranka traži.“", explanation: "Vezanost suca zahtjevom." },
      { id: "hb1iv1", question: "Res iudicata pro veritate accipitur", answer: "„Pravomoćno presuđena stvar drži se istinitom.“", explanation: "Uz bis de eadem re agere non licet." },
      { id: "y5apy3", question: "Actor sequitur forum rei", answer: "„Tužitelj slijedi sud nadležan za tuženika“ – tuži se pred sudom tuženikova prebivališta.", explanation: "Mjesna nadležnost." },
      { id: "1rt634", question: "Testis unus, testis nullus", answer: "„Jedan svjedok – nijedan svjedok“: u kognicijskom postupku od 4. st. iskaz samo jednog svjedoka nije dovoljan dokaz.", explanation: "Dokazna pravila." },
      { id: "g4q45h", question: "Negativa non probantur", answer: "„Ono što se niječe ne treba dokazivati“ – dokazuje onaj tko tvrdi.", explanation: "Uz actori incumbit probatio." },
      { id: "unqu1e", question: "De minimis non curat praetor", answer: "„Pretor se ne bavi sitnicama“ – za beznačajne stvari ne daje se pravna zaštita.", explanation: "Regula iz popisa dicta." },
      { id: "rfm2wv", question: "Arbitrarna klauzula", answer: "Dio formule (npr. kod rei vindicatio, actio doli) kojim se tuženika poziva da dobrovoljno vrati stvar ili uspostavi prijašnje stanje; tako izbjegava osudu.", explanation: "Formula arbitraria." },
      { id: "q3sklc", question: "Exceptio", answer: "Prigovor tuženika unesen u formulu – okolnost koja se protivi tužiteljevu zahtjevu iako je zahtjev civilno osnovan (exceptio doli, metus, rei venditae ac traditae, pacti).", explanation: "Ope exceptionis." }
    ],
    quiz: [
      { id: "vku4zo", question: "Koja legisakcija služi za ovrhu?", options: ["legisactio per manus iniectionem", "legisactio per iudicis postulationem", "legisactio sacramento in rem", "legisactio per condictionem"], correct: 0 },
      { id: "5h1gmy", question: "Legisakcije za izvršenje su:", options: ["sve legisakcije bez razlike", "sacramento i per condictionem", "per iudicis postulationem i sacramento", "per manus iniectionem i pignoris capionem"], correct: 3 },
      { id: "ddf2fd", question: "Iz formule actio venditi riječ „quidquid“ pokazuje da je intentio:", options: ["certa", "incerta", "fikcija", "exceptio"], correct: 1 },
      { id: "gov55q", question: "Dio formule koji opisuje činjenično stanje kod intentio incerta jest:", options: ["condemnatio", "adiudicatio", "demonstratio", "praescriptio"], correct: 2 },
      { id: "iuz595", question: "Ovlast suca da u diobnoj parnici dodijeli vlasništvo daje:", options: ["exceptio", "intentio", "adiudicatio", "condemnatio"], correct: 2 },
      { id: "ld4f5e", question: "Formula kod prejudicijalnih tužbi sadrži:", options: ["samo intentio", "samo condemnatio", "intentio i condemnatio", "exceptio i adiudicatio"], correct: 0 },
      { id: "a2799w", question: "Koja je formula za actio Publiciana karakteristična?", options: ["formula s adiudicatio", "formula in factum concepta", "formula bez intencije", "formula s fikcijom"], correct: 3 },
      { id: "k1hmpv", question: "Formularni postupak je, prema pretpostavci, uveo:", options: ["praetor urbanus", "praetor peregrinus", "Justinijan", "Dioklecijan"], correct: 1 },
      { id: "j3pyik", question: "Legisakcije je ukinuo:", options: ["August", "Lex Aebutia", "Hadrijan", "Konstantin"], correct: 0 },
      { id: "1q6vqn", question: "Posljedica litiskontestacije u formularnom postupku jest:", options: ["mogućnost ponovne tužbe o istom zahtjevu", "infamija tuženika sve do presude", "prijenos posjeda sporne stvari na tužitelja", "zabrana ponovne tužbe o istoj stvari"], correct: 3 },
      { id: "gx4yva", question: "Formule su izričito zabranjene:", options: ["17. pr. Kr.", "342.", "130.", "533."], correct: 1 },
      { id: "7t80kv", question: "U kognicijskom postupku:", options: ["postoji dvodioba in iure / apud iudicem", "presuda mora glasiti na novac", "dopušten je priziv (appellatio)", "tužitelj sam poziva tuženika silom"], correct: 2 },
      { id: "ubl776", question: "„Iura novit curia“ znači:", options: ["tuženi postaje tužitelj", "tužitelj dokazuje", "sud poznaje pravo", "presuda se drži istinom"], correct: 2 },
      { id: "ojqh0u", question: "„Reus excipiendo fit actor“ znači:", options: ["tuženi dokazuje okolnosti svog prigovora", "tuženi postaje tužitelj u novom sporu", "stranke trajno zamjenjuju uloge", "tuženi se oslobađa bez dokaza"], correct: 0 },
      { id: "grayrk", question: "„Actore non probante, reus absolvitur“ odnosi se na:", options: ["dokazivanje iskazom jednog svjedoka", "mjesnu nadležnost suda za tuženika", "pravomoćnost presude među strankama", "teret dokazivanja na tužitelju"], correct: 3 },
      { id: "5hr4z8", question: "„Testis unus, testis nullus“ znači:", options: ["svjedok je obvezan doći", "jedan svjedok nije dovoljan", "svjedok ne smije biti stranka", "svjedok mora biti rimski građanin"], correct: 1 },
      { id: "frq35q", question: "„Actor sequitur forum rei“ znači:", options: ["tužitelj tuži pred sudom tuženika", "tuženi bira suca", "sudac slijedi tužitelja", "spor se vodi gdje je stvar"], correct: 0 },
      { id: "v1d61w", question: "Ako dužnik ne ispuni presudu u 30 dana, vjerovnik u formularnom postupku podiže:", options: ["actio pro socio", "actio doli", "rei vindicatio", "actio iudicati"], correct: 3 },
      { id: "w9gjwm", question: "Upravitelja imovine prezaduženog dužnika biraju vjerovnici i zove se:", options: ["bonorum emptor", "magister bonorum", "curator ventris", "libripens"], correct: 1 },
      { id: "88bij0", question: "Dobrovoljno ustupanje sve imovine vjerovnicima bez krivnje dužnika jest:", options: ["missio in bona", "venditio bonorum", "cessio bonorum", "pignoris capio"], correct: 2 },
      { id: "a7pebz", question: "U legisactio sacramento in rem štapić (vindicta) simbolizira:", options: ["zakletvu stranaka", "vagu i mjerenje bronce", "koplje – vlasništvo", "ropstvo (servitus)"], correct: 2 },
      { id: "2dbohl", question: "„Ne eat iudex ultra petita partium“ znači:", options: ["sudac ne dosuđuje više od traženog", "sudac sudi samo jednom", "sudac ne sudi u svojoj stvari", "sudac mora presuditi u roku"], correct: 0 },
      { id: "7i8mrl", question: "„Res iudicata pro veritate accipitur“ znači:", options: ["presuda vrijedi samo za tuženika", "presuda se uvijek može pobijati", "stvar se vraća vlasniku bez spora", "pravomoćna presuda drži se istinitom"], correct: 3 },
      { id: "9v9uk0", question: "Tipično ime tuženika u formulama jest:", options: ["Aulus Agerius", "Numerius Negidius", "Titius", "Stichus"], correct: 1 },
      { id: "j0p7h2", question: "Povrat u prijašnje stanje kao posebno pretorsko sredstvo jest:", options: ["restitutio in integrum", "missio in possessionem", "stipulatio praetoria", "litis contestatio"], correct: 0 },
      { id: "9fklt8", question: "„Negativa non probantur“ znači:", options: ["dokazuje se samo pisanim ispravama", "zabranjeno je nijekati tužbeni zahtjev", "nijekanje se smatra priznanjem", "ono što se niječe ne dokazuje se"], correct: 3 },
      { id: "f9bask", question: "„De minimis non curat praetor“ znači:", options: ["pretor ne sudi maloljetnicima", "pretor se ne bavi sitnicama", "pretor ne daje formule", "pretor sudi samo jednom"], correct: 1 },
      { id: "y2argx", question: "Prigovor tuženika unesen u formulu zove se:", options: ["condemnatio", "intentio", "exceptio", "demonstratio"], correct: 2 }
    ],
    fillBlanks: [
      { id: "o9v9kf", sentence: "Prvi dio postupka pred magistratom zove se postupak in _______.", answer: "iure", hint: "Pred pretorom." },
      { id: "1ay2s7", sentence: "Drugi dio postupka pred privatnim sucem zove se postupak apud _______.", answer: "iudicem", hint: "Kod suca." },
      { id: "x1xy1l", sentence: "Tipično ime tužitelja u formuli je Aulus _______.", answer: "Agerius", hint: "AA." },
      { id: "cmjs66", sentence: "Dio formule s tužbenim zahtjevom zove se _______.", answer: "intentio", hint: "Namjera, zahtjev." },
      { id: "5xjqg3", sentence: "Ovlast suca da osudi ili oslobodi tuženika zove se _______.", answer: "condemnatio", hint: "Osuda." }
    ],
    learn: {
      id: "6m954e",
      title: "Postupovno pravo – legisakcijski, formularni i kognicijski postupak",
      content: `<h3>Pregled</h3>
<p>Gajev <em>ius quod ad actiones pertinet</em> obuhvaća tri tipa postupka: <strong>legisakcijski</strong> (staro civilno pravo), <strong>formularni</strong> (pretklasika i klasika) i <strong>kognicijski</strong> (postklasika). Prva dva imaju <strong>dvodiobu</strong>: <em>in iure</em> (pred magistratom) i <em>apud iudicem</em> (pred privatnim sucem).</p>

<h3>Legisakcijski postupak (staro civilno pravo)</h3>
<h4>Pozivanje na sud</h4>
<p>Zakonik XII ploča: <em>si in ius vocat, ito</em> – „ako te zove pred magistrata, idi“; ako ne ide, neka tužitelj pozove svjedoke i uhvati ga (<strong>manus iniectio</strong>); ako bježi – isto; starom i bolesnom daje se tegleća životinja; „zemljašu neka <strong>vindex</strong> bude zemljaš, bezemljašu tko god hoće“. Tužitelj sam poziva tuženika (kao ad hoc magistrat općine); tuženi izbjegava odgovornost samo davanjem vindeksa koji stupa umjesto njega.</p>
<h4>Legis actiones</h4>
<p>Formalističke usmene izjave pred magistratom uz točno određene kretnje, propisane zakonima. Gaj navodi pet:</p>
<ol>
<li><strong>legisactio sacramento</strong> – najstarija, opća: <em>in rem</em> (utvrđenje stvarnog, nasljednog prava ili obiteljske vlasti) i <em>in personam</em> (postojanje duga);</li>
<li><strong>per iudicis postulationem</strong> – obveze iz stipulacije (i diobe);</li>
<li><strong>per condictionem</strong> – novčani i drugi određeni dugovi (ni Gaju nije bila posve jasna);</li>
<li><strong>per manus iniectionem</strong> – ovrha na osobi;</li>
<li><strong>per pignoris capionem</strong> – ovrha na stvarima (oduzimanje stvari).</li>
</ol>
<h4>Legisactio sacramento in rem – tijek</h4>
<p>Tužitelj drži štapić (<em>vindicta</em> – simbol koplja, tj. vlasništva), hvata stvar (npr. roba) i izgovara: „Tvrdim da je ovaj čovjek moj po kviritskom pravu… evo, stavio sam vindiktu“; isto čini tuženi (kontravindikacija). Pretor: <em>Mittite ambo hominem</em> („Pustite obojica roba“). Prvi pita za razlog vindikacije, drugi odgovara „postupio sam po pravu kad sam stavio vindiktu“; prvi ga izaziva <strong>okladom (sacramentum)</strong> – 500 asa (za vrijednije stvari) ili 50 asa; pobijeđeni plaća iznos državi. Pretor jednoj stranci daje privremeni posjed uz jamce za stvar i plodove (<em>praedes litis et vindiciarum</em>). Obje stranke tvrde pravo; tuženi nema prigovora; sudac sudi o okladi, a time neizravno o pravu. Tužitelj navodi i dokazuje pravni temelj, tuženi ga samo tvrdi (<em>actori incumbit probatio</em>). Za nekretnine – najprije na licu mjesta, kasnije simbol (gruda zemlje). Sudac se po Lex Pinaria određivao 30. dana.</p>
<h4>Ovrha</h4>
<p>Samo na osobi: tko je priznao novčani dug ili je osuđen ima <strong>30 dana</strong> za ispunjenje, nakon toga <em>manus iniectio</em> – stilizirano hvatanje; tuženi se ne smije opirati, može dati vindeksa (koji odgovara dvostruko ako izgubi); kasnije i sam odbiti hvatanje uz rizik dvostrukog iznosa (<em>manus iniectio pura</em>). Bez vindeksa – vjerovnik ga odvodi kući i veže; ako nakon tri sajma nitko ne plati, može biti prodan preko Tibera ili ubijen (po XII ploča i „izrezan na komade“).</p>

<h3>Formularni postupak (pretklasika i klasika)</h3>
<ul>
<li>Stranke i magistrat ne izgovaraju svečane riječi, nego neformalno utvrđuju <strong>formulu</strong> – isprva usmenu, kasnije pisanu – program za suca, s tužbenim zahtjevom i prigovorima.</li>
<li>Uveo ga je vjerojatno <strong>praetor peregrinus</strong> (od 242. pr. Kr.) za sporove s peregrinima; <strong>Lex Aebutia</strong> (2. st. pr. Kr.) širi ga na Rimljane; <strong>August</strong> (17. pr. Kr.) ukida legisakcije – formularni postaje redovni postupak; uz njega od Augusta izvanredni kognicijski.</li>
<li><strong>In ius vocatio</strong> – tuženi se mora odazvati ili dati vindeksa, inače pretor daje penalnu tužbu i <em>missio in bona rei servandae causa</em>.</li>
</ul>
<h4>Postupak in iure</h4>
<p>Tužitelj traži tužbu (<em>postulatio actionis</em>); pretor je odobrava ako je predviđena ediktom (<em>actionem dare</em>) ili odbija (<em>denegare</em>); ako nema ediktne, može dati <strong>actio in factum</strong>. Tuženi može: poreći osnovu i upustiti se u spor; priznati navode, ali istaknuti protivne okolnosti – tražiti <strong>exceptio</strong> (npr. exceptio rei venditae ac traditae); ili priznati zahtjev (<em>confessus</em> – izjednačen s osuđenim). Tko odbije upustiti se u spor, trpi prisilne mjere. Pretor određuje suca (<em>iudicium dare</em>) i formulu; suglasnost stranaka s formulom je <strong>litis contestatio</strong> – posljedica: <em>bis de eadem re agere non licet</em> (ne smije se ponovno tužiti), novacija tražbine.</p>
<h4>Formula – dijelovi</h4>
<ul>
<li><strong>intentio</strong> – tužiteljev zahtjev; <em>certa</em> (točan iznos ili stvar) ili <em>incerta</em> („quidquid … dare facere oportet“);</li>
<li><strong>demonstratio</strong> – opis činjenica i pravnog razloga kod intentio incerta;</li>
<li><strong>condemnatio</strong> – ovlast suca da osudi ili oslobodi; prati intenciju (certa / incerta) i glasi na <strong>novac</strong>;</li>
<li><strong>adiudicatio</strong> – ovlast suca da dodijeli vlasništvo u diobnim parnicama (actio familiae erciscundae, communi dividundo) i kod actio finium regundorum;</li>
<li><strong>exceptio</strong> – prigovor tuženika; <strong>praescriptio</strong> – ograničenje zahtjeva;</li>
<li><strong>arbitrarna klauzula</strong> – poziv tuženiku na dobrovoljno vraćanje stvari (rei vindicatio, actio doli).</li>
</ul>
<p>U formulama <strong>Aulus Agerius (AA)</strong> je tipični tužitelj, <strong>Numerius Negidius (NN)</strong> tuženik. Vrste: <em>actiones in ius conceptae</em> (intentio se poziva na civilno pravo – „dare oportere“) i <em>in factum conceptae</em> (opis činjenica); <em>actiones utiles</em> (prilagođena ediktna formula), <em>formulae ficticiae</em> (s fikcijom).</p>
<h4>Primjeri formula</h4>
<ol>
<li><strong>Prejudicijalna (na utvrđenje)</strong> – samo intentio: <em>An Stichus Auli Agerii libertus sit?</em> – „Je li Stih oslobođenik Aula Agerija?“</li>
<li><strong>Actio certae creditae pecuniae (zajam)</strong>: <em>Si paret Numerium Negidium Aulo Agerio sestertium decem milia dare oportere, iudex Numerium Negidium Aulo Agerio sestertium decem milia condemnato, si non paret, absolvito.</em> – „Ako se dokaže da N. N. treba dati A. A. deset tisuća sestercija, suče, osudi…; ako se ne dokaže, oslobodi.“ <em>Dare oportere</em> – civilna tužba; <em>decem milia</em> – certa.</li>
<li><strong>Actio venditi</strong>: <em>Quod Aulus Agerius Numerio Negidio hominem quo de agitur vendidit</em> (demonstratio), <em>quidquid ob eam rem Numerium Negidium Aulo Agerio dare facere oportet ex fide bona</em> (intentio incerta, bonae fidei), <em>eius iudex Numerium Negidium condemna, si non paret, absolve</em> (condemnatio incerta – „eius“).</li>
<li><strong>Rei vindicatio</strong> – intentio, arbitrarna klauzula, condemnatio (vidi zaštitu vlasništva).</li>
<li><strong>Actio Publiciana</strong> – s fikcijom godine dana posjeda (vidi zaštitu vlasništva).</li>
<li><strong>Actio depositi (in factum)</strong>: <em>Si paret Aulum Agerium apud Numerium Negidium mensam argenteam deposuisse eamque dolo malo Numerii Negidii Aulo Agerio redditam non esse, quanti ea res erit, tantam pecuniam iudex… condemna, si non paret, absolve.</em> – „Ako se dokaže da je A. A. dao u ostavu N. N. srebrni stol i da mu zbog dolusa N. N. nije vraćen…“</li>
<li><strong>Actio ex stipulatu (incerti) s exceptio</strong>: <em>Quod Aulus Agerius de Numerio Negidio incertum stipulatus est, quidquid ob eam rem… dare facere oportet, si in ea re nihil metus causa factum est, eius iudex… condemna, si non paret, absolve.</em> – „…ako u toj stvari ništa nije učinjeno zastrašivanjem“ (exceptio metus).</li>
</ol>
<h4>Postupak apud iudicem</h4>
<p>Suca stranke biraju sporazumno (obično rimskog građanina), ako ne – s popisa <em>album iudicum selectorum</em> ili ždrijebom (<em>sortitio</em>) uz pravo odbijanja (<em>reiectio</em>). Posebni suci: <strong>recuperatores</strong> (npr. sporovi o slobodi) i <strong>centumviri</strong> (važni imovinski, osobito nasljedni sporovi; 100, kasnije 105 članova). Sudac je strogo vezan formulom; stranke izvode dokaze (iskazi, isprave, očevid, vještačenje, svjedoci koje stranke same pozivaju), sudac ih slobodno ocjenjuje uz savjet stručnjaka (<em>consilium</em>). Presuda je konačna (formalna pravomoćnost) i stvara pravo među strankama (materijalna) – <em>res iudicata pro veritate accipitur</em>.</p>
<h4>Ovrha</h4>
<p>Osobna ovrha postoji, ali je potiskuje <strong>imovinska ovrha nad cijelom imovinom</strong>. Ne ispuni li dužnik presudu u 30 dana – <strong>actio iudicati</strong> (upusti li se dužnik i izgubi – iznos se udvostručuje, litiskrescencija); <em>missio in bona</em>; nakon daljnjih 30 dana infamija; vjerovnici biraju <strong>magister bonorum</strong> koji prodaje imovinu (<em>venditio bonorum</em>) najboljem ponuđaču (<em>bonorum emptor</em>). Prezaduženi bez krivnje može dobrovoljno ustupiti imovinu vjerovnicima – <strong>cessio bonorum</strong> (izbjegava infamiju, ostaju mu sredstva za život).</p>
<h4>Posebna pretorska sredstva</h4>
<ul>
<li><strong>interdikti</strong> – nakon kratkog ispitivanja pretor nešto naređuje ili zabranjuje; ako se tuženi ne pokori – redovni postupak;</li>
<li><strong>restitutio in integrum</strong> – uklanjanje posljedica nepravedne odluke ili posla (prisila, prijevara, maloljetnost);</li>
<li><strong>missio in bona / in possessionem</strong> – privremeno uvođenje u posjed imovine ili stvari (npr. kad vlasnik ruševne zgrade ne da jamstvo);</li>
<li><strong>stipulationes praetoriae</strong> – prisilne stipulacije radi urednog tijeka postupka.</li>
</ul>

<h3>Kognicijski postupak (postklasika)</h3>
<ul>
<li>Od Augusta izvanredni, od 3. st. cijeli postupak vodi <strong>državni činovnik kao sudac</strong> (u prvom stupnju provincijski namjesnik); dvodioba nestaje; dijelove može povjeriti delegiranom sucu (<em>iudex pedaneus, datus</em>). <strong>342.</strong> formule su izričito zabranjene.</li>
<li>Do sredine 5. st. tužitelj poziva tuženika (<em>litis denuntiatio</em>), kasnije predaje tužbu (<em>libellus conventionis</em>) koju dostavlja sud.</li>
<li><em>Litis contestatio</em> je samo trenutak kad tuženi pred sucem odgovori na tužbu, bez konzumpcijskog učinka.</li>
<li>Slobodna ocjena dokaza ograničena je <strong>dokaznim pravilima</strong> (osobito o ispravama); od 4. st. jedan svjedok nije dovoljan – <em>testis unus, testis nullus</em>.</li>
<li>Presuda ne mora glasiti na novac; dopušten je <strong>priziv (appellatio)</strong> višoj instanciji, i caru – sudac ga mora primiti i uputiti u roku od 30 dana (<em>litterae dimissoriae</em>).</li>
<li>Ovrha nad pojedinim predmetima postaje pravilo, nad cijelom imovinom iznimka. Biskupi sude kao arbitri kad im se stranke podvrgnu (<em>episcopalis audientia</em>).</li>
</ul>

<h3>Regule postupovnog prava</h3>
<table>
<tr><th>Regula</th><th>Prijevod</th></tr>
<tr><td><em>Iura novit curia</em></td><td>Sud poznaje pravo.</td></tr>
<tr><td><em>Actore non probante, reus absolvitur</em></td><td>Ako tužitelj ne dokaže, tuženi se oslobađa (teret dokaza na tužitelju).</td></tr>
<tr><td><em>Reus excipiendo fit actor</em></td><td>Tuženi postaje tužiteljem davanjem prigovora – mora dokazati okolnosti prigovora (stranke se ne mijenjaju).</td></tr>
<tr><td><em>Ne eat iudex ultra petita partium</em></td><td>Sudac neka ne dosuđuje više od onoga što stranka traži.</td></tr>
<tr><td><em>Res iudicata pro veritate accipitur</em></td><td>Pravomoćna presuda drži se istinitom.</td></tr>
<tr><td><em>Actor sequitur forum rei</em></td><td>Tužitelj slijedi sud nadležan za tuženika.</td></tr>
<tr><td><em>Testis unus, testis nullus</em></td><td>Jedan svjedok – nijedan svjedok.</td></tr>
<tr><td><em>Negativa non probantur</em></td><td>Ono što se niječe ne treba dokazivati.</td></tr>
<tr><td><em>De minimis non curat praetor</em></td><td>Pretor se ne bavi (nevažnim) sitnicama.</td></tr>
<tr><td><em>Bis de eadem re agere non licet</em></td><td>Ne smije se dvaput tužiti o istoj stvari.</td></tr>
</table>`
    }
  }
};

if (typeof window !== 'undefined') { window.rppPfriM2 = rppPfriM2; }
if (typeof module !== 'undefined' && module.exports) { module.exports = rppPfriM2; }
