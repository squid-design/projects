(function(window){
$.fn.stopAtTop= function () {
    var $this = this,
        $window = $(window),
        thisPos = $this.offset().top,
        //thisPreservedTop = $this.css("top"),
        setPosition,
        under,
        over;

    under = function(){
        if ($window.scrollTop() < thisPos) {
            $this.css({
                position: 'absolute',
                top: ""
            });
            setPosition = over;
        }
    };

    over = function(){
        if (!($window.scrollTop() < thisPos)){
            $this.css({
                position: 'fixed',
                top: 0
            });
            setPosition = under;
        }
    };

    setPosition = over;

    $window.resize(function()
    {
        bumperPos = pos.offset().top;
        thisHeight = $this.outerHeight();
        setPosition();
    });

    $window.scroll(function(){setPosition();});
    setPosition();
};
})(window);

$('#slide-start').stopAtTop();
$('#slide-start2').stopAtTop();
$('#slide-start3').stopAtTop();
$('#slide-start4').stopAtTop();
$('#slide-start5').stopAtTop();
$('#slide-start6').stopAtTop();
$('#slide-start7').stopAtTop();
$('#slide-start8').stopAtTop();
$('#slide-start9').stopAtTop();
$('#slide-start10').stopAtTop();
$('#slide-start11').stopAtTop();
$('#slide-start12').stopAtTop();
$('#slide-start13').stopAtTop();
$('#slide-start14').stopAtTop();
$('#slide-start15').stopAtTop();
$('#slide-start16').stopAtTop();
$('#slide-start17').stopAtTop();