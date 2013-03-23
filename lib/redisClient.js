var redis = require('redis');

RedisClient = function() {
  var redisClient;
  if(process.env.REDISTOGO_URL) {
    var rtg = require('url').parse(process.env.REDISTOGO_URL);
    redisClient = redis.createClient(rtg.port, rtg.hostname);
    redisClient.auth(rtg.auth.split(":")[1]);
  } else {
    redisClient = redis.createClient();
  }
  return redisClient;
}

module.exports = RedisClient;
