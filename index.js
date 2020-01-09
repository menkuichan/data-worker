const http = require('http');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const TMDB_URL = `https://api.themoviedb.org/3/discover/movie`;

const getMovies = async ({ page, url }) => {
  const { data: { results, total_pages } } = await axios.get(
    url,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page,
      },
    },
  );
  const movies = results.map(
    ({
      title, genre_ids, vote_average, overview, poster_path, release_date,
      popularity, original_language, vote_count, original_title,
    }) => ({
      title, genre_ids, vote_average, overview, poster_path, release_date,
      popularity, original_language, vote_count, original_title,
    }),
  );
  return { movies, total_pages };
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

db.once('open', async () => {
  const allMovies = [];
  const { movies, total_pages } = await getMovies({ url: TMDB_URL, page: 1 });
  movies.map(movie => allMovies.push(movie));
  for (let i = 2; i <= total_pages; i++) {
    const { movies } = await getMovies({ url: TMDB_URL, page: total_pages });
    movies.map(movie => allMovies.push(movie));
  }
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
