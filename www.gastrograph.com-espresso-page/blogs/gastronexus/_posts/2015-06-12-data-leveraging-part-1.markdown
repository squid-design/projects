---
layout: post
title: Data Leveraging - Part 1
subtitle: What Does 'Big Data' Mean for Beer?
tags: beer brewery expansion distribution growth quality control consistency data big
date: 2015-06-12 14:07:12
author:
  - Steve Wang
description: Data Leveraging - Part 1
---
'Big Data' continues to make headlines in our constantly evolving technological world, but what does it really mean? As defined by [Margaret Rouse][margaret-rouse], "Big data is an evolving term that describes any voluminous amount of structured, semi-structured and unstructured data that has the potential to be mined for information." It's mathematics' way of asking meaningful questions in algorithmic form to get answers that can be used to improve processes, increase efficiency, and most importantly save (and make) you money. Let's look at some applications for food & beverage.

<!--more-->

Let's take a look at Coca Cola's orange juice brands: Minute Maid and Simply Orange. Coca Cola's key objective is to create consistently flavored orange juice year-round using a secret weapon they like to call the Black Book; a problem that is a lot tougher than it sounds. As Jim Horrisberger (a director at Coke's Auburndale juice packing plant) puts it, "You take Mother Nature and standardize it. Mother Nature doesn't like to be standardized."

Oranges differ based on variables such as country of origin, the season they were grown, ripeness, and the list only goes on from there. Their models use detailed data in the form of over 600 variables encompassing the flavors found in oranges and are profiled by batch based on acidity, sweetness, and other raw juice attributes. These profiles are then systematically refined to both fit the product's signature flavor profile and to ensure that consistency is present from batch to batch. Minute Maid was bought in 1960, and we can't know for sure when the Black Book project began. What we do know for certain is that achieving these results requires recording data, building models around the data, and sticking with it for the long-term as your business grows.

Coca Cola has proven that you can take a naturally variable product and standardize it, but can data science be used 'creatively' to generate new combinations and ideas? A team of IBM researchers have created a program that can churn out new, surprisingly delicious recipes. A creative idea was defined by the team as, "novel and high-quality." The first thing to do was build the database and, using natural language processing algorithms, they were able to go through millions of recipes. They imported the quantity of different ingredients and the cooking processes, using Wikipedia to associate ingredients commonly used in various regions, and plugged in the chemical composition of the ingredients including data on how humans rate the pleasantness of 70 different chemical compounds. Now armed with data on the myriad of recipes and ingredients, as well as people's perception of the food based on chemical composition, it was time to churn out some recipes.

The recipes were generated with respect to the food-pairing principle which states that ingredients that pair well together in a recipe share common flavor molecules. The software doesn't just mix and match at will, rather it 'mutates' the ingredients of existing recipes and then matches them in other recipes to create a unique but tasty hybrid food. The beauty of this software is that it selects the best combinations adhering to the novel and high-quality mold. The way they measure novelty is quite intriguing; the team uses a mathematical tool called Bayesian Surprisal which has had previous application in determining what parts of a video people pay the most attention to. In this application, it quantifies the gap between prior beliefs about the food and new beliefs after the food has been introduced. To measure quality and taste, they hone in on what they believe is the key: smell. The program looks up the chemical properties and compares them to the other 70 odor molecules and can then run a simulation of the recipe's overall 'pleasantness'.

Once the recipes are generated they are pre-ranked and sorted for you using three categories: surprise, pleasantness of odor, and flavor pairings. They had tried their software out at a banquet in partnership with a chef from Berlin. The results were great; some of the highlights were a grilled tomato on a saffron crouton and a quick-creme caramel with cranberry and caraway ice cream. Don't be surprised if you see this technology coming to a grocery store near you!

In part 2 of our series on data leveraging, we will explore what a brewery of the future would look like equipped with the data leveraging capabilities that a corporation like Coca Cola has.

[margaret-rouse]: http://www.techtarget.com/contributor/margaret-rouse

#####Sources:
  * <a href="http://www.bloomberg.com/bw/articles/2013-01-31/coke-engineers-its-orange-juice-with-an-algorithm">http://www.bloomberg.com/bw/articles/2013-01-31/coke-engineers-its-orange-juice-with-an-algorithm</a>
  * <a href="http://www.wired.com/2013/11/a-new-kind-of-food-science/">http://www.wired.com/2013/11/a-new-kind-of-food-science/</a>
