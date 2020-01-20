const http = require('http');
const mongoose = require('mongoose');
const { CronJob } = require('cron');

const { Movie, Genre } = require('./src/model');
const { getMovies, getGenres } = require('./src/api');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const renameObjectKey = (
  oldName,
  newName,
  {
    [oldName]: value,
    ...others
  },
) => ({
  [newName]: value,
  ...others,
});

const populateDB = async () => {
  try {
    let movies = [];
    const promises = [];

    const { genres } = await getGenres();
    const genresWithId = genres.map((genre) => renameObjectKey('id', '_id', genre));

    Genre.create(genresWithId, (error) => {
      if (error) console.error(error);
      else console.log('Genres saved successfully!');
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

    const moviesWithId = movies.map((movie) => renameObjectKey('id', '_id', movie));

    Movie.create(moviesWithId, (error) => {
      if (error) console.error(error);
      else console.log('Movies saved successfully!');
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
