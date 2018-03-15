/**
 * @page contains the client page
 * so data can be extracted as required to make
 * populate the popup
 */
function evaluatePageHTML(page,url) {

  //extract spectra name
  var spectraTitle = jQuery("h3.panel-title",page).text();

  //set the form fields
  jQuery("#showTitle").text(spectraTitle);
  jQuery("#title").val(spectraTitle);
  jQuery("#trackedUrl").val(url);

}

//initialize our initial popup functions to submit, since they should all follow the same template
$(document).ready(function() {
  initForm("mona", {
                      evaluations: [
                          { name: "Was the accurate mass correct?", key: "accurateMassCorrect" },
                          { name: "Is it a valid spectrum?", key: "validSpectrum" },
                          { name: "Did the auto curation work?", key: "AutocurationWorked"}
                      ]
                  }
);

});


window.onload = onWindowLoad;