import React, { useState } from 'react';
import styled from 'styled-components';

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
    <DepositContainer>
      <h3>Deposit Funds</h3>
      <Input type='number' value={amount} onChange={handleInputChange} placeholder='Enter amount' />
      <Button onClick={handleSubmit}>Deposit</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </DepositContainer>
  );
};

export default DepositForm;

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column;
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

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin: 10px 0;
`;
