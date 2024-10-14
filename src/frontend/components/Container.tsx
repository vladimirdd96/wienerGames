import React from 'react';
import styled from 'styled-components';
import SectionComponent from './Section/Section';
import { useWallet } from '../hooks/useWallet';
import { initialFruitsState } from '../constants';
import { useBet } from '../hooks/useBet';
import { useRolling } from '../hooks/useRollingState';
import { useSlotMachine } from '../hooks/useSlotMachine';
import DepositSection from './DepositSection/DepositSection';
import SlotMachine from './SlotMachine/SlotMachine';
import StatisticSection from './StatisticSection/StatisticSection';
import { useRtp } from '../hooks/useRtp';

const ContainerComponent: React.FC = () => {
  const { rtp, error: rtpError, fetchRTP } = useRtp();
  const { betAmount, handleBetChange, rollCount, handleRollCountChange } = useBet(10);
  const {
    matrix,
    winnings,
    totalWinningsToday,
    error: slotMachineError,
    play,
    simulate,
  } = useSlotMachine(betAmount, rollCount);
  const { balance, fetchBalance, walletError, deposit } = useWallet();
  const symbolsMatrix = matrix && matrix.length ? matrix : initialFruitsState;

  const { singleRolling, handleRollClick, simulateRolling, handleSimulateClick } = useRolling(
    play,
    fetchBalance,
    fetchRTP,
    simulate,
    rollCount,
  );

  return (
    <Container>
      <SectionComponent>
        <DepositSection deposit={deposit} walletError={walletError} />
      </SectionComponent>

      <SectionComponent>
        <SlotMachine
          symbolsMatrix={symbolsMatrix}
          rolling={singleRolling || simulateRolling}
          winnings={winnings}
          totalWiningsToday={totalWinningsToday}
          slotMachineError={slotMachineError}
          rtpError={rtpError}
          walletError={walletError}
          balance={balance}
          betAmount={betAmount}
          rollCount={rollCount}
          handleBetChange={handleBetChange}
          handleRollClick={handleRollClick}
          handleRollCountChange={handleRollCountChange}
          handleSimulateClick={handleSimulateClick}
        />
      </SectionComponent>

      <SectionComponent>
        <StatisticSection rtp={rtp} rtpError={rtpError} />
      </SectionComponent>
    </Container>
  );
};

export default ContainerComponent;

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
