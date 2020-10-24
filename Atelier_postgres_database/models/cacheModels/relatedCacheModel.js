const { GET, SET, EXPIRE } = require('../../cache/index.js');

module.exports = {
  getRelatedCached(id) {
    const newKey = `related${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        console.log('error in getting cached related products', err);
      });
  },
  setRelatedCached(id, newEntry) {
    const newKey = `related${id}`;
    const cacheEntry = JSON.stringify(newEntry);
    SET(newKey, cacheEntry)
      .then(() => {
        if (newKey !== 'related1') {
          EXPIRE(newKey, 5);
        }
      })
      .catch((err) => { console.log('error caching related with redis', err); });
  },
};
