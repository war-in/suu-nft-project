// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ranks/Rank.sol";
import "./ranks/Ranks.sol";

/**
 * @title NFT contract selling tickets for events. Controlled by an Admin contract.
 * @notice This is the ticket for your event.
 */
contract Ticket is ERC721, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @notice Address of the Ranks contract which defines available Ranks for this contract.
     */
    address public ranksAddress;
    /**
     * @notice Defines when the sale starts for each Rank.
     */
    uint256[] public saleStartTimePerRank;
    /**
     * @notice Defines max amount of ticket per user with some Rank.
     */
    uint256[] public maxTicketsPerUserPerRank;
    /**
     * @notice Defines price of the ticket per Rank.
     */
    uint256[] public ticketPricePerRank;

    /**
     * @notice Creates a Ticket contract instance.
     * @param name The name of the event.
     * @param symbol Symbol of the NFT contract.
     * @param ranksAddress_ Address of the Ranks contract which defines available Ranks for an event.
     * @param saleStartTimePerRank_ Array defining when the sale starts for each Rank.
     * Open sale date is at index 0.
     * @param maxTicketsPerUserPerRank_ Array defining max amount of ticket per user with some Rank.
     * Amount for users without a Rank is at index 0.
     * @param ticketPricePerRank_ Array defining price of the ticket per Rank.
     * Price for users without Rank is at index 0.
     */
    constructor(
        string memory name,
        string memory symbol,
        address ranksAddress_,
        uint256[] memory saleStartTimePerRank_,
        uint256[] memory maxTicketsPerUserPerRank_,
        uint256[] memory ticketPricePerRank_
    ) ERC721(name, symbol) {
        _grantRole(ADMIN_ROLE, msg.sender);

        require(
            uint(Ranks(ranksAddress_).numberOfRanks()) + 1 ==
                saleStartTimePerRank_.length &&
                saleStartTimePerRank_.length ==
                maxTicketsPerUserPerRank_.length &&
                maxTicketsPerUserPerRank_.length == ticketPricePerRank_.length,
            "Wrong number of values in arrays. Remember about the open sale."
        );

        ranksAddress = ranksAddress_;
        saleStartTimePerRank = saleStartTimePerRank_;
        maxTicketsPerUserPerRank = maxTicketsPerUserPerRank_;
        ticketPricePerRank = ticketPricePerRank_;
    }

    /**
     * @notice Call this function to buy some tickets.
     * @param amount Number of tickets to buy.
     */
    function buy(uint amount) external payable {
        Ranks ranks = Ranks(ranksAddress);
        uint rankId = uint(ranks.getCurrentRank(msg.sender) + 1);

        /**
         TODO:
         - check if sale started for caller's rank
         - check if user can buy more tickets
         - check if user has enough funds to buy `amount` tickets
         - mint new tickets
         */
    }

    function getSaleStartTimePerRank()
        external
        view
        returns (uint256[] memory)
    {
        return saleStartTimePerRank;
    }

    function getMaxTicketsPerUserPerRank()
        external
        view
        returns (uint256[] memory)
    {
        return maxTicketsPerUserPerRank;
    }

    function getTicketPricePerRank() external view returns (uint256[] memory) {
        return ticketPricePerRank;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
