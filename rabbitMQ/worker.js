/* eslint-disable handle-callback-err */
// var amqp = require('amqplib/callback_api');
require('@babel/core').transformSync('code', {
  plugins: ['@babel/plugin-transform-modules-commonjs']
});
const { QUEUES } = require('../utils/constant');
const { processFile, convert2JSON, sendJSON } = require('./consumer');
const vars = require('../config/vars');
const amqp = require('amqp-connection-manager');

// Create a new connection manager
const connection = amqp.connect([vars.redditMQConn]);
connection.on('connect', () => console.log('RabbitMQ::Connected!'));
connection.on('disconnect', err => console.log('RabbitMQ::Disconnected.', err));
// Ask the connection manager for a ChannelWrapper.  Specify a setup function to
// run every time we reconnect to the broker.
const chanelWrapper = connection.createChannel({
  json: true,
  persistent: false
});

chanelWrapper.addSetup(channel => {
  return Promise.all([
    channel.assertQueue(QUEUES.convertingToJSON, {
      durable: false
      // exclusive: true,
      // autoDelete: true
    }),
    channel.assertQueue(QUEUES.processingFile, {
      durable: false
      // exclusive: true,
      // autoDelete: true
    }),
    channel.assertQueue(QUEUES.sendingJSON, {
      durable: false
      // exclusive: true,
      //  autoDelete: true
    }),
    channel.consume(QUEUES.processingFile, processFile, { noAck: true }),
    channel.consume(QUEUES.convertingToJSON, convert2JSON, { noAck: true }),
    channel.consume(QUEUES.sendingJSON, sendJSON, { noAck: true })
  ]);
});
