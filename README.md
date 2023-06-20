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
