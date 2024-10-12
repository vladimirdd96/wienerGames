import React, { useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from '../Button/ButtonComponent';
import ErrorMessage from '../Error/ErrorMessage';
import InputComponent from '../Input/InputComponent';
import SectionComponent from '../Section/Section';

interface DepositFormProps {
  onDeposit: (amount: number) => void;
  error: string | null;
}

const DepositForm: React.FC<DepositFormProps> = ({ onDeposit, error }) => {
  const [amount, setAmount] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
    if (amount > 0) {
      onDeposit(amount);
      setAmount(0);
    }
  };

  return (
    <SectionComponent>
      <h3>Deposit Funds</h3>
      <InputComponent value={amount} onChange={handleInputChange} placeholder='Enter amount' />
      <ButtonComponent onClick={handleSubmit} text={'Deposit'} disabled={false} style={{ width: '40%' }} />
      {error && <ErrorMessage text={error} />}
    </SectionComponent>
  );
};

export default DepositForm;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  margin: 20px 0;
`;

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 100px;
  text-align: center;
`;
