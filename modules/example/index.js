var express = require('express'),
    path = require('path'),
    router = express.Router();
    app = module.exports = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

router.use(function (req, res, next) {
  console.log(req['method'] + " " + req['url']);
  next();
});

router.get('/', function(req, res) {
  res.render('example');
});

app.use('/example', router);
