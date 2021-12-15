const express = require('express');
const { validate } = require('express-validation');
const { createProject, updateProject } = require('../../validations/projects.validation');
const controller = require('../../controllers/projects.controller');

const router = express.Router();

/**
 * Load project when API with projectId route parameter is hit
 */
router.get('/:projectId', controller.show);
// router.get('/project', controller.load);
router
  .route('/')
  .post(validate(createProject), controller.create)
  .patch(validate(updateProject), controller.update)
  .get(controller.list);

module.exports = router;
