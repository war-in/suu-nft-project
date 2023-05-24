FROM node:20-bullseye AS ganache

WORKDIR /home/app
RUN npm install --global ganache

EXPOSE 8545
ENTRYPOINT ["npx", "ganache-cli", "--host", "0.0.0.0"]