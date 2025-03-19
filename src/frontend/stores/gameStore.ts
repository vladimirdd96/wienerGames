import { create } from 'zustand';
import { clientBaseUrl, urls, errorMessages } from '../../utils/constants';
import { PlayResponse, SimulateResponse } from '../../models/types';

interface GameState {
  // Game state
  matrix: string[][];
  rolling: boolean;
  winnings: number;
  totalWinningsToday: number;
  betAmount: number;
  rollCount: number;

  // Animation state
  displayedSymbols: string[][];
  reelStates: boolean[];

  // Wallet state
  balance: number;

  // RTP
  rtp: number;

  // Errors
  slotMachineError: string | null;
  rtpError: string | null;
  walletError: string | null;

  // Actions
  setBetAmount: (amount: number) => void;
  setRollCount: (count: number) => void;
  setRolling: (isRolling: boolean) => void;
  setDisplayedSymbols: (symbols: string[][]) => void;
  setReelStates: (states: boolean[]) => void;
  play: () => Promise<void>;
  simulate: () => Promise<void>;
  deposit: (amount: number) => Promise<void>;
  fetchBalance: () => Promise<void>;
  fetchRTP: () => Promise<void>;
  reset: () => void;
}

const initialState = {
  matrix: [],
  rolling: false,
  winnings: 0,
  totalWinningsToday: 0,
  betAmount: 10,
  rollCount: 1,
  balance: 0,
  rtp: 0,
  displayedSymbols: [],
  reelStates: [false, false, false],
  slotMachineError: null,
  rtpError: null,
  walletError: null,
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  setBetAmount: (amount: number) => set({ betAmount: amount }),
  
  setRollCount: (count: number) => set({ rollCount: count }),
  
  setRolling: (isRolling: boolean) => set({ rolling: isRolling }),

  setDisplayedSymbols: (symbols: string[][]) => set({ displayedSymbols: symbols }),

  setReelStates: (states: boolean[]) => set({ reelStates: states }),

  play: async () => {
    try {
      set({ slotMachineError: null });

      const response = await fetch(clientBaseUrl + urls.slot.play, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet: get().betAmount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ slotMachineError: errorData.error.message });
        throw new Error(errorData.error.message);
      }

      const data: PlayResponse = await response.json();
      set(state => ({
        matrix: data.matrix,
        winnings: data.winnings,
        totalWinningsToday: state.totalWinningsToday + data.winnings,
      }));

      // Fetch updated balance after play
      await get().fetchBalance();
    } catch (err) {
      if (err instanceof Error) {
        set({ slotMachineError: err.message });
      } else {
        set({ slotMachineError: errorMessages.default });
      }
    }
  },

  simulate: async () => {
    const { rollCount, betAmount } = get();
    if (rollCount === 0) return;

    try {
      set({ slotMachineError: null });

      const response = await fetch(clientBaseUrl + urls.slot.simulate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet: betAmount, count: rollCount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ slotMachineError: errorData.error.message });
        throw new Error(errorData.error.message);
      }

      const data: SimulateResponse = await response.json();
      set(state => ({
        matrix: data.matrix,
        winnings: data.totalWinnings,
        totalWinningsToday: state.totalWinningsToday + data.totalWinnings,
      }));

      // Fetch updated balance after simulation
      await get().fetchBalance();
    } catch (err) {
      if (err instanceof Error) {
        set({ slotMachineError: err.message });
      } else {
        set({ slotMachineError: errorMessages.default });
      }
    }
  },

  deposit: async (amount: number) => {
    try {
      set({ walletError: null });

      const response = await fetch(clientBaseUrl + urls.wallet.deposit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        set({ walletError: errorData.error.message });
        throw new Error(errorData.error.message);
      }

      // Fetch updated balance after deposit
      await get().fetchBalance();
    } catch (err) {
      if (err instanceof Error) {
        set({ walletError: err.message });
      } else {
        set({ walletError: errorMessages.default });
      }
    }
  },

  fetchBalance: async () => {
    try {
      set({ walletError: null });

      const response = await fetch(clientBaseUrl + urls.wallet.balance);
      
      if (!response.ok) {
        const errorData = await response.json();
        set({ walletError: errorData.error.message });
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      set({ balance: data.balance });
    } catch (err) {
      if (err instanceof Error) {
        set({ walletError: err.message });
      } else {
        set({ walletError: errorMessages.default });
      }
    }
  },

  fetchRTP: async () => {
    try {
      set({ rtpError: null });

      const response = await fetch(clientBaseUrl + urls.slot.rtp);
      
      if (!response.ok) {
        const errorData = await response.json();
        set({ rtpError: errorData.error.message });
        throw new Error(errorData.error.message);
      }

      const data = await response.json();
      set({ rtp: data.rtp });
      return data.rtp;
    } catch (err) {
      if (err instanceof Error) {
        set({ rtpError: err.message });
      } else {
        set({ rtpError: errorMessages.default });
      }
      return 0;
    }
  },

  reset: () => set(initialState),
})); 