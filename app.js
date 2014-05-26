var fs = require('fs'),
  express = require('express'),
  path = require('path'),
  app = express();

app.use('/static', express.static(path.join(__dirname, '/bower_components/bootstrap/dist')));
app.use('/static/js', express.static(path.join(__dirname, '/bower_components/jquery/dist')));
app.use('/static/js', express.static(path.join(__dirname, '/bower_components/momentjs/min/')));

var module_dir = path.join(__dirname, '/modules');
fs.readdirSync(module_dir).forEach(function(file) {
  var module_path = path.join(module_dir, '/', file);
  fs.stat(module_path, function (err, stats) {
    app.use(require(module_path));
  });
});

app.get('/', function(req, res) {
  res.redirect('/dashboard');
});

app.listen(3000);
