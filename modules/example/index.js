var express = require('express'),
    path = require('path'),
    app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/example', function(req, res) {
  res.render('example');
});
