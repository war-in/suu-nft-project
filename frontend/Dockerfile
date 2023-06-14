FROM node:20 AS webapp

WORKDIR /home/app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]