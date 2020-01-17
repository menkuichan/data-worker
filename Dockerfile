FROM node:10

WORKDIR /app

COPY . /app

ENV APP_PORT=3000 \
  TMDB_API_KEY= \
  DB_URI=mongodb://db:27017/super-enigma-db \
  TMDB_BASE_URL=https://api.themoviedb.org/3/

RUN yarn install

CMD node index.js

EXPOSE 3000
