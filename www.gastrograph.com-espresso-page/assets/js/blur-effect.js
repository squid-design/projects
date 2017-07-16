$(window).scroll(function() {
  var heroBlur = 10 - Math.floor($(this).scrollTop() / 75);
  if (heroBlur < 0) { heroBlur = 0; }
  $('#video_background').css({
    '-webkit-filter': 'blur('+heroBlur+'px)',
    'filter': 'blur('+heroBlur+'px)'
  });
});

$(window).scroll(function() {
  var heroBlur = 10 - Math.floor($(this).scrollTop() / 50);
  if (heroBlur < 0) { heroBlur = 0; }
  $('.tablet-image').css({
    '-webkit-filter': 'blur('+heroBlur+'px)',
    'filter': 'blur('+heroBlur+'px)'
  });
});