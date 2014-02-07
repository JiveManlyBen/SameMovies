function Media(Title, imdbID) {
  this.Title = Title;
  this.imdbID = imdbID;
}

Media.prototype.load = function (data) {
  this.Year = data.Year;
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
  this.Metascore = data.Metascore;
  this.imdbRating = data.imdbRating;
  this.Type = data.Type;
}
