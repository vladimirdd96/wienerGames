import React from 'react';
import styled from 'styled-components';

interface PlayButtonProps {
  onClick: () => void;
  disabled: boolean;
  bet: number;
}

const PlayButton: React.FC<PlayButtonProps> = ({ onClick, disabled, bet }) => {
  return <Button onClick={disabled ? undefined : onClick}>{`ROLL (Bet: ${bet})`}</Button>;
};

export default PlayButton;

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
