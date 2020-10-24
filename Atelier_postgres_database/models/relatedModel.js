const DB = require('../database/index.js').pool;
const { GET, SET, EXPIRE } = require('../cache/index.js');

module.exports = {
  getRelatedCached(id) {
    const newKey = `related${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        throw new Error('error in getting cached related products', err);
      });
  },
  getRelated(id) {
    const relatedIds = [];
    return DB.query(`SELECT "product_id_1" FROM "products-database-v3"."related_products" AS "related_products" WHERE "related_products"."product_id" = ${id};`)
      .then((relatedEntries) => {
        relatedEntries.rows.forEach((entry) => {
          relatedIds.push(entry.product_id_1);
        });
        const newKey = `related${id}`;
        const cacheEntry = JSON.stringify(relatedIds);
        SET(newKey, cacheEntry)
          .then(() => {
            if (newKey !== 'related1') {
              EXPIRE(newKey, 5);
            }
          })
          .catch((err) => { throw new Error('error caching related with redis', err); });
        return relatedIds;
      })
      .catch((err) => {
        throw new Error('error getting the related products from db', err);
      });
  },
};
