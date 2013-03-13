var express = require('express');
var redis = require('redis');
var async = require('async');

var app = express();
app.use(express.bodyParser());


var redisClient;
if(process.env.REDISTOGO_URL) {
  var rtg = require('url').parse(process.env.REDISTOGO_URL);
  redisClient = redis.createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = redis.createClient();
}

var logger = function(req, res, next) {console.log(req.body); next();};

var auth = express.basicAuth(function(user, pass) {
  return pass == process.env.PASSWORD;
});

app.use(logger);
if(process.env.PASSWORD) app.use(auth);

app.get('/', function(req, res) {
  redisClient.lrange('ragots', 0, -1, function(err, ragotIds) {
    async.parallel(ragotIds.map(function(id) {
      return function(cb) { redisClient.get('ragots:'+id, cb); };
    }), function(err, ragots) {
      res.render('index.jade', { ragots: ragots });
    });
  });
});

app.post('/ragots', function(req, res) {
  redisClient.incr('ragots:count', function(err, i) {
    async.parallel([
      function(cb) { redisClient.set('ragots:'+i, req.body.message, cb); },
      function(cb) { redisClient.lpush('ragots', i, cb); }
    ], function(err) {
      if(!err) res.redirect('/');
    });
  });
});

app.listen(process.env.PORT || 3000);
