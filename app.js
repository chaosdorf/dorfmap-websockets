var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

io.sockets.on('connection', function (socket) {
  socket.on('toggle', function (data) {
    socket.broadcast.emit('toggle', data);
  });

  socket.on('blinkencontrol', function(data) {
    socket.broadcast.emit('blinkencontrol',data);
  })
});
