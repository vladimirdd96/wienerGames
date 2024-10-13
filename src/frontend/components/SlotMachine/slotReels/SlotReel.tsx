import React from 'react';
import SlotRow from './SlotRow';
import SlotSymbol from './SlotSymbol';
import { styled } from 'styled-components';
import { useSlotSymbols } from '../../../hooks/useSlotSymbols';

type SlotReelProps = {
  symbols: string[][];
  rolling: boolean;
};

const SlotReel: React.FC<SlotReelProps> = ({ symbols, rolling }) => {
  const displayedSymbols = useSlotSymbols(symbols, rolling);

  return (
    <SlotReelsContainer>
      {displayedSymbols.map((row, rowIndex) => (
        <SlotRow key={rowIndex}>
          {row.map((symbol, symbolIndex) => (
            <SlotSymbol key={symbolIndex} symbol={symbol} />
          ))}
        </SlotRow>
      ))}
    </SlotReelsContainer>
  );
};

export default SlotReel;

const SlotReelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: #ffffff;
  width: 200px;
  height: 200px;
  justify-content: center;
  align-items: center;
  position: relative;
`;
