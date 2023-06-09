// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../Ticket.sol";

contract ManageTickets is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @notice To get Ticket contract address by it's name.
     */
    mapping(string => address) public ticketsByName;
    /**
     * @dev Array containing names of all Ticket contracts.
     */
    string[] private allTicketsNames;

    event ManageTicketsDeployed(address indexed manage_tickets_address);

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);

        // TODO: emit ManageTicketsDeployed event
    }

    /**
     * @notice Creates Ticket contract.
     * @param ticketName Unique name of the NFT Ticket contract. Will be used to store it's address.
     * @param ticketSymbol Symbol of the NFT contract.
     * @param ranksAddress Address of the Ranks contract which defines available ranks for an event.
     * @param saleStartTimePerRank Array defining when the sale starts for each Rank.
     * Open sale date is at index 0.
     * @param maxTicketsPerUserPerRank Array defining max amount of ticket per user with some rank.
     * Amount for users without a rank is at index 0.
     * @param ticketPricePerRank Array defining price of the ticket per rank.
     * Price for users without rank is at index 0.
     */
    function createTicketContract(
        string memory ticketName,
        string memory ticketSymbol,
        address ranksAddress,
        uint256[] memory saleStartTimePerRank,
        uint256[] memory maxTicketsPerUserPerRank,
        uint256[] memory ticketPricePerRank
    ) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        require(
            ticketsByName[ticketName] == address(0),
            "Ticket contract with this name already exists!"
        );

        ticketsByName[ticketName] = address(
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

    /**
     * @notice Returns names of the all Ticket contracts.
     * @return Array of strings with all names.
     */
    function getAllTicketsNames() public view returns (string[] memory) {
        return allTicketsNames;
    }
}
