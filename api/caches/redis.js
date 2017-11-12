const redis = require('redis');
const config = require('../../config/config');
const client  = redis.createClient(config.redis);
module.exports = client;
