const mongoose = require('mongoose');
const logger = require('./logger');
const { mongo, env } = require('./vars');

console.log('db url ::::', mongo);
// Exit application on error
mongoose.connection.on('error', err => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */
exports.connect = async () => {
  await mongoose
    .connect(mongo.uri, {
      // useCreateIndex: true, // not supported
      keepAlive: 1,
      useNewUrlParser: true,
      useUnifiedTopology: true
      // useFindAndModify: false
    })
    .then(() => console.log('mongoDB connected...'));
  return mongoose.connection;
};
