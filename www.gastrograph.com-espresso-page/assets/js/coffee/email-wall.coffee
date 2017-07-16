$(document).ready ->
  $('.sign-up-qc-course').bootstrapValidator({
    feedbackIcons: {
      valid: 'fa fa-check',
      invalid: 'fa fa-times',
      validating: 'fa fa-refresh'
    },
    fields: {
      EMAIL: {
        validators: {
          emailAddress: {
            message: 'That is not a valid email (eg: help@gastrograph.com)'
          }
        }
      },
      NAME: {
        validators: {
          notEmpty: {
            message: 'Please enter your name (eg: Ben Franklin)'
          }
        }
      },
      MMERGE3: {
        validators: {
          notEmpty: {
            message: 'Please enter your phone number (eg: (555) 555-5555'
          }
        }
      },
      MMERGE2: {
        validators: {
          notEmpty: {
            message: 'Please enter the name of the company you work at (eg: Dogfish Head)'
          }
        }
      }
    }
  })
createCookie = (name, value, days) ->
  if days
    date = new Date()
    date.setTime(date.getTime()+(60*12*24*60*60*1000))
    expires = "; expires=#{date.toGMTString()}"
  else expires = ''
  document.cookie = "#{name}=#{value}#{expires}; path=/"

readCookie = (name) ->
  return(document.cookie.match('(^|; )'+name+'=([^;]*)')||0)[2]
  nameEQ = "#{name}="
  ca = document.cookie.split(';')
  for c in ca.length
    c = substring(1, c.length) while c.cahrAt(0) == ' '
    return c.substring(nameEQ.length, c.length) if c.indexof(nameEQ) == 0
    return null

eraseCookie = (name) ->
  createCookie(name, "", -1)

# For subscribe wall on whitepaper
wallFilledOut = ->
  if $("#mce-success-response").html() != ''
    createCookie('gg_whitepaper_access', '2923240630A','')
    $(".content").removeClass('blur')
    clearInterval(accessGranted)
    $("#accessSite").modal(
      backdrop:false,
      keyboard:true
    )
    setTimeout $("#accessSite").modal('hide'), 1000

if readCookie('gg_whitepaper_access') != '2923240630A' && $("#accessSite").length > 0
  $(".content").addClass('blur')
  $("#accessSite").modal(
    backdrop:'static',
    keyboard:false
  )
  accessGranted = setInterval wallFilledOut, 1000

# This is for email course
courseFilledOut = ->
  if $("#mce-success-response").html() != ''
    createCookie('gg_emailcourse_access', 'dg3hkji5iv5','')
    $(".content").removeClass('blur')
    clearInterval(accessGranted)
    $("#startCourse").modal(
      backdrop:false,
      keyboard:true
    )
    setTimeout $("#startCourse").modal('hide'), 2000

if readCookie('gg_emailcourse_access') != 'dg3hkji5iv5' && $("#startCourse").length > 0
  $(".content").addClass('blur')
  $("#startCourse").modal(
    backdrop:'static',
    keyboard:false
  )
  accessGranted = setInterval courseFilledOut, 1000
