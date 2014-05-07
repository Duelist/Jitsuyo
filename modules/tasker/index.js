var express = require('express'),
    path = require('path'),
    app = module.exports = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/tasker', function(req, res) {
  res.render('tasker');
});
