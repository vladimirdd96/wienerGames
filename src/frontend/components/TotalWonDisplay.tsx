import React from 'react';
import styled from 'styled-components';

interface TotalWonDisplayProps {
  totalWonToday: number;
}

const TotalWonDisplay: React.FC<TotalWonDisplayProps> = ({ totalWonToday }) => {
  return <TotalWonContainer>Total Won Today: ${totalWonToday}</TotalWonContainer>;
};

export default TotalWonDisplay;

const TotalWonContainer = styled.div`
  font-size: 1.2em;
  color: #28a745;
  margin: 10px 0;
`;
