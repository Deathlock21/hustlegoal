import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Archive, Trash2, ChevronRight } from 'lucide-react';
import { useGoals, archiveGoal, deleteGoal } from '../../hooks/useGoals';
import { useProfile } from '../../hooks/useProfile';
import GoalCard from './GoalCard';
import type { Goal, GoalCategory } from '../../types';
import './GoalList.css';

const CATEGORY_FILTERS: { value: 'all' | GoalCategory; label: string }[] = [
  { value: 'all', label: '⚡ All' },
  { value: 'health', label: '❤️ Health' },
  { value: 'career', label: '💼 Career' },
  { value: 'finance', label: '💰 Finance' },
  { value: 'learning', label: '📚 Learning' },
  { value: 'personal', label: '🌟 Personal' },
];

export default function GoalList() {
  const navigate = useNavigate();
  const goals = useGoals(false);
  const profile = useProfile();
  const [filter, setFilter] = useState<'all' | GoalCategory>('all');
  const [contextMenu, setContextMenu] = useState<{ goalId: number; x: number; y: number } | null>(null);

  const filtered = (goals ?? []).filter((g: Goal) => filter === 'all' || g.category === filter);

  const handleContextMenu = (e: React.MouseEvent, goalId: number) => {
    e.preventDefault();
    setContextMenu({ goalId, x: e.clientX, y: e.clientY });
  };

  const handleArchive = async (id: number) => {
    await archiveGoal(id);
    setContextMenu(null);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Delete this goal and all its history? This cannot be undone.')) {
      await deleteGoal(id);
      setContextMenu(null);
    }
  };

  return (
    <div className="page-content" onClick={() => setContextMenu(null)}>
      <div className="goals-page-header">
        <div>
          <h1 className="heading-1">Your Goals</h1>
          <p className="caption mt-sm">{(goals ?? []).length} active goal{(goals ?? []).length !== 1 ? 's' : ''}</p>
        </div>
        <button id="add-goal-page-btn" className="btn btn-primary" onClick={() => navigate('/goals/new')}>
          <Plus size={16} />
          New Goal
        </button>
      </div>

      <div className="filter-tabs">
        {CATEGORY_FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-tab ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎯</div>
          <div className="empty-state-title">No goals here yet.</div>
          <p>The ones who win are the ones who start.</p>
          <button className="btn btn-primary mt-md" onClick={() => navigate('/goals/new')}>
            <Plus size={16} />
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map((goal: Goal) => (
            <div key={goal.id} onContextMenu={e => handleContextMenu(e, goal.id!)}>
              <GoalCard
                goal={goal}
                profile={profile}
                onClick={() => navigate(`/goals/${goal.id}`)}
              />
            </div>
          ))}
        </div>
      )}

      {contextMenu && (
        <div
          className="context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={e => e.stopPropagation()}
        >
          <button className="ctx-item" onClick={() => navigate(`/goals/${contextMenu.goalId}`)}>
            <ChevronRight size={14} /> View Detail
          </button>
          <button className="ctx-item" onClick={() => handleArchive(contextMenu.goalId)}>
            <Archive size={14} /> Archive
          </button>
          <button className="ctx-item danger" onClick={() => handleDelete(contextMenu.goalId)}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
