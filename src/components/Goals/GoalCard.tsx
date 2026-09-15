import { format } from 'date-fns';
import { Check, X, Minus } from 'lucide-react';
import { addCheckIn } from '../../db/database';
import { useTodayCheckIn } from '../../hooks/useGoals';
import { useAppStore } from '../../store/useAppStore';
import { getRandomContent } from '../../data/motivationContent';
import { getRandomRoast } from '../../data/roastContent';
import { CATEGORY_LABELS, PRIORITY_LABELS } from '../../data/constants';
import type { Goal, UserProfile } from '../../types';
import './GoalCard.css';

interface GoalCardProps {
  goal: Goal;
  profile: UserProfile | undefined;
  onClick?: () => void;
}

export default function GoalCard({ goal, profile, onClick }: GoalCardProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayCheck = useTodayCheckIn(goal.id!);
  const { showWin, showRoast } = useAppStore();

  const handleCheckIn = async (status: 'done' | 'missed' | 'skip', e: React.MouseEvent) => {
    e.stopPropagation();
    if (!goal.id) return;

    await addCheckIn({ goal_id: goal.id, date: today, status });

    if (status === 'done') {
      const content = getRandomContent(goal.category);
      showWin(content, goal.title);
    } else if (status === 'missed' && profile) {
      const roast = getRandomRoast(profile.roast_persona, profile.roast_intensity);
      showRoast(roast, goal.title);
    }
  };

  const isChecked = !!todayCheck;
  const isDone = todayCheck?.status === 'done';
  const isMissed = todayCheck?.status === 'missed';

  const daysUntilDeadline = goal.deadline
    ? Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / 86400000)
    : null;

  return (
    <div
      className={`goal-card card card-interactive ${isDone ? 'goal-done' : ''} ${isMissed ? 'goal-missed' : ''}`}
      onClick={onClick}
    >
      <div className={`cat-stripe cat-stripe-${goal.category}`} />

      <div className="goal-card-body">
        <div className="goal-card-header">
          <div>
            <h3 className="goal-card-title">{goal.title}</h3>
            <div className="goal-card-meta">
              <span className="caption">{CATEGORY_LABELS[goal.category]}</span>
              <span className="badge badge-gold">{goal.recurrence}</span>
              {goal.priority === 1 && <span className="caption">{PRIORITY_LABELS[goal.priority]}</span>}
            </div>
          </div>
          {todayCheck && (
            <div className={`checkin-status-dot ${todayCheck.status}`} title={`Today: ${todayCheck.status}`} />
          )}
        </div>

        {goal.description && (
          <p className="goal-card-desc">{goal.description}</p>
        )}

        <div className="goal-card-footer">
          <div className="goal-card-info">
            {daysUntilDeadline !== null && (
              <span className={`caption ${daysUntilDeadline <= 3 ? 'text-miss' : 'text-muted'}`}>
                {daysUntilDeadline > 0 ? `⏱ ${daysUntilDeadline}d left` : daysUntilDeadline === 0 ? '⚠️ Due today' : '🔴 Overdue'}
              </span>
            )}
          </div>

          <div className="goal-card-actions" onClick={e => e.stopPropagation()}>
            {!isChecked ? (
              <>
                <button
                  id={`goal-done-${goal.id}`}
                  className="checkin-btn done"
                  onClick={e => handleCheckIn('done', e)}
                  title="Mark done"
                >
                  <Check size={14} />
                </button>
                <button
                  id={`goal-missed-${goal.id}`}
                  className="checkin-btn miss"
                  onClick={e => handleCheckIn('missed', e)}
                  title="Mark missed"
                >
                  <X size={14} />
                </button>
                <button
                  className="checkin-btn skip"
                  onClick={e => handleCheckIn('skip', e)}
                  title="Skip today"
                >
                  <Minus size={14} />
                </button>
              </>
            ) : (
              <span className={`checked-label ${todayCheck?.status}`}>
                {isDone ? '✅ Done' : isMissed ? '❌ Missed' : '⏭ Skipped'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
