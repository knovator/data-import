const express = require('express');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */

router.use('/users', require('./users.route'));
router.use('/projects', require('./projects.route'));
router.use('/templates', require('./templates.route'));
router.use('/columns', require('./columns.route'));

module.exports = router;
