var Ragot = require("./models/ragot.js");
var io;

var initPubSub = function(_io) {
  io = _io;
  var RedisStore = require('socket.io/lib/stores/redis')
    , RedisClient  = require('./redisClient.js')
    , pub    = new RedisClient()
    , sub    = new RedisClient()
    , client = new RedisClient();

  io.set('store', new RedisStore({
    redisPub : pub
  , redisSub : sub
  , redisClient : client
  }));
}

module.exports = function(io) {
  initPubSub(io);
  io.sockets.on('connection', function (socket) {
    socket.on('ragot', function (data) {
      var ragot = new Ragot(data);
      ragot.create(function(err) {
        if(!err) {
          io.sockets.emit('ragot', ragot.data);
        } else {
          socket.emit('error', err);
        }
      });
    });
  });
};
