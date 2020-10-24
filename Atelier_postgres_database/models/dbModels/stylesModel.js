const DB = require('../../database/index.js').pool;
const { stylesCacheModel } = require('../cacheModels/index.js');

module.exports = {
  getStyles(id) {
    const resultObj = { product_id: id };
    const styleIds = [];
    return DB.query(`SELECT "style_id", "name", "sale_price", "original_price", "default_style" FROM "products-database-v3"."product_styles" AS "product_styles" WHERE "product_styles"."product_id" = ${id};`)
      .then((styles) => {
        const styleResults = [];
        styles.rows.forEach((currStyle) => {
          const style = currStyle;
          style.photos = [];
          style.skus = {};
          styleResults.push(style);
          styleIds.push(style.style_id);
        });
        resultObj.results = styleResults;
        const stylePhotoSets = styleIds.map((currId) => DB.query(`SELECT "url", "thumbnail_url" FROM "products-database-v3"."product_photos" AS "product_photos" WHERE "product_photos"."style_id" = ${currId};`));
        const styleSkuSets = styleIds.map((currId) => DB.query(`SELECT "sku_id", "size", "quantity" FROM "products-database-v3"."skus" AS "skus" WHERE "skus"."style_id" = ${currId};`));

        return Promise.all([...stylePhotoSets, ...styleSkuSets]);
      })
      .then((resultSet) => {
        for (let pi = 0, si = styleIds.length; pi < styleIds.length; pi += 1, si += 1) {
          resultSet[pi].rows.forEach(((entry) => {
            resultObj.results[pi].photos.push(entry);
          }));
          resultSet[si].rows.forEach(((entry) => {
            resultObj.results[pi].skus[entry.sku_id] = {};
            resultObj.results[pi].skus[entry.sku_id].size = entry.size;
            resultObj.results[pi].skus[entry.sku_id].quantity = entry.quantity;
          }));
        }
        stylesCacheModel.setStylesCached(id, resultObj);
        return resultObj;
      })
      .catch((err) => {
        console.log('error finding that product in db', err);
      });
  },
};
