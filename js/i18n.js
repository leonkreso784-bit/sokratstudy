// ===== Sokrat Study — UI i18n (HRV program; vidi docs/archive/HRV_PLAN.md, Cigla 5) =====
// Lagani rječnik SUČELJA (NE sadržaja — sadržaj je već jednojezičan po datoteci/programu).
// Jezik se bira po AKTIVNOM PROGRAMU: predmet iz "hospitality-management-hr" → 'hr', inače 'en'.
//
// Korištenje:
//   - statički HTML: <span data-i18n="nav.flashcards">Flashcards</span>  → applyTranslations() postavi tekst
//   - iz JS-a: t('quiz.correct')  → vrati string na trenutnom jeziku (fallback en → ključ)
//   - prebacivanje: setUiLang('hr'|'en') ili setUiLangForSubject(subjectId)
//
// Engine sadržaja se NE dira. Default je 'en' → EN iskustvo nepromijenjeno.

(function () {
  'use strict';

  // ---- Rječnik (en je izvor; hr je prijevod). Ključevi su točkasti za grupiranje. ----
  /** @type {Record<string, { en: string, hr: string }>} */
  const DICT = {
    // Study navigacija (tabovi) + home kartice
    'nav.home': { en: 'Home', hr: 'Početna' },
    'nav.learn': { en: 'Learn', hr: 'Učenje' },
    'nav.flashcards': { en: 'Flashcards', hr: 'Kartice' },
    'nav.cards': { en: 'Cards', hr: 'Kartice' },
    'nav.quiz': { en: 'Quiz', hr: 'Kviz' },
    'nav.fill': { en: 'Fill', hr: 'Dopuni' },
    'nav.progress': { en: 'Progress', hr: 'Napredak' },
    'nav.map': { en: 'Map', hr: 'Karta' },
    'nav.exercises': { en: 'Exercises', hr: 'Vježbe' },

    // a11y imena skrolabilnih regija (MREŽA B3c) — čita ih čitač ekrana, ne ekran
    'a11y.formula': { en: 'Mathematical formula', hr: 'Matematička formula' },
    'a11y.table': { en: 'Table', hr: 'Tablica' },

    // Admin (F4 CRUD) — vidljivo samo adminu
    'admin.title': { en: 'Admin', hr: 'Admin' },
    'admin.openStudio': { en: 'Studio editor', hr: 'Studio editor' },

    // ⚠️ T6 · ČUVAR STRANICE EDITORA. Editor od T6 ima pravu adresu, pa mora umjeti
    // REĆI zašto nekoga ne pušta — a to je prvi tekst koji posjetitelj ondje vidi.
    // Dvojezično od prvog retka: T4 je pokazao da je zakucani engleski dug koji se
    // plaća kasnije, i to na najgoroj mogućoj površini (ondje pravnoj, ovdje na vratima).
    'editor.checking': { en: 'Checking your access…', hr: 'Provjeravam pristup…' },
    'editor.backToMaterials': { en: 'Back to my materials', hr: 'Natrag na moje materijale' },
    'editor.signInFirst': { en: 'Sign in to edit your material.', hr: 'Za uređivanje se treba prijaviti.' },
    'editor.notYours': { en: "This material isn't available.", hr: 'Ovaj materijal nije dostupan.' },
    'editor.loadFail': { en: "The material couldn't be loaded.", hr: 'Materijal se nije mogao učitati.' },
    'editor.adminOnly': { en: 'Editing the catalogue is for administrators.', hr: 'Uređivanje kataloga je samo za administratora.' },
    'editor.noAuth': { en: 'Sign-in is unavailable right now.', hr: 'Prijava trenutno nije dostupna.' },
    'admin.desc': { en: 'Edit study content directly. Every change is versioned and can be undone.', hr: 'Uređuj sadržaj izravno. Svaka izmjena se verzionira i može se poništiti.' },
    'admin.editContent': { en: 'Edit content', hr: 'Uredi sadržaj' },
    'admin.comingSoon': { en: 'Content editor — coming in the next step.', hr: 'Uređivač sadržaja — stiže u sljedećem koraku.' },
    'admin.viewerNote': { en: 'Edit flashcards, quiz, fill-in-the-blank and learn content inline. Every change is versioned and can be undone.', hr: 'Uredi kartice, kviz, dopune i sadržaj učenja izravno. Svaka izmjena se verzionira i može poništiti.' },
    'admin.subject': { en: 'Subject', hr: 'Predmet' },
    'admin.lesson': { en: 'Lesson', hr: 'Lekcija' },
    'admin.selectSubject': { en: '— select subject —', hr: '— odaberi predmet —' },
    'admin.selectLesson': { en: '— select lesson —', hr: '— odaberi lekciju —' },
    'admin.loading': { en: 'Loading…', hr: 'Učitavanje…' },
    'admin.loadFail': { en: 'Could not load content.', hr: 'Nije moguće učitati sadržaj.' },
    'admin.noCards': { en: 'No flashcards in this lesson.', hr: 'Nema kartica u ovoj lekciji.' },
    'admin.edit': { en: 'Edit', hr: 'Uredi' },
    'admin.editCard': { en: 'Edit flashcard', hr: 'Uredi karticu' },
    'admin.addCard': { en: 'Add flashcard', hr: 'Dodaj karticu' },
    'admin.addCardBtn': { en: 'Add flashcard', hr: 'Dodaj karticu' },
    'admin.addQuiz': { en: 'Add quiz question', hr: 'Dodaj kviz pitanje' },
    'admin.addQuizBtn': { en: 'Add quiz question', hr: 'Dodaj kviz pitanje' },
    'admin.addFill': { en: 'Add fill-in-the-blank', hr: 'Dodaj nadopunjavanje' },
    'admin.addFillBtn': { en: 'Add fill-in-the-blank', hr: 'Dodaj nadopunjavanje' },
    // U6d — kategorije-UI (dodaj/uredi kategoriju)
    'admin.addCategory': { en: 'Add category', hr: 'Dodaj kategoriju' },
    'admin.addCategoryBtn': { en: 'Add category', hr: 'Dodaj kategoriju' },
    'admin.editCategory': { en: 'Edit category', hr: 'Uredi kategoriju' },
    'admin.catName': { en: 'Name', hr: 'Naziv' },
    'admin.catIcon': { en: 'Icon (FontAwesome class)', hr: 'Ikona (FontAwesome klasa)' },
    'admin.catColor': { en: 'Color', hr: 'Boja' },
    'admin.catNameErr': { en: 'Category name must not be empty.', hr: 'Naziv kategorije ne smije biti prazan.' },
    'admin.moveUp': { en: 'Move up', hr: 'Pomakni gore' },
    'admin.moveDown': { en: 'Move down', hr: 'Pomakni dolje' },
    'admin.removeCategory': { en: 'Remove category', hr: 'Obriši kategoriju' },
    'admin.removeCatTitle': { en: 'Remove category?', hr: 'Obrisati kategoriju?' },
    'admin.removeCatMsg': { en: 'This category and all its cards/quiz will be removed from the draft. You can restore it by discarding the draft.', hr: 'Ova kategorija i sve njezine kartice/kviz bit će uklonjeni iz drafta. Možeš ih vratiti odbacivanjem drafta.' },
    'admin.remove': { en: 'Remove', hr: 'Obriši' },
    'admin.removeItem': { en: 'Remove', hr: 'Obriši' },
    'admin.removeItemTitle': { en: 'Remove item?', hr: 'Obrisati stavku?' },
    'admin.removeItemMsg': { en: 'This item will be removed from the draft. You can restore it by discarding the draft.', hr: 'Ova stavka bit će uklonjena iz drafta. Možeš je vratiti odbacivanjem drafta.' },
    'admin.question': { en: 'Question', hr: 'Pitanje' },
    'admin.answer': { en: 'Answer', hr: 'Odgovor' },
    'admin.save': { en: 'Save', hr: 'Spremi' },
    'admin.saving': { en: 'Saving…', hr: 'Spremanje…' },
    'admin.saveOk': { en: 'Flashcard saved.', hr: 'Kartica spremljena.' },
    'admin.saveErr': { en: 'Could not save.', hr: 'Spremanje nije uspjelo.' },
    'admin.emptyErr': { en: 'Question and answer must not be empty.', hr: 'Pitanje i odgovor ne smiju biti prazni.' },
    // M5a — mjera duljine kartice ({max} popunjava SokratCardLimits.HARD, da broj ne živi u dvije kopije)
    'admin.tooLongErr': {
      en: 'Too long — a flashcard holds at most {max} characters. Move the detail into Learn.',
      hr: 'Predugo — kartica prima najviše {max} znakova. Detalj prebaci u Učenje.'
    },
    'admin.notInDb': { en: 'This subject is not in the database yet.', hr: 'Ovaj predmet još nije u bazi.' },
    // U3 — draft-mod (uredi → radna kopija → Objavi/Odbaci)
    'admin.editLesson': { en: 'Edit lesson', hr: 'Uredi lekciju' },
    'admin.resumeEditing': { en: 'Resume editing', hr: 'Nastavi uređivanje' },
    'admin.draftOn': { en: 'Editing draft — changes stay local until you publish.', hr: 'Uređuješ draft — promjene su lokalne dok ne objaviš.' },
    'admin.draftNote': { en: 'edits the draft — publish to save (final syncs on publish).', hr: 'uređuje draft — objavi za spremanje (finalni se sinka pri objavi).' },
    'admin.draftSaved': { en: 'Saved to draft.', hr: 'Spremljeno u draft.' },
    'admin.draftRestored': { en: 'Unsaved draft restored.', hr: 'Vraćen nespremljeni draft.' },
    'admin.publish': { en: 'Publish', hr: 'Objavi' },
    'admin.publishOk': { en: 'Published.', hr: 'Objavljeno.' },
    'admin.publishErr': { en: 'Publish failed.', hr: 'Objava nije uspjela.' },
    // U4 — publish-RPC (base_version optimistic concurrency)
    'admin.publishConflict': { en: 'This lesson was changed elsewhere in the meantime — reopen it and repeat the edit.', hr: 'Netko je u međuvremenu promijenio ovu lekciju — ponovno je otvori i ponovi izmjenu.' },
    'admin.discard': { en: 'Discard', hr: 'Odbaci' },
    'admin.discardTitle': { en: 'Discard changes?', hr: 'Odbaciti promjene?' },
    'admin.discardMsg': { en: 'All unpublished changes to this lesson will be lost.', hr: 'Sve neobjavljene promjene ove lekcije bit će izgubljene.' },
    // F4.4 — quiz editing
    'admin.flashcards': { en: 'Flashcards', hr: 'Kartice' },
    'admin.quiz': { en: 'Quiz', hr: 'Kviz' },
    'admin.noContent': { en: 'No flashcards or quiz in this lesson.', hr: 'Nema kartica ni kviza u ovoj lekciji.' },
    'admin.editQuiz': { en: 'Edit quiz question', hr: 'Uredi kviz pitanje' },
    'admin.options': { en: 'Options (pick the correct one)', hr: 'Odgovori (odaberi točan)' },
    'admin.addOption': { en: 'Add option', hr: 'Dodaj odgovor' },
    'admin.removeOption': { en: 'Remove option', hr: 'Ukloni odgovor' },
    'admin.correct': { en: 'Correct', hr: 'Točan' },
    'admin.quizSaveOk': { en: 'Quiz question saved.', hr: 'Kviz pitanje spremljeno.' },
    'admin.quizEmptyErr': { en: 'Question and all options must not be empty.', hr: 'Pitanje i svi odgovori ne smiju biti prazni.' },
    'admin.quizCountErr': { en: 'A question needs 2–6 options.', hr: 'Pitanje treba 2–6 odgovora.' },
    'admin.quizCorrectErr': { en: 'Pick which option is correct.', hr: 'Odaberi koji je odgovor točan.' },
    // F4.4 — fill-in-the-blank editing
    'admin.fill': { en: 'Fill blanks', hr: 'Dopune' },
    'admin.editFill': { en: 'Edit fill-in-the-blank', hr: 'Uredi dopunjavanje' },
    'admin.sentence': { en: 'Sentence', hr: 'Rečenica' },
    'admin.insertBlank': { en: 'Insert blank', hr: 'Ubaci prazninu' },
    'admin.insertBlankHint': { en: 'Select a word — it becomes the blank and the answer.', hr: 'Označi riječ — postaje praznina i odgovor.' },
    'admin.fillEmptyErr': { en: 'Sentence and answer must not be empty.', hr: 'Rečenica i odgovor ne smiju biti prazni.' },
    'admin.fillBlankErr': { en: 'The sentence needs a blank — select a word and press the button.', hr: 'Rečenici treba praznina — označi riječ i pritisni gumb.' },
    'admin.fillAnswerCountErr': { en: 'Every blank needs its own answer.', hr: 'Svaka praznina treba svoj odgovor.' },
    'admin.fillSaveOk': { en: 'Sentence saved.', hr: 'Rečenica spremljena.' },
    // F4.4 — learn editing
    'admin.learn': { en: 'Learn', hr: 'Učenje' },
    'admin.editLearn': { en: 'Edit learn content', hr: 'Uredi sadržaj učenja' },
    'admin.learnTitle': { en: 'Title (optional)', hr: 'Naslov (nije obavezno)' },
    'admin.learnContent': { en: 'Content (HTML)', hr: 'Sadržaj (HTML)' },
    'admin.learnEmptyErr': { en: 'Content must not be empty.', hr: 'Sadržaj ne smije biti prazan.' },
    'admin.learnSaveOk': { en: 'Learn content saved.', hr: 'Sadržaj učenja spremljen.' },

    // Home tab
    'home.welcome': { en: '🎓 Welcome to Sokrat Study', hr: '🎓 Dobrodošli u Sokrat Study' },
    'home.subtitle': { en: 'Your interactive study guide', hr: 'Tvoj interaktivni vodič za učenje' },
    'home.guideTo': { en: 'Your interactive guide to', hr: 'Tvoj interaktivni vodič za' },
    'home.stat.questions': { en: 'Questions', hr: 'Pitanja' },
    'home.stat.categories': { en: 'Categories', hr: 'Kategorija' },
    'home.stat.bestScore': { en: 'Best Score', hr: 'Najbolji rezultat' },
    'home.stat.streak': { en: 'Day Streak', hr: 'Niz dana' },
    'home.chooseCategory': { en: '📚 Choose a category to study', hr: '📚 Odaberi kategoriju za učenje' },
    'home.quickStart': { en: '🚀 Quick Start', hr: '🚀 Brzi početak' },
    'home.quickQuiz': { en: 'Quick Quiz (10 questions)', hr: 'Brzi kviz (10 pitanja)' },
    'home.allFlashcards': { en: 'All Flashcards', hr: 'Sve kartice' },
    'home.startLearning': { en: 'Start Learning', hr: 'Započni učenje' },

    // Learn
    'learn.title': { en: 'Learn - Complete Material', hr: 'Učenje – cjelovito gradivo' },
    'learn.imageClose': { en: 'Close image viewer', hr: 'Zatvori prikaz slike' },
    // F3/2 cigla 4b: ime slike u gradivu (čitač ekrana) i opis slike koja ga nema (natpis preglednika).
    'learn.openImage': { en: 'Open image: {alt}', hr: 'Otvori sliku: {alt}' },
    'learn.image': { en: 'Learn image', hr: 'Slika' },

    // Flashcards
    'fc.title': { en: 'Flashcards', hr: 'Kartice' },
    'fc.clickForAnswer': { en: 'Click for answer', hr: 'Klikni za odgovor' },
    'fc.noCards': { en: 'No Cards', hr: 'Nema kartica' },
    'fc.noCardsAvailable': { en: 'No flashcards available for this lesson.', hr: 'Za ovu lekciju nema kartica.' },
    'fc.trySelecting': { en: 'Try selecting a different lesson or category.', hr: 'Pokušaj odabrati drugu lekciju ili kategoriju.' },
    'fc.dontKnow': { en: "Don't Know", hr: 'Ne znam' },
    'fc.know': { en: 'Know', hr: 'Znam' },
    'fc.prev': { en: 'Previous card', hr: 'Prethodna kartica' },   // a11y aria-label (F3 3E)
    'fc.next': { en: 'Next card', hr: 'Sljedeća kartica' },        // a11y aria-label (F3 3E)

    // Zajednički gumbi
    'common.previous': { en: 'Previous', hr: 'Prethodno' },
    'common.next': { en: 'Next', hr: 'Dalje' },
    'common.check': { en: 'Check', hr: 'Provjeri' },
    'common.submit': { en: 'Submit', hr: 'Predaj' },
    'common.restart': { en: 'Restart', hr: 'Ponovno' },
    'common.skip': { en: 'Skip', hr: 'Preskoči' },
    'common.hint': { en: 'Hint', hr: 'Pomoć' },
    'common.correct': { en: 'Correct', hr: 'Točno' },
    'common.wrong': { en: 'Wrong', hr: 'Netočno' },
    'common.cancel': { en: 'Cancel', hr: 'Odustani' },
    'common.confirm': { en: 'Confirm', hr: 'Potvrdi' },
    // Service Worker update-flow (F3 3A.3) — toast s klik-akcijom
    'sw.updateReady': { en: 'New version is ready — tap to update', hr: 'Nova verzija je spremna — dodirni za nadogradnju' },
    // a11y (F3 3E) — aria-label za skrolabilne learn tablice
    'a11y.scrollTable': { en: 'Table — scroll horizontally to see more', hr: 'Tablica — skrolaj vodoravno za više' },
    // a11y (F3 3E.2) — landmark labela za statistike na landingu
    'a11y.heroStats': { en: 'Key statistics', hr: 'Ključne statistike' },

    // Quiz
    'quiz.title': { en: 'Quiz Mode', hr: 'Način kviza' },
    'quiz.subtitle': { en: 'Test your knowledge!', hr: 'Provjeri svoje znanje!' },
    'quiz.numQuestions': { en: 'Number of questions:', hr: 'Broj pitanja:' },
    'quiz.opt.5': { en: '5 questions', hr: '5 pitanja' },
    'quiz.opt.10': { en: '10 questions', hr: '10 pitanja' },
    'quiz.opt.20': { en: '20 questions', hr: '20 pitanja' },
    'quiz.opt.all': { en: 'All questions', hr: 'Sva pitanja' },
    'quiz.categoryLabel': { en: 'Category:', hr: 'Kategorija:' },
    'quiz.difficulty': { en: 'Difficulty:', hr: 'Težina:' },
    'quiz.easy': { en: 'Easy', hr: 'Lako' },
    'quiz.medium': { en: 'Medium', hr: 'Srednje' },
    'quiz.hard': { en: 'Hard', hr: 'Teško' },
    'quiz.start': { en: 'Start Quiz', hr: 'Pokreni kviz' },
    'quiz.reviewWrong': { en: 'Review Wrong Answers', hr: 'Pregled netočnih odgovora' },
    'quiz.tryAgain': { en: 'Try Again', hr: 'Pokušaj ponovno' },
    'quiz.newQuiz': { en: 'New Quiz', hr: 'Novi kviz' },
    'quiz.correct': { en: 'Correct!', hr: 'Točno!' },
    'quiz.incorrect': { en: 'Incorrect', hr: 'Netočno' },
    'quiz.question': { en: 'Question', hr: 'Pitanje' },
    'quiz.time': { en: 'Time', hr: 'Vrijeme' },
    // Quiz rezultat — naslovi/poruke po postotku (EN = ORIGINALNI tekst → EN nepromijenjen)
    'quiz.res.perfect.t': { en: 'Excellent!', hr: 'Izvrsno!' },
    'quiz.res.perfect.m': { en: 'Perfect knowledge!', hr: 'Savršeno znanje!' },
    'quiz.res.great.t': { en: 'Great!', hr: 'Sjajno!' },
    'quiz.res.great.m': { en: 'Very good!', hr: 'Vrlo dobro!' },
    'quiz.res.good.t': { en: 'Good!', hr: 'Dobro!' },
    'quiz.res.good.m': { en: 'Keep practicing!', hr: 'Nastavi vježbati!' },
    'quiz.res.ok.t': { en: 'Need more study', hr: 'Treba još učenja' },
    'quiz.res.ok.m': { en: 'Review the material and try again!', hr: 'Ponovi gradivo i pokušaj opet!' },

    // Fill
    'fill.title': { en: 'Fill in the Blank', hr: 'Dopuni prazninu' },
    'fill.placeholder': { en: 'Type your answer...', hr: 'Upiši svoj odgovor...' },
    'fill.blankLabel': { en: 'Blank', hr: 'Praznina' },
    'fill.correctAnswerLabel': { en: 'Correct answer:', hr: 'Točan odgovor:' },
    'fill.correct': { en: 'Correct!', hr: 'Točno!' },
    'fill.wrong': { en: 'Wrong!', hr: 'Netočno!' },
    'fill.completed': { en: 'You completed all Fill-in-the-blank questions!', hr: 'Riješio si sva pitanja Dopuni prazninu!' },

    // Progress
    'prog.title': { en: 'Your Progress', hr: 'Tvoj napredak' },
    'prog.overall': { en: 'Overall Progress', hr: 'Ukupan napredak' },
    'prog.learned': { en: 'learned', hr: 'naučeno' },
    'prog.avgScore': { en: 'Average score:', hr: 'Prosječan rezultat:' },
    'prog.totalQuizzes': { en: 'Total quizzes:', hr: 'Ukupno kvizova:' },
    'prog.accuracy': { en: 'Accuracy:', hr: 'Točnost:' },
    'prog.solved': { en: 'Solved:', hr: 'Riješeno:' },
    'prog.completed': { en: 'Completed:', hr: 'Završeno:' },
    'prog.attempts': { en: 'Attempts:', hr: 'Pokušaja:' },
    'prog.avgBest': { en: 'Avg best score:', hr: 'Prosj. najbolji rezultat:' },
    'prog.byCategory': { en: 'Progress by Category', hr: 'Napredak po kategoriji' },
    'prog.history': { en: 'Study History', hr: 'Povijest učenja' },
    'prog.reset': { en: 'Reset Progress', hr: 'Poništi napredak' },

    // Exercises
    'ex.subtitle': { en: 'Interactive, auto-graded practice problems.', hr: 'Interaktivni zadaci s automatskim ocjenjivanjem.' },
    'ex.empty': { en: 'No exercises yet for this lesson.', hr: 'Za ovu lekciju još nema vježbi.' },

    // Slijepa karta (F3/2) — sučelje; imena mjesta su gradivo i ne prevode se (ADR-012).
    // `{…}` popunjava `js/blind-map.js` kroz `.replace`.
    'map.title': { en: 'Blind Map', hr: 'Slijepa karta' },
    'map.heading': { en: 'Interactive Blind Map', hr: 'Interaktivna slijepa karta' },
    'map.intro': { en: 'Click on the map to find the requested location', hr: 'Klikni na karti i pronađi traženo mjesto' },
    'map.level.cities': { en: 'Cities', hr: 'Gradovi' },
    'map.level.islands': { en: 'Islands', hr: 'Otoci' },
    'map.level.nationalParks': { en: 'National Parks', hr: 'Nacionalni parkovi' },
    'map.level.natureParks': { en: 'Nature Parks', hr: 'Parkovi prirode' },
    'map.level.regions': { en: 'Regions', hr: 'Regije' },
    'map.task': { en: 'Click on the location of:', hr: 'Pokaži na karti:' },
    'map.noSelection': { en: 'No location selected', hr: 'Nijedno mjesto nije odabrano' },
    'map.clicked': { en: 'Clicked: X={x}, Y={y}', hr: 'Odabrano: X={x}, Y={y}' },
    'map.clear': { en: 'Clear', hr: 'Poništi' },
    'map.progress': { en: 'Progress:', hr: 'Napredak:' },
    'map.score': { en: 'Score:', hr: 'Bodovi:' },
    'map.pts': { en: 'pts', hr: 'bod.' },
    'map.selectFirst': { en: 'Click on the map to select a location first', hr: 'Najprije klikni na karti i odaberi mjesto' },
    'map.correct': { en: "Correct! That's {name}!", hr: 'Točno! To je {name}!' },
    'map.wrong': { en: "That's not right. {name} is elsewhere. ({n}px off)", hr: 'Nije točno. {name} je drugdje (promašaj {n} px).' },
    'map.finished': { en: 'Finished! {correct}/{total} correct ({pct}%). Score: {score}', hr: 'Gotovo! Točno {correct}/{total} ({pct} %). Bodovi: {score}' },
    'map.loading': { en: 'Loading map...', hr: 'Učitavanje karte…' },
    'map.loadError': { en: 'Map could not be loaded', hr: 'Karta se nije mogla učitati' },

    // ===== Landing (chrome — marketing copy; EN = originalni tekst) =====
    'lnav.subjects': { en: 'Subjects', hr: 'Predmeti' },
    // `lnav.how` / `lnav.modes` / `lnav.about` obrisani u C2 zajedno sa sidrenim linkovima i
    // sekcijama „How it works" / „Study modes" na koje su pokazivali. Ključ koji nitko ne
    // čita je mrtav kod, ne rezerva (ADR-027).
    // ⚠️ Rječnik je presuđen u ADR-026: korisnikovo je „materijal", a „gradivo" = JAVNI katalog.
    // Ne piši „Moje gradivo" — to bi značilo suprotno od onoga što stranica pokazuje.
    'lnav.materials': { en: 'My materials', hr: 'Moji materijali' },
    'cta.start.lower': { en: 'Start studying', hr: 'Počni učiti' },
    'auth.signIn': { en: 'Sign in', hr: 'Prijava' },
    // ── HERO ──────────────────────────────────────────────────────────────
    // ⚠️ Tekst više NE spominje FMTU ni godine studija (Leon, 2026-08-12: „zbog UGC-a
    // platformu gradimo za sve"). Naslov tvrdi jednu mehaniku, a prikaz ispod je dokazuje.
    'hero.kicker': { en: 'Any subject · any language', hr: 'Bilo koje gradivo · bilo koji jezik' },
    // ⚠️ Naslov POKRIVA OBA IZVORA gradiva (spec §7.13). „Napiši jednom" je bilo obećanje
    // UGC-a, kao što je „Nađi svoj predmet" obećanje kataloga — svaka od te dvije verzije
    // pola posjetitelja odmah isključi. Odakle gradivo dolazi je detalj nabave; proizvod
    // je pretvorba, i nju naslov imenuje.
    'hero.title.a': { en: 'Any material.', hr: 'Bilo koje gradivo.' },
    'hero.title.b': { en: 'Learn it ', hr: 'Uči na ' },
    'hero.title.mark': { en: 'four ways', hr: 'četiri načina' },
    'hero.title.c': { en: '.', hr: '.' },
    // ⚠️ T5 · SKRAĆENO SA 135 NA 72 ZNAKA, I TO NIJE ŠTEDNJA NEGO BRISANJE DUPLIKATA.
    // Prva polovica („uzmi gotovo ili napiši svoje") stajala je DOSLOVNO u opisu prvih
    // vrata ispod, a druga je nabrajala četiri načina koje naslov IMENUJE i koje sekcija
    // niže POKAZUJE na pravoj lekciji — prvi ekran je istu stvar govorio tri puta. Ostalo
    // je ono što nigdje drugdje ne piše: da se ne pripremaju ručno. Mjereno na 320 px:
    // pet redaka → dva, i tek time vrata ulaze u prvi ekran (spec §9.12).
    'hero.sub': {
        en: 'Nothing to prepare — the cards, the quiz and the blanks write themselves.',
        hr: 'Ništa ne pripremaš — kartice, kviz i dopune nastaju sami.'
    },


    // ── DVOJE VRATA ───────────────────────────────────────────────────────
    'door.study.t': { en: 'Start studying', hr: 'Kreni učiti' },
    'door.study.d': { en: 'Pick your own material, or something ready from the catalog.', hr: 'Odaberi svoje gradivo ili gotovo iz kataloga.' },
    'door.study.m': { en: ' subjects ready', hr: ' predmeta spremno' },
    'door.make.t': { en: 'Make your own', hr: 'Napravi svoje' },
    'door.make.d': { en: 'From your notes to flashcards in a few minutes.', hr: 'Od bilježaka do kartica u nekoliko minuta.' },
    // F3/1 (Leon, 16.09.): do tada „private until you share it" — obećanje dijeljenja koje ne postoji (PRD §7).
    'door.make.m': { en: 'Editor · private to you', hr: 'Editor · vidljivo samo tebi' },

    // ── KATALOG + ČINJENICE ───────────────────────────────────────────────
    'cat.title': { en: 'Or start from the catalog', hr: 'Ili kreni iz kataloga' },
    'cat.sub': { en: 'Complete subjects, already written — open one and study in seconds.', hr: 'Gotovi predmeti, već napisani — otvori i uči u nekoliko sekundi.' },
    'cat.search': { en: 'Search subjects', hr: 'Traži predmet' },
    'cat.program': { en: 'Programme', hr: 'Program' },
    'cat.all': { en: 'All', hr: 'Svi' },
    'cat.none': { en: 'No subject matches that.', hr: 'Nijedan predmet ne odgovara.' },
    // ➕ posljednja pločica — jedina koja kaže da katalog nije zatvoren popis (§7.13).
    'cat.make.t': { en: 'Your subject', hr: 'Tvoj predmet' },
    'cat.make.d': { en: "Not on the list? Write it yourself.", hr: 'Nema ga na popisu? Napiši ga sam.' },

    // ③ Svoje gradivo — puna sekcija (§7.13). Primjeri su NAMJERNO izvan fakulteta.
    'own.title': { en: 'Or write your own', hr: 'Ili napiši svoje' },
    'own.sub': {
      en: 'Anything you study — a law course, a language, your driving test. If you can write it down, you can study it here.',
      hr: 'Bilo što što učiš — kolegij prava, jezik, vozački ispit. Ako to možeš zapisati, ovdje to možeš i učiti.'
    },
    'own.s1.t': { en: 'Write it down', hr: 'Zapiši' },
    'own.s1.d': {
      en: 'Paste your notes or type them straight in. Sections, images, tables and formulas all fit.',
      hr: 'Zalijepi bilješke ili piši izravno. Sekcije, slike, tablice i formule sve stanu.'
    },
    'own.s2.t': { en: 'Add cards and questions', hr: 'Dodaj kartice i pitanja' },
    'own.s2.d': {
      en: 'Flashcards, quiz questions and fill-in-the-blanks live next to the material they came from.',
      hr: 'Kartice, kviz-pitanja i dopune stoje uz gradivo iz kojeg su nastali.'
    },
    'own.s3.t': { en: 'Study it four ways', hr: 'Uči na četiri načina' },
    'own.s3.d': {
      en: 'The same four modes as every subject in the catalog. Progress is saved and synced.',
      hr: 'Ista četiri moda kao i svaki predmet u katalogu. Napredak se sprema i sinkronizira.'
    },
    'own.shelf': {
      en: 'For example, a shelf that has nothing to do with any faculty:',
      hr: 'Na primjer, polica koja nema veze ni s jednim fakultetom:'
    },
    'own.ex1': { en: 'Roman Law', hr: 'Rimsko pravo' },
    'own.ex2': { en: 'German B1', hr: 'Njemački B1' },
    'own.ex3': { en: 'Anatomy', hr: 'Anatomija' },
    'own.ex4': { en: 'Driving theory', hr: 'Vozački ispit' },
    'own.cta': { en: 'Make your own material', hr: 'Napravi svoj materijal' },

    // ⑤ Četiri načina. NASLOVI MODOVA NAMJERNO KORISTE `nav.*` KLJUČEVE (Learn/
    // Flashcards/Quiz/Fill) — preimenuje li se mod, landing se mijenja s njim i ne
    // ostaje jedini ekran sa starim imenom. Ovdje su samo OPISI.
    'modes.title': { en: 'The four ways', hr: 'Četiri načina' },
    'modes.sub': {
      en: 'Every subject — from the catalog or your own — opens in all four. Nothing to set up.',
      hr: 'Svaki predmet — iz kataloga ili tvoj — otvara se u sva četiri. Ništa se ne podešava.'
    },
    'modes.learn.d': { en: 'The material itself — sections, images, tables, formulas.', hr: 'Samo gradivo — sekcije, slike, tablice, formule.' },
    'modes.cards.d': { en: 'Question on one side, answer on the other. Short by design.', hr: 'Pitanje s jedne strane, odgovor s druge. Kratko po pravilu.' },
    'modes.quiz.d': { en: 'Multiple choice, scored, with the reason behind each answer.', hr: 'Višestruki izbor, s bodovima i obrazloženjem svakog odgovora.' },
    'modes.fill.d': { en: 'Type the missing term. Harder than recognising it in a list.', hr: 'Upiši pojam koji nedostaje. Teže nego prepoznati ga na popisu.' },

    // ⑥ MCP — ⚠️ BUDUĆE VRIJEME NAMJERNO. MCP ne postoji (ADR-030 ②: pristup nije
    // presuđen). Kad proradi: makni `mcp.soon`, prebaci u sadašnje vrijeme.
    'mcp.soon': { en: 'Coming soon', hr: 'Uskoro' },
    'mcp.title': { en: 'Your own AI will write it for you', hr: 'Tvoj AI će ti ga napisati' },
    'mcp.sub': {
      en: 'Connect the assistant you already use. It will read a chapter, build the material, and put it on your shelf — then check how you are doing and fix what you keep missing.',
      hr: 'Spoji asistenta kojeg već koristiš. Pročitat će poglavlje, napraviti materijal i staviti ga na tvoju policu — pa provjeriti kako ti ide i popraviti ono što stalno griješiš.'
    },
    'mcp.note': {
      en: 'It will work on your own material only. The catalog stays as it is.',
      hr: 'Radit će samo na tvom gradivu. Katalog ostaje kakav jest.'
    },
    'facts.free.b': { en: 'Free', hr: 'Besplatno' },
    'facts.free.t': { en: ' and ad-free', hr: ' i bez reklama' },
    'facts.offline.t': { en: 'Works ', hr: 'Radi ' },
    'facts.offline.b': { en: 'offline', hr: 'offline' },
    'facts.progress.t': { en: 'Progress is ', hr: 'Napredak se ' },
    'facts.progress.b': { en: 'saved', hr: 'pamti' },
    'facts.private.t': { en: 'Your material stays ', hr: 'Tvoje gradivo je ' },
    'facts.private.b': { en: 'private', hr: 'privatno' },
    // `stats.*`, `sec.*`, `how.*`, `mode.*`, `cta.title/sub` obrisani u C2: stats bar i
    // sekcije „How it works" / „Study modes" / završni CTA više ne postoje. Sve su TVRDILE
    // ono što živi prikaz u heroju POKAZUJE — a tri odlomka koja objašnjavaju proizvod su
    // sama po sebi priznanje da proizvod nije razumljiv.
    'footer.tagline': { en: 'Write your own study material, or use one that is ready. Free, for everyone.', hr: 'Napravi vlastito gradivo ili uzmi gotovo. Besplatno, za svakoga.' },
    'footer.explore': { en: 'Explore', hr: 'Istraži' },
    'footer.about': { en: 'About', hr: 'O nama' },
    'footer.aboutUs': { en: 'About us', hr: 'O nama' },
    'footer.contact': { en: 'Contact', hr: 'Kontakt' },
    'footer.faq': { en: 'FAQ', hr: 'Česta pitanja' },
    'footer.legal': { en: 'Legal', hr: 'Pravno' },
    'footer.privacy': { en: 'Privacy Policy', hr: 'Pravila privatnosti' },
    'footer.terms': { en: 'Terms of Use', hr: 'Uvjeti korištenja' },
    'footer.cookies': { en: 'Cookie settings', hr: 'Postavke kolačića' },
    'footer.rights': { en: '© 2026 Sokrat Study · Leon Kreso. All rights reserved.', hr: '© 2026 Sokrat Study · Leon Kreso. Sva prava pridržana.' },
    // ⚠️ `about.*` · DRUGA površina sa zakucanim engleskim, nađena tek 2026-08-24 —
    // cijela stranica „O nama" imala je NULA `data-i18n` atributa. T4 je istu stvar
    // našao na cookie-traci i zapisao pouku („zakucani engleski je dug koji se plaća
    // kasnije"), ali je pouka bila zapisana kao ANEGDOTA o jednoj traci, pa nitko nije
    // prebrojao ostale površine. Zato od danas postoji brana koja to broji, a ne pamti.
    //
    // ⚠️ Odlomak misije je izgubio inline `<strong>`/`<em>`: `applyTranslations` postavlja
    // `textContent`, pa bi svaki `data-i18n` na odlomku s markupom taj markup pojeo.
    // Alternativa je bila dodati `data-i18n-html` — dakle NOV innerHTML-put, i to točno
    // ondje gdje je projekt već jednom platio granicu (BUG-025). Tri kurzivne riječi ne
    // vrijede novog sinka; ime autora ionako stoji podebljano u kartici „Creator".
    // ⚠️ TEKST JE LEONOVA ODLUKA, ne nusprodukt cigle (2026-08-24): od tri ponuđena smjera
    // izabran je **B — oboje ravnopravno**, koji prati ADR-029 kakav danas stoji. Zatečeni
    // tekst je platformu opisivao kao mjesto koje **dijeli gotovo gradivo** i nije imao nijednu
    // rečenicu o tome da korisnik smije napraviti svoje — dakle proizvod je otišao naprijed,
    // a opis je ostao. Isti opis živi i u `<title>`/`meta`/OG u `index.html`; **jedna priča,
    // tri mjesta** — ako se mijenja, mijenja se svugdje (brana: `tests/seo.spec.js`).
    // ⚠ **NIJEDNA REČENICA NE SMIJE NOSITI BROJ PREDMETA.** Jedini ručno pisan broj u projektu
    // je statični fallback u `index.html` i njega čuva `npm run verify`; svaki drugi bi tiho
    // ostario (landing je to već jednom imao NA PRODUKCIJI — pisao 17 kad ih je bilo 22).
    'about.title': { en: 'About Sokrat Study', hr: 'O platformi Sokrat Study' },
    'about.tagline': { en: 'Study what is ready, or make your own', hr: 'Uči iz gotovog — ili napravi svoje' },
    'about.mission.h': { en: 'Our Mission', hr: 'Naša misija' },
    'about.mission.p': { en: 'Sokrat Study turns study material into something that asks you questions instead of just showing you answers. It is built by Leon Kreso and it is free — whether the material is already here or you write it yourself.', hr: 'Sokrat Study pretvara gradivo u nešto što te ispituje, umjesto da ti samo pokazuje odgovore. Radi ga Leon Kreso i besplatno je — svejedno je li gradivo već ovdje ili ga sam napišeš.' },
    'about.do.h': { en: 'What We Do', hr: 'Što radimo' },
    // F3/1 (Leon, 16.09.): „several programmes" nije bilo točno (jedan smjer, dva jezika) · oznake su
    // stvarni načini učenja (sažetaka nikad nije bilo) · „Contribute" je pozivao da se gradivo šalje,
    // pa je postao „Get in touch" · glas je MNOŽINA kao na FAQ-u, Kontaktu i u Pravilima („write to us").
    'about.do.p': { en: 'Wherever the material comes from, it works the same way: read it, then practise it as flashcards, a quiz or fill-in-the-blanks. The catalogue holds ready university subjects; the editor lets you build your own from your notes.', hr: 'Svejedno odakle gradivo dolazi, radi na isti način: pročitaš ga, pa uvježbaš karticama, kvizom ili dopunama. U katalogu stoje gotovi fakultetski predmeti, a u editoru napraviš vlastite iz svojih bilježaka.' },
    'about.feat.learn': { en: 'Learn', hr: 'Učenje' },
    'about.feat.flashcards': { en: 'Flashcards', hr: 'Kartice' },
    'about.feat.quiz': { en: 'Quiz', hr: 'Kviz' },
    'about.feat.fill': { en: 'Fill-in-the-blanks', hr: 'Dopune' },
    'about.contact.h': { en: 'Get in touch', hr: 'Javi nam se' },
    'about.contact.p': { en: 'Your own material you make right here, and it stays yours. Found a mistake or have an idea? Write to us.', hr: 'Vlastito gradivo napraviš ovdje i ostaje tvoje. Vidiš grešku ili imaš ideju? Piši nam.' },
    'about.creator.role': { en: 'Founder & developer', hr: 'Osnivač i developer' },
    // T4 · Cookie-traka. Do sada je bila JEDINA površina sa zakucanim engleskim tekstom —
    // a to je pravni tekst, ne ukras. ⚠️ Tekst je namjerno kraći nego prije (171 → 100
    // znakova): na 320 px je stara rečenica bila PET redaka i traka je uzimala 38 % ekrana.
    // Ono što je izostavljeno („kako bismo razumjeli kako posjetitelji koriste…") je
    // obrazloženje koje u cijelosti stoji u Pravilima privatnosti, na koja traka vodi.
    'cookie.text': { en: 'We use optional analytics and error-monitoring cookies. They load only if you accept.', hr: 'Koristimo neobavezne kolačiće za analitiku i praćenje grešaka. Učitavaju se samo ako prihvatiš.' },
    'cookie.privacy': { en: 'Privacy Policy', hr: 'Pravila privatnosti' },
    'cookie.accept': { en: 'Accept', hr: 'Prihvaćam' },
    'cookie.reject': { en: 'Reject', hr: 'Odbijam' },
    'cookie.label': { en: 'Cookie consent', hr: 'Pristanak na kolačiće' },
    // `footer.made.*` obrisani u C2 — „Made with ❤️ for students" je ukras koji ne nosi
    // značenje (izlazni uvjet §7.6.5), a i suzio je publiku na studente.
    'sidebar.choose': { en: 'Choose Subject', hr: 'Odaberi predmet' },
    'sidebar.close': { en: 'Close sidebar', hr: 'Zatvori bočnu traku' },

    // ===== Browse drill-down (dinamički renderirano u navigation.js) =====
    'browse.trail.faculty': { en: 'Faculty', hr: 'Fakultet' },
    'browse.trail.program': { en: 'Program', hr: 'Smjer' },
    'browse.h.faculty': { en: 'Choose your faculty', hr: 'Odaberi svoj fakultet' },
    'browse.h.program': { en: 'Choose your program', hr: 'Odaberi svoj smjer' },
    'browse.h.year': { en: 'Choose your year', hr: 'Odaberi godinu' },
    'browse.i.faculty': { en: 'Select your faculty to find your subjects.', hr: 'Odaberi fakultet da pronađeš svoje predmete.' },
    'browse.i.program': { en: 'Select your study program.', hr: 'Odaberi svoj studijski smjer.' },
    'browse.i.year': { en: 'Pick the study year you want to review.', hr: 'Odaberi studijsku godinu koju želiš ponoviti.' },
    'browse.empty.faculties': { en: 'No faculties yet.', hr: 'Još nema fakulteta.' },
    'browse.empty.programs': { en: 'No programs yet.', hr: 'Još nema smjerova.' },
    'browse.empty.years': { en: 'No years yet.', hr: 'Još nema godina.' },
    'browse.empty.subjects': { en: 'No subjects yet.', hr: 'Još nema predmeta.' },
    'browse.studyYear': { en: 'Study year', hr: 'Studijska godina' },
    'browse.semester': { en: 'Semester', hr: 'Semestar' },
    'unit.year.1': { en: 'year', hr: 'godina' },
    'unit.year.n': { en: 'years', hr: 'godine' },
    'unit.subject.1': { en: 'subject', hr: 'predmet' },
    'unit.subject.n': { en: 'subjects', hr: 'predmeta' },
    'unit.lesson.1': { en: 'lesson', hr: 'lekcija' },
    'unit.lesson.n': { en: 'lessons', hr: 'lekcije' },

    // ===== Poruke (toast/confirm/status — dinamički iz JS-a) =====
    // Progress / analytics (analytics.js)
    'msg.confirmResetProgress': { en: 'Are you sure you want to reset all progress?', hr: 'Jesi li siguran/na da želiš poništiti sav napredak?' },
    'msg.progressReset': { en: 'Progress reset!', hr: 'Napredak poništen!' },
    'msg.confirmResetAnalytics': { en: 'Are you sure you want to reset all analytics?', hr: 'Jesi li siguran/na da želiš poništiti svu statistiku?' },
    'msg.analyticsReset': { en: 'Analytics reset!', hr: 'Statistika poništena!' },
    // Auth (auth.js)
    'msg.signedInSync': { en: 'Signed in — your progress now syncs to the cloud.', hr: 'Prijavljen/a — napredak se sad sinkronizira u oblak.' },
    'msg.passwordUpdatedSignedIn': { en: 'Password updated — you are signed in.', hr: 'Lozinka promijenjena — prijavljen/a si.' },
    'msg.signedOut': { en: 'Signed out. Progress stays on this device.', hr: 'Odjavljen/a. Napredak ostaje na ovom uređaju.' },
    // Profile (profile.js)
    'msg.syncedJustNow': { en: 'Synced just now — everything is backed up.', hr: 'Sinkronizirano upravo — sve je sigurno pohranjeno.' },
    'msg.progressSynced': { en: 'Progress synced to cloud', hr: 'Napredak sinkroniziran u oblak' },
    'msg.passwordsNoMatch': { en: 'Passwords do not match.', hr: 'Lozinke se ne podudaraju.' },
    'msg.saving': { en: 'Saving…', hr: 'Spremanje…' },
    'msg.passwordUpdated': { en: 'Password updated.', hr: 'Lozinka promijenjena.' },
    'msg.deleteCloudFail': { en: 'Could not delete study history: ', hr: 'Brisanje povijesti učenja nije uspjelo: ' },
    'msg.cloudDataDeleted': { en: 'Study history deleted.', hr: 'Povijest učenja obrisana.' },
    'msg.confirmDeleteCloud': { en: 'Delete ALL study progress — in the cloud and on this device? Your account stays. This cannot be undone.', hr: 'Obrisati SAV napredak učenja — u oblaku i na ovom uređaju? Račun ostaje. Ovo se ne može poništiti.' },

    // ===== Auth modal (građen u auth.js) =====
    // R1: dijalog više nije „backup napretka" nego ULAZ u platformu (spec RACUN).
    'auth.m.title': { en: 'Welcome to Sokrat', hr: 'Dobrodošli u Sokrat' },
    'auth.m.text': { en: 'One free account: progress synced on every device, plus your own study materials.', hr: 'Jedan besplatan račun: napredak na svim uređajima i vlastiti materijali.' },
    'auth.oauth.google': { en: 'Continue with Google', hr: 'Nastavi s Googleom' },
    'auth.oauth.facebook': { en: 'Continue with Facebook', hr: 'Nastavi s Facebookom' },
    'auth.divider.or': { en: 'or', hr: 'ili' },
    'auth.tab.signUp': { en: 'Create account', hr: 'Otvori račun' },
    'auth.ph.password': { en: 'Password', hr: 'Lozinka' },
    'auth.forgot': { en: 'Forgot password?', hr: 'Zaboravljena lozinka?' },
    'auth.ph.name': { en: 'Your name', hr: 'Tvoje ime' },
    'auth.ph.passwordMin': { en: 'Password (min. 8 characters)', hr: 'Lozinka (min. 8 znakova)' },
    'auth.forgot.text': { en: 'Enter your email and we will send you a link to reset your password.', hr: 'Upiši svoj e-mail i poslat ćemo ti link za promjenu lozinke.' },
    'auth.btn.sendReset': { en: 'Send reset link', hr: 'Pošalji link za promjenu' },
    'auth.backToSignIn': { en: '← Back to sign in', hr: '← Natrag na prijavu' },
    'auth.terms.pre': { en: 'By signing in or creating an account you agree to our ', hr: 'Prijavom ili otvaranjem računa prihvaćaš naše ' },
    'auth.terms.mid': { en: ' and ', hr: ' i ' },
    'auth.recovery.title': { en: 'Set a new password', hr: 'Postavi novu lozinku' },
    'auth.recovery.textPre': { en: 'Choose a new password for ', hr: 'Odaberi novu lozinku za ' },
    'auth.signedIn.title': { en: 'Signed in', hr: 'Prijavljen/a' },
    'auth.signedInAs': { en: 'Signed in as ', hr: 'Prijavljen/a kao ' },
    'auth.syncAuto': { en: 'Your progress syncs automatically.', hr: 'Tvoj napredak se automatski sinkronizira.' },
    'sync.lastSyncedPre': { en: 'Your progress syncs automatically. Last synced ', hr: 'Tvoj napredak se automatski sinkronizira. Zadnja sinkronizacija ' },
    // Auth status poruke
    'auth.st.signingIn': { en: 'Signing in…', hr: 'Prijava…' },
    'auth.st.wrongCreds': { en: 'Wrong email or password.', hr: 'Pogrešan e-mail ili lozinka.' },
    'auth.st.confirmFirst': { en: 'Please confirm your email first — check your inbox for the confirmation link.', hr: 'Prvo potvrdi svoj e-mail — provjeri inbox za link za potvrdu.' },
    'auth.st.creating': { en: 'Creating account…', hr: 'Otvaranje računa…' },
    'auth.st.exists': { en: 'An account with this email already exists — switch to Sign in.', hr: 'Račun s ovim e-mailom već postoji — prebaci na Prijavu.' },
    'auth.st.created': { en: 'Account created! Check your inbox and click the confirmation link, then sign in.', hr: 'Račun otvoren! Provjeri inbox i klikni link za potvrdu, zatim se prijavi.' },
    'auth.st.sending': { en: 'Sending…', hr: 'Slanje…' },
    'auth.st.resetSent': { en: 'If an account exists for that email, a reset link is on its way — check your inbox.', hr: 'Ako račun za taj e-mail postoji, link za promjenu stiže — provjeri inbox.' },
    // Poruke sa SERVERA (Supabase). Prije su isle sirove i na engleskom; procurjelu
    // lozinku obrazac ne moze uhvatiti unaprijed, pa je ovo jedini put do korisnika.
    'auth.st.weakPwned': { en: 'This password has appeared in a known data breach — please pick a different one.', hr: 'Ova se lozinka pojavila u poznatoj krađi podataka — odaberi drugu.' },
    'auth.st.weakShort': { en: 'Password is too weak — use at least 8 characters.', hr: 'Lozinka je preslaba — koristi barem 8 znakova.' },
    'auth.st.rateLimit': { en: 'Too many attempts — please wait a minute and try again.', hr: 'Previše pokušaja — pričekaj minutu pa pokušaj ponovno.' },
    'auth.st.badEmail': { en: 'That email address does not look valid.', hr: 'Taj e-mail ne izgleda ispravno.' },
    'auth.st.samePass': { en: 'The new password must be different from the current one.', hr: 'Nova lozinka mora biti različita od trenutne.' },
    // F6 ①/2b: poslužitelj za OBA slučaja šalje ISTU rečenicu („…required…"), pa se razlikuju
    // samo po KODU — zato ovdje stoje dvije poruke, a `authError` sudi po kodu, ne po tekstu.
    'auth.st.currentPassRequired': { en: 'Enter your current password to change it.', hr: 'Upiši trenutnu lozinku da bi je promijenio.' },
    'auth.st.currentPassWrong': { en: 'That is not your current password.', hr: 'To nije tvoja trenutna lozinka.' },
    'auth.st.genericErr': { en: 'Something went wrong. Please try again.', hr: 'Nešto je pošlo po zlu. Pokušaj ponovno.' },
    'auth.st.serverErr': { en: 'The server could not send the email right now — please try again in a few minutes.', hr: 'Server trenutno ne može poslati e-mail — pokušaj ponovno za par minuta.' },
    'auth.st.redirect': { en: 'Opening secure sign-in…', hr: 'Otvaranje sigurne prijave…' },
    'auth.st.providerOff': { en: 'This sign-in method is not available yet — please use email for now.', hr: 'Ovaj način prijave još nije dostupan — zasad koristi e-mail.' },
    // R1: upitnik pri registraciji / prvoj OAuth-prijavi (spec RACUN §2)
    'auth.q.title': { en: 'Tell us who you are', hr: 'Reci nam tko si' },
    'auth.q.text': { en: 'One quick step — it helps us show you the right subjects.', hr: 'Samo jedan korak — pomaže nam da ti pokažemo prave predmete.' },
    'auth.q.rolesLabel': { en: 'Who are you?', hr: 'Tko si?' },
    'auth.q.student': { en: 'University student', hr: 'Student/ica' },
    'auth.q.pupil': { en: 'High school', hr: 'Srednja škola' },
    'auth.q.other': { en: 'Other', hr: 'Ostalo' },
    'auth.q.schoolPh': { en: 'Your university or school (optional)', hr: 'Tvoj fakultet ili škola (neobavezno)' },
    'auth.q.consent': { en: 'Email me about new subjects and features.', hr: 'Šaljite mi e-mail o novim predmetima i mogućnostima.' },
    'auth.q.age': { en: 'I am at least 16 years old.', hr: 'Imam najmanje 16 godina.' },
    'auth.oauth.age': { en: 'By continuing with Google you confirm you are at least 16.', hr: 'Nastavkom s Googleom potvrđuješ da imaš najmanje 16 godina.' },
    'auth.st.age': { en: 'Please confirm you are at least 16 years old.', hr: 'Potvrdi da imaš najmanje 16 godina.' },
    'auth.q.continue': { en: 'Continue', hr: 'Nastavi' },
    'auth.q.back': { en: '← Back', hr: '← Natrag' },
    'auth.q.skip': { en: 'Skip for now', hr: 'Preskoči zasad' },
    'auth.q.thanks': { en: 'Thanks — welcome to Sokrat!', hr: 'Hvala — dobrodošli u Sokrat!' },
    // F3/2 cigla 4a: imena gumba bez vidljivog teksta (čita ih čitač ekrana). Oko lozinke dijele
    // prozor za prijavu i „Promijeni lozinku" u profilu; ime mijenja rukovatelj klika u auth.js.
    'auth.close': { en: 'Close', hr: 'Zatvori' },
    'auth.showPassword': { en: 'Show password', hr: 'Prikaži lozinku' },
    'auth.hidePassword': { en: 'Hide password', hr: 'Sakrij lozinku' },

    // ===== Profil (#profile-page; renderProfilePage u profile.js) =====
    'profile.title': { en: 'My Profile', hr: 'Moj profil' },
    'profile.notSignedIn': { en: 'You are not signed in', hr: 'Nisi prijavljen/a' },
    'profile.signInToBackup': { en: 'Sign in to back up your progress and study on any device.', hr: 'Prijavi se da sigurno pohraniš napredak i učiš na bilo kojem uređaju.' },
    'profile.memberSince': { en: 'Member since ', hr: 'Član od ' },
    'profile.changePassword': { en: 'Change password', hr: 'Promijeni lozinku' },
    'profile.signOut': { en: 'Sign out', hr: 'Odjava' },
    'profile.appearance': { en: 'Appearance', hr: 'Izgled' },
    'profile.appearanceDesc': { en: 'Automatic follows your device, like our emails. When you are signed in, your pick follows your account; otherwise it stays on this device.', hr: 'Automatski prati uređaj, kao i naši mailovi. Kad si prijavljen/a, odabir prati tvoj račun; inače se pamti na ovom uređaju.' },
    'profile.themeAuto': { en: 'Automatic', hr: 'Automatski' },
    'profile.themeAcademic': { en: 'Academic blue', hr: 'Akademsko plavo' },
    'profile.themeChalk': { en: 'Chalkboard', hr: 'Ploča' },
    'profile.themeMint': { en: 'Mint', hr: 'Menta' },
    'profile.themeCarbon': { en: 'Carbon', hr: 'Ugljen' },
    // F6 ①/2b: polje „Trenutna lozinka" — vidi ga samo korisnik koji lozinku ima (`imaLozinku`).
    'profile.currentPassPlaceholder': { en: 'Current password', hr: 'Trenutna lozinka' },
    'profile.newPassPlaceholder': { en: 'New password (min. 8 characters)', hr: 'Nova lozinka (min. 8 znakova)' },
    'profile.repeatNewPass': { en: 'Repeat new password', hr: 'Ponovi novu lozinku' },
    'profile.saveNewPass': { en: 'Save new password', hr: 'Spremi novu lozinku' },

    // Zid (F2/3a) — identitet stoji IZNAD postavki; naslov „Postavke" je ta granica.
    'profile.settings': { en: 'Settings', hr: 'Postavke' },
    'profile.account': { en: 'Account', hr: 'Račun' },
    'profile.edit': { en: 'Edit profile', hr: 'Uredi profil' },
    'profile.bioEmpty': { en: 'No description yet — say what you study and what you are building.', hr: 'Još nema opisa — napiši što učiš i što gradiš.' },
    // F2/5a — zid gradiva na profilu
    'profile.shelfAll': { en: 'All materials', hr: 'Svi materijali' },
    'profile.shelfEmpty': { en: 'Make your first material', hr: 'Napravi prvi materijal' },
    'profile.shelfError': { en: 'Your materials did not load.', hr: 'Materijali se nisu učitali.' },
    // F2/4 — obavijesti mailom: prekidač u profilu, admin-forma, stranica odjave
    'profile.mailTitle': { en: 'Email updates', hr: 'Obavijesti mailom' },
    'profile.mailDesc': { en: 'Now and then we let you know about a new subject or an important change. No ads — every email has a one-click unsubscribe.', hr: 'Povremeno ti javimo novi predmet ili važnu promjenu. Bez reklama — u svakom mailu je odjava jednim klikom.' },
    'profile.mailOn': { en: 'On', hr: 'Uključeno' },
    'profile.mailOff': { en: 'Off', hr: 'Isključeno' },
    'profile.mailOnToast': { en: 'You will get email updates.', hr: 'Primat ćeš obavijesti mailom.' },
    'profile.mailOffToast': { en: 'Email updates are off.', hr: 'Obavijesti mailom su isključene.' },
    'profile.aiTitle': { en: 'Connected AI apps', hr: 'Povezani AI-jevi' },
    'profile.aiDesc': { en: 'AI apps you allowed to reach your own materials. They never see the public catalogue or anyone’s materials but yours.', hr: 'AI aplikacije kojima si dopustio pristup svojim materijalima. Javni katalog i tuđe materijale nikad ne vide.' },
    'profile.aiLoading': { en: 'Loading…', hr: 'Učitavanje…' },
    'profile.aiNone': { en: 'No AI app is connected right now.', hr: 'Trenutačno nije povezana nijedna AI aplikacija.' },
    'profile.aiSince': { en: 'Connected', hr: 'Povezano' },
    'profile.aiUnnamed': { en: 'Unnamed app', hr: 'Aplikacija bez imena' },
    'profile.aiRevoke': { en: 'Disconnect', hr: 'Prekini vezu' },
    'profile.aiRevokeTitle': { en: 'Disconnect this app?', hr: 'Prekinuti vezu s ovom aplikacijom?' },
    'profile.aiRevokeAsk': { en: 'It will not be able to get new access. Access it already holds keeps working for up to an hour.', hr: 'Više neće moći dobiti novi pristup. Pristup koji već ima radi još najviše sat vremena.' },
    'profile.aiRevoked': { en: 'Disconnected.', hr: 'Veza je prekinuta.' },
    'profile.aiRevokeErr': { en: 'Not disconnected — please try again.', hr: 'Veza nije prekinuta — pokušaj ponovno.' },
    'profile.aiError': { en: 'The list of connected apps did not load.', hr: 'Popis povezanih aplikacija nije se učitao.' },
    'profile.aiRetry': { en: 'Try again', hr: 'Pokušaj ponovno' },
    'profile.aiNote': { en: 'Disconnecting stops the app from getting new access. Access it already holds keeps working for up to an hour.', hr: 'Prekid veze sprečava aplikaciju da dobije novi pristup. Onaj koji već ima radi još najviše sat vremena.' },
    'profile.mailErr': { en: 'Not saved — please try again.', hr: 'Nije spremljeno — pokušaj ponovno.' },
    'mail.adminOpen': { en: 'Send a notification', hr: 'Pošalji obavijest' },
    'mail.adminTitle': { en: 'Notification by email', hr: 'Obavijest mailom' },
    'mail.segment': { en: 'Who gets it', hr: 'Kome ide' },
    'mail.segFmtu': { en: 'FMTU (opted in)', hr: 'FMTU (s pristankom)' },
    'mail.segAll': { en: 'Everyone who opted in', hr: 'Svi s pristankom' },
    'mail.subject': { en: 'Subject', hr: 'Naslov' },
    'mail.text': { en: 'Message', hr: 'Poruka' },
    'mail.url': { en: 'Link (optional, sokratstudy.com only)', hr: 'Poveznica (neobavezno, samo sokratstudy.com)' },
    'mail.countLabel': { en: 'Recipients:', hr: 'Primatelja:' },
    'mail.countLoading': { en: 'counting…', hr: 'brojim…' },
    'mail.test': { en: 'Send a test to me', hr: 'Pošalji probu meni' },
    'mail.send': { en: 'Send', hr: 'Pošalji' },
    'mail.confirmTitle': { en: 'Send this email?', hr: 'Poslati ovaj mail?' },
    'mail.confirmMsg': { en: 'Recipients: {n}. A sent email cannot be taken back.', hr: 'Primatelja: {n}. Poslan mail se ne može povući.' },
    'mail.sentTest': { en: 'Test sent to your address.', hr: 'Proba je poslana na tvoju adresu.' },
    'mail.sent': { en: 'Sent: {n}.', hr: 'Poslano: {n}.' },
    'mail.redirected': { en: '(staging: every email went to the test address)', hr: '(staging: svi mailovi su otišli na ispitnu adresu)' },
    'mail.none': { en: 'Nobody in this group has opted in — nothing to send.', hr: 'U ovoj skupini nitko nije pristao — nema kome poslati.' },
    'mail.errSubject': { en: 'A subject is required (up to 120 characters).', hr: 'Naslov je obavezan (do 120 znakova).' },
    'mail.errText': { en: 'A message is required (up to 5000 characters).', hr: 'Poruka je obavezna (do 5000 znakova).' },
    'mail.errUrl': { en: 'The link must be https:// on sokratstudy.com.', hr: 'Poveznica mora biti https:// na sokratstudy.com.' },
    'mail.errNotAdmin': { en: 'Only an administrator can send.', hr: 'Slati može samo administrator.' },
    'mail.errConfig': { en: 'Sending is not set up on this server yet.', hr: 'Slanje na ovom poslužitelju još nije postavljeno.' },
    'mail.errSend': { en: 'Sending failed — part of it may have gone out. Sending again with the same form will not repeat what already went.', hr: 'Slanje nije uspjelo — dio je možda otišao. Ponovno slanje iz iste forme neće ponoviti ono što je već otišlo.' },
    'mail.errGeneric': { en: 'Something went wrong. Please try again.', hr: 'Nešto je pošlo po zlu. Pokušaj ponovno.' },
    'unsub.pageTitle': { en: 'Unsubscribe — Sokrat Study', hr: 'Odjava — Sokrat Study' },
    'unsub.title': { en: 'Unsubscribe from email updates', hr: 'Odjava od obavijesti mailom' },
    'unsub.desc': { en: 'After this you will get no more Sokrat Study updates. Account emails (sign-in, password reset) still work.', hr: 'Nakon ovoga više nećeš dobivati obavijesti Sokrat Studyja. Mailovi računa (prijava, nova lozinka) i dalje rade.' },
    'unsub.button': { en: 'Unsubscribe', hr: 'Odjavi me' },
    'unsub.done': { en: 'Done — you will not get any more updates. You can turn them back on in your profile.', hr: 'Gotovo — više ti nećemo slati obavijesti. Možeš ih ponovno uključiti u profilu.' },
    'unsub.bad': { en: 'This link is not valid. Turn off updates in your profile instead.', hr: 'Ova poveznica nije valjana. Obavijesti možeš isključiti u profilu.' },
    'unsub.missing': { en: 'The link is incomplete — open it again from the email.', hr: 'Poveznica nije potpuna — otvori je ponovno iz maila.' },
    'unsub.error': { en: 'That did not work — please try again.', hr: 'Nije uspjelo — pokušaj ponovno.' },
    'unsub.back': { en: 'Back to Sokrat Study', hr: 'Natrag na Sokrat Study' },
    // F6 ①/1 — odobrenje.html (korisnikov AI traži pristup, ADR-038)
    'oauth.pageTitle': { en: 'Connect your AI — Sokrat Study', hr: 'Poveži svoj AI — Sokrat Study' },
    'oauth.title': { en: 'Connect your AI to Sokrat Study', hr: 'Poveži svoj AI sa Sokrat Studyjem' },
    'oauth.client': { en: 'App', hr: 'Aplikacija' },
    'oauth.host': { en: 'Returns to', hr: 'Vraća se na' },
    'oauth.account': { en: 'Your account', hr: 'Tvoj račun' },
    'oauth.scope': { en: 'It will be able to see your own study materials. It never sees other people\'s materials.', hr: 'Moći će vidjeti tvoje materijale za učenje. Tuđe materijale nikad ne vidi.' },
    'oauth.allow': { en: 'Allow', hr: 'Dopusti' },
    'oauth.deny': { en: 'Deny', hr: 'Odbij' },
    'oauth.signinLink': { en: 'Sign in to Sokrat Study', hr: 'Prijavi se u Sokrat Study' },
    'oauth.signin': { en: 'Sign in to Sokrat Study — we will open sign-in in a second window. Leave this page open; it continues on its own.', hr: 'Prijavi se u Sokrat Study — prijavu otvaramo u drugom prozoru. Ovu stranicu ostavi otvorenu, nastavlja sama.' },
    'oauth.signinWaiting': { en: 'Waiting for you to sign in in the other window — come back here when you are done.', hr: 'Čekam da se prijaviš u drugom prozoru — vrati se ovamo kad završiš.' },
    'oauth.signinBlocked': { en: 'Your browser blocked the new window. Open Sokrat Study in another tab, sign in there, then come back to this page.', hr: 'Preglednik je zaustavio novi prozor. Otvori Sokrat Study u drugoj kartici, prijavi se ondje i vrati se na ovu stranicu.' },
    'oauth.missing': { en: 'This link is incomplete — start connecting again from your AI app.', hr: 'Poveznica nije potpuna — pokreni povezivanje ponovno iz svoje AI aplikacije.' },
    'oauth.blocked': { en: 'This app is not one we recognise, so it cannot be connected.', hr: 'Ovu aplikaciju ne prepoznajemo, pa se ne može povezati.' },
    'oauth.noProject': { en: 'This page is running on localhost with no project selected, so it cannot connect anything. Set the staging override in this browser and reload.', hr: 'Ova stranica radi na localhostu bez odabranog projekta, pa ništa ne može povezati. Postavi prebacivanje na staging u ovom pregledniku i osvježi stranicu.' },
    'oauth.error': { en: 'That did not work — please try again.', hr: 'Nije uspjelo — pokušaj ponovno.' },
    'oauth.done': { en: 'Connected — returning to your AI app…', hr: 'Povezano — vraćamo te u tvoju AI aplikaciju…' },
    'oauth.denied': { en: 'Not connected — returning to your AI app…', hr: 'Nije povezano — vraćamo te u tvoju AI aplikaciju…' },
    // F3/1: pravne stranice (contact/faq/privacy/terms) i odjava dijele zaglavlje — tekst TIJELA
    // pravnih stranica NIJE ovdje nego u jezičnim blokovima same stranice (`.jezik[lang]`).
    'legal.lang': { en: 'Language: English / Croatian', hr: 'Jezik: hrvatski / engleski' },
    'legal.back': { en: '← Back to app', hr: '← Natrag u aplikaciju' },
    'legal.title.contact': { en: 'Contact — Sokrat Study', hr: 'Kontakt — Sokrat Study' },
    'legal.title.faq': { en: 'FAQ — Sokrat Study', hr: 'Česta pitanja — Sokrat Study' },
    'legal.title.privacy': { en: 'Privacy Policy — Sokrat Study', hr: 'Pravila privatnosti — Sokrat Study' },
    'legal.title.terms': { en: 'Terms of Use — Sokrat Study', hr: 'Uvjeti korištenja — Sokrat Study' },
    'profile.editNamePh': { en: 'Your name', hr: 'Tvoje ime' },
    'profile.editBioPh': { en: 'A short description — what you study, what you are building.', hr: 'Kratak opis — što učiš i što gradiš.' },
    // Temelj mreže (A1) — korisničko ime (`set_profile_handle`, supabase/f2-temelj-mreze.sql)
    'profile.handleLabel': { en: 'Username', hr: 'Korisničko ime' },
    'profile.handlePh': { en: 'username', hr: 'korisnicko_ime' },
    'profile.handleHint': { en: '3–20 characters: letters a–z, digits and _. You can change it once every 30 days.', hr: '3–20 znakova: slova a–z, brojke i _. Mijenja se jednom u 30 dana.' },
    'profile.handleErrInvalid': { en: 'Username: 3–20 characters — letters a–z, digits and _.', hr: 'Korisničko ime: 3–20 znakova — slova a–z, brojke i _.' },
    'profile.handleErrReserved': { en: 'That username is reserved. Please pick another one.', hr: 'To ime je rezervirano. Odaberi drugo.' },
    'profile.handleErrTaken': { en: 'That username is already taken.', hr: 'To korisničko ime je već zauzeto.' },
    'profile.handleErrCooldown': { en: 'You can change your username once every 30 days.', hr: 'Korisničko ime smiješ mijenjati jednom u 30 dana.' },
    'profile.handleErrClear': { en: 'A username can be changed, but not removed.', hr: 'Korisničko ime se može promijeniti, ali ne i obrisati.' },
    'profile.editSave': { en: 'Save', hr: 'Spremi' },
    'profile.editCancel': { en: 'Cancel', hr: 'Odustani' },
    'profile.editSaved': { en: 'Profile updated.', hr: 'Profil je spremljen.' },
    // F2/2 — profilna slika i naslovna (javan bucket; smanjivanje u pregledniku, js/profile-images.js)
    'profile.avatarLabel': { en: 'Profile photo', hr: 'Profilna slika' },
    'profile.coverLabel': { en: 'Cover image', hr: 'Naslovna slika' },
    'profile.avatarChange': { en: 'Change profile photo', hr: 'Promijeni profilnu sliku' },
    'profile.coverChange': { en: 'Edit cover', hr: 'Uredi naslovnu' },
    'profile.cropTitleAvatar': { en: 'Adjust profile photo', hr: 'Namjesti profilnu sliku' },
    'profile.cropTitleCover': { en: 'Adjust cover image', hr: 'Namjesti naslovnu' },
    'profile.cropHint': { en: 'Drag to reposition, zoom with the slider.', hr: 'Povuci za pomak, zumiraj klizačem.' },
    'profile.cropZoom': { en: 'Zoom', hr: 'Zum' },
    'profile.imgRemove': { en: 'Remove', hr: 'Ukloni' },
    'profile.imgUploading': { en: 'Uploading photo…', hr: 'Slika se šalje…' },
    'profile.imgSaved': { en: 'Photo updated.', hr: 'Slika je spremljena.' },
    'profile.imgRemoved': { en: 'Photo removed.', hr: 'Slika je uklonjena.' },
    'profile.imgErrDecode': { en: 'Could not read that file — choose a JPG, PNG or WebP image.', hr: 'Ne mogu pročitati datoteku — odaberi JPG, PNG ili WebP sliku.' },
    'profile.imgErrAuth': { en: 'Sign in again to change your photo.', hr: 'Prijavi se ponovno da promijeniš sliku.' },
    'profile.imgErrUpload': { en: 'Could not save the photo: ', hr: 'Slika nije spremljena: ' },
    // Jedna gornja traka (K2b, spec §8). Do K2b je jezik bio dohvatljiv na 4 od 9
    // stranica, pa je i sam prekidač bio dio problema koji ova cigla rješava.
    'topbar.subjects': { en: 'Subjects', hr: 'Predmeti' },
    'topbar.about': { en: 'About', hr: 'O nama' },
    'topbar.subject': { en: 'Subject', hr: 'Predmet' },
    'topbar.study': { en: 'Study', hr: 'Učenje' },
    'topbar.studio': { en: 'Studio', hr: 'Studio' },
    'topbar.back': { en: 'Go back', hr: 'Natrag' },
    'topbar.crumbs': { en: 'Breadcrumb', hr: 'Putanja' },
    // F3/2 (Leon, 16.09.): ime prekidača je NAMJERNO dvojezično u oba jezika — tko ne razumije
    // trenutni jezik, mora ipak naći gumb koji ga mijenja. Oznaka na gumbu = trenutni jezik.
    'topbar.lang': { en: 'Language / Jezik', hr: 'Jezik / Language' },
    'topbar.langCode': { en: 'EN', hr: 'HR' },

    // „Moji materijali" (F2) — osobni UGC-graditelj
    'materials.title': { en: 'My materials', hr: 'Moji materijali' },
    'materials.desc': { en: 'Build your own study material — organise it in folders however you like. Private to you.', hr: 'Gradi vlastite materijale za učenje — složi ih na police kako god želiš. Vidljivo samo tebi.' },
    // C0 (ADR-029) — vlastiti materijal ima vlastitu stranicu; neprijavljen posjetitelj nikad ne vidi prazan ekran.
    'materials.signedOutTitle': { en: 'Build your own study material', hr: 'Gradi vlastiti materijal' },
    'materials.signedOutDesc': { en: 'Your own cards, quizzes and notes — organised however you like, private to you, and synced across your devices. You need an account to start.', hr: 'Vlastite kartice, kvizovi i bilješke — složeni kako god želiš, vidljivi samo tebi i sinkronizirani među uređajima. Za početak treba račun.' },
    'materials.signedOutCta': { en: 'Sign in to start', hr: 'Prijavi se za početak' },
    'materials.new': { en: 'New', hr: 'Novo' },
    'materials.newFolder': { en: 'New folder', hr: 'Nova polica' },
    'materials.newStudy': { en: 'New material', hr: 'Novi materijal' },
    'materials.addFolderIn': { en: 'New folder inside', hr: 'Nova polica unutra' },
    'materials.addStudyIn': { en: 'New material inside', hr: 'Novi materijal unutra' },
    'materials.rename': { en: 'Rename', hr: 'Preimenuj' },
    'materials.delete': { en: 'Delete', hr: 'Obriši' },
    'materials.toggle': { en: 'Expand or collapse', hr: 'Otvori ili zatvori' },
    'materials.more': { en: 'More actions', hr: 'Više radnji' },
    'materials.move': { en: 'Move to…', hr: 'Premjesti u…' },
    'materials.moveRoot': { en: 'Top level', hr: 'Na vrh (izvan police)' },
    'materials.moveHere': { en: 'Here now', hr: 'Ovdje je' },
    'materials.moveEmpty': { en: 'There is no folder to move it to yet — create one first.', hr: 'Još nema police u koju bi ga premjestio — prvo napravi policu.' },
    'materials.moved': { en: 'Moved.', hr: 'Premješteno.' },
    'materials.loading': { en: 'Loading your materials…', hr: 'Učitavam tvoje materijale…' },
    'materials.retry': { en: 'Try again', hr: 'Pokušaj ponovno' },
    'materials.emptyTitle': { en: 'Nothing here yet', hr: 'Ovdje još nema ničega' },
    'materials.emptySub': { en: 'Create a folder to organise your studies, or a material to start building.', hr: 'Napravi policu da posložiš materijale ili odmah kreni graditi novi materijal.' },
    'materials.errLoad': { en: 'Could not load your materials.', hr: 'Ne mogu učitati tvoje materijale.' },
    'materials.errAuth': { en: 'You need to be signed in.', hr: 'Moraš biti prijavljen.' },
    'materials.errDenied': { en: 'That is not yours.', hr: 'To nije tvoje.' },
    'materials.errMissing': { en: 'That item no longer exists.', hr: 'Ta stavka više ne postoji.' },
    'materials.errDeleted': { en: 'That item is in the bin.', hr: 'Ta je stavka obrisana.' },
    'materials.errCycle': { en: 'A folder cannot be moved into itself.', hr: 'Polica se ne može premjestiti u samu sebe.' },
    'materials.errNotFolder': { en: 'Only folders can contain items.', hr: 'Samo polica može sadržavati stavke.' },
    'materials.errParentDeleted': { en: 'Restore the parent folder first.', hr: 'Prvo vrati nadređenu policu.' },
    'materials.errName': { en: 'Please enter a name.', hr: 'Upiši naziv.' },
    'materials.errKind': { en: 'Unknown item type.', hr: 'Nepoznat tip stavke.' },
    'materials.errReorder': { en: 'The list changed — please try again.', hr: 'Popis se promijenio — pokušaj ponovno.' },
    'materials.errConflict': { en: 'This was edited elsewhere. Reload and try again.', hr: 'Ovo je uređeno drugdje. Osvježi pa pokušaj ponovno.' },
    'materials.errNotStudy': { en: 'Only materials hold content, folders do not.', hr: 'Samo materijali nose sadržaj, police ne.' },
    'materials.errGeneric': { en: 'Something went wrong. Please try again.', hr: 'Nešto je pošlo po zlu. Pokušaj ponovno.' },
    'materials.errNoTable': { en: 'Not available on this environment yet.', hr: 'Još nije dostupno na ovom okruženju.' },
    'materials.drag': { en: 'Drag to move', hr: 'Povuci za premještanje' },
    'materials.phFolder': { en: 'Folder name…', hr: 'Naziv police…' },
    'materials.phStudy': { en: 'Material name…', hr: 'Naziv materijala…' },
    'materials.save': { en: 'Save', hr: 'Spremi' },
    'materials.cancel': { en: 'Cancel', hr: 'Odustani' },
    'materials.created': { en: 'Created.', hr: 'Napravljeno.' },
    'materials.renamed': { en: 'Renamed.', hr: 'Preimenovano.' },
    'materials.deleted': { en: 'Deleted.', hr: 'Obrisano.' },
    'materials.restored': { en: 'Restored.', hr: 'Vraćeno.' },
    'materials.undo': { en: 'Undo delete', hr: 'Vrati obrisano' },
    // F3 — otvaranje study-čvora u Studio editoru
    'materials.learn': { en: 'Study', hr: 'Uči' },
    'materials.open': { en: 'Edit material', hr: 'Uredi materijal' },
    'materials.errLearn': { en: 'This material cannot be opened for studying.', hr: 'Ovaj se materijal ne može otvoriti za učenje.' },
    'materials.errNoEditor': { en: 'The editor is not available here yet.', hr: 'Editor ovdje još nije dostupan.' },
    'studio.myMaterials': { en: 'My materials', hr: 'Moji materijali' },
    'studio.nodeHint': { en: 'Personal material — only you can see it.', hr: 'Osobni materijal — vidiš ga samo ti.' },
    'studio.loadingNode': { en: 'Loading your material…', hr: 'Učitavam materijal…' },
    // M4 — panel „Tvoj AI". Ovi ključevi PRIJE nisu postojali, pa je engleski korisnik gledao
    // hrvatski rezervni niz iz studio.js. Tekst opisuje ADR-026: AI dolazi s korisnikove strane.
    'studio.aiTitle': { en: 'Your AI', hr: 'Tvoj AI' },
    'studio.soon': { en: 'SOON', hr: 'USKORO' },
    'studio.aiHint': { en: 'Connect the AI you already use, hand it your notes — it puts the finished material on your shelf.', hr: 'Spoji AI koji već koristiš pa mu daj svoje bilješke — gotov materijal stavit će ti na policu.' },
    // F6 ②/5.1 — prozor „Spoji svoj AI" (js/connect-ai.js). Nazivi gumba u Claudeu/ChatGPT-u
    // ostaju na engleskom jer ih korisnik tako vidi u njihovoj aplikaciji (istraženo 03.10.).
    'connectAi.button': { en: 'Connect your AI', hr: 'Spoji svoj AI' },
    'connectAi.title': { en: 'Connect your AI', hr: 'Spoji svoj AI' },
    'connectAi.lead': { en: 'Add Sokrat to the AI you already use, once. Then ask it to build a study material from your notes — it lands on your shelf.', hr: 'Jednom dodaj Sokrat u AI koji već koristiš. Onda ga zamoli da od tvojih bilježaka napravi materijal — stići će ti na policu.' },
    'connectAi.claude1': { en: 'Open Claude and go to Customize → Connectors.', hr: 'Otvori Claude i idi na Customize → Connectors.' },
    'connectAi.claude2': { en: 'Click Add custom connector.', hr: 'Klikni Add custom connector.' },
    'connectAi.claude3': { en: 'Paste the address below and click Add.', hr: 'Zalijepi adresu ispod i klikni Add.' },
    'connectAi.claude4': { en: 'Click Connect and allow access with your Sokrat account.', hr: 'Klikni Connect i dopusti pristup svojim Sokrat računom.' },
    'connectAi.claudeNote': { en: 'Works on every Claude plan; the free plan allows one custom connector.', hr: 'Radi na svim Claude paketima; besplatni dopušta jedan vlastiti konektor.' },
    'connectAi.gpt1': { en: 'In ChatGPT open Settings → Apps → Advanced settings and turn on Developer mode.', hr: 'U ChatGPT-u otvori Settings → Apps → Advanced settings i uključi Developer mode.' },
    'connectAi.gpt2': { en: 'Click Create app.', hr: 'Klikni Create app.' },
    'connectAi.gpt3': { en: 'Paste the address below, leave Authentication on OAuth and create the app.', hr: 'Zalijepi adresu ispod, Authentication ostavi na OAuth i napravi aplikaciju.' },
    'connectAi.gpt4': { en: 'Sign in with your Sokrat account and allow access.', hr: 'Prijavi se svojim Sokrat računom i dopusti pristup.' },
    'connectAi.gptNote': { en: 'Needs ChatGPT Plus or higher. Developer mode is meant for advanced users — ChatGPT explains it before you turn it on.', hr: 'Treba ChatGPT Plus ili više. Developer mode je za naprednije korisnike — ChatGPT ga objasni prije uključivanja.' },
    'connectAi.copy': { en: 'Copy address', hr: 'Kopiraj adresu' },
    'connectAi.copied': { en: 'Address copied.', hr: 'Adresa je kopirana.' },
    'connectAi.copyManual': { en: 'Copy the selected address.', hr: 'Kopiraj označenu adresu.' },
    'connectAi.open': { en: 'Open', hr: 'Otvori' },
    'connectAi.close': { en: 'Close', hr: 'Zatvori' },
    'connectAi.other': { en: 'Connect another AI', hr: 'Spoji drugi AI' },
    // ②/5.2 — natpisi u shemi Claudeova ekrana: engleski i na HR jer ih Claude tako pokazuje.
    'connectAi.animChats': { en: 'Chats', hr: 'Chats' },
    'connectAi.animProjects': { en: 'Projects', hr: 'Projects' },
    'connectAi.animCustomize': { en: 'Customize', hr: 'Customize' },
    'connectAi.animConnectors': { en: 'Connectors', hr: 'Connectors' },
    'connectAi.animAdd': { en: 'Add custom connector', hr: 'Add custom connector' },
    'connectAi.animUrl': { en: 'Remote MCP server URL', hr: 'Remote MCP server URL' },
    'connectAi.animAddBtn': { en: 'Add', hr: 'Add' },
    'connectAi.animDone': { en: 'Connected', hr: 'Povezano' },
    'studio.addSection': { en: 'New section', hr: 'Nova sekcija' },
    'studio.newSectionName': { en: 'New section', hr: 'Nova sekcija' },
    'studio.emptyEditHint': { en: 'Empty so far. Add your first section and start writing.', hr: 'Prazno je. Dodaj prvu sekciju pa počni pisati.' },
    'studio.addSectionFail': { en: 'Could not add the section.', hr: 'Sekciju nije bilo moguće dodati.' },
    // M3b — kvadratići boje. „⊘" NIJE „bez boje" nego povratak na nasljeđivanje (UGC_SPEC §3).
    'studio.colorPick': { en: 'Section colour', hr: 'Boja sekcije' },
    'studio.colorCustom': { en: 'Custom colour', hr: 'Vlastita boja' },
    'studio.colorPickItem': { en: 'Item colour', hr: 'Boja stavke' },
    'studio.colorInherit': { en: 'Inherit the section colour', hr: 'Naslijedi boju sekcije' },
    'studio.delCat': { en: 'Delete section', hr: 'Obriši sekciju' },
    'studio.delCatTitle': { en: 'Delete this section?', hr: 'Obrisati sekciju?' },
    'studio.delCatMsg': {
      en: 'Section “{name}” and everything in it (cards, quiz, fill, learn) will be removed from the draft. You can bring it back with “Discard”.',
      hr: 'Sekcija „{name}" i sve u njoj (kartice, kviz, fill, learn) miču se iz drafta. Možeš je vratiti gumbom „Odbaci".'
    },
    'studio.del': { en: 'Delete', hr: 'Obriši' },
    'studio.delCatFail': { en: 'Could not delete the section.', hr: 'Sekciju nije bilo moguće obrisati.' },
    'materials.delTitle': { en: 'Delete this item?', hr: 'Obrisati ovu stavku?' },
    'materials.delMsg': { en: 'You can restore it right after.', hr: 'Možeš je odmah vratiti.' },
    'materials.delMsgTree': { en: 'Everything inside it will be deleted too. You can restore it right after.', hr: 'Sve unutar nje se također briše. Možeš je odmah vratiti.' },
    'profile.cloudSync': { en: 'Cloud sync', hr: 'Sinkronizacija u oblak' },
    'profile.syncAuto': { en: 'Your progress is backed up automatically while you study.', hr: 'Tvoj napredak se automatski sigurno pohranjuje dok učiš.' },
    'profile.syncNow': { en: 'Sync now', hr: 'Sinkroniziraj sada' },
    'profile.progressOverview': { en: 'Progress overview', hr: 'Pregled napretka' },
    'profile.privacyData': { en: 'Privacy & data', hr: 'Privatnost i podaci' },
    // U2 (R1-UX): brisanje je sada STVARNO — cloud + ovaj uređaj, račun ostaje.
    'profile.deleteDesc': { en: 'Delete your entire study history — from the cloud and this device. Your account stays.', hr: 'Obriši cijelu povijest učenja — iz oblaka i s ovog uređaja. Račun ostaje.' },
    'profile.deleteCloud': { en: 'Delete study history', hr: 'Obriši povijest učenja' },
    // GDPR čl. 17 — self-service brisanje računa. Do 2026-08-08 je ovdje stajalo „pošalji mail".
    'profile.deleteAccount': { en: 'Delete account', hr: 'Obriši račun' },
    'profile.deleteAccountDesc': {
        en: 'Delete your account permanently. Everything goes: your progress, your materials and their images. This cannot be undone.',
        hr: 'Trajno obriši svoj račun. Ide sve: napredak, tvoji materijali i njihove slike. To se ne može poništiti.'
    },
    'profile.deleteAccountType': { en: 'Type DELETE to confirm', hr: 'Upiši DELETE za potvrdu' },
    'profile.deleteAccountGo': { en: 'Delete my account forever', hr: 'Obriši moj račun zauvijek' },
    'profile.deleteAccountMismatch': { en: 'Type DELETE exactly to confirm.', hr: 'Upiši točno DELETE za potvrdu.' },
    'profile.deleteAccountTitle': { en: 'Delete account permanently?', hr: 'Trajno obrisati račun?' },
    'profile.deleteAccountConfirm': {
        en: 'Your account, progress, materials and images will be deleted for good. This cannot be undone.',
        hr: 'Tvoj račun, napredak, materijali i slike bit će obrisani zauvijek. To se ne može poništiti.'
    },
    'profile.deleteAccountWorking': { en: 'Deleting your account…', hr: 'Brišem tvoj račun…' },
    'profile.deleteAccountFail': { en: 'Could not delete the account: ', hr: 'Račun se nije mogao obrisati: ' },
    'profile.deleteAccountAdmin': {
        en: 'An administrator cannot delete their own account — the public catalogue images belong to it.',
        hr: 'Administrator ne može obrisati vlastiti račun — na njemu vise slike javnog kataloga.'
    },
    'profile.deleteAccountStorage': { en: 'Your images could not be removed. Nothing was deleted.', hr: 'Tvoje slike se nisu mogle ukloniti. Ništa nije obrisano.' },
    'profile.deleteAccountAuth': { en: 'You are not signed in.', hr: 'Nisi prijavljen.' },
    'profile.deleteAccountDone': { en: 'Your account has been deleted.', hr: 'Tvoj račun je obrisan.' },
    'profile.noActivity': { en: 'No study activity yet — open a subject and start learning!', hr: 'Još nema aktivnosti — otvori predmet i počni učiti!' },
    'profile.cardsLearned': { en: 'cards learned', hr: 'naučenih kartica' },
    'profile.quizzesTaken': { en: 'quizzes taken', hr: 'odrađenih kvizova' },
    'profile.fillSolved': { en: 'fill-ins solved', hr: 'riješenih dopuna' },
    'profile.tip.cards': { en: 'Flashcards learned', hr: 'Naučene kartice' },
    'profile.tip.quizzes': { en: 'Quizzes taken', hr: 'Odrađeni kvizovi' },
    'profile.tip.fill': { en: 'Fill-in exercises solved', hr: 'Riješene dopune' },
    'profile.avg': { en: 'avg', hr: 'prosj.' },

    // Lessons / Study chrome (dinamički iz navigation.js)
    'breadcrumb.lessons': { en: 'Lessons', hr: 'Lekcije' },
    'lesson.fallback': { en: 'Lesson', hr: 'Lekcija' },
    'toast.comingSoon': { en: 'Second Midterm is coming soon.', hr: 'Drugi kolokvij uskoro.' },
    'lesson.comingSoonBadge': { en: 'coming soon', hr: 'uskoro' },
    // P1 (POLICA) — skidanje predmeta na uređaj. Gumb nosi RADNJU, `offline.ready`
    // je stanje uz njega; zato „Ukloni s uređaja" i „Dostupno offline" nisu isti ključ.
    'offline.download': { en: 'Download for offline', hr: 'Skini za offline' },
    'offline.working': { en: 'Downloading…', hr: 'Skidam…' },
    'offline.ready': { en: 'Available offline', hr: 'Dostupno offline' },
    'offline.remove': { en: 'Remove from device', hr: 'Ukloni s uređaja' },
    'offline.done': { en: 'Saved to device', hr: 'Spremljeno na uređaj' },
    'offline.removed': { en: 'Removed from device', hr: 'Uklonjeno s uređaja' },
    'offline.failed': { en: 'Download failed — nothing was saved', hr: 'Skidanje nije uspjelo — ništa nije spremljeno' },
    // P3: skinuto ne zastarijeva samo (kes `sokrat-offline` prezivi deploy), pa
    // stanje mora biti VIDLJIVO. Osvjezavanje je na dodir -- nikad automatsko.
    'offline.stale': { en: 'Outdated version on device', hr: 'Zastarjela verzija na uređaju' },
    'offline.refresh': { en: 'Refresh', hr: 'Osvježi' },
    'offline.refreshed': { en: 'Updated to the latest version', hr: 'Osvježeno na najnoviju verziju' },
    // P2 (POLICA) — drugi izvor police: skinuti predmeti.
    'shelf.title': { en: 'Downloaded for offline', hr: 'Skinuto za offline' },
    'shelf.empty': { en: 'Nothing downloaded yet. Open a subject and choose “Download for offline”.', hr: 'Još ništa nije skinuto. Otvori predmet i odaberi „Skini za offline”.' },
    'shelf.lastStudy': { en: 'Last studied', hr: 'Zadnje učenje' },
    'shelf.notStarted': { en: 'Not started yet', hr: 'Još nedirnuto' },
    'toast.loadError': { en: 'Could not load this subject. Please try again.', hr: 'Učitavanje predmeta nije uspjelo. Pokušaj ponovno.' },

    // Razno
    'loading.subject': { en: 'Loading subject…', hr: 'Učitavanje predmeta…' }
  };

  const HR_PROGRAM = 'hospitality-management-hr';
  const LS_KEY = 'sokrat-ui-lang';   // GLOBALNI izbor jezika sučelja (master); sadržaj se NE dira

  function readStored() {
    try { const v = localStorage.getItem(LS_KEY); return (v === 'hr' || v === 'en') ? v : null; } catch (_) { return null; }
  }
  // Početni jezik = spremljeni izbor korisnika, inače jezik UREĐAJA (F3/2 cigla 3). Pravilo „koji
  // uređaj je hrvatski" zna samo `boot.js`; bez boota (sandbox) ostaje engleski.
  /** @type {'en' | 'hr'} */
  let uiLang = readStored()
    || (typeof window.__sokratJezikUredjaja === 'function' ? window.__sokratJezikUredjaja() : 'en');

  /** @param {string} key @returns {string} */
  function t(key) {
    const e = DICT[key];
    if (!e) return key;                       // nepoznat ključ → vrati ključ (vidljivo u dev-u)
    return e[uiLang] != null ? e[uiLang] : (e.en != null ? e.en : key);
  }

  // Postavi tekst svih [data-i18n] / [data-i18n-placeholder|-value|-aria|-title] + precrtaj liste.
  /** @param {Document | Element} [root] */
  function applyTranslations(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key) el.textContent = t(key);
    });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key) el.setAttribute('placeholder', t(key));
    });
    // C2 — POČETNA vrijednost polja (živi prikaz na landingu piše primjer u polje, ne u
    // placeholder, jer se iz njega odmah crtaju sva četiri moda).
    // ⚠️ `data-touched` je brana, ne uljepšavanje: bez nje bi prebacivanje jezika obrisalo
    // rečenicu koju je posjetitelj upravo upisao. Prevodi se samo NETAKNUT primjer.
    scope.querySelectorAll('[data-i18n-value]').forEach((node) => {
      const el = /** @type {HTMLInputElement | HTMLTextAreaElement} */ (node);
      const key = el.getAttribute('data-i18n-value');
      if (key && el.dataset.touched !== '1') el.value = t(key);
    });
    // a11y (F3 3E): lokaliziraj aria-label za ikone-gumbe bez vidljivog teksta (npr. flashcard prev/next).
    scope.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (key) el.setAttribute('aria-label', t(key));
    });
    // F3/2: tooltip (`title`) — do tada je gumb za jezik nosio engleski title bez lijeka.
    scope.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (key) el.setAttribute('title', t(key));
    });
    // Oznaka prekidača (`.lang-toggle-label`) do F3/2 je imala zaseban pisac ovdje, mimo
    // rječnika; sad nosi `data-i18n="topbar.langCode"` kao svaki drugi tekst.
    // auth nav-gumb ima dinamičan tekst (ime / „Sign in") → prepusti njemu da se osvježi
    if (typeof window.refreshAuthNav === 'function') window.refreshAuthNav();
    // Liste renderirane iz catalog-a (innerHTML) ne hvataju [data-i18n] → re-renderiraj ih na promjenu jezika.
    if (typeof window.renderSubjectsSidebar === 'function') window.renderSubjectsSidebar();
    // Gumbi filtra nose ime programa i riječ „Svi" → i oni se moraju precrtati na
    // promjenu jezika, inače traka ostane na starom jeziku dok se mreža ispod prevede.
    if (typeof window.renderCatalogPrograms === 'function') window.renderCatalogPrograms();
    if (typeof window.renderLandingSubjects === 'function') window.renderLandingSubjects();
    // K2b: mrvicu crta JavaScript u `textContent` (nikad `innerHTML`), pa je `[data-i18n]`
    // ne dohvaća — mora se precrtati kao i ostale liste iz kataloga.
    if (typeof window.renderPathbar === 'function') window.renderPathbar();
    // F3/2: poruke slijepe karte ovise o STANJU (odabrane koordinate, završni rezultat) → precrtaj
    // ih iz stanja. Kuka postoji tek kad je paket `blind-map` učitan.
    if (typeof window.renderBlindMapText === 'function') window.renderBlindMapText();
    const bp = document.getElementById('browse-page');
    if (bp && bp.classList.contains('active') && typeof window.renderBrowse === 'function') window.renderBrowse();
    // Profil je renderiran innerHTML-om (ne hvata [data-i18n]) → re-renderiraj ako je otvoren.
    // F3/2 cigla 4c: kroz `renderProfileText`, koji vrati otvorene forme i ono što korisnik piše.
    const pp = document.getElementById('profile-page');
    if (pp && pp.classList.contains('active') && typeof window.renderProfileText === 'function') window.renderProfileText();
    // F3/2 cigla 4d: „Moji materijali" (stablo, traka, unos) i polica crtaju se JS-om iz već učitanih
    // podataka → precrtaj ih bez mreže. Kuke postoje tek kad je paket `materials` učitan.
    const mp = document.getElementById('materials-page');
    if (mp && mp.classList.contains('active')) {
      if (typeof window.renderMaterialsText === 'function') window.renderMaterialsText();
      if (typeof window.renderShelfText === 'function') window.renderShelfText();
    }
  }

  // Postavi jezik sučelja. persist=true → zapamti kao globalni izbor (default).
  /** @param {string} lang @param {boolean} [persist] @returns {boolean} */
  function setUiLang(lang, persist) {
    const next = lang === 'hr' ? 'hr' : 'en';
    const changed = next !== uiLang;
    uiLang = next;
    // F3/1: `lang` + `data-ui-lang` postavlja `boot.js` (jedno mjesto; `data-ui-lang` bira blok
    // pravne stranice). Bez boota (npr. test u sandboxu) ostaje barem `lang`.
    if (typeof window.__sokratPrimijeniJezik === 'function') window.__sokratPrimijeniJezik(uiLang);
    else document.documentElement.setAttribute('lang', uiLang);
    if (persist !== false) { try { localStorage.setItem(LS_KEY, uiLang); } catch (_) { /* ignore */ } }
    // uvijek primijeni (i kad nema promjene) — npr. inicijalno bojanje toggle-labela
    applyTranslations();
    return changed;
  }

  // Globalni toggle: HR ↔ EN (korisnikov eksplicitni izbor → pamti se).
  function toggleUiLang() { setUiLang(uiLang === 'hr' ? 'en' : 'hr', true); }

  // Blagi prijedlog: ako korisnik NIJE eksplicitno birao jezik, a otvara HR program →
  // predloži hrvatsko sučelje (i zapamti). Ako je već birao, toggle je gospodar → ništa.
  /** @param {string} [subjectId] */
  function suggestLangForSubject(subjectId) {
    if (readStored()) return;                 // korisnik je već odlučio → ne diraj
    if (subjectId && typeof SokratCatalog !== 'undefined') {
      const s = SokratCatalog.getSubject(subjectId);
      if (s && SokratCatalog.isInProgram(s, HR_PROGRAM)) setUiLang('hr', true);
    }
  }

  // Primijeni spremljeni jezik na prvo bojanje (da persistirani HR odmah uhvati sve [data-i18n]).
  //
  // ⚠️ IDE KROZ `setUiLang`, NE KROZ GOLI `applyTranslations` (2026-08-24). Do danas je
  // ovdje stajao goli poziv, pa se tekst prevodio, ali je `<html lang>` OSTAJAO `en` —
  // atribut se postavlja jedino u `setUiLang`, a nju boot nije zvao. Posljedica: korisnik
  // koji je jednom odabrao 🇭🇷 dobivao je hrvatski tekst pod engleskom deklaracijom na
  // SVAKOJ stranici i pri svakom posjetu, sve dok ponovno ne pritisne prekidač — a čitač
  // ekrana tada hrvatske rečenice izgovara engleskim glasovima (WCAG 3.1.1).
  // ⚠️ Nijedan gate to nije mogao vidjeti: axe provjerava da `lang` POSTOJI i da je valjan,
  // a `en` je oboje — samo nije istina. `persist: false` jer ovo nije korisnikov izbor
  // nego primjena već zapamćenog.
  const primijeniSpremljeni = function () { setUiLang(uiLang, false); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', primijeniSpremljeni);
  } else { primijeniSpremljeni(); }

  // Jezični gumb je nosio onclick atribut; CSP (D1) ga zabranjuje. Vezan OVDJE (ne u
  // navigation.js) jer editor.html nema navigation.js, a i18n.js je na objema stranicama.
  document.addEventListener('click', function (e) {
    var btn = e.target instanceof Element ? e.target.closest('[data-action="toggleUiLang"]') : null;
    if (!btn) return;
    e.preventDefault();
    toggleUiLang();
  });

  // Globalno
  window.t = t;
  window.applyTranslations = applyTranslations;
  window.setUiLang = setUiLang;
  window.toggleUiLang = toggleUiLang;
  window.suggestLangForSubject = suggestLangForSubject;
  // natrag-kompatibilnost: stari poziv setUiLangForSubject sad samo „predloži"
  window.setUiLangForSubject = suggestLangForSubject;
  window.getUiLang = function () { return uiLang; };
})();
