import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useGoal, useCheckInsForGoal } from '../../hooks/useGoals';
import { db } from '../../db/database';
import { useLiveQuery } from 'dexie-react-hooks';
import CalendarHeatmap from './CalendarHeatmap';
import { format } from 'date-fns';
import { CATEGORY_LABELS } from '../../data/constants';
import './GoalDetail.css';

export default function GoalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const goal = useGoal(Number(id));
  const checkins = useCheckInsForGoal(Number(id)) ?? [];

  const streak = useLiveQuery(async () => {
    let s = 0;
    const d = new Date();
    while (true) {
      const dateStr = format(d, 'yyyy-MM-dd');
      const c = await db.checkins.where({ goal_id: Number(id), date: dateStr }).first();
      if (c?.status === 'done') { s++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return s;
  }, [id]);

  if (!goal) {
    return (
      <div className="page-content">
        <div className="empty-state"><div className="empty-state-icon">✦</div><p>Goal not found.</p></div>
      </div>
    );
  }

  const doneCount = checkins.filter((c: { status: string }) => c.status === 'done').length;
  const total = checkins.filter((c: { status: string }) => c.status !== 'skip').length;
  const winRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const handleToggleSubtask = async (idx: number) => {
    const updated = [...goal.subtasks];
    updated[idx] = { ...updated[idx], done: !updated[idx].done };
    await db.goals.update(goal.id!, { subtasks: updated });
  };

  return (
    <div className="page-content">
      <button className="btn btn-ghost btn-sm mb-lg" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="detail-header">
        <div className={`cat-stripe cat-stripe-${goal.category}`} style={{ width: 6, borderRadius: 3 }} />
        <div>
          <p className="caption">{CATEGORY_LABELS[goal.category]} · {goal.recurrence}</p>
          <h1 className="heading-1 mt-sm">{goal.title}</h1>
          {goal.description && <p className="text-secondary mt-sm">{goal.description}</p>}
        </div>
      </div>

      <div className="detail-stats grid-3 mt-lg">
        <div className="card stat-card">
          <div className="stat-value">{streak ?? 0}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{winRate}%</div>
          <div className="stat-label">Win Rate</div>
        </div>
        <div className="card stat-card">
          <div className="stat-value">{doneCount}</div>
          <div className="stat-label">Total Wins</div>
        </div>
      </div>

      <div className="card mt-lg">
        <h2 className="heading-2 mb-lg">Activity Heatmap</h2>
        <CalendarHeatmap checkins={checkins} />
      </div>

      {goal.subtasks.length > 0 && (
        <div className="card mt-lg">
          <h2 className="heading-2 mb-lg">Milestones</h2>
          <div className="subtask-list-detail">
            {goal.subtasks.map((s, i) => (
              <button
                key={s.id}
                className={`milestone-item ${s.done ? 'done' : ''}`}
                onClick={() => handleToggleSubtask(i)}
              >
                <div className={`milestone-check ${s.done ? 'done' : ''}`}>
                  {s.done && <Check size={12} />}
                </div>
                <span className="milestone-title">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="card mt-lg">
        <h2 className="heading-2 mb-lg">Check-in History</h2>
        {checkins.length === 0 ? (
          <p className="text-muted">No check-ins yet.</p>
        ) : (
          <div className="checkin-history">
            {[...checkins].reverse().slice(0, 14).map((c: { id?: number; date: string; status: string }) => (
              <div key={c.id} className={`history-item ${c.status}`}>
                <span className="history-date">{format(new Date(c.date + 'T00:00:00'), 'MMM d, yyyy')}</span>
                <span className={`badge ${c.status === 'done' ? 'badge-win' : c.status === 'missed' ? 'badge-miss' : ''}`}>
                  {c.status === 'done' ? '◆ Done' : c.status === 'missed' ? '◆ Missed' : '◆ Skipped'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
