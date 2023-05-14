import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import Contract from "web3-eth-contract";
import AdminABI from './abi/admin';
import RankABI from './abi/rank';
import RanksABI from './abi/ranks';
import TicketABI from './abi/ticket';
import { formatABI } from "./utils/abi-formatter";

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
    Contract.setProvider("http://localhost:7545");

    const adminContract = new Contract(formatABI(AdminABI));
    const rankContract = new Contract(formatABI(RankABI));
    const ranksContract = new Contract(formatABI(RanksABI));
    const ticketContract = new Contract(formatABI(TicketABI));

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
