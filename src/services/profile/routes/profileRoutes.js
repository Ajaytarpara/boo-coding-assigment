/**
 * userRoute.js
 * @description :: routes of authentication APIs
 */

const express = require('express');
const router = express.Router();
const auth = require('../../../server/middleware/auth');
const {
    createProfileController,
    listProfileController,
    profileDetailsController,
    profileFeedbackController,
    feedbackReactionController
} = require('../controllers');
const { ProfileValidation } = require('../validation');

// auth Route
router.post('/', ProfileValidation.createProfile, createProfileController);
router.post('/list', ProfileValidation.listProfiles, listProfileController);
router.post('/details/:profileId', ProfileValidation.profileDetails, profileDetailsController);
router.post('/feedback/:profileId', auth(), ProfileValidation.profileFeedback, profileFeedbackController);
router.put('/reaction/:profileId/:feedbackId', auth(), ProfileValidation.feedbackReaction, feedbackReactionController);

module.exports = router;
