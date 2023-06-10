const ManageRanks = artifacts.require('ManageRanks');
const fs = require('fs');

module.exports = function (deployer, network) {
    deployer.deploy(ManageRanks).then(() => {
        return ManageRanks.deployed().then((instance) => {
            console.log(`ManageRanks deployed at ${instance.address} in network: ${network}.`);
            fs.writeFileSync('../common/ranks-contract-address.json', JSON.stringify(instance.address));
        });
    });
};
