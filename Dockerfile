FROM node:16-slim

WORKDIR /jupiter

COPY .yarn ./.yarn
COPY .yarnrc.yml ./.yarnrc.yml
COPY package.json ./
COPY yarn.lock ./
COPY apps/web/package.json ./apps/web/package.json

RUN yarn install

WORKDIR /jupiter/apps/web

COPY apps/web/next.config.js ./next.config.js
COPY apps/web/.next/ ./.next/
COPY apps/web/public/ ./public/

CMD ["yarn", "start"]
