---
layout: post
title:  "Twilio And Shiny Integrated"
tags: shiny R Twilio
date:   2014-07-18 09:42:02
author:
    - Evan Farrell
description: You can integrate R Shiny and Twilio together to have automated calling, texting and more.  It's simple using RCurl.
redirect_from:
  - /dev/2014/07/18/twilio_and_shiny/
  - /dev/twilio_and_shiny.html
---
*Edit February 13, 2015: View our updated post on using Twilio with R [here][new-post]*

~~*Edit:  Since this blog post, we have created an R package for Linux that works with S3 buckets.  We have updated this post to work with it.*~~

As Shiny Server gets more and more production ready, developers are adding new features that typically aren't easy to build in&mdash;examples include automated phone notifications through Twilio. Twilio allows your application to send phone calls and text messages to users of your application when a triggering event occurs.  For example, we use it to call our clients of potential flaws, taints, and contamination's in their products in real time.

This tutorial will teach you to integrate Twilio with a basic Shiny application which places a sample call to your users.  This tutorial will leave you with a working application which you can build into your own needs. This tutorial will require the following:

* R
* Shiny
* some knowledge of servers including FTP and APIs

This tutorial focuses on Shiny Server, but most of the code could easily be converted to other R based web frameworks or batch scripts.  The code for the Shiny Version is located on [GitHub][shiny-twilio].

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

<!--more-->
Twilio works by issuing a post request through either code (such as PHP) or a REST API, which is what this tutorial will use.  The phone number and account information is sent through the API.  Attached to the API call is a URL that Twilio will go to in order to grab the XML or TwiML.  This is the data specifying what the text-to-speech says, as well as other configurations.  Check out the TwiML information [here][twiml].
The hardest decision for us was where to store the XML file as it needed to be programmatically made and uploaded each time the user tests our system.

~~At first the choice was going to be Amazon S3, but lack of tools and compatibility with R got in the way.  We are working on building an open source library to utilize AWS resources directly from R&mdash;check back on this blog for its release.~~ **Edit:  We now have a working S3 library with R called [RS3][rs3].  You can see our blog post [here][rs3_post].**   ~~Until then, an FTP server works fine. Building a simple FTP server is out of scope of this article, but is quite easy.  We suggest this additional tutorial [here][ftp_tutorial].~~

Now that the frontend is built, let's build the backend.  In our server.R file, we have an `observe` function which will check for the button being clicked `input$send_test_call` and that the phone number isn't null.

{% highlight R linenos %}
observe({
    if(!is.null(input$send_test_call)) {
        if(!is.null(isolate(input$phone_number)) &&
             isolate(input$phone_number) != "") {
             time <- now()

### We make the message
            message <- paste("Greetings, it is currently, ",time," . This message can be made to say anything.")

### Now we build the XML File make sure you have require(XML)
            xml_message <- newXMLNode("Response")
            newXMLNode("Say", message, attrs=c(voice='alice',
                       language='en-gb', loop=3), parent=xml_message)

### Save the file temporarily.
### We call it based of the date and username
            filename <- paste0(Sys.Date(), "_", gsub(" ", "_", username(), ".xml"))
            fl <- tempfile()

            saveXML(xml_message, file=f,
                    prefix='<?xml version="1.0" encoding="UTF-8" ?>')

### function to upload it to somewhere accessible.
### ftpupload(f,paste0("ftp://<your-location>",filename))

### Let's upload it to an S3 bucket called 'twilio-xml'
            S3_connect("<my-access-key>","<my-secret-key>")
            S3_create_bucket("twilio-xml","public-read")
            S3_put_object("twilio-xml",filename,f,"text/xml")

### Twilio RCurl Rest Connection
            POST('https://api.twilio.com/2010-04-01/Accounts/
            <Your-Twilio-account-id>/Calls.json',
            body = list(
            Url=paste0("https://s3.amazonaws.com/twilio-xml/",filename),
            From="+1<Your-Twilio-account-phone-number>", To=paste0("+1",isolate(input$phone_number))),
            config=authenticate("<Your-Twilio-account-id>",
            "<Your-Twilio-account-auth-token>", type="basic"))
        }
    }
})

{% endhighlight %}

Basically, you wait until the button is pressed and you make sure that a phone number has been entered.  It's a bit exhausting, but you can adapt the message to be whatever based on data you want.  Then you next create xml with the message.  Upload that to a publicly openable location and finally use the Twilio API to access that point.  If doing this in pure R without Shiny, the only things you need are the following:

{% highlight R linenos %}
require(XML)
require(RCurl)
require(httr)

time <- now()

### Phone number
call_from <- "+17248675309"

### We make the message
message <- paste("Greetings, it is currently, ",time," . This message can be made to say anything.")

### Now we build the XML File make sure you have require(XML)
xml_message <- newXMLNode("Response")
newXMLNode("Say", message, attrs=c(voice='alice',
           language='en-gb', loop=3), parent=xml_message)

### Save the file temporarily.
### We call it based off the date and username
filename <- paste0(Sys.Date(), "_", gsub(" ", "_", username(), ".xml"))
fl <- tempfile()

saveXML(xml_message, file=f,
prefix='<?xml version="1.0" encoding="UTF-8" ?>')

### function to upload it to somewhere accessible.
### ftpupload(f,paste0("ftp://<your-location>",filename))
### Let's upload it to an S3 bucket called 'twilio-xml'
S3_connect("<my-access-key>","<my-secret-key>")
S3_create_bucket("twilio-xml","public-read")
S3_put_object("twilio-xml",filename,f,"text/xml")

### Twilio RCurl Rest Connection
POST('https://api.twilio.com/2010-04-01/Accounts/
<Your-Twilio-account-id>/Calls.json',
body = list(
Url=paste0("https://s3.amazonaws.com/twilio-xml/",filename),
From=call_from, To="+14128574309"),
config=authenticate("<Your-Twilio-account-id>",
"<Your-Twilio-account-auth-token>", type="basic"))

{% endhighlight %}

And that's it!  That's how we got Twilio to work in R and in Shiny.  We are going to expand a lot on this simple version to alert our users in a custom manner.  Adapt this to your needs.  Just pull the code off the GitHub repo ([GitHub][shiny-twilio]) and run the code with your info added in.

[twiml]: https://www.twilio.com/docs/api/twiml
[shiny-twilio]: https://github.com/analyticflavorsystems/shiny-twilio
[ftp_tutorial]: https://help.ubuntu.com/10.04/serverguide/ftp-server.html
[rs3]: https://github.com/Gastrograph/RS3
[rs3_post]: {% post_url /blogs/dev/2014-08-18-using-s3-in-r %}
[new-post]: {% post_url /blogs/dev/2015-02-13-twilio-and-shiny-updated %}
