const User = require('../models/user');
const ApiError = require('../common/models/api-errors');

const fields = `username name age sex avatarUrl`;

async function retrieve(userId, projection = fields) {
  let user = await User.findById(userId, projection);
  
  if (user) { return user; }
  throw new ApiError.NotFound();
}

async function create(doc) {
  return User.create(doc);
}

async function update(doc) {
  let user = await retrieve(doc._id);

  await user.update(doc);
  return retrieve(doc._id);
}

exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
