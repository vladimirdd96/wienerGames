import { useState, useEffect } from 'react';

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

  const handleRollClick = async () => {
    setSingleRolling(true);
    setTimeout(() => {
      setSingleRolling(false);
    }, singleRollRollingTime);
  };

  const handleSimulateClick = async () => {
    setSimulateRolling(true);
    setTimeout(() => {
      setSimulateRolling(false);
    }, singleRollRollingTime * count);
  };

  const handlePlay = async () => {
    await play();
    await fetchBalance();
    await fetchRTP();
  };

  const handleSimulate = async () => {
    await simulate();
    await fetchBalance();
    await fetchRTP();
  };

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
