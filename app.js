var express = require('express');
var mongoose = require('mongoose');

// model definitions
require('require-dir')('./models');
var middleware = require('./lib/middleware');

// route definitions
var home = require('./routes/home');
var users = require('./routes/users');
var teams = require('./routes/teams');
var relationships = require('./routes/relationships');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/sports-bros');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/users/new', users.new);
app.post('/users/new', users.create);
app.get('/users/index', users.index);
app.get('/users/:id/pending', users.pendingFriends);
app.get('/users/:id', users.show);
app.put('/users/createPendingFriend', users.createPendingFriend);
app.put('/users/declineBro', users.declineBro);
app.put('/users/addBroship', users.addBroship);
app.post('/upload', users.upload);
app.put('/login', users.login);
app.get('/logout', users.logout);
app.put('/users/:id/finishSetup', users.finishSetup);
app.put('/users/:id/newFavTeam', users.saveFav);
app.post('/teams/:league', teams.getTeams);
app.post('/relationships/create', relationships.create);

var server = require('http').createServer(app);
server.listen(app.get('port'));
