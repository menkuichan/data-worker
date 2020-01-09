const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

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
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
