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
      else {
        $(this).show();
      }
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
    function getComparisonRow(name, first, second, isFirst) {
      function getDisplayButton(extraClasses, positionClass, value) {
        var displayValue, shouldDisplay = typeof value !== 'undefined';
        displayValue = (value instanceof Writer) ? value.getDisplayName() : value;
        return "<button type=\"button\" class=\"btn btn-default " + positionClass + " " + extraClasses + (shouldDisplay ? '' : ' no-show') + "\">" + displayValue + "</button>";
      }
      var extraClasses = "", isEqual = first === second;
      if (first instanceof Writer && second instanceof Writer) {
        isEqual = first.namesEqual(second);
      }
      if (isEqual) {
        extraClasses = " btn-success";
      }
      var nameButton = "<button type=\"button\" class=\"btn btn-default name" + extraClasses + "\">" + name + "</button>";
      var firstButton = getDisplayButton(extraClasses, "first", first);
      var secondButton = getDisplayButton(extraClasses, "second", second);
      return $("<div class=\"btn-group results-row" + (isFirst ? " top" : "") + "\">" + firstButton + nameButton + secondButton + "</div>");
    }
    function getRatingsRow(side, justify, rating) {
      var style = "progress-bar ", normalized = rating * 10, ratingDisplay = rating.toFixed(1) + "/10.0";
      if (normalized < 75 && normalized >= 50) {
        style += "progress-bar-success";
      }
      else if (normalized < 50 && normalized >= 25) {
        style += "progress-bar-warning";
      }
      else if (normalized < 50 && normalized >= 25) {
        style += "progress-bar-danger";
      }
      else if (isNaN(normalized)) {
        style = "progress-blank";
        normalized = 100;
        ratingDisplay = "Not yet rated";
      }
      return $("<div class=\"progress results-rating " + side + "\"><div class=\"" + style + " " + justify + "\" style=\"width: " + normalized + "%\"><span class=\"\">" + ratingDisplay + "</span></div></div>");
    }
    if ($("button.compare-results."+"first").length > 0 && $("button.compare-results."+"second").length > 0) {
      var ids = [];
      ids[0] = $("button.compare-results."+"first").val();
      ids[1] = $("button.compare-results."+"second").val();
      if (compareResults[ids[0]].isLoaded && compareResults[ids[1]].isLoaded) {
        var arr = Media.getComparison(compareResults[ids[0]], compareResults[ids[1]]);
        $("#results-group").empty();
        arr.map(function(e) {
          if (e.first instanceof Array && e.second instanceof Array) {
            var maxElements = Math.max(e.first.length, e.second.length);
            for (var i = 0; i < maxElements; i++) {
              $("#results-group").append(getComparisonRow(e.name, e.first[i], e.second[i], (i === 0)));
            }
          }
          else {
            $("#results-group").append(getComparisonRow(e.name, e.first, e.second, true));
          }
        });
        $("#results-group").append(getRatingsRow("left", "right", compareResults[ids[0]].imdbRating));
        $("#results-group").append("<div class=\"results-rating-label\">Rating</div>");
        $("#results-group").append(getRatingsRow("right", "left", compareResults[ids[1]].imdbRating));
      }
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
