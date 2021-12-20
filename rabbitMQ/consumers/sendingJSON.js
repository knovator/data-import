require('core-js/stable');
require('regenerator-runtime/runtime');
const fetchUrl = require('@knovator/api').default;
const { setAPIConfig } = require('@knovator/api');
const map = require('lodash/map');
const chunk = require('lodash/chunk');
const { QUEUES } = require('./../../utils/constant');
const { jobStartLog, jobEndLog, jobErrorLog } = require('./../../utils/log');

/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async msg => {
  jobStartLog(QUEUES.sendingJSON, msg.fields);
  try {
    const data = JSON.parse(msg.content) || {};
    const { template = {}, response = [], errors, ...other } = data;
    const rows = map(response, x => x.rows).flat();

    if (!template.callback) return new Error('Callback Url Not Found !');

    setAPIConfig({
      baseUrl: template.callback.u,
      handleCache: false
    });

    const chunkedData = chunk(rows, 1000);
    const promise = map(chunkedData, data =>
      fetchUrl({
        url: '/',
        method: template.callback.m,
        data: {
          template,
          ...other,
          rows: data
        }
      })
    );

    const jobPayload = {
      ...msg.fields,
      tId: template.id,
      uId: other.user?.id,
      details: {
        errors,
        sheet: '',
        dataLength: rows.length
      }
    };

    await Promise.all(promise).then(async e => {
      // const service = require('./../../services/jobs.service');
      // await service.addJob(jobPayload);
      console.log(
        '--------------------------------------> JOB IS DONE <-----------------------------------'
      );
    });
    jobEndLog(QUEUES.sendingJSON);
  } catch (e) {
    jobErrorLog(QUEUES.sendingJSON, e);
    return e;
  }
};
