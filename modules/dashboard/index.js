var express = require('express'),
    path = require('path'),
    router = express.Router(),
    app = module.exports = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

router.get('/', function(req, res) {
  res.render('dashboard');
});

app.use('/dashboard', router);
