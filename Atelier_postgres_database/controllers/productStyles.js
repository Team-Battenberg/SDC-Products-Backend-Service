const stylesModel = require('../models/index.js').stylesModel;
const skusModel = require('../models/index.js').skusModel;

module.exports = {
  get: function(req, res) {
    var id = req.params.product_id
    stylesModel.getStyles(id)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      console.log('error sending that product to client', err);
      res.status(404).send('Could not find that product');
    })
  }
}