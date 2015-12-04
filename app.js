var app = new (require('koa'))();
var server = require('http').Server(app.callback());
var primus = new require('primus')(server, { transformer: 'engine.io' });
primus.use('emit', require('primus-emit'));

// primus.save('./primusClient.js');

server.listen(process.env.PORT || 3001);

primus.on('connection', function (spark) {
  spark.on('update', function (device) {
    primus.forEach(function (s) {
      if (s.id !== spark.id) {
        s.emit('update', device);
      }
    });
  });
});
