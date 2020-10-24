const DB = require('../../database/index.js').pool;
const { productsCacheModel } = require('../cacheModels/index.js');

module.exports = {
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
        productsCacheModel.setProductsCached(page, count, results.rows);
        return results.rows;
      })
      .catch((err) => {
        console.log('error getting the products from db', err);
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
        productsCacheModel.setProductsByIdCached(id, currProduct);
        return currProduct;
      })
      .catch((err) => {
        console.log('error finding that product by id in db', err);
      });
  },
};
