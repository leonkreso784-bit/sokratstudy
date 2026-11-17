// Rimsko privatno pravo (PFRI) — M1 (gradivo međuispita)
// Međuispit po izvedbenom planu: izvori / periodizacija / recepcija; statusno pravo;
// obiteljsko i bračno pravo; nasljedno pravo. Model: kartice <= 200 znakova, detalj u learn.

const rppPfriM1 = {
  pojamPodjele: {
    id: "yisg2g",
    name: "Pojam i podjele rimskog prava",
    icon: "fa-scale-balanced",
    color: "#6366f1",
    flashcards: [
      { id: "64txzk", question: "Što označava pojam rimsko pravo (ius Romanorum)?", answer: "Pravni poredak koji je vrijedio u rimskoj državi od legendarnog osnutka Rima (754./753. pr. Kr.) do smrti istočnorimskog cara Justinijana (565.).", explanation: "Uz to i znanstvena obrada tog prava nakon Justinijana (recepcija)." },
      { id: "7nbdwa", question: "Koja su dva značenja riječi ius?", answer: "Objektivno: skup pravnih normi (pravo u objektivnom smislu). Subjektivno: skup ovlaštenja koja pojedinac ima na temelju pravnog poretka.", explanation: "Isto razlikovanje i danas: pravo kao poredak / pravo kao ovlaštenje." },
      { id: "lnswv1", question: "Honeste vivere, alterum non laedere, suum cuique tribuere", answer: "„Pošteno živjeti, drugoga ne vrijeđati, svakome svoje priznati.“ Tri načela prava (Ulpijan, D. 1.1.10.1).", explanation: "Prva dva načela uređuju ponašanje pojedinca, a treće se povezuje s pravednošću kao stalnom voljom da se svakome prizna njegovo pravo." },
      { id: "gr1082", question: "Ius est ars boni et aequi", answer: "„Pravo je umijeće dobrog i pravičnog.“ Celzova definicija prava koju prenosi Ulpijan (D. 1.1.1).", explanation: "Aequum = pravično; bonum = dobro." },
      { id: "z2y6qm", question: "Omnis definitio in iure civili periculosa est: parum est enim, ut non subverti posset", answer: "„Svaka je definicija u civilnom pravu opasna: rijetko se događa da se ne može opovrgnuti.“ (Javolen, D. 50.17.202)", explanation: "Klasični pravnik upozorava na opasnost apstraktnih definicija." },
      { id: "02o63k", question: "Ius civile – ius gentium", answer: "Ius civile: pravo za rimske građane, formalističko. Ius gentium: opće pravo za odnose s peregrinima, jednostavnije i elastičnije; s vremenom potiskuje civilno.", explanation: "Ius gentium je ipak rimsko pravo – primjenu osigurava pretor." },
      { id: "i1uuow", question: "Ius honorarium (ius praetorium)", answer: "Pravo nastalo djelatnošću pravosudnih magistrata, prije svega pretora, koji su civilno pravo dopunjavali i ispravljali po načelu pravičnosti (aequitas).", explanation: "Uz pretore i kurulski edili (tržni poslovi)." },
      { id: "nzkf21", question: "Ius naturale", answer: "Prirodno pravo: načela koja je priroda usadila ljudskim bićima, „uvijek dobro i pravično“. U Justinijanovo doba – apsolutno, nepromjenjivo, zajedničko svim živim bićima.", explanation: "U klasici blisko ius gentium ili prirodnom razumu." },
      { id: "jy9eew", question: "Ius publicum – ius privatum", answer: "Ius publicum uređuje pitanja od interesa za državu; ius privatum pitanja interesa i zaštite pojedinca.", explanation: "Predmet kolegija je ius privatum." },
      { id: "ktir5s", question: "Ius cogens – ius dispositivum", answer: "Ius cogens: prisilne norme koje stranke ne mogu mijenjati. Ius dispositivum: norme koje stranke po volji primjenjuju ili isključuju; vrijede ako nije drukčije ugovoreno.", explanation: "Primjer dispozitivne norme: odgovornost prodavatelja za nedostatke stvari." },
      { id: "6cbold", question: "Ius commune – ius singulare", answer: "Ius commune: pravila za sve građane (načelo). Ius singulare: pravila za užu skupinu ili pojedinca (iznimka), kasnije beneficium ili privilegium.", explanation: "Npr. vojnici su imali olakšice pri sastavljanju oporuke." },
      { id: "qbb5pu", question: "Ius scriptum – ius non scriptum", answer: "Pisano pravo potječe od tijela javne vlasti (zakoni, edikti, senatusconsulta, konstitucije, responsa). Nepisano je običajno pravo (consuetudo, mores).", explanation: "Običaj unesen u zakon (Zakonik XII ploča) postaje ius scriptum." },
      { id: "ymney5", question: "Gajeva triparticija (Gai. Inst. 1.8)", answer: "Ius quod ad personas pertinet (osobe), ius quod ad res pertinet (stvari), ius quod ad actiones pertinet (tužbe).", explanation: "Uzor kasnijim kodifikacijama (CIC, Code civil)." },
      { id: "qw0mvp", question: "Dokazna i dispozitivna isprava", answer: "Dokazna služi samo kao dokaz – ako propadne, posao ostaje. Dispozitivna je uvjet valjanosti – bez nje nema pravnog posla (npr. mjenica).", explanation: "Ad probationem (radi dokazivanja) / ad sollemnitatem (radi valjanosti)." }
    ],
    quiz: [
      { id: "y576jt", question: "Gajeva triparticija dijeli cjelokupno pravo s obzirom na:", options: ["osobe, stvari i tužbe", "javno, privatno i prirodno pravo", "civilno, honorarno i opće pravo", "zakone, edikte i običaje"], correct: 0 },
      { id: "7k4fyi", question: "Načela prava „honeste vivere, alterum non laedere, suum cuique tribuere“ formulirao je:", options: ["Gaj", "Javolen", "Ulpijan", "Papinijan"], correct: 2 },
      { id: "nlnkdm", question: "Pravo nastalo djelatnošću pretora naziva se:", options: ["ius gentium", "ius honorarium", "ius naturale", "ius singulare"], correct: 1 },
      { id: "lfbdsm", question: "Norme koje stranke ne mogu svojim dogovorom isključiti čine:", options: ["ius dispositivum", "ius singulare", "ius commune", "ius cogens"], correct: 3 },
      { id: "vt113j", question: "Koji je primjer ius singulare u rimskom pravu?", options: ["olakšice vojnicima pri sastavljanju oporuke", "zabrana braka u uspravnoj liniji srodstva", "obveza plaćanja kupovnine kod kupoprodaje", "odgovornost dužnika za dolus u svim poslovima"], correct: 0 },
      { id: "eh7sfg", question: "Koja tvrdnja o ius gentium je točna?", options: ["bilo je strano pravo koje Rim nije štitio", "vrijedilo je samo među peregrinima", "bilo je rimsko pravo, jednostavnije od civilnog", "potpuno je ukinuto Justinijanovom kodifikacijom"], correct: 2 },
      { id: "j7evhz", question: "Rečenicu „Ius est ars boni et aequi“ Ulpijan pripisuje:", options: ["Gaju", "Celzu", "Javolenu", "Modestinu"], correct: 1 },
      { id: "vkok3h", question: "Zakonik XII ploča, iako je dobrim dijelom zapisano običajno pravo, ubraja se u:", options: ["ius non scriptum", "ius naturale", "ius singulare", "ius scriptum"], correct: 3 },
      { id: "6f9sdr", question: "Ius dispositivum čine norme koje:", options: ["stranke ne smiju mijenjati ni isključiti", "vrijede samo za vojnike i veterane", "stranke mogu isključiti dogovorom", "donosi isključivo car reskriptom"], correct: 2 }
    ],
    fillBlanks: [
      { id: "9qohh6", sentence: "Riječ ius u subjektivnom smislu označava skup pravnih _______ pojedinca.", answer: "ovlaštenja", hint: "Suprotno od skupa normi." },
      { id: "d21u91", sentence: "Prirodno pravo se naziva ius _______.", answer: "naturale", hint: "Latinski pridjev od natura." },
      { id: "hxadgx", sentence: "Javolenovo upozorenje glasi: Omnis _______ in iure civili periculosa est.", answer: "definitio", hint: "Ono što kaže što nešto jest." },
      { id: "9nrtrv", sentence: "Pravo koje uređuje pitanja od interesa za državu naziva se ius _______.", answer: "publicum", hint: "Suprotno od ius privatum." },
      { id: "i09oh2", sentence: "Kad je pisana isprava uvjet valjanosti posla, kaže se da je propisana ad _______.", answer: "sollemnitatem", hint: "Suprotno od ad probationem." }
    ],
    learn: {
      id: "zso4f5",
      title: "Pojam, značenje i podjele rimskog prava",
      content: `<h3>Pojam rimskog prava</h3>
<p>Pojmom <strong>rimsko pravo</strong> (<em>ius Romanorum</em>) označava se pravni poredak koji je bio na snazi u rimskoj državi od legendarnog osnivanja Rima (754. ili 753. pr. Kr.) do smrti istočnorimskog cara <strong>Justinijana (565.)</strong>. U širem smislu rimsko pravo uključuje i njegovu kasniju znanstvenu obradu i <strong>recepciju</strong> u europskim pravnim sustavima. Pojam je višeznačan: može značiti cjelokupno rimsko pravo, samo privatno pravo, Justinijanovu kodifikaciju ili recipirano (pandektno) pravo.</p>
<p>Rimsko privatno pravo uči se u pravnom studiju zato što je izvor pojmova, instituta i načina rasuđivanja suvremenog građanskog prava (vlasništvo, posjed, obveze, ugovori, nasljeđivanje).</p>

<h3>Ius – dva značenja</h3>
<ul>
<li><strong>Objektivno</strong> – skup pravnih normi (pravni poredak).</li>
<li><strong>Subjektivno</strong> – skup pravnih ovlaštenja koja pojedinac ima u okviru i na temelju pravnog poretka.</li>
</ul>

<h3>Definicije i načela prava (regulae)</h3>
<table>
<tr><th>Izreka</th><th>Prijevod</th><th>Izvor i značenje</th></tr>
<tr><td><em>Honeste vivere, alterum non laedere, suum cuique tribuere.</em></td><td>Pošteno živjeti, drugoga ne vrijeđati, svakome svoje priznati.</td><td>Ulpijan, D. 1.1.10.1 – tri načela prava.</td></tr>
<tr><td><em>Ius est ars boni et aequi.</em></td><td>Pravo je umijeće dobrog i pravičnog.</td><td>Celz, prema Ulpijanu (D. 1.1.1).</td></tr>
<tr><td><em>Omnis definitio in iure civili periculosa est: parum est enim, ut non subverti posset.</em></td><td>Svaka je definicija u civilnom pravu opasna: rijetko se događa da se ne može opovrgnuti.</td><td>Javolen, D. 50.17.202 (argumentacija klasičnog pravnika).</td></tr>
</table>

<h3>Podjele prava prema rimskim pravnicima</h3>
<h4>Ius civile – ius gentium – ius honorarium – ius naturale</h4>
<ul>
<li><strong>Ius civile</strong> – pravo namijenjeno Rimljanima; odlikuje se formalizmom i slabo je prilagođeno razvijenom prometu jer je nastalo u doba nerazvijenosti rimskog društva.</li>
<li><strong>Ius gentium</strong> (opće pravo) – služi peregrinima u poslovima s Rimljanima, a s vremenom ga prihvaćaju i sami Rimljani jer je jednostavnije i elastičnije. Ipak je to <em>rimsko</em> pravo: njegovu primjenu osigurava rimski magistrat (pretor). Razvoj je tekao u smjeru potiskivanja civilnih normi u korist pravila ius gentium.</li>
<li><strong>Ius honorarium</strong> (ius praetorium) – pravo nastalo djelatnošću pravosudnih magistrata, prije svega pretora (i kurulskih edila); dopunjuje i ispravlja civilno pravo po načelu pravičnosti (<em>aequitas</em>).</li>
<li><strong>Ius naturale</strong> – u klasici načela koja je priroda usadila ljudskim bićima, blisko ius gentium ili prirodnoj pravičnosti („semper aequum et bonum“); u Justinijanovo doba apsolutno i nepromjenjivo pravo zajedničko svim živim bićima.</li>
</ul>
<h4>Ostale podjele</h4>
<table>
<tr><th>Podjela</th><th>Prvi član</th><th>Drugi član</th></tr>
<tr><td>prema interesu</td><td><strong>ius publicum</strong> – pitanja od interesa za državu</td><td><strong>ius privatum</strong> – interesi i zaštita pojedinca</td></tr>
<tr><td>prema prisilnosti</td><td><strong>ius cogens</strong> – prisilne norme koje stranke ne mogu mijenjati niti od njih odustati</td><td><strong>ius dispositivum</strong> – norme koje stranke mogu primijeniti ili izostaviti; primjenjuju se ako nije drukčije ugovoreno (npr. odgovornost prodavatelja za nedostatke stvari)</td></tr>
<tr><td>prema krugu adresata</td><td><strong>ius commune</strong> – pravila za sve građane (načelo)</td><td><strong>ius singulare</strong> – pravila za užu skupinu ili pojedinca (iznimka); kasnije <em>beneficium</em>, <em>privilegium</em> (npr. vojnici – blaži zahtjevi forme oporuke)</td></tr>
<tr><td>po izvoru</td><td><strong>ius scriptum</strong> – norme tijela javne vlasti: zakoni, plebisciti, magistratski edikti, senatusconsulta, carske konstitucije, responsa prudentium</td><td><strong>ius non scriptum</strong> – običaji (consuetudo, mores, mores maiorum)</td></tr>
</table>
<p>Ključna razlika između pisanog i nepisanog prava je <strong>porijeklo norme</strong>, a ne to je li zapisana: većina Zakonika XII ploča bila je običajno pravo, ali se nakon kodifikacije ubraja u ius scriptum. Primjer za ius commune/singulare: svi plaćaju ulaznicu (načelo), studenti ne plaćaju (iznimka).</p>

<h3>Dokazna i dispozitivna isprava</h3>
<ul>
<li><strong>Dokazna isprava</strong> služi samo kao dokaz; ako propadne, pravni posao ostaje na snazi – <em>ad probationem</em>.</li>
<li><strong>Dispozitivna isprava</strong> je uvjet postojanja posla; bez nje nema pravnog posla (danas npr. mjenica) – <em>ad sollemnitatem</em>.</li>
</ul>

<h3>Gajeva triparticija (Gai. Inst. 1.8)</h3>
<p>Gaj je prvi podijelio pravo po sadržaju na tri dijela:</p>
<ol>
<li><strong>Ius quod ad personas pertinet</strong> – pravo koje se odnosi na osobe (subjekte prava): statusno i obiteljsko pravo.</li>
<li><strong>Ius quod ad res pertinet</strong> – pravo koje se odnosi na stvari, tj. na odnose među ljudima s obzirom na stvari (inter vivos i mortis causa): stvarno, obvezno i nasljedno pravo.</li>
<li><strong>Ius quod ad actiones pertinet</strong> – pravo koje se odnosi na tužbe: postupovno pravo (legisakcijski, formularni i kognicijski postupak).</li>
</ol>
<p>Triparticija je postala uzor Justinijanovim Institucijama i kasnijim kodifikacijama (Corpus iuris civilis, Corpus iuris canonici, Code civil).</p>`
    }
  },

  periodizacija: {
    id: "zh1tmm",
    name: "Periodizacija i državno uređenje",
    icon: "fa-timeline",
    color: "#f59e0b",
    flashcards: [
      { id: "fg1d14", question: "Koja su pravna razdoblja rimskog privatnog prava?", answer: "Staro civilno pravo (od oko 650. pr. Kr.), pretklasično/honorarno (kasna republika), klasično (principat, od 27. pr. Kr.), postklasično (dominat, od 284.) i Justinijanovo (527.–565.).", explanation: "Prijelomnice: 264./207. pr. Kr., 27. pr. Kr., 235./284., 527." },
      { id: "ntrcwg", question: "Kada traje razdoblje klasičnog prava?", answer: "Od 27. pr. Kr. (August) do nasilne smrti Aleksandra Severa 235.; često se kao kraj uzima 284. (dolazak Dioklecijana), jer slijedi 50 godina vojne anarhije.", explanation: "Klasično pravo = razdoblje principata." },
      { id: "0mvv53", question: "Razdoblje kraljevstva – uređenje", answer: "Oko 650.–510. pr. Kr.: kralj (rex) sa sakralnim, vojnim i političkim funkcijama, senat od 300 glavara gensova, comitia curiata koja svečano potvrđuju odluke.", explanation: "10 familia = 1 gens, 10 gensova = 1 kurija, 10 kurija = 1 tribus." },
      { id: "855t3k", question: "Patriciji i plebejci u doba kraljevstva", answer: "Patriciji su punopravni članovi općine (dobivaju heredij). Plebejci su slobodni, ali nisu članovi kurija; imaju commercium, ali nemaju conubium.", explanation: "Uz njih klijenti (štićenici bogatih) i malobrojni robovi." },
      { id: "dbgt1l", question: "Rana republika (510.–264. pr. Kr.) – glavne promjene", answer: "Kralja zamjenjuju dva jednogodišnja magistrata (pretori, od 367. konzuli) s imperiumom i iurisdictiom; plebejci postupno dobivaju građanstvo; comitia centuriata i comitia tributa.", explanation: "Lex Hortensia 287.: plebisciti obvezuju sve." },
      { id: "w1sx5y", question: "Kasna republika (264.–27. pr. Kr.)", answer: "Razdoblje honorarnog prava: širenje na Italiju i provincije, raste broj pretora, latifundije i robovski rad, sukobi nobiliteta i vitezova, građanski ratovi do pada republike.", explanation: "Reforme Grakha, Marije, Sula, Spartakov ustanak." },
      { id: "bq25tc", question: "Principat – obilježja", answer: "Republikanske ustanove ostaju na izgled, a vlast je u rukama princepsa. Rastu praefectus praetorio i fiscus (careva blagajna); društvo se dijeli na honestiores i humiliores.", explanation: "Pax Romana – oko dvjesto godina mira." },
      { id: "k6i9y3", question: "Dominat – obilježja", answer: "Od Dioklecijana (284.): car je neograničeni gospodar (dominus), pojedinac postaje podanik; tetrarhija, centralizirana birokracija, 4 prefekture, koloni vezani za zemlju.", explanation: "Konačna podjela carstva nakon smrti Teodozija Velikog (395.)." },
      { id: "2c4a4m", question: "Što je tetrarhija?", answer: "Dioklecijanov sustav vladavine: dva augusta (istok i zapad), svaki s pomoćnikom cezarom koji ga nasljeđuje. Nije se održao nakon Dioklecijanova povlačenja 305.", explanation: "Legije su za vladara postavile Konstantina." },
      { id: "isqt3q", question: "Justinijanovo razdoblje (527.–565.)", answer: "Istočnorimski car Justinijan obnavlja jedinstvo carstva (Afrika, Italija, Hispanija) i provodi kodifikaciju koja čuva rimsku pravnu misao.", explanation: "Kodifikacija je vrijedila i u Bizantu." },
      { id: "9d1nvj", question: "Honestiores i humiliores", answer: "Pravno priznata podjela od principata: honestiores su povlašteni gornji slojevi, humiliores zapostavljeni donji slojevi.", explanation: "Zaoštrava se u doba dominata." },
      { id: "vih79y", question: "Milanski edikt (313.)", answer: "Konstantinov edikt kojim je kršćanstvu priznata sloboda vjerovanja.", explanation: "Pripada razdoblju dominata." }
    ],
    quiz: [
      { id: "okos0y", question: "Koji je kronološki redoslijed točan?", options: ["Dioklecijan, August, Salvije Julijan", "August, Salvije Julijan, Dioklecijan", "Hadrijan, August, Dioklecijan", "Salvije Julijan, August, Justinijan"], correct: 1 },
      { id: "5rxkg1", question: "Razdoblje klasičnog prava obuhvaća:", options: ["razdoblje kraljevstva", "posljednja dva stoljeća republike", "razdoblje principata", "razdoblje dominata"], correct: 2 },
      { id: "rmdozl", question: "Plebejci u doba kraljevstva imali su:", options: ["conubium, ali ne commercium", "commercium, ali ne conubium", "i conubium i commercium", "ni conubium ni commercium"], correct: 1 },
      { id: "hrfz2a", question: "Dioklecijan na vlast dolazi:", options: ["284. godine", "235. godine", "313. godine", "27. pr. Kr."], correct: 0 },
      { id: "ygkczy", question: "Careva osobna blagajna koja u principatu potiskuje aerarium zove se:", options: ["patrimonium", "peculium", "tributum", "fiscus"], correct: 3 },
      { id: "9ntodh", question: "Sustav dvaju augusta i dvaju cezara naziva se:", options: ["principat", "konzulat", "tetrarhija", "decemvirat"], correct: 2 },
      { id: "xwsnr4", question: "Lex Hortensia (287. pr. Kr.) odredila je da:", options: ["plebejci dobivaju ius conubii s patricijima", "zaključci plebejskih skupština obvezuju sve", "konzuli dobivaju i sudsku funkciju", "senat postaje jedino zakonodavno tijelo"], correct: 1 },
      { id: "fplfqw", question: "Pravno priznata podjela na gornje i donje slojeve od principata glasi:", options: ["patricii i plebeii", "cives i peregrini", "honestiores i humiliores", "liberi i servi"], correct: 2 },
      { id: "9o155y", question: "Što je Milanski edikt (313.)?", options: ["kodeks carskih konstitucija", "zakon o citiranju pravnika", "akt o podjeli carstva", "priznanje slobode kršćanstvu"], correct: 3 }
    ],
    fillBlanks: [
      { id: "p37ssj", sentence: "Klasično razdoblje počinje 27. pr. Kr., kada Oktavijan dobiva počasno ime _______.", answer: "August", hint: "Prvi princeps." },
      { id: "8dacn5", sentence: "U doba dominata car postaje neograničeni gospodar, latinski _______.", answer: "dominus", hint: "Po njemu je razdoblje dobilo ime." },
      { id: "0sentq", sentence: "Najbliži carev pomoćnik i zapovjednik pretorijanaca bio je praefectus _______.", answer: "praetorio", hint: "Prema pretorijanskoj gardi." }
    ],
    learn: {
      id: "ys4k9k",
      title: "Periodizacija rimske pravne povijesti i državno uređenje",
      content: `<h3>Pravna razdoblja</h3>
<table>
<tr><th>Razdoblje prava</th><th>Vrijeme</th><th>Političko razdoblje</th></tr>
<tr><td>Staro civilno pravo (nastalo običajem)</td><td>oko 650. pr. Kr. – 264. pr. Kr. (prema drugoj podjeli do 207. pr. Kr.)</td><td>kraljevstvo i rana republika</td></tr>
<tr><td>Pretklasično (honorarno, pretorsko) pravo</td><td>264. (ili 207.) – 27. pr. Kr.</td><td>kasna republika</td></tr>
<tr><td>Klasično pravo</td><td>27. pr. Kr. – 235. (smrt Aleksandra Severa) odnosno 284.</td><td>principat</td></tr>
<tr><td>Postklasično pravo</td><td>284. – 527.</td><td>dominat (od Dioklecijana)</td></tr>
<tr><td>Justinijanovo pravo</td><td>527. – 565.</td><td>vladavina Justinijana</td></tr>
</table>
<p>Kao kraj klasičnog prava obično se uzima 235., jer je nakon smrti Aleksandra Severa nastupilo pedesetogodišnje razdoblje <strong>vojne anarhije</strong> u kojem je stao stvaralački razvoj prava; kao kraj principata uzima se 284., kad Dioklecijan i formalno mijenja državno uređenje.</p>

<h3>Razdoblje kraljevstva (oko 650. – 510. pr. Kr.)</h3>
<ul>
<li>Etrušćani su oko 650. pr. Kr. oružano spojili latinsko naselje na Palatinu sa sabinskim naseljima u jednu općinu, grad-državu Rim.</li>
<li>Rimski <em>ager</em> podijeljen na tri tribusa: <strong>Ramnes, Tities, Luceres</strong>; grad na 30 kurija. 10 familia = 1 gens, 10 gensova = 1 kurija, 10 kurija = 1 tribus (vojničko podrijetlo organizacije).</li>
<li><strong>Rex</strong> (kralj) objedinjuje sakralne, vojne i političke funkcije; <strong>senat</strong> (vijeće staraca) od 300 vođa gensova; <strong>comitia curiata</strong> svečano potvrđuju pripremljene odluke (npr. posinjenje, određivanje nasljednika).</li>
<li>Stanovništvo: <strong>patriciji</strong> (punopravni članovi općine; svaki dobiva neotuđivi i nedjeljivi <em>heredij</em>), <strong>plebejci</strong> (slobodni, imaju commercium, nemaju conubium, nisu u kurijama), <strong>klijenti</strong> (siromašni slobodni koji se predaju u zaštitu bogatih) i malobrojni <strong>robovi</strong> (patrijarhalno ropstvo, mogli su imati pekulij).</li>
</ul>

<h3>Rana republika (510. – 264. pr. Kr.)</h3>
<ul>
<li>Uklonjena etrušćanska prevlast; nova hoplitska taktika traži više građana-vojnika, pa se građanstvo dodjeljuje plebejcima. Grad i okolica podijeljeni na 4 gradska i 6 (kasnije više) seoskih tribusa; ager publicus se dijeli plebejcima.</li>
<li>Plebejci osnivaju vlastitu općinu (od 494. pučki tribuni, edili). <strong>Lex Hortensia (287. pr. Kr.)</strong>: zaključci plebejskih skupština obvezuju cijeli narod.</li>
<li>Kralja zamjenjuju dva jednogodišnja magistrata, isprva zvani pretori, od 367. <strong>konzuli</strong>, s <em>imperium</em> (zapovijedanje) i <em>iurisdictio</em> (sudovanje); vjerske funkcije prelaze na <em>pontifices</em>. Kasnije se uvodi posebna magistratura za sudovanje kojoj ostaje naziv <strong>pretor</strong>.</li>
<li>Senat (300 članova, doživotno) upravlja državom svojim ugledom; ulaze bivši magistrati, edili, tribuni, kvestori.</li>
<li><strong>Comitia centuriata</strong> (193 centurije, 5 imovinskih klasa – Servijev ustav; najbogatiji uvijek imaju većinu) biraju više magistrate, donose zakone, sude politička djela. <strong>Comitia tributa</strong> glasuju po teritorijalnim tribusima (31 seoski i 4 gradska).</li>
<li>Obilježja Rima kao grada-države: vojnička organizacija općine, ravnopravni slobodni seljaci-vlasnici, koncentracija stanovanja u gradu, dvostruko vlasništvo – privatno i javno (<em>ager publicus</em>).</li>
</ul>

<h3>Kasna republika (264. – 27. pr. Kr.)</h3>
<ul>
<li>Razdoblje honorarnog prava. Rim se širi na Italiju i provincije; ugovori o prijateljstvu (<em>amicitia</em>); Latini imaju ius conubii i commercii, ali ne ius suffragii; kolonije i <em>ius Latii</em>.</li>
<li>Provincije se uređuju nametnutim zakonom (<strong>lex data</strong>), za razliku od izglasanog (<strong>lex rogata</strong>); osvojena zemlja postaje ager publicus (ager stipendiarius).</li>
<li>Priljev bogatstva: trgovina, novčarstvo; propadanje seljaštva, latifundije koje obrađuju robovi. Društvo: <em>nobilitas</em> (senatorski stalež), <em>ordo equester</em> (vitezovi – trgovci, bankari, zakupci poreza), siromašni plebs, robovi.</li>
<li>Sukobi i reforme (braća Grakho, Gaj Marije i reforma vojske, Sula), Spartakov ustanak – put prema monarhiji.</li>
</ul>

<h3>Principat (27. pr. Kr. – 284.)</h3>
<ul>
<li>August prividno obnavlja republiku; magistrature, senat i skupštine ostaju kao dekor, a vlast prelazi na <strong>princepsa</strong>. Važnu ulogu ima <strong>praefectus praetorio</strong> (zapovjednik pretorijanske garde, najbliži carev pomoćnik).</li>
<li>Državna blagajna <em>aerarium populi Romani</em> (upravlja senat) nestaje, a njezinu ulogu preuzima careva blagajna <strong>fiscus</strong>; senatusconsulta postaju obvezna.</li>
<li>Društvo: vitezovi i državna birokracija, italska i provincijalna aristokracija, siromašni plebs, robovi (masovne manumisije, prijelaz na sustav zakupa – koloni). Pravno priznata podjela na <strong>honestiores</strong> i <strong>humiliores</strong>. <strong>Constitutio Antoniniana (212.)</strong> daje građanstvo gotovo svim slobodnim stanovnicima.</li>
<li><strong>Pax Romana</strong> – gotovo dvjesto godina mira u prirodnim granicama carstva; pojava kršćanstva.</li>
</ul>

<h3>Dominat (284. – 527.)</h3>
<ul>
<li>Nakon vojne anarhije (235.–284.) Dioklecijan provodi reforme: <strong>tetrarhija</strong> (dva augusta i dva cezara), car kao apsolutni gospodar (<em>dominus ac deus</em>), pojedinac kao podanik.</li>
<li>Centralizirana uprava: <em>magister officiorum</em>, <em>quaestor sacri palatii</em> (pripremao konstitucije), <em>comes sacrarum largitionum</em> (financije), <em>comes rerum privatarum</em>, <em>comes sacri patrimonii</em>; svi u carskom savjetu (<em>sacrum consistorium</em>). Činovnici u rangovima <em>illustres, spectabiles, clarissimi</em>.</li>
<li>Četiri prefekture (Orijent, Ilirik, Italija s Afrikom, obje Galije), dijeceze i provincije; Rim i Konstantinopol pod <em>praefectus urbi</em>; od 364. <em>defensor civitatis</em> štiti humiliores.</li>
<li>Porezna (capitatio-iugatio), vojna i monetarna reforma (zlatni aureus); zvanja postaju nasljedna; <strong>koloni</strong> – pravno slobodni, ali vezani za zemlju (preteča kmetova). Kurijali (dekurioni) jamče za porez.</li>
<li><strong>Milanski edikt (313.)</strong> – Konstantin priznaje slobodu kršćanstvu. Konačna podjela na istočno i zapadno carstvo nakon smrti Teodozija Velikog (395.).</li>
</ul>

<h3>Justinijanovo razdoblje (527. – 565.)</h3>
<p>Justinijan obnavlja jedinstvo carstva (osvaja Afriku, Italiju, Ilirik, dio Hispanije), uređuje Crkvu i provodi <strong>kodifikaciju</strong> rimskog prava. Pravne škole u Beirutu i Konstantinopolu pridonijele su oživljavanju zanimanja za klasičnu jurisprudenciju. Kodifikacija je vrijedila još dva stoljeća u Bizantu.</p>`
    }
  },

  izvoriStaroPretklasicno: {
    id: "rkbzbm",
    name: "Izvori: staro civilno i pretklasično pravo",
    icon: "fa-scroll",
    color: "#10b981",
    flashcards: [
      { id: "ynimf4", question: "Fontes iuris essendi", answer: "Materijalni izvori prava – čimbenici koji stvaraju pravo: običaji, zakoni, magistratski edikti, senatusconsulta, carske konstitucije, responsa prudentium.", explanation: "Odgovor na pitanje: tko ili što stvara pravo." },
      { id: "qajfhg", question: "Fontes iuris cognoscendi", answer: "Formalni izvori – iz kojih saznajemo sadržaj prava: djela pravnika (Gajeve Institucije, Justinijanova kodifikacija), nepravni pisci, natpisi, novac, papirusi.", explanation: "Frontinovo djelo o vodovodima je cognoscendi, a zakon prepisan u njemu essendi." },
      { id: "t8ghit", question: "Što je jedini izvor prava u najstarije doba?", answer: "Običaj (consuetudo, mores maiorum). Pravo tada nije odvojeno od vjerskih načela (fas), a čuvari i tumači prava su svećenici (pontifices).", explanation: "Consuetudo est quasi altera natura." },
      { id: "yo06jf", question: "Consuetudo est quasi altera natura", answer: "„Običaj je kao druga priroda.“ (Ciceron)", explanation: "Ulpijan o običaju: tacitus consensus populi longa consuetudine inveteratus." },
      { id: "yxz8oz", question: "Tacitus consensus populi longa consuetudine inveteratus", answer: "„Prešutna suglasnost naroda učvršćena dugotrajnom praksom.“ – Ulpijanova definicija običaja.", explanation: "Dva elementa: dugotrajna praksa i opće prihvaćanje." },
      { id: "7dcbkd", question: "Leges regiae i ius Papirianum", answer: "Kraljevski zakoni koje su kraljevi predlagali kurijatskim skupštinama; zbirku je po predaji sastavio Sextus Papirius (ius Papirianum). Prvi put se spominju u principatu.", explanation: "Zato se pretpostavlja da je zbirka tada nastala (ili je legenda)." },
      { id: "ydspy3", question: "Zakonik XII ploča (lex duodecim tabularum)", answer: "Kodifikacija običajnog prava iz 451.–449. pr. Kr., koju su sastavili decemviri zbog sukoba patricija i plebejaca. Prva i jedina kodifikacija koju su proveli sami Rimljani.", explanation: "Formalno nikad nije ukinut." },
      { id: "of7jlr", question: "Fons omnis publici privatique iuris", answer: "„Izvor cjelokupnog javnog i privatnog prava“ – Livijeva ocjena Zakonika XII ploča.", explanation: "Zakonik zapravo nije bio potpun; najviše uređuje postupak." },
      { id: "tuxs9t", question: "Obilježja Zakonika XII ploča", answer: "Gotovo četvrtina o civilnom postupku; talion i težak položaj dužnika; ali i autonomija stranaka: sloboda oporučivanja, zamjena taliona nagodbom. Sažet i apstraktan stil.", explanation: "Uređuje i delikte, zemljišne odnose, nasljeđivanje, tutorstvo." },
      { id: "svqynh", question: "Respondere, cavere, interpretatio (pontifices)", answer: "Svećenici su strankama davali savjete (respondere), sastavljali obrasce poslova i tužbi (cavere) i tumačenjem širili pravo na nove odnose (interpretatio).", explanation: "XII ploča + interpretatio = staro ius civile." },
      { id: "1opz95", question: "Ius Flavianum", answer: "Zbirka formulara legisakcija i sudski kalendar koje je objavio Gnej Flavije (oko 304. pr. Kr.); time slabi monopol svećenika – sekularizacija prava.", explanation: "Kraj 4. st. pr. Kr." },
      { id: "kghyny", question: "Pretor – ovlasti", answer: "Pravosudni magistrat s imperiumom i iurisdictiom: prima tužbu, utvrđuje stranke i predmet, dopušta (actionem dare) ili uskraćuje tužbu (actionem denegare), imenuje suca i izdaje formulu.", explanation: "Nije zakonodavac ni sudac." },
      { id: "v7wucy", question: "Edictum tralaticium", answer: "Dio pretorskog edikta koji novi pretor preuzima od prethodnika jer se pokazao dobrim („prenosivi edikt“).", explanation: "Od 67. pr. Kr. pretori su vezani vlastitim ediktom." },
      { id: "bzn5zk", question: "Respondere, cavere, agere (pravnici)", answer: "Pravnici daju mišljenja (respondere), sastavljaju obrasce (cavere) i zastupaju stranke u sporu (agere – manje cijenjeno, prepušta se govornicima).", explanation: "Kautelarna jurisprudencija, consilium, disputatio fori." },
      { id: "6k7lul", question: "Ius Aelianum (Tripertita)", answer: "Prvo poznato djelo privatnog prava (Sextus Aelius, oko 200. pr. Kr.): tekst Zakonika XII ploča, njegovo tumačenje (interpretatio) i procesne formule (legis actiones).", explanation: "Tri dijela – otuda Tripertita." },
      { id: "t8gw3i", question: "Kurulski edili", answer: "Magistrati za redarstvo, opskrbu i tržne poslove; svojim ediktom uz pretore stvaraju honorarno pravo (osobito odgovornost za nedostatke pri prodaji robova i stoke).", explanation: "Honorarno pravo = pretorsko pravo + djelatnost edila." }
    ],
    quiz: [
      { id: "gkd11j", question: "Koji je od navedenih fons iuris essendi?", options: ["Gajeve Institucije (udžbenik)", "rimski novac s natpisom", "običajno pravo (consuetudo)", "Ciceronovi govori pred sudom"], correct: 2 },
      { id: "3okgp5", question: "Zakon pronađen uklesan u kamenu, s gledišta saznanja prava, primjer je za:", options: ["fontes iuris cognoscendi", "fontes iuris essendi", "ius honorarium (pretorsko)", "edictum tralaticium (preuzeti)"], correct: 0 },
      { id: "fc6lt1", question: "Zakonik XII ploča nastao je:", options: ["oko 650. pr. Kr.", "451.–449. pr. Kr.", "326. pr. Kr.", "287. pr. Kr."], correct: 1 },
      { id: "964306", question: "Koja tvrdnja o Zakoniku XII ploča nije točna?", options: ["sadrži talionsko načelo", "najviše propisa odnosi se na postupak", "formalno nikada nije ukinut", "detaljno uređuje patria potestas"], correct: 3 },
      { id: "lmkdjk", question: "Sastavljanje obrazaca pravnih poslova za stranke zvalo se:", options: ["respondere", "agere", "cavere", "interpretatio"], correct: 2 },
      { id: "n4a3fq", question: "Djelo koje je objavilo formulare legisakcija i sekulariziralo pravo jest:", options: ["ius Aelianum", "ius Papirianum", "edictum perpetuum", "ius Flavianum"], correct: 3 },
      { id: "vbaczf", question: "Kada pretor odbije dati pravnu zaštitu tužitelju, kaže se da:", options: ["actionem denegat", "actionem dat", "iudicium dat", "litem contestatur"], correct: 0 },
      { id: "d89bwz", question: "Dio edikta koji novi pretor preuzima od prethodnika naziva se:", options: ["edictum perpetuum (Julijanov)", "edictum tralaticium", "edictum repentinum (hitni)", "lex data (statut)"], correct: 1 },
      { id: "2o7isa", question: "Ius Aelianum se sastoji od:", options: ["XII ploča, interpretatio i legis actiones", "edikta pretora, responsa i carskih konstitucija", "Institucija, Digesta, Kodeksa i Novela", "leges regiae, običaja i plebiscita"], correct: 0 },
      { id: "dolhy5", question: "Ulpijanova definicija običaja govori o prešutnoj suglasnosti naroda učvršćenoj:", options: ["pisanim zakonom", "dugotrajnom praksom", "pretorovim ediktom", "carskim reskriptom"], correct: 1 },
      { id: "ddaczc", question: "Uz pretore, honorarno pravo stvarali su i:", options: ["pučki tribuni (tribuni plebis)", "cenzori (censores)", "kurulski edili (aediles)", "kvestori (quaestores)"], correct: 2 }
    ],
    fillBlanks: [
      { id: "85h57q", sentence: "Komisija od deset ljudi koja je sastavila Zakonik XII ploča zvala se _______.", answer: "decemviri", hint: "Decem = deset." },
      { id: "kwmal6", sentence: "Livije je Zakonik XII ploča nazvao fons omnis publici privatique _______.", answer: "iuris", hint: "Genitiv od ius." },
      { id: "mcsumm", sentence: "Zbirku kraljevskih zakona po predaji je sastavio Sextus _______.", answer: "Papirius", hint: "Po njemu: ius Papirianum." },
      { id: "crw1f8", sentence: "Ciceron kaže: consuetudo est quasi altera _______.", answer: "natura", hint: "Druga priroda." },
      { id: "9yjom3", sentence: "Prvi čuvari i tumači prava u najstarije doba bili su svećenici, latinski _______.", answer: "pontifices", hint: "Pontifex maximus." }
    ],
    learn: {
      id: "l0086q",
      title: "Izvori prava – pojam; staro civilno i pretklasično razdoblje",
      content: `<h3>Pojam i podjela izvora</h3>
<ul>
<li><strong>Fontes iuris essendi</strong> (materijalni izvori) – čimbenici koji <em>stvaraju</em> pravo: magistratski edikti (magistratuum edicta), djelatnost pravnika (responsa prudentium), običajno pravo (consuetudo, mores), zakoni (leges), senatska mišljenja (senatus consulta), carske konstitucije (constitutiones principum: edicta, decreta, rescripta, mandata).</li>
<li><strong>Fontes iuris cognoscendi</strong> (formalni izvori, izvori saznanja) – iz kojih <em>crpimo</em> sadržaj prava: sačuvana djela pravnika (Gajeve Institucije, Justinijanova kodifikacija – posebno Digesta i Institucije); spisi nepravnih pisaca (historičari Salustije, Livije, Tacit, Marcelin; scriptores historiae Augustae; Aulo Gelije; Ciceron; Seneka; komediografi Plaut i Terencije; pjesnici Horacije, Ovidije, Marcijal, Juvenal); epigrafika (natpisi); novac; papirusi s pravnim poslovima; arheološka istraživanja.</li>
</ul>
<p><strong>Primjer razlikovanja:</strong> Frontin, upravitelj vodovoda, napisao je djelo <em>De aquaeductu urbis Romae</em> i na kraju doslovno prepisao zakon <em>Lex Quinctia de aquaeductibus</em> i senatsko mišljenje. Njegovo djelo je <em>fons iuris cognoscendi</em>, a sadržaj prepisanog zakona i senatusconsulta <em>fons iuris essendi</em>.</p>

<h3>Staro civilno pravo</h3>
<h4>1. Običaji (mores, consuetudo)</h4>
<p>U najstarije doba pravo nije odvojeno od vjerskih načela (<em>fas</em>), a jedini izvor prava je običaj. Čuvari i tumači prava su svećenici (<em>pontifices</em>).</p>
<ul>
<li><em>Consuetudo est quasi altera natura</em> – „Običaj je kao druga priroda“ (Ciceron).</li>
<li><em>Tacitus consensus populi longa consuetudine inveteratus</em> – „Prešutna suglasnost naroda učvršćena dugotrajnom praksom“ (Ulpijan).</li>
</ul>
<h4>2. Leges regiae (kraljevski zakoni)</h4>
<p>Romul i njegovi nasljednici predlagali su kurijatskim skupštinama zakone koje je pri kraju kraljevstva sabrao <strong>Sextus Papirius</strong> (<em>ius Papirianum</em>). O njima se prvi put čuje u principatu, pa se pretpostavlja da je zbirka tada nastala; ima mišljenja da je riječ o legendi ili kasnijem falsifikatu, no sadrži pravila običajnog prava kraljevskog doba.</p>
<h4>3. Zakonik XII ploča (lex duodecim tabularum), 451.–449. pr. Kr.</h4>
<ul>
<li>Najvažniji pravni spomenik razdoblja, prvi povijesno potvrđen izvor i <strong>prva i jedina kodifikacija koju su proveli Rimljani</strong> (Justinijanova je provedena na istoku, u Bizantu).</li>
<li>Povod: sukob patricija i plebejaca – patriciji su sudili po pravu poznatom samo njima. Izabrana je komisija od deset ljudi (<strong>decemviri</strong>): 451. donesene su 10 ploča, 450. još dvije, a 449. zakonik je bio potpun.</li>
<li>Tekst nije sačuvan neposredno, već je rekonstruiran. Livije ga naziva <em>fons omnis publici privatique iuris</em> („izvor cjelokupnog javnog i privatnog prava“), premda nije bio potpun.</li>
<li>Sadržaj: postupak (gotovo ¼ odredaba – upravo je postupak bio povod zahtjevu za zapisivanjem), delikti, zemljišni odnosi (dosjelost), nasljeđivanje, tutorstvo. O patria potestas malo odredaba – decemviri nisu zapisivali nesporno.</li>
<li>Primitivna obilježja: talionsko načelo, vrlo težak položaj dužnika. Napredna obilježja – <strong>autonomija stranaka</strong>: pravo stranaka da u poslovima govore što hoće (ako ne vrijeđaju javni poredak), sloboda oporučivanja, mogućnost zamjene taliona nagodbom.</li>
<li>Strani utjecaji: Etrušćani (nejasno) i Grci (po Liviju decemviri su putovali u Atenu, vjerojatniji je utjecaj južne Italije – Magna Graecia). Stil je apstraktan, sažet i lapidaran. Formalno nikada nije ukinut.</li>
</ul>
<h4>4. Ostali zakoni</h4>
<p><em>Lex Poetelia Papiria de nexis</em> (326. pr. Kr. – ublažavanje položaja dužnika), <em>Lex Aquilia</em> (287./286. pr. Kr. – naknada štete), <em>Lex Cincia</em> (oko 204. pr. Kr. – darovanja), <em>Lex Plaetoria</em> (početak 2. st. pr. Kr. – zaštita mlađih od 25 godina).</p>
<h4>5. Djelatnost svećenika (pontifices)</h4>
<p>Čuvali su formule pravnih poslova i tužbi (legis actiones) i jedini znali kalendar sudskih i nesudskih dana. Pravo je bilo toliko formalizirano da je jedna kriva riječ značila gubitak spora, pa su stranke tražile pomoć svećenika:</p>
<ul>
<li><strong>respondere</strong> – davali su savjete i odgovore,</li>
<li><strong>cavere</strong> – sastavljali obrasce pravnih poslova,</li>
<li><strong>interpretatio</strong> – širim ili užim tumačenjem i analogijom proširivali su pravo na nove odnose.</li>
</ul>
<p><strong>Zakonik XII ploča + interpretatio = staro ius civile</strong> (početak pravne znanosti); pravo je počivalo na čvrstom zakoniku, a tumačenjem je ostajalo elastično.</p>
<h4>6. Ius Flavianum</h4>
<p><strong>Gnej Flavije</strong> objavio je oko 304. pr. Kr. zbirku formulara legisakcija i sudski kalendar, čime je umanjen monopol svećenika i počela <strong>sekularizacija prava</strong>.</p>

<h3>Pretklasično (honorarno) pravo</h3>
<p>Staro civilno pravo zbog nerazvijenosti (osobito obveznih odnosa) i formalizma više nije odgovaralo potrebama. Skupštine su donijele više od 800 zakona (više od ⅔ javnopravnih). Za privatno pravo važni su <em>Lex Atilia</em> (tutorstvo), <em>Lex Falcidia</em> (40. pr. Kr., oporučno nasljeđivanje), <em>Lex Aebutia</em> (civilni postupak). Razlikuje se <strong>lex rogata</strong> (izglasani zakon) i <strong>lex data</strong> (nametnuti zakon za provinciju – donosi ga vojskovođa po ovlaštenju skupštine, uz komisiju senata).</p>
<h4>Pretor</h4>
<ul>
<li>Rimski pravosudni magistrat; <strong>nije zakonodavac</strong> ni sudac, ali sudskom praksom stvara <strong>ius honorarium</strong>, mijenjajući i dopunjujući civilni sustav po načelu pravičnosti (<em>aequitas</em>).</li>
<li>Prima stranke, utvrđuje predmet spora, imenuje suca i izdaje <strong>formulu</strong> – program rada suca. Može tužbu <strong>dopustiti</strong> (<em>actionem dare</em>) ili <strong>uskratiti</strong> (<em>actionem denegare</em>); u formulu unosi prigovor tuženog (<em>exceptio</em>) i fikcije (<em>formulae ficticiae</em>). Ovlasti počivaju na <em>imperium</em> i <em>iurisdictio</em>.</li>
<li>Stupajući na dužnost objavljuje <strong>edikt</strong> (magistratuum edicta) s kazuistički nabrojenim slučajevima kojima će dati zaštitu. Dio koji preuzme od prethodnika je <strong>edictum tralaticium</strong>. Od 67. pr. Kr. pretori su obvezni držati se svojih edikata.</li>
<li>Rezultat je <strong>dvostruki sustav ustanova</strong>: ustanove starog civilnog prava i nova pravila pretorskog prava. <strong>Kurulski edili</strong> (redarstvo, opskrba, tržni poslovi) također stvaraju honorarno pravo.</li>
</ul>
<h4>Pravnici</h4>
<ul>
<li>Sekularizacijom svjetovni pravnici preuzimaju ulogu svećenika: <strong>kautelarna jurisprudencija</strong> (pomoć strankama pri ugovorima i tužbama), <strong>consilium</strong> (pomoć pretorima), <strong>disputatio fori</strong> (poučavanje učenika).</li>
<li>Djelatnost: <strong>respondere</strong> (mišljenja), <strong>cavere</strong> (obrasci), <strong>agere</strong> (zastupanje u sporu – manje cijenjeno, prepušta se govornicima, <em>oratores</em>). Responsa nisu obvezivala suca, ali je suglasno mišljenje više pravnika sudac prihvaćao.</li>
<li>Literatura: zbirke responsa i obrazaca; <strong>Tripertita (ius Aelianum)</strong> Seksta Elija (oko 200. pr. Kr.) – tekst XII ploča, interpretatio i legis actiones; zbirke <em>regulae iuris</em>. Pravnici 2.–1. st. pr. Kr.: Brutus, Manilius, <strong>Quintus Mucius Scaevola</strong> (Libri iuris civilis u 18 knjiga – prvi sustav privatnog prava), <strong>Alfenus Varus</strong> (Digesta u 40 knjiga).</li>
</ul>`
    }
  },

  izvoriKlasicno: {
    id: "ffv9hz",
    name: "Izvori klasičnog prava i pravnici",
    icon: "fa-landmark",
    color: "#ef4444",
    flashcards: [
      { id: "ies3vv", question: "Senatus consulta u principatu", answer: "Senatska mišljenja dobivaju obveznu snagu zakona (umjesto skupštinskih zakona); od 2. st. nazivaju se orationes, prema carevu prijedlogu pročitanom u senatu.", explanation: "Primjeri: SC Macedonianum, SC Tertullianum, SC Orfitianum." },
      { id: "grcq8t", question: "Edictum perpetuum", answer: "„Vječni edikt“ – konačni oblik pretorskog edikta koji je po Hadrijanovu nalogu sastavio Salvije Julijan; senat ga je prihvatio oko 130. Time je dovršen razvoj pretorskog prava.", explanation: "Pretor gubi stvaralačku ulogu." },
      { id: "7oq1w2", question: "Constitutiones principum – četiri oblika", answer: "Edicta (općeobvezni propisi), decreta (odluke carskog suda), rescripta (odgovori na pravna pitanja – epistula, subscriptio), mandata (upute činovnicima).", explanation: "Od kraja 2. st. imaju snagu zakona (lex)." },
      { id: "oeemlw", question: "Lex de imperio", answer: "Zakon kojim je, prema Gaju, narod prenio na cara svu vlast, pa i zakonodavnu – opravdanje zakonske snage carskih konstitucija.", explanation: "U stvarnosti su carevi sami preuzeli vlast." },
      { id: "yk7s2g", question: "Responsa prudentium u klasici", answer: "Najvažniji izvor klasičnog prava – mišljenja pravnika. August je odabranim pravnicima dao ius (publice) respondendi ex auctoritate principis.", explanation: "Od Hadrijana sudac je vezan suglasnim mišljenjem pravnika." },
      { id: "3jjytp", question: "Ius respondendi ex auctoritate principis", answer: "Pravo davanja odgovora „na temelju careva autoriteta“ – mišljenje takvog pravnika vrijedi kao da ga je dao sam car i obvezuje suca.", explanation: "Uveo August (Augustova intervencija)." },
      { id: "2ocj0o", question: "Vrste literature klasičnih pravnika", answer: "Komentari (libri ad edictum, iuris civilis), kazuistička literatura (responsa, quaestiones, epistulae, digesta, disputationes), monografije (libri singulares) i udžbenici (institutiones).", explanation: "Najpoznatiji udžbenik: Gajeve Institucije." },
      { id: "ghh3vb", question: "Prokulovska i sabinovska škola", answer: "Dvije pravne škole ranoklasične etape. Prokulovsku je osnovao Labeon (pretor), sabinovsku Kapiton (konzul). Predstavnici: Nerva, Prokul, Celz / Sabin, Longin, Julijan.", explanation: "Spor npr. o specifikaciji i zamjeni." },
      { id: "ncpdu6", question: "Gaj", answer: "Pravnik 2. st. bez ius respondendi, nižeg podrijetla; autor Institucija – sustavnog udžbenika civilnog i honorarnog prava s triparticijom (osobe, stvari, tužbe).", explanation: "Jedno od pet „vijeća mrtvih“ po Zakonu o citiranju." },
      { id: "2x1ukl", question: "Četiri velika kasnoklasična pravnika", answer: "Papinijan (najugledniji, ubijen po Karakalinu nalogu), Paul (najplodniji; Sententiae), Ulpijan (komentar edikta; oko ⅓ Digesta), Modestin (posljednji veliki, Ulpijanov učenik).", explanation: "S Gajem čine „vijeće mrtvih“." },
      { id: "zuewi8", question: "Constitutio Antoniniana (212.)", answer: "Edikt cara Karakale (Antonina) kojim su gotovo svi slobodni stanovnici carstva, osim peregrina dediticija, postali rimski građani.", explanation: "Materijalni izvor; oblik: edictum, ne reskript." },
      { id: "pciabx", question: "Orationes", answer: "Naziv za senatusconsulta od 2. st.: zapravo carev prijedlog (govor, oratio) koji je senat prihvaćao bez rasprave.", explanation: "Pokazuje da je stvarna vlast kod princepsa." }
    ],
    quiz: [
      { id: "45uea4", question: "Konačni oblik pretorskog edikta sastavio je po Hadrijanovu nalogu:", options: ["Emilije Papinijan", "Gaj", "Salvije Julijan", "Antistije Labeon"], correct: 2 },
      { id: "sagubp", question: "Constitutio Antoniniana iz 212. jest po obliku:", options: ["reskript", "edikt", "dekret", "mandat"], correct: 1 },
      { id: "1vixd7", question: "Odgovor cara na pravno pitanje pojedinca ili činovnika zove se:", options: ["mandatum", "decretum", "edictum", "rescriptum"], correct: 3 },
      { id: "t60c9n", question: "Ius respondendi ex auctoritate principis uveo je:", options: ["August", "Hadrijan", "Dioklecijan", "Karakala"], correct: 0 },
      { id: "hfs71q", question: "Osnivač prokulovske škole bio je:", options: ["Kapiton", "Sabin", "Labeon", "Celz"], correct: 2 },
      { id: "2jlv6i", question: "Najveći i najugledniji klasični pravnik, ubijen po Karakalinu nalogu, bio je:", options: ["Julije Paul", "Papinijan", "Domicije Ulpijan", "Modestin"], correct: 1 },
      { id: "o529g0", question: "Od Hadrijana sudac je bio vezan:", options: ["mišljenjem bilo kojeg pravnika", "isključivo carskim reskriptima", "suglasnim mišljenjem pravnika", "jedino Zakonikom XII ploča"], correct: 2 },
      { id: "xj0v03", question: "Kojoj vrsti literature pripadaju Gajeve Institucije?", options: ["udžbenicima", "kazuistici", "monografijama", "komentarima edikta"], correct: 0 },
      { id: "ct8t9w", question: "Upute koje car daje državnim činovnicima nazivaju se:", options: ["decreta", "edicta", "rescripta", "mandata"], correct: 3 },
      { id: "jf2slq", question: "Senatusconsulta od 2. st. nazivaju se orationes jer:", options: ["ih donosi narodna skupština tributa", "ih je pisao Salvije Julijan", "su carev prijedlog pročitan u senatu", "su govori pretora pri stupanju na dužnost"], correct: 2 },
      { id: "06u2qg", question: "Gajeva Institucija sadrži podjelu prava na:", options: ["osobe, stvari i tužbe", "javno i privatno pravo", "kontrakte i delikte", "civilno i honorarno pravo"], correct: 0 }
    ],
    fillBlanks: [
      { id: "qikvsm", sentence: "Prema Gaju, narod je cara ovlastio zakonom koji se zove lex de _______.", answer: "imperio", hint: "Imperium = vlast zapovijedanja." }
    ],
    learn: {
      id: "8qxacx",
      title: "Izvori klasičnog prava (27. pr. Kr. – 235.) i klasična jurisprudencija",
      content: `<p>Razdoblje klasičnog prava obuhvaća principat – od 27. pr. Kr. do nasilne smrti cara Aleksandra Severa (235.), nakon čega slijedi pola stoljeća vojne anarhije. Rimsko pravo tada doseže najviši stupanj razvoja. <strong>Izvori se ne mijenjaju, ali se mijenja njihova uloga.</strong></p>

<h3>Pojedini izvori</h3>
<ul>
<li><strong>Običajno pravo</strong> (ius non scriptum) i dalje se primjenjuje, ali mu značenje opada pred pisanim izvorima.</li>
<li><strong>Zakoni (leges)</strong> pomalo nestaju – zakonodavna djelatnost skupština se gasi jer je vlast kod princepsa (pod Augustom još ponešto, potkraj 1. st. prestaje).</li>
<li><strong>Senatus consulta</strong> postaju obvezan izvor prava (August želi vezati senatorski stalež uz režim; car preko senata provodi zakonodavnu politiku). Od 2. st. zovu se <strong>orationes</strong> – senat bez rasprave prihvaća carev prijedlog koji pročita niži magistrat. Senatusconsulta se uvijek odnose na pojedina pitanja (npr. SC Macedonianum).</li>
<li><strong>Magistratski edikti</strong> gube značenje jer pretor gubi ulogu pravosudnog magistrata. Problem je riješio Hadrijan: po njegovu nalogu <strong>Salvius Iulianus</strong> sastavio je konačni oblik edikta, <strong>edictum perpetuum</strong>, koji je senat prihvatio <strong>oko 130.</strong> – razvoj pretorskog prava je dovršen.</li>
<li><strong>Constitutiones principum</strong> (carske konstitucije) – novi izvor koji od sredine/kraja 2. st. ima snagu zakona (<em>lex, leges</em>). Gaj kaže da se nikada nije sumnjalo da imaju snagu zakona jer je narod zakonom <strong>lex de imperio</strong> prenio na cara svu vlast (zapravo su carevi sami preuzeli vlast). Oblici:
<ol>
<li><strong>Edicta</strong> – općeobvezni propisi za građane i magistrate, najbliži zakonima (najpoznatiji <em>Constitutio Antoniniana</em>, 212.);</li>
<li><strong>Decreta</strong> – odluke u sporu pred carskim sudom (presude);</li>
<li><strong>Rescripta</strong> – carevi odgovori na pravna pitanja: <em>epistula</em> (posebna isprava činovnicima i korporacijama) i <em>subscriptio</em> (kratki odgovor napisan na molbu);</li>
<li><strong>Mandata</strong> – upute državnim organima i činovnicima, nisu namijenjene strankama.</li>
</ol></li>
<li><strong>Responsa prudentium</strong> – <strong>najvažniji izvor klasičnog prava</strong>. August je pravnicima (iz senatorskog staleža) dao <strong>ius publice respondendi ex auctoritate principis</strong> – njihovi odgovori vrijede kao da ih daje car; suca je obvezivalo samo mišljenje pravnika s tim pravom. <strong>Od Hadrijana sudac je vezan suglasnim mišljenjem pravnika.</strong> Starinski oblici respondere, cavere, agere postoje i dalje.</li>
</ul>

<h3>Literatura klasičnih pravnika</h3>
<table>
<tr><th>Vrsta</th><th>Sadržaj</th></tr>
<tr><td>Komentari</td><td><em>libri iuris civilis</em> (Sabin, Kasije – staro civilno pravo), <em>libri ad edictum</em> (pretorski edikt; najstariji komentator Labeon), <em>notae</em> (napomene uz djela starijih pisaca)</td></tr>
<tr><td>Kazuistička literatura</td><td><em>responsa</em> (odgovori strankama), <em>quaestiones</em> (apstraktniji slučajevi koje postavljaju učenici), <em>epistulae</em> (pisma s odgovorima), <em>digesta</em> (sustavne zbirke najuglednijih pravnika), <em>disputationes</em></td></tr>
<tr><td>Monografije</td><td><em>libri singulares</em> – skromnijeg opsega, najčešće procesno, fiskalno i vojno pravo</td></tr>
<tr><td>Udžbenici</td><td><em>institutiones</em> – sustavni uvod u pravo za nastavu, ali i za praktičare; najpoznatije su Gajeve Institucije</td></tr>
</table>

<h3>Etape klasične jurisprudencije</h3>
<h4>I. Ranoklasična etapa – pravne škole</h4>
<ul>
<li><strong>Prokulovci</strong> – osnivač <strong>Labeon</strong> (vršio funkciju pretora; oko 400 knjiga); predstavnici Nerva (otac i sin), Prokul, Pegaz, Celz (otac i sin), Prisk.</li>
<li><strong>Sabinovci</strong> – osnivač <strong>Kapiton</strong> (konzul); predstavnici Sabin, Longin, Valens, Julijan.</li>
<li><strong>Gaj</strong> (2. st.) – o životu se malo zna; nije imao ius respondendi, bio je nižeg podrijetla. Pisao komentare civilnog prava i XII ploča, ali najvažnije su mu <strong>Institucije</strong> – prikaz civilnog i honorarnog privatnog prava s <strong>triparticijom</strong> (osobe, stvari, tužbe), uzorom Corpus iuris civilis, Corpus iuris canonici i Code civila.</li>
</ul>
<h4>II. Kasnoklasična etapa – četiri najveća pravnika</h4>
<ol>
<li><strong>Papinijan</strong> – najugledniji klasični pravnik, praefectus praetorio; vjerojatno ubijen po nalogu Karakale jer nije htio opravdati njegovo ubojstvo; Quaestiones, Responsa (19 knjiga), Definitiones.</li>
<li><strong>Paul</strong> – najplodniji pisac; <em>Sententiae</em>, komentar edikta, monografije; oko 1/6 Digesta.</li>
<li><strong>Ulpijan</strong> – ubijen u zavjeri pretorijanaca; komentar edikta, djelo o civilnom pravu, <em>Liber singularis regularum</em>; oko 1/3 Digesta.</li>
<li><strong>Modestin</strong> – Ulpijanov učenik, posljednji veliki klasični pravnik; Responsa, Digesta u 12 knjiga; jednostavan stil.</li>
</ol>
<h3>Constitutio Antoniniana (212.)</h3>
<p>Edikt (<em>edictum</em>) cara Karakale – materijalni izvor prava, općeobvezna odredba kojom su svi slobodni stanovnici carstva, osim peregrina dediticija, postali rimski građani (<em>cives Romani</em>). Kruna dugog procesa izjednačavanja položaja stanovnika carstva.</p>`
    }
  },

  postklasikaJustinijan: {
    id: "jj1k3e",
    name: "Postklasični izvori i Justinijanova kodifikacija",
    icon: "fa-book",
    color: "#06b6d4",
    flashcards: [
      { id: "ujz7ev", question: "Obilježja postklasičnog razdoblja (284.–527.)", answer: "Car je jedini zakonodavac; konstitucije se zovu leges; stvaralaštvo pravnika zamire (Charisius, Hermogenian), vulgarizacija prava; razdoblje kodifikacija i škola (Beirut, Rim, Konstantinopol).", explanation: "Ius respondendi nestaje za Dioklecijana." },
      { id: "739fkf", question: "Ius antiquum i ius novum", answer: "Ius (iura) antiquum: djela klasičnih pravnika koja se navode pred sudom. Ius novum (leges): carske konstitucije.", explanation: "Navođenje se zloupotrebljavalo – otuda Zakon o citiranju." },
      { id: "gzbddx", question: "Zakon o citiranju (lex citationis, 426.)", answer: "Teodozije II. i Valentinijan III.: pred sudom obvezuju samo djela Papinijana, Paula, Ulpijana, Modestina i Gaja; odlučuje većina, kod jednakosti Papinijan, inače sudac slobodno.", explanation: "„Vijeće mrtvih“ – znak duhovnog siromaštva razdoblja." },
      { id: "vvn37j", question: "Codex Gregorianus i Codex Hermogenianus", answer: "Privatne zbirke carskih konstitucija iz Dioklecijanova doba (oko 292.); Gregorijanov u 15 knjiga, pretežno reskripti; Hermogenijanov je njegova dopuna.", explanation: "Nisu sačuvani u cijelosti." },
      { id: "ept53k", question: "Codex Theodosianus (438.)", answer: "Prva službena zbirka carskih konstitucija (Teodozije II.): 16 knjiga, konstitucije od Konstantina kronološki po titulima (više od 3000); proglašen i na zapadu (Valentinijan III.).", explanation: "Na zapadu vrijedio do recepcije." },
      { id: "evvro7", question: "Leges Romanae barbarorum", answer: "Zbirke rimskog (vulgarnog) prava germanskih vladara za rimske podanike: Codex Eurici (oko 475.), Edictum Theodorici, Lex Romana Burgundionum (oko 500.), Lex Romana Visigothorum (506.).", explanation: "Lex Romana Visigothorum = Breviarium Alaricianum." },
      { id: "zylifg", question: "Codex Iustinianus", answer: "Zbirka carskih konstitucija: prvo izdanje 529. (konstitucija Summa rei publicae), novo izdanje 534. (Codex repetitae praelectionis, konstitucija Cordi nobis) u 12 knjiga.", explanation: "Citiranje: knjiga – titul – konstitucija – paragraf." },
      { id: "nag9zn", question: "Digesta (Pandectae)", answer: "Zbirka odlomaka iz djela klasičnih pravnika (iura): 50 knjiga, 432 titula, 9142 fragmenta; proglašena 533. konstitucijom Tanta, rad započet konstitucijom Deo auctore.", explanation: "Komisija od 16 članova pod Tribonijanom." },
      { id: "tzkl66", question: "Institutiones (533.)", answer: "Udžbenik za početnike u 4 knjige, sastavljen ponajviše po Gajevim Institucijama; proglašen konstitucijom Imperatoriam maiestatem i ima snagu zakona.", explanation: "Citiranje: knjiga – titul – paragraf." },
      { id: "7liopk", question: "Novellae", answer: "Nove konstitucije koje je Justinijan donio nakon 534.; mijenjale su odredbe ostalih dijelova, a nisu službeno kodificirane (sačuvane u privatnim zbirkama).", explanation: "Npr. novele 118 i 127 o nasljeđivanju." },
      { id: "nogmh6", question: "Interpolacije (emblemata Triboniani)", answer: "Izmjene koje su Tribonijan i suradnici unosili u tekstove klasičnih pravnika i konstitucije radi prilagodbe potrebama vremena.", explanation: "Bili su na to ovlašteni." },
      { id: "7t6q65", question: "Corpus iuris civilis – sastav i naziv", answer: "Institucije, Digesta i Kodeks (iste pravne snage) te Novele. Zajednički naziv Corpus iuris civilis dao je u 16. st. izdavač Dionizije Gotofred.", explanation: "Primjer citata: D. 6.2.11.7 – knjiga, titul, fragment, paragraf." },
      { id: "lrdism", question: "Quinquaginta decisiones", answer: "Pedeset Justinijanovih odluka kojima su riješena protuslovlja među klasičnim pravnicima prije izrade Digesta.", explanation: "Zbirka nije sačuvana." },
      { id: "yx3ejy", question: "Zbirke koje sadrže i leges i iura", answer: "Fragmenta Vaticana (otkrivena 1821.), Collatio legum Mosaicarum et Romanarum, Liber Syro-Romanus.", explanation: "Samo iura: Ulpijanove Regulae, Paulove Sententiae, Epitome Gai." }
    ],
    quiz: [
      { id: "uyekg5", question: "Prema Zakonu o citiranju, kod jednakog broja različitih mišljenja odlučuje mišljenje:", options: ["Gaja", "Domicija Ulpijana", "Papinijana", "Julija Paula"], correct: 2 },
      { id: "ibkdx2", question: "Zakon o citiranju donesen je:", options: ["u pretklasičnom razdoblju", "nakon zbirke Codex Gregorianus", "za Papinijanova života", "u doba Justinijana"], correct: 1 },
      { id: "naal3b", question: "Prva službena zbirka carskih konstitucija jest:", options: ["Codex Gregorianus", "Codex Hermogenianus", "Codex Iustinianus", "Codex Theodosianus"], correct: 3 },
      { id: "7n8mhy", question: "Codex Iustinianus sadrži:", options: ["carske konstitucije", "Institucije s Digestama", "odlomke klasičnih pravnika", "Justinijanove kasnije Novele"], correct: 0 },
      { id: "siospe", question: "Digesta su proglašena konstitucijom:", options: ["Cordi nobis", "Imperatoriam maiestatem", "Tanta", "Summa rei publicae"], correct: 2 },
      { id: "s9h5v1", question: "Prvo izdanje Justinijanova Kodeksa potječe iz:", options: ["529.", "533.", "534.", "438."], correct: 0 },
      { id: "a94ih9", question: "Koliko knjiga imaju Digesta?", options: ["12", "16", "4", "50"], correct: 3 },
      { id: "47zyy0", question: "Lex Romana Visigothorum (Breviarium Alaricianum) objavljen je:", options: ["438.", "506.", "426.", "533."], correct: 1 },
      { id: "8fo6i6", question: "Koji je kronološki redoslijed točan?", options: ["Lex citationis, edictum perpetuum, Codex Theodosianus", "Codex Theodosianus, Lex citationis, edictum perpetuum", "edictum perpetuum, Lex citationis, Codex Theodosianus", "edictum perpetuum, Codex Theodosianus, Lex citationis"], correct: 2 },
      { id: "s6g1qy", question: "Izmjene Tribonijana i suradnika u klasičnim tekstovima nazivaju se:", options: ["interpolacije", "glose (marginalne)", "novele (leges novae)", "reskripti"], correct: 0 },
      { id: "9ol3up", question: "Justinijanove Institucije su:", options: ["zbirka konstitucija u 12 knjiga", "zbirka fragmenata u 50 knjiga", "udžbenik u 4 knjige sa snagom zakona", "privatna zbirka reskripata"], correct: 2 },
      { id: "o7x4of", question: "Koja zbirka sadrži i leges i iura?", options: ["Pauli Sententiae", "Fragmenta Vaticana", "Ulpiani Regulae", "Codex Gregorianus"], correct: 1 }
    ],
    fillBlanks: [
      { id: "fi31sk", sentence: "Zbirka pedeset Justinijanovih odluka zove se quinquaginta _______.", answer: "decisiones", hint: "Odluke." },
      { id: "lcb56p", sentence: "Novo izdanje Justinijanova Kodeksa iz 534. zove se Codex repetitae _______.", answer: "praelectionis", hint: "Ponovljeno predavanje." }
    ],
    learn: {
      id: "rhcqxo",
      title: "Postklasično pravo i Justinijanova kodifikacija",
      content: `<h3>Postklasično razdoblje (284. – 527.)</h3>
<ul>
<li>Obuhvaća dominat do Justinijana – razdoblje opadanja, ali i <strong>kodifikacija i sređivanja prava</strong>.</li>
<li>Car je jedini zakonodavac, vrhovni sudac i upravljač; svi izvori ustupaju mjesto carskim konstitucijama koje se sada zovu <strong>leges</strong>. Konstitucije su <em>leges generales (edictales)</em> – opća pravila, ili <em>leges speciales (personales)</em> – pojedinačni slučajevi; posebna vrsta su <strong>pragmaticae sanctiones</strong>. Razlika između edikta i reskripta nestaje. Od 429. konstitucija jednog dijela carstva vrijedi u drugom samo ako je tamo proglašena pragmatičnom sankcijom.</li>
<li>Običajno pravo ostaje, ali gubi značaj. Stvaralaštvo pravnika zamire – važniji su samo <strong>Charisius i Hermogenian</strong>; <strong>ius respondendi nestaje za Dioklecijana</strong> (birokratizacija). <strong>Vulgarizacija</strong> prava: grčki, orijentalni i germanski utjecaji, skraćeni pregledi klasičnih tekstova.</li>
<li>Državne pravne škole: <strong>Beirut</strong> (3. st.), <strong>Rim</strong> (4. st.), <strong>Konstantinopol</strong> (5. st.); studij 4 godine, za Justinijana 5 (Gajeve Institucije, edikt, Papinijanova Responsa, konstitucije). Privatne škole (Aleksandrija, Cezareja) Justinijan zabranjuje.</li>
<li>Pred sudom se navode djela klasičnih pravnika – <strong>ius antiquum (iura)</strong> – i carske konstitucije – <strong>ius novum (leges)</strong>.</li>
</ul>
<h4>Zakon o citiranju (lex citationis), 426.</h4>
<p>Teodozije II. i Valentinijan III. odredili su da se pred sudom smiju citirati i za suca imaju obveznu snagu samo djela petorice klasičnih pravnika („vijeće mrtvih“): <strong>Papinijana, Paula, Ulpijana, Modestina i Gaja</strong>. Suglasnost se ne traži – odlučuje <strong>većina</strong>; kod jednakosti odlučuje <strong>Papinijan</strong>; ako se on nije izjasnio, sudac odlučuje slobodno. Zakon je dokaz duhovnog siromaštva razdoblja.</p>

<h3>Predjustinijanske pravne zbirke</h3>
<table>
<tr><th>Zbirka</th><th>Obilježja</th></tr>
<tr><td><strong>Codex Gregorianus</strong> (oko 292.)</td><td>privatna zbirka carskih konstitucija (istok), 15 knjiga, pretežno reskripti, za potrebe civilnog sudovanja</td></tr>
<tr><td><strong>Codex Hermogenianus</strong></td><td>dopuna Gregorijanova kodeksa (istok), privatna</td></tr>
<tr><td><strong>Constitutiones Sirmondianae</strong> (oko 425.)</td><td>16 konstitucija o crkvenom pravu; nazvane po francuskom izdavaču Sirmondu (1631.); privatna zbirka</td></tr>
<tr><td><strong>Codex Theodosianus</strong> (438.)</td><td><strong>prva službena zbirka</strong> konstitucija; Teodozije II., komisija od 16 članova; konstitucije od Konstantina dalje (više od 3000) koje su još na snazi; 16 knjiga, tituli, kronološki; pragmatičnom sankcijom upućen Valentinijanu III. koji ga je proglasio u senatu; glavna pažnja javnom pravu; na istoku vrijedi do Justinijana, na zapadu do recepcije; stari kodeksi nisu ukinuti</td></tr>
</table>
<p><strong>Leges Romanae barbarorum</strong> – germanski vladari za rimske podanike priređuju zbirke vulgarnog prava s izvacima iz postklasičnih djela i konstitucija: <strong>Codex Eurici</strong> (oko 475., 30 titula), <strong>Edictum Theodorici</strong> (154 članka, sačuvan u cijelosti), <strong>Lex Romana Burgundionum</strong> (oko 500.), <strong>Lex Romana Visigothorum</strong> (<em>Breviarium Alaricianum</em>, 506., Alarik II.).</p>
<ul>
<li>Zbirke pravničkog prava (iura): <strong>Ulpijanove Regulae, Paulove Sententiae, Epitome Gai</strong> (skraćene prve tri knjige Institucija).</li>
<li>Zbirke koje sadrže <em>i leges i iura</em>: <strong>Fragmenta Vaticana</strong> (nađena u Vatikanskoj knjižnici 1821.; zapad, 5. st.), <strong>Collatio legum Mosaicarum et Romanarum</strong> (usporedba s Mojsijevim zakonodavstvom), <strong>Liber Syro-Romanus</strong> (na grčkom, za praksu).</li>
</ul>

<h3>Justinijanova kodifikacija (527. – 565.)</h3>
<ol>
<li><strong>Codex Iustinianus</strong> – komisija od 10 članova izabrala je iz triju kodeksa i kasnijih novela što još vrijedi; proglašen <strong>529.</strong> konstitucijom <em>Summa rei publicae</em> (prvo izdanje nije sačuvano).</li>
<li><strong>Quinquaginta decisiones</strong> – 50 odluka kojima su riješena protuslovlja klasičnih pravnika (nisu sačuvane, dio je ušao u Kodeks).</li>
<li><strong>Digesta (Pandectae)</strong> – rad započinje konstitucijom <em>Deo auctore</em> (upućena Tribonijanu); komisija od 16 članova u tri godine kompilira pravničko pravo; proglašena <strong>533.</strong> konstitucijom <em>Tanta</em>. <strong>50 knjiga, 432 titula, 9142 fragmenta</strong>; svaki fragment ima <em>inscriptio</em> (pravnik i djelo). Primjer citata: <em>D. 6.2.11.7</em> – Digesta, 6. knjiga, 2. titul, 11. fragment, 7. paragraf.</li>
<li><strong>Institutiones</strong> – udžbenik za početnike, najviše po Gajevim Institucijama; proglašen <strong>533.</strong> konstitucijom <em>Imperatoriam maiestatem</em>; <strong>4 knjige</strong>, tituli, paragrafi (npr. I. 2.2.1); ima snagu zakona.</li>
<li><strong>Codex repetitae praelectionis</strong> – novo izdanje Kodeksa (<strong>534.</strong>, konstitucija <em>Cordi nobis</em>), <strong>12 knjiga</strong>; konstitucije od Hadrijana, najviše Dioklecijanove (oko 1200). Citat: C. 5.7.1.1 – knjiga, titul, konstitucija, paragraf.</li>
<li><strong>Novellae (leges)</strong> – konstitucije donesene u idućih 30 godina; temeljite revizije instituta; nisu službeno kodificirane, sačuvane u privatnim zbirkama; stavljale su izvan snage odgovarajuća mjesta ostalih dijelova.</li>
</ol>
<p><strong>Interpolacije</strong> (<em>emblemata Triboniani</em>) – izmjene koje su Tribonijan i suradnici unosili u tekstove klasika i konstitucija radi korisnosti i potreba vremena; bili su na to ovlašteni. Institucije, Digesta i Kodeks imaju jednaku pravnu snagu. Naziv <strong>Corpus iuris civilis</strong> potječe iz izdanja <strong>Dionizija Gotofreda</strong> u 16. st. Justinijan je time sačuvao rimsku pravnu misao i omogućio da recepcijom postane pozitivno pravo većeg dijela Europe.</p>`
    }
  },

  recepcija: {
    id: "ocg2x1",
    name: "Recepcija rimskog prava i pravne škole",
    icon: "fa-earth-europe",
    color: "#a855f7",
    flashcards: [
      { id: "rvtr3v", question: "Što je recepcija rimskog prava?", answer: "Preuzimanje (Justinijanova) rimskog prava kao pozitivnog prava u zemljama zapadne i srednje Europe, uz domaće feudalno partikularno pravo, od kraja 11. st. do velikih kodifikacija.", explanation: "Pripreme su započeli glosatori u Bologni." },
      { id: "f9i2q1", question: "Glosatori – vrijeme i osnivač", answer: "11.–13. st., Bologna. Osnivač je Irnerije, koji je početkom 12. st. tumačio cijeli Corpus iuris civilis s Novelama; poticaj je otkriće cjelovitog teksta Digesta (Pisa).", explanation: "Potreba novog prava za gradove, obrt i trgovinu." },
      { id: "grluu1", question: "Quattuor doctores", answer: "Četiri doktora – Irnerijevi učenici, glosatori: Martinus, Bulgarus, Iacobus i Hugo.", explanation: "Vrhunac škole: Azo." },
      { id: "ymcjmr", question: "Glossa interlinearis i glossa marginalis", answer: "Glose su kratke napomene kojima se tumači značenje riječi i sadržaja: interlinearne između redaka, marginalne na rubu teksta.", explanation: "Najviše su proučavali obvezno pravo." },
      { id: "quo9kq", question: "Glossa ordinaria (magistralis) – Akurzije", answer: "Akurzije (Accursius) je u 13. st. (oko 1250.) sabrao glose u jednu zbirku – glossa ordinaria sive magistralis; postala je mjerilo opsega recepcije.", explanation: "Nije uklanjao proturječja, dodao je vlastite glose." },
      { id: "6qne6v", question: "Quidquid non agnoscit glossa, non agnoscit curia", answer: "„Što ne priznaje glosa, ne priznaje ni sud.“ – izraz opsega recepcije: primjenjivalo se ono rimsko pravo koje je obradila glosa.", explanation: "Veže se uz Akurzijevu glosu." },
      { id: "oq4srl", question: "Postglosatori (komentatori)", answer: "13.–16. st.: uspoređuju glose radi općeg mišljenja („glosiranje glosa“), pišu komentare, povezuju rimsko s kanonskim i domaćim pravom – ius commune. Cinus de Pistoia, Bartolus, Baldus.", explanation: "Mos docendi Italicus." },
      { id: "ld2jpt", question: "Nullus bonus iurista, nisi sit Bartolista", answer: "„Nije dobar pravnik tko nije bartolist“ – tko ne poznaje djela Bartola de Saxoferrato.", explanation: "Bartol je najpoznatiji postglosator." },
      { id: "x74032", question: "Francuska elegantna škola", answer: "16. st.: povijesno-kritičko proučavanje izvornih tekstova Justinijanove kodifikacije (mos docendi Gallicus). Predstavnici: Alciatus, Cuiacius, Donellus.", explanation: "Po pristupu je suprotna skolastičkom tumačenju glosatora i komentatora." },
      { id: "hwgi46", question: "Pandektno pravo i usus modernus pandectarum", answer: "Pandektno pravo = ius commune, recipirano rimsko pravo u Europi (ime po Digestama – Pandektama). Usus modernus pandectarum – njemačka prilagodba praksi (17.–18. st.).", explanation: "Vrijedilo do velikih kodifikacija 18.–19. st." },
      { id: "we2lf8", question: "Škola prirodnog prava", answer: "17.–18. st.: uz pozitivno postoji vječno, razumno prirodno pravo (sloboda, jednakost, vlasništvo). Započinje Grotiusom (1625.); Hobbes, Locke, Pufendorf, Montesquieu, Rousseau.", explanation: "Progresivna u borbi protiv feudalnih privilegija." },
      { id: "dvtt59", question: "Historijska pravna škola", answer: "19. st., Friedrich Carl von Savigny (1814.): pravo je izraz narodnog duha i razvija se povijesno; učenik Puchta. Etape: narodno pravo, znanstveno pravo, kodifikacija.", explanation: "Oporba školi prirodnog prava." },
      { id: "52k09b", question: "Pandektistika (Windscheid)", answer: "Njemačka pravna znanost 19. st. koja iz Digesta (Pandekata) izgrađuje sustavni, pojmovni opći dio građanskog prava; najpoznatiji predstavnik je Bernhard Windscheid.", explanation: "Njezin je pojmovni sustav oblikovao njemački građanski zakonik (BGB)." },
      { id: "pzqnhf", question: "Velike građanske kodifikacije", answer: "Code civil (Francuska, 1804.), ABGB (Austrija, proglašen 1811.) i BGB (Njemačka, na snazi od 1900.): zamjenjuju opće pravo (ius commune) i partikularna prava; pojmovi ostaju rimski.", explanation: "Code civil slijedi sustav Institucija, a BGB pandektni sustav." },
      { id: "d2flal", question: "Opći građanski zakonik (OGZ) u hrvatskim zemljama", answer: "OGZ je hrvatski naziv za austrijski ABGB iz 1811.; u banskoj Hrvatskoj i Slavoniji uveden je 1853. i tako unosi rimskopravne pojmove u hrvatsko građansko pravo.", explanation: "Uveden je carskim patentom iz 1852. (na snazi od 1. 5. 1853.), u doba neoapsolutizma." }
    ],
    quiz: [
      { id: "2adger", question: "Osnivač glosatorske škole u Bologni bio je:", options: ["Akurzije", "Irnerije", "Bartol", "Alciatus"], correct: 1 },
      { id: "6bx3nx", question: "Koji od navedenih nije glosator?", options: ["Martinus", "Bulgarus", "Bartolus", "Hugo"], correct: 2 },
      { id: "mh5end", question: "Glossa ordinaria sive magistralis djelo je:", options: ["Irnerija", "Bartola", "Cuiaciusa", "Akurzija"], correct: 3 },
      { id: "up4war", question: "Načelo „Quidquid non agnoscit glossa, non agnoscit curia“ izražava:", options: ["opseg recepcije", "zabranu tumačenja", "prednost kanonskog prava", "načelo prirodnog prava"], correct: 0 },
      { id: "2x7gz0", question: "Predstavnik postglosatora je:", options: ["Hugues Doneau (Donellus)", "Baldus de Ubaldis", "Iacobus de Porta Ravennate", "Hugo Grotius"], correct: 1 },
      { id: "dt2u1a", question: "Francuska elegantna škola djeluje u:", options: ["12. st.", "14. st.", "16. st.", "19. st."], correct: 2 },
      { id: "fy49y2", question: "Historijsku pravnu školu osnovao je:", options: ["Grotius", "Savigny", "Puchta", "Irnerije"], correct: 1 },
      { id: "tfaut6", question: "Pandektno pravo naziv duguje:", options: ["Gajevim Institucijama", "Kodeksu", "Novelama", "Justinijanovim Digestama"], correct: 3 },
      { id: "f3vq8s", question: "Rad škole prirodnog prava započeo je djelom „O pravu rata i mira“ autora:", options: ["Hugo Grotius", "John Locke", "Thomas Hobbes", "Samuel Pufendorf"], correct: 0 },
      { id: "r3i7o8", question: "„Glosiranje glosa“, tj. uspoređivanje glosa radi općeg mišljenja, obilježje je:", options: ["glosatora", "postglosatora", "elegantne škole", "historijske škole"], correct: 1 },
      { id: "sydulf", question: "Najpoznatiji predstavnik pandektistike je:", options: ["Hugues Doneau (Donellus)", "Irnerije iz Bologne", "Bernhard Windscheid", "Bartolus de Saxoferrato"], correct: 2 },
      { id: "4ljl4c", question: "Njemački građanski zakonik (BGB) stupio je na snagu:", options: ["1804.", "1812.", "1853.", "1900."], correct: 3 },
      { id: "r05ecc", question: "Opći građanski zakonik (OGZ) u hrvatskim zemljama naziv je za:", options: ["francuski Code civil", "austrijski ABGB", "njemački BGB", "Justinijanov Kodeks"], correct: 1 },
      { id: "cz4eg4", question: "Code civil iz 1804. po sustavu slijedi:", options: ["institucionalni sustav (osobe, stvari)", "pandektni sustav s općim dijelom (kao BGB)", "sustav Digesta po knjigama pretorskog edikta", "kazuistički sustav običajnog prava"], correct: 0 }
    ],
    fillBlanks: [
      { id: "i8z33g", sentence: "Bilješke glosatora pisane između redaka zovu se glossae _______.", answer: "interlineares", hint: "Između linija." },
      { id: "ox6d73", sentence: "Izreka o Bartolu glasi: nullus bonus iurista, nisi sit _______.", answer: "Bartolista", hint: "Sljedbenik Bartola." },
      { id: "04juf8", sentence: "Austrijski ABGB u banskoj Hrvatskoj i Slavoniji uveden je godine _______.", answer: "1853", hint: "Sredina 19. stoljeća." },
      { id: "ae5khm", sentence: "Najpoznatiji predstavnik pandektistike je Bernhard _______.", answer: "Windscheid", hint: "Autor udžbenika pandektnog prava." }
    ],
    learn: {
      id: "j7gc3u",
      title: "Recepcija rimskog prava i znanstvena obrada nakon Justinijana",
      content: `<h3>Pojam recepcije</h3>
<p><strong>Recepcija rimskog prava</strong> je preuzimanje Justinijanova rimskog prava kao pozitivnog prava u državama zapadne i srednje Europe, gdje je vrijedilo uz feudalno partikularno pravo (supsidijarno). Pripreme su započele djelovanjem glosatora u Bologni potkraj 11. st. S razvojem gradova, obrta i trgovine od 11. st. pravni promet počiva na privatnom vlasništvu, a feudalno pravo tome ne odgovara; rimsko pravo nudi gotov sustav izgrađen oko privatnog vlasništva. Tako prihvaćeno pravo naziva se <strong>pandektno pravo</strong> (po Digestama – Pandektama) i vrijedilo je do velikih kodifikacija 18. i 19. st.</p>

<h3>Glosatori (11. – 13. st.)</h3>
<ul>
<li>Poticaj: otkriće cjelovitog teksta Justinijanovih Digesta (Pisa). <strong>Irnerije</strong>, sudac, početkom 12. st. u <strong>Bologni</strong> osniva pravnu školu i tumači cijeli Corpus iuris civilis, uključujući Novele.</li>
<li>Metoda: tumačenje riječi i sadržaja kratkim napomenama – <strong>glosama</strong>: <em>glossa interlinearis</em> (između redaka) i <em>glossa marginalis</em> (na rubu). Najviše proučavaju obvezno pravo (potrebno praksi). Rimsko pravo proučavaju pragmatično, dogmatski, kazuistički, fragmentirano i antihistorijski.</li>
<li>Predstavnici: osnivač Irnerije; <strong>quattuor doctores</strong> – Martinus, Bulgarus, Iacobus, Hugo; vrhunac Azo.</li>
<li><strong>Akurzije (Accursius)</strong> u 13. st. (oko 1250.) skuplja glose u <strong>glossa ordinaria sive magistralis</strong>, dodaje vlastite glose, ali ne uklanja proturječja. <em>Quidquid non agnoscit glossa, non agnoscit curia</em> – „Što ne priznaje glosa, ne priznaje ni sud“: izraz <strong>opsega recepcije</strong>.</li>
</ul>

<h3>Postglosatori – komentatori (13. – 16. st.)</h3>
<ul>
<li>Djeluju u Padovi, Perugi, Paviji, Bologni; njihov rad nije okrenut izravno Justinijanu, nego glosama prethodnika – ispituju i uspoređuju glose da bi utvrdili opće mišljenje („glosiranje glosa“); pišu sustavne preglede (<em>summae</em>) i komentare.</li>
<li>Nadograđuju rimsko pravo analizom pozitivnog prava i dopunjuju ga kanonskim, germanskim i langobardskim pravom – velika uloga u stvaranju <strong>ius commune</strong>. Način poučavanja: <em>mos docendi Italicus</em>.</li>
<li>Predstavnici: <strong>Cinus de Pistoia, Bartolus de Saxoferrato, Baldus de Ubaldis</strong>. <em>Nullus bonus iurista, nisi sit Bartolista</em> – „Nije dobar pravnik tko ne poznaje djela Bartolova“.</li>
</ul>

<h3>Francuska elegantna škola (16. st.)</h3>
<p>Nasuprot skolastičkom tumačenju, francuski humanisti (<em>mos docendi Gallicus</em>) povijesno-kritički ispituju izvore i nastoje utvrditi autentičan tekst Justinijanove kodifikacije: kritička obrada teksta, povijesno tumačenje, sustavno sređivanje građe („elegantna metoda“). Predstavnici: <strong>Alciatus, Cuiacius, Donellus</strong> (i Balduinus).</p>

<h3>Pandektno pravo i usus modernus pandectarum</h3>
<p>Pandektno pravo u širem smislu je opće pravo (<em>ius commune</em>) koje je vrijedilo u gotovo cijeloj Europi u srednjem vijeku i ranom novom vijeku; u užem smislu recipirano rimsko pravo prilagođeno njemačkoj praksi – <strong>usus modernus pandectarum</strong>.</p>

<h3>Škola prirodnog prava (17. – 18. st.)</h3>
<p>Uz pozitivno pravo postoji vječno, razumno i nepromjenjivo prirodno pravo (sloboda, jednakost, privatno vlasništvo) koje izvire iz ljudskog razuma. Nastaje u doba raspada feudalizma kao izraz težnji građanstva; započinje <strong>Hugo Grotius</strong> djelom <em>O pravu rata i mira</em> (1625.); Hobbes, Locke, Pufendorf, Montesquieu, Rousseau, Voltaire. U rimskim institucijama traže elemente privatnog prava.</p>

<h3>Historijska pravna škola (19. st.)</h3>
<p>Osnovao ju je njemački pravnik <strong>Friedrich Carl von Savigny</strong> (1814./1815., rasprava o pozvanosti našeg vremena za zakonodavstvo i pravnu znanost), uz učenika <strong>Puchtu</strong>. Romantičarska oporba racionalizmu prirodnog prava: pravo je plod <strong>narodnog duha</strong> i povijesnog razvoja. Tri etape evolucije prava: prirodno-narodno pravo, znanstveno pravo, etapa kodifikacije.</p>

<h3>Dopuna: pandektistika, velike kodifikacije i recepcija u hrvatskim zemljama</h3>
<p><strong>Pandektistika</strong> je njemačka pravna znanost 19. st. koja je iz Digesta (Pandekata) izgrađivala sustavno, pojmovno uređeno građansko pravo, s općim dijelom koji vrijedi za sve institute. Najpoznatiji predstavnik je <strong>Bernhard Windscheid</strong>, autor udžbenika pandektnog prava (<em>Lehrbuch des Pandektenrechts</em>); njezin je pojmovni sustav oblikovao njemački građanski zakonik.</p>
<p><strong>Velike građanske kodifikacije</strong> zamjenjuju dotadašnje opće pravo (ius commune) i partikularna prava kao pozitivno pravo, ali rimski pojmovi (vlasništvo, posjed, obveza, ugovor, nasljeđivanje) ostaju njihovom osnovom:</p>
<table>
<tr><th>Zakonik</th><th>Država</th><th>Vrijeme</th><th>Obilježje</th></tr>
<tr><td><strong>Code civil</strong> (Napoleonov zakonik)</td><td>Francuska</td><td>1804.</td><td>slijedi institucionalni sustav (osobe, stvari, stjecanje prava)</td></tr>
<tr><td><strong>ABGB</strong> (Opći austrijski građanski zakonik)</td><td>Austrija</td><td>proglašen 1811., stupio na snagu 1812.</td><td>jasan, sažet, prirodnopravno nadahnut zakonik</td></tr>
<tr><td><strong>BGB</strong> (Bürgerliches Gesetzbuch)</td><td>Njemačka</td><td>na snazi od 1900.</td><td>pandektni sustav s općim dijelom (obvezno, stvarno, obiteljsko i nasljedno pravo)</td></tr>
</table>
<p><strong>Prostorni domašaj recepcije:</strong> rimsko pravo prihvaćeno je u zapadnoj i srednjoj Europi (Italija, Francuska, Njemačka i dr.), dok je Engleska, s common lawom, ostala uglavnom izvan recepcije. U <strong>hrvatskim zemljama</strong> rimskopravni pojmovi ulaze u pozitivno pravo ponajprije preko austrijskog ABGB-a, kojemu je hrvatski naziv <strong>Opći građanski zakonik (OGZ)</strong>; u banskoj Hrvatskoj i Slavoniji uveden je 1853.</p>`
    }
  },

  pravniSubjekti: {
    id: "hw1uo9",
    name: "Pravni subjekti: pravna i djelatna sposobnost",
    icon: "fa-user-check",
    color: "#ec4899",
    flashcards: [
      { id: "yrjhz0", question: "Pravna sposobnost (capacitas iuridica)", answer: "Sposobnost biti nositeljem prava i dužnosti, tj. biti pravni subjekt.", explanation: "Ovisila je o tri statusa: libertatis, civitatis, familiae." },
      { id: "pbwhkp", question: "Tri statusa o kojima ovisi pravna sposobnost", answer: "Status libertatis (slobodan ili rob), status civitatis (rimski građanin, Latin ili peregrin), status familiae (sui iuris ili alieni iuris).", explanation: "Punu sposobnost ima slobodan rimski građanin sui iuris." },
      { id: "uweatz", question: "Capitis deminutio", answer: "Promjena statusa koja mijenja pravnu sposobnost: maxima (gubitak slobode), media (gubitak građanstva), minima (promjena položaja u obitelji).", explanation: "Minima npr. adrogacijom, emancipacijom, brakom cum manu." },
      { id: "6l9wlm", question: "Nasciturus pro iam nato habetur, quotiens de commodis eius agitur", answer: "„Začeto dijete smatra se rođenim kad god se radi o njegovim probitcima.“ Uz pretpostavku da se rodi živo.", explanation: "Odluke o oporuci i ostavini odgađaju se do poroda (postumus)." },
      { id: "ixz1jy", question: "Fictio iuris idem operatur quod veritas", answer: "„Pravna fikcija djeluje kao istina.“ Ono što pravo zamišlja uzima se kao istinito – npr. nasciturus kao pravni subjekt.", explanation: "Fikcija potječe iz postupovnog prava starijeg civilnog razdoblja." },
      { id: "t2lge9", question: "Početak i kraj fizičke osobe", answer: "Fizička osoba nastaje rođenjem (začetak uz fikciju), a prestaje smrću ili gubitkom slobode. Tko izvodi prava iz nečije smrti, mora je dokazati (nije bilo matica).", explanation: "Personae physicae." },
      { id: "pja3ta", question: "Ograničenja pravne sposobnosti", answer: "Klasna i socijalna pripadnost, spol, vjera, intestabilitas, nota censoria, infamia i turpitudo.", explanation: "Ograničavala su javna i privatna prava." },
      { id: "wsd60g", question: "Intestabilitas", answer: "Gubitak sposobnosti biti svjedokom i pozivati svjedoke za osobu koja je odbila svjedočiti o poslu kojem je prisustvovala kao svjedok.", explanation: "Umanjenje građanske časti." },
      { id: "pbtbpg", question: "Nota censoria", answer: "Kaznena mjera cenzora: zbog nedoličnog ponašanja građanin se pri popisu premješta u niži razred.", explanation: "Cenzus – popis po razredima i imovini." },
      { id: "fu936n", question: "Infamia i turpitudo", answer: "Infamia (iuris) – gubitak časti po pravnom propisu: gubi ius suffragii i honorum, ne može biti svjedok, sudac ni zastupnik. Turpitudo (infamia facti) – loš glas po javnom mnijenju.", explanation: "Infamiju povlače npr. osude iz actio furti, pro socio." },
      { id: "8k041b", question: "Djelatna sposobnost (capacitas agendi)", answer: "Sposobnost vlastitim očitovanjem volje stvarati, mijenjati i ukidati prava i obveze. Obuhvaća poslovnu i deliktnu sposobnost.", explanation: "Ograničavaju je dob, spol, duševno zdravlje i rasipništvo." },
      { id: "eszwmt", question: "Poslovna i deliktna sposobnost", answer: "Poslovna: sposobnost sklapati pravne poslove. Deliktna (uračunljivost): sposobnost odgovarati za vlastita protupravna djela.", explanation: "Obje su dijelovi djelatne sposobnosti." },
      { id: "heqt2h", question: "Infantes", answer: "Djeca do navršene 7. godine („koja ne govore“) – neoborivo (praesumptio iuris et de iure) potpuno djelatno nesposobna; za njih stječe tutor.", explanation: "U postklasici smiju sami steći posjed." },
      { id: "iceh6v", question: "Impuberes infantia maiores", answer: "Dječaci 7–14 i djevojčice 7–12 godina: mogu sami sklapati poslove kojima samo stječu; za obvezujuće treba tutorova auctoritatis interpositio u času sklapanja.", explanation: "Npr. primiti dar mogu sami, dati zajam ne." },
      { id: "25brim", question: "Puberes minores viginti quinque annis", answer: "Dorasli mlađi od 25: po civilnom pravu potpuno sposobni, ali ih štite Lex Plaetoria i pretor (exceptio, restitutio in integrum, curator).", explanation: "S 25 godina postaje se punoljetan." },
      { id: "01usp4", question: "Venia aetatis", answer: "Punoljetnost dodijeljena carevom dozvolom (od Konstantina) muškarcima s 20 i ženama s 18 godina; ni oni prije 25. ne smiju darivati ni otuđivati nekretnine.", explanation: "Postklasika izjednačava impuberes i minores." },
      { id: "yv5m4o", question: "Universitas personarum i universitas rerum", answer: "Personarum: udruženje osoba (korporacija, npr. škola). Rerum: imovina namijenjena svrsi (zaklada, npr. nagrada, stipendija).", explanation: "Pandektistika: korporacije, zavodi, zaklade." },
      { id: "evfpz6", question: "Aerarium, fiscus, patrimonium Caesaris", answer: "Aerarium – imovina rimske države (javno pravo). Fiscus – careva imovina u svojstvu cara, uređena privatnopravno. Patrimonium – carevo privatno vlasništvo.", explanation: "Jačanjem cara aerarium nestaje, fiscus postaje državna imovina." }
    ],
    quiz: [
      { id: "s0d8m0", question: "Sposobnost biti nositeljem prava i dužnosti jest:", options: ["djelatna sposobnost", "poslovna sposobnost", "pravna sposobnost", "deliktna sposobnost"], correct: 2 },
      { id: "7eujcv", question: "Gubitak rimskog građanstva naziva se:", options: ["capitis deminutio media", "capitis deminutio minima", "capitis deminutio maxima", "infamia iuris"], correct: 0 },
      { id: "hbdr9v", question: "Načelo „nasciturus pro iam nato habetur“ primjenjuje se:", options: ["uvijek i bez ikakvih uvjeta", "kad se radi o probitcima začetog djeteta", "samo ako je otac u času poroda živ", "samo pri adopciji i adrogaciji djeteta"], correct: 1 },
      { id: "cg1443", question: "Tko je potpuno djelatno nesposoban?", options: ["impuberes infantia maiores", "minores XXV annis", "puberes", "infantes"], correct: 3 },
      { id: "304v0y", question: "Djelatna sposobnost je:", options: ["sposobnost biti pravnim subjektom, tj. nositeljem prava i dužnosti", "pravo sklapanja valjanog zakonitog braka", "sposobnost vlastitim djelovanjem stvarati pravne učinke", "pravo sklapanja poslova civilnog prava (commercium)"], correct: 2 },
      { id: "41he5g", question: "Zakon koji štiti osobe mlađe od 25 godina od prijevare jest:", options: ["Lex Plaetoria", "Lex Atilia", "Lex Cincia", "Lex Falcidia"], correct: 0 },
      { id: "31zka3", question: "Mlađi maloljetnik (impubes infantia maior) bez tutora može valjano:", options: ["dati zajam", "primiti dar", "prodati stvar", "preuzeti jamstvo"], correct: 1 },
      { id: "s3j0ug", question: "Venia aetatis se ženama dodjeljivala s navršenih:", options: ["12 godina", "14 godina", "18 godina", "25 godina"], correct: 2 },
      { id: "wwvwh4", question: "Premještaj građanina u niži razred zbog nedoličnog ponašanja zove se:", options: ["infamia", "nota censoria", "intestabilitas", "turpitudo"], correct: 1 },
      { id: "qeyvcc", question: "Tko gubi pravo biti svjedok jer je odbio svjedočiti o poslu kojem je prisustvovao?", options: ["infamis", "turpis persona", "intestabilis", "prodigus"], correct: 2 },
      { id: "qsn3u9", question: "Zaklada (imovina namijenjena svrsi) u rimskoj terminologiji je:", options: ["universitas personarum", "universitas rerum", "municipium", "collegium"], correct: 1 },
      { id: "czt24e", question: "Careva imovina koju ima kao car, uređena po privatnopravnim načelima, jest:", options: ["aerarium", "patrimonium", "fiscus", "peculium"], correct: 2 }
    ],
    fillBlanks: [
      { id: "gg3x44", sentence: "Fictio iuris idem operatur quod _______.", answer: "veritas", hint: "Istina." },
      { id: "72gbvb", sentence: "Gubitak časti na temelju javnog mnijenja zove se turpitudo ili infamia _______.", answer: "facti", hint: "Suprotno od infamia iuris." },
      { id: "trhbin", sentence: "Sposobnost odgovarati za vlastita protupravna djela zove se _______ sposobnost.", answer: "deliktna", hint: "Delikt." },
      { id: "xfdemh", sentence: "Odobrenje tutora u času sklapanja posla zove se auctoritatis _______.", answer: "interpositio", hint: "Umetanje autoriteta." },
      { id: "80eu7n", sentence: "Udruženje osoba (korporacija) naziva se universitas _______.", answer: "personarum", hint: "Osoba – persona." },
      { id: "v4yozu", sentence: "Postojanje tri statusa – libertatis, civitatis i familiae – određuje _______ sposobnost.", answer: "pravnu", hint: "Biti nositeljem prava." }
    ],
    learn: {
      id: "yxdnpd",
      title: "Pravo osoba: pravna i djelatna sposobnost",
      content: `<h3>Pravni subjekt i pravna sposobnost</h3>
<p><strong>Pravni subjekt</strong> je nositelj prava i dužnosti; može biti fizička osoba (<em>persona physica</em>) ili pravna osoba (<em>persona iuridica</em>). <strong>Pravna sposobnost</strong> (<em>capacitas iuridica</em>) je sposobnost biti nositeljem prava i dužnosti. Rimljani su za položaj osobe koristili pojam <strong>status</strong>:</p>
<ul>
<li><strong>status libertatis</strong> – je li osoba slobodna ili rob,</li>
<li><strong>status civitatis</strong> – je li rimski građanin, Latin ili peregrin,</li>
<li><strong>status familiae</strong> – je li osoba na čelu obitelji (sui iuris) ili pod vlašću (alieni iuris).</li>
</ul>
<p>Punu pravnu sposobnost imao je samo slobodan rimski građanin sui iuris; s vremenom se položaj osoba alieni iuris, robova i stranaca poboljšava.</p>
<h4>Capitis deminutio</h4>
<table>
<tr><th>Vrsta</th><th>Status</th><th>Značenje</th></tr>
<tr><td>maxima</td><td>libertatis</td><td>gubitak slobode (npr. pad u ropstvo)</td></tr>
<tr><td>media (minor)</td><td>civitatis</td><td>gubitak rimskog građanstva</td></tr>
<tr><td>minima</td><td>familiae</td><td>promjena položaja u obitelji (adrogacija, emancipacija, brak cum manu)</td></tr>
</table>

<h3>Fizička osoba</h3>
<p>Nastaje <strong>rođenjem</strong>; začetom djetetu priznaju se određena prava uz pretpostavku da se rodi živo. Pravna sposobnost prestaje smrću ili gubitkom slobode. Budući da nije bilo obveze upisa rođenja i smrti, tko izvodi neko pravo iz nečije smrti mora tu činjenicu dokazati.</p>
<ul>
<li><em>Nasciturus pro iam nato habetur, quotiens de commodis eius agitur</em> – „Začeto se dijete smatra rođenim kad god se radi o njegovim probitcima.“ Odluka o valjanosti oporuke i dodjeli ostavine odgađa se do očekivanog poroda, ako je posmrče (<em>postumus</em>) začeto prije očeve smrti. Pripada obiteljskom pravu pretklasičnog i klasičnog razdoblja.</li>
<li><em>Fictio iuris idem operatur quod veritas</em> – „Pravna fikcija djeluje kao istina“: ono što pravo zamišlja uzima se kao istina (npr. nasciturus kao pravni subjekt). Pripada postupovnom pravu starijeg civilnog razdoblja.</li>
</ul>

<h3>Ograničenja pravne sposobnosti</h3>
<ul>
<li><strong>Klasna i socijalna pripadnost, spol, vjera</strong> (ne uvijek).</li>
<li><strong>Intestabilitas</strong> – tko je kao svjedok sudjelovao u poslu pa odbio svjedočiti u sporu, gubi mogućnost biti svjedok i pozivati svjedoke za vlastite akte.</li>
<li><strong>Nota censoria</strong> – kaznena mjera cenzora pri popisu građana: zbog nedoličnog ponašanja premještaj u niži razred.</li>
<li><strong>Infamia (iuris)</strong> – gubitak časti po pravnom propisu: u javnom pravu gubitak ius suffragii i ius honorum; u privatnom ne može biti svjedok u pravnim poslovima, sudac, zastupnik niti sam odrediti zastupnika.</li>
<li><strong>Turpitudo (infamia facti)</strong> – umanjenje časti na temelju javnog mnijenja zbog načina života, nečasnog ponašanja ili zanimanja.</li>
</ul>

<h3>Djelatna sposobnost (capacitas agendi)</h3>
<p>Mogućnost da subjekt vlastitim očitovanjem volje ustanovi, ukine ili izmijeni prava i obveze. Obuhvaća <strong>poslovnu sposobnost</strong> (sklapati pravne poslove) i <strong>deliktnu sposobnost</strong> (odgovarati za vlastita protupravna djela – uračunljivost). Ograničavaju je <strong>dob, spol, duševno zdravlje i rasipništvo</strong>.</p>
<h4>Ograničenja s obzirom na dob</h4>
<table>
<tr><th>Skupina</th><th>Dob</th><th>Sposobnost</th></tr>
<tr><td><strong>infantes</strong></td><td>do 7. godine</td><td>neoborivo (<em>praesumptio iuris et de iure</em>) potpuno nesposobni; prava za njih stječe tutor; u postklasici iznimno smiju steći posjed</td></tr>
<tr><td><strong>impuberes infantia maiores</strong> (uključujući infanti proximi – djecu nešto iznad 7 godina)</td><td>dječaci 7–14, djevojčice 7–12</td><td>sami sklapaju poslove kojima samo stječu (primiti dar, prihvatiti oprost duga); za poslove koji ih obvezuju ili umanjuju imovinu treba svečano i istodobno odobrenje tutora – <em>auctoritatis interpositio</em></td></tr>
<tr><td><strong>puberes</strong> (minores XXV annis)</td><td>od 14 (12) do 25</td><td>po starom civilnom pravu potpuno sposobni; od početka 2. st. pr. Kr. <strong>Lex Plaetoria</strong> kaznenopravno ih štiti od prijevare, a pretor daje <em>exceptio</em>, <em>restitutio in integrum</em> (kasnije u roku od godine) i <em>curator</em> koji daje neformalnu (i naknadnu) suglasnost</td></tr>
</table>
<p>U postklasici se izjednačuju impuberes i minores – <em>minor</em> je svatko mlađi od 25. Od Konstantina se u opravdanim slučajevima daje <strong>venia aetatis</strong> – punoljetnost carskom dozvolom (muškarci s 20, žene s 18 godina); ni takve osobe prije 25. ne smiju darivati, zalagati ni otuđivati nekretnine.</p>
<p>Žene su u doba starije republike bile ograničene tutorstvom (<em>tutela mulierum</em>); duševno bolesni (<em>furiosi</em>) potpuno su nesposobni i deliktno neodgovorni za trajanja bolesti; rasipnicima (<em>prodigi</em>) sposobnost se ograničava kuratorstvom.</p>

<h3>Pravne osobe (personae iuridicae)</h3>
<p>Društvene ustanove kojima pravni poredak priznaje pravnu sposobnost. Po pandektnoj teoriji dijele se na korporacije, zavode i zaklade:</p>
<ul>
<li><strong>universitas personarum</strong> – naglasak na osobama: udruženje fizičkih osoba (korporacija, strukovno udruženje, škola);</li>
<li><strong>universitas rerum</strong> – naglasak na imovini: imovina namijenjena određenoj svrsi (zaklada, stipendije, nagrade).</li>
</ul>
<p><strong>Tragovi subjektiviteta</strong>: civitates (gradovi), municipia (općine), ecclesia (crkve). Gradske općine i općinari nisu mogli biti imenovani nasljednicima jer su neodređene osobe (<em>persona incerta</em>), ali je senatskim mišljenjem dopušteno da ih za nasljednike postave njihovi oslobođenici.</p>
<p><strong>Geneza:</strong> Rim nije shvaćan kao apstraktna osoba, nego kao zajednica građana – <em>populus Romanus</em>; državna imovina, <strong>aerarium</strong>, bila je pod javnim pravom. Gradske općine (municipiji, kolonije) imale su privatnopravna obilježja (mogle su tužiti, biti tužene, iznimno nasljeđivati). Od principata se razvija <strong>fiscus (Caesaris)</strong> – careva imovina u svojstvu cara, kojom se upravlja po privatnopravnim načelima, za razliku od carevog privatnog vlasništva (<strong>patrimonium Caesaris</strong>) i od aerariuma. Jačanjem careve vlasti aerarium nestaje, a fiscus postaje državnom imovinom s posebnim povlasticama.</p>`
    }
  },

  statusLibertatisCivitatis: {
    id: "9702jy",
    name: "Status libertatis i status civitatis",
    icon: "fa-link-slash",
    color: "#84cc16",
    flashcards: [
      { id: "cyrtyf", question: "Postanak ropstva", answer: "Rođenjem od majke robinje (dijete je slobodno ako je majka bila slobodna bilo kada od začeća do poroda), zarobljavanjem i prodajom.", explanation: "Otac je za status djeteta robinje irelevantan." },
      { id: "qr3fqg", question: "Ius postliminii", answer: "Pravo po kojem rimskom građaninu koji se vrati iz zarobljeništva oživljavaju sva prava; ne oživljavaju faktični odnosi – posjed i brak.", explanation: "Za umrlog u zarobljeništvu: fikcija smrti u času zarobljenja." },
      { id: "jgeyp4", question: "Manumissio – civilni (formalni) oblici", answer: "Manumissio vindicta (prividna parnica pred magistratom), manumissio censu (upis u popis građana pri cenzusu), manumissio testamento (oporukom, izravno ili fideikomisom).", explanation: "Oslobođenik postaje rimski građanin." },
      { id: "7ifiwc", question: "Neformalni (pretorski) oblici manumisije", answer: "Inter amicos (među prijateljima), per epistulam (pismom), per mensam (za stolom), in ecclesia (u crkvi). Po civilnom pravu rob ostaje rob.", explanation: "Tako oslobođeni su latini Iuniani." },
      { id: "4k2qei", question: "Derelictio roba", answer: "Napuštanje roba od gospodara ne daje mu slobodu – rob postaje ničija stvar (res nullius) koju svatko može okupirati.", explanation: "Sloboda nastaje samo manumisijom." },
      { id: "jzuo3s", question: "Pravna sposobnost roba", answer: "Rob nije nositelj prava i dužnosti; može stjecati za gospodara, ali ga ne može obvezati, osim deliktno (noksalna odgovornost).", explanation: "Ugovorna obveza roba je obligatio naturalis." },
      { id: "mwy66o", question: "Obveze roba iz pravnih poslova", answer: "Obligatio naturalis – plativa, ali neutuživa obveza. Vjerovnik se može namiriti actio de peculio (do visine pekulija) ili actio de in rem verso (do koristi gospodara).", explanation: "Plaćeno se ne može tražiti natrag." },
      { id: "trus3i", question: "Može li se rob tužiti zbog delikta?", answer: "Ne dok je rob – tuži se gospodar (noksalna tužba). Rob je deliktno odgovoran, pa ga se može tužiti nakon manumisije (noxa caput sequitur).", explanation: "Gospodar plaća ili predaje roba u noksu." },
      { id: "f5t8dj", question: "Noxae deditio", answer: "Predaja počinitelja delikta (roba ili osobe u vlasti) oštećenome umjesto plaćanja kazne i naknade štete; odgovara onaj tko ima vlast u času podizanja tužbe.", explanation: "Gospodar bira: platiti ili predati – facultas alternativa." },
      { id: "feknd7", question: "Colonus", answer: "Pravno slobodan, ali vezan za zemlju koju obrađuje, s ograničenjima zanimanja i braka – poluslobodan; preteča srednjovjekovnog kmeta.", explanation: "Raširen u dominatu." },
      { id: "rwe2ph", question: "Statuliber", answer: "Rob kojem je gospodar oporukom dao slobodu pod suspenzivnim uvjetom ili s početnim rokom.", explanation: "Do nastupa uvjeta ostaje rob." },
      { id: "x7zrlb", question: "Addictus", answer: "Dužnik starog prava dodijeljen vjerovniku u ovrsi: de iure slobodan, a stvarno kao rob; nakon 60 dana mogao je biti prodan preko Tibera (postaje rob) ili ubijen.", explanation: "Osobna ovrha." },
      { id: "8fss51", question: "Persona in causa mancipii", answer: "Osoba alieni iuris koju je pater familias mancipacijom dao u vlast drugome (radna snaga, noksa); zadržava slobodu i građanstvo, ali je stvarno u položaju roba.", explanation: "In mancipio." },
      { id: "4whdfd", question: "Kako se stjecalo rimsko građanstvo?", answer: "Rođenjem u valjanom braku roditelja građana (ili oca građanina i majke Latinke s conubium), izvanbračna djeca po majci, manumisijom i dodjelom (pojedincima, općinama, pokrajinama).", explanation: "Libertinus ima ograničena prava." },
      { id: "vkd57l", question: "Latini prisci i Latini coloniarii", answer: "Prisci (stanovnici latinskih općina) imaju ius commercii i ius conubii. Coloniarii (stanovnici latinskih kolonija) imaju samo ius commercii.", explanation: "Ius Latii daje položaj kolonijara." },
      { id: "kjuknu", question: "Latini Iuniani", answer: "Neformalno oslobođeni robovi: imaju ius commercii, ali im je isključena imovinskopravna sposobnost za slučaj smrti – „žive kao slobodni, umiru kao robovi“.", explanation: "Njihova imovina pripada bivšem gospodaru." },
      { id: "5z42gb", question: "Ius Latii", answer: "Latinsko pravo (vrsta polugrađanstva) koje se dodjeljivalo peregrinskim općinama i pokrajinama prije punog građanstva; magistrati nakon službe postaju rimski građani.", explanation: "Položaj kao Latini coloniarii." }
    ],
    quiz: [
      { id: "ffrjip", question: "Koji je civilni (formalni) oblik manumisije?", options: ["inter amicos", "per epistulam", "vindicta", "per mensam"], correct: 2 },
      { id: "slaa3c", question: "Latini Iuniani su oslobođenici:", options: ["oslobođeni izravno oporukom", "oslobođeni neformalno (inter amicos)", "oslobođeni upisom u popis građana", "oslobođeni prividnom parnicom"], correct: 1 },
      { id: "qnjvr1", question: "Ako gospodar napusti roba (derelictio), rob:", options: ["postaje latin Iunian", "postaje statuliber", "postaje rimski građanin", "postaje res nullius"], correct: 3 },
      { id: "yq2zce", question: "Protiv roba se tužba zbog delikta može podnijeti:", options: ["uvijek", "samo ako gospodar pristane", "samo nakon manumisije", "nikada"], correct: 2 },
      { id: "qdhgjx", question: "Za delikt osobe u vlasti noksalno odgovara onaj tko ima vlast:", options: ["u vrijeme delikta", "u času podizanja tužbe", "u času presude", "u času rođenja počinitelja"], correct: 1 },
      { id: "i3smyj", question: "Koji sadržaj ima obligatio naturalis?", options: ["plativa, ali neutuživa obveza", "utuživa, ali neplativa obveza", "obveza nastala iz delikta", "obveza osigurana zalogom"], correct: 0 },
      { id: "n4cjpc", question: "Dužnik dodijeljen vjerovniku u ovrsi starog prava zove se:", options: ["colonus", "statuliber", "addictus", "nexus libertus"], correct: 2 },
      { id: "88uvzu", question: "Rob oslobođen oporukom pod suspenzivnim uvjetom do nastupa uvjeta je:", options: ["statuliber", "libertinus", "latinus Iunianus", "colonus"], correct: 0 },
      { id: "rz0yem", question: "Koji pravni položaj ima colonus?", options: ["rob na imanju bez pekulija", "slobodan, ali vezan za zemlju", "peregrin bez commerciuma", "oslobođenik bez građanstva"], correct: 1 },
      { id: "1srhc3", question: "Osoba alieni iuris koju je otac mancipacijom dao u vlast drugome nalazi se:", options: ["in manu", "in potestate adoptantis", "in causa mancipii", "in custodia"], correct: 2 },
      { id: "1enxkw", question: "Latini coloniarii imali su:", options: ["samo ius conubii", "ius conubii i ius commercii", "ius suffragii i honorum", "samo ius commercii"], correct: 3 },
      { id: "gcyij2", question: "Constitutio Antoniniana izuzela je od građanstva samo:", options: ["latine Iuniane", "peregrine dediticije", "kolone vezane za zemlju", "oslobođenike (libertine)"], correct: 1 },
      { id: "dxvy3e", question: "Povratkom iz zarobljeništva građaninu oživljavaju prava osim:", options: ["vlasništva", "očinske vlasti", "posjeda i braka", "građanstva"], correct: 2 }
    ],
    fillBlanks: [
      { id: "jcpjxj", sentence: "Oporučno oslobađanje roba zove se manumissio _______.", answer: "testamento", hint: "Oporuka – testamentum." },
      { id: "edsa1b", sentence: "Načelo da deliktna odgovornost prati počinitelja glasi: noxa caput _______.", answer: "sequitur", hint: "Slijedi." },
      { id: "3g2cla", sentence: "Pravo latiniteta dodijeljeno općinama zove se ius _______.", answer: "Latii", hint: "Lacij." },
      { id: "qyf1e3", sentence: "Rob ne može obvezati gospodara, osim _______.", answer: "deliktno", hint: "Iz protupravnog djela." }
    ],
    learn: {
      id: "dss1z9",
      title: "Status libertatis (ropstvo) i status civitatis (građanstvo)",
      content: `<h3>Status libertatis</h3>
<p>Temeljna podjela ljudi u rimskom pravu je podjela na <strong>slobodne i robove</strong>. U staro doba ropstvo je imalo patrijarhalan karakter; kasnije je rob pravno izjednačen sa stvari.</p>
<h4>Postanak ropstva</h4>
<ul>
<li><strong>Rođenjem od majke robinje</strong> – tko je otac nije važno; dijete pripada vlasniku majke u času rođenja. Ipak, dijete se rađa slobodno ako je majka bila slobodna makar i najkraće vrijeme od začeća do poroda.</li>
<li><strong>Zarobljavanjem</strong> – vrijedi i za strance i za Rimljane. Za Rimljanina vrijedi fikcija da je umro u času zarobljenja, a po <strong>ius postliminii</strong> sva prava oživljavaju kad pobjegne iz zarobljeništva – osim faktičnih odnosa (<strong>posjed, brak</strong>).</li>
<li><strong>Prodajom</strong> (npr. dužnika preko Tibera).</li>
</ul>
<h4>Prestanak ropstva – manumissio</h4>
<p>Gospodar pravnim aktom daruje robu slobodu. Samo napuštanje (<em>derelictio</em>) ne daje slobodu – rob postaje <em>res nullius</em> koju svatko može okupirati.</p>
<table>
<tr><th>Civilni (formalni) oblici</th><th>Neformalni (pretorski) oblici</th></tr>
<tr><td><strong>manumissio vindicta</strong> – prividna parnica pred magistratom (pretorom)<br><strong>manumissio censu</strong> – rob se po gospodarovu nalogu upisuje u popis građana pri cenzusu<br><strong>manumissio testamento</strong> – oporukom: izravno (<em>directa</em>, sloboda kad oporuka stupi na snagu) ili molbom nasljedniku/legataru da ga oslobodi (<em>fideicommissaria</em>)</td><td><strong>inter amicos</strong> – među prijateljima<br><strong>per epistulam</strong> – pismom<br><strong>per mensam</strong> – za stolom<br><strong>in ecclesia</strong> – u crkvi (kasnije)<br>Suština: neformalna izjava gospodara. Po civilnom pravu rob ostaje rob; pretor štiti slobodu – oslobođeni su <em>Latini Iuniani</em></td></tr>
</table>
<h4>Pravni položaj roba</h4>
<ul>
<li><strong>Pravna sposobnost</strong>: rob nije nositelj prava i dužnosti. Može stjecati za gospodara, ali ga ne može obvezati – <strong>osim deliktno</strong>.</li>
<li><strong>Poslovna sposobnost</strong>: rob se ne može civilno obvezati, ali je njegova obveza <strong>obligatio naturalis</strong> – može se platiti (plaćeno se ne vraća), ali ne i utužiti. Vjerovnici se mogu namiriti od gospodara tužbama <em>actio de peculio</em> (do visine pekulija) i <em>actio de in rem verso</em> (do visine koristi koja je ušla u gospodarevu imovinu).</li>
<li><strong>Deliktna sposobnost</strong>: rob je odgovoran, ali ga se ne može tužiti dok ne bude oslobođen; dotad odgovara gospodar noksalno. <strong>Noxa caput sequitur</strong> – odgovornost prati počinitelja.</li>
</ul>
<h4>Noxae deditio</h4>
<p>Za delikt roba (ili osobe u vlasti) gospodar (pater familias) mora platiti kaznu i naknaditi štetu ili <strong>predati počinitelja oštećenome</strong>. Odgovara osoba koja ima vlast <strong>u trenutku podizanja tužbe</strong>, a ne u vrijeme delikta. Predaja se vrši mancipacijom.</p>
<h4>Stanja slična ropstvu</h4>
<ul>
<li><strong>Colonus</strong> – pravno slobodan, ali vezan za zemlju koju obrađuje, ograničen u promjeni zanimanja, sklapanju braka i podložan kaznenoj vlasti vlasnika zemlje; stvarno poluslobodan – preteča kmeta.</li>
<li><strong>Statuliber</strong> – rob kojem je gospodar oporukom dao slobodu pod suspenzivnim uvjetom ili s početnim rokom.</li>
<li><strong>Addictus</strong> – dužnik starog prava dodijeljen vjerovniku u ovrsi; de iure slobodan, stvarno rob. Vjerovnik ga drži u dugovnom zatvoru 60 dana; ako nitko ne ispuni obvezu, može ga prodati preko Tibera (<em>trans Tiberim</em> – postaje rob) ili ubiti.</li>
<li><strong>In causa mancipii</strong> – osoba alieni iuris koju je pater familias mancipacijom dao u vlast drugome (radi iznajmljivanja radne snage, zaloga ili noksalne predaje); zadržava slobodu i građanstvo, ali je stvarno u položaju roba.</li>
</ul>

<h3>Status civitatis</h3>
<p>Rimsko građanstvo stjecalo se <strong>rođenjem u valjanom braku</strong> roditelja rimskih građana ili oca Rimljanina i majke Latinke s ius conubii; izvanbračna djeca stječu građanstvo <strong>po majci</strong>. Stjecalo se i <strong>manumisijom</strong> (oslobođenik – <em>libertinus</em> – ograničen je u pravima) te posebnom <strong>dodjelom</strong> pojedincima, općinama ili pokrajinama.</p>
<table>
<tr><th>Skupina</th><th>Položaj</th></tr>
<tr><td><strong>Latini prisci</strong> (stari Latini)</td><td>stanovnici latinskih općina oko Rima; najpovoljniji položaj: <em>ius commercii</em> i <em>ius conubii</em></td></tr>
<tr><td><strong>Latini coloniarii</strong></td><td>stanovnici kolonija Latinskog saveza (i siromašniji Rimljani koji su se tamo naselili); samo <em>ius commercii</em></td></tr>
<tr><td><strong>ius Latii</strong></td><td>latinsko pravo dodjeljivano peregrinskim općinama i pokrajinama izvan Italije prije punog građanstva – vrsta polugrađanstva s položajem Latina kolonijara; magistrati takvih općina nakon službe postaju rimski građani</td></tr>
<tr><td><strong>Latini Iuniani</strong></td><td>neformalno oslobođeni robovi; imaju <em>ius commercii</em>, ali je isključena njihova imovinskopravna sposobnost za slučaj smrti – „žive kao slobodni, umiru kao robovi“: njihova imovina pripada bivšem gospodaru</td></tr>
<tr><td><strong>peregrini</strong></td><td>stranci; peregrini dediticii – pripadnici pokorenih naroda bez građanstva</td></tr>
</table>
<h4>Constitutio Antoniniana (212.)</h4>
<p>Razvoj principata vodio je izjednačavanju položaja stanovnika carstva. Car Antonin Karakala svojim <strong>ediktom</strong> (materijalni izvor, općeobvezna odredba) dao je rimsko građanstvo svim slobodnim stanovnicima carstva, osim <strong>peregrina dediticija</strong>.</p>`
    }
  },

  rimskaObitelj: {
    id: "fbt31n",
    name: "Rimska obitelj i patria potestas",
    icon: "fa-people-roof",
    color: "#0ea5e9",
    flashcards: [
      { id: "x7i2vt", question: "Patria potestas", answer: "Doživotna, u starije doba praktički neograničena vlast oca obitelji nad osobama u vlasti i obiteljskom imovinom; traje od rođenja djeteta do smrti oca.", explanation: "Ne ovisi o dobi ni o tome je li srodstvo krvno ili agnatsko." },
      { id: "pb6u0r", question: "Personae sui iuris i personae alieni iuris", answer: "Sui iuris: osobe koje nisu ni pod čijom očinskom vlašću (pater familias). Alieni iuris: osobe pod tuđom vlašću.", explanation: "Dob nije presudna – i dijete može biti sui iuris." },
      { id: "ophi51", question: "Pater vero is est, quem nuptiae demonstrant", answer: "„Otac je onaj na kojeg ukazuje brak“ – predmnijeva se da je muž majke otac djeteta, ako se drukčije ne dokaže.", explanation: "Očinska vlast nastaje rođenjem u zakonitom braku." },
      { id: "ktz6wn", question: "Ovlaštenja oca obitelji", answer: "Ius vitae necisque (život i smrt), ius vendendi (prodaja osoba u vlasti), ius vindicandi (traženje izručenja djeteta od trećega – vindicatio filii, kasnije interdikt).", explanation: "S vremenom se sve više ograničavaju." },
      { id: "2287qc", question: "Si pater filium ter venum duit, filius a patre liber esto", answer: "„Ako otac sina triput proda, neka sin bude slobodan od oca“ (Zakonik XII ploča). Iz ove odredbe izvedena je emancipacija.", explanation: "Ograničenje ius vendendi." },
      { id: "4e21hm", question: "Nastanak očinske vlasti", answer: "Aut natura – rođenjem u zakonitom braku (matrimonium iustum); aut iure – posinjenjem: adrogacijom ili adopcijom.", explanation: "I brakom cum manu nad ženom (manus)." },
      { id: "4ku4fp", question: "Adrogatio", answer: "Stariji oblik posinjenja muškarca sui iuris: adrogirani trpi capitis deminutio minima i sa svojom obitelji i imovinom potpada pod vlast adroganta. Obavljala se pred comitia curiata.", explanation: "Kasnije carskim reskriptom." },
      { id: "pcwqre", question: "Adoptio", answer: "Posinjenje osobe alieni iuris: prelazi iz jedne očinske vlasti u drugu, status se ne mijenja i nema prijenosa imovine. Mogla su se adoptirati i ženska djeca.", explanation: "U klasici: mancipacija + in iure cessio." },
      { id: "762vgp", question: "Posinjenje u postklasici", answer: "Per rescriptum principis – carskim reskriptom za osobe koje nisu u vlasti (sui iuris), uveo Dioklecijan; za osobe u vlasti – izjavom pred javnom vlašću (sucem) u zapisnik.", explanation: "Justinijan: adoptio plena i minus plena." },
      { id: "jhb695", question: "Adoptio imitatur naturam", answer: "„Posinjenje oponaša prirodu“ – Justinijan traži razliku od najmanje 18 godina između adoptanta i adoptiranog; kastrat ne može adoptirati.", explanation: "Uz pristanak oba patres i adoptiranog." },
      { id: "q6uq48", question: "Adoptio plena i adoptio minus plena", answer: "Plena: adoptant je predak adoptiranog – puni učinak, očinska vlast. Minus plena: adoptant nije predak – ne nastaje patria potestas; adoptirani zadržava prava u svojoj obitelji.", explanation: "Justinijanovo pravo." },
      { id: "sdich1", question: "Prestanak očinske vlasti", answer: "Smrću oca obitelji, capitis deminutio (oca ili djeteta, npr. adrogacija) i emancipacijom.", explanation: "Ako otac umre u zarobljeništvu, vlast prestaje od časa zarobljenja." },
      { id: "g8l0wx", question: "Emancipatio", answer: "Dobrovoljno oslobađanje od očinske vlasti: trostruka fiktivna prodaja sina (kćeri i unuka jednostruka); postaje sui iuris, ali po starom pravu gubi agnatsko srodstvo i zakonsko nasljedno pravo.", explanation: "Kognatsko srodstvo s ocem ostaje." },
      { id: "50fpjv", question: "Familia iure proprio i familia communi iure", answer: "Iure proprio: osobe pod postojećom vlašću jednoga. Communi iure: svi koji su bili ili bi bili pod istom vlašću da imalac vlasti nije otpao (svi agnati).", explanation: "Obitelj u užem i širem smislu." },
      { id: "6s5bvg", question: "Peculium", answer: "Dio imovine koji pater familias daje sinu ili robu na samostalno upravljanje; pravno ostaje očevo vlasništvo, a sin njime ne može raspolagati darovanjem ni oporukom.", explanation: "Od pecus – stado." },
      { id: "9aqpct", question: "Peculium castrense", answer: "Imovina koju je sin u vlasti stekao u vojsci ili zbog vojne službe; od Augusta sin njome samostalno raspolaže, pa i oporukom; Hadrijan to proširuje na veterane.", explanation: "Klasično pravo." },
      { id: "60oqv8", question: "Peculium quasi castrense", answer: "Od Konstantina: imovina koju je sin stekao u carskoj ili državnoj službi i slobodnim profesijama (npr. kao odvjetnik) izjednačena s vojnim pekulijem.", explanation: "Postklasično pravo." },
      { id: "kq13jm", question: "Bona adventicia", answer: "Imovina sina u vlasti koja mu pripada u vlasništvo, a otac ima pravo upravljanja i plodouživanja; od Konstantina naslijeđeno od majke, kod Justinijana sve stečeno od bilo koga osim od oca.", explanation: "Otac je otuđuje samo radi dugova i opravdanih troškova." }
    ],
    quiz: [
      { id: "vdc4yv", question: "Tko od navedenih može biti osoba sui iuris?", options: ["samo muškarac stariji od 25", "samo muškarac koji je oženjen", "samo onaj tko ima djecu", "i dijete kojem je umro otac"], correct: 3 },
      { id: "3tozuc", question: "Papinius, osoba alieni iuris, otac ga želi predati u vlast strogog prijatelja. Je li to moguće?", options: ["ne, očinska vlast je neprenosiva", "da, adrogacijom koju vrši prijatelj", "da, adopcijom koju vrši prijatelj", "da, emancipacijom"], correct: 2 },
      { id: "9cifjd", question: "Claudius, osoba alieni iuris, želi prijeći u vlast očeva prijatelja, a otac se protivi. Hoće li uspjeti?", options: ["da, adopcijom koju vrši prijatelj", "da, adrogacijom koju vrši prijatelj", "da, emancipacijom", "ne"], correct: 3 },
      { id: "pti75h", question: "Adoptio per rescriptum principis u postklasici vrijedi za posinjenje:", options: ["osobe alieni iuris u klasici", "osobe sui iuris u postklasici", "osobe alieni iuris u postklasici", "osobe sui iuris u klasici"], correct: 1 },
      { id: "qckgvc", question: "Adrogacijom adrogirani trpi:", options: ["capitis deminutio minima", "capitis deminutio media", "capitis deminutio maxima", "infamiju"], correct: 0 },
      { id: "tq7sej", question: "Navedi tri načina prestanka očinske vlasti:", options: ["smrt oca, capitis deminutio, emancipacija", "punoljetnost, brak, adopcija oca", "punoljetnost, vojna služba, smrt majke", "brak sina, razvod, manumisija"], correct: 0 },
      { id: "6p1d2m", question: "Emancipacijom sina se po Zakoniku XII ploča izvodila iz pravila o:", options: ["trostrukoj prodaji sina", "trostrukom izostanku iz kuće", "posinjenju pred kurijama", "prijenosu manusa"], correct: 0 },
      { id: "u6zsgz", question: "Što emancipirani sin gubi po starom civilnom pravu?", options: ["slobodu i rimsko građanstvo", "pravnu sposobnost i commercium", "kognatsko srodstvo s ocem i majkom", "agnatsko srodstvo i zakonsko nasljeđivanje"], correct: 3 },
      { id: "j1xlm6", question: "Ius vindicandi oca obitelji jest pravo:", options: ["prodati dijete preko Tibera", "odlučiti o životu i smrti djeteta", "tražiti izručenje djeteta od trećega", "dati dijete u noksu oštećenome"], correct: 2 },
      { id: "zf19c0", question: "Imovinu stečenu u vojnoj službi sin u vlasti od Augusta ima kao:", options: ["peculium profecticium", "peculium castrense", "bona adventicia", "peculium quasi castrense"], correct: 1 },
      { id: "nus31s", question: "Kod Justinijana bona adventicia obuhvaćaju:", options: ["sve stečeno od bilo koga osim od oca", "samo ono naslijeđeno od majke", "samo vojnu imovinu", "samo darove od cara"], correct: 0 },
      { id: "z805ka", question: "Uvjet „adoptio imitatur naturam“ kod Justinijana traži razliku u dobi od najmanje:", options: ["14 godina", "25 godina", "18 godina", "12 godina"], correct: 2 },
      { id: "wp9yse", question: "Adoptio minus plena u Justinijanovu pravu:", options: ["stvara punu očinsku vlast", "ne stvara očinsku vlast", "moguća je samo za ženu", "obavlja se pred kurijama"], correct: 1 },
      { id: "s6kzzp", question: "Sve osobe koje bi bile pod istom vlašću da imalac vlasti nije otpao čine:", options: ["familia iure proprio", "consortium", "gens", "familia communi iure"], correct: 3 }
    ],
    fillBlanks: [
      { id: "mlddbe", sentence: "Pater vero is est, quem nuptiae _______.", answer: "demonstrant", hint: "Pokazuju." },
      { id: "f640oj", sentence: "Imovina stečena u carskoj službi od Konstantina zove se peculium quasi _______.", answer: "castrense", hint: "Kao vojnička." },
      { id: "dv387c", sentence: "Očinska vlast nastaje prirodnim putem, aut _______, rođenjem u zakonitom braku.", answer: "natura", hint: "Priroda." },
      { id: "e23dqx", sentence: "Ovlast oca da odlučuje o životu i smrti djeteta zove se ius vitae _______.", answer: "necisque", hint: "I smrti." }
    ],
    learn: {
      id: "42j3es",
      title: "Rimska obitelj, patria potestas i imovinski položaj osoba u vlasti",
      content: `<h3>Pojmovi</h3>
<ul>
<li><strong>Patria potestas</strong> – očinska vlast; <strong>pater familias</strong> – otac obitelji, kućni starješina; <strong>personae alieni iuris</strong> – osobe pod očinskom vlašću; <strong>personae sui iuris</strong> – osobe koje nisu ni pod čijom vlašću (nositelji vlasti).</li>
<li><strong>Familia</strong> – skupina osoba podređenih vlasti jednoga, bilo po prirodi (potomci) bilo po pravu (zakoniti brak, adopcija, adrogacija). Na čelu obitelji ne može biti žena. <strong>Rimska obitelj zasniva se na agnatskom srodstvu.</strong></li>
<li><strong>Razvoj obitelji</strong>: consortium → individualna obitelj agnatskog tipa → kognatska obitelj.</li>
</ul>
<h3>Patria potestas</h3>
<p>Doživotna, velika, u starije doba praktički neograničena vlast oca obitelji nad osobama i obiteljskom imovinom; traje od rođenja djeteta do smrti oca. Podvrgnuti su joj članovi obitelji bez obzira na <strong>dob</strong> (maloljetni i punoljetni) i bez obzira na to jesu li u krvnom ili samo agnatskom srodstvu s nositeljem. Za starije doba ne može se govoriti o uzajamnim pravima i dužnostima, nego samo o <strong>ovlaštenjima</strong> oca. Vlast se odnosi na osobe (žena in manu, djeca i potomci iz braka) i na imovinu. Strogost vlasti povezana je s organizacijom Rima kao graničarske utvrde. U Justinijanovu pravu patria potestas ima malo zajedničkog s onom starog prava.</p>
<p><strong>Tko je otac?</strong> <em>Pater vero is est, quem nuptiae demonstrant</em> – „Otac je onaj na kojeg ukazuje brak“: muž žene koja je rodila u zakonitom rimskom braku; predmnijeva se dok se ne dokaže suprotno.</p>
<h4>Ovlaštenja oca</h4>
<ul>
<li><strong>ius vitae necisque</strong> – pravo odlučivanja o životu i smrti osoba u vlasti;</li>
<li><strong>ius vendendi</strong> – pravo prodaje djece; ograničio ga je već Zakonik XII ploča: <em>si pater filium ter venum duit, filius a patre liber esto</em> („ako otac sina triput proda, sin je slobodan od oca“) – iz toga je nastala emancipacija; kasnije je prodaja zabranjena, osim davanja u noksu;</li>
<li><strong>ius vindicandi</strong> – pravo tražiti izručenje podređene djece od trećih; isprva tužbom <em>vindicatio filii</em> (slična rei vindicatio), kasnije pretorovim interdiktom (<em>interdictum de liberis exhibendis item ducendis</em>).</li>
</ul>

<h3>Nastanak očinske vlasti</h3>
<ol>
<li><strong>Aut natura</strong> – rođenjem u zakonitom rimskom braku (<em>matrimonium iustum</em>).</li>
<li><strong>Aut iure</strong> – posinjenjem:
<ul>
<li><strong>Adrogatio</strong> – stariji oblik; adrogirati se mogao samo <strong>muškarac sui iuris</strong> (sam pater familias). Adrogirani trpi <strong>capitis deminutio minima</strong>, gubi status sui iuris i zajedno s članovima svoje obitelji i imovinom potpada pod vlast adroganta. Obavljala se u obliku zakona pred <strong>comitia curiata</strong> (narod je bio zainteresiran za jačanje obitelji), kasnije carskom dozvolom.</li>
<li><strong>Adoptio</strong> – posinjenje osobe <strong>alieni iuris</strong>; položaj adoptiranog se ne mijenja (ostaje alieni iuris) i nema prijenosa imovine. Mogla su se adoptirati i ženska djeca, maloljetna i punoljetna. U pretklasici i klasici obavljala se mancipacijom (raskid dotadašnje veze) i in iure cessio (zasnivanje nove).</li>
</ul></li>
</ol>
<p><strong>Postklasično posinjenje:</strong> <strong>per rescriptum principis</strong> – carskim odobrenjem za osobe koje <em>nisu u vlasti</em> (sui iuris), uveo Dioklecijan; za osobe <em>u vlasti</em> – izjavom pred javnom vlašću (nadležnim sucem) u zapisnik (fragment I. 1.12.8).</p>
<p><strong>Justinijan:</strong> <em>adoptio imitatur naturam</em> – razlika u dobi najmanje 18 godina, kastrat ne može adoptirati; postupak pred magistratom uz pristanak oba patres familias i adoptiranog. <strong>Adoptio plena</strong> (adoptant je predak adoptiranog s očeve ili majčine strane) ima pune učinke; <strong>adoptio minus plena</strong> ne stvara patria potestas.</p>

<h3>Obitelj u užem i širem smislu</h3>
<ul>
<li><strong>Familia iure proprio</strong> – osobe podvrgnute <em>postojećoj</em> vlasti jednoga, po prirodi ili po pravu.</li>
<li><strong>Familia communi iure</strong> – svi agnati: osobe koje bi bile pod istom vlašću da imalac vlasti nije otpao. „Premda po smrti oca obitelji pojedini agnati imaju odvojene obitelji, svi koji su bili pod jednom vlašću s pravom se nazivaju iz iste obitelji.“</li>
</ul>

<h3>Prestanak očinske vlasti</h3>
<ul>
<li><strong>Smrt oca obitelji</strong> – sinovi postaju sui iuris i sami patres familias svojih (budućih) obitelji; žena iz manus-braka postaje sui iuris, ali potpada pod tutorstvo.</li>
<li><strong>Capitis deminutio</strong> – gubitak slobode, građanstva ili položaja u obitelji (npr. adrogacija oca). Ako otac padne u ropstvo neprijatelja, vlast se privremeno obustavlja; umre li u zarobljeništvu, smatra se da je prestala u času zarobljenja.</li>
<li><strong>Emancipatio</strong> – dobrovoljni prestanak u obliku pravnog posla, razvijen interpretacijom XII ploča: <strong>istodobna, trostruka, fiktivna prodaja sina</strong> (kćeri i unuka – jednostruka). Emancipirani odmah postaje sui iuris (pater familias), ali po starom pravu prestaje agnatska veza i gubi zakonsko nasljedno pravo; <strong>kognatski srodnik oca ostaje</strong>.</li>
</ul>

<h3>Imovinskopravni položaj osoba u vlasti (status familiae)</h3>
<p>Načelo: sin u vlasti sve što stječe, stječe za oca. S vremenom se položaj poboljšava:</p>
<table>
<tr><th>Ustanova</th><th>Razdoblje</th><th>Sadržaj</th></tr>
<tr><td><strong>peculium</strong> (profecticium)</td><td>od najstarijeg doba</td><td>dio imovine koji otac daje sinu ili robu na samostalno upravljanje; pravno očevo vlasništvo; sin ne smije darovati ni oporučiti</td></tr>
<tr><td><strong>peculium castrense</strong></td><td>klasika, od Augusta</td><td>imovina stečena u vojsci ili zbog vojne službe; sin vojnik može njome oporučiti (August), kasnije i veterani (Hadrijan); od 3. st. obuhvaća i darove i nasljedstva suboraca – sin raspolaže gotovo kao pater familias</td></tr>
<tr><td><strong>peculium quasi castrense</strong></td><td>postklasika, od Konstantina</td><td>imovina stečena u carskoj, državnoj ili dvorskoj službi i slobodnim profesijama (npr. odvjetnik); kod Justinijana i darovi cara</td></tr>
<tr><td><strong>bona adventicia</strong></td><td>od Konstantina, prošireno kod Justinijana</td><td>najprije naslijeđeno od majke i majčinih predaka; kod Justinijana sve stečeno od bilo koga osim od oca; vlasništvo djeteta, otac ima upravu i plodouživanje, otuđuje samo radi dugova i opravdanih troškova</td></tr>
</table>
<p>Fragment UE 20.10 i I. 2.12 pr.: „Sin u vlasti ne može učiniti oporuku jer nema ništa svoje; ali je božanski August odredio da sin vojnik može oporučiti pekulijem stečenim u vojnom logoru, a kasnije je Hadrijan to dopustio i veteranima.“ CT 8.19.1: što je žena dala neemancipiranom mužu ili muž ženi u vlasti ne pripada ocu.</p>
<p>Za obveze osoba u vlasti prema trećima pretor je uveo <strong>actiones adiecticiae qualitatis</strong> (actio de peculio, de in rem verso, tributoria, quod iussu, institoria, exercitoria) – vidi obvezno pravo. Za njihove delikte vrijedi noksalna odgovornost.</p>`
    }
  },

  srodstvo: {
    id: "8b0hdw",
    name: "Srodstvo: agnatsko i kognatsko",
    icon: "fa-sitemap",
    color: "#f97316",
    flashcards: [
      { id: "d3d9tb", question: "Kognatsko srodstvo (cognatio)", answer: "Krvno srodstvo po očevoj i majčinoj liniji – srodnici koji potječu jedni od drugih ili od zajedničkog pretka.", explanation: "Ne prestaje emancipacijom." },
      { id: "r90cla", question: "Agnatsko srodstvo (agnatio)", answer: "Srodstvo po pripadnosti istoj očinskoj vlasti – postojećoj ili otpaloj; njime su povezani i posinjeni, a ne i srodnici preko ženske osobe.", explanation: "Na njemu počiva rimska obitelj." },
      { id: "6er57h", question: "Linea recta i linea transversa", answer: "Recta (uspravna): osobe koje potječu jedna od druge – preci (ascendentes, linea superior) i potomci (descendentes, linea inferior). Transversa (pobočna, kolateralna): potječu od zajedničkog pretka.", explanation: "Parentes – preci; liberi – potomci." },
      { id: "cp28dt", question: "Germani, uterini, consanguinei", answer: "Germani – braća i sestre s istim ocem i majkom; uterini – samo ista majka; consanguinei – samo isti otac.", explanation: "Kolaterali." },
      { id: "a6twtu", question: "Tot gradus quot generationes", answer: "„Koliko poroda, toliko stupnjeva“ – stupanj srodstva određuje se brojem poroda između dviju osoba i njihova zajedničkog pretka (computatio civilis).", explanation: "Vrijedi i za kognate i za agnate." },
      { id: "4ynwkq", question: "Stupnjevi srodstva – primjeri", answer: "Otac–sin 1., djed–unuk 2., pradjed–praunuk 3. stupanj uspravne linije; braća 2., stric–sinovac 3., bratići 4. stupanj pobočne linije.", explanation: "U pobočnoj liniji nema prvog stupnja." },
      { id: "3y6vp7", question: "Affinitas", answer: "Tazbinsko srodstvo – odnos bračnog druga i krvnih srodnika drugog bračnog druga (svekar–snaha, zet–punica, očuh–pastorak). Stupnjevi se nisu računali.", explanation: "Bila je bračna smetnja." },
      { id: "hph2d9", question: "Žena in manu kao agnat", answer: "Žena u braku cum manu postaje mužu agnatska kći (filiae loco), a njegovoj djeci agnatska sestra (sororis loco).", explanation: "Raskida agnatsku vezu s prirodnom obitelji." },
      { id: "kv32xk", question: "Kako se ulazi u agnatsko srodstvo s pater familias?", answer: "Rođenjem u zakonitom braku, posinjenjem (adoptio, adrogatio) i brakom cum manu (žena).", explanation: "Ulazak u agnatsko srodstvo znači dolazak pod vlast istog starješine obitelji." },
      { id: "vw05uz", question: "Consortium (ercto non cito)", answer: "Zajednica nepodijeljene imovine sinova nakon očeve smrti, nastaje po sili zakona; pravni posao svakog člana ima puni učinak za sve; može se razvrgnuti u svako doba.", explanation: "Sui = „njegovi“, ne dio izraza sui iuris." },
      { id: "q2yw5q", question: "Djeca iz zakonitog braka i otac", answer: "Kognatski su srodnici (potomci) i agnatski srodnici (ista očinska vlast). Emancipacijom prestaje agnatsko, a kognatsko ostaje.", explanation: "Adoptirani je agnat, ali ne nužno kognat." }
    ],
    quiz: [
      { id: "bvuzkr", question: "Pater familias i osoba u njegovoj očinskoj vlasti su uvijek:", options: ["kognatski srodnici", "agnatski srodnici", "srodnici u pobočnoj liniji", "tazbinski srodnici"], correct: 1 },
      { id: "e7fspi", question: "Ocu se rađa sin u zakonitom braku. Oni su uvijek:", options: ["samo agnatski srodnici", "srodnici po linea transversa", "srodnici po linea recta", "srodnici drugog stupnja"], correct: 2 },
      { id: "yvh479", question: "Germani su:", options: ["uvijek kognati", "ponekad u krvnom srodstvu", "uvijek sui iuris", "uvijek alieni iuris"], correct: 0 },
      { id: "idvdt0", question: "Mogu li germani biti u istoj očinskoj vlasti?", options: ["ne, jer su germani uvijek sui iuris", "ne, jer germani imaju različite majke", "samo ako su oboje posinjeni od trećega", "da, ako su im roditelji u zakonitom braku"], correct: 3 },
      { id: "s3fi1g", question: "Mogu li Rimljanin sui iuris i Rimljanka alieni iuris istodobno biti pod vlašću zajedničkog pretka?", options: ["da, ako su germani (isti otac i majka)", "ne, osoba sui iuris nije ni pod čijom vlašću", "da, ako su consanguinei (isti otac)", "ne, žena po starom pravu ne može biti alieni iuris"], correct: 1 },
      { id: "zpfrcf", question: "Koja je tvrdnja o kognatima netočna?", options: ["mogu biti u uspravnoj liniji", "mogu biti u pobočnoj liniji", "povezani su krvnim srodstvom", "uvijek su u istoj očinskoj vlasti"], correct: 3 },
      { id: "cse0fp", question: "Bratići (djeca braće) su međusobno u:", options: ["drugom stupnju", "trećem stupnju", "četvrtom stupnju", "prvom stupnju"], correct: 2 },
      { id: "8goz52", question: "Odnos zeta i punice jest:", options: ["kognatsko srodstvo", "agnatsko srodstvo", "affinitas", "consanguinitas"], correct: 2 },
      { id: "h83d6p", question: "Liberi su:", options: ["potomci", "preci", "pobočni srodnici", "oslobođenici"], correct: 0 },
      { id: "y4rnn0", question: "Pravni posao svakog pojedinog člana ima puni učinak za sve u zajednici koja se zove:", options: ["societas", "consortium", "communio incidens", "gens"], correct: 1 },
      { id: "ntns64", question: "Žena u braku cum manu u odnosu na muževu djecu je:", options: ["filiae loco", "neptis loco", "sororis loco", "matris loco"], correct: 2 }
    ],
    learn: {
      id: "yqtlel",
      title: "Agnatsko i kognatsko srodstvo",
      content: `<h3>Kognatsko srodstvo (cognatio)</h3>
<p><strong>Krvno srodstvo</strong> po očevoj i majčinoj liniji. Može biti:</p>
<ul>
<li><strong>linea recta</strong> (uspravna) – osobe koje potječu jedna od druge: <em>linea superior</em> (uzlazna) – preci, <strong>ascendentes / parentes</strong>; <em>linea inferior</em> (silazna) – potomci, <strong>descendentes / liberi</strong> (npr. otac, sin, unuk, praunuk);</li>
<li><strong>linea transversa</strong> (pobočna, kolateralna) – osobe koje ne potječu jedna od druge, nego od zajedničkog pretka (braća i sestre, stric i nećak, bratići).</li>
</ul>
<h4>Kolaterali – braća i sestre</h4>
<table>
<tr><th>Naziv</th><th>Zajednički roditelji</th></tr>
<tr><td><strong>germani</strong></td><td>isti otac i ista majka (punorodni)</td></tr>
<tr><td><strong>uterini</strong></td><td>samo ista majka</td></tr>
<tr><td><strong>consanguinei</strong></td><td>samo isti otac</td></tr>
</table>

<h3>Agnatsko srodstvo (agnatio)</h3>
<p>Srodstvo po <strong>pripadnosti istoj očinskoj vlasti</strong> – postojećoj ili otpaloj. Agnati su bračni drugovi (žena in manu), njihovi potomci i druge slobodne osobe pod vlašću istog starješine: djeca, adoptirani i adrogirani. Pod vlašću starješine su i osobe in mancipio i robovi (patrijarhalno ropstvo), ali oni nisu agnati. Srodnici povezani preko ženske osobe nisu agnati. <strong>Rimska obitelj zasniva se na agnatskom srodstvu.</strong></p>
<p>Žena <strong>in manu</strong> postaje agnat svojeg muža: nije mu samo supruga, nego s obzirom na njegovu vlast ima položaj kćeri – <strong>filiae loco</strong>; djeci u muževoj vlasti agnatska je sestra – <strong>sororis loco</strong>.</p>
<p><strong>U agnatsko srodstvo s pater familias ulazi se</strong>: rođenjem u zakonitom braku, posinjenjem (adopcija, adrogacija) i, za ženu, brakom cum manu.</p>
<p><strong>Odnos oca i djeteta:</strong> djeca rođena u zakonitom braku <em>kognatski</em> su srodnici oca (potomci) i <em>agnatski</em> (ista vlast). Emancipacijom agnatsko srodstvo prestaje, kognatsko ostaje. Pater familias i osoba u njegovoj vlasti uvijek su agnati, ali ne nužno i kognati (npr. adoptirani).</p>

<h3>Računanje srodstva – computatio civilis</h3>
<p><em>Tot gradus quot generationes</em> – „Koliko poroda, toliko stupnjeva“: stupanj srodstva (<em>gradus</em>) između dviju osoba određuje se brojem poroda između njih i zajedničkog pretka.</p>
<ul>
<li>Uspravna linija: otac–sin 1. stupanj, djed–unuk 2., pradjed–praunuk 3.</li>
<li>Pobočna linija (nema prvog stupnja): braća 2. stupanj, stric–sinovac 3., bratići 4.</li>
</ul>
<p>Pravilo vrijedi za krvno srodstvo, a na isti način primjenjuje se i kod agnacije.</p>

<h3>Affinitas – tazbinsko srodstvo</h3>
<p>Odnos jednog bračnog druga i krvnih srodnika drugog bračnog druga (svekar–snaha, zet–punica, očuh–pastorak). U Rimu se stupnjevi tazbinskog srodstva <strong>nisu računali</strong>; affinitas je bila <strong>bračna smetnja</strong>.</p>

<h3>Consortium (ercto non cito)</h3>
<p>Nakon smrti oca sinovi (<em>sui</em> – „njegovi“; nije dio izraza sui iuris) <strong>po sili zakona (ex lege)</strong> dolaze u zajednicu nepodijeljene imovine. Obilježja:</p>
<ul>
<li>zajednica ukupne imovine članova, uključujući i onu koju svaki stekne nakon očeve smrti, sve dok se ne podijele;</li>
<li>članovi nisu u prisilnoj zajednici – mogu je razvrgnuti kad god žele;</li>
<li><strong>pravni posao svakog pojedinog člana proizvodi pun učinak</strong> (za sve);</li>
<li>takvu zajednicu ukupne imovine mogle su osnovati i druge osobe ugovorom (preteča ortakluka – societas omnium bonorum).</li>
</ul>`
    },
    fillBlanks: [
      { id: "csnsii", sentence: "Načelo računanja srodstva glasi: tot gradus quot _______.", answer: "generationes", hint: "Porodi." },
      { id: "410vvt", sentence: "Srodnici koji imaju samo istu majku zovu se _______.", answer: "uterini", hint: "Od uterus." },
      { id: "iwx4f1", sentence: "Uzlazna uspravna linija zove se linea _______.", answer: "superior", hint: "Gornja." }
    ]
  },

  brak: {
    id: "lsvj5l",
    name: "Brak (matrimonium)",
    icon: "fa-ring",
    color: "#14b8a6",
    flashcards: [
      { id: "yemest", question: "Rimsko shvaćanje braka", answer: "Brak nije pravni odnos nego društvena činjenica s pravnim posljedicama; nema propisane forme sklapanja ni razvoda.", explanation: "Zato se suglasnost traži i za početak i za trajanje braka." },
      { id: "3g6294", question: "Dva bitna elementa braka", answer: "Faktična zajednica života muškarca i žene i affectio maritalis – trajna volja da žive kao muž i žena. Gubitkom bilo kojeg brak prestaje.", explanation: "Affectio maritalis razlikuje brak od konkubinata." },
      { id: "3mnbmj", question: "Matrimonium iustum", answer: "Zakoniti brak po civilnom pravu: trajna veza rimskog građanina sa ženom koja je Rimljanka ili ima conubium; djeca su rimski građani pod očevom vlašću.", explanation: "Naziva se i matrimonium legitimum." },
      { id: "wx2094", question: "Conubium (ius conubii)", answer: "Pravo živjeti u zajednici koja se smatra (zakonitim rimskim) brakom.", explanation: "Imali su ga Rimljani i Latini prisci." },
      { id: "wj8h75", question: "Brak cum manu", answer: "Žena prelazi u agnatsku obitelj muža (ili njegova oca) i potpada pod njegovu vlast (manus), raskidajući agnatsku vezu s prirodnom obitelji.", explanation: "Potkraj klasike potpuno nestaje." },
      { id: "hvbxec", question: "Oblici zasnivanja manusa", answer: "Confarreatio (svečani vjerski obred, privilegij patricija), coemptio (prividna kupnja u obliku mancipacije), usus (godina dana zajedničkog života).", explanation: "Usus = svojevrsna dosjelost vlasti nad ženom." },
      { id: "t61y3n", question: "Usurpatio trinoctii", answer: "Po Zakoniku XII ploča žena je, izostavši iz kuće tri uzastopne noći unutar godine, prekidala tijek usus-a i sprječavala nastanak manusa.", explanation: "Kad je brak sine manu postao pravilo, potreba je otpala." },
      { id: "02m7o4", question: "Brak sine manu", answer: "Žena ostaje u svojoj prirodnoj obitelji (pod očevom vlašću ili, ako je sui iuris, pod tutorstvom agnata); zadržava nasljedno pravo ondje, a u novoj ga ne stječe.", explanation: "Načelo odvojene imovine supružnika." },
      { id: "38hoqe", question: "Concubinatus", answer: "Trajna zajednica života slobodnih osoba bez affectio maritalis (npr. zbog socijalnih razlika); pravno priznata, ali bez učinaka braka – djeca slijede majku, nema miraza.", explanation: "Rimljanin i žena s conubium mogu biti i u konkubinatu ako tako odluče." },
      { id: "m8v3hi", question: "Contubernium", answer: "Trajna zajednica života robova ili slobodne osobe i roba, bez pravnih učinaka.", explanation: "Djeca u položaju sličnom djeci iz konkubinata." },
      { id: "jzlh3m", question: "Pretpostavke valjanog braka", answer: "Ius conubii, doraslost (muškarac 14, žena 12), pristanak patris familias za osobe alieni iuris (u klasici i zaručnika) i nepostojanje bračnih smetnji.", explanation: "Uz to duševno zdravlje." },
      { id: "i9rwiw", question: "Apsolutna bračna smetnja", answer: "Postojeći brak – rimski brak je izrazito monogaman (kazna infamia).", explanation: "Smetnja prema svima." },
      { id: "b5qxy9", question: "Relativne bračne smetnje", answer: "Krvno srodstvo u uspravnoj liniji bez ograničenja, u pobočnoj do 4. stupnja; affinitas; tutor i štićenica do njezine 25. i polaganja računa; vrijeme žalosti udovice.", explanation: "Smetnja samo prema određenim osobama." },
      { id: "uhzyrx", question: "Tempus lugendi", answer: "Vrijeme žalosti udovice prije novog braka: u klasici 10 mjeseci, kasnije 1 godina – radi uklanjanja sumnje u očinstvo.", explanation: "Najprije moralna dužnost, pretor joj daje pravni učinak." },
      { id: "d8av1t", question: "Prestanak braka", answer: "Smrću supružnika, capitis deminutio maxima ili media (ropstvo, gubitak građanstva), naknadnom bračnom smetnjom, razvodom (divortium) i prestankom faktične zajednice ili affectio maritalis.", explanation: "Načelo slobode razvoda." },
      { id: "v9kulr", question: "Divortium", answer: "Razvod po volji jednog ili obaju supružnika; kod braka sine manu jednostranom izjavom (repudium, slanje glasnika – nuntium remittere). Ugovori o zabrani razvoda ne vrijede.", explanation: "Brakovi su bili slobodni." },
      { id: "ruudw6", question: "Augustovi bračni zakoni", answer: "Lex Iulia de maritandis ordinibus (18. pr. Kr.), Lex Papia Poppaea (9.) – dužnost braka za osobe određene dobi, uz povlastice za one s troje djece; Lex Iulia de adulteriis – kažnjavanje preljuba.", explanation: "Jačanje ustanove braka." }
    ],
    quiz: [
      { id: "6ykqv0", question: "Što od navedenog nije trajna zajednica muškarca i žene?", options: ["concubinatus", "matrimonium iustum", "matrimonium legitimum", "ništa od navedenog"], correct: 3 },
      { id: "76tvev", question: "Mogu li Rimljanin i žena s ius conubii biti u konkubinatu?", options: ["ne, jer moraju sklopiti brak cum manu", "da, ako tako odluče", "ne, konkubina mora biti ropkinja", "ne, jer žena ostaje pod očevom vlašću"], correct: 1 },
      { id: "d2ltc4", question: "Brak cum manu sklopljen u obliku prividne kupnje zove se:", options: ["confarreatio", "usus", "coemptio", "sponsalia"], correct: 2 },
      { id: "2gfy1m", question: "Confarreatio je bila u staro doba privilegij:", options: ["plebejaca", "patricija", "Latina", "vojnika"], correct: 1 },
      { id: "ldx8y7", question: "Element koji razlikuje brak od konkubinata jest:", options: ["miraz (dos)", "pisana isprava o braku", "affectio maritalis", "vjerski obred (confarreatio)"], correct: 2 },
      { id: "m7w08r", question: "Minimalna dob za brak bila je:", options: ["muškarac 14, žena 12 godina", "muškarac 16, žena 14 godina", "oboje 12 godina", "muškarac 25, žena 18 godina"], correct: 0 },
      { id: "4gve6u", question: "Koja je smetnja apsolutna?", options: ["krvno srodstvo u pobočnoj liniji", "odnos tutora i štićenice", "tazbinsko srodstvo", "postojeći brak"], correct: 3 },
      { id: "yqfrs6", question: "Do kojeg je stupnja pobočne linije bio zabranjen brak krvnih srodnika?", options: ["do 2. stupnja", "do 3. stupnja", "do 4. stupnja", "do 6. stupnja"], correct: 2 },
      { id: "9sen3f", question: "Vrijeme žalosti udovice (tempus lugendi) u klasici iznosilo je:", options: ["10 mjeseci", "6 mjeseci", "2 godine", "100 dana"], correct: 0 },
      { id: "mokfao", question: "Djeca iz konkubinata:", options: ["potpadaju pod očevu vlast", "slijede majku", "zakonski su nasljednici oca", "postaju agnati oca"], correct: 1 },
      { id: "aqtgom", question: "Kod braka sine manu žena koja je bila sui iuris:", options: ["prelazi pod muževu vlast", "postaje filiae loco", "gubi svu imovinu", "ostaje pod tutorstvom agnata"], correct: 3 },
      { id: "ihwc12", question: "Kako je žena po XII ploča sprječavala nastanak manusa usus-om?", options: ["ugovaranjem miraza s mužem", "izostankom tri noći unutar godine", "izjavom pred pretorom i svjedocima", "zakletvom pred pontifikom"], correct: 1 },
      { id: "w8xulp", question: "Zakon koji je kažnjavao preljub bio je:", options: ["Lex Papia Poppaea", "Lex Iulia de adulteriis", "Lex Iulia de maritandis ordinibus", "Lex Cincia"], correct: 1 },
      { id: "quweae", question: "Koja tvrdnja o rimskom braku je točna?", options: ["sklapa se samo pred svećenikom", "razvod je isključen", "suglasnost se traži i za trajanje braka", "uvijek prenosi vlast nad ženom"], correct: 2 },
      { id: "z29t0z", question: "Faktična zajednica robova zove se:", options: ["concubinatus", "contubernium", "coemptio", "consortium"], correct: 1 }
    ],
    fillBlanks: [
      { id: "s2nxki", sentence: "Trajna volja supružnika da žive kao muž i žena zove se affectio _______.", answer: "maritalis", hint: "Bračna." },
      { id: "he3xn9", sentence: "Pravo živjeti u zajednici koja se smatra brakom zove se ius _______.", answer: "conubii", hint: "Conubium." },
      { id: "69aahl", sentence: "Razvod braka latinski se zove _______.", answer: "divortium", hint: "Razilaženje." }
    ],
    learn: {
      id: "gab9f1",
      title: "Bračno pravo",
      content: `<h3>Pojam i elementi braka</h3>
<p>U rimskom sustavu brak nije pravni, nego <strong>društveni odnos (socijalna činjenica)</strong> s određenim pravnim posljedicama. Bitna su dva elementa koja moraju postojati <strong>istodobno</strong>:</p>
<ol>
<li><strong>faktična zajednica života</strong> muškarca i žene;</li>
<li><strong>affectio maritalis</strong> – trajna namjera bračnih drugova da žive kao muž i žena.</li>
</ol>
<p>Ako otpadne bilo koji element, brak prestaje. Zato <strong>nema propisane forme</strong> sklapanja ni razvoda, a bračna suglasnost potrebna je i za početak i za trajanje braka.</p>
<p><strong>Matrimonium iustum (legitimum)</strong> – trajna veza rimskog građanina sa ženom Rimljankom ili ženom koja ima <strong>conubium</strong> (pravo živjeti u zajednici koja se smatra brakom). Djeca su rimski građani i potpadaju pod vlast oca obitelji. <strong>Manus</strong> = muževa vlast nad ženom.</p>

<h3>Druge zajednice</h3>
<ul>
<li><strong>Concubinatus</strong> – trajna zajednica slobodnih osoba različitog spola <strong>bez affectio maritalis</strong> (npr. zbog velikih socijalnih razlika). Bila je pravno priznata i donekle tretirana slično braku („brak manje vrijednosti“), ali bez učinaka braka: djeca su izvanbračna i <strong>slijede majku</strong>, nisu pod očevom vlašću ni njegovi zakonski nasljednici; <strong>nema miraza</strong>. Rimljanin i žena s conubium mogu živjeti u konkubinatu ako tako odluče.</li>
<li><strong>Contubernium</strong> – trajna zajednica robova ili slobodne osobe i roba; bez pravnih učinaka.</li>
</ul>

<h3>Brak cum manu i sine manu</h3>
<p><strong>Cum manu</strong> – prevladavao je u starije doba. Žena ulazi u agnatsku obitelj muža i potpada pod njegovu vlast (ili vlast njegova oca, ako je muž alieni iuris), raskidajući agnatsku vezu s prirodnom obitelji. Postaje <em>filiae loco</em>, stječe socijalni položaj muža i zakonsko nasljedno pravo u novoj obitelji, a gubi ga u staroj. Imovina koju je imala kao sui iuris pripada mužu – kao posljedica prijenosa vlasti, ne braka. Potkraj klasike potpuno nestaje.</p>
<h4>Oblici zasnivanja manusa</h4>
<ol>
<li><strong>Confarreatio</strong> – svečano sklapanje uz vjerski obred (sjedinjenje po božanskom i ljudskom pravu); u staro doba privilegij patricija.</li>
<li><strong>Coemptio</strong> – prividna kupnja u obliku <strong>mancipacije</strong>, uz stipulaciju o bračnoj zajednici; sudjelovali su patres familias i zaručnici, kasnije sami zaručnici.</li>
<li><strong>Usus</strong> – najjednostavniji, neformalni oblik: činjenica zajedničkog života (uz običaj dovođenja zaručnice u kuću). Nakon <strong>godine dana</strong> žena potpada pod muževu vlast, slično dosjelosti. Zakonik XII ploča dopušta da žena unutar godine <strong>tri uzastopne noći izostane iz kuće</strong> i tako prekine tijek i spriječi manus. Od konkubinata se usus razlikuje postojanjem affectio maritalis, koja se pretpostavlja kod zajednice osoba istog položaja s ius conubii te kad je ugovoren miraz ili darovanje prije braka.</li>
</ol>
<p><strong>Sine manu</strong> – žena ostaje vezana za prirodnu obitelj (agnatski i kognatski); ostaje pod vlašću oca ili, ako je sui iuris, pod tutorstvom očevih agnata. <strong>Nema prijenosa vlasti</strong> nad ženom. Zadržava zakonsko nasljedno pravo u svojoj obitelji, a u muževoj ga ne stječe. Vrijedi <strong>odvojenost imovine</strong> (uz praesumptio Muciana) i zabrana darovanja među supružnicima.</p>

<h3>Pretpostavke valjanog braka</h3>
<ul>
<li><strong>ius conubii</strong>;</li>
<li><strong>doraslost</strong> – muškarac navršenih 14, žena 12 godina (impuberes i duševno bolesni ne mogu sklopiti brak; po Justinijanu ni kastrati);</li>
<li><strong>pristanak patris familias</strong> za osobe alieni iuris – u najstarije doba odlučivali su samo patres; u klasici se traži i suglasnost zaručnika; u postklasici je dovoljna suglasnost zaručnika i kad se otac protivi;</li>
<li><strong>nepostojanje bračnih smetnji</strong>:
<ul>
<li><em>apsolutna</em> – postojeći brak (monogamija; kazna infamia);</li>
<li><em>relativne</em> – krvno srodstvo u uspravnoj liniji bez ograničenja, u pobočnoj do 4. stupnja (npr. stric i nećakinja – 3. stupanj); tazbinsko srodstvo; tutor (i njegovi bliži srodnici) i štićenica prije polaganja računa i prije njezine 25. godine (principat; kazna infamia); udovica u vrijeme žalosti – <strong>tempus lugendi</strong> (u klasici 10 mjeseci, kasnije 1 godina; prvotno moralna dužnost, pretor joj daje pravni učinak zbog sumnje u očinstvo).</li>
</ul></li>
</ul>

<h3>Prestanak braka</h3>
<ul>
<li>smrt jednog supružnika;</li>
<li>capitis deminutio maxima (gubitak slobode; isto i pad u ropstvo neprijatelja) i media (gubitak građanstva);</li>
<li>naknadna pojava bračne smetnje;</li>
<li><strong>razvod (divortium)</strong> po volji jednog ili obaju supružnika – načelo slobode razvoda; kod braka sine manu jednostranom izjavom (slanje glasnika – <em>nuntium remittere</em>); stipulacije i sporazumi da se supružnici ne smiju rastaviti ne vrijede;</li>
<li>prestanak faktične zajednice ili affectio maritalis (zarobljavanje, trajnija odsutnost, gubitak volje).</li>
</ul>

<h3>Augustovo bračno zakonodavstvo</h3>
<ul>
<li><strong>Lex Iulia de maritandis ordinibus</strong> (18. pr. Kr.) i <strong>Lex Papia Poppaea</strong> (9.) – dužnost braka za muškarce i žene određene dobi, uz povlastice za one koji imaju troje djece (oslobođenici četvero);</li>
<li><strong>Lex Iulia de adulteriis</strong> – kažnjavanje preljubnika.</li>
</ul>`
    }
  },

  polozajZeneMiraz: {
    id: "77lerj",
    name: "Položaj žene, miraz i imovina supružnika",
    icon: "fa-coins",
    color: "#8b5cf6",
    flashcards: [
      { id: "mm3tdk", question: "Koja javna prava žena nije imala?", answer: "Ius suffragii (aktivno biračko pravo – sudjelovanje u narodnim skupštinama) i ius honorum (pasivno – biti magistrat).", explanation: "Nije mogla ni biti stranka na sudu dok je u vlasti." },
      { id: "nmmgz1", question: "Privatna prava žene", answer: "Imala je ius conubii; ius commercii joj je bio ograničen – kao sui iuris važnije civilne poslove obavlja uz suglasnost tutora.", explanation: "Mancipatio, in iure cessio, prihvat nasljedstva." },
      { id: "sjw29u", question: "Doživotna vlast nad ženom", answer: "Žena je doživotno pod nekom vlašću – očevom, manusom ili barem tutorstvom (tutela mulierum); nije mogla biti tutor svoje djece.", explanation: "U kasnoj republici praktično stječe punu poslovnu sposobnost." },
      { id: "5xn4gv", question: "Dos (miraz)", answer: "Imovinski doprinos koji žena, njezin otac ili drugi daju mužu za lakše snošenje troškova kućanstva; odvojena imovina kojom upravlja muž, a služi opskrbi žene nakon braka.", explanation: "Muž pri upravljanju odgovara za dolus i culpa." },
      { id: "mtcudx", question: "Dos profecticia i dos adventicia", answer: "Profecticia – miraz daje ženin pater familias. Adventicia – miraz potječe od neke druge osobe (žena sama, srodnik, dužnik).", explanation: "Razlika važna za sudbinu miraza nakon smrti žene." },
      { id: "b89uxh", question: "Sudbina miraza nakon muževe smrti", answer: "Miraz pripada ženi.", explanation: "Svrha miraza: opskrba žene." },
      { id: "wan46u", question: "Sudbina miraza nakon smrti žene", answer: "Dos profecticia vraća se ženinu ocu, ali muž zadržava po 1/5 za svako dijete; dos adventicia ostaje mužu.", explanation: "Zadržani dio (retentio propter liberos) uzima se u obzir zbog djece rođene u braku." },
      { id: "fgsn29", question: "Sudbina miraza nakon razvoda", answer: "Miraz pripada ženi; ako je razvod skrivila žena, muž zadržava dio – propter liberos (po 1/6 za svako dijete, najviše 1/2) i propter mores (npr. 1/6 zbog preljuba).", explanation: "Retencije – pravo zadržavanja dijela." },
      { id: "nmnucf", question: "Praesumptio Muciana", answer: "U braku sine manu, u sporu o podrijetlu imovine koju žena posjeduje, pretpostavlja se da potječe od muža, ako se drukčije ne dokaže (Kvint Mucije Scevola).", explanation: "Oboriva pretpostavka." },
      { id: "wllyf3", question: "Donatio ante (propter) nuptias", answer: "Darovanje muža (zaručnika) ženi u vezi s brakom; uz miraz upućuje na postojanje affectio maritalis.", explanation: "Ugovoren miraz ili darovanje – predmnijeva se brak, a ne konkubinat." },
      { id: "b7eucq", question: "Dotis dictio", answer: "Svečano jednostrano obećanje miraza (verbalni kontrakt) – daje ga nevjestin otac, drugi srodnik po ocu, sama nevjesta ili njezin dužnik.", explanation: "Kasnije pollicitatio dotis – neformalno obećanje, utuživo (pactum legitimum)." },
      { id: "6cwnxe", question: "Zabrana darovanja među supružnicima", answer: "U braku sine manu darovanja među supružnicima (i članovima njihovih obitelji) bila su zabranjena i ništava.", explanation: "Prodaja radi darovanja među mužem i ženom nije valjana (Neracije)." }
    ],
    quiz: [
      { id: "mkv7y0", question: "Žena ne može biti magistrat jer nema:", options: ["ius suffragii", "ius honorum", "ius conubii", "ius commercii"], correct: 1 },
      { id: "7ingev", question: "Žena ne može sudjelovati u radu narodne skupštine jer nema:", options: ["ius commercii", "ius conubii", "ius suffragii", "ius honorum"], correct: 2 },
      { id: "5wa9ox", question: "Praesumptio Muciana vrijedi:", options: ["u braku cum manu", "u braku sklopljenom coemptiom", "u konkubinatu", "u braku sine manu"], correct: 3 },
      { id: "z4ahpy", question: "Miraz koji daje ženin pater familias zove se:", options: ["dos profecticia", "dos adventicia", "donatio ante nuptias", "peculium"], correct: 0 },
      { id: "1cyvd4", question: "Ako brak prestane smrću žene, dos profecticia:", options: ["vraća se ocu, a muž zadržava dio za djecu", "u cijelosti ostaje mužu kao naknada", "pripada ženinim nasljednicima po oporuci", "dijeli se napola između muža i oca"], correct: 0 },
      { id: "yvwpz9", question: "Ako brak prestane smrću muža, miraz:", options: ["pripada muževim nasljednicima", "pripada ženi", "pripada državi", "dijeli se među djecom"], correct: 1 },
      { id: "krvvug", question: "Dio miraza koji muž zadržava zbog djece kad je razvod skrivila žena zove se:", options: ["retentio propter mores", "quarta Falcidia", "retentio propter liberos", "collatio dotis"], correct: 2 },
      { id: "iz2bjq", question: "Dos adventicia nakon smrti žene:", options: ["vraća se ženinu ocu", "dijeli se među agnatima", "pripada državi", "ostaje mužu"], correct: 3 },
      { id: "c4fbkl", question: "Svečano jednostrano obećanje miraza, verbalni kontrakt, zove se:", options: ["pollicitatio dotis", "dotis dictio", "stipulatio poenae", "donatio mortis causa"], correct: 1 },
      { id: "qrgacn", question: "Ius commercii žene sui iuris bio je:", options: ["potpun od rođenja do smrti", "ograničen suglasnošću tutora", "potpuno isključen tijekom braka", "jednak pravu roba ili peregrina"], correct: 1 },
      { id: "wa9dgx", question: "Darovanja među supružnicima u braku sine manu bila su:", options: ["zabranjena", "neograničena", "dopuštena do 1/4 imovine", "moguća samo oporukom"], correct: 0 },
      { id: "vfw3rm", question: "Ugovoreni miraz ili darovanje u vezi s brakom upućuju na:", options: ["konkubinat", "affectio maritalis", "contubernium", "tutelu mulierum"], correct: 1 }
    ],
    learn: {
      id: "twu0fa",
      title: "Položaj žene, miraz i imovinski odnosi supružnika",
      content: `<h3>Položaj žene</h3>
<p>Položaj Rimljanke unutar obitelji bio je razmjerno visok, ali su joj prava bila ograničena:</p>
<ul>
<li><strong>Javna prava nije imala:</strong> <em>ius suffragii</em> (aktivno biračko pravo – sudjelovanje u narodnim skupštinama) ni <em>ius honorum</em> (pasivno pravo – biti magistrat).</li>
<li><strong>Privatna prava:</strong> imala je <em>ius conubii</em>; <em>ius commercii</em> (sklapanje poslova civilnog prava) imala je <strong>ograničeno</strong> – kao sui iuris civilne poslove (mancipatio, in iure cessio, prihvat nasljedstva) obavlja samo uz suglasnost tutora.</li>
<li>Doživotno je pod nekom vlašću – <strong>manus ili barem tutela</strong>; žena u vlasti nije mogla biti stranka na sudu ni tutor svoje djece. U doba kasne republike žena praktično stječe punu poslovnu sposobnost.</li>
</ul>

<h3>Imovinskopravni učinci braka</h3>
<ul>
<li><strong>Cum manu</strong> – žena kao osoba alieni iuris nije imovinski sposobna; sva njezina imovina pripada mužu, odnosno patri familias nove obitelji.</li>
<li><strong>Sine manu</strong> – načelo <strong>odvojene imovine</strong>: žena sui iuris zadržava svoju imovinu i njome samostalno upravlja (muž nema ni upravu ni korištenje, osim miraza); žena alieni iuris stječe za svog oca. Darovanja među supružnicima (i članovima obitelji) zabranjena su.</li>
</ul>
<h4>Praesumptio Muciana</h4>
<p>U braku <strong>sine manu</strong>, u sporu odakle potječe imovina koju žena posjeduje, pretpostavlja se da <strong>potječe od muža</strong>, ako se drukčije ne dokaže (oboriva pretpostavka; pripisuje se Kvintu Muciju Sceveli).</p>

<h3>Dos – miraz</h3>
<p>Imovinski doprinos koji daju sama žena, njezin pater familias ili drugi srodnici mužu, da bi lakše snosio troškove kućanstva. Služi <strong>opskrbi žene nakon prestanka braka</strong>. To je odvojena imovina kojom muž pravno i stvarno upravlja (za vrijeme braka u njegovoj imovini) i pri tome odgovara za dolus i culpa. U konkubinatu miraza nema.</p>
<ul>
<li><strong>dos profecticia</strong> – daje ga ženin pater familias;</li>
<li><strong>dos adventicia</strong> – potječe od druge osobe.</li>
</ul>
<p><strong>Ustanovljenje miraza:</strong> predajom (dotis datio), stipulacijom, svečanim obećanjem <strong>dotis dictio</strong> (verbalni kontrakt – obećava otac, drugi srodnik po ocu, sama nevjesta ili njezin dužnik); od 428. utuživo je i neformalno obećanje – <strong>pollicitatio dotis</strong> (pactum legitimum).</p>
<h4>Sudbina miraza nakon prestanka braka</h4>
<table>
<tr><th>Način prestanka</th><th>Sudbina miraza</th></tr>
<tr><td>smrt muža</td><td>miraz pripada ženi</td></tr>
<tr><td>smrt žene</td><td><em>dos profecticia</em> vraća se ženinu ocu, ali muž zadržava po <strong>1/5 za svako dijete</strong>; <em>dos adventicia</em> ostaje mužu</td></tr>
<tr><td>razvod bez krivnje žene</td><td>miraz pripada ženi</td></tr>
<tr><td>razvod krivnjom žene</td><td>miraz pripada ženi, ali muž zadržava dio: <strong>propter liberos</strong> (zbog djece – po 1/6 za dijete, najviše polovicu) i <strong>propter mores</strong> (zbog nemorala – npr. 1/6 zbog preljuba)</td></tr>
</table>
<p><strong>Donatio ante nuptias (propter nuptias)</strong> – darovanje muža ženi u vezi s brakom. Ugovoren miraz ili takvo darovanje upućuju na postojanje <em>affectio maritalis</em>, tj. na brak, a ne konkubinat. Siromašna udovica bez miraza i darovanja kod Justinijana ima pravo na 1/4 nasljedstva.</p>`
    },
    fillBlanks: []
  },

  tutelaCura: {
    id: "6mdard",
    name: "Tutorstvo i kuratorstvo",
    icon: "fa-hands-holding-child",
    color: "#6366f1",
    flashcards: [
      { id: "ohnypb", question: "Svrha tutorstva i kuratorstva", answer: "Zaštita osoba koje zbog dobi, spola, duševne bolesti, rasipništva ili spriječenosti ne mogu same brinuti o svojim (imovinskim) interesima i nisu pod očinskom vlašću.", explanation: "U početku više zaštita imovine nego osobe." },
      { id: "9y1s9m", question: "Razlika tutele i cure", answer: "Tutela je izvorno više u interesu (budućih) nasljednika – agnata; cura više u interesu samog štićenika.", explanation: "Tutor – zamjena za očinsku vlast." },
      { id: "flxnxj", question: "Tutela impuberum – vrste", answer: "Tutela legitima (po zakonu – najbliži agnat), tutela testamentaria (po oporuci oca) i tutela dativa (određuje magistrat).", explanation: "Nad nedoraslima sui iuris." },
      { id: "wtk487", question: "Tutela legitima", answer: "Zakonsko tutorstvo nad nedoraslim sui iuris: preuzima ga najbliži agnat (najčešće brat umrlog), a ako ga nema, gentili; nije se smjelo odreći, ali se moglo ustupiti.", explanation: "Kao i zakonsko nasljedno pravo – agnatsko." },
      { id: "8lmosn", question: "Tutela testamentaria", answer: "Oporučno tutorstvo: otac obitelji oporukom određuje tutora osobama koje nakon njegove smrti postaju sui iuris (nedorasla djeca, kćeri, supruga in manu).", explanation: "Prednost pred zakonskim." },
      { id: "nbeirb", question: "Tutela dativa", answer: "Tutora postavlja magistrat – po Lex Atilia pretor uz pučke tribune; dužnosti se nije moglo odreći ni prenijeti, osim iz zakonom predviđenih razloga.", explanation: "Javna dužnost." },
      { id: "nu8jd2", question: "Tutela mulierum", answer: "Tutorstvo nad ženama sui iuris: tutor nema vlast nad ženom niti upravlja njezinom imovinom, nego daje auctoritas za važnije poslove; pretor ga može prisiliti.", explanation: "Otuđenje res mancipi, manumisija, oporuka, prihvat nasljedstva." },
      { id: "k8vqe4", question: "Prestanak tutorstva", answer: "Punoljetnošću (doraslošću) štićenika, smrću tutora i capitis deminutio maxima ili media tutora.", explanation: "Nakon prestanka – obveze iz tutorstva (actio tutelae)." },
      { id: "rn5zo8", question: "Cura minorum", answer: "Kuratorstvo nad doraslima mlađima od 25 godina; razvilo se uz Lex Plaetoria; kurator najprije daje suglasnost, kasnije upravlja cijelom imovinom.", explanation: "Suglasnost neformalna, može i naknadno." },
      { id: "zg24bx", question: "Cura furiosi", answer: "Kuratorstvo nad duševno bolesnom osobom, koja je za trajanja bolesti potpuno djelatno nesposobna i deliktno neodgovorna.", explanation: "Nesposobnost traje samo dok traje bolest, pa u svijetlom razdoblju (lucidum intervallum) osoba može valjano djelovati." },
      { id: "egql1a", question: "Cura prodigi", answer: "Kuratorstvo nad rasipnikom – osobom koja bez mjere troši svoju imovinu.", explanation: "Ograničava djelatnu sposobnost." },
      { id: "43ii6l", question: "Cura ventris i cura absentis", answer: "Cura ventris (nomine) – radi zaštite interesa začetog, a nerođenog djeteta (nasciturusa). Cura absentis – zaštita interesa odsutne osobe.", explanation: "Uz cura minorum, furiosi i prodigi." },
      { id: "9juno1", question: "Pravna sredstva iz tutorstva i kuratorstva", answer: "Actio tutelae directa (štićenik) i contraria (tutor) nakon prestanka tutorstva; za zahtjeve iz kuratorstva actio negotiorum gestorum.", explanation: "Tutor mora položiti račun o upravi." }
    ],
    quiz: [
      { id: "ywqyi0", question: "Što vrijedi za tutelu dativu?", options: ["tutor je najbliži agnat", "tutora određuje otac oporukom", "tutora postavlja magistrat", "tutor je uvijek majka"], correct: 2 },
      { id: "hsrlrw", question: "Što vrijedi za tutelu legitimu?", options: ["tutor je najbliži agnat", "tutora imenuje pretor", "tutor je majka", "tutora bira štićenik"], correct: 0 },
      { id: "vpsh98", question: "Cura furiosi je skrb za:", options: ["žene sui iuris", "rasipnike (prodigi)", "maloljetnike do 25 godina", "duševno bolesne"], correct: 3 },
      { id: "duc5bd", question: "Cura prodigi je skrb za:", options: ["rasipnike", "odsutne", "nasciturusa", "duševno bolesne"], correct: 0 },
      { id: "p2esky", question: "Za koga vrijedi cura ventris?", options: ["za odsutnu osobu (absens)", "za začeto, a nerođeno dijete", "za ženu koja je u manusu", "za oslobođenika do 25 godina"], correct: 1 },
      { id: "g0fgq0", question: "Tutela dativa uvedena je zakonom:", options: ["Lex Plaetoria", "Lex Atilia", "Lex Falcidia", "Lex Aquilia"], correct: 1 },
      { id: "7nu2vo", question: "Tutor nad ženom sui iuris:", options: ["upravlja njezinom imovinom", "ima vlast nad njezinom osobom", "daje auctoritas za važnije poslove", "ne postoji u rimskom pravu"], correct: 2 },
      { id: "ayu05x", question: "Koja su tri osnovna oblika kuratorstva?", options: ["cura minorum, furiosi, prodigi", "tutela legitima, dativa, testamentaria", "cura dotis, bonorum, hereditatis", "cura liberi, uxoris, servi"], correct: 0 },
      { id: "csoitv", question: "Cura minorum se razvila u vezi sa zakonom:", options: ["Lex Atilia", "Lex Cincia", "Lex Aquilia", "Lex Plaetoria"], correct: 3 },
      { id: "3ses2b", question: "Tutorstvo prestaje:", options: ["samo smrću štićenika", "brakom tutora ili štićenika", "doraslošću štićenika ili smrću tutora", "isključivo odlukom pretora"], correct: 2 },
      { id: "2xsnun", question: "Oporučnog tutora određuje:", options: ["pretor uz pučke tribune", "otac obitelji oporukom", "najbliži agnat štićenika", "gens kojem štićenik pripada"], correct: 1 },
      { id: "b89rd6", question: "Za zahtjeve iz kuratorstva koristila se:", options: ["actio negotiorum gestorum", "actio pro socio (iz ortakluka)", "actio depositi directa", "rei vindicatio"], correct: 0 },
      { id: "zv3umr", question: "Duševno bolesna osoba za trajanja bolesti je:", options: ["djelatno sposobna uz kuratora", "deliktno odgovorna", "potpuno djelatno nesposobna", "u položaju roba"], correct: 2 }
    ],
    learn: {
      id: "0qabf3",
      title: "Tutorstvo (tutela) i kuratorstvo (cura)",
      content: `<h3>Svrha</h3>
<p>Tutorstvo i kuratorstvo su oblici skrbništva nad osobama koje <strong>nisu pod očinskom vlašću</strong>, a zbog maloljetnosti, spola ili drugih razloga (nepostojanje ili ograničenje djelatne sposobnosti, bolest, rasipništvo, odsutnost) ne mogu ili ne mogu dovoljno same brinuti o svojim imovinskim i drugim interesima. Tutorstvo je u određenom smislu <strong>zamjena za očinsku vlast</strong>. U početku su obje ustanove više štitile imovinu nego osobu štićenika; <strong>tutela</strong> je izvorno više u interesu nasljednika (agnata), a <strong>cura</strong> više u interesu štićenika.</p>
<p><strong>Tutor</strong> je upravitelj pupilove imovine; u starije doba djeluje u vlastito ime i ne obvezuje pupila. Ako je pupil djelomično sposoban (impubes infantia maior), sam sklapa posao, a tutor u trenutku sklapanja daje odobrenje – <strong>auctoritatis interpositio</strong>.</p>

<h3>Tutela impuberum (nad nedoraslima sui iuris)</h3>
<p>Nedorasli: muški do 14, ženske do 12 godina.</p>
<table>
<tr><th>Vrsta</th><th>Tko je tutor</th><th>Obilježja</th></tr>
<tr><td><strong>tutela legitima</strong> (zakonsko)</td><td>najbliži agnat (pravilno brat umrlog), a ako ga nema – gentili</td><td>po starom pravu povjerena agnatima, slično zakonskom nasljednom pravu; nije se smjelo odreći, ali se moglo ustupiti drugome</td></tr>
<tr><td><strong>tutela testamentaria</strong> (oporučno)</td><td>osoba koju je pater familias odredio oporukom</td><td>za osobe koje njegovom smrću postaju sui iuris: nedorasla muška djeca, ženska djeca i supruga</td></tr>
<tr><td><strong>tutela dativa</strong></td><td>osoba koju postavi magistrat</td><td>po <strong>Lex Atilia</strong> pretor uz sudjelovanje pučkih tribuna; tutor upravlja cijelom imovinom; dužnosti se nije moglo odreći ni prenijeti, osim iz zakonom predviđenih opravdanih razloga</td></tr>
</table>

<h3>Tutela mulierum (nad ženama sui iuris)</h3>
<p>Žene su i kad su bile sui iuris (izvan manus-braka, bez živog oca) stajale pod tutorstvom – posljedica patrijarhalnog gledanja i agnatskog karaktera obitelji. Sadržajno se bitno razlikuje od tutorstva nad nedoraslima: tutor <strong>nema vlast nad osobom žene niti upravlja njezinom imovinom</strong> (to čini ona sama), nego daje odobrenje (<em>auctoritas tutoris</em>) za važnije poslove: otuđenje res mancipi, oslobađanje roba, pravljenje oporuke, odricanje od obveze, prihvat nasljedstva. Odbije li dati auctoritas, žena ga preko pretora može na to prisiliti.</p>

<h3>Prestanak tutorstva i odgovornost</h3>
<p>Tutela prestaje punoljetnošću (doraslošću) štićenika, smrću tutora i capitis deminutio maxima ili media tutora. Nakon prestanka nastaje obvezni odnos: tutor polaže račun o upravljanju i naknađuje eventualnu štetu – <strong>actio tutelae directa</strong> (štićenik) i <strong>actio tutelae contraria</strong> (tutor, za izdatke).</p>

<h3>Kuratorstvo (cura)</h3>
<p>Nije jedinstvena ustanova, nego zajednički naziv za više ustanova s istim ciljem: zaštita imovinskih interesa <strong>doraslih</strong> osoba koje se zbog ograničene djelatne sposobnosti ili druge okolnosti (tjelesna mana, odsutnost) ne mogu same brinuti o imovini.</p>
<ul>
<li><strong>cura minorum</strong> – nad doraslima od 14 (12) do 25 godina; razvila se uz <strong>Lex Plaetoria</strong>; kurator najprije daje neformalna (i naknadna) odobrenja, kasnije upravlja cijelom imovinom štićenika;</li>
<li><strong>cura furiosi</strong> – nad duševno bolesnima, koji su za trajanja bolesti potpuno djelatno nesposobni i deliktno neodgovorni;</li>
<li><strong>cura prodigi</strong> – nad rasipnicima (osobe koje bez mjere troše imovinu);</li>
<li><strong>cura ventris (nomine)</strong> – radi zaštite interesa začetog a nerođenog djeteta (nasciturusa);</li>
<li><strong>cura absentis</strong> – zaštita interesa odsutne osobe.</li>
</ul>
<p>Cura minorum, furiosi i prodigi predstavljaju ograničenje djelatne sposobnosti. Ovlasti i dužnosti kuratora bile su slične tutorskima, pa su se ustanove s vremenom spojile; za zahtjeve iz kuratorstva koristila se <strong>actio negotiorum gestorum</strong>. U postklasici štićenik ima zakonsko založno pravo na imovini tutora i kuratora.</p>`
    },
    fillBlanks: []
  },

  nasljednoOpce: {
    id: "v4oqta",
    name: "Nasljedno pravo – opći pojmovi i staro civilno pravo",
    icon: "fa-people-arrows",
    color: "#f59e0b",
    flashcards: [
      { id: "14oiuu", question: "Nasljedno pravo u objektivnom i subjektivnom smislu", answer: "Objektivno: skup propisa o prijelazu imovinskih prava i obveza s umrlog na druge. Subjektivno: ovlaštenje nasljednika da stupi u imovinske odnose umrlog.", explanation: "Successio mortis causa." },
      { id: "5dqxc2", question: "Hereditas i heres; bonorum possessio i bonorum possessor", answer: "Civilni sustav (agnatsko srodstvo): ostavina – hereditas, nasljednik – heres. Pretorski sustav (agnati i kognati): ostavina – bonorum possessio, nasljednik – bonorum possessor.", explanation: "Dva sustava koegzistiraju do postklasike." },
      { id: "fwjmym", question: "Successio in universum ius", answer: "Univerzalna sukcesija – nasljednik stupa u sva prenosiva prava i obveze umrlog (cjelokupnu imovinu).", explanation: "Heres i bonorum possessor su univerzalni sukcesori." },
      { id: "ysn7it", question: "Successio in unam rem", answer: "Singularna sukcesija – stupanje u tuđe pravo s obzirom na pojedinu stvar; mortis causa: legat (formalni) i fideikomis (neformalni zapis).", explanation: "Inter vivos npr. kupoprodaja." },
      { id: "whsjof", question: "Oporučno, zakonsko i nužno nasljeđivanje", answer: "Oporučno – po oporuci (testamentum); zakonsko (neoporučno, intestatno) – po zakonu kad oporuke nema; nužno – korektiv slobode oporučivanja u korist najbližih.", explanation: "Najprije je postojalo intestatno nasljeđivanje." },
      { id: "n1g9be", question: "Semel heres, semper heres", answer: "„Jednom nasljednik, uvijek nasljednik“ – nasljednik se ne može postaviti pod rezolutivnim uvjetom ni rokom, jer prihvaćeno nasljedstvo ostaje trajno; suspenzivni uvjet i modus su dopušteni.", explanation: "Klasično i Justinijanovo pravo." },
      { id: "shib20", question: "Nemo pro parte testatus, pro parte intestatus decedere potest", answer: "„Nitko ne može biti naslijeđen dijelom po oporuci, dijelom bez nje.“ Nasljednik imenovan za dio dobiva cijelu ostavinu; oporučno nasljeđivanje isključuje zakonsko.", explanation: "Svaki je nasljednik potencijalno nasljednik cijele ostavine." },
      { id: "2vb3rp", question: "Familia (kao vrsta imovine)", answer: "U najstarijem Rimu: res mancipi – heredij, kuća na herediju, pokretnine vojničko-seljačkog gospodarstva (robovi, volovi, konji, mazge) – i osobe u očinskoj vlasti (sui).", explanation: "Vlast nad familia proizlazi iz pripadnosti općini." },
      { id: "du2n6p", question: "Pecunia", answer: "Sva ostala imovina (npr. koze, ovce) kojom je vlasnik slobodno raspolagao i za slučaj smrti – smatrala se stečenom vlastitim radom ili ratnim plijenom.", explanation: "XII ploča: kako odredi o svojoj imovini, tako neka bude." },
      { id: "yrdwxc", question: "Redoslijed nasljeđivanja familia prije XII ploča", answer: "1) najstariji muški suus, 2) osoba posinjena adopcijskom oporukom, 3) gens koji određuje novog imaoca vlasti.", explanation: "Familia je nedjeljiva, nasljeđuje je samo muškarac." },
      { id: "di9t50", question: "Redoslijed nasljeđivanja familia nakon XII ploča", answer: "1) najstariji muški suus, 2) osoba posinjena adopcijskom oporukom, 3) adgnatus proximus (najčešće brat), 4) gens.", explanation: "Adgnatus proximus priznat tek Zakonikom." },
      { id: "47z0k8", question: "Obilježja nasljeđivanja familia u starom pravu", answer: "Nasljeđuje samo jedna osoba (nedjeljivost, kao i heredij), isključivo muškarac (žena ne može imati očinsku vlast), a adgnatus proximus tek naknadno.", explanation: "Kasnije obitelj postaje djeljiva, žene nasljeđuju." },
      { id: "j5p73t", question: "Usucapio pro herede", answer: "Po XII ploča svaki je građanin nakon godine dana posjedovanja ostavine, čak i nepoštenog, stjecao položaj nasljednika.", explanation: "Povezuje se s idejom okupacije nasljedstva." }
    ],
    quiz: [
      { id: "pxvt4w", question: "Nasljednik po pretorskom pravu zove se:", options: ["heres", "bonorum possessor", "legatarius", "familiae emptor"], correct: 1 },
      { id: "8bd3ji", question: "Fideikomis je vezan za:", options: ["singularnu sukcesiju inter vivos", "formalni zapis", "neformalni zapis", "univerzalnu sukcesiju inter vivos"], correct: 2 },
      { id: "zv54ve", question: "Po Zakoniku XII ploča familia se nasljeđuje redom:", options: ["suus, adopcijska oporuka, adgnatus proximus, gens", "suus, gentiles, adgnatus proximus, kognati", "kognati, agnati, gens, adopcijska oporuka", "adgnatus proximus, suus, gens, kognati"], correct: 0 },
      { id: "2ntb8f", question: "Kako se po Zakoniku XII ploča nasljeđivala pecunia?", options: ["isključivo po agnatima", "po volji ostavitelja", "nije se nasljeđivala", "samo najstariji sin"], correct: 1 },
      { id: "jn1s3k", question: "Načelo „semel heres, semper heres“ znači da se nasljednik ne može postaviti pod:", options: ["suspenzivnim uvjetom", "modusom", "rezolutivnim uvjetom", "supstitucijom"], correct: 2 },
      { id: "vuorqp", question: "Ako je netko oporukom imenovan nasljednikom samo za polovicu ostavine, a za drugu ništa nije određeno:", options: ["drugu polovicu dobivaju zakonski nasljednici", "druga polovica pripada državi", "oporuka je ništava", "on dobiva cijelu ostavinu"], correct: 3 },
      { id: "i495kb", question: "Univerzalna sukcesija znači stupanje u:", options: ["ukupnost prenosivih prava umrlog", "pravo na jednu stvar", "samo aktivu ostavine", "samo vlasništvo nekretnina"], correct: 0 },
      { id: "6wv275", question: "Familia u najstarijem Rimu obuhvaća:", options: ["samo pokretnine i robove", "sve stvari osim zemljišta", "res mancipi i osobe u vlasti", "samo novac, koze i ovce"], correct: 2 },
      { id: "b292tr", question: "Tko nije mogao naslijediti familia u starom pravu?", options: ["najstariji muški suus", "žena", "adgnatus proximus", "posinjenik adopcijskom oporukom"], correct: 1 },
      { id: "u26j12", question: "Zakonsko nasljeđivanje naziva se i:", options: ["testamentarno", "intestatno", "nužno", "fideikomisarno"], correct: 1 },
      { id: "h6249s", question: "Usucapio pro herede po XII ploča trajala je:", options: ["dvije godine", "jednu godinu", "deset godina", "sto dana"], correct: 1 },
      { id: "ni8bqc", question: "Koje je načelo u odnosu oporučnog i zakonskog nasljeđivanja?", options: ["mogu se slobodno kombinirati", "zakonsko uvijek ima prednost", "oporučno isključuje zakonsko", "odlučuje pretor u svakom slučaju"], correct: 2 }
    ],
    fillBlanks: [
      { id: "df0vsi", sentence: "Načelo da se ne može umrijeti dijelom s oporukom, dijelom bez nje glasi: nemo pro parte testatus, pro parte _______ decedere potest.", answer: "intestatus", hint: "Bez oporuke." }
    ],
    learn: {
      id: "gwtcf9",
      title: "Nasljedno pravo – opći pojmovi i staro civilno pravo",
      content: `<h3>Pojam</h3>
<p><strong>Nasljedno pravo</strong> u objektivnom smislu je skup propisa kojima se uređuje prijelaz imovinskih prava i obveza s jednog subjekta na drugi u slučaju smrti; u subjektivnom smislu ovlaštenje nasljednika da stupi u imovinske odnose umrlog (<em>successio mortis causa</em>).</p>
<h3>Dva sustava</h3>
<table>
<tr><th></th><th>Civilni sustav</th><th>Pretorski sustav</th></tr>
<tr><td>temelj</td><td>agnatsko srodstvo</td><td>agnatsko i kognatsko srodstvo</td></tr>
<tr><td>ostavina</td><td><strong>hereditas</strong></td><td><strong>bonorum possessio</strong></td></tr>
<tr><td>nasljednik</td><td><strong>heres</strong></td><td><strong>bonorum possessor</strong></td></tr>
</table>
<p>Pravna osnova za stjecanje nasljedstva je <strong>oporuka</strong> (testamentarno nasljeđivanje – imovina prelazi na osobu koju odredi ostavitelj) ili <strong>zakon</strong> (intestatno, neoporučno, zakonsko nasljeđivanje – imovina prelazi na agnatske i kognatske srodnike). Najprije je postojalo intestatno nasljeđivanje (zatvorena kućna privreda, consortium); s razvojem privatnog vlasništva raste uloga oporuke; pretjerana sloboda oporučivanja pogađala je najbliže srodnike, pa je kao korektiv stvoreno <strong>nužno nasljedno pravo</strong>.</p>
<h3>Sukcesija</h3>
<ul>
<li><strong>Successio in universum ius</strong> (univerzalna) – stupanje u ukupnost prava i obveza umrlog (ona koja su po naravi prenosiva); heres i bonorum possessor su univerzalni sukcesori.</li>
<li><strong>Successio in unam rem</strong> (singularna) – stupanje u pravo s obzirom na pojedinu stvar; inter vivos (npr. kupoprodaja) i mortis causa: <strong>legat</strong> (formalni zapis) i <strong>fideikomis</strong> (neformalni zapis).</li>
</ul>
<h3>Regule nasljednog prava</h3>
<ul>
<li><em>Semel heres, semper heres</em> – „Jednom nasljednik, uvijek nasljednik“. Po klasičnom i Justinijanovu pravu nasljednik je mogao biti postavljen pod <strong>suspenzivnim</strong>, ali ne pod <strong>rezolutivnim uvjetom</strong>, jer bi se to protivilo načelu da jednom prihvaćeno nasljedstvo trajno ostaje nasljedniku; postavljanje se nije moglo vezati ni za rok, a <strong>modus</strong> je bio dopušten.</li>
<li><em>Nemo pro parte testatus, pro parte intestatus decedere potest</em> – „Nitko ne može biti naslijeđen dijelom na temelju oporuke, dijelom neoporučno“. Oporučno nasljeđivanje isključuje zakonsko čak i kao djelomičnu dopunu; tko je imenovan nasljednikom dijela, postaje nasljednik cijele ostavine, jer je svaki nasljednik potencijalni nasljednik cijele ostavine (otpadne li prepreka, npr. pravo sunasljednika, njegovo se ovlaštenje širi).</li>
</ul>

<h3>Staro civilno pravo: familia i pecunia</h3>
<ul>
<li><strong>Familia</strong> – sve stvari koje su tada bile <em>res mancipi</em>: heredij (neotuđivo i nedjeljivo zemljište), kuća podignuta na herediju, pokretnine koje su temelj vojničko-seljačkog gospodarstva (robovi, volovi, konji, mazge) te <strong>osobe u očinskoj vlasti (sui)</strong>. Vlast nad familia proizlazi iz pripadnosti općini – otac sa svojom „čeljadi“ osnovna je stanica vojnički organizirane općine.</li>
<li><strong>Pecunia</strong> – sva ostala imovina (koze, ovce…). Njome je vlasnik slobodno raspolagao i za slučaj smrti, jer se smatralo da ju je stekao vlastitim radom ili ratnim plijenom. XII ploča: „kako on odredi o svojoj imovini i nadzoru nad svojim stvarima, tako neka bude“.</li>
</ul>
<p>Razlika familia/pecunia ne poklapa se s res mancipi/nec mancipi (u familia su i osobe). S bogaćenjem Rima i privatnom okupacijom državnog zemljišta heredij gubi značenje, familia i pecunia se spajaju, obitelj postaje djeljiva, a nasljedno pravo dobivaju i žene.</p>
<h4>Nasljeđivanje vlasti nad obitelji</h4>
<table>
<tr><th>Prije Zakonika XII ploča</th><th>Nakon Zakonika XII ploča</th></tr>
<tr><td>1. najstariji muški suus (najvjerojatnije najstariji sin)<br>2. osoba posinjena adopcijskom oporukom<br>3. gens koji između svojih članova određuje novog imaoca vlasti</td><td>1. najstariji muški suus<br>2. osoba posinjena adopcijskom oporukom<br>3. <strong>adgnatus proximus</strong> – najbliži muškarac povezan nekadašnjom očinskom vlašću (najčešće brat)<br>4. gens</td></tr>
</table>
<p><strong>Obilježja:</strong> (A) obitelj nasljeđuje <strong>samo jedna osoba</strong> – nedjeljivost obitelji potječe iz nedjeljivosti heredija (oskudica zemlje; „višak“ sinova odlazio je u kolonije ili se davao posiniti); (B) nasljeđuje <strong>isključivo muškarac</strong> – žena ne može biti nositelj očinske vlasti; (C) <strong>adgnatus proximus</strong> priznat je tek Zakonikom XII ploča. Agnat je nasljedstvo stjecao prihvatom, ne smrću ostavitelja; ako otpadne, idući agnat nema pravo. U doba XII ploča svatko je nepoštenim posjedovanjem ostavine nakon <strong>godine dana</strong> mogao dosjesti položaj nasljednika – <strong>usucapio pro herede</strong> (Lenelova ideja: i najbliži agnat zapravo okupira nasljedstvo, samo s prednošću).</p>
<p><strong>Teorije o najstarijem nasljednom pravu</strong>: Bonfante – obitelj ima političku funkciju, nasljeđivanje je preuzimanje vlasti, oporuka je starija od zakonskog nasljeđivanja; Levy-Bruhl – oporučno imenovanje nasljednika je određivanje glave obitelji; Stojčević – pravo su imali adgnatus proximus i gentili, a suus samo ako ga je otac oporučno postavio; Arangio-Ruiz – nasljeđuje descendent, a oporuka se uvodi kad ga nema.</p>`
    }
  },

  neoporucno: {
    id: "b6891l",
    name: "Neoporučno (zakonsko) nasljeđivanje",
    icon: "fa-diagram-project",
    color: "#10b981",
    flashcards: [
      { id: "v4vo3t", question: "Sui heredes (civilno pravo)", answer: "Prvi red: osobe pod vlašću ostavitelja u času smrti koje time postaju sui iuris – žena in manu, djeca (i adrogirana, adoptirana), unuci umrlih ili emancipiranih sinova ako su ostali u vlasti.", explanation: "Nisu: žena sine manu, emancipirana djeca." },
      { id: "od6ppl", question: "Načelo reprezentacije kod sui", answer: "Sin u vlasti isključuje svoju djecu; ako je umro prije ostavitelja, njegova djeca dobivaju ono što bi pripalo njemu.", explanation: "Dijeli se po lozama (per stirpes)." },
      { id: "5f6dj2", question: "Adgnatus proximus (civilno pravo)", answer: "Drugi red: najbliži agnat (braća i sestre ostavitelja i njihovi potomci); nasljeđuje samo najbliži – nema reprezentacije; heres voluntarius.", explanation: "Ako odbije, ne poziva se idući agnat nego gens." },
      { id: "6v9zox", question: "Gentiles", answer: "Treći red: pripadnici istog roda (gens); ostavina vjerojatno ulazi u imovinu gentilne zajednice.", explanation: "Nasljeđivanje gensa kasnije pada u zaborav." },
      { id: "qyciqk", question: "SC Tertullianum", answer: "Senatusconsultum (doba Hadrijana): majka koja nije in manu dobiva civilno nasljedno pravo prema svojoj bračnoj i izvanbračnoj djeci ako ima ius liberorum (rodila 3 puta).", explanation: "Justinijan ukida uvjet ius liberorum." },
      { id: "f287zc", question: "SC Orfitianum (178.)", answer: "Djeca dobivaju civilno nasljedno pravo prema majci u prvom redu, iako s majkom koja nije in manu nisu u agnatskom srodstvu.", explanation: "Prednost pred agnatima." },
      { id: "gbaopx", question: "Pretorski nasljedni redovi", answer: "1) unde liberi, 2) unde legitimi, 3) unde cognati, 4) unde vir et uxor.", explanation: "Skraćeno od naziva dijelova pretorskog edikta." },
      { id: "jsglyo", question: "Unde liberi", answer: "Djeca u vlasti i emancipirana djeca (i njihovi potomci po reprezentaciji); nasljeđuju prihvatom, ne ipso iure; žena nema liberi u tom smislu.", explanation: "Bonorum possessio cum re." },
      { id: "kitwqc", question: "Collatio bonorum", answer: "Obveza emancipiranog sina da u ostavinsku masu unese imovinu stečenu nakon emancipacije (stipulacijom obećanu neemancipiranima); inače ne dobiva bonorum possessio.", explanation: "Pitanje kolacije postavljaju sui heredes." },
      { id: "wdcojh", question: "Nova clausula Iuliani", answer: "Emancipirani sin čija su djeca ostala u vlasti djeda dijeli nasljedstvo sa svojom djecom na jednake dijelove.", explanation: "Iznimka od reprezentacije." },
      { id: "7qemp2", question: "Unde legitimi", answer: "Drugi pretorski red: osobe koje su nasljednici po civilnom pravu (sui, adgnatus proximus, gentiles) – praktično braća i sestre ostavitelja.", explanation: "Novina: agnat može tražiti b. p. i kad suus nije." },
      { id: "kxces2", question: "Unde cognati", answer: "Treći pretorski red: krvni srodnici do 6. stupnja (iz 7. djeca rođaka); bliži isključuje daljeg; emancipacija i capitis deminutio minima ne smetaju.", explanation: "Vrijedi successio graduum." },
      { id: "12iddd", question: "Unde vir et uxor", answer: "Četvrti pretorski red: preživjeli bračni drug iz zakonitog braka koji je trajao do smrti, ako nema srodnika iz prva tri reda.", explanation: "Međusobno nasljeđivanje supružnika." },
      { id: "14mwl8", question: "Successio ordinum i successio graduum", answer: "Ordinum: ako nitko iz jednog pretorskog reda ne prihvati, poziva se idući red. Graduum: u trećem redu, ako najbliži kognat ne prihvati, poziva se idući najbliži.", explanation: "Kod Justinijana: bliži isključuje daljeg." },
      { id: "yv7k2d", question: "Rok za traženje bonorum possessio", answer: "Roditelji i djeca ostavitelja – jedna godina (od delacije), ostali obično 100 dana.", explanation: "Ako ne zatraže, nudi se idućem redu." },
      { id: "tyafuk", question: "Bonorum possessio cum re i sine re", answer: "Cum re – bonorum possessor ima prednost pred civilnim nasljednikom (npr. unde liberi). Sine re – prednost ima heres.", explanation: "Pojmovi pokazuju sukob dvaju sustava." },
      { id: "dblo7e", question: "Bona vacantia", answer: "Ostavina bez nasljednika po civilnom i pretorskom pravu – pripada državi (aerarium populi Romani), od ranog principata fiscusu.", explanation: "Ošasna dobra." },
      { id: "vkidxs", question: "Justinijanovi nasljedni redovi (Novele 118 i 127)", answer: "1) descendenti, 2) ascendenti s punorodnom braćom i sestrama, 3) polubraća i polusestre (consanguinei i uterini), 4) ostali kognati.", explanation: "Temelj je isključivo kognatsko srodstvo." },
      { id: "mwmbkc", question: "Siromašna udovica u Justinijanovu pravu", answer: "Ako nije imala ni miraza ni darovanja u vezi s brakom, imala je pravo na 1/4 nasljedstva.", explanation: "Inače bračni drug nasljeđuje tek kad nema srodnika." }
    ],
    quiz: [
      { id: "908vn0", question: "U koji nasljedni red po Justinijanovu neoporučnom nasljeđivanju spadaju consanguinei i uterini?", options: ["prvi", "drugi", "treći", "četvrti"], correct: 2 },
      { id: "gxglfp", question: "Kod neoporučnog nasljeđivanja po pretorskom pravu kognati su pozvani u:", options: ["1. nasljednom redu", "2. nasljednom redu", "3. nasljednom redu", "4. nasljednom redu"], correct: 2 },
      { id: "oj3lbo", question: "Tko nije suus heres ostavitelja?", options: ["žena in manu", "adoptirani sin", "unuk od umrlog sina u vlasti", "emancipirani sin"], correct: 3 },
      { id: "5lqbmb", question: "Ako ostavitelja nadživi brat i dva sinovca od ranije umrlog brata, po civilnom pravu nasljeđuje:", options: ["samo brat", "brat i sinovci na jednake dijelove", "samo sinovci", "gens"], correct: 0 },
      { id: "in2q2l", question: "SC Orfitianum dao je nasljedno pravo:", options: ["majci prema djeci", "djeci prema majci", "supružnicima međusobno", "oslobođenicima prema patronu"], correct: 1 },
      { id: "v8fhaw", question: "Uvjet nasljeđivanja majke prema SC Tertullianum jest:", options: ["brak cum manu", "ius liberorum", "pristanak agnata", "punoljetnost djeteta"], correct: 1 },
      { id: "r4sy9w", question: "Obveza emancipiranog da unese posebnu imovinu u ostavinsku masu zove se:", options: ["collatio bonorum", "beneficium separationis", "ius adcrescendi", "quarta Falcidia"], correct: 0 },
      { id: "1r9uq1", question: "Pozivanje idućeg pretorskog reda kad nitko iz prethodnog ne prihvati zove se:", options: ["successio graduum", "ius adcrescendi", "transmissio", "successio ordinum"], correct: 3 },
      { id: "m7i5k8", question: "U kojem je pretorskom redu bonorum possessio bila cum re?", options: ["unde legitimi", "unde liberi", "unde cognati", "unde vir et uxor"], correct: 1 },
      { id: "v9d343", question: "Ostavina bez nasljednika od ranog principata pripada:", options: ["gensu", "pretoru", "fiscusu", "najbližem susjedu"], correct: 2 },
      { id: "aisy5o", question: "Rok za traženje bonorum possessio za ostale srodnike obično je iznosio:", options: ["30 dana", "100 dana", "jednu godinu", "pet godina"], correct: 1 },
      { id: "nyk9ju", question: "Djeca u vlasti i emancipirana djeca u pretorskom sustavu zovu se:", options: ["legitimi", "cognati", "agnati", "liberi"], correct: 3 },
      { id: "58r3ee", question: "Krvni srodnici u trećem pretorskom redu pozivaju se do:", options: ["4. stupnja", "6. stupnja", "10. stupnja", "neograničeno"], correct: 1 },
      { id: "2lnvfu", question: "Po Justinijanu (Nov. 118), ako nasljeđuju djed po ocu te djed i baka po majci, ostavina se dijeli:", options: ["na tri jednaka dijela, svakome po trećina", "½ djedu po ocu, po ¼ djedu i baki po majci", "cijela ostavina pripada djedu po ocu kao agnatu", "cijela ostavina djedu i baki po majci, jer ih je dvoje"], correct: 1 },
      { id: "a24gni", question: "Siromašna udovica bez miraza po Justinijanu dobiva:", options: ["1/2 nasljedstva", "1/3 nasljedstva", "1/4 nasljedstva", "ništa"], correct: 2 },
      { id: "fe0byj", question: "Nova clausula Iuliani odnosi se na:", options: ["emancipiranog sina i njegovu djecu u vlasti djeda", "posinjenje adopcijskom oporukom pred kurijama", "nasljeđivanje oslobođenika iza patrona", "nasljeđivanje majke iza izvanbračne djece"], correct: 0 },
      { id: "wzabxe", question: "Načelo reprezentacije znači da:", options: ["nasljeđuje samo najstariji sin", "potomci umrlog stupaju na njegovo mjesto", "ostavina uvijek pripada gensu i rodu", "bliži srodnik dijeli s daljim na jednako"], correct: 1 }
    ],
    fillBlanks: [
      { id: "0gz4i4", sentence: "Ostavina bez ikakvih nasljednika naziva se bona _______.", answer: "vacantia", hint: "Prazna, ošasna." },
      { id: "7qvpcs", sentence: "Najbliži agnat na latinskom je adgnatus _______.", answer: "proximus", hint: "Najbliži." }
    ],
    learn: {
      id: "p5y9m9",
      title: "Neoporučno (intestatno) nasljeđivanje",
      content: `<p>Intestatno nasljeđivanje primjenjuje se kad umrli nije ostavio oporuku (ili nije došlo do nasljeđivanja po oporuci); imovina prelazi na osobe kojima je zakon priznao svojstvo nasljednika.</p>

<h3>Civilno pravo (Zakonik XII ploča)</h3>
<p>Cilj je da imovina ostane u obiteljskoj zajednici (consortium) zasnovanoj na agnaciji. Nasljedstvo pripada nasljedniku čim ostavitelj umre, pa nasljednik mora postojati u tom času, barem kao nasciturus. Tri reda:</p>
<ol>
<li><strong>Sui heredes</strong> – osobe pod vlašću ostavitelja u času njegove smrti, koje time postaju sui iuris, bez obzira kako su došle pod vlast: supruga in manu, djeca (rođena, adrogirana, adoptirana), unuci umrlih ili emancipiranih sinova (ako su ostali pod vlašću djeda); bez obzira na spol. <strong>Nisu</strong> sui: supruga sine manu, emancipirana djeca i njihovi potomci koji nisu ostali u vlasti. Vrijedi <strong>reprezentacija</strong>: sin isključuje svoju djecu, ali ako je umro prije, njegova djeca dobivaju njegov dio. Iza žene nema sui (ne može imati očinsku vlast). Sui su <strong>heredes necessarii</strong> – stječu ipso iure i ne mogu odbiti.</li>
<li><strong>Adgnatus proximus</strong> – ako nema sui; ostaviteljeva braća i sestre i njihovi potomci – srodnici koji su nekad pripadali istoj obiteljskoj zajednici. Nasljeđuje <strong>samo najbliži</strong> agnat (nema reprezentacije: brat isključuje sinovce od umrlog brata). S muškarcima su izjednačene samo sestre; dalji agnati samo muškog spola. Agnat je <strong>heres voluntarius</strong> – može prihvatiti ili odbiti; ako odbije, ne poziva se idući agnat nego gens.</li>
<li><strong>Gentiles</strong> – pripadnici istog roda; XII ploča u množini („neka imovina pripadne gentilima“) upućuje na to da je ostavina ulazila u imovinu gentilne zajednice.</li>
</ol>
<h4>Izuzeci od agnacije u klasici</h4>
<ul>
<li><strong>SC Tertullianum</strong> (doba Hadrijana) – žena koja nije in manu dobiva civilno nasljedno pravo prema svojoj (bračnoj i izvanbračnoj) djeci, ako ima <strong>ius liberorum</strong> (slobodna žena rodila barem tri puta); Justinijan ukida taj uvjet.</li>
<li><strong>SC Orfitianum</strong> (178.) – djeca dobivaju civilno pravo nasljedstva prema majci u prvom redu, iako nisu s njom u agnatskom srodstvu.</li>
</ul>

<h3>Pretorsko pravo (bonorum possessio)</h3>
<p>Izlaskom iz obitelji (emancipacijom, često u interesu oca radi uključivanja djece u poslove) dijete je gubilo zakonsko nasljedno pravo; tu nepravičnost (kako ističe Gaj) uklonio je pretor, postupno napuštajući agnaciju u korist krvnog srodstva. Bonorum possessio dodjeljuje se samo na zahtjev, u rokovima: <strong>roditelji i djeca – 1 godina</strong> od delacije, ostali <strong>100 dana</strong>.</p>
<ol>
<li><strong>Unde liberi</strong> – djeca u vlasti i <strong>emancipirana djeca</strong> (te sin dan u adopciju pa emancipiran), unuci po reprezentaciji (dioba po lozama – per stirpes, unutar loze po glavama – per capita). Supruga sine manu nije u ovom redu; žena nema „liberi“. Liberi ne nasljeđuju ipso iure, nego prihvatom. <strong>Collatio bonorum</strong>: emancipirani mora u masu unijeti imovinu stečenu nakon emancipacije (stipulacijom obećati neemancipiranima odgovarajući dio), inače ne dobiva b. p.; pitanje kolacije postavljaju sui. <em>Primjer:</em> otac ostavi 200, sin Marko u vlasti, emancipirani Gaj ima 100 – Gaj prima nasljedstvo, a Marko dobiva 100 od oca i 50 od Gaja (ukupno 150). <strong>Nova clausula Iuliani</strong>: emancipirani sin čija su djeca ostala u vlasti djeda dijeli s njima na jednake dijelove. Ako je emancipirani umro prije ostavitelja, njegovi potomci rođeni nakon emancipacije mogu tražiti b. p.</li>
<li><strong>Unde legitimi</strong> – osobe koje su nasljednici po civilnom pravu (Zakoniku XII ploča): sui, adgnatus proximus, gentiles; praktično braća i sestre. Razlika prema civilnom pravu: najbliži agnat može tražiti b. p. i kad suus nije, jer civilno pravo ne zna devoluciju.</li>
<li><strong>Unde cognati</strong> – krvni srodnici do <strong>6. stupnja</strong> (a iz 7. djeca rođaka); bliži isključuje daljeg; ograničenja za ženske srodnike ne vrijede; emancipacija i capitis deminutio minima ne smetaju.</li>
<li><strong>Unde vir et uxor</strong> – međusobno nasljeđivanje supružnika iz zakonitog braka koji je trajao do smrti, ako nema srodnika iz prva tri reda.</li>
</ol>
<ul>
<li><strong>Successio ordinum</strong> – ako ovlaštenici jednog reda ne prihvate (ili se odreknu), poziva se idući red.</li>
<li><strong>Successio graduum</strong> – u trećem redu, ako najbliži kognat ne prihvati, poziva se idući po blizini.</li>
<li><strong>Bonorum possessio cum re / sine re</strong> – u sukobu s heresom: cum re – prednost ima bonorum possessor (unde liberi; pretorska oporuka od Antonina Pija); sine re – prednost ima heres.</li>
<li><strong>Bona vacantia</strong> – ako nema ovlaštenika ni po civilnom ni po pretorskom pravu, ostavina kao ošasna dobra pripada državi (<em>aerarium populi Romani</em>), od ranog principata caru (<em>fiscus</em>) – ne kao nasljedniku u užem smislu.</li>
</ul>

<h3>Postklasično pravo</h3>
<p>U praksi nestaje razlika civilnog i pretorskog nasljeđivanja; ukidaju se cretio i bonorum possessio. Redoslijed: 1) sui (potomci povezani muškim osobama), 2) agnati, 3) kognati. Collatio bonorum postaje suvišna (djeca u vlasti stječu vlastitu imovinu); razvija se <em>collatio descendentium</em> (uračunavanje miraza i darovanja prije braka).</p>

<h3>Justinijanovo pravo (Novele 118 iz 543. i 127 iz 548.)</h3>
<p>Ukinut je dvostruki sustav, a temelj zakonskog nasljeđivanja je <strong>isključivo kognatsko srodstvo</strong>. Četiri klase:</p>
<ol>
<li><strong>Descendenti</strong> – djeca, unuci umrlih sinova ili kćeri, adrogirana i adoptirana djeca, pozakonjena djeca; izvanbračna samo majku i njezine srodnike; adoptirani zadržava pravo prema prirodnom ocu. Djeca po glavama, kod različitih stupnjeva reprezentacija.</li>
<li><strong>Ascendenti i punorodna braća i sestre (germani)</strong> – bliži isključuje daljeg; ako nasljeđuju samo preci – <strong>napola po linijama</strong> (očeva i majčina); ako nasljeđuju s braćom i sestrama – po glavama, uz reprezentaciju djece umrle braće.</li>
<li><strong>Polubraća i polusestre</strong> – <strong>consanguinei</strong> (preko oca) i <strong>uterini</strong> (preko majke), i izvanbračni; njihova djeca po reprezentaciji (ne i unuci).</li>
<li><strong>Ostali kognati</strong> – kolaterali do 6. (iznimno 7.) stupnja; bliži isključuje daljeg (successio graduum).</li>
</ol>
<p>Bračni drug nasljeđuje tek ako nema srodnika; <strong>siromašna udovica</strong> bez miraza i darovanja u vezi s brakom ima pravo na <strong>1/4</strong> nasljedstva.</p>`
    }
  },

  oporucno: {
    id: "rvkgxc",
    name: "Oporučno i nužno nasljeđivanje",
    icon: "fa-file-signature",
    color: "#ef4444",
    flashcards: [
      { id: "mmdri3", question: "Testamentum (oporuka)", answer: "Jednostrani, formalistički pravni posao mortis causa (iuris civilis) kojim ostavitelj određuje nasljednika svoje imovine; može se opozvati do smrti.", explanation: "Bitni sadržaj: heredis institutio." },
      { id: "0ft468", question: "Institutio heredis", answer: "Imenovanje nasljednika – glava i temelj oporuke; bez njega oporuka je nevaljana, a nevaljano je i ono što u oporuci stoji ispred njega (npr. legat).", explanation: "U klasici na početku, latinskim riječima, s riječju heres." },
      { id: "jbep3l", question: "Persona certa i persona incerta", answer: "Nasljednik mora biti određena osoba (fizička osoba ili nasciturus uz uvjet da se rodi živ). Pravna osoba je persona incerta i ne može biti imenovana nasljednikom.", explanation: "Iznimka: oslobođenici mogu imenovati svoju gradsku općinu." },
      { id: "5015zf", question: "Najstarije oporuke", answer: "Testamentum calatis comitiis – pred kurijatskom skupštinom koju saziva pontifex maximus (dvaput godišnje); testamentum in procinctu – pred vojskom spremnom za boj.", explanation: "Najstarija oporuka imala je adopcijski karakter." },
      { id: "knves6", question: "Mancipacijska oporuka starijeg tipa", answer: "Testamentum per aes et libram: ostavitelj mancipacijom prenosi imovinu kupcu obitelji (familiae emptor) s nalogom kako je podijeliti nakon smrti; familiae emptor nije nasljednik i nema koristi.", explanation: "Pet svjedoka i libripens." },
      { id: "nhhli8", question: "Mancipacijska oporuka novijeg tipa", answer: "Familiae emptor i libripens postaju obični svjedoci (ukupno 7), a ostavitelj sam imenuje pravog nasljednika i izjavljuje (nuncupatio) da isprava u ruci sadrži njegovu volju.", explanation: "Obuhvaća i familia i pecunia." },
      { id: "3k6yws", question: "Pretorska oporuka", answer: "Isprava s posljednjom voljom zapečaćena pečatima sedmorice svjedoka, bez mancipacije; davala je bonorum possessio – sine re, a od Antonina Pija (exceptio doli) cum re.", explanation: "Prednost pred civilnim zakonskim nasljednikom." },
      { id: "tm4gqx", question: "Vojnička oporuka", answer: "Vojnici su mogli oporučiti bez ikakvih formalnosti; oporuka gubi snagu godinu dana nakon časnog otpusta iz službe.", explanation: "Primjer ius singulare." },
      { id: "u0q0e9", question: "Substitutio vulgaris", answer: "Oporučitelj imenuje zamjenskog nasljednika (heres substitutus) za slučaj da prvoimenovani (heres institutus) ne postane nasljednikom.", explanation: "Supstitucija je imenovanje pod suspenzivnim uvjetom." },
      { id: "wtd6bt", question: "Substitutio pupillaris", answer: "Otac na temelju očinske vlasti određuje nasljednika svom nedoraslom djetetu u vlasti za slučaj da umre prije doraslosti.", explanation: "U klasici je to nasljednik djeteta; u postklasici i oca." },
      { id: "ojggzf", question: "Substitutio quasi pupillaris", answer: "Justinijan: predak (i majka) može odrediti nasljednika punoljetnom, ali duševno bolesnom descendentu koji sam ne može oporučiti.", explanation: "Analogija pupilarnoj supstituciji." },
      { id: "703z53", question: "Praeteritio i exheredatio", answer: "Praeteritio – mimoilaženje sui u oporuci (ni imenovani ni isključeni). Exheredatio – isključenje iz nasljedstva.", explanation: "Formalno nužno nasljedno pravo." },
      { id: "i5vylh", question: "Posljedica mimoilaženja sina u vlasti", answer: "Ako sin u vlasti nije imenovan niti poimenično (nominatim) isključen, oporuka je po civilnom pravu nevaljana i nastupa zakonsko nasljeđivanje.", explanation: "Sin se mora isključiti poimenično; ostale potomke (kćeri, unuke) civilno pravo dopušta isključiti zbirno (inter ceteros), a pretor traži poimenično isključenje svih muških potomaka." },
      { id: "jh1zlq", question: "Posljedica mimoilaženja kćeri ili unuka", answer: "Oporuka je valjana, ali mimoiđeni dobivaju neoporučni dio ako je imenovan suus, odnosno polovicu ako je imenovan extraneus.", explanation: "Kćer i unuke dovoljno je isključiti općom klauzulom." },
      { id: "n0vzus", question: "Ceteri omnes exheredes sunto", answer: "„Svi ostali neka budu isključeni“ – opća klauzula kojom se valjano isključuju kći i unuci (ne i sin, koji se isključuje poimence).", explanation: "Exheredatio inter ceteros." },
      { id: "sl6hdr", question: "Querella inofficiosi testamenti", answer: "Tužba djeteta protiv „nemoralne“ oporuke kojom ga se ostavitelj nije dovoljno sjetio (centumviri, kraj republike); isključena ako je dijete dobilo barem 1/4 neoporučnog dijela.", explanation: "Bez opravdanog razloga – dijete dobiva puni neoporučni dio." },
      { id: "2s4k7e", question: "Nužni dio kod Justinijana", answer: "Do četvero djece 1/3, preko četvero 1/2 neoporučnog dijela; tko je dobio nešto, ima actio suppletoria (nadopuna); isključenje samo zbog zakonom nabrojenih razloga nezahvalnosti.", explanation: "Novele 18 i 115." },
      { id: "0yz36j", question: "Postklasične oporuke", answer: "Bez stroge forme imenovanja; vlastoručne oporuke, usmene pred 7 svjedoka, javne oporuke, potpisi svjedoka; testamentum parentum inter liberos; divisio inter liberos.", explanation: "Prijelaz prema srednjovjekovnom shvaćanju oporuke." }
    ],
    quiz: [
      { id: "rlh0ld", question: "Oporuka u klasičnom pravu je nevaljana kada:", options: ["je kći isključena općom klauzulom", "sin u vlasti nije imenovan ni isključen", "je kao nasljednica imenovana samo kći", "je sin isključen poimence, a kći imenovana"], correct: 1 },
      { id: "qtq0qn", question: "Bitan element rimske oporuke, bez kojeg je nevaljana, jest:", options: ["legatum", "institutio heredis", "fideicommissum", "tutoris datio"], correct: 1 },
      { id: "jqfw2c", question: "Oporuka pred kurijatskom skupštinom zove se:", options: ["testamentum calatis comitiis", "testamentum in procinctu", "testamentum per aes et libram", "testamentum praetorium"], correct: 0 },
      { id: "za3xz1", question: "Pretorsku oporuku zapečaćivalo je:", options: ["pet svjedoka", "tri svjedoka", "sedam svjedoka", "pretor osobno"], correct: 2 },
      { id: "wcu2rl", question: "Imenovanje zamjenskog nasljednika za slučaj da prvoimenovani ne postane nasljednik je:", options: ["substitutio pupillaris", "substitutio quasi pupillaris", "transmissio", "substitutio vulgaris"], correct: 3 },
      { id: "j5rv9x", question: "Pravna osoba u klasičnom pravu kao nasljednik je:", options: ["persona certa", "persona incerta", "heres necessarius", "bonorum possessor"], correct: 1 },
      { id: "i3ahwv", question: "Querella inofficiosi testamenti isključena je ako je dijete dobilo barem:", options: ["1/2 neoporučnog dijela", "1/3 neoporučnog dijela", "1/4 neoporučnog dijela", "1/6 neoporučnog dijela"], correct: 2 },
      { id: "4ir4gm", question: "Ako je mimoiđena kći, a nasljednik je extraneus, kći dobiva:", options: ["polovicu nasljedstva", "ništa", "cijelo nasljedstvo", "1/4 nasljedstva"], correct: 0 },
      { id: "pwzetk", question: "Kupac obitelji kod mancipacijske oporuke starijeg tipa zove se:", options: ["libripens", "heres institutus", "familiae emptor", "fiduciarius"], correct: 2 },
      { id: "0uzr75", question: "Pretorska oporuka postala je cum re za cara:", options: ["Augusta", "Hadrijana", "Antonina Pija", "Justinijana"], correct: 2 },
      { id: "pl6qdh", question: "Određivanje nasljednika nedoraslom djetetu za slučaj smrti prije doraslosti jest:", options: ["substitutio vulgaris", "substitutio pupillaris", "exheredatio", "collatio"], correct: 1 },
      { id: "0x23pt", question: "Nužni dio do četvero djece kod Justinijana iznosi:", options: ["1/4", "1/3", "1/2", "1/6"], correct: 1 },
      { id: "drc6ex", question: "Tko je mogao biti imenovan nasljednikom u klasičnoj oporuci?", options: ["gradska općina", "kolegij", "nasciturus", "nepoznata osoba"], correct: 2 },
      { id: "u0gv4o", question: "Vojnička oporuka gubi snagu:", options: ["godinu dana nakon časnog otpusta", "odmah po otpustu iz vojske", "deset godina nakon sastavljanja", "nikada, vrijedi trajno"], correct: 0 },
      { id: "oq7aj8", question: "Svečana izjava ostavitelja da isprava sadrži njegovu volju zove se:", options: ["mancipatio", "nuncupatio", "cretio", "exheredatio"], correct: 1 },
      { id: "99khuv", question: "Koja je tvrdnja o postklasičnoj oporuci točna?", options: ["imenovanje mora biti na latinskom", "valjana je usmena oporuka pred 7 svjedoka", "nužno je sudjelovanje kurija", "dopušten je samo mancipacijski oblik"], correct: 1 },
      { id: "i9n6m8", question: "Ako je u oporuci legat napisan ispred imenovanja nasljednika, po klasičnom pravu:", options: ["legat je valjan", "legat nije valjan", "legat se pretvara u fideikomis", "legat se dijeli napola"], correct: 1 }
    ],
    fillBlanks: [
      { id: "yk9rqn", sentence: "Opća klauzula isključenja glasi: ceteri omnes _______ sunto.", answer: "exheredes", hint: "Isključeni iz nasljedstva." }
    ],
    learn: {
      id: "6lyoyv",
      title: "Oporučno i nužno nasljeđivanje",
      content: `<h3>Pojam oporuke</h3>
<p><strong>Testamentum</strong> je jednostrani pravni posao mortis causa kojim ostavitelj određuje nasljednika svoje imovine; po rimskom pravu izrazito formalistički posao iuris civilis i odraz slobodne volje koju ostavitelj do smrti može mijenjati. Bitni sadržaj je <strong>heredis institutio</strong> – imenovanje jednog ili više nasljednika, na koje prelaze sva nasljediva prava i obveze (univerzalni sukcesori). Klasično pravo ne priznaje nasljednopravne ugovore (ništavi su ugovori o tome da će suugovarač biti nasljednik ili da će se napraviti ili opozvati oporuka određenog sadržaja) – radi zaštite slobode oporučivanja.</p>
<h4>Bitni zahtjevi</h4>
<ul>
<li><strong>Institutio heredis</strong> – „glava i temelj oporuke“; bez nje nema oporuke; u klasici mora stajati na početku, latinskim (kasnije i grčkim) riječima s riječju <em>heres</em>; ono što stoji ispred imenovanja (npr. legat) nevaljano je.</li>
<li><strong>Persona certa</strong> – nasljednik mora biti određena osoba; može i nasciturus (postumi začeti u času oporuke – <em>iam concepti</em>) pod uvjetom da se rodi živ. Pravna osoba je <strong>persona incerta</strong> (članstvo se stalno mijenja) i ne može biti nasljednik; iznimno senatusconsultum dopušta da oslobođenici za nasljednika postave svoju gradsku općinu.</li>
</ul>

<h3>Oblici oporuke</h3>
<table>
<tr><th>Razdoblje</th><th>Oblik</th><th>Obilježja</th></tr>
<tr><td>staro civilno pravo</td><td><strong>testamentum calatis comitiis</strong></td><td>redovni oblik pred kurijatskom skupštinom (sastaje se dvaput godišnje, saziva je i vodi pontifex maximus)</td></tr>
<tr><td>staro civilno pravo</td><td><strong>testamentum in procinctu</strong></td><td>izvanredni oblik u ratu – vojnik pred vojnim redom izjavi posljednju volju</td></tr>
<tr><td>klasično pravo</td><td><strong>testamentum per aes et libram – stariji tip</strong></td><td>ostavitelj mancipacijom prenosi ukupnu sadašnju i buduću imovinu na <em>familiae emptor</em> uz nalog kako je podijeliti nakon smrti; tobožnji kupac nije nasljednik i nema koristi; 5 svjedoka i libripens; odgovara vremenu kad otac dijeli imovinu djeci</td></tr>
<tr><td>klasično pravo</td><td><strong>testamentum per aes et libram – noviji tip</strong></td><td>obuhvaća familia i pecunia; familiae emptor i libripens postaju obični svjedoci (5 svjedoka + libripens + familiae emptor = 7); ostavitelj sam imenuje pravog nasljednika i javno izjavljuje (<strong>nuncupatio</strong>) da isprava u ruci sadrži njegovu volju; stari obred se samo oponaša</td></tr>
<tr><td>pretorsko pravo</td><td><strong>pretorska oporuka</strong></td><td>isprava zapečaćena pečatima <strong>sedmorice svjedoka</strong> bez mancipacije; daje bonorum possessio – sine re (ne uspijeva protiv civilnog zakonskog nasljednika) sve do <strong>Antonina Pija</strong>, koji štiti b. p. s <em>exceptio doli</em> – postaje <strong>cum re</strong></td></tr>
<tr><td>posebno</td><td><strong>vojnička oporuka</strong></td><td>bez ikakvih formalnosti; gubi snagu godinu dana nakon časnog otpusta</td></tr>
</table>
<p><strong>Postklasika:</strong> imenovanje nasljednika nije više vezano za formu (važna je samo volja); priznaju se vlastoručne oporuke i bez svjedoka, <strong>usmene oporuke</strong> pred sedam svjedoka pozvanih zajedno, javne oporuke, pisane oporuke s <strong>potpisima</strong> svjedoka; <em>testamentum parentum inter liberos</em> (i bez potpisa, kad se radi o djeci) i <em>divisio inter liberos</em> (dioba za života). <strong>Justinijan:</strong> imenovanje nasljednika ne mora biti na početku – oporuka se približava srednjovjekovnom pojmu razdiobe imovine mortis causa.</p>

<h3>Supstitucija (zamjena nasljednika)</h3>
<p>Imenovanje nasljednika pod suspenzivnim uvjetom: supstitut se poziva ako <em>heres institutus</em> ne prihvati ostavinu. Svrha: da pitanje nasljeđivanja ne ostane dugo neizvjesno (supstitucija posredno tjera nasljednika da se brzo izjasni).</p>
<ul>
<li><strong>Substitutio vulgaris</strong> – zamjenski nasljednik (<em>heres substitutus</em>) za slučaj da prvoimenovani iz bilo kojeg razloga ne postane nasljednik.</li>
<li><strong>Substitutio pupillaris</strong> – otac na temelju očinske vlasti određuje nasljednika nedoraslom djetetu u vlasti za slučaj da umre prije doraslosti; u klasici je supstitut nasljednik djeteta, u postklasici i oca. Obje supstitucije mogle su se spojiti u istoj oporuci.</li>
<li><strong>Substitutio quasi pupillaris</strong> (Justinijan) – supstitut za punoljetnog, ali duševno bolesnog descendenta koji ne može oporučiti; može je odrediti svaki predak, pa i majka.</li>
</ul>

<h3>Formalno nužno nasljedno pravo: praeteritio i exheredatio</h3>
<p>Ako ostavitelj svoje <strong>sui</strong> nije imenovao nasljednicima ni isključio (<em>exheredare</em>), nego ih je mimoišao (<em>praeteritio</em>):</p>
<ul>
<li><strong>sin u vlasti</strong> nije imenovan ni <strong>poimenično (nominatim)</strong> isključen – oporuka je po civilnom pravu <strong>nevaljana</strong>, nastupa zakonsko nasljeđivanje;</li>
<li><strong>kći ili unuk</strong> u vlasti nisu imenovani ni isključeni barem općom klauzulom <em>ceteri omnes exheredes sunto</em> („svi ostali neka budu isključeni“) – oporuka je <strong>valjana</strong>, ali mimoiđeni dobivaju svoj neoporučni dio (uz imenovanog suusa), odnosno <strong>polovicu</strong> nasljedstva (uz imenovanog extraneusa);</li>
<li>po <strong>pretorskom</strong> pravu mimoiđenim liberi (i emancipiranima) pretor daje bonorum possessio.</li>
</ul>

<h3>Materijalno nužno nasljedno pravo</h3>
<p>Potkraj republike, u praksi <strong>centumvirskog suda</strong> (nadležan za nasljedne sporove), oporuka kojom se ostavitelj nije dovoljno sjetio djece smatra se protivnom moralu – <strong>testamentum inofficiosum</strong>. Oštećeno dijete podiže <strong>querella inofficiosi testamenti</strong>:</p>
<ul>
<li>isključena je ako je dijete dobilo barem <strong>1/4 neoporučnog dijela</strong>;</li>
<li>ako je ostavio manje ili ništa zbog <strong>opravdanog razloga</strong> (sud slobodno ocjenjuje), tužba ne uspijeva;</li>
<li>ako je ostavio manje od 1/4 bez razloga, sud dodjeljuje <strong>puni neoporučni dio</strong> (u postklasici samo nadopunu do 1/4).</li>
</ul>
<p><strong>Justinijan</strong> (Novele 18 i 115): nužni dio do četvero djece <strong>1/3</strong>, preko četvero <strong>1/2</strong> neoporučnog dijela; tko je dobio barem nešto, ima pravo na nadopunu (<em>actio ad supplendam legitimam, actio suppletoria</em>); ako je dijete mimoiđeno bez opravdanog razloga, oporuka je nevaljana u imenovanju nasljednika, a ostale odredbe (zapisi, oslobađanja) ostaju. Oporučitelj mora navesti razlog isključenja iz zakonom nabrojenih razloga nezahvalnosti (npr. podizanje ruke na roditelje, teška uvreda, kaznena tužba protiv roditelja, pokušaj otrovanja), a oporučni nasljednik ga mora dokazati.</p>`
    }
  },

  stjecanjeNasljedstva: {
    id: "9tbzm7",
    name: "Stjecanje nasljedstva i zaštita nasljednika",
    icon: "fa-hand-holding",
    color: "#06b6d4",
    flashcards: [
      { id: "1y8ugo", question: "Heredes necessarii (sui et necessarii)", answer: "Sui heredes stječu nasljedstvo ipso iure u času ostaviteljeve smrti, mimo i protiv svoje volje – ne mogu ga odbiti.", explanation: "Nužni nasljednik je i rob oslobođen i postavljen oporukom." },
      { id: "znsv3j", question: "Servus cum libertate heres institutus", answer: "Rob kojeg je gospodar oporukom oslobodio i postavio za nasljednika – heres necessarius koji ne može odbiti nasljedstvo (obično da na njega padne sramota stečaja).", explanation: "Nema beneficium abstinendi." },
      { id: "b4dvl8", question: "Heredes voluntarii (extranei)", answer: "Ostali nasljednici: stječu nasljedstvo tek prihvatom; razlikuje se pripad (delatio) od prihvata (aditio).", explanation: "Npr. adgnatus proximus, oporučni extranei." },
      { id: "dk8348", question: "Delatio i aditio", answer: "Delatio (pripad) nastupa smrću ostavitelja – nasljednik stječe pravo prihvatiti ili odbiti. Aditio (acquisitio hereditatis) je prihvat kojim postaje nasljednik.", explanation: "Između njih – hereditas iacens." },
      { id: "okgbcm", question: "Cretio", answer: "Formalni prihvat: svečana izjava pred svjedocima u roku koji je odredio oporučitelj (obično 100 dana); propuštanjem roka gubi se nasljedstvo.", explanation: "Samo ako ju je oporučitelj odredio." },
      { id: "fog1a4", question: "Pro herede gestio", answer: "Neformalni prihvat nasljedstva – bilo kakvim očitovanjem volje ili ponašanjem iz kojeg se zaključuje volja za prihvatom (konkludentne radnje).", explanation: "Pretor može na zahtjev vjerovnika dati spatium deliberandi." },
      { id: "th7j3z", question: "Hereditas iacens", answer: "„Ležeća ostavina“ između pripada i prihvata – ne pripada ni umrlom ni nasljedniku; shvaća se kao imovina bez gospodara ili poseban subjekt.", explanation: "U klasici nije razvijena ustanova." },
      { id: "zfboza", question: "Ius adcrescendi", answer: "Pravo priraštaja (klasika): ako sunasljednik umre ili ne prihvati, njegov dio prirasta ostalim sunasljednicima, jer se delacija ne prenosi na njegove nasljednike („horizontala“).", explanation: "Nastupa ipso iure." },
      { id: "yoenfk", question: "Transmissio Iustiniana", answer: "Justinijan: nasljednik koji umre prije prihvata prenosi pravo prihvata na svog nasljednika, koji mora prihvatiti u roku od godine dana („vertikala“).", explanation: "U klasici delacija nije prenosiva." },
      { id: "8j06u9", question: "Beneficium abstinendi", answer: "Pretorova povlastica sui heredes (kasnije i oporučnim) da se uzdrže od nasljedstva ako se ne miješaju u ostavinu; vjerovnici tada nemaju tužbu protiv njih.", explanation: "Ne vrijedi za oslobođenog roba-nasljednika." },
      { id: "57bthh", question: "Beneficium separationis", answer: "Ostaviteljevi vjerovnici mogu u roku od 5 godina tražiti od pretora odvajanje ostavine od nasljednikove imovine i imaju prednost pred nasljednikovim vjerovnicima.", explanation: "Štiti interes ostaviteljevih vjerovnika." },
      { id: "rrmgjh", question: "Beneficium inventarii", answer: "Justinijan: nasljednik ograničava odgovornost za dugove na vrijednost ostavine ako u roku od 30 dana od otvaranja oporuke započne popis i dovrši ga u daljnjih 60 dana.", explanation: "Nasljeđivanje postaje imovinsko pravo, ne dužnost." },
      { id: "bxeeae", question: "Odgovornost heresa za dugove", answer: "Civilni nasljednik odgovara za sve dugove ostavitelja, i iznad vrijednosti ostavine (neograničeno).", explanation: "Zato pretorova i Justinijanova beneficia." },
      { id: "keeyjd", question: "Restitutio in integrum kod prezaduženog nasljedstva", answer: "Heres voluntarius koji tek naknadno utvrdi prezaduženost može tražiti povrat u prijašnje stanje – prvenstveno maloljetnici do 25, ostali iznimno.", explanation: "Pretorsko sredstvo." },
      { id: "r5mhyl", question: "Hereditatis petitio", answer: "Tužba civilnog nasljednika (heresa) protiv osobe koja posjeduje ostavinu i poriče mu svojstvo nasljednika.", explanation: "Uz sve tužbe koje je imao ostavitelj." },
      { id: "boc6ep", question: "Interdictum quorum bonorum", answer: "Interdiktna zaštita pretorskog nasljednika (bonorum possessora) za stjecanje posjeda ostavinskih stvari.", explanation: "Pretorska zaštita." },
      { id: "5f50h1", question: "Actio familiae erciscundae", answer: "Tužba sunasljednika za razvrgnuće zajednice (suvlasništva) nad naslijeđenom ostavinom.", explanation: "Sudac ima adiudicatio." }
    ],
    quiz: [
      { id: "4l6ewv", question: "Je li se u klasičnom pravu mogla prenijeti delatio na nasljednikove nasljednike?", options: ["da, uvijek i bez roka", "ne – dio prirasta sunasljednicima", "da, uz prihvat u roku od godine", "samo kod sui heredes"], correct: 1 },
      { id: "rpye9z", question: "Transmissio Iustiniana znači da nasljednik koji umre prije prihvata:", options: ["gubi pravo, a dio prirasta drugima", "prenosi pravo prihvata na svog nasljednika", "postaje heres necessarius", "ostavinu prepušta fiscusu"], correct: 1 },
      { id: "m7kodq", question: "Nasljednici koji ne mogu odbiti nasljedstvo zovu se:", options: ["heredes voluntarii", "heredes extranei", "heredes necessarii", "bonorum possessores"], correct: 2 },
      { id: "hrpja4", question: "Formalni prihvat nasljedstva u roku koji odredi oporučitelj zove se:", options: ["pro herede gestio", "cretio", "aditio tacita", "delatio"], correct: 1 },
      { id: "yg4ie7", question: "Ostavina između pripada i prihvata zove se:", options: ["bona vacantia", "hereditas iacens", "peculium", "pecunia"], correct: 1 },
      { id: "6ovpco", question: "Rok za beneficium separationis iznosio je:", options: ["30 dana", "100 dana", "5 godina", "1 godinu"], correct: 2 },
      { id: "awtq5c", question: "Beneficium inventarii uveo je:", options: ["pretor", "Hadrijan", "Konstantin", "Justinijan"], correct: 3 },
      { id: "k0ojkp", question: "Beneficium abstinendi nije vrijedio za:", options: ["sina u vlasti ostavitelja", "unuka u vlasti ostavitelja", "oslobođenog roba-nasljednika", "ženu in manu ostavitelja"], correct: 2 },
      { id: "2rl1zs", question: "Tužba civilnog nasljednika protiv posjednika ostavine koji mu osporava svojstvo nasljednika jest:", options: ["hereditatis petitio", "rei vindicatio", "actio familiae erciscundae", "actio Publiciana"], correct: 0 },
      { id: "kvum9m", question: "Interdiktnu zaštitu pretorskog nasljednika daje:", options: ["interdictum uti possidetis", "interdictum quorum bonorum", "interdictum de vi", "interdictum Salvianum"], correct: 1 },
      { id: "7zaq38", question: "Razvrgnuće zajednice među sunasljednicima postiže se tužbom:", options: ["actio communi dividundo", "actio finium regundorum", "actio familiae erciscundae", "actio pro socio"], correct: 2 },
      { id: "xah1ss", question: "Ius adcrescendi nastupa:", options: ["ipso iure", "samo uz pristanak pretora", "samo kod oporuke", "nakon godine dana"], correct: 0 },
      { id: "86v4nj", question: "Rok za početak popisa ostavine kod beneficium inventarii iznosi:", options: ["60 dana od smrti ostavitelja", "30 dana od otvaranja oporuke", "100 dana od delacije nasljedstva", "godinu dana od smrti"], correct: 1 },
      { id: "vtewsx", question: "Civilni nasljednik za dugove ostavitelja odgovara:", options: ["samo do vrijednosti ostavine", "samo do polovice ostavine", "neograničeno, i iznad ostavine", "uopće ne odgovara"], correct: 2 },
      { id: "2tdw19", question: "Neformalni prihvat nasljedstva konkludentnim radnjama zove se:", options: ["cretio", "pro herede gestio", "aditio sollemnis", "spatium deliberandi"], correct: 1 },
      { id: "uivvwo", question: "Restitutio in integrum zbog prezaduženog nasljedstva davala se prvenstveno:", options: ["maloljetnicima do 25", "oslobođenim robovima", "ostaviteljevim vjerovnicima", "gentilima i agnatima"], correct: 0 },
      { id: "vif3o6", question: "Delatio nastupa u pravilu:", options: ["prihvatom nasljedstva", "smrću ostavitelja", "otvaranjem oporuke", "presudom"], correct: 1 }
    ],
    fillBlanks: [],
    learn: {
      id: "ilzqas",
      title: "Stjecanje nasljedstva, beneficia i zaštita nasljednika",
      content: `<h3>Heredes necessarii</h3>
<p><strong>Sui heredes</strong> (prvi red civilnog prava) stječu nasljedstvo <strong>ipso iure</strong> u času ostaviteljeve smrti (iznimno kasnije), mimo pa i protiv svoje volje – zato se zovu <strong>sui et necessarii</strong> („svoji“ i „nužni“). Nužni nasljednik je i rob kojeg je gospodar oporukom oslobodio i postavio za nasljednika (<strong>servus cum libertate heres institutus</strong>) – obično zato da na njega, a ne na ostavitelja, padne sramota stečaja (<em>venditio bonorum</em>); ne može odbiti nasljedstvo.</p>

<h3>Heredes voluntarii (extranei)</h3>
<p>Ostali civilni nasljednici stječu nasljedstvo posebnim aktom – prihvatom. Razlikuje se:</p>
<ol>
<li><strong>Delatio</strong> (pripad) – nastupa u pravilu smrću ostavitelja; nasljednik stječe pravo prihvatiti ili odbiti.</li>
<li><strong>Aditio / acquisitio hereditatis</strong> (prihvat):
<ul>
<li><strong>cretio</strong> – formalni prihvat: izjava određenom formulom pred svjedocima da ga je ostavitelj postavio i da prihvaća; dolazi u obzir samo ako ju je ostavitelj odredio s rokom (obično <strong>100 dana</strong>) – propuštanjem gubi nasljedstvo;</li>
<li><strong>pro herede gestio</strong> – neformalni prihvat: izjava na bilo koji način ili ponašanje kao nasljednik (konkludentne radnje).</li>
</ul></li>
</ol>
<p>Civilno pravo ne propisuje rok za prihvat; pretor na zahtjev vjerovnika određuje <strong>spatium deliberandi</strong> (rok za razmišljanje).</p>
<p><strong>Hereditas iacens</strong> („ležeća ostavina“) – u vremenu između pripada i prihvata ostavina više ne pripada ostavitelju, a još ne pripada nasljedniku; izvori je opisuju kao imovinu bez gospodara (<em>res nullius, sine domino</em>) ili poseban pravni subjekt. U klasici ustanova nije razvijena: jedni smatraju da prihvat djeluje unatrag do smrti, drugi da ostavina predstavlja ostavitelja.</p>

<h3>Priraštaj i transmisija</h3>
<table>
<tr><th>Ius adcrescendi (klasika)</th><th>Transmissio Iustiniana</th></tr>
<tr><td>Ako je bilo više heredes voluntarii i jedan umre ne prihvativši nasljedstvo (ili ga ne prihvati), njegov dio <strong>prirasta</strong> dijelovima ostalih sunasljednika (ipso iure), jer prijenos delacije na nasljednike pozvanoga po klasičnom pravu nije dopušten – „horizontala“.</td><td>Justinijan iznimke postklasike pretvara u opće načelo: svaki oporučni i neoporučni nasljednik koji umre prije prihvata <strong>prenosi pravo prihvata na svog nasljednika</strong>, koji mora prihvatiti u roku od <strong>godine dana</strong> – „vertikala“.</td></tr>
</table>

<h3>Beneficia</h3>
<p>Civilni nasljednik (heres) odgovara za sve dugove ostavitelja, <strong>i iznad vrijednosti ostavine</strong>; odgovornost se u klasici nije mogla ograničiti. Zato:</p>
<ul>
<li><strong>Beneficium abstinendi</strong> (pretor, kasna republika) – sui et necessarii heredes smiju se uzdržati od nasljedstva ako se ne miješaju u korištenje i upravu ostavinskih stvari (tipično kod prezadužene ostavine); suus civilno ostaje heres, ali pretor vjerovnicima ne daje tužbu protiv njega (prodaju se ostaviteljeva dobra). Kasnije i oporučnim nasljednicima. <strong>Ne vrijedi za roba-nasljednika</strong>, ali ga pretor štiti glede imovine stečene nakon oslobođenja ako se nije miješao u ostavinu.</li>
<li><strong>Restitutio in integrum</strong> – heres voluntarius koji tek naknadno utvrdi prezaduženost traži povrat u prijašnje stanje; prvenstveno maloljetnici do 25, ostali iznimno.</li>
<li><strong>Beneficium separationis</strong> (pretor) – u interesu ostaviteljevih vjerovnika (i legatara): u roku od <strong>5 godina</strong> mogu tražiti odvajanje ostavine od nasljednikove imovine i imaju prednost pred nasljednikovim vjerovnicima glede odvojene imovine.</li>
<li><strong>Beneficium inventarii</strong> (Justinijan) – u interesu nasljednika: odgovornost za dugove ograničena je na <strong>vrijednost ostavine</strong>, ako u roku od <strong>30 dana</strong> od otvaranja oporuke započne popis i dovrši ga u daljnjih <strong>60 dana</strong>. Time nasljeđivanje prestaje biti čast i dužnost prema pokojniku i općini, a postaje subjektivno imovinsko pravo nasljednika.</li>
</ul>

<h3>Zaštita nasljednika</h3>
<p>Nasljednik može podići sve tužbe koje je ostavitelj imao radi zaštite imovine, a uz to:</p>
<ul>
<li><strong>hereditatis petitio</strong> – tužba heresa protiv osobe koja posjeduje ostavinu i poriče mu svojstvo nasljednika;</li>
<li><strong>interdictum quorum bonorum</strong> – posjedovna (interdiktna) zaštita bonorum possessora;</li>
<li><strong>actio familiae erciscundae</strong> – tužba sunasljednika za razvrgnuće suvlasništva nad ostavinom (sudac ima ovlast adiudicatio).</li>
</ul>`
    }
  },

  legatFideikomis: {
    id: "m1l9vp",
    name: "Legat, fideikomis i darovanje za slučaj smrti",
    icon: "fa-gift",
    color: "#a855f7",
    flashcards: [
      { id: "y7klls", question: "Legatum", answer: "Zapis civilnog prava: ostaviteljeva namjena imovinske koristi nekoj osobi (legatarius) na teret nasljednika, naređena svečanim riječima u oporuci.", explanation: "Formalni oblik singularne sukcesije mortis causa." },
      { id: "uouice", question: "Oneratus i honoratus", answer: "Oneratus – opterećena osoba (kod legata nasljednik). Honoratus – osoba u čiju je korist zapis (legatar, fideikomisar).", explanation: "Zapis opterećuje nasljednopravnog ovlaštenika." },
      { id: "eckoqa", question: "Legatum per vindicationem", answer: "Naređen riječima „do lego“: vlasništvo stvari prelazi neposredno na legatara, koji je traži stvarnopravnom tužbom (rei vindicatio).", explanation: "Stvarnopravni učinak." },
      { id: "tg75hg", question: "Legatum per damnationem", answer: "Naređen riječima „heres damnas esto“: nastaje obvezni odnos – nasljednik je dužnik, legatar vjerovnik s osobnom tužbom.", explanation: "Obveznopravni učinak." },
      { id: "hf3y5s", question: "Legatum sinendi modo", answer: "Legatar smije uzeti određenu stvar iz ostavine, a nasljednik je obvezan da mu u tome ne smeta.", explanation: "Manje važan oblik." },
      { id: "avt8i3", question: "SC Neronianum", answer: "Na temelju njega svaki legat koji zbog oblika ne može vrijediti vrijedi kao legatum per damnationem.", explanation: "Razlike među legatima time slabe." },
      { id: "qzvopg", question: "Lex Falcidia (40. pr. Kr.)", answer: "Nasljedniku mora ostati barem čista četvrtina ostavine (quarta Falcidia); legati koji prelaze 3/4 ipso iure se razmjerno smanjuju.", explanation: "Da nasljednik ne odbije preopterećeno nasljedstvo." },
      { id: "mb89sa", question: "Fideicommissum", answer: "Neformalni zapis – molba (ne civilne riječi) kojom se opterećuje nasljednik, legatar ili obdareni za slučaj smrti u korist fideikomisara; pravnu zaštitu dobiva za Augusta.", explanation: "Fideikomisar mora biti živ u času ostaviteljeve smrti." },
      { id: "eo06lt", question: "Fiduciarius i fideicommissarius", answer: "Fiducijar – osoba kojoj je upućena molba (opterećeni). Fideikomisar – osoba kojoj je namijenjena korist.", explanation: "Fideicommissum hereditatis: izručenje cijelog ili dijela nasljedstva." },
      { id: "ic7ot0", question: "SC Pegasianum", answer: "Proširio je pravilo Lex Falcidia (quarta) i na fideikomise, osobito fideicommissum hereditatis.", explanation: "Nasljedniku ostaje četvrtina." },
      { id: "tonbhp", question: "Dies cedens", answer: "Dan kada zapisovnik stječe pravo da stekne zapis – od Augusta dan službenog otvaranja oporuke.", explanation: "Kod legata i fideikomisa." },
      { id: "sztpho", question: "Dies veniens", answer: "Dan kada zapisovnik stječe sam zapis – dan kad opterećena osoba (nasljednik, kod fideikomisa i legatar) prihvati nasljedstvo.", explanation: "Dies cedens je dan kad zapisovnik stječe pravo na zapis (od Augusta dan otvaranja oporuke), a dies veniens dan kad zapis stvarno stječe." },
      { id: "9ie868", question: "Donatio mortis causa", answer: "Darovanje za slučaj smrti čiji učinak nastupa samo ako obdareni nadživi darovatelja; obično zbog smrtne opasnosti. Ugovor – traži suglasnost obiju strana.", explanation: "Od Septimija Severa podliježe quarta Falcidia." },
      { id: "y0zflf", question: "Dva oblika donatio mortis causa", answer: "Pod suspenzivnim uvjetom (učinak odgođen do smrti darovatelja) ili s odmah punim učinkom uz obvezu povrata ako opasnost prođe (rezolutivni uvjet).", explanation: "Preživjeli darovatelj stvar traži vlasničkom tužbom." },
      { id: "md1c87", question: "Obligatio ex legato", answer: "Obvezni odnos nasljednika i legatara: za određenu stvar actio certi ex testamento, za neodređenu actio incerti ex testamento.", explanation: "Kod legata per damnationem." }
    ],
    quiz: [
      { id: "9qyhs8", question: "Legat naređen riječima „heres damnas esto“ jest:", options: ["legatum per vindicationem", "legatum sinendi modo", "legatum per damnationem", "fideicommissum"], correct: 2 },
      { id: "dtj5tp", question: "Kod legatum per vindicationem legatar stvar traži:", options: ["osobnom tužbom protiv nasljednika", "rei vindicatio", "actio empti", "interdiktom quorum bonorum"], correct: 1 },
      { id: "t2li4h", question: "Fideikomis je:", options: ["neformalni zapis", "formalni zapis", "univerzalna sukcesija", "oblik oporuke"], correct: 0 },
      { id: "8azjh0", question: "Dies cedens kod legata od Augusta jest:", options: ["dan smrti legatara", "dan prihvata nasljedstva", "dan otvaranja oporuke", "dan isplate legata"], correct: 2 },
      { id: "cylvo5", question: "Dies veniens jest dan kada:", options: ["je oporuka službeno otvorena", "je ostavitelj umro", "je legatar podnio tužbu", "opterećeni prihvati nasljedstvo"], correct: 3 },
      { id: "550vge", question: "Po Lex Falcidia nasljedniku mora ostati:", options: ["polovica ostavine", "četvrtina ostavine", "trećina ostavine", "šestina ostavine"], correct: 1 },
      { id: "xhlva1", question: "Pravilo Lex Falcidia na fideikomise je proširio:", options: ["SC Pegasianum", "SC Neronianum", "SC Tertullianum", "SC Macedonianum"], correct: 0 },
      { id: "g7pypw", question: "Fideikomisar je osoba:", options: ["kojoj je upućena molba", "kojoj je namijenjena korist", "koja sastavlja oporuku", "koja je svjedok"], correct: 1 },
      { id: "vkg3xk", question: "Donatio mortis causa proizvodi učinak samo ako:", options: ["darovatelj nadživi obdarenog", "je sastavljena oporuka", "obdareni nadživi darovatelja", "je predana pred svjedocima"], correct: 2 },
      { id: "hac6qu", question: "Legatar kod legatum sinendi modo ima pravo:", options: ["tražiti novac od nasljednika", "uzeti stvar, a nasljednik ne smeta", "postati sunasljednik", "naslijediti cijelu ostavinu"], correct: 1 },
      { id: "9htdp8", question: "Prema SC Neronianum legat neispravnog oblika vrijedi kao:", options: ["legatum per vindicationem", "fideicommissum", "legatum per damnationem", "donatio mortis causa"], correct: 2 },
      { id: "d0nqim", question: "Opterećena osoba kod zapisa zove se:", options: ["honoratus", "oneratus", "legatarius", "libripens"], correct: 1 },
      { id: "8g1bsy", question: "Fideikomis je pravnu zaštitu dobio u doba:", options: ["Zakonika XII ploča", "Augusta", "Dioklecijana", "Justinijana"], correct: 1 },
      { id: "s5aq18", question: "Quarta Falcidia kod donatio mortis causa primjenjuje se od cara:", options: ["Oktavijana Augusta", "Hadrijana", "Septimija Severa", "Konstantina Velikog"], correct: 2 },
      { id: "d4kzm7", question: "Tužba legatara za neodređenu stvar iz legata per damnationem jest:", options: ["actio certi ex testamento", "actio incerti ex testamento", "condictio indebiti", "actio ex stipulatu"], correct: 1 }
    ],
    fillBlanks: [],
    learn: {
      id: "hsvvm2",
      title: "Zapisi (legat i fideikomis) i darovanje za slučaj smrti",
      content: `<p>Klasično pravo poznaje dva tipa zapisa – namjene pojedinih imovinskih koristi na teret nasljednopravnog ovlaštenika (<strong>oneratus</strong>) u korist neke osobe (<strong>honoratus</strong>): legat i fideikomis. To je <strong>singularna sukcesija mortis causa</strong>.</p>
<h3>Legatum (legat)</h3>
<p>Formalni zapis civilnog prava: ostaviteljev dar (namjena imovinske koristi – predmet, tražbina) nekoj osobi (<strong>legatarius</strong>, zapisovnik) na teret nasljednika, naređen <strong>svečanim riječima</strong>; određuje se u oporuci.</p>
<table>
<tr><th>Vrsta</th><th>Riječi</th><th>Učinak</th></tr>
<tr><td><strong>legatum per vindicationem</strong></td><td>„do lego“</td><td>vlasništvo legirane stvari prelazi neposredno na legatara (po kviritskom pravu); traži je <strong>rei vindicatio</strong> – stvarnopravni učinak; služi i za osnivanje osobnih služnosti</td></tr>
<tr><td><strong>legatum per damnationem</strong></td><td>„heres damnas esto“</td><td>nastaje <strong>obvezni odnos</strong>: nasljednik je dužnik, legatar vjerovnik s osobnom tužbom (actio certi / incerti ex testamento)</td></tr>
<tr><td><strong>legatum sinendi modo</strong></td><td>–</td><td>legatar smije uzeti određenu stvar iz ostavine, a nasljednik mu ne smije smetati</td></tr>
</table>
<p>Razlike u formi i učinku nestaju kad je klasična jurisprudencija na temelju <strong>SC Neronianum</strong> zauzela stajalište da svaki legat koji zbog oblika ne može vrijediti vrijedi kao legatum per damnationem.</p>
<h4>Lex Falcidia (40. pr. Kr.)</h4>
<p>Zbog opasnosti da nasljednik odbije nasljedstvo preopterećeno legatima, nasljedniku mora ostati <strong>čista četvrtina ostavine</strong> (<strong>quarta Falcidia</strong>); na legate se smije rasporediti najviše 3/4, a prelaze li tu granicu u času smrti, <strong>ipso iure se razmjerno smanjuju</strong>. Lex Falcidia je fons iuris essendi.</p>

<h3>Fideicommissum (fideikomis)</h3>
<p><strong>Neformalni zapis</strong> – ono što se ostavlja <strong>molbom</strong>, a ne civilnim riječima, i daje se po volji ostavitelja. Njime se opterećuje nasljednik, legatar ili obdareni darovanjem za slučaj smrti (<strong>fiduciarius</strong> – osoba kojoj je molba upućena) u korist <strong>fideicommissarius</strong> (osobe kojoj je korist namijenjena). Razvio se u doba carstva; pravnu zaštitu dobiva <strong>za Augusta</strong>. <strong>SC Pegasianum</strong> proširuje Lex Falcidia na fideikomise, osobito na <em>fideicommissum hereditatis</em> (nasljedniku se nalaže da cijelo nasljedstvo ili dio izruči trećem). Fideikomisar je morao biti <strong>živ u času ostaviteljeve smrti</strong> – time se izbjeglo vezivanje imovine kroz dulja razdoblja. Fideikomisom se mogla izvršiti i manumisija (manumissio fideicommissaria). Razlika legata i fideikomisa postoji i u postklasici.</p>

<h3>Dies cedens i dies veniens</h3>
<ul>
<li><strong>Dies cedens</strong> – dan kada zapisovnik stječe <em>pravo da stekne</em> zapis; od Augusta <strong>dan službenog otvaranja oporuke</strong>.</li>
<li><strong>Dies veniens</strong> – dan kada zapisovnik <em>stječe</em> zapis; dan kada opterećena osoba (kod legata nasljednik, kod fideikomisa nasljednik, legatar ili obdareni) <strong>prihvati nasljedstvo</strong>.</li>
</ul>

<h3>Donatio mortis causa – darovanje za slučaj smrti</h3>
<p>U klasici dar čiji učinak nastupa samo ako <strong>obdareni nadživi darovatelja</strong>; obično zbog postojeće ili predvidive opasnosti za život darovatelja (npr. polazak u rat). Može biti učinjeno:</p>
<ul>
<li>pod <strong>suspenzivnim uvjetom</strong> („ako obdareni preživi darovatelja“) – učinak je odgođen;</li>
<li>s <strong>odmah punim učinkom</strong> – darovatelj odmah prenosi npr. vlasništvo, a obdareni se obvezuje vratiti stvar ako smrtna opasnost otpadne (rezolutivni uvjet: „dajem ti jer idem u rat; ako preživim, vraćaš“). Darovatelj koji preživi može stvar tražiti vlasničkom tužbom.</li>
</ul>
<p>Riječ je o <strong>ugovornom odnosu</strong> – potrebna je suglasnost darovatelja i obdarenika. Od cara <strong>Septimija Severa</strong> (193.–211.) quarta Falcidia primjenjuje se u korist nasljednika i kod darovanja za slučaj smrti. Donatio mortis causa ostaje na klasičnim osnovama dok se u postklasici ne spoji s darovanjem i oporukom.</p>`
    }
  }
};

if (typeof window !== 'undefined') { window.rppPfriM1 = rppPfriM1; }
if (typeof module !== 'undefined' && module.exports) { module.exports = rppPfriM1; }
