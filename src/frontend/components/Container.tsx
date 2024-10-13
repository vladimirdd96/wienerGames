import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import SectionComponent from './Section/Section';
import { useWallet } from '../hooks/useWallet';
import { initialFruitsState } from '../constants';
import { useBet } from '../hooks/useBet';
import { useRolling } from '../hooks/useRollingState';
import { useSlotMachine } from '../hooks/useSlotMachine';
import { clientBaseUrl, urls } from '../../constants';
import DepositSection from './DepositSection/DepositSection';
import SlotMachine from './SlotMachine/SlotMachine';
import StatisticSection from './StatisticSection/StatisticSection';
import { errorMessages } from '../../utils/constants';

interface RTPResponse {
  rtp: number;
}

const ContainerComponent: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [rtp, setRTP] = useState<number>(0);
  const [rtpError, setRtpError] = useState<string | null>(null);

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

  const fetchRTP = useCallback(async () => {
    setRtpError(null);
    try {
      const response = await fetch(clientBaseUrl + urls.slot.rtp);
      if (!response.ok) {
        throw new Error(errorMessages.failedToFetchRtp);
      }

      const data: RTPResponse = await response.json();
      setRTP(data.rtp);
    } catch (error) {
      if (error instanceof Error) {
        setRtpError(error.message);
      } else {
        setRtpError(errorMessages.default);
      }
    }
  }, []);

  const { singleRolling, handleRollClick, simulateRolling, handleSimulateClick } = useRolling(
    play,
    fetchBalance,
    fetchRTP,
    simulate,
    rollCount,
  );

  const handleDepositInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleDepositSubmit = () => {
    if (amount > 0) {
      deposit(amount);
      setAmount(0);
    }
  };

  return (
    <Container>
      <SectionComponent>
        <DepositSection
          amount={amount}
          handleDepositInputChange={handleDepositInputChange}
          handleDepositSubmit={handleDepositSubmit}
          walletError={walletError}
        />
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
