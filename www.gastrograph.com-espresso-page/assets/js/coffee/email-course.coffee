addingScroll = 0

redirectToHome = ->
  window.location.replace("/")

fillOutForm = ->
  if $("#mce-error-response").html() != ''
    clearInterval(addingScroll)
    $('.landing').css("overflow-y","scroll")
  if $("#mce-success-response").html() != ''
    clearInterval(addingScroll)
    $('.landing').css("overflow-y","scroll")
    setTimeout redirectToHome, 3000
    $("#mc-embedded-subscribe").css("visibility", "hidden")

addScroll = ->
  if $(window).height() < 682
    $('.landing').css("overflow-y","auto")
  if $(window).height() >= 682
    $('.landing').css("overflow-y","hidden")
    window.scrollTo(0,0)

$(document).ready ->
  if $('.landing').length > 0
    addingScroll = setInterval addScroll, 500
    setInterval fillOutForm, 500

