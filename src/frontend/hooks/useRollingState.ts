import { useState, useEffect } from 'react';

export const useRolling = (
  play: () => Promise<void>,
  fetchBalance: () => Promise<void>,
  fetchRTP: () => Promise<void>,
) => {
  const [rolling, setRolling] = useState<boolean>(false);

  const handleClick = async () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);
  };

  const handlePlay = async () => {
    await play();
    await fetchBalance();
    await fetchRTP();
  };

  useEffect(() => {
    if (rolling) {
      handlePlay();
    }
  }, [rolling]);

  return { rolling, handleClick };
};
