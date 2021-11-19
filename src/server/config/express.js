const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('../routes/v1');
const { logs } = require('./vars');
const logger = require('./logger');

// * will use it later
// const passport = require('passport');
// const strategies = require('./passport');

const error = require('./error');

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs, { stream: logger.stream }));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.options('*', cors()); // for now allow it

// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// enable authentication
// app.use(passport.initialize());
// passport.use('jwt', strategies.jwt);
// passport.use('facebook', strategies.facebook);
// passport.use('google', strategies.google);

// mount api v1 routes
app.use('/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// Serve React Application
// if (NODE_ENV !== 'development') {
// app.use(express.static('dist'));
// }

module.exports = app;
