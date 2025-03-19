import React, { useEffect } from 'react';
import styled from 'styled-components';
import SectionComponent from './Section/Section';
import { initialFruitsState } from '../constants';
import DepositSection from './DepositSection/DepositSection';
import SlotMachine from './SlotMachine/SlotMachine';
import StatisticSection from './StatisticSection/StatisticSection';
import { useGameStore } from '../stores/gameStore';

const ContainerComponent: React.FC = () => {
  const {
    matrix,
    rolling,
    winnings,
    totalWinningsToday,
    betAmount,
    rollCount,
    balance,
    rtp,
    slotMachineError,
    rtpError,
    walletError,
    setBetAmount,
    setRollCount,
    setRolling,
    play,
    simulate,
    deposit,
    fetchBalance,
    fetchRTP,
  } = useGameStore();

  // Initial data fetch
  useEffect(() => {
    fetchBalance();
    fetchRTP();
  }, [fetchBalance, fetchRTP]);

  const symbolsMatrix = matrix && matrix.length ? matrix : initialFruitsState;

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setBetAmount(value);
  };

  const handleRollCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setRollCount(value);
  };

  const handleRollClick = async () => {
    setRolling(true);
    await play();
    await Promise.all([fetchBalance(), fetchRTP()]);
    setRolling(false);
  };

  const handleSimulateClick = async () => {
    setRolling(true);
    await simulate();
    await Promise.all([fetchBalance(), fetchRTP()]);
    setRolling(false);
  };

  return (
    <Container>
      <SectionComponent>
        <DepositSection deposit={deposit} walletError={walletError} />
      </SectionComponent>

      <SectionComponent>
        <SlotMachine
          symbolsMatrix={symbolsMatrix}
          rolling={rolling}
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export default ContainerComponent;
