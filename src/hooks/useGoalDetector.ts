import { useEffect } from 'react';
import { db } from '../db/database';
import { useAppStore } from '../store/useAppStore';
import { getRandomRoast } from '../data/roastContent';
import { getRandomContent } from '../data/motivationContent';
import { format, subDays, startOfWeek } from 'date-fns';
import type { UserProfile, Goal } from '../types';

export function useGoalDetector(profile: UserProfile | undefined) {
  const { showRoast, showWin } = useAppStore();

  useEffect(() => {
    if (!profile) return;

    const runCheck = async () => {
      const today = new Date();
      const yesterday = subDays(today, 1);
      const yesterdayStr = format(yesterday, 'yyyy-MM-dd');
      const todayStr = format(today, 'yyyy-MM-dd');

      // Check if we already did a check today
      const lastCheck = localStorage.getItem('hg_detector_last_check');
      if (lastCheck === todayStr) return; // already processed today

      const goals = await db.goals.filter(g => !g.archived).toArray();
      if (goals.length === 0) return;

      const checkins = await db.checkins.toArray();
      
      let missedGoal: Goal | null = null;
      let allDailyDone = true;
      let dailyGoalsCount = 0;

      for (const goal of goals) {
        if (goal.recurrence === 'daily') {
          // If goal was created today, it wasn't expected yesterday
          if (goal.created_at.startsWith(todayStr)) continue;
          dailyGoalsCount++;

          const yesterdayCheckin = checkins.find(c => c.goal_id === goal.id && c.date === yesterdayStr);
          if (!yesterdayCheckin || yesterdayCheckin.status !== 'done') {
            if (!missedGoal) missedGoal = goal;
            allDailyDone = false;
          }
        }
        else if (goal.recurrence === 'weekly') {
          // If it's Monday, check if they checked in during the previous week (Mon-Sun)
          if (today.getDay() === 1) { 
            const lastWeekStart = startOfWeek(yesterday, { weekStartsOn: 1 });
            const hasCheckinLastWeek = checkins.some(c => {
              const checkinDate = new Date(c.date);
              return c.goal_id === goal.id && checkinDate >= lastWeekStart && checkinDate <= yesterday && c.status === 'done';
            });
            if (!hasCheckinLastWeek && !missedGoal) {
              missedGoal = goal;
            }
          }
        }
      }

      if (missedGoal) {
        const roast = getRandomRoast(profile.roast_persona, profile.roast_intensity);
        showRoast(roast, missedGoal.title);
        localStorage.setItem('hg_detector_last_check', todayStr);
      } 
      else if (dailyGoalsCount > 0 && allDailyDone) {
        const content = getRandomContent('personal');
        showWin(content, "Flawless Yesterday!");
        localStorage.setItem('hg_detector_last_check', todayStr);
      }
    };

    runCheck();
  }, [profile, showRoast, showWin]);
}
