const Profile = require('../../../db/model/profile');
const ProfileFeedback = require('../../../db/model/profileFeedback');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');
const mongoose = require('mongoose');

/**
 * @description : profileDetailsController
 * @param {Object} req : request for profileDetailsController 
 * @param {Object} res : response for profileDetailsController
 * @return {Object} : response for profileDetailsController {status, message, data}
 */
const profileDetailsController = async (req, res) => {
    try {
        let params = req.params;
        let body = req.body;
        const findProfileData = await dbService.findOne(Profile, { _id: params.profileId });
        if (!findProfileData) {
            return res.badRequest({ message: MESSAGE.PROFILE.PROFILE_NOT_FOUND });
        }
        const profileId = params.profileId;
        const sortBy = body.sortBy || "likes"   // possible value ["likes",'createdAt']
        const filter = body.filter || {};
        const sortOrder = body.sortOrder || -1; // -1 for descending (highest first), 1 for ascending (lowest first)
        const page = body.page || 1;            // The page number (1-based index)
        const pageSize = body.pageSize || 10;    // Number of records per page

        let profileData = await ProfileFeedback.aggregate([
            {
                $match: {
                    profileId: mongoose.Types.ObjectId(profileId), // Filter based on profileId
                    ...filter
                }
            },
            {
                $lookup: {
                    from: "feedbackreactions",
                    localField: "_id",
                    foreignField: "feedbackId",
                    as: "reactions"
                }
            },
            {
                $addFields: {
                    likes: {
                        $size: {
                            $filter: {
                                input: "$reactions",
                                as: "reaction",
                                cond: { $eq: ["$$reaction.isLiked", true] }
                            }
                        }
                    }
                }
            },
            {
                $sort: {
                    [sortBy]: sortOrder // Sort based on 'likes' or 'createdAt'
                }
            },
            {
                $skip: (page - 1) * pageSize // Skip records for pagination
            },
            {
                $limit: pageSize // Limit the number of records per page
            },
            {
                $project: {
                    _id: 1,
                    profileId: 1,
                    userId: 1,
                    mbti: 1,
                    enneagram: 1,
                    zodiac: 1,
                    title: 1,
                    comment: 1,
                    likes: 1,
                    createdAt: 1
                }
            }
        ]);
        return res.success({
            data: profileData,
            message: MESSAGE.PROFILE.PROFILE_CREATE_SUCCESS,
        });
    } catch (error) {
        return res.internalServerError({ data: error.message });
    }
};

module.exports = profileDetailsController