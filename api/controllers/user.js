const userService = require('../services/user');
const Res = require('../common/models/responses');

/**
 * POST /api/v1/users
 * 
 * Create a user (sign up).
 */
async function create(req, res) {
  let { username } = req.body;
  let user = { username };

  let data = await userService.create(user);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

exports.create = create;
