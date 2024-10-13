import { Request, Response, NextFunction } from 'express';
import { walletService } from '../services/walletService';
import { WalletTransactionRequest, WalletBalanceResponse } from '../models/types';
import { createValidationError, createInsufficientBalanceError } from '../middlewares/errorHandler';
import { errorMessages, HttpStatusCode } from '../utils/constants';

// POST /wallet/deposit
const deposit = (req: Request, res: Response, next: NextFunction): void => {
  const { amount }: WalletTransactionRequest = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return next(createValidationError(errorMessages.invalidDepositAmount));
  }

  walletService.addWinnings(amount);

  const balance: WalletBalanceResponse = { balance: walletService.getBalance() };
  res.status(HttpStatusCode.OK).json(balance);
};

// POST /wallet/withdraw
const withdraw = (req: Request, res: Response, next: NextFunction): void => {
  const { amount }: WalletTransactionRequest = req.body;

  if (typeof amount !== 'number' || amount <= 0) {
    return next(createValidationError(errorMessages.invalidWithdrawAmount));
  }

  if (!walletService.hasSufficientBalance(amount)) {
    return next(createInsufficientBalanceError());
  }

  walletService.subtractBet(amount);

  const balance: WalletBalanceResponse = { balance: walletService.getBalance() };
  res.status(HttpStatusCode.OK).json(balance);
};

// GET /wallet/balance
const getBalance = (_: Request, res: Response): void => {
  const balance: WalletBalanceResponse = { balance: walletService.getBalance() };
  res.status(HttpStatusCode.OK).json(balance);
};

export const walletController = {
  deposit,
  withdraw,
  getBalance,
};
