const path = require('path');
// import .env variables
require('dotenv-safe').config({
  allowEmptyValues: true,
  path: path.join(__dirname, './../.env'),
  example: path.join(__dirname, './../.env.example')
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_DB_URI_TESTS : process.env.MONGO_DB_URI
  },
  session: {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  },
  redditMQConn: process.env.REDDIT_MQ_CONN
};
