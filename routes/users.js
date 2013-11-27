var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Team = mongoose.model('Team');
var __ = require('lodash');
var path = require('path');
var fs = require('fs');
var YQL = require('yql');
// var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.new = function(req, res){
  res.render('users/new', {title: 'Sports Bros | New User'});
};

exports.index = function(req, res){
  User.find(function(err, users){
    if(!err){
      var currentUserId = req.session.userId;
      var currentUserEmail = req.session.email;
      res.render('users/index', {title: 'Sports Bros | All Bros', users: users, currentUserEmail: currentUserEmail, currentUserId: currentUserId});
    }
  });
};

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;
  user.name = req.body.name;

  if (req.body.password === null){
    res.send({status: 'Please enter a password.'});
  } else if(req.body.password !== req.body.passwordconfirmation) {
    res.send({status: 'Nice try. Password Confirmation needs to be the same as the password.'})
  } else {
    bcrypt.hash(req.body.password, 10, function(err, hash){
      user.password = hash;
      user.save(function(err, user){
        if(err){
          res.send({status: err.message});
        } else {
          res.send({status: 'ok'});
        }
      });
    });
  }
};

exports.login = function(req, res){
  var email = req.body.email;
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;
            req.session.email = user.email;
            req.session.save(function(err){
              res.send({status: 'ok', email: req.session.email, id: req.session.userId});
            });
          });
        } else {
          req.session.destroy(function(err){
            res.send({status: 'Wrong password.'});
          });
        }
      });
    } else {
      res.send({status: 'Account not found.'});
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy(function(err){
    if(!err){
      res.redirect('/');
    } else {
      res.send('Session could not be destroyed.');
    }
  });
};

exports.show = function(req, res){
  new YQL.exec('select * from data.html.cssselect where url="http://www.espn.com" and css=".headlines"', function(response) {
    if(response.query.results.results){
      var dataScrapedNFL = response.query.results.results.ul.li;
      console.log(dataScrapedNFL);
      var sportsLinks = []
      __.each(dataScrapedNFL, function(link){
        var headline = link.a.content;
        var href = link.a.href;
        sportsLinks.push([headline, href]);
      });
    }

    User.findById(req.params.id, function(err, user){
      if(!err){
        Team.find(function(err, teams){
          var currentUserId = req.session.userId;
          var currentUserEmail = req.session.email;
          res.render('users/show', {status: 'ok', user: user, teams: teams, dataScraped: sportsLinks, currentUserId: currentUserId, currentUserEmail: currentUserEmail});
        });
      } else {
        res.send({status: 'User not found.'});
      }
    });
  });
};

exports.finishSetup = function(req, res) {
  var name = req.body.name;
  var location = req.body.location;
  var birthday = req.body.birthday;
  var isSetup = req.body.isSetup;
  User.findById(req.params.id, function(err, user){
    if(!err){
      user.name = name;
      user.location = location;
      user.birthday = birthday;
      user.isSetup = isSetup;
      user.save(function(err, user){
        res.send({status: 'ok'});
      });
    } else {
      res.send({status: 'User not found.'});
    }
  });
};

exports.saveFav = function(req, res){
  var league = req.body.league;
  var teamName = req.body.teamName;
  var teamReason = req.body.teamReason;
  console.log(req.params.id);
  User.findById(req.params.id, function(err, user){
    if(!err){
      __.each(user.favTeams, function(team){
        if(team.league === league){
          team.teamReason = teamReason;
          team.teamName = teamName;
        }
      });

      user.markModified('favTeams');

      user.save(function(err, user){
        res.send({status: 'User Saved'});
      });
    } else {
      res.send({status: 'No User Found'});
    }
  });
};

exports.upload = function(req, res){
  var tempPath = req.body.path;
  // var userId = req.body.userId;
  if (tempPath.substr(tempPath.length-4) === '.png') {
    var targetPath = path.resolve('./uploads/image.png');
    // var targetPath = path.resolve('./uploads/' + userId + '/image.png');
    console.log(targetPath);
    fs.rename(tempPath, targetPath, function(err) {
      if(!err){
        console.log("Upload completed!");
        res.send({status: 'Saved!'});
      } else {
        res.send({status: 'Failed!', err: err});
      }
    });
  } else {
    fs.unlink(tempPath, function(){
      console.error("Only .png files are allowed!");
      res.send({status: 'File not allowed'});
    });
  }
};

exports.getProfilePic = function(req, res){
  var userId = req.body.id;
  res.sendfile(path.resolve('./uploads/' + userId + '/image.png'));
};



