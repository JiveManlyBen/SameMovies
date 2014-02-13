function Media(Title, imdbID) {
  this.Title = Title;
  this.imdbID = imdbID;
  this.isLoaded = false;
}

Media.prototype.load = function (data) {
  function getArray(string) {
    return typeof string === 'undefined' ? [] : string.split(", ");
  }
  this.Year = parseInt(data.Year);
  this.Rated = data.Rated;
  this.Released = data.Released;
  this.Runtime = data.Runtime;
  this.Genre = data.Genre;
  this.Director = getArray(data.Director);
  this.Writer = data.Writer;
  this.Actors = getArray(data.Actors);
  this.Plot = data.Plot;
  this.Country = data.Country;
  this.Awards = data.Awards;
  this.Poster = data.Poster;
  this.Metascore = parseFloat(data.Metascore);
  this.imdbRating = parseFloat(data.imdbRating);
  this.Type = data.Type;
  this.isLoaded = true;
}

Media.getComparison = function (m1, m2) {
  function alignArrays(list1, list2) {
    var arr1 = list1.slice(0), arr2 = list2.slice(0);
    var aligned = [], tmp1 = [], tmp2 = [];
    for(var i = 0, len = Math.max(arr1.length, arr2.length); i < len; i++) {
      var idx1 = typeof arr1[i] === 'undefined' ? -1 : arr2.indexOf(arr1[i]);
      var idx2 = typeof arr2[i] === 'undefined' ? -1 : arr1.indexOf(arr2[i]);
      if (idx1 > -1) {
        tmp1.push(arr1[i]);
        tmp2.push(arr1[i]);
        arr1[i] = undefined;
        arr2[idx1] = arr2[i];
        arr2[i] = undefined;
      }
      else if (idx2 > -1) {
        tmp1.push(arr2[i]);
        tmp2.push(arr2[i]);
        arr2[i] = undefined;
        arr1[idx2] = arr1[i];
        arr1[i] = undefined;
      }
      else {
          tmp1.push(arr1[i]);
          arr1[i] = undefined;
          tmp2.push(arr2[i]);
          arr2[i] = undefined;
      }
    }
    arr1.forEach(function(element, index) {
      if (typeof element !== 'undefined')
        tmp1.push(element);
    });
    arr2.forEach(function(element, index) {
      if (typeof element !== 'undefined')
        tmp2.push(element);
    });
    aligned.push(tmp1);
    aligned.push(tmp2);
    return aligned;
  }
  var fields = [];
  ["Director", "Writer", "Actors", "Year", "Genre"].map(function(element) {
    if (m1[element] instanceof Array && m2[element] instanceof Array) {
      var aligned = alignArrays(m1[element], m2[element]);
      fields.push({name: element, first: aligned[0], second: aligned[1]});
    } 
    else
      fields.push({name: element, first: m1[element], second: m2[element]});
  });
  return fields;
}
