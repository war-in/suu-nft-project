// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../Ticket.sol";

contract ManageTickets is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    mapping(string => address) ticketsByNames;
    string[] allTicketsNames;

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createTicketContract(
        string memory ticketName,
        string memory ticketSymbol,
        address ranksAddress,
        uint256[] memory saleStartTimePerRank,
        uint8[] memory maxTicketsPerUserPerRank,
        uint256[] memory ticketPricePerRank
    ) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");

        ticketsByNames[ticketName] = address(
            new Ticket(
                ticketName,
                ticketSymbol,
                ranksAddress,
                saleStartTimePerRank,
                maxTicketsPerUserPerRank,
                ticketPricePerRank
            )
        );
        allTicketsNames.push(ticketName);
    }

    function getTicketAddressByName(
        string memory ticketName
    ) public view returns (address) {
        return ticketsByNames[ticketName];
    }
}
