const productsModel = require('../models/index.js').productsModel;

module.exports = {
  get: function (req, res) {
    var id = req.params.product_id

    productsModel.getProductsById(id)
      .then((result) => {
        res.status(200).send(result)
      })
      .catch((err) => {
        console.log('error sending that product to client', err);
        res.status(404).send('Could not find that product');
      })
  }
}