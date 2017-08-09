// MongoDB + Mongoose code

// const mongodb = require('mongodb');
const mongoose = require('mongoose');

// Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;

const config = require('../config/mongoose.config');

mongoose.connect(config.uri, config.options);

const db = mongoose.connection;

db.on('error', err => {
  console.error(`Unable to connect to MongoDB database ${config.uri}:\n`, err);
});

db.once('open', () => {
  console.log(`Connection to MongoDB database ${config.uri} has been established successfully! :)`);
});

module.exports = mongoose;
