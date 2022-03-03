const { Workbooks } = require('../models');

/**
 * Creating Job
 * @param {Object} payload
 * @returns
 */
exports.addWorkbook = async (payload = {}) => {
  const job = await Workbooks.create(payload);
  return job._id;
};
