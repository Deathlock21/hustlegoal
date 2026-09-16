/**
 * Design tokens and named constants for Hustle Goal.
 * All colors, culture palette entries, and category mappings live here.
 * Components must import from this file — no hardcoded values in TSX files.
 */

import type { MythCulture, GoalCategory } from '../types';

/** Per-culture accent colors for the Win Screen overlay.
 *  These map directly to the CSS variable system palette. */
export const CULTURE_PALETTE: Record<MythCulture, string> = {
  greek:    '#4A90E2', // Aegean blue
  hindu:    '#FF6B35', // Saffron orange
  norse:    '#6C5CE7', // Asgardian violet
  japanese: '#E17055', // Torii red
  stoic:    '#A8B2D8', // Stoic silver-blue
  movie:    '#FFD700', // Cinematic gold
};

/** Fallback color (gold) when culture is unknown */
export const FALLBACK_ACCENT = '#D4AF37';

/** Category display labels */
export const CATEGORY_LABELS: Record<GoalCategory, string> = {
  health:   '◆ Health',
  career:   '◆ Career',
  finance:  '◆ Finance',
  learning: '◆ Learning',
  personal: '◆ Personal',
};

/** Priority display labels (1 = high priority) */
export const PRIORITY_LABELS: Record<1 | 2 | 3, string> = {
  1: '◆ High',
  2: '◇ Medium',
  3: '◈ Low',
};

/** Geometric avatars for user selection */
export const AVATAR_OPTIONS = ['◆', '◇', '✦', '✧', '■', '□', '▲', '△', '▼', '▽'];
