import React from 'react';
import TextComponent from '../Text/Text';

export interface ErrorMessageProps {
  text: string;
}

const ErrorMessage = ({ text }: ErrorMessageProps) => {
  return <TextComponent text={text} style={{ color: 'red' }} />;
};

export default ErrorMessage;
