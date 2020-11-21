const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/count', controllers.product.get.getCount);

router.get('/:id', controllers.product.get.getById);

router.post('/', controllers.product.post.getProducts);

router.post('/create', controllers.product.post.create);

module.exports = router;