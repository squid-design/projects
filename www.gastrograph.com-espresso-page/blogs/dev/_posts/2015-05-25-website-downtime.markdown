---
layout: post
title:  "Website downtime on May 22, 2015"
date:   2015-05-25 12:30:02
author:
  - John Dori
description: Downtime on May 22, 2015
---
If you tried to reach this [blog][blog] or [website][website] between 1:21 PM EST and ~6:24 PM EST on Friday, May 22, 2015, your browser may have warned you that www.gastrograph.com uses an "invalid security certificate".

<!--more-->

During those five hours, our SSL [("Secure Sockets Layer")][ssl] certificate was temporarily expired due to a longer than expected renewal time. Thanks to redundant security measures we have had put into place for over two years, this five hour period of "downtime" only affected the front-facing www.gastrograph.com - our quality control services and real-time flaw detection were <i>never</i> affected and were <i>never</i> down.

In fact, the front-facing website was never truly down. When a certificate expires, the only effect is its "revocation status" is no longer published to the public. This means that our front-facing website was still secured during this 5 hour period, but any visitor would not be able to verify that for himself or herself without being able to check the certificate's revocation status.

No data, including credit card information, was ever made vulnerable by this period of downtime. In fact, payments through our website can only be made when an SSL certificate is valid and in-effect.

Here is a complete list of effects caused by this downtime:

  * Users were unable to view pages under the front-facing www.gastrograph.com without accepting the expired certificate through the browser.
  * Users were unable to view blog posts under the front-facing www.gastrograph.com/blogs/ without accepting the expired certificate through the browser.
  * Users were unable to submit any credit card information through our website without accepting the expired certificate through the browser.

We apologize for any inconvenience this caused our customers and guests. Today, we have implemented further security measures to ensure that such a period of downtime never occurs again.

[blog]: "/blogs/"
[website]: "/"
[ssl]: "http://en.wikipedia.org/wiki/Transport_Layer_Security"
