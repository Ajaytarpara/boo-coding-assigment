const Profile = require('../../../db/model/profile');
const dbService = require('../../../utils/dbService');
const { MESSAGE } = require('../../shared/constants/messageConstant');

/**
 * @description : listProfileController 
 * @param {Object} req : request for listProfileController 
 * @param {Object} res : response for listProfileController
 * @return {Object} : response for listProfileController {status, message, data}
 */
const listProfileController = async (req, res) => {
    try {
        let body = req.body;
        const findProfileData = await dbService.paginate(Profile, {}, {
            page: body.page || 1,
            paginate: body.pageSize || 25
        });
        return res.success({
            data: findProfileData,
            message: MESSAGE.PROFILE.PROFILE_FETCH_SUCCESS,
        });
    } catch (error) {
        return res.internalServerError({ data: error.message });
    }
};

module.exports = listProfileController