import { useState, useEffect, useCallback } from 'react';

export const useRolling = (
  play: () => Promise<void>,
  fetchBalance: () => Promise<void>,
  fetchRTP: () => Promise<void>,
  simulate: () => Promise<void>,
  count: number,
) => {
  const [singleRolling, setSingleRolling] = useState<boolean>(false);
  const [simulateRolling, setSimulateRolling] = useState<boolean>(false);
  const singleRollRollingTime = 700;

  const handleRollClick = useCallback(async () => {
    setSingleRolling(true);
    setTimeout(() => {
      setSingleRolling(false);
    }, singleRollRollingTime);
  }, [singleRollRollingTime]);

  const handleSimulateClick = useCallback(async () => {
    setSimulateRolling(true);
    setTimeout(() => {
      setSimulateRolling(false);
    }, singleRollRollingTime * count);
  }, [singleRollRollingTime, count]);

  const handlePlay = useCallback(async () => {
    await play();
    await fetchBalance();
    await fetchRTP();
  }, [play, fetchBalance, fetchRTP]);

  const handleSimulate = useCallback(async () => {
    await simulate();
    await fetchBalance();
    await fetchRTP();
  }, [simulate, fetchBalance, fetchRTP]);

  useEffect(() => {
    if (singleRolling) {
      handlePlay();
    }
  }, [singleRolling]);

  useEffect(() => {
    if (simulateRolling) {
      handleSimulate();
    }
  }, [simulateRolling]);

  return { singleRolling, handleRollClick, simulateRolling, handleSimulateClick };
};
