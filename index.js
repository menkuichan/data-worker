const http = require('http');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

const axiosInstance = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
});

axiosInstance.interceptors.response.use(response => {
  return response.data;
}, error => {
  return Promise.reject(error);
});

const getMovies = (page) => {
  return axiosInstance.get('/discover/movie', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      page,
    },
  });
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

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error(err);
});

db.once('open', async () => {
  try {
    let allMovies = [];
    const { results, total_pages } = await getMovies(1);
    allMovies = [...allMovies, ...results];
    for (let i = 2; i <= total_pages; i++) {
      const { results } = await getMovies(i);
      allMovies = [...allMovies, ...results];
    }
    Movie.create(allMovies, (e, r) => {
      if (e) console.error(e)
      console.log('Successfully saved!');
    });
  } catch (error) {
    console.error(error)
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
