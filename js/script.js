$(document).ready(function () {

  var searchBtn = document.getElementById("wikiBtn");
  var $searchQuery = $('#searchInput');
  var pages = "";


  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchApi();
  });

  function searchApi() {
    var searchQuery = $searchQuery.val();

    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php',
      dataType: 'jsonp',
      data: {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        exchars: '200',
        exlimit: 'max',
        explaintext: '',
        exintro: '',
        rawcontinue: '',
        generator: 'search',
        gsrsearch: searchQuery,
        gsrnamespace: '0',
        gsrlimit: '6'
      },

      success: function (data) {
        console.dir(data);
        var pages = data.query.pages;
        displayPages();
      }
    });

    function displayPages(pages) {
      var html = "";

      $.each(pages, function(index, value) {
        var pageid = value.pageid;
        var title = value.title;
        var extract = value.extract;
        var url = "https://en.wikipedia.org/?curid=" + pageid;

        html += "<li class='card-body d-flex flex-row align-items-center'>";
        html += "<h3 class='card-title'>" + title + "</h3>";
        html += "<p class='card-text'>" + extract + "</p>";
        html += "<a class='btn btn-link' href='" + url + "' target='_blank'>" + title + "</a>";
        html += "</li>";
      });
      $('#resultsBox').html(html);
    }
  }
});