const productsModel = require('../models/index.js').productsModel;

module.exports = {
  get: function (req, res) {
    res.send('products by id endpoint')
  }
}