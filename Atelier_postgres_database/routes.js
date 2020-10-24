const router = require('express').Router();
const controller = require('./controllers');

router.get('/products', controller.products.get);

router.get('/products/:product_id', controller.productById.get);

router.get('/products/:product_id/styles', controller.productStyles.get);

router.get('/products/:product_id/related', controller.productRelated.get);

module.exports = router;
