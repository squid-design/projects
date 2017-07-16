---
layout: post
title:  What determines acidity in coffee? Part 1
date:   2015-01-29 09:29:18
tags: coffee acidity sour green processing aging roast
author:
  - Jason Cohen
description: What determines acidity and sour in coffee?
---
Using machine learning, data science, sensory science, and flavor profiling on all Gastrograph reviews of coffee lets us answer a lot of questions about coffee.  For instance, what determines acidity in coffee?

There will be a lot of graphs to help communicate the concepts and dispel a lot of myths about acidity in coffee.

The main determinant of Sour &amp; Acidity in coffee is roast level, where a lighter roast results in more natural acid compounds being left unbroken from Maillard reaction and Strecker degradation (non-enzymatic browning). This is closely followed by altitude at which the coffee was grown, green processing, and the coffee's age.

The next sections will discuss in further detail how region, green processing, age, and roast level affect acidity.

<!--more-->

### Differences by Region
{% picture post-images post-images/1-jason-01-29.png %}

Based on 10,000+ reviews, there seems to be little indication that you can determine the Sour &amp; Acidity of a coffee simply by where it was grown!

Now this lack of effect would disappear if we controlled for the altitude at which the coffee was grown. Why? Because higher altitude plants are under more stress, forcing them to be more efficient&mdash;fewer leaves, less fruit, but each leaf has a higher respiratory rate and each fruit is more potent!  This is similar to how good wines produce more concentrated sugars while under stress.

### Green Processing
{% picture post-images post-images/2-jason-01-29.png %}
This graph shows the difference in distribution of Sour &amp; Acidity of washed coffee versus naturally processed coffee.  There is a very small difference in the skew and kurtosis, but it is statistically significant.

Washed coffee brewed in a Chemex is on average more acidic than its natural washed counterpart.  Why? This is most likely a cognitive, not chemical, effect. Because naturally processed coffees ferment with bits of remnant fruit (the coffee cherry), they retain more sugars. Some of these are preserved through the roasting process. The increase in fruity esters and sugar compounds masks the acidity&mdash;so even though there are about equal amounts, you taste it less in the naturally processed coffees.

### Age of the Coffee
{% picture post-images post-images/3-jason-01-29.png %}
If you really want to avoid Sour &amp; Acidity in coffee, you could drink it stale! But I don't suggest it&mdash;stale coffee lacks the caffeine and interesting flavors that make coffee wonderful!

This plot shows the rate of acid degradation in coffee from its first day since roast. The red line marks the 14th day from roast, where the average coffee goes stale.

### Level of Roast
{% picture post-images post-images/4-jason-01-29.png %}
This graph shows Sour &amp; Acidity as a function of the level of roast; as Roast increases, the average perception of acidity decreases (in coffee brewed in a Chemex). The grey field shows the standard error within the fit.

You should note, why is the error so high at the highest level of roast? These are coffees considered "French" or "Italian" or even "Spanish" roasts&mdash;you should consider these coffees burnt. The fruity and interesting acids such as malic, phosphoric, and citric have been destroyed by prolonged heat exposure in the roaster, and these coffees contain acrylamide, a carcinogen, which is not only bad for you, but also tastes terrible.

##### Want us to answer a question about coffee, beer or spirits using our research? Email us [here][email].

[email]: mailto:info@gastrograph.com
