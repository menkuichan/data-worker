const http = require('http');
const mongoose = require('mongoose');
const { CronJob } = require('cron');
const _ = require('lodash');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // eslint-disable-line
}

const { Movie, Genre } = require('./src/models');
const { getMovies, getGenres } = require('./src/api');

const createOrUpdateItem = (data, model) => {
  data.forEach(async (value) => {
    const res = await model.findOne({ id: value.id }, { _id: 0 });
    if (!res) {
      model.create(value, (error) => {
        if (error) console.error(error);
      });
    } else if (!_.isEqual(value, { ...res._doc })) {
      model.findOneAndUpdate({ id: value.id }, value, (error) => {
        if (error) console.error(error);
      });
    }
  });
};

const populateDB = async () => {
  try {
    let movies = [];
    const promises = [];

    const { genres } = await getGenres();

    createOrUpdateItem(genres, Genre);

    const data = await getMovies(1); // eslint-disable-line
    movies = [...movies, ...data.results];

    for (let i = 2; i <= data.total_pages; i++) { // eslint-disable-line
      promises.push(getMovies(i));
    }

    const result = await Promise.all(promises);

    const flattenMovies = result
      .map(({ results }) => results)
      .reduce((a, b) => a.concat(b), []);

    movies = [...movies, ...flattenMovies];

    createOrUpdateItem(movies, Movie);
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
