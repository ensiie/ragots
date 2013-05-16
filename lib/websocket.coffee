Ragot = require "./models/ragot.js"

class Websocket
  constructor: (@io) ->

  @initPubSub : (io) ->
    RedisStore = require 'socket.io/lib/stores/redis'
    RedisClient  = require './redisClient.js'
    pub    = new RedisClient()
    sub    = new RedisClient()
    client = new RedisClient()

    io.set 'store', new RedisStore({
      redisPub : pub
      redisSub : sub
      redisClient : client
    })

  broadcastRagot : (ragot) ->
    @io.sockets.emit 'ragot', ragot.data


module.exports = (io) ->
  new Websocket(io)

