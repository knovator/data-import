const express = require('express');
const { validate } = require('express-validation');
const { createProject, updateProject } = require('../../validations/projects.validation');
const controller = require('../../controllers/projects.controller');

const router = express.Router();

/**
 * Load project when API with projectId route parameter is hit
 */
router.param('projectId', controller.load);

router
  .route('/')
  .post(validate(createProject), controller.create)
  .patch(validate(updateProject), controller.update)
  .get(controller.list);

// router.route('/add').post(validate(createProject), controller.create);

module.exports = router;
