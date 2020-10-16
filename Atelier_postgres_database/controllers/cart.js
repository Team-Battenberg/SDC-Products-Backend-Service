const MODELS = require('../models/index.js');

module.exports = {
  get: function (req, res) {
    res.send('cart get endpoint')
  },
  post: function (req, res) {
    res.send('cart post endpoint')
  }
}