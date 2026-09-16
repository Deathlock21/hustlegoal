import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { CULTURE_PALETTE, FALLBACK_ACCENT } from '../../data/constants';
import type { ContentEntry } from '../../types';
import './WinScreen.css';

const REACTIONS = ['Nice', 'Great', 'Epic', 'Legend', 'Solid'];

export default function WinScreen() {
  const { overlay, dismissOverlay } = useAppStore();
  const content = overlay.content as ContentEntry;
  const accentColor = content?.culture ? (CULTURE_PALETTE[content.culture] ?? FALLBACK_ACCENT) : FALLBACK_ACCENT;

  return (
    <AnimatePresence>
      {overlay.type === 'win' && content && (
        <div className="overlay" id="win-overlay">
          <motion.div
            className="overlay-backdrop win-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismissOverlay}
            style={{ '--accent': accentColor } as React.CSSProperties}
          />
          <motion.div
            className="overlay-content win-content"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <div className="win-goal-label">
              <Sparkles size={14} />
              <span>Goal Complete — {overlay.goalTitle}</span>
            </div>

            <div className="win-icon" style={{ color: accentColor }}>
              {content.icon}
            </div>

            <div className="win-quote-wrapper">
              <span className="win-quote-mark">"</span>
              <p className="win-quote">{content.quote}</p>
              <span className="win-quote-mark closing">"</span>
            </div>

            <div className="win-attribution">
              {content.character && (
                <span className="win-character">{content.character}</span>
              )}
              <span className="win-source">— {content.source}</span>
            </div>

            <p className="win-context">{content.context}</p>

            <div className="win-culture-badge" style={{ background: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}>
              {content.culture.toUpperCase()}
            </div>

            <div className="win-reactions">
              <span className="caption">How did that land?</span>
              <div className="reaction-row">
                {REACTIONS.map(r => (
                  <button key={r} className="reaction-btn" onClick={dismissOverlay}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <button id="win-dismiss" className="btn btn-ghost win-dismiss" onClick={dismissOverlay}>
              <X size={16} />
              Keep Winning
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
