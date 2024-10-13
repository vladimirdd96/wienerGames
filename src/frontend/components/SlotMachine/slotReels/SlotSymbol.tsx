import React from 'react';
import styled, { keyframes } from 'styled-components';

type SlotSymbolProps = {
  symbol: string;
};

const SlotSymbol: React.FC<SlotSymbolProps> = ({ symbol }) => {
  return <SymbolContainer>{symbol}</SymbolContainer>;
};

export default SlotSymbol;

const SymbolContainer = styled.div`
  font-size: 2em;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  color: white;
  border-radius: 10px;
`;
