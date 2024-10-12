import { rngService } from '../rngService';

describe('RNG Service', () => {
  it('should generate random integers within the specified range', () => {
    const randomInt = rngService.getRandomInt(1, 10);
    expect(randomInt).toBeGreaterThanOrEqual(1);
    expect(randomInt).toBeLessThanOrEqual(10);
  });

  it('should generate an array of random symbol indices', () => {
    const indices = rngService.getRandomSymbolPositions(5);
    expect(indices.length).toBe(3);
    indices.forEach(index => {
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(5);
    });
  });
});
