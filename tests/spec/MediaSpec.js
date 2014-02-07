describe("Media", function() {
  var media;

  beforeEach(function() {
    media = new Media("Ronin", "tt0122690");
  });

  it("should be able to get basic field values", function() {
    expect(media.Title).toEqual("Ronin");
    expect(media.imdbID).toEqual("tt0122690");
  });

  it("should load additional fields from json", function() {
     var data = {"Title":"Ronin","Year":"1998","Rated":"R","Released":"25 Sep 1998","Runtime":"122 min","Genre":"Action, Adventure, Crime","Director":"John Frankenheimer","Writer":"J.D. Zeik (story), David Mamet (screenplay)","Actors":"Robert De Niro, Jean Reno, Natascha McElhone, Stellan Skarsgård","Plot":"A freelancing former US intelligence agent tries to track down a mysterious package that is wanted by both the Irish and the Russians.","Language":"English, French, Russian","Country":"UK, USA","Awards":"1 win & 3 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMTMyMDcyMTYyNV5BMl5BanBnXkFtZTYwOTcyOTI3._V1_SX300.jpg","Metascore":"67","imdbRating":"7.3","imdbVotes":"121,442","imdbID":"tt0122690","Type":"movie","tomatoMeter":"68","tomatoImage":"fresh","tomatoRating":"6.3","tomatoReviews":"60","tomatoFresh":"41","tomatoRotten":"19","tomatoConsensus":"This is comparable to French Connection with great action, dynamic road chase scenes, and solid performances.","tomatoUserMeter":"80","tomatoUserRating":"3.5","tomatoUserReviews":"119,637","DVD":"23 Feb 1999","BoxOffice":"N/A","Production":"MGM/UA","Website":"http://www.mgm.com/ronin/index.adv.html","Response":"True"}; 
    media.load(data);
    expect(media.Year).toEqual(1998);
    expect(media.Metascore).toEqual(67);
    expect(media.imdbRating).toEqual(7.3);
    expect(media.imdbVotes).not.toBeDefined();
    expect(media.Actors.length).toEqual(4);
    expect(media.Actors[3]).toEqual("Stellan Skarsgård");
  });
});
