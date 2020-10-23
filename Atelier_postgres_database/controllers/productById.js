const productsModel = require('../models/index.js').productsModel;
const { LOG } = require('../logging/index.js');

module.exports = {
  get: function (req, res) {
    var startTime = new Date();
    LOG.increment("productsById_get");
    var id = req.params.product_id
    productsModel.getProductsByIdCached(id)
      .then((result) => {
        var cacheEnd = new Date() - startTime;
        if (result !== null) {
          res.status(200).send(JSON.parse(result))
          LOG.timing("productsById_cache_response_success", cacheEnd);
        } else {
          LOG.timing("productsById_cache_response_null", cacheEnd);
          productsModel.getProductsById(id)
            .then((result) => {
              res.status(200).send(result)
              var dbEnd = new Date() - startTime;
              LOG.timing('productsById_db_response', dbEnd)
            })
        }
      })
      .catch((err) => {
        console.log('error sending that product to client', err);
        res.status(404).send('Could not find that product');
        var dbEnd = new Date() - startTime;
        LOG.timing('productsById_db_response_fail', dbEnd);
      })
  }
}