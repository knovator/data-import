const httpStatus = require('http-status');
const { Templates, Workbooks } = require('../models');
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
 * Get workbook by id
 * @param {ObjectId} workbookId
 * @returns {Promise<Workbook>}
 */
exports.getWorkbookById = async workbookId => {
  return Workbooks.findById(workbookId);
};

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
 * Process Excel and read headers and save workbook into database
 * @param {ObjectId} templateId
 * @param {File} excelFile
 * @return {JSON} calls callback url with JSON data
 */
exports.processExcel = async (req, res, next) => {
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

  // setting default mapping value
  const columns = template.columns.map(column => ({
    name: column.name,
    mappedTo: column.name,
    field: column.key,
    active: true
  }));

  const saved = await addWorkbook({
    workbook,
    columns,
    additionalData,
    tId: templateId,
    uId: null, // not considering for now.
    startTime: new Date()
  });

  additionalData.workbookId = saved;

  SheetNames.forEach(Sheet => {
    // getting headers of excel files for mapping
    // * It will read upto 156 columns
    const headers = XLSX.utils.sheet_to_json(Sheets[Sheet], { header: 1, range: 'A1-FZ1' }).flat();

    // pushing data into payload
    payload.push({
      Sheet,
      headers,
      columns,
      workbookId: saved
    });
  });

  res.send({
    message: "Your file is processing, we'll update you via mail",
    payload
  });
};

/**
 * getting mapping data from user and retrieving data from excel workbook and converting to JSON
 * @param {headers, columns, workbookId} req
 * @param {*} res
 * @returns
 */
exports.workbookToJson = async (req, res, next) => {
  const { templateId } = req.params;
  let { workbookId, headers, columns } = req.body;

  if (!workbookId) return new APIError(httpStatus.EXPECTATION_FAILED);

  res.send({
    message: "Your file is processing, we'll update you via mail"
  });

  const template = await this.getTemplateById(templateId);
  const workbook = await this.getWorkbookById(workbookId);

  const payload = {
    columns,
    headers,
    workbook,
    template,
    workbookId
  };

  await publishToQueue(QUEUES.processingFile, payload);
};
