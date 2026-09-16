import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Trash2 } from 'lucide-react';
import { addGoal } from '../../hooks/useGoals';
import { nanoid } from 'nanoid';
import type { GoalCategory, GoalRecurrence, Subtask } from '../../types';
import './NewGoalForm.css';

const CATEGORIES: { value: GoalCategory; label: string; icon: string }[] = [
  { value: 'health', label: 'Health', icon: '◆' },
  { value: 'career', label: 'Career', icon: '◆' },
  { value: 'finance', label: 'Finance', icon: '◆' },
  { value: 'learning', label: 'Learning', icon: '◆' },
  { value: 'personal', label: 'Personal', icon: '◆' },
];

export default function NewGoalForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('personal');
  const [recurrence, setRecurrence] = useState<GoalRecurrence>('daily');
  const [priority, setPriority] = useState<1 | 2 | 3>(2);
  const [deadline, setDeadline] = useState('');
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [subtaskInput, setSubtaskInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtasks(prev => [...prev, { id: nanoid(), title: subtaskInput.trim(), done: false }]);
    setSubtaskInput('');
  };

  const removeSubtask = (id: string) => setSubtasks(prev => prev.filter(s => s.id !== id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Give your goal a title.'); return; }
    setSaving(true);
    try {
      await addGoal({
        title: title.trim(),
        description: description.trim(),
        category,
        recurrence,
        priority,
        deadline: deadline || null,
        archived: false,
        created_at: new Date().toISOString(),
        subtasks,
      });
      navigate('/goals');
    } catch {
      setError('Something went wrong. Try again.');
      setSaving(false);
    }
  };

  return (
    <div className="page-content">
      <div className="form-page-header">
        <div>
          <h1 className="heading-1">New Goal</h1>
          <p className="caption mt-sm">Commit to it. Track it. Own it.</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)}>
          <X size={16} /> Cancel
        </button>
      </div>

      <form id="new-goal-form" className="goal-form card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Goal Title *</label>
          <input
            id="goal-title"
            className="form-input"
            placeholder="e.g. Run 5km every morning"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
            maxLength={80}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            id="goal-description"
            className="form-textarea"
            placeholder="Why does this goal matter to you?"
            value={description}
            onChange={e => setDescription(e.target.value)}
            maxLength={300}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <div className="category-grid">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                type="button"
                className={`cat-btn cat-btn-${c.value} ${category === c.value ? 'selected' : ''}`}
                onClick={() => setCategory(c.value)}
              >
                <span className="cat-btn-icon">{c.icon}</span>
                <span className="cat-btn-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Recurrence</label>
            <select
              id="goal-recurrence"
              className="form-select"
              value={recurrence}
              onChange={e => setRecurrence(e.target.value as GoalRecurrence)}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="once">One-time</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
            <select
              id="goal-priority"
              className="form-select"
              value={priority}
              onChange={e => setPriority(Number(e.target.value) as 1 | 2 | 3)}
            >
              <option value={1}>◆ High</option>
              <option value={2}>◇ Medium</option>
              <option value={3}>◈ Low</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Deadline (optional)</label>
          <input
            id="goal-deadline"
            type="date"
            className="form-input"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Milestones / Subtasks</label>
          <div className="subtask-input-row">
            <input
              className="form-input"
              placeholder="Add a milestone..."
              value={subtaskInput}
              onChange={e => setSubtaskInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
            />
            <button type="button" className="btn btn-ghost" onClick={addSubtask}>
              <Plus size={16} />
            </button>
          </div>
          {subtasks.length > 0 && (
            <div className="subtask-list">
              {subtasks.map(s => (
                <div key={s.id} className="subtask-item">
                  <span className="subtask-title">{s.title}</span>
                  <button type="button" className="subtask-remove" onClick={() => removeSubtask(s.id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={() => navigate(-1)}>Cancel</button>
          <button
            id="save-goal-btn"
            type="submit"
            className="btn btn-primary"
            style={{ flex: 1 }}
            disabled={saving || !title.trim()}
          >
            {saving ? 'Saving...' : '✦ Lock It In'}
          </button>
        </div>
      </form>
    </div>
  );
}
