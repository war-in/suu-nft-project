const { expect } = require("chai");
const { BN } = require("@openzeppelin/test-helpers");

const Admin = artifacts.require("Admin");
const Ranks = artifacts.require("Ranks");

contract("Admin", function (accounts) {
  let admin;

  const [admin_user] = accounts;

  beforeEach(async () => {
    admin = await Admin.new({ from: admin_user });
  });

  it("should create ranks", async () => {
    const name = "My Ranks";
    const numberOfRanks = 3;
    const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
    const ranksSymbols = ["R1", "R2", "R3"];
    const ranksPrices = [new BN("1"), new BN("2"), new BN("3")];

    await admin.createRanks(
      name,
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin_user }
    );

    const allRanks = await admin.getAllRanksNames();
    const ranksAddress = await admin.getRanksContractAddress(name);

    expect(allRanks.length).to.equal(1);
    expect(allRanks[0]).to.equal(name);
    expect(ranksAddress).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("should create ticket contract", async () => {
    const ticketName = "My Ticket";
    const ticketSymbol = "MT";
    const numberOfRanks = 3;
    const ranksNames = ["Rank 1", "Rank 2", "Rank 3"];
    const ranksSymbols = ["R1", "R2", "R3"];
    const ranksPrices = [new BN("1"), new BN("2"), new BN("3")];

    const ranks = await Ranks.new(
      numberOfRanks,
      ranksNames,
      ranksSymbols,
      ranksPrices,
      { from: admin_user }
    );
    const ranksAddress = ranks.address;

    const saleStartTimePerRank = [0, 1, 2];
    const maxTicketsPerUserPerRank = [1, 2, 3];
    const ticketPricePerRank = [new BN("4"), new BN("5"), new BN("6")];

    await admin.createTicketContract(
      ticketName,
      ticketSymbol,
      ranksAddress,
      saleStartTimePerRank,
      maxTicketsPerUserPerRank,
      ticketPricePerRank,
      { from: admin_user }
    );

    const ticketAddress = await admin.getTicketAddressByName(ticketName);

    expect(ticketAddress).to.not.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });
});
