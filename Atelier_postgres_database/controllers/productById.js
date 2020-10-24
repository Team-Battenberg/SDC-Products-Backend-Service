const { productsCacheModel } = require('../models/cacheModels/index.js');
const { productsModel } = require('../models/dbModels/index.js');
const { LOG } = require('../logging/index.js');

module.exports = {
  get(req, res) {
    const startTime = new Date();
    LOG.increment('productsById_get');
    const id = req.params.product_id;
    productsCacheModel.getProductsByIdCached(id)
      .then((cacheResponse) => {
        const cacheEnd = new Date() - startTime;
        if (cacheResponse !== null) {
          res.status(200).send(JSON.parse(cacheResponse));
          LOG.timing('productsById_cache_response_success', cacheEnd);
        } else {
          LOG.timing('productsById_cache_response_null', cacheEnd);
          productsModel.getProductsById(id)
            .then((dbResponse) => {
              res.status(200).send(dbResponse);
              const dbEnd = new Date() - startTime;
              LOG.timing('productsById_db_response', dbEnd);
            });
        }
      })
      .catch((err) => {
        res.status(404).send('Could not find that product');
        const dbEnd = new Date() - startTime;
        LOG.timing('productsById_db_response_fail', dbEnd);
        console.log('error sending that product to client', err);
      });
  },
};
