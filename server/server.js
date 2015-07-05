#!/usr/bin/env node
"use strict";

module.exports = function() {
  var path = require("path");
  var express = require("express");
  var app = express();

  app.use(express.static("./public"));

  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, "../public/graphingcalc.html"));
  });

  var server = app.listen(process.env.PORT || 8000, function () {
    console.log("server active")
  });
};
