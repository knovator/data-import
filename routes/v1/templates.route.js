const express = require('express');
const upload = require('../../middleware/upload');
const controller = require('../../controllers/templates.controller');

// const { authorize, ADMIN, LOGGED_USER } = require('../../middleware/auth');
// const {
//   listUsers,
//   createUser,
//   replaceUser,
//   updateUser,
// } = require('../../validations/user.validation');

const router = express.Router();

router.get('/:templateId', controller.load);

router
  .route('/')
  .get(controller.list)
  .post(upload.single('sample'), controller.create)
  .patch(upload.single('sample'), controller.update);

router
  .route('/:templateId/process-file')
  .post(upload.fields([{ name: 'files', maxCount: 2 }]), controller.processFile);

router.route('/:templateId/map-data').post(controller.mapDataToJson);

module.exports = router;
