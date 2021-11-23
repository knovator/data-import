const httpStatus = require('http-status');

const { Users } = require('../models');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await Users.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await Users.paginate(req.query);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Find All Users
 * @public
 */
exports.findAll = async (req, res) => {
  Users.find({}, (err, docs) => {
    if (err) {
      console.log(`Error: ` + err);
    } else {
      if (docs.length === 0) {
        console.log('message');
      } else {
      }
    }
  });
};

exports.create = async (req, res, next) => {
  try {
    const user = new Users(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(error);
  }
};
