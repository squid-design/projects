// (function($) {
//   // resizeDeviceArt();
//
//   var scaleFactorHeight = $(window).height() * 0.65;
//   // // Scale height of each step of the tutorial to exactly fill one screen
//   $(".tutorial-step").height($(window).height());
//   // // Scale each screenshot to be 7/10 of one screen
//   $(".device-art-nexus7").height(scaleFactorHeight);
//   // $(".device-art-nexus7").width(429);
//   // $(".device-art-nexus7").height(643);
//
//   setTimeout(magnifyingGlass, 1000);
// 
//   function magnifyingGlass() {
//    /*  <div class="magnify">
//     *    <div class="device-art-nexus7-magnified"></div>
//     *    <img class="device-art-nexus7" src=""/>
//     *  </div>
//     */
//     var magnifyRegions       = $(".magnify");
//     var screenshotsToMagnify = $(".device-art-nexus7-magnified");
//     var originalScreenshots  = $(".device-art-nexus7");
//
//     // Set background of each magnified div to be the image of its respective screenshot
//     originalScreenshots.each(function(i) {
//       var src = originalScreenshots[i].src;
//       var width = originalScreenshots[i].width;
//       var height = originalScreenshots[i].height;
//       var urlString ='url(' + src + ')';
//
//       magnifyRegions[i].style.width            = width + "px";
//       magnifyRegions[i].style.height           = height + "px";
//       screenshotsToMagnify[i].style.background = urlString;
//
//       var native_width = 0;
//       var native_height = 0;
//
//       //Now the mousemove function
//        magnifyRegions.eq(i).mousemove(function(e) {
//         //When the user hovers on the image, the script will first calculate
//         //the native dimensions if they don't exist. Only after the native dimensions
//         //are available, the script will show the zoomed version.
//         if(!native_width && !native_height) {
//           //This will create a new image object with the same image as that in .device-art-nexus7
//           //We cannot directly get the dimensions from .device-art-nexus7 because of the
//           //width dynamically specified in the js. To get the actual dimensions we have
//           //created this image object.
//           var image_object = new Image();
//           image_object.src = originalScreenshots.eq(i).attr("src");
//
//           //This code is wrapped in the .load function which is important.
//           //width and height of the object would return 0 if accessed before
//           //the image gets loaded.
//           native_width = image_object.width;
//           native_height = image_object.height;
//         } else {
//           //x/y coordinates of the mouse
//           //This is the position of .magnify with respect to the document.
//           var magnify_offset = $(this).offset();
//           //We will deduct the positions of .magnify from the mouse positions with
//           //respect to the document to get the mouse positions with respect to the
//           //container(.magnify)
//           var mx = e.pageX - magnify_offset.left;
//           var my = e.pageY - magnify_offset.top;
//
//           //Fade out the glass if the mouse is outside the container
//           if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
//             screenshotsToMagnify.eq(i).fadeIn(100);
//           } else {
//             screenshotsToMagnify.eq(i).fadeOut(100);
//           }
//           if(screenshotsToMagnify.eq(i).is(":visible")) {
//             //The background position of .device-art-nexus7-magnified will be changed according to the //position of the mouse over the .device-art-nexus7 image. So we will get the ratio of the //pixel under the mouse pointer with respect to the image and use that to position the
//             //large image inside the magnifying glass
//             var rx = Math.round(mx/originalScreenshots.eq(i).width()*native_width - screenshotsToMagnify.eq(i).width()/2)*-1;
//             var ry = Math.round(my/originalScreenshots.eq(i).height()*native_height - screenshotsToMagnify.eq(i).height()/2)*-1;
//             var bgp = rx + "px " + ry + "px";
//
//             //Move the magnifying glass with the mouse
//             var px = mx - screenshotsToMagnify.eq(i).width()/2;
//             var py = my - screenshotsToMagnify.eq(i).height()/2;
//             //Now the glass moves with the mouse
//             //The logic is to deduct half of the glass's width and height from the
//             //mouse coordinates to place it with its center at the mouse coordinates
//
//             //If you hover on the image now, you should see the magnifying glass in action
//             screenshotsToMagnify.eq(i).css({left: px, top: py, backgroundPosition: bgp});
//           }
//         }
//       });
//     });
//   }
// }(window.jQuery));
