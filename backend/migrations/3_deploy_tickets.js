const Ranks = artifacts.require('Ranks');
const Ticket = artifacts.require('Ticket');

module.exports = async function (deployer, network) {
    const name = 'My Ticket';
    const symbol = 'TICKET';
    const saleStartTimePerRank = [1640995200, 1643673600, 1646092800]; // January 1st 2022, February 1st 2022, March 1st 2022
    const maxTicketsPerUserPerRank = [2, 3, 5];
    const ticketPricePerRank = [1000, 500, 250];

    // Retrieve the address of the already deployed Ranks contract
    const ranksInstance = await Ranks.deployed();
    const ranksAddress = ranksInstance.address;

    // Deploy the Ticket contract with the retrieved Ranks address and other parameters
    await deployer.deploy(
        Ticket,
        name,
        symbol,
        ranksAddress,
        saleStartTimePerRank,
        maxTicketsPerUserPerRank,
        ticketPricePerRank
    );

    const ticketInstance = await Ticket.deployed();
    console.log(`Ticket deployed at ${ticketInstance.address} in network: ${network}.`);
};
