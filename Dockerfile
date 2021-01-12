FROM node:12-alpine AS BUILD_IMAGE

# couchbase sdk requirements

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

ARG MONGODB_URI
RUN npm run build-ts
RUN MONGODB_URI=$MONGODB_URI FIREBASE_VIEW=$FIREBASE_VIEW npm run next:build

RUN npm prune --production


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/docs ./docs
COPY --from=BUILD_IMAGE /usr/src/app/public ./public
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json
COPY --from=BUILD_IMAGE /usr/src/app/.next ./.next
COPY --from=BUILD_IMAGE /usr/src/app/next.config.js ./next.config.js

EXPOSE 5555

CMD [ "node", "dist/server.js"]