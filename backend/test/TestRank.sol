// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ranks/Rank.sol";

contract TestRank {
    Rank private rank;
    bytes32 private ADMIN_ROLE;

    function beforeEach() public {
        rank = new Rank("MyRank", "MR", 100);
        ADMIN_ROLE = rank.ADMIN_ROLE();
    }

    function testAdminRole() public {
        address admin = address(this);
        address newAdmin = address(msg.sender);

        // Ensure that the contract creator has the admin role
        Assert.isTrue(
            rank.hasRole(ADMIN_ROLE, admin),
            "Contract creator should have admin role"
        );
    }

    function testPrice() public {
        uint256 expectedPrice = 100;
        Assert.equal(
            rank.price(),
            expectedPrice,
            "Price should match constructor argument"
        );
    }

    function testERC721() public {
        uint256 tokenId = 1;
        address owner = address(0x1);

        // Ensure that the contract creator can mint a token
        rank.mintTo(owner);
        Assert.equal(
            rank.ownerOf(tokenId),
            owner,
            "Token should be owned by 0x1"
        );
    }
}
