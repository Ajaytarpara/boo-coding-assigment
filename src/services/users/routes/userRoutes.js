/**
 * userRoute.js
 * @description :: routes of authentication APIs
 */

const express = require('express');
const router = express.Router();
const auth = require('../../../server/middleware/auth');
const {
    loginController,
} = require('../controllers');
const { AuthValidation } = require('../validation');

// auth Route
router.post('/login', AuthValidation.login, loginController);

module.exports = router;
