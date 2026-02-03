// ===== SOKRAT STUDY - MAIN APPLICATION =====
// Supports multiple subjects: TE2 and Business Entrepreneurship
// New Architecture: Landing → Subjects → Lessons → Study Activities

// ========== HELPER FUNCTION TO GET DATA ==========
function getSubjectData(subjectId, lessonId) {
    if (subjectId === 'te2') {
        // For final test prep, use te2FinalData
        if (lessonId === 'final-test-prep') {
            return typeof te2FinalData !== 'undefined' ? te2FinalData : {};
        }
        return typeof studyData !== 'undefined' ? studyData : {};
    }
    if (subjectId === 'entrepreneurship') {
        return typeof entrepreneurshipData !== 'undefined' ? entrepreneurshipData : {};
    }
    if (subjectId === 'accounting') {
        return typeof accountingData !== 'undefined' ? accountingData : {};
    }
    if (subjectId === 'ebusiness') {
        return typeof ebusinessData !== 'undefined' ? ebusinessData : {};
    }
    return {};
}

// ========== SUBJECT DATA MAPPING ==========
const subjectDataMap = {
    te2: {
        name: 'Tourism Economics',
        shortName: 'TE',
        icon: 'fa-plane',
        color: '#6366f1',
        description: 'Pricing, TSA, Expenditure, Environment, Sustainability',
        storageKey: 'te2-progress',
        lessons: [
            {
                id: 'exam-prep',
                name: 'Exam Preparation',
                description: 'Complete study material for the exam'
            },
            {
                id: 'final-test-prep',
                name: 'Final Test Preparation',
                description: 'Comprehensive review for the final examination'
            }
        ]
    },
    entrepreneurship: {
        name: 'Business Entrepreneurship',
        shortName: 'Entrep',
        icon: 'fa-rocket',
        color: '#8b5cf6',
        description: 'Planning, Innovation, Social Entrepreneurship, Tourism, Final Exam Prep',
        storageKey: 'entrepreneurship-progress',
        lessons: [
            {
                id: 'second-exam-prep',
                name: 'Second Exam Preparation',
                description: 'Core concepts: Planning, Failure, Economy, Social Entrepreneurship, Trends'
            },
            {
                id: 'final-exam-prep',
                name: 'Final Exam Preparation',
                description: 'Complete review: History, Psychology, Innovation, Franchising, Tourism, Value Measurement'
            }
        ]
    },
    accounting: {
        name: 'Accounting Theory',
        shortName: 'Accounting',
        icon: 'fa-coins',
        color: '#059669',
        description: 'Cash Control, Budgeting, SEC Reports, Financial Analysis',
        storageKey: 'accounting-progress',
        lessons: [
            {
                id: 'accounting-fundamentals',
                name: 'Accounting Fundamentals',
                description: 'Complete accounting theory for hospitality'
            }
        ]
    },
    ebusiness: {
        name: 'E-Business',
        shortName: 'E-Biz',
        icon: 'fa-globe',
        color: '#f59e0b',
        description: 'E-Commerce, Distribution Chain, Digital Marketing, SEO, PMS, Security',
        storageKey: 'ebusiness-progress',
        lessons: [
            {
                id: 'final-exam-prep',
                name: 'Final Exam Preparation',
                description: 'Complete E-Business theory covering all 15 units'
            }
        ]
    }
};

// ========== GLOBAL STATE ==========
let currentPage = 'landing'; // landing, lessons, study, about
let currentSubject = null;
let currentLesson = null;
let currentData = null;
let currentSection = 'home';
let currentCategory = 'all';

// Flashcard state
let flashcards = [];
let currentCardIndex = 0;
let knownCards = [];
let unknownCards = [];

// Quiz state
let quizQuestions = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let quizStartTime = null;
let wrongAnswersList = [];
let currentShuffledOptions = []; // Store shuffled options for current question
let currentShuffledCorrectIndex = 0; // Store correct answer index after shuffle

// Fill state
let fillQuestions = [];
let currentFillIndex = 0;
let fillCorrect = 0;
let fillWrong = 0;

// Progress state
let progress = {
    flashcardsLearned: [],
    quizScores: [],
    fillSolved: 0,
    lastStudy: null,
    streak: 0,
    categoryProgress: {}
};

// Analytics state
let analytics = {
    totalStudyTime: 0,
    sessionsCount: 0,
    quizzesTaken: 0,
    quizzesCompleted: 0,
    totalQuestionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    flashcardsReviewed: 0,
    fillExercisesDone: 0,
    categoryStats: {},
    dailyActivity: {},
    averageQuizScore: 0,
    bestQuizScore: 0,
    lastSessionDate: null,
    firstUseDate: null
};

let sessionStartTime = null;

// ========== POSITION PERSISTENCE ==========
function saveCurrentPosition(page, data) {
    const position = {
        page: page,
        subject: data.subject || currentSubject,
        lesson: data.lesson || currentLesson,
        section: currentSection,
        category: currentCategory,
        timestamp: Date.now()
    };
    localStorage.setItem('sokrat-last-position', JSON.stringify(position));
}

function restoreLastPosition() {
    try {
        const saved = localStorage.getItem('sokrat-last-position');
        console.log('Restoring position:', saved);
        if (saved) {
            const position = JSON.parse(saved);
            // Only restore if saved within last 24 hours
            const hoursSinceSave = (Date.now() - position.timestamp) / (1000 * 60 * 60);
            
            if (hoursSinceSave < 24 && position.page && position.page !== 'landing') {
                if (position.page === 'study' && position.subject && position.lesson) {
                    currentCategory = position.category || 'all';
                    currentSection = position.section || 'home';
                    navigateTo('study', { subject: position.subject, lesson: position.lesson });
                    // Restore section after a short delay to let page render
                    if (position.section && position.section !== 'home') {
                        setTimeout(() => {
                            if (typeof switchSection === 'function') {
                                switchSection(position.section);
                            }
                        }, 200);
                    }
                    return;
                } else if (position.page === 'lessons' && position.subject) {
                    navigateTo('lessons', { subject: position.subject });
                    return;
                }
            }
        }
    } catch (e) {
        console.log('Could not restore position:', e);
    }
    // Default to landing
    navigateTo('landing');
}

// ========== PAGE NAVIGATION ==========
function navigateTo(page, data = {}) {
    currentPage = page;
    
    // Save current position to localStorage
    saveCurrentPosition(page, data);
    
    // Hide all pages
    document.querySelectorAll('.landing-page, .lessons-page, .study-page, .about-page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show target page
    switch(page) {
        case 'landing':
            document.getElementById('landing-page').classList.add('active');
            closeSidebar();
            break;
            
        case 'lessons':
            if (data.subject) {
                currentSubject = data.subject;
                renderLessonsPage(data.subject);
            }
            document.getElementById('lessons-page').classList.add('active');
            closeSidebar();
            break;
            
        case 'study':
            if (data.subject && data.lesson) {
                currentSubject = data.subject;
                currentLesson = data.lesson;
                initStudyPage(data.subject, data.lesson);
            }
            document.getElementById('study-page').classList.add('active');
            break;
            
        case 'about':
            document.getElementById('about-page').classList.add('active');
            break;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== SIDEBAR FUNCTIONS ==========
function openSidebar() {
    document.getElementById('subjectsSidebar').classList.add('active');
    document.getElementById('subjectsOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    document.getElementById('subjectsSidebar').classList.remove('active');
    document.getElementById('subjectsOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ========== LESSONS PAGE ==========
function renderLessonsPage(subjectId) {
    const subject = subjectDataMap[subjectId];
    if (!subject) return;
    
    // Update header
    document.getElementById('currentSubjectTitle').textContent = subject.name;
    document.getElementById('subjectDescription').textContent = subject.description;
    
    // Render lessons
    const grid = document.getElementById('lessonsGrid');
    grid.innerHTML = '';
    
    subject.lessons.forEach((lesson, index) => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-info">
                <h3>${lesson.name}</h3>
                <p>${lesson.description}</p>
            </div>
            <i class="fas fa-chevron-right lesson-arrow"></i>
        `;
        card.addEventListener('click', () => {
            navigateTo('study', { subject: subjectId, lesson: lesson.id });
        });
        grid.appendChild(card);
    });
}

// ========== LESSON CATEGORY MAPPING ==========
// Defines which categories belong to each lesson
const lessonCategoryMap = {
    'entrepreneurship': {
        'second-exam-prep': ['planning', 'failure', 'economy', 'social', 'trends'],
        'final-exam-prep': null  // null means ALL categories
    }
};

// ========== STUDY PAGE ==========
function initStudyPage(subjectId, lessonId) {
    const subject = subjectDataMap[subjectId];
    if (!subject) {
        console.error('Subject not found:', subjectId);
        return;
    }
    
    // Get the full data using helper function (ensures fresh data reference)
    // Pass lessonId to get correct data source (e.g., te2FinalData for final-test-prep)
    let fullData = getSubjectData(subjectId, lessonId);
    
    console.log('Loading data for:', subjectId, lessonId);
    console.log('Data categories:', Object.keys(fullData));
    
    // Check if this subject has lesson-specific category filtering
    const subjectLessonMap = lessonCategoryMap[subjectId];
    if (subjectLessonMap && subjectLessonMap[lessonId]) {
        // Filter categories based on lesson
        const allowedCategories = subjectLessonMap[lessonId];
        const filteredData = {};
        for (const key of allowedCategories) {
            if (fullData[key]) {
                filteredData[key] = fullData[key];
            }
        }
        currentData = filteredData;
    } else {
        // Use all categories (final exam or subjects without lesson filtering)
        currentData = fullData;
    }
    
    // Update breadcrumb
    document.getElementById('studyBreadcrumb').textContent = `${subject.shortName} > Lessons`;
    document.getElementById('currentLessonTitle').textContent = subject.lessons.find(l => l.id === lessonId)?.name || 'Lesson';
    
    // Load progress
    loadProgress();
    
    // Initialize all study sections
    initNavigation();
    updateCategoryButtons();
    updateLearnFilters();
    updateQuizCategories();
    initFlashcards();
    initFill();
    renderLearnContent();
    renderProgressPage();
    
    // Show home section by default
    switchSection('home');
}

// ========== ABOUT US FUNCTIONS ==========
function showAboutUs() {
    navigateTo('about');
}

function hideAboutUs() {
    navigateTo('landing');
}

// Make functions globally available
window.showAboutUs = showAboutUs;
window.hideAboutUs = hideAboutUs;
window.navigateTo = navigateTo;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
window.switchSection = switchSection;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Set up event listeners
    setupEventListeners();
    
    // Restore last position or go to landing
    restoreLastPosition();
});

function setupEventListeners() {
    // Open Study button
    const openStudyBtn = document.getElementById('openStudyBtn');
    if (openStudyBtn) {
        openStudyBtn.addEventListener('click', openSidebar);
    }
    
    // Close sidebar
    const closeSidebarBtn = document.getElementById('closeSidebar');
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    // Overlay click closes sidebar
    const overlay = document.getElementById('subjectsOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Subject items in sidebar
    document.querySelectorAll('.subject-item').forEach(item => {
        item.addEventListener('click', () => {
            const subjectId = item.dataset.subject;
            navigateTo('lessons', { subject: subjectId });
        });
    });
    
    // Back buttons
    const backToLanding = document.getElementById('backToLanding');
    if (backToLanding) {
        backToLanding.addEventListener('click', () => navigateTo('landing'));
    }
    
    const backToLessons = document.getElementById('backToLessons');
    if (backToLessons) {
        backToLessons.addEventListener('click', () => navigateTo('lessons', { subject: currentSubject }));
    }
    
    const backFromAbout = document.getElementById('backFromAbout');
    if (backFromAbout) {
        backFromAbout.addEventListener('click', () => navigateTo('landing'));
    }
    
    // Theme toggles (multiple on different pages)
    document.querySelectorAll('.theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
    
    // Study nav buttons
    document.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
    
    // Mobile nav buttons in study page
    document.querySelectorAll('.study-mobile-nav .mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
        });
    });
}

// ========== LEGACY FUNCTIONS - Keep for compatibility ==========

// This function is kept for backward compatibility but redirects to new system
function selectSubject(subject) {
    navigateTo('lessons', { subject: subject });
}

function showSubjectSelector() {
    navigateTo('landing');
}

// Make selectSubject globally available for onclick handlers
window.selectSubject = selectSubject;
window.showSubjectSelector = showSubjectSelector;

// ========== NAVIGATION (Old - kept for compatibility) ==========
function initNavigation() {
    // Study nav buttons already set up in setupEventListeners
    console.log('Navigation initialized');
}

// ========== LOAD AND SAVE PROGRESS ==========
function loadProgress() {
    if (!currentSubject) return;
    
    const storageKey = subjectDataMap[currentSubject].storageKey;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
        progress = JSON.parse(saved);
    } else {
        progress = {
            flashcardsLearned: [],
            quizScores: [],
            fillSolved: 0,
            lastStudy: null,
            streak: 0,
            categoryProgress: {}
        };
    }
    
    // Check streak
    checkStreak();
}

function saveProgress() {
    if (!currentSubject) return;
    
    const storageKey = subjectDataMap[currentSubject].storageKey;
    progress.lastStudy = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(progress));
}

function checkStreak() {
    if (!progress.lastStudy) {
        progress.streak = 1;
        return;
    }
    
    const last = new Date(progress.lastStudy);
    const now = new Date();
    const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        progress.streak++;
    } else if (diffDays > 1) {
        progress.streak = 1;
    }
}

// ========== UPDATE HOME STATS ==========
function updateHomeStats() {
    if (!currentData) return;
    
    // Count total questions
    let totalQuestions = 0;
    Object.values(currentData).forEach(cat => {
        if (cat.quiz) totalQuestions += cat.quiz.length;
    });
    
    const totalQuestionsEl = document.getElementById('totalQuestions');
    if (totalQuestionsEl) totalQuestionsEl.textContent = totalQuestions + '+';
    
    const totalCategoriesEl = document.getElementById('totalCategories');
    if (totalCategoriesEl) totalCategoriesEl.textContent = Object.keys(currentData).length;
    
    const bestScoreEl = document.getElementById('bestScore');
    if (bestScoreEl) {
        const best = progress.quizScores.length > 0 ? Math.max(...progress.quizScores) : 0;
        bestScoreEl.textContent = best + '%';
    }
    
    const streakEl = document.getElementById('streak');
    if (streakEl) streakEl.textContent = progress.streak || 0;
}

// ========== CATEGORY BUTTONS ==========
function updateCategoryButtons() {
    const container = document.querySelector('.categories');
    if (!container || !currentData) return;
    
    container.innerHTML = '';
    
    Object.keys(currentData).forEach(category => {
        const data = currentData[category];
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = category;
        btn.innerHTML = `
            <i class="fas ${data.icon}"></i>
            <span>${data.name}</span>
            <small>${data.flashcards ? data.flashcards.length : 0} terms</small>
        `;
        btn.addEventListener('click', () => {
            currentCategory = category;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showToast(`Category: ${data.name}`);
        });
        container.appendChild(btn);
    });
}

// ========== LEARN FILTERS ==========
function updateLearnFilters() {
    const container = document.querySelector('.learn-filter');
    if (!container || !currentData) return;
    
    container.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>';
    
    Object.keys(currentData).forEach(category => {
        const data = currentData[category];
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = category;
        btn.textContent = data.name.split(' ')[0];
        container.appendChild(btn);
    });
    
    container.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            document.querySelectorAll('.learn-card').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ========== QUIZ CATEGORIES ==========
function updateQuizCategories() {
    const select = document.getElementById('quizCategory');
    if (!select || !currentData) return;
    
    select.innerHTML = '<option value="all">All Categories</option>';
    
    Object.keys(currentData).forEach(category => {
        const data = currentData[category];
        const option = document.createElement('option');
        option.value = category;
        option.textContent = data.name;
        select.appendChild(option);
    });
}

// ========== NAVIGATION ==========
function initNavigation() {
    // Desktop navigation
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Sync mobile nav
            syncMobileNav(section);
        });
    });
    
    // Mobile navigation
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            
            mobileNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Sync desktop nav
            navBtns.forEach(b => {
                if (b.dataset.section === section) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
        });
    });
    
    // Category buttons are now handled by updateCategoryButtons()
}

// Sync mobile navigation
function syncMobileNav(section) {
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    mobileNavBtns.forEach(b => {
        if (b.dataset.section === section) {
            b.classList.add('active');
        } else {
            b.classList.remove('active');
        }
    });
}

function switchSection(section) {
    // Don't allow switching if no subject selected
    if (!currentSubject) {
        showSubjectSelector();
        return;
    }
    
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    currentSection = section;
    
    // Save position when section changes
    saveCurrentPosition(currentPage, { subject: currentSubject, lesson: currentLesson });
    
    // Scroll to top when switching sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    if (section === 'flashcards') {
        initFlashcards();
    } else if (section === 'fill') {
        initFill();
    } else if (section === 'progress') {
        renderProgressPage();
    }
}

// ========== THEME ==========
function initTheme() {
    const savedTheme = localStorage.getItem('sokrat-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('sokrat-theme', newTheme);
    updateThemeIcons(newTheme);
}

function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle i').forEach(icon => {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Track if flashcard event listeners are already set up
let flashcardListenersInitialized = false;

// ========== FLASHCARDS ==========
function initFlashcards() {
    flashcards = getAllFlashcards();
    shuffleArray(flashcards);
    currentCardIndex = 0;
    knownCards = [];
    unknownCards = [];
    
    updateFlashcard();
    updateFlashcardProgress();
    updateFlashcardStats();
    
    // Only add event listeners once to prevent duplicates
    if (!flashcardListenersInitialized) {
        document.getElementById('flashcard').addEventListener('click', flipCard);
        document.getElementById('btnPrev').addEventListener('click', prevCard);
        document.getElementById('btnNext').addEventListener('click', nextCard);
        document.getElementById('btnCorrect').addEventListener('click', markKnown);
        document.getElementById('btnWrong').addEventListener('click', markUnknown);
        flashcardListenersInitialized = true;
    }
}

function getAllFlashcards() {
    if (!currentData) return [];
    let all = [];
    Object.keys(currentData).forEach(category => {
        // Safety check: ensure flashcards array exists
        if (currentData[category] && currentData[category].flashcards && Array.isArray(currentData[category].flashcards)) {
            currentData[category].flashcards.forEach(card => {
                all.push({
                    ...card,
                    category: category,
                    categoryName: currentData[category].name
                });
            });
        }
    });
    return all;
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function updateFlashcard() {
    if (!flashcards || flashcards.length === 0) {
        document.getElementById('cardCategory').textContent = 'No Cards';
        document.getElementById('cardQuestion').textContent = 'No flashcards available for this lesson.';
        document.getElementById('cardAnswer').textContent = 'Try selecting a different lesson or category.';
        document.getElementById('cardExplanation').textContent = '';
        return;
    }
    
    const card = flashcards[currentCardIndex];
    document.getElementById('cardCategory').textContent = card.categoryName;
    document.getElementById('cardQuestion').textContent = card.question;
    document.getElementById('cardAnswer').textContent = card.answer;
    document.getElementById('cardExplanation').textContent = card.explanation || '';
    
    // Reset flip
    document.getElementById('flashcard').classList.remove('flipped');
}

function updateFlashcardProgress() {
    if (!flashcards || flashcards.length === 0) {
        document.getElementById('cardProgress').textContent = '0 / 0';
        document.getElementById('cardProgressBar').style.width = '0%';
        return;
    }
    
    const progress = `${currentCardIndex + 1} / ${flashcards.length}`;
    document.getElementById('cardProgress').textContent = progress;
    
    const percent = ((currentCardIndex + 1) / flashcards.length) * 100;
    document.getElementById('cardProgressBar').style.width = `${percent}%`;
}

function updateFlashcardStats() {
    document.getElementById('knownCount').textContent = knownCards.length;
    document.getElementById('unknownCount').textContent = unknownCards.length;
}

function prevCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateFlashcard();
        updateFlashcardProgress();
    }
}

function nextCard() {
    if (currentCardIndex < flashcards.length - 1) {
        currentCardIndex++;
        updateFlashcard();
        updateFlashcardProgress();
    }
}

function markKnown() {
    if (!knownCards.includes(currentCardIndex)) {
        knownCards.push(currentCardIndex);
        // Remove from unknown if was there
        const idx = unknownCards.indexOf(currentCardIndex);
        if (idx > -1) unknownCards.splice(idx, 1);
    }
    updateFlashcardStats();
    saveFlashcardProgress();
    trackFlashcardReview(); // Track in analytics
    nextCard();
}

function markUnknown() {
    if (!unknownCards.includes(currentCardIndex)) {
        unknownCards.push(currentCardIndex);
        // Remove from known if was there
        const idx = knownCards.indexOf(currentCardIndex);
        if (idx > -1) knownCards.splice(idx, 1);
    }
    updateFlashcardStats();
    nextCard();
}

function saveFlashcardProgress() {
    progress.flashcardsLearned = [...new Set([...progress.flashcardsLearned, ...knownCards])];
    saveProgress();
}

// ========== QUIZ ==========
function startQuiz() {
    const count = document.getElementById('questionCount').value;
    const category = document.getElementById('quizCategory').value;
    
    quizQuestions = getQuizQuestions(category, count);
    shuffleArray(quizQuestions);
    
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    wrongAnswersList = [];
    quizStartTime = Date.now();
    
    document.getElementById('quizSetup').classList.add('hidden');
    document.getElementById('quizGame').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');
    
    showQuestion();
}

function getQuizQuestions(category, count) {
    if (!currentData) return [];
    let questions = [];
    
    if (category === 'all') {
        Object.keys(currentData).forEach(cat => {
            // Safety check: ensure quiz array exists
            if (currentData[cat] && currentData[cat].quiz && Array.isArray(currentData[cat].quiz)) {
                currentData[cat].quiz.forEach(q => {
                    questions.push({
                        ...q,
                        category: cat,
                        categoryName: currentData[cat].name
                    });
                });
            }
        });
    } else {
        // Safety check: ensure category and quiz exist
        if (currentData[category] && currentData[category].quiz && Array.isArray(currentData[category].quiz)) {
            currentData[category].quiz.forEach(q => {
                questions.push({
                    ...q,
                    category: category,
                    categoryName: currentData[category].name
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
    if (currentQuestionIndex >= quizQuestions.length) {
        endQuiz();
        return;
    }
    
    const q = quizQuestions[currentQuestionIndex];
    
    document.getElementById('quizProgress').textContent = 
        `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    
    const percent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${percent}%`;
    
    document.getElementById('questionCategory').textContent = q.categoryName;
    document.getElementById('questionText').textContent = q.question;
    
    const container = document.getElementById('answersContainer');
    container.innerHTML = '';
    
    // Shuffle answer options to randomize correct answer position
    const optionsWithIndex = q.options.map((option, index) => ({
        text: option,
        originalIndex: index
    }));
    shuffleArray(optionsWithIndex);
    
    // Store shuffled options globally for use in selectAnswer
    currentShuffledOptions = optionsWithIndex;
    
    // Find the new position of the correct answer after shuffling
    currentShuffledCorrectIndex = optionsWithIndex.findIndex(opt => opt.originalIndex === q.correct);
    
    const letters = ['A', 'B', 'C', 'D'];
    optionsWithIndex.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.innerHTML = `<span class="answer-letter">${letters[index]}</span><span>${option.text}</span>`;
        btn.addEventListener('click', () => selectAnswer(index));
        container.appendChild(btn);
    });
    
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('wrongCount').textContent = wrongAnswers;
}

function selectAnswer(selected) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.classList.add('disabled'));
    
    const isCorrect = selected === currentShuffledCorrectIndex;
    
    if (isCorrect) {
        buttons[selected].classList.add('correct');
        correctAnswers++;
    } else {
        buttons[selected].classList.add('wrong');
        buttons[currentShuffledCorrectIndex].classList.add('correct');
        wrongAnswers++;
        
        // Use shuffled options text for correct display
        wrongAnswersList.push({
            question: quizQuestions[currentQuestionIndex].question,
            yourAnswer: currentShuffledOptions[selected].text,
            correctAnswer: currentShuffledOptions[currentShuffledCorrectIndex].text
        });
    }
    
    // Track answer in analytics
    trackQuizAnswer(isCorrect, quizQuestions[currentQuestionIndex].category || 'general');
    
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('wrongCount').textContent = wrongAnswers;
    
    setTimeout(() => {
        currentQuestionIndex++;
        showQuestion();
    }, 1500);
}

function endQuiz() {
    
    const totalTime = Math.floor((Date.now() - quizStartTime) / 1000);
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    
    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    
    document.getElementById('quizGame').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');
    
    // Update results
    document.getElementById('finalScore').textContent = `${score}%`;
    document.getElementById('finalCorrect').textContent = correctAnswers;
    document.getElementById('finalWrong').textContent = wrongAnswers;
    document.getElementById('totalTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Results icon and message
    let icon, title, message;
    if (score >= 90) {
        icon = '🏆'; title = 'Excellent!'; message = 'Perfect knowledge!';
    } else if (score >= 70) {
        icon = '🎉'; title = 'Great!'; message = 'Very good!';
    } else if (score >= 50) {
        icon = '👍'; title = 'Good!'; message = 'Keep practicing!';
    } else {
        icon = '📚'; title = 'Need more study'; message = 'Review the material and try again!';
    }
    
    document.getElementById('resultsIcon').textContent = icon;
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsMessage').textContent = message;
    
    // Wrong answers review
    const wrongList = document.getElementById('wrongAnswersList');
    wrongList.innerHTML = '';
    
    if (wrongAnswersList.length > 0) {
        document.getElementById('wrongAnswersReview').style.display = 'block';
        wrongAnswersList.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wrong-answer-item';
            div.innerHTML = `
                <p><strong>Question:</strong> ${item.question}</p>
                <p class="your-answer"><strong>Your answer:</strong> ${item.yourAnswer}</p>
                <p class="correct-answer-review"><strong>Correct answer:</strong> ${item.correctAnswer}</p>
            `;
            wrongList.appendChild(div);
        });
    } else {
        document.getElementById('wrongAnswersReview').style.display = 'none';
    }
    
    // Save progress
    progress.quizScores.push(score);
    progress.lastStudy = new Date().toISOString();
    saveProgress();
    
    // Track analytics
    trackQuizComplete(correctAnswers, quizQuestions.length);
}

function retryQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    wrongAnswersList = [];
    shuffleArray(quizQuestions);
    quizStartTime = Date.now();
    
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizGame').classList.remove('hidden');
    
    showQuestion();
}

function showQuizSetup() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizGame').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
}

// Global functions for buttons
window.startQuiz = startQuiz;
window.retryQuiz = retryQuiz;
window.showQuizSetup = showQuizSetup;

// Track if fill event listeners are already set up
let fillListenersInitialized = false;

// ========== FILL IN THE BLANK ==========
function initFill() {
    fillQuestions = getAllFillQuestions();
    shuffleArray(fillQuestions);
    currentFillIndex = 0;
    fillCorrect = 0;
    fillWrong = 0;
    
    showFillQuestion();
    updateFillProgress();
    updateFillStats();
    
    // Only add event listeners once to prevent duplicates
    if (!fillListenersInitialized) {
        document.getElementById('checkFill').addEventListener('click', checkFillAnswer);
        document.getElementById('fillInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkFillAnswer();
        });
        document.getElementById('btnHint').addEventListener('click', showHint);
        document.getElementById('btnSkip').addEventListener('click', skipFill);
        document.getElementById('btnNextFill').addEventListener('click', nextFill);
        fillListenersInitialized = true;
    }
}

function getAllFillQuestions() {
    if (!currentData) return [];
    let all = [];
    Object.keys(currentData).forEach(category => {
        if (currentData[category].fillBlanks) {
            currentData[category].fillBlanks.forEach(q => {
                all.push({
                    ...q,
                    category: category,
                    categoryName: currentData[category].name
                });
            });
        }
    });
    return all;
}

function showFillQuestion() {
    // Safety check: if no fill questions exist
    if (!fillQuestions || fillQuestions.length === 0) {
        document.getElementById('fillSentence').innerHTML = '<p style="color: var(--text-muted);">No fill-in-the-blank questions available for this lesson.</p>';
        document.getElementById('fillInput').disabled = true;
        document.getElementById('checkFill').disabled = true;
        return;
    }
    
    if (currentFillIndex >= fillQuestions.length) {
        showToast('You completed all Fill-in-the-blank questions!');
        currentFillIndex = 0;
        shuffleArray(fillQuestions);
    }
    
    const q = fillQuestions[currentFillIndex];
    
    document.getElementById('fillCategory').textContent = q.categoryName;
    
    // Replace answer with blank
    const sentenceWithBlank = q.sentence.replace('_______', '<span class="blank">_______</span>');
    document.getElementById('fillSentence').innerHTML = sentenceWithBlank;
    
    // Reset
    document.getElementById('fillInput').value = '';
    document.getElementById('fillInput').disabled = false;
    document.getElementById('checkFill').disabled = false;
    document.getElementById('fillFeedback').classList.add('hidden');
    document.getElementById('fillHint').classList.add('hidden');
    document.getElementById('btnNextFill').classList.add('hidden');
    document.getElementById('btnSkip').classList.remove('hidden');
    document.getElementById('btnHint').classList.remove('hidden');
}

function checkFillAnswer() {
    const input = document.getElementById('fillInput').value.trim().toLowerCase();
    const correct = fillQuestions[currentFillIndex].answer.toLowerCase();
    
    const feedback = document.getElementById('fillFeedback');
    feedback.classList.remove('hidden', 'correct', 'wrong');
    
    if (input === correct || input === correct.replace('-', ' ') || correct.includes(input)) {
        feedback.classList.add('correct');
        document.getElementById('feedbackText').innerHTML = '<i class="fas fa-check-circle"></i> Correct!';
        fillCorrect++;
        progress.fillSolved++;
        trackFillExercise(); // Track in analytics
    } else {
        feedback.classList.add('wrong');
        document.getElementById('feedbackText').innerHTML = '<i class="fas fa-times-circle"></i> Wrong!';
        fillWrong++;
    }
    
    document.getElementById('correctFillAnswer').textContent = fillQuestions[currentFillIndex].answer;
    
    document.getElementById('fillInput').disabled = true;
    document.getElementById('checkFill').disabled = true;
    document.getElementById('btnNextFill').classList.remove('hidden');
    document.getElementById('btnSkip').classList.add('hidden');
    document.getElementById('btnHint').classList.add('hidden');
    
    updateFillStats();
    saveProgress();
}

function showHint() {
    const hint = fillQuestions[currentFillIndex].hint;
    document.getElementById('hintText').textContent = hint;
    document.getElementById('fillHint').classList.remove('hidden');
}

function skipFill() {
    fillWrong++;
    updateFillStats();
    nextFill();
}

function nextFill() {
    currentFillIndex++;
    showFillQuestion();
    updateFillProgress();
}

function updateFillProgress() {
    const progress = `${currentFillIndex + 1} / ${fillQuestions.length}`;
    document.getElementById('fillProgress').textContent = progress;
    
    const percent = ((currentFillIndex + 1) / fillQuestions.length) * 100;
    document.getElementById('fillProgressBar').style.width = `${percent}%`;
}

function updateFillStats() {
    document.getElementById('fillCorrect').textContent = fillCorrect;
    document.getElementById('fillWrong').textContent = fillWrong;
}

// ========== LEARN MODE ==========
function renderLearnContent() {
    const container = document.getElementById('learnContent');
    if (!container) {
        console.error('Learn content container not found');
        return;
    }
    if (!currentData) {
        console.error('No current data for learn content');
        container.innerHTML = '<div class="learn-card"><div class="learn-card-content"><p>No content available. Please select a lesson.</p></div></div>';
        return;
    }
    
    container.innerHTML = '';
    
    const categories = Object.keys(currentData);
    if (categories.length === 0) {
        container.innerHTML = '<div class="learn-card"><div class="learn-card-content"><p>No categories found in this lesson.</p></div></div>';
        return;
    }
    
    categories.forEach(category => {
        const data = currentData[category];
        if (!data) return;
        
        // Safe access to properties with defaults
        const icon = data.icon || 'fa-book';
        const name = data.name || category;
        const flashcardsCount = data.flashcards ? data.flashcards.length : 0;
        const learnContent = data.learn && data.learn.content ? data.learn.content : '<p>No learn content available for this category.</p>';
        const learnImage = data.learn && data.learn.image ? data.learn.image : null;
        
        const card = document.createElement('div');
        card.className = 'learn-card';
        card.dataset.category = category;
        
        card.innerHTML = `
            <div class="learn-card-header">
                <h2 class="learn-card-title"><i class="fas ${icon}"></i> ${name}</h2>
                <span>${flashcardsCount} terms</span>
            </div>
            <div class="learn-card-content">
                ${learnImage ? `<img src="${learnImage}" alt="${name}" class="learn-image">` : ''}
                ${learnContent}
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Filter functionality - remove old listeners first
    const filterBtns = document.querySelectorAll('.learn-filter .filter-btn');
    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });
    
    // Add new listeners
    document.querySelectorAll('.learn-filter .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.learn-filter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            document.querySelectorAll('.learn-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
            });
        });
    });
    
    console.log('Learn content rendered:', categories.length, 'categories');
}

// ========== PROGRESS PAGE ==========
function renderProgressPage() {
    if (!currentData) return;
    
    // Overall progress
    const totalFlashcards = getAllFlashcards().length;
    const learned = progress.flashcardsLearned.length;
    const overallPercent = Math.round((learned / totalFlashcards) * 100) || 0;
    
    document.getElementById('overallPercent').textContent = `${overallPercent}%`;
    document.getElementById('overallProgress').setAttribute('stroke-dasharray', `${overallPercent}, 100`);
    
    // Flashcards
    document.getElementById('flashcardsLearned').textContent = learned;
    document.getElementById('flashcardsTotal').textContent = totalFlashcards;
    document.getElementById('flashcardsProgress').style.width = `${overallPercent}%`;
    
    // Quiz
    const avgScore = progress.quizScores.length > 0 
        ? Math.round(progress.quizScores.reduce((a, b) => a + b, 0) / progress.quizScores.length)
        : 0;
    document.getElementById('avgQuizScore').textContent = `${avgScore}%`;
    document.getElementById('totalQuizzes').textContent = progress.quizScores.length;
    
    // Fill
    const totalFills = fillCorrect + fillWrong;
    const fillAcc = totalFills > 0 ? Math.round((fillCorrect / totalFills) * 100) : 0;
    document.getElementById('fillAccuracy').textContent = `${fillAcc}%`;
    document.getElementById('fillSolved').textContent = progress.fillSolved;
    
    // Category bars
    const barsContainer = document.getElementById('categoryBars');
    if (!barsContainer || !currentData) return;
    barsContainer.innerHTML = '';
    
    Object.keys(currentData).forEach(category => {
        const data = currentData[category];
        const catProgress = progress.categoryProgress[category] || 0;
        
        const bar = document.createElement('div');
        bar.className = 'category-bar';
        bar.innerHTML = `
            <i class="fas ${data.icon}" style="color: ${data.color}"></i>
            <div class="category-bar-info">
                <span>
                    <strong>${data.name}</strong>
                    <span>${catProgress}%</span>
                </span>
                <div class="mini-progress">
                    <div class="mini-fill" style="width: ${catProgress}%; background: ${data.color}"></div>
                </div>
            </div>
        `;
        barsContainer.appendChild(bar);
    });
}

// ========== HOME STATS ==========
function updateHomeStats() {
    if (!currentData) return;
    
    const totalQ = getAllFlashcards().length + Object.keys(currentData).reduce((acc, cat) => acc + currentData[cat].quiz.length, 0);
    document.getElementById('totalQuestions').textContent = `${totalQ}+`;
    
    // Update categories count
    document.getElementById('totalCategories').textContent = Object.keys(currentData).length;
    
    // Update subtitle
    const subtitle = document.getElementById('homeSubtitle');
    if (subtitle && currentSubject) {
        subtitle.textContent = `Your interactive guide to ${subjectDataMap[currentSubject].name}`;
    }
    
    const bestScore = progress.quizScores.length > 0 ? Math.max(...progress.quizScores) : 0;
    document.getElementById('bestScore').textContent = `${bestScore}%`;
    
    document.getElementById('streak').textContent = progress.streak;
}

// ========== QUICK START FUNCTIONS ==========
window.startQuickQuiz = function() {
    document.getElementById('questionCount').value = '10';
    document.getElementById('quizCategory').value = 'all';
    switchSection('quiz');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="quiz"]').classList.add('active');
    startQuiz();
};

window.startFlashcards = function() {
    switchSection('flashcards');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="flashcards"]').classList.add('active');
};

window.startLearning = function() {
    switchSection('learn');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-section="learn"]').classList.add('active');
};

// ========== UTILITIES ==========
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let toastTimeout = null;

function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastMessage').textContent = message;
    
    // Clear any existing timeout
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    // Remove and re-add class to restart animation
    toast.classList.remove('show');
    
    // Force reflow
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toastTimeout = null;
    }, 2500);
}

// ========== PROGRESS STORAGE ==========
function loadProgress() {
    if (!currentSubject) return;
    
    const storageKey = subjectDataMap[currentSubject].storageKey;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        progress = JSON.parse(saved);
    } else {
        // Reset progress for new subject
        progress = {
            flashcardsLearned: [],
            quizScores: [],
            fillSolved: 0,
            lastStudy: null,
            streak: 0,
            categoryProgress: {}
        };
    }
    
    // Check streak
    if (progress.lastStudy) {
        const lastDate = new Date(progress.lastStudy).toDateString();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        if (lastDate === yesterday) {
            progress.streak++;
        } else if (lastDate !== today) {
            progress.streak = 0;
        }
    }
}

function saveProgress() {
    if (!currentSubject) return;
    
    progress.lastStudy = new Date().toISOString();
    const storageKey = subjectDataMap[currentSubject].storageKey;
    localStorage.setItem(storageKey, JSON.stringify(progress));
    updateHomeStats();
}

// ========== ANALYTICS SYSTEM ==========
function loadAnalytics() {
    if (!currentSubject) return;
    
    const analyticsKey = subjectDataMap[currentSubject].storageKey + '-analytics';
    const saved = localStorage.getItem(analyticsKey);
    
    if (saved) {
        analytics = JSON.parse(saved);
    } else {
        analytics = {
            totalStudyTime: 0,
            sessionsCount: 0,
            quizzesTaken: 0,
            quizzesCompleted: 0,
            totalQuestionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            flashcardsReviewed: 0,
            fillExercisesDone: 0,
            categoryStats: {},
            dailyActivity: {},
            averageQuizScore: 0,
            bestQuizScore: 0,
            lastSessionDate: null,
            firstUseDate: new Date().toISOString()
        };
    }
    
    // Start new session
    startSession();
}

function saveAnalytics() {
    if (!currentSubject) return;
    
    const analyticsKey = subjectDataMap[currentSubject].storageKey + '-analytics';
    localStorage.setItem(analyticsKey, JSON.stringify(analytics));
}

function startSession() {
    sessionStartTime = Date.now();
    analytics.sessionsCount++;
    analytics.lastSessionDate = new Date().toISOString();
    
    // Initialize today's activity
    const today = new Date().toISOString().split('T')[0];
    if (!analytics.dailyActivity[today]) {
        analytics.dailyActivity[today] = {
            studyTime: 0,
            quizzes: 0,
            flashcards: 0,
            correctAnswers: 0,
            wrongAnswers: 0
        };
    }
    
    saveAnalytics();
}

function updateStudyTime() {
    if (!sessionStartTime) return;
    
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
    const today = new Date().toISOString().split('T')[0];
    
    if (analytics.dailyActivity[today]) {
        analytics.dailyActivity[today].studyTime += sessionTime;
    }
    analytics.totalStudyTime += sessionTime;
    
    sessionStartTime = Date.now(); // Reset for next interval
    saveAnalytics();
}

function trackQuizAnswer(isCorrect, category) {
    analytics.totalQuestionsAnswered++;
    const today = new Date().toISOString().split('T')[0];
    
    if (isCorrect) {
        analytics.correctAnswers++;
        if (analytics.dailyActivity[today]) {
            analytics.dailyActivity[today].correctAnswers++;
        }
    } else {
        analytics.wrongAnswers++;
        if (analytics.dailyActivity[today]) {
            analytics.dailyActivity[today].wrongAnswers++;
        }
    }
    
    // Track category stats
    if (category) {
        if (!analytics.categoryStats[category]) {
            analytics.categoryStats[category] = {
                questionsAnswered: 0,
                correct: 0,
                wrong: 0
            };
        }
        analytics.categoryStats[category].questionsAnswered++;
        if (isCorrect) {
            analytics.categoryStats[category].correct++;
        } else {
            analytics.categoryStats[category].wrong++;
        }
    }
    
    saveAnalytics();
}

function trackQuizComplete(score, totalQuestions) {
    analytics.quizzesCompleted++;
    const today = new Date().toISOString().split('T')[0];
    
    if (analytics.dailyActivity[today]) {
        analytics.dailyActivity[today].quizzes++;
    }
    
    // Update best score
    const percentage = Math.round((score / totalQuestions) * 100);
    if (percentage > analytics.bestQuizScore) {
        analytics.bestQuizScore = percentage;
    }
    
    // Update average
    const totalScores = progress.quizScores.length;
    if (totalScores > 0) {
        const sum = progress.quizScores.reduce((a, b) => a + b, 0);
        analytics.averageQuizScore = Math.round(sum / totalScores);
    }
    
    saveAnalytics();
}

function trackFlashcardReview() {
    analytics.flashcardsReviewed++;
    const today = new Date().toISOString().split('T')[0];
    
    if (analytics.dailyActivity[today]) {
        analytics.dailyActivity[today].flashcards++;
    }
    
    saveAnalytics();
}

function trackFillExercise() {
    analytics.fillExercisesDone++;
    saveAnalytics();
}

function getAnalyticsSummary() {
    const accuracy = analytics.totalQuestionsAnswered > 0 
        ? Math.round((analytics.correctAnswers / analytics.totalQuestionsAnswered) * 100) 
        : 0;
    
    const studyHours = Math.floor(analytics.totalStudyTime / 3600);
    const studyMinutes = Math.floor((analytics.totalStudyTime % 3600) / 60);
    
    // Get last 7 days activity
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        last7Days.push({
            date: dateStr,
            activity: analytics.dailyActivity[dateStr] || { studyTime: 0, quizzes: 0, flashcards: 0 }
        });
    }
    
    return {
        totalStudyTime: `${studyHours}h ${studyMinutes}m`,
        sessionsCount: analytics.sessionsCount,
        quizzesCompleted: analytics.quizzesCompleted,
        totalQuestionsAnswered: analytics.totalQuestionsAnswered,
        accuracy: accuracy,
        flashcardsReviewed: analytics.flashcardsReviewed,
        bestQuizScore: analytics.bestQuizScore,
        averageQuizScore: analytics.averageQuizScore,
        last7Days: last7Days,
        categoryStats: analytics.categoryStats
    };
}

// Save study time periodically
setInterval(updateStudyTime, 60000); // Every minute

// Save on page unload
window.addEventListener('beforeunload', () => {
    updateStudyTime();
});

window.resetProgress = function() {
    if (confirm('Are you sure you want to reset all progress?')) {
        progress = {
            flashcardsLearned: [],
            quizScores: [],
            fillSolved: 0,
            lastStudy: null,
            streak: 0,
            categoryProgress: {}
        };
        saveProgress();
        renderProgressPage();
        showToast('Progress reset!');
    }
};

window.resetAnalytics = function() {
    if (confirm('Are you sure you want to reset all analytics?')) {
        analytics = {
            totalStudyTime: 0,
            sessionsCount: 0,
            quizzesTaken: 0,
            quizzesCompleted: 0,
            totalQuestionsAnswered: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            flashcardsReviewed: 0,
            fillExercisesDone: 0,
            categoryStats: {},
            dailyActivity: {},
            averageQuizScore: 0,
            bestQuizScore: 0,
            lastSessionDate: null,
            firstUseDate: new Date().toISOString()
        };
        saveAnalytics();
        renderProgressPage();
        showToast('Analytics reset!');
    }
};

window.getAnalytics = getAnalyticsSummary;

// Mobile cleanup function - now just adds CSS classes, no inline style manipulation
function cleanupLearnContentForMobile() {
    if (window.innerWidth > 767) return;
    
    const container = document.getElementById('learnContent');
    if (container) {
        container.classList.add('mobile-view');
        container.querySelectorAll('.learn-card').forEach(card => {
            card.classList.add('mobile-card');
        });
    }
}

window.cleanupLearnContentForMobile = cleanupLearnContentForMobile;
