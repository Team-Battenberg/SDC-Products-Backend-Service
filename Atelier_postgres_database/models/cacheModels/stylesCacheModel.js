const { GET, SET, EXPIRE } = require('../../cache/index.js');

module.exports = {
  getStylesCached(id) {
    const newKey = `pid:${id}`;
    return GET(newKey)
      .then((result) => result)
      .catch((err) => {
        console.log('error in getting cached styles', err);
      });
  },
  setStylesCached(id, newEntry) {
    const newKey = `pid:${id}`;
    const cacheEntry = JSON.stringify(newEntry);
    SET(newKey, cacheEntry)
      .then(() => {
        if (newKey !== 'pid:1') {
          EXPIRE(newKey, 5);
        }
      })
      .catch((err) => { console.log('error caching with redis', err); });
  },
};
