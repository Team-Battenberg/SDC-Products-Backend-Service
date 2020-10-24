const StatsD = require('node-statsd');

const CLIENT = new StatsD({
  host: 'localhost',
  port: 8125,
  prefix: 'HackReactor_',
});

module.exports.LOG = CLIENT;
