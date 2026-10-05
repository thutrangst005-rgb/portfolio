# THE ODYSSEY — A CINEMATIC PORTFOLIO EXPERIENCE
### *Finance × Business × Technology*
**Phan Thị Thu Trang** — Final-year International Finance Candidate, Foreign Trade University

---

## 1. Project Overview

**The Odyssey** is an editorial, cinematic personal portfolio experience built for **Phan Thị Thu Trang**. Departing entirely from generic portfolio and resume templates, this project reimagines Trang's academic mastery, professional milestones, and research contributions as chapters of a high-seas navigational expedition.

Every interaction—from the 24-second opening celestial sequence to the archival research paper viewer—communicates precision, intellect, and modern luxury.

---

## 2. Concept & Metaphor

- **Concept**: *The Odyssey* serves as a modern metaphor for an intellectual voyage through global markets, financial systems, and technology.
- **Visual Identity**:
  - Celestial navigation charts and coordinate systems (`21°01'N 105°51'E` - Hanoi / FTU).
  - Ocean horizon transitions with twilight glows and ambient wave mathematics.
  - Archival dispatch treatments: technical dossiers, metadata stamps, and mathematical formulas.
  - Ancient navigation instruments (astrolabes, sextants, compass roses) reimagined with razor-sharp SVG geometry.
  - **No mythological tropes**: No Zeus, Greek gods, or marble statues. Pure metaphorical exploration of intellect and ambition.

---

## 3. Color System & Typography

### Palette Tokens
- **Primary Background**: `#07131C` (Deep midnight navy)
- **Secondary Background**: `#0E2430` (Deep ocean blue)
- **Body & Headline Text**: `#F2EBDD` (Warm ivory)
- **Primary Accent**: `#B89B5E` (Muted antique gold)
- **Secondary Accent**: `#6F8790` (Desaturated blue-grey)

### Typography Hierarchy
- **Editorial Headings**: `Cinzel`, `Cormorant Garamond`, `Didot` (high-contrast luxury serif).
- **Body Copy**: `Plus Jakarta Sans`, `Inter` (neutral, legible modern sans-serif).
- **Technical & Coordinates**: `JetBrains Mono`, `Space Mono` (monospace for statistics, coordinates, dates, and labels).

---

## 4. Key Architectural Features

1. **Cinematic Prologue (20–30s Opening Experience) & Soundtrack**:
   - 5 choreographed narrative scenes with automatic time-based progression.
   - Dynamic HTML5 canvas drawing celestial navigation routes and glowing waypoints.
   - **Cinematic Soundtrack Integration**: Uses the YouTube IFrame Player API (`u0Riy2fTBvU`) in a visually hidden container.
   - **Autoplay Compliance**: Music starts only when the user clicks `BEGIN THE JOURNEY →`.
   - **Sound Controls**: Dedicated `SOUND ON / SOUND OFF` button to play, pause, or mute soundtrack anytime.
   - **Auto-Stop**: Music stops immediately when clicking `SKIP INTRO →` or when the intro finishes before entering the main portfolio.
   - Live progress indicator (`0%` to `100%`) with one-click `SKIP INTRO →` or `Escape` key override.
2. **Sticky Editorial Navigation**:
   - Live scroll-position indicator across top border.
   - Coordinate tracking and active section highlighting (`00. HOME` through `06. THE HORIZON`).
   - Integrated Web Audio ambient soundscape toggle (synthesizes subtle oceanic sub-bass and glass chime pings with zero external audio assets).
3. **Section 01 — The Origin**:
   - Foreign Trade University academic dossier.
   - GPA monument (`3.42 / 4.00`) with animated counter on viewport entry.
   - Interactive coursework pills with analytical focus areas.
4. **Section 02 — The Journey**:
   - Scroll-driven vertical route line with pulsing waypoint beacons.
   - Milestone 1: **FIREANT** (Derivatives Business Intern).
   - Milestone 2: **TEC GO** (TEC Go Manager) with giant typography statistics (`15` people managed, `300+` corporate partners, `100M+` VND project budgets, `100+` participants).
5. **Section 03 — The Quests (Destinations)**:
   - **Cardy**: Featured fintech platform destination with simulated credit card mockup, interactive spending optimizer, and live reward calculations.
   - **Investor Sentiment**: Quantitative empirical study measuring retail psychology on the VN-Index (`3,000+` observations, `PCA`).
   - **Xplorators**: Fintech & blockchain competition leadership.
6. **Full-Screen Case Study Modal**:
   - 6-chapter editorial presentation (`01 Problem`, `02 Idea`, `03 Process`, `04 Product`, `05 Result`, `06 Links`).
   - Cardy interactive calculator tab system and research formula views.
7. **Section 04 — The Archive**:
   - Archival paper dossier showcasing published research: *“Xây dựng và đo lường chỉ số tâm lý nhà đầu tư trên thị trường chứng khoán Việt Nam: Nghiên cứu thực nghiệm áp dụng phương pháp PCA”* (05/2026).
8. **Section 05 — The Tools**:
   - Luxury interactive hover deck for Finance, Data, Language, and Certification (`CFA Level 1 Candidate`). No boring progress bars.
9. **Section 06 — The Horizon**:
   - Interactive canvas horizon with sine wave currents and twilight lighting.
   - One-click email copy helper and outbound verified links.

---

## 5. Project Structure

```
the-odyssey/
├── index.html                   # Zero-dependency instant-load entrypoint
├── package.json                 # Node/Vite build configuration
├── vite.config.js               # Vite bundler settings
├── README.md                    # Project documentation
└── src/
    ├── App.js                   # Modular vanilla ES6 coordinator
    ├── App.jsx                  # React equivalent coordinator
    ├── components/
    │   ├── BackgroundEffects.js # Canvas starfield & Web Audio synth
    │   ├── CinematicIntro.js    # 24s prologue engine & route drawing
    │   ├── Navigation.js        # Sticky header & scroll spy
    │   ├── CaseStudyModal.js    # 6-chapter full-screen dossier
    │   ├── HorizonOcean.js      # Ocean horizon sine wave renderer
    │   └── RouteVisualizer.js   # Animated path & counter observers
    ├── data/
    │   └── portfolioData.js     # Strict data archive (verified facts only)
    └── styles/
        ├── variables.css        # Color palette & design tokens
        ├── typography.css       # Editorial serif & mono rules
        ├── animations.css       # Keyframes, grain & glow
        ├── components.css       # Component layout styles
        └── main.css             # Main stylesheet aggregator
```

---

## 6. How to Run Locally

### Option A: Zero-Dependency Instant Run (Python 3)
The project runs out-of-the-box using the built-in HTTP server:

```powershell
# Navigate to the project directory
cd "C:\Users\dell\.gemini\antigravity\scratch\the-odyssey"

# Launch HTTP server on port 3000
python -m http.server 3000
```
Open your browser to: **`http://localhost:3000`**

### Option B: Modern React + Vite (When Node.js is installed)
```powershell
npm install
npm run dev
```

---

## 7. How to Build & Deploy

### Building for Production
```powershell
npm run build
```
This generates the optimized static bundles in `dist/`.

### Deployment Instructions

#### 1. Vercel
- Install Vercel CLI (`npm i -g vercel`) or push to GitHub and import into Vercel.
- Framework Preset: **Vite** (or **Other** for static ES module hosting).
- Build Command: `npm run build`
- Output Directory: `dist` (or `./` if deploying static `index.html`).

#### 2. Netlify
- Drag and drop the `the-odyssey` folder directly into Netlify Drop, or connect via Git.
- Publish directory: `dist` or root `./`.

#### 3. GitHub Pages
- Initialize Git repository:
  ```powershell
  git init
  git add .
  git commit -m "feat: The Odyssey cinematic portfolio"
  git branch -M main
  git remote add origin https://github.com/<username>/<repo>.git
  git push -u origin main
  ```
- In GitHub repository settings, enable **GitHub Pages** from the `main` branch root or via GitHub Actions.

---

## 8. Content Integrity Guarantee
All content within this portfolio strictly adheres to the provided academic and career milestones. No job titles, organizations, grades, or accomplishments have been fabricated.
