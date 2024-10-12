import { Random, MersenneTwister19937 } from 'random-js';

const random = new Random(MersenneTwister19937.autoSeed());

const getRandomInt = (min: number, max: number): number => {
  return random.integer(min, max);
};

const getRandomSymbolPositions = (symbolCount: number): number[] => {
  const res = Array.from({ length: 3 }, () => getRandomInt(0, symbolCount - 1));
  return res;
};

export const rngService = {
  getRandomInt,
  getRandomSymbolPositions,
};
