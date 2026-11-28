// ===== SOKRAT STUDY — FILL IN THE BLANK =====
//
// D2 (2026-08-25): rečenica smije imati VIŠE praznina. Model: `answer` je i dalje OBAVEZAN i drži
// PRVI odgovor, a `answers` (2+) dolazi uz njega. Nije redundancija nego namjerna degradacija:
// stara, keširana verzija ove skripte (immutable cache + SW) i dalje pročita `answer` i pokaže
// smislenu rečenicu s jednom prazninom umjesto da pukne.
//
// Prikaz: JEDNA praznina = zatečeno sučelje (vanjsko polje) — NETAKNUTO, jer `fill-blanks-section.css`
// ionako prepisuje cigla C5a. Od DVIJE praznine nadalje polje se seli U REČENICU, na mjesto praznine.

let fillListenersInitialized = false;

const FILL_MARK = '_______'; // isti marker kao editor (js/admin-editors.js) i shema

/** Točni odgovori kao NIZ — `answers` ako postoji, inače `[answer]`. Ocjenjivanje ima jedan izvor. */
function fillAnswersOf(q) {
  if (!q) return [];
  if (Array.isArray(q.answers) && q.answers.length) {
    return q.answers.map(function (a) { return String(a == null ? '' : a); });
  }
  return (q.answer == null) ? [] : [String(q.answer)];
}

/** Koliko praznina rečenica ima. */
function fillBlankCount(sentence) {
  return String(sentence == null ? '' : sentence).split(FILL_MARK).length - 1;
}

/**
 * Rečenica → HTML. `mode`: 'plain' (praznina je <span>) ili 'inputs' (praznina je <input>).
 * ⚠️ BUG-025: escape ide PRVI, na SVAKI komad teksta, pa se tek onda ubacuje naš markup —
 * obrnutim redom bi escape pojeo i naš <span>/<input>.
 */
function fillSentenceHtml(sentence, escFn, mode, labelFn) {
  const esc = (typeof escFn === 'function') ? escFn : function () { return ''; };
  const label = (typeof labelFn === 'function') ? labelFn : function (i) { return 'Blank ' + (i + 1); };
  const parts = String(sentence == null ? '' : sentence).split(FILL_MARK);
  let out = esc(parts[0]);
  for (let i = 1; i < parts.length; i++) {
    out += (mode === 'inputs')
      ? '<input type="text" class="fill-blank-input" data-blank="' + (i - 1) +
        '" autocomplete="off" aria-label="' + esc(label(i - 1)) + '">'
      : '<span class="blank">' + FILL_MARK + '</span>';
    out += esc(parts[i]);
  }
  return out;
}

/**
 * Ocjena PO PRAZNINI. Vraća { per: [bool…], all: bool }.
 * BUG-014 vrijedi za svaku prazninu posebno: prazan unos NIKAD nije točan.
 */
function gradeFill(inputs, answers) {
  const ins = Array.isArray(inputs) ? inputs : [inputs];
  const ans = Array.isArray(answers) ? answers : [answers];
  const per = ans.map(function (a, i) {
    const v = String(ins[i] == null ? '' : ins[i]).trim();
    return v.length > 0 && normFill(v) === normFill(a);
  });
  return { per: per, all: per.length > 0 && per.every(Boolean) };
}

// Izvoz za node-test (tests/unit/fill-blank-format.test.js).
if (typeof window !== 'undefined') {
  window.SokratFill = {
    MARK: FILL_MARK, answersOf: fillAnswersOf, count: fillBlankCount,
    sentenceHtml: fillSentenceHtml, grade: gradeFill
  };
}

function initFill() {
    const fill = AppState.fill;
    // BUG-056 — v. `initFlashcards`: filtar se PREDAJE, da ga ne naslijedi i napredak.
    fill.questions = getAllFillQuestions(typeof aktivnaKategorija === 'function' ? aktivnaKategorija() : null);
    shuffleArray(fill.questions);
    fill.index = 0;
    fill.correct = 0;
    fill.wrong = 0;
    
    showFillQuestion();
    updateFillProgress();
    updateFillStats();
    
    // Only add event listeners once to prevent duplicates
    if (!fillListenersInitialized) {
        document.getElementById('checkFill').addEventListener('click', checkFillAnswer);
        document.getElementById('fillInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkFillAnswer();
        });
        // D2: praznine u rečenici su polja tek od DVIJE — delegat, jer se rade pri svakom pitanju.
        document.getElementById('fillSentence').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target && e.target.classList.contains('fill-blank-input')) checkFillAnswer();
        });
        document.getElementById('btnHint').addEventListener('click', showHint);
        document.getElementById('btnSkip').addEventListener('click', skipFill);
        document.getElementById('btnNextFill').addEventListener('click', nextFill);
        fillListenersInitialized = true;
    }
}

/**
 * Sve dopune lekcije, ili samo one jedne kategorije.
 * @param {string|null} [samoKategorija] ključ kategorije; izostavljeno/`null` = cijela lekcija.
 */
function getAllFillQuestions(samoKategorija) {
    const content = AppState.nav.data;
    if (!content) return [];
    let all = [];
    getCategories(content).forEach(category => {
        if (samoKategorija && category !== samoKategorija) return;
        if (content[category].fillBlanks) {
            content[category].fillBlanks.forEach(q => {
                all.push({
                    ...q,
                    category: category,
                    categoryName: content[category].name,
                    catColor: content[category].color   // M3b: akcent sekcije (dopuna ga smije pregaziti)
                });
            });
        }
    });
    return all;
}

function showFillQuestion() {
    const fill = AppState.fill;
    if (!fill.questions || fill.questions.length === 0) {
        document.getElementById('fillSentence').innerHTML = '<p style="color: var(--color-ink-2);">No fill-in-the-blank questions available for this lesson.</p>';
        document.getElementById('fillInput').disabled = true;
        document.getElementById('checkFill').disabled = true;
        return;
    }

    if (fill.index >= fill.questions.length) {
        showToast(typeof t === 'function' ? t('fill.completed') : 'You completed all Fill-in-the-blank questions!');
        fill.index = 0;
        shuffleArray(fill.questions);
    }

    const q = fill.questions[fill.index];

    // M3b: akcent dopune — vlastita boja, inače naslijeđena od sekcije (UGC_SPEC §3).
    if (window.SokratBlocks && typeof SokratBlocks.applyAccent === 'function') {
        SokratBlocks.applyAccent(document.querySelector('#fill .fill-card'), [q.color, q.catColor]);
    }

    document.getElementById('fillCategory').textContent = q.categoryName;
    
    // BUG-025: rečenica ide u `innerHTML` (praznina je `<span>`), pa se tekst MORA escapati —
    // inače `<` iz formule preglednik pročita kao početak taga i pojede dio rečenice. Escape ide
    // PRVI, pa se tek onda ubaci naš `<span>`: obrnutim redom bi escape pojeo i njega.
    const fEsc = (window.SokratBlocks && typeof SokratBlocks.esc === 'function') ? SokratBlocks.esc : function () { return ''; };
    // D2: od DVIJE praznine polje ide u rečenicu; jedna praznina zadržava zatečeno vanjsko polje.
    const nBlanks = fillBlankCount(q.sentence);
    const inline = nBlanks > 1;
    const trBlank = (i) => (typeof t === 'function' ? t('fill.blankLabel') : 'Blank') + ' ' + (i + 1);
    document.getElementById('fillSentence').innerHTML =
        fillSentenceHtml(q.sentence, fEsc, inline ? 'inputs' : 'plain', trBlank);

    // ADR-009: render LaTeX in the sentence (a formula with a blank renders around it).
    if (typeof renderMath === 'function') renderMath(document.getElementById('fillSentence'));

    document.getElementById('fillInput').value = '';
    document.getElementById('fillInput').hidden = inline;
    document.getElementById('fillInput').disabled = false;
    document.getElementById('checkFill').disabled = false;
    document.getElementById('fillFeedback').classList.add('hidden');
    document.getElementById('fillHint').classList.add('hidden');
    document.getElementById('btnNextFill').classList.add('hidden');
    document.getElementById('btnSkip').classList.remove('hidden');
    document.getElementById('btnHint').classList.remove('hidden');
}

// Crtica ↔ razmak su ekvivalentni; višestruki razmaci kolabiraju (npr. "long-term" == "long term").
function normFill(s) { return String(s).trim().toLowerCase().replace(/[-\s]+/g, ' ').trim(); }

function checkFillAnswer() {
    const fill = AppState.fill;
    const q = fill.questions[fill.index];
    const answers = fillAnswersOf(q);
    // D2: unos je ondje gdje su praznine — u rečenici (2+) ili u vanjskom polju (1).
    const nodes = Array.prototype.slice.call(document.querySelectorAll('#fillSentence .fill-blank-input'));
    const inputs = nodes.length
        ? nodes.map(function (el) { return el.value; })
        : [document.getElementById('fillInput').value];

    const feedback = document.getElementById('fillFeedback');
    feedback.classList.remove('hidden', 'correct', 'wrong');

    // BUG-014: prazan unos NIKAD nije točan — i to vrijedi PO PRAZNINI. (Stari `correct.includes(input)`
    // je za input="" uvijek bio true — svaki string sadrži prazan string — pa je prazno + Provjeri
    // ispadalo „Correct!". Taj substring-uvjet je i inače prelabav → zamijenjen pravim podudaranjem.)
    const res = gradeFill(inputs, answers);
    const isCorrect = res.all;

    // Rečenica se ne ocjenjuje samo skupno: svaka praznina pokaže svoju sudbinu.
    nodes.forEach(function (el, i) {
        el.classList.remove('is-ok', 'is-bad');
        el.classList.add(res.per[i] ? 'is-ok' : 'is-bad');
        el.disabled = true;
    });

    const tr = (k, fb) => (typeof t === 'function' ? t(k) : fb);
    if (isCorrect) {
        feedback.classList.add('correct');
        document.getElementById('feedbackText').innerHTML = '<i class="fas fa-check-circle"></i> ' + tr('fill.correct', 'Correct!');
        fill.correct++;
        progress.fillSolved++;
        trackFillExercise();
    } else {
        feedback.classList.add('wrong');
        document.getElementById('feedbackText').innerHTML = '<i class="fas fa-times-circle"></i> ' + tr('fill.wrong', 'Wrong!');
        fill.wrong++;
    }

    document.getElementById('correctFillAnswer').textContent = answers.join(' · ');

    // ADR-009: render LaTeX in the revealed correct answer (if it is a formula).
    if (typeof renderMath === 'function') renderMath(document.getElementById('fillFeedback'));

    document.getElementById('fillInput').disabled = true;
    document.getElementById('checkFill').disabled = true;
    document.getElementById('btnNextFill').classList.remove('hidden');
    document.getElementById('btnSkip').classList.add('hidden');
    document.getElementById('btnHint').classList.add('hidden');
    
    updateFillStats();
    saveProgress();
}

function showHint() {
    const fill = AppState.fill;
    const hint = fill.questions[fill.index].hint;
    document.getElementById('hintText').textContent = hint;
    document.getElementById('fillHint').classList.remove('hidden');
}

function skipFill() {
    AppState.fill.wrong++;
    updateFillStats();
    nextFill();
}

function nextFill() {
    AppState.fill.index++;
    showFillQuestion();
    updateFillProgress();
}

function updateFillProgress() {
    const fill = AppState.fill;
    const prog = `${fill.index + 1} / ${fill.questions.length}`;
    document.getElementById('fillProgress').textContent = prog;

    const percent = ((fill.index + 1) / fill.questions.length) * 100;
    document.getElementById('fillProgressBar').style.width = `${percent}%`;
}

function updateFillStats() {
    // 'fillCorrect'/'fillWrong' OVDJE su DOM id-jevi (index.html), ne stare varijable.
    document.getElementById('fillCorrect').textContent = AppState.fill.correct;
    document.getElementById('fillWrong').textContent = AppState.fill.wrong;
}
