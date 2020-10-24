const EXPRESS = require('express');

const APP = EXPRESS();
const HELMET = require('helmet');
const CORS = require('cors');
const BODYPARSER = require('body-parser');

const PORT = process.env.PORT || 4323;
const ROUTER = require('./routes.js');

APP.use(HELMET());
APP.use(CORS());
APP.use(BODYPARSER.json());

APP.get('/loaderio-f860f24adc8e26bc459078499a458e8c/', (req, res) => {
  res.send('loaderio-f860f24adc8e26bc459078499a458e8c');
});

APP.use('/', ROUTER);

// bad route handling
APP.use((req, res, next) => {
  const error = new Error(`These are not the routes you're looking for. - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// eslint-disable-next-line
APP.use((error, req, res, next) => {
  let { statusCode } = res;
  if (statusCode === 200) {
    statusCode = 500;
  }
  res.status(statusCode);
  res.json({
    message: error.message,
  });
});

APP.listen(PORT, () => {
  throw new Error(`Products Microservice listening on port ${PORT}`);
});
