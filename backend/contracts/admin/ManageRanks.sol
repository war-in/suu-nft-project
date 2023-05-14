// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../ranks/Ranks.sol";

contract ManageRanks is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    mapping(string => address) ranksByNames;
    string[] allRanksNames;

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createRanks(
        string memory name,
        uint8 numberOfRanks,
        string[] memory ranksNames,
        string[] memory ranksSymbols,
        uint256[] memory ranksPrices
    ) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");

        ranksByNames[name] = address(
            new Ranks(numberOfRanks, ranksNames, ranksSymbols, ranksPrices)
        );
        allRanksNames.push(name);
    }

    function getAllRanksNames() public view returns (string[] memory) {
        return allRanksNames;
    }

    function getRanksContractAddress(
        string memory name
    ) public view returns (address) {
        return ranksByNames[name];
    }
}
