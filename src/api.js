const axios = require('axios');

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

const getGenres = () => (
  axiosInstance.get('genre/movie/list', {
    params: {
      api_key: process.env.TMDB_API_KEY,
    },
  })
);

module.exports = { getMovies, getGenres };
