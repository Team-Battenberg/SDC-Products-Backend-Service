const Style = require('../database/index.js').Style;
const Photo = require('../database/index.js').Photo;
const Sku = require('../database/index.js').Sku;

module.exports = {
  getStyles: function (id) {
  var resultObj = {product_id: id}
  var styleIds = []
  return Style.findAll({
      attributes: {
        exclude: ['product_id']
      },
      where: {
        product_id: id
      }
    })
    .then((styles) => {
      var styleResults = [];
      styles.forEach((style) => {
        style.dataValues.photos = [];
        style.dataValues.skus = {};
        styleResults.push(style.dataValues)
        styleIds.push(style.dataValues.style_id)
      })
      resultObj.results = styleResults
      var stylePhotoSets = styleIds.map((currId) => {
        return Photo.findAll({
          attributes: ['url', 'thumbnail_url'],
          where: {
            style_id: currId
          }
        })
      })

      var styleSkuSets = styleIds.map((currId) => {
        return Sku.findAll({
          attributes: ['sku_id','size', 'quantity'],
          where: {
            style_id: currId
          }
        })
      })

    return Promise.all([...stylePhotoSets,...styleSkuSets])
    })
    .then((resultSet) => {
      var pi,si;
      for (pi = 0, si = styleIds.length; pi < styleIds.length; pi++,si++) {
        console.log(`entry ${pi}`)
        resultSet[pi].forEach((entry => {
          resultObj.results[pi].photos.push(entry.dataValues);
        }));
        resultSet[si].forEach((entry => {
          resultObj.results[pi].skus[entry.dataValues.sku_id] = {}
          resultObj.results[pi].skus[entry.dataValues.sku_id].size = entry.dataValues.size
          resultObj.results[pi].skus[entry.dataValues.sku_id].quantity = entry.dataValues.quantity
        }))
      }
      return resultObj;
    })
    .catch((err) => {
      console.log('error finding that product in db', err);
    })
  }
}