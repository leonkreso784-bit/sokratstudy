// Opći dio građanskog prava i obvezno pravo (PFRI) — Final (cijelo gradivo)
// Spaja M1 + M2 + examPractice (pitanja kroz cijelo gradivo).
// MORA se učitati POSLIJE midterm-1/2.
// 🚧 U GRADNJI — `examPractice` se piše kad oba međuispitna dijela budu gotova.

const ogpPfriFinalExamPractice = {
  id: "ogpexp",
  name: "Ispitna pitanja kroz cijelo gradivo",
  icon: "fa-graduation-cap",
  color: "#4d7c0f",
  flashcards: [],
  quiz: [],
  fillBlanks: [],
  learn: {
    id: "logpex",
    title: "Ispitna pitanja kroz cijelo gradivo",
    content: `<p>U pripremi.</p>`
  }
};

const ogpPfriFinal = Object.assign(
    {},
    (typeof window !== 'undefined' && window.ogpPfriM1) ? window.ogpPfriM1 : {},
    (typeof window !== 'undefined' && window.ogpPfriM2) ? window.ogpPfriM2 : {},
    { examPractice: ogpPfriFinalExamPractice }
  );

if (typeof window !== 'undefined') { window.ogpPfriFinal = ogpPfriFinal; }
