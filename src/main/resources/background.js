/**
 * this script runs in the background and is mostly utilized for inner process
 * communications, by using messages
 */

/**
 * extracts informations from different pages
 * based on our current scope
 */
function getPageDetails(callback) {

      chrome.runtime.onMessage.addListener(function(message) {
        // Call the callback function
        callback(message);
      });

};

/**
 * used to select the exact popup we want to show based on url
 * patterns
 */
chrome.tabs.onUpdated.addListener(function(id, info, tab) {
  if (typeof tab != "undefined" && typeof tab != "null") {
    //test if the current page is tradingView
    if (/tradingview[.]com/.test(tab.url)) {
      console.log("updating view to tradingView");
      chrome.pageAction.setPopup({
        tabId: tab.id, // Set the new popup for this tab.
        popup: 'sites/tradingview/popup.html' // Open this html file within the popup.
      });
    }
    //check if it's a mona instance
    else if ( tab.url && tab.url.indexOf('mona.fiehnlab.ucdavis.edu/spectra/display/') > 0) {
      console.log("updating view to MoNa");
      chrome.pageAction.setPopup({
        tabId: tab.id, // Set the new popup for this tab.
        popup: 'sites/mona/popup.html' // Open this html file within the popup.
      });
    }
    else{
    }


    chrome.pageAction.show(tab.id);

  }

});
