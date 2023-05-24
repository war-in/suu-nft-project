FROM node:20-bullseye AS truffle

WORKDIR /home/app

COPY . .

RUN apt-get update && apt-get install --no-install-recommends -y build-essential python3
RUN npm install

ENTRYPOINT ["npx", "truffle", "migrate", "&&", "npx", "truffle", "watch"]
