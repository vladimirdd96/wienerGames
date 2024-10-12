export const errorMessages = {
  default: 'An unexpected error occurred',
  insufficientBalance: 'Insufficient balance',
  invalidBetAmount: 'Invalid bet amount',
  invalidBetCount: 'Invalid count or bet amount',
  invalidDepositAmount: 'Invalid deposit amount',
  invalidWithdrawAmount: 'Invalid withdrawal amount',
};

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}
