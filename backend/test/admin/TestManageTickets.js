const { expect } = require("chai");
const { expectRevert } = require("@openzeppelin/test-helpers");

const ManageTickets = artifacts.require("ManageTickets");
const Ranks = artifacts.require("Ranks");

contract("ManageTickets", function (accounts) {
  let manageTickets;

  const [adminUser] = accounts;

  beforeEach(async () => {
    manageTickets = await ManageTickets.new({ from: adminUser });
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
      { from: adminUser }
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
      { from: adminUser }
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
      { from: adminUser }
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
      { from: adminUser }
    );

    await expectRevert(
      manageTickets.createTicketContract(
        ticketName,
        ticketSymbol,
        ranksAddress,
        saleStartTimePerRank,
        maxTicketsPerUserPerRank,
        ticketPricePerRank,
        { from: adminUser }
      ),
      "Ticket contract with this name already exists!"
    );
  });
});
