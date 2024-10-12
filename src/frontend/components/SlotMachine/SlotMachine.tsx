import React from 'react';
import BalanceDisplay from '../BalanceDisplay/BalanceDisplay';
import ButtonComponent from '../Button/ButtonComponent';
import ErrorMessagesSection from '../Error/ErrorSection';
import InputComponent from '../Input/InputComponent';
import SectionComponent from '../Section/Section';
import TextComponent from '../Text/Text';
import ReelGridComponent from './ReelGrid';

interface SlotMachineProps {
  symbolsMatrix: string[][];
  rolling: boolean;
  winnings: number;
  totalWinningsToday: number;
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
  totalWinningsToday,
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
      <BalanceDisplay balance={balance} />
      <TextComponent text={`Winnings: ${winnings}`} style={{ color: '#28a745' }} />
      <TextComponent text={`Total Won Today: ${totalWinningsToday}`} style={{ color: '#28a745' }} />
      <ErrorMessagesSection
        slotMachineError={slotMachineError}
        rtpError={rtpError}
        walletError={walletError}
        balanceError={balance < betAmount ? 'Not enough money in your balance' : null}
      />
      <SectionComponent style={{ boxShadow: 'none', flexDirection: 'row', justifyContent: 'center' }}>
        <SectionComponent style={{ boxShadow: 'none', flexDirection: 'column', alignItems: 'center' }}>
          <TextComponent text='Bet Amount' />
          <InputComponent value={betAmount} onChange={handleBetChange} placeholder={'Enter your bet'} />
          <ButtonComponent
            onClick={handleRollClick}
            disabled={balance < betAmount}
            text={`ROLL (Bet: $${betAmount})`}
          />
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
    </>
  );
};

export default SlotMachine;
