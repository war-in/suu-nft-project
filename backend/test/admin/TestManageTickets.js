const { expect } = require("chai");
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

const ManageTickets = artifacts.require("ManageTickets");
const Ranks = artifacts.require("Ranks");

contract("ManageTickets", function (accounts) {
  let manageTickets;

  const [admin_user] = accounts;

  beforeEach(async () => {
    manageTickets = await ManageTickets.new({ from: admin_user });
  });

  it("should create ticket contract", async () => {
    const ticketName = "My Ticket";
    const ticketSymbol = "MT";
    const numberOfRanks = 3;
    const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
    const ranksSymbols = ["R1", "R2", "R3"];
    const ranksPrices = [1, 2, 3];

    const ranks = await Ranks.new(
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin_user }
    );
    const ranksAddress = ranks.address;

    const saleStartTimePerRank = [4, 3, 2, 1];
    const maxTicketsPerUserPerRank = [1, 2, 3, 4];
    const ticketPricePerRank = [4, 3, 2, 1];

    await manageTickets.createTicketContract(
      ticketName,
      ticketSymbol,
      ranksAddress,
      saleStartTimePerRank,
      maxTicketsPerUserPerRank,
      ticketPricePerRank,
      { from: admin_user }
    );

    const ticketAddress = await manageTickets.ticketsByName(ticketName);

    expect(ticketAddress).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("should throw on wrong Ticket name", async () => {
    const ticketName = "My Ticket";
    const ticketSymbol = "MT";
    const numberOfRanks = 3;
    const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
    const ranksSymbols = ["R1", "R2", "R3"];
    const ranksPrices = [1, 2, 3];

    const ranks = await Ranks.new(
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin_user }
    );
    const ranksAddress = ranks.address;

    const saleStartTimePerRank = [4, 3, 2, 1];
    const maxTicketsPerUserPerRank = [1, 2, 3, 4];
    const ticketPricePerRank = [4, 3, 2, 1];

    await manageTickets.createTicketContract(
      ticketName,
      ticketSymbol,
      ranksAddress,
      saleStartTimePerRank,
      maxTicketsPerUserPerRank,
      ticketPricePerRank,
      { from: admin_user }
    );

    await expectRevert(
      manageTickets.createTicketContract(
        ticketName,
        ticketSymbol,
        ranksAddress,
        saleStartTimePerRank,
        maxTicketsPerUserPerRank,
        ticketPricePerRank,
        { from: admin_user }
      ),
      "Ticket contract with this name already exists!"
    );
  });
});
