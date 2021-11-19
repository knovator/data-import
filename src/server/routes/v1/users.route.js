const express = require('express');
const { validate } = require('express-validation');
const { createUser } = require('../../validations/users.validation');
const controller = require('../../controllers/users.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', controller.load);

router.route('/list').get(controller.findAll);

router
  .route('/')
  .post(validate(createUser), controller.create)
  .get(controller.list);

module.exports = router;
