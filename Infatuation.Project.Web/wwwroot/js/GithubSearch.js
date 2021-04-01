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
        let dynamicSearch = _.debounce( async function () {
            let searchTerm = $(this).val();
            if (searchTerm.length > 3) {
                $("#githubSearchResults").html("<img class='loadingIcon' src='/loadingspinner.gif'/>");
                var results = await $.get('/githubrepos/search?q=' + encodeURIComponent(searchTerm));
                $("#githubSearchResults").html(templateFunction(results));

                $("#githubSearchResults table").DataTable({
                    searching: false,
                    paging: false,
                    bInfo: false
                });
            }

        }, 500)
        $("#githubSearch").keyup(dynamicSearch);

    }

    function rebindSave() {
        $('body').on('click', '.saveButton', function (e) {
            
            let target = $(e.target);
            if (target.attr("disabled")) {
                return;
            }
            let githubId = target.data('id');
            $.post("/localservice/" + encodeURIComponent(githubId))
                .done(function () {
                    target.text("Saved");
                    target.attr("disabled", "");
                })
                .fail(function() {
                    alert("Unable To Save Repo");   
                });
        });
    }
})