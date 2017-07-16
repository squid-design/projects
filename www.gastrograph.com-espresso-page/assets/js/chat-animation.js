if (window.innerWidth > 600) {
  $(window).scroll(function() {
    if ($(this).scrollTop()>500) {
      $('#speechbubble1').css('display', 'block');
    } else {
      $('#speechbubble1').css('display', 'none');
    }

    if ($(this).scrollTop()>1000) {
      $('#speechbubble2').css('display', 'block');
    } else {
      $('#speechbubble2').css('display', 'none');
    }

    if ($(this).scrollTop()>1400) {
      $('#speechbubble3').css('display', 'block');
    } else {
      $('#speechbubble3').css('display', 'none');
    }

    if ($(this).scrollTop()>1900) {
      $('#speechbubble4').css('display', 'block');
    } else {
      $('#speechbubble4').css('display', 'none');
    }

    if ($(this).scrollTop() > 2500) {
      $('.arrow--clickable').hide();
    } else {
      $('.arrow--clickable').show();
    }
  });
  $('.arrow--clickable').click(function() {
    $('html, body').animate({
      scrollTop: $(window).scrollTop() + 501
    }, 500);
  });
}


