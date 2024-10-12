import { useEffect } from 'react';

export const useInitialSetup = (fetchRTP: () => Promise<void>) => {
  useEffect(() => {
    const handleInitialState = async () => {
      await fetchRTP();
    };
    handleInitialState();
  }, []);
};
