import { useState, useCallback } from 'react';
import { clientBaseUrl, urls } from '../../constants';

interface SlotMatrix {
  matrix: string[][];
  winnings: number;
  rtp: number;
}

export interface useSlotReturn {
  matrix: string[][];
  winnings: number;
  totalWinningsToday: number;
  error: string | null;
  play: () => Promise<void>;
  rtp: number;
}

export const useSlotMachine = (bet: number) => {
  const [matrix, setMatrix] = useState<string[][]>([]);
  const [winnings, setWinnings] = useState<number>(0);
  const [totalWinningsToday, setTotalWinningsToday] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const play = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch(clientBaseUrl + urls.slot.play, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        console.log({ errorData });
        throw new Error(errorData.error.message);
      }

      const data: SlotMatrix = await response.json();
      setMatrix(data.matrix);
      setWinnings(data.winnings);
      setTotalWinningsToday(prev => prev + data.winnings); // Track total winnings for today
    } catch (err) {
      if (err instanceof Error) {
        console.log({ err });
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, [bet]);

  return { matrix, winnings, totalWinningsToday, error, play };
};
