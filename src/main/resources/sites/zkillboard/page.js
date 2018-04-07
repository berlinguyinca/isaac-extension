//provides us with visual feedback of well reported users

//1. ensure we are on the right page, so we don't pollute the scopes
if (window.location.href.indexOf('zkillboard.com') > 0) {

    $("head").append("<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.0.9/css/all.css\" integrity=\"sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1\" crossorigin=\"anonymous\">");


//help expression to easily find fields equaling title
    $.expr[':'].textEquals = $.expr.createPseudo(function (arg) {
        return function (elem) {
            return $(elem).text().match("^" + arg + "$");
        };
    });

    issacDataCollection();


    /**
     * function utilized for item data collection
     */
    function issacDataCollection() {

//helper functions

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
            contribution.evaluations[Object.keys(contribution.evaluations)[0]].recordAccepted = true;

            window.postMessage({type: "TO_ISAAC", content: contribution}, "*");
        };

        (document.head || document.documentElement).appendChild(upvoteScript);
        (document.head || document.documentElement).appendChild(downvoteScript);

//do the data collection here


//if this is the case add headers to row for isaac

//extract the name of the ship
        var shipGroup = $("tr td a[href*='/ship/'] ~ small a").get(0);
        var ship = $(shipGroup).parent().siblings().first();

        $("#DataTables_Table_0 ").find("td.price").each(function () {

            var item = $(this).siblings().eq(1).children().first();

            var evaluation = {name: $(item).text()};
            var evaluations = {};
            evaluations[evaluation.name] = evaluation;
            var contribution = {
                date: Math.round((new Date()).getTime()),
                record: {
                    domain: 'zkillboard',
                    url: window.location.href,
                    metaData: [
                        {
                            ship: ship,
                            group: shipGroup,
                            shipId: $(ship).attr("href").match(/([0-9]+)/)[1],
                            groupId: $(shipGroup).attr("href").match(/([0-9]+)/)[1]
                        }
                    ]
                },
                evaluations: evaluations
            };


            //base 64 encode it
            var encoded = btoa(JSON.stringify(contribution));

            //add isaac buttons at the last row
            var plusResponse = "<a data-item='" + encoded + "' onclick='upvoteItem(atob($(this).data(\"item\")));$(this).parent().fadeOut();'><i class='fas fa-plus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a good choice?' style='color: darkgreen; padding-left: 5px; padding-right: 5px'></i></a>";
            var minusResponse = "<a data-item='" + encoded + "' onclick='downvoteItem(atob($(this).data(\"item\")));$(this).parent().fadeOut();'><i class='fas fa-minus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a bad choice?' style='color: darkred; padding-left: 5px; padding-right: 5px'></i></a>";

            $(this).parent().find("td:last").after('<td><span>' + plusResponse + minusResponse + '</span></td>');
        });

    }

}
