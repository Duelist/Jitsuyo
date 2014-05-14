var express = require('express'),
    path = require('path'),
    redis = require('redis'),
    redis_client = redis.createClient(),
    router = express.Router(),
    app = module.exports = express();

redis_client.on('error', function(err) {
  console.log("Redis client error: " + err);
});

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '/public')));

router.use(function (req, res, next) {
  console.log(req['method'] + " " + req['url']);
  next();
});

router.get('/', function(req, res) {
  res.render('tasker');
});

router.post('/', function(req, res) {
  res.render('tasker');
});

app.use('/tasker', router);
