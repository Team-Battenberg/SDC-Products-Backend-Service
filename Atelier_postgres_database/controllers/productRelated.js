const relatedModel = require('../models/index.js').relatedModel;

module.exports = {
  get: function (req, res) {
    var id = req.params.product_id
    relatedModel.getRelated(id)
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log('error sending related products to client', err);
        res.status(404).send('Could not find related products');
      })
  }
}