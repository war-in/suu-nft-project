// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../ranks/Ranks.sol";

/**
 * @title Contract managing all Ranks contracts.
 * @dev Should be available through the `admin panel`.
 */
contract ManageRanks is AccessControl {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /**
     * @notice To get Ranks contract address pass it's name.
     */
    mapping(string => address) public ranksByName;
    /**
     * @dev Array containing names of all Ranks contracts.
     */
    string[] private allRanksNames;

    constructor() {
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    /**
     * @notice Creates Ranks contract.
     * @param name Unique name of the Ranks contract. Will be used to store it's address.
     * @param numberOfRanks Number of Rank contracts.
     * @param ranksNames Array with name of each Rank.
     * @param ranksSymbols Array with symbol of each Rank.
     * @param ranksPrices Array with price of each Rank.
     */
    function createRanks(
        string memory name,
        uint8 numberOfRanks,
        string[] memory ranksNames,
        string[] memory ranksSymbols,
        uint256[] memory ranksPrices
    ) public {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        require(
            ranksByName[name] == address(0),
            "Ranks contract with this name already exists!"
        );

        ranksByName[name] = address(
            new Ranks(numberOfRanks, ranksNames, ranksSymbols, ranksPrices)
        );
        allRanksNames.push(name);
    }

    /**
     * @notice Returns names of the all Ranks contracts.
     * @return Array of strings with all names.
     */
    function getAllRanksNames() public view returns (string[] memory) {
        return allRanksNames;
    }
}
