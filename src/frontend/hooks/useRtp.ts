import React, { useCallback, useState } from 'react';
import { clientBaseUrl, urls } from '../../utils/constants';
import { errorMessages } from '../../utils/constants';

interface RTPResponse {
  rtp: number;
}

export const useRtp = () => {
  const [rtp, setRTP] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchRTP = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(clientBaseUrl + urls.slot.rtp);
      if (!response.ok) {
        throw new Error(errorMessages.failedToFetchRtp);
      }

      const data: RTPResponse = await response.json();
      setRTP(data.rtp);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(errorMessages.default);
      }
    }
  }, []);

  return {
    rtp,
    error,
    fetchRTP,
  };
};
