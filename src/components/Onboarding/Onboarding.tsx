import { useState } from 'react';
import { motion } from 'framer-motion';
import { saveProfile } from '../../db/database';
import { useAppStore } from '../../store/useAppStore';
import { AVATAR_OPTIONS } from '../../data/constants';
import type { RoastPersona } from '../../types';
import './Onboarding.css';


const PERSONAS: { value: RoastPersona; label: string; desc: string }[] = [
  { value: 'sarcastic', label: '◆ Sarcastic', desc: 'Witty, dry, and a little cutting' },
  { value: 'honest', label: '◆ Brutally Honest', desc: 'No sugarcoating. Real talk only.' },
  { value: 'playful', label: '◆ Playfully Mean', desc: 'Jokes, but they sting a little' },
  { value: 'coach', label: '◆ Coach Mode', desc: 'Tough love with a path forward' },
  { value: 'ramsay', label: '◆ Gordon Ramsay', desc: 'WHAT IS THIS DISGRACE?!' },
];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('◆');
  const [persona, setPersona] = useState<RoastPersona>('sarcastic');
  const [intensity, setIntensity] = useState(3);
  const { setTheme } = useAppStore();

  const handleComplete = async () => {
    await saveProfile({
      name: name.trim() || 'Warrior',
      avatar,
      roast_intensity: intensity as 1 | 2 | 3 | 4 | 5,
      theme: 'mythic',
      motivation_prefs: ['greek', 'stoic', 'movie'],
      roast_persona: persona,
      onboarding_complete: true,
    });
    setTheme('mythic');
    document.documentElement.setAttribute('data-theme', 'mythic');
    onComplete();
  };

  const intensityLabel = ['', 'Gentle Nudge', 'Mild Heat', 'Full Roast', 'Scorched Earth', 'GORDON RAMSAY'][intensity];

  return (
    <div className="onboarding">
      <div className="onboarding-bg" />
      <motion.div
        className="onboarding-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="onboarding-step">
            <div className="onboarding-icon">✦</div>
            <h1 className="onboarding-title">Welcome to HustleGoal</h1>
            <p className="onboarding-subtitle">
              Built for focused people who hold themselves to a higher standard.
            </p>

            <div className="form-group mt-xl">
              <label className="form-label">What do they call you?</label>
              <input
                id="onboarding-name"
                className="form-input"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={32}
                autoFocus
              />
            </div>

            <div className="form-group mt-lg">
              <label className="form-label">Choose your avatar</label>
              <div className="avatar-grid">
                {AVATAR_OPTIONS.slice(0, 5).map(a => (
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

            <button
              id="onboarding-next-1"
              className="btn btn-primary btn-lg btn-full mt-xl"
              onClick={() => setStep(2)}
              disabled={!name.trim()}
            >
              Continue →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="onboarding-step">
            <div className="onboarding-icon">✦</div>
            <h2 className="onboarding-title">How should we roast you, {name}?</h2>
            <p className="onboarding-subtitle">
              When you miss a goal, HustleGoal holds you accountable. Choose your style.
            </p>

            <div className="persona-grid mt-lg">
              {PERSONAS.map(p => (
                <button
                  key={p.value}
                  className={`persona-btn ${persona === p.value ? 'selected' : ''}`}
                  onClick={() => setPersona(p.value)}
                >
                  <span className="persona-label">{p.label}</span>
                  <span className="persona-desc">{p.desc}</span>
                </button>
              ))}
            </div>

            <div className="form-group mt-lg">
              <div className="flex justify-between items-center mb-sm">
                <label className="form-label">Roast Intensity</label>
                <span className="badge badge-gold">{intensityLabel}</span>
              </div>
              <input
                type="range" min={1} max={5} value={intensity}
                className="slider"
                onChange={e => setIntensity(Number(e.target.value))}
              />
              <div className="flex justify-between caption mt-sm">
                <span>Gentle</span><span>Savage</span>
              </div>
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button
                id="onboarding-complete"
                className="btn btn-primary btn-lg"
                style={{ flex: 1 }}
                onClick={handleComplete}
              >
                Let's Get to Work ✦
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
