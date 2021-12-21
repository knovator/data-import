/* eslint-disable handle-callback-err */
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
  persistent: true
});

process.on('exit', code => {
  chanelWrapper.close();
  console.log(`Closing rabbitMQ channel`);
});

exports.publishToQueue = async (queueName, data) => {
  chanelWrapper.sendToQueue(queueName, data, { durable: false });
};
