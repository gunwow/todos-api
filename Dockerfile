FROM node:16-alpine3.14 AS builder

WORKDIR /app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]