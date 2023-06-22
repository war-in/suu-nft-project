// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Rank.sol";

/**
 * @title Contract managing Rank contracts. Controlled by Admin contract.
 * @notice Here you can buy a Rank.
 */
contract Ranks is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @notice Array containing addresses of the Ranks. Cheapest Rank is at index 0.
     */
    address[] public ranks;
    uint8 public numberOfRanks;

    /**
     * @notice Creates a Ranks contract instance. All Rank contracts are created here.
     * @param numberOfRanks_ Number of Rank contracts.
     * @param ranksNames Array with name of each Rank.
     * @param ranksSymbols Array with symbol of each Rank.
     * @param ranksSymbols Array with price of each Rank.
     */
    constructor(
        uint8 numberOfRanks_,
        string[] memory ranksNames,
        string[] memory ranksSymbols,
        uint256[] memory ranksPrices
    ) {
        _grantRole(ADMIN_ROLE, msg.sender);

        // TODO: create `numberOfRanks_` Rank contracts and set contract properties (use `new` keyword)
    }

    /**
     * @notice Buy your Rank here. Remember to approve this contract to be able to burn your old Rank.
     */
    function buy() external payable {
        int currentRankId = getCurrentRank(msg.sender);
        uint nextRankId = uint(currentRankId + 1);

        /**
         TODO:
         - check if user does not have the highest rank
         - check if user sent enough funds (msg.value)
         - if user has a rank (currentRankId > -1) burn the old rank (Rank.burn method)
         - mint new rank to caller (mintTo)
         */
    }

    /**
     * @notice Check user's rank.
     * @param user Address of the user whose rank we want to check.
     * @return -1 if user doesn't have a rank. Rank index otherwise.
     */
    function getCurrentRank(address user) public view returns (int) {
        for (uint i = 0; i < ranks.length; i++) {
            ERC721 rank = ERC721(ranks[i]);

            if (rank.balanceOf(user) == 1) return int(i);
        }

        return -1;
    }
}
