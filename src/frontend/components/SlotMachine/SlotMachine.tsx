import React from 'react';
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
    <>
      <ReelGridComponent symbolsMatrix={symbolsMatrix} rolling={rolling} />
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
    </>
  );
};

export default SlotMachine;
