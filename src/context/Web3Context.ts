
import React from 'react';

interface Web3ContextType {
  isConnected: boolean;
  account: string;
  connectWallet: () => Promise<void>;
  mockBalance: string;
  simLoading: boolean;
}

export const Web3Context = React.createContext<Web3ContextType>({
  isConnected: false,
  account: '',
  connectWallet: async () => {},
  mockBalance: '0.0',
  simLoading: false,
});
