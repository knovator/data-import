const httpStatus = require('http-status');

const { User } = require('../models');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
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
    const users = await User.paginate(req.query);
    // const transformedUsers = users.map(user => user.transform());
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
  User.find({}, (err, docs) => {
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
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(error);
  }
};
