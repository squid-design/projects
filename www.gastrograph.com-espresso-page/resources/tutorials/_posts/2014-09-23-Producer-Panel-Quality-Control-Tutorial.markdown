---
layout: video_tutorial
title:  Quality Control Tutorial
subtitle: Quality Control
tags: screencast gastrograph producer panel quality control tutorial
date:   2014-09-23 09:42:02
author:
  - Jason Cohen
description: The second screen-cast tutorial for the Gastrograph Producer Panel. This one is on Quality Control!
redirect_from:
 - /learn/tutorials/Producer-Panel-Quality-Control-Tutorial.html
---
{% youtube n8tD_6swgN4 %}

Hi everyone, my name is Jason Cohen.  I am the founder and CEO of Analytical Flavor Systems, LLC.  My company makes statistical quality control tools for artisan beverage producers focusing on the craft beer, third wave coffee, and ultra premium spirits categories.  We use machine learning and data science models to flag flaws, taints, and contaminations in your products.

As we go over this second screencast tutorial, I'm going to be drinking a Lagunitas Maximus IPA, so shout out to Trevor Janowski, our friendly, local Lagunitas Brewing Co. rep.

We'll head on over to the Gastrograph Producer Panel.  You can sign up for this at Gastrograph.com.  We are going to go to the **Quality Control Overview Panel**, and we are going to be looking at some fake data from a brewery called *Cool New Brewery*.  We are not giving away any of our clients data here!  So to start off, we can see *Cool New Brewery*.  We are looking at a beer called *Awesome Double Bock*.  They have 32 reviews and an intensity of 40.  Forty is a little high when the average is just 35.  The maximum possible intensity is 80, and the minimum possible intensity is 20.  But, like I said, average is 35.  PQ is 6 out of 7.

I explain in the last screencast tutorial why we use a 7-point scale, so 6 out of 7 is incredibly high.  It is higher than nearly any company gets in a in a single product.  And this beer, even though it is scoring a PQ 6, there is a deviation in its flavor profile, and that is a problem.  It could affect them now; it could affect them in the future.  This is the computer flagging a latent contamination, meaning that that's something that tasted fine at your coffee roastery, at your beer brewery, or at your spirit distillery, but as it went out and as it was distributed, and as it got into your consumer's hands, something happened.  There was some kind of problem in the bottle.  There was some oxidation leak; there was something that was noticeably different from the last batch.  And so, because we are looking at beer, we can actually see the probabilities of a contamination, an actual chemical, and a known chemical contaminant.

We test for the, 40 most common known chemical contaminants.  The probabilities of those are quite low, so it is unlikely.  It's in fact impossible that we're dealing with one of those chemicals, those off flavor contaminating chemical compounds, right, because the top on right now is trans tune on and that only has a probability of 14%.  So it is much more likely that there was some deviation in the actual production process for *Awesome Double Bock*, and so we are seeing *Awesome Double Bock* is not too awesome right now.  If I click the alert, I can actually see what is going on.

This beer is trending earthy and is trending rich.  And, its trending that way in an off-sided run, which means that the last few observations have been more than a standard deviation above their norm, so that's actually seriously hurting *Awesome Double Bock*.  So, if we look at this first chart up here on the right; this is our alert chart.  We can see that overtime it ranges between a six and a seven.  This is an incredibly highly rated beer, but recently it has been trending downward, and in fact, it got its lowest score ever at a five-point something.  Sometime between September 1st and September 15th and it's starting to recover, but it's still below where it should be, and it's possible that this is a seasonal variation, and if it's a seasonal variation, and we have more than a year of data on your product we'll be able to alert you to that.

[If you are a coffee roaster or brewery, you might open the door in the summer and let warm air in], but when it's cold you keep the door closed and keep the heater on, right.  All of these things are going to change your environment, and so we are able to take some environmental readings because the Gastrograph review app is on iOS and on Android, it takes those environmental readings.  But we're not always going know the specifics, so sometimes it can take up to a year for the computer to determine that this is actually caused by your production process, this is actually caused by your raw ingredients, or this deviation is caused by some type of external factor that normally doesn't happen, such as one of these, right methanol butyric acid.  These are things that also do happen, either because of raw ingredients, variation, or because there was some type of actual mistake at the brewery, distillery or roaster.

So, when we go down to the second chart and we look at the distribution of perceived quality scores, we can see that for the most part, this beer's scoring 6, sometimes it scores 7, and rarely it scores 5, and right now what we're seeing are those 5's.  Those 5's have all come about in the last 2-3 weeks, and so that is a serious deviation.  That is something that this brewery is going to want to deal with.  Either they're going to be able to take it off tap, they’re going to be able to pull it from shelves, or if they were using the **Gastrograph System**, they would have been able to pull it from distribution before it actually got released, and they would've been able to protect their brand.  They would've been able to protect their products flavor profiles, and they could have decided what to do with that batch, and this last prior versus recent data on your product, this is for each batch.

What did the prior distribution of the last 75% of the beer, the coffee, or the spirit look like, and what does the current one look like, and clearly we don't have quite enough data in this example to make a good one, but these 2, earthy and rich, which are deviant, and you can see that earthy tends to be down here at zero, and right now it's all the way up here at 3.  And rich, which is normally at four, is sometimes down here at two, and up here at five.  There are an incredible amount of outliers in this plot that you are going to need to deal with.  And the last thing is when we actually discover one of these deviations, right; you are going to receive a phone call that is actually going to sound something very similar to this.

This is my real phone number that I am typing in here (305)-794-8392.  If you ever have a question, or if you ever need to contact me, please do not hesitate, just call me.  But I am actually going to play for you on speaker, the type of phone call that you would receive if we caught a deviation in your product.  In the same time that you would receive this phone call, you would also receive an email and a text message to your entire production staff that you wanted to hear:

`**THIS MESSAGE IS A TEST**
"This is a friendly notice that you have DNS in your product mediocre with probability up 95% as of 2014 9:21.  Greetings from the Gastrograph team”
**THIS MESSAGE IS A TEST**`

And so you can see that unlike a human driven quality control program, or a chemical driven quality control program where you're physically trying to test each of these individual compounds are they present are they absent how present are they.  Are they above the noticeable threshold if you simply have your current production staff your front of house staff or who ever you have on your team taste product build-up that prior information about what product is supposed to taste like a standard and then attempt to either match that or improve upon it slowly over time right, we're able to create an incredible amount of more information gain and our machine learning and data science algorithms are running 24 hours a day 365 days a year in the cloud and they will email you they'll call you, they will text message you as soon as a deviation is detected so that you'll be able to take action which will in the future protect your products and protect your brand

So, that is the time that I have for quality control overview.  The next one is going to be on flavor profiling, who likes your product, what do they like about it, what do they actually taste.  Again, call me, [email me][email], text me, however you like getting in contact with me I'm here.

Thanks -Jason

[email]: mailto:JasonCEO@gastrograph.com
