import { useState } from 'react';
import { motivationContent } from '../../data/motivationContent';
import type { GoalCategory, MythCulture } from '../../types';
import './Library.css';

const CULTURE_FILTERS: { value: 'all' | MythCulture; label: string }[] = [
  { value: 'all', label: '⚡ All' },
  { value: 'greek', label: '🏛️ Greek' },
  { value: 'hindu', label: '🪷 Hindu' },
  { value: 'norse', label: '🐦‍⬛ Norse' },
  { value: 'japanese', label: '🗡️ Japanese' },
  { value: 'stoic', label: '🧘 Stoic' },
  { value: 'movie', label: '🎬 Movies' },
];

const CATEGORY_FILTERS: { value: 'all' | GoalCategory; label: string }[] = [
  { value: 'all', label: 'All Goals' },
  { value: 'health', label: '❤️ Health' },
  { value: 'career', label: '💼 Career' },
  { value: 'finance', label: '💰 Finance' },
  { value: 'learning', label: '📚 Learning' },
  { value: 'personal', label: '🌟 Personal' },
];

export default function Library() {
  const [culture, setCulture] = useState<'all' | MythCulture>('all');
  const [category, setCategory] = useState<'all' | GoalCategory>('all');
  const [search, setSearch] = useState('');

  const filtered = motivationContent.filter(c => {
    if (culture !== 'all' && c.culture !== culture) return false;
    if (category !== 'all' && !c.category_tags.includes(category)) return false;
    if (search) {
      const q = search.toLowerCase();
      return c.quote.toLowerCase().includes(q) || c.source.toLowerCase().includes(q) || (c.character ?? '').toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="page-content">
      <div className="mb-lg">
        <h1 className="heading-1">Motivation Library</h1>
        <p className="caption mt-sm">{motivationContent.length} entries across myth, philosophy, and cinema</p>
      </div>

      <input
        id="library-search"
        className="form-input mb-lg"
        placeholder="🔍 Search quotes, sources, characters..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ maxWidth: 480 }}
      />

      <div className="filter-tabs">{CULTURE_FILTERS.map(f => (
        <button key={f.value} className={`filter-tab ${culture === f.value ? 'active' : ''}`} onClick={() => setCulture(f.value)}>
          {f.label}
        </button>
      ))}</div>

      <div className="filter-tabs">{CATEGORY_FILTERS.map(f => (
        <button key={f.value} className={`filter-tab ${category === f.value ? 'active' : ''}`} onClick={() => setCategory(f.value)}>
          {f.label}
        </button>
      ))}</div>

      <p className="caption mb-md">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <div className="empty-state-title">No entries match that filter.</div>
        </div>
      ) : (
        <div className="grid-auto">
          {filtered.map(entry => (
            <div key={entry.id} className="library-card card">
              <div className="library-card-header">
                <span className="library-icon">{entry.icon}</span>
                <span className={`badge badge-gold library-culture`}>{entry.culture}</span>
              </div>
              <blockquote className="library-quote">"{entry.quote}"</blockquote>
              {entry.character && <p className="library-character">{entry.character}</p>}
              <p className="library-source">— {entry.source}</p>
              <p className="library-context">{entry.context}</p>
              <div className="library-tags">
                {entry.category_tags.map(t => (
                  <span key={t} className={`badge badge-cat-${t}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
