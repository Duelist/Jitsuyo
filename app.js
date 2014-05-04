var fs = require('fs');
var express = require('express');
var path = require('path');
var app = express();

var module_dir = path.join(__dirname, '/modules');
fs.readdirSync(module_dir).forEach(function(file) {
  var module_path = path.join(module_dir, '/', file);
  fs.stat(module_path, function (err, stats) {
    app.use(require(module_path));
  });
});

app.listen(3000);
