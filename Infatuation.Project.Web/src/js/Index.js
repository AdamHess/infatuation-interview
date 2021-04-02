const templateFunction = require('../templates/localListingTemplate.hbs');
import $ from 'jquery'
class Index {
    constructor($el) {
        this.$el = $el;
        this._displayLoading();
        this._loadDependencies();

    }
    _displayLoading() {
        this.$el.html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
    }
    async _initialLoad() {
        let data = await $.get('/localservice');
        let renderedHtml = templateFunction(data);
        this.$el.html(renderedHtml);
        this.$el.find("table").DataTable({
            searching: false,
            paging: false,
            bInfo: false
        });
    }
    _configureEvents() {
        this.$el.on('click', '.deleteButton', function (e) {

            $.ajax({
                    url: `/localservice/${$(e.target).data('id')}`,
                    method: 'DELETE'
                })
                .done(function () {
                    $(e.target).parents('tr').fadeOut();
                })
                .fail(function () {
                    alert("unable to delete");
                });
        });
    }
}


$('')