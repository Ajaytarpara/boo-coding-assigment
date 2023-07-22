/**
 * auth.js
 * @description :: functions used in authentication
 */

const { JWT } = require('../../shared/constants/authConstant');
const jwt = require('jsonwebtoken');

/**
 * @description : generate JWT token for authentication.
 * @param {Object} payload : payload from who wants to login.
 * @param {string} secret : secret for JWT.
 * @return {string}  : returns JWT token.
 */
const generateToken = async (payload, secret) => {
  return jwt.sign(payload, secret, { expiresIn: JWT.EXPIRES_IN });
};

module.exports = {
  generateToken
};