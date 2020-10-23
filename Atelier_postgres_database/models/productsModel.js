const DB = require('../database/index.js').pool
const { GET, SET, EXPIRE } = require('../cache/index.js');


module.exports = {
  getProductsCached: (page,count) => {
    var newKey = `p${page}c${count}`
    return GET(newKey)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('error in getting cached products', err)
      })
  },
  getProducts: function (page,count) {
    var queryStart = 0;
    var queryLimit = 5;
    if (page > 1) {
      queryStart = (page-1) * count;
    }
    if (count !== 5) {
      queryLimit = count;
    }
    return DB.query(`SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" WHERE "products"."product_id" > ${queryStart} ORDER BY "products"."product_id" LIMIT ${queryLimit};`)
    .then((results) => {
      var newKey = `p${page}c${count}`;
      var cacheEntry = JSON.stringify(results.rows);
      SET(newKey, cacheEntry)
        .then(() => {
          if (newKey !== 'p1c5') {
            EXPIRE(newKey, 5);
          }
        })
        .catch((err) => {console.log('error caching products with redis', err)})
      return results.rows;
    })
    .catch((err) => {
      console.log('error getting the products from db', err);
    })
  },
  getProductsByIdCached: function (id) {
    var newKey = `byId${id}`
    return GET(newKey)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('error in getting cached product by Id', err)
      })
  },
  getProductsById: function (id) {
    var product = DB.query(`SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" WHERE "products"."product_id" = ${id};`)

    var features = DB.query(`SELECT "feature", "value" FROM "products-database-v3"."features" AS "features" WHERE "features"."product_id" = ${id};`)

  return Promise.all([product, features])
    .then((responses) => {
      var product = responses[0].rows[0];
      var features = responses[1].rows;
      product['features'] = features;
      var newKey = `byId${id}`;
      var cacheEntry = JSON.stringify(product);
      SET(newKey, cacheEntry)
        .then(() => {
          if (newKey !== 'byId1') {
            EXPIRE(newKey, 5);
          }
        })
        .catch((err) => {console.log('error caching products by id with redis', err)});
      return product;
    })
    .catch((err) => {
      console.log('error finding that product by id in db', err);
    })
  }
}