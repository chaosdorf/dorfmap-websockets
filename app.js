const io = require('socket.io')();
io.listen(process.env.PORT || 3001);
io.on('connection', client => {
  client.on('message', data => {
    client.broadcast.send(data);
  });
});
