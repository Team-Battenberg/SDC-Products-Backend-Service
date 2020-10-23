const { promisify } = require("util");
const redis = require('redis');
const client = redis.createClient({
  host: process.env.CACHEHOST,
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  }
});

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);

module.exports.GET = getAsync;
module.exports.SET = setAsync;
module.exports.EXPIRE = expireAsync;