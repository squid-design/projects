$(document).ready ->
  $('#new-account-form').bootstrapValidator({
    feedbackIcons: {
      valid: 'fa fa-check',
      invalid: 'fa fa-times',
      validating: 'fa fa-refresh'
    },
    fields: {
      email: {
        validators: {
          emailAddress: {
            message: 'Looks like an invalid email address'
          }
        }
      },
      name: {
        validators: {
          notEmpty: {
            message: 'You need to add a name'
          }
        }
      },
      phone: {
        validators: {
          notEmpty: {
            message: 'Add your phone number above'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: 'Add a password above'
          },
          stringLength: {
            min: 7,
            message: 'The password must be at least 7 characters'
          }
        }
      },
      company: {
        validators: {
          notEmpty: {
            message: 'Whoops, looks like you forgot to add your company.'
          },
          regexp: {
            message: "You are not allowed here. Please email evan@gastrograph.com",
            regexp: /^(?!(East\sEnd\sBrewing(.*)))/i
          }
        }
      }
    }
  })

  $ ->
    $("#mce-PHONENUM").mask("(999) 999-9999")
    $("#input_exp").mask("99/99")
    $("#input_cc_number").payment('formatCardNumber')
    $("#input_ccv").payment("formatCardCVC")
    $("#input_phone").mask("(999) 999-9999")

jQuery ->
 subscription.setupForm()

subscription =
 setupForm: ->
   $('#new-account-form').submit ->
     $('#startTrial').attr('disabled', true)

     if $('#input_cc_number').length
       subscription.processCard()
       false
     else
       # Print out errors
       true


 processCard: ->
   card =
     name: $('#input_name').val()
     number: $('#input_cc_number').val()
     cvc: $('#input_ccv').val()
     name: $('#input_name').val()
     expMonth: $('#input_exp').val().split("/")[0]
     expYear: $('#input_exp').val().split("/")[1]
   Stripe.createToken(card, subscription.handleStripeResponse)

 handleStripeResponse: (status, response) ->
   if (response.error)
     if response.error.message != 'A network error has occurred, and you have not been charged. Please try again.'
       $('#startTrial').removeAttr('disabled')
       $('#stripe-errors').html("<div class='alert alert-danger alert-dismissible' role='alert'>
                                 <button type='button' class='close' data-dismiss='alert'>
                                 <span aria-hidden='true'>&times;</span><span class='sr-only'>
                                 Close</span><button></div>")
       $('#stripe-errors .alert').text(response.error.message)
   else
       $('#stripeToken').val(response.id)
       $('#new-account-form')[0].submit()

