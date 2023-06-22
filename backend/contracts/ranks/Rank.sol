// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

/**
 * @title NFT Rank contract. Controlled by Ranks contract.
 */
contract Rank is ERC721, ERC721Burnable, AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    /**
     * @notice Price of this Rank.
     */
    uint256 public price;
    /**
     * @notice Mapping from address to an owned token.
     */
    mapping(address => uint) public ownerToToken;

    /**
     * @notice Creates Rank contract.
     * @param name NFT name.
     * @param symbol NFT symbol.
     * @param price_ Price of the one token.
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 price_
    ) ERC721(name, symbol) {
        // TODO: grant admin role and set rank price
    }

    /**
     * @dev Ranks contract should be the admin.
     * @param recipient Address the token will be minted to.
     */
    function mintTo(address recipient) public returns (uint256) {
        /**
         TODO:
         - check if caller is an admin
         - increment and get current token id (check Counters.Counter methods)
         - mint new token (use _safeMint method)
         - assign token to caller
         - return id of the minted token

         Hint: to check something use `require`
         */

        return 0;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
