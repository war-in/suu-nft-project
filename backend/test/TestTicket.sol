// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "../contracts/Ticket.sol";

contract TestTicket {
    Ticket ticket;

    function beforeEach() public {
        // initialize a new instance of the contract before each test
        uint256[] memory saleStartTimePerRank = new uint256[](3);
        saleStartTimePerRank[0] = 1641004800; // Dec 31, 2021 12:00:00 AM GMT
        saleStartTimePerRank[1] = 1643683200; // Feb 01, 2022 12:00:00 AM GMT
        saleStartTimePerRank[2] = 1646361600; // Mar 05, 2022 12:00:00 AM GMT

        uint8[] memory maxTicketsPerUserPerRank = new uint8[](3);
        maxTicketsPerUserPerRank[0] = 2;
        maxTicketsPerUserPerRank[1] = 4;
        maxTicketsPerUserPerRank[2] = 6;

        uint256[] memory ticketPricePerRank = new uint256[](3);
        ticketPricePerRank[0] = 100000000000000000; // 0.1 ETH
        ticketPricePerRank[1] = 200000000000000000; // 0.2 ETH
        ticketPricePerRank[2] = 300000000000000000; // 0.3 ETH

        ticket = new Ticket(
            "MyTicket",
            "MT",
            address(this),
            saleStartTimePerRank,
            maxTicketsPerUserPerRank,
            ticketPricePerRank
        );
    }

    function testMintTo() public {
        // Ensure that the first token ID is 1
        Assert.equal(ticket.mintTo(address(0x1)), 1, "Token ID should be 1");

        // Ensure that the second token ID is 2
        Assert.equal(ticket.mintTo(address(0x2)), 2, "Token ID should be 2");
    }

    function testGetRanksAddress() public {
        // Ensure that the contract returns the correct ranks address
        Assert.equal(
            ticket.getRanksAddress(),
            address(this),
            "Incorrect ranks address"
        );
    }
}
