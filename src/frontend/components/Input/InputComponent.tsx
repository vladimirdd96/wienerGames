import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 1.2em;
  border: 2px solid #ddd;
  border-radius: 5px;
  width: 100px;
  text-align: center;
`;
interface InputProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputComponent: React.FC<InputProps> = ({ value, onChange, placeholder }) => (
  <Input type='number' value={value} onChange={onChange} min='1' placeholder={placeholder} />
);

export default InputComponent;
