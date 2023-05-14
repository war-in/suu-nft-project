const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const Ranks = artifacts.require("Ranks");
const Rank = artifacts.require("Rank");

contract("Ranks", (accounts) => {
  let ranks;

  const [admin, user1] = accounts;
  const numberOfRanks = 3;
  const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
  const ranksSymbols = ["R1", "R2", "R3"];
  const ranksPrices = [1, 2, 3];

  beforeEach(async () => {
    ranks = await Ranks.new(
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin }
    );
  });

  it("should get current rank when no rank", async () => {
    let currentRank = await ranks.getCurrentRank(user1);

    expect(currentRank).to.be.bignumber.equal(BN(-1));
  });

  it("should buy new rank", async () => {
    await ranks.buy({ from: user1, value: 1 });

    let currentRank = await ranks.getCurrentRank(user1);

    expect(currentRank).to.be.bignumber.equal(BN(0));
  });

  it("should not buy new rank - price too low", async () => {
    await expectRevert(
      ranks.buy({ from: user1, value: 0 }),
      "Send more funds to get a higher rank."
    );
  });

  it("should not buy new rank - already have the highest", async () => {
    await ranks.buy({ from: user1, value: 1 });

    await (
      await Rank.at(await ranks.ranks(await ranks.getCurrentRank(user1)))
    ).setApprovalForAll(ranks.address, true, {
      from: user1,
    });
    await ranks.buy({ from: user1, value: 2 });

    await (
      await Rank.at(await ranks.ranks(await ranks.getCurrentRank(user1)))
    ).setApprovalForAll(ranks.address, true, {
      from: user1,
    });
    await ranks.buy({ from: user1, value: 3 });

    await expectRevert(
      ranks.buy({ from: user1, value: 4 }),
      "You already have the highest rank!"
    );
  });

  it("should get current rank rank", async () => {
    await ranks.buy({ from: user1, value: 1 });

    let currentRank = await ranks.getCurrentRank(user1);

    expect(currentRank).to.be.bignumber.equal(BN(0));
  });
});
