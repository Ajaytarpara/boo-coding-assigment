const Profile = require('../../../db/model/profile');
const ProfileFeedback = require('../../../db/model/profileFeedback');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');

/**
 * @description : profileFeedbackController 
 * @param {Object} req : request for profileFeedbackController 
 * @param {Object} res : response for profileFeedbackController
 * @return {Object} : response for profileFeedbackController {status, message, data}
 */
const profileFeedbackController = async (req, res) => {
    try {
        let body = req.body;
        let loginUser = req.user;
        let params = req.params;
        const findProfileData = await dbService.findOne(Profile, { _id: params.profileId });
        if (!findProfileData) {
            return res.badRequest({ message: MESSAGE.PROFILE.PROFILE_NOT_FOUND });
        }
        let createBody = {
            ...body,
            profileId: params.profileId,
            userId: loginUser.id,
        }
        const createProfileFeedback = await dbService.create(ProfileFeedback, createBody);
        if (!createProfileFeedback) {
            return res.failure({ message: MESSAGE.PROFILE.PROFILE_FEEDBACK_CREATE_FAILED });
        }
        return res.success({
            data: createProfileFeedback,
            message: MESSAGE.PROFILE.PROFILE_FEEDBACK_CREATE_SUCCESS,
        });
    } catch (error) {
        return res.internalServerError({ data: error.message });
    }
};

module.exports = profileFeedbackController