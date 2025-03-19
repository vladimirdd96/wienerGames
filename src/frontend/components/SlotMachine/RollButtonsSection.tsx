import React, { ChangeEvent } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import InputComponent from '../Input/InputComponent';
import TextComponent from '../Text/Text';
import SectionComponent from '../Section/Section';
import { useUIStore } from '../../stores/uiStore';

interface RollButtonsSectionProps {
  betAmount: number;
  handleBetChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRollClick: () => void;
  balance: number;
  rollCount: number;
  handleRollCountChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSimulateClick: () => void;
}

const RollButtonsSection: React.FC<RollButtonsSectionProps> = ({
  betAmount,
  handleBetChange,
  handleRollClick,
  balance,
  rollCount,
  handleRollCountChange,
  handleSimulateClick,
}) => {
  const windowWidth = useUIStore(state => state.windowWidth);
  const isSmallScreen = windowWidth < 768;

  return (
    <SectionComponent
      style={{ boxShadow: 'none', flexDirection: isSmallScreen ? 'column' : 'row', justifyContent: 'center' }}>
      <SectionComponent style={{ boxShadow: 'none', flexDirection: 'column', alignItems: 'center' }}>
        <TextComponent text='Bet Amount' />
        <InputComponent value={betAmount} onChange={handleBetChange} placeholder={'Enter your bet'} />
        <ButtonComponent onClick={handleRollClick} disabled={balance < betAmount} text={`ROLL (Bet: $${betAmount})`} />
      </SectionComponent>
      <SectionComponent style={{ boxShadow: 'none', flexDirection: 'column', alignItems: 'center' }}>
        <TextComponent text='Roll Count' />
        <InputComponent value={rollCount} onChange={handleRollCountChange} placeholder={'Enter your bet'} />
        <ButtonComponent
          onClick={handleSimulateClick}
          disabled={rollCount === 0 || balance < betAmount}
          text={`SIMULATE (Count: ${rollCount})`}
        />
      </SectionComponent>
    </SectionComponent>
  );
};

export default RollButtonsSection;
