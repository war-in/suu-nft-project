import Web3 from "web3";
import Contract from "web3-eth-contract";

import RanksAdminContract from "../abi/manageRanks.json";
import RanksContract from "../abi/ranks.json";
import RankContract from "../abi/rank.json";
import TicketsAdminContract from "../abi/manageTickets.json";
import TicketContract from "../abi/ticket.json";
import { CONTRACT_PROVIDER_URL } from "./config";
import MANAGE_RANKS_CONTRACT_ADDRESS from "common/ranks-contract-address.json";
import MANAGE_TICKETS_CONTRACT_ADDRESS from "common/tickets-contract-address.json";

export interface Contracts {
  ranksAdmin: Contract;
  ticketsAdmin: Contract;
}

export enum DynamicContracts {
  RANK = "rank",
  RANKS = "ranks",
  EVENT = "event",
}

const ethereum = window.ethereum;
//@ts-ignore
const web3 = new Web3(ethereum);

const formatContract = (contract: object) => {
  return JSON.parse(JSON.stringify(contract));
};

export const asciiToHex = (value: string) => {
  return web3.utils.asciiToHex(value);
};

export const createContract = (
  contractType: DynamicContracts,
  address: string
) => {
  switch (contractType) {
    case DynamicContracts.RANKS:
      const formattedRanksContract = formatContract(RanksContract);
      const ranksContract = new Contract(formattedRanksContract, address);
      return ranksContract;
    case DynamicContracts.EVENT:
      const formattedTicketContract = formatContract(TicketContract);
      const ticketContract = new Contract(formattedTicketContract, address);
      return ticketContract;
    case DynamicContracts.RANK:
      const formattedRankContract = formatContract(RankContract);
      const rankContract = new Contract(formattedRankContract, address);
      return rankContract;
    default:
      throw new Error("Contract type not implemented!");
  }
};

export const setupContracts = (): Contracts => {
  Contract.setProvider(CONTRACT_PROVIDER_URL);

  const formattedRanksAdminContract = formatContract(RanksAdminContract);
  const formattedTicketsAdminContract = formatContract(TicketsAdminContract);

  const ranksAdmin = new Contract(
    formattedRanksAdminContract,
    MANAGE_RANKS_CONTRACT_ADDRESS.toLowerCase()
  );
  const ticketsAdmin = new Contract(
    formattedTicketsAdminContract,
    MANAGE_TICKETS_CONTRACT_ADDRESS.toLowerCase()
  );

  return {
    ranksAdmin,
    ticketsAdmin,
  };
};
