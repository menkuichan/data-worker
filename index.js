const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const movieScheme = new Schema({
  title: String,
  overview: String,
  releaseDate: String,
  genresIds: [{
    type: String,
  }],
  voteAverage: Number,
  popularity: Number,
  originalLanguage: String,
  voteCount: Number,
  originalTitle: String,
  posterPath: String,
  totalPages: Number,
});

const Movie = mongoose.model('Movie', movieScheme);

mongoose.connect(`mongodb://localhost/${process.env.APP_PORT}`, { useNewUrlParser: true });

const firstMovie = new Movie({
  title: 'Fight Clup',
});

firstMovie.save(() => {
  console.log(firstMovie.title);
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(process.env.APP_PORT, () => {
  console.log(`Server running at port: ${process.env.APP_PORT}`);
});
