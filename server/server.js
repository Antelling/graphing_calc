#!/usr/bin/env node
"use strict";

module.exports = function() {
  var path = require("path");
  var express = require("express");
  var app = express();

  app.use(express.static("./static_files"));

  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, "../static_files/graphingcalc.html"));
  });

  var server = app.listen(3000, function () {

    var host = process.env.IP;
    var port = process.env.PORT || 8000;

    console.log('Example app listening at http://%s:%s', host, port);

  });
};
