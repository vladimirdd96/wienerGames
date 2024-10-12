import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  style?: CSSProperties;
}
const ButtonComponent: React.FC<PlayButtonProps> = ({ onClick, disabled, text, style: style }) => {
  return (
    <Button onClick={disabled ? undefined : onClick} style={style}>
      {text}
    </Button>
  );
};

export default ButtonComponent;

const Button = styled.div`
  background-color: #ff0000;
  width: 25%;
  text-align: center;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;
`;
