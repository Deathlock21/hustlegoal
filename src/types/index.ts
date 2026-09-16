export type GoalCategory = 'health' | 'career' | 'finance' | 'learning' | 'personal';
export type GoalRecurrence = 'daily' | 'weekly' | 'once';
export type CheckInStatus = 'done' | 'missed' | 'skip';
export type Theme = 'dark' | 'mythic';
export type RoastPersona = 'sarcastic' | 'honest' | 'playful' | 'coach' | 'ramsay';
export type ContentType = 'myth' | 'movie' | 'stoic';
export type MythCulture = 'greek' | 'hindu' | 'norse' | 'japanese' | 'stoic' | 'movie';

export interface Goal {
  id?: number;
  title: string;
  description: string;
  category: GoalCategory;
  recurrence: GoalRecurrence;
  deadline: string | null; // ISO date string
  priority: 1 | 2 | 3;
  archived: boolean;
  created_at: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface CheckIn {
  id?: number;
  goal_id: number;
  date: string; // YYYY-MM-DD
  status: CheckInStatus;
  notes?: string;
}

export interface UserProfile {
  id?: number;
  name: string;
  avatar: string; // emoji avatar
  roast_intensity: 1 | 2 | 3 | 4 | 5;
  theme: Theme;
  motivation_prefs: MythCulture[];
  roast_persona: RoastPersona;
  onboarding_complete: boolean;
}

export interface ContentEntry {
  id: string;
  type: ContentType;
  culture: MythCulture;
  category_tags: GoalCategory[];
  quote: string;
  source: string;
  character?: string;
  context: string;
  icon: string; // emoji
}

export interface RoastEntry {
  id: string;
  persona: RoastPersona;
  template: string; // uses {name}, {goal}, {streak}, {days}
  comeback: string;
  intensity: 1 | 2 | 3 | 4 | 5;
}

export interface OverlayState {
  type: 'win' | 'roast' | null;
  content: ContentEntry | null;
  roast: RoastEntry | null;
  goalTitle: string;
}
