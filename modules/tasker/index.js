var express = require('express'),
    app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/tasker', function(req, res) {
  res.render('tasker');
});
