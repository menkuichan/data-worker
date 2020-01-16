FROM node:10

WORKDIR /app

COPY . /app

ENV APP_PORT=3000 \
    DB_URI=mongodb://ilona-mongo:27017/super-enigma-db

RUN yarn install

CMD node index.js

EXPOSE 3000
