import React from 'react';
import ErrorMessagesSection from '../../Error/ErrorSection';
import TextComponent from '../../Text/Text';
import BalanceDisplay from './BalanceDisplay';

interface BalanceSectionProps {
  balance: number;
  winnings: number;
  totalWiningsToday: number;
  slotMachineError: string | null;
  rtpError: string | null;
  walletError: string | null;
  betAmount: number;
}

const BalanceSection: React.FC<BalanceSectionProps> = ({
  balance,
  winnings,
  totalWiningsToday,
  slotMachineError,
  rtpError,
  walletError,
  betAmount,
}) => {
  return (
    <>
      <BalanceDisplay balance={balance} />
      <TextComponent text={`Winnings: ${winnings}`} style={{ color: '#28a745' }} />
      <TextComponent text={`Total Won Today: ${totalWiningsToday}`} style={{ color: '#28a745' }} />
      <ErrorMessagesSection
        slotMachineError={slotMachineError}
        rtpError={rtpError}
        walletError={walletError}
        balanceError={balance < betAmount ? 'Not enough money in your balance' : null}
      />
    </>
  );
};

export default BalanceSection;
