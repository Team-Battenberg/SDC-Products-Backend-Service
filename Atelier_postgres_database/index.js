const EXPRESS = require('express');
const APP = EXPRESS();
const BODYPARSER = require('body-parser');
const PORT = process.env.PORT || 4323;
const ROUTER = require('./routes.js');

APP.use(BODYPARSER.json());

APP.get('/loaderio-f860f24adc8e26bc459078499a458e8c', (req,res) => {
  res.send('loaderio-f860f24adc8e26bc459078499a458e8c');
})

APP.use('/', ROUTER);

APP.listen(PORT, () => {
  console.log(`Products Microservice listening on port ${PORT}`)
})