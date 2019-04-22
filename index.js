var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(bodyParser.json());

server.listen(3000);

app.io = io;

app.post('/event/:name',function(req, res){
  let event = req.params.name;
  let data = req.body.data;
  
  req.app.io.emit(event, data);

  res.send('success');
})

/// CLIENTE
io.on('connection', function (socket) {
  socket.on('create', function (data) {
    console.log(data);
  });
});