const httpStatus = require('http-status');

const { Projects } = require('../models');

/**
 * Load project and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const project = await Projects.get(id);
    req.locals = { project };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get project list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const projects = await Projects.paginate(req.query);
    // const transformedProjects = projects.map(project => Projects.transform());
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {Project} req
 * @param {id, firstName, lastName} res
 * @param {*} next
 */
exports.create = async (req, res, next) => {
  try {
    const project = new Projects(req.body);
    const saved = await project.save();
    res.status(httpStatus.CREATED);
    res.json(saved);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing project
 * @public
 */
exports.update = (req, res, next) => {
  console.log('req', req.body, req.query);
  res.send(httpStatus.OK);
};
