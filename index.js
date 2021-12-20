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

be2db351ac9b
dc176bb2a72b
1a7d4b86b46b
90cb47edc11e
77ff01842285
adf76923a247
d1d1b035a00e
9e5f556851cd
fcfa7883dccb
705c7ea31541
03713a72537e
0da57582c2d1
b23dcdaee3e3
b12c716fdae0
5ada93c1d31c
9b2be4277af6
332c685c1f14