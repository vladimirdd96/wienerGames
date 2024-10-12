import { useState, useEffect } from 'react';
import { clientBaseUrl, urls } from '../../constants';
import { errorMessages } from '../../utils/constants';

interface WalletBalance {
  balance: number;
}

export const useWallet = () => {
  const [balance, setBalance] = useState<number>(100);
  const [walletError, setWalletError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch(clientBaseUrl + urls.wallet.balance);

      if (!response.ok) {
        throw new Error(errorMessages.failedToFetchBalance);
      }

      const data: WalletBalance = await response.json();
      setBalance(data.balance);
    } catch (err) {
      if (err instanceof Error) {
        setWalletError(err.message);
      } else {
        setWalletError(errorMessages.default);
      }
    }
  };

  const deposit = async (amount: number) => {
    try {
      setWalletError(null);

      const response = await fetch(clientBaseUrl + urls.wallet.deposit, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error(errorMessages.failedToDepositFunds);
      }

      await fetchBalance();
    } catch (err) {
      if (err instanceof Error) {
        setWalletError(err.message);
      } else {
        setWalletError(errorMessages.default);
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { balance, walletError, fetchBalance, deposit };
};
