let apiKey = "08d6f28cf4354027b92bc0f2bdec4146"
let searchTerm = "";
let numArticles = 0;
let startDate = 0;
let endDate = 0;
let sortType;
let queryURLBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=trump`;
let articleCounter = 0;
//byline.original
runQuery = (numOfArticles, queryURL) => {
    $
        .ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function (result) {
            console.log(queryURL);
            console.log(result);
            console.log(result.response.docs[0].headline.main)
            for (var i = 0; i < result.response.docs.length; i++) {
                let author = result.response.docs[i].byline.original;
                let title = result.response.docs[i].headline.main;
                let image = result.response.docs[i].multimedia[0].url;
                if (result.response.docs[i].headline !== "null") {
                    //get headline.main and inject it into HTML
                    console.log(result.response.docs[i].headline.main)
                }
                if (result.response.docs[i].byline && author) {
                    console.log(author)
                }
                if(image){
                    console.log(`https://static01.nyt.com/${image}`)
                }
            }
        })
        .fail(function (err) {
            throw err;
        });
}
runQuery(10, queryURLBase)
// $("#search").on("click", () => {
//     event.preventDefault();
//     console.log("button is working");
//     searchTerm = $("#search-term").val();
//     numArticles = $("#amount").val();
//     startDate = $("#start-date").val();
//     endDate = $("#end-date").val();
//     // let sort = $(".sort");
//     // for (var i = 0; length = sort.length; i++) {
//     //     if (!sort[i].checked) {
//     //         console.log("nothing checked")
//     //     } else {
//     //         sortType = sort[i].value;

//     //     }
//     // }

//     console.log("search :", searchTerm);
//     console.log("# of Articles :", numArticles);
//     console.log("start date :", startDate);
//     console.log("end date :", endDate);
//     // console.log("sort value :", sortType)
// runQuery()
// });