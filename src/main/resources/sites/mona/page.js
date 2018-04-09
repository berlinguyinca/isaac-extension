//provides us with visual feedback of well reported users

//1. ensure we are on the right page, so we don't pollute the scopes
if (window.location.href.indexOf('mona.fiehnlab.ucdavis.edu') > 0) {

    $(document).ready(function () {git
        issacDataCollection();
    });


    /**
     * function utilized for item data collection
     */
    function issacDataCollection() {


        $("#page-wrapper").find(".table td[data-metadata-value]").each(function () {
            var item = $(this).siblings().eq(0).children().first();

            console.log($(item).text());
            var evaluation = {name: $(item).text()};
            var evaluations = {};
            evaluations[evaluation.name] = evaluation;
            var contribution = {
                date: Math.round((new Date()).getTime()),
                record: {
                    domain: 'mona',
                    url: window.location.href,
                    metaData: []
                },
                evaluations: evaluations
            };


            //base 64 encode it
            var encoded = btoa(JSON.stringify(contribution));

            //add isaac buttons at the last row
            var plusResponse = "<span data-item='" + encoded + "' onclick='upvoteItem(atob($(this).data(\"item\")));$(this).parent().parent().fadeOut();'><i class='fa fa-plus-circle'  aria-hidden='true' data-toggle='tooltip' title='this value is correct?' style='color: darkgreen; padding-left: 5px; padding-right: 5px'></i></span>";
            var minusResponse = "<span data-item='" + encoded + "' onclick='downvoteItem(atob($(this).data(\"item\")));$(this).parent().parent().fadeOut();'><i class='fa fa-minus-circle'  aria-hidden='true' style='color: darkred; padding-left: 5px; padding-right: 5px'></i></span>";

            $(this).parent().children("td:eq(0)").removeClass("col-lg-4").removeClass("col-md-4").addClass("col-lg-3").addClass("col-md-3");
            $(this).parent().children("td:eq(1)").removeClass("col-lg-8").removeClass("col-md-8").addClass("col-lg-6").addClass("col-md-6");

            $(this).parent().find("td:last").after('<td class="col-lg-3 col-md-3">' +
                '<div class="btn-group pull-right" role="group" aria-label="Isaacification Options">\n' +
                '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" title="is this value wrong?">'+minusResponse+'</button>' +
                '<button type="button" class="btn btn-dark btn-sm" data-toggle="tooltip" title="is this value correct?">'+plusResponse+'</button>' +
                '</div>' +
                '</td>');
        });

    }

}