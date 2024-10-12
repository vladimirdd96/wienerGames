import React from 'react';
import styled from 'styled-components';

export interface SectionComponentProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const SectionComponent: React.FC<SectionComponentProps> = ({ children, style }) => {
  return <Section style={style}>{children}</Section>;
};

export default SectionComponent;

const Section = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;
