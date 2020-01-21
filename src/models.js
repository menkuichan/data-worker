const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieScheme = new Schema({
  id: Number,
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
}, { versionKey: false });

const genreScheme = new Schema({
  id: Number,
  name: String,
}, { versionKey: false });

const Movie = mongoose.model('Movie', movieScheme);

const Genre = mongoose.model('Genre', genreScheme);

module.exports = { Movie, Genre };
