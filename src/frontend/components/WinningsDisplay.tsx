import React from 'react';
import styled from 'styled-components';

interface WinningsDisplayProps {
  text: string;
}

const WinningsComponent: React.FC<WinningsDisplayProps> = ({ text }) => {
  return <WinningsContainer>{text}</WinningsContainer>;
};

export default WinningsComponent;

const WinningsContainer = styled.div`
  font-size: 1.2em;
  color: #28a745;
`;
