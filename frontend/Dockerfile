FROM node:20 AS web

WORKDIR /home/app

ENV GENERATE_SOURCEMAP false

COPY package.json /home/app
COPY package-lock.json /home/app
COPY tsconfig.json /home/app
COPY public /home/app/public/
COPY src /home/app/src/

RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "start" ]