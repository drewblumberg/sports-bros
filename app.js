var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');
var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/sports-bros');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/users/new', users.new);
app.post('/users/new', users.create);
app.put('/login', users.login);

var server = require('http').createServer(app);
server.listen(app.get('port'));
