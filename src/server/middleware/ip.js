exports.handleIp = (req, res, next) => {
  req.body.updateIP = req.ip;
  next();
};
