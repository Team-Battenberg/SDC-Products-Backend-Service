const DB = require('../database/index.js').pool;
const { GET, SET, EXPIRE } = require('../cache/index.js');

module.exports = {
  getProductsCached: (page, count) => {
    const newKey = `p${page}c${count}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        throw new Error('error in getting cached products', err);
      });
  },
  getProducts(page, count) {
    let queryStart = 0;
    let queryLimit = 5;
    if (page > 1) {
      queryStart = (page - 1) * count;
    }
    if (count !== 5) {
      queryLimit = count;
    }
    return DB.query(`SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" WHERE "products"."product_id" > ${queryStart} ORDER BY "products"."product_id" LIMIT ${queryLimit};`)
      .then((results) => {
        const newKey = `p${page}c${count}`;
        const cacheEntry = JSON.stringify(results.rows);
        SET(newKey, cacheEntry)
          .then(() => {
            if (newKey !== 'p1c5') {
              EXPIRE(newKey, 5);
            }
          })
          .catch((err) => { throw new Error('error caching products with redis', err); });
        return results.rows;
      })
      .catch((err) => {
        throw new Error('error getting the products from db', err);
      });
  },
  getProductsByIdCached(id) {
    const newKey = `byId${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        throw new Error('error in getting cached product by Id', err);
      });
  },
  getProductsById(id) {
    const product = DB.query(`SELECT "product_id", "name", "slogan", "description", "category", "default_price" FROM "products-database-v3"."products" AS "products" WHERE "products"."product_id" = ${id};`);

    const features = DB.query(`SELECT "feature", "value" FROM "products-database-v3"."features" AS "features" WHERE "features"."product_id" = ${id};`);

    return Promise.all([product, features])
      .then((responses) => {
        const currProduct = responses[0].rows[0];
        const currFeatures = responses[1].rows;
        currProduct.features = currFeatures;
        const newKey = `byId${id}`;
        const cacheEntry = JSON.stringify(currProduct);
        SET(newKey, cacheEntry)
          .then(() => {
            if (newKey !== 'byId1') {
              EXPIRE(newKey, 5);
            }
          })
          .catch((err) => { throw new Error('error caching products by id with redis', err); });
        return currProduct;
      })
      .catch((err) => {
        throw new Error('error finding that product by id in db', err);
      });
  },
};
