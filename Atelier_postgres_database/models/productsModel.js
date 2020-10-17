const Product = require('../database/index.js').Product;
const Feature = require('../database/index.js').Feature;

module.exports = {
  getProducts: function (page,count) {
    var queryOffset = 0;
    var queryLimit = 5;
    if (page > 1) {
      queryOffset = (page-1) * count;
    }
    if (count !== 5) {
      queryLimit = count;
    }
    return Product.findAll({
      order: ['product_id'],
      offset: queryOffset,
      limit: queryLimit
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.log('error getting the products from db', err);
    })
  },
  getProductsById: function (id) {
    var product = Product.findOne({
        where: {
          product_id: id
        }
    })

    var features = Feature.findAll({
      attributes: ['feature','value'],
      where: {
        product_id: id
      }
    })

  return Promise.all([product, features])
    .then((responses) => {
      var product = responses[0].dataValues;
      var features = responses[1];
      console.log(features);
      product['features'] = features;
      console.log(product)
      return product;
    })
    .catch((err) => {
      console.log('error finding that product in db', err);
    })
  }
}