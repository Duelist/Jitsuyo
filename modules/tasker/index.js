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

function getTasks(client, response) {
  client.get('tasklist', function (err, tasklist) {
    console.log("GET TASKS");
    console.log(tasklist);
    // response.send(200, tasks);
  });
}

function saveTask(task, client, response) {
  client.incr('global:taskID', function (err, id) {
    client.set('tasks:' + id, JSON.stringify(task), function (err, reply) {
      client.rpush('tasklist', id, function (err, reply) {
        console.log("ADD TASK");
        response.send(200, reply);
      });
    });
  });
}

function removeTask(id, client) {
  /*
  client.lset('tasks', 1, 'deleted', function (err, reply) {
    console.log("Task " + id + " removed.");
  });
  */
}

router.use(function (req, res, next) {
  console.log(req['method'] + " " + req['url']);
  next();
});

router.get('/', function (req, res) {
  res.render('tasker');
});

router.get('/tasks', function (req, res) {
  getTasks(redis_client, res);
});

router.post('/tasks', function (req, res) {
  saveTask(req.body, redis_client, res);
});

app.use('/tasker', router);
