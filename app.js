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
    if (subjectId === 'econ-hospitality') {
        if (lessonId === 'first-midterm') {
            return typeof economicsHospitalityData !== 'undefined' ? economicsHospitalityData : {};
        }
        return {};
    }
    if (subjectId === 'marketing') {
        if (lessonId === 'first-midterm') {
            return typeof marketingData !== 'undefined' ? marketingData : {};
        }
        return {};
    }
    if (subjectId === 'geography') {
        if (lessonId === 'first-midterm') {
            return typeof geographyData !== 'undefined' ? geographyData : {};
        }
        return {};
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
    },
    'econ-hospitality': {
        name: 'Economics in Hospitality',
        shortName: 'EIH',
        icon: 'fa-hotel',
        color: '#0ea5e9',
        description: 'Economic analysis of Croatian hospitality industry, seasonality, productivity, and policy responses',
        storageKey: 'econ-hospitality-progress',
        lessons: [
            {
                id: 'first-midterm',
                name: 'First Midterm',
                description: 'Seminar-based preparation: macro importance, seasonality, case studies, competitiveness'
            },
            {
                id: 'second-midterm',
                name: 'Second Midterm',
                description: 'Coming soon'
            }
        ]
    },
    marketing: {
        name: 'Marketing',
        shortName: 'MKT',
        icon: 'fa-bullhorn',
        color: '#ec4899',
        description: 'Marketing concept, environment, market exchange, segmentation, consumer behaviour, and market research',
        storageKey: 'marketing-progress',
        lessons: [
            {
                id: 'first-midterm',
                name: 'First Midterm',
                description: 'Comprehensive preparation from 6 presentations'
            },
            {
                id: 'second-midterm',
                name: 'Second Midterm',
                description: 'Coming soon'
            }
        ]
    },
    geography: {
        name: 'Tourism Geography',
        shortName: 'Geo',
        icon: 'fa-earth-europe',
        color: '#14b8a6',
        description: 'Croatia tourist geography, blind map drills, protected areas, UNESCO and image-based city recognition',
        storageKey: 'geography-progress',
        lessons: [
            {
                id: 'first-midterm',
                name: 'First Midterm',
                description: 'Blind map + Croatia geography + image questions from lecture materials'
            },
            {
                id: 'second-midterm',
                name: 'Second Midterm',
                description: 'Coming soon'
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
        const isComingSoon = lesson.id === 'second-midterm';
        card.innerHTML = `
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-info">
                <h3>${lesson.name}</h3>
                <p>${lesson.description}</p>
            </div>
            <i class="fas fa-chevron-right lesson-arrow"></i>
        `;
        if (isComingSoon) {
            card.style.opacity = '0.65';
            card.style.cursor = 'not-allowed';
            card.querySelector('.lesson-arrow').className = 'fas fa-clock lesson-arrow';
            card.addEventListener('click', () => {
                showToast('Second Midterm is coming soon.');
            });
        } else {
            card.addEventListener('click', () => {
                navigateTo('study', { subject: subjectId, lesson: lesson.id });
            });
        }
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
    
    // Show blind map button for Geography
    if (subjectId === 'geography') {
        document.getElementById('blindMapNavBtn')?.style.removeProperty('display');
        document.getElementById('blindMapMobileBtn')?.style.removeProperty('display');
    } else {
        const bmNav = document.getElementById('blindMapNavBtn');
        const bmMob = document.getElementById('blindMapMobileBtn');
        if (bmNav) bmNav.style.display = 'none';
        if (bmMob) bmMob.style.display = 'none';
    }
    
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

    // Initialize image zoom viewer for Learn section
    initLearnImageModal();
    
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
    
    // Track used names to avoid duplicates
    const usedNames = new Set();
    
    Object.keys(currentData).forEach(category => {
        const data = currentData[category];
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = category;
        
        // Get a unique short name for the filter button
        let shortName = data.name.split(' ')[0];
        
        // If first word is already used, try second word or use abbreviation
        if (usedNames.has(shortName)) {
            const words = data.name.split(' ');
            if (words.length > 1) {
                // Try using second word or combination
                shortName = words[1].substring(0, 8);
            } else {
                // Add number suffix
                let suffix = 2;
                while (usedNames.has(shortName + suffix)) suffix++;
                shortName = shortName + suffix;
            }
        }
        
        // Limit to 10 characters max
        shortName = shortName.substring(0, 10);
        usedNames.add(shortName);
        
        btn.textContent = shortName;
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
    console.log('switchSection called with:', section);
    
    // Don't allow switching if no subject selected
    if (!currentSubject) {
        showSubjectSelector();
        return;
    }
    
    // Remove active from ALL sections
    const allSections = document.querySelectorAll('.section');
    console.log('Found sections:', allSections.length);
    allSections.forEach(s => {
        s.classList.remove('active');
        console.log('Removed active from:', s.id);
    });
    
    // Add active to target section
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Added active to:', section);
    } else {
        console.error('Section not found:', section);
    }
    
    currentSection = section;
    
    // Update nav buttons
    document.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    document.querySelectorAll('.study-mobile-nav .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === section);
    });
    
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
    } else if (section === 'learn') {
        cleanupLearnContentForMobile();
    } else if (section === 'blind-map') {
        initBlindMap();
    }
}

// ========== THEME ==========
function initTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('sokrat-theme', 'dark');
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

    const existingImage = document.getElementById('questionImage');
    if (existingImage) {
        existingImage.remove();
    }

    if (q.image) {
        const img = document.createElement('img');
        img.id = 'questionImage';
        img.className = 'quiz-question-image';
        img.src = q.image;
        img.alt = q.imageAlt || 'Quiz question image';
        img.loading = 'lazy';
        document.getElementById('questionText').insertAdjacentElement('afterend', img);
    }
    
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
                ${learnImage ? `<img src="${learnImage}" alt="${name}" class="learn-image learn-zoomable" loading="lazy">` : ''}
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

    // Make all Learn images clickable and keyboard accessible.
    enhanceLearnImages(container);

    // Apply mobile class hooks once Learn cards are in the DOM.
    cleanupLearnContentForMobile();
}

function enhanceLearnImages(container) {
    if (!container) return;

    container.querySelectorAll('.learn-card-content img').forEach(img => {
        img.classList.add('learn-image', 'learn-zoomable');
        img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Open image: ${img.alt || 'Learn image'}`);

        if (img.dataset.zoomBound === '1') return;

        img.addEventListener('click', () => {
            openLearnImageModal(img.src, img.alt || 'Learn image');
        });
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLearnImageModal(img.src, img.alt || 'Learn image');
            }
        });

        img.dataset.zoomBound = '1';
    });
}

function initLearnImageModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('imageModalClose');
    const backdrop = document.getElementById('imageModalBackdrop');

    if (!modal || !closeBtn || !backdrop) return;
    if (modal.dataset.initialized === '1') return;

    closeBtn.addEventListener('click', closeLearnImageModal);
    backdrop.addEventListener('click', closeLearnImageModal);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeLearnImageModal();
        }
    });

    modal.dataset.initialized = '1';
}

function openLearnImageModal(src, altText) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    const caption = document.getElementById('imageModalCaption');
    if (!modal || !img || !caption) return;

    img.src = src;
    img.alt = altText || 'Expanded learn image';
    caption.textContent = altText || 'Learn image';

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeLearnImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    const caption = document.getElementById('imageModalCaption');
    if (!modal || !img || !caption) return;

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    img.src = '';
    caption.textContent = '';
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
    
    // Geography-specific: Blind Map progress
    if (currentSubject === 'geography') {
        const bmSection = document.getElementById('blindMapProgressSection');
        if (bmSection) {
            bmSection.style.display = 'block';
            const bmAnswered = blindMapState.answers.length;
            const bmCorrect = blindMapState.answers.filter(a => a.correct).length;
            const bmAcc = bmAnswered > 0 ? Math.round((bmCorrect / bmAnswered) * 100) : 0;
            document.getElementById('blindMapAccuracy').textContent = `${bmAcc}%`;
            document.getElementById('blindMapAttempts').textContent = bmAnswered;
            document.getElementById('blindMapScore').textContent = blindMapState.score;
        }
    } else {
        const bmSection = document.getElementById('blindMapProgressSection');
        if (bmSection) bmSection.style.display = 'none';
    }
    
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
    const container = document.getElementById('learnContent');
    if (!container) return;

    if (window.innerWidth <= 767) {
        container.classList.add('mobile-view');
        container.querySelectorAll('.learn-card').forEach(card => {
            card.classList.add('mobile-card');
        });
    } else {
        container.classList.remove('mobile-view');
        container.querySelectorAll('.learn-card').forEach(card => {
            card.classList.remove('mobile-card');
        });
    }
}

window.cleanupLearnContentForMobile = cleanupLearnContentForMobile;

// ========== BLIND MAP - GEOGRAPHY INTERACTIVE MAP ==========
let blindMapState = {
    selectedLocation: null,
    currentQuestion: 0,
    score: 0,
    answers: []
};

// Blind map location data — coordinates match the canvas map
const blindMapLocations = {
    cities: [
        { name: 'Zagreb', x: 345, y: 145, aliases: ['zagreb'] },
        { name: 'Split', x: 242, y: 468, aliases: ['split'] },
        { name: 'Rijeka', x: 162, y: 235, aliases: ['rijeka'] },
        { name: 'Osijek', x: 710, y: 130, aliases: ['osijek'] },
        { name: 'Zadar', x: 210, y: 370, aliases: ['zadar'] },
        { name: 'Dubrovnik', x: 395, y: 595, aliases: ['dubrovnik'] },
        { name: 'Pula', x: 92, y: 355, aliases: ['pula'] },
        { name: 'Šibenik', x: 228, y: 430, aliases: ['sibenik', 'šibenik'] },
        { name: 'Vukovar', x: 800, y: 155, aliases: ['vukovar'] },
        { name: 'Karlovac', x: 315, y: 192, aliases: ['karlovac'] },
        { name: 'Varaždin', x: 330, y: 80, aliases: ['varazdin', 'varaždin'] },
        { name: 'Slavonski Brod', x: 650, y: 255, aliases: ['slavonski brod', 'sl. brod'] },
    ],
    nationalParks: [
        { name: 'Plitvička jezera', x: 368, y: 268, aliases: ['plitvice', 'plitvicka jezera', 'plitvička jezera'] },
        { name: 'Krka', x: 255, y: 440, aliases: ['krka'] },
        { name: 'Brijuni', x: 78, y: 338, aliases: ['brijuni'] },
        { name: 'Kornati', x: 205, y: 420, aliases: ['kornati'] },
        { name: 'Mljet', x: 375, y: 558, aliases: ['mljet'] },
        { name: 'Paklenica', x: 212, y: 345, aliases: ['paklenica'] },
        { name: 'Risnjak', x: 188, y: 195, aliases: ['risnjak'] },
        { name: 'Sjeverni Velebit', x: 195, y: 305, aliases: ['sjeverni velebit', 'north velebit'] },
    ],
    regions: [
        { name: 'Istra', x: 100, y: 290, aliases: ['istra', 'istria'] },
        { name: 'Dalmacija', x: 265, y: 480, aliases: ['dalmacija', 'dalmatia'] },
        { name: 'Slavonija', x: 650, y: 190, aliases: ['slavonija', 'slavonia'] },
        { name: 'Zagorje', x: 290, y: 100, aliases: ['zagorje'] },
        { name: 'Lika', x: 345, y: 300, aliases: ['lika'] },
        { name: 'Kvarner', x: 172, y: 265, aliases: ['kvarner'] },
    ]
};

let blindMapDifficulty = 'cities';
let blindMapQuestions = [];

function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initBlindMap() {
    if (currentSubject !== 'geography') return;
    document.getElementById('blindMapNavBtn')?.style.removeProperty('display');
    document.getElementById('blindMapMobileBtn')?.style.removeProperty('display');
    
    const canvas = document.getElementById('blindMapCanvas');
    if (canvas) {
        drawBlindMapCanvas();
        canvas.removeEventListener('click', handleBlindMapClick);
        canvas.addEventListener('click', handleBlindMapClick);
    }
    
    blindMapState = { selectedLocation: null, currentQuestion: 0, score: 0, answers: [] };
    blindMapQuestions = shuffleArray(blindMapLocations[blindMapDifficulty] || blindMapLocations.cities);
    updateBlindMapUI();
}

function drawBlindMapCanvas() {
    const canvas = document.getElementById('blindMapCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    
    // Sea background  
    ctx.fillStyle = '#c2dfe3';
    ctx.fillRect(0, 0, W, H);
    
    // Water pattern (subtle waves)
    ctx.strokeStyle = 'rgba(160, 200, 215, 0.4)';
    ctx.lineWidth = 0.5;
    for (let y = 0; y < H; y += 25) {
        ctx.beginPath();
        for (let x = 0; x < W; x += 5) {
            ctx.lineTo(x, y + Math.sin(x / 30 + y / 50) * 3);
        }
        ctx.stroke();
    }
    
    // ==== CROATIA MAINLAND — detailed outline ====
    // Canvas: 1000x700. Croatia mapped: lon 13.5-19.4 → x 60-940, lat 42.4-46.55 → y 610-30
    // Conversion: x = (lon - 13.5) * 149.15 + 60, y = 610 - (lat - 42.4) * 139.76
    
    const croatiaMainland = [
        // Start: NW Slovenia border near Bregana (Slovenian border, west)
        [190, 78],  // Macelj border
        [220, 72],  // NW Zagorje
        [260, 58],  // Cakovec / Medimurje
        [295, 48],  // Mursko Sredisce (northernmost)
        [330, 52],  // Lendava border area
        [355, 60],  // Legrad
        [380, 72],  // Koprivnica area
        [420, 68],  // Virovitica N border
        [465, 65],  // Slatina N border
        [510, 58],  // Nasice N border
        [555, 52],  // Donji Miholjac
        [600, 48],  // Beli Manastir area
        [640, 42],  // Baranja N tip
        [670, 50],  // Batina
        [690, 70],  // Danube bend
        [710, 95],  // Osijek NE approach
        [730, 105], // NE border
        [760, 120], // Ilok approach
        [785, 130], // Ilok
        [800, 145], // Vukovar area
        [810, 160], // Danube curve
        [805, 180], // Sotín
        [790, 195], // Tovarnik border
        [770, 210], // Sid border area
        [748, 222], // Zupanja approach
        [725, 232], // Zupanja
        [700, 240], // Slavonski Samac
        [675, 248], // Slavonski Brod E
        [645, 255], // Slavonski Brod
        [615, 262], // Nova Gradiska E
        [585, 268], // Nova Gradiska
        [558, 272], // Okucani
        [530, 275], // Pakrac S
        [508, 278], // Novska
        [485, 280], // Kutina area
        [460, 282], // Sisak approach
        [440, 278], // Sisak
        [425, 268], // Petrinja
        [415, 255], // Glina area
        [405, 240], // Slunj approach — Bosnian border goes south
        [395, 258], // Kordun
        [388, 278], // Plitvice area
        [380, 298], // Udbina
        [372, 315], // Gracac approach
        [360, 335], // Gracac
        [348, 352], // Obrovac approach
        [332, 368], // Maslenica
        [320, 385], // Zadar hinterland
        [310, 400], // Benkovac
        [305, 418], // Knin area
        [298, 435], // Drnis approach
        [292, 450], // Sibenik hinterland
        [285, 465], // Sinj approach (inland)
        [280, 478], // Sinj
        [275, 492], // Split hinterland
        [272, 505], // Imotski approach
        [268, 520], // Vrgorac
        [270, 535], // Metkovic approach
        [280, 548], // Metkovic / Neretva
        [292, 555], // Ploce hinterland
        [305, 560], // Neum gap (BiH corridor starts)
        [318, 558], // After Neum
        [330, 555], // Ston approach
        [345, 558], // Ston
        [358, 565], // Dubrovnik county
        [375, 575], // Slano
        [388, 585], // Dubrovnik hinterland
        [398, 595], // Gruda
        [408, 605], // Cavtat area
        [418, 615], // Prevlaka approach
        [425, 625], // Prevlaka (SE tip)
        // Coast return (going NW along Adriatic)
        [415, 618], // Cavtat coast
        [400, 605], // Zaton
        [385, 593], // Dubrovnik coast
        [372, 582], // Trsteno
        [358, 572], // Slano coast
        [342, 560], // Ston coast
        [325, 552], // Mali Ston
        [310, 548], // Neum gap coast  
        [295, 542], // Ploce coast
        [278, 530], // Gradac
        [265, 515], // Makarska coast
        [255, 498], // Baska Voda
        [248, 482], // Omis
        [242, 468], // Split coast S
        [238, 455], // Split
        [235, 440], // Kastela / Trogir
        [230, 425], // Primosten
        [225, 410], // Sibenik coast
        [218, 395], // Vodice
        [212, 378], // Biograd
        [208, 362], // Zadar coast S
        [205, 348], // Zadar
        [200, 332], // Nin
        [195, 316], // Starigrad
        [190, 300], // Karlobag
        [185, 285], // Senj
        [178, 270], // Novi Vinodolski
        [170, 258], // Crikvenica
        [162, 248], // Rijeka outskirts
        [155, 238], // Opatija
        [148, 230], // Abbazia coast
        // Istria coast (going around peninsula)
        [140, 222], // Matulji
        [132, 215], // Kastav
        [125, 225], // Opatija riviera
        [118, 235], // Lovran
        [110, 248], // Moscenicka Draga
        [105, 262], // Labin approach
        [100, 278], // Rabac
        [96, 295],  // Labin coast
        [92, 312],  // Plomin
        [90, 328],  // East Istria
        [88, 342],  // Raša
        [90, 355],  // Pula approach E
        [95, 365],  // Medulin approach
        [100, 375], // Premantura
        [98, 380],  // Cape Kamenjak (southernmost Istria)
        [92, 375],  // Return W
        [85, 365],  // Pula SW
        [80, 352],  // Pula W coast
        [78, 338],  // Fazana
        [76, 322],  // Brijuni coast
        [78, 308],  // Vrsar approach
        [80, 292],  // Rovinj
        [82, 278],  // Vrsar
        [85, 262],  // Porec approach
        [88, 248],  // Porec
        [92, 235],  // Novigrad
        [98, 222],  // Umag approach
        [105, 210], // Umag
        [112, 198], // Slovenian border coast
        [120, 188], // NW tip (Savudrija)
        // Back inland along Slovenian border
        [130, 178], // Dragonja border
        [142, 168], // Buzet approach
        [152, 155], // Buzet / Cicarija
        [160, 142], // Lanisce
        [165, 130], // Rupa border
        [168, 118], // Slovenian border N
        [172, 105], // Bregana approach
        [178, 92],  // Krapina area
        [190, 78],  // Close 
    ];
    
    // Draw mainland
    ctx.beginPath();
    ctx.moveTo(croatiaMainland[0][0], croatiaMainland[0][1]);
    for (let i = 1; i < croatiaMainland.length; i++) {
        ctx.lineTo(croatiaMainland[i][0], croatiaMainland[i][1]);
    }
    ctx.closePath();
    
    // Land fill with subtle gradient
    const landGrad = ctx.createLinearGradient(0, 0, W, H);
    landGrad.addColorStop(0, '#f0ead6');
    landGrad.addColorStop(1, '#e8dfc8');
    ctx.fillStyle = landGrad;
    ctx.fill();
    
    // Border
    ctx.strokeStyle = '#7a6b52';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // ==== ISLANDS ====
    function drawDetailedIsland(points, fill) {
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        ctx.fillStyle = fill || '#ebe5d4';
        ctx.fill();
        ctx.strokeStyle = '#7a6b52';
        ctx.lineWidth = 1.2;
        ctx.stroke();
    }
    
    // Krk
    drawDetailedIsland([
        [168, 268], [180, 260], [195, 258], [205, 265], 
        [208, 278], [200, 290], [188, 295], [175, 292], 
        [165, 282], [168, 268]
    ]);
    
    // Cres (elongated N-S)
    drawDetailedIsland([
        [148, 260], [155, 252], [162, 255], [165, 268],
        [162, 290], [158, 310], [152, 325], [145, 335],
        [138, 330], [140, 312], [142, 290], [145, 270],
        [148, 260]
    ]);
    
    // Rab
    drawDetailedIsland([
        [178, 302], [192, 298], [198, 305], [195, 312],
        [182, 316], [175, 310], [178, 302]
    ]);
    
    // Pag (long narrow)
    drawDetailedIsland([
        [185, 325], [195, 320], [200, 325], [205, 338],
        [208, 355], [206, 368], [200, 375], [194, 370],
        [190, 355], [187, 340], [185, 325]
    ]);
    
    // Dugi Otok
    drawDetailedIsland([
        [178, 385], [185, 380], [192, 385], [195, 400],
        [192, 415], [185, 420], [178, 412], [176, 398],
        [178, 385]
    ]);
    
    // Brac (large, wide)
    drawDetailedIsland([
        [222, 475], [235, 468], [252, 465], [268, 468],
        [275, 475], [272, 485], [258, 490], [240, 492],
        [225, 488], [220, 480], [222, 475]
    ]);
    
    // Hvar (long narrow)
    drawDetailedIsland([
        [210, 492], [225, 488], [245, 490], [265, 495],
        [278, 500], [282, 508], [275, 512], [255, 510],
        [235, 505], [218, 500], [210, 495], [210, 492]
    ]);
    
    // Vis
    drawDetailedIsland([
        [188, 505], [200, 500], [215, 502], [222, 508],
        [218, 515], [205, 518], [192, 515], [188, 505]
    ]);
    
    // Korcula (long)
    drawDetailedIsland([
        [298, 530], [315, 525], [332, 528], [345, 532],
        [350, 538], [342, 542], [325, 540], [308, 538],
        [298, 535], [298, 530]
    ]);
    
    // Mljet
    drawDetailedIsland([
        [355, 555], [370, 550], [388, 552], [395, 558],
        [390, 565], [375, 568], [360, 565], [355, 558],
        [355, 555]
    ]);
    
    // Lastovo
    drawDetailedIsland([
        [310, 555], [320, 550], [328, 555], [325, 562],
        [315, 565], [308, 560], [310, 555]
    ]);
    
    // ==== NEIGHBOURING COUNTRIES (faded) ====
    // Slovenia (partial)
    ctx.beginPath();
    ctx.moveTo(120, 188);
    ctx.lineTo(112, 178);
    ctx.lineTo(105, 165);
    ctx.lineTo(110, 150);
    ctx.lineTo(125, 135);
    ctx.lineTo(145, 120);
    ctx.lineTo(165, 110);
    ctx.lineTo(190, 78);
    ctx.lineTo(220, 72);
    ctx.lineTo(260, 58);
    ctx.lineTo(295, 48);
    ctx.lineTo(295, 15);
    ctx.lineTo(60, 15);
    ctx.lineTo(60, 195);
    ctx.lineTo(105, 210);
    ctx.lineTo(112, 198);
    ctx.lineTo(120, 188);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 200, 190, 0.35)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 140, 120, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Hungary (partial, north)
    ctx.beginPath();
    ctx.moveTo(295, 48);
    ctx.lineTo(330, 52);
    ctx.lineTo(355, 60);
    ctx.lineTo(380, 72);
    ctx.lineTo(420, 68);
    ctx.lineTo(465, 65);
    ctx.lineTo(510, 58);
    ctx.lineTo(555, 52);
    ctx.lineTo(600, 48);
    ctx.lineTo(640, 42);
    ctx.lineTo(670, 50);
    ctx.lineTo(670, 15);
    ctx.lineTo(295, 15);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 200, 190, 0.35)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 140, 120, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Serbia (partial, east)
    ctx.beginPath();
    ctx.moveTo(670, 50);
    ctx.lineTo(690, 70);
    ctx.lineTo(710, 95);
    ctx.lineTo(730, 105);
    ctx.lineTo(760, 120);
    ctx.lineTo(785, 130);
    ctx.lineTo(800, 145);
    ctx.lineTo(810, 160);
    ctx.lineTo(805, 180);
    ctx.lineTo(790, 195);
    ctx.lineTo(770, 210);
    ctx.lineTo(940, 210);
    ctx.lineTo(940, 15);
    ctx.lineTo(670, 15);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 200, 190, 0.35)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 140, 120, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // BiH (partial)
    ctx.beginPath();
    ctx.moveTo(770, 210);
    ctx.lineTo(748, 222);
    ctx.lineTo(725, 232);
    ctx.lineTo(700, 240);
    ctx.lineTo(675, 248);
    ctx.lineTo(645, 255);
    ctx.lineTo(615, 262);
    ctx.lineTo(585, 268);
    ctx.lineTo(558, 272);
    ctx.lineTo(530, 275);
    ctx.lineTo(508, 278);
    ctx.lineTo(485, 280);
    ctx.lineTo(460, 282);
    ctx.lineTo(440, 278);
    ctx.lineTo(425, 268);
    ctx.lineTo(415, 255);
    ctx.lineTo(405, 240);
    ctx.lineTo(395, 258);
    ctx.lineTo(388, 278);
    ctx.lineTo(380, 298);
    ctx.lineTo(372, 315);
    ctx.lineTo(360, 335);
    ctx.lineTo(348, 352);
    ctx.lineTo(332, 368);
    ctx.lineTo(320, 385);
    ctx.lineTo(310, 400);
    ctx.lineTo(305, 418);
    ctx.lineTo(298, 435);
    ctx.lineTo(292, 450);
    ctx.lineTo(285, 465);
    ctx.lineTo(280, 478);
    ctx.lineTo(275, 492);
    ctx.lineTo(272, 505);
    ctx.lineTo(268, 520);
    ctx.lineTo(270, 535);
    ctx.lineTo(280, 548);
    ctx.lineTo(305, 560);
    ctx.lineTo(940, 560);
    ctx.lineTo(940, 210);
    ctx.closePath();
    ctx.fillStyle = 'rgba(200, 200, 190, 0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(150, 140, 120, 0.25)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // ==== LABELS ====
    // Croatia
    ctx.fillStyle = 'rgba(100, 85, 60, 0.12)';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HRVATSKA', 420, 200);
    
    // Adriatic
    ctx.fillStyle = 'rgba(60, 110, 140, 0.18)';
    ctx.font = 'italic 22px Georgia';
    ctx.save();
    ctx.translate(110, 480);
    ctx.rotate(-0.6);
    ctx.fillText('Jadransko more', 0, 0);
    ctx.restore();
    
    // Neighbour labels (very faded)
    ctx.fillStyle = 'rgba(120, 120, 110, 0.2)';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SLOVENIJA', 120, 80);
    ctx.fillText('MAĐARSKA', 470, 38);
    ctx.fillText('SRBIJA', 870, 120);
    ctx.fillText('BIH', 550, 380);
    
    // Compass rose
    ctx.fillStyle = '#7a6b52';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', 930, 625);
    ctx.beginPath();
    ctx.moveTo(930, 630);
    ctx.lineTo(925, 648);
    ctx.lineTo(935, 648);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(930, 665);
    ctx.lineTo(925, 648);
    ctx.lineTo(935, 648);
    ctx.closePath();
    ctx.strokeStyle = '#7a6b52';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawIsland(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, -0.3, 0, Math.PI * 2);
    ctx.fillStyle = '#ede8d8';
    ctx.fill();
    ctx.strokeStyle = '#7a6b52';
    ctx.lineWidth = 1.5;
    ctx.stroke();
}

function handleBlindMapClick(event) {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    blindMapState.selectedLocation = { x, y };
    document.getElementById('mapCoords').textContent = `Clicked: X=${x}, Y=${y}`;
    
    drawBlindMapCanvas();
    const ctx = canvas.getContext('2d');
    // Draw pin marker
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 3;
    ctx.stroke();
    // Pin glow
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function submitMapAnswer() {
    if (!blindMapState.selectedLocation) {
        showToast('Click on the map to select a location first');
        return;
    }
    
    const currentQ = blindMapQuestions[blindMapState.currentQuestion];
    if (!currentQ) return;
    
    const dx = blindMapState.selectedLocation.x - currentQ.x;
    const dy = blindMapState.selectedLocation.y - currentQ.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = 45; // px tolerance
    const isCorrect = distance <= threshold;
    
    const feedback = document.getElementById('mapFeedback');
    const message = document.getElementById('feedbackMessage');
    
    feedback.classList.toggle('correct', isCorrect);
    feedback.classList.toggle('incorrect', !isCorrect);
    feedback.classList.add('show');
    
    if (isCorrect) {
        message.innerHTML = `<i class="fas fa-check"></i> Correct! That's ${currentQ.name}!`;
        blindMapState.score += 10;
    } else {
        message.innerHTML = `<i class="fas fa-times"></i> That's not right. ${currentQ.name} is elsewhere. (${Math.round(distance)}px off)`;
        // Show correct location
        const canvas = document.getElementById('blindMapCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(currentQ.x, currentQ.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(currentQ.name, currentQ.x, currentQ.y - 14);
    }
    
    blindMapState.answers.push({ q: blindMapState.currentQuestion, correct: isCorrect });
    document.getElementById('mapScore').textContent = blindMapState.score;
    
    setTimeout(() => {
        blindMapState.selectedLocation = null;
        blindMapState.currentQuestion++;
        if (blindMapState.currentQuestion >= blindMapQuestions.length) {
            showMapResults();
        } else {
            feedback.classList.remove('show');
            drawBlindMapCanvas();
            updateBlindMapUI();
        }
    }, 1500);
}

function showMapResults() {
    const correct = blindMapState.answers.filter(a => a.correct).length;
    const total = blindMapQuestions.length;
    const pct = Math.round((correct / total) * 100);
    const feedback = document.getElementById('mapFeedback');
    const message = document.getElementById('feedbackMessage');
    feedback.classList.remove('correct', 'incorrect');
    feedback.classList.add('show', pct >= 50 ? 'correct' : 'incorrect');
    message.innerHTML = `<i class="fas fa-flag-checkered"></i> Finished! ${correct}/${total} correct (${pct}%). Score: ${blindMapState.score}`;
}

function validateBlindMapAnswer(answer) {
    const currentQ = blindMapQuestions[blindMapState.currentQuestion];
    if (!currentQ) return false;
    return currentQ.aliases.some(a => answer === a);
}

function clearMapSelection() {
    document.getElementById('mapCoords').textContent = 'No location selected';
    blindMapState.selectedLocation = null;
    drawBlindMapCanvas();
}

function skipMapQuestion() {
    clearMapSelection();
    document.getElementById('mapFeedback').classList.remove('show');
    
    // Show correct answer before skipping
    const currentQ = blindMapQuestions[blindMapState.currentQuestion];
    if (currentQ) {
        const canvas = document.getElementById('blindMapCanvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(currentQ.x, currentQ.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(currentQ.name, currentQ.x, currentQ.y - 14);
    }
    
    blindMapState.answers.push({ q: blindMapState.currentQuestion, correct: false });
    
    setTimeout(() => {
        blindMapState.currentQuestion++;
        if (blindMapState.currentQuestion >= blindMapQuestions.length) {
            showMapResults();
        } else {
            drawBlindMapCanvas();
            updateBlindMapUI();
        }
    }, 1000);
}

function updateBlindMapUI() {
    const total = blindMapQuestions.length || 1;
    const idx = Math.min(blindMapState.currentQuestion, total - 1);
    document.getElementById('mapProgressCount').textContent = `${idx + 1}/${total}`;
    document.getElementById('mapScore').textContent = blindMapState.score;
    const pct = ((idx + 1) / total) * 100;
    document.getElementById('mapProgressFill').style.width = pct + '%';
    
    // Show current question task
    const currentQ = blindMapQuestions[idx];
    const taskEl = document.getElementById('mapTaskName');
    if (taskEl && currentQ) {
        taskEl.textContent = `Find: ${currentQ.name}`;
    }
}

function setBlindMapDifficulty(level) {
    blindMapDifficulty = level;
    document.querySelectorAll('.map-diff-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.level === level);
    });
    initBlindMap();
}

window.submitMapAnswer = submitMapAnswer;
window.clearMapSelection = clearMapSelection;
window.skipMapQuestion = skipMapQuestion;
window.initBlindMap = initBlindMap;
window.handleBlindMapClick = handleBlindMapClick;
window.setBlindMapDifficulty = setBlindMapDifficulty;

window.addEventListener('resize', cleanupLearnContentForMobile);
window.addEventListener('orientationchange', cleanupLearnContentForMobile);
