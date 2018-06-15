const { Router } = require('express');
const helloController = require('../controllers/hello');

const router = Router();

/**
 * 
 */
router.get('/hello/:who', helloController.echo);

module.exports = router;
