const { expect } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");

const ManageRanks = artifacts.require("ManageRanks");

contract("ManageRanks", function (accounts) {
  let manageRanks;

  const [admin_user] = accounts;

  beforeEach(async () => {
    manageRanks = await ManageRanks.new({ from: admin_user });
  });

  it("should create ranks", async () => {
    const name = "My Ranks";
    const numberOfRanks = 3;
    const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
    const ranksSymbols = ["R1", "R2", "R3"];
    const ranksPrices = [new BN("1"), new BN("2"), new BN("3")];

    await manageRanks.createRanks(
      name,
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin_user }
    );

    const allRanks = await manageRanks.getAllRanksNames();
    const ranksAddress = await manageRanks.getRanksContractAddress(name);

    expect(allRanks.length).to.equal(1);
    expect(allRanks[0]).to.equal(name);
    expect(ranksAddress).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
});
