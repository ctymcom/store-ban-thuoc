FROM node:10-alpine AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk update && apk add curl bash && rm -rf /var/cache/apk/*

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

MAINTAINER Thanh Liem <liemly98@gmail.com>

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build-ts

RUN npm prune --production

# run node prune
RUN /usr/local/bin/node-prune

WORKDIR /usr/src/app

FROM node:10-alpine

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/docs ./docs
COPY --from=BUILD_IMAGE /usr/src/app/public ./public

EXPOSE 3333

CMD [ "node", "dist/server.js"]