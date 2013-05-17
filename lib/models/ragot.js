var async = require('async');
var RedisClient = require('../redisClient.js');
var redisClient = new RedisClient();

var Ragot = function(message, date) {
  this.message = message;
  if(!date) {
    this.date = new Date().getTime()
  } else {
    this.date = date
  }
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
      function(cb) { redisClient.set('ragots:'+i+':date', _this.date, cb); },
      function(cb) { redisClient.lpush('ragots', i, cb); }
    ], function(err) {
      if(err) {
        callback(err);
      }
      callback(null);
    });
  });
};

Ragot.find = function(id, callback) {
  async.parallel([
    function(cb_ragot) { redisClient.get('ragots:'+id, cb_ragot); },
    function(cb_ragot) { redisClient.get('ragots:'+id+':date', cb_ragot); }
  ], function(err, data) {
    if(err) {
      console.log("Error find Ragot " + id);
      callback(err, null);
    }
    var message = data[0];
    var date = parseInt(data[1]) || -1;

    callback(null, new Ragot(message, date));
  });
}

Ragot.findAll = function(callback) {
  redisClient.lrange('ragots', 0, -1, function(err, ragotIds) {
    if(err) {
      console.log("Error redis lrange ragots : " + err);
      callback(err, null);
    }
    async.map(ragotIds, Ragot.find, function(err, ragots) {
      if(err) {
        console.log("Error async.map Ragot.find : " + err);
        callback(err, null);
      }
      callback(null, ragots);
    });
  });
};

module.exports = Ragot;
