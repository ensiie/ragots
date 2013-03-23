var express = require('express');
var async = require('async');

var app = express();
app.use(express.bodyParser());
app.use(require('connect-assets')());

var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server);


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
  if(!req.body.message.replace(/\s/g,"")) {
    if(req.accepts("json")) {
      return res.json(422, { "error" : "empty" });
    } else {
      res.status(422);
      res.redirect("/");
    }
  }
  redisClient.incr('ragots:count', function(err, i) {
    async.parallel([
      function(cb) { redisClient.set('ragots:'+i, req.body.message, cb); },
      function(cb) { redisClient.lpush('ragots', i, cb); }
    ], function(err) {
      if(!err) {
        if(req.accepts("json")) {
          res.json(201, { "ragot" : { "message" : req.body.message} });
        } else {
          res.status(201);
          res.redirect("/");
        }
      }
    });
  });
  return null;
});

server.listen(process.env.PORT || 3000);
