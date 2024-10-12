export type SlotMatrix = string[][];

export type WalletBalance = number;

export interface PlayResponse {
  matrix: SlotMatrix;
  winnings: number;
}

export interface SimulateResponse {
  totalWinnings: number;
  netResult: number;
  rtp: number;
}

export interface WalletTransactionRequest {
  amount: number;
}

export interface WalletBalanceResponse {
  balance: WalletBalance;
}

export type Bet = {
  bet: number;
};
