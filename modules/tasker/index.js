var express = require('express'),
    body_parser = require('body-parser'),
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
app.use(body_parser.json());

function getTasks(client) {
  client.lrange('tasks', 0, 1, function (err, reply) {
    console.log("Tasks found.");
    console.log(reply);
  });
}

function saveTask(task, client, response) {
  redis_client.rpush('tasks', JSON.stringify(task), function (err, reply) {
    console.log("Task added.");
    response.send(200, task);
  });
}

function removeTask(id, client) {
  client.lset('tasks', 1, 'deleted', function (err, reply) {
    console.log("Task " + id + " removed.");
  });
}

router.use(function (req, res, next) {
  console.log(req['method'] + " " + req['url']);
  next();
});

router.get('/', function(req, res) {
  res.render('tasker');
});

router.post('/', function(req, res) {
  saveTask(req.body, redis_client, res);
});

app.use('/tasker', router);
