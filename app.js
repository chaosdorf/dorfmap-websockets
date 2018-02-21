const primus = new require("primus").createServer({
  port: process.env.PORT || 3001,
  transformer: "uws",
  iknowhttpsisbetter: true
});

function saveClient() {
  const { minify } = require('uglify-js');
  const fs = require('fs');
  const minified = minify(primus.library());
  fs.writeFileSync('./primusClient.js', minified.code);
  process.exit(0);
}
// saveClient();

primus.on("connection", function(spark) {
  spark.on("data", function(device) {
    primus.forEach(function(s) {
      if (s.id !== spark.id) {
        s.write(device);
      }
    });
  });
});
