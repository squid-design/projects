---
layout: post
title:  "Update: Twilio And Shiny Integrated"
tags: shiny R Twilio
date:   2015-02-13 09:42:02
author:
  - Evan Farrell
description: You can integrate R Shiny and Twilio together to have automated calling, texting and more. Simply use the RTwilio package.
redirect_from:
  - /dev/2014/07/18/twilio_and_shiny/
  - /dev/twilio_and_shiny.html
---
Since we use Twilio in a lot of our R packages while running analysis for our clients, we have built a wrapper for contacting the API.  You can see and install it [here][RTwilio]. We have also built API wrappers for [Stripe][RStripe], [Sendwithus][RSendwithus], and [Mandrill][RMandrill]. Using these helps prevent code bloat and makes it cleaner. A lot of this post is going to be very similiar to our old blog post about Twilio and Shiny.

As Shiny Server gets more and more production ready, developers are adding new features that typically aren't easy to build in&mdash;examples include automated phone notifications through Twilio. Twilio allows your application to send phone calls and text messages to users of your application when a triggering event occurs.  For example, we use it to call our clients of potential flaws, taints, and contamination's in their products in real time.

This tutorial will teach you to integrate Twilio with a basic Shiny application which places a sample call to your users.  This tutorial will leave you with a working application which you can build into your own needs. This tutorial will require the following:

* R
* Shiny

This tutorial focuses on Shiny Server, but most of the code could easily be converted to other R based web frameworks or batch scripts.  The code for the Shiny Version is located on [GitHub][shiny-twilio].

<!--more-->

Our current situation provides is we have a button and field in shiny through which our users can enter their phone number and hit the button to test.  Here's how we did it in R.  The first thing we needed was a simple input and button in our `Ui.R` file which was the following code:


{% highlight R linenos %}
div(class="message_test",
    div(class="center",
        textInput("phone_number", label="", value="")),
    div(class="center",
        HTML("<div class='center'>
            <button id='send_test_call' class='action-button btn btn-default '>
            Send test Call</button>
            </div>")
        )
    )
{% endhighlight %}

Twilio works by sending an API call with the data necessary to work including the url with XML code. The [RTwilio][RTwilio] package allows you to either host your own xml file or use the echo Twimlet to have a "stateless" call. The phone number and account information is sent through the API.  Attached to the API call is a URL that Twilio will go to in order to grab the XML or TwiML.  This is the data specifying what the text-to-speech says, as well as other configurations.  Check out the TwiML information [here][twiml].

We no longer store our XML files on Amazon S3 as we did in the past since starting to use the echo Twimlet. You can still use our [RS3][rs3] package to upload to S3 if you need to with linux.

Now that the frontend is built, let's build the backend.  In our server.R file, we have an `observe` function which will check for the button being clicked `input$send_test_call` and that the phone number isn't null.

{% highlight R linenos %}
require(RTwilio)

observe({
    if(!is.null(input$send_test_call)) {
        if(!is.null(isolate(input$phone_number)) &&
             isolate(input$phone_number) != "") {
             time <- now()

### We make the message
            message <- paste("Greetings, it is currently, ",time," . This message can be made to say anything.")
            twilio_stateless_call("<Your-Twilio-account-SID>",
                                  "<Your-Twilio-Account-Auth-Token>",
                                  message=message,
                                  From="<Your-Twilio-phone-number>",
                                  To=("+1",isolate(input$phone_number)))
        }
    }
})

{% endhighlight %}

Basically, you wait until the button is pressed and you make sure that a phone number has been entered.It is very easy with the package, and you can also easily send a SMS message.  If doing this in pure R without Shiny, the only things you need are the following:

{% highlight R linenos %}
require(RTwilio
time <- now()

### Phone number
call_from <- "+17248675309"

### We make the message
message <- paste("Greetings, it is currently, ",time," . This message can be made to say anything.")

twilio_stateless_call("<Your-Twilio-account-SID>",
                      "<Your-Twilio-Account-Auth-Token>",
                      message=message,
                      From="<Your-Twilio-phone-number>",
                      To=call_from)

{% endhighlight %}

And that's it!  That's how we got Twilio to work in R and in Shiny.  We are going to expand a lot on this simple version to alert our users in a custom manner.  Adapt this to your needs.  Just pull the code off the GitHub repo ([GitHub][shiny-twilio]) and run the code with your info added in.

[twiml]: https://www.twilio.com/docs/api/twiml
[shiny-twilio]: https://github.com/analyticflavorsystems/shiny-twilio
[ftp_tutorial]: https://help.ubuntu.com/10.04/serverguide/ftp-server.html
[rs3]: https://github.com/Gastrograph/RS3
[rs3_post]: {% post_url /blogs/dev/2014-08-18-using-s3-in-r %}
[RTWILIO]: https://github.com/Gastrograph/RTwilio
[RStripe]: https://github.com/Gastrograph/Rstripe
[RSendwithus]: https://github.com/Gastrograph/RSendwithus
[RMandrill]: https://github.com/Gastrograph/RMandrill
