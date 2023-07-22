/**
 * profileFeedback.js
 * @description :: model of a database collection profileFeedback
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const profileConstantEnum = require('../../services/shared/constants/profileConstant');
const { convertObjectToEnum } = require('../../utils/common');

const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: "profile",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    mbti: {
      type: String,
      enum: convertObjectToEnum(profileConstantEnum.MBTI_TYPE),
      default: null,
    },
    enneagram: {
      type: String,
      enum: convertObjectToEnum(profileConstantEnum.ENNEAGRAM_TYPE),
      default: null,
    },
    zodiac: {
      type: String,
      enum: convertObjectToEnum(profileConstantEnum.ZODIAC_TYPE),
      default: null,
    },
    title: {
      type: String,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

schema.method('toJSON', function () {
  const { _id, __v, ...object } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});

schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const profileFeedback = mongoose.model('profileFeedback', schema);

module.exports = profileFeedback;
