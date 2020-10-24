const { productsModel } = require('../models/index.js');
const { LOG } = require('../logging/index.js');

module.exports = {
  get(req, res) {
    const startTime = new Date();
    LOG.increment('products_get');
    let page = 1;
    let count = 5;
    if (req.query.page) {
      page = parseInt(req.query.page, 10);
    }
    if (req.query.count) {
      count = parseInt(req.query.count, 10);
    }
    productsModel.getProductsCached(page, count)
      .then((result) => {
        const cacheEnd = new Date() - startTime;
        if (result !== null) {
          res.status(200).send(JSON.parse(result));
          LOG.timing('products_cache_response_success', cacheEnd);
        } else {
          LOG.timing('products_cache_response_null', cacheEnd);
          productsModel.getProducts(page, count)
            .then((results) => {
              res.status(200).send(results);
              const dbEnd = new Date() - startTime;
              LOG.timing('products_db_response', dbEnd);
            });
        }
      })
      .catch((err) => {
        res.status(404).send('Could not retrieve the products');
        const dbEnd = new Date() - startTime;
        LOG.timing('products_db_response_fail', dbEnd);
        throw new Error('error sending results to client', err);
      });
  },
};
