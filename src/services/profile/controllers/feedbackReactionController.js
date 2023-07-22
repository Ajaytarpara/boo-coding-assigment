const ProfileFeedback = require('../../../db/model/profileFeedback');
const FeedbackReaction = require('../../../db/model/feedbackReaction');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');

/**
 * @description : feedbackReactionController
 * @param {Object} req : request for feedbackReactionController 
 * @param {Object} res : response for feedbackReactionController
 * @return {Object} : response for feedbackReactionController {status, message, data}
 */
const feedbackReactionController = async (req, res) => {
    try {
        let body = req.body;
        let params = req.params;
        let loginUser = req.user;
        const findProfileFeedbackData = await dbService.findOne(ProfileFeedback, { _id: params.feedbackId, profileId: params.profileId });
        if (!findProfileFeedbackData) {
            return res.badRequest({ message: MESSAGE.PROFILE.PROFILE_FEEDBACK_NOT_FOUND });
        }
        let createBody = {
            ...body,
            profileId: params.profileId,
            feedbackId: params.feedbackId,
            userId: loginUser.id,
        }
        const upsertFeedbackReaction = await dbService.updateOne(
            FeedbackReaction,
            {
                profileId: params.profileId,
                feedbackId: params.feedbackId,
                userId: loginUser.id,
            },
            createBody,
            { upsert: true, new: true });
        if (!upsertFeedbackReaction) {
            return res.failure({ message: MESSAGE.PROFILE.FEEDBACK_REACTION_CREATE_FAILED });
        }
        return res.success({
            data: upsertFeedbackReaction,
            message: MESSAGE.PROFILE.FEEDBACK_REACTION_CREATE_SUCCESS,
        });
    } catch (error) {
        return res.internalServerError({ data: error.message });
    }
};

module.exports = feedbackReactionController