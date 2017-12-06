$(document).ready(function () {
    
    var searchBtn = document.getElementById("wikiBtn");
  

    searchBtn.addEventListener("click", function (e) {
        e.preventDefault();
        searchApi();
    });
    
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
                var pages = data.query.pages;
                displayPages(pages);
                console.dir(data);
              },
              error: function(err) {
                console.log(err);
              }
            });
          }
            
          function displayPages(pages) {
            var html = "";

            $.each(pages, function(index, value) {
              var url = value.fullurl;
              var title = value.title;
              var extract = value.extract;
              var thumb = value.thumbnail.source;

// change the way we add the info on the page

              var topLi = "<li class='card-body d-flex flex-column align-items-center'>";
              
              var headerTop = "<div class='card-header px-2 d-flex flex-row justify-content-around'>";
              var resultTitle =  "<h3 class='card-title'>" + title + "</h3>";
              var img = "<img class='img-fluid' src='" + thumb + "'>";
              var headerBottom = "</div>";
              var resultInfo = "<p class='card-text'>" + extract + "</p>";
              var resultUrl = "<a class='btn btn-link text-center' href='" + url + "'>" + url + "</a>";
          
              var bottomLi = "</li>";

              html += topLi;
              html += headerTop;
              html += resultTitle;
              html += img;
              html += headerBottom;
              html += resultInfo;
              html += resultUrl;
              html += bottomLi;

            });

            $("#resultsBox").html(html);
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