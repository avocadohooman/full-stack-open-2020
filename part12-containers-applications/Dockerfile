FROM node:16

WORKDIR /usr/src/app

USER node

COPY --chown=node:node . .

RUN npm ci --only-production

ENV DEBUG=part12-containers-applications:*

CMD npm start

