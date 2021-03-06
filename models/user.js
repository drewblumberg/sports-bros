var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var __ = require('lodash');

var User = mongoose.Schema({
  name: {type: String, required: true, min: 3},
  password: {type: String, required: true, min: 5},
  email: {type: String, required: true, unique: true, match: [/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/, 'Email is not in the correct format.']},
  location: {type: String, min: 4},
  birthday: {type: Date},
  isSetup: {type: Boolean, default: false},
  favTeams: [{}],
  pendingFriends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Relationship'}],
  createdAt: {type: Date, default: Date.now}
});

User.pre('save', function(next){
  if(!this.favTeams.length){
    var leagues = ['nfl', 'nba', 'mlb', 'nhl'];
    this.favTeams = __.map(__.range(leagues.length), function(num){ return {league: leagues[num]}; });
  }

  next();
});

User.plugin(uniqueValidator);
mongoose.model('User', User);