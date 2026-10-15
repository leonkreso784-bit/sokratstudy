# 🎓 **SOKRAT STUDY**
## Interactive Learning Platform for University Students

[![Live Demo](https://img.shields.io/badge/Live%20Demo-www.sokratstudy.com-blue?style=flat-square)](https://www.sokratstudy.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![GitHub Repo](https://img.shields.io/badge/GitHub-leonkreso784--bit-black?style=flat-square)](https://github.com/leonkreso784-bit/sokratstudy)

---

## 👤 **About the Creator**

I'm **Leon Kreso**, a 21-year-old self-taught coder from Opatija, Croatia, currently studying **Hospitality Management** at the Faculty of Tourism & Hospitality Management.

**Why I built this:**  
I didn't want to just watch the AI revolution from the sidelines. I decided to **learn by doing** — building a real product that solves a genuine problem (helping students study effectively). My goal is to grow this into a **full-featured AI learning platform** that truly transforms how students prepare for exams.

This is currently my passion project and hobby, but I'm committed to turning it into something bigger. 🚀

---

## 🎯 **What is Sokrat Study?**

**Sokrat Study** is a **completely free, interactive learning platform** designed specifically for university students. It brings together multiple proven study techniques in one place:

- 📚 **Learn Mode** — Deep dive into comprehensive study materials with images and explanations
- 🎴 **Flashcards** — Active recall with smart progress tracking
- ❓ **Quiz Mode** — Multiple-choice questions with instant feedback
- ✏️ **Fill-in-the-Blank** — Reinforce vocabulary and key concepts
- 🎮 **Interactive Exercises** — 7 different types of auto-graded problems (choice, numeric, ratio, statement, classify, journal, citations)
- 📊 **Progress Tracking** — Visual analytics of your learning journey
- 🗺️ **Blind Map** — Geography visual learning tool
- ☁️ **Cloud Backup** — Optional account creation for seamless progress sync across devices

**All completely free. No paywalls, no premium features.**

---

## 📍 **Current Content**

### **Live on Platform:**
- **18+ Subjects** across 2 years of the Hospitality Management program
- **~2000+ Flashcards** · **3000+ Quiz Questions** · **500+ Exercises**
- **Complete:** Economics in Hospitality, Tourism Economics, Entrepreneurship, Marketing, Accounting, Food & Nutrition, Tourism Geography, Business Informatics, Management, Special Interest Tourism, SIT, Microeconomics, Statistics (with interactive exercises), Macroeconomics (with 81 exercises), Academic Writing (with citation exercises), Math, Traffic in Tourism, E-Business
- **Hierarchical Navigation:** Faculty → Program → Year → Semester → Subject

### **Languages:**
- 🇬🇧 **English** (primary)
- 🇭🇷 **Croatian** (pilot: Business Informatics, expanding to all subjects)

### **Special Features:**
- **KaTeX Math Support** — Quantitative subjects render mathematical formulas beautifully
- **AI-Powered Content Generation** — New subjects added via Claude AI pipeline (minimal manual effort)
- **Progressive Web App** — Works offline, installable on mobile

---

## 🛠️ **Tech Stack**

### **Frontend**
- **Vanilla JavaScript (ES6+)** — No frameworks, no build step (pure browser-based)
- **HTML5 & CSS3** — Custom responsive design, dark mode optimized
- **Web Components** — Reusable UI primitives (`<sokrat-toast>`, `<sokrat-modal>`, `<sokrat-confirm>`)
- **KaTeX CDN** — Mathematical formula rendering (currency-safe delimiters)
- **Font Awesome** & **Google Fonts** — Icons and typography
- **PWA Manifest** — Offline capability with lazy-loading

### **Backend & Cloud**
- **Supabase** (PostgreSQL-based)
  - Email + password authentication
  - Cloud progress backup with Row-Level Security (RLS)
  - Subject content storage (optional dual-read: Database → JSON → Fallback to .js)
- **Vercel** — Hosting and serverless functions (future)
- **Sentry** — Error monitoring and debugging
- **Google Analytics 4** — GDPR-compliant tracking (Consent Mode v2)

### **Development & Testing**
- **Node.js Scripts** — Content management, validation, migration
- **Playwright** — Responsive testing, smoke tests, accessibility (68+ test scenarios)
- **JSON Schema (AJV)** — Content validation
- **PDF Parsing** — PDF text extraction for content intake
- **GitHub Actions** — CI/CD pipeline (type-checking, validation, tests, Lighthouse)
- **TypeScript/JSDoc** — Type safety without build step

---

## 📁 **Project Structure**

```
├── index.html                 # Main SPA entry point
├── styles.css                 # Master stylesheet (@import cascade)
│
├── css/                       # Modular stylesheets
│   ├── variables.css          # Design system (colors, spacing, typography)
│   ├── landing.css            # Landing page
│   ├── sidebar.css, browse.css, pages.css, components.css
│   ├── flashcards-section.css, quiz-section.css, ...
│   ├── responsive/            # Mobile-first media queries (6 modular files)
│   └── sokrat-*.css           # Web Components styles
│
├── js/                        # Application modules
│   ├── app-state.js           # Centralized mutable state management
│   ├── config.js              # Configuration (data-driven from catalog)
│   ├── content-loader.js      # Lazy-loading subject content
│   ├── content-repo.js        # ContentRepository (abstraction over sources)
│   ├── navigation.js          # Page routing and UI rendering
│   ├── flashcards.js, quiz.js, fill-blanks.js, learn.js
│   ├── exercises-core.js      # Reusable exercise engine
│   ├── acc-kernel.js          # Accounting-specific validators
│   ├── exercises.js           # Exercise renderer
│   ├── auth.js                # Supabase authentication
│   ├── cloud-sync.js          # Progress cloud backup (offline-first)
│   ├── storage.js             # LocalStorage persistence
│   ├── analytics.js           # Learning analytics tracking
│   ├── monitoring.js          # Sentry error tracking
│   ├── math.js                # KaTeX rendering helper
│   ├── components/            # Web Components
│   │   ├── sokrat-toast.js
│   │   ├── sokrat-modal.js
│   │   └── sokrat-confirm.js
│   └── utils.js               # Shared utilities
│
├── data/                      # Content (single source of truth)
│   ├── catalog.js             # ★ Master catalog: subjects, hierarchy, metadata
│   ├── <subject>/
│   │   ├── midterm-1.js       # 1st exam preparation
│   │   ├── midterm-2.js       # 2nd exam preparation
│   │   ├── final.js           # Final exam (hybrid: combines M1+M2)
│   │   └── exercises.js       # (Optional) interactive exercises for subject
│   ├── json/                  # Generated JSON exports (F2 2A)
│   │   └── <subject>/
│   │       ├── midterm-1.json
│   │       ├── midterm-2.json
│   │       └── final.json
│   └── landing-stats.js       # Auto-generated question counts
│
├── supabase/                  # Database
│   └── schema.sql             # PostgreSQL DDL (progress + content tables, RLS)
│
├── docs/                      # Comprehensive documentation
│   ├── PRD.md                 # Product requirements
│   ├── VISION.md              # Long-term full-stack vision
│   ├── ARCHITECTURE.md        # System design & data model
│   ├── BACKEND.md             # Supabase & API specs
│   ├── ROADMAP.md             # Milestones & progress
│   ├── FOUNDATION_PLAN.md     # Platform hardening roadmap (Phases F1–F6)
│   ├── content/               # Authoring toolkit (schema, guide, generator, exercises engine)
│   ├── subjects/              # Per-subject status table + detailed plans
│   ├── DECISIONS.md           # ADRs (Architecture Decision Records)
│   ├── BUGS.md                # Known issues & resolutions
│   ├── PROGRESS.md            # Detailed development log
│   ├── CHANGELOG.md           # Version history
│   └── archive/               # Completed/consumed plans
│
├── tests/                     # Test suite
│   ├── *.spec.js              # Playwright tests (responsive, smoke, a11y)
│   ├── unit/                  # Node.js unit tests
│   └── ...
│
├── scripts/                   # Development tools
│   ├── verify-catalog.js      # Catalog integrity check
│   ├── validate-content.js    # Content schema validation
│   ├── export-content-json.js # Export .js → .json
│   ├── migrate-content.js     # Upload content to Supabase
│   ├── build-topics.js        # PDF/TXT → topics.json (generator)
│   ├── generate-subject.js    # Sonnet AI subject generation
│   ├── assemble-subject.js    # Assemble generator output → data/*.js
│   └── ...
│
├── vercel.json                # Hosting config, cache headers, security
├── .github/workflows/         # CI/CD pipeline
├── manifest.json              # PWA manifest
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript config (type-check without build)
└── .gitignore                 # Version control
```

---

## 🚀 **Getting Started**

### **Live Website (No Setup Required)**
👉 **[www.sokratstudy.com](https://www.sokratstudy.com)** — Start learning immediately!

### **Local Development**

#### **Prerequisites**
- Node.js 18+
- Git

#### **Installation**
```bash
git clone https://github.com/leonkreso784-bit/sokratstudy.git
cd sokratstudy
npm install
```

#### **Development Server**
```bash
npm run dev
# Opens http://localhost:3000
```

#### **Run Tests**
```bash
# Responsive/smoke tests (Playwright)
npm run test:responsive

# Unit tests
npm run test:unit

# Catalog integrity check
npm run verify

# Content validation
npm run validate:content

# Type-checking (no build)
npm run typecheck
```

#### **Add New Subject** (via Generator)
```bash
# Create PDF/TXT materials, then:
node scripts/build-topics.js <subject-id> "<materials-dir>"
node scripts/generate-subject.js <subject-id>
node scripts/assemble-subject.js <subject-id> --name "Subject Name" --short "shortname" --icon "fa-icon" --color "#hexcolor"

# Verify & test
npm run verify
npm run test:responsive

# Migrate to Supabase (if enabled)
SUPABASE_URL=... SUPABASE_SERVICE_KEY=... node scripts/migrate-content.js <subject-id>
```

---

## 🎓 **Key Features**

### **1. Data-Driven Architecture**
- **Single Source of Truth:** `data/catalog.js` defines all subjects, hierarchy, and metadata
- **Lazy Loading:** Content loads only when a student opens a lesson (fast initial page load)
- **Flexible Content Format:** Study materials in JSON + fallback to JavaScript
- **Generator Pipeline:** New subjects can be added via AI in minutes, not hours

### **2. Enterprise-Grade Backend**
- **Supabase PostgreSQL** with Row-Level Security (RLS)
- **Email + Password Authentication** with email verification
- **Cloud Progress Backup** — sync learning progress across devices
- **Offline-First:** Works without internet, syncs when back online
- **Error Monitoring** — Sentry integration for debugging production issues

### **3. Accessibility & Responsive Design**
- **WCAG 2.1 AA Compliant** — axe core testing in CI
- **Mobile-First Design** — fully responsive from 320px to 4K
- **Dark Mode** — easy on the eyes for long study sessions
- **Keyboard Navigation** — Tab, Enter, Escape all work correctly
- **Screen Reader Support** — semantic HTML, ARIA roles

### **4. Reusable Exercise System**
- **7 Exercise Types:** Multiple Choice, Numeric, Ratio, Statement, Classify, Journal, Citation
- **Auto-Grading** — Instant feedback with explanation
- **Randomization & Variants** — Each student gets unique problems (prevents cheating)
- **Tolerance Policies** — Numerical answers graded within acceptable range
- **Engine Once, Use Forever** — Engine is never modified; new exercises = data only

### **5. AI-Ready Architecture**
- **Modular Backend:** Ready for AI tutor, content generation, personalized recommendations
- **Cloud-Native:** Vercel + Supabase means easy scaling
- **API Design:** Future `/api` endpoints follow REST + RPC conventions
- **Privacy First:** No tracking of learning patterns without consent; PII anonymized

---

## 📊 **Performance & Quality Metrics**

- **Lighthouse:** Performance boosted via Service Worker + CSS bundling (F3, shipped), Accessibility 98, Best Practices 100, SEO 100
- **Bundle Size:** ~200KB JavaScript (no frameworks!)
- **Time to Interactive:** <2.5s on 4G, mobile-optimized
- **Test Coverage:** 100+ responsive tests, 30+ unit tests, accessibility audits every deploy
- **Uptime:** 99.9% (Vercel + Supabase SLA)

---

## 🔒 **Privacy & Security**

- **MIT License** — Completely open-source
- **No Ads** — Free platform, no monetization yet (future freemium planned)
- **GDPR Compliant** — Cookie consent (Consent Mode v2), data export, self-service deletion
- **Row-Level Security (RLS)** — Each user can only see their own data
- **Content Security Policy (CSP)** — Protects against XSS attacks
- **Publishable Keys Only** — Sensitive `service_role` keys never exposed in frontend

---

## 🎯 **Roadmap**

### **Completed (Live)** ✅
- ✅ Data-driven catalog & hirerarchical navigation
- ✅ 19 subjects, 2,000+ flashcards, 3,000+ questions
- ✅ Supabase auth + cloud progress sync
- ✅ Interactive exercises (accounting, statistics, macroeconomics, math, academic writing)
- ✅ KaTeX math rendering
- ✅ Web Components (toast, modal, confirm dialogs)
- ✅ Responsive design + accessibility
- ✅ Error monitoring (Sentry)
- ✅ Croatian UI translation
- ✅ CI/CD pipeline (GitHub Actions, Playwright tests)
- ✅ Service Worker (true offline PWA) + CSS bundling + auto cache-versioning (F3)

### **In Progress** 🔄
- 🔄 **Admin CRUD with draft→publish editing** — edit lessons in a working draft, publish atomically (not a CMS), evolving toward user-generated content
- ✅ **Stable content IDs + schema v2** — foundation for reordering, spaced repetition & authoring
- 📅 Spaced repetition algorithms (SRS)

### **Planned** 📅
- **Phase 1:** UGC MVP — Students upload PDF → AI generates interactive study material
- **Phase 2:** Sharing — Public subject library, copy others' materials
- **Phase 3:** Gamification — Leaderboards, achievements, study streaks
- **Phase 4:** Monetization — AI tutor ($), freemium premium features
- **Phase 5:** AI Tutor — Chat with an AI that explains concepts

---

## 💡 **My Vision**

Starting as a student struggling with exam prep, I realized the AI revolution was happening **around** me, not **through** me. So I built Sokrat Study to:

1. **Master modern web development** — Full-stack, no frameworks, no shortcuts
2. **Learn AI integration** — Content generation, personalized tutoring, analytics
3. **Solve real problems** — Help thousands of students prepare better, faster
4. **Iterate toward excellence** — Each feature must be reusable, testable, documented

This is my **foundation for a bigger dream:** an AI-powered learning platform that adapts to each student's pace, explains concepts in their preferred way, and makes exam prep actually enjoyable.

---

## 🎨 **Other Projects**

As I develop my skills, I'm also building other projects to explore different technologies:

- **🌍 [MOBIX Travel Platform](https://github.com/leonkreso784-bit/MOBIX-Travel-demo)** — AI-powered travel itinerary planner using FastAPI, OpenAI, Amadeus APIs, and Google Maps. A full-stack demo showing backend microservices, real API integrations, and database design.

- **🎯 Interactive Presentations & Demos** — Various web-based presentations showcasing full-stack capabilities (HTML5, CSS3, vanilla JavaScript, animations, responsive design).

These projects are stepping stones toward building that **comprehensive AI learning platform** someday. Each teaches me something new about system design, user experience, and production-grade code.

---

## 🤝 **Contributing**

I'm currently the sole maintainer, but I'm open to collaboration!

**To contribute:**
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the guidelines in `docs/architecture/CONTENT_SCHEMA.md` (for new content) or `docs/architecture/ARCHITECTURE.md` (for code)
4. Run tests: `npm run verify && npm run test:responsive`
5. Submit a pull request with a clear description

**Ideas?** Open an issue on GitHub or contact me directly.

---

## 📚 **Documentation**

This project is heavily documented. Start with:

- **For Users:** Visit [sokratstudy.com](https://www.sokratstudy.com), check the FAQ, or read the Help sections in-app
- **For Contributors:** Read `docs/architecture/ARCHITECTURE.md` (system design) + `docs/architecture/CONTENT_SCHEMA.md` (how to add content)
- **For Developers:** `docs/archive/FOUNDATION_PLAN.md` (technical roadmap) + `docs/records/DECISIONS.md` (why we made certain choices)
- **For Content Creators:** `docs/workflow/CONTENT_INTAKE.md` (how to prepare materials) + `docs/workflow/CONTENT_GENERATOR.md` (auto-generation pipeline)

---

## 📧 **Contact & Support**

**Questions? Feedback? Bug report?**

📧 **Email:** [sokrat@sokratstudy.com](mailto:sokrat@sokratstudy.com)

🔗 **Links:**
- 🌐 [Live Platform](https://www.sokratstudy.com)
- 📂 [GitHub Repository](https://github.com/leonkreso784-bit/sokratstudy)
- 💼 [My GitHub Profile](https://github.com/leonkreso784-bit)

---

## 📜 **License**

MIT License © 2024–2026 Leon Kreso

You are free to:
- ✅ Use, modify, and distribute this code
- ✅ Create private or commercial projects
- ✅ Use for education or research

The only requirement: include the license notice in your project.

See `LICENSE` file for details.

---

## ⭐ **Show Your Support**

If Sokrat Study helped you study better, **give it a star!** ⭐ Stars help others discover the platform and motivate me to keep building amazing features.

---

**Built with ❤️ by Leon Kreso — A student, self-taught coder, and dreamer who believes education should be free, interactive, and AI-powered.**

---

### **Last Updated**
July 12, 2026 | Live on [www.sokratstudy.com](https://www.sokratstudy.com)
