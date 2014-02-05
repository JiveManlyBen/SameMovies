jQuery(function ($) {
  function readResultsFromComponents() {
    ["first", "second"].map(function(element, index) {
      if ($("button.compare-results."+element).length > 0) {
        $("a.compare-results."+element).each(function(i, e) {
          var media = getMediaFromListItem($(this));
          compareResults[media.imdbID] = media;
        });
      }
    });
  }
  function updateSelectionOptions(key, selectedID) {
    $("a.compare-results."+key).each(function(i, e) {
      var media = getMediaFromListItem($(this));
      if (media.imdbID === selectedID) {
        $(this).hide();
        $("button.compare-results."+key).val(media.imdbID);
        $("button.compare-results."+key).text(media.Title);       
        $("#"+key).val(media.Title);
      }
      else
        $(this).show();
    });
  }
  function getMediaFromListItem(e) {
    return new Media(e.text(), e.attr("href").replace("#", ""));
  }
  var compareResults = [];

  readResultsFromComponents();
  $(".dropdown-menu li a").click(function(event){
    console.log("imdbID: " + getMediaFromListItem($(this)).imdbID);
    updateSelectionOptions($(this).hasClass("first") ? "first" : "second", getMediaFromListItem($(this)).imdbID);
    $(this).parents(".btn-group").removeClass("open");
    event.preventDefault();
    return false;
  });
});
