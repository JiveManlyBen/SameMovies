
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
  var results = { first: [{"Title":"MASH","Year":"1970","imdbID":"tt0066026","Type":"movie"},{"Title":"Mash Up","Year":"2011","imdbID":"tt1877697","Type":"movie"}],
    second: [{"Title":"Star Trek","Year":"2009","imdbID":"tt0796366","Type":"movie"},{"Title":"Star Trek Into Darkness","Year":"2013","imdbID":"tt1408101","Type":"movie"}] };
  res.render('compare', { title: 'Compare movies', section: 'movies', action: 'compare', results: results });
};
