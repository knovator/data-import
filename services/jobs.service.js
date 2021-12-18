const { Jobs } = require('../models');

/**
 * Creating Job
 * @param {Object} payload
 * @returns
 */
exports.addJob = async (payload = {}) => {
  const job = new Jobs(payload);
  const saved = await job.save();
  return saved;
};
