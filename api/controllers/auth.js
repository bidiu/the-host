const authService = require('../services/auth');
const userService = require('../services/user');
const Res = require('../common/models/responses');

async function signin(req, res) {
  let { username, password } = req.query;
  let user = null;

  if (req.session.user) {
    // already logged in
    user = await userService.retrieve(req.session.user._id);
  } else {
    user = await authService.signin(username, password);
  }

  // update session data
  req.session.user = user;

  let payload = new Res.Ok({ data: user });
  res.status(payload.status).json(payload);
}

async function signout(req, res) {
  // TODO
}

exports.signin = signin;
exports.signout = signout;
