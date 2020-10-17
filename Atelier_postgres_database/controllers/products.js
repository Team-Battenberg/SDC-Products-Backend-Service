const productsModel = require('../models/index.js').productsModel;

module.exports = {
  get: function (req, res) {
    var page = 1;
    var count = 5;
    console.log(req.query)
    if (req.query.page) {
      page = parseInt(req.query.page);
    }
    if (req.query.count) {
      count = parseInt(req.query.count);
    }
    productsModel.getProducts(page,count)
      .then((results) => {
        res.status(200).send(results)
      })
      .catch((err) => {
        console.log('error sending results to client', err);
        res.status(404).send('Could not retrieve the products');
      })
  }
}