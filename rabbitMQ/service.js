/* eslint-disable handle-callback-err */
const amqp = require('amqplib/callback_api');
const vars = require('../config/vars');
let ch = null;

amqp.connect(vars.redditMQConn, function(err, conn) {
  conn.createChannel(function(err, channel) {
    ch = channel;
  });
});

process.on('exit', code => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});

exports.publishToQueue = async (queueName, data) => {
  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
};
