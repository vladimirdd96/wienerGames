import React from 'react';
import styled from 'styled-components';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return <BalanceContainer>Balance: ${balance}</BalanceContainer>;
};

export default BalanceDisplay;

const BalanceContainer = styled.div`
  font-size: 1.5em;
  margin: 20px 0;
`;
