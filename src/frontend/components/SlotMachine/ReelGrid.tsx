import React from 'react';
import styled from 'styled-components';
import SlotReel from './slotReels/SlotReel';

interface ReelGridProps {
  symbolsMatrix: string[][];
  rolling: boolean;
}

const ReelGridComponent: React.FC<ReelGridProps> = ({ symbolsMatrix, rolling }) => (
  <StyledReelGrid>{symbolsMatrix && <SlotReel symbols={symbolsMatrix} rolling={rolling} />}</StyledReelGrid>
);

export default ReelGridComponent;

const StyledReelGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
