const httpStatus = require('http-status');

const { Columns } = require('../models');

/**
 * Load column and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const column = await Columns.get(id);
    req.locals = { column };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get column list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const columns = await Columns.paginate(req.query);
    res.json(columns);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {column} req
 * @param {id, firstName, lastName} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const column = new Columns(req.body);
    const saved = await column.save();
    res.status(httpStatus.CREATED);
    res.json(saved);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing column
 * @public
 */
exports.update = (req, res, next) => {
  console.log('req', req.body, req.query);
  res.send(httpStatus.OK);
};
