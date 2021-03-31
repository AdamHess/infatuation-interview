$(function() {
    $('.deleteButton').click(function(e) {

        $.ajax({
                url: `/Home/DeleteRepo/${$(e.target).data('id')}`,
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