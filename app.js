var app = require('express')();
var server = require('http').Server(app);
var primus = new require('primus')(server, { transformer: 'engine.io' });
primus.use('emit', require('primus-emit'));

primus.save(__dirname +'/../public/js/primus.js');

server.listen(3001);

primus.on('connection', function (spark) {
  spark.on('toggle', function (data) {
    primus.forEach(function (s) {
      if (s.id !== spark.id) {
        s.emit('toggle', data);
      }
    });
  });

  spark.on('blinkencontrol', function(data) {
    primus.forEach(function (s) {
      if (s.id !== spark.id) {
        s.emit('blinkencontrol', data);
      }
    });
  });
});

