var async = require('async');
var RedisClient = require('../redisClient.js');
var redisClient = new RedisClient();

var Ragot = function(message, date) {
  this.message = message;
};

Ragot.prototype.validate = function() {
  return this.message.replace(/\s/g,"")
};

Ragot.prototype.save = function(callback) {
  _this = this;

  if(!this.validate()) {
    callback({"name" : "Empty ragot"});
    return;
  }

  redisClient.incr('ragots:count', function(err, i) {
    async.parallel([
      function(cb) { redisClient.set('ragots:'+i, _this.message, cb); },
      function(cb) { redisClient.lpush('ragots', i, cb); }
    ], function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  });
};

Ragot.findAll = function(callback) {
  redisClient.lrange('ragots', 0, -1, function(err, ragotIds) {
    async.parallel(ragotIds.map(function(id) {
      return function(cb) { redisClient.get('ragots:'+id, cb); };
    }), callback);
  });
};

module.exports = Ragot;
