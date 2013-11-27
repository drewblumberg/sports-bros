var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Relationship = mongoose.Schema({
  friend1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  friend2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

Relationship.plugin(uniqueValidator);
mongoose.model('Relationship', Relationship);