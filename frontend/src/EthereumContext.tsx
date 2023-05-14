import { createContext, useContext, useState } from "react";
import Web3 from "web3";

interface EthActions {
    walletAddress?: string;
    connectWallet: () => Promise<void>;
    getWalletAddressAsync: () => Promise<string>;
}

interface Props {
    children: JSX.Element;
}

const EthereumContext = createContext({} as EthActions);

export const EthereumContextProvider = ({children}: Props): JSX.Element => {
    const ethereum = window.ethereum;
    //@ts-ignore
    const web3 = new Web3(ethereum);

    const [walletAddress, setWalletAddress] = useState<string>();

    const connectWallet = async () => {
        try {
            const res = await ethereum.request({ method: "eth_requestAccounts"});
            if(res && Array.isArray(res)) {
                setWalletAddress(res[0]);
            }
        } catch(err) {
            console.warn(err);
        }
    }

    const getWalletAddressAsync = async () => {
        const addresses = await web3.eth.getAccounts();
        return addresses[0];
    }

    const actions: EthActions = {
        walletAddress,
        connectWallet,
        getWalletAddressAsync
    }

    return (
        <EthereumContext.Provider value={actions}>
            {children}
        </EthereumContext.Provider>
    )
}

export const useEthereum = () => useContext(EthereumContext);

export default EthereumContextProvider;
