Ragot = require "./models/ragot.js"

class Websocket
  constructor: (@io, withLongPolling, withPubsub) ->
    if withLongPolling
      @initLongPolling
    if withPubsub
      @initPubSub

  initLongPolling : ->
    @io.configure ->
      @io.set "transports", ["xhr-polling"]
      @io.set "polling duration", 10

  initPubSub : ->
    RedisStore = require 'socket.io/lib/stores/redis'
    RedisClient  = require './redisClient.js'
    pub    = new RedisClient()
    sub    = new RedisClient()
    client = new RedisClient()

    @io.set 'store', new RedisStore({
      redisPub : pub
      redisSub : sub
      redisClient : client
    })

  broadcastRagot : (ragot) ->
    @io.sockets.emit 'ragot', ragot


# We don't use pubsub for the moment but long polling as Heroku doesn't support websocket
module.exports = (io) ->
  new Websocket(io, true, false)

