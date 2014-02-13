describe("Writer", function() {
  var writer1, writer2, writer3, writer4;

  beforeEach(function() {
    writer1 = new Writer("Will Ferrell"), writer2 = new Writer("Will Ferrell (screenplay)"), 
    writer3 = new Writer("Will Ferrell (story)"), writer4 = new Writer("Adam McKay (story)");
  });

  it("should create names and types for writers", function() {
    expect(writer1.Name).toEqual(writer2.Name);
    expect(writer1.types instanceof Array).toBeTruthy();
    expect(writer1.types.length).toEqual(0);
    expect(writer2.types[0]).toEqual("screenplay");
  });

  it("should merge writers", function() {
    expect(writer1.types.length).toEqual(0);
    writer1.merge(writer2);
    expect(writer1.types.length).toEqual(1);
    writer2.merge(writer3);
    expect(writer2.types.length).toEqual(2);
    expect(writer2.merge(writer3)).toBe(true);
    expect(writer3.merge(writer4)).toBe(false);
  });
});
