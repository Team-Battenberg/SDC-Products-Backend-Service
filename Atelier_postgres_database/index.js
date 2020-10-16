const EXPRESS = require('express');
const APP = EXPRESS();
const BODYPARSER = require('body-parser');
const PORT = 4323;
const ROUTER = require('./routes.js');

APP.use(BODYPARSER.json());

APP.use('/', ROUTER);

APP.listen(PORT, () => {
  console.log(`Products Microservice listening on port ${PORT}`)
})