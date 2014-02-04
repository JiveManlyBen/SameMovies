jQuery(function ($) {
  function readResultsFromComponents() {
    ["first", "second"].map(function(element, index) {
      if ($("button.compare-results."+element).length > 0) {
        var result = new Media($("button.compare-results."+element).text(), $("button.compare-results."+element).val());
        compareResults[index].push(result);
        $("a.compare-results."+element).each(function(i, element) {
          var result = getMediaFromListItem($(this));
          compareResults[index].push(result);
        });
      }
    });
  }
  function getMediaFromListItem(e) {
    return new Media(e.text(), e.attr("href").replace("#", ""));
  }
  var compareResults = [[], []];

  readResultsFromComponents();
  $(".dropdown-menu li a").click(function(event){
    console.log("imdbID: " + getMediaFromListItem($(this)).imdbID);
    $(this).parents(".btn-group").removeClass("open");
    event.preventDefault();
    return false;
  });
});
