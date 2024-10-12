import { useState, useEffect } from 'react';

export const useSlotSymbols = (symbols: string[][], rolling: boolean) => {
  const [displayedSymbols, setDisplayedSymbols] = useState<string[][]>(symbols);

  const getRandomSymbol = (symbols: string[][]) => {
    const flatSymbols = symbols.flat();
    const randomIndex = Math.floor(Math.random() * flatSymbols.length);
    return flatSymbols[randomIndex];
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (rolling) {
      interval = setInterval(() => {
        setDisplayedSymbols(prev => prev.map(row => row.map(() => getRandomSymbol(symbols))));
      }, 100);
    } else {
      setDisplayedSymbols(symbols);
    }

    return () => clearInterval(interval);
  }, [rolling, symbols]);

  return displayedSymbols;
};
