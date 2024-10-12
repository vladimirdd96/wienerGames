import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlotReel from './SlotReel';
import BalanceDisplay from './BalanceDisplay';
import WinningsDisplay from './WinningsDisplay';
import RTPDisplay from './RTPDisplay';
import TotalWonDisplay from './TotalWonDisplay';
import PlayButton from './PlayButton';
import DepositForm from './DepositForm';
import { useSlotMachine } from '../hooks/useSlotMachine';
import { useWallet } from '../hooks/useWallet';
import { useRtp } from '../hooks/useRtp';

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

const Section = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const ReelGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const BetInput = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 100px;
  text-align: center;
`;

const SlotMachine: React.FC = () => {
  const [bet, setBet] = useState<number>(10);
  const { matrix, winnings, totalWinningsToday, error: slotMachineError, play } = useSlotMachine(bet);
  const { balance, fetchBalance, deposit, walletError } = useWallet();
  const [rolling, setRolling] = useState<boolean>(false);
  const { rtp, fetchRTP, error: rtpError } = useRtp();

  const handleClick = async () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);
  };

  const handlePlay = async () => {
    await play();
    await fetchBalance();
    await fetchRTP();
  };

  useEffect(() => {
    console.log(...matrix);
  }, [matrix]);

  useEffect(() => {
    if (rolling) {
      handlePlay();
    }
  }, [rolling]);

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBet = parseFloat(e.target.value);
    if (!isNaN(newBet) && newBet > 0) {
      setBet(newBet);
    }
  };

  return (
    <Container>
      <Section>
        <Title>Deposit Funds</Title>
        <DepositForm onDeposit={deposit} error={walletError} />
      </Section>

      <Section>
        <Title>Slot Machine Game</Title>
        <ReelGrid>{matrix && <SlotReel fruits={matrix} rolling={rolling} />}</ReelGrid>
        <BalanceDisplay balance={balance} />
        <WinningsDisplay winnings={winnings} />
        <TotalWonDisplay totalWonToday={totalWinningsToday} />

        {slotMachineError && <div style={{ color: 'red' }}>{slotMachineError}</div>}
        {rtpError && <div style={{ color: 'red' }}>{rtpError}</div>}
        {walletError && <div style={{ color: 'red' }}>{walletError}</div>}

        <BetInput type='number' value={bet} onChange={handleBetChange} min='1' placeholder='Enter your bet' />
        <PlayButton onClick={handleClick} disabled={balance < bet} bet={bet} />
      </Section>

      <Section>
        <Title>Game Statistics</Title>
        <RTPDisplay rtp={rtp} />
      </Section>
    </Container>
  );
};

export default SlotMachine;
