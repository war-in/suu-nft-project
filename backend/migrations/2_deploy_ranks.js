const Ranks = artifacts.require('Ranks');

module.exports = function (deployer, network) {
    const numberOfRanks = 3;
    const ranksNames = ['Gold', 'Silver', 'Bronze'];
    const ranksSymbols = ['GLD', 'SLV', 'BRZ'];
    const ranksPrices = [1000, 500, 250];

    deployer.deploy(Ranks, numberOfRanks, ranksNames, ranksSymbols, ranksPrices).then(() => {
        return Ranks.deployed().then((instance) => {
            console.log(`Ranks deployed at ${instance.address} in network: ${network}.`);
        });
    });
};
