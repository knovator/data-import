const httpStatus = require('http-status');
const { Templates } = require('../models');
const APIError = require('../errors/api-error');
const path = require('path');
const { QUEUES } = require('../utils/constant');
const { publishToQueue } = require('./../rabbitMQ/service');

const XLSX = require('xlsx');
const { addWorkbook } = require('./workbooks.service');

/**
 * Create a template
 * @param {Object} TemplateBody
 * @returns {Promise<Template>}
 */
exports.createTemplate = async templateBody => {
  const template = await Templates.create(templateBody);
  return template;
};

/**
 * Get template by id
 * @param {ObjectId} templateId
 * @returns {Promise<Template>}
 */
exports.getTemplateById = async templateId => {
  return Templates.findById(templateId).populate('columns');
};

/**
 * Query for cities
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
// const queryCities = async (filter, options) => {
//   const cities = await Template.paginate(filter, options);
//   return cities;
// };

/**
 * Update template by id
 * @param {ObjectId} templateId
 * @param {Object} updateBody
 * @returns {Promise<Template>}
 */
exports.updateTemplateById = async (templateId, updateBody) => {
  const template = await this.getTemplateById(templateId);
  if (!template) {
    throw new APIError(httpStatus.NOT_FOUND);
  }
  Object.assign(template, updateBody);
  await template.save();
  return template;
};

/**
 * Delete template by id
 * @param {ObjectId} templateId
 * @returns {Promise<Template>}
 */
exports.deleteTemplateById = async templateId => {
  const template = await this.getTemplateById(templateId);
  if (!template) {
    throw new APIError(httpStatus.NOT_FOUND);
  }
  await template.remove();
  return template;
};

/**
 * Process Excel based on template
 * @param {ObjectId} templateId
 * @param {File} excelFile
 * @return {JSON} calls callback url with JSON data
 */
exports.processData = async (req, res, next) => {
  const { templateId } = req.params;
  let { additionalData } = req.body;
  const { files = [] } = req.files;
  const [file] = files;

  if (!files.length) return new APIError(httpStatus.EXPECTATION_FAILED);

  const filePath = path.resolve(path.join(__dirname, '../resources/' + file.filename));
  const template = await this.getTemplateById(templateId);
  additionalData = additionalData ? JSON.parse(additionalData) : {};

  const workbook = XLSX.readFile(filePath);

  const { Sheets, SheetNames } = workbook;
  const payload = [];

  const columns = template.columns.map(column => ({
    name: column.name,
    field: column.key
  }));

  await addWorkbook({
    workbook,
    columns,
    tId: templateId,
    uId: null // not considering for now.
  })

  SheetNames.forEach(Sheet => {
    // converting sheet's data into JSON
    // * It will read upto 156 columns
    const headers = XLSX.utils.sheet_to_json(Sheets[Sheet], { header: 1, range: 'A1-FZ1' });

    // pushing data into payload
    payload.push({
      Sheet,
      headers,
      columns,
      additionalData
    });
  });

  res.send({
    message: "Your file is processing, we'll update you via mail",
    payload
  });
};

exports.readExcel = async (req, res, next) => {
  const { templateId } = req.params;
  let { additionalData = '' } = req.body;
  const { files = [] } = req.files;
  const [file] = files;

  if (!files.length) return new APIError(httpStatus.EXPECTATION_FAILED);

  // TODO: Set Directory based on user and it's project
  const filePath = path.resolve(path.join(__dirname, '../resources/' + file.filename));
  res.send({
    message: "Your file is processing, we'll update you via mail"
  });

  const template = await this.getTemplateById(templateId);
  additionalData = additionalData ? JSON.parse(additionalData) : {};
  const payload = {
    filePath,
    template,
    ...additionalData
  };

  console.log('service calling it');
  await publishToQueue(QUEUES.processingFile, payload);
};
