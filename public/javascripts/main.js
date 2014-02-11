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
    function getComparisonRow(name, first, second, isEqual, isFirst) {
      var extraClasses = "";
      if (isEqual)
        extraClasses = " btn-success";
      var nameButton = "<button type=\"button\" class=\"btn btn-default name" + extraClasses + "\">" + name + "</button>";
      var firstButton = "<button type=\"button\" class=\"btn btn-default first" + extraClasses + "\">" + first + "</button>";
      var secondButton = "<button type=\"button\" class=\"btn btn-default second" + extraClasses + "\">" + second + "</button>";
      return $("<div class=\"btn-group results-row" + (isFirst ? " top" : "") + "\">" + firstButton + nameButton + secondButton + "</div>");
    }
    if ($("button.compare-results."+"first").length > 0 && $("button.compare-results."+"second").length > 0) {
      var ids = [];
      ids[0] = $("button.compare-results."+"first").val();
      ids[1] = $("button.compare-results."+"second").val();
      var arr = Media.getComparison(compareResults[ids[0]], compareResults[ids[1]]);
      $("#results-group").empty();
      arr.map(function(e) {
        if (e.first instanceof Array && e.second instanceof Array) {
          var maxElements = Math.max(e.first.length, e.second.length);
          for (var i = 0; i < maxElements; i++) {
            $("#results-group").append(getComparisonRow(e.name, e.first[i], e.second[i], (e.first[i] === e.second[i]), (i === 0)));
          }
        }
        else {
          $("#results-group").append(getComparisonRow(e.name, e.first, e.second, (e.first === e.second), true));
        }
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
