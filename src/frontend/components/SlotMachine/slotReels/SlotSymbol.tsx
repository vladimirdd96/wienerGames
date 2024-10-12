import React from 'react';
import styled, { keyframes, css } from 'styled-components';

type SlotSymbolProps = {
  symbol: string;
  rolling: boolean;
};

const SlotSymbol: React.FC<SlotSymbolProps> = ({ symbol, rolling }) => {
  return <SymbolContainer rolling={rolling}>{symbol}</SymbolContainer>;
};

export default SlotSymbol;

const spinAnimation = keyframes`
  0% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
`;

const SymbolContainer = styled.div<{ rolling: boolean }>`
  font-size: 2em;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
  color: white;
  border-radius: 10px;

  ${({ rolling }) =>
    rolling
      ? css`
          animation: ${spinAnimation} 1s linear infinite;
        `
      : css`
          animation: none;
        `}
`;
