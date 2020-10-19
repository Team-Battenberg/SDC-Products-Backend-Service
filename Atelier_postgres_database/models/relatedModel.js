const DB = require('../database/index.js').client

module.exports = {
  getRelated: function (id) {
    var relatedIds = [];
    return DB.query(`SELECT "product_id_1" FROM "products-database-v3"."related_products" AS "related_products" WHERE "related_products"."product_id" = ${id};`)
    .then((relatedEntries) => {
      relatedEntries.rows.forEach((entry) => {
        relatedIds.push(entry.product_id_1);
      })
      return relatedIds;
    })
    .catch((err) => {
      console.log('error getting the related products from db', err);
    })
  }
}