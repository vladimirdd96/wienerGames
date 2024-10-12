import { useState, useEffect } from 'react';

interface WalletBalance {
  balance: number;
}

export const useWallet = () => {
  const [balance, setBalance] = useState<number>(0);
  const [walletError, setWalletError] = useState<string | null>(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch('http://localhost:3000/wallet/balance');
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data: WalletBalance = await response.json();
      setBalance(data.balance);
    } catch (err) {
      if (err instanceof Error) {
        setWalletError(err.message);
      } else {
        setWalletError('An unknown error occurred');
      }
    }
  };

  const deposit = async (amount: number) => {
    try {
      setWalletError(null);

      const response = await fetch('http://localhost:3000/wallet/deposit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to deposit funds');
      }

      await fetchBalance();
    } catch (err) {
      if (err instanceof Error) {
        setWalletError(err.message);
      } else {
        setWalletError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { balance, walletError, fetchBalance, deposit };
};
