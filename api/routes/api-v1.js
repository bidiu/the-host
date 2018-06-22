const { Router } = require('express');
const helloController = require('../controllers/hello');
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
 * this is an example
 */
router.get('/hello/:who', asyncWrapper(helloController.echo));


/*
 * user related routes start
 */
router.post('/users', asyncWrapper(userController.create));


module.exports = router;
