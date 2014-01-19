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
if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var RedisStore = require("redis").createClient(rtg.port, rtg.hostname);
    RedisStore.auth(rtg.auth.split(":")[1]);
} else {
  var RedisStore = require('connect-redis')(express);  
}
mongoose.connect('mongodb://drewblumberg:1234@alex.mongohq.com:10041/sports-bros');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', home.index);
app.get('/users/new', users.new);
app.post('/users/new', users.create);
app.get('/users/index', users.index);
app.get('/users/:id/pending', users.pendingFriends);
app.get('/users/:id/mybros', users.myBros);
app.get('/users/:id/edit', users.edit);
app.put('/users/:id/update', users.update);
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
