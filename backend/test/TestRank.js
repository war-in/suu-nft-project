const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const Rank = artifacts.require("Rank");

contract("Rank", (accounts) => {
  let rank;

  const [admin, user] = accounts;
  const name = "MyRank";
  const symbol = "MR";
  const price = new BN("100");

  beforeEach(async () => {
    rank = await Rank.new(name, symbol, price, { from: admin });
  });

  it("should mint new tokens", async () => {
    await rank.mintTo(user, { from: admin });

    const owner = await rank.ownerOf(1);
    expect(owner).to.be.equal(user);
  });

  it("should not allow non-admin to mint new tokens", async () => {
    await expectRevert(
      rank.mintTo(user, { from: user }),
      "Caller is not an admin"
    );
  });

  it("should set price correctly", async () => {
    const expectedPrice = new BN("100");
    const actualPrice = await rank.price();
    expect(actualPrice).to.be.bignumber.equal(expectedPrice);
  });
});
