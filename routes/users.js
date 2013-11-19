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
