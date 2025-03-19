import React from 'react';
import styled from 'styled-components';
import SlotReel from './slotReels/SlotReel';

interface ReelGridProps {
  symbolsMatrix: string[][];
  rolling: boolean;
  onSpinComplete?: () => void;
  winningRow?: number | null;
}

const ReelGridComponent: React.FC<ReelGridProps> = ({ symbolsMatrix, rolling, onSpinComplete, winningRow }) => (
  <StyledReelGrid>
    {symbolsMatrix && <SlotReel symbols={symbolsMatrix} rolling={rolling} onSpinComplete={onSpinComplete} winningRow={winningRow} />}
  </StyledReelGrid>
);

export default ReelGridComponent;

const StyledReelGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
