const { Router } = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

const asyncWrapper = func =>
  async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };

const router = Router();

/*
 * auth related routes start
 */
router.get('/auth/signin', asyncWrapper(authController.signin));

/*
 * user related routes start
 */
router.get('/users/:userId', asyncWrapper(userController.retrieve));

router.post('/users', asyncWrapper(userController.create));

router.patch('/users/:userId', asyncWrapper(userController.update));

module.exports = router;
