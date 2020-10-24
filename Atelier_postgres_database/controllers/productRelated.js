const { relatedCacheModel } = require('../models/cacheModels/index.js');
const { relatedModel } = require('../models/dbModels/index.js');
const { LOG } = require('../logging/index.js');

module.exports = {
  get(req, res) {
    const startTime = new Date();
    LOG.increment('productsRelated_get');
    const id = req.params.product_id;
    relatedCacheModel.getRelatedCached(id)
      .then((cacheResponse) => {
        const cacheEnd = new Date() - startTime;
        if (cacheResponse !== null) {
          res.status(200).send(JSON.parse(cacheResponse));
          LOG.timing('productsRelated_cache_response_success', cacheEnd);
        } else {
          LOG.timing('productsRelated_cache_response_null', cacheEnd);
          relatedModel.getRelated(id)
            .then((dbResponse) => {
              res.status(200).send(dbResponse);
              const dbEnd = new Date() - startTime;
              LOG.timing('productsRelated_db_response', dbEnd);
            });
        }
      })
      .catch((err) => {
        res.status(404).send('Could not find related products');
        const dbEnd = new Date() - startTime;
        LOG.timing('productsRelated_db_response_fail', dbEnd);
        console.log('error sending related products to client', err);
      });
  },
};
