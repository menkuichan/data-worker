FROM node:10

WORKDIR /app

COPY . /app

RUN yarn install

CMD node index.js

EXPOSE 8080
