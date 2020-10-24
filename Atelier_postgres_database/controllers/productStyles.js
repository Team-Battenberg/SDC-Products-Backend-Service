const { stylesCacheModel } = require('../models/cacheModels/index.js');
const { stylesModel } = require('../models/dbModels/index.js');
const { LOG } = require('../logging/index.js');

module.exports = {
  get(req, res) {
    const startTime = new Date();
    LOG.increment('productsStyles_get');
    const id = req.params.product_id;
    stylesCacheModel.getStylesCached(id)
      .then((cacheResponse) => {
        const cacheEnd = new Date() - startTime;
        if (cacheResponse !== null) {
          res.status(200).send(JSON.parse(cacheResponse));
          LOG.timing('productsStyles_cache_response_success', cacheEnd);
        } else {
          LOG.timing('productsStyles_cache_response_null', cacheEnd);
          stylesModel.getStyles(id)
            .then((dbResponse) => {
              res.status(200).send(dbResponse);
              const dbEnd = new Date() - startTime;
              LOG.timing('productsStyles_db_response', dbEnd);
            });
        }
      })
      .catch((err) => {
        res.status(404).send('Could not find those styles');
        const dbEnd = new Date() - startTime;
        LOG.timing('productsStyles_db_response_fail', dbEnd);
        console.log('error sending that styles to client', err);
      });
  },
};
