var mongoose = require('mongoose');
var User = mongoose.model('User');
var Team = mongoose.model('Team');
var Relationship = mongoose.model('Relationship');
var __ = require('lodash');

exports.create = function(req, res){
  var id = req.body.id;
  var relationship = new Relationship();
  relationship.friend1 = req.session.userId;
  relationship.friend2 = id;

  relationship.save(function(err){
    if(!err){
      console.log(relationship);
      res.send({status: 'ok', relId: relationship.id});
    } else {
      res.send({status: 'error'});
    }
  });
}