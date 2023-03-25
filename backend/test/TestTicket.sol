// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "../contracts/Ticket.sol";

contract TestTicket {
    Ticket ticket;

    function beforeEach() public {
        ticket = new Ticket();
    }

    function testMintTo() public {
        address recipient = address(0x1);
        uint256 tokenId = ticket.mintTo(recipient);

        uint256 expectedTokenId = 1;
        Assert.equal(tokenId, expectedTokenId, "Token ID should be 1");

        uint256 balance = ticket.balanceOf(recipient);
        Assert.equal(balance, 1, "Recipient should have one ticket");

        address owner = ticket.ownerOf(tokenId);
        Assert.equal(owner, recipient, "Recipient should be owner of token");
    }
}

