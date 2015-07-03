module.exports = function() {
  var path = require("path");
  var express = require("express");
  var app = express();

  app.use(express.static("./static_files"));

  app.get('/', function (req, res) {
    res.sendFile(path.resolve(process.cwd(), "./static_files/graphingcalc.html"));
  });

  var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

  });
};
