
/**
 * callback used by the message to update the html page
 * with the parsed values
 */
function evaluatePageHTML(page,url) {
  //simple checks for valid data
  var title =  "none provided";
  var recommendation = "none provid ed";
  var user = "none provided";
  var exchange = "none provided";
  var symbol = "none provided";
  var symbolUrl = "none provided";

  recommendation = jQuery('.tv-idea-label',page).text();
  title = jQuery('.tv-chart-view__title-name',page).text();
  user =jQuery('.tv-chart-view__title-user-name',page).text();

  var element = jQuery('a.tv-chart-view__symbol-link, a.tv-chart-view__symbol--desc',page).text();
  exchange = element.split(':')[0];
  symbol = element.split(':')[1];

  //set the form fields
  jQuery('#title').val(title);
  jQuery('#showTitle').text(title);

  jQuery('#recommendation').val(recommendation);
  jQuery('#user').val(user);
  jQuery('#showAuthor').text(user);

  jQuery('#exchange').val(exchange);
  jQuery('#symbol').val(symbol);
  jQuery('#showSymbol').text(symbol);

  //set the user fields
  jQuery('#currencyDisplay').val(symbol);
  jQuery('#userDisplay').val(user);
  jQuery('#proposedIdea').val(title);
  jQuery("#url").val(url);
}

//initialize our initial popup functions to submit, since they should all follow the same template
$(document).ready(function() {
  initForm("tradingView", {
  evaluations: [
    { name: "Is this prediction clearly explained?", key: "predictionClearlyExplained" },
    { name: "Was the prediction correct?", key: "predictionWasCorrect"},
    { name: "Did you buy or hold accordingly to this prediction?", key: "predictionWasBought"},
    { name: "Did the user provide frequent updates?", key: "predictionFrequentlyUpdated"}
   ]
  });
});


window.onload = onWindowLoad;