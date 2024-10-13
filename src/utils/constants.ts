export const errorMessages = {
  default: 'An unexpected error occurred',
  insufficientBalance: 'Insufficient balance',
  invalidBetAmount: 'Invalid bet amount',
  invalidBetCount: 'Invalid count or bet amount',
  invalidDepositAmount: 'Invalid deposit amount',
  invalidWithdrawAmount: 'Invalid withdrawal amount',
  notEnoughFunds: 'Not enough money in your balance',
  failedToFetchRtp: 'Failed to fetch RTP',
  failedToFetchBalance: 'Failed to fetch balance',
  failedToDepositFunds: 'Failed to deposit funds',
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export const serverBaseUrl = 'http://localhost:9000';
export const clientBaseUrl = 'http://localhost:3000';
export const basePort = 3000;

export const urls = {
  slot: {
    play: '/play',
    simulate: '/sim',
    rtp: '/rtp',
  },
  wallet: {
    deposit: '/wallet/deposit',
    withdraw: '/wallet/withdraw',
    balance: '/wallet/balance',
  },
};
