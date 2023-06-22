# NFT rank system for buying concert tickets

## SUU project

The aim of this project is to provide a learning platform for Web3 technologies. 

- frontend - simple react webpage for interacting with contracts
- backend - truffle project, running local node with NFT tickets and ranks smart contracts

Documentation is available [here](https://docs.google.com/document/d/1TLMwFXpCthf7yNgOx3ijIcUjzIAGXIpwliJWbig1XsA/edit).

## Prerequisites

- Docker
- Node.js

## Setting up

1. Clone this repository and navigate to root directory.
   ```
   git clone https://github.com/war-in/suu-nft-project
   ```

1. Build and run Docker containers in a compose file:
   ```
   docker compose up
   ```
   You can find individual containers' configuration inside `docker-compose.yml` file.
   This commands sets up a Docker environent with two containers:
   - `ganache` - container running a [Ganache](https://trufflesuite.com/docs/ganache/) instance. Ganache enables setting up a local Ethereum network.
   - `webapp` - container that builds and runs a React webapp. More about the webapp further is the document.

1. Analyze the [docker compose](./docker-compose.yml) file.
   Take a closer look at Ganache-CLI command options.
   ```yml
   command: >
      --mnemonic "..."
      --host 0.0.0.0
      --port 7545
      --gasLimit 20000000
   ```
   You can find more informations about these options [here](https://trufflesuite.com/docs/ganache/reference/cli-options/).
   
   > When running the Docker compose instance on Windows with WSL, the automatic refresh of the web application on file save may not work properly.
   > To mitigate the issue `WATCHPACK_POLLING=true` environment variable is used, but the refresh may not be instantaneous.

1. In a separate terminal, navigate to the `<root>/backend` directory and run a [Truffle](https://trufflesuite.com/docs/truffle/) node.
   ```
   npx truffle console
   ```
   This command will run a Truffle instance in console mode.
   When in Truffle console, run `migrate` command to build and deploy smart contracts to Ganache node.
   Whenever You make any changes to smart contracts, run a migration.
   The output of the command should look simillar to:
   ```
   truffle(development)> migrate

   Compiling your contracts...
   [...]
   > Total deployments:    3
   > Final cost:           0.13875156 ETH
   ```
   You can find more about Truffle commands [here](https://trufflesuite.com/docs/truffle/reference/command-line-options/).
   For example, run `test` command to run project's tests.

## Contracts

1. Rank

   The Rank contract represents a rank/tier/level of a user. It uses [lazy minting](https://www.alchemy.com/overviews/lazy-minting#:~:text=creates%20the%20NFT.-,What%20is%20lazy%20minting%3F,-Lazy%20minting%20lets) concept. To check Rank's fields and methods go to `backend/contracts/ranks/Rank.sol` file.

1. Ranks

   The Ranks contract is responsible for managing Rank contracts. It keeps addresses of few Rank contracts and allows users buying them.
   To buy `Rank3`, user has to have `Rank2` and sufficient money amount. User also needs to approve Ranks contract to burn his old rank (unless he doesn't have any).
   One user has one Rank at a time. There can be more than one `Ranks` contract.
   To read more about Ranks contract go to `backend/contracts/ranks/Ranks.sol` file.

1. Ticket

   The Ticket contract sells tickets for events. Every `Ticket` has Ranks contract assigned, to be able to give special privileges for users with higher ranks.
   To read more about Ticket contract go to `backend/contracts/Ticket.sol` file.

1. Admin

   The Admin functionality is split between two different contracts.

   1. ManageRanks
   
      The ManageRanks contract keeps all deployed Ranks contracts. It is necessary because there can be more than one group of Rank (more than one Ranks contract).
      It has addresses of all Ranks contracts and lets Admin create those Ranks.
      Code of this contract is available here: `backend/contracts/admin/ManageRanks.sol`

   1. ManageTickets
   
      The ManageTickets contract keeps all deployed Tickets contracts. It is necessary because there can be a lot of events with tickets.
      It has addresses of all Ticket contracts and lets Admin create those Tickets.
      Code of this contract is available here: `backend/contracts/admin/ManageTickets.sol`

## Exercises!

Search for comments with TODO's and have fun :fire:

1. Rank.sol

   - fill `constructor` implementation
   - fill `mintTo` implementation

2. Ranks.sol

   - fill `constructor` implementation
   - fill `buy` implementation

3. Ticket.sol

   - fill `buy` implementation

4. ManageTickets.sol

   - emit an event