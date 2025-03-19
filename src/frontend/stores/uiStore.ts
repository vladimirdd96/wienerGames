import { create } from 'zustand';

interface UIState {
  windowWidth: number;
  setWindowWidth: (width: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  windowWidth: window.innerWidth,
  setWindowWidth: (width: number) => set({ windowWidth: width }),
}));

// Initialize window resize listener
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    useUIStore.getState().setWindowWidth(window.innerWidth);
  });
} 