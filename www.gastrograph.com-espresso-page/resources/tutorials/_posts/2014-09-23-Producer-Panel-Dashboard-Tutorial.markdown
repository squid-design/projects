---
layout: video_tutorial
title:  Dashboard Tutorial
subtitle: Dashboard
tags: screencast gastrograph producer panel dashboard tutorial
date:   2014-09-23 09:42:02
author:
  - Jason Cohen
description: The first screen-cast tutorial for the Gastrograph Producer Panel Dashboard
redirect_from:
 - /learn/tutorials/Producer-Panel-Dashboard-Tutorial.html
---
{% youtube axFSYkBCmBQ %}

Hi, everyone my name is Jason Cohen I am the founder and CEO Analytical Flavor Systems, LLC.  My company makes tools for statistical quality control in the artisan beverage industry, and this is one of our first screencast tutorials.

Today we are going to be going over the dashboard inside the monitoring platform, the **Gastrograph Producer Panel**, and I will take you there.  While I give this presentation, I am going to be drinking Weyerbacher Pumpkin Ale.  It is a little early in the season for pumpkin ales, but I am greatly enjoying this one.  So a bit of background about what we do, we build machine learning data science models that are able to flag flaws, taints, and contaminations, latent or currently present in your product, and we’ll go more into what that means, or each of those components mean in future video tutorials.  But for this one I want to focus on what you are aiming for.

And what you are aiming for is if you are starting a quality control program at your coffee roaster, at your beer brewery, or at your spirit distillery.  You’re looking to have individuals inside your company one doing sensory reviews making sure that the product tastes consistent, the product is being made to spec, and you’re going to do that by making sure there's enough reviews coming in per month.  So we are going to be looking at some fake data today from a brewery called, *Cool New Brewery*.

We are not going to give away any of our clients data, and this brewery has 29 reviews this month, 106 all-time.  Their perceived quality, that is the score that you give it on our system that ranges between 1-7.  I will explain why in a moment at the end of every review.  Right now, they are getting a 5 out of 7 this month, and a 4.8 over their lifetime average.

So, they are trending upward this month, and they have one Quality Control alert.  That is something that they are going to need to look into, something they are going to need to deal with.  There is a minor deviation in *Pretty Good Amber*.

So we use the system of 1-7 scores.  1-7 because we found, we have built upon research that was originally done by the [Quartermaster Corps on hedonics which] found that 7, 9, and 13, are the scales that work.  And the reason that those scales work is because they minimize noise, maximize consistency, and maximize information gain.  So, you can build a 1-3 system, right.  I like this, I do not like this, and I like it a lot.  A 1-3 system, but I would maximize information game you'd hear you know if your product was a one two or three in people would be very consistent, but you really wouldn't know in aggregate for variations so we use a 1-7 scale.

And the first chart that you should look on your dashboard is your products deviation and perceived quality over time.  So, this brewery, *Cool New Brewery*, has three products, *Awesome Double Bock*, *Mediocre Amber*, *Mediocre Ale*, and *Pretty Good Amber*, and the dotted black line is their brewery average.  You probably have more than three products.  Your brewery average is probably going to be more meaningful, and your products are probably going to vary a little more, and probably be a little more clustered.

So you can see that here, *Awesome Double Bock* is a great beer its scoring a six, it's trending up for most the time.  Right up until the end where it starts to trend down and the opposite for the other beers.  So some breweries aim for constant improvement, some coffee roasteries, some distilleries, some of you guys aim for constant improvement and if you do, you want to see this line trending slightly upward.  Right, you do not want massive jumps in your quality because there are always going to be people who like the product that you’re making right now.  That is why you are in business, that’s is why you are doing well.  And so, if you have that, if you have massive swings in your flavor profile people are going to be unhappy, right.

General consumers not aficionados, not connoisseurs, not people who are looking for rarity right, but people who are brand loyal and consistently buying your product, are looking for a consistent flavor profile.  If you deviate strongly from that you are going to hurt your brand, you are going to lose yourself customers.  So, what you want is this line on the deviations and perceived quality over time.  You want this to be flat if anything slightly trending upwards.  Any downward trends clearly bad, and if you are one of our clients you would receive a phone call for that.  You would receive a text message, and you would receive an email and we would triage that for you so you know exactly where it is happening, why it is happening.  If you are in coffee you could be oh, your bags are going stale but they are still

On store shelves, wherever you are distributing.  If you are in beer it could be a distributor decided the were going to release something far too late, They held product back, or a bar didn't clean their tap lines, or something that went wrong in your actual production process were your grains scorched, your wort boiled too long, there’s a significant difference in the base grain that you got from your malter.  These are all things that happen, and these are all things types of things that a well-put together quality control program and the Gastrograph System will catch.

So, the second plot that we are going to look at is reviews per product, per month, which is simple to understand.  This is the number of products, the number reviews per product, per month coming in and we highly suggest setting a minimum review quota for yourself for your team making sure that everyone hits that before every new batch is released.  Seasonals, they are not going to look like this, special releases clearly not going to look like this but we can provide quality control metrics on first run products.  Product that you never produced before.  We can do that through hierarchical data analysis so we do not have to look at just your pumpkin ale.  This is one benefit of using the Gastrograph system.  We can actually look at all pumpkin ales that have ever been produced the flavor profile within that that you are currently attempting to produce, or are producing very successfully, and if that's consistent who's going to like it, what they're going to like in it and how you're available optimizations and you're available quality metrics.

And the last thing is your overview of products.  This is just the parts that had been reviewed within this month total number reviews the recent review should always be trending up, your average perceived quality should be standard that is a dash sign.  It should not be trending downwards, and if it is trending up a little bit that is good too.  Deviations, you do not want to see deviations in your flavor profile and in future screencast tutorials we will go into what those mean.

So, that is all the time that I have for this per screencast tutorial this is best used if you're also signed up for our a quality control email course that's a six-week course it takes you from how to start a quality control program starting from nothing all the way to being able to implement some of these functionalities yourself.  There's a a lot that we do with statistics, machine learning and data mining where unless you or someone on your team is going to start sitting in front of a computer for 12 to 13 hour days, you're not going to replicate.  But you can replicate some of this and you can get the basics in order.

And so future tutorials are going to go over flavor profiling -what do people taste in the product or they like about it or they dislike who's going to like it what are you available demographics how can you describe the product so that people like it more.  Quality control [is] going to show you how to read the quality control charts, how to see those deviations, how to improve upon your deviations, and finally we're going to go over employee monitoring.  Are your employees sensitive to your products?  Are they improving in their reviews?  Are they improving their ability to detect, and determine, and differentiate flavors, or do you need to invest in some more training or force them to do more reviews, or increase the review quota.  These are all things we will go over in future tutorials.

So, thank you, I am always available by email please email me.  [My email][email] is JasonCEO that stands for chief executive connoisseur or at Gastrograph.com.  Also my email is on our website go to that Gastrograph.com and AnalyticalFlavorSystems.com

Thanks,

Jason

[email]: mailto:JasonCEO@gastrograph.com

