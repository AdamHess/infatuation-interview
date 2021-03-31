$(function () {

    main();

    function main() {
        configureSearch();
        configureSave();
    }

    function configureSearch() {
        let dynamicSearch = _.debounce(function () {
            let searchTerm = $(this).val();
            if (searchTerm.length > 3) {
                $("#githubSearchResults").html("<img width='500' height='500' src='/loadingspinner.gif'/>");
                $('#githubSearchResults').load('/Home/GithubResults?q=' + encodeURIComponent(searchTerm))
            }

        }, 500)
        $("#githubSearch").keyup(dynamicSearch);

    }

    function configureSave() {
        $('body').on('click','.saveButton',function(e) {
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