/**
 * feedbackReaction.js
 * @description :: model of a database collection feedbackReaction
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
    feedbackId: {
      type: Schema.Types.ObjectId,
      ref: "profileFeedback",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    isLiked: {
      type: Boolean,
      default: false,
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
const feedbackReaction = mongoose.model('feedbackReaction', schema);

module.exports = feedbackReaction;
