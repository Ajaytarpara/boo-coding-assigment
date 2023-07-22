const Profile = require('../../../db/model/profile');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');

/**
 * @description : createProfileController
 * @param {Object} req : request for createProfileController 
 * @param {Object} res : response for createProfileController
 * @return {Object} : response for createProfileController {status, message, data}
 */
const createProfileController = async (req, res) => {
    try {
        let body = req.body;
        const createProfileData = await dbService.create(Profile, body, { upsert: true, new: true });
        if (!createProfileData) {
            return res.badRequest({ message: MESSAGE.PROFILE.FAILED_TO_CREATE_PROFILE });
        }
        return res.success({
            data: createProfileData,
            message: MESSAGE.PROFILE.PROFILE_CREATE_SUCCESS,
        });
    } catch (error) {
        return res.internalServerError({ data: error.message });
    }
};

module.exports = createProfileController