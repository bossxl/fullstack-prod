var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var Todo = require('./models/todo');
var User = require('./models/user');
var router = express.Router();

mongoose.connect('mongodb://localhost/todo-app');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));






router.use(logger());

app.use('/api', router);

router.get('/', function(req, res) {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});


router.route('/todos')
  .post(function(req, res) {
    var todo = new Todo(); // create a new instance of the Todo model
    todo.name = req.body.name; // set the todos name (comes from the request)

    // save the todo and check for errors
    todo.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Todo created!'
      });
    });
  })
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err) {
        res.send(err);
      }

      res.json(todos);
    });
  });
router.route('/todos/:todo_id')
  .get(function(req, res) {
    Todo.findById(req.params.todo_id, function(err, todo) {
      if (err) {
        res.send(err);
      }
      res.json(todo);
    });
  })
  .put(function(req, res) {

    // use our todo model to find the todo we want
    Todo.findById(req.params.todo_id, function(err, todo) {

      if (err) {
        res.send(err);
      }

      todo.name = req.body.name; // update the todos info

      // save the todo
      todo.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({
          message: 'Todo updated!'
        });
      });

    });
  })
  .delete(function(req, res) {
    Todo.remove({
      _id: req.params.todo_id
    }, function(err, bear) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Successfully deleted'
      });
    });
  });


router.route('/users')
  .post(function(req, res) {
    var user = new User(); // create a new instance of the User model
    user.name = req.body.name; // set the users name (comes from the request)

    // save the user and check for errors
    user.save(function(err) {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'User created!'
      });
    });
  });
router.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  })
  .put(function(req, res) {

    // use our user model to find the user we want
    User.findById(req.params.user_id, function(err, user) {

      if (err) {
        res.send(err);
      }

      user.name = req.body.name; // update the users info

      // save the user
      user.save(function(err) {
        if (err) {
          res.send(err);
        }

        res.json({
          message: 'User updated!'
        });
      });

    });
  });


var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
