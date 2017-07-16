$(function() {
    var moveLeft = 0;
    var moveDown = 0;
    $('td.hover').hover(function(e) {

        var target = '#' + ($(this).attr('data-hover-box'));

        $(target).show();
        moveLeft = $(this).outerWidth();
        moveDown = ($(target).outerHeight() / 2);
    }, function() {
        var target = '#' + ($(this).attr('data-hover-box'));
        $(target).hide();
    });

    $('td.hover').mousemove(function(e) {
        var target = '#' + ($(this).attr('data-hover-box'));

        leftD = e.pageX + (parseInt(moveLeft) / 8);
        maxRight = leftD + $(target).outerWidth();
        windowLeft = $(window).width() - 40;
        windowRight = 0;
        maxLeft = e.pageX - ((parseInt(moveLeft) / 8) + $(target).outerWidth() + 20);

        if(maxRight > windowLeft && maxLeft > windowRight)
        {
            leftD = maxLeft;
        }

        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if(maxBottom > windowBottom)
        {
            topD = windowBottom - $(target).outerHeight() - 20;
        } else if(maxTop < windowTop){
            topD = windowTop + 20;
        }

        // Subtract 4500px from top because of animation in hero block
        $(target).css('top', topD - 3200).css('left', leftD);
    });
});
