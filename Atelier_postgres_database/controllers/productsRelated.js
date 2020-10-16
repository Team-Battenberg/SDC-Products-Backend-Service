const relatedModel = require('../models/index.js').relatedModel;

module.exports = {
  get: function (req, res) {
    res.send('products related endpoint')
  }
}