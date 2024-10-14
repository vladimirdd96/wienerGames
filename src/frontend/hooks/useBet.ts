import { useCallback, useState } from 'react';

export const useBet = (initialBet: number = 10) => {
  const [betAmount, setBet] = useState<number>(initialBet);
  const [rollCount, setRollCount] = useState(0);

  const handleBetChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseFloat(e.target.value);
    if (!isNaN(newBet) && newBet > 0) {
      setBet(newBet);
    }
  }, []);

  const handleRollCountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newRollCount = parseFloat(e.target.value);
    if (!isNaN(newRollCount) && newRollCount > 0) {
      setRollCount(newRollCount);
    }
  }, []);

  return { betAmount, handleBetChange, rollCount, handleRollCountChange };
};
