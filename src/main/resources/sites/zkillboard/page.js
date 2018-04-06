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
            console.log(item);

        };


        var downvoteScript = document.createElement('script');
        downvoteScript.textContent = function upvoteItem(item) {
            console.log(item);

        };


        (document.head || document.documentElement).appendChild(upvoteScript);
        (document.head || document.documentElement).appendChild(downvoteScript);

//do the data collection here


//if this is the case add headers to row for isaac

//extract the name of the ship
        var shipGroup = $("tr td a[href*='/ship/'] ~ small a").get(0);
        var ship = $(shipGroup).parent().siblings().first().text();


        $("#DataTables_Table_0 ").find("td.item_dropped, td.item_destroyed").each(function () {

            //assemble our data object
            var inspection = {};
            inspection.ship = ship;
            inspection.group = $(shipGroup).text();

            //base 64 encode it
            var encoded = btoa(JSON.stringify(inspection));

            //add isaac buttons at the last row
            var plusResponse = "<a data-item='"+encoded+"' onclick='upvoteItem(atob($(this).data(\"item\")));'><i class='fas fa-plus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a good choice?' style='color: darkgreen; padding-left: 5px; padding-right: 5px'></i></a>";
            var minusResponse = "<a data-item='"+encoded+"' onclick='downvoteItem(atob($(this).data(\"item\")));'><i class='fas fa-minus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a bad choice?' style='color: darkred; padding-left: 5px; padding-right: 5px'></i></a>";

            //+ to approve, with tooltip describing what we do
            $(this).parent().find("td:last").after('<td>' + plusResponse + minusResponse + '</td>');
            //- to reject, with tooltip describing what we do
        });

    }

//this sections calculates real world isk to dollar pricing

//calculate how expensive this lost was in USD

//render the isaac ratings here
}
