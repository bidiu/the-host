const { Router } = require('express');
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
 * user related routes start
 */
router.get('/users/:userId', asyncWrapper(userController.retrieve));

router.post('/users', asyncWrapper(userController.create));

router.patch('/users/:userId', asyncWrapper(userController.update));

module.exports = router;
