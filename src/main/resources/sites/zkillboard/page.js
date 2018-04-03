//provides us with visual feedback of well reported users

//todo, we need some rule to not add it more than once


$("head").append(
    "<link rel=\"stylesheet\" href=\"https://use.fontawesome.com/releases/v5.0.9/css/all.css\" integrity=\"sha384-5SOiIsAziJl6AWe0HWRKTXlfcSHKmYV4RBF18PPJ173Kzn7jzMyFuTtk8JA7QQG1\" crossorigin=\"anonymous\">");


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

    function upvoteItem(item) {
        console.log(item);

    }

    function downvoteItem(item) {
        console.log(item);
    }

//do the data collection here

//1. ensure we are on the right page

//if this is the case add headers to row for isaac

//extract the name of the ship
    $("tr td").find("a[href*='/ship/']");

    $("#DataTables_Table_0 ").find("td.item_dropped, td.item_destroyed").each(function () {

        //add isaac buttons at the last row
        var plusResponse = "<a ship='' item='' onclick='upvoteItem($(this));'><i class='fas fa-plus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a good choice?' style='color: darkgreen; padding-left: 5px; padding-right: 5px'></i></a>";
        var minusResponse = "<a ship='' item='' onclick='downvoteItem($(this));'><i class='fas fa-minus-circle'  aria-hidden='true' data-toggle='tooltip' title='module is a bad choice?' style='color: darkred; padding-left: 5px; padding-right: 5px'></i></a>";

        //+ to approve, with tooltip describing what we do
        $(this).parent().find("td:last").after('<td>' + plusResponse + minusResponse + '</td>');
        //- to reject, with tooltip describing what we do
    });

}

//this sections calculates real world isk to dollar pricing

//calculate how expensive this lost was in USD

//render the isaac ratings here