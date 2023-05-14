const ManageRanks = artifacts.require('ManageRanks');

module.exports = function (deployer, network) {
    deployer.deploy(ManageRanks).then(() => {
        return ManageRanks.deployed().then((instance) => {
            console.log(`ManageRanks deployed at ${instance.address} in network: ${network}.`);
        });
    });
};
