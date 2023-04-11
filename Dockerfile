FROM node:16-slim

WORKDIR /jupiter

COPY .yarn/ ./.yarn/
COPY .yarnrc.yml ./
COPY yarn.lock ./
COPY package.json ./
COPY packages/data/package.json ./packages/data/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY apps/web/package.json ./apps/web/package.json

RUN yarn install

WORKDIR /jupiter/apps/web

COPY apps/web/next.config.mjs ./next.config.mjs
COPY apps/web/.next/ ./.next/
COPY apps/web/public/ ./public/

CMD ["yarn", "start"]
