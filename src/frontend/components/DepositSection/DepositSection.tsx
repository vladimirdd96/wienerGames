import React, { useState } from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import ErrorMessage from '../Error/ErrorMessage';
import InputComponent from '../Input/InputComponent';
import TextComponent from '../Text/Text';

interface DepositSectionProps {
  walletError: string | null;
  deposit: (amount: number) => Promise<void>;
}

const DepositSection: React.FC<DepositSectionProps> = ({ walletError, deposit }) => {
  const [amount, setAmount] = useState<number>(0);

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
    <>
      <TextComponent text={'Deposit Funds'} style={{ fontStyle: 'bold', fontSize: '1.5rem' }} />
      <InputComponent value={amount} onChange={handleDepositInputChange} placeholder='Enter amount' />
      <ButtonComponent onClick={handleDepositSubmit} text={'Deposit'} disabled={false} style={{ width: '5rem' }} />
      {walletError && <ErrorMessage text={walletError} />}
    </>
  );
};

export default DepositSection;
