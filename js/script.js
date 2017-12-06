$(document).ready(function () {
    
    var searchBtn = document.getElementById("wikiBtn");

    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        searchApi();
    })
    
    function searchApi() {
        var api = "https://en.wikipedia.org/w/api.php";

        $.ajax({
            url: api,
            data: {
                "action": "query",
                "format": "json",
                "generator": "search",
                "gsrlimit": 5,
                "prop": "info|pageimages|extracts",
                "exintro": 1,
                "exlimit": "max",
                "pilimit": "max",
                "inprop": "url",
                "redirects": 1,
                "gsrsearch": fetchSearchValue()
              },
              dataType: 'jsonp',
              type: 'POST',
              async: false,
              headers: {
                'Api-User-Agent': 'Example/1.0'
              },
              success: function(data) {
                // var pages = data.query.pages;
                // displayPages(pages);
                console.dir(data);
              },
              error: function(err) {
                console.log(err);
              }
            });
          }
            
    function fetchSearchValue() {
        var s = $("#searchInput").val();
        if (!s) {
          alert("Please type something to search");
        } else {
          $("#searchInput").val("");
          return s;
        }
    }    
    
    
    
    
    
    
    
    
    
});