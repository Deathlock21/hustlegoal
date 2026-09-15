import { create } from 'zustand';
import type { OverlayState, Theme, ContentEntry, RoastEntry } from '../types';

interface AppStore {
  overlay: OverlayState;
  theme: Theme;
  showWin: (content: ContentEntry, goalTitle: string) => void;
  showRoast: (roast: RoastEntry, goalTitle: string) => void;
  dismissOverlay: () => void;
  setTheme: (theme: Theme) => void;
}

const defaultOverlay: OverlayState = {
  type: null,
  content: null,
  roast: null,
  goalTitle: '',
};

export const useAppStore = create<AppStore>((set) => ({
  overlay: defaultOverlay,
  theme: (localStorage.getItem('hg_theme') as Theme) || 'mythic',

  showWin: (content, goalTitle) =>
    set({ overlay: { type: 'win', content, roast: null, goalTitle } }),

  showRoast: (roast, goalTitle) =>
    set({ overlay: { type: 'roast', content: null, roast, goalTitle } }),

  dismissOverlay: () => set({ overlay: defaultOverlay }),

  setTheme: (theme) => {
    localStorage.setItem('hg_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
}));
