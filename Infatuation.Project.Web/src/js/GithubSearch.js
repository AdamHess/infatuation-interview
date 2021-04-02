const tableTemplate = require('../templates/githubListingTemplate.html');
const Handlebars = require('handlebars');
const templateFunction = Handlebars.compile(tableTemplate);

class GithubSearch {
    constructor($el) {
        this.$el = $el;
        this._configureSearch();
        this._bindSaveHandler();
    }

    _displayLoading() {
        this.$el.html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
    }

    async _loadRepos(searchTerm) {
        if (searchTerm.length < 3) {
            return;
        }
        const results = await $.get('/githubrepos/search?q=' + encodeURIComponent(searchTerm));
        this.$el.html(templateFunction(results));
        this.$el.find('table').DataTable({
            searching: false,
            paging: false,
            bInfo: false
        });
    }

    _onKeyupHandler(e) {
        let searchTerm = $(e).val();
        this._loadRepos(searchTerm);
    }

    _configureSearch() {
        this.$el.find("input").keyup(_.debounce(this._onKeyupHandler, 300);

    }

    _bindSaveHandler() {
        this.$l.on('click',
            '.saveButton',
            function(e) {

                let target = $(e.target);
                if (target.attr("disabled")) {
                    return;
                }
                let githubId = target.data('id');
                $.post("/localservice/" + encodeURIComponent(githubId))
                    .done(function() {
                        target.text("Saved");
                        target.attr("disabled", "");
                    })
                    .fail(function() {
                        alert("Unable To Save Repo");
                    });
            });
    }
}
