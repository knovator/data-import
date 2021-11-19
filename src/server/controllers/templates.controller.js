const httpStatus = require('http-status');

const { Templates } = require('../models');

/**
 * Load template and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const template = await Templates.get(id);
    req.locals = { template };
    return next();
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
