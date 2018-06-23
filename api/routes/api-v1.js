const { Router } = require('express');
const userController = require('../controllers/user');
const venueController = require('../controllers/venue');

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


/*
 * venue related routes start
 */
router.get('/venues/:venueId', asyncWrapper(venueController.retrieve));

router.post('/venues', asyncWrapper(venueController.create));

router.patch('/venues/:venueId', asyncWrapper(venueController.update));

module.exports = router;
