// var colors = require('colors');
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  var currentUserId = req.session.userId;
  var currentUserEmail = req.session.email;
  res.render('home/index', {title: 'Sports Bros', currentUserId: currentUserId, currentUserEmail: currentUserEmail});
};
