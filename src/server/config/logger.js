// * Read: http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
// * Expect: should show log in console as well store in a file.
// ? is winston is really required based on latest version of morgan ??
var winston = require('winston');

// eslint-disable-next-line new-cap
var logger = new winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
module.exports.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};
