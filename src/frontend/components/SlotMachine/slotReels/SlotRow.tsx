import React from 'react';
import styled from 'styled-components';

const SlotRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Row>{children}</Row>;
};

export default SlotRow;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;
