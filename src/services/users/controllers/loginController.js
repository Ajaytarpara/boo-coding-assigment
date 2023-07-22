const User = require('../../../db/model/user');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');
const { generateToken } = require('../helpers/generateToken');
const { JWT } = require('../../shared/constants/authConstant');

/**
 * @description : login with username and password
 * @param {Object} req : request for login 
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */
const login = async (req, res) => {
    try {
        let body = req.body;
        const findOrCreateUserData = await dbService.updateOne(User, body, body, { upsert: true, new: true });
        if (!findOrCreateUserData) {
            return res.badRequest({ message: MESSAGE.LOGIN.FAILED_TO_CREATE_USER });
        }
        let token = await generateToken({ _id: findOrCreateUserData.id }, JWT.CLIENT_SECRET);
        return res.success({
            data: token,
            message: MESSAGE.LOGIN.LOGIN_SUCCESS,
        });
    } catch (error) {
        console.log(error)
        return res.internalServerError({ data: error.message });
    }
};

module.exports = login