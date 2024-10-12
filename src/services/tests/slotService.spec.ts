import { slotService } from '../slotService';
import { rngService } from '../rngService';

jest.mock('../rngService', () => ({
  rngService: {
    getRandomSymbolPositions: jest.fn(),
  },
}));

describe('slotService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    slotService.resetState();
  });

  test('spin should return a 3x3 matrix of symbols', () => {
    (rngService.getRandomSymbolPositions as jest.Mock).mockReturnValue([0, 1, 2]);

    const result = slotService.spin();
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(3);
  });

  test('calculateWinnings should calculate correct winnings', () => {
    const matrix = [
      ['🍒', '🍒', '🍒'],
      ['🍇', '🍋', '🍉'],
      ['🍇', '🍇', '🍇'],
    ];

    const bet = 10;
    const winnings = slotService.calculateWinnings(matrix, bet);
    expect(winnings).toBe(100);
  });

  test('trackBets should update totalBets correctly', () => {
    const initialState = slotService.getServiceState().totalBets;

    slotService.trackBets(10);
    slotService.trackBets(20);

    const updatedState = slotService.getServiceState().totalBets;
    expect(updatedState).toBe(initialState + 30);
  });

  test('calculateRTP should return 0 if no bets placed', () => {
    const rtp = slotService.calculateRTP();
    expect(rtp).toBe(0);
  });

  test('calculateRTP should return correct RTP after bets and winnings', () => {
    slotService.trackBets(100);
    slotService.calculateWinnings([['🍒', '🍒', '🍒']], 10);

    const rtp = slotService.calculateRTP();
    expect(rtp).toBeGreaterThan(0);
  });
});
