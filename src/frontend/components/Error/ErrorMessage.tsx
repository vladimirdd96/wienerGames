import React from 'react';

export interface ErrorMessageProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <div style={{ color: 'red' }}>{text}</div>;
};

export default ErrorMessage;
