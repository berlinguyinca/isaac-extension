//helper functions to actually submit data to Isaac
//in form of message handling

var upvoteScript = document.createElement('script');
upvoteScript.textContent = function upvoteItem(item) {
    var contribution = JSON.parse(item);

    contribution.evaluations[Object.keys(contribution.evaluations)[0]].recordAccepted = true;

    var data = {type: "TO_ISAAC", content: contribution};
    window.postMessage({type: "TO_ISAAC", content: contribution}, "*");

};


var downvoteScript = document.createElement('script');
downvoteScript.textContent = function downvoteItem(item) {
    var contribution = JSON.parse(item);
    contribution.evaluations[Object.keys(contribution.evaluations)[0]].recordAccepted = false;

    window.postMessage({type: "TO_ISAAC", content: contribution}, "*");
};

(document.head || document.documentElement).appendChild(upvoteScript);
(document.head || document.documentElement).appendChild(downvoteScript);


$.expr[':'].textEquals = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().match("^" + arg + "$");
    };
});