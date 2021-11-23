const httpStatus = require('http-status');
const { Templates } = require('../models');
const APIError = require('../errors/api-error');
const XLSX = require('xlsx');
// const chunk = require('lodash/chunk');
const path = require('path');
const { columnsToJoiSchema, mapColNameToKey } = require('../utils/helper');
const { isEmpty } = require('lodash');

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
  return Templates.findOne({ _id: templateId }).populate('columns');
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
  const template = await this.getTemplateById(templateId);
  // console.log('tem ===> ', tem);

  // const { dataLimit = 1000, cbkUrl } = template;
  const { files = [] } = req.files;

  if (!files.length) return new APIError(httpStatus.EXPECTATION_FAILED);

  const [file] = files;

  // TODO: Set Directory based on user and it's project
  const filePath = path.resolve(path.join(__dirname, '../resources/' + file.filename));

  // reading XLSX/CSV file
  const workbook = XLSX.readFile(filePath);

  /**
   * All Sheets and their data list
   * @param {Array} SheetNames => Sheets List
   * @param {Object} Sheets => data list
   *  */

  const { Sheets, SheetNames } = workbook;

  const payload = [];
  const errors = [];
  const response = [];

  SheetNames.forEach(Sheet => {
    // converting sheet's data into JSON
    const data = XLSX.utils.sheet_to_json(Sheets[Sheet]);
    // pushing data into payload
    payload.push({
      Sheet,
      data
    });
  });

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

  if (errors.length > 0) {
    const apiError = new APIError({
      message:
        "Requested file didn't pass the required validations. Please check your mail for more details.",
      status: httpStatus.EXPECTATION_FAILED,
      stack: errors
    });

    return next(apiError);
  }

  res.send({
    template,
    // schema: schema.describe(),
    response,
    errors
  });
};
