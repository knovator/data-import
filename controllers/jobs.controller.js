const httpStatus = require('http-status');
const service = require('./../services/jobs.service');

const { Jobs } = require('../models');

/**
 *
 * @param { consumerTag, deliveryTag, exchange, routingKey etc } req
 * @param { message } res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const job = await service.addJob(req.body);
    res.status(httpStatus.CREATED);
    res.json(job);
  } catch (error) {
    next(error);
  }
};
