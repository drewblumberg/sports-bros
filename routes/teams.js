var mongoose = require('mongoose');
var Team = mongoose.model('Team');

exports.getTeams = function(req, res){
  var league = req.params.league;
  Team.find().where('league').equals(league).exec(function(err, teams){
    res.send({status: 'ok', teams: teams});
  });
};