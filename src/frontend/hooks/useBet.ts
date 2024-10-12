import { useState } from 'react';

export const useBet = (initialBet: number = 10) => {
  const [bet, setBet] = useState<number>(initialBet);

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseFloat(e.target.value);
    if (!isNaN(newBet) && newBet > 0) {
      setBet(newBet);
    }
  };

  return { bet, handleBetChange };
};
