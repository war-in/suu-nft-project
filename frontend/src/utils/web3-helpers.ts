import Web3 from "web3";
import Contract from "web3-eth-contract";

import RankContract from "contracts/Rank.json";
import RanksAdminContract from "contracts/ManageRanks.json";
import RanksContract from "contracts/Ranks.json";
import TicketContract from "contracts/Ticket.json";
import TicketsAdminContract from "contracts/ManageTickets.json";

export interface Contracts {
  rankContract: Contract;
  ranksAdmin: Contract;
  ranksContract: Contract;
  ticketContract: Contract;
  ticketsAdmin: Contract;
}

const ethereum = window.ethereum;
//@ts-ignore
const web3 = new Web3(ethereum);

const formatContract = (contract: { [key: string]: any }) => {
  return JSON.parse(JSON.stringify(contract));
};

export const asciiToHex = (value: string) => {
  return web3.utils.asciiToHex(value);
};

export const setupContracts = (): Contracts => {
  Contract.setProvider(process.env.REACT_APP_CONTRACT_PROVIDER_URL!);

  const formattedRankContract = formatContract(RankContract);
  const formattedRanksAdminContract = formatContract(RanksAdminContract);
  const formattedRanksContract = formatContract(RanksContract);
  const formattedTicketContract = formatContract(TicketContract);
  const formattedTicketsAdminContract = formatContract(TicketsAdminContract);

  const rankContract = new Contract(
    formattedRankContract.abi,
    process.env.REACT_APP_RANK_CONTRACT_ADDRESS
  );
  const ranksAdmin = new Contract(
    formattedRanksAdminContract.abi,
    process.env.REACT_APP_MANAGE_RANKS_CONTRACT_ADDRESS
  );
  const ranksContract = new Contract(
    formattedRanksContract.abi,
    process.env.REACT_APP_RANKS_CONTRACT_ADDRESS
  );
  const ticketContract = new Contract(
    formattedTicketContract.abi,
    process.env.REACT_APP_TICKET_CONTRACT_ADDRESS
  );
  const ticketsAdmin = new Contract(
    formattedTicketsAdminContract.abi,
    process.env.REACT_APP_MANAGE_TICKETS_CONTRACT_ADDRESS
  );

  return {
    rankContract,
    ranksAdmin,
    ranksContract,
    ticketContract,
    ticketsAdmin,
  };
};
