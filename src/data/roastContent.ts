import type { RoastEntry, RoastPersona, GoalCategory } from '../types';

export const roastContent: RoastEntry[] = [
  // ─── SARCASTIC ───────────────────────────────────────────────────────────────
  {
    id: 'sc-01', persona: 'sarcastic', intensity: 3,
    template: 'Oh wow, {name}. "{goal}" — just sitting there, untouched, for {days} day(s). Must be nice to have that kind of relationship with your own ambitions.',
    comeback: 'Write down one specific reason you skipped it. Then do one thing — just one — toward the goal in the next 10 minutes.',
  },
  {
    id: 'sc-02', persona: 'sarcastic', intensity: 2,
    template: 'Incredible. {name} has a {streak}-day streak, and today? Poof. Gone. Like your motivation apparently.',
    comeback: 'Set a 5-minute timer. Just start. Momentum beats motivation every single time.',
  },
  {
    id: 'sc-03', persona: 'sarcastic', intensity: 4,
    template: '{name}, "{goal}" missed again. But hey, at least you are very consistent at being inconsistent. That takes skill.',
    comeback: 'Block 30 minutes on your calendar right now for this goal. Treat it like a meeting you cannot reschedule.',
  },
  {
    id: 'sc-04', persona: 'sarcastic', intensity: 3,
    template: 'So "{goal}" just... waited for you today, {name}. {days} day(s) now. It must be learning patience from watching you.',
    comeback: 'Remove one thing from your schedule tomorrow to make room. Priorities are what you actually do, not what you say.',
  },

  // ─── BRUTALLY HONEST ────────────────────────────────────────────────────────
  {
    id: 'bh-01', persona: 'honest', intensity: 4,
    template: 'Let us be direct, {name}. You did not "forget" "{goal}". You chose something else. Own that. Then decide if that choice reflects who you actually want to be.',
    comeback: 'Write one sentence: "I missed because ___." No excuses allowed. Then plan tomorrow differently.',
  },
  {
    id: 'bh-02', persona: 'honest', intensity: 5,
    template: '{name}, you are {days} day(s) behind on "{goal}". The version of you that achieves things does not negotiate with laziness. Which version showed up today?',
    comeback: 'Do the hardest part of this goal right now for exactly 10 minutes. Not tomorrow. Now.',
  },
  {
    id: 'bh-03', persona: 'honest', intensity: 4,
    template: 'Your streak was {streak} days, {name}. That is real progress you just interrupted. The gap between who you are and who you want to be just got a little wider today.',
    comeback: 'Identify what specifically derailed you. Environment, energy, or avoidance? Fix the system, not just the symptom.',
  },
  {
    id: 'bh-04', persona: 'honest', intensity: 3,
    template: '{name}, "{goal}" is important enough that you added it here. But today\'s actions said otherwise. Actions are votes for the kind of person you are becoming.',
    comeback: 'Vote for the right person tomorrow. Put this on your morning alarm label: "{goal} — no negotiation."',
  },

  // ─── PLAYFULLY MEAN ─────────────────────────────────────────────────────────
  {
    id: 'pm-01', persona: 'playful', intensity: 2,
    template: 'Sir/Ma\'am {name}, "{goal}" filed a missing person report for you today. Nobody has seen your effort in {days} day(s).',
    comeback: 'Have a 2-minute "sorry I ghosted you" session with your goal. Just start, it forgives quickly.',
  },
  {
    id: 'pm-02', persona: 'playful', intensity: 2,
    template: 'Breaking news: {name}\'s streak of {streak} days has dramatically ended. Witnesses report it was not murdered — it simply starved.',
    comeback: 'Feed the streak. Even 20% effort today beats 0%. Get moving.',
  },
  {
    id: 'pm-03', persona: 'playful', intensity: 3,
    template: '{name}, your goal "{goal}" called. It left a voicemail: "We used to have something special. What happened to us?"',
    comeback: 'Call back. Spend 15 minutes on it today. Relationships need attention — including the one with your goals.',
  },
  {
    id: 'pm-04', persona: 'playful', intensity: 2,
    template: 'Somewhere out there, a version of {name} who did "{goal}" today is thriving. Meanwhile here you are.',
    comeback: 'Be that version tomorrow. Sleep early, wake with purpose, do the thing first.',
  },

  // ─── COACH MODE ─────────────────────────────────────────────────────────────
  {
    id: 'co-01', persona: 'coach', intensity: 2,
    template: '{name}, missing "{goal}" today is data, not failure. What does it tell you? Was the bar too high? The timing wrong? Fix the system.',
    comeback: 'Adjust the goal if needed — smaller increment, earlier time slot. Then execute that adjusted version tomorrow.',
  },
  {
    id: 'co-02', persona: 'coach', intensity: 1,
    template: 'Hey {name}. Missed today. That is fine. {streak} days is still a foundation worth protecting. You are not starting over — you are adjusting.',
    comeback: 'Recommit with one specific action: what time tomorrow, what exactly, and for how long.',
  },
  {
    id: 'co-03', persona: 'coach', intensity: 2,
    template: '{name}, champions miss days. What separates them is they do not miss two in a row. The streak reset — the discipline does not have to.',
    comeback: 'The rule: never miss twice. Tomorrow is non-negotiable. Set three alarms if you must.',
  },
  {
    id: 'co-04', persona: 'coach', intensity: 3,
    template: 'Listen, {name}. "{goal}" for {days} day(s) now. The gap between your ambition and your actions is widening. We close that gap with systems, not willpower.',
    comeback: 'Build a trigger: "After I do X, I will do Y (this goal)." Habit stacking beats raw motivation.',
  },
  {
    id: 'co-05', persona: 'coach', intensity: 1,
    template: '{name}, one miss does not define your trajectory. What matters is your next decision. Make it count.',
    comeback: 'Lay out everything you need for this goal right now so tomorrow has zero friction.',
  },

  // ─── GORDON RAMSAY MODE ─────────────────────────────────────────────────────
  {
    id: 'gr-01', persona: 'ramsay', intensity: 5,
    template: 'WHAT IS THIS, {name}?! "{goal}" — MISSED AGAIN?! This is a DISGRACE! {days} day(s)! Even my idiot sandwich has more follow-through than this!',
    comeback: 'GET UP. Right now. Do something toward this goal in the next 5 minutes. I am not asking.',
  },
  {
    id: 'gr-02', persona: 'ramsay', intensity: 5,
    template: '{name}, your streak was {streak} days and you THREW IT IN THE BIN! This goal is RAW! UNDER-COOKED! Get back in the kitchen and EXECUTE!',
    comeback: 'You have 10 minutes. Do the bare minimum version of this goal. GO.',
  },
  {
    id: 'gr-03', persona: 'ramsay', intensity: 4,
    template: 'Honestly, {name}, this is SHOCKING. "{goal}" is DYING on the pass! If this were a restaurant, I would shut it DOWN. Sort. It. Out.',
    comeback: 'Identify what went wrong today. Write it. Fix it for tomorrow. Do not come back here with excuses.',
  },
  {
    id: 'gr-04', persona: 'ramsay', intensity: 4,
    template: '{name}! This is NOT the standard! {days} day(s) without touching "{goal}"?! The COMPETITION is eating your LUNCH while you make EXCUSES!',
    comeback: 'Put this goal as your phone wallpaper. See it. Be reminded. Do the work.',
  },
];

export function getRoastsForPersona(persona: RoastPersona, intensity: number): RoastEntry[] {
  return roastContent.filter(r => r.persona === persona && r.intensity <= intensity);
}

export function getRandomRoast(persona: RoastPersona, intensity: number): RoastEntry {
  const pool = getRoastsForPersona(persona, intensity);
  const fallback = roastContent[Math.floor(Math.random() * roastContent.length)];
  if (pool.length === 0) return fallback;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function fillRoastTemplate(
  template: string,
  vars: { name: string; goal: string; streak: number; days: number }
): string {
  return template
    .replace(/{name}/g, vars.name)
    .replace(/{goal}/g, vars.goal)
    .replace(/{streak}/g, String(vars.streak))
    .replace(/{days}/g, String(vars.days));
}

export const getComebackForCategory = (category: GoalCategory): string => {
  const map: Record<GoalCategory, string> = {
    health: 'Do 10 push-ups or a 5-minute walk. Right now. Your body needs the signal.',
    career: 'Open the one work task you have been avoiding. Set a 25-minute timer. Go.',
    finance: 'Check your budget or savings today. Awareness is the first act of financial discipline.',
    learning: 'Read or watch one thing related to what you are learning. Even 10 minutes counts.',
    personal: 'Do one act of intentional self-care or growth today. You cannot pour from an empty cup.',
  };
  return map[category];
};
