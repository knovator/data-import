const httpStatus = require('http-status');

const { Templates } = require('../models');
const templateService = require('../services/templates.service');

/**
 * Load template and append to req.
 * @public
 */
exports.load = async (req, res, next) => {
  try {
    const template = await templateService.getTemplateById(req.params.templateId);
    res.send(template);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get template list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const templates = await Templates.paginate(req.query);
    res.json(templates);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {template} req
 * @param {id, firstName, lastName} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const { file } = req;
    const payload = req.body;
    if (file) {
      payload.sample = {
        fNm: file.filename,
        oNm: file.originalName,
        enc: file.encoding,
        path: file.path,
        s: file.size,
        mT: file.mimetype
      };
    }
    const template = new Templates(payload);
    const saved = await template.save();
    res.status(httpStatus.CREATED);
    res.json(saved);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing template
 * @public
 */
exports.update = (req, res, next) => {
  console.log('req', req.body, req.query);
  res.send(httpStatus.OK);
};

/**
 * Process File to JSON
 * @private
 */
exports.process = async (req, res, next) => {
  await templateService.processData(req, res, next);
};
