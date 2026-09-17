import { useLiveQuery } from 'dexie-react-hooks';
import { db, getWinRateForWeek, getStreakForGoal } from '../../db/database';
import { useTodaysGoals } from '../../hooks/useGoals';
import { useProfile } from '../../hooks/useProfile';
import GoalCard from '../Goals/GoalCard';
import { useNavigate } from 'react-router-dom';
import { Plus, TrendingUp, Flame, Target } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import type { Goal } from '../../types';
import './Dashboard.css';

const GREETING = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
};

export default function Dashboard() {
  const navigate = useNavigate();
  const profile = useProfile();
  const todaysGoals: Goal[] = useTodaysGoals() ?? [];

  const winRate = useLiveQuery(() => getWinRateForWeek(), []);

  const activeStreaks = useLiveQuery(async () => {
    const goals = await db.goals.filter(g => !g.archived).toArray();
    const withStreaks = await Promise.all(
      goals.map(async (g: Goal) => ({ goal: g, streak: await getStreakForGoal(g.id!) }))
    );
    return withStreaks.filter((x: { goal: Goal; streak: number }) => x.streak > 0)
      .sort((a: { streak: number }, b: { streak: number }) => b.streak - a.streak)
      .slice(0, 5);
  }, []);

  const winPct = winRate ? (winRate.total > 0 ? Math.round((winRate.wins / winRate.total) * 100) : 0) : 0;
  const todayDate = format(new Date(), 'EEEE, MMMM d');
  const hasGoals = todaysGoals.length > 0;

  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <p className="dashboard-date label">{todayDate}</p>
          <h1 className="display-2 mt-sm">
            {GREETING()}, <span className="text-gold">{profile?.name ?? 'Warrior'}</span>
          </h1>
          {hasGoals && (
            <p className="text-secondary mt-sm">The battlefield is today. What are you winning?</p>
          )}
        </div>
        {hasGoals && (
          <button id="dashboard-new-goal" className="btn btn-primary" onClick={() => navigate('/goals/new')}>
            <Plus size={16} /> New Goal
          </button>
        )}
      </motion.div>

      {!hasGoals ? (
        /* Empty State — Spacious, roast-focused, no stats summary, no add goal button */
        <motion.div
          className="home-empty-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <blockquote className="home-empty-roast">
            "no gaols for today??given up already huh "
          </blockquote>
        </motion.div>
      ) : (
        /* Full Layout — When goals are set */
        <>
          {/* Stats Row */}
          <motion.div
            className="grid-3 mt-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="card stat-card">
              <TrendingUp size={20} className="stat-icon" />
              <div className="stat-value">{winPct}%</div>
              <div className="stat-label">7-Day Win Rate</div>
              <div className="progress-bar mt-sm">
                <div className="progress-fill" style={{ width: `${winPct}%` }} />
              </div>
            </div>
            <div className="card stat-card">
              <Target size={20} className="stat-icon" />
              <div className="stat-value">{todaysGoals.length}</div>
              <div className="stat-label">Goals Today</div>
            </div>
            <div className="card stat-card">
              <Flame size={20} className="stat-icon" />
              <div className="stat-value">{(activeStreaks as Array<{ goal: Goal; streak: number }> | undefined)?.[0]?.streak ?? 0}</div>
              <div className="stat-label">Best Streak</div>
            </div>
          </motion.div>

          {/* Today's Goals */}
          <motion.section
            className="mt-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <div className="section-header">
              <h2 className="heading-1">Today's Focus</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/goals')}>
                View all →
              </button>
            </div>

            <div className="grid-auto mt-lg">
              {todaysGoals.map((goal: Goal, i: number) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <GoalCard
                    goal={goal}
                    profile={profile}
                    onClick={() => navigate(`/goals/${goal.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Active Streaks */}
          {(activeStreaks as Array<{ goal: Goal; streak: number }> | undefined)?.length ? (
            <motion.section
              className="mt-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              <div className="section-header mb-md">
                <h2 className="heading-1">Active Streaks</h2>
              </div>
              <div className="streaks-list">
                {(activeStreaks as Array<{ goal: Goal; streak: number }>).map(({ goal, streak }) => (
                  <div
                    key={goal.id}
                    className="streak-row card card-interactive"
                    onClick={() => navigate(`/goals/${goal.id}`)}
                  >
                    <div className={`cat-stripe cat-stripe-${goal.category}`} />
                    <span className="streak-row-title">{goal.title}</span>
                    <div className="streak-badge">
                      <Flame size={14} />
                      <span>{streak} day{streak !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          ) : null}
        </>
      )}
    </div>
  );
}
