const stylesModel = require('../models/index.js').stylesModel;
const skusModel = require('../models/index.js').skusModel;

module.exports = {
  get: function (req, res) {
    res.send('product styles endpoint')
  }
}