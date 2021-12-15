const processFile = require('./consumers/processingFiles');
const convert2JSON = require('./consumers/convertingToJSON');
const sendJSON = require('./consumers/sendingJSON');

exports.processFile = processFile;
exports.convert2JSON = convert2JSON;
exports.sendJSON = sendJSON;
