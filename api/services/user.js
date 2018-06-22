const User = require('../models/user');

/**
 * @param {*} user 
 */
async function create(user) {
  return User.create(user);
}

exports.create = create;
