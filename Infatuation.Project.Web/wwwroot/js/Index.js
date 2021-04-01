$(function () {

    initialLoad();
    async function initialLoad() {
        $('#indexBody').html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
        let templateHtml = await $.get("/localListingTemplate.html");
        let templateFunction = Handlebars.compile(templateHtml);
        let data = await $.get('/localservice');
        let renderedHtml = templateFunction(data);
        $('#indexBody').html(renderedHtml);
        $("#indexBody table").DataTable({
            searching: false,
            paging: false,
            bInfo: false
        });

    }

    $('body').on('click', '.deleteButton', function(e) {

        $.ajax({
            url: `/localservice/${$(e.target).data('id')}`,
                method: 'DELETE'
            })
            .done(function () {
                $(e.target).parents('tr').fadeOut();
            })
            .fail(function() {
                alert("unable to delete");
            });
    });


})