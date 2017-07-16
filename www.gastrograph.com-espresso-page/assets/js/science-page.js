var body          = document.body;
var navbar        = document.getElementsByClassName('wrap');
var slides        = document.getElementsByClassName('homeSlide');
var slideContents = document.getElementsByClassName('hsContent');
var windowWidth   = window.innerWidth;
var windowHeight  = window.innerHeight;

body.className = body.className.split('nojs').join('jsEnabled');

[].forEach.call(slideContents, resizeSlides);

    // if (windowWidth >= 768) {
        // var s = skrollr.init({
            // forceHeight: false
        // });
        // s.refresh(slides);
    // }

function resizeSlides(element, index, array) {
    var scaleFactor            = 1.3;
    var scaledContentHeight    = slideContents[index].offsetHeight * scaleFactor;

    if (index != 0) {
        slides[index].style.height = scaledContentHeight + "px";
    } else {
        var firstSlideOffsetHeight = scaledContentHeight - 104;
        slides[index].style.height = firstSlideOffsetHeight + "px";

    //     var navbarHeight           = navbar.offsetHeight;
    //     var firstSlideOffsetHeight = scaledContentHeight - navbarHeight;

    //     console.log("navbarHeight: ", navbarHeight);
    //     console.log("firstSlideOffsetHeight ", firstSlideOffsetHeight);

    //     slides[index].style.height = firstSlideOffsetHeight + "px";
    }
}