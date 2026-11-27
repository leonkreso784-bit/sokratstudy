// ===== SOKRAT STUDY — QUIZ =====

/**
 * BUG-025 — tekst stavke koji ide u `innerHTML` MORA biti escapan.
 *
 * Nije samo sigurnosno pitanje (u osobnom materijalu tekst tipka korisnik): u KATALOGU je već
 * radilo štetu. `\(P(Z<z)\)` preglednik iz `innerHTML` pročita kao POČETAK TAGA (`<z…`) i pojede
 * sve do prvog `>`, pa su tri ponuđena odgovora izgledala identično skraćeno — pitanje se nije
 * moglo riješiti. Escape to rješava, a KaTeX ostaje netaknut: `&lt;` se u DOM-u vrati kao tekst
 * `<`, a `renderMath()` radi nad tekstom (i trči POSLIJE umetanja).
 *
 * Jedna definicija za sve (ADR-027) — ista koju koristi `blocks-renderer.js`, koji se u
 * `index.html` učitava PRIJE ovog fajla. Ako ga nema, prazno je jedini fail-safe ishod.
 */
function qEsc(s) {
    return (window.SokratBlocks && typeof SokratBlocks.esc === 'function') ? SokratBlocks.esc(s) : '';
}

function startQuiz() {
    const quiz = AppState.quiz;
    const count = document.getElementById('questionCount').value;
    const category = document.getElementById('quizCategory').value;

    quiz.questions = getQuizQuestions(category, count);
    shuffleArray(quiz.questions);

    quiz.index = 0;
    quiz.correct = 0;
    quiz.wrong = 0;
    quiz.wrongList = [];
    quiz.answers = [];
    quiz.startTime = Date.now();

    // Pre-shuffle options for every question so they stay stable when revisiting
    quiz.questions.forEach(q => {
        const opts = q.options.map((option, index) => ({
            text: option,
            originalIndex: index
        }));
        shuffleArray(opts);
        q._shuffledOptions = opts;
        q._shuffledCorrectIndex = opts.findIndex(o => o.originalIndex === q.correct);
    });
    
    document.getElementById('quizSetup').classList.add('hidden');
    document.getElementById('quizGame').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    
    showQuestion();
}

function getQuizQuestions(category, count) {
    const content = AppState.nav.data;
    if (!content) return [];
    let questions = [];

    if (category === 'all') {
        getCategories(content).forEach(cat => {
            if (content[cat] && content[cat].quiz && Array.isArray(content[cat].quiz)) {
                content[cat].quiz.forEach(q => {
                    questions.push({
                        ...q,
                        category: cat,
                        categoryName: content[cat].name,
                        catColor: content[cat].color   // M3b: akcent sekcije (pitanje ga smije pregaziti)
                    });
                });
            }
        });
    } else {
        if (content[category] && content[category].quiz && Array.isArray(content[category].quiz)) {
            content[category].quiz.forEach(q => {
                questions.push({
                    ...q,
                    category: category,
                    categoryName: content[category].name,
                    catColor: content[category].color   // M3b
                });
            });
        }
    }
    
    if (count !== 'all') {
        questions = questions.slice(0, parseInt(count));
    }
    
    return questions;
}

function showQuestion() {
    const quiz = AppState.quiz;
    if (quiz.index >= quiz.questions.length) {
        endQuiz();
        return;
    }

    const q = quiz.questions[quiz.index];
    const answered = quiz.answers[quiz.index];

    document.getElementById('quizProgress').textContent =
        `${(typeof t === 'function' ? t('quiz.question') : 'Question')} ${quiz.index + 1}/${quiz.questions.length}`;

    const percent = ((quiz.index + 1) / quiz.questions.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${percent}%`;
    
    // M3b: akcent pitanja — vlastita boja, inače naslijeđena od sekcije (UGC_SPEC §3).
    if (window.SokratBlocks && typeof SokratBlocks.applyAccent === 'function') {
        SokratBlocks.applyAccent(document.querySelector('#quizGame .question-card'), [q.color, q.catColor]);
    }

    document.getElementById('questionCategory').textContent = q.categoryName;
    document.getElementById('questionText').textContent = q.question;

    const existingImage = document.getElementById('questionImage');
    if (existingImage) existingImage.remove();

    // F6 ②/0c: adresa slike iz PODATAKA kroz istu provjeru sheme kao renderer (`learn.image` je već
    // tako). Odbijena ili neučitan renderer = bez slike (fail closed); pitanje se i dalje prikazuje.
    const imgSrc = (q.image && window.SokratBlocks && typeof SokratBlocks.safeUrl === 'function')
        ? SokratBlocks.safeUrl(q.image, { image: true }) : '';
    if (imgSrc) {
        const img = document.createElement('img');
        img.id = 'questionImage';
        img.className = 'quiz-question-image';
        img.src = imgSrc;
        img.alt = q.imageAlt || 'Quiz question image';
        img.loading = 'lazy';
        document.getElementById('questionText').insertAdjacentElement('afterend', img);
    }
    
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    
    // Use pre-shuffled options
    const optionsWithIndex = q._shuffledOptions;
    quiz.shuffledOptions = optionsWithIndex;
    quiz.shuffledCorrectIndex = q._shuffledCorrectIndex;
    
    const letters = ['A', 'B', 'C', 'D'];
    optionsWithIndex.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[index]}</span><span>${qEsc(option.text)}</span>`;
        
        if (answered) {
            // Reviewing a previously answered question
            btn.classList.add('disabled');
            if (index === q._shuffledCorrectIndex) {
                btn.classList.add('correct');
            }
            if (index === answered.selected && !answered.isCorrect) {
                btn.classList.add('wrong');
            }
        } else {
            btn.addEventListener('click', () => selectAnswer(index));
        }
        container.appendChild(btn);
    });
    
    document.getElementById('correctCount').textContent = quiz.correct;
    document.getElementById('wrongCount').textContent = quiz.wrong;

    // Update nav buttons
    updateQuizNavButtons();

    // ADR-009: render LaTeX in the question text and answer options.
    if (typeof renderMath === 'function') renderMath(document.getElementById('quizGame'));
}

function updateQuizNavButtons() {
    const quiz = AppState.quiz;
    const prevBtn = document.getElementById('quizPrevBtn');
    const nextBtn = document.getElementById('quizNextBtn');
    if (!prevBtn || !nextBtn) return;

    // Show prev if not on first question
    prevBtn.style.display = quiz.index > 0 ? '' : 'none';

    // Show next only if current question is answered and there are more questions
    const answered = quiz.answers[quiz.index];
    if (answered && quiz.index < quiz.questions.length - 1) {
        nextBtn.style.display = '';
    } else {
        nextBtn.style.display = 'none';
    }
}

function quizPrev() {
    const quiz = AppState.quiz;
    if (quiz.index > 0) {
        quiz.index--;
        showQuestion();
    }
}

function quizNext() {
    const quiz = AppState.quiz;
    if (quiz.index < quiz.questions.length - 1) {
        quiz.index++;
        showQuestion();
    }
}

function selectAnswer(selected) {
    const quiz = AppState.quiz;
    // Prevent double-answering
    if (quiz.answers[quiz.index]) return;

    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.add('disabled'));

    const isCorrect = selected === quiz.shuffledCorrectIndex;

    if (isCorrect) {
        buttons[selected].classList.add('correct');
        quiz.correct++;
    } else {
        buttons[selected].classList.add('wrong');
        buttons[quiz.shuffledCorrectIndex].classList.add('correct');
        quiz.wrong++;

        quiz.wrongList.push({
            question: quiz.questions[quiz.index].question,
            yourAnswer: quiz.shuffledOptions[selected].text,
            correctAnswer: quiz.shuffledOptions[quiz.shuffledCorrectIndex].text
        });
    }

    // Store answer
    quiz.answers[quiz.index] = {
        selected: selected,
        isCorrect: isCorrect
    };

    trackQuizAnswer(isCorrect, quiz.questions[quiz.index].category || 'general');

    document.getElementById('correctCount').textContent = quiz.correct;
    document.getElementById('wrongCount').textContent = quiz.wrong;

    // Auto-advance after delay
    setTimeout(() => {
        quiz.index++;
        showQuestion();
    }, 1500);
}

function endQuiz() {
    const quiz = AppState.quiz;
    const totalTime = Math.floor((Date.now() - quiz.startTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    const score = Math.round((quiz.correct / quiz.questions.length) * 100);
    
    document.getElementById('quizGame').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    
    document.getElementById('finalScore').textContent = `${score}%`;
    document.getElementById('finalCorrect').textContent = quiz.correct;
    document.getElementById('finalWrong').textContent = quiz.wrong;
    document.getElementById('totalTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    const tr = (k, fb) => (typeof t === 'function' ? t(k) : fb);
    let icon, title, message;
    if (score >= 90) {
        icon = '🏆'; title = tr('quiz.res.perfect.t', 'Excellent!'); message = tr('quiz.res.perfect.m', 'Perfect knowledge!');
    } else if (score >= 70) {
        icon = '🎉'; title = tr('quiz.res.great.t', 'Great!'); message = tr('quiz.res.great.m', 'Very good!');
    } else if (score >= 50) {
        icon = '👍'; title = tr('quiz.res.good.t', 'Good!'); message = tr('quiz.res.good.m', 'Keep practicing!');
    } else {
        icon = '📚'; title = tr('quiz.res.ok.t', 'Need more study'); message = tr('quiz.res.ok.m', 'Review the material and try again!');
    }
    
    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsMessage').textContent = message;
    
    // 'wrongAnswersList' OVDJE je DOM id (index.html), ne stara varijabla.
    const wrongList = document.getElementById('wrongAnswersList');
    wrongList.innerHTML = '';

    if (quiz.wrongList.length > 0) {
        document.getElementById('wrongAnswersReview').style.display = 'block';
        quiz.wrongList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wrong-answer-item';
            div.innerHTML = `
                <p><strong>Question:</strong> ${qEsc(item.question)}</p>
                <p class="your-answer"><strong>Your answer:</strong> ${qEsc(item.yourAnswer)}</p>
                <p class="correct-answer-review"><strong>Correct answer:</strong> ${qEsc(item.correctAnswer)}</p>
            `;
            wrongList.appendChild(div);
        });
    } else {
        document.getElementById('wrongAnswersReview').style.display = 'none';
    }

    // ADR-009: render LaTeX in the wrong-answers review.
    if (typeof renderMath === 'function') renderMath(document.getElementById('quizResults'));

    progress.quizScores.push(score);
    progress.lastStudy = new Date().toISOString();
    saveProgress();

    trackQuizComplete(quiz.correct, quiz.questions.length);
}

function retryQuiz() {
    const quiz = AppState.quiz;
    quiz.index = 0;
    quiz.correct = 0;
    quiz.wrong = 0;
    quiz.wrongList = [];
    quiz.answers = [];
    shuffleArray(quiz.questions);
    quiz.startTime = Date.now();

    // Re-shuffle options for each question
    quiz.questions.forEach(q => {
        const opts = q.options.map((option, index) => ({
            text: option,
            originalIndex: index
        }));
        shuffleArray(opts);
        q._shuffledOptions = opts;
        q._shuffledCorrectIndex = opts.findIndex(o => o.originalIndex === q.correct);
    });
    
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizGame').classList.remove('hidden');
    
    showQuestion();
}

function showQuizSetup() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizGame').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
}

// Reset kviza na učitavanju NOVE lekcije/predmeta. Study-stranica je JEDAN dijeljeni
// DOM za sve lekcije (isti #quizSetup/#quizGame/#quizResults + globalni AppState.quiz),
// pa in-progress kviz prethodne lekcije PROCURI u novu ako se stanje i vidljivi panel
// ne ponište. Flashcards/Fill se već čiste kroz init*() u initStudyPage; kviz je bio
// jedini izostavljen (samo se punio dropdown) → ovo zatvara tu rupu.
function resetQuiz() {
    const quiz = AppState.quiz;
    quiz.questions = [];
    quiz.index = 0;
    quiz.correct = 0;
    quiz.wrong = 0;
    quiz.wrongList = [];
    quiz.answers = [];
    quiz.startTime = null;
    quiz.shuffledOptions = [];
    quiz.shuffledCorrectIndex = 0;
    showQuizSetup(); // vrati vidljivi panel na setup (sakrij game/results)
}

window.startQuiz = startQuiz;
window.retryQuiz = retryQuiz;
window.showQuizSetup = showQuizSetup;
window.resetQuiz = resetQuiz;
window.quizPrev = quizPrev;
window.quizNext = quizNext;
