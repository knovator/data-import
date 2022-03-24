const validate = validator => {
  return async function(req, res, next) {
    try {
      req.body = await validator.validateAsync(req.body);
      next();
    } catch (err) {
      if (err.isJoi) return next(err);
      next(err);
    }
  };
};

module.exports = validate;
