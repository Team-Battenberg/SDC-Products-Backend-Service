var controller = require('./controllers');
var router = require('express').Router();

router.get('/products', controller.products.get);

router.get('/products/:product_id', controller.productsById.get);

router.get('/products/:product_id/styles', controller.productsStyles.get);

router.get('/products/:product_id/related', controller.productsRelated.get);

router.get('/cart', controller.cart.get);

router.post('/cart', controller.cart.post);

module.exports = router;