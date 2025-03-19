import React, { useEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useGameStore } from '../../../stores/gameStore';

type SlotReelProps = {
  symbols: string[][];
  rolling: boolean;
  onSpinComplete?: () => void;
  winningRow?: number | null;
};

const SPIN_DURATION = 2000; // 2 seconds total animation
const REEL_DELAY_INCREMENT = 200; // 200ms delay between each reel
const SYMBOLS_PER_REEL = 15; // Number of symbols to show in animation
const STOP_ANIMATION_DURATION = 500; // Duration of stop bounce animation

const SlotReel: React.FC<SlotReelProps> = ({ symbols, rolling, onSpinComplete, winningRow }) => {
  const { reelStates, setReelStates, displayedSymbols, setDisplayedSymbols } = useGameStore();

  // Create extended symbol arrays for continuous animation
  const extendedSymbols = useMemo(() => {
    return displayedSymbols.map(row => {
      const extended = [];
      for (let i = 0; i < SYMBOLS_PER_REEL; i++) {
        extended.push(...row);
      }
      return extended;
    });
  }, [displayedSymbols]);

  // Handle symbol updates during rolling
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (rolling) {
      interval = setInterval(() => {
        const flatSymbols = symbols.flat();
        const newSymbols = symbols.map(() => 
          Array(3).fill(0).map(() => 
            flatSymbols[Math.floor(Math.random() * flatSymbols.length)]
          )
        );
        setDisplayedSymbols(newSymbols);
      }, 100);
    } else {
      setDisplayedSymbols(symbols);
    }

    return () => clearInterval(interval);
  }, [rolling, symbols, setDisplayedSymbols]);

  // Handle reel states during rolling
  useEffect(() => {
    if (rolling) {
      setReelStates([true, true, true]);
      
      const stopReels = () => {
        const delays = [
          SPIN_DURATION - (REEL_DELAY_INCREMENT * 2),
          SPIN_DURATION - REEL_DELAY_INCREMENT,
          SPIN_DURATION
        ];

        delays.forEach((delay, index) => {
          setTimeout(() => {
            setReelStates([
              index === 0 ? false : reelStates[0],
              index === 1 ? false : reelStates[1],
              index === 2 ? false : reelStates[2],
            ]);

            // Call onSpinComplete when the last reel stops
            if (index === 2 && onSpinComplete) {
              onSpinComplete();
            }
          }, delay);
        });
      };

      stopReels();
    }
  }, [rolling, onSpinComplete, setReelStates, reelStates]);

  return (
    <SlotReelsContainer>
      {extendedSymbols.map((reel, reelIndex) => (
        <ReelColumn 
          key={reelIndex} 
          $isSpinning={reelStates[reelIndex]}
          $isWinning={winningRow !== undefined && winningRow === reelIndex}
        >
          <ReelStrip 
            $isSpinning={reelStates[reelIndex]} 
            $delay={reelIndex * REEL_DELAY_INCREMENT}
          >
            {reel.map((symbol, symbolIndex) => (
              <SymbolContainer key={symbolIndex}>
                <Symbol>{symbol}</Symbol>
              </SymbolContainer>
            ))}
          </ReelStrip>
        </ReelColumn>
      ))}
    </SlotReelsContainer>
  );
};

export default SlotReel;

const continuousSpin = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-33.33%); }
`;

const stopBounce = keyframes`
  0% { transform: translateY(5px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const SlotReelsContainer = styled.div`
  display: flex;
  gap: 10px;
  background: #ffffff;
  padding: 15px;
  border-radius: 10px;
  width: 300px;
  height: 240px;
`;

const ReelColumn = styled.div<{ $isSpinning: boolean; $isWinning?: boolean }>`
  position: relative;
  flex: 1;
  overflow: hidden;
  border-radius: 5px;
  background: #f5f5f5;
  ${({ $isWinning }) => $isWinning && css`
    background: rgba(76, 175, 80, 0.1);
    border: 2px solid #4CAF50;
  `}

  &::before, &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    top: 0;
    background: linear-gradient(to bottom, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
  }

  &::after {
    bottom: 0;
    background: linear-gradient(to top, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
  }
`;

const ReelStrip = styled.div<{ 
  $isSpinning: boolean; 
  $delay: number;
}>`
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease-out;

  ${({ $isSpinning, $delay }) => $isSpinning && css`
    animation: ${continuousSpin} 1s linear infinite;
    animation-delay: ${$delay}ms;
  `}

  ${({ $isSpinning }) => !$isSpinning && css`
    animation: ${stopBounce} ${STOP_ANIMATION_DURATION}ms ease-out;
  `}
`;

const SymbolContainer = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  border-radius: 5px;
`;

const Symbol = styled.div`
  font-size: 2.5rem;
  color: #333;
  font-weight: bold;
`;
