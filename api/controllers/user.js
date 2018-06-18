const userService = require('../services/user');

function create(req, res) {
  // TODO
  let data = userService.create();
  res.status(200).json(data);
}

exports.create = create;
