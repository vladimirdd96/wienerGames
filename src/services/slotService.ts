import { rngService } from './rngService';
import { SlotMatrix } from '../models/types';

const symbols = ['🍒', '🍋', '🍇', '🔔', '⭐'];

const initialState = {
  totalBets: 0,
  totalWinnings: 0,
};

let serviceState = { ...initialState };

const spin = (): SlotMatrix => {
  const result: SlotMatrix = [];
  Array(3)
    .fill(0)
    .forEach(() => {
      const randomNumbers = rngService.getRandomSymbolPositions(symbols.length);
      const row = randomNumbers.map(index => symbols[index]);
      result.push(row);
    });
  return result;
};

const calculateWinnings = (matrix: SlotMatrix, bet: number): number => {
  let winnings = 0;

  matrix.forEach(row => {
    const [firstSymbol, ...rest] = row;
    const isWinningRow = rest.every(symbol => symbol === firstSymbol);

    if (isWinningRow) {
      winnings += bet * 5; // 5x payout for a winning row
    }
  });

  serviceState.totalWinnings += winnings;
  return winnings;
};

const calculateRTP = (): number => {
  if (!serviceState.totalWinnings || !serviceState.totalBets) return 0;
  return (serviceState.totalWinnings / serviceState.totalBets) * 100;
};

const trackBets = (bet: number): void => {
  serviceState.totalBets += bet;
};

const resetState = (): void => {
  serviceState = { ...initialState };
};

const getServiceState = () => ({
  totalBets: serviceState.totalBets,
  totalWinnings: serviceState.totalWinnings,
});

export const slotService = {
  spin,
  calculateWinnings,
  calculateRTP,
  trackBets,
  // ONLY USE FOR TESTING PURPOSES
  resetState,
  getServiceState,
};
