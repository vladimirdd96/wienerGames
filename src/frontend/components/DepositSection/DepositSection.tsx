import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import ErrorMessage from '../Error/ErrorMessage';
import InputComponent from '../Input/InputComponent';
import TextComponent from '../Text/Text';

interface DepositSectionProps {
  amount: number;
  handleDepositInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDepositSubmit: () => void;
  walletError: string | null;
}

const DepositSection: React.FC<DepositSectionProps> = ({
  amount,
  handleDepositInputChange,
  handleDepositSubmit,
  walletError,
}) => {
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
