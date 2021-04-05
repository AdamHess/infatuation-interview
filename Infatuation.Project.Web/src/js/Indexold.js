import templateFunction  from '../templates/localListingTemplate.hbs'
import $ from 'jquery'
export default class Index {
    constructor($el) {
        this.$el = $el;
        this._displayLoading();
        this._loadTable();
        this._configureEvents();

    }
    _displayLoading() {
        this.$el.html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
    }
    async _loadTable() {
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


