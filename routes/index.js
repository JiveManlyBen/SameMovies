
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express', section: 'home' });
};

exports.about = function(req, res){
  res.render('about', { title: 'About', section: 'about' });
};
