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

    /**
     * @notice Creates a Ranks contract instance. All Rank contracts are created here.
     * @param numberOfRanks Number of Rank contracts.
     * @param ranksNames Array with name of each Rank.
     * @param ranksSymbols Array with symbol of each Rank.
     * @param ranksSymbols Array with price of each Rank.
     */
    constructor(
        uint8 numberOfRanks,
        string[] memory ranksNames,
        string[] memory ranksSymbols,
        uint256[] memory ranksPrices
    ) {
        _grantRole(ADMIN_ROLE, msg.sender);

        for (uint i = 0; i < numberOfRanks; i++) {
            Rank rank = new Rank(
                ranksNames[i],
                ranksSymbols[i],
                ranksPrices[i]
            );
            ranks.push(address(rank));
        }
    }

    /**
     * @notice Buy your Rank here. Remember to approve this contract to be able to burn your old Rank.
     */
    function buy() external payable {
        int currentRankId = getCurrentRank(msg.sender);
        uint nextRankId = uint(currentRankId + 1);

        require(
            nextRankId < ranks.length,
            "You already have the highest rank!"
        );

        Rank nextRank = Rank(ranks[nextRankId]);
        require(
            msg.value >= nextRank.price(),
            "Send more funds to get a higher rank."
        );

        if (currentRankId > -1) {
            Rank currentRank = Rank(ranks[uint(currentRankId)]);
            currentRank.burn(currentRank.ownerToToken(msg.sender));
        }
        nextRank.mintTo(msg.sender);
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
