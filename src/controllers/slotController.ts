import { Request, Response, NextFunction } from 'express';
import { slotService } from '../services/slotService';
import { walletService } from '../services/walletService';
import { createValidationError, createInsufficientBalanceError } from '../middlewares/errorHandler';
import { Bet, PlayResponse, SimulateResponse, SlotMatrix } from '../models/types';
import { errorMessages, HttpStatusCode } from '../utils/constants';

// POST /play
const play = (req: Request, res: Response, next: NextFunction): void => {
  const { bet }: Bet = req.body;

  if (typeof bet !== 'number' || bet <= 0) {
    return next(createValidationError(errorMessages.invalidBetAmount));
  }

  if (!walletService.hasSufficientBalance(bet)) {
    return next(createInsufficientBalanceError());
  }

  walletService.subtractBet(bet);

  slotService.trackBets(bet);

  const resultMatrix = slotService.spin();
  const winnings = slotService.calculateWinnings(resultMatrix, bet);

  walletService.addWinnings(winnings);
  const response: PlayResponse = { matrix: resultMatrix, winnings };
  res.status(HttpStatusCode.OK).json(response);
};

// POST /sim
const simulate = (req: Request, res: Response, next: NextFunction): void => {
  const { count, bet }: { count: number; bet: number } = req.body;

  if (typeof count !== 'number' || count <= 0 || typeof bet !== 'number' || bet <= 0) {
    return next(createValidationError(errorMessages.invalidBetCount));
  }

  const totalBet = count * bet;

  if (!walletService.hasSufficientBalance(totalBet)) {
    return next(createInsufficientBalanceError());
  }

  walletService.subtractBet(totalBet);

  let totalWinnings = 0;
  let slotMatrix: SlotMatrix = [];

  Array(count)
    .fill(0)
    .forEach(() => {
      slotMatrix = slotService.spin();
      const winnings = slotService.calculateWinnings(slotMatrix, bet);
      totalWinnings += winnings;

      slotService.trackBets(bet);
    });

  walletService.addWinnings(totalWinnings);

  const rtp = slotService.calculateRTP();

  const netResult = totalWinnings - totalBet;
  const response: SimulateResponse = { matrix: slotMatrix, totalWinnings, netResult, rtp };

  res.status(HttpStatusCode.OK).json(response);
};

// GET /rtp
const getRTP = (_: Request, res: Response): void => {
  const rtp = slotService.calculateRTP();
  res.status(HttpStatusCode.OK).json({ rtp });
};

export const slotController = {
  play,
  simulate,
  getRTP,
};
