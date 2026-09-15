# ⚡ Hustle Goal

> **Discipline Through Wisdom, Accountability Through Roasts.**

**Hustle Goal** is a personalized goal and productivity management web application built to transform routine task tracking into an engaging, culturally rich, and entertaining experience. 

Unlike standard productivity tools that provide bland, repetitive motivational quotes, Hustle Goal offers:
- 🏛️ **Dual-Mode Feedback System**:
  - **Wins**: Uplifting wisdom and iconic dialogues across global mythologies (Greek, Hindu, Norse, Japanese, Stoic) and legendary cinema.
  - **Misses**: Contextual, personality-driven roasts (Sarcastic Best Friend, Brutal Honest, Playful Teaser, Tough Love Coach, Gordon Ramsay Mode) that hold you accountable.
- 🔥 **Visual Accountability & Streaks**:
  - GitHub-style 12-week check-in calendar heatmap (`Done`, `Missed`, `Skip`).
  - 7-day win rate and streak tracking.
- 🎯 **Deep Goal Customization**:
  - Categorization across Health, Coding, Study, Career, Fitness, and Mindset.
  - Subtask / milestone progress tracking.
  - Recurrence rules, deadlines, and priorities.
- 📚 **Mythology & Cinema Library**:
  - Explore and filter the wisdom collection by tradition and category.
- 🎨 **Aesthetic Dark/Light/Mythic Design**:
  - Fluid animations with Framer Motion, tailored theme tokens, and local-first persistence via IndexedDB (Dexie.js).

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **State & Store**: Zustand (UI / overlays), Dexie.js & `dexie-react-hooks` (Local-first IndexedDB)
- **Styling**: Vanilla CSS Design Tokens (CSS custom properties)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Utilities**: Date-fns
- **Unique Identifiers**: Nanoid

---

## 🛠️ Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Deathlock21/hustlegoal.git
   cd hustlegoal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173` to start tracking your goals!

---

## 📱 Features & Pages

| Page | Description |
|---|---|
| **Dashboard** | Overview of today's goals, active streaks, and recent win rate stats |
| **Goals** | Filterable list of all active and archived goals with fast context actions |
| **New Goal** | Comprehensive goal creation with subtasks, priority, recurrence, and category |
| **Goal Detail** | 12-week GitHub-style heatmap, milestone checklist, and check-in timeline |
| **Library** | Curated catalog of global mythological quotes and cinema dialogues |
| **Profile** | Customize your display name, avatar, roast persona, and intensity level |

---

## 📄 License

MIT © [Deathlock21](https://github.com/Deathlock21)
