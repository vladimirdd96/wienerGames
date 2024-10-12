import React from 'react';
import styled from 'styled-components';
import TextComponent from '../Text/Text';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return <TextComponent text={`Balance: $${balance}`} style={{ fontSize: '1.5rem', margin: '20px 0' }} />;
};

export default BalanceDisplay;
