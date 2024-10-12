import React from 'react';
import styled from 'styled-components';

interface WinningsDisplayProps {
  text: string;
  style?: React.CSSProperties;
}

const TextComponent: React.FC<WinningsDisplayProps> = ({ text, style }) => {
  return <Text style={style}>{text}</Text>;
};

export default TextComponent;

const Text = styled.div`
  font-size: 1.2em;
`;
