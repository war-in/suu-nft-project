FROM node:20 AS web

ENV GENERATE_SOURCEMAP false

WORKDIR /home/app
RUN mkdir /home/app/backend
RUN mkdir /home/app/backend/build

COPY . .
RUN npm install

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]