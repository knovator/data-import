import 'core-js/stable';
import 'regenerator-runtime/runtime';
const { port } = require('./config/vars');
const logger = require('./config/logger');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// open mongoose connection
mongoose.connect();

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port}`));

/**
 * Exports express
 * @public
 */
module.exports = app;
