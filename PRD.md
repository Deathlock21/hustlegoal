# Hustle Goal — Product Requirements Document

> **Version**: 1.0 | **Status**: Draft | **Author**: Mihir | **Date**: September 2026

---

## 1. Overview

**Hustle Goal** is a personalized goal and productivity management web application that transforms routine task management into an engaging, culturally rich, and entertaining experience. It helps users build discipline and consistency through meaningful goal tracking, combined with a unique dual-mode motivational system — mythological wisdom on wins, and personalized roasting on misses.

---

## 2. Problem Statement

Most productivity apps suffer from the same core issues:
- **Generic motivation**: Cookie-cutter inspirational quotes that feel copy-pasted and meaningless
- **No accountability with character**: Missing a goal produces no reaction, reducing stakes
- **Boring interfaces**: Task lists feel like chores, not exciting milestones
- **One-size-fits-all**: No personalization in how feedback is delivered

**Hustle Goal** solves this by making productivity *personal*, *cultural*, and *entertaining*.

---

## 3. Target Users

| Persona | Description |
|---------|-------------|
| **The Ambitious Starter** | 18–30, sets lots of goals, struggles with follow-through |
| **The Discipline Builder** | Wants accountability and consistency mechanisms |
| **The Culture Lover** | Appreciates mythology, cinema, and storytelling |
| **The Self-Improver** | Tracks habits and wants meaningful reflection |

---

## 4. Core Features

### 4.1 Goal Management

- **Create Goals**: Title, description, category (Health, Career, Finance, Learning, Personal), deadline, recurrence (daily / weekly / one-time)
- **Organize Goals**: Group by category, priority tag, and custom collections
- **Edit & Archive**: Modify active goals, archive completed ones for reflection
- **Subtask Support**: Break goals into measurable milestones

### 4.2 Progress Tracking

- **Daily Check-ins**: Simple ✅ / ❌ completion logging per goal per day
- **Streak Counter**: Visual streak display for daily goals (fire indicator)
- **Progress Bar**: Percentage completion with milestone markers
- **Calendar Heatmap**: GitHub-style activity heatmap per goal (green = done, red = missed)
- **Weekly Summary Report**: Auto-generated digest every Sunday

### 4.3 Motivation System (Win Mode)

Triggered when a goal is checked as **completed**.

- Delivers a **curated motivational moment** from:
  - 🏛️ **Greek Mythology** (e.g., Achilles, Odysseus, Prometheus)
  - ⚔️ **Hindu Mythology** (e.g., Bhagavad Gita verses, stories of Arjuna, Hanuman)
  - 🐉 **Norse Mythology** (e.g., Odin's sacrifice, Thor's trials)
  - 🌙 **Japanese / Samurai Philosophy** (Bushido code, Miyamoto Musashi)
  - 🎬 **Iconic Movie Dialogues** (e.g., Rocky, Gladiator, Pursuit of Happyness, Interstellar)
  - 🧘 **Stoic Philosophy** (Marcus Aurelius, Epictetus, Seneca)
- Content is **contextually matched** to goal category (e.g., a fitness goal triggers warrior mythology, a finance goal triggers a strategic thinker quote)
- Display format: Full-screen overlay with beautiful typography, source attribution, and dismiss button

### 4.4 Accountability & Roast System (Miss Mode)

Triggered when a goal is **marked missed** or deadline passes without completion.

- Delivers a **personalized, humorous roast** using:
  - User's name, goal title, and streak history for personalization
  - Tone toggleable between: *Sarcastic*, *Brutally Honest*, *Playfully Mean*, *Coach Mode*
  - Optional: Roast from the voice/persona of a famous character (e.g., "Gordon Ramsay Mode", "Drill Sergeant Mode", "Disappointed Parent Mode")
- Ends with a **comeback challenge**: A small, concrete action to get back on track
- User can react: 😂 (funny), 💀 (dead), 🔥 (motivated) — adds to personal personality profile

### 4.5 Dashboard

- **Today's Focus**: Top 3 priority goals for the day
- **Active Streaks**: Visual streak board for ongoing goals
- **Weekly Win Rate**: Percentage of goals hit this week vs. last week
- **Motivation Feed**: Scroll of recent motivation moments earned
- **Upcoming Deadlines**: Countdown timers for time-sensitive goals

### 4.6 Personalization & Profile

- **Name & Avatar**: Used in roast personalization
- **Motivation Preference**: Mythology type preference, movie genre
- **Roast Intensity**: Scale 1–5 (gentle nudge to savage roast)
- **Notification Settings**: Reminders for check-in, deadline alerts
- **Theme**: Dark / Light / Mythic (custom dark theme with gold accents)

---

## 5. Content System

### 5.1 Motivation Content Library

| Category | Source Type | Examples |
|----------|------------|---------|
| Fitness / Health | Greek & Norse Myth | Hercules's labors, Achilles' training |
| Career / Ambition | Stoicism, Hindu Myth | Bhagavad Gita 2:47, Marcus Aurelius |
| Finance / Wealth | Strategic Mythology | Arthashastra wisdom, Shrewd Odysseus |
| Learning | Japanese Philosophy | Musashi's Book of Five Rings |
| Personal Growth | Movie Dialogues | Rocky, Dead Poets Society, Pursuit of Happyness |
| Relationships | World Mythology | Norse stories of loyalty and sacrifice |

### 5.2 Roast Content Engine

- Template-based with dynamic variable injection: `{name}`, `{goal}`, `{streak}`, `{days_missed}`
- Roast persona library (10+ distinct voices)
- Comeback challenges: Auto-generated micro-tasks (e.g., "Do 10 push-ups right now" for fitness goals)

---

## 6. Technical Architecture

### 6.1 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite |
| Styling | Vanilla CSS (custom design system) |
| State Management | Zustand |
| Local Storage | IndexedDB (via Dexie.js) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Charts | Recharts |

### 6.2 Data Architecture (Local-First MVP)

All data stored locally in browser IndexedDB. No backend required for v1.

```
Goal {
  id, title, description, category, priority,
  recurrence, deadline, created_at, archived
}

CheckIn {
  id, goal_id, date, status (done|missed|skip), notes
}

UserProfile {
  name, avatar, motivation_prefs, roast_intensity, theme
}

ContentEntry {
  id, type (myth|movie|stoic), culture, category_tags,
  quote, source, character, context
}
```

---

## 7. User Flows

### 7.1 Core Loop

```
User Opens App
  → Dashboard: Today's Focus
    → Check In Goal ✅
      → Win Screen: Mythology/Movie Quote
    → Check In Goal ❌
      → Roast Screen: Personalized Roast + Comeback Challenge
  → Streak Updated
  → Dashboard Refreshed
```

### 7.2 New Goal Creation

```
Click "New Goal" → Form (title, category, deadline, recurrence)
  → Optional: Set subtasks
  → Save → Appears on Dashboard Today
```

---

## 8. UI/UX Design Principles

1. **Dark-First Design**: Default dark theme with mythic gold (`#D4AF37`) and deep charcoal (`#1A1A2E`) palette
2. **Cinematic Feel**: Full-screen overlays for win/roast moments that feel like movie scenes
3. **Micro-Animations**: Streak flames, confetti on wins, shake animation on misses
4. **Card-Based Layout**: Clean goal cards with category color-coding
5. **Typography**: `Cinzel` for mythic headings, `Inter` for body text
6. **Mobile-Responsive**: Designed mobile-first

---

## 9. MVP Scope (v1.0)

### ✅ In Scope

- [ ] Goal CRUD (create, read, update, delete, archive)
- [ ] Daily check-in (done / missed)
- [ ] Streak tracking
- [ ] Dashboard with today's goals, streaks, win rate
- [ ] Win Screen: 50+ mythology & movie quotes (static library)
- [ ] Roast Screen: 30+ roast templates with personalization variables
- [ ] User profile (name, roast intensity, theme)
- [ ] Calendar heatmap per goal
- [ ] Dark / Light / Mythic themes
- [ ] Local-first storage (IndexedDB)

### ❌ Out of Scope (v2+)

- Cloud sync & authentication
- AI-generated dynamic roasts (OpenAI integration)
- Social features (share streaks, challenge friends)
- Mobile native app (React Native)
- Push notifications (PWA service workers)
- Goal templates marketplace

---

## 10. Success Metrics

| Metric | Target (30-day) |
|--------|----------------|
| Daily Active Use | User opens app 5+ days/week |
| Goal Completion Rate | > 60% of active goals marked done |
| Streak Length | Average streak > 7 days |
| Roast Engagement | > 80% react to roast screen |
| Session Duration | Avg. > 3 min/day |

---

## 11. Pages / Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Today's focus, streaks, win rate |
| `/goals` | Goal List | All goals, filterable by category |
| `/goals/new` | New Goal | Goal creation form |
| `/goals/:id` | Goal Detail | Calendar heatmap, subtasks, history |
| `/profile` | Profile | User settings, preferences |
| `/library` | Motivation Library | Browse all earned quotes |

---

## 12. Open Questions

> [!IMPORTANT]
> These decisions will shape v1 scope and need to be resolved before development begins.

1. **Content volume**: Should the initial content library have 50, 100, or 200+ entries? More entries = more time but better experience.
2. **Roast AI**: Should roasts be static templates only for v1, or should we integrate an LLM (e.g., Gemini API) for dynamic, truly personalized roasts?
3. **Goal recurrence**: Do we support hourly goals, or keep it to daily/weekly/one-time?
4. **Notifications**: Should v1 include browser-native notifications for reminders?
5. **Onboarding**: Do we need a dedicated onboarding flow (name, preferences setup) before the dashboard?

---

*Built with discipline. Fueled by mythology. Accountable to the roast. 🔥*
