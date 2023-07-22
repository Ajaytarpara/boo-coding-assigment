/**
 * index.js
 * @description :: index route file of client platform.
 */

const express = require('express');
const router = express.Router();

router.use('/v1/user', require('./users/routes/userRoutes'));
router.use('/v1/profile', require('./profile/routes/profileRoutes'));

module.exports = router;
