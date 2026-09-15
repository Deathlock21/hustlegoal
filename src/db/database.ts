import Dexie, { type Table } from 'dexie';
import type { Goal, CheckIn, UserProfile } from '../types';
import { format } from 'date-fns';

export class HustleGoalDB extends Dexie {
  goals!: Table<Goal, number>;
  checkins!: Table<CheckIn, number>;
  profile!: Table<UserProfile, number>;

  constructor() {
    super('HustleGoalDB');
    this.version(1).stores({
      goals: '++id, category, recurrence, archived, created_at',
      checkins: '++id, goal_id, date, status',
      profile: '++id',
    });
  }
}

export const db = new HustleGoalDB();

export async function getProfile(): Promise<UserProfile | undefined> {
  return db.profile.toCollection().first();
}

export async function saveProfile(profile: Omit<UserProfile, 'id'>): Promise<number> {
  const existing = await getProfile();
  if (existing?.id) {
    await db.profile.update(existing.id, profile);
    return existing.id;
  }
  return db.profile.add(profile);
}

export async function addCheckIn(checkin: Omit<CheckIn, 'id'>): Promise<number> {
  await db.checkins
    .where({ goal_id: checkin.goal_id, date: checkin.date })
    .delete();
  return db.checkins.add(checkin);
}

export async function getStreakForGoal(goalId: number): Promise<number> {
  let streak = 0;
  let checkDate = new Date();

  while (true) {
    const dateStr = format(checkDate, 'yyyy-MM-dd');
    const checkin = await db.checkins
      .where({ goal_id: goalId, date: dateStr })
      .first();

    if (checkin?.status === 'done') {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

export async function getWinRateForWeek(): Promise<{ wins: number; total: number }> {
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate() - 7);

  const weekCheckins = await db.checkins
    .filter(c => new Date(c.date) >= weekAgo && c.status !== 'skip')
    .toArray();

  const wins = weekCheckins.filter(c => c.status === 'done').length;
  return { wins, total: weekCheckins.length };
}
