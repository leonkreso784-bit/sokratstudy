// ===== SOKRAT STUDY — BLIND MAP (Geography) =====

let blindMapState = {
    selectedLocation: null,
    currentQuestion: 0,
    score: 0,
    answers: []
};

// Blind map location data — coordinates from actual blind-map.png pixel analysis
// Formula: x = 243 + (lon - 13.50) * 85.4, y = 109 + (46.55 - lat) * 121.9
const blindMapLocations = {
    cities: [
        { name: 'Zagreb', x: 456, y: 199, aliases: ['zagreb'] },
        { name: 'Split', x: 494, y: 480, aliases: ['split'] },
        { name: 'Rijeka', x: 323, y: 258, aliases: ['rijeka'] },
        { name: 'Osijek', x: 686, y: 231, aliases: ['osijek'] },
        { name: 'Zadar', x: 391, y: 405, aliases: ['zadar'] },
        { name: 'Dubrovnik', x: 635, y: 584, aliases: ['dubrovnik'] },
        { name: 'Pula', x: 273, y: 314, aliases: ['pula'] },
        { name: 'Šibenik', x: 448, y: 453, aliases: ['sibenik', 'šibenik', 'sibenik'] },
        { name: 'Vukovar', x: 713, y: 255, aliases: ['vukovar'] },
        { name: 'Karlovac', x: 418, y: 238, aliases: ['karlovac'] },
        { name: 'Varaždin', x: 486, y: 139, aliases: ['varazdin', 'varaždin'] },
        { name: 'Slavonski Brod', x: 629, y: 278, aliases: ['slavonski brod', 'sl. brod'] },
        { name: 'Rovinj', x: 255, y: 288, aliases: ['rovinj'] },
        { name: 'Poreč', x: 251, y: 270, aliases: ['porec', 'poreč'] },
        { name: 'Umag', x: 244, y: 245, aliases: ['umag'] },
        { name: 'Medulin', x: 280, y: 320, aliases: ['medulin'] },
        { name: 'Funtana', x: 252, y: 277, aliases: ['funtana'] },
        { name: 'Sisak', x: 488, y: 241, aliases: ['sisak'] },
        { name: 'Gospić', x: 403, y: 353, aliases: ['gospic', 'gospić'] },
        { name: 'Čakovec', x: 494, y: 130, aliases: ['cakovec', 'čakovec'] },
        { name: 'Krapina', x: 445, y: 157, aliases: ['krapina'] },
        { name: 'Koprivnica', x: 527, y: 156, aliases: ['koprivnica'] },
        { name: 'Bjelovar', x: 528, y: 188, aliases: ['bjelovar'] },
        { name: 'Virovitica', x: 575, y: 197, aliases: ['virovitica'] },
        { name: 'Požega', x: 600, y: 258, aliases: ['pozega', 'požega'] },
        { name: 'Pazin', x: 280, y: 269, aliases: ['pazin'] },
        { name: 'Opatija', x: 312, y: 257, aliases: ['opatija'] },
        { name: 'Trogir', x: 478, y: 479, aliases: ['trogir'] },
        { name: 'Makarska', x: 543, y: 506, aliases: ['makarska'] },
        { name: 'Nin', x: 386, y: 390, aliases: ['nin'] },
        { name: 'Ston', x: 601, y: 561, aliases: ['ston'] },
    ],
    islands: [
        { name: 'Krk', x: 335, y: 295, aliases: ['krk'] },
        { name: 'Cres', x: 320, y: 303, aliases: ['cres'] },
        { name: 'Rab', x: 351, y: 328, aliases: ['rab'] },
        { name: 'Pag', x: 375, y: 366, aliases: ['pag'] },
        { name: 'Lošinj', x: 326, y: 355, aliases: ['losinj', 'lošinj'] },
        { name: 'Brač', x: 512, y: 510, aliases: ['brac', 'brač'] },
        { name: 'Hvar', x: 494, y: 521, aliases: ['hvar'] },
        { name: 'Vis', x: 472, y: 535, aliases: ['vis'] },
        { name: 'Korčula', x: 554, y: 547, aliases: ['korcula', 'korčula'] },
        { name: 'Lastovo', x: 533, y: 570, aliases: ['lastovo'] },
    ],
    nationalParks: [
        { name: 'Plitvička jezera', x: 424, y: 313, aliases: ['plitvice', 'plitvicka jezera', 'plitvička jezera'] },
        { name: 'Krka', x: 454, y: 444, aliases: ['krka'] },
        { name: 'Brijuni', x: 265, y: 309, aliases: ['brijuni'] },
        { name: 'Kornati', x: 397, y: 444, aliases: ['kornati'] },
        { name: 'Mljet', x: 587, y: 570, aliases: ['mljet'] },
        { name: 'Paklenica', x: 409, y: 375, aliases: ['paklenica'] },
        { name: 'Risnjak', x: 337, y: 247, aliases: ['risnjak'] },
        { name: 'Sjeverni Velebit', x: 369, y: 325, aliases: ['sjeverni velebit', 'north velebit'] },
    ],
    natureParks: [
        { name: 'Kopački rit', x: 695, y: 224, aliases: ['kopacki rit', 'kopački rit'] },
        { name: 'Medvednica', x: 454, y: 191, aliases: ['medvednica'] },
        { name: 'Papuk', x: 599, y: 235, aliases: ['papuk'] },
        { name: 'Žumberak', x: 409, y: 209, aliases: ['zumberak', 'žumberak'] },
        { name: 'Lonjsko polje', x: 514, y: 254, aliases: ['lonjsko polje'] },
        { name: 'Učka', x: 301, y: 261, aliases: ['ucka', 'učka'] },
        { name: 'Telašćica', x: 385, y: 434, aliases: ['telascica', 'telašćica'] },
        { name: 'Velebit', x: 378, y: 326, aliases: ['velebit'] },
        { name: 'Vransko jezero', x: 418, y: 433, aliases: ['vransko jezero'] },
        { name: 'Dinara', x: 491, y: 432, aliases: ['dinara'] },
        { name: 'Biokovo', x: 546, y: 500, aliases: ['biokovo'] },
        { name: 'Lastovsko otočje', x: 529, y: 573, aliases: ['lastovsko otocje', 'lastovsko otočje'] },
    ],
    regions: [
        { name: 'Istra', x: 286, y: 274, aliases: ['istra', 'istria'] },
        { name: 'Dalmacija', x: 499, y: 481, aliases: ['dalmacija', 'dalmatia'] },
        { name: 'Slavonija', x: 627, y: 261, aliases: ['slavonija', 'slavonia'] },
        { name: 'Zagorje', x: 448, y: 164, aliases: ['zagorje'] },
        { name: 'Lika', x: 397, y: 347, aliases: ['lika'] },
        { name: 'Kvarner', x: 328, y: 274, aliases: ['kvarner'] },
    ]
};

let blindMapDifficulty = 'cities';
let blindMapQuestions = [];
// Brava protiv dvostrukog Provjeri/Preskoči za vrijeme feedbacka + id timera koji prelazi na iduće pitanje.
let blindMapBusy = false;
let blindMapTimer = null;

// ===== TEKST (F3/2) =====
// Sav tekst sučelja ide kroz rječnik (`map.*` u js/i18n.js); imena mjesta su gradivo i ne prevode
// se (ADR-012). Poruke koje ovise o STANJU crtaju se iz stanja, pa ih promjena jezika može precrtati
// (`renderBlindMapText`, zove je `applyTranslations`).
const mapT = (k) => (typeof t === 'function' ? t(k) : k);

function drawMapCoordsText() {
    const el = document.getElementById('mapCoords');
    if (!el) return;
    const s = blindMapState.selectedLocation;
    el.textContent = s
        ? mapT('map.clicked').replace('{x}', String(s.x)).replace('{y}', String(s.y))
        : mapT('map.noSelection');
}

// Ikona + tekst kao DOM, ne `innerHTML`: poruka nosi ime mjesta, a `append` tekst ne tumači kao
// HTML — nema se što escapeati. (Do F3/2 je ime išlo golo u `innerHTML`.)
function setMapMessage(icon, text) {
    const el = document.getElementById('feedbackMessage');
    if (!el) return;
    const i = document.createElement('i');
    i.className = 'fas ' + icon;
    el.textContent = '';
    el.append(i, ' ' + text);
}

function renderBlindMapText() {
    drawMapCoordsText();
    if (blindMapQuestions.length && blindMapState.currentQuestion >= blindMapQuestions.length) showMapResults();
}

function initBlindMap() {
    // Zastavica iz kataloga, ne ime predmeta: kartu imaju i `geography` i `geography-hr`.
    const bmSubject = (typeof SokratCatalog !== 'undefined') ? SokratCatalog.getSubject(AppState.nav.subject) : null;
    if (!(bmSubject && bmSubject.features && bmSubject.features.blindMap)) return;
    document.getElementById('blindMapNavBtn')?.style.removeProperty('display');
    document.getElementById('blindMapMobileBtn')?.style.removeProperty('display');
    
    const canvas = document.getElementById('blindMapCanvas');
    if (canvas) {
        resizeBlindMapCanvas();
        drawBlindMapCanvas();
        canvas.removeEventListener('click', handleBlindMapClick);
        canvas.addEventListener('click', handleBlindMapClick);
        canvas.removeEventListener('touchend', handleBlindMapTouch);
        canvas.addEventListener('touchend', handleBlindMapTouch, { passive: false });
    }

    if (window._blindMapResizeHandler) {
        window.removeEventListener('resize', window._blindMapResizeHandler);
    }
    window._blindMapResizeHandler = function() {
        resizeBlindMapCanvas();
        drawBlindMapCanvas();
        if (blindMapState.selectedLocation) {
            const c = document.getElementById('blindMapCanvas');
            if (c) {
                const ctx = c.getContext('2d');
                const x = blindMapState.selectedLocation.x;
                const y = blindMapState.selectedLocation.y;
                ctx.fillStyle = '#6366f1';
                ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#4338ca'; ctx.lineWidth = 3; ctx.stroke();
            }
        }
    };
    window.addEventListener('resize', window._blindMapResizeHandler);
    
    clearTimeout(blindMapTimer);
    blindMapBusy = false;
    blindMapState = { selectedLocation: null, currentQuestion: 0, score: 0, answers: [] };
    blindMapQuestions = shuffleArray([...(blindMapLocations[blindMapDifficulty] || blindMapLocations.cities)]);
    drawMapCoordsText();
    updateBlindMapUI();
}

function resizeBlindMapCanvas() {
    const canvas = document.getElementById('blindMapCanvas');
    if (!canvas) return;
    const wrapper = canvas.parentElement;
    const containerWidth = wrapper ? wrapper.clientWidth : 900;
    canvas.width = 1000;
    canvas.height = 700;
    canvas.style.width = containerWidth + 'px';
    canvas.style.height = Math.round(containerWidth * 0.7) + 'px';
}

function handleBlindMapTouch(event) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    if (!touch) return;
    const canvas = document.getElementById('blindMapCanvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((touch.clientX - rect.left) * scaleX);
    const y = Math.round((touch.clientY - rect.top) * scaleY);
    
    blindMapState.selectedLocation = { x, y };
    drawMapCoordsText();
    
    drawBlindMapCanvas();
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#6366f1';
    ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#4338ca'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)'; ctx.lineWidth = 2; ctx.stroke();
}

function drawBlindMapCanvas() {
    const canvas = document.getElementById('blindMapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    if (!window._blindMapImg) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        // F3 3D: WebP je ≈40× manji od PNG-a za ovu kartu (1.52 MB → 39 KB, vizualno identično).
        // Probaj WebP prvo; na grešci (stari preglednik bez WebP-a / decode fail) padni na PNG.
        // ?v= token = window.CONTENT_VERSION (runtime, već bumpan) → usklađeno sa SW/cacheom.
        const ver = (typeof window !== 'undefined' && window.CONTENT_VERSION) ? ('?v=' + window.CONTENT_VERSION) : '';
        let triedPngFallback = false;
        img.onload = function() {
            window._blindMapImg = img;
            drawBlindMapCanvas();
        };
        img.onerror = function() {
            if (!triedPngFallback) {
                triedPngFallback = true;     // WebP nije uspio → PNG fallback
                img.src = 'blind-map.png' + ver;
                return;
            }
            // I PNG pao → poruka o grešci (isto kao prije).
            ctx.fillStyle = '#0f0d2e';
            ctx.fillRect(0, 0, W, H);
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(mapT('map.loadError'), W/2, H/2);
        };
        img.src = 'blind-map.webp' + ver;
        ctx.fillStyle = '#0f0d2e';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(mapT('map.loading'), W/2, H/2);
        return;
    }

    ctx.drawImage(window._blindMapImg, 0, 0, W, H);
}

function handleBlindMapClick(event) {
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((event.clientX - rect.left) * scaleX);
    const y = Math.round((event.clientY - rect.top) * scaleY);
    
    blindMapState.selectedLocation = { x, y };
    drawMapCoordsText();
    
    drawBlindMapCanvas();
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#6366f1';
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4338ca';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function submitMapAnswer() {
    if (blindMapBusy) return;
    if (!blindMapState.selectedLocation) {
        showToast(mapT('map.selectFirst'));
        return;
    }
    
    const currentQ = blindMapQuestions[blindMapState.currentQuestion];
    if (!currentQ) return;
    
    const dx = blindMapState.selectedLocation.x - currentQ.x;
    const dy = blindMapState.selectedLocation.y - currentQ.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const threshold = 45;
    // Pogodak samo ako je klik u radijusu I ovo je najbliža meta u trenutnom skupu (gusti gradovi, npr. Poreč–Funtana ~7px).
    const nearest = blindMapQuestions.reduce((best, loc) => {
        const d = Math.hypot(blindMapState.selectedLocation.x - loc.x, blindMapState.selectedLocation.y - loc.y);
        return d < best.d ? { loc, d } : best;
    }, { loc: null, d: Infinity }).loc;
    const isCorrect = distance <= threshold && nearest === currentQ;
    blindMapBusy = true;
    
    const feedback = document.getElementById('mapFeedback');

    feedback.classList.toggle('correct', isCorrect);
    feedback.classList.toggle('incorrect', !isCorrect);
    feedback.classList.add('show');

    if (isCorrect) {
        setMapMessage('fa-check', mapT('map.correct').replace('{name}', currentQ.name));
        blindMapState.score += 10;
    } else {
        setMapMessage('fa-times', mapT('map.wrong')
            .replace('{name}', currentQ.name).replace('{n}', String(Math.round(distance))));
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
    
    blindMapTimer = setTimeout(() => {
        blindMapBusy = false;
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
    feedback.classList.remove('correct', 'incorrect');
    feedback.classList.add('show', pct >= 50 ? 'correct' : 'incorrect');
    setMapMessage('fa-flag-checkered', mapT('map.finished')
        .replace('{correct}', String(correct)).replace('{total}', String(total))
        .replace('{pct}', String(pct)).replace('{score}', String(blindMapState.score)));
}

function validateBlindMapAnswer(answer) {
    const currentQ = blindMapQuestions[blindMapState.currentQuestion];
    if (!currentQ) return false;
    return currentQ.aliases.some(a => answer === a);
}

function clearMapSelection() {
    blindMapState.selectedLocation = null;
    drawMapCoordsText();
    drawBlindMapCanvas();
}

function skipMapQuestion() {
    if (blindMapBusy) return;
    blindMapBusy = true;
    clearMapSelection();
    document.getElementById('mapFeedback').classList.remove('show');
    
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
    
    blindMapTimer = setTimeout(() => {
        blindMapBusy = false;
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
    
    const currentQ = blindMapQuestions[idx];
    const taskEl = document.getElementById('mapTaskName');
    if (taskEl && currentQ) {
        // Samo ime: rečenicu („Pokaži na karti:") nosi markup ispred. Do F3/2 je ovdje stajalo
        // „Find: …", pa je ekran pisao „Click on the location of: Find: Zagreb".
        taskEl.textContent = currentQ.name;
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
window.handleBlindMapTouch = handleBlindMapTouch;
window.resizeBlindMapCanvas = resizeBlindMapCanvas;
window.setBlindMapDifficulty = setBlindMapDifficulty;
window.renderBlindMapText = renderBlindMapText;
