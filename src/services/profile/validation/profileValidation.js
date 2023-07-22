const joiValidation = require('../../../server/middleware/validator')
const Joi = require('joi');
const { MBTI_TYPE, ENNEAGRAM_TYPE, ZODIAC_TYPE } = require('../../shared/constants/profileConstant');

async function createProfile(request, response, next) {
    const joiSchema = {
        body: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            mbti: Joi.string().valid(
                MBTI_TYPE.INFP,
                MBTI_TYPE.INFJ,
                MBTI_TYPE.ENFP,
                MBTI_TYPE.ENFJ,
                MBTI_TYPE.INTJ,
                MBTI_TYPE.INTP,
                MBTI_TYPE.ENTP,
                MBTI_TYPE.ENTJ,
                MBTI_TYPE.ISFP,
                MBTI_TYPE.ISFJ,
                MBTI_TYPE.ESFP,
                MBTI_TYPE.ESFJ,
                MBTI_TYPE.ISTP,
                MBTI_TYPE.ISTJ,
                MBTI_TYPE.ESTP,
                MBTI_TYPE.ESTJ,
            ).required(),
            enneagram: Joi.string().valid(
                ENNEAGRAM_TYPE['1w2'],
                ENNEAGRAM_TYPE['2w3'],
                ENNEAGRAM_TYPE['3w2'],
                ENNEAGRAM_TYPE['3w4'],
                ENNEAGRAM_TYPE['4w3'],
                ENNEAGRAM_TYPE['4w5'],
                ENNEAGRAM_TYPE['5w4'],
                ENNEAGRAM_TYPE['5w6'],
                ENNEAGRAM_TYPE['6w5'],
                ENNEAGRAM_TYPE['6w7'],
                ENNEAGRAM_TYPE['7w6'],
                ENNEAGRAM_TYPE['7w8'],
                ENNEAGRAM_TYPE['8w7'],
                ENNEAGRAM_TYPE['8w9'],
                ENNEAGRAM_TYPE['9w8'],
                ENNEAGRAM_TYPE['9w1'],
            ).required(),
            variant: Joi.string().required(),
            tritype: Joi.string().required(),
            socionics: Joi.string().required(),
            sloan: Joi.string().required(),
            psyche: Joi.string().required(),
            image: Joi.string().required()
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}
async function profileFeedback(request, response, next) {
    const joiSchema = {
        params: Joi.object({
            profileId: Joi.string().required(),
        }),
        body: Joi.object({
            comment: Joi.string(),
            title: Joi.string(),
            mbti: Joi.string().valid(
                MBTI_TYPE.INFP,
                MBTI_TYPE.INFJ,
                MBTI_TYPE.ENFP,
                MBTI_TYPE.ENFJ,
                MBTI_TYPE.INTJ,
                MBTI_TYPE.INTP,
                MBTI_TYPE.ENTP,
                MBTI_TYPE.ENTJ,
                MBTI_TYPE.ISFP,
                MBTI_TYPE.ISFJ,
                MBTI_TYPE.ESFP,
                MBTI_TYPE.ESFJ,
                MBTI_TYPE.ISTP,
                MBTI_TYPE.ISTJ,
                MBTI_TYPE.ESTP,
                MBTI_TYPE.ESTJ,
            ),
            enneagram: Joi.string().valid(
                ENNEAGRAM_TYPE['1w2'],
                ENNEAGRAM_TYPE['2w3'],
                ENNEAGRAM_TYPE['3w2'],
                ENNEAGRAM_TYPE['3w4'],
                ENNEAGRAM_TYPE['4w3'],
                ENNEAGRAM_TYPE['4w5'],
                ENNEAGRAM_TYPE['5w4'],
                ENNEAGRAM_TYPE['5w6'],
                ENNEAGRAM_TYPE['6w5'],
                ENNEAGRAM_TYPE['6w7'],
                ENNEAGRAM_TYPE['7w6'],
                ENNEAGRAM_TYPE['7w8'],
                ENNEAGRAM_TYPE['8w7'],
                ENNEAGRAM_TYPE['8w9'],
                ENNEAGRAM_TYPE['9w8'],
                ENNEAGRAM_TYPE['9w1'],
            ),
            zodiac: Joi.string().valid(
                ZODIAC_TYPE.Aries,
                ZODIAC_TYPE.Taurus,
                ZODIAC_TYPE.Gemini,
                ZODIAC_TYPE.Cancer,
                ZODIAC_TYPE.Leo,
                ZODIAC_TYPE.Virgo,
                ZODIAC_TYPE.Libra,
                ZODIAC_TYPE.Scorpio,
                ZODIAC_TYPE.Sagittarius,
                ZODIAC_TYPE.Capricorn,
                ZODIAC_TYPE.Aquarius,
                ZODIAC_TYPE.Pisces
            )
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}
async function feedbackReaction(request, response, next) {
    const joiSchema = {
        params: Joi.object({
            profileId: Joi.string().required(),
            feedbackId: Joi.string().required(),
        }),
        body: Joi.object({
            isLiked: Joi.bool().required(),
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}

async function profileDetails(request, response, next) {
    const joiSchema = {
        params: Joi.object({
            profileId: Joi.string().required()
        }),
        body: Joi.object({
            sortBy: Joi.string().valid("likes", 'createdAt'),
            sortOrder: Joi.number().valid(-1, 1),
            page: Joi.number(),
            pageSize: Joi.number(),
            filter: Joi.object({
                mbti: Joi.string().valid(
                    MBTI_TYPE.INFP,
                    MBTI_TYPE.INFJ,
                    MBTI_TYPE.ENFP,
                    MBTI_TYPE.ENFJ,
                    MBTI_TYPE.INTJ,
                    MBTI_TYPE.INTP,
                    MBTI_TYPE.ENTP,
                    MBTI_TYPE.ENTJ,
                    MBTI_TYPE.ISFP,
                    MBTI_TYPE.ISFJ,
                    MBTI_TYPE.ESFP,
                    MBTI_TYPE.ESFJ,
                    MBTI_TYPE.ISTP,
                    MBTI_TYPE.ISTJ,
                    MBTI_TYPE.ESTP,
                    MBTI_TYPE.ESTJ,
                ),
                enneagram: Joi.string().valid(
                    ENNEAGRAM_TYPE['1w2'],
                    ENNEAGRAM_TYPE['2w3'],
                    ENNEAGRAM_TYPE['3w2'],
                    ENNEAGRAM_TYPE['3w4'],
                    ENNEAGRAM_TYPE['4w3'],
                    ENNEAGRAM_TYPE['4w5'],
                    ENNEAGRAM_TYPE['5w4'],
                    ENNEAGRAM_TYPE['5w6'],
                    ENNEAGRAM_TYPE['6w5'],
                    ENNEAGRAM_TYPE['6w7'],
                    ENNEAGRAM_TYPE['7w6'],
                    ENNEAGRAM_TYPE['7w8'],
                    ENNEAGRAM_TYPE['8w7'],
                    ENNEAGRAM_TYPE['8w9'],
                    ENNEAGRAM_TYPE['9w8'],
                    ENNEAGRAM_TYPE['9w1'],
                ),
                zodiac: Joi.string().valid(
                    ZODIAC_TYPE.Aries,
                    ZODIAC_TYPE.Taurus,
                    ZODIAC_TYPE.Gemini,
                    ZODIAC_TYPE.Cancer,
                    ZODIAC_TYPE.Leo,
                    ZODIAC_TYPE.Virgo,
                    ZODIAC_TYPE.Libra,
                    ZODIAC_TYPE.Scorpio,
                    ZODIAC_TYPE.Sagittarius,
                    ZODIAC_TYPE.Capricorn,
                    ZODIAC_TYPE.Aquarius,
                    ZODIAC_TYPE.Pisces
                )
            })
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}
async function listProfiles(request, response, next) {
    const joiSchema = {
        body: Joi.object({
            page: Joi.number(),
            pageSize: Joi.number(),
        }),
    };
    await joiValidation(request, response, joiSchema, next);
}
module.exports = {
    createProfile,
    profileFeedback,
    feedbackReaction,
    profileDetails,
    listProfiles
};