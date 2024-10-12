import React from 'react';
import styled from 'styled-components';

interface WinningsDisplayProps {
  winnings: number;
}

const WinningsDisplay: React.FC<WinningsDisplayProps> = ({ winnings }) => {
  return <WinningsContainer>Winnings: ${winnings}</WinningsContainer>;
};

export default WinningsDisplay;

const WinningsContainer = styled.div`
  font-size: 1.2em;
  color: #28a745;
`;
