/**
 * authConstant.js
 * @description :: constants used in authentication
 */
const config = require('../../../config');

module.exports = {
  JWT: {
    CLIENT_SECRET: process.env.JWT_CLIENT_SECRET,
    EXPIRES_IN: 2592000 // 30 days in seconds
  },
  PLATFORM: { CLIENT: 1 }
};