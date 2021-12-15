/* eslint-disable handle-callback-err */
var amqp = require('amqplib/callback_api');
const { QUEUES } = require('../utils/constant');
const { processFile, convert2JSON, sendJSON } = require('./consumer');
const vars = require('../config/vars');

amqp.connect(vars.redditMQConn, function(err, conn) {
  conn.createChannel(
    function(err, ch) {
      ch.assertQueue(QUEUES.convertingToJSON, { durable: true });
      ch.assertQueue(QUEUES.processingFile, { durable: true });
      ch.assertQueue(QUEUES.sendingJSON, { durable: true });

      ch.consume(QUEUES.processingFile, processFile);
      ch.consume(QUEUES.convertingToJSON, convert2JSON);
      ch.consume(QUEUES.sendingJSON, sendJSON);
    },
    { noAck: true, persistent: true }
  );
});
