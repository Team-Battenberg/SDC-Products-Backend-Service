const productsModel = require('../models/index.js').productsModel;
const { LOG } = require('../logging/index.js');

module.exports = {
  get: function (req, res) {
    var startTime = new Date();
    LOG.increment("products_get");
    var page = 1;
    var count = 5;
    if (req.query.page) {
      page = parseInt(req.query.page);
    }
    if (req.query.count) {
      count = parseInt(req.query.count);
    }
    productsModel.getProductsCached(page,count)
      .then((result) => {
        var cacheEnd = new Date() - startTime;
        if (result !== null) {
          res.status(200).send(JSON.parse(result))
          LOG.timing("products_cache_response_success", cacheEnd);
        } else {
          LOG.timing("products_cache_response_null", cacheEnd);
          productsModel.getProducts(page,count)
            .then((results) => {
              res.status(200).send(results);
              var dbEnd = new Date() - startTime;
              LOG.timing('products_db_response', dbEnd);
            })
        }
      })
      .catch((err) => {
        console.log('error sending results to client', err);
        res.status(404).send('Could not retrieve the products');
        var dbEnd = new Date() - startTime;
        LOG.timing('products_db_response_fail', dbEnd);
      })
  }
}