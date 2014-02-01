
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
  function pathForSearch(term) {
    return '/?i=&s=' + term.replace("  ", " ", "gi").replace(" ", "+", "gi");
  }
  function requestError(err) {
    console.error(err+""); 
    console.error("Could not connect to " + options.host);
    res.render('compare', options.page);
  }
  var terms = [ req.body.first, req.body.second ];
  var options = {
    host: 'www.omdbapi.com',
    port: 80,
    path: '/?i=&s=',
    method: 'POST',
    queries: [ req.body.first, req.body.second ],
    page: { title: 'Compare Movies', section: 'movies', action: 'compare', results: [], terms: terms }
  };

  options.path = pathForSearch(terms[0]);
  var request1 = require('http').request(options, function(response1) {
    response1.setEncoding('utf8');
    response1.on('data', function(chunk1) {
      console.log('body: ' + chunk1);
      options.path = pathForSearch(terms[1]);
      var result = JSON.parse(chunk1).Search;
      if (result)
        options.page.results.push(result);
      var request2 = require('http').request(options, function(response2) {
        response2.setEncoding('utf8');
        response2.on('data', function(chunk2) {
          console.log('body: ' + chunk2);
          var result = JSON.parse(chunk2).Search;
          if (result)
            options.page.results.push(result);
          res.render('compare', options.page);
        });
      });
      request2.on('error', requestError).end();
    });
  });
  request1.on('error', requestError).end();
};
