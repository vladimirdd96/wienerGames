import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import ReelGridComponent from './ReelGrid';
import BalanceSection from './BalanceSection/BalanceSection';
import RollButtonsSection from './RollButtonsSection';

interface SlotMachineProps {
  symbolsMatrix: string[][];
  rolling: boolean;
  winnings: number;
  totalWiningsToday: number;
  slotMachineError: string | null;
  rtpError: string | null;
  walletError: string | null;
  balance: number;
  betAmount: number;
  rollCount: number;
  handleBetChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRollClick: () => void;
  handleRollCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSimulateClick: () => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  symbolsMatrix,
  rolling,
  winnings,
  totalWiningsToday,
  slotMachineError,
  rtpError,
  walletError,
  balance,
  betAmount,
  rollCount,
  handleBetChange,
  handleRollClick,
  handleRollCountChange,
  handleSimulateClick,
}) => {
  return (
    <SlotMachineContainer>
      <GameSection>
        <ReelGridComponent 
          symbolsMatrix={symbolsMatrix} 
          rolling={rolling} 
        />
        {winnings > 0 && (
          <WinningsDisplay>
            +{winnings}
          </WinningsDisplay>
        )}
      </GameSection>
      <ControlsSection>
        <BalanceSection
          balance={balance}
          winnings={winnings}
          totalWiningsToday={totalWiningsToday}
          slotMachineError={slotMachineError}
          rtpError={rtpError}
          walletError={walletError}
          betAmount={betAmount}
        />
        <RollButtonsSection
          betAmount={betAmount}
          handleBetChange={handleBetChange}
          handleRollClick={handleRollClick}
          balance={balance}
          rollCount={rollCount}
          handleRollCountChange={handleRollCountChange}
          handleSimulateClick={handleSimulateClick}
        />
      </ControlsSection>
    </SlotMachineContainer>
  );
};

export default SlotMachine;

const SlotMachineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

const GameSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ControlsSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const WinningsDisplay = styled.div`
  position: absolute;
  top: -40px;
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border-radius: 20px;
  font-weight: bold;
  font-size: 1.2rem;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
