import React from 'react';
import styled from 'styled-components';
import RTPDisplay from './RTPDisplay';
import SectionComponent from '../Section/Section';

interface StatisticsSectionProps {
  rtp: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ rtp }) => (
  <SectionComponent>
    <Title>Game Statistics</Title>
    <RTPDisplay rtp={rtp} />
  </SectionComponent>
);

export default StatisticsSection;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;
