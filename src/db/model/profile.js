/**
 * profile.js
 * @description :: model of a database collection profile
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
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    mbti: {
      type: String,
      enum: convertObjectToEnum(profileConstantEnum.MBTI_TYPE),
    },
    enneagram: {
      type: String,
      enum: convertObjectToEnum(profileConstantEnum.ENNEAGRAM_TYPE),
    },
    variant: {
      type: String,
    },
    tritype: {
      type: String,
    },
    socionics: {
      type: String,
    },
    sloan: {
      type: String,
    },
    psyche: {
      type: String,
    },
    image: {
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
const profile = mongoose.model('profile', schema);

module.exports = profile;
