const ManageTickets = artifacts.require('ManageTickets');
const fs = require('fs');

module.exports = function (deployer, network) {
    deployer.deploy(ManageTickets).then(() => {
        return ManageTickets.deployed().then((instance) => {
            console.log(`ManageTickets deployed at ${instance.address} in network: ${network}.`);
            fs.writeFileSync('../common/tickets-contract-address.json', JSON.stringify(instance.address));
        });
    });
};
