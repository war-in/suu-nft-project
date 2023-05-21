import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import { setupContracts } from "./utils/web3-helpers";

interface EthActions {
  walletAddress?: string;
  connectWallet: () => Promise<void>;
  createRanks: (params: CreateRanksRequest) => Promise<void>;
  fetchRanksNames: () => Promise<string[]>;
  getWalletAddressAsync: () => Promise<string>;
}

interface CreateRanksRequest {
  name: string;
  numberOfRanks: number;
  ranksNames: string[];
  ranksSymbols: string[];
  ranksPrices: number[];
}

interface Props {
  children: JSX.Element;
}

const EthereumContext = createContext({} as EthActions);

export const EthereumContextProvider = ({ children }: Props): JSX.Element => {
  const ethereum = window.ethereum;
  //@ts-ignore
  const web3 = new Web3(ethereum);
  const contracts = setupContracts();

  const [walletAddress, setWalletAddress] = useState<string>();

  const connectWallet = async () => {
    try {
      const res = await web3.eth.requestAccounts();
      if (res && Array.isArray(res)) {
        setWalletAddress(res[0]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getWalletAddressAsync = async () => {
    const addresses = await web3.eth.getAccounts();
    return addresses[0];
  };

  const fetchRanksNames = async () => {
    try {
      const result = await contracts.ranksAdmin.methods
        .getAllRanksNames()
        .call({ from: walletAddress });
      console.log(result);
      return result;
    } catch (err) {
      console.warn(err);
    }
  };

  const createRanks = async (params: CreateRanksRequest) => {
    try {
      await contracts.ranksAdmin.methods
        .createRanks(
          params.name,
          params.numberOfRanks,
          params.ranksNames,
          params.ranksSymbols,
          params.ranksPrices
        )
        .call({ from: walletAddress });
    } catch (err) {
      console.warn(err);
    }
  };

  const actions: EthActions = {
    walletAddress,
    connectWallet,
    createRanks,
    fetchRanksNames,
    getWalletAddressAsync,
  };

  return (
    <EthereumContext.Provider value={actions}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);

export default EthereumContextProvider;
