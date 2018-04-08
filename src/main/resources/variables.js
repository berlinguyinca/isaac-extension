//url to our isaac system
const isaac = "https://dev.isaac.international/contributions";

//trading view evaluations can be found here
const isaacTradingViewEvaluation = "https://dev.isaac.international/aggregation/metadata/user/";

/**
 * this function is used to send the evaluations collected by the popup pageAction
 * to the remote server. It basically evaluates the given form for us
 */
function sendToIsacc(event, domain) {
    event.preventDefault();


    //selects all the metadata for us
    var metaData = $('input[name=metadata]').map(function () {
        var obj = {};
        obj.key = $(this).attr("key");
        obj.value = $.trim($(this).val());
        return obj;
    }).get();

    //select all our evaluations
    var evaluations = {};
    $('input[name*="evaluation"]').each(function (index, value) {
        console.log('inspecting evaluation: ' + index);
        //for some reason this is not SET TODO
        if ($(value).attr("choice") == "agree" && $(value).is(':checked')) {
            var evaluation = {};
            evaluation.name = $(value).attr("key");
            evaluation.recordAccepted = true;
            evaluations[evaluation.name] = evaluation;

            console.log('adding evaluation');
            console.log(evaluation);
        } else if ($(value).attr("choice") == "disagree" && $(value).is(':checked')) {
            var evaluation = {};
            evaluation.name = $(value).attr("key");
            evaluation.recordAccepted = false;
            evaluations[evaluation.name] = evaluation;

            console.log('adding evaluation');
            console.log(evaluation);
        } else {
            //ignore
        }
    });


    var obj = {};
    obj.date = Math.round((new Date()).getTime());
    obj.evaluations = evaluations;

    //record section
    obj.record = {};
    obj.record.domain = domain;
    obj.record.metaData = metaData;
    obj.record.url = $('#url').val();

    submitIssacObjectToServer(obj);

    $("html").fadeOut(1500);
    window.close();
}

/**
 * inits our form for a given isaac category
 * @param isaacCategory defines which category we should use
 ^ @param questions this defines the questions required for this extension
 */
function initForm(isaacCategory, questions) {
    //load the registered template
    //should show an alert if the ids don't exist
    var template = Handlebars.templates['evaluations'];
    $("#templatePlaceholder").html(template(questions));

    $("#isaac_form").submit(function (event) {
        sendToIsacc(event, isaacCategory);
    });

    $('.container').on('click', '.btn-group.radioBtn .btn', function () {
        $(this).parent().find('.btn').removeClass('active').addClass('notActive');
        $(this).removeClass('notActive').addClass('active');
    });
}

/**
 * inject source code into our system. The popup.js needs to define a method
 * called evaluatePageHTML(...);
 */
chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        //message.innerText = request.source;
        var pageDocument = jQuery.parseHTML(request.source);
        evaluatePageHTML(pageDocument, siteUrl);
    }
});


/**
 * when the window got loaded, execute this
 */
function onWindowLoad() {
    chrome.tabs.getSelected(null, function (tab) {
        siteUrl = tab.url;
    });

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        if (chrome.runtime.lastError) {
            alert('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });

}

/**
 * listen to messages and send them to isaac
 * when they arrive.
 *
 */
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

    if (event.data.type && (event.data.type == "TO_ISAAC")) {
        console.log("Content script received message: " + event.data.content);
        submitIssacObjectToServer(event.data.content);
    }
});



/**
 * associate the user address with the object
 * and send it to the server
 * @param obj
 */
function submitIssacObjectToServer(obj) {
    console.log("submitting data to isaac");
    //access object storage and send processed data to the client
    chrome.storage.sync.get("address", function (storage) {

        obj.user = {};
        obj.user.address = storage.address;
        console.log('received user account');

        $.ajax({
            type: "POST",
            data: JSON.stringify(obj),
            url: isaac,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',

            success: function (data) {
                console.log('data submitted successfully');
            },
            error: function (request, status, error) {
                console.log('failure to submit');
                try {
                    var errorMessage = jQuery.parseJSON(request.responseText);

                    if (errorMessage.message == "Missing Authentication Token") {
                        console.log("this would be a 404 error, not much we can do about right now!");
                        alert('looks like we are currently offline, please try again in a little bit!');
                    }
                    else {
                        alert('sorry, we encountered an error, please check the console logs!' + request.responseText);
                    }
                }
                catch (err) {
                    alert('sorry, we encountered an error, please check the console logs!' + request.responseText);
                }
            }
        });
    });
}
