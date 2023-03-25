import { createContext, useContext } from "react";
import Web3 from "web3";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
      ethereum: MetaMaskInpageProvider;
    }
  }

interface EthActions {
    connectWallet: () => Promise<void>;
    getWalletAddress: () => Promise<string>;
}

interface Props {
    children: JSX.Element;
}

const ethereum = window.ethereum;
//@ts-ignore
const web3 = new Web3(ethereum);

const EthereumContext = createContext({} as EthActions);

export const EthereumContextProvider = ({children}: Props): JSX.Element => {
    const connectWallet = async () => {
        try {
            await ethereum.request({ method: "eth_requestAccounts"});
        } catch(err) {
            console.warn(err);
        }
    }

    const getWalletAddress = async () => {
        const addresses = await web3.eth.getAccounts();
        return addresses[0];
    }

    const actions: EthActions = {
        connectWallet,
        getWalletAddress
    }

    return (
        <EthereumContext.Provider value={actions}>
            {children}
        </EthereumContext.Provider>
    )
}

export const useEthereum = () => useContext(EthereumContext);

export default EthereumContextProvider;
