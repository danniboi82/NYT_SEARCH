let apiKey = config.NYT_API_KEY;
let searchTerm = "";
let numArticles = 0;
let startDate = 0;
let endDate = 0;
let sortType;
let queryURLBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}`;
let articleNumber = 0;
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
            console.log(result.response.docs[0].web_url);
            for (var i = 0; i < result.response.docs.length; i++) {
                articleNumber++
                let author = result.response.docs[i].byline.original;
                let title = result.response.docs[i].headline.main;
                let image = result.response.docs[i].multimedia[0].url;
                let link = result.response.docs[i].web_url;
                let snippet = result.response.docs[i].snippet;
                //create a card for each 
                let card = $("<div>");
                card.addClass('card my-5');
                card.attr('id', "article-id-" + articleNumber)
                $(".article-container").append(card);

                if (result.response.docs[i].headline !== "null") {
                    //get headline.main and inject it into HTML
                    $("#article-id-" + articleNumber).append(`<div class='card-header num${articleNumber}'><h3>${title}</h3></div>`)
                    console.log(result.response.docs[i].headline.main)
                }
                if (result.response.docs[i].byline && author) {
                    console.log(author)
                    $(".num" + articleNumber).append(`<p>Written by : ${author}</p>`)
                }
                if (image) {
                    console.log(`https://static01.nyt.com/${image}`)
                    $("#article-id-" + articleNumber).prepend(`<img src='https://static01.nyt.com/${image}'/>`)
                }
                //Links to articles
                if (link) {
                    console.log(link);
                    $("#article-id-" + articleNumber).append(`<div class='card-body card-body-num${articleNumber} text-center'><a class='btn btn-outline-danger' href='${link}'>GO TO ARTICLE</a></div>`)
                }
                //Article details 
                if (snippet) {
                    console.log(snippet);
                    $(".card-body-num" + articleNumber).prepend(`<p>${snippet}</p>`)
                }
            }
        })
        .fail(function (err) {
            throw err;
        });
}

$("#search").on("click", () => {
    event.preventDefault();
    articleNumber = 0;
    $(".article-container").empty();
    console.log("button is working");
    searchTerm = $("#search-term").val().trim();
    numArticles = $("#amount").val();
    startDate = $("#start-date").val();
    endDate = $("#end-date").val();
    // let sort = $(".sort");
    // for (var i = 0; length = sort.length; i++) {
    //     if (!sort[i].checked) {
    //         console.log("nothing checked")
    //     } else {
    //         sortType = sort[i].value;

    //     }
    // }
    if (!searchTerm) {
        newURL = `${queryURLBase}&q=today+news`
        console.log("No search inputted! :", newURL)
    } else {
        newURL = `${queryURLBase}&q=${searchTerm}`;
    }
    console.log("search :", searchTerm);
    console.log("# of Articles :", numArticles);
    console.log("start date :", startDate);
    console.log("end date :", endDate);
    // console.log("sort value :", sortType)
    runQuery(10, newURL)
});