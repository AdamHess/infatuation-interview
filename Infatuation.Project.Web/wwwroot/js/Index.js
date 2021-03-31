$(function () {

    initialLoad();
    async function initialLoad() {
        let templateHtml = await $.get("/listingTemplate.html");
        let templateFunction = Handlebars.compile(templateHtml);
        let data = await $.get('/localservice');
        let renderedHtml = templateFunction(data);
        $('#indexBody').html(renderedHtml);

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