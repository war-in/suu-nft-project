const ManageTickets = artifacts.require('ManageTickets');

module.exports = function (deployer, network) {
    deployer.deploy(ManageTickets).then(() => {
        return ManageTickets.deployed().then((instance) => {
            console.log(`ManageTickets deployed at ${instance.address} in network: ${network}.`);
        });
    });
};
