const DB = require('../database/index.js').pool;
const { GET, SET, EXPIRE } = require('../cache/index.js');

module.exports = {
  getStylesCached(id) {
    const newKey = `pid:${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        throw new Error('error in getting cached styles', err);
      });
  },
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
        const newKey = `pid:${id}`;
        const cacheEntry = JSON.stringify(resultObj);
        SET(newKey, cacheEntry)
          .then(() => {
            if (newKey !== 'pid:1') {
              EXPIRE(newKey, 5);
            }
          })
          .catch((err) => { throw new Error('error caching with redis', err); });
        return resultObj;
      })
      .catch((err) => {
        throw new Error('error finding that product in db', err);
      });
  },
};
