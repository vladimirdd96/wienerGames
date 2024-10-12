import React, { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  style?: CSSProperties;
}
const ButtonComponent: React.FC<PlayButtonProps> = ({ onClick, disabled, text, style: style }) => {
  return (
    <Button onClick={disabled ? undefined : onClick} disabled={disabled} style={style}>
      {text}
    </Button>
  );
};

export default ButtonComponent;

const Button = styled.div<{ disabled: boolean }>`
  background-color: #0084ff;
  width: fit-content;
  text-align: center;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: #cccccc;
          color: #666666;
          cursor: default;
        `
      : css`
          background-color: #0084ff;
          &:hover {
            background-color: #0076e4; /* Change the background color on hover */
          }
        `}
`;
