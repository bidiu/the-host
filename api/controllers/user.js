const userService = require('../services/user');
const Res = require('../common/models/responses');
const { compressDoc } = require('../utils/common');

/**
 * GET /api/v1/users/:userId
 * 
 * Retrieve a user.
 */
async function retrieve(req, res) {
  let userId = req.params.userId;

  let data = await userService.retrieve(userId);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

/**
 * POST /api/v1/users
 * 
 * Create a user (sign up).
 */
async function create(req, res) {
  let { username, name, age, sex, password } = req.body;
  let doc = compressDoc({ username, name, age, sex, password });

  let data = await userService.create(doc);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

/**
 * PATCH /api/v1/users/:userId
 * 
 * Update a user.
 */
async function update(req, res) {
  let _id = req.params.userId;
  let { name, age, sex } = req.body;
  let doc = compressDoc({ _id, name, age, sex });

  let data = await userService.update(doc);
  let payload = new Res.Ok({ data });
  res.status(payload.status).json(payload);
}

exports.retrieve = retrieve;
exports.create = create;
exports.update = update;
