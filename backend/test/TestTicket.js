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
      [new BN("2"), new BN("1")],
      [1, 2],
      [new BN("2"), new BN("1")],
      { from: admin_user }
    );
  });

  it("should return ranks address", async () => {
    const ranksAddress = await ticket.getRanksAddress();

    expect(ranksAddress).to.equal(ranks.address);
  });

  it("should mint new tokens", async () => {
    await ticket.mintTo(user, { from: admin_user });

    const owner = await ticket.ownerOf(1);
    expect(owner).to.be.equal(user);
  });

  it("should not allow non-admin to mint new tokens", async () => {
    await expectRevert(
      ticket.mintTo(user, { from: user }),
      "Caller is not an admin"
    );
  });
});
