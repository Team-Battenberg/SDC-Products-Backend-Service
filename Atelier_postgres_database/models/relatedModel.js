const DB = require('../database/index.js').pool
const { GET, SET, EXPIRE } = require('../cache/index.js');

module.exports = {
  getRelatedCached: function (id) {
    var newKey = `related${id}`
    return GET(newKey)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('error in getting cached related products', err)
      })
  },
  getRelated: function (id) {
    var relatedIds = [];
    return DB.query(`SELECT "product_id_1" FROM "products-database-v3"."related_products" AS "related_products" WHERE "related_products"."product_id" = ${id};`)
    .then((relatedEntries) => {
      relatedEntries.rows.forEach((entry) => {
        relatedIds.push(entry.product_id_1);
      })
      var newKey = `related${id}`;
      var cacheEntry = JSON.stringify(relatedIds);
      SET(newKey, cacheEntry)
        .then(() => {
          if (newKey !== 'related1') {
            EXPIRE(newKey, 5);
          }
        })
        .catch((err) => {console.log('error caching related with redis', err)})
      return relatedIds;
    })
    .catch((err) => {
      console.log('error getting the related products from db', err);
    })
  }
}