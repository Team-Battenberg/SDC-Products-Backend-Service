const relatedModel = require('../models/index.js').relatedModel;
const { LOG } = require('../logging/index.js');

module.exports = {
  get: function (req, res) {
    var startTime = new Date();
    LOG.increment("productsRelated_get");
    var id = req.params.product_id
    relatedModel.getRelatedCached(id)
      .then((result) => {
        var cacheEnd = new Date() - startTime;
        if (result !== null) {
          res.status(200).send(JSON.parse(result))
          LOG.timing("productsRelated_cache_response_success", cacheEnd);
        } else {
          LOG.timing("productsRelated_cache_response_null", cacheEnd);
          relatedModel.getRelated(id)
            .then((result) => {
              res.status(200).send(result)
              var dbEnd = new Date() - startTime;
              LOG.timing('productsRelated_db_response', dbEnd)
            })
        }
      })
      .catch((err) => {
        console.log('error sending related products to client', err);
        res.status(404).send('Could not find related products');
        var dbEnd = new Date() - startTime;
        LOG.timing('productsRelated_db_response_fail', dbEnd);
      });
  }
}