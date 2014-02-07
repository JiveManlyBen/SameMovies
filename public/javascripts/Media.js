function Media(Title, imdbID) {
  this.Title = Title;
  this.imdbID = imdbID;
}

Media.prototype.load = function (data) {
  this.Year = parseInt(data.Year);
  this.Rated = data.Rated;
  this.Released = data.Released;
  this.Runtime = data.Runtime;
  this.Genre = data.Genre;
  this.Director = data.Director;
  this.Writer = data.Writer;
  this.Actors = data.Actors.split(", ");
  this.Plot = data.Plot;
  this.Country = data.Country;
  this.Awards = data.Awards;
  this.Poster = data.Poster;
  this.Metascore = parseFloat(data.Metascore);
  this.imdbRating = parseFloat(data.imdbRating);
  this.Type = data.Type;
}

Media.getComparison = function (m1, m2) {
  var fields = [];
  ["Year", "Genre", "Director", "Writer"].map(function(element) {
    fields.push({name: element, first: m1[element], second: m2[element]});
  });
  return fields;
}
