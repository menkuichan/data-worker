const http = require('http');
const axios = require('axios');
const mongoose = require('mongoose');
const { CronJob } = require('cron');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const axiosInstance = axios.create({
  baseURL: process.env.TMDB_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
);

const getMovies = (page) => (
  axiosInstance.get('/discover/movie', {
    params: {
      api_key: process.env.TMDB_API_KEY,
      page,
    },
  })
);

const getGenres = () => (axiosInstance.get(
  'genre/movie/list', {
  params: {
    api_key: process.env.TMDB_API_KEY
  },
})
);

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

const genreScheme = new Schema({
  id: Number,
  name: String,
});

const Movie = mongoose.model('Movie', movieScheme);

const Genre = mongoose.model('Genre', genreScheme);

const populateDB = async () => {
  try {
    let movies = [];
    const promises = [];
    
    const { genres } = await getGenres();

    Genre.create(genres, (error) => {
      if (error) console.error(error);
      console.log('Genres saved successfully!');
    });

    const data = await getMovies(1); // eslint-disable-line
    movies = [...movies, ...data.results];

    for (let i = 2; i <= data.total_pages; i++) { // eslint-disable-line
      promises.push(getMovies(i));
    }

    const res = await Promise.all(promises);

    const flattenMovies = res
      .map(({ results }) => results)
      .reduce((a, b) => a.concat(b), []);

    movies = [...movies, ...flattenMovies];

    Movie.create(movies, (error) => {
      if (error) console.error(error);
      console.log('Movies saved successfully!');
    });
  } catch (error) {
    console.error(error);
  }
};

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error(error);
});

const job = new CronJob('0 0 12 * * * *', () => populateDB(), null, true, 'Europe/Minsk', null, true);

db.once('open', () => {
  job.start();
});

const server = http.createServer();

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
