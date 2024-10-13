import React from 'react';
import ErrorMessage from './ErrorMessage';

interface ErrorMessagesSectionProps {
  slotMachineError?: string | null;
  rtpError?: string | null;
  walletError?: string | null;
  balanceError?: string | null;
}

const ErrorMessagesSection: React.FC<ErrorMessagesSectionProps> = ({
  slotMachineError,
  rtpError,
  walletError,
  balanceError,
}) => (
  <>
    {slotMachineError && <ErrorMessage text={slotMachineError} />}
    {rtpError && <ErrorMessage text={rtpError} />}
    {walletError && <ErrorMessage text={walletError} />}
    {balanceError && <ErrorMessage text={balanceError} />}
  </>
);

export default ErrorMessagesSection;
