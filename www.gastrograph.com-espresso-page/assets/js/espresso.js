$(document).ready(function(){
  // cache the window object
  $window = $(window);

  // $(window).bind("load", function() {
    // $('#placeholder--espresso-video').load('espresso-video.html');
    // $('#placeholder--espresso-video').css("min-height", "50vh");
  // });

  $('section[data-type="background"]').each(function(){
    // declare the variable to affect the defined data-type
    var $scroll = $(this);

    $(window).scroll(function() {
      // HTML5 proves useful for helping with creating JS functions!
      // also, negative value because we're scrolling upwards
      var yPos = -($window.scrollTop() / $scroll.data('speed'));

      // background position
      var coords = '50% '+ yPos + 'px';

      // move the background
      $scroll.css({ backgroundPosition: coords });
    }); // end window scroll
  });  // end section function
}); // close out script

$(window).scroll(function(){
 if($(window).scrollTop() > 300){
     $({countNum: $('.count1').text()}).animate({countNum: 25  }, {
      duration: 3000,
      easing:'linear',
      step: function() {
        $('.count1').text(Math.floor(this.countNum));
      },
      complete: function() {
        $('.count1').text(this.countNum);
      }
    });
 }
});

$(window).scroll(function(){
 if($(window).scrollTop() > 300){
     $({countNum: $('.count2').text()}).animate({countNum: 60  }, {
      duration: 3000,
      easing:'linear',
      step: function() {
        $('.count2').text(Math.floor(this.countNum));
      },
      complete: function() {
        $('.count2').text(this.countNum);
      }
    });
 }
});

// $(document).ready(function() {
//     $("#dose-modal").modal();
//   });

// $(document).ready(function() {
//     $("#time-modal").modal();
//   });
// $(document).ready(function() {
//     $("#yield-modal").modal();
//   });

$(window).load(function() {
  if ($(this).width() > 480) {
    $('#graph1-button').on('click', function () {
     $('#graph1-overlay, #overlay-back').fadeIn(500);
    });
    $('#graph2-button').on('click', function () {
     $('#graph2-overlay, #overlay-back').fadeIn(500);
    });
    $('#graph3-button').on('click', function () {
      $('#graph3-overlay, #overlay-back').fadeIn(500);
    });
    $('#graph4-button').on('click', function () {
      $('#graph4-overlay, #overlay-back').fadeIn(500);
    });
  }
});

$('html').click(function() {
   $('#graph1-overlay, #graph2-overlay, #graph3-overlay, #graph4-overlay, #overlay-back').hide();
});
$('.espresso-popup-wrapper').click(function(event){
    event.stopPropagation();
});

$(window).resize(function() {
    var pos = window.outerWidth < 992 ? 'relative' : 'absolute';
    document.getElementById('espressomachine').style.position = pos;

    if ($(this).width() < 992) {
        $('#spro-video, .machine-dial, .count1, .count2, .machine-drops, .collab').hide();
    } else {
        $('#spro-video, .machine-dial, .count1, .count2, .machine-drops, .collab').show();
    }
    var pos = window.outerWidth < 992 ? 'relative' : 'fixed';
    document.getElementById('espresso-modal-tabs').style.position = pos;

});

$(window).load(function() {
    var pos = window.outerWidth < 992 ? 'relative' : 'absolute';
    document.getElementById('espressomachine').style.position = pos;

    if ($(this).width() < 992) {
        $('#spro-video, .machine-dial, .count1, .count2, .machine-drops, .collab').hide();
    } else {
        $('#spro-video, .machine-dial, .count1, .count2, .machine-drops, .collab').show();
    }
});