var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Team = mongoose.Schema({
  name: {type: String, required: true, min: 3},
  league: {type: String, required: true},
  createdAt: {type: Date, default: Date.now}
});

Team.plugin(uniqueValidator);
mongoose.model('Team', Team);