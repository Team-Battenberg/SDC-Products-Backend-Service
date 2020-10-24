const { GET, SET, EXPIRE } = require('../../cache/index.js');

module.exports = {
  getProductsCached: (page, count) => {
    const newKey = `p${page}c${count}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        console.log('error in getting cached products', err);
      });
  },
  setProductsCached: (page, count, newEntry) => {
    const newKey = `p${page}c${count}`;
    const cacheEntry = JSON.stringify(newEntry);
    SET(newKey, cacheEntry)
      .then(() => {
        if (newKey !== 'p1c5') {
          EXPIRE(newKey, 5);
        }
      })
      .catch((err) => { console.log('error caching products with redis', err); });
  },
  getProductsByIdCached(id) {
    const newKey = `byId${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        console.log('error in getting cached product by Id', err);
      });
  },
  setProductsByIdCached(id, newEntry) {
    const newKey = `byId${id}`;
    const cacheEntry = JSON.stringify(newEntry);
    SET(newKey, cacheEntry)
      .then(() => {
        if (newKey !== 'byId1') {
          EXPIRE(newKey, 5);
        }
      })
      .catch((err) => { console.log('error caching products by id with redis', err); });
  },
};
