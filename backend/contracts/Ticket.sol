// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Ticket is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    address ranks;
    uint256[] saleStartTimePerRank;
    uint8[] maxTicketsPerUserPerRank;
    uint256[] ticketPricePerRank;

    constructor(
        string memory name,
        string memory symbol,
        address ranksAddress,
        uint256[] memory saleStartTimePerRank_,
        uint8[] memory maxTicketsPerUserPerRank_,
        uint256[] memory ticketPricePerRank_
    ) ERC721(name, symbol) {
        ranks = ranksAddress;
        saleStartTimePerRank = saleStartTimePerRank_;
        maxTicketsPerUserPerRank = maxTicketsPerUserPerRank_;
        ticketPricePerRank = ticketPricePerRank_;
    }

    function mintTo(address recipient) public returns (uint256) {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function getRanksAddress() public view returns (address) {
        return ranks;
    }
}
