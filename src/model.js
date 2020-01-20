const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieScheme = new Schema({
  _id: Number,
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
  backdrop_path: String,
  video: Boolean,
});

const genreScheme = new Schema({
  _id: Number,
  name: String,
});

const Movie = mongoose.model('Movie', movieScheme);

const Genre = mongoose.model('Genre', genreScheme);

module.exports = { Movie, Genre };
