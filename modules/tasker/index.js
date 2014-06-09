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
  client.lrange('tasklist', 0, -1, function (err, task_ids) {
    var i,
      tasks = [];

    if (task_ids.length === 0) {
      response.send(200, tasks);
    }

    for (i = 0; i < task_ids.length; i++) {
      client.hget('tasks', task_ids[i], function (err, task) {
        tasks.push(task);

        if (tasks.length === task_ids.length) {
          response.send(200, tasks);
        }
      });
    }
  });
}

function saveTask(task, client, response) {
  client.incr('global:taskID', function (err, id) {
    task.id = id;
    client.hset('tasks', id, JSON.stringify(task), function (err, reply) {
      client.rpush('tasklist', id, function (err, reply) {
        getTasks(client, response);
      });
    });
  });
}

function getTask(id, client, response) {
  client.hget('tasks', id, function(err, task) {
    response.send(200, task);
  });
}

function removeTask(id, client, response) {
  client.lrem('tasklist', 1, id, function(err, reply) {
    client.hdel('tasks', id, function (err, reply) {
      getTasks(client, response);
    });
  });
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

router.get('/tasks/:id', function(req, res) {
  getTask(req.params.id, redis_client, res);
});

router.delete('/tasks/:id', function(req, res) {
  removeTask(req.params.id, redis_client, res);
});

app.use('/tasker', router);
