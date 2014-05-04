var express = require('express'),
    app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/example', function(req, res) {
  res.render('example');
});
