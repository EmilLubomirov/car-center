const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/', controllers.serviceTag.get);

module.exports = router;