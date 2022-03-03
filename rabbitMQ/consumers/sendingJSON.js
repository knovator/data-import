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
    const { chunkSize = 500 } = template;
    const rows = map(response, x => x.rows).flat();

    if (!template.callback) return new Error('Callback Url Not Found !');

    if (errors.length) {
      console.log({ errors });
    } else {
      console.table({
        Project: template.p?.nm,
        Template: template.nm,
        User: other?.user?.name,
        Company: other?.company?.name,
        Total: rows.length,
        'Callback Method': template.callback?.method,
        'Callback Url': template.callback?.url
      });
    }

    setAPIConfig({
      baseUrl: template.callback.url,
      handleCache: false
    });

    const chunkedData = chunk(rows, chunkSize);
    const promise = map(chunkedData, data =>
      fetchUrl({
        url: '',
        type: template.callback.method,
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
