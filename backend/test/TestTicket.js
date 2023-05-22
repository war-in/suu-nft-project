const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const Ticket = artifacts.require("Ticket");
const Ranks = artifacts.require("Ranks");
const Rank = artifacts.require("Rank");

contract("Ticket", function (accounts) {
  let ticket;
  let ranks;

  const [adminUser, user1, user2] = accounts;

  beforeEach(async () => {
    ranks = await Ranks.new(
      2,
      ["Rank 1", "Rank 2"],
      ["R1", "R2"],
      [new BN("1"), new BN("2")],
      { from: adminUser }
    );

    ticket = await Ticket.new(
      "Ticket",
      "TCK",
      ranks.address,
      [3, 2, 1],
      [1, 2, 3],
      [3, 2, 1],
      { from: adminUser }
    );
  });

  it("should return ranks address", async () => {
    const ranksAddress = await ticket.ranksAddress();

    expect(ranksAddress).to.equal(ranks.address);
  });

  it("should sell new tokens", async () => {
    await ticket.buy(1, { from: user1, value: 3 });

    const owner = await ticket.ownerOf(1);
    expect(owner).to.be.equal(user1);
  });

  it("should throw on too high amount of tickets for too low rank", async () => {
    await expectRevert(
      ticket.buy(2, { from: user1 }),
      "You can't buy so many tickets with your Rank."
    );

    await ticket.buy(1, { from: user1, value: 3 });

    await expectRevert(
      ticket.buy(1, { from: user1 }),
      "You can't buy so many tickets with your Rank."
    );
  });

  it("should throw on too few funds", async () => {
    await expectRevert(
      ticket.buy(1, { from: user1, value: 0 }),
      "Send more funds to buy those tickets."
    );
  });

  it("should sell different amount of tickets", async () => {
    await ranks.buy({ from: user1, value: 10 });

    await ranks.buy({ from: user2, value: 10 });
    await (
      await Rank.at(await ranks.ranks(await ranks.getCurrentRank(user1)))
    ).setApprovalForAll(ranks.address, true, {
      from: user2,
    });
    await ranks.buy({ from: user2, value: 10 });

    await ticket.buy(2, { from: user1, value: 10 });
    await ticket.buy(3, { from: user2, value: 10 });

    await expectRevert(
      ticket.buy(2, { from: adminUser, value: 10 }),
      "You can't buy so many tickets with your Rank."
    );
  });
});
