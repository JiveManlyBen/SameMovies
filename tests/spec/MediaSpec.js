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
    var data = {"Title":"Ronin","Year":"1998","Rated":"R","Released":"25 Sep 1998","Runtime":"122 min","Genre":"Action, Adventure, Crime", "imdbVotes":"121,442"};
    media.load(data);
    expect(media.Year).toEqual("1998");
    expect(media.imdbVotes).not.toBeDefined();
  });
});
