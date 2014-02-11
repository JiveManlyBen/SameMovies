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
    expect(media.isLoaded).toBe(true);
    expect(media.Year).toEqual(1998);
    expect(media.Metascore).toEqual(67);
    expect(media.imdbRating).toEqual(7.3);
    expect(media.imdbVotes).not.toBeDefined();
    expect(media.Actors.length).toEqual(4);
    expect(media.Actors[3]).toEqual("Stellan Skarsgård");
    data = {"Title":"Ronin","Year":"1998","Rated":"R","Released":"25 Sep 1998","Runtime":"122 min","Genre":"Action, Adventure, Crime","Actors":"Robert De Niro"};
    media.load(data);
    expect(media.Actors.length).toEqual(1);
  });

  it("should return comparison array", function() {
    var m1 = new Media("Star Wars: Episode V - The Empire Strikes Back", "tt0080684"), m2 = new Media("Star Wars: Episode VI - Return of the Jedi", "tt0086190");
    m1.load({"Title":"Star Wars: Episode V - The Empire Strikes Back","Year":"1980","Rated":"PG","Released":"21 May 1980","Runtime":"124 min","Genre":"Action, Adventure, Sci-Fi","Director":"Irvin Kershner","Writer":"Leigh Brackett (screenplay), Lawrence Kasdan (screenplay), George Lucas (story)","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams","Plot":"After the rebels have been brutally overpowered by the Empire on their newly established base, Luke Skywalker takes advanced Jedi training with Master Yoda, while his friends are pursued by Darth Vader as part of his plan to capture Luke.","Language":"English","Country":"USA","Awards":"Won 1 Oscar. Another 12 wins & 16 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg","Metascore":"78","imdbRating":"8.8","imdbVotes":"549,380","imdbID":"tt0080684","Type":"movie","Response":"True"});
    var result = Media.getComparison(m1, m2);
    expect(result.length).toEqual(5);
    expect(result[0]["name"]).toEqual("Director");
    expect(result[0]["first"]).toEqual("Irvin Kershner");
    expect(result[0]["second"]).toEqual(undefined);
    expect(result[3]["name"]).toEqual("Year");
    expect(result[3]["first"]).toEqual(1980);
    expect(result[3]["second"]).toBe(undefined);
    m2.load({"Title":"Star Wars: Episode VI - Return of the Jedi","Year":"1983","Rated":"PG","Released":"25 May 1983","Runtime":"134 min","Genre":"Action, Adventure, Fantasy","Director":"Richard Marquand","Writer":"Lawrence Kasdan (screenplay), George Lucas (screenplay), George Lucas (story)","Actors":"Mark Hamill, Harrison Ford, Carrie Fisher, Billy Dee Williams","Plot":"After rescuing Han Solo from the palace of Jabba the Hutt, the Rebels attempt to destroy the Second Death Star, while Luke Skywalker tries to bring his father back to the Light Side of the Force.","Language":"English","Country":"USA","Awards":"Nominated for 4 Oscars. Another 12 wins & 14 nominations.","Poster":"http://ia.media-imdb.com/images/M/MV5BMjE5MTM3ODU5MV5BMl5BanBnXkFtZTcwOTYzNjk2OQ@@._V1_SX300.jpg","Metascore":"52","imdbRating":"8.4","imdbVotes":"435,424","imdbID":"tt0086190","Type":"movie","Response":"True"});
    result = Media.getComparison(m1, m2);
    expect(result.length).toEqual(5);
    expect(result[0]["name"]).toEqual("Director");
    expect(result[0]["first"]).toEqual("Irvin Kershner");
    expect(result[0]["second"]).toEqual("Richard Marquand");
    expect(result[3]["name"]).toEqual("Year");
    expect(result[3]["first"]).toEqual(1980);
    expect(result[3]["second"]).toEqual(1983);
 });
});
