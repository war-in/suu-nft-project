import { createContext, useContext, useState } from "react";
import Web3 from "web3";
import {
  DynamicContracts,
  createContract,
  setupContracts,
} from "./utils/web3-helpers";
import { Event } from "../src/screens/AdminEventsPanel";

interface EthActions {
  walletAddress?: string;
  connectWallet: () => Promise<void>;
  createRanks: (params: CreateRanksRequest) => Promise<void>;
  createEvent: (params: CreateEventRequest) => Promise<void>;
  fetchEvents: () => Promise<Event[]>;
  fetchRanksNames: () => Promise<string[]>;
  getCurrentRank: (contractAddress: string) => Promise<number>;
  getRanksContractAddress: (name: string) => Promise<string>;
  getWalletAddressAsync: () => Promise<string>;
  getRanksNumber: (contractAddress: string) => Promise<number>;
  buyRank: (
    contractAddress: string,
    price: string,
    currentRankAddress: string,
    prevRankAddress?: string
  ) => Promise<RankTxResult | undefined>;
  buyTickets: (eventName: string, unitPrice: number, amount: number) => Promise<string | undefined>;
  getRanksInfoAsync: (contractAddress: string) => Promise<RanksData>;
}

interface RankTxResult {
  transactionHash: string;
  tokenId: string;
}
interface RanksData {
  prices: string[];
  names: string[];
  addresses: string[];
}
interface CreateRanksRequest {
  name: string;
  numberOfRanks: number;
  ranksNames: string[];
  ranksSymbols: string[];
  ranksPrices: number[];
}

export interface CreateEventRequest {
  ticketName: string;
  ticketSymbol: string;
  ranksAddress: string;
  saleStartTimePerRank: number[];
  maxTicketsPerUserPerRank: number[];
  ticketPricePerRank: number[];
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
      return result;
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchEvents = async () => {
    try {
      const events: string[] = await contracts.ticketsAdmin.methods
        .getAllTicketsNames()
        .call({ from: walletAddress });

      const formattedEvents = await Promise.all(
        events.map(async (eventName) => {
          const ticketContractAddress = await contracts.ticketsAdmin.methods
            .ticketsByName(eventName)
            .call({ from: walletAddress });
          const eventContract = createContract(
            DynamicContracts.EVENT,
            ticketContractAddress
          );
          const name = await eventContract.methods
            .name()
            .call({ from: walletAddress });
          const symbol = await eventContract.methods
            .symbol()
            .call({ from: walletAddress });
          const ranksAddress = await eventContract.methods
            .ranksAddress()
            .call({ from: walletAddress });
          const saleStartTimePerRank = await eventContract.methods
            .getSaleStartTimePerRank()
            .call({ from: walletAddress });
          const maxTicketsPerUserPerRank = await eventContract.methods
            .getMaxTicketsPerUserPerRank()
            .call({ from: walletAddress });
          const ticketPricePerRank = await eventContract.methods
            .getTicketPricePerRank()
            .call({ from: walletAddress });

          return {
            name,
            symbol,
            ranksAddress,
            saleStartTimePerRank: saleStartTimePerRank.map((item: string) => +item * 1000),
            maxTicketsPerUserPerRank,
            ticketPricePerRank,
          } as unknown as Event;
        })
      );
      return formattedEvents;
    } catch (err) {
      console.warn(err);
      return [];
    }
  };

  const getCurrentRank = async (contractAddress: string) => {
    const ranksContract = createContract(
      DynamicContracts.RANKS,
      contractAddress
    );
    const rankNumber = await ranksContract.methods
      .getCurrentRank(walletAddress)
      .call({ from: walletAddress });
    return +rankNumber + 1;
  };

  const getRanksNumber = async (contractAddress: string) => {
    const ranksContract = createContract(
      DynamicContracts.RANKS,
      contractAddress
    );
    const rankNumber = await ranksContract.methods
      .numberOfRanks()
      .call({ from: walletAddress });
    return rankNumber;
  };

  const getRanksInfoAsync = async (contractAddress: string) => {
    const ranksContract = createContract(
      DynamicContracts.RANKS,
      contractAddress
    );
    const numberOfRanks = await getRanksNumber(contractAddress);
    const result: RanksData = { prices: [], names: [], addresses: [] };

    for (let i = 0; i < +numberOfRanks; i++) {
      const rankAddress = await ranksContract.methods
        .ranks(i)
        .call({ from: walletAddress });

      const rankContract = createContract(DynamicContracts.RANK, rankAddress);

      const rankPrice = await rankContract.methods
        .price()
        .call({ from: walletAddress });
      const rankName = await rankContract.methods
        .name()
        .call({ from: walletAddress });

      result.prices.push(rankPrice);
      result.names.push(rankName);
      result.addresses.push(rankAddress);
    }

    return result;
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
        .send({ from: walletAddress, gas: 10000000 });
    } catch (err) {
      console.warn(err);
    }
  };

  const createEvent = async (params: CreateEventRequest) => {
    await contracts.ticketsAdmin.methods
      .createTicketContract(
        params.ticketName,
        params.ticketSymbol,
        params.ranksAddress,
        params.saleStartTimePerRank,
        params.maxTicketsPerUserPerRank,
        params.ticketPricePerRank
      )
      .send({ from: walletAddress, gas: 5000000 })
      .catch(console.warn);
  };

  const getRanksContractAddress = async (name: string) => {
    const address = await contracts.ranksAdmin.methods
      .ranksByName(name)
      .call({ from: walletAddress });
    return address;
  };

  const buyTickets = async (
    eventName: string,
    unitPrice: number,
    amount: number,
  ) => {
    try {
      const eventContractAddress = await contracts.ticketsAdmin.methods
        .ticketsByName(eventName)
        .call({ from: walletAddress });
      const eventContract = createContract(
        DynamicContracts.EVENT,
        eventContractAddress
      );
      const totalPrice = unitPrice * amount;

      const { transactionHash } = await web3.eth.sendTransaction({
        from: walletAddress,
        to: eventContractAddress,
        value: web3.utils.toWei(totalPrice.toString(), "ether"),
        gas: 500000,
        data: eventContract.methods.buy(amount).encodeABI(),
      });

      return transactionHash;
    } catch(err) {
      console.warn(err);
      return;
    }
  }

  const buyRank = async (
    contractAddress: string,
    price: string,
    currentRankAddress: string,
    prevRankAddress?: string
  ) => {
    const ranksContract = createContract(
      DynamicContracts.RANKS,
      contractAddress
    );

    const rankContract = prevRankAddress
      ? createContract(DynamicContracts.RANK, prevRankAddress)
      : undefined;

    if (rankContract) {
      const token = await rankContract.methods
        .ownerToToken(walletAddress)
        .call({ from: walletAddress });
      try {
        await web3.eth.sendTransaction({
          from: walletAddress,
          to: prevRankAddress,
          value: web3.utils.toWei("0", "ether"),
          gas: 500000,
          data: rankContract.methods
            .approve(contractAddress, token)
            .encodeABI(),
        });
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const { transactionHash } = await web3.eth.sendTransaction({
      from: walletAddress,
      to: contractAddress,
      value: web3.utils.toWei(price, "ether"),
      gas: 500000,
      data: ranksContract.methods.buy().encodeABI(),
    });

    const newRankContract = createContract(
      DynamicContracts.RANK,
      currentRankAddress
    );
    const newToken = await newRankContract.methods
      .ownerToToken(walletAddress)
      .call({ from: walletAddress });

    return { transactionHash, tokenId: newToken };
  };

  const actions: EthActions = {
    walletAddress,
    connectWallet,
    createRanks,
    fetchEvents,
    fetchRanksNames,
    getCurrentRank,
    getRanksContractAddress,
    getWalletAddressAsync,
    getRanksNumber,
    createEvent,
    buyRank,
    buyTickets,
    getRanksInfoAsync,
  };

  return (
    <EthereumContext.Provider value={actions}>
      {children}
    </EthereumContext.Provider>
  );
};

export const useEthereum = () => useContext(EthereumContext);

export default EthereumContextProvider;
