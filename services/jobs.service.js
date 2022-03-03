const { Jobs } = require('../models');

/**
 * Creating Job
 * @param {Object} payload
 * @returns
 */
exports.addJob = async (payload = {}) => {
  const job = await Jobs.create(payload);
  return job;
};
