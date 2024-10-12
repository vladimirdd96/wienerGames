import { walletService } from '../walletService';

describe('walletService', () => {
  beforeEach(() => {
    walletService.resetBalance();
  });

  test('getBalance should return the correct balance', () => {
    const balance = walletService.getBalance();
    expect(balance).toBe(100);
  });

  test('hasSufficientBalance should return true if balance is sufficient', () => {
    const result = walletService.hasSufficientBalance(50);
    expect(result).toBe(true);
  });

  test('hasSufficientBalance should return false if balance is insufficient', () => {
    const result = walletService.hasSufficientBalance(150);
    expect(result).toBe(false);
  });

  test('subtractBet should correctly subtract from balance if sufficient', () => {
    walletService.subtractBet(50);
    const balance = walletService.getBalance();
    expect(balance).toBe(50);
  });

  test('subtractBet should not subtract from balance if insufficient', () => {
    walletService.subtractBet(150);
    const balance = walletService.getBalance();
    expect(balance).toBe(100);
  });

  test('addWinnings should correctly add to balance', () => {
    walletService.addWinnings(50);
    const balance = walletService.getBalance();
    expect(balance).toBe(150);
  });

  test('resetBalance should reset the balance to the initial state', () => {
    walletService.subtractBet(50);
    walletService.resetBalance();
    const balance = walletService.getBalance();
    expect(balance).toBe(100);
  });
});
