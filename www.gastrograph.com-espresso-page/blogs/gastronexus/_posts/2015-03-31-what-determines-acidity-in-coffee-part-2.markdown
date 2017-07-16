---
layout: post
title: What determines acidity in coffee? Part 2
subtitle: Brewing methods and extraction control
tags: flavor profile coffee acidity sour green processing aging roast brewing methods extraction control
date: 2015-03-31 14:06:00
author:
  - Jason Cohen
description: The acidity in coffee can be controlled though brewing parameters and an understanding of the flavor profile of the bean
---
This is a perfect follow up to the [What Determines Acidity in Coffee][acidity] question!

As always, let's answer it with some data!

TL;DR: Preparation has a significant effect on the flavor profile of coffee&#8212;including the level of acidity.

<!--more-->

## Distribution of Acidity by Brewing Method


{% picture post-images post-images/2-jason-03-20.png "Boxplot of Sour & Acidity by brewing method" %}

If I may present to you&hellip;the distribution of Sour &amp; Acidity in coffee by brewing method! Clearly and without surprise, espresso (coffee extracted under pressure) is the most acidic preparation method, on average. French press (full immersion brewing) is the least acidic, and V60 (a type of pour-over) has the widest range.

But is there something else going on here? What if there exists a conflating factor such as green processing, roast level, or growing environment? Some of these questions we're already answered in the link above, so let's focus on the remaining question - how does the origin of the coffee affect the perceived Sour &amp; Acidity of the coffee by brewing method?

<hr>

## Acidity by Brewing Method Controlling for Continent of Origin

{% picture post-images post-images/1-jason-03-20.png "Sour &amp; Acidity by brewing method controlling for continent" %}

So is the effect of the brewing method consistent? No. What we're seeing here is that each continent tends toward a different green processing technique, and thus a different optimal level of roast - all of which exert influence over the resulting level of acidity in the flavor profile of the coffee.

<hr>

## Please just save me from exogenous variables

Oh... you should have just said so....

{% picture post-images post-images/3-jason-03-20.png "Inference Tree of Sour &amp; Acidity in Coffee" %}

This is a conditional inference tree mapping the distribution of Sour &amp; Acidity scores to a series of categorical variables.

    Where:
    C is Country
    P is Preparation
    G is Green Processing
    and the bar plot shows the distribution of acidity

Country is clearly the most used variable in creating this tree, and interestingly, green processing is only used as a splitting rule when a country has a variety of green processing methods in common use.
[acidity]: {% post_url /blogs/gastronexus/2015-01-29-what-determines-acidity-in-coffee-part-1 %}
