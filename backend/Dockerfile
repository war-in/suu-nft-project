FROM node:20-bullseye AS ganache

RUN apt-get update && apt-get install --no-install-recommends -y build-essential python3
RUN npm install --global ganache
RUN mkdir -p /home

WORKDIR /home

EXPOSE 8545

ENTRYPOINT ["ganache-cli"]
