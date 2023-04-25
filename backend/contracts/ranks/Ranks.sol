// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./Rank.sol";

contract Ranks is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    address[] public ranks;

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
}
