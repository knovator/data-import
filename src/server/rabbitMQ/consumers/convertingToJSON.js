const { QUEUES } = require('../../utils/constant');
const { publishToQueue } = require('../service');
const { columnsToJoiSchema, mapColNameToKey } = require('../../utils/helper');
const { isEmpty } = require('lodash');

/**
 *
 * @param {*} msg
 * @returns nothing
 */
module.exports = async msg => {
  const { payload, template, ...rest } = JSON.parse(msg.content) || {};
  const errors = [];
  const response = [];
  const schema = await columnsToJoiSchema(template.columns);
  const nameToKeyMapping = await mapColNameToKey(template.columns);

  // do validation and manage errors
  payload.forEach(sheet => {
    const rows = [];
    sheet.data.flat().forEach((data, dIndex) => {
      const obj = {};
      Object.entries(nameToKeyMapping).forEach(entry => {
        const [name, key] = entry;
        obj[key] = data[name];
      });
      const { error, value } = schema.validate(obj);
      if (!isEmpty(value)) rows.push(value);
      if (error)
        errors.push({
          Sheet: sheet.Sheet,
          rowNumber: dIndex,
          data: error._original,
          error: error.details
        });
    });
    response.push({
      sheet: sheet.Sheet,
      rows
    });
  });
  await publishToQueue(QUEUES.sendingJSON, { template, response, errors, ...rest });
};
