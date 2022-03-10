const { QUEUES } = require('../../utils/constant');
const XLSX = require('xlsx');
const { publishToQueue } = require('../service');
const { jobStartLog, jobEndLog, jobErrorLog } = require('../../utils/log');
const { mongo, env } = require('./../../config/vars');
const mongoose = require('mongoose');
const { getWorkbookById } = require('../../services/templates.service');

/**
 *
 * @param {*} msg
 * @param { consumerTag, deliveryTag, redelivered, exchange, routingKey } msg.fields
 * @returns nothing
 */
module.exports = async function(msg) {
  jobStartLog(QUEUES.processingFile, msg.fields);

  try {
    // converting buffer data to Object
    const data = JSON.parse(msg.content) || {};
    /**
     * reading XLSX/CSV file, All Sheets and their data list
     * @param {Array} SheetNames => Sheets List
     * @param {Object} Sheets => data list
     *  */
    const { workbook, ...rest } = data || {};
    const { Sheets, SheetNames } = workbook.workbook;

    const payload = [];
    SheetNames.forEach(Sheet => {
      // converting sheet's data into JSON
      const data = XLSX.utils.sheet_to_json(Sheets[Sheet]);
      // pushing data into payload
      payload.push({
        Sheet,
        data
      });
    });
    jobEndLog(QUEUES.processingFile);
    await publishToQueue(QUEUES.convertingToJSON, { payload, ...rest });
  } catch (e) {
    jobErrorLog(QUEUES.processingFile, e);
    return e;
  }
};
