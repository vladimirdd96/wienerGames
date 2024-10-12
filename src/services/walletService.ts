import { WalletBalance } from '../models/types';

const initialState = {
  balance: 100,
};

let serviceState = { ...initialState };

const getBalance = (): WalletBalance => serviceState.balance;

const hasSufficientBalance = (amount: number): boolean => serviceState.balance >= amount;

const subtractBet = (amount: number): void => {
  if (hasSufficientBalance(amount)) {
    serviceState.balance -= amount;
  }
};

const addWinnings = (amount: number): void => {
  serviceState.balance += amount;
};

const resetBalance = (): void => {
  serviceState = { ...initialState };
};

export const walletService = {
  getBalance,
  hasSufficientBalance,
  subtractBet,
  addWinnings,
  // ONLY USE FOR TESTING PURPOSES
  resetBalance,
};
