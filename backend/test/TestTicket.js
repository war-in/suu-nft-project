const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const Ticket = artifacts.require("Ticket");
const Ranks = artifacts.require("Ranks");

contract("Ticket", function (accounts) {
  let ticket;
  let ranks;

  const [admin_user, user] = accounts;

  beforeEach(async () => {
    ranks = await Ranks.new(
      2,
      ["Rank 1", "Rank 2"],
      ["R1", "R2"],
      [new BN("1"), new BN("2")],
      { from: admin_user }
    );

    ticket = await Ticket.new(
      "Ticket",
      "TCK",
      ranks.address,
      [3, 2, 1],
      [1, 2, 3],
      [3, 2, 1],
      { from: admin_user }
    );
  });

  it("should return ranks address", async () => {
    const ranksAddress = await ticket.ranksAddress();

    expect(ranksAddress).to.equal(ranks.address);
  });

  it("should sell new tokens", async () => {
    await ticket.buy(1, { from: user, value: 3 });

    const owner = await ticket.ownerOf(1);
    expect(owner).to.be.equal(user);
  });

  it("should throw on too high amount", async () => {
    await expectRevert(
      ticket.buy(2, { from: user }),
      "You can't buy so many tickets with your Rank."
    );

    await ticket.buy(1, { from: user, value: 3 });

    await expectRevert(
      ticket.buy(1, { from: user }),
      "You can't buy so many tickets with your Rank."
    );
  });
});
