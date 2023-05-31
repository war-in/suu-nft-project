import Web3 from "web3";
import Contract from "web3-eth-contract";

import RanksAdminContract from "contracts/ManageRanks.json";
import RanksContract from "contracts/Ranks.json";
import TicketsAdminContract from "contracts/ManageTickets.json";
import TicketContract from "contracts/Ticket.json";
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

const formatContract = (contract: Record<string, unknown>) => {
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
      const ranksContract = new Contract(formattedRanksContract.abi, address);
      return ranksContract;
    case DynamicContracts.EVENT:
      const formattedTicketContract = formatContract(TicketContract);
      const ticketContract = new Contract(formattedTicketContract.abi, address);
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
    formattedRanksAdminContract.abi,
    MANAGE_RANKS_CONTRACT_ADDRESS
  );
  const ticketsAdmin = new Contract(
    formattedTicketsAdminContract.abi,
    MANAGE_TICKETS_CONTRACT_ADDRESS
  );

  return {
    ranksAdmin,
    ticketsAdmin,
  };
};
