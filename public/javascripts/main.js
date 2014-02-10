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
  function loadFromButtons() {
    ["first", "second"].map(function(element, index) {
      if ($("button.compare-results."+element).length > 0) {
        fetchInfo($("button.compare-results."+element).val());
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
  function fetchInfo(imdbID) {
    $.ajax({
      type: "POST",
      url: "http://www.omdbapi.com/?i=" + imdbID,
      dataType: 'json',
      success: function(data) {
        var media = compareResults[imdbID];
        media.load(data);
        compareResults[imdbID] = media;
        showComparison();
      }
    });
  }
  function showComparison() {
    if ($("button.compare-results."+"first").length > 0 && $("button.compare-results."+"second").length > 0) {
      var ids = [];
      ids[0] = $("button.compare-results."+"first").val();
      ids[1] = $("button.compare-results."+"second").val();
      var arr = Media.getComparison(compareResults[ids[0]], compareResults[ids[1]]);
console.log(arr);
      $("#results-group").empty();
      arr.map(function(e) {
        var name = "<button type=\"button\" class=\"btn btn-default name\">" + e.name + "</button>";
        var first = "<button type=\"button\" class=\"btn btn-default first\">" + e.first + "</button>";
        var second = "<button type=\"button\" class=\"btn btn-default second\">" + e.second + "</button>";
        $("#results-group").append($("<div class=\"btn-group results-row\">" + first + name + second + "</div><br />"));
      });
    }
  }
  var compareResults = [];
  readResultsFromComponents();
  loadFromButtons();
  $(".dropdown-menu li a").click(function(event){
    var media = getMediaFromListItem($(this));
    media = compareResults[media.imdbID];
    console.log("imdbID: " + media.imdbID);
    if (!media.isLoaded) {
      fetchInfo(media.imdbID);
    }
    updateSelectionOptions($(this).hasClass("first") ? "first" : "second", getMediaFromListItem($(this)).imdbID);
    showComparison();
    $(this).parents(".btn-group").removeClass("open");
    event.preventDefault();
    return false;
  });
});
