// for create one as well as create many
const create = (model, data) => new Promise((resolve, reject) => {
  model.create(data, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// update single document that will return updated document
const updateOne = (model, filter, data, options = { new: true }) => new Promise((resolve, reject) => {
  model.findOneAndUpdate({ isActive: true, isDeleted: false, ...filter }, data, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// delete single document that will return updated document
const deleteOne = (model, filter, options = { new: true }) => new Promise((resolve, reject) => {
  model.findOneAndDelete({ isActive: true, isDeleted: false, ...filter }, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// update multiple documents and returns count
const updateMany = (model, filter, data) => new Promise((resolve, reject) => {
  model.updateMany({ isActive: true, isDeleted: false, ...filter }, data, (error, result) => {
    if (error) reject(error);
    else resolve(result.modifiedCount);
  });
});

// delete multiple documents and returns count
const deleteMany = (model, filter) => new Promise((resolve, reject) => {
  model.deleteMany({ isActive: true, isDeleted: false, ...filter }, (error, result) => {
    if (error) reject(error);
    else resolve(result.deletedCount);
  });
});

// find single document by query
const findOne = (model, filter, options = {}) => new Promise((resolve, reject) => {
  model.findOne({ isActive: true, isDeleted: false, ...filter }, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// find multiple documents
const findMany = (model, filter, options = {}) => new Promise((resolve, reject) => {
  model.find({ isActive: true, isDeleted: false, ...filter }, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// count documents
const count = (model, filter) => new Promise((resolve, reject) => {
  model.countDocuments({ isActive: true, isDeleted: false, ...filter }, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

// find documents with pagination
const paginate = (model, filter, options) => new Promise((resolve, reject) => {
  model.paginate({ isActive: true, isDeleted: false, ...filter }, options, (error, result) => {
    if (error) reject(error);
    else resolve(result);
  });
});

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate
};