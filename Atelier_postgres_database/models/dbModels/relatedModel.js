const DB = require('../../database/index.js').pool;
const { relatedCacheModel } = require('../cacheModels/index.js');

module.exports = {
  getRelated(id) {
    const relatedIds = [];
    return DB.query(`SELECT "product_id_1" FROM "products-database-v3"."related_products" AS "related_products" WHERE "related_products"."product_id" = ${id};`)
      .then((relatedEntries) => {
        relatedEntries.rows.forEach((entry) => {
          relatedIds.push(entry.product_id_1);
        });
        relatedCacheModel.setRelatedCached(id, relatedIds);
        return relatedIds;
      })
      .catch((err) => {
        console.log('error getting the related products from db', err);
      });
  },
};
