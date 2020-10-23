const stylesModel = require('../models/index.js').stylesModel;
const { LOG } = require('../logging/index.js');

module.exports = {
  get: function(req, res) {
    var startTime = new Date();
    LOG.increment("productsStyles_get");
    var id = req.params.product_id
    stylesModel.getStylesCached(id)
      .then((result) => {
        var cacheEnd = new Date() - startTime;
        if (result !== null) {
          res.status(200).send(JSON.parse(result))
          LOG.timing("productsStyles_cache_response_success", cacheEnd);
        } else {
          LOG.timing("productsStyles_cache_response_null", cacheEnd);
          stylesModel.getStyles(id)
          .then((result) => {
            res.status(200).send(result);
            var dbEnd = new Date() - startTime;
            LOG.timing('productsStyles_db_response', dbEnd)
          })
        }
      })
      .catch((err) => {
        console.log('error sending that styles to client', err);
        res.status(404).send('Could not find those styles');
        var dbEnd = new Date() - startTime;
        LOG.timing('productsStyles_db_response_fail', dbEnd);
      })
  }
}