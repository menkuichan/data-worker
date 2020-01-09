const http = require('http');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const { MAX_TOTAL_PAGES, TMDB_PARAMS: { URL, SEARCH_URL }, URL_TYPES } = require('./constants');

const getMovies = async ({ query, page, url }) => {
  const fullUrl = query ? SEARCH_URL : `${URL}${url}`;
  const { data: { results, total_pages: originalTotalPages } } = await axios.get(
    fullUrl,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query,
        page,
      },
    },
  );
  const totalPages = Math.min(originalTotalPages, MAX_TOTAL_PAGES);
  const movies = results.map(
    ({
      title, genre_ids: genresIds, vote_average: voteAverage, overview, poster_path: posterPath,
      release_date: releaseDate, popularity,
      original_language: originalLanguage, vote_count: voteCount, original_title: originalTitle,
    }) => ({
      title,
      genresIds,
      voteAverage,
      overview,
      popularity,
      originalLanguage,
      voteCount,
      originalTitle,
      releaseDate,
      posterPath,
    }),
  );
  return { movies, totalPages };
};

const { Schema } = mongoose;

const movieScheme = new Schema({
  title: String,
  overview: String,
  release_date: String,
  genre_ids: [{
    type: Number,
  }],
  vote_average: Number,
  popularity: Number,
  original_language: String,
  vote_count: Number,
  original_title: String,
  poster_path: String,
  adult: Boolean,
  id: Number,
  backdrop_path: String,
  video: Boolean,
});

const Movie = mongoose.model('Movie', movieScheme);

const firstMovie = new Movie({
  title: 'Fight Club',
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});


db.once('open', () => {
  firstMovie.save(() => {
    console.log(firstMovie.title);
  });
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(process.env.APP_PORT, () => {
  URL_TYPES.map(async (type) => {
    const res = await getMovies({ url: type, page: 1 });
    console.log(res);
  });
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
