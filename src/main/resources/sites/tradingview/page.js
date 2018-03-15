//provides us with visual feedback of well reported users
//this runs on the actual tradingview page and not in the extension scope!

//add font awesome
$("head").append("<link id='fontawesome' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' type='text/css' rel='stylesheet' />");

//call the isaacification process
isaacification();

/**
 * starts the isaacification progress of the current page
 */
function isaacification() {

  console.log("starting isaacification");
  //update all the user icons on the page with Isaac data
  var counter = 0;

  //filter out all the usernames
  var userNamesToFetch = [];
  $('.tv-user-link__name, .tv-chart-view__title-user-name').each(function(index, value) {
    var userName = $(value).text();
    if (!userNamesToFetch.includes(userName)) {
      userNamesToFetch.push(userName);
    }
  });

  console.log("discovered " + userNamesToFetch.length + " users on this page`");
  //required for progress bar
  var totalActionsTodo = (userNamesToFetch.length) * 2;

  if (userNamesToFetch.length > 0) {
    //define a progress bar for isaacification between the navigation bar and the main page
    $('.tv-content').prepend("<div id='isaacificationProgress'><div class='progress-label'>Isaacification in progress...</div></div>");

    $("#isaacificationProgress").progressbar({
      value: 0,
      max: totalActionsTodo

    });

    //contains all ajax call responses for a given username to avoid duplicated calls
    var userNameResponse = {};

    //helper function, used to chain promises
    function getAjaxDeferred(url, value, progress) {
      return function() {
        // wrap with a deferred
        var defer = $.Deferred();
        $.ajax({
          url: url,
          method: 'GET'
        }).success(function(response) {
          userNameResponse[value] = response;
        }).complete(function() {
          //update the progress bar, independent of errors
          $("#isaacificationProgress").progressbar('value', progress);

          defer.resolve();
        });
        // return a promise so that we can chain properly in the each
        return defer.promise();
      };
    }

    //collect all the ajax responses
    var base = $.when({});

    $.each(userNamesToFetch, function(index, value) {
      var progress = index / totalActionsTodo * 100;
      base = base.then(getAjaxDeferred(isaacTradingViewEvaluation+ "tradingView/" + value, value, progress));
    });

    base.then(function() {
      // do something finally

      $('.tv-user-link__name, .tv-chart-view__title-user-name').each(function(index, value) {
        var userName = $(value).text();
        var response = userNameResponse[userName]
        var progress = (userNamesToFetch.length + index) / totalActionsTodo * 100;

        $("#isaacificationProgress").progressbar('value', progress);

        console.log("evaluating: " + userName + " overal progress is " + progress);
        //request the statistics for the user

        if (response != undefined) {
          if (response.evaluations.length > 0) {

            //calculate the overal score
            var positiveEvaluations = 0;
            var negativeEvaluations = 0;

            $.each(response.evaluations, function(index, value) {
              positiveEvaluations = value.acceptanceCount + positiveEvaluations;
              negativeEvaluations = value.rejectionCount + negativeEvaluations;
            });

            var totalEvaluationsScore = positiveEvaluations + (negativeEvaluations * -1);

            console.log('positive: ' + positiveEvaluations);
            console.log('negative: ' + negativeEvaluations);
            console.log('total score: ' + totalEvaluationsScore);

            if (totalEvaluationsScore > 0) {
              //if it's an idea, color it light green to make it stand out
              var elementToHide = $(value).parent().parent().parent().parent().parent();

              if (elementToHide.hasClass("js-widget-idea")) {
                elementToHide.css("background-color", "#e8ffe9");
              }
            } else if (totalEvaluationsScore < 0) {
              //if it's an idea, color it light red to make it stand out
              var elementToHide = $(value).parent().parent().parent().parent().parent();

              if (elementToHide.hasClass("js-widget-idea")) {
                elementToHide.css("background-color", "#ffcece");
              }
            }

            //render scores
            $(value).prepend("<div style='min-width:150px; padding-bottom:5px'>Isaac: <i class='fa fa-plus-circle fa-fw' aria-hidden='true' data-toggle='tooltip' title='positive evaluations' style='color: green; padding-left: 5px; padding-right: 5px '><span style='padding-left:5px; padding-right: 5px;'>" + positiveEvaluations + "</span></i><i class='fa fa-minus-circle fa-fw' aria-hidden='true' data-toggle='tooltip' title='negative evaluations' style='color: red; padding-left: 10px'><span style='padding-left:5px'>" + negativeEvaluations + "<span></i></div>");
          }
        } else {
          console.log("no response observed for " + userName);
        }

        $("#isaacificationProgress").fadeOut();
      });
    });
  } else {
    console.log("no isaacification required on this page");
  }
}
