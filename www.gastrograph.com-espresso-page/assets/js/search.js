var gastro = {};
var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];

gastro.majusculeFirst = function(str) {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

gastro.getParam = function(param) {
  var queryString = window.location.search.substring(1),
  queries = queryString.split('&');
  for(var i in queries) {
    var pair = queries[i].split('=');
    if(pair[0] === param) {
      return decodeURI(pair[1]);
    }
  }
  return null;
};

if($('#search_box').length > 0 && gastro.getParam('query')) $('#search_box').val(gastro.getParam('query').replace(/\+/g," "));

gastro.compare = function(a,b) {
  if(a.value > b.value)
    return -1;
  if(a.value < b.value)
    return 1;
  return 0;
}

gastro.filterPostsByWeight = function(posts, weights) {
  var weight = 0.5;
  var filteredPosts = [];
  var high = 0;
  $.each(weights, function(key, value) {
    if(value['value'] > high) high = value['value'];
  });
  $.each(weights, function(key, value) {
    if(value['value'] != 0 && value['value'] >= high * weight) {
      filteredPosts.push(posts[value['post']]);
    }
  });
  return filteredPosts;
}

gastro.filterPostsByPropertyValue = function(posts, query) {
  var postValue = [];

  posts.pop();
  for(var i in posts) {
    var val = 0;
    for(var p in query) {
      q = query[p].toLowerCase();

      var post = posts[i];
      post.tags.pop();
      if(post.title.toLowerCase().search(q) > -1) {
        val += 5;
      }
      if(post.author.toLowerCase().search(q.trim()) > -1) {
        val += 5;
      }
      for(var t in post.tags) {
        if(post.tags[t].toLowerCase().search(q.trim()) > -1) {
          val = 4;
          continue;
        }
      }
      if(post.date.year === q.trim()) {
        val += 5;
      }
      if(post.date.month.toLowerCase() === q.trim()) {
        val += 5;
      }
      if(post.date.day === q.trim()) {
        val += 3;
      }
      if(post.description.toLowerCase().search(q) > -1) {
        val += 3;
      }
      if(!q.trim().indexOf(MONTHS)) {
        if(post.text.toLowerCase().search(q.trim()) > -1) {
          val += 1;
        }
      }
    }
    postValue.push({post:i, value: val});
  }
  postValue.sort(gastro.compare);

  filteredPosts = gastro.filterPostsByWeight(posts, postValue);

  return filteredPosts;
};

gastro.layoutResultsPage = function(value, posts) {
  var $container = $('.container');
  $results = $container.find('div.results');
  for (var i in posts) {
    post = posts[i];
    $results.append(
      '<div class="post">'
      + '<div class="row">'
      + '<div class="col-md-2">'
      + '<a href="/authors/' + post.fullauthor + '">'
      + '<img src="/assets/images/employees/portrait-' + post.author + '.png" class="author_image imgLink" />'
      + '</a>'
      + '</div>'
      + '<div class="col-md-10">'
      + '<div class="row">'
      + '<div class="col-md-12">'
      + '<h5>' + '<span class="post-date">' + post.date.month + " " + post.date.day + ", " + post.date.year + ': </span>'
      + '<a href="' + post.href + '">' + post.title + '</a>'
      + '</h5>'
      + '</div>'
      + '</div>'
      + '<div class="row">'
      + '<div class="col-md-offset-1 col-md-11">'
      + '<br>'
      + post.description
      + '<br>'
      + '<a class="post-link" href="' + post.href + '"><strong>Read more</strong></a>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>'
    );
  }
};

gastro.noResultsPage = function(query) {
  $('#results').find('h3').text('No Results Found.').after(
    '<p>We couldn\'t find anything associated with "' + query.join(" ") + '" here.</p>'
  );
};

$(function() {
  // retrieve query
  var query = gastro.getParam('query')
  if(query) query = query.split("+");

  //filter out query elements
  if (query !== null) {
    query = query.filter(function(value,index) {
      if(value.length <= 3 && value.toLowerCase() !== "r") return false;
      return true;
    });
    $.getJSON('search.json', function(data) {
      posts = gastro.filterPostsByPropertyValue(data, query);
      if (posts.length === 0) {
        // No results
        gastro.noResultsPage(query);
      } else {
        gastro.layoutResultsPage(query, posts);
      }
    });
  }
});
