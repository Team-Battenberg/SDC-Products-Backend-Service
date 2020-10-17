var controller = require('./controllers');
var router = require('express').Router();

router.get('/products', controller.products.get);

router.get('/products/:product_id', controller.productById.get);

router.get('/products/:product_id/styles', controller.productStyles.get);

router.get('/products/:product_id/related', controller.productRelated.get);

router.get('/cart', controller.cart.get);

router.post('/cart', controller.cart.post);

module.exports = router;