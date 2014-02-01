
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.compareForm = function(req, res){
  res.render('compare', { title: 'Compare movies', section: 'movies', action: 'compare', results: null });
};

exports.compare = function(req, res){ 
  var terms = [ req.body.first, req.body.second ];

  res.render('compare', { title: 'Compare movies', section: 'movies', action: 'compare', results: [], terms: terms });
};
