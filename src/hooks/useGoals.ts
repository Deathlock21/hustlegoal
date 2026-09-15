import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import type { Goal } from '../types';
import { format } from 'date-fns';

export function useGoals(includeArchived = false) {
  return useLiveQuery(
    () => includeArchived
      ? db.goals.orderBy('created_at').reverse().toArray()
      : db.goals.where('archived').equals(0).reverse().sortBy('created_at'),
    [includeArchived]
  );
}

export function useGoal(id: number) {
  return useLiveQuery(() => db.goals.get(id), [id]);
}

export function useTodaysGoals() {
  return useLiveQuery(async () => {
    const all = await db.goals.where('archived').equals(0).toArray();
    const today = format(new Date(), 'yyyy-MM-dd');
    const dayOfWeek = new Date().getDay();

    return all.filter((goal: Goal) => {
      if (goal.recurrence === 'daily') return true;
      if (goal.recurrence === 'weekly' && dayOfWeek === 1) return true;
      if (goal.recurrence === 'once' && goal.deadline) {
        return goal.deadline >= today;
      }
      return false;
    });
  }, []);
}

export async function addGoal(goal: Omit<Goal, 'id'>): Promise<number> {
  return db.goals.add(goal);
}

export async function updateGoal(id: number, changes: Partial<Goal>): Promise<void> {
  await db.goals.update(id, changes);
}

export async function archiveGoal(id: number): Promise<void> {
  await db.goals.update(id, { archived: true });
}

export async function deleteGoal(id: number): Promise<void> {
  await db.goals.delete(id);
  await db.checkins.where('goal_id').equals(id).delete();
}

export function useCheckInsForGoal(goalId: number) {
  return useLiveQuery(
    () => db.checkins.where('goal_id').equals(goalId).sortBy('date'),
    [goalId]
  );
}

export function useTodayCheckIn(goalId: number) {
  const today = format(new Date(), 'yyyy-MM-dd');
  return useLiveQuery(
    () => db.checkins.where({ goal_id: goalId, date: today }).first(),
    [goalId]
  );
}
