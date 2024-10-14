import { useEffect, useCallback } from 'react';

export const useInitialSetup = (fetchRTP: () => Promise<void>) => {
  const handleInitialState = useCallback(async () => {
    await fetchRTP();
  }, [fetchRTP]);

  useEffect(() => {
    handleInitialState();
  }, [handleInitialState]);
};
