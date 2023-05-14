// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract Rank is ERC721, ERC721Burnable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    uint256 public price;
    mapping(address => uint) public ownerToToken;

    constructor(
        string memory name,
        string memory symbol,
        uint256 price_
    ) ERC721(name, symbol) {
        _grantRole(ADMIN_ROLE, msg.sender);

        price = price_;
    }

    function mintTo(address recipient) public returns (uint256) {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");

        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);

        ownerToToken[recipient] = newItemId;

        return newItemId;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
