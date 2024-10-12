import React from 'react';
import styled from 'styled-components';

export interface RTPDisplayProps {
  rtp: number;
}

const RTPDisplay: React.FC<RTPDisplayProps> = ({ rtp }) => {
  return <RTPContainer>Return to Player (RTP): {rtp.toFixed(3)}%</RTPContainer>;
};

export default RTPDisplay;

const RTPContainer = styled.div`
  font-size: 1em;
  color: #007bff;
  margin-top: 20px;
`;
