import React from 'react';
import styled from 'styled-components';
import WinningsComponent from './WinningsDisplay';
import DepositForm from './DepositForm/DepositForm';
import { useSlotMachine } from '../hooks/useSlotMachine';
import { useWallet } from '../hooks/useWallet';
import { useRtp } from '../hooks/useRtp';
import { initialFruitsState } from '../constants';
import { useBet } from '../hooks/useBet';
import { useInitialSetup } from '../hooks/useInitialSetup';
import { useRolling } from '../hooks/useRollingState';
import BalanceDisplay from './BalanceDisplay/BalanceDisplay';
import ButtonComponent from './Button/ButtonComponent';
import ErrorMessagesSection from './Error/ErrorSection';
import ReelGridComponent from './SlotMachine/ReelGrid';
import StatisticsSection from './SlotMachine/StatisticSection';
import InputComponent from './Input/InputComponent';

const SlotMachine: React.FC = () => {
  const { bet, handleBetChange } = useBet(10);
  const { matrix, winnings, totalWinningsToday, error: slotMachineError, play } = useSlotMachine(bet);
  const { balance, fetchBalance, deposit, walletError } = useWallet();
  const { rtp, fetchRTP, error: rtpError } = useRtp();
  const { rolling, handleClick } = useRolling(play, fetchBalance, fetchRTP);
  const symbolsMatrix = matrix ? matrix : initialFruitsState;

  useInitialSetup(fetchRTP);

  return (
    <Container>
      <DepositForm onDeposit={deposit} error={walletError} />

      <ReelGridComponent symbolsMatrix={symbolsMatrix} rolling={rolling} />
      <BalanceDisplay balance={balance} />
      <WinningsComponent text={`Winnings: ${winnings}`} />
      <WinningsComponent text={`Total Won Today: ${totalWinningsToday}`} />

      <ErrorMessagesSection
        slotMachineError={slotMachineError}
        rtpError={rtpError}
        walletError={walletError}
        balanceError={balance < bet ? 'Not enough money in your balance' : null}
      />

      <InputComponent value={bet} onChange={handleBetChange} placeholder={'Enter your bet'} />
      <ButtonComponent onClick={handleClick} disabled={balance < bet} text={`ROLL (Bet: $${bet})`} />

      <StatisticsSection rtp={rtp} />
    </Container>
  );
};

export default SlotMachine;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f1f1f1;
  min-height: 100vh;
  font-family: 'Arial', sans-serif;
`;
