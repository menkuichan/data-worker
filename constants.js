const MAX_TOTAL_PAGES = 500;

const BASE_TMDB_URL = 'https://api.themoviedb.org/3/';

const TMDB_PARAMS = {
  URL: `${BASE_TMDB_URL}movie/`,
  SEARCH_URL: `${BASE_TMDB_URL}search/movie`,
};

const URL_TYPES = [
  'popular',
  'upcoming',
  'now_playing',
];

module.exports = { MAX_TOTAL_PAGES, TMDB_PARAMS, URL_TYPES };
