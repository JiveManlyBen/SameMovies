jQuery(function ($) {
  function readResultsFromComponents() {
    ["first", "second"].map(function(element, index) {
      var result = { Title: $("button.compare-results."+element).text(), imdbID: $("button.compare-results."+element).val() };
      compareResults[index].push(result);
      $("a.compare-results."+element).each(function(i, element) {
        var result = { Title: element.text, imdbID: $(this).attr("href").replace("#", "", "gi") };
        compareResults[index].push(result);
      });
    });
  }
  var compareResults = [];
  compareResults[0] = [];
  compareResults[1] = [];

  $(".dropdown-menu li a").click(function(event){
    console.log("imdbID: " + $(this).attr("href").replace("#", "", "gi"));
    event.preventDefault();
    return false;
  });
});
