const express = require('express');
const controller = require('../../controllers/columns.controller');

// const { authorize, ADMIN, LOGGED_USER } = require('../../middleware/auth');
// const {
//   listUsers,
//   createUser,
//   replaceUser,
//   updateUser,
// } = require('../../validations/user.validation');

const router = express.Router();

router
  .route('/')
  .get(controller.list)
  .post(controller.create)
  .patch(controller.update);

module.exports = router;
