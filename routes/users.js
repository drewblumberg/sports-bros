var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');
var Team = mongoose.model('Team');
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
  User.findById(req.params.id, function(err, user){
    if(!err){
      Team.find(function(err, teams){
        res.render('users/show', {status: 'ok', user: user, teams: teams});
      });
    } else {
      res.send({status: 'User not found.'});
    }
  });
}



