FROM node:16.14.0-alpine as base

WORKDIR /app

ARG ENV

ENV NODE_ENV=production

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build
