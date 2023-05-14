import Web3 from "web3";
import Contract from "web3-eth-contract";

import AdminContract from 'contracts/Admin.json';
import RankContract from 'contracts/Rank.json';
import RanksContract from 'contracts/Ranks.json';
import TicketContract from 'contracts/Ticket.json';

export interface Contracts {
    adminContract: Contract;
    rankContract: Contract;
    ranksContract: Contract;
    ticketContract: Contract;
}

const CONTRACT_PROVIDER_URL = 'http://localhost:8545';

const ethereum = window.ethereum;
//@ts-ignore
const web3 = new Web3(ethereum);

const formatContract = (contract: { [key: string]: any }) => {
    return JSON.parse(JSON.stringify(contract));
}

/// TODO: Check if contract address is the last element in networks in contract's json file, for now addresses are hardcoded
// const extractAddress = (contract: { [key: string]: any }, networkId: string) => {
//     return contract.networks[networkId].address;
// }

export const asciiToHex = (value: string) => {
    return web3.utils.asciiToHex(value);
}

export const setupContracts = (): Contracts => {
    Contract.setProvider(CONTRACT_PROVIDER_URL);

    const formattedAdminContract = formatContract(AdminContract);
    const formattedRankContract = formatContract(RankContract);
    const formattedRanksContract = formatContract(RanksContract);
    const formattedTicketContract = formatContract(TicketContract);

    const adminContract = new Contract(formattedAdminContract.abi, '0x0000000000000000000000000000000000000000');  /// TODO: Paste proper address
    const rankContract = new Contract(formattedRankContract.abi, '0x0000000000000000000000000000000000000000');   /// TODO: Paste proper address
    const ranksContract = new Contract(formattedRanksContract.abi, '0x0000000000000000000000000000000000000000');   /// TODO: Paste proper address
    const ticketContract = new Contract(formattedTicketContract.abi, '0xFCFfC4B8f43A2129AE144A43B174882FfD34Ed1d');

    return {
        adminContract,
        rankContract,
        ranksContract,
        ticketContract,
    }
}