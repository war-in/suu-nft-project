type Network = "development" | "kovan" | "mainnet";

module.exports = (artifacts: Truffle.Artifacts) => {
    return async (
        deployer: Truffle.Deployer,
        network: Network,
    ) => {
        const Ticket = artifacts.require("Ticket");

        await deployer.deploy(Ticket);

        const ticket = await Ticket.deployed();
        console.log(
            `Tickets deployed at ${ticket.address} in network: ${network}.`
        );
    };
};