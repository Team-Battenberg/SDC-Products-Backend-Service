const DB = require('../database/index.js').client


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
    return DB.query(`SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" ORDER BY "products"."product_id" LIMIT ${queryLimit} OFFSET ${queryOffset};`)
    .then((results) => {
      return results.rows;
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
      product['features'] = features;
      return product;
    })
    .catch((err) => {
      console.log('error finding that product in db', err);
    })
  }
}