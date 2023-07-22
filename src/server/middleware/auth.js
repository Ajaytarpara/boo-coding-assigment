/**
 * auth.js
 * @description :: middleware that checks authentication and authorization of user
 */

const passport = require('passport');
const { MESSAGE } = require('../../services/shared/constants/messageConstant')

/**
 * @description : returns callback that verifies required rights and access
 * @param {Object} req : request of route.
 * @param {callback} resolve : resolve callback for succeeding method.
 * @param {callback} reject : reject callback for error.
 * @param {int} platform : platform
 */
const verifyCallback = (req, resolve, reject, platform) => async (error, user, info) => {
  if (error || info || !user) {
    return reject(MESSAGE.LOGIN.UNAUTHORIZED_USER);
  }
  req.user = user;
  resolve();
};

/**
 * @description : authentication middleware for request.
 * @param {Object} req : request of route.
 * @param {Object} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 * @param {int} platform : platform
 */
const auth = (platform) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('client-rule', { session: false }, verifyCallback(req, resolve, reject, platform))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((error) => {
        return res.unAuthorized({ message: error.message });
      });
};

module.exports = auth;
