import { useState, useCallback } from 'react';
import { clientBaseUrl, urls } from '../../utils/constants';
import { PlayResponse, SimulateResponse } from '../../models/types';
import { errorMessages } from '../../utils/constants';

export interface useSlotReturn {
  matrix: string[][];
  winnings: number;
  totalWinningsToday: number;
  error: string | null;
  play: () => Promise<void>;
  rtp: number;
}

export const useSlotMachine = (bet: number, count: number) => {
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
        throw new Error(errorData.error.message);
      }

      const data: PlayResponse = await response.json();
      setMatrix(data.matrix);
      setWinnings(data.winnings);
      setTotalWinningsToday(prev => prev + data.winnings);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errorMessages.default);
      }
    }
  }, [bet]);

  const simulate = useCallback(async () => {
    if (count === 0) {
      return;
    }

    try {
      setError(null);

      const response = await fetch(clientBaseUrl + urls.slot.simulate, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bet, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData);
        throw new Error(errorData.error.message);
      }

      const data: SimulateResponse = await response.json();
      setMatrix(data.matrix);
      setWinnings(data.totalWinnings);
      setTotalWinningsToday(prev => prev + data.totalWinnings);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(errorMessages.default);
      }
    }
  }, [count, bet]);

  return { matrix, winnings, totalWinningsToday, error, play, simulate };
};
