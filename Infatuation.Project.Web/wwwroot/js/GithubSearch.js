$(function () {

    main();
    let templateFunction;
    function main() {
        initialLoad();
        configureSearch();
        rebindSave();
    }

    async function initialLoad() {
        let templateHtml = await $.get("/githubListingTemplate.html");
        templateFunction = Handlebars.compile(templateHtml);
    }


    function configureSearch() {
        let dynamicSearch = _.debounce(function () {
            let searchTerm = $(this).val();
            if (searchTerm.length > 3) {
                $("#githubSearchResults").html("<img width='500' height='500' src='/loadingspinner.gif'/>");
                var results = await $.get('/githubrepos/search?q=' + encodeURIComponent(searchTerm));
                $("#githubSearchResults").html(templateFunction(results));
                rebindSave();
            }

        }, 500)
        $("#githubSearch").keyup(dynamicSearch);

    }

    function rebindSave() {
        $('saveButton').click(function(e) {
            let target = $(e.target);
            let githubId = target.data('githubRepoId');

            $.post("/Home/SaveGithubRepo?githubRepoId=" + encodeURIComponent(githubId))
                .done(function () {
                    target.addClass('disabled');
                    target.text("Saved");
                })
                .fail(function() {

                    alert("Unable To Save Repo");   
                });
        });
    }
})