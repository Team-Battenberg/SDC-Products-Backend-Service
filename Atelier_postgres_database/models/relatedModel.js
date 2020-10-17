const Related = require('../database/index.js').Related;

module.exports = {
  getRelated: function (id) {
    var relatedIds = [];
    return Related.findAll({
      attributes: ['product_id_1'],
      where: {
        product_id: id
      }
    })
    .then((relatedEntries) => {
      relatedEntries.forEach((entry) => {
        relatedIds.push(entry.dataValues.product_id_1);
      })
      return relatedIds;
    })
    .catch((err) => {
      console.log('error getting the related products from db', err);
    })
  }
}