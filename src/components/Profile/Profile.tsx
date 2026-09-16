import { useState, useEffect } from 'react';
import { useProfile, updateProfile } from '../../hooks/useProfile';
import { useAppStore } from '../../store/useAppStore';
import { AVATAR_OPTIONS } from '../../data/constants';
import type { RoastPersona, Theme, MythCulture } from '../../types';
import './Profile.css';

const PERSONAS: { value: RoastPersona; label: string }[] = [
  { value: 'sarcastic', label: '😏 Sarcastic' },
  { value: 'honest', label: '💀 Brutally Honest' },
  { value: 'playful', label: '😂 Playfully Mean' },
  { value: 'coach', label: '🏋️ Coach Mode' },
  { value: 'ramsay', label: '👨‍🍳 Gordon Ramsay' },
];

const THEMES: { value: Theme; label: string; icon: string }[] = [
  { value: 'mythic', label: 'Mythic', icon: '⚡' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
];

const MYTH_PREFS: { value: MythCulture; label: string }[] = [
  { value: 'greek', label: '🏛️ Greek' },
  { value: 'hindu', label: '🪷 Hindu' },
  { value: 'norse', label: '🐦‍⬛ Norse' },
  { value: 'japanese', label: '🗡️ Japanese' },
  { value: 'stoic', label: '🧘 Stoic' },
  { value: 'movie', label: '🎬 Movies' },
];



export default function Profile() {
  const profile = useProfile();
  const { theme, setTheme } = useAppStore();
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🔥');
  const [persona, setPersona] = useState<RoastPersona>('sarcastic');
  const [intensity, setIntensity] = useState(3);
  const [mythPrefs, setMythPrefs] = useState<MythCulture[]>(['greek', 'stoic']);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setAvatar(profile.avatar);
      setPersona(profile.roast_persona);
      setIntensity(profile.roast_intensity);
      setMythPrefs(profile.motivation_prefs);
    }
  }, [profile]);

  const toggleMythPref = (v: MythCulture) =>
    setMythPrefs(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);

  const handleSave = async () => {
    await updateProfile({
      name: name.trim() || 'Warrior',
      avatar,
      roast_persona: persona,
      roast_intensity: intensity as 1 | 2 | 3 | 4 | 5,
      motivation_prefs: mythPrefs,
      theme,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const intensityLabel = ['', 'Gentle Nudge', 'Mild Heat', 'Full Roast', 'Scorched Earth', 'GORDON RAMSAY'][intensity];

  return (
    <div className="page-content">
      <h1 className="heading-1 mb-lg">Profile & Settings</h1>

      <div className="profile-grid">
        {/* Identity */}
        <div className="card">
          <h2 className="heading-2 mb-lg">Your Identity</h2>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              id="profile-name"
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={32}
            />
          </div>

          <div className="form-group mt-md">
            <label className="form-label">Avatar</label>
            <div className="avatar-grid">
              {AVATAR_OPTIONS.map(a => (
                <button
                  key={a}
                  className={`avatar-btn ${avatar === a ? 'selected' : ''}`}
                  onClick={() => setAvatar(a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="card">
          <h2 className="heading-2 mb-lg">Appearance</h2>
          <div className="theme-options">
            {THEMES.map(t => (
              <button
                key={t.value}
                className={`theme-option ${theme === t.value ? 'selected' : ''}`}
                onClick={() => setTheme(t.value)}
              >
                <span className="theme-option-icon">{t.icon}</span>
                <span className="theme-option-label">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Roast Setup */}
        <div className="card">
          <h2 className="heading-2 mb-lg">Accountability Style</h2>

          <div className="form-group">
            <label className="form-label">Roast Persona</label>
            <div className="persona-options">
              {PERSONAS.map(p => (
                <button
                  key={p.value}
                  className={`persona-option ${persona === p.value ? 'selected' : ''}`}
                  onClick={() => setPersona(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group mt-lg">
            <div className="flex justify-between items-center mb-sm">
              <label className="form-label">Roast Intensity</label>
              <span className="badge badge-gold">{intensityLabel}</span>
            </div>
            <input
              id="roast-intensity"
              type="range" min={1} max={5} value={intensity}
              className="slider"
              onChange={e => setIntensity(Number(e.target.value))}
            />
            <div className="flex justify-between caption mt-sm">
              <span>Gentle</span><span>Savage</span>
            </div>
          </div>
        </div>

        {/* Motivation Prefs */}
        <div className="card">
          <h2 className="heading-2 mb-lg">Motivation Preferences</h2>
          <p className="caption mb-md">Which traditions do you want to pull wins from?</p>
          <div className="myth-prefs">
            {MYTH_PREFS.map(m => (
              <button
                key={m.value}
                className={`myth-pref-btn ${mythPrefs.includes(m.value) ? 'selected' : ''}`}
                onClick={() => toggleMythPref(m.value)}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-save-row mt-xl">
        <button
          id="save-profile-btn"
          className="btn btn-primary btn-lg"
          onClick={handleSave}
        >
          {saved ? '✅ Saved!' : '💾 Save Changes'}
        </button>
      </div>
    </div>
  );
}
