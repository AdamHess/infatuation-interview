import templateFunction from '../templates/githubListingTemplate.hbs';
import $ from 'jquery';

export default class GithubSearch {
    constructor($el) {
        this.$el = $el;
        this.$results = $el.find('.searchResults');
        this._configureSearch();
        this._bindSaveHandler();
    }

    _displayLoading() {
        this.$results.html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
    }

    async _loadRepos(searchTerm) {
        const repoSearch = $.get('/githubrepos/search?q=' + encodeURIComponent(searchTerm));
        repoSearch
            .fail(function() {
            console.log("Unable To Save Repo");
        });
        const results = await repoSearch;
        this.$results.html(templateFunction(results));
        this.$results.find('table').DataTable({
            searching: false,
            paging: false,
            bInfo: false
        });
    }

    _onKeyupHandler(e) {
        let searchTerm = e.target.value;
        if (searchTerm.length < 3) {
            return;
        }
        this._displayLoading();
        this._loadRepos(searchTerm);
    }

    _configureSearch() {
        this.$el.find("input").keyup(_.debounce(this._onKeyupHandler.bind(this), 300));

    }

    _bindSaveHandler() {
        this.$results.on('click', '.saveButton', function(e) {

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
