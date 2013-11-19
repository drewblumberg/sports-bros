var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');

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

var server = require('http').createServer(app);
server.listen(app.get('port'));
