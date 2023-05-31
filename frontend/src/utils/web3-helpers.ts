import Web3 from "web3";
import Contract from "web3-eth-contract";

import RanksAdminContract from "../abi/manageRanks.json";
import RanksContract from "../abi/ranks.json";
import TicketsAdminContract from "../abi/manageTickets.json";
import TicketContract from "../abi/ticket.json";
import {
  CONTRACT_PROVIDER_URL,
  MANAGE_RANKS_CONTRACT_ADDRESS,
  MANAGE_TICKETS_CONTRACT_ADDRESS,
} from "./config";

export interface Contracts {
  ranksAdmin: Contract;
  ticketsAdmin: Contract;
}

export enum DynamicContracts {
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
    MANAGE_RANKS_CONTRACT_ADDRESS
  );
  const ticketsAdmin = new Contract(
    formattedTicketsAdminContract,
    MANAGE_TICKETS_CONTRACT_ADDRESS
  );

  return {
    ranksAdmin,
    ticketsAdmin,
  };
};
