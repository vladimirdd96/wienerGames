import { useState, useEffect, useCallback } from 'react';

interface RTPResponse {
  rtp: number;
}

export const useRtp = () => {
  const [rtp, setRTP] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchRTP = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/rtp');

      if (!response.ok) {
        throw new Error('Failed to fetch RTP');
      }

      const data: RTPResponse = await response.json();
      setRTP(data.rtp);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  return {
    rtp,
    fetchRTP,
    error,
  };
};
