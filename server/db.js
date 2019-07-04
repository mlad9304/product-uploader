const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./logger');

mongoose.Promise = global.Promise;

const connection = mongoose.connect(config.database.uri);

connection
  .then(db => {
    logger.dbConnected(config.database.uri, config.env);
    return db;
  })
  .catch(err => {
    if (err.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      mongoose.connect(config.database.uri);
    } else {
      logger.error('Error while attempting to connect to database:');
      logger.error(err);
    }
  });

module.exports = connection;
