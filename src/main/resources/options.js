/**
 * the purpose of this script is to manage all required options in Isaac
 */

function loadOptions() {
 chrome.storage.sync.get({
    address: 'none'
  }, function(items) {
    document.getElementById('address').value = items.address;
  });

}

function saveOptions() {
	var select = document.getElementById("address");

  chrome.storage.sync.set({
    address: select.value
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

//populate on load of page
document.addEventListener('DOMContentLoaded', loadOptions);

//save on click
document.getElementById('save').addEventListener('click',
    saveOptions);