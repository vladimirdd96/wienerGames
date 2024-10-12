import React from 'react';
import ErrorMessage from '../Error/ErrorMessage';
import TextComponent from '../Text/Text';

interface StatisticSectionProps {
  rtpError: string | null;
  rtp: number;
}

const StatisticSection: React.FC<StatisticSectionProps> = ({ rtpError, rtp }) => {
  return (
    <>
      <TextComponent
        text='Game Statistics'
        style={{ color: '#333', fontSize: '1.8rem', marginBottom: '10px', fontStyle: 'bold' }}
      />
      {rtpError && <ErrorMessage text={rtpError} />}
      <TextComponent
        style={{ fontSize: '1em', color: '#007bff', marginTop: '20px' }}
        text={`Return to Player (RTP): ${rtp.toFixed(3)}%`}
      />
    </>
  );
};

export default StatisticSection;
