require('coffee-script');
var express = require('express');

var app = express();
app.use(express.bodyParser());
app.use(require('connect-assets')());

var http = require('http')
var server = http.createServer(app)
var io = require('socket.io').listen(server);

var websocket = require('./lib/websocket')(io);
var Ragot = require('./lib/models/ragot');

var logger = function(req, res, next) {console.log(req.body); next();};

var auth = express.basicAuth(function(user, pass) {
  return pass == process.env.PASSWORD;
});

app.use(logger);
if(process.env.PASSWORD) app.use(auth);

app.get('/', function(req, res) {
  Ragot.findAll(function(err, ragots) {
    res.render('index.jade', { ragots: ragots });
  });
});

app.post('/ragots', function(req, res) {
  var ragot = new Ragot(req.body.ragot);
  
  ragot.create(function(err) {
    if(err) {
      res.status(422);
    } else {
      websocket.broadcastRagot(ragot);
      res.status(201);
    }
    res.end();
  });

  return null;
});

server.listen(process.env.PORT || 3000);
