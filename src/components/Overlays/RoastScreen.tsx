import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { RoastEntry, UserProfile } from '../../types';
import { fillRoastTemplate } from '../../data/roastContent';
import './RoastScreen.css';

const REACTIONS = [
  { icon: '◆', label: 'Funny' },
  { icon: '◆', label: 'Dead' },
  { icon: '◆', label: 'Motivated' },
];

const PERSONA_LABELS: Record<string, string> = {
  sarcastic: '◆ Sarcasm Mode',
  honest: '◆ Brutal Honesty',
  playful: '◆ Playfully Mean',
  coach: '◆ Coach Mode',
  ramsay: '◆ Gordon Ramsay',
};

interface RoastScreenProps {
  profile: UserProfile | undefined;
}

export default function RoastScreen({ profile }: RoastScreenProps) {
  const { overlay, dismissOverlay } = useAppStore();
  const roast = overlay.roast as RoastEntry;

  const filledRoast = roast && profile ? fillRoastTemplate(roast.template, {
    name: profile.name,
    goal: overlay.goalTitle,
    streak: 0,
    days: 1,
  }) : '';

  return (
    <AnimatePresence>
      {overlay.type === 'roast' && roast && (
        <div className="overlay" id="roast-overlay">
          <motion.div
            className="overlay-backdrop roast-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissOverlay}
          />
          <motion.div
            className="overlay-content roast-content"
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 18, stiffness: 220 }}
          >
            <div className="roast-persona-badge">
              {PERSONA_LABELS[roast.persona] || roast.persona}
            </div>

            <div className="roast-icon">✦</div>

            <div className="roast-goal-label">
              Missed: <strong>{overlay.goalTitle}</strong>
            </div>

            <motion.p
              className="roast-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {filledRoast}
            </motion.p>

            <div className="roast-divider">
              <Zap size={16} />
              <span>Your Comeback Challenge</span>
              <Zap size={16} />
            </div>

            <div className="roast-comeback">
              {roast.comeback}
            </div>

            <div className="win-reactions">
              <span className="caption">How did that hit?</span>
              <div className="reaction-row">
                {REACTIONS.map((r, i) => (
                  <button key={i} className="btn btn-ghost btn-sm" onClick={dismissOverlay}>
                    {r.icon} {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button id="roast-dismiss" className="btn btn-ghost" onClick={dismissOverlay}>
              <X size={16} />
              I'll Do Better
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
